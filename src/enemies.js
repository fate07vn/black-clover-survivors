// Enemy and Wave Progression System for Black Clover: Magic Survivor
// Perfectly balanced damage & HP progression across 30 minutes.
// Complete with regular enemy skills, boss signature abilities, red danger telegraphs, and projectiles.

class EnemyManager {
  constructor(game) {
    this.game = game;
    this.spawnTimer = 0;
    this.bossActive = null;
    this.activeBossesSpawned = new Set();
    this.enemyProjectiles = [];
    this.dangerTelegraphs = [];
  }

  reset() {
    this.spawnTimer = 0;
    this.bossActive = null;
    this.activeBossesSpawned.clear();
    this.enemyProjectiles = [];
    this.dangerTelegraphs = [];
  }

  // Balanced Real-time & Level HP Scaling Formula (Overhaul)
  getBalancedHpMultiplier(gameTime, isBoss = false) {
    const minutes = (gameTime || 0) / 60;
    const pLv = (this.game.player && this.game.player.level) ? this.game.player.level : 1;
    // Tăng trưởng mượt theo phút + 3.5% mỗi cấp độ nhân vật
    const timeScale = 1 + Math.pow(minutes, 1.85) * 0.38;
    const lvScale = 1 + (pLv - 1) * 0.035;
    return timeScale * lvScale * (isBoss ? 1.35 : 1.0);
  }

  // Alias for compatibility
  getVampireSurvivorsHpMultiplier(scaleWithLevel = true, isBoss = false) {
    return this.getBalancedHpMultiplier(this.game.gameTime || 0, isBoss);
  }

  update(dt, gameTime) {
    const p = this.game.player;
    if (!p || p.hp <= 0) return;

    this.checkBossSpawns(gameTime);

    this.spawnTimer -= dt;
    const baseInterval = Math.max(0.045, 0.45 - (gameTime / 600) * 0.38);

    if (this.spawnTimer <= 0) {
      this.spawnTimer = baseInterval;
      // Cap at 135 enemies to guarantee buttery smooth 60 FPS without lag
      if (this.game.enemies.length < 220) {
        const batch = 2 + Math.floor(gameTime / 75);
        for (let b = 0; b < batch; b++) {
          this.spawnRegularEnemy(gameTime);
        }
      }
    }

    const enemies = this.game.enemies;
    const pX = p.x;
    const pY = p.y;
    const pRadius = p.radius;

    // 1. Update Existing Enemies & their signature skills
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];

      if (e.isDead || e.hp <= 0) {
        enemies.splice(i, 1);
        continue;
      }

      if (e.hitFlashTimer > 0) e.hitFlashTimer -= dt;
      if (e.enrageShieldTimer > 0) e.enrageShieldTimer -= dt;
      if (e.speedModTimer > 0) {
        e.speedModTimer -= dt;
        if (e.speedModTimer <= 0) e.speedMod = 1.0;
      }

      const dx = pX - e.x;
      const dy = pY - e.y;
      const distSq = dx * dx + dy * dy;

      if (distSq > 0) {
        const dist = Math.sqrt(distSq);
        const currentSpeed = e.baseSpeed * (e.speedMod || 1.0);

        if (e.isBoss) {
          this.handleBossAI(e, dt, dist, dx, dy);
        } else {
          // Regular enemy movement & unique AI skills
          this.handleRegularEnemyAI(e, dt, dist, dx, dy);
        }

        // Contact damage with player
        if (dist < e.radius + pRadius) {
          this.game.hurtPlayer(e.contactDamage * dt);
        }
      }

      // Despawn non-boss enemies that drift far off-screen (Adaptive with map zoom)
      const zoom = (this.game && this.game.mapZoom) ? this.game.mapZoom : 1.0;
      const maxDespawnDist = Math.max(1300, 1000 / zoom + 200);
      if (distSq > (maxDespawnDist * maxDespawnDist) && !e.isBoss) {
        enemies.splice(i, 1);
      }
    }

    // 2. Update Enemy Projectiles
    for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
      const proj = this.enemyProjectiles[i];
      if (!proj) {
        this.enemyProjectiles.splice(i, 1);
        continue;
      }
      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;
      proj.life -= dt;

      // Check collision with player
      const pDist = Math.hypot(p.x - proj.x, p.y - proj.y);
      if (pDist < (proj.radius || 10) + pRadius) {
        this.game.hurtPlayer(proj.damage || 15);
        if (this.game.spells && this.game.spells.spawnImpactParticles) {
          this.game.spells.spawnImpactParticles(proj.x, proj.y, proj.color || '#ef4444', 6);
        }
        this.enemyProjectiles.splice(i, 1);
        continue;
      }

      // Check if projectile expired
      if (proj.life <= 0) {
        this.enemyProjectiles.splice(i, 1);
      }
    }

    // 3. Update Danger Telegraphs
    for (let i = this.dangerTelegraphs.length - 1; i >= 0; i--) {
      const t = this.dangerTelegraphs[i];
      if (!t) {
        this.dangerTelegraphs.splice(i, 1);
        continue;
      }
      t.timer -= dt;

      // Heavy Gravity pull effect towards telegraph center while warning is active
      if (t.isGravityPull) {
        const pDist = Math.hypot(p.x - t.x, p.y - t.y);
        if (pDist < t.radius + 150 && pDist > 4) {
          const pullSpeed = 110 * dt;
          p.x -= ((p.x - t.x) / pDist) * pullSpeed;
          p.y -= ((p.y - t.y) / pDist) * pullSpeed;
        }
      }

      // Hazard pools tick continuous damage while active
      if (t.type === 'hazard_pool') {
        t.duration -= dt;
        t.tickTimer = (t.tickTimer || 0) + dt;
        if (t.tickTimer >= 0.25) {
          t.tickTimer = 0;
          if (Math.hypot(p.x - t.x, p.y - t.y) < t.radius + pRadius) {
            this.game.hurtPlayer(t.damage);
          }
        }
        if (t.duration <= 0) {
          this.dangerTelegraphs.splice(i, 1);
        }
        continue;
      }

      // Timed warning triggers when timer reaches 0
      if (t.timer <= 0) {
        this.triggerTelegraph(t, p);
        this.dangerTelegraphs.splice(i, 1);
      }
    }
  }

  // Trigger telegraph danger zone after warning finishes
  triggerTelegraph(t, player) {
    if (t.type === 'circle') {
      const dist = Math.hypot(player.x - t.x, player.y - t.y);
      if (dist < t.radius) {
        this.game.hurtPlayer(t.damage);
        this.game.shakeScreen(7, 0.25);
      }
      if (this.game.spells && this.game.spells.spawnImpactParticles) {
        this.game.spells.spawnImpactParticles(t.x, t.y, t.color || '#ef4444', 16);
      }
      if (window.soundEngine && window.soundEngine.dimensionSlash) {
        window.soundEngine.dimensionSlash();
      }
    } else if (t.type === 'laser') {
      // Line / beam collision check
      const vx = Math.cos(t.angle);
      const vy = Math.sin(t.angle);
      const px = player.x - t.x;
      const py = player.y - t.y;
      const dot = px * vx + py * vy;
      if (t.damage > 0 && dot > 0 && dot < t.length) {
        const perpDist = Math.abs(px * vy - py * vx);
        if (perpDist < t.width / 2 + player.radius) {
          this.game.hurtPlayer(t.damage);
          this.game.shakeScreen(9, 0.35);
        }
      }
      if (t.damage > 0 && this.game.spells && this.game.spells.spawnImpactParticles) {
        this.game.spells.spawnImpactParticles(t.x + vx * 200, t.y + vy * 200, t.color || '#ef4444', 20);
      }
    } else if (t.type === 'shockwave_ring') {
      const dist = Math.hypot(player.x - t.x, player.y - t.y);
      if (Math.abs(dist - t.radius) < 28) {
        this.game.hurtPlayer(t.damage);
        this.game.shakeScreen(6, 0.2);
      }
      if (this.game.spells && this.game.spells.spawnImpactParticles) {
        this.game.spells.spawnImpactParticles(t.x, t.y, t.color || '#f59e0b', 12);
      }
    } else if (t.type === 'cone' || t.type === 'cleave_arc') {
      const dist = Math.hypot(player.x - t.x, player.y - t.y);
      if (dist < t.radius) {
        const ang = Math.atan2(player.y - t.y, player.x - t.x);
        let diff = Math.abs(ang - t.angle);
        while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);
        if (diff <= (t.arc || Math.PI * 0.45)) {
          this.game.hurtPlayer(t.damage);
          this.game.shakeScreen(7, 0.25);
          if (this.game.spells && this.game.spells.spawnImpactParticles) {
            this.game.spells.spawnImpactParticles(player.x, player.y, t.color || '#ef4444', 16);
          }
          if (window.soundEngine && window.soundEngine.slash) {
            window.soundEngine.slash();
          }
        }
      }
    }
  }

  // REGULAR ENEMY AI & SIGNATURE SKILLS
  handleRegularEnemyAI(e, dt, dist, dx, dy) {
    const currentSpeed = e.baseSpeed * (e.speedMod || 1.0);
    e.skillTimer = (e.skillTimer || 0) + dt;
    const cooldown = e.skillCooldown || 5.0;

    switch (e.type) {
      case 'armored_boar':
      case 'demon_charger': {
        const isBoar = (e.type === 'armored_boar');
        const cSpeed = isBoar ? 370 : 430;
        const cDmg = e.chargeDamage || (isBoar ? 32 : 55);

        // 1. Post-charge stun / recovery pause
        if (e.stunTimer > 0) {
          e.stunTimer -= dt;
          e.vx = 0;
          e.vy = 0;
          break;
        }

        // 2. Pre-charge windup (Stamping ground, aiming red telegraph lane)
        if (e.isPreCharging) {
          e.preChargeTimer -= dt;
          e.vx = 0;
          e.vy = 0;
          if (e.preChargeTimer <= 0) {
            e.isPreCharging = false;
            e.isCharging = true;
            e.chargeTimer = isBoar ? 0.55 : 0.65;
            e.chargeHasHit = false;
            if (window.soundEngine && window.soundEngine.enemyHit) {
              window.soundEngine.enemyHit();
            }
          }
          break;
        }

        // 3. High-speed Charge Rush (HÚC VÀ DAME TO!)
        if (e.isCharging) {
          e.chargeTimer -= dt;
          e.vx = Math.cos(e.chargeAngle) * cSpeed * (e.speedMod || 1.0);
          e.vy = Math.sin(e.chargeAngle) * cSpeed * (e.speedMod || 1.0);
          e.x += e.vx * dt;
          e.y += e.vy * dt;

          // Trail FX
          if (Math.random() < 0.35 && this.game.spells && this.game.spells.spawnImpactParticles) {
            this.game.spells.spawnImpactParticles(
              e.x - e.vx * 0.03,
              e.y - e.vy * 0.03,
              isBoar ? '#ea580c' : '#dc2626',
              2
            );
          }

          // Check direct charge ram collision with player
          const pDist = Math.hypot(dx, dy);
          if (pDist < (e.radius + this.game.player.radius + 6) && !e.chargeHasHit) {
            e.chargeHasHit = true;
            // DAME TO! Deals massive instant burst damage
            this.game.hurtPlayer(cDmg);
            this.game.shakeScreen(isBoar ? 8 : 12, 0.35);
            if (this.game.spells && this.game.spells.spawnImpactParticles) {
              this.game.spells.spawnImpactParticles(this.game.player.x, this.game.player.y, '#ef4444', 18);
            }
            if (window.soundEngine && window.soundEngine.dimensionSlash) {
              window.soundEngine.dimensionSlash();
            }
          }

          if (e.chargeTimer <= 0) {
            e.isCharging = false;
            e.stunTimer = isBoar ? 0.45 : 0.55;
            e.skillTimer = 0;
            e.skillCooldown = (isBoar ? 6.0 : 7.0) + Math.random() * 2.0;
          }
          break;
        }

        // 4. Regular Walking / Pursuit
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;

        // Trigger charge skill when cooldown ready and in optimal range
        if (e.skillTimer >= cooldown && dist > 110 && dist < (isBoar ? 380 : 450)) {
          e.skillTimer = 0;
          e.isPreCharging = true;
          e.preChargeTimer = isBoar ? 0.70 : 0.75;
          e.chargeAngle = Math.atan2(dy, dx);
          // Show red danger telegraph lane on ground pointing at player
          this.dangerTelegraphs.push({
            type: 'laser',
            x: e.x,
            y: e.y,
            angle: e.chargeAngle,
            width: isBoar ? 30 : 38,
            length: isBoar ? 280 : 350,
            timer: e.preChargeTimer,
            maxTimer: e.preChargeTimer,
            damage: 0, // Damage is applied on monster impact!
            color: isBoar ? '#ea580c' : '#dc2626',
            label: isBoar ? 'BEAST CHARGE' : 'DEMON RAM'
          });
        }
        break;
      }

      case 'bandit':
        // Bandit Melee Skill: Song Đao Lướt Trảm (Twin Daggers Cross-Slash)
        if (e.skillTimer > (e.skillCooldown || 4.2) && dist < 130) {
          e.skillTimer = 0;
          e.skillCooldown = 4.0 + Math.random() * 1.5;
          const slashAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'cleave_arc',
            x: e.x,
            y: e.y,
            angle: slashAng,
            radius: 65,
            arc: Math.PI * 0.38,
            timer: 0.42,
            maxTimer: 0.42,
            damage: Math.round(e.contactDamage * 1.8 + 8),
            color: '#ef4444',
            label: 'CROSS SLASH'
          });
          e.x += (dx / dist) * 20;
          e.y += (dy / dist) * 20;
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'cultist':
        // Cultist Melee Skill: Huyết Tế Trảm (Blood Scythe Melee Cleave)
        if (e.skillTimer > (e.skillCooldown || 4.8) && dist < 150) {
          e.skillTimer = 0;
          e.skillCooldown = 4.8 + Math.random() * 1.8;
          const slashAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'cleave_arc',
            x: e.x,
            y: e.y,
            angle: slashAng,
            radius: 80,
            arc: Math.PI * 0.45,
            timer: 0.5,
            maxTimer: 0.5,
            damage: Math.round(e.contactDamage * 2.2 + 12),
            color: '#e11d48',
            label: 'BLOOD CLEAVE'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'shadow_mage':
        // Shadow Mage Melee Skill: Hắc Ám Bộc Phá Cận Thân (Melee Shadow Nova Blast)
        if (e.skillTimer > (e.skillCooldown || 5.0) && dist < 145) {
          e.skillTimer = 0;
          e.skillCooldown = 5.0 + Math.random() * 2.0;
          this.dangerTelegraphs.push({
            type: 'circle',
            x: e.x,
            y: e.y,
            radius: 75,
            timer: 0.58,
            maxTimer: 0.58,
            damage: Math.round(e.contactDamage * 2.4 + 14),
            color: '#7c3aed',
            label: 'SHADOW NOVA'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'spade_soldier':
        // Spade Soldier Melee Skills: Shield Block + Halberd Melee Thrust
        if (e.skillTimer > 6.5) {
          e.skillTimer = 0;
          e.isShielding = true;
          e.shieldTimer = 1.5;
        }
        if (e.isShielding) {
          e.shieldTimer -= dt;
          if (e.shieldTimer <= 0) e.isShielding = false;
        }
        // Melee Halberd Thrust
        e.subSkillTimer = (e.subSkillTimer || 0) + dt;
        if (e.subSkillTimer > (e.subCooldown || 4.5) && dist < 135) {
          e.subSkillTimer = 0;
          e.subCooldown = 4.2 + Math.random() * 1.5;
          const thrustAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'laser',
            x: e.x,
            y: e.y,
            angle: thrustAng,
            width: 24,
            length: 115,
            timer: 0.46,
            maxTimer: 0.46,
            damage: Math.round(e.contactDamage * 2.0 + 12),
            color: '#4338ca',
            label: 'HALBERD THRUST'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'hellhound':
        // Hellhound Melee Skill: Song Đầu Ngoạm Xé (Hell Pounce & Dual Bite)
        if (e.skillTimer > (e.skillCooldown || 4.5) && dist > 70 && dist < 210) {
          e.skillTimer = 0;
          e.skillCooldown = 4.5 + Math.random() * 1.5;
          const pounceX = e.x + (dx / dist) * 55;
          const pounceY = e.y + (dy / dist) * 55;
          this.dangerTelegraphs.push({
            type: 'circle',
            x: pounceX,
            y: pounceY,
            radius: 48,
            timer: 0.38,
            maxTimer: 0.38,
            damage: Math.round(e.contactDamage * 1.9 + 10),
            color: '#ea580c',
            label: 'HELL BITE'
          });
          e.x = pounceX;
          e.y = pounceY;
          if (this.game.spells && this.game.spells.spawnImpactParticles) {
            this.game.spells.spawnImpactParticles(e.x, e.y, '#ea580c', 8);
          }
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'zombie':
        // Zombie Melee Skill: Hủ Độc Cuồng Trảo (Toxic Claw Swipe)
        if (e.skillTimer > (e.skillCooldown || 3.8) && dist < 100) {
          e.skillTimer = 0;
          e.skillCooldown = 3.8 + Math.random() * 1.5;
          const slashAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'cleave_arc',
            x: e.x,
            y: e.y,
            angle: slashAng,
            radius: 58,
            arc: Math.PI * 0.35,
            timer: 0.38,
            maxTimer: 0.38,
            damage: Math.round(e.contactDamage * 1.7 + 7),
            color: '#84cc16',
            label: 'POISON CLAW'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'bone_golem':
        // Bone Golem Melee Skill: Cự Phách Nện Đất (Titan Bone Ground Smash)
        if (e.skillTimer > (e.skillCooldown || 4.8) && dist < 140) {
          e.skillTimer = 0;
          e.skillCooldown = 5.0 + Math.random() * 1.8;
          const smashX = e.x + (dx / dist) * 35;
          const smashY = e.y + (dy / dist) * 35;
          this.dangerTelegraphs.push({
            type: 'circle',
            x: smashX,
            y: smashY,
            radius: 80,
            timer: 0.62,
            maxTimer: 0.62,
            damage: Math.round(e.contactDamage * 2.3 + 18),
            color: '#cbd5e1',
            label: 'BONE SMASH'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'lesser_devil':
        // Lesser Devil Melee Skill: Ác Ma Lướt Trảm (Demon Wing Dash & Talon Slash)
        if (e.skillTimer > (e.skillCooldown || 4.5) && dist > 90 && dist < 240) {
          e.skillTimer = 0;
          e.skillCooldown = 4.5 + Math.random() * 1.8;
          e.x += (dx / dist) * 65;
          e.y += (dy / dist) * 65;
          const slashAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'cleave_arc',
            x: e.x,
            y: e.y,
            angle: slashAng,
            radius: 65,
            arc: Math.PI * 0.42,
            timer: 0.36,
            maxTimer: 0.36,
            damage: Math.round(e.contactDamage * 2.0 + 14),
            color: '#9333ea',
            label: 'DEMON CLAW'
          });
          if (this.game.spells && this.game.spells.spawnImpactParticles) {
            this.game.spells.spawnImpactParticles(e.x, e.y, '#7c3aed', 8);
          }
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'high_devil':
        // High Devil Melee Skill: Hắc Hỏa Đại Trảm (Hellfire Greatsword Cleave)
        if (e.skillTimer > (e.skillCooldown || 4.5) && dist < 160) {
          e.skillTimer = 0;
          e.skillCooldown = 4.8 + Math.random() * 1.8;
          const slashAng = Math.atan2(dy, dx);
          this.dangerTelegraphs.push({
            type: 'cleave_arc',
            x: e.x,
            y: e.y,
            angle: slashAng,
            radius: 105,
            arc: Math.PI * 0.5,
            timer: 0.56,
            maxTimer: 0.56,
            damage: Math.round(e.contactDamage * 2.5 + 24),
            color: '#dc2626',
            label: 'HELLFIRE CLEAVE'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      default:
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;
    }
  }

  // BOSS AI & SIGNATURE MOVES WITH TELEGRAPH WARNINGS
  handleBossAI(boss, dt, dist, dx, dy) {
    // Phase 2: Boss Enrage Trigger at <= 40% Max HP
    if (!boss.isEnraged && boss.hp <= boss.maxHp * 0.4) {
      boss.isEnraged = true;
      boss.hp = Math.min(boss.maxHp, boss.hp + Math.round(boss.maxHp * 0.10)); // Hồi 10% maxHp
      boss.enrageShieldTimer = 1.2; // Khiên bất tử tạm thời 1.2s
      boss.baseSpeed *= 1.35; // Tăng 35% tốc độ di chuyển
      boss.contactDamage = Math.round(boss.contactDamage * 1.30); // Tăng 30% sát thương va chạm
      boss.radius = Math.round(boss.radius * 1.15); // Tăng 15% kích thước cơ thể

      // Phóng sóng xung kích đẩy lùi người chơi ra xa 140px nếu đứng gần trong 220px
      const p = this.game.player;
      if (p) {
        const pDist = Math.hypot(p.x - boss.x, p.y - boss.y);
        if (pDist < 220 && pDist > 0) {
          const kAng = Math.atan2(p.y - boss.y, p.x - boss.x);
          p.x += Math.cos(kAng) * 140;
          p.y += Math.sin(kAng) * 140;
        }
      }

      // Xóa sạch đạn của người chơi quanh Boss trong bán kính 180px
      if (this.game.spells && this.game.spells.projectiles) {
        for (let i = this.game.spells.projectiles.length - 1; i >= 0; i--) {
          const pr = this.game.spells.projectiles[i];
          if (Math.hypot(pr.x - boss.x, pr.y - boss.y) <= 180) {
            this.game.spells.projectiles.splice(i, 1);
          }
        }
      }

      // Rung màn hình mạnh, bắn 2 vòng shockwave đỏ-đen & hiện thông báo cuồng nộ
      this.game.shakeScreen(16, 0.5);
      if (this.game.spells && this.game.spells.spawnShockwave) {
        this.game.spells.spawnShockwave(boss.x, boss.y, '#dc2626', 380, 0.5);
        this.game.spells.spawnShockwave(boss.x, boss.y, '#09090b', 260, 0.4);
      }
      this.game.triggerComboBanner('👹 ' + boss.name + ' ĐÃ CUỒNG NỘ (100% MA LỰC ÁC QUỶ)!');
      if (window.soundEngine && window.soundEngine.bossAlert) {
        window.soundEngine.bossAlert();
      }
    }

    // Tăng tốc độ hồi chiêu gấp 1.6 lần khi Enraged
    const skillDt = boss.isEnraged ? dt * 1.6 : dt;
    boss.skillTimer = (boss.skillTimer || 0) + skillDt;
    boss.subSkillTimer = (boss.subSkillTimer || 0) + skillDt;

    // Thời gian chờ nổ của Danger Telegraphs giảm 25% khi Enraged (nổ nhanh hơn)
    const telSpeedMod = boss.isEnraged ? 0.75 : 1.0;

    switch (boss.type) {
      case 'boss_mars': {
        // Mars: Harpoon Charge & Mineral Shards (12 shards & 2 fire hazard pools khi Enraged)
        const marsCd = boss.isEnraged ? 4.8 : 7.5;
        if (boss.skillTimer > marsCd) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: boss.x,
            y: boss.y,
            radius: boss.isEnraged ? 145 : 110,
            timer: (boss.isEnraged ? 0.65 : 0.95) * telSpeedMod,
            maxTimer: (boss.isEnraged ? 0.65 : 0.95) * telSpeedMod,
            damage: boss.isEnraged ? 28 : 15,
            color: '#38bdf8',
            type: 'circle',
            label: 'CRYSTAL STOMP'
          });

          // Bắn 12 mảnh kim cương khi cuồng nộ (8 khi bình thường)
          const shardCount = boss.isEnraged ? 12 : 8;
          for (let k = 0; k < shardCount; k++) {
            const ang = (k / shardCount) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * (boss.isEnraged ? 270 : 210),
              vy: Math.sin(ang) * (boss.isEnraged ? 270 : 210),
              radius: 7,
              damage: boss.isEnraged ? 24 : 16,
              color: '#38bdf8',
              life: 2.6,
              type: 'diamond_shard'
            });
          }

          // Để lại 2 vùng lửa trên đường lướt khi Cuồng Nộ
          if (boss.isEnraged) {
            for (let f = 0; f < 2; f++) {
              const rOffset = (f + 1) * 45;
              this.dangerTelegraphs.push({
                x: boss.x - (dx / dist) * rOffset,
                y: boss.y - (dy / dist) * rOffset,
                radius: 38,
                duration: 3.5,
                damage: 10,
                color: '#f97316',
                type: 'hazard_pool'
              });
            }
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_vetto': {
        // Skill 1: Despair Roar (bán kính mở rộng lên 230px khi Enraged)
        if (boss.skillTimer > 4.8) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: boss.x,
            y: boss.y,
            radius: boss.isEnraged ? 230 : 175,
            timer: 0.65 * telSpeedMod,
            maxTimer: 0.65 * telSpeedMod,
            damage: boss.isEnraged ? 32 : 22,
            color: '#dc2626',
            type: 'circle',
            label: 'DESPAIR ROAR'
          });
          this.game.shakeScreen(boss.isEnraged ? 10 : 7, 0.32);
        }
        // Skill 2: Beast Claws (5 luồng trảo đỏ hình quạt khi Enraged thay vì 3)
        if (boss.subSkillTimer > 3.8) {
          boss.subSkillTimer = 0;
          const baseAng = Math.atan2(dy, dx);
          const clawOffsets = boss.isEnraged ? [-0.4, -0.2, 0, 0.2, 0.4] : [-0.25, 0, 0.25];
          clawOffsets.forEach(offset => {
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(baseAng + offset) * (boss.isEnraged ? 280 : 240),
              vy: Math.sin(baseAng + offset) * (boss.isEnraged ? 280 : 240),
              radius: 9,
              damage: boss.isEnraged ? 30 : 24,
              color: '#ef4444',
              life: 2.5,
              type: 'beast_claw'
            });
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_patri': {
        // Skill 1: JUDGMENT (Triệu hồi 10 vòng sáng khi Enraged thay vì 6)
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          const p = this.game.player;
          const count = boss.isEnraged ? 10 : 6;
          for (let k = 0; k < count; k++) {
            const ang = (k / count) * Math.PI * 2;
            const r = 40 + (k % 2) * 55;
            this.dangerTelegraphs.push({
              x: p.x + Math.cos(ang) * r,
              y: p.y + Math.sin(ang) * r,
              radius: 40,
              timer: (0.75 + (k * 0.06)) * telSpeedMod,
              maxTimer: (0.75 + (k * 0.06)) * telSpeedMod,
              damage: boss.isEnraged ? 34 : 28,
              color: '#facc15',
              type: 'circle',
              label: 'JUDGMENT'
            });
          }
        }
        // Skill 2: Light-Speed Teleport & Burst (8 tia light_ray tốc độ 320 khi Enraged)
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          const a = Math.random() * Math.PI * 2;
          boss.x = this.game.player.x + Math.cos(a) * 160;
          boss.y = this.game.player.y + Math.sin(a) * 160;
          const rayCount = boss.isEnraged ? 8 : 4;
          const raySpd = boss.isEnraged ? 320 : 260;
          for (let k = 0; k < rayCount; k++) {
            const ang = (k / rayCount) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * raySpd,
              vy: Math.sin(ang) * raySpd,
              radius: 7,
              damage: boss.isEnraged ? 28 : 22,
              color: '#fde047',
              life: 2.2,
              type: 'light_ray'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_zenon': {
        // Skill 1: BONE FOREST (8 gai xương bao vây chữ thập + đường chéo khi Enraged)
        if (boss.skillTimer > 4.5) {
          boss.skillTimer = 0;
          const p = this.game.player;
          const offsets = boss.isEnraged ? [
            {x: -75, y: 0}, {x: 75, y: 0}, {x: 0, y: -75}, {x: 0, y: 75},
            {x: -55, y: -55}, {x: 55, y: -55}, {x: -55, y: 55}, {x: 55, y: 55}
          ] : [
            {x: -60, y: -60}, {x: 60, y: -60}, {x: -60, y: 60}, {x: 60, y: 60}
          ];
          offsets.forEach(offset => {
            this.dangerTelegraphs.push({
              x: p.x + offset.x,
              y: p.y + offset.y,
              radius: 42,
              timer: (boss.isEnraged ? 0.6 : 0.8) * telSpeedMod,
              maxTimer: (boss.isEnraged ? 0.6 : 0.8) * telSpeedMod,
              damage: boss.isEnraged ? 35 : 30,
              color: '#e2e8f0',
              type: 'circle',
              label: 'BONE FOREST'
            });
          });
        }
        // Skill 2: Spatial Distortion Cubes (6 khối lập phương không gian khi Enraged)
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          const cubeCount = boss.isEnraged ? 6 : 4;
          for (let k = 0; k < cubeCount; k++) {
            const ang = (k / cubeCount) * Math.PI * 2 + Math.random() * 0.4;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * (boss.isEnraged ? 240 : 200),
              vy: Math.sin(ang) * (boss.isEnraged ? 240 : 200),
              radius: 9,
              damage: boss.isEnraged ? 32 : 26,
              color: '#7c3aed',
              life: 3.2,
              type: 'spatial_cube'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_vanica': {
        // Skill 1: Blood Curse Pools (5 hồ máu nguyền rủa khi Enraged)
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          const p = this.game.player;
          const poolCount = boss.isEnraged ? 5 : 3;
          for (let k = 0; k < poolCount; k++) {
            this.dangerTelegraphs.push({
              x: p.x + (Math.random() - 0.5) * 160,
              y: p.y + (Math.random() - 0.5) * 160,
              radius: 38,
              duration: 3.8,
              damage: boss.isEnraged ? 11 : 8,
              color: '#e11d48',
              type: 'hazard_pool'
            });
          }
        }
        // Skill 2: Blood Thorns Spiral (16 gai máu xoáy ốc khi Enraged)
        if (boss.subSkillTimer > 5.0) {
          boss.subSkillTimer = 0;
          const thornCount = boss.isEnraged ? 16 : 10;
          for (let k = 0; k < thornCount; k++) {
            const ang = (k / thornCount) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * (boss.isEnraged ? 220 : 190),
              vy: Math.sin(ang) * (boss.isEnraged ? 220 : 190),
              radius: 6,
              damage: boss.isEnraged ? 26 : 22,
              color: '#be123c',
              life: 3.0,
              type: 'blood_thorn'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_dante': {
        // Dante: HEAVY GRAVITY (165px + Lực hút Trọng Lực kéo người chơi về tâm khi Enraged)
        if (boss.skillTimer > 4.5) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: boss.isEnraged ? 165 : 120,
            timer: (boss.isEnraged ? 0.72 : 0.95) * telSpeedMod,
            maxTimer: (boss.isEnraged ? 0.72 : 0.95) * telSpeedMod,
            damage: boss.isEnraged ? 45 : 35,
            color: '#7f1d1d',
            type: 'circle',
            label: 'HEAVY GRAVITY',
            isGravityPull: !!boss.isEnraged
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_zagred': {
        // Zagred: Word Soul (3 vùng nổ liên hoàn quanh người chơi khi Enraged)
        if (boss.skillTimer > 3.8) {
          boss.skillTimer = 0;
          const p = this.game.player;
          const zones = boss.isEnraged ? [ {ox: 0, oy: 0}, {ox: -70, oy: 50}, {ox: 70, oy: -50} ] : [ {ox: 0, oy: 0} ];
          zones.forEach((z, zidx) => {
            this.dangerTelegraphs.push({
              x: p.x + z.ox,
              y: p.y + z.oy,
              radius: 95,
              timer: ((boss.isEnraged ? 0.62 : 0.85) + zidx * 0.15) * telSpeedMod,
              maxTimer: ((boss.isEnraged ? 0.62 : 0.85) + zidx * 0.15) * telSpeedMod,
              damage: boss.isEnraged ? 45 : 38,
              color: '#881337',
              type: 'circle',
              label: 'WORD SOUL: DIE'
            });
          });

          // Also spawn 2 lesser devil minions with balanced HP
          const minionHp = Math.max(1000, Math.round(140 * this.getBalancedHpMultiplier(this.game.gameTime || 0, false)));
          for (let k = 0; k < 2; k++) {
            this.spawnEnemyAt(boss.x + (Math.random() - 0.5) * 80, boss.y + (Math.random() - 0.5) * 80, 'lesser_devil', minionHp, 115, 22, 25);
          }
        }
        // Underworld Spears barrage (9 mũi thương Minh Giới khi Enraged)
        if (boss.subSkillTimer > 4.8) {
          boss.subSkillTimer = 0;
          const ang = Math.atan2(dy, dx);
          const spearOffsets = boss.isEnraged ? [-0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4] : [-0.3, -0.15, 0, 0.15, 0.3];
          spearOffsets.forEach(offset => {
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang + offset) * (boss.isEnraged ? 270 : 230),
              vy: Math.sin(ang + offset) * (boss.isEnraged ? 270 : 230),
              radius: 8,
              damage: boss.isEnraged ? 34 : 28,
              color: '#9f1239',
              life: 3.5,
              type: 'word_spear'
            });
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      case 'boss_lucifero': {
        // Lucifero: ABSOLUTE GRAVITY & 5 Concentric Shockwave Rings
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: boss.isEnraged ? 180 : 145,
            timer: (boss.isEnraged ? 0.75 : 1.0) * telSpeedMod,
            maxTimer: (boss.isEnraged ? 0.75 : 1.0) * telSpeedMod,
            damage: boss.isEnraged ? 55 : 45,
            color: '#450a0a',
            type: 'circle',
            label: 'ABSOLUTE GRAVITY',
            isGravityPull: !!boss.isEnraged
          });
        }
        // 5 vòng sóng chấn động đồng tâm liên tiếp khi Enraged (3 khi bình thường)
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          const shockRings = boss.isEnraged ? [80, 140, 200, 260, 320] : [100, 180, 260];
          shockRings.forEach((r, idx) => {
            this.dangerTelegraphs.push({
              x: boss.x,
              y: boss.y,
              radius: r,
              timer: ((boss.isEnraged ? 0.45 : 0.6) + idx * (boss.isEnraged ? 0.2 : 0.25)) * telSpeedMod,
              maxTimer: ((boss.isEnraged ? 0.45 : 0.6) + idx * (boss.isEnraged ? 0.2 : 0.25)) * telSpeedMod,
              damage: boss.isEnraged ? 40 : 32,
              color: '#b91c1c',
              type: 'shockwave_ring'
            });
          });
        }
        // Trọng Lực Ma Vương: Giảm 20% tốc độ chạy của người chơi khi ở gần (< 380px)
        if (boss.isEnraged && dist < 380 && this.game.player) {
          this.game.player.gravitySlowTimer = 0.25;
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
      }

      default:
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;
    }
  }

  // Draw danger telegraph warning zones on the ground under entities
  drawTelegraphs(ctx) {
    if (!this.dangerTelegraphs || this.dangerTelegraphs.length === 0) return;

    ctx.save();
    for (const t of this.dangerTelegraphs) {
      if (t.type === 'hazard_pool') {
        // Lingering hazard pool
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.35 + Math.sin(Date.now() * 0.008) * 0.12;
        ctx.fill();
        ctx.strokeStyle = t.color || '#ef4444';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
        continue;
      }

      const progress = Math.max(0, Math.min(1, 1 - (t.timer / (t.maxTimer || 1))));

      if (t.type === 'circle') {
        // Red / Crimson circular warning zone
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.15 + progress * 0.25;
        ctx.fill();

        // Expanding fill circle showing danger timing
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * progress, 0, Math.PI * 2);
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.3 + progress * 0.35;
        ctx.fill();

        // Warning Border
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.strokeStyle = t.color || '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.85;
        ctx.stroke();

        // Danger Label / Alert Icon
        if (t.label) {
          ctx.font = '900 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.9;
          ctx.fillText(`⚠️ ${t.label}`, t.x, t.y);
        }
      } else if (t.type === 'laser') {
        // Rectangular line / laser beam telegraph
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle);
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.18 + progress * 0.32;
        ctx.fillRect(0, -t.width / 2, t.length, t.width);

        ctx.strokeStyle = t.color || '#ef4444';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.strokeRect(0, -t.width / 2, t.length, t.width);

        // Animated charging chevron arrows pointing in charge direction
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.45 + Math.sin(Date.now() * 0.012) * 0.3;
        for (let ax = 35; ax < t.length - 20; ax += 50) {
          ctx.beginPath();
          ctx.moveTo(ax - 9, -t.width * 0.3);
          ctx.lineTo(ax, 0);
          ctx.lineTo(ax - 9, t.width * 0.3);
          ctx.stroke();
        }

        if (t.label) {
          ctx.font = '900 11px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.95;
          ctx.fillText(`⚠️ ${t.label}`, t.length * 0.45, 0);
        }
        ctx.restore();
      } else if (t.type === 'shockwave_ring') {
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * progress, 0, Math.PI * 2);
        ctx.strokeStyle = t.color || '#f59e0b';
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.75 * (1 - progress * 0.4);
        ctx.stroke();
      } else if (t.type === 'cone' || t.type === 'cleave_arc') {
        const halfArc = (t.arc || Math.PI * 0.45);
        ctx.save();
        ctx.translate(t.x, t.y);

        // Base fan arc
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, t.radius, t.angle - halfArc, t.angle + halfArc);
        ctx.closePath();
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.15 + progress * 0.22;
        ctx.fill();

        // Expanding fill showing charge progress
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, t.radius * progress, t.angle - halfArc, t.angle + halfArc);
        ctx.closePath();
        ctx.fillStyle = t.color || '#ef4444';
        ctx.globalAlpha = 0.3 + progress * 0.35;
        ctx.fill();

        // Border
        ctx.strokeStyle = t.color || '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.85;
        ctx.stroke();

        // Melee slash label
        if (t.label) {
          ctx.font = '900 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.95;
          const lx = Math.cos(t.angle) * (t.radius * 0.55);
          const ly = Math.sin(t.angle) * (t.radius * 0.55);
          ctx.fillText(`⚔️ ${t.label}`, lx, ly);
        }
        ctx.restore();
      }
    }
    ctx.restore();
  }

  // Draw active enemy projectiles in the air
  drawProjectiles(ctx) {
    if (!this.enemyProjectiles || this.enemyProjectiles.length === 0) return;

    ctx.save();
    for (const proj of this.enemyProjectiles) {
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
      ctx.fillStyle = proj.color || '#ef4444';
      ctx.shadowColor = proj.color || '#ef4444';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Inner glowing core
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, proj.radius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
    ctx.restore();
  }

  // Regular enemy spawn selector based on map and time (Vampire Survivors Balanced Curve)
  spawnRegularEnemy(gameTime) {
    const pos = this.getSpawnPositionOffscreen();
    const mapId = this.game.selectedMapId || 'clover_plains';

    let type = 'bandit';
    let baseHp = 48;
    let speed = 75;
    let contactDmg = 6;
    let expVal = 2;

    const endlessMult = gameTime > 1800 ? (1 + (gameTime - 1800) * 0.003) : 1.0;

    if (mapId === 'underworld_palace') {
      // MAP 2: ĐẠI MA CUNG MINH GIỚI
      if (gameTime < 120) {
        // Phút 0 - 2: Hellhound & Bone Golem
        type = Math.random() < 0.75 ? 'hellhound' : 'bone_golem';
        baseHp = 48;
        expVal = 2;
        speed = 80 + Math.random() * 12;
        contactDmg = 6;
      } else if (gameTime < 300) {
        // Phút 2 - 5: Demon Charger, Shadow Mage, Bone Golem
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'shadow_mage' : (r < 0.85 ? 'bone_golem' : 'hellhound'));
        baseHp = 85;
        expVal = 3;
        speed = 78 + Math.random() * 12;
        contactDmg = 11;
      } else if (gameTime < 600) {
        // Phút 5 - 10: Shadow Mage, Bone Golem & Demon Charger
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'shadow_mage' : (r < 0.85 ? 'bone_golem' : 'hellhound'));
        baseHp = 140;
        expVal = 5;
        speed = 82 + Math.random() * 14;
        contactDmg = 15;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'lesser_devil' : 'high_devil');
        baseHp = 220;
        expVal = 8;
        speed = 96 + Math.random() * 16;
        contactDmg = 20;
      } else if (gameTime < 1320) {
        // Phút 15 - 22: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.7 ? 'lesser_devil' : 'high_devil');
        baseHp = 340;
        expVal = 12;
        speed = 104 + Math.random() * 16;
        contactDmg = 25;
      } else {
        // Phút 22 - 30: High Devil Legion & Demon Charger
        type = Math.random() < 0.35 ? 'demon_charger' : 'high_devil';
        baseHp = 500;
        expVal = 18;
        speed = 112 + Math.random() * 18;
        contactDmg = 30;
      }
    } else {
      // MAP 1: VƯƠNG QUỐC CLOVER
      if (gameTime < 120) {
        // Phút 0 - 2: Bandit, Zombie & Armored Boar
        type = Math.random() < 0.65 ? 'bandit' : 'zombie';
        baseHp = 48;
        expVal = 2;
        speed = 70 + Math.random() * 12;
        contactDmg = 5;
      } else if (gameTime < 300) {
        // Phút 2 - 5: Cultist, Armored Boar, Zombie & Bandit
        const r = Math.random();
        type = r < 0.35 ? 'armored_boar' : (r < 0.6 ? 'cultist' : (r < 0.8 ? 'zombie' : 'bandit'));
        baseHp = 85;
        expVal = 3;
        speed = 74 + Math.random() * 12;
        contactDmg = 9;
      } else if (gameTime < 600) {
        // Phút 5 - 10: Zombie, Armored Boar, Cultist & Spade Soldier
        const r = Math.random();
        type = r < 0.35 ? 'armored_boar' : (r < 0.6 ? 'spade_soldier' : (r < 0.8 ? 'zombie' : 'cultist'));
        baseHp = 140;
        expVal = 5;
        speed = 80 + Math.random() * 14;
        contactDmg = 14;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Spade Soldier, Demon Charger & Lesser Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'spade_soldier' : 'lesser_devil');
        baseHp = 220;
        expVal = 8;
        speed = 92 + Math.random() * 15;
        contactDmg = 19;
      } else if (gameTime < 1320) {
        // Phút 15 - 22: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'lesser_devil' : 'high_devil');
        baseHp = 340;
        expVal = 12;
        speed = 100 + Math.random() * 16;
        contactDmg = 24;
      } else {
        // Phút 22 - 30: High Devil Legion & Demon Charger
        type = Math.random() < 0.35 ? 'demon_charger' : 'high_devil';
        baseHp = 500;
        expVal = 18;
        speed = 110 + Math.random() * 18;
        contactDmg = 29;
      }
    }

    const hpMult = this.getBalancedHpMultiplier(gameTime, false);
    let hp = Math.round(baseHp * hpMult * endlessMult);

    const diffKey = this.game.selectedDifficulty || 'normal';
    const diffMod = (typeof MAP_DIFFICULTIES !== 'undefined' ? MAP_DIFFICULTIES[diffKey] : null) || (window.MAP_DIFFICULTIES && window.MAP_DIFFICULTIES[diffKey]) || { hpMult: 1, bossHpMult: 1, dmgMult: 1, speedMult: 1, rewardMult: 1 };

    hp = Math.round(hp * diffMod.hpMult);
    speed = Math.round(speed * diffMod.speedMult);
    contactDmg = Math.round(contactDmg * diffMod.dmgMult);
    expVal = Math.round(expVal * diffMod.rewardMult);

    this.spawnEnemyAt(pos.x, pos.y, type, hp, speed, contactDmg, expVal);
  }

  spawnEnemyAt(x, y, type, hp, speed, contactDmg, expVal) {
    const isCharger = (type === 'armored_boar' || type === 'demon_charger');
    const radius = type.startsWith('boss_') ? 35 : (
      type === 'demon_charger' ? 20 : (
        type === 'armored_boar' ? 18 : (
          type === 'bone_golem' ? 19 : (
            type === 'high_devil' ? 17 : (
              type === 'lesser_devil' ? 15 : 13
            )
          )
        )
      )
    );
    const enemy = {
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      type: type,
      maxHp: hp,
      hp: hp,
      baseSpeed: speed,
      speedMod: 1.0,
      speedModTimer: 0,
      contactDamage: contactDmg,
      expValue: expVal,
      radius: radius,
      hitFlashTimer: 0,
      skillTimer: Math.random() * 2.5,
      skillCooldown: isCharger ? (5.5 + Math.random() * 2.0) : (4.0 + Math.random() * 1.6),
      isDead: false,
      isBoss: type.startsWith('boss_'),
      isEnraged: false,
      enrageShieldTimer: 0,
      // Dedicated Charging Mechanics (Chiêu húc & Dame to)
      isCharger: isCharger,
      isPreCharging: false,
      preChargeTimer: 0,
      isCharging: false,
      chargeTimer: 0,
      stunTimer: 0,
      chargeAngle: 0,
      chargeHasHit: false,
      chargeDamage: isCharger ? (type === 'demon_charger' ? Math.round(contactDmg * 2.6 + 22) : Math.round(contactDmg * 2.3 + 14)) : 0
    };
    this.game.enemies.push(enemy);
    return enemy;
  }

      checkBossSpawns(gameTime) {
    const mapId = this.game.selectedMapId || 'clover_plains';

    if (mapId === 'underworld_palace') {
      // Phút 3 (180s): Vanica Warmup (Base per Lv: 450 HP -> Ở Lv 15 đạt ~6,750 HP)
      if (gameTime >= 180 && !this.activeBossesSpawned.has('boss_vanica')) {
        this.activeBossesSpawned.add('boss_vanica');
        this.spawnBoss('boss_vanica', 'VANICA & MEGICULA (Huyết Ma Pháp)', 2800, 105, 30, 80);
      }
      // Phút 6 (360s): Zenon Warmup (Base per Lv: 900 HP -> Ở Lv 25 đạt ~22,500 HP)
      if (gameTime >= 360 && !this.activeBossesSpawned.has('boss_zenon')) {
        this.activeBossesSpawned.add('boss_zenon');
        this.spawnBoss('boss_zenon', 'ZENON ZOGRATIS (Xương & Không Gian)', 5500, 100, 36, 180);
      }
      // PHÚT 10 (600s) - BOSS NHỎ 1: Dante (Base per Lv: 1,650 HP -> Ở Lv 40 đạt ~66,000 HP - Rơi Rương Tiến Hóa!)
      if (gameTime >= 600 && !this.activeBossesSpawned.has('boss_dante_10')) {
        this.activeBossesSpawned.add('boss_dante_10');
        const b = this.spawnBoss('boss_dante', '⚠️ BOSS NHỎ PHÚT 10: DANTE & LUCIFERO (Trọng Lực Tuyệt Đối)', 11000, 115, 46, 400);
        if (b) b.isMiniBoss10 = true;
      }
      // Phút 15 (900s): Megicula Thức Tỉnh (Base per Lv: 2,550 HP -> Ở Lv 52 đạt ~132,600 HP)
      if (gameTime >= 900 && !this.activeBossesSpawned.has('boss_megicula_15')) {
        this.activeBossesSpawned.add('boss_megicula_15');
        this.spawnBoss('boss_vanica', 'MEGICULA THỨC TỈNH TOÀN DIỆN (Huyết Chú Ma Vương)', 20000, 110, 55, 650);
      }
      // PHÚT 20 (1200s) - BOSS NHỎ 2: Moris Á Ma (Base per Lv: 3,700 HP -> Ở Lv 68 đạt ~251,600 HP - Mở khóa Siêu Tiến Hóa Tier 3)
      if (gameTime >= 1200 && !this.activeBossesSpawned.has('boss_moris_20')) {
        this.activeBossesSpawned.add('boss_moris_20');
        const b = this.spawnBoss('boss_zenon', '⚠️ BOSS NHỎ PHÚT 20: MORIS Á MA HỢP THỂ (Cấu Trúc Ma Vương)', 35000, 105, 62, 1000);
        if (b) b.isMiniBoss20 = true;
      }
      // Phút 25 (1500s): Song Ma Tối Cao Naamah & Lilith (Base per Lv: 4,900 HP -> Ở Lv 82 đạt ~401,800 HP)
      if (gameTime >= 1500 && !this.activeBossesSpawned.has('boss_elite_25')) {
        this.activeBossesSpawned.add('boss_elite_25');
        this.spawnBoss('boss_dante', 'SONG MA ĐẠO TỐI CAO: NAAMAH & LILITH', 55000, 118, 72, 1500);
      }
      // PHÚT 30 (1800s) - ĐẠI BOSS CUỐI: Lucifero (Base per Lv: 7,000 HP -> Ở Lv 95-100 đạt ~665,000 - 700,000 HP)
      if (gameTime >= 1800 && !this.activeBossesSpawned.has('boss_lucifero_30')) {
        this.activeBossesSpawned.add('boss_lucifero_30');
        const b = this.spawnBoss('boss_lucifero', '👑 ĐẠI BOSS CUỐI PHÚT 30: MINH GIỚI TỐI CAO MA VƯƠNG LUCIFERO', 90000, 85, 82, 3000);
        if (b) b.isFinalBoss = true;
      }
    } else {
      // MAP 1: VƯƠNG QUỐC CLOVER (Cân bằng chuẩn Vampire Survivors, diệt Boss đã tay)
      // Phút 3 (180s): Mars (Base per Lv: 380 HP -> Ở Lv 15 đạt ~5,700 HP)
      if (gameTime >= 180 && !this.activeBossesSpawned.has('boss_mars')) {
        this.activeBossesSpawned.add('boss_mars');
        this.spawnBoss('boss_mars', 'MARS (Khoáng Thạch Ma Pháp)', 2800, 62, 25, 60);
      }
      // Phút 6 (360s): Vetto (Base per Lv: 770 HP -> Ở Lv 25 đạt ~19,250 HP)
      if (gameTime >= 360 && !this.activeBossesSpawned.has('boss_vetto')) {
        this.activeBossesSpawned.add('boss_vetto');
        this.spawnBoss('boss_vetto', 'VETTO (Thú Ma Pháp Tuyệt Vọng)', 5500, 100, 32, 140);
      }
      // PHÚT 10 (600s) - BOSS NHỎ 1: Patri (Base per Lv: 1,400 HP -> Ở Lv 35-45 đạt ~49,000 - 63,000 HP - Rơi Rương Tiến Hóa!)
      if (gameTime >= 600 && !this.activeBossesSpawned.has('boss_patri_10')) {
        this.activeBossesSpawned.add('boss_patri_10');
        const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 10: PATRI (Ánh Sáng Phán Xét & Thần Tốc)', 11000, 118, 42, 300);
        if (b) b.isMiniBoss10 = true;
      }
      // Phút 15 (900s): Vetto Thức Tỉnh Ma Nhãn (Base per Lv: 2,050 HP -> Ở Lv 50 đạt ~102,500 HP - Thử sức vũ khí Tiến Hóa Tier 2)
      if (gameTime >= 900 && !this.activeBossesSpawned.has('boss_vetto_15')) {
        this.activeBossesSpawned.add('boss_vetto_15');
        this.spawnBoss('boss_vetto', 'VETTO THỨC TỈNH MA NHÃN (Tuyệt Vọng Ma Thú)', 20000, 105, 50, 500);
      }
      // PHÚT 20 (1200s) - BOSS NHỎ 2: Ma Thần Cổ Đại (Base per Lv: 3,100 HP -> Ở Lv 65 đạt ~201,500 HP - Mở khóa Siêu Tiến Hóa Tier 3)
      if (gameTime >= 1200 && !this.activeBossesSpawned.has('boss_demon_god_20')) {
        this.activeBossesSpawned.add('boss_demon_god_20');
        const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 20: MA THẦN CỔ ĐẠI (Ancient Demon God)', 35000, 90, 60, 800);
        if (b) b.isMiniBoss20 = true;
      }
      // Phút 25 (1500s): Hắc Yêu Tinh Quang Kiếm (Base per Lv: 4,100 HP -> Ở Lv 80 đạt ~328,000 HP - Cần Siêu Tiến Hóa dồn sát thương)
      if (gameTime >= 1500 && !this.activeBossesSpawned.has('boss_dark_elf_25')) {
        this.activeBossesSpawned.add('boss_dark_elf_25');
        this.spawnBoss('boss_mars', 'HẮC YÊU TINH QUANG KIẾM CỰC HẠN', 55000, 115, 68, 1200);
      }
      // PHÚT 30 (1800s) - ĐẠI BOSS CUỐI: Zagred (Base per Lv: 5,800 HP -> Ở Lv 90-100 đạt ~522,000 - 580,000 HP)
      if (gameTime >= 1800 && !this.activeBossesSpawned.has('boss_zagred_30')) {
        this.activeBossesSpawned.add('boss_zagred_30');
        const b = this.spawnBoss('boss_zagred', '👑 ĐẠI BOSS CUỐI PHÚT 30: ÁC QUỶ MINH GIỚI ZAGRED', 90000, 78, 75, 3000);
        if (b) b.isFinalBoss = true;
      }
    }

  // Bosses in Endless Mode (Sau 30 phút nếu người chơi chọn tiếp tục chơi)
    if (this.game.isEndlessMode || gameTime > 1860) {
      const endlessStep = Math.floor((gameTime - 1800) / 240);
      const endlessKey = `endless_supreme_${endlessStep}`;
      if (endlessStep > 0 && !this.activeBossesSpawned.has(endlessKey)) {
        this.activeBossesSpawned.add(endlessKey);
        const bType = mapId === 'underworld_palace' ? 'boss_lucifero' : 'boss_zagred';
        const bName = `CHÚA TỂ HẮC ÁM VÔ TẬN TẦNG ${endlessStep} (HP BẤT TỬ)`;
        this.spawnBoss(bType, bName, 4000 + endlessStep * 1200, 100, 50, 150000);
      }
    }
  }

  spawnBoss(type, name, baseHp, speed, contactDmg, expVal) {
    const diffKey = this.game.selectedDifficulty || 'normal';
    const diffMod = (typeof MAP_DIFFICULTIES !== 'undefined' ? MAP_DIFFICULTIES[diffKey] : null) || (window.MAP_DIFFICULTIES && window.MAP_DIFFICULTIES[diffKey]) || { hpMult: 1, bossHpMult: 1, dmgMult: 1, speedMult: 1, rewardMult: 1 };

    const vsHpMult = this.getBalancedHpMultiplier(this.game.gameTime || 0, true);
    const scaledHp = Math.round(baseHp * vsHpMult * diffMod.bossHpMult);
    const scaledSpeed = Math.round(speed * diffMod.speedMult);
    const scaledDmg = Math.round(contactDmg * diffMod.dmgMult);
    const scaledExp = Math.round(expVal * diffMod.rewardMult);
    const diffTag = diffKey !== 'normal' ? ` [${diffMod.name.toUpperCase()}]` : '';

    const pos = this.getSpawnPositionOffscreen();
    const boss = this.spawnEnemyAt(pos.x, pos.y, type, scaledHp, scaledSpeed, scaledDmg, scaledExp);
    boss.name = name + diffTag;
    boss.isBoss = true;
    this.bossActive = boss;

    if (window.soundEngine && window.soundEngine.bossAlert) {
      window.soundEngine.bossAlert();
    }
    this.game.showBossBanner(boss.name);
    return boss;
  }

  getSpawnPositionOffscreen() {
    const p = this.game.player;
    const a = Math.random() * Math.PI * 2;
    const zoom = (this.game && this.game.mapZoom) ? this.game.mapZoom : 1.0;
    const baseDist = Math.max(740, (this.game.canvas ? Math.max(this.game.canvas.width, this.game.canvas.height) / (2 * zoom) : 740) + 80);
    const dist = baseDist + Math.random() * 120;
    return {
      x: p.x + Math.cos(a) * dist,
      y: p.y + Math.sin(a) * dist
    };
  }
}

window.EnemyManager = EnemyManager;
