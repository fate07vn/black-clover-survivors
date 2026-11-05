const fs = require('fs');
const path = require('path');

const spritesPath = path.join(__dirname, '..', 'src', 'sprites.js');
let code = fs.readFileSync(spritesPath, 'utf8');

// Function 1: drawAsta
const drawAstaNew = `  drawAsta(ctx, p, tick) {
    const isDevil = p.isDevilMode;
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Devil Aura & Dark Lightning Sparks
    if (isDevil) {
      this.drawAura(ctx, 0, -2, 34, 'rgba(220, 38, 38, 0.4)', 28);
      this.drawAura(ctx, 0, -2, 22, 'rgba(15, 10, 20, 0.85)', 18);

      if (Math.random() < 0.35) {
        ctx.strokeStyle = '#f43f5e';
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sx = (Math.random() - 0.5) * 32;
        const sy = (Math.random() - 0.5) * 32;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (Math.random() - 0.5) * 16, sy + (Math.random() - 0.5) * 16);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Giant Demonic Bat Wing
      ctx.save();
      const wingFlap = Math.sin(tick * 0.16) * 0.25;
      ctx.translate(-10, -14);
      ctx.rotate(-0.35 + wingFlap);

      ctx.fillStyle = '#0a0305';
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-25, -45, -55, -28, -60, 5);
      ctx.bezierCurveTo(-45, 15, -30, 32, 0, 12);
      ctx.closePath();
      ctx.fill();

      // Red inner wing veins
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(-45, -15);
      ctx.moveTo(-20, -8);
      ctx.lineTo(-38, 8);
      ctx.stroke();
      ctx.restore();
    }

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 16);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. BACK ARM (Left arm swinging naturally with running stride)
    ctx.save();
    ctx.translate(-6, -4);
    ctx.rotate(anim.backArmSwing);
    // Bare muscular upper arm & forearm
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-2.5, 0);
    ctx.lineTo(2.5, 0);
    ctx.lineTo(2, 8);
    ctx.lineTo(-2, 8);
    ctx.closePath();
    ctx.fill();
    // Black Bulls wristband
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-2.5, 5, 5, 3);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-2.5, 5, 5, 0.8);
    // Clenched fist
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 9.5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. LEGS & COMBAT BOOTS (Contoured anime legs with dynamic walk cycle & knee joint)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#18181b',
      bootColor: '#451a03',
      cuffColor: '#271003',
      buckleColor: '#fbbf24',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -5,
      rightHipX: 4,
      hipY: 6
    });

    // 3. TORSO & MUSCULAR CHEST
    // Muscular skin base
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-7, -6);
    ctx.lineTo(7, -6);
    ctx.lineTo(6, 6);
    ctx.lineTo(-6, 6);
    ctx.closePath();
    ctx.fill();

    // White tank top inner contours
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-5, -6);
    ctx.lineTo(5, -6);
    ctx.lineTo(4, 6);
    ctx.lineTo(-4, 6);
    ctx.closePath();
    ctx.fill();

    // Muscle shadow lines (Pectorals & Abs)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -4);
    ctx.lineTo(0, 4);
    ctx.stroke();

    // Cropped Black Bulls Jacket (Open front, dynamic vest)
    ctx.fillStyle = '#0f172a';
    // Left jacket lapel
    ctx.beginPath();
    ctx.moveTo(-9, -7);
    ctx.lineTo(-4, -7);
    ctx.lineTo(-5, 6);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();
    // Right jacket lapel
    ctx.beginPath();
    ctx.moveTo(4, -7);
    ctx.lineTo(9, -7);
    ctx.lineTo(10, 5);
    ctx.lineTo(5, 6);
    ctx.closePath();
    ctx.fill();

    // Gold trim on collar
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-9, -7);
    ctx.lineTo(-4, -7);
    ctx.moveTo(4, -7);
    ctx.lineTo(9, -7);
    ctx.stroke();

    // Black Bulls shoulder mantle (Left shoulder)
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.moveTo(-9, -8);
    ctx.lineTo(-14, -4);
    ctx.lineTo(-12, 4);
    ctx.lineTo(-7, 1);
    ctx.closePath();
    ctx.fill();
    // Gold bull skull pin
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(-10, -2, 2, 0, Math.PI * 2);
    ctx.fill();

    // Broad leather belt with buckle
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(-8, 5);
    ctx.lineTo(8, 5);
    ctx.lineTo(7, 9);
    ctx.lineTo(-7, 9);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-2, 5.5, 4, 3);

    // 4. 5-LEAF CLOVER GRIMOIRE (Floating at hip with dark/crimson aura)
    ctx.save();
    ctx.translate(-10, 3 + Math.sin(tick * 0.12) * 2);
    ctx.fillStyle = '#1c1917';
    ctx.strokeStyle = isDevil ? '#ef4444' : '#475569';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.rect(-4, -6, 8, 12);
    ctx.fill();
    ctx.stroke();
    // Glowing 5-Leaf Clover
    ctx.fillStyle = isDevil ? '#ef4444' : '#000000';
    ctx.beginPath();
    ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. HEAD & ANIME JAWLINE
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-6, -11);
    ctx.lineTo(6, -11);
    ctx.lineTo(5, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-5, -6);
    ctx.closePath();
    ctx.fill();

    // ANIME EYES & MOUTH
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.4;
    // Eye contours (Sharp anime shape)
    ctx.beginPath();
    ctx.moveTo(-4.5, -7);
    ctx.lineTo(-1.5, -6.5);
    ctx.moveTo(1.5, -6.5);
    ctx.lineTo(4.5, -7);
    ctx.stroke();

    // Iris & Pupil (Emerald Green or Crimson if Devil Mode)
    ctx.fillStyle = isDevil ? '#ef4444' : '#10b981';
    ctx.beginPath();
    ctx.arc(-3, -6, 1.2, 0, Math.PI * 2);
    ctx.arc(3, -6, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // White eye reflection glint
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-2.6, -6.3, 0.5, 0, Math.PI * 2);
    ctx.arc(3.4, -6.3, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Determined anime smirk
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-2, -4);
    ctx.lineTo(2, -3.5);
    ctx.stroke();

    // BLACK BULLS HEADBAND
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-7, -13);
    ctx.lineTo(7, -13);
    ctx.lineTo(6.5, -9);
    ctx.lineTo(-6.5, -9);
    ctx.closePath();
    ctx.fill();
    // Headband Bull Insignia
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-2, -12);
    ctx.lineTo(2, -12);
    ctx.lineTo(1, -10);
    ctx.lineTo(-1, -10);
    ctx.closePath();
    ctx.fill();

    // SPIKY ASH-BLONDE ANIME HAIR
    ctx.fillStyle = '#e4e4e7';
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 1;

    // Hair Path with multiple sharp peaks
    ctx.beginPath();
    ctx.moveTo(-7, -10);
    ctx.lineTo(-12, -14);
    ctx.lineTo(-8, -16);
    ctx.lineTo(-11, -21);
    ctx.lineTo(-5, -20);
    ctx.lineTo(-3, -25); // Top center spike
    ctx.lineTo(1, -20);
    ctx.lineTo(4, -25);
    ctx.lineTo(5, -19);
    ctx.lineTo(11, -20);
    ctx.lineTo(8, -15);
    ctx.lineTo(12, -13);
    ctx.lineTo(7, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hair lighter highlights
    ctx.fillStyle = '#fafafa';
    ctx.beginPath();
    ctx.moveTo(-2, -22);
    ctx.lineTo(0, -17);
    ctx.lineTo(3, -22);
    ctx.lineTo(2, -16);
    ctx.closePath();
    ctx.fill();

    // DEMON HORN (Black Asta Mode)
    if (isDevil) {
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(3, -16);
      ctx.bezierCurveTo(8, -22, 12, -28, 16, -32);
      ctx.bezierCurveTo(12, -25, 6, -18, 5, -13);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // 6. FRONT ARM & WEAPON (Held firmly in hand in combat-ready stance!)
    ctx.save();
    // Shoulder pivot
    ctx.translate(5, -4);
    // Muscular bicep
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-2.5, 0);
    ctx.lineTo(2.5, 0);
    ctx.lineTo(4, 6);
    ctx.lineTo(-1, 6);
    ctx.closePath();
    ctx.fill();

    // Forearm extending to hand at (2, 5)
    ctx.translate(2, 5);
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(2, 0);
    ctx.lineTo(4, 5);
    ctx.lineTo(0, 5);
    ctx.closePath();
    ctx.fill();

    // Black Bulls wristband on weapon arm
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 2, 4.5, 3.5);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 2, 4.5, 0.8);

    // Hand gripping the weapon hilt at (2, 5)
    ctx.translate(2, 5);
    const attackAngle = (p.isAttacking ? 0.80 : 0);
    const swordAngle = -0.42 + anim.weaponSway + attackAngle;
    ctx.rotate(swordAngle);

    // DEMON SLAYER GREATSWORD (or BLACK DIVIDER if Devil Mode)
    if (isDevil) {
      // BLACK DIVIDER (Massive Demonic Anti-Magic Greatsword)
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 16;

      // Demonic Hilt
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(-2.5, 2, 5, 9);
      // Crimson pommel
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Jagged Demon Crossguard
      ctx.fillStyle = '#1c1917';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-9, 2);
      ctx.lineTo(9, 2);
      ctx.lineTo(7, -4);
      ctx.lineTo(-7, -4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Giant Black Divider Blade (14px wide, 44px long)
      ctx.fillStyle = '#050505';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-7, -4);
      ctx.lineTo(-6, -40);
      ctx.lineTo(0, -46); // Sharp demonic tip
      ctx.lineTo(6, -40);
      ctx.lineTo(7, -4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Pulsing crimson anti-magic veins
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(-1, -20);
      ctx.lineTo(2, -32);
      ctx.lineTo(0, -44);
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      // STANDARD DEMON SLAYER GREATSWORD
      // Hilt & Leather wrap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-2, 2, 4, 8);
      // Steel pommel
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(0, 10.5, 2, 0, Math.PI * 2);
      ctx.fill();

      // Heavy Crossguard
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.rect(-8, -3, 16, 4);
      ctx.fill();
      ctx.stroke();

      // Massive Anti-Magic Iron Blade (10px wide, 38px long)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-5, -3);
      ctx.lineTo(-4.5, -34);
      ctx.lineTo(0, -39); // Beveled tip
      ctx.lineTo(4.5, -34);
      ctx.lineTo(5, -3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Chipped runic fuller along the center
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-1.5, -32, 3, 27);

      // Steel blade edge highlights
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-4.5, -3);
      ctx.lineTo(-4, -33);
      ctx.lineTo(0, -38);
      ctx.moveTo(4.5, -3);
      ctx.lineTo(4, -33);
      ctx.lineTo(0, -38);
      ctx.stroke();
    }

    // Hand gripping over the hilt
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();

    ctx.restore();
  },`;

// Replace drawAsta
const astaStart = code.indexOf('  drawAsta(ctx, p, tick) {');
const astaEnd = code.indexOf('  // =========================================================================\n  // 2. YUNO GRINBERRYALL');
if (astaStart !== -1 && astaEnd !== -1) {
  code = code.substring(0, astaStart) + drawAstaNew + '\n\n' + code.substring(astaEnd);
  console.log('Successfully replaced drawAsta!');
} else {
  console.error('Failed to locate drawAsta boundaries!');
}

// Function 2: drawYuno
const drawYunoNew = `  drawYuno(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);
    const isZephyr = p.isSpiritMode;

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Emerald Wind Aura
    this.drawAura(ctx, 0, -2, isZephyr ? 36 : 24, isZephyr ? 'rgba(34, 197, 94, 0.45)' : 'rgba(52, 211, 153, 0.25)', 25);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 15);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. BACK ARM (Left arm swinging with Golden Dawn capelet)
    ctx.save();
    ctx.translate(-6, -4);
    ctx.rotate(anim.backArmSwing);
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-2, 0, 4, 7);
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 8.5, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Flowing Golden Dawn Capelet (Emerald with Gold Filigree Border)
    const capeFlutter = Math.sin(tick * 0.2) * 4;
    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(-8, -6);
    ctx.bezierCurveTo(-14, 2, -18 + capeFlutter, 14, -14 + capeFlutter, 20);
    ctx.lineTo(2, 17);
    ctx.lineTo(6, -6);
    ctx.closePath();
    ctx.fill();

    // Gold filigree edge
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-8, -6);
    ctx.bezierCurveTo(-14, 2, -18 + capeFlutter, 14, -14 + capeFlutter, 20);
    ctx.lineTo(2, 17);
    ctx.stroke();

    // 2. LEGS & RIDING BOOTS (Dynamic walk stride)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#f8fafc',
      bootColor: '#382215',
      cuffColor: '#064e3b',
      buckleColor: '#fbbf24',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -4.5,
      rightHipX: 4,
      hipY: 6
    });

    // 3. TUNIC BODY (High-collared royal uniform)
    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(6, -7);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.closePath();
    ctx.fill();

    // White shirt center with gold buttons
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-2, -6, 4, 12);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, -3, 1, 0, Math.PI * 2);
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.arc(0, 3, 1, 0, Math.PI * 2);
    ctx.fill();

    // Royal Blue Sapphire Pendant
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(0, -6, 2, 0, Math.PI * 2);
    ctx.fill();

    // 4. FAIRY SYLPH (BELL) Hovering Companion
    ctx.save();
    const bellBob = Math.sin(tick * 0.25) * 3;
    ctx.translate(-14, -16 + bellBob);
    // Translucent Fairy Wings
    ctx.fillStyle = 'rgba(167, 243, 208, 0.75)';
    ctx.beginPath();
    ctx.ellipse(-4, -3, 6, 2.5, -0.6, 0, Math.PI * 2);
    ctx.ellipse(4, -3, 6, 2.5, 0.6, 0, Math.PI * 2);
    ctx.fill();
    // Fairy Body
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    // Cute face
    ctx.fillStyle = '#065f46';
    ctx.fillRect(-1, -1, 1, 1);
    ctx.fillRect(1, -1, 1, 1);
    ctx.restore();

    // 5. YUNO FACE & GOLDEN EYES
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Golden Amber Eyes
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(-4, -7);
    ctx.lineTo(-1, -7);
    ctx.moveTo(1, -7);
    ctx.lineTo(4, -7);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-2.5, -6.2, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -6.2, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Calm stoic expression
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-1.5, -4);
    ctx.lineTo(1.5, -4);
    ctx.stroke();

    // FLOWING RAVEN-BLACK ANIME HAIR
    ctx.fillStyle = '#090d16';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-10, -14);
    ctx.lineTo(-7, -18);
    ctx.lineTo(-9, -24);
    ctx.lineTo(-3, -22);
    ctx.lineTo(0, -26);
    ctx.lineTo(3, -22);
    ctx.lineTo(8, -23);
    ctx.lineTo(6, -17);
    ctx.lineTo(10, -13);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 6. FRONT ARM & ZEPHYR SWORD OF WIND (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(5, -4);
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-1.5, 0, 3.5, 6);
    // Gold cuff
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-1.5, 4.5, 3.5, 1.2);

    // Hand in white glove holding hilt at (1, 6)
    ctx.translate(1, 6);
    const yunoSwordAngle = -0.38 + anim.weaponSway + (p.isAttacking ? 0.75 : 0);
    ctx.rotate(yunoSwordAngle);

    // ZEPHYR SWORD OF WIND (Glowing Emerald Energy Blade)
    ctx.strokeStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(0, -28);
    ctx.stroke();

    // Inner white light core
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, -26);
    ctx.stroke();

    // Wind crossguard & grip
    ctx.strokeStyle = '#a7f3d0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-4, -1);
    ctx.lineTo(4, -1);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // White gloved hand gripping hilt
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const yunoStart = code.indexOf('  drawYuno(ctx, p, tick) {');
const yunoEnd = code.indexOf('  // =========================================================================\n  // 3. NOELLE SILVA');
if (yunoStart !== -1 && yunoEnd !== -1) {
  code = code.substring(0, yunoStart) + drawYunoNew + '\n\n' + code.substring(yunoEnd);
  console.log('Successfully replaced drawYuno!');
} else {
  console.error('Failed to locate drawYuno boundaries!');
}

// Function 3: drawNoelle
const drawNoelleNew = `  drawNoelle(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Azure Water Mana Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(56, 189, 248, 0.45)', 24);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 15);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. BACK ARM (Left arm swinging with Valkyrie rhythm)
    ctx.save();
    ctx.translate(-5, -4);
    ctx.rotate(anim.backArmSwing);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-1.5, 0, 3, 7);
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 8, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. LEGS & SILVER GREAVES (Dynamic walking stride)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#e2e8f0',
      bootColor: '#cbd5e1',
      cuffColor: '#0284c7',
      buckleColor: '#38bdf8',
      pantWidth: 4.5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3,
      leftHipX: -4.5,
      rightHipX: 3.5,
      hipY: 6
    });

    // VALKYRIE TRANSLUCENT WATER DRESS (Tiered Flowing Skirt)
    const skirtRipple = Math.sin(tick * 0.2) * 3;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-6, 3);
    ctx.bezierCurveTo(-14, 10, -16 + skirtRipple, 18, -12 + skirtRipple, 22);
    ctx.bezierCurveTo(-4, 20, 4, 20, 12 + skirtRipple, 22);
    ctx.bezierCurveTo(16 + skirtRipple, 18, 14, 10, 6, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // VALKYRIE BREASTPLATE (Sculpted Aquamarine Armor)
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(6, -7);
    ctx.lineTo(5, 4);
    ctx.lineTo(-5, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Silver wing pauldrons on shoulders
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(-12, -10);
    ctx.lineTo(-8, -4);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(6, -7);
    ctx.lineTo(12, -10);
    ctx.lineTo(8, -4);
    ctx.closePath();
    ctx.fill();

    // 3. NOELLE FACE & AMETHYST EYES
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Amethyst Eyes
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-4, -7);
    ctx.lineTo(-1, -7);
    ctx.moveTo(1, -7);
    ctx.lineTo(4, -7);
    ctx.stroke();
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(-2.5, -6.2, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -6.2, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // SILVER TWIN PIGTAILS & HAIR
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;

    // Center bangs & head
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.bezierCurveTo(-8, -16, -4, -22, 0, -22);
    ctx.bezierCurveTo(4, -22, 8, -16, 6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left Twin Pigtail
    const pigtailWave = Math.sin(tick * 0.25) * 3;
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.bezierCurveTo(-15, -8, -18 + pigtailWave, 2, -14 + pigtailWave, 10);
    ctx.bezierCurveTo(-11, 4, -8, -2, -5, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Twin Pigtail
    ctx.beginPath();
    ctx.moveTo(6, -12);
    ctx.bezierCurveTo(15, -8, 18 - pigtailWave, 2, 14 - pigtailWave, 10);
    ctx.bezierCurveTo(11, 4, 8, -2, 5, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. FRONT ARM & SEA DRAGON SPIRAL WATER LANCE (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(5, -4);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-1.5, 0, 3, 6);
    // Silver gauntlet cuff
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-1.5, 4.5, 3, 1.5);

    // Hand gripping lance at (1, 6)
    ctx.translate(1, 6);
    const noelleLanceAngle = -0.32 + anim.weaponSway + (p.isAttacking ? 0.70 : 0);
    ctx.rotate(noelleLanceAngle);

    // SEA DRAGON SPIRAL WATER LANCE
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0ea5e9';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, -32); // Lance tip
    ctx.lineTo(5, 5);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();

    // Spiral white water currents around lance
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, -14, 6, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -5, 7, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Silver armored gauntlet hand gripping the lance
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const noelleStart = code.indexOf('  drawNoelle(ctx, p, tick) {');
const noelleEnd = code.indexOf('  // =========================================================================\n  // 4. YAMI SUKEHIRO');
if (noelleStart !== -1 && noelleEnd !== -1) {
  code = code.substring(0, noelleStart) + drawNoelleNew + '\n\n' + code.substring(noelleEnd);
  console.log('Successfully replaced drawNoelle!');
} else {
  console.error('Failed to locate drawNoelle boundaries!');
}

// Function 4: drawYami
const drawYamiNew = `  drawYami(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Dark Dimension Mana Aura
    this.drawAura(ctx, 0, -2, 30, 'rgba(147, 51, 234, 0.4)', 24);
    this.drawAura(ctx, 0, -2, 18, 'rgba(15, 23, 42, 0.8)', 16);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 16);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. BACK ARM (Left arm swinging naturally under captain mantle)
    ctx.save();
    ctx.translate(-7, -4);
    ctx.rotate(anim.backArmSwing);
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(3, 0);
    ctx.lineTo(2.5, 8);
    ctx.lineTo(-2.5, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 9.5, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. HEAVY COMBAT BOOTS & TROUSERS (Dynamic walking stride)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#1c1917',
      bootColor: '#451a03',
      cuffColor: '#291404',
      buckleColor: '#78350f',
      pantWidth: 6,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -5,
      rightHipX: 4.5,
      hipY: 6
    });

    // 3. BROAD MUSCULAR TORSO & WHITE TANK TOP
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-9, -8);
    ctx.lineTo(9, -8);
    ctx.lineTo(8, 7);
    ctx.lineTo(-8, 7);
    ctx.closePath();
    ctx.fill();

    // Muscle Contours & Tank Top
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-6, -8);
    ctx.lineTo(6, -8);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.closePath();
    ctx.fill();

    // Pectoral cleft & abs
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(0, 5);
    ctx.stroke();

    // BLACK BULLS CAPTAIN MANTLE (Draped over left shoulder with Gold Bull Crest)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-10, -9);
    ctx.lineTo(-17, -4);
    ctx.lineTo(-14, 12);
    ctx.lineTo(-7, 6);
    ctx.closePath();
    ctx.fill();
    // Gold embroidery border & Bull insignia
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(-11, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Leather belt with Katana Scabbard
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-9, 6, 18, 3.5);
    // Katana scabbard on left hip
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-12, 5, 5, 12);

    // 4. HEAD & RUGGED JAWLINE
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-6, -11);
    ctx.lineTo(6, -11);
    ctx.lineTo(6, -5);
    ctx.lineTo(0, -1);
    ctx.lineTo(-6, -5);
    ctx.closePath();
    ctx.fill();

    // Stubble on chin & Smirk
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, -3);
    ctx.lineTo(3, -3);
    ctx.stroke();

    // Smoking Cigarette
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(1, -2);
    ctx.lineTo(6, -2);
    ctx.stroke();
    // Red glowing tip & smoke
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(5.5, -2.5, 1.5, 1.5);

    // Fierce Narrowed Anime Eyes
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-4.5, -7);
    ctx.lineTo(-1, -6.5);
    ctx.moveTo(1, -6.5);
    ctx.lineTo(4.5, -7);
    ctx.stroke();

    // UNRULY SPIKY BLACK HAIR
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-7, -10);
    ctx.lineTo(-11, -14);
    ctx.lineTo(-8, -17);
    ctx.lineTo(-10, -23);
    ctx.lineTo(-4, -22);
    ctx.lineTo(0, -25);
    ctx.lineTo(4, -23);
    ctx.lineTo(9, -21);
    ctx.lineTo(7, -15);
    ctx.lineTo(11, -12);
    ctx.lineTo(7, -10);
    ctx.closePath();
    ctx.fill();

    // 5. FRONT ARM & DARK MAGIC KATANA (Held firmly in hand pointing forward!)
    ctx.save();
    ctx.translate(6, -4);
    // Muscular bicep & forearm
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-2.5, 0);
    ctx.lineTo(2.5, 0);
    ctx.lineTo(4, 6);
    ctx.lineTo(-1, 6);
    ctx.closePath();
    ctx.fill();

    ctx.translate(2, 5);
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(2, 0);
    ctx.lineTo(4, 5);
    ctx.lineTo(0, 5);
    ctx.closePath();
    ctx.fill();

    // Black forearm wrap
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 2, 4.5, 3.5);

    // Strong hand gripping Katana tsuka at (2, 5)
    ctx.translate(2, 5);
    const yamiKatanaAngle = -0.38 + anim.weaponSway + (p.isAttacking ? 0.82 : 0);
    ctx.rotate(yamiKatanaAngle);

    // DARK MAGIC KATANA
    ctx.strokeStyle = '#09090b';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;

    // Razor-sharp steel Katana blade extending forward-upwards
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -28);
    ctx.stroke();

    // Katana Tsuba (Handguard)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-3, -1, 6, 2.5);

    // Tsuka (Handle)
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-1.5, 1, 3, 7);
    ctx.shadowBlur = 0;

    // Muscular hand wrapped around tsuka
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const yamiStart = code.indexOf('  drawYami(ctx, p, tick) {');
const yamiEnd = code.indexOf('  // =========================================================================\n  // 5. LUCK VOLTIA');
if (yamiStart !== -1 && yamiEnd !== -1) {
  code = code.substring(0, yamiStart) + drawYamiNew + '\n\n' + code.substring(yamiEnd);
  console.log('Successfully replaced drawYami!');
} else {
  console.error('Failed to locate drawYami boundaries!');
}

// Function 5: drawJulius
const drawJuliusNew = `  drawJulius(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Royal Celestial Time Aura
    this.drawAura(ctx, 0, -2, 32, 'rgba(234, 179, 8, 0.4)', 26);
    this.drawAura(ctx, 0, -2, 20, 'rgba(59, 130, 246, 0.35)', 18);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 16);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. ROYAL LEGS BENEATH ROBES (Visible walking strides)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#1e3a8a',
      bootColor: '#18181b',
      buckleColor: '#fbbf24',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -4.5,
      rightHipX: 4,
      hipY: 6
    });

    // 2. REGAL CRIMSON & GOLD WIZARD KING MANTLE (Deep flowing velvet)
    const mantleFlutter = Math.sin(tick * 0.18) * 3;
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.bezierCurveTo(-18, 4, -18 + mantleFlutter, 16, -14 + mantleFlutter, 22);
    ctx.lineTo(14, 22);
    ctx.bezierCurveTo(18, 16, 18, 4, 10, -8);
    ctx.closePath();
    ctx.fill();

    // Gold filigree hem
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pure White Fur Ruff Collar
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, -7, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Royal Blue Robe Inner
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(-5, -6, 10, 18);

    // Gold Medal Clover Chain
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // 3. DIGNIFIED ANIME FACE WITH BLUE STAR MARK
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Blue Star Mark on Forehead (Julius's Mark)
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, -9.5, 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Gentle Wise Blue Eyes
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // NEATLY SWEPT GOLDEN ANIME HAIR
    ctx.fillStyle = '#fde047';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.bezierCurveTo(-9, -15, -4, -22, 0, -22);
    ctx.bezierCurveTo(4, -22, 9, -15, 6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. FRONT ARM & CHRONO STASIS TIME GRIMOIRE (Held/levitating in white-gloved hand!)
    ctx.save();
    ctx.translate(6, -4);
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-1.5, 0, 3, 5);
    // White fur cuff
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-2, 4, 4, 2);

    // Outstretched white-gloved hand at (1, 6)
    ctx.translate(1, 6);
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(2, 0, 3, 2, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // ROTATING CHRONO STASIS TIME GLYPH RING (Levitating above hand)
    ctx.save();
    ctx.translate(6, -6);
    ctx.rotate(tick * -0.04);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.stroke();
    // 4 Roman numeral ticks
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(Math.cos(a) * 14 - 1.5, Math.sin(a) * 14 - 1.5, 3, 3);
    }
    // Time Grimoire core
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.restore();

    ctx.restore();
  },`;

const juliusStart = code.indexOf('  drawJulius(ctx, p, tick) {');
const juliusEnd = code.indexOf('  // =========================================================================\n  // 7. ZENON ZOGRATIS');
if (juliusStart !== -1 && juliusEnd !== -1) {
  code = code.substring(0, juliusStart) + drawJuliusNew + '\n\n' + code.substring(juliusEnd);
  console.log('Successfully replaced drawJulius!');
} else {
  console.error('Failed to locate drawJulius boundaries!');
}

// Function 6: drawLuck
const drawLuckNew = `  drawLuck(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Thunder Fiend Sparking Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(56, 189, 248, 0.5)', 24);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 15);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. JAGGED LIGHTNING BOOTS & TROUSERS (Fast stepping sprint with sparks)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#f8fafc',
      bootColor: '#0284c7',
      cuffColor: '#0ea5e9',
      buckleColor: '#38bdf8',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -4.5,
      rightHipX: 4,
      hipY: 6
    });

    // Electric sparks on boots when moving
    if (anim.isMoving || Math.random() < 0.4) {
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-6, 20);
      ctx.lineTo(-3, 22);
      ctx.lineTo(-7, 24);
      ctx.moveTo(5, 20);
      ctx.lineTo(8, 22);
      ctx.lineTo(4, 24);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // White Tunic & Black Bulls Shoulder Cape
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(-5, -6, 10, 12);
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-8, -7);
    ctx.lineTo(-12, -3);
    ctx.lineTo(-10, 5);
    ctx.lineTo(-5, 2);
    ctx.closePath();
    ctx.fill();

    // Face & Manic Grin
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Manic Battle Grin
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, -4, 2.5, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Electric Blue Eyes
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Messy Blonde Anime Hair
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-10, -15);
    ctx.lineTo(-6, -20);
    ctx.lineTo(0, -23);
    ctx.lineTo(6, -20);
    ctx.lineTo(10, -15);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 2. THUNDER CLAW GAUNTLETS ON HANDS (Pumping forward in combat stance)
    const armSwing = anim.isMoving ? Math.sin(anim.cycle) * 0.45 : 0;
    ctx.save();
    ctx.translate(-5, -4);
    ctx.rotate(-armSwing);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 9, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(6, -4);
    ctx.rotate(armSwing + 0.3);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 9, 4, 0, Math.PI * 2);
    ctx.fill();

    // Crackling claw sparks
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-1, 9);
    ctx.lineTo(4, 11);
    ctx.moveTo(0, 6);
    ctx.lineTo(3, 4);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.restore();
  },`;

const luckStart = code.indexOf('  drawLuck(ctx, p, tick) {');
const luckEnd = code.indexOf('  // =========================================================================\n  // 6. JULIUS NOVACHRONO');
if (luckStart !== -1 && luckEnd !== -1) {
  code = code.substring(0, luckStart) + drawLuckNew + '\n\n' + code.substring(luckEnd);
  console.log('Successfully replaced drawLuck!');
} else {
  console.error('Failed to locate drawLuck boundaries!');
}

// Function 7: drawZenon
const drawZenonNew = `  drawZenon(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Spatial Black Void Aura
    this.drawAura(ctx, 0, -4, 32, 'rgba(147, 51, 234, 0.45)', 22);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // DEMONIC BONE WINGS FANNING OUT FROM BACK
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#c084fc';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.4;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      // 3 Jagged bone spines per side
      for (let s = 0; s < 3; s++) {
        const angle = -0.5 + s * 0.35;
        const len = 22 + s * 6;
        ctx.save();
        ctx.translate(side * 6, -4);
        ctx.rotate(side * angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-len, -len * 0.4);
        ctx.lineTo(0, -3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.shadowBlur = 0;

    // SPADE MILITARY LEGS & BOOTS (Walking stride)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#09090b',
      bootColor: '#18181b',
      cuffColor: '#27272a',
      buckleColor: '#71717a',
      pantWidth: 5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -4.5,
      rightHipX: 4,
      hipY: 6
    });

    // SPADE MILITARY TRENCH COAT
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-8, -7);
    ctx.lineTo(8, -7);
    ctx.lineTo(7, 18);
    ctx.lineTo(-7, 18);
    ctx.closePath();
    ctx.fill();

    // Fur collar
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.ellipse(0, -7, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face & Cross Scar
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Cross Scar on Left Forehead
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, -9);
    ctx.lineTo(-1, -7);
    ctx.moveTo(-1, -9);
    ctx.lineTo(-3, -7);
    ctx.stroke();

    // Cold Black Eyes
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Neat Dark Hair
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-9, -15);
    ctx.lineTo(-4, -20);
    ctx.lineTo(0, -21);
    ctx.lineTo(4, -20);
    ctx.lineTo(9, -15);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();

    // FRONT ARM & SPATIAL BONE LANCE (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(6, -4);
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-1.5, 0, 3, 6);
    ctx.translate(1, 6);
    const zenonAngle = -0.35 + anim.weaponSway + (p.isAttacking ? 0.75 : 0);
    ctx.rotate(zenonAngle);

    // Spatial Bone Lance
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#c084fc';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(4, 4);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Black gloved hand
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const zenonStart = code.indexOf('  drawZenon(ctx, p, tick) {');
const zenonEnd = code.indexOf('  // =========================================================================\n  // 8. VANICA ZOGRATIS');
if (zenonStart !== -1 && zenonEnd !== -1) {
  code = code.substring(0, zenonStart) + drawZenonNew + '\n\n' + code.substring(zenonEnd);
  console.log('Successfully replaced drawZenon!');
} else {
  console.error('Failed to locate drawZenon boundaries!');
}

// Function 8: drawVanica
const drawVanicaNew = `  drawVanica(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Crimson Blood Mist Aura
    this.drawAura(ctx, 0, -4, 32, 'rgba(239, 68, 68, 0.45)', 24);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // SWIRLING LIQUID BLOOD WINGS (Megicula Cursed Blood)
    const bloodWave = Math.sin(tick * 0.2) * 4;
    ctx.fillStyle = '#991b1b';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(-18, -20, -28 + bloodWave, -10, -24 + bloodWave, 8);
    ctx.bezierCurveTo(-14, 4, -8, 2, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // HIGH-HEELED GOTHIC BOOTS & LEGS (Walking stride)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#18181b',
      bootColor: '#450a0a',
      cuffColor: '#7f1d1d',
      buckleColor: '#ef4444',
      pantWidth: 4.5,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3,
      leftHipX: -4.5,
      rightHipX: 3.5,
      hipY: 6
    });

    // GOTHIC CORSET DRESS (Black & Crimson)
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(6, -7);
    ctx.lineTo(8, 18);
    ctx.lineTo(-8, 18);
    ctx.closePath();
    ctx.fill();

    // Crimson corset laces
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-3, -4);
    ctx.lineTo(3, 0);
    ctx.moveTo(-3, 2);
    ctx.lineTo(3, 6);
    ctx.stroke();

    // Face & Eyepatch
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Gothic Eyepatch on Right Eye
    ctx.fillStyle = '#09090b';
    ctx.fillRect(1, -8, 3.5, 3.5);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(1, -8, 3.5, 3.5);

    // Left Crimson Eye
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Wild Black Hair with Hairband
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-11, -15);
    ctx.lineTo(-7, -21);
    ctx.lineTo(0, -22);
    ctx.lineTo(7, -21);
    ctx.lineTo(11, -15);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();

    // FRONT ARM & CURSED BLOOD CLAWS (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(5, -4);
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-1.5, 0, 3, 6);
    ctx.translate(1, 6);
    const vanicaAngle = -0.32 + anim.weaponSway + (p.isAttacking ? 0.70 : 0);
    ctx.rotate(vanicaAngle);

    // Crimson Blood Scythe/Claws
    ctx.strokeStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(4, -12, 10, -22, 2, -28);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Hand gripping claws
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const vanicaStart = code.indexOf('  drawVanica(ctx, p, tick) {');
const vanicaEnd = code.indexOf('  // =========================================================================\n  // 9. DANTE ZOGRATIS');
if (vanicaStart !== -1 && vanicaEnd !== -1) {
  code = code.substring(0, vanicaStart) + drawVanicaNew + '\n\n' + code.substring(vanicaEnd);
  console.log('Successfully replaced drawVanica!');
} else {
  console.error('Failed to locate drawVanica boundaries!');
}

// Function 9: drawDante
const drawDanteNew = `  drawDante(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);

    ctx.save();
    ctx.translate(p.x, p.y + anim.walkBob);
    ctx.scale(facing, 1);

    // Gravity Singularity Aura
    this.drawAura(ctx, 0, -4, 36, 'rgba(15, 23, 42, 0.75)', 24);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // ROTATING BLACK HOLE GRAVITY SPHERE ABOVE HEAD
    ctx.save();
    ctx.translate(0, -28);
    ctx.rotate(tick * 0.1);
    ctx.fillStyle = '#000000';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    // Swirling red accretion disk
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 4, 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // DEMONIC MUSCULAR LEGS & BOOTS (Heavy strides)
    this.drawHumanoidLegs(ctx, anim, {
      pantColor: '#0f172a',
      bootColor: '#18181b',
      cuffColor: '#450a0a',
      buckleColor: '#dc2626',
      pantWidth: 6,
      thighLen: 8,
      bootLen: 8,
      toeLen: 3.5,
      leftHipX: -5,
      rightHipX: 4.5,
      hipY: 6
    });

    // 80% DEMON MUSCLE BODY & MANTLE
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(-10, -7);
    ctx.lineTo(10, -7);
    ctx.lineTo(9, 18);
    ctx.lineTo(-9, 18);
    ctx.closePath();
    ctx.fill();

    // Demonic red eye pulsing on chest
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Face & Spade Crown
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(0, -2);
    ctx.closePath();
    ctx.fill();

    // Black Hair & Crown
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(0, -14, 7, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-4, -18, 8, 3);

    // FRONT ARM & HEAVY GRAVITY ORB (Held in demonic hand!)
    ctx.save();
    ctx.translate(6, -4);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-2, 0, 4, 6);
    ctx.translate(2, 6);
    const danteAngle = -0.30 + anim.weaponSway + (p.isAttacking ? 0.70 : 0);
    ctx.rotate(danteAngle);

    // Gravity Singularity Orb held in hand
    ctx.fillStyle = '#000000';
    ctx.shadowColor = '#7c3aed';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(8, -8, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Demonic black clawed hand
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const danteStart = code.indexOf('  drawDante(ctx, p, tick) {');
const danteEnd = code.indexOf('  // =========================================================================\n  // 10. FANA');
if (danteStart !== -1 && danteEnd !== -1) {
  code = code.substring(0, danteStart) + drawDanteNew + '\n\n' + code.substring(danteEnd);
  console.log('Successfully replaced drawDante!');
} else {
  console.error('Failed to locate drawDante boundaries!');
}

// Function 10: drawSylph
const drawSylphNew = `  drawSylph(ctx, p, tick) {
    const facing = p.facing || 1;
    const floatBob = Math.sin(tick * 0.24) * 4;
    const wingFlutter = Math.sin(tick * 0.55);

    ctx.save();
    ctx.translate(p.x, p.y + floatBob);
    ctx.scale(facing, 1);

    // Radiant Emerald & Golden Spirit Aura
    this.drawAura(ctx, 0, -4, 30, 'rgba(52, 211, 153, 0.45)', 25);
    this.drawAura(ctx, 0, -4, 18, 'rgba(254, 240, 138, 0.35)', 15);

    // Floating Ground Shadow
    const shadowGrad = ctx.createRadialGradient(0, 20 - floatBob, 1, 0, 20 - floatBob, 14);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 20 - floatBob, 14, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Fairy Wings (2 Upper, 2 Lower with translucent emerald/gold gradient)
    const upperWingSpan = 22 + wingFlutter * 3;
    const lowerWingSpan = 14 + wingFlutter * 2;

    const wingGrad = ctx.createLinearGradient(0, -10, -upperWingSpan, -25);
    wingGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    wingGrad.addColorStop(0.4, 'rgba(110, 231, 183, 0.85)');
    wingGrad.addColorStop(0.8, 'rgba(253, 224, 71, 0.7)');
    wingGrad.addColorStop(1, 'rgba(52, 211, 153, 0.4)');

    ctx.save();
    ctx.fillStyle = wingGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;

    // Upper Left Wing (back)
    ctx.beginPath();
    ctx.moveTo(-2, -8);
    ctx.bezierCurveTo(-10, -22, -upperWingSpan, -26, -upperWingSpan - 4, -14);
    ctx.bezierCurveTo(-upperWingSpan + 2, -6, -10, -4, -2, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lower Left Wing (back)
    ctx.beginPath();
    ctx.moveTo(-2, -5);
    ctx.bezierCurveTo(-8, -10, -lowerWingSpan, -8, -lowerWingSpan - 2, 2);
    ctx.bezierCurveTo(-lowerWingSpan + 4, 8, -6, 2, -2, -3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Slender Fairy Legs with mint slippers (Flutter-kicking gently while moving/flying!)
    const fairyKick = p.isMoving ? Math.sin(tick * 0.35) * 0.35 : Math.sin(tick * 0.15) * 0.12;
    // Left leg
    ctx.save();
    ctx.translate(-2.5, 8);
    ctx.rotate(fairyKick);
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-1.25, 0, 2.5, 9);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(0, 9, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right leg
    ctx.save();
    ctx.translate(2.5, 8);
    ctx.rotate(-fairyKick);
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-1.25, 0, 2.5, 9);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(0, 9, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Emerald Fairy Tunic / Dress with golden ribbon
    const dressGrad = ctx.createLinearGradient(0, -6, 0, 10);
    dressGrad.addColorStop(0, '#059669');
    dressGrad.addColorStop(0.5, '#10b981');
    dressGrad.addColorStop(1, '#34d399');

    ctx.fillStyle = dressGrad;
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(4, -4);
    ctx.lineTo(7, 7);
    ctx.bezierCurveTo(4, 9, -4, 9, -7, 7);
    ctx.lineTo(-4, -4);
    ctx.closePath();
    ctx.fill();

    // Gold waist belt & ribbon
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.rect(-4.5, 1, 9, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.quadraticCurveTo(-4, 7, -6, 12);
    ctx.lineTo(-4, 12);
    ctx.quadraticCurveTo(-2, 7, 1, 3);
    ctx.fill();

    // Slender Left Arm swinging
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.ellipse(-6, -2, 2, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Petite Fairy Face
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, -11, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Cute pink blush
    ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-3.5, -9.5, 2, 1, 0, 0, Math.PI * 2);
    ctx.ellipse(3.5, -9.5, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Big Anime Emerald Eyes
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.ellipse(2.5, -11.5, 2.2, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(-2.5, -11.5, 1.8, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.ellipse(2.5, -10.5, 1.6, 1.8, 0, 0, Math.PI * 2);
    ctx.ellipse(-2.5, -10.5, 1.3, 1.7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(3.2, -12.5, 1, 0, Math.PI * 2);
    ctx.arc(-1.8, -12.5, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Cute Smile
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0.5, -8, 1.8, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Golden Fairy Hair with flowing anime twintails & bangs
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.arc(0, -12.5, 8.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // Left Twin Tail (wind swaying)
    const hairSway = Math.sin(tick * 0.28) * 4;
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.bezierCurveTo(-14, -8, -16 + hairSway, 0, -12 + hairSway, 8);
    ctx.bezierCurveTo(-9 + hairSway, 5, -8, -4, -4, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Twin Tail (wind swaying)
    ctx.beginPath();
    ctx.moveTo(6, -12);
    ctx.bezierCurveTo(14, -8, 16 - hairSway, 0, 12 - hairSway, 8);
    ctx.bezierCurveTo(9 - hairSway, 5, 8, -4, 4, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Front bangs
    ctx.beginPath();
    ctx.moveTo(-7, -13);
    ctx.lineTo(-4, -9);
    ctx.lineTo(-1, -12);
    ctx.lineTo(2, -9);
    ctx.lineTo(6, -11);
    ctx.lineTo(7, -14);
    ctx.closePath();
    ctx.fill();

    // Ahoge (hair antenna) swaying in the breeze
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.quadraticCurveTo(5 + hairSway * 0.5, -25, 2, -26);
    ctx.quadraticCurveTo(3, -21, 0, -18);
    ctx.fill();
    ctx.stroke();

    // Gold Leaf Tiara / Fairy Crown
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-4, -17);
    ctx.lineTo(-2, -21);
    ctx.lineTo(0, -18);
    ctx.lineTo(2, -21);
    ctx.lineTo(4, -17);
    ctx.closePath();
    ctx.fill();

    // Front Wing (overlapping body for 3D depth)
    ctx.save();
    ctx.fillStyle = wingGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(2, -8);
    ctx.bezierCurveTo(10, -22, upperWingSpan, -26, upperWingSpan + 4, -14);
    ctx.bezierCurveTo(upperWingSpan - 2, -6, 10, -4, 2, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // FRONT ARM & SPIRIT FAIRY SCEPTER / WAND (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(5, -2);
    ctx.rotate(0.2 + (p.isMoving ? Math.sin(tick * 0.25) * 0.1 : 0));

    // Slender arm
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.8, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Fairy Hand holding Wand
    ctx.translate(2, 4);
    // Glowing emerald star scepter
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.lineTo(0, -14);
    ctx.stroke();

    // Glowing Spirit Star on wand tip
    ctx.fillStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, -14, 2.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dainty hand
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const sylphStart = code.indexOf('  drawSylph(ctx, p, tick) {');
const sylphEnd = code.indexOf('  // =========================================================================\n  // ENEMY & BOSS SPRITES');
if (sylphStart !== -1 && sylphEnd !== -1) {
  code = code.substring(0, sylphStart) + drawSylphNew + '\n\n' + code.substring(sylphEnd);
  console.log('Successfully replaced drawSylph!');
} else {
  console.error('Failed to locate drawSylph boundaries!');
}

fs.writeFileSync(spritesPath, code, 'utf8');
console.log('Finished updating sprites.js! New length:', code.length);
