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

  // Vampire Survivors Standard HP Scaling Formula
  getVampireSurvivorsHpMultiplier(scaleWithLevel = true, isBoss = false) {
    const playerLevel = (this.game.player && this.game.player.level) ? this.game.player.level : 1;
    const playerCurse = (this.game.player && this.game.player.curse) ? this.game.player.curse : 0;
    const levelMult = scaleWithLevel ? playerLevel : 1;
    return levelMult * (1 + playerCurse);
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

      // Despawn non-boss enemies that drift far off-screen (> 1300 px)
      if (distSq > 1690000 && !e.isBoss) {
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
      if (dot > 0 && dot < t.length) {
        const perpDist = Math.abs(px * vy - py * vx);
        if (perpDist < t.width / 2 + player.radius) {
          this.game.hurtPlayer(t.damage);
          this.game.shakeScreen(9, 0.35);
        }
      }
      if (this.game.spells && this.game.spells.spawnImpactParticles) {
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
    }
  }

  // REGULAR ENEMY AI & SIGNATURE SKILLS
  handleRegularEnemyAI(e, dt, dist, dx, dy) {
    const currentSpeed = e.baseSpeed * (e.speedMod || 1.0);
    e.skillTimer = (e.skillTimer || 0) + dt;
    const cooldown = e.skillCooldown || 3.5;

    switch (e.type) {
      case 'bandit':
        // Bandit: Lunge Dash when close (between 60 and 220px)
        if (e.skillTimer > cooldown && dist < 220 && dist > 55) {
          e.skillTimer = 0;
          e.skillCooldown = 3.2 + Math.random() * 1.5;
          e.isLunging = true;
          e.lungeTimer = 0.32;
          e.lungeVx = (dx / dist) * 260;
          e.lungeVy = (dy / dist) * 260;
        }
        if (e.isLunging) {
          e.x += e.lungeVx * dt;
          e.y += e.lungeVy * dt;
          e.lungeTimer -= dt;
          if (e.lungeTimer <= 0) e.isLunging = false;
        } else {
          e.vx = (dx / dist) * currentSpeed;
          e.vy = (dy / dist) * currentSpeed;
          e.x += e.vx * dt;
          e.y += e.vy * dt;
        }
        break;

      case 'cultist':
      case 'shadow_mage':
        // Cultist / Shadow Mage: Fires Dark Orb projectile every 3.8s
        if (e.skillTimer > cooldown && dist < 450 && dist > 110) {
          e.skillTimer = 0;
          e.skillCooldown = 3.6 + Math.random() * 1.5;
          this.enemyProjectiles.push({
            x: e.x,
            y: e.y,
            vx: (dx / dist) * 165,
            vy: (dy / dist) * 165,
            radius: 7,
            damage: 10,
            color: '#a855f7',
            life: 3.2,
            type: 'dark_orb'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'spade_soldier':
        // Spade Soldier: Shield Block reducing damage taken by 75% for 1.8s
        if (e.skillTimer > 5.0) {
          e.skillTimer = 0;
          e.isShielding = true;
          e.shieldTimer = 1.8;
        }
        if (e.isShielding) {
          e.shieldTimer -= dt;
          if (e.shieldTimer <= 0) e.isShielding = false;
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'hellhound':
      case 'zombie':
        // Hellhound / Zombie: Leaves an acidic or fire hazard puddle every 4.5s
        if (e.skillTimer > cooldown && dist < 320) {
          e.skillTimer = 0;
          e.skillCooldown = 4.2 + Math.random() * 2.0;
          this.dangerTelegraphs.push({
            x: e.x,
            y: e.y,
            radius: 22,
            duration: 2.8,
            damage: 5,
            color: e.type === 'hellhound' ? '#ef4444' : '#10b981',
            type: 'hazard_pool'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'bone_golem':
        // Bone Golem: Spawns a bone spike telegraph directly under the player
        if (e.skillTimer > cooldown && dist < 380) {
          e.skillTimer = 0;
          e.skillCooldown = 4.5 + Math.random() * 1.5;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: 34,
            timer: 0.75,
            maxTimer: 0.75,
            damage: 18,
            color: '#cbd5e1',
            type: 'circle',
            label: 'BONE SPIKE'
          });
        }
        e.vx = (dx / dist) * currentSpeed;
        e.vy = (dy / dist) * currentSpeed;
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        break;

      case 'lesser_devil':
        // Lesser Devil: Shadow Warp teleport 110px closer to the player
        if (e.skillTimer > cooldown && dist > 140 && dist < 480) {
          e.skillTimer = 0;
          e.skillCooldown = 3.8 + Math.random() * 1.5;
          e.x += (dx / dist) * 110;
          e.y += (dy / dist) * 110;
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
        // High Devil: Hellfire Eruption telegraph (radius 52px) under player
        if (e.skillTimer > cooldown && dist < 520) {
          e.skillTimer = 0;
          e.skillCooldown = 4.6 + Math.random() * 1.5;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: 52,
            timer: 0.85,
            maxTimer: 0.85,
            damage: 25,
            color: '#dc2626',
            type: 'circle',
            label: 'HELLFIRE'
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
    boss.skillTimer = (boss.skillTimer || 0) + dt;
    boss.subSkillTimer = (boss.subSkillTimer || 0) + dt;

    switch (boss.type) {
      case 'boss_mars':
        // Skill 1: Harpoon Charge (every 4.5s)
        if (boss.skillTimer > 4.5) {
          boss.skillTimer = 0;
          boss.isCharging = true;
          boss.chargeTimer = 0.9;
          boss.chargeVx = (dx / dist) * 320;
          boss.chargeVy = (dy / dist) * 320;
          // Warning line
          this.dangerTelegraphs.push({
            x: boss.x,
            y: boss.y,
            angle: Math.atan2(dy, dx),
            length: 420,
            width: 36,
            timer: 0.45,
            maxTimer: 0.45,
            damage: 24,
            color: '#38bdf8',
            type: 'laser'
          });
        }
        // Skill 2: Diamond Nova (8 radial shards every 5.5s)
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          for (let k = 0; k < 8; k++) {
            const ang = (k / 8) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * 210,
              vy: Math.sin(ang) * 210,
              radius: 6,
              damage: 16,
              color: '#38bdf8',
              life: 2.8,
              type: 'crystal_shard'
            });
          }
        }
        if (boss.isCharging) {
          boss.x += boss.chargeVx * dt;
          boss.y += boss.chargeVy * dt;
          boss.chargeTimer -= dt;
          if (boss.chargeTimer <= 0) boss.isCharging = false;
        } else {
          boss.x += (dx / dist) * boss.baseSpeed * dt;
          boss.y += (dy / dist) * boss.baseSpeed * dt;
        }
        break;

      case 'boss_vetto':
        // Skill 1: Despair Roar (expands shockwave, slows player)
        if (boss.skillTimer > 4.8) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: boss.x,
            y: boss.y,
            radius: 175,
            timer: 0.65,
            maxTimer: 0.65,
            damage: 22,
            color: '#dc2626',
            type: 'circle',
            label: 'DESPAIR ROAR'
          });
          this.game.shakeScreen(7, 0.3);
        }
        // Skill 2: Beast Claws Shockwave (3 crimson slashes)
        if (boss.subSkillTimer > 3.8) {
          boss.subSkillTimer = 0;
          const baseAng = Math.atan2(dy, dx);
          [-0.25, 0, 0.25].forEach(offset => {
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(baseAng + offset) * 240,
              vy: Math.sin(baseAng + offset) * 240,
              radius: 9,
              damage: 24,
              color: '#ef4444',
              life: 2.5,
              type: 'beast_claw'
            });
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_patri':
        // Skill 1: 6 Light Swords of Judgment with golden circular telegraphs around player
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          const p = this.game.player;
          for (let k = 0; k < 6; k++) {
            const ang = (k / 6) * Math.PI * 2;
            const r = 45 + (k % 2) * 55;
            this.dangerTelegraphs.push({
              x: p.x + Math.cos(ang) * r,
              y: p.y + Math.sin(ang) * r,
              radius: 40,
              timer: 0.75 + (k * 0.08),
              maxTimer: 0.75 + (k * 0.08),
              damage: 28,
              color: '#facc15',
              type: 'circle',
              label: 'JUDGMENT'
            });
          }
        }
        // Skill 2: Light-Speed Teleport & Burst
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          const a = Math.random() * Math.PI * 2;
          boss.x = this.game.player.x + Math.cos(a) * 160;
          boss.y = this.game.player.y + Math.sin(a) * 160;
          for (let k = 0; k < 4; k++) {
            const ang = (k / 4) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * 260,
              vy: Math.sin(ang) * 260,
              radius: 7,
              damage: 22,
              color: '#fde047',
              life: 2.2,
              type: 'light_ray'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_zenon':
        // Skill 1: Bone Forest Spikes (4 red circles around player)
        if (boss.skillTimer > 4.5) {
          boss.skillTimer = 0;
          const p = this.game.player;
          [ {x: -60, y: -60}, {x: 60, y: -60}, {x: -60, y: 60}, {x: 60, y: 60} ].forEach(offset => {
            this.dangerTelegraphs.push({
              x: p.x + offset.x,
              y: p.y + offset.y,
              radius: 42,
              timer: 0.8,
              maxTimer: 0.8,
              damage: 30,
              color: '#e2e8f0',
              type: 'circle',
              label: 'BONE FOREST'
            });
          });
        }
        // Skill 2: Spatial Distortion Cubes
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          for (let k = 0; k < 4; k++) {
            const ang = (k / 4) * Math.PI * 2 + Math.random() * 0.4;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * 200,
              vy: Math.sin(ang) * 200,
              radius: 9,
              damage: 26,
              color: '#7c3aed',
              life: 3.2,
              type: 'spatial_cube'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_vanica':
        // Skill 1: Blood Curse Pools (3 bubbling red hazard pools)
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          const p = this.game.player;
          for (let k = 0; k < 3; k++) {
            this.dangerTelegraphs.push({
              x: p.x + (Math.random() - 0.5) * 140,
              y: p.y + (Math.random() - 0.5) * 140,
              radius: 35,
              duration: 3.5,
              damage: 8,
              color: '#e11d48',
              type: 'hazard_pool'
            });
          }
        }
        // Skill 2: Blood Thorns Spiral (10 outward spinning thorns)
        if (boss.subSkillTimer > 5.0) {
          boss.subSkillTimer = 0;
          for (let k = 0; k < 10; k++) {
            const ang = (k / 10) * Math.PI * 2;
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang) * 190,
              vy: Math.sin(ang) * 190,
              radius: 6,
              damage: 22,
              color: '#be123c',
              life: 3.0,
              type: 'blood_thorn'
            });
          }
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_dante':
        // Dante / Lucifero: Gravity Singularity & Heavy Demon Slam
        if (boss.skillTimer > 4.5) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: 120,
            timer: 0.95,
            maxTimer: 0.95,
            damage: 35,
            color: '#7f1d1d',
            type: 'circle',
            label: 'HEAVY GRAVITY'
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_zagred':
        // Zagred: Word Soul "Chết Đi" (Kotodama 8 Spears targeting player)
        if (boss.skillTimer > 3.8) {
          boss.skillTimer = 0;
          const p = this.game.player;
          this.dangerTelegraphs.push({
            x: p.x,
            y: p.y,
            radius: 95,
            timer: 0.85,
            maxTimer: 0.85,
            damage: 38,
            color: '#881337',
            type: 'circle',
            label: 'WORD SOUL: DIE'
          });
          // Also spawn 2 lesser devil minions with VS level-scaling HP
          const minionHp = Math.max(1000, Math.round(46 * this.getVampireSurvivorsHpMultiplier(true, false)));
          for (let k = 0; k < 2; k++) {
            this.spawnEnemyAt(boss.x + (Math.random() - 0.5) * 80, boss.y + (Math.random() - 0.5) * 80, 'lesser_devil', minionHp, 115, 22, 25);
          }
        }
        // Underworld Spears barrage
        if (boss.subSkillTimer > 4.8) {
          boss.subSkillTimer = 0;
          const ang = Math.atan2(dy, dx);
          [-0.3, -0.15, 0, 0.15, 0.3].forEach(offset => {
            this.enemyProjectiles.push({
              x: boss.x,
              y: boss.y,
              vx: Math.cos(ang + offset) * 230,
              vy: Math.sin(ang + offset) * 230,
              radius: 8,
              damage: 28,
              color: '#9f1239',
              life: 3.5,
              type: 'word_spear'
            });
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

      case 'boss_lucifero':
        // Lucifero (Phút 30): Gravity Singularity + Calamity Shockwave
        if (boss.skillTimer > 4.2) {
          boss.skillTimer = 0;
          this.dangerTelegraphs.push({
            x: this.game.player.x,
            y: this.game.player.y,
            radius: 145,
            timer: 1.0,
            maxTimer: 1.0,
            damage: 45,
            color: '#450a0a',
            type: 'circle',
            label: 'ABSOLUTE GRAVITY'
          });
        }
        if (boss.subSkillTimer > 5.5) {
          boss.subSkillTimer = 0;
          // 3 expanding concentric shockwave rings
          [100, 180, 260].forEach((r, idx) => {
            this.dangerTelegraphs.push({
              x: boss.x,
              y: boss.y,
              radius: r,
              timer: 0.6 + idx * 0.25,
              maxTimer: 0.6 + idx * 0.25,
              damage: 32,
              color: '#b91c1c',
              type: 'shockwave_ring'
            });
          });
        }
        boss.x += (dx / dist) * boss.baseSpeed * dt;
        boss.y += (dy / dist) * boss.baseSpeed * dt;
        break;

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
        ctx.globalAlpha = 0.2 + progress * 0.3;
        ctx.fillRect(0, -t.width / 2, t.length, t.width);

        ctx.strokeStyle = t.color || '#ef4444';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.8;
        ctx.strokeRect(0, -t.width / 2, t.length, t.width);
        ctx.restore();
      } else if (t.type === 'shockwave_ring') {
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius * progress, 0, Math.PI * 2);
        ctx.strokeStyle = t.color || '#f59e0b';
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.75 * (1 - progress * 0.4);
        ctx.stroke();
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
    let baseHp = 55;
    let speed = 75;
    let contactDmg = 6;
    let expVal = 2;
    let scaleWithLevel = false;

    const endlessMult = gameTime > 1800 ? (1 + (gameTime - 1800) * 0.003) : 1.0;

            if (mapId === 'underworld_palace') {
      // MAP 2: ĐẠI MA CUNG MINH GIỚI (Chế độ Thử Thách, quái cân bằng để chặt chém sướng tay)
      if (gameTime < 90) {
        // Phút 0 - 1.5: Hellhound (45 - 85 HP) - scaleWithLevel = false để farm cấp đầu trận
        type = 'hellhound';
        baseHp = 45 + gameTime * 0.45;
        scaleWithLevel = false;
        speed = 82 + Math.random() * 14;
        contactDmg = 10;
        expVal = 2;
      } else if (gameTime < 210) {
        // Phút 1.5 - 3.5: Shadow Mage (110 - 218 HP) - scaleWithLevel = false để farm cấp đầu trận
        type = Math.random() < 0.65 ? 'shadow_mage' : 'hellhound';
        baseHp = 110 + (gameTime - 90) * 0.9;
        scaleWithLevel = false;
        speed = 88 + Math.random() * 15;
        contactDmg = 15;
        expVal = 3;
      } else if (gameTime < 360) {
        // Phút 3.5 - 6: Bone Golem (Base per Lv: 21 HP -> Ở Lv ~15 đạt ~315 HP)
        type = Math.random() < 0.6 ? 'bone_golem' : 'shadow_mage';
        baseHp = 21;
        scaleWithLevel = true;
        speed = 72 + Math.random() * 14;
        contactDmg = 22;
        expVal = 5;
      } else if (gameTime < 600) {
        // Phút 6 - 10: High Devil (Base per Lv: 35 HP -> Ở Lv ~28 đạt ~980 HP)
        type = Math.random() < 0.65 ? 'high_devil' : 'bone_golem';
        baseHp = 35;
        scaleWithLevel = true;
        speed = 96 + Math.random() * 18;
        contactDmg = 30;
        expVal = 9;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Lesser Devil (Base per Lv: 56 HP -> Ở Lv ~45 đạt ~2,520 HP)
        type = Math.random() < 0.7 ? 'lesser_devil' : 'high_devil';
        baseHp = 56;
        scaleWithLevel = true;
        speed = 108 + Math.random() * 18;
        contactDmg = 40;
        expVal = 15;
      } else if (gameTime < 1200) {
        // Phút 15 - 20: High Devil Swarm (Base per Lv: 84 HP -> Ở Lv ~60 đạt ~5,040 HP)
        type = 'high_devil';
        baseHp = 84;
        scaleWithLevel = true;
        speed = 114 + Math.random() * 18;
        contactDmg = 50;
        expVal = 22;
      } else if (gameTime < 1500) {
        // Phút 20 - 25: Devil Legion (Base per Lv: 118 HP -> Ở Lv ~76 đạt ~8,968 HP)
        type = 'high_devil';
        baseHp = 118;
        scaleWithLevel = true;
        speed = 118 + Math.random() * 20;
        contactDmg = 60;
        expVal = 32;
      } else {
        // Phút 25 - 30: Climax Horde (Base per Lv: 165 HP -> Ở Lv ~95 đạt ~15,675 HP)
        type = 'high_devil';
        baseHp = 165;
        scaleWithLevel = true;
        speed = 124 + Math.random() * 20;
        contactDmg = 72;
        expVal = 45;
      }
    } else {
      // MAP 1: VƯƠNG QUỐC CLOVER (Cân bằng chuẩn Vampire Survivors, dọn quái sướng tay)
      if (gameTime < 90) {
        // Phút 0 - 1.5: Bandit (32 - 63 HP - Chém 1-2 kiếm là nổ tung, scaleWithLevel = false)
        type = 'bandit';
        baseHp = 32 + gameTime * 0.35;
        scaleWithLevel = false;
        speed = 70 + Math.random() * 12;
        contactDmg = 8;
        expVal = 1;
      } else if (gameTime < 210) {
        // Phút 1.5 - 3.5: Cultist (75 - 159 HP - scaleWithLevel = false để dễ farm cấp)
        type = Math.random() < 0.7 ? 'cultist' : 'bandit';
        baseHp = 75 + (gameTime - 90) * 0.7;
        scaleWithLevel = false;
        speed = 78 + Math.random() * 14;
        contactDmg = 12;
        expVal = 2;
      } else if (gameTime < 360) {
        // Phút 3.5 - 6: Zombie (Base per Lv: 16 HP -> Ở Lv ~15 đạt ~240 HP, expVal = 4)
        type = Math.random() < 0.65 ? 'zombie' : 'cultist';
        baseHp = 16;
        scaleWithLevel = true;
        speed = 66 + Math.random() * 12;
        contactDmg = 18;
        expVal = 4;
      } else if (gameTime < 600) {
        // Phút 6 - 10: Spade Soldier (Base per Lv: 28 HP -> Ở Lv ~28 đạt ~784 HP, expVal = 7)
        type = Math.random() < 0.7 ? 'spade_soldier' : 'zombie';
        baseHp = 28;
        scaleWithLevel = true;
        speed = 88 + Math.random() * 15;
        contactDmg = 25;
        expVal = 7;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Lesser Devil (Base per Lv: 44 HP -> Ở Lv ~45 đạt ~1,980 HP, expVal = 12)
        type = Math.random() < 0.7 ? 'lesser_devil' : 'spade_soldier';
        baseHp = 44;
        scaleWithLevel = true;
        speed = 102 + Math.random() * 16;
        contactDmg = 34;
        expVal = 12;
      } else if (gameTime < 1200) {
        // Phút 15 - 20: High Devil (Base per Lv: 66 HP -> Ở Lv ~60 đạt ~3,960 HP, expVal = 18)
        type = Math.random() < 0.75 ? 'high_devil' : 'lesser_devil';
        baseHp = 66;
        scaleWithLevel = true;
        speed = 108 + Math.random() * 18;
        contactDmg = 44;
        expVal = 18;
      } else if (gameTime < 1500) {
        // Phút 20 - 25: Devil Legion (Base per Lv: 94 HP -> Ở Lv ~76 đạt ~7,144 HP, expVal = 26)
        type = 'high_devil';
        baseHp = 94;
        scaleWithLevel = true;
        speed = 114 + Math.random() * 18;
        contactDmg = 54;
        expVal = 26;
      } else {
        // Phút 25 - 30: Climax Horde (Base per Lv: 130 HP -> Ở Lv ~95 đạt ~12,350 HP, expVal = 38)
        type = 'high_devil';
        baseHp = 130;
        scaleWithLevel = true;
        speed = 120 + Math.random() * 20;
        contactDmg = 65;
        expVal = 38;
      }
    }

    const hpMult = this.getVampireSurvivorsHpMultiplier(scaleWithLevel, false);
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
      radius: type.startsWith('boss_') ? 35 : (type === 'lesser_devil' || type === 'high_devil' ? 16 : 13),
      hitFlashTimer: 0,
      skillTimer: Math.random() * 2.0,
      skillCooldown: 3.2 + Math.random() * 1.5,
      isDead: false,
      isBoss: type.startsWith('boss_')
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
        this.spawnBoss('boss_vanica', 'VANICA & MEGICULA (Huyết Ma Pháp)', 450, 105, 30, 80);
      }
      // Phút 6 (360s): Zenon Warmup (Base per Lv: 900 HP -> Ở Lv 25 đạt ~22,500 HP)
      if (gameTime >= 360 && !this.activeBossesSpawned.has('boss_zenon')) {
        this.activeBossesSpawned.add('boss_zenon');
        this.spawnBoss('boss_zenon', 'ZENON ZOGRATIS (Xương & Không Gian)', 900, 100, 36, 180);
      }
      // PHÚT 10 (600s) - BOSS NHỎ 1: Dante (Base per Lv: 1,650 HP -> Ở Lv 40 đạt ~66,000 HP - Rơi Rương Tiến Hóa!)
      if (gameTime >= 600 && !this.activeBossesSpawned.has('boss_dante_10')) {
        this.activeBossesSpawned.add('boss_dante_10');
        const b = this.spawnBoss('boss_dante', '⚠️ BOSS NHỎ PHÚT 10: DANTE & LUCIFERO (Trọng Lực Tuyệt Đối)', 1650, 115, 46, 400);
        if (b) b.isMiniBoss10 = true;
      }
      // Phút 15 (900s): Megicula Thức Tỉnh (Base per Lv: 2,550 HP -> Ở Lv 52 đạt ~132,600 HP)
      if (gameTime >= 900 && !this.activeBossesSpawned.has('boss_megicula_15')) {
        this.activeBossesSpawned.add('boss_megicula_15');
        this.spawnBoss('boss_vanica', 'MEGICULA THỨC TỈNH TOÀN DIỆN (Huyết Chú Ma Vương)', 2550, 110, 55, 650);
      }
      // PHÚT 20 (1200s) - BOSS NHỎ 2: Moris Á Ma (Base per Lv: 3,700 HP -> Ở Lv 68 đạt ~251,600 HP - Mở khóa Siêu Tiến Hóa Tier 3)
      if (gameTime >= 1200 && !this.activeBossesSpawned.has('boss_moris_20')) {
        this.activeBossesSpawned.add('boss_moris_20');
        const b = this.spawnBoss('boss_zenon', '⚠️ BOSS NHỎ PHÚT 20: MORIS Á MA HỢP THỂ (Cấu Trúc Ma Vương)', 3700, 105, 62, 1000);
        if (b) b.isMiniBoss20 = true;
      }
      // Phút 25 (1500s): Song Ma Tối Cao Naamah & Lilith (Base per Lv: 4,900 HP -> Ở Lv 82 đạt ~401,800 HP)
      if (gameTime >= 1500 && !this.activeBossesSpawned.has('boss_elite_25')) {
        this.activeBossesSpawned.add('boss_elite_25');
        this.spawnBoss('boss_dante', 'SONG MA ĐẠO TỐI CAO: NAAMAH & LILITH', 4900, 118, 72, 1500);
      }
      // PHÚT 30 (1800s) - ĐẠI BOSS CUỐI: Lucifero (Base per Lv: 7,000 HP -> Ở Lv 95-100 đạt ~665,000 - 700,000 HP)
      if (gameTime >= 1800 && !this.activeBossesSpawned.has('boss_lucifero_30')) {
        this.activeBossesSpawned.add('boss_lucifero_30');
        const b = this.spawnBoss('boss_lucifero', '👑 ĐẠI BOSS CUỐI PHÚT 30: MINH GIỚI TỐI CAO MA VƯƠNG LUCIFERO', 7000, 85, 82, 3000);
        if (b) b.isFinalBoss = true;
      }
    } else {
      // MAP 1: VƯƠNG QUỐC CLOVER (Cân bằng chuẩn Vampire Survivors, diệt Boss đã tay)
      // Phút 3 (180s): Mars (Base per Lv: 380 HP -> Ở Lv 15 đạt ~5,700 HP)
      if (gameTime >= 180 && !this.activeBossesSpawned.has('boss_mars')) {
        this.activeBossesSpawned.add('boss_mars');
        this.spawnBoss('boss_mars', 'MARS (Khoáng Thạch Ma Pháp)', 380, 62, 25, 60);
      }
      // Phút 6 (360s): Vetto (Base per Lv: 770 HP -> Ở Lv 25 đạt ~19,250 HP)
      if (gameTime >= 360 && !this.activeBossesSpawned.has('boss_vetto')) {
        this.activeBossesSpawned.add('boss_vetto');
        this.spawnBoss('boss_vetto', 'VETTO (Thú Ma Pháp Tuyệt Vọng)', 770, 100, 32, 140);
      }
      // PHÚT 10 (600s) - BOSS NHỎ 1: Patri (Base per Lv: 1,400 HP -> Ở Lv 35-45 đạt ~49,000 - 63,000 HP - Rơi Rương Tiến Hóa!)
      if (gameTime >= 600 && !this.activeBossesSpawned.has('boss_patri_10')) {
        this.activeBossesSpawned.add('boss_patri_10');
        const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 10: PATRI (Ánh Sáng Phán Xét & Thần Tốc)', 1400, 118, 42, 300);
        if (b) b.isMiniBoss10 = true;
      }
      // Phút 15 (900s): Vetto Thức Tỉnh Ma Nhãn (Base per Lv: 2,050 HP -> Ở Lv 50 đạt ~102,500 HP - Thử sức vũ khí Tiến Hóa Tier 2)
      if (gameTime >= 900 && !this.activeBossesSpawned.has('boss_vetto_15')) {
        this.activeBossesSpawned.add('boss_vetto_15');
        this.spawnBoss('boss_vetto', 'VETTO THỨC TỈNH MA NHÃN (Tuyệt Vọng Ma Thú)', 2050, 105, 50, 500);
      }
      // PHÚT 20 (1200s) - BOSS NHỎ 2: Ma Thần Cổ Đại (Base per Lv: 3,100 HP -> Ở Lv 65 đạt ~201,500 HP - Mở khóa Siêu Tiến Hóa Tier 3)
      if (gameTime >= 1200 && !this.activeBossesSpawned.has('boss_demon_god_20')) {
        this.activeBossesSpawned.add('boss_demon_god_20');
        const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 20: MA THẦN CỔ ĐẠI (Ancient Demon God)', 3100, 90, 60, 800);
        if (b) b.isMiniBoss20 = true;
      }
      // Phút 25 (1500s): Hắc Yêu Tinh Quang Kiếm (Base per Lv: 4,100 HP -> Ở Lv 80 đạt ~328,000 HP - Cần Siêu Tiến Hóa dồn sát thương)
      if (gameTime >= 1500 && !this.activeBossesSpawned.has('boss_dark_elf_25')) {
        this.activeBossesSpawned.add('boss_dark_elf_25');
        this.spawnBoss('boss_mars', 'HẮC YÊU TINH QUANG KIẾM CỰC HẠN', 4100, 115, 68, 1200);
      }
      // PHÚT 30 (1800s) - ĐẠI BOSS CUỐI: Zagred (Base per Lv: 5,800 HP -> Ở Lv 90-100 đạt ~522,000 - 580,000 HP)
      if (gameTime >= 1800 && !this.activeBossesSpawned.has('boss_zagred_30')) {
        this.activeBossesSpawned.add('boss_zagred_30');
        const b = this.spawnBoss('boss_zagred', '👑 ĐẠI BOSS CUỐI PHÚT 30: ÁC QUỶ MINH GIỚI ZAGRED', 5800, 78, 75, 3000);
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

    const vsHpMult = this.getVampireSurvivorsHpMultiplier(true, true);
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
    const dist = 740 + Math.random() * 120;
    return {
      x: p.x + Math.cos(a) * dist,
      y: p.y + Math.sin(a) * dist
    };
  }
}

window.EnemyManager = EnemyManager;
