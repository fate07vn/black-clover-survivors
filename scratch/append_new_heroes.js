const fs = require('fs');

const spritesPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js';
let code = fs.readFileSync(spritesPath, 'utf8');

const heroMethods = `
  // =========================================================================
  // HERO: MEREOLEONA VERMILLION (Sư Tử Lửa Bất Bại / Uncrowned Lioness)
  // =========================================================================
  drawMereoleona(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.25);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // 1. Fiery Mana Skin Aura with Lion Head Phantom
    this.drawAura(ctx, 0, -4 + bob, 30, 'rgba(239, 68, 68, 0.45)', 24);
    this.drawAura(ctx, 0, -4 + bob, 18, 'rgba(245, 158, 11, 0.55)', 16);

    // Lion Phantom Silhouette behind her
    ctx.save();
    ctx.translate(0, -18 + bob);
    const lionPulse = Math.sin(tick * 0.15) * 2;
    ctx.strokeStyle = 'rgba(251, 146, 60, 0.55)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 0, 14 + lionPulse, Math.PI * 0.8, Math.PI * 2.2);
    // Lion ears
    ctx.lineTo(-12, -18);
    ctx.lineTo(-7, -13);
    ctx.lineTo(7, -13);
    ctx.lineTo(12, -18);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 2. Animated Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#7f1d1d',
      bootColor: '#450a0a',
      buckleColor: '#f59e0b',
      cuffColor: '#f97316',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8
    });

    // 3. Vermillion Fur-Trimmed Cape (Back)
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-10, -8 + bob);
    ctx.lineTo(-16 - Math.sin(anim.cycle) * 4, 14 + bob);
    ctx.lineTo(12 + Math.sin(anim.cycle) * 4, 14 + bob);
    ctx.lineTo(10, -8 + bob);
    ctx.closePath();
    ctx.fill();

    // 4. Combat Tunic & Belt
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    // Gold sash & buckle
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8, 3 + bob, 16, 3);
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-2.5, 2.5 + bob, 5, 4);

    // Fur collar around neck
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.ellipse(0, -9 + bob, 10, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 5. Head, Face & War-Paint
    ctx.fillStyle = '#fde68a'; // Tanned skin
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 7, 0, Math.PI * 2);
    ctx.fill();

    // Sharp anime eyes & red war paint on cheeks
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(-6, -15 + bob, 3, 1.5);
    ctx.fillRect(3, -15 + bob, 3, 1.5);

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-2.5, -16 + bob, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -16 + bob, 1.2, 0, Math.PI * 2);
    ctx.fill();
    // Blue pupil gleam
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(-2.2, -16 + bob, 0.6, 0, Math.PI * 2);
    ctx.arc(2.8, -16 + bob, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Confident grin
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, -13 + bob, 2.5, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // 6. Wild Spiky Vermillion Lion Mane
    ctx.fillStyle = '#ea580c';
    for (let i = 0; i < 7; i++) {
      const ang = -Math.PI * 0.8 + (i * Math.PI * 1.6) / 6;
      const sway = Math.sin(tick * 0.15 + i) * 2;
      const tipDist = 15 + (i % 3) * 3;
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang - 0.25) * 6, -16 + bob + Math.sin(ang - 0.25) * 6);
      ctx.lineTo(Math.cos(ang) * tipDist + sway, -16 + bob + Math.sin(ang) * tipDist);
      ctx.lineTo(Math.cos(ang + 0.25) * 6, -16 + bob + Math.sin(ang + 0.25) * 6);
      ctx.closePath();
      ctx.fill();
    }
    // Golden fiery crown highlights
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-5, -20 + bob);
    ctx.lineTo(0, -26 + bob + Math.sin(tick * 0.2) * 2);
    ctx.lineTo(5, -20 + bob);
    ctx.fill();

    // 7. Calidos Brachium Flame Claws / Fists
    for (let side = -1; side <= 1; side += 2) {
      const fx = side * 11;
      const fy = -2 + bob + Math.sin(anim.cycle + side) * 3;

      // Flaming gauntlet
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.arc(fx, fy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Fire claws
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 8;
      for (let c = -1; c <= 1; c++) {
        ctx.beginPath();
        ctx.moveTo(fx + c * 2, fy - 1);
        ctx.lineTo(fx + c * 3 + side * 4, fy + 4);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: FUEGOLEON VERMILLION (Đoàn Trưởng Hồng Liên Sư Tử / Salamander)
  // =========================================================================
  drawFuegoleon(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Royal Flame Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(220, 38, 38, 0.4)', 20);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#7f1d1d',
      bootColor: '#18181b',
      cuffColor: '#fbbf24',
      thighLen: 8,
      bootLen: 8
    });

    // Crimson Royal Robe
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-8, -10 + bob, 16, 17);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-9, 4 + bob, 18, 3);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 7, 0, Math.PI * 2);
    ctx.fill();

    // Red Diamond Flame Mark on Forehead
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(0, -21 + bob);
    ctx.lineTo(2, -19 + bob);
    ctx.lineTo(0, -17 + bob);
    ctx.lineTo(-2, -19 + bob);
    ctx.closePath();
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-3, -16 + bob, 2, 1.5);
    ctx.fillRect(1, -16 + bob, 2, 1.5);

    // Sleek Crimson Hair
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(-7, -16 + bob);
    ctx.bezierCurveTo(-8, -25 + bob, 8, -25 + bob, 7, -16 + bob);
    ctx.lineTo(4, -12 + bob);
    ctx.lineTo(-4, -12 + bob);
    ctx.closePath();
    ctx.fill();

    // BLAZING SALAMANDER FIRE ARM (Right side of body)
    ctx.save();
    ctx.translate(10, -4 + bob);
    const fireFlicker = Math.sin(tick * 0.25) * 2;
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.quadraticCurveTo(8 + fireFlicker, 2, 6, 12);
    ctx.lineTo(-2, 10);
    ctx.quadraticCurveTo(2, 2, 0, -4);
    ctx.fill();

    // Dragon claws
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(4, 12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: LUMIERE SILVAMILLION CLOVER (Đệ Nhất Ma Pháp Đế)
  // =========================================================================
  drawLumiere(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Radiant Golden Light Aura
    this.drawAura(ctx, 0, -6 + bob, 28, 'rgba(250, 204, 21, 0.45)', 24);

    // 4 Floating Celestial Light Swords in a semi-circle behind him
    ctx.save();
    ctx.translate(0, -10 + bob);
    for (let i = 0; i < 4; i++) {
      const ang = -Math.PI * 0.75 + (i * Math.PI * 1.5) / 3;
      const dist = 22 + Math.sin(tick * 0.1 + i) * 3;
      const sx = Math.cos(ang) * dist;
      const sy = Math.sin(ang) * dist;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(ang + Math.PI / 2);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#eab308';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(2.5, 4);
      ctx.lineTo(0, 10);
      ctx.lineTo(-2.5, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
    ctx.restore();

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#f8fafc',
      bootColor: '#d97706',
      buckleColor: '#fef08a',
      cuffColor: '#fef08a',
      thighLen: 8,
      bootLen: 8
    });

    // Prince White & Gold Tunic
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-8, 3 + bob, 16, 3);
    // Royal Epaulettes
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-9, -10 + bob, 4, 3);
    ctx.fillRect(5, -10 + bob, 4, 3);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Golden Eyes
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-3, -16 + bob, 2, 1.5);
    ctx.fillRect(1, -16 + bob, 2, 1.5);

    // Golden Spiky Prince Hair
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(-6, -17 + bob);
    ctx.lineTo(-9, -24 + bob);
    ctx.lineTo(-4, -22 + bob);
    ctx.lineTo(0, -27 + bob);
    ctx.lineTo(4, -22 + bob);
    ctx.lineTo(9, -24 + bob);
    ctx.lineTo(6, -17 + bob);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  },

  // =========================================================================
  // HERO: LICHT (Thủ Lĩnh Tộc Elf / Swords of Origin)
  // =========================================================================
  drawLicht(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Pure Elven Light Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(56, 189, 248, 0.35)', 20);

    // Two Floating Origin Swords
    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      const hx = side * 16;
      const hy = -12 + bob + Math.sin(tick * 0.12 + side) * 3;
      ctx.translate(hx, hy);
      ctx.rotate(side * 0.25);
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(3, 4);
      ctx.lineTo(0, 12);
      ctx.lineTo(-3, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#f1f5f9',
      bootColor: '#475569',
      cuffColor: '#94a3b8',
      thighLen: 8,
      bootLen: 8
    });

    // Flowing White Elf Tunic
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-7, -10 + bob);
    ctx.lineTo(-11, 8 + bob);
    ctx.lineTo(11, 8 + bob);
    ctx.lineTo(7, -10 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#10b981'; // Emerald jewel
    ctx.beginPath();
    ctx.arc(0, -6 + bob, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Red Elf Tattoo Marks under eyes
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-4, -14 + bob, 2.5, 1);
    ctx.fillRect(1.5, -14 + bob, 2.5, 1);

    // Golden Eyes
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-3, -16 + bob, 1.8, 1.5);
    ctx.fillRect(1.2, -16 + bob, 1.8, 1.5);

    // Long Silvery White Braided Hair
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -17 + bob);
    ctx.bezierCurveTo(-8, -24 + bob, 8, -24 + bob, 6, -17 + bob);
    ctx.fill();
    // Braid trailing backward
    ctx.beginPath();
    ctx.moveTo(-4, -16 + bob);
    ctx.bezierCurveTo(-12, -10 + bob, -14, 4 + bob, -12 - Math.sin(anim.cycle) * 3, 14 + bob);
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.restore();
  },

  // =========================================================================
  // HERO: NACHT FAUST (Phó Đoàn Trưởng Hắc Bộc Ngưu & 4 Ác Quỷ)
  // =========================================================================
  drawNacht(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Shadow Mist Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(59, 7, 100, 0.5)', 22);

    // Four Cute Mini Devils orbiting around him (Gimodelo, Slitos, Plumede, Walgner)
    for (let i = 0; i < 4; i++) {
      const ang = tick * 0.08 + (i * Math.PI * 2) / 4;
      const dx = Math.cos(ang) * 20;
      const dy = -10 + bob + Math.sin(ang) * 10;
      ctx.save();
      ctx.translate(dx, dy);
      // Mini body
      ctx.fillStyle = ['#18181b', '#3b0764', '#0f172a', '#1e1b4b'][i];
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      // Mini devil horns
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-2, -3);
      ctx.lineTo(-4, -7);
      ctx.lineTo(0, -3);
      ctx.moveTo(0, -3);
      ctx.lineTo(4, -7);
      ctx.lineTo(2, -3);
      ctx.fill();
      // Mini white eyes
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-1.5, -1, 1, 1);
      ctx.fillRect(0.5, -1, 1, 1);
      ctx.restore();
    }

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#09090b',
      bootColor: '#18181b',
      cuffColor: '#27272a',
      thighLen: 8,
      bootLen: 8
    });

    // Dark Assassin Coat
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    // Uptown fur collar
    ctx.fillStyle = '#71717a';
    ctx.fillRect(-8, -12 + bob, 16, 4);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Twin Shadow Devil Horns
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, -20 + bob);
    ctx.lineTo(-8, -28 + bob);
    ctx.lineTo(-1, -21 + bob);
    ctx.moveTo(1, -21 + bob);
    ctx.lineTo(8, -28 + bob);
    ctx.lineTo(3, -20 + bob);
    ctx.fill();
    ctx.stroke();

    // Dark sleek ponytail
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-5, -17 + bob);
    ctx.bezierCurveTo(-7, -24 + bob, 7, -24 + bob, 5, -17 + bob);
    ctx.fill();
    // Ponytail trailing
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-4, -18 + bob);
    ctx.bezierCurveTo(-10, -14 + bob, -12, -4 + bob, -10, 4 + bob);
    ctx.stroke();

    ctx.restore();
  },

  // =========================================================================
  // HERO: SECRE SWALLOWTAIL (Nero / Phong Ấn Ma Pháp)
  // =========================================================================
  drawSecre(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Teal Sealing Rune Aura
    this.drawAura(ctx, 0, -4 + bob, 24, 'rgba(56, 189, 248, 0.35)', 18);

    // Raven Wings on Back
    const wingFlap = Math.sin(tick * 0.15) * 4;
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(0, -8 + bob);
      ctx.quadraticCurveTo(side * 18, -20 + bob + wingFlap, side * 24, -4 + bob);
      ctx.quadraticCurveTo(side * 14, 4 + bob, 0, 0 + bob);
      ctx.fill();
      ctx.stroke();
    }

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#0f172a',
      bootColor: '#020617',
      cuffColor: '#38bdf8',
      thighLen: 7,
      bootLen: 7
    });

    // Gothic Black Dress
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(-6, -10 + bob);
    ctx.lineTo(-9, 6 + bob);
    ctx.lineTo(9, 6 + bob);
    ctx.lineTo(6, -10 + bob);
    ctx.closePath();
    ctx.fill();

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6, 0, Math.PI * 2);
    ctx.fill();

    // Red Apathetic Eyes
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-3, -16 + bob, 2, 1.2);
    ctx.fillRect(1, -16 + bob, 2, 1.2);

    // Black Hair & Nero Devil Horns
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(0, -18 + bob, 7, Math.PI, Math.PI * 2);
    ctx.fill();
    // Two cute sharp horns
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.moveTo(-3, -20 + bob);
    ctx.lineTo(-6, -26 + bob);
    ctx.lineTo(-1, -21 + bob);
    ctx.moveTo(1, -21 + bob);
    ctx.lineTo(6, -26 + bob);
    ctx.lineTo(3, -20 + bob);
    ctx.fill();

    // Floating Sealing Magic Stones
    for (let i = 0; i < 3; i++) {
      const ang = tick * 0.08 + (i * Math.PI * 2) / 3;
      const sx = Math.cos(ang) * 16;
      const sy = -6 + bob + Math.sin(ang) * 6;
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.fillRect(sx - 2, sy - 3, 4, 6);
      ctx.strokeRect(sx - 2, sy - 3, 4, 6);
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: CHARLOTTE ROSELEI (Đoàn Trưởng Lam Hồng Hoa / Briar Rose)
  // =========================================================================
  drawCharlotte(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Blue Rose Aura
    this.drawAura(ctx, 0, -4 + bob, 24, 'rgba(37, 99, 235, 0.4)', 18);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#1e3a8a',
      bootColor: '#cbd5e1',
      cuffColor: '#60a5fa',
      thighLen: 8,
      bootLen: 8
    });

    // Silver Knight Armor & Royal Blue Cape
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(-8, -10 + bob, 16, 16);
    ctx.fillStyle = '#e2e8f0'; // Silver breastplate
    ctx.fillRect(-6, -9 + bob, 12, 10);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Blue Eyes
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-3, -16 + bob, 2, 1.5);
    ctx.fillRect(1, -16 + bob, 2, 1.5);

    // Long Blonde Braid with Tiara
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(-6, -17 + bob);
    ctx.bezierCurveTo(-7, -23 + bob, 7, -23 + bob, 6, -17 + bob);
    ctx.fill();
    // Tiara
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-4, -20 + bob, 8, 2);

    // Blue Briar Rose Rapier with blooming rose
    ctx.save();
    ctx.translate(11, -2 + bob);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(4, 12);
    ctx.stroke();
    // Blooming blue rose on crossguard
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, -4, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: WILLIAM VANGEANCE (Đoàn Trưởng Kim Sắc Nhật Minh / World Tree)
  // =========================================================================
  drawWilliam(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // World Tree Emerald Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(16, 185, 129, 0.4)', 20);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#064e3b',
      bootColor: '#d97706',
      cuffColor: '#34d399',
      thighLen: 8,
      bootLen: 8
    });

    // Golden Dawn White/Teal Cape
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-8, -10 + bob, 16, 16);
    ctx.fillStyle = '#059669';
    ctx.fillRect(-8, 3 + bob, 16, 3);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Iconic Golden Peacock Mask
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-7, -21 + bob);
    ctx.lineTo(0, -13 + bob);
    ctx.lineTo(7, -21 + bob);
    ctx.lineTo(4, -25 + bob);
    ctx.lineTo(-4, -25 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Floating World Tree magical roots & leaves
    for (let i = 0; i < 3; i++) {
      const la = tick * 0.1 + (i * Math.PI * 2) / 3;
      const lx = Math.cos(la) * 16;
      const ly = -6 + bob + Math.sin(la) * 6;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.ellipse(lx, ly, 3, 1.5, la, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: NOZEL SILVA (Đoàn Trưởng Ngân Dực Đại Bàng / Mercury)
  // =========================================================================
  drawNozel(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Mercury Silver Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(148, 163, 184, 0.45)', 20);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#1e1b4b',
      bootColor: '#e2e8f0',
      cuffColor: '#818cf8',
      thighLen: 8,
      bootLen: 8
    });

    // Silver Armor & Lavender Mantle
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    ctx.fillStyle = '#818cf8';
    ctx.fillRect(-8, 3 + bob, 16, 3);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Silver Braid down center of face
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(0, -22 + bob);
    ctx.lineTo(2, -10 + bob);
    ctx.lineTo(-2, -10 + bob);
    ctx.fill();

    // Orbiting Liquid Mercury Drops
    for (let i = 0; i < 4; i++) {
      const ang = tick * 0.12 + (i * Math.PI * 2) / 4;
      const mx = Math.cos(ang) * 17;
      const my = -6 + bob + Math.sin(ang) * 6;
      ctx.fillStyle = '#f8fafc';
      ctx.shadowColor = '#cbd5e1';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: JACK THE RIPPER (Đoàn Trưởng Thúy Lục Bọ Ngựa / Slash Magic)
  // =========================================================================
  drawJack(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.25);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Emerald Wind Slicing Aura
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(34, 197, 94, 0.4)', 20);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#14532d',
      bootColor: '#052e16',
      cuffColor: '#4ade80',
      thighLen: 9,
      bootLen: 9
    });

    // Tall Green Coat
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-6, -11 + bob, 12, 18);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -17 + bob, 6, 0, Math.PI * 2);
    ctx.fill();

    // Manic Slashing Grin
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-4, -14 + bob);
    ctx.lineTo(4, -14 + bob);
    ctx.stroke();

    // Green Mantis Scythe Arms
    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      const ax = side * 10;
      const ay = -4 + bob;
      ctx.translate(ax, ay);
      ctx.fillStyle = '#22c55e';
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(side * 8, 4, side * 14, 16);
      ctx.quadraticCurveTo(side * 2, 8, 0, 0);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: MAGNA SWING (Côn Đồ Hỏa Cầu / Flame Delinquent)
  // =========================================================================
  drawMagna(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.2);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Flame Aura
    this.drawAura(ctx, 0, -4 + bob, 24, 'rgba(239, 68, 68, 0.4)', 18);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#18181b',
      bootColor: '#7f1d1d',
      cuffColor: '#f97316',
      thighLen: 8,
      bootLen: 8
    });

    // Delinquent Vest
    ctx.fillStyle = '#27272a';
    ctx.fillRect(-7, -10 + bob, 14, 16);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Cool Black Sunglasses & Headband
    ctx.fillStyle = '#dc2626'; // Headband
    ctx.fillRect(-6, -21 + bob, 12, 3);
    ctx.fillStyle = '#09090b'; // Shades
    ctx.fillRect(-4, -17 + bob, 8, 3);

    // Spiky Black & Flame-Tipped Mohawk
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.moveTo(-4, -21 + bob);
    ctx.lineTo(-7, -27 + bob);
    ctx.lineTo(0, -29 + bob);
    ctx.lineTo(7, -27 + bob);
    ctx.lineTo(4, -21 + bob);
    ctx.fill();

    // Flaming Spiked Baseball Bat held over shoulder
    ctx.save();
    ctx.translate(10, -8 + bob);
    ctx.rotate(0.4);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-2, -14, 4, 20);
    // Spikes & Flame wrap
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -10, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: CHARMY PAPPITSON (Miên Hoa Ma Pháp & Chú Cừu Đầu Bếp)
  // =========================================================================
  drawCharmy(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Fluffy Cotton Cloud beneath her
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.shadowColor = '#fef08a';
    ctx.shadowBlur = 8;
    for (let c = -2; c <= 2; c++) {
      ctx.beginPath();
      ctx.arc(c * 6, 8 + bob, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#ffffff',
      bootColor: '#f59e0b',
      cuffColor: '#fbbf24',
      thighLen: 5,
      bootLen: 5
    });

    // Cute White Apron Dress
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -8 + bob, 12, 12);
    ctx.fillStyle = '#10b981'; // Clover badge
    ctx.beginPath();
    ctx.arc(0, -4 + bob, 2, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -14 + bob, 6, 0, Math.PI * 2);
    ctx.fill();

    // Cute Cheeks & Eyes
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(-4, -12 + bob, 1.5, 0, Math.PI * 2);
    ctx.arc(4, -12 + bob, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Double Hair Buns & Chef Bandana
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(-7, -18 + bob, 3.5, 0, Math.PI * 2);
    ctx.arc(7, -18 + bob, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Cotton Sheep Chef with Ladle
    ctx.save();
    ctx.translate(-14, -6 + bob);
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    // Sheep horns
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-5, -4, 2, 0, Math.PI * 2);
    ctx.arc(5, -4, 2, 0, Math.PI * 2);
    ctx.fill();
    // Wooden Ladle
    ctx.fillStyle = '#92400e';
    ctx.fillRect(4, -10, 2, 14);
    ctx.beginPath();
    ctx.arc(5, -10, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: ZORA IDEALE (Hôi Ma Pháp Sư / Cạm Bẫy)
  // =========================================================================
  drawZora(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Cyan Trap Rune Aura
    this.drawAura(ctx, 0, -4 + bob, 24, 'rgba(6, 182, 212, 0.4)', 18);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#18181b',
      bootColor: '#083344',
      cuffColor: '#06b6d4',
      thighLen: 8,
      bootLen: 8
    });

    // Dark Leather Coat
    ctx.fillStyle = '#27272a';
    ctx.fillRect(-7, -10 + bob, 14, 16);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Teeth-patterned Lower Face Mask
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-5, -15 + bob, 10, 4);
    ctx.fillStyle = '#ffffff';
    for (let t = -3; t <= 3; t += 2) {
      ctx.fillRect(t, -14 + bob, 1.2, 2);
    }

    // Cyan Spiky Hair
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.moveTo(-6, -18 + bob);
    ctx.lineTo(-9, -26 + bob);
    ctx.lineTo(-2, -24 + bob);
    ctx.lineTo(2, -28 + bob);
    ctx.lineTo(6, -24 + bob);
    ctx.lineTo(9, -26 + bob);
    ctx.lineTo(6, -18 + bob);
    ctx.fill();

    // Floating Counter-Trap Seal beneath feet
    ctx.save();
    ctx.translate(0, 10 + bob);
    ctx.rotate(tick * 0.05);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: FINRAL ROULACASE (Không Gian Ma Pháp / Spatial Portal)
  // =========================================================================
  drawFinral(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Spatial Portal Rings on Left and Right
    for (let side = -1; side <= 1; side += 2) {
      ctx.save();
      const px = side * 18;
      const py = -6 + bob;
      ctx.translate(px, py);
      ctx.rotate(tick * 0.08 * side);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#818cf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, 7, 14, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#1e293b',
      bootColor: '#0284c7',
      cuffColor: '#38bdf8',
      thighLen: 8,
      bootLen: 8
    });

    // Black Bulls Robe
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8, 3 + bob, 16, 3);

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Light Brown Hair with Green Highlights
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.arc(0, -18 + bob, 7, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e'; // Green tips
    ctx.fillRect(-3, -24 + bob, 6, 2.5);

    ctx.restore();
  },

  // =========================================================================
  // HERO: DOROTHY UNSWORTH (Mộng Huyễn Ma Pháp / Dream Witch)
  // =========================================================================
  drawDorothy(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Pastel Pink Dream Cloud
    ctx.fillStyle = 'rgba(244, 114, 182, 0.4)';
    this.drawAura(ctx, 0, -4 + bob, 26, 'rgba(244, 114, 182, 0.4)', 20);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#581c87',
      bootColor: '#a855f7',
      cuffColor: '#f472b6',
      thighLen: 7,
      bootLen: 7
    });

    // Purple Witch Robe
    ctx.fillStyle = '#7e22ce';
    ctx.fillRect(-7, -10 + bob, 14, 16);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Oversized Floppy Purple Witch Hat with Crescent Moon
    ctx.fillStyle = '#581c87';
    ctx.beginPath();
    ctx.ellipse(0, -20 + bob, 12, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Hat cone curving
    ctx.beginPath();
    ctx.moveTo(-6, -20 + bob);
    ctx.quadraticCurveTo(-2, -32 + bob, 10, -30 + bob);
    ctx.lineTo(6, -20 + bob);
    ctx.closePath();
    ctx.fill();
    // Gold moon
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(8, -30 + bob, 3, 0, Math.PI * 2);
    ctx.fill();

    // Floating Dream Bubbles
    for (let i = 0; i < 3; i++) {
      const ba = tick * 0.08 + (i * Math.PI * 2) / 3;
      const bx = Math.cos(ba) * 16;
      const by = -12 + bob + Math.sin(ba) * 8;
      ctx.fillStyle = 'rgba(232, 121, 249, 0.5)';
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  },

  // =========================================================================
  // HERO: RILL BOISMORTIER (Hội Họa Ma Pháp / Picture Magic)
  // =========================================================================
  drawRill(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // Rainbow Paint Splatter Aura
    this.drawAura(ctx, 0, -4 + bob, 24, 'rgba(56, 189, 248, 0.4)', 18);

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#0369a1',
      bootColor: '#0284c7',
      cuffColor: '#f59e0b',
      thighLen: 8,
      bootLen: 8
    });

    // Artist Smock with Paint Splatters
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    // Colorful splatters
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-4, -6 + bob, 2.5, 2.5);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(2, -4 + bob, 2.5, 2.5);
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-2, 2 + bob, 2.5, 2.5);

    // Head & Beret
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Blue Beret
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.ellipse(0, -21 + bob, 8, 3.5, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Giant Paintbrush Staff dripping with paint
    ctx.save();
    ctx.translate(11, -4 + bob);
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-1.5, -14, 3, 22);
    // Brush head
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(0, -14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // HERO: PATRY (Quang Ma Pháp / 4 Cánh Ánh Sáng)
  // =========================================================================
  drawPatry(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getLegAnim(p, tick, 1.15);
    const bob = anim.walkBob;

    ctx.save();
    ctx.scale(facing, 1);

    // 4 Celestial Light Wings
    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 12;
    for (let side = -1; side <= 1; side += 2) {
      // Top Wing
      ctx.beginPath();
      ctx.moveTo(0, -8 + bob);
      ctx.quadraticCurveTo(side * 22, -26 + bob, side * 28, -8 + bob);
      ctx.quadraticCurveTo(side * 14, 2 + bob, 0, 0 + bob);
      ctx.fill();
      ctx.stroke();
      // Bottom Wing
      ctx.beginPath();
      ctx.moveTo(0, 0 + bob);
      ctx.quadraticCurveTo(side * 18, 14 + bob, side * 22, 22 + bob);
      ctx.quadraticCurveTo(side * 10, 16 + bob, 0, 6 + bob);
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Legs
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#f8fafc',
      bootColor: '#d97706',
      cuffColor: '#fef08a',
      thighLen: 8,
      bootLen: 8
    });

    // White Robe of the Sun
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-7, -10 + bob, 14, 16);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8, 3 + bob, 16, 3);

    // Head
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -16 + bob, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Golden Tears of Conviction
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-3, -13 + bob, 1.5, 3);
    ctx.fillRect(1.5, -13 + bob, 1.5, 3);

    ctx.restore();
  },
`;

// Insert all hero methods before `drawEnemy(ctx, e, tick) {`
const insertTarget = '  // =========================================================================\n  // ENEMY & BOSS SPRITE ROUTER';

if (code.includes(insertTarget)) {
  code = code.replace(insertTarget, heroMethods + '\n' + insertTarget);
  fs.writeFileSync(spritesPath, code, 'utf8');
  console.log('Successfully injected 17 detailed anime hero methods into src/sprites.js!');
} else {
  console.error('Failed to find insert target for hero methods');
}
