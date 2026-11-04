const fs = require('fs');
const path = require('path');

const enemiesPath = path.join(__dirname, '..', 'src', 'enemies.js');
let code = fs.readFileSync(enemiesPath, 'utf8');

// 1. In update(): decrement enrageShieldTimer
code = code.replace(
  `if (e.hitFlashTimer > 0) e.hitFlashTimer -= dt;
      if (e.speedModTimer > 0) {`,
  `if (e.hitFlashTimer > 0) e.hitFlashTimer -= dt;
      if (e.enrageShieldTimer > 0) e.enrageShieldTimer -= dt;
      if (e.speedModTimer > 0) {`
);

// 2. In update(): gravity pull inside dangerTelegraphs update loop
code = code.replace(
  `t.timer -= dt;

      // Hazard pools tick continuous damage while active`,
  `t.timer -= dt;

      // Heavy Gravity pull effect towards telegraph center while warning is active
      if (t.isGravityPull) {
        const pDist = Math.hypot(p.x - t.x, p.y - t.y);
        if (pDist < t.radius + 150 && pDist > 4) {
          const pullSpeed = 110 * dt;
          p.x -= ((p.x - t.x) / pDist) * pullSpeed;
          p.y -= ((p.y - t.y) / pDist) * pullSpeed;
        }
      }

      // Hazard pools tick continuous damage while active`
);

// 3. In spawnEnemyAt: add isEnraged & enrageShieldTimer
code = code.replace(
  `isDead: false,
      isBoss: type.startsWith('boss_'),`,
  `isDead: false,
      isBoss: type.startsWith('boss_'),
      isEnraged: false,
      enrageShieldTimer: 0,`
);

// 4. Replace handleBossAI with full Phase 2 Enrage mechanics
const oldHandleBossAIRegex = /handleBossAI\(boss, dt, dist, dx, dy\) \{[\s\S]*?default:[\s\S]*?break;\s*\}\s*\}/;

const newHandleBossAI = `handleBossAI(boss, dt, dist, dx, dy) {
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
  }`;

if (oldHandleBossAIRegex.test(code)) {
  code = code.replace(oldHandleBossAIRegex, newHandleBossAI);
  console.log('Replaced handleBossAI successfully');
} else {
  console.error('Could not match handleBossAI');
}

fs.writeFileSync(enemiesPath, code, 'utf8');

// Copy to enemies_2.js
const enemies2Path = path.join(__dirname, '..', 'src', 'enemies_2.js');
fs.writeFileSync(enemies2Path, code, 'utf8');
console.log('Written to enemies.js and enemies_2.js');
