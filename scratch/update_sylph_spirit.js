const fs = require('fs');

console.log('--- Updating sylph spirit spells in src/spells.js ---');

let spellsContent = fs.readFileSync('src/spells.js', 'utf8');

// 1. Replace SPELL_DEFS for sylph_spirits, sylph_tempest_domain, spirit_storm_empress
const oldDefsTarget = `  sylph_spirits: {
    id: 'sylph_spirits',
    name: 'Tinh Linh (Spirit)',
    type: 'weapon',
    icon: '🧚✨',
    description: 'Chiêu Tinh Linh (Spirit - Magic Survival): Triệu hồi các Tinh Linh bay lơ lửng quanh người, liên tục phóng các mũi Tiễn Ma Pháp / Phi Kiếm tốc độ cao truy sát kẻ địch gần nhất!',
    levelDescriptions: {
      2: 'CẤP 2: +1 Tinh Linh Hộ Vệ (Tổng 3), +25% Sát thương và tăng tầm truy kích.',
      3: 'CẤP 3: +1 Tinh Linh Hộ Vệ (Tổng 4), -15% Hồi chiêu và tăng +20% tốc độ bay.',
      4: 'CẤP 4 [Familiar - Hộ Vệ Thần]: +1 Tinh Linh (Tổng 5), Tinh linh to hơn và đạn nhận thêm khả năng Xuyên Thấu (+1 Pierce).',
      5: 'CẤP 5 [Spirit Blade - Kiếm Khí]: +1 Tinh Linh (Tổng 6, Sylph 7), chuyển hóa toàn bộ đạn thành Phi Kiếm Tinh Linh xé gió tốc độ cao, xuyên thấu 2 mục tiêu!'
    },
    baseCooldown: 0.82,
    baseDamage: 28,
    baseSpeed: 640,
    baseArea: 22,
    pierce: 1,
    maxLevel: 5,
    evolution: 'sylph_tempest_domain',
    requires: 'wind_glide'
  },
  sylph_tempest_domain: {
    id: 'sylph_tempest_domain',
    name: 'Ngự Kiếm Linh Hồn (Telekinetic Sword)',
    type: 'evolution',
    icon: '🗡️🧚',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival Fusion): Tinh linh chuyển hóa thành 8 Ngự Kiếm Linh Hồn (Telekinetic Swords) lơ lửng quanh người, liên tục xuất kích xé toạc mọi kẻ địch với tốc độ cực hạn và xuyên thấu liên hoàn!',
    baseCooldown: 0.44,
    baseDamage: 105,
    baseSpeed: 780,
    baseArea: 35,
    pierce: 5,
    maxLevel: 1,
    evolution: 'spirit_storm_empress',
    requires: 'reinforcement'
  },
  spirit_storm_empress: {
    id: 'spirit_storm_empress',
    name: 'Vạn Kiếm Quy Tông (Infinite Spirit Blades)',
    type: 'super_evolution',
    icon: '👑🗡️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Khai mở Vạn Kiếm Trận với 16 Đại Thần Kiếm bay hộ thể, giải phóng cuồng phong kiếm khí xuyên thấu vô hạn toàn bản đồ kèm kiếm áp chấn động!',
    baseCooldown: 0.35,
    baseDamage: 215,
    baseSpeed: 880,
    baseArea: 55,
    pierce: 99,
    maxLevel: 1
  },`;

const newDefs = `  sylph_spirits: {
    id: 'sylph_spirits',
    name: 'Tinh Linh (Spirit)',
    type: 'weapon',
    icon: '⭕✨',
    badge: 'MAGIC SURVIVAL SPIRIT',
    description: 'Chiêu Tinh Linh (Spirit - Magic Survival): Triệu hồi các Vòng Tinh Linh (Spirit Ring) xoay quanh người, liên tục phóng Tiễn Ma Pháp truy sát kẻ địch gần nhất!',
    levelDescriptions: {
      2: 'CẤP 2: +1 Vòng Tinh Linh (Tổng 2, Sylph 3), +20% Sát thương.',
      3: 'CẤP 3: +1 Vòng Tinh Linh (Tổng 3, Sylph 4), -15% Hồi chiêu.',
      4: 'CẤP 4: +1 Vòng Tinh Linh (Tổng 4, Sylph 5), đạn nhận thêm khả năng Xuyên Thấu (+1 Pierce).',
      5: 'CẤP 5 [Spirit Mastery]: +1 Vòng Tinh Linh (Tổng 5, Sylph 6). Khai mở 3 Nhánh Thức Tỉnh: Magic Missile (Bắn Liên Thanh), Magic Blade (Kiếm Trảm Tức Thời), Familiar (Đại Tinh Linh 360°)'
    },
    baseCooldown: 0.85,
    baseDamage: 28,
    baseSpeed: 640,
    baseArea: 22,
    pierce: 1,
    maxLevel: 5,
    evolution: 'spirit_magic_missile',
    evolutions: ['spirit_magic_missile', 'spirit_magic_blade', 'spirit_familiar'],
    requires: 'wind_glide'
  },

  // 1. BRANCH 1: MAGIC MISSILE (Image 1 - Tên Lửa Ma Pháp)
  spirit_magic_missile: {
    id: 'spirit_magic_missile',
    name: 'Tinh Linh - Magic Missile (Tên Lửa Ma Pháp)',
    type: 'evolution',
    icon: '⭕⚡',
    badge: 'TIẾN HÓA: MAGIC MISSILE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Giảm 20% hồi chiêu. Các Tinh Linh phóng đạn liên tục cách đều nhau theo hồi chiêu, bắn liên thanh như súng máy không ngừng nghỉ!',
    baseCooldown: 0.58,
    baseDamage: 85,
    baseSpeed: 800,
    baseArea: 26,
    pierce: 2,
    maxLevel: 1,
    evolution: 'spirit_storm_empress',
    requires: 'reinforcement'
  },

  // 2. BRANCH 2: MAGIC BLADE (Image 2 - Lưỡi Kiếm Ma Pháp)
  spirit_magic_blade: {
    id: 'spirit_magic_blade',
    name: 'Tinh Linh - Magic Blade (Lưỡi Kiếm Ma Pháp)',
    type: 'evolution',
    icon: '⭕🗡️',
    badge: 'TIẾN HÓA: MAGIC BLADE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Đạn Tinh Linh chuyển hóa thành Kiếm Ma Pháp tạo ra tức thời ngay trên mục tiêu! Sát thương tăng x2.5 lần, trảm sát lập tức không có độ trễ bay!',
    baseCooldown: 0.95,
    baseDamage: 125,
    baseSpeed: 9999,
    baseArea: 65,
    pierce: 4,
    maxLevel: 1,
    evolution: 'spirit_blade_sovereign',
    requires: 'reinforcement'
  },

  // 3. BRANCH 3: FAMILIAR (Image 3 - Đại Tinh Linh Hợp Nhất)
  spirit_familiar: {
    id: 'spirit_familiar',
    name: 'Tinh Linh - Familiar (Đại Tinh Linh Hợp Nhất)',
    type: 'evolution',
    icon: '⭕👑',
    badge: 'TIẾN HÓA: FAMILIAR (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Tất cả Tinh Linh dung hợp thành 1 Đại Tinh Linh Thú to lớn! Bão đạn 360 độ cực khủng (+15 đạn mỗi Tinh Linh), khoảng cách phóng đạn cực ngắn (xả cực nhanh), hồi chiêu tăng 5x!',
    baseCooldown: 3.8,
    baseDamage: 78,
    baseSpeed: 640,
    baseArea: 32,
    pierce: 2,
    maxLevel: 1,
    evolution: 'spirit_familiar_overlord',
    requires: 'reinforcement'
  },

  // Backward compatibility alias
  sylph_tempest_domain: {
    id: 'sylph_tempest_domain',
    name: 'Tinh Linh - Magic Blade (Ngự Kiếm Linh Hồn)',
    type: 'evolution',
    icon: '⭕🗡️',
    badge: 'TIẾN HÓA: MAGIC BLADE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Đạn Tinh Linh chuyển hóa thành Kiếm Ma Pháp tạo ra tức thời ngay trên mục tiêu! Sát thương tăng x2.5 lần, trảm sát lập tức không có độ trễ bay!',
    baseCooldown: 0.95,
    baseDamage: 125,
    baseSpeed: 9999,
    baseArea: 65,
    pierce: 4,
    maxLevel: 1,
    evolution: 'spirit_blade_sovereign',
    requires: 'reinforcement'
  },

  // TIER 3 SUPER EVOLUTIONS (SIÊU TIẾN HÓA LẦN 2)
  spirit_storm_empress: {
    id: 'spirit_storm_empress',
    name: 'Bão Đạn Tinh Linh Thần Thánh (Empress Gatling Storm)',
    type: 'super_evolution',
    icon: '👑⚡',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): 12 Vòng Tinh Linh súng máy xả bão đạn liên hồi + cuồng phong chân không hút quái toàn màn hình kèm sóng xung kích chấn động!',
    baseCooldown: 0.38,
    baseDamage: 195,
    baseSpeed: 880,
    baseArea: 40,
    pierce: 4,
    maxLevel: 1
  },

  spirit_blade_sovereign: {
    id: 'spirit_blade_sovereign',
    name: 'Vạn Kiếm Trảm Không (Infinite Spirit Blade Sovereign)',
    type: 'super_evolution',
    icon: '👑🗡️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Khai mở Vạn Kiếm Trận với 16 Thần Kiếm Linh Hồn trảm sát tức thời liên hoàn toàn bản đồ kèm kiếm áp chấn động rung chuyển chiến trường!',
    baseCooldown: 0.70,
    baseDamage: 240,
    baseSpeed: 9999,
    baseArea: 90,
    pierce: 8,
    maxLevel: 1
  },

  spirit_familiar_overlord: {
    id: 'spirit_familiar_overlord',
    name: 'Thái Cổ Tinh Linh Vương (Primordial Spirit Familiar Overlord)',
    type: 'super_evolution',
    icon: '👑🌀',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Đại Tinh Linh Thần Khởi triệu hồi bão đạn 360 độ 120 tia đạn + 3 vòng sóng xung kích bão tố tàn phá mọi quái vật xung quanh!',
    baseCooldown: 3.2,
    baseDamage: 185,
    baseSpeed: 720,
    baseArea: 50,
    pierce: 3,
    maxLevel: 1
  },`;

if (!spellsContent.includes(oldDefsTarget)) {
  console.error('ERROR: oldDefsTarget not found in spells.js!');
  process.exit(1);
}
spellsContent = spellsContent.replace(oldDefsTarget, newDefs);
console.log('✓ SPELL_DEFS updated successfully');

// 2. Replace castSpell for sylph spirits and evolutions
const oldCastTargetStart = "      case 'sylph_spirits': {";
const oldCastTargetEnd = "        this.playSound('windBlade');\n        break;\n      }";

const startIdx = spellsContent.indexOf(oldCastTargetStart);
// Find spirit_storm_empress block end
const empressIdx = spellsContent.indexOf("case 'spirit_storm_empress': {", startIdx);
const breakIdx = spellsContent.indexOf("break;\n      }", empressIdx) + "break;\n      }".length;

const oldCastBlock = spellsContent.slice(startIdx, breakIdx);

const newCastBlock = `      case 'sylph_spirits': {
        const spiritCount = 1 + level + (p.charId === 'sylph' ? 1 : 0);
        const orbitR = 50 + level * 2.8;
        const scaledSpeed = def.baseSpeed * (1 + (level >= 3 ? 0.15 : 0));
        const scaledDamage = Math.round(damage * (1 + (level - 1) * 0.18));
        const pierce = level >= 4 ? 2 : 1;
        const nearestEnemies = this.getNearestEnemies(p.x, p.y, spiritCount);

        for (let i = 0; i < spiritCount; i++) {
          const orbitAngle = (this.game.tick * 3.0) + (i * Math.PI * 2) / spiritCount;
          const sx = p.x + Math.cos(orbitAngle) * orbitR;
          const sy = p.y + Math.sin(orbitAngle) * orbitR;

          let aimAngle = targetAngle;
          let target = null;
          if (nearestEnemies.length > 0) {
            target = nearestEnemies[i % nearestEnemies.length];
            aimAngle = Math.atan2(target.y - sy, target.x - sx);
          } else {
            aimAngle = targetAngle + (i - (spiritCount - 1) / 2) * 0.22;
          }

          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * scaledSpeed,
              vy: Math.sin(aimAngle) * scaledSpeed,
              radius: 13 * areaMult,
              damage: scaledDamage,
              isCrit: isCrit,
              color: '#34d399',
              pierce: pierce,
              life: 1.8,
              isHoming: true,
              turnSpeed: 12,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#ffffff', 3);
          }, i * 36);
        }
        this.playSound('windBlade');
        break;
      }

      // BRANCH 1: MAGIC MISSILE (Image 1 from Magic Survival)
      case 'spirit_magic_missile': {
        const spiritCount = 6 + (p.charId === 'sylph' ? 1 : 0);
        const orbitR = 68;
        const actualCd = (def.baseCooldown * (1 - (p.cooldownReduction || 0))) || 0.45;
        const stepDelay = Math.max(25, Math.round((actualCd * 1000) / spiritCount));

        for (let i = 0; i < spiritCount; i++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const orbitAngle = (this.game.tick * 4.0) + (i * Math.PI * 2) / spiritCount;
            const sx = p.x + Math.cos(orbitAngle) * orbitR;
            const sy = p.y + Math.sin(orbitAngle) * orbitR;

            const targets = this.getNearestEnemies(sx, sy, 3);
            const target = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : null;
            const aimAngle = target ? Math.atan2(target.y - sy, target.x - sx) : (targetAngle + (Math.random() - 0.5) * 0.4);

            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * def.baseSpeed,
              vy: Math.sin(aimAngle) * def.baseSpeed,
              radius: 14 * areaMult,
              damage: damage,
              isCrit: isCrit,
              color: '#38bdf8',
              pierce: def.pierce || 2,
              life: 2.0,
              isHoming: true,
              turnSpeed: 18,
              isMissile: true,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#7dd3fc', 3);
            this.playSound('windBlade');
          }, i * stepDelay);
        }
        break;
      }

      // BRANCH 2: MAGIC BLADE (Image 2 from Magic Survival - Instant blade on target, 2.5X damage)
      case 'spirit_magic_blade':
      case 'sylph_tempest_domain': {
        const spiritCount = 6 + (p.charId === 'sylph' ? 1 : 0);
        const enemies = this.getNearestEnemies(p.x, p.y, spiritCount);
        const slashDmg = damage;

        if (enemies.length === 0) {
          for (let i = 0; i < 3; i++) {
            const dist = 120 + i * 75;
            const bx = p.x + Math.cos(targetAngle) * dist;
            const by = p.y + Math.sin(targetAngle) * dist;
            this.slashes.push({
              x: bx,
              y: by,
              radius: 55 * areaMult,
              facingAngle: targetAngle + (i % 2 === 0 ? 0.35 : -0.35),
              arc: Math.PI * 0.9,
              damage: slashDmg,
              isCrit: isCrit,
              color: '#fef08a',
              life: 0.22,
              maxLife: 0.22,
              knockback: 25,
              hasHit: false
            });
            this.spawnImpactParticles(bx, by, '#fef08a', 4);
          }
          this.playSound('slash');
          break;
        }

        for (let i = 0; i < spiritCount; i++) {
          const target = enemies[i % enemies.length];
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const tx = target.x + (Math.random() - 0.5) * 16;
            const ty = target.y + (Math.random() - 0.5) * 16;
            const slashAngle = Math.random() * Math.PI * 2;

            const splashEnemies = this.game.getEnemiesNear(tx, ty, 65 * areaMult);
            for (const e of splashEnemies) {
              if (!e || e.isDead || e.hp <= 0) continue;
              this.applyDamage(e, slashDmg, isCrit, '#fef08a');
            }

            this.slashes.push({
              x: tx,
              y: ty,
              radius: 48 * areaMult,
              facingAngle: slashAngle,
              arc: Math.PI * 1.2,
              damage: 0,
              isCrit: isCrit,
              color: '#ffffff',
              life: 0.18,
              maxLife: 0.18,
              knockback: 10,
              hasHit: true
            });
            this.spawnImpactParticles(tx, ty, '#facc15', 6);
            this.spawnImpactParticles(tx, ty, '#ffffff', 4);
          }, i * 35);
        }
        this.playSound('slash');
        break;
      }

      // BRANCH 3: FAMILIAR (Image 3 from Magic Survival - All spirits combined into one, 360° barrage, 5x CD)
      case 'spirit_familiar': {
        const baseSpirits = 5 + (p.charId === 'sylph' ? 1 : 0);
        const totalProjectiles = baseSpirits * 15; // 75 - 90 projectiles!
        const waves = 15;
        const projPerWave = Math.round(totalProjectiles / waves);
        const intervalDelay = 38;

        this.game.shakeScreen(7, 0.25);
        this.spawnShockwave(p.x, p.y, '#f472b6', 220 * areaMult, 0.35);

        for (let w = 0; w < waves; w++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const waveOffset = (w * 0.32) + targetAngle;
            for (let j = 0; j < projPerWave; j++) {
              const ang = waveOffset + (j * Math.PI * 2) / projPerWave;
              this.projectiles.push({
                type: 'sylph_spirit_bolt',
                x: p.x,
                y: p.y,
                vx: Math.cos(ang) * def.baseSpeed,
                vy: Math.sin(ang) * def.baseSpeed,
                radius: 15 * areaMult,
                damage: damage,
                isCrit: isCrit,
                color: '#f472b6',
                pierce: def.pierce || 2,
                life: 1.8,
                isHoming: true,
                turnSpeed: 10,
                isFamiliar: true
              });
            }
            this.spawnImpactParticles(p.x, p.y, '#fbcfe8', 4);
            if (w % 3 === 0) this.playSound('windBlade');
          }, w * intervalDelay);
        }
        break;
      }

      // TIER 3 SUPER EVOLUTIONS
      case 'spirit_storm_empress': {
        this.game.shakeScreen(15, 0.45);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 560, 0.5);
        this.spawnShockwave(p.x, p.y, '#fef08a', 400, 0.4);

        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: 250 * areaMult,
          damage: Math.round(damage * 0.4),
          interval: 0.10,
          tickTimer: 0,
          life: 3.2,
          color: '#38bdf8',
          pull: true,
          isEmpressStorm: true
        });

        const spiritCount = 12;
        for (let i = 0; i < spiritCount; i++) {
          const orbitAngle = (this.game.tick * 5.0) + (i * Math.PI * 2) / spiritCount;
          const sx = p.x + Math.cos(orbitAngle) * 88;
          const sy = p.y + Math.sin(orbitAngle) * 88;
          const targets = this.getNearestEnemies(sx, sy, 3);
          const target = targets[i % (targets.length || 1)] || null;
          const aimAngle = target ? Math.atan2(target.y - sy, target.x - sx) : targetAngle + (i - 5.5) * 0.2;

          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * def.baseSpeed,
              vy: Math.sin(aimAngle) * def.baseSpeed,
              radius: 20 * areaMult,
              damage: damage,
              isCrit: isCrit,
              color: '#38bdf8',
              pierce: 99,
              life: 2.2,
              isHoming: true,
              isSuperEvo: true,
              turnSpeed: 22,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#ffffff', 4);
          }, i * 20);
        }
        this.playSound('windBlade');
        break;
      }

      case 'spirit_blade_sovereign': {
        this.game.shakeScreen(16, 0.5);
        this.spawnShockwave(p.x, p.y, '#fef08a', 620, 0.5);

        const enemies = this.getNearestEnemies(p.x, p.y, 16);
        for (let i = 0; i < 16; i++) {
          const target = enemies.length > 0 ? enemies[i % enemies.length] : null;
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const tx = target ? target.x + (Math.random() - 0.5) * 20 : p.x + Math.cos(targetAngle + (i - 8) * 0.25) * (100 + i * 30);
            const ty = target ? target.y + (Math.random() - 0.5) * 20 : p.y + Math.sin(targetAngle + (i - 8) * 0.25) * (100 + i * 30);

            const splashEnemies = this.game.getEnemiesNear(tx, ty, 90 * areaMult);
            for (const e of splashEnemies) {
              if (!e || e.isDead || e.hp <= 0) continue;
              this.applyDamage(e, damage, isCrit, '#fef08a');
            }

            this.slashes.push({
              x: tx,
              y: ty,
              radius: 65 * areaMult,
              facingAngle: Math.random() * Math.PI * 2,
              arc: Math.PI * 1.5,
              damage: 0,
              isCrit: isCrit,
              color: '#fef08a',
              life: 0.25,
              maxLife: 0.25,
              knockback: 15,
              hasHit: true
            });
            this.spawnImpactParticles(tx, ty, '#facc15', 8);
            this.spawnImpactParticles(tx, ty, '#ffffff', 6);
          }, i * 28);
        }
        this.playSound('slash');
        break;
      }

      case 'spirit_familiar_overlord': {
        this.game.shakeScreen(18, 0.55);
        this.spawnShockwave(p.x, p.y, '#f472b6', 500, 0.45);
        this.spawnShockwave(p.x, p.y, '#a855f7', 350, 0.35);

        const totalProjectiles = 120;
        const waves = 20;
        const projPerWave = 6;

        for (let w = 0; w < waves; w++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const waveOffset = (w * 0.45) + targetAngle;
            for (let j = 0; j < projPerWave; j++) {
              const ang = waveOffset + (j * Math.PI * 2) / projPerWave;
              this.projectiles.push({
                type: 'sylph_spirit_bolt',
                x: p.x,
                y: p.y,
                vx: Math.cos(ang) * def.baseSpeed,
                vy: Math.sin(ang) * def.baseSpeed,
                radius: 20 * areaMult,
                damage: damage,
                isCrit: isCrit,
                color: '#f472b6',
                pierce: 5,
                life: 2.2,
                isHoming: true,
                turnSpeed: 15,
                isSuperEvo: true,
                isFamiliar: true
              });
            }
            this.spawnImpactParticles(p.x, p.y, '#fbcfe8', 5);
            if (w % 3 === 0) this.playSound('windBlade');
          }, w * 32);
        }
        break;
      }`;

spellsContent = spellsContent.slice(0, startIdx) + newCastBlock + spellsContent.slice(breakIdx);
console.log('✓ castSpell updated successfully');

// 3. Replace drawSylphOrbitingSpirits with authentic Magic Survival Spirit Ring
const oldDrawSpiritsStart = "  // 2.5. SYLPH ORBITING SPIRITS (Tiểu Tinh Linh Bão Tố Xoay Quanh Pháp Sư)";
const oldDrawSpiritsEnd = "  // 3. PROJECTILES (Đạn Ma Pháp, Tinh Linh & Phi Kiếm Có Vệt Sáng)";

const drawStartIdx = spellsContent.indexOf(oldDrawSpiritsStart);
const drawEndIdx = spellsContent.indexOf(oldDrawSpiritsEnd);

const newDrawSpirits = `  // -------------------------------------------------------------------------
  // 2.5. MAGIC SURVIVAL SPIRIT RING RENDERER (Vòng Tinh Linh Chalk/Brush Ethereal Ring)
  // -------------------------------------------------------------------------
  drawSpiritRing(ctx, x, y, radius, innerRadius, style = 'base', tick = 0, rotAngle = 0) {
    ctx.save();
    ctx.translate(x, y);

    const isFamiliar = style === 'familiar';
    const isBlade = style === 'blade';
    const isMissile = style === 'missile';

    // 1. Soft ethereal aura glow
    const auraR = radius * 1.85;
    const auraGrad = ctx.createRadialGradient(0, 0, innerRadius * 0.5, 0, 0, auraR);
    if (isFamiliar) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      auraGrad.addColorStop(0.35, 'rgba(244, 114, 182, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isBlade) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      auraGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(52, 211, 153, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isMissile) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      auraGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.55)');
      auraGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      auraGrad.addColorStop(0.4, 'rgba(110, 231, 183, 0.45)');
      auraGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, auraR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Magic Survival Rough Chalk/Brush Ring (Iconic 'O' from Encyclopedia)
    ctx.rotate(rotAngle);
    const midR = (radius + innerRadius) * 0.5;
    const ringThickness = (radius - innerRadius);
    const strokeCount = isFamiliar ? 18 : 12;

    ctx.save();
    ctx.lineCap = 'round';

    // Base glowing ring band
    ctx.strokeStyle = isFamiliar ? '#f472b6' : (isBlade ? '#fef08a' : (isMissile ? '#7dd3fc' : '#a7f3d0'));
    ctx.lineWidth = ringThickness * 0.75;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(0, 0, midR, 0, Math.PI * 2);
    ctx.stroke();

    // Overlapping jittered textured strokes (Pure white & spectral highlights)
    ctx.strokeStyle = '#ffffff';
    for (let s = 0; s < strokeCount; s++) {
      const aStart = (s / strokeCount) * Math.PI * 2 + Math.sin(s * 3.7 + tick * 2) * 0.12;
      const aLen = (Math.PI * 2 / strokeCount) * (1.35 + ((s % 3) * 0.25));
      const rOffset = Math.sin(s * 5.1 + tick * 3) * (ringThickness * 0.25);
      const strokeW = (ringThickness * 0.38) + ((s % 4) * 0.55);

      ctx.lineWidth = strokeW;
      ctx.globalAlpha = 0.7 + ((s % 2) * 0.28);
      ctx.beginPath();
      ctx.arc(0, 0, midR + rOffset, aStart, aStart + aLen);
      ctx.stroke();

      // Bristling tangential spiritual sparks / feather fibers
      if (s % 2 === 0) {
        const fiberAng = aStart + aLen * 0.5;
        const fx = Math.cos(fiberAng) * (midR + rOffset);
        const fy = Math.sin(fiberAng) * (midR + rOffset);
        const fLen = 3 + (isFamiliar ? 3.5 : 0);
        const fTang = fiberAng + Math.PI / 2 + (Math.sin(s + tick * 4) * 0.4);
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + Math.cos(fTang) * fLen, fy + Math.sin(fTang) * fLen);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 3. Clear inner hole (Dark / hollow core with faint shimmer)
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.88, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Inner bright rim highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.95, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Special mode details
    if (isBlade) {
      // Ethereal mini sword hovering in the center
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.0;
      const bLen = radius * 1.15;
      ctx.beginPath();
      ctx.moveTo(bLen, 0);
      ctx.lineTo(-bLen * 0.5, -2.5);
      ctx.lineTo(-bLen * 0.5, 2.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (isFamiliar) {
      // Swirling center vortex core
      ctx.save();
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius * 0.55, tick * 4, tick * 4 + Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  drawSylphOrbitingSpirits(ctx, tick) {
    const p = this.game.player;
    if (!p || p.hp <= 0) return;

    let spiritCount = 0;
    let orbitR = 52;
    let style = 'base';
    let isFamiliar = false;

    // 1. Tier 3 Super Evolutions
    if (p.weapons && p.weapons['spirit_familiar_overlord']) {
      isFamiliar = true;
      spiritCount = 1;
      orbitR = 60;
      style = 'familiar';
    } else if (p.weapons && p.weapons['spirit_blade_sovereign']) {
      spiritCount = 10;
      orbitR = 84;
      style = 'blade';
    } else if (p.weapons && p.weapons['spirit_storm_empress']) {
      spiritCount = 10;
      orbitR = 84;
      style = 'missile';
    }
    // 2. Tier 2 Evolutions
    else if (p.weapons && p.weapons['spirit_familiar']) {
      isFamiliar = true;
      spiritCount = 1;
      orbitR = 56;
      style = 'familiar';
    } else if (p.weapons && (p.weapons['spirit_magic_blade'] || p.weapons['sylph_tempest_domain'])) {
      spiritCount = 6;
      orbitR = 72;
      style = 'blade';
    } else if (p.weapons && p.weapons['spirit_magic_missile']) {
      spiritCount = 6;
      orbitR = 72;
      style = 'missile';
    }
    // 3. Base weapon
    else if (p.weapons && p.weapons['sylph_spirits']) {
      const item = p.weapons['sylph_spirits'];
      const lv = item.level || 1;
      spiritCount = 1 + lv + (p.charId === 'sylph' ? 1 : 0);
      orbitR = 50 + lv * 2.8;
      style = 'base';
    } else if (p.charId === 'sylph') {
      spiritCount = 2;
      orbitR = 48;
      style = 'base';
    }

    if (spiritCount <= 0) return;

    const rotSpeed = isFamiliar ? 1.8 : (style === 'missile' ? 3.6 : (style === 'blade' ? 3.2 : 2.5));

    // Orbital faint boundary circle
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = isFamiliar ? '#f472b6' : (style === 'blade' ? '#fef08a' : (style === 'missile' ? '#38bdf8' : '#6ee7b7'));
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 4, orbitR, orbitR * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    for (let i = 0; i < spiritCount; i++) {
      const angle = (tick * rotSpeed) + (i * Math.PI * 2) / spiritCount;
      const sx = p.x + Math.cos(angle) * orbitR;
      const sy = p.y + Math.sin(angle) * (orbitR * 0.72) + Math.sin(tick * 5 + i * 2) * 2.5;

      const r = isFamiliar ? 20 : 9;
      const innerR = isFamiliar ? 9.5 : 4.2;

      this.drawSpiritRing(ctx, sx, sy, r, innerR, style, tick, angle + Math.PI / 2);
    }
  }

`;

spellsContent = spellsContent.slice(0, drawStartIdx) + newDrawSpirits + spellsContent.slice(drawEndIdx);
console.log('✓ drawSylphOrbitingSpirits and drawSpiritRing updated successfully');

// 4. Update drawProjectiles for sylph_spirit_bolt (Spirit Missile)
const oldBoltTarget = `        case 'sylph_spirit_bolt': {
          const isSuper = proj.isSuperEvo;
          const isEvo = proj.isEvo || isSuper;
          const isBlade = proj.isBlade || proj.isTelekineticSword || isEvo;

          if (isBlade) {
            // TELEKINETIC FLYING SWORD (Ngự Kiếm Phi Hành - Magic Survival Fusion)
            const swordLen = r * 2.2;
            const swordW = r * 0.55;

            // Radiant Sword Trail Glow
            ctx.fillStyle = isSuper ? '#fef08a' : (isEvo ? '#a7f3d0' : '#6ee7b7');
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, swordLen * 0.7, swordW * 1.8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Anime Sword Blade
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = isSuper ? '#34d399' : (isEvo ? '#10b981' : '#059669');
            ctx.strokeStyle = isSuper ? '#ffffff' : '#ecfdf5';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(swordLen, 0); // Sharp Diamond Tip
            ctx.lineTo(-swordLen * 0.55, -swordW);
            ctx.lineTo(-swordLen * 0.55, swordW);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Sword Crossguard
            ctx.fillStyle = isSuper ? '#fde047' : '#34d399';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.rect(-swordLen * 0.62, -swordW * 1.6, 3.5, swordW * 3.2);
            ctx.fill();
            ctx.stroke();

            // Sword Hilt & Pommel Gem
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-swordLen * 0.95, -1.8, swordLen * 0.33, 3.6);
            ctx.beginPath();
            ctx.arc(-swordLen * 0.98, 0, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Luminous White Center Spine
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(swordLen * 0.85, 0);
            ctx.lineTo(-swordLen * 0.45, 0);
            ctx.stroke();

            if (isSuper) {
              // Divine Wings & Aura on the Flying Sword
              ctx.strokeStyle = '#fde047';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(0, -swordW * 1.8);
              ctx.lineTo(swordLen * 0.4, 0);
              ctx.lineTo(0, swordW * 1.8);
              ctx.stroke();
            }
          } else {
            // BASE SPIRIT ARROW / DART (Level 1-4)
            const wingFlick = Math.sin(tick * 22 + proj.x * 0.05) * 2;
            ctx.fillStyle = '#6ee7b7';
            ctx.globalAlpha = 0.75;
            ctx.beginPath();
            ctx.ellipse(-r * 0.4, -r * 0.7, r * 0.7, r * 0.35 + wingFlick * 0.3, -0.5, 0, Math.PI * 2);
            ctx.ellipse(-r * 0.4, r * 0.7, r * 0.7, r * 0.35 + wingFlick * 0.3, 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // Sharp Crescent Spirit Needle
            ctx.fillStyle = '#10b981';
            ctx.strokeStyle = '#ecfdf5';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(r * 2.0, 0);
            ctx.bezierCurveTo(r * 0.6, -r * 0.8, -r * 0.6, -r * 0.6, -r * 1.3, 0);
            ctx.bezierCurveTo(-r * 0.6, r * 0.6, r * 0.6, r * 0.8, r * 2.0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Luminous White Core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(r * 0.3, 0, r * 0.42, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
        }`;

const newBolt = `        case 'sylph_spirit_bolt': {
          const isSuper = proj.isSuperEvo;
          const isFamiliar = proj.isFamiliar;
          const isMissile = proj.isMissile;

          // Pure Magic Survival Spirit Missile (Ethereal light comet with chalky wisp texture)
          const coreR = r * 0.65;
          const boltColor = proj.color || (isFamiliar ? '#f472b6' : (isMissile ? '#38bdf8' : '#34d399'));

          // Ethereal Outer Glow
          const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 1.6);
          glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          glowGrad.addColorStop(0.4, boltColor);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
          ctx.fill();

          // Rough chalk / brush stroke spirit nucleus
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(0, 0, coreR, 0, Math.PI * 2);
          ctx.stroke();

          // Trailing spiritual brush fibers
          ctx.strokeStyle = boltColor;
          ctx.lineWidth = 1.5;
          for (let f = 0; f < 4; f++) {
            const fAngle = Math.PI + (f - 1.5) * 0.45;
            ctx.beginPath();
            ctx.moveTo(Math.cos(fAngle) * coreR, Math.sin(fAngle) * coreR);
            ctx.lineTo(Math.cos(fAngle) * (r * 1.4), Math.sin(fAngle) * (r * 1.4));
            ctx.stroke();
          }
          ctx.restore();

          // Brilliant White Spark Center
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.15, 0, coreR * 0.55, 0, Math.PI * 2);
          ctx.fill();
          break;
        }`;

if (!spellsContent.includes(oldBoltTarget)) {
  console.error('ERROR: oldBoltTarget not found in spells.js!');
  process.exit(1);
}
spellsContent = spellsContent.replace(oldBoltTarget, newBolt);
console.log('✓ sylph_spirit_bolt renderer updated successfully');

fs.writeFileSync('src/spells.js', spellsContent, 'utf8');
fs.writeFileSync('src/spells_2.js', spellsContent, 'utf8');
console.log('Written to src/spells.js and src/spells_2.js');

console.log('--- Updating getAvailableLevelUpChoices in src/game.js ---');
let gameContent = fs.readFileSync('src/game.js', 'utf8');

const oldEvoCheck = `    // 1. Check Evolutions (Tier 2 and Tier 3 Super Evolution!)
    for (const [wId, item] of Object.entries(p.weapons)) {
      const def = window.SPELL_DEFS[wId];
      if (def && def.evolution) {
        const evoDef = window.SPELL_DEFS[def.evolution];
        const isSuper = (def.type === 'evolution');

        if (isSuper) {
          // Tier 3 Super Evolution: Yêu cầu đạt Cấp 25+ và thời gian trận đấu >= 10 phút (600s)!
          const isMain = item.isStartingWeapon || wId === p.startingWeaponId || def.id === p.startingWeaponId;
          if (isMain && p.level >= 25 && this.gameTime >= 600 && evoDef && !p.weapons[evoDef.id]) {
            pool.push({
              id: evoDef.id,
              type: 'evolution',
              replaces: wId,
              name: evoDef.name,
              icon: evoDef.icon,
              badge: '🌟 SIÊU TIẾN HÓA LẦN 2 (TIER 3) - THỨC TỈNH TỐI THƯỢNG 🌟',
              description: evoDef.description,
              isEvolution: true,
              isSuperEvolution: true,
              isStartingWeapon: true
            });
          }
        } else {
          // Tier 2: Mọi vũ khí đạt Cấp 5 kèm sách yêu cầu có thể tiến hóa
          const hasReqPassive = !def.requires || p.passives[def.requires];
          if (item.level >= 5 && hasReqPassive && evoDef && !p.weapons[evoDef.id]) {
            pool.push({
              id: evoDef.id,
              type: 'evolution',
              replaces: wId,
              name: evoDef.name,
              icon: evoDef.icon,
              badge: 'TIẾN HÓA HUYỀN THOẠI ⭐⭐⭐',
              description: evoDef.description,
              isEvolution: true,
              isSuperEvolution: false,
              isStartingWeapon: !!item.isStartingWeapon
            });
          }
        }
      }
    }`;

const newEvoCheck = `    // 1. Check Evolutions (Tier 2 and Tier 3 Super Evolution!)
    for (const [wId, item] of Object.entries(p.weapons)) {
      const def = window.SPELL_DEFS[wId];
      if (def && (def.evolution || def.evolutions)) {
        const evoIds = Array.isArray(def.evolutions) ? def.evolutions : (def.evolution ? [def.evolution] : []);
        for (const evoId of evoIds) {
          const evoDef = window.SPELL_DEFS[evoId];
          if (!evoDef) continue;
          const isSuper = (def.type === 'evolution');

          if (isSuper) {
            // Tier 3 Super Evolution: Yêu cầu đạt Cấp 25+ và thời gian trận đấu >= 10 phút (600s)!
            const isMain = item.isStartingWeapon || wId === p.startingWeaponId || def.id === p.startingWeaponId;
            if (isMain && p.level >= 25 && this.gameTime >= 600 && !p.weapons[evoDef.id]) {
              pool.push({
                id: evoDef.id,
                type: 'evolution',
                replaces: wId,
                name: evoDef.name,
                icon: evoDef.icon,
                badge: '🌟 SIÊU TIẾN HÓA LẦN 2 (TIER 3) - THỨC TỈNH TỐI THƯỢNG 🌟',
                description: evoDef.description,
                isEvolution: true,
                isSuperEvolution: true,
                isStartingWeapon: true
              });
            }
          } else {
            // Tier 2: Mọi vũ khí đạt Cấp 5 kèm sách yêu cầu có thể tiến hóa
            const hasReqPassive = !def.requires || p.passives[def.requires];
            if (item.level >= 5 && hasReqPassive && !p.weapons[evoDef.id]) {
              pool.push({
                id: evoDef.id,
                type: 'evolution',
                replaces: wId,
                name: evoDef.name,
                icon: evoDef.icon,
                badge: evoDef.badge || 'TIẾN HÓA HUYỀN THOẠI ⭐⭐⭐',
                description: evoDef.description,
                isEvolution: true,
                isSuperEvolution: false,
                isStartingWeapon: !!item.isStartingWeapon
              });
            }
          }
        }
      }
    }`;

if (!gameContent.includes(oldEvoCheck)) {
  console.error('ERROR: oldEvoCheck not found in game.js!');
  process.exit(1);
}
gameContent = gameContent.replace(oldEvoCheck, newEvoCheck);

// Update evolution recipe info in weapon_upgrade
const oldUpgradeEvo = `        const evoDef = def.evolution ? window.SPELL_DEFS[def.evolution] : null;`;
const newUpgradeEvo = `        const evoIds = Array.isArray(def.evolutions) ? def.evolutions : (def.evolution ? [def.evolution] : []);
        const evoDef = evoIds.length > 0 ? window.SPELL_DEFS[evoIds[0]] : null;`;

gameContent = gameContent.replace(oldUpgradeEvo, newUpgradeEvo);

// Update evolutionInfo name if multi-evolution
const oldEvoInfoName = `            evoName: evoDef.name,`;
const newEvoInfoName = `            evoName: (def.evolutions && def.evolutions.length > 1) ? '3 Nhánh Spirit (Missile / Blade / Familiar)' : evoDef.name,`;

gameContent = gameContent.replace(oldEvoInfoName, newEvoInfoName);

fs.writeFileSync('src/game.js', gameContent, 'utf8');
fs.writeFileSync('src/game_2.js', gameContent, 'utf8');
console.log('Written to src/game.js and src/game_2.js');

console.log('ALL UPDATES COMPLETE!');
