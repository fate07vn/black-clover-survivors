const fs = require('fs');

const mobsAndBossesCode = `
  // -------------------------------------------------------------------------
  // BESTIARY 1: BANDIT (Đạo Tặc Thảo Nguyên - Rogue Assassin)
  // -------------------------------------------------------------------------
  drawBandit(ctx, e, tick) {
    const bob = Math.sin(tick * 0.25) * 1.5;
    const wave = Math.sin(tick * 0.28) * 3;

    // 1. Fluttering Crimson Rogue Scarf (Trailing behind)
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(0, -12 + bob);
    ctx.quadraticCurveTo(-14 + wave, -14 + bob, -22 + wave * 1.5, -4 + bob);
    ctx.lineTo(-20 + wave * 1.5, -1 + bob);
    ctx.quadraticCurveTo(-12 + wave, -10 + bob, 0, -8 + bob);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // 2. Layered Ragged Rogue Cloak with Leather Straps
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(0, -14 + bob);
    ctx.bezierCurveTo(-13, -4, -15, 10, -11, 15);
    ctx.lineTo(10, 15);
    ctx.bezierCurveTo(14, 10, 12, -4, 0, -14 + bob);
    ctx.closePath();
    ctx.fill();

    // Leather belt & silver buckle
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-7, 2 + bob, 14, 2.5);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-2, 1.5 + bob, 4, 3.5);

    // 3. Assassin Hood & Mask
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.moveTo(-6, -12 + bob);
    ctx.bezierCurveTo(-9, -21 + bob, 9, -21 + bob, 6, -12 + bob);
    ctx.lineTo(0, -5 + bob);
    ctx.closePath();
    ctx.fill();

    // 4. Glowing Red Assassin Eyes with Smoke Trail
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-2.8, -12 + bob, 1.3, 0, Math.PI * 2);
    ctx.arc(2.8, -12 + bob, 1.3, 0, Math.PI * 2);
    ctx.fill();
    // Smoke trail
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.fillRect(-6, -13 + bob, 3, 1);
    ctx.shadowBlur = 0;

    // 5. Dual Curved Kukri Poison Blades (Neon Green Venom Drip)
    for (let side = -1; side <= 1; side += 2) {
      const dx = side * 11;
      const dy = 2 + bob;
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(side * 0.3);

      // Blade
      ctx.fillStyle = '#f1f5f9';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(side * 8, -7);
      ctx.lineTo(side * 5, 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Dripping toxic green venom
      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(side * 8, -7, 1.8, 0, Math.PI * 2);
      ctx.arc(side * 5, 8, 1.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  },

  // -------------------------------------------------------------------------
  // BESTIARY 2: CULTIST (Bạch Y Giáo Đồ Ma Nhãn / Golden Eye Cultist)
  // -------------------------------------------------------------------------
  drawCultist(ctx, e, tick) {
    const bob = Math.sin(tick * 0.2) * 1.5;
    const float = Math.sin(tick * 0.15) * 3;

    // 1. Golden Eye Arcane Hooded Robe
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(0, -18 + bob);
    ctx.bezierCurveTo(-14, -6, -16, 12, -12, 16);
    ctx.lineTo(12, 16);
    ctx.bezierCurveTo(16, 12, 14, -6, 0, -18 + bob);
    ctx.closePath();
    ctx.fill();

    // Golden runic borders & hem
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Midnight Sun Golden Eye Crest on Chest
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#d97706';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(0, -2 + bob, 5, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, -2 + bob, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Arcane Third Eye on Hood
    ctx.fillStyle = '#eab308';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, -13 + bob, 3, 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -13 + bob, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Floating Open Golden Talisman Scroll
    ctx.save();
    ctx.translate(12, -4 + bob + float);
    ctx.rotate(0.2);
    ctx.fillStyle = '#fef3c7';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    ctx.fillRect(-5, -7, 10, 14);
    ctx.strokeRect(-5, -7, 10, 14);
    // Glowing golden hieroglyphic runes
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-3, -4, 6, 1.2);
    ctx.fillRect(-3, -1, 6, 1.2);
    ctx.fillRect(-3, 2, 6, 1.2);
    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 3: ZOMBIE (Tử Thi Khôi Lỗi - Rades Corpse Puppet)
  // -------------------------------------------------------------------------
  drawZombie(ctx, e, tick) {
    const lurch = Math.sin(tick * 0.16) * 3;
    const drool = Math.sin(tick * 0.3) * 2;

    // 1. Ghastly Stitched Grey-Purple Rotten Skin
    ctx.fillStyle = '#475569';
    ctx.beginPath();
    ctx.moveTo(-6, -12 + lurch);
    ctx.lineTo(-9, 12);
    ctx.lineTo(9, 12);
    ctx.lineTo(6, -12 + lurch);
    ctx.closePath();
    ctx.fill();

    // 2. Exposed Glowing Toxic Green Ribcage
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-4, -5 + lurch, 8, 8);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 8;
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      ctx.moveTo(-3, -3 + lurch + r * 2.5);
      ctx.lineTo(3, -3 + lurch + r * 2.5);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 3. Rotting Head with Iron Collar & Broken Chain
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(0, -16 + lurch, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Iron collar with swinging chain
    ctx.fillStyle = '#334155';
    ctx.fillRect(-6, -11 + lurch, 12, 3);
    // Chain links
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(4, -8 + lurch + drool, 2, 0, Math.PI * 2);
    ctx.arc(6, -5 + lurch + drool, 2, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Hollow Glowing Sulfur-Yellow Eyes & Green Drool
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-2.5, -16 + lurch, 1.4, 0, Math.PI * 2);
    ctx.arc(2.5, -16 + lurch, 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Toxic green slime dripping from mouth
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(1, -12 + lurch + drool, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // 5. Claws with poison slime
    for (let side = -1; side <= 1; side += 2) {
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(side * 6, -6 + lurch);
      ctx.lineTo(side * 14, 4 + lurch);
      ctx.lineTo(side * 12, 7 + lurch);
      ctx.fill();
    }
  },

  // -------------------------------------------------------------------------
  // BESTIARY 4: SPADE SOLDIER (Chiến Binh Giáp Hắc Thiết - Spade Knight)
  // -------------------------------------------------------------------------
  drawSpadeSoldier(ctx, e, tick) {
    const march = Math.sin(tick * 0.22) * 2;

    // 1. Heavy Black Spade Magitech Armor
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-8, -12 + march, 16, 17);

    // Spiked Shoulder Pauldrons
    ctx.fillStyle = '#1e293b';
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(side * 6, -12 + march);
      ctx.lineTo(side * 15, -16 + march);
      ctx.lineTo(side * 13, -7 + march);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Red Spade Insignia on Breastplate
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(0, -9 + march);
    ctx.quadraticCurveTo(-3, -5 + march, 0, -2 + march);
    ctx.quadraticCurveTo(3, -5 + march, 0, -9 + march);
    ctx.fill();
    ctx.fillRect(-1, -2 + march, 2, 2);
    ctx.shadowBlur = 0;

    // 3. Menacing Greathelm with Horizontal Red Visor Slit
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-6, -20 + march, 12, 9);
    // Glowing crimson visor
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.fillRect(-4.5, -16 + march, 9, 2);
    ctx.shadowBlur = 0;

    // 4. Steam Jet Thruster on Back
    ctx.fillStyle = '#334155';
    ctx.fillRect(-9, -8 + march, 2, 8);
    // Dark red steam exhaust
    if (Math.sin(tick * 0.4) > 0.3) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(-13, -4 + march, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Heavy Black Executioner Broadsword
    ctx.save();
    ctx.translate(11, -4 + march);
    ctx.rotate(0.2);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-1.5, -16, 3, 24);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-4, -14, 8, 2);
    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 5: HELLHOUND (Song Đầu Ma Khuyển - Dual-Headed Hellhound)
  // -------------------------------------------------------------------------
  drawHellhound(ctx, e, tick) {
    const pounce = Math.sin(tick * 0.35) * 2.5;
    const pant = Math.sin(tick * 0.45) * 1.5;

    // 1. Muscular Obsidian Body with Volcanic Magma Cracks
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, 0 + pounce, 15, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing magma vein cracks on flank
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-6, -2 + pounce);
    ctx.lineTo(-2, 2 + pounce);
    ctx.lineTo(4, -1 + pounce);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 2. Blazing Fire Mane along Spine
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    for (let i = -3; i <= 3; i++) {
      const fl = Math.sin(tick * 0.3 + i) * 3;
      ctx.beginPath();
      ctx.moveTo(i * 3.5, -6 + pounce);
      ctx.lineTo(i * 3.5, -13 + pounce + fl);
      ctx.lineTo(i * 3.5 + 3, -6 + pounce);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // 3. Two Snarling Demonic Wolf Heads
    for (let side = -1; side <= 1; side += 2) {
      const hx = 10 + side * 4;
      const hy = -8 + pounce + side * pant;
      ctx.save();
      ctx.translate(hx, hy);

      // Head shape
      ctx.fillStyle = '#27272a';
      ctx.beginPath();
      ctx.moveTo(-4, -3);
      ctx.lineTo(7, -1);
      ctx.lineTo(5, 4);
      ctx.lineTo(-4, 4);
      ctx.closePath();
      ctx.fill();

      // Sharp fangs
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(3, 4);
      ctx.lineTo(4, 7);
      ctx.lineTo(5, 4);
      ctx.fill();

      // Glowing molten eye
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(1, -1, 1.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // 4. Flaming Spiked Tail
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-14, -2 + pounce);
    ctx.quadraticCurveTo(-22, -10 + pounce, -20, -18 + pounce);
    ctx.stroke();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 6: SHADOW MAGE (Hắc Ảnh U Linh - Nether Shadow Wraith)
  // -------------------------------------------------------------------------
  drawShadowMage(ctx, e, tick) {
    const float = Math.sin(tick * 0.18) * 3;

    // 1. Ethereal Abyss-Violet Hooded Wraith
    ctx.fillStyle = '#3b0764';
    ctx.beginPath();
    ctx.moveTo(0, -18 + float);
    ctx.bezierCurveTo(-14, -6, -18, 10, -12, 18);
    // Wispy shadowy tentacles underneath
    for (let t = -3; t <= 3; t++) {
      const sway = Math.sin(tick * 0.25 + t) * 4;
      ctx.lineTo(t * 3.5 + sway, 20 + Math.sin(tick * 0.3 + t) * 3);
    }
    ctx.bezierCurveTo(18, 10, 14, -6, 0, -18 + float);
    ctx.closePath();
    ctx.fill();

    // 2. Void Hood Face with Violet Glow
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(0, -14 + float, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(-2, -14 + float, 1.4, 0, Math.PI * 2);
    ctx.arc(2, -14 + float, 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. Floating Demonic Grimoire & Orbiting Dark Rune Ring
    ctx.save();
    ctx.translate(12, -4 + float);
    ctx.rotate(0.25);
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 1.2;
    ctx.fillRect(-5, -7, 10, 14);
    ctx.strokeRect(-5, -7, 10, 14);
    // Glowing rune on cover
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 7: BONE GOLEM (Bạch Cốt Cự Nhân - Spiked Bone Titan)
  // -------------------------------------------------------------------------
  drawBoneGolem(ctx, e, tick) {
    const stomp = Math.sin(tick * 0.16) * 2;

    // 1. Hulking Fused Cursed Bone Torso
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-12, -12 + stomp);
    ctx.lineTo(-15, 14);
    ctx.lineTo(15, 14);
    ctx.lineTo(12, -12 + stomp);
    ctx.closePath();
    ctx.fill();

    // 2. Blazing Cyan Soul Furnace inside Ribcage
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-7, -4 + stomp, 14, 10);
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#22d3ee';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(0, 1 + stomp, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Spiked bone ribs across chest
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      ctx.moveTo(-8, -2 + stomp + r * 3);
      ctx.lineTo(8, -2 + stomp + r * 3);
      ctx.stroke();
    }

    // 3. Demonic Horned Skull with Cyan Eye Flames
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.arc(0, -18 + stomp, 7.5, 0, Math.PI * 2);
    ctx.fill();
    // Curved bone horns
    ctx.beginPath();
    ctx.moveTo(-5, -22 + stomp);
    ctx.lineTo(-12, -30 + stomp);
    ctx.lineTo(-3, -24 + stomp);
    ctx.moveTo(3, -24 + stomp);
    ctx.lineTo(12, -30 + stomp);
    ctx.lineTo(5, -22 + stomp);
    ctx.fill();

    // Soul fire in eyes
    ctx.fillStyle = '#22d3ee';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-2.5, -17 + stomp, 1.6, 0, Math.PI * 2);
    ctx.arc(2.5, -17 + stomp, 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Giant Jagged Bone Executioner Blade Arm
    ctx.save();
    ctx.translate(14, -2 + stomp);
    ctx.rotate(0.3);
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(6, 4);
    ctx.lineTo(2, 16);
    ctx.lineTo(-4, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 8: LESSER DEVIL (Tiểu Ác Quỷ Minh Giới - Underworld Imp)
  // -------------------------------------------------------------------------
  drawLesserDevil(ctx, e, tick) {
    const flap = Math.sin(tick * 0.28) * 5;
    const hover = Math.sin(tick * 0.18) * 2;

    // 1. Bat Wings with Red Veins
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.2;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(0, -4 + hover);
      ctx.quadraticCurveTo(side * 18, -18 + hover + flap, side * 24, -2 + hover);
      ctx.quadraticCurveTo(side * 12, 6 + hover, 0, 2 + hover);
      ctx.fill();
      ctx.stroke();
    }

    // 2. Glossy Obsidian Devil Body
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, 0 + hover, 8, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Horned Devil Head
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, -14 + hover, 6.5, 0, Math.PI * 2);
    ctx.fill();

    // Curved Ram Horns
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.moveTo(-3, -17 + hover);
    ctx.quadraticCurveTo(-10, -26 + hover, -13, -16 + hover);
    ctx.lineTo(-6, -18 + hover);
    ctx.moveTo(3, -17 + hover);
    ctx.quadraticCurveTo(10, -26 + hover, 13, -16 + hover);
    ctx.lineTo(6, -18 + hover);
    ctx.fill();

    // Glowing Blood-Red Slit Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-2.5, -14 + hover, 1.4, 0, Math.PI * 2);
    ctx.arc(2.5, -14 + hover, 1.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Barbed Devil Tail
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(0, 8 + hover);
    ctx.quadraticCurveTo(-12, 14 + hover, -14, 6 + hover);
    ctx.stroke();
    // Arrowhead tip
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-14, 4 + hover);
    ctx.lineTo(-18, 6 + hover);
    ctx.lineTo(-14, 8 + hover);
    ctx.fill();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 9: HIGH DEVIL (Cao Cấp Ác Quỷ - 4-Winged Archdemon)
  // -------------------------------------------------------------------------
  drawHighDevil(ctx, e, tick) {
    const flap = Math.sin(tick * 0.22) * 6;
    const hover = Math.sin(tick * 0.15) * 3;

    // 1. Dark Void Miasma Aura
    this.drawAura(ctx, 0, 0 + hover, 30, 'rgba(153, 27, 27, 0.45)', 22);

    // 2. 4 Obsidian Bat Wings with Burning Ember Veins
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.8;
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    for (let side = -1; side <= 1; side += 2) {
      // Top Major Wing
      ctx.beginPath();
      ctx.moveTo(0, -6 + hover);
      ctx.quadraticCurveTo(side * 28, -28 + hover + flap, side * 36, -8 + hover);
      ctx.quadraticCurveTo(side * 18, 8 + hover, 0, 2 + hover);
      ctx.fill();
      ctx.stroke();

      // Lower Wing
      ctx.beginPath();
      ctx.moveTo(0, 2 + hover);
      ctx.quadraticCurveTo(side * 24, 16 + hover, side * 28, 26 + hover);
      ctx.quadraticCurveTo(side * 14, 18 + hover, 0, 10 + hover);
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 3. Demonic Armored Torso with Glowing Red Glyphs
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, 2 + hover, 11, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Demonic Script carved into chest
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -6 + hover);
    ctx.lineTo(0, 8 + hover);
    ctx.moveTo(-5, 0 + hover);
    ctx.lineTo(5, 0 + hover);
    ctx.stroke();

    // 4. Crown of 4 Sharp Demonic Horns
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(0, -16 + hover, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7f1d1d';
    // Inner horns
    ctx.beginPath();
    ctx.moveTo(-4, -20 + hover);
    ctx.lineTo(-8, -32 + hover);
    ctx.lineTo(-1, -22 + hover);
    ctx.moveTo(1, -22 + hover);
    ctx.lineTo(8, -32 + hover);
    ctx.lineTo(4, -20 + hover);
    ctx.fill();

    // Glowing Void Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(-3, -16 + hover, 2, 0, Math.PI * 2);
    ctx.arc(3, -16 + hover, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Dual Void Scythe Claws
    for (let side = -1; side <= 1; side += 2) {
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(side * 10, -2 + hover);
      ctx.lineTo(side * 18, 12 + hover);
      ctx.lineTo(side * 12, 14 + hover);
      ctx.fill();
    }
  },

  // -------------------------------------------------------------------------
  // BESTIARY 10: ARMORED BOAR (Thiết Giáp Dã Trư - Iron-Plated Boar)
  // -------------------------------------------------------------------------
  drawArmoredBoar(ctx, e, tick) {
    const charge = Math.sin(tick * 0.35) * 2;

    // 1. Heavy Armored Body
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(0, 2 + charge, 16, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bolted Steel Plate Armor across Back & Flanks
    ctx.fillStyle = '#475569';
    ctx.fillRect(-10, -8 + charge, 20, 8);
    // Glowing rune rivets
    ctx.fillStyle = '#f59e0b';
    for (let i = -8; i <= 8; i += 4) {
      ctx.beginPath();
      ctx.arc(i, -4 + charge, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Heavy Iron Visor & Snout
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(12, 1 + charge, 6, 0, Math.PI * 2);
    ctx.fill();

    // Red steam snorting from nostrils
    if (Math.sin(tick * 0.4) > 0.3) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.beginPath();
      ctx.arc(18, 2 + charge, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Massive Curved Steel Tusks with Sparking Edges
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(11, 3 + charge);
    ctx.quadraticCurveTo(18, 6 + charge, 20, -6 + charge);
    ctx.lineTo(16, 2 + charge);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing red eye slit
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(8, -2 + charge, 3, 1.5);
  },

  // -------------------------------------------------------------------------
  // BESTIARY 11: DEMON CHARGER (Ngưu Giác Ma Tướng - Abyssal Iron Minotaur)
  // -------------------------------------------------------------------------
  drawDemonCharger(ctx, e, tick) {
    const charge = Math.sin(tick * 0.38) * 2.5;

    // 1. Muscular Demonic Minotaur Torso with Molten Lava Veins
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, 0 + charge, 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Molten veins
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-6, -4 + charge);
    ctx.lineTo(0, 3 + charge);
    ctx.lineTo(6, -2 + charge);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 2. Spiked Iron Shoulder Pauldrons
    ctx.fillStyle = '#334155';
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(side * 8, -6 + charge);
      ctx.lineTo(side * 16, -12 + charge);
      ctx.lineTo(side * 12, 2 + charge);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Demonic Bull Skull & Massive Spiraling Iron Horns
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.arc(10, -6 + charge, 7, 0, Math.PI * 2);
    ctx.fill();

    // Giant Iron Horns
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(8, -10 + charge);
    ctx.quadraticCurveTo(14, -22 + charge, 24, -14 + charge);
    ctx.lineTo(12, -7 + charge);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Lava Eyes
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(12, -7 + charge, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // =========================================================================
  // BOSS 1: MARS (Đại Tướng Khoáng Vật Vương Quốc Diamond - Harpe Armor)
  // =========================================================================
  drawBossMars(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.15) * 3;

    // 1. Diamond Mineral Crystal Aura
    this.drawAura(ctx, 0, 0, e.radius + 16, 'rgba(56, 189, 248, 0.45)', 24);

    // 2. Giant Diamond Shield Slabs Orbiting around him
    for (let i = 0; i < 4; i++) {
      const ang = tick * 0.08 + (i * Math.PI * 2) / 4;
      const dx = Math.cos(ang) * (e.radius + 16);
      const dy = Math.sin(ang) * (e.radius + 10);
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(ang + Math.PI / 2);
      ctx.fillStyle = 'rgba(224, 242, 254, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(6, 0);
      ctx.lineTo(0, 12);
      ctx.lineTo(-6, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // 3. Harpe Diamond Armor Torso & Spikes
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.8, e.radius * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();

    // Diamond Crystal Spikes bursting from shoulders
    ctx.fillStyle = '#e0f2fe';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(side * 8, -6);
      ctx.lineTo(side * 24, -20 + pulse);
      ctx.lineTo(side * 14, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 4. Diamond Core pulsing in chest
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#7dd3fc';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 2, 6 + pulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -14, 7, 0, Math.PI * 2);
    ctx.fill();
    // Cold Cyan Visor/Eyes
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-4, -15, 8, 2);
  },

  // =========================================================================
  // BOSS 2: VETTO (Tuyệt Vọng - Savage Mythical Beast Form)
  // =========================================================================
  drawBossVetto(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.2) * 3;

    // 1. Ferocious Mythical Beast Golden-Red Aura
    this.drawAura(ctx, 0, 0, e.radius + 20, 'rgba(239, 68, 68, 0.55)', 28);
    this.drawAura(ctx, 0, 0, e.radius + 10, 'rgba(245, 158, 11, 0.45)', 18);

    // Giant Beast Phantom Silhouette Roaring behind him
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, -18, e.radius * 0.85 + pulse, Math.PI * 0.75, Math.PI * 2.25);
    // Beast Ears & Fangs
    ctx.lineTo(-14, -32);
    ctx.lineTo(-8, -24);
    ctx.lineTo(8, -24);
    ctx.lineTo(14, -32);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 2. Massive Muscular Beast Body & Fur
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.85, e.radius * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Giant Slashing Beast Claws
    for (let side = -1; side <= 1; side += 2) {
      ctx.fillStyle = '#ea580c';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(side * 10, -2);
      ctx.lineTo(side * 26, 8 + pulse);
      ctx.lineTo(side * 16, 18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 4. Head with Glowing Demonic Third Eye of Despair
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -14, 8, 0, Math.PI * 2);
    ctx.fill();

    // Third Eye of Despair on Forehead
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(0, -19, 3.5, 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Fierce red beast eyes
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-4, -14, 2.5, 2);
    ctx.fillRect(1.5, -14, 2.5, 2);
  },

  // =========================================================================
  // BOSS 3: PATRI (Chân Quang Ma Pháp / Ma Hóa Tối Thượng)
  // =========================================================================
  drawBossPatri(ctx, e, tick) {
    const flap = Math.sin(tick * 0.16) * 6;

    // 1. Blinding Celestial Light Aura
    this.drawAura(ctx, 0, 0, e.radius + 22, 'rgba(254, 240, 138, 0.65)', 32);

    // 2. 4 Radiant Celestial Light Wings
    ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 16;
    for (let side = -1; side <= 1; side += 2) {
      // Top Wing
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.quadraticCurveTo(side * 36, -38 + flap, side * 44, -12);
      ctx.quadraticCurveTo(side * 22, 4, 0, -2);
      ctx.fill();
      ctx.stroke();

      // Bottom Wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(side * 30, 20 + flap * 0.7, side * 34, 34);
      ctx.quadraticCurveTo(side * 16, 24, 0, 8);
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 3. Floating Fan of Light Swords of Judgment
    for (let i = 0; i < 5; i++) {
      const ang = -Math.PI * 0.8 + (i * Math.PI * 1.6) / 4;
      const dist = e.radius + 14 + Math.sin(tick * 0.1 + i) * 3;
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

    // 4. White & Gold Robe of the Sun
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(0, 2, e.radius * 0.75, e.radius * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-7, 4, 14, 3);

    // Head with Golden Tears of Conviction
    ctx.fillStyle = '#fef3c7';
    ctx.beginPath();
    ctx.arc(0, -14, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.fillRect(-3, -11, 1.8, 4);
    ctx.fillRect(1.2, -11, 1.8, 4);
  },

  // =========================================================================
  // BOSS 4: ZENON ZOGRATIS (Ác Quỷ Beelzebub 100% - Không Gian & Khung Xương)
  // =========================================================================
  drawBossZenon(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.18) * 3;

    // 1. Void Spatial Miasma
    this.drawAura(ctx, 0, 0, e.radius + 24, 'rgba(59, 7, 100, 0.65)', 30);

    // 2. Swirling 3D Spatial Cube Portals that Orbit him
    for (let i = 0; i < 4; i++) {
      const ang = tick * 0.08 + (i * Math.PI * 2) / 4;
      const cx = Math.cos(ang) * (e.radius + 18);
      const cy = Math.sin(ang) * (e.radius + 12);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ang + tick * 0.05);
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 10;
      ctx.strokeRect(-6, -6, 12, 12);
      ctx.strokeRect(-4, -4, 8, 8);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // 3. Massive Spiked Bone Wings erupting from spine
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 12;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.lineTo(side * 22, -32 + pulse);
      ctx.lineTo(side * 38, -14);
      ctx.lineTo(side * 28, 4);
      ctx.lineTo(side * 14, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 4. Obsidian Devil Body & Demonic Crown of Bones
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.8, e.radius * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -15, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Demonic Crown of Bones
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-6, -19);
    ctx.lineTo(-10, -28);
    ctx.lineTo(-2, -22);
    ctx.lineTo(2, -22);
    ctx.lineTo(10, -28);
    ctx.lineTo(6, -19);
    ctx.fill();

    // Violet-Crimson Eyes
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-4, -15, 2.5, 2);
    ctx.fillRect(1.5, -15, 2.5, 2);
  },

  // =========================================================================
  // BOSS 5: VANICA ZOGRATIS (Ác Quỷ Megicula 100% - Huyết & Nguyền Rủa)
  // =========================================================================
  drawBossVanica(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.22) * 3;

    // 1. Blood & Curse Miasma Aura
    this.drawAura(ctx, 0, 0, e.radius + 22, 'rgba(153, 27, 27, 0.65)', 28);

    // 2. Swirling Cursed Blood Tentacles & Droplets in Whirlpool
    for (let i = 0; i < 5; i++) {
      const ang = tick * 0.12 + (i * Math.PI * 2) / 5;
      const bx = Math.cos(ang) * (e.radius + 16);
      const by = Math.sin(ang) * (e.radius + 12);
      ctx.fillStyle = '#dc2626';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 3. Flowing Blood Wings with Thorny Roses
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.quadraticCurveTo(side * 28, -30 + pulse, side * 36, -6);
      ctx.quadraticCurveTo(side * 18, 12, 0, 4);
      ctx.fill();
      ctx.stroke();
    }

    // 4. Gothic Dress & Body
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.75, e.radius * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head with Eyepatch & Cursed Red Eye
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -15, 7, 0, Math.PI * 2);
    ctx.fill();

    // Megicula Eyepatch on right side
    ctx.fillStyle = '#09090b';
    ctx.fillRect(1, -17, 5, 4);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(3.5, -15, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Manic Smile
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, -12, 3, 0.2, Math.PI - 0.2);
    ctx.stroke();
  },

  // =========================================================================
  // BOSS 6: DANTE ZOGRATIS (Ác Quỷ Lucifero 100% - Trọng Lực & Ma Khu)
  // =========================================================================
  drawBossDante(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.18) * 3;

    // 1. Colossal Gravity Void Aura
    this.drawAura(ctx, 0, 0, e.radius + 26, 'rgba(67, 20, 7, 0.7)', 32);

    // 2. Floating Fractured Stone Monoliths in Anti-Gravity
    ctx.fillStyle = '#1c1917';
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      const ang = tick * 0.06 + (i * Math.PI * 2) / 5;
      const rx = Math.cos(ang) * (e.radius + 20);
      const ry = Math.sin(ang) * (e.radius + 14);
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(ang);
      ctx.fillRect(-5, -7, 10, 14);
      ctx.strokeRect(-5, -7, 10, 14);
      ctx.restore();
    }

    // 3. Massive Obsidian Demon Muscles with Crimson Fibers
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.9, e.radius * 1.05, 0, 0, Math.PI * 2);
    ctx.fill();

    // Open Singularity Mouth on Chest
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(0, 2, 7 + pulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 4. Head with Giant Curved Demon Horns
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -16, 8, 0, Math.PI * 2);
    ctx.fill();

    // Curved Horns
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-4, -20);
    ctx.quadraticCurveTo(-14, -34, -20, -22);
    ctx.lineTo(-8, -20);
    ctx.moveTo(4, -20);
    ctx.quadraticCurveTo(14, -34, 20, -22);
    ctx.lineTo(8, -20);
    ctx.fill();
  },

  // =========================================================================
  // BOSS 7: ZAGRED (Ác Quỷ Ngôn Từ - Kotodama Magic)
  // =========================================================================
  drawBossZagred(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.16) * 4;

    // 1. Netherworld Void Purple Aura
    this.drawAura(ctx, 0, 0, e.radius + 28, 'rgba(59, 7, 100, 0.75)', 36);

    // 2. Swirling Cyclone of Kotodama Runes & Cursed Words
    for (let i = 0; i < 6; i++) {
      const ang = tick * 0.09 + (i * Math.PI * 2) / 6;
      const kx = Math.cos(ang) * (e.radius + 22);
      const ky = Math.sin(ang) * (e.radius + 15);
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#9333ea';
      ctx.shadowBlur = 8;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(['言', '滅', '死', '裂', '黒', '鎖'][i], kx - 4, ky + 4);
      ctx.shadowBlur = 0;
    }

    // 3. Giant 4-Layer Demon Bat Wings
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 14;
    for (let side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.quadraticCurveTo(side * 40, -42 + pulse, side * 50, -12);
      ctx.quadraticCurveTo(side * 28, 14, 0, 4);
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 4. Towering Amorphous Shadow-Flesh Torso
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.ellipse(0, 0, e.radius * 0.85, e.radius * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // 5. Menacing Multi-Row Fanged Mouth
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.ellipse(0, -6, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    for (let f = -5; f <= 5; f += 2.5) {
      ctx.fillRect(f, -7, 1.5, 3);
    }

    // Netherworld Trident dripping with corruption
    ctx.save();
    ctx.translate(22, -6);
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(0, 26);
    // 3 Prongs
    ctx.moveTo(-6, -20);
    ctx.lineTo(-6, -30);
    ctx.moveTo(0, -24);
    ctx.lineTo(0, -34);
    ctx.moveTo(6, -20);
    ctx.lineTo(6, -30);
    ctx.stroke();
    ctx.restore();
  },

  // =========================================================================
  // BOSS 8: LUCIFERO (Chúa Tể Minh Giới - Quỷ Vương Tối Cao)
  // =========================================================================
  drawBossLucifero(ctx, e, tick) {
    const flap = Math.sin(tick * 0.15) * 8;
    const pulse = Math.sin(tick * 0.25) * 3;

    // 1. Apocalyptic Crimson & Void Darkness Aura
    this.drawAura(ctx, 0, 0, e.radius + 36, 'rgba(153, 27, 27, 0.75)', 46);
    this.drawAura(ctx, 0, 0, e.radius + 20, 'rgba(0, 0, 0, 0.95)', 30);

    // 2. SIX GARGANTUAN OBSIDIAN DEVIL WINGS (Spanning the Screen!)
    ctx.fillStyle = '#0a0305';
    ctx.strokeStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 26;
    ctx.lineWidth = 3.5;

    for (let side = -1; side <= 1; side += 2) {
      // Tier 1 Top Wing
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.bezierCurveTo(side * 55, -70 + flap, side * 105, -38, side * 85, 20);
      ctx.bezierCurveTo(side * 52, 24, side * 26, 14, 0, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tier 2 Middle Wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(side * 50, -22 + flap * 0.7, side * 92, 10, side * 72, 46);
      ctx.lineTo(side * 16, 18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tier 3 Bottom Wing
      ctx.beginPath();
      ctx.moveTo(0, 16);
      ctx.bezierCurveTo(side * 40, 32, side * 74, 52, side * 54, 70);
      ctx.lineTo(side * 12, 26);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // 3. Collapsing Event Horizon Singularity hovering over head
    ctx.save();
    ctx.translate(0, -e.radius - 18 + pulse);
    ctx.fillStyle = '#020617';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 22;
    ctx.beginPath();
    ctx.arc(0, 0, 10 + pulse, 0, Math.PI * 2);
    ctx.fill();
    // Demonic red corona ring
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // 4. Imperial Obsidian Demon Mantle with Golden Underworld Crest
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.ellipse(0, 2, e.radius * 0.88, e.radius * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-10, 6, 20, 3.5);

    // 5. Demonic Crown of 4 Horns crackling with red demonic lightning
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -18, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    // Outer massive horns
    ctx.beginPath();
    ctx.moveTo(-5, -24);
    ctx.quadraticCurveTo(-18, -42, -26, -26);
    ctx.lineTo(-10, -24);
    ctx.moveTo(5, -24);
    ctx.quadraticCurveTo(18, -42, 26, -26);
    ctx.lineTo(10, -24);
    ctx.fill();
    ctx.stroke();

    // Piercing Red Sovereign Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(-3.5, -18, 2.2, 0, Math.PI * 2);
    ctx.arc(3.5, -18, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },
`;

const spritesPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js';
let code = fs.readFileSync(spritesPath, 'utf8');

// Locate start of Bandit
const banditHeader = '  // -------------------------------------------------------------------------\n  // BESTIARY 1: BANDIT';
const dropHeader = '  // =========================================================================\n  // DROPS & REWARDS';

const startIndex = code.indexOf(banditHeader);
const endIndex = code.indexOf(dropHeader);

if (startIndex === -1 || endIndex === -1) {
  console.error('Failed to locate mob/boss code region in sprites.js!');
  console.log('startIndex:', startIndex, 'endIndex:', endIndex);
  process.exit(1);
}

const before = code.substring(0, startIndex);
const after = code.substring(endIndex);

const updatedCode = before + mobsAndBossesCode.trim() + '\n\n' + after;
fs.writeFileSync(spritesPath, updatedCode, 'utf8');
console.log('Successfully updated all 11 Mobs and all 8 Bosses with stunning high-end anime visuals!');
