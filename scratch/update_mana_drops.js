const fs = require('fs');

console.log('--- Updating drawDrop in src/sprites.js ---');

let spritesContent = fs.readFileSync('src/sprites.js', 'utf8');

const oldDrawDropStart = "  // =========================================================================\n  // DROPS & REWARDS\n  // =========================================================================";
const oldDrawDropEnd = "    ctx.restore();\n  }\n\n};";

const startIdx = spritesContent.indexOf(oldDrawDropStart);
const endIdx = spritesContent.indexOf(oldDrawDropEnd) + "    ctx.restore();\n  }".length;

if (startIdx === -1 || endIdx === -1) {
  console.error('ERROR: drawDrop region not found in sprites.js!');
  process.exit(1);
}

const newDrawDrop = `  // =========================================================================
  // DROPS & REWARDS (HỆ THỐNG HẠT MANA ĐA DẠNG 6 BẬC & MANA ĐẶC BIỆT)
  // =========================================================================
  drawDrop(ctx, drop, tick) {
    ctx.save();
    ctx.translate(drop.x, drop.y);

    const bob = Math.sin(tick * 0.16 + drop.x) * 3.5;

    // 1. STANDARD MANA DROPS (6 BẬC MANA HÌNH DÁNG & MÀU SẮC ĐỘC BẢN)
    if (drop.type === 'mana') {
      const val = drop.val || 1;

      // --- TIER 6: CELESTIAL RAINBOW PRISMATIC CORE (val >= 150) ---
      if (val >= 150) {
        const hue = (tick * 4) % 360;
        const rainbowColor = \`hsl(\${hue}, 100%, 65%)\`;
        const rainbowGlow = \`hsla(\${hue}, 100%, 65%, 0.85)\`;
        this.drawAura(ctx, 0, bob, 22, rainbowGlow, 24);

        // Rotating outer sacred rings
        ctx.save();
        ctx.strokeStyle = rainbowColor;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(0, bob, 16 + Math.sin(tick * 0.25) * 2, tick * 0.1, tick * 0.1 + Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = \`hsl(\${(hue + 180) % 360}, 100%, 75%)\`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, bob, 12, -tick * 0.15, -tick * 0.15 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // 8-Point Diamond Core
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = rainbowColor;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4 + tick * 0.08;
          const r = (i % 2 === 0) ? 11 : 5.5;
          const px = Math.cos(ang) * r;
          const py = bob + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // --- TIER 5: GOLDEN SOLAR MANA STAR (61 <= val < 150) ---
      else if (val >= 61) {
        this.drawAura(ctx, 0, bob, 18, 'rgba(251, 191, 36, 0.85)', 18);
        ctx.save();
        ctx.translate(0, bob);
        ctx.rotate(tick * 0.05);

        // 8-Point Radiant Star
        ctx.fillStyle = '#fbbf24';
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4;
          const r = (i % 2 === 0) ? 13.5 : 6.5;
          const px = Math.cos(ang) * r;
          const py = Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Shimmering White Center Diamond
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(0, -6.5);
        ctx.lineTo(4.5, 0);
        ctx.lineTo(0, 6.5);
        ctx.lineTo(-4.5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      // --- TIER 4: CRIMSON RUBY CORE (25 <= val <= 60) ---
      else if (val >= 25) {
        const pulse = Math.sin(tick * 0.3) * 1.5;
        const r = 10.5 + pulse;
        this.drawAura(ctx, 0, bob, r + 5, 'rgba(244, 63, 94, 0.75)', 16);

        // Dual Rhombus Ruby Gem
        ctx.fillStyle = '#f43f5e';
        ctx.strokeStyle = '#fecdd3';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, bob - r * 1.35);
        ctx.lineTo(r * 0.9, bob);
        ctx.lineTo(0, bob + r * 1.35);
        ctx.lineTo(-r * 0.9, bob);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Facets Shading
        ctx.fillStyle = '#be123c';
        ctx.beginPath();
        ctx.moveTo(0, bob - r * 1.35);
        ctx.lineTo(r * 0.9, bob);
        ctx.lineTo(0, bob);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#fda4af';
        ctx.beginPath();
        ctx.moveTo(0, bob - r * 1.35);
        ctx.lineTo(-r * 0.9, bob);
        ctx.lineTo(0, bob);
        ctx.closePath();
        ctx.fill();

        // White core glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, bob - 2, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      // --- TIER 3: AMETHYST OCTAHEDRAL SHARD (10 <= val <= 24) ---
      else if (val >= 10) {
        const r = 8.8;
        this.drawAura(ctx, 0, bob, r + 4, 'rgba(192, 132, 252, 0.7)', 14);

        // 8-Sided Octagonal Crystal
        ctx.fillStyle = '#c084fc';
        ctx.strokeStyle = '#f3e8ff';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const ang = (i * Math.PI) / 4 + Math.PI / 8;
          const px = Math.cos(ang) * (r * (i % 2 === 0 ? 1.15 : 0.85));
          const py = bob + Math.sin(ang) * (r * (i % 2 === 0 ? 1.15 : 0.85));
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner Shaded Facets
        ctx.fillStyle = '#7e22ce';
        ctx.beginPath();
        ctx.moveTo(0, bob);
        ctx.lineTo(r * 0.7, bob);
        ctx.lineTo(0, bob + r);
        ctx.lineTo(-r * 0.7, bob);
        ctx.closePath();
        ctx.fill();

        // Electric Purple Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, bob, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      // --- TIER 2: EMERALD HEXAGON PRISM (4 <= val <= 9) ---
      else if (val >= 4) {
        const r = 7.0;
        this.drawAura(ctx, 0, bob, r + 3.5, 'rgba(52, 211, 153, 0.65)', 12);

        // Regular Hexagon
        ctx.fillStyle = '#34d399';
        ctx.strokeStyle = '#ecfdf5';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = (i * Math.PI) / 3;
          const px = Math.cos(ang) * r;
          const py = bob + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Facet Cut lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, bob - r);
        ctx.lineTo(0, bob + r);
        ctx.moveTo(-r * 0.86, bob - r * 0.5);
        ctx.lineTo(r * 0.86, bob + r * 0.5);
        ctx.stroke();

        // Core Glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, bob, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      // --- TIER 1: LESSER CYAN TEARDROP (val <= 3) ---
      else {
        const r = 5.2;
        this.drawAura(ctx, 0, bob, r + 3, 'rgba(56, 189, 248, 0.55)', 10);

        // Teardrop / Droplet shape
        ctx.fillStyle = '#38bdf8';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, bob - r * 1.45); // Pointed tip
        ctx.bezierCurveTo(r * 1.1, bob - r * 0.4, r * 1.1, bob + r * 0.9, 0, bob + r * 1.1);
        ctx.bezierCurveTo(-r * 1.1, bob + r * 0.9, -r * 1.1, bob - r * 0.4, 0, bob - r * 1.45);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crescent Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.ellipse(-r * 0.25, bob - r * 0.2, r * 0.35, r * 0.55, -0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // 2. SPECIAL MANA DROP: VACUUM / MAGNET
    else if (drop.type === 'mana_vacuum') {
      this.drawAura(ctx, 0, bob, 18, 'rgba(56, 189, 248, 0.85)', 20);

      // Inward Suction Rings
      const ringR = 14 + Math.sin(tick * 0.4) * 3;
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, bob, ringR, tick * 0.2, tick * 0.2 + Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Cyan Core Orb
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, bob, 8.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Magnet Icon
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('🧲', 0, bob);
    }
    // 3. SPECIAL MANA DROP: FURY / LIGHTNING SPEED
    else if (drop.type === 'mana_fury') {
      this.drawAura(ctx, 0, bob, 18, 'rgba(245, 158, 11, 0.85)', 22);

      // Rotating Electric Star
      ctx.save();
      ctx.translate(0, bob);
      ctx.rotate(tick * 0.1);
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const ang = (i * Math.PI) / 2;
        const px = Math.cos(ang) * 11;
        const py = Math.sin(ang) * 11;
        const mx = Math.cos(ang + Math.PI / 4) * 4.5;
        const my = Math.sin(ang + Math.PI / 4) * 4.5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
        ctx.lineTo(mx, my);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('⚡', 0, bob);
    }
    // 4. SPECIAL MANA DROP: BLOOM / HEAL
    else if (drop.type === 'mana_bloom') {
      this.drawAura(ctx, 0, bob, 16, 'rgba(52, 211, 153, 0.85)', 18);

      // Lotus Petals (6 petals)
      ctx.save();
      ctx.translate(0, bob);
      for (let p = 0; p < 6; p++) {
        const ang = (p * Math.PI) / 3 + tick * 0.03;
        ctx.fillStyle = p % 2 === 0 ? '#34d399' : '#a7f3d0';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.ellipse(Math.cos(ang) * 5.5, Math.sin(ang) * 5.5, 5, 2.8, ang, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      // Golden Pollen Core
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // 5. SPECIAL MANA DROP: SURGE (X3 EXP)
    else if (drop.type === 'mana_surge') {
      this.drawAura(ctx, 0, bob, 18, 'rgba(251, 191, 36, 0.85)', 20);

      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, bob - 10);
      ctx.lineTo(9, bob);
      ctx.lineTo(0, bob + 10);
      ctx.lineTo(-9, bob);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#78350f';
      ctx.fillText('x3', 0, bob);
    }
    // 6. COIN (Clover Gold Coins)
    else if (drop.type === 'coin') {
      this.drawAura(ctx, 0, bob, 10, 'rgba(251, 191, 36, 0.55)', 10);
      ctx.fillStyle = '#f59e0b';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, bob, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner Clover stamp
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(0, bob, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    // 7. DIAMOND
    else if (drop.type === 'diamond') {
      this.drawAura(ctx, 0, bob, 14, 'rgba(56, 189, 248, 0.75)', 16);
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(0, bob - 9);
      ctx.lineTo(7, bob - 2);
      ctx.lineTo(0, bob + 9);
      ctx.lineTo(-7, bob - 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    // 8. TICKETS
    else if (drop.type === 'ticket' || drop.type === 'purple_ticket') {
      const isPurple = drop.type === 'purple_ticket';
      this.drawAura(ctx, 0, bob, 14, isPurple ? 'rgba(192, 132, 252, 0.8)' : 'rgba(245, 158, 11, 0.8)', 16);
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isPurple ? '🎟️' : '🎫', 0, bob);
    }
    // 9. FOOD / MEAT
    else if (drop.type === 'food') {
      this.drawAura(ctx, 0, bob, 14, 'rgba(249, 115, 22, 0.55)', 12);
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(0, bob, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.rect(-14, bob - 2, 5, 4);
      ctx.rect(9, bob - 2, 5, 4);
      ctx.fill();
    }
    // 10. CHEST
    else if (drop.type === 'chest') {
      this.drawAura(ctx, 0, bob, 22, 'rgba(234, 179, 8, 0.85)', 24);
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-12, bob - 4, 24, 14);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-12, bob - 4);
      ctx.bezierCurveTo(-12, bob - 14, 12, bob - 14, 12, bob - 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, bob - 1, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    // 11. ARTIFACT RELIC
    else if (drop.type === 'artifact_relic') {
      const hue = (tick * 4) % 360;
      this.drawAura(ctx, 0, bob, 24, \`hsla(\${hue}, 95%, 65%, 0.85)\`, 28);
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏺', 0, bob);
      ctx.strokeStyle = \`hsl(\${(hue + 60) % 360}, 100%, 75%)\`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, bob, 16 + Math.sin(tick * 0.2) * 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }`;

spritesContent = spritesContent.slice(0, startIdx) + newDrawDrop + spritesContent.slice(endIdx);
fs.writeFileSync('src/sprites.js', spritesContent, 'utf8');
console.log('✓ src/sprites.js updated successfully');

console.log('--- Updating src/game.js and src/game_2.js ---');
let gameContent = fs.readFileSync('src/game.js', 'utf8');

// 1. In player init: add furySpeedTimer
const oldPlayerInit = `      dashDurationTimer: 0,
      gravitySlowTimer: 0,`;
const newPlayerInit = `      dashDurationTimer: 0,
      gravitySlowTimer: 0,
      furySpeedTimer: 0,`;
if (gameContent.includes(oldPlayerInit)) {
  gameContent = gameContent.replace(oldPlayerInit, newPlayerInit);
  console.log('✓ Added furySpeedTimer to player init');
}

// 2. In player movement & update: handle furySpeedTimer
const oldSpeedCalc = `      if (p.isDashing) spd *= 2.8;
      if (p.gravitySlowTimer > 0) spd *= 0.8;`;
const newSpeedCalc = `      if (p.isDashing) spd *= 2.8;
      if (p.gravitySlowTimer > 0) spd *= 0.8;
      if (p.furySpeedTimer > 0) spd *= 1.35;`;
if (gameContent.includes(oldSpeedCalc)) {
  gameContent = gameContent.replace(oldSpeedCalc, newSpeedCalc);
  console.log('✓ Handled furySpeedTimer in speed calculation');
}

const oldTimerCountdown = `    if (p.gravitySlowTimer > 0) {
      p.gravitySlowTimer -= dt;
    }`;
const newTimerCountdown = `    if (p.gravitySlowTimer > 0) {
      p.gravitySlowTimer -= dt;
    }
    if (p.furySpeedTimer > 0) {
      p.furySpeedTimer -= dt;
    }`;
if (gameContent.includes(oldTimerCountdown)) {
  gameContent = gameContent.replace(oldTimerCountdown, newTimerCountdown);
  console.log('✓ Added furySpeedTimer countdown');
}

// 3. In onEnemyKilled: add chances for special mana drops
const oldDropSpawn = `    // Drops
    this.spawnDrop(enemy.x, enemy.y, 'mana', enemy.expValue);`;

const newDropSpawn = `    // Drops (Hệ thống Hạt Mana đa dạng 6 bậc + Tỷ lệ rơi Hạt Mana Đặc Biệt)
    const rSpecial = Math.random();
    if (!enemy.isBoss && rSpecial < 0.012) {
      // 1.2% chance: Hạt Mana Chân Không (Hút toàn bộ mana và vàng trên map)
      this.spawnDrop(enemy.x, enemy.y, 'mana_vacuum', enemy.expValue);
    } else if (!enemy.isBoss && rSpecial < 0.026) {
      // 1.4% chance: Hạt Mana Cuồng Nộ (Sấm sét quét quái + Tăng 35% tốc chạy)
      this.spawnDrop(enemy.x, enemy.y, 'mana_fury', enemy.expValue);
    } else if (!enemy.isBoss && rSpecial < 0.044) {
      // 1.8% chance: Hạt Mana Đột Biến (Nhân 3 lần EXP)
      this.spawnDrop(enemy.x, enemy.y, 'mana_surge', enemy.expValue);
    } else if (!enemy.isBoss && rSpecial < 0.065) {
      // 2.1% chance: Hoa Tinh Hoa Ma Pháp Trị Liệu (+20 HP & EXP)
      this.spawnDrop(enemy.x, enemy.y, 'mana_bloom', enemy.expValue);
    } else {
      // Hạt Mana thường (tự động đổi hình dáng và màu sắc theo 6 bậc EXP)
      this.spawnDrop(enemy.x, enemy.y, 'mana', enemy.expValue);
    }`;

if (gameContent.includes(oldDropSpawn)) {
  gameContent = gameContent.replace(oldDropSpawn, newDropSpawn);
  console.log('✓ Updated onEnemyKilled mana drop spawn logic');
}

// 4. In drop collection loop: handle special mana drops
const oldDropCollect = `      if (distSq < prSq) {
        if (drop.type === 'mana') {
          this.addExp(drop.val);
          window.soundEngine.pickup();
        } else if (drop.type === 'coin') {`;

const newDropCollect = `      if (distSq < prSq) {
        if (drop.type === 'mana') {
          this.addExp(drop.val);
          window.soundEngine.pickup();
        } else if (drop.type === 'mana_vacuum') {
          this.addExp(drop.val);
          this.magnetizeAllDrops();
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 30, text: '🧲 HÚT MANA TOÀN BẢN ĐỒ!', color: '#38bdf8', size: 16, life: 1.0 });
          this.spells.spawnShockwave(p.x, p.y, '#38bdf8', 350, 0.4);
          window.soundEngine.evolution();
        } else if (drop.type === 'mana_fury') {
          this.addExp(drop.val);
          p.furySpeedTimer = 4.0;
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 30, text: '⚡ MANA CUỒNG NỘ! (+35% TỐC CHẠY & SẤM SÉT)', color: '#f59e0b', size: 15, life: 1.0 });
          this.spells.spawnShockwave(p.x, p.y, '#f59e0b', 260, 0.35);
          const nearbyEnemies = this.getEnemiesNear(p.x, p.y, 250);
          for (const ne of nearbyEnemies) {
            if (!ne || ne.isDead || ne.hp <= 0) continue;
            this.spells.applyDamage(ne, 150, true, '#f59e0b');
          }
          window.soundEngine.dash();
        } else if (drop.type === 'mana_bloom') {
          this.addExp(drop.val);
          this.healPlayer(20);
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '💖 +20 HP TRỊ LIỆU!', color: '#34d399', size: 16, life: 0.8 });
          this.spells.spawnImpactParticles(p.x, p.y, '#34d399', 8);
          window.soundEngine.pickup();
        } else if (drop.type === 'mana_surge') {
          const surgeVal = drop.val * 3;
          this.addExp(surgeVal);
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 30, text: \`🌟 +\${surgeVal} EXP (x3 MANA SURGE)!\`, color: '#fbbf24', size: 17, life: 1.0 });
          this.spells.spawnImpactParticles(p.x, p.y, '#fbbf24', 12);
          window.soundEngine.evolution();
        } else if (drop.type === 'coin') {`;

if (gameContent.includes(oldDropCollect)) {
  gameContent = gameContent.replace(oldDropCollect, newDropCollect);
  console.log('✓ Handled special mana drop collection');
}

// 5. Add magnetizeAllDrops and consolidateDrops methods to Game
const oldSpawnDropDef = `  spawnDrop(x, y, type, val) {
    this.drops.push({
      x: x,
      y: y,
      type: type,
      val: val || 1,
      collected: false
    });
  }`;

const newSpawnDropDef = `  spawnDrop(x, y, type, val) {
    this.drops.push({
      x: x,
      y: y,
      type: type,
      val: val || 1,
      collected: false
    });
  }

  // Hút toàn bộ vật phẩm trên bản đồ
  magnetizeAllDrops() {
    for (const d of this.drops) {
      d.isMagnetized = true;
      d.magnetSpeed = 820;
    }
  }

  // Tự động gộp các hạt mana ở xa để chống tụt FPS và nâng cấp thành Hạt Mana Bậc Cao
  consolidateDrops() {
    const p = this.player;
    if (!p) return;
    for (let i = 0; i < this.drops.length - 1; i++) {
      const a = this.drops[i];
      if (a.type !== 'mana' || a.isMagnetized) continue;
      if (Math.hypot(a.x - p.x, a.y - p.y) < 220) continue;

      for (let j = i + 1; j < this.drops.length; j++) {
        const b = this.drops[j];
        if (b.type !== 'mana' || b.isMagnetized) continue;
        if (Math.hypot(a.x - b.x, a.y - b.y) < 160) {
          a.val += b.val;
          this.drops.splice(j, 1);
          return;
        }
      }
    }
  }`;

if (gameContent.includes(oldSpawnDropDef)) {
  gameContent = gameContent.replace(oldSpawnDropDef, newSpawnDropDef);
  console.log('✓ Added magnetizeAllDrops & consolidateDrops methods');
}

// 6. In update loop: call consolidateDrops when drops > 100
const oldDropsLoopStart = `    // Drops & Magnetism
    const pX = p.x;`;

const newDropsLoopStart = `    // Smart Mana Consolidation (Gộp hạt mana khi > 100 trên sân)
    if (this.drops.length > 100 && Math.random() < 0.2) {
      this.consolidateDrops();
    }

    // Drops & Magnetism
    const pX = p.x;`;

if (gameContent.includes(oldDropsLoopStart)) {
  gameContent = gameContent.replace(oldDropsLoopStart, newDropsLoopStart);
  console.log('✓ Added smart consolidation check to drops loop');
}

fs.writeFileSync('src/game.js', gameContent, 'utf8');
fs.writeFileSync('src/game_2.js', gameContent, 'utf8');
console.log('Written to src/game.js and src/game_2.js');

console.log('--- Updating index.html cache buster to v=bc182 ---');
let htmlContent = fs.readFileSync('index.html', 'utf8');
htmlContent = htmlContent.replace(/v=bc181/g, 'v=bc182');
fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('✓ index.html updated to v=bc182');

console.log('ALL MANA DROPS UPDATES COMPLETE!');
