// Enhanced Procedural Anime Sprite & VFX Renderer for Black Clover: Magic Survivor
// Features high-detail anime character sprites, dynamic lighting, glowing auras, magic circles, and auto-targeting reticles.

const Sprites = {
  // Environmental ambient mana motes cache
  ambientMotes: null,

  initAmbient(count = 45) {
    if (this.ambientMotes) return;
    this.ambientMotes = [];
    for (let i = 0; i < count; i++) {
      this.ambientMotes.push({
        x: Math.random() * 4000,
        y: Math.random() * 4000,
        r: 1.5 + Math.random() * 2.5,
        speedX: -15 + Math.random() * 30,
        speedY: -20 - Math.random() * 25,
        color: ['#38bdf8', '#34d399', '#fde047', '#c084fc', '#f43f5e'][Math.floor(Math.random() * 5)],
        alpha: 0.2 + Math.random() * 0.5,
        pulseSpeed: 1 + Math.random() * 2
      });
    }
  },

  // Draw glowing aura helper with multi-tier radial glow
  drawAura(ctx, x, y, radius, color, blur = 18) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.fill();
    ctx.restore();
  },

  // TARGET LOCK RETICLE (Ghim Mục Tiêu Ma Pháp Tự Động)
  drawTargetReticle(ctx, enemy, tick) {
    if (!enemy || enemy.hp <= 0) return;

    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    const isBoss = enemy.isBoss;
    const baseR = enemy.radius + 14;
    const pulse = Math.sin(tick * 0.12) * 3;
    const r = baseR + pulse;

    const mainColor = isBoss ? '#ef4444' : '#f59e0b';
    const subColor = isBoss ? '#fca5a5' : '#fef08a';

    // 1. Outer Rotating Clover Magic Circle
    ctx.save();
    ctx.rotate(tick * 0.04);
    ctx.strokeStyle = mainColor;
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;

    // Circle
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    // 4 Clover leaves / compass points
    for (let i = 0; i < 4; i++) {
      const ang = (i * Math.PI) / 2;
      const lx = Math.cos(ang) * r;
      const ly = Math.sin(ang) * r;
      ctx.fillStyle = subColor;
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. Inner Counter-Rotating Hexagram / Diamond
    ctx.save();
    ctx.rotate(-tick * 0.06);
    ctx.strokeStyle = subColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    const innerR = r * 0.65;
    ctx.moveTo(0, -innerR);
    ctx.lineTo(innerR, 0);
    ctx.lineTo(0, innerR);
    ctx.lineTo(-innerR, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // 3. Four Corner Locking Brackets [ ]
    const bracketDist = r + 8;
    const bracketLen = 8;
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2.5;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(-bracketDist, -bracketDist + bracketLen);
    ctx.lineTo(-bracketDist, -bracketDist);
    ctx.lineTo(-bracketDist + bracketLen, -bracketDist);
    // Top-Right
    ctx.moveTo(bracketDist - bracketLen, -bracketDist);
    ctx.lineTo(bracketDist, -bracketDist);
    ctx.lineTo(bracketDist, -bracketDist + bracketLen);
    // Bottom-Left
    ctx.moveTo(-bracketDist, bracketDist - bracketLen);
    ctx.lineTo(-bracketDist, bracketDist);
    ctx.lineTo(-bracketDist + bracketLen, bracketDist);
    // Bottom-Right
    ctx.moveTo(bracketDist - bracketLen, bracketDist);
    ctx.lineTo(bracketDist, bracketDist);
    ctx.lineTo(bracketDist, bracketDist - bracketLen);
    ctx.stroke();

    // 4. Target Health Bar above enemy head
    const hpPct = Math.max(0, Math.min(1, enemy.hp / enemy.maxHp));
    const barW = Math.max(38, enemy.radius * 2 + 10);
    const barH = 5;
    const barY = -enemy.radius - 18;

    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2);
    ctx.fillStyle = isBoss ? '#dc2626' : '#22c55e';
    ctx.fillRect(-barW / 2, barY, barW * hpPct, barH);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.8;
    ctx.strokeRect(-barW / 2 - 1, barY - 1, barW + 2, barH + 2);

    // Target label
    ctx.font = 'bold 9px Nunito, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.ceil(enemy.hp)}/${enemy.maxHp}`, 0, barY - 4);

    ctx.restore();
  },

  // GROUND DETAILS (Integrated into Infinite Procedural drawWorldBackground in game.js)
  drawGroundDetails(ctx, camera, screenW, screenH, tick, isUnderworld) {
    // Ground details are now fully handled by the 3-Layer Procedural Biome system in game.js
  },

  // AMBIENT PARTICLES (Lá bay, đốm sáng mana trôi bồng bềnh)
  drawAmbient(ctx, camera, screenW, screenH, dt, tick) {
    this.initAmbient();
    const margin = 200;
    const minX = camera.x - margin;
    const maxX = camera.x + screenW + margin;
    const minY = camera.y - margin;
    const maxY = camera.y + screenH + margin;

    for (const m of this.ambientMotes) {
      m.x += m.speedX * dt;
      m.y += m.speedY * dt;

      // Wrap around screen area
      if (m.x < minX) m.x = maxX;
      if (m.x > maxX) m.x = minX;
      if (m.y < minY) m.y = maxY;
      if (m.y > maxY) m.y = minY;

      const alphaPulse = m.alpha * (0.6 + 0.4 * Math.sin(tick * 0.05 * m.pulseSpeed + m.x));

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, alphaPulse));
      ctx.fillStyle = m.color;
      ctx.shadowColor = m.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  },

  // Get walking animation parameters based on player movement
  getWalkAnim(p, tick) {
    const isMoving = !!(p && p.isMoving);
    const cycle = (p && p.walkDistance !== undefined && p.walkDistance > 0)
      ? (p.walkDistance * 0.08)
      : (isMoving ? tick * 0.28 : 0);

    const swingMax = 0.50; // radians (~28.6 degrees)
    const legSwing = isMoving ? Math.sin(cycle) * swingMax : 0;

    // Knee bend lifts foot when swinging backward
    const leftBend = (isMoving && legSwing < 0) ? -legSwing * 0.55 : 0;
    const rightBend = (isMoving && -legSwing < 0) ? legSwing * 0.55 : 0;

    // Body vertical bob (running bounce at double frequency; idle gentle breath)
    const walkBob = isMoving ? (Math.sin(cycle * 2) * 2.2) : (Math.sin(tick * 0.06) * 1.0);

    // Arm swing: back arm swings opposite to front arm
    const backArmSwing = isMoving ? -Math.sin(cycle) * 0.42 : Math.sin(tick * 0.06) * 0.06;

    // Weapon idle sway / walk bob
    const weaponSway = isMoving ? (Math.sin(cycle) * 0.10) : (Math.sin(tick * 0.08) * 0.04);

    return {
      isMoving,
      cycle,
      walkBob,
      leftAngle: legSwing,
      rightAngle: -legSwing,
      leftBend,
      rightBend,
      backArmSwing,
      weaponSway
    };
  },

  drawHumanoidLegs(ctx, anim, {
    pantColor = '#18181b',
    bootColor = '#451a03',
    buckleColor = null,
    cuffColor = null,
    pantWidth = 5,
    thighLen = 8,
    bootLen = 8,
    toeLen = 3.5,
    leftHipX = -4.5,
    rightHipX = 4.0,
    hipY = 6
  } = {}) {
    // 1. Left leg (back leg in 3/4 view)
    ctx.save();
    ctx.translate(leftHipX, hipY);
    ctx.rotate(anim.leftAngle);

    // Thigh / Trousers
    ctx.fillStyle = pantColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2 - 0.5, thighLen);
    ctx.lineTo(-pantWidth / 2 + 0.5, thighLen);
    ctx.closePath();
    ctx.fill();

    // Knee joint & Boot
    ctx.translate(0, thighLen);
    ctx.rotate(anim.leftBend);

    // Boot cuff
    if (cuffColor) {
      ctx.fillStyle = cuffColor;
      ctx.fillRect(-pantWidth / 2 - 1, -1, pantWidth + 2, 2.5);
    }

    // Boot
    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2 - 0.5, 0);
    ctx.lineTo(pantWidth / 2 + 0.5, 0);
    ctx.lineTo(pantWidth / 2 + toeLen, bootLen);
    ctx.lineTo(-pantWidth / 2 - 1, bootLen);
    ctx.closePath();
    ctx.fill();

    // Buckle / Trim
    if (buckleColor) {
      ctx.fillStyle = buckleColor;
      ctx.fillRect(-pantWidth / 2 + 0.5, 2, pantWidth - 1, 1.8);
    }
    ctx.restore();

    // 2. Right leg (front leg)
    ctx.save();
    ctx.translate(rightHipX, hipY);
    ctx.rotate(anim.rightAngle);

    // Thigh / Trousers
    ctx.fillStyle = pantColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2 - 0.5, thighLen);
    ctx.lineTo(-pantWidth / 2 + 0.5, thighLen);
    ctx.closePath();
    ctx.fill();

    // Knee joint & Boot
    ctx.translate(0, thighLen);
    ctx.rotate(anim.rightBend);

    // Boot cuff
    if (cuffColor) {
      ctx.fillStyle = cuffColor;
      ctx.fillRect(-pantWidth / 2 - 1, -1, pantWidth + 2, 2.5);
    }

    // Boot
    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2 - 0.5, 0);
    ctx.lineTo(pantWidth / 2 + 0.5, 0);
    ctx.lineTo(pantWidth / 2 + toeLen, bootLen);
    ctx.lineTo(-pantWidth / 2 - 1, bootLen);
    ctx.closePath();
    ctx.fill();

    // Buckle / Trim
    if (buckleColor) {
      ctx.fillStyle = buckleColor;
      ctx.fillRect(-pantWidth / 2 + 0.5, 2, pantWidth - 1, 1.8);
    }
    ctx.restore();
  },

  drawPlayerSprite(ctx, p, tick) {
    if (!p) return;
    const cid = p.charId || 'asta';
    const scale = p.isPreview ? 1.0 : (p.spriteScale || 0.88); // Adjusted to optimal anime hero proportion

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(scale, scale);
    ctx.translate(-p.x, -p.y);

    switch (cid) {
      case 'asta':
      case 'black_asta':
        this.drawAsta(ctx, p, tick);
        break;
      case 'mereoleona':
        this.drawMereoleona ? this.drawMereoleona(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'fuegoleon':
      case 'leopold':
        this.drawFuegoleon ? this.drawFuegoleon(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'lumiere':
        this.drawLumiere ? this.drawLumiere(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'licht':
        this.drawLicht ? this.drawLicht(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'nacht':
        this.drawNacht ? this.drawNacht(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'secre':
        this.drawSecre ? this.drawSecre(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'charlotte':
        this.drawCharlotte ? this.drawCharlotte(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'william':
        this.drawWilliam ? this.drawWilliam(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'nozel':
        this.drawNozel ? this.drawNozel(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'jack':
        this.drawJack ? this.drawJack(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'magna':
        this.drawMagna ? this.drawMagna(ctx, p, tick) : this.drawLuck(ctx, p, tick);
        break;
      case 'charmy':
        this.drawCharmy ? this.drawCharmy(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
      case 'zora':
        this.drawZora ? this.drawZora(ctx, p, tick) : this.drawYami(ctx, p, tick);
        break;
      case 'finral':
      case 'langris':
        this.drawFinral ? this.drawFinral(ctx, p, tick) : this.drawYuno(ctx, p, tick);
        break;
      case 'dorothy':
        this.drawDorothy ? this.drawDorothy(ctx, p, tick) : this.drawNoelle(ctx, p, tick);
        break;
      case 'rill':
        this.drawRill ? this.drawRill(ctx, p, tick) : this.drawLuck(ctx, p, tick);
        break;
      case 'patry':
        this.drawPatry ? this.drawPatry(ctx, p, tick) : this.drawJulius(ctx, p, tick);
        break;
      case 'zenon':
        this.drawZenon(ctx, p, tick);
        break;
      case 'vanica':
        this.drawVanica(ctx, p, tick);
        break;
      case 'dante':
        this.drawDante(ctx, p, tick);
        break;
      case 'fana':
        this.drawFana(ctx, p, tick);
        break;
      case 'rhya':
        this.drawRhya(ctx, p, tick);
        break;
      case 'vetto':
        this.drawVetto(ctx, p, tick);
        break;
      case 'yuno':
      case 'klaus':
        this.drawYuno(ctx, p, tick);
        break;
      case 'noelle':
      case 'grey':
      case 'mimosa':
        this.drawNoelle(ctx, p, tick);
        break;
      case 'yami':
      case 'gordon':
      case 'henry':
        this.drawYami(ctx, p, tick);
        break;
      case 'luck':
      case 'sol':
        this.drawLuck(ctx, p, tick);
        break;
      case 'sylph':
        this.drawSylph(ctx, p, tick);
        break;
      case 'julius':
      case 'mars':
      default:
        this.drawJulius ? this.drawJulius(ctx, p, tick) : this.drawAsta(ctx, p, tick);
        break;
    }

    ctx.restore();
  },

  // =========================================================================
  // 1. ASTA (Tam Diệp Thảo / Ngũ Diệp Thảo / Black Asta)
  // =========================================================================
  drawAsta(ctx, p, tick) {
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
  },

  // =========================================================================
  // 2. YUNO GRINBERRYALL (Tinh Linh Ngự Phong / Spirit Zephyr)
  // =========================================================================
  drawYuno(ctx, p, tick) {
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
  },

  // =========================================================================
  // 3. NOELLE SILVA (Hải Thần Nữ Vương / Valkyrie Dress)
  // =========================================================================
  drawNoelle(ctx, p, tick) {
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
  },

  // =========================================================================
  // 4. YAMI SUKEHIRO (Ám Ma Pháp Đoàn Trưởng / Dark Magic Katana)
  // =========================================================================
  drawYami(ctx, p, tick) {
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
  },

  // =========================================================================
  // 5. LUCK VOLTIA (Lôi Ma Pháp Cuồng Chiến / Thunder Fiend)
  // =========================================================================
  drawLuck(ctx, p, tick) {
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
  },

  // =========================================================================
  // 6. JULIUS NOVACHRONO (Ma Pháp Vương / Wizard King & Royal Captains)
  // =========================================================================
  drawJulius(ctx, p, tick) {
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
  },

  // =========================================================================
  // 7. ZENON ZOGRATIS (Spade Dark Triad - Spatial & Bone Magic)
  // =========================================================================
  drawZenon(ctx, p, tick) {
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
  },

  // =========================================================================
  // 8. VANICA ZOGRATIS (Huyết Ma Pháp Nữ Vương & Megicula)
  // =========================================================================
  drawVanica(ctx, p, tick) {
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
  },

  // =========================================================================
  // 9. DANTE ZOGRATIS (Trọng Lực Ma Vương / Gravity Singularity)
  // =========================================================================
  drawDante(ctx, p, tick) {
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
  },

  // =========================================================================
  // 10. FANA (Viêm Tinh Linh Salamander / Fire Spirit)
  // =========================================================================
  drawFana(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    this.drawAura(ctx, 0, -4, 30, 'rgba(239, 68, 68, 0.45)', 22);

    // Salamander Fire Wings
    const wingWave = Math.sin(tick * 0.2) * 3;
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(-18, -22, -26 + wingWave, -12, -20 + wingWave, 6);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Salmon Pink Flowing Hair & White Robes
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(6, -7);
    ctx.lineTo(7, 18);
    ctx.lineTo(-7, 18);
    ctx.closePath();
    ctx.fill();

    // Face & Glowing Third Eye on Forehead
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(0, -2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(0, -9.5, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pink anime hair
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.arc(0, -14, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // =========================================================================
  // 11. RHYA (Bản Sao Ma Pháp / Copy Magic Grimoire)
  // =========================================================================
  drawRhya(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.18) * 1.6;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    this.drawAura(ctx, 0, -4, 28, 'rgba(168, 85, 247, 0.4)', 20);

    // Loose White Kimono Robe
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-7, -8);
    ctx.lineTo(7, -8);
    ctx.lineTo(8, 20);
    ctx.lineTo(-8, 20);
    ctx.closePath();
    ctx.fill();

    // Slanted Sleepy Eyes & Wavy White Hair
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(0, -2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.arc(0, -14, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Floating Copy Grimoire with 4 Elemental Orbs
    ctx.save();
    const gBob = Math.sin(tick * 0.2) * 3;
    ctx.translate(14, -8 + gBob);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(-4, -6, 8, 12);
    // 4 elemental colored dots
    const elemColors = ['#ef4444', '#38bdf8', '#34d399', '#facc15'];
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = elemColors[i];
      ctx.beginPath();
      ctx.arc((i % 2) * 4 - 2, Math.floor(i / 2) * 4 - 2, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // 12. VETTO (Thần Thú Tuyệt Vọng / Mythical Beast Armor)
  // =========================================================================
  drawVetto(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2.2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Savage Despair Aura
    this.drawAura(ctx, 0, -2, 34, 'rgba(234, 88, 12, 0.45)', 26);

    // Muscular Broad Beast Physique & Fur Pelt
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.moveTo(-11, -8);
    ctx.lineTo(11, -8);
    ctx.lineTo(10, 20);
    ctx.lineTo(-10, 20);
    ctx.closePath();
    ctx.fill();

    // Glowing Mythical Beast Claws on Hands
    ctx.strokeStyle = '#f97316';
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-11, 4);
    ctx.lineTo(-17, 8);
    ctx.moveTo(11, 4);
    ctx.lineTo(17, 8);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Wild Golden Lion Mane Hair
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -17, 12, 0, Math.PI * 2);
    ctx.fill();

    // Face, Fangs & Red 3rd Eye of Despair
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.lineTo(6, -12);
    ctx.lineTo(0, -3);
    ctx.closePath();
    ctx.fill();

    // 3rd Eye
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -10.5, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  },

  // 14. SYLPH (ĐẠI TINH LINH BÃO TỐ - BELL)
  drawSylph(ctx, p, tick) {
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
  },



  // =========================================================================
  // HERO: MEREOLEONA VERMILLION (Sư Tử Lửa Bất Bại / Uncrowned Lioness)
  // =========================================================================
  drawMereoleona(ctx, p, tick) {
    const facing = p.facing || 1;
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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
    const anim = this.getWalkAnim(p, tick);
    const bob = anim.walkBob;

    ctx.save();
    ctx.translate(p.x, p.y);
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

  // =========================================================================
  // ENEMY & BOSS SPRITE ROUTER (Chuyển đổi hình vẽ sang Anime Path)
  // =========================================================================
  drawEnemy(ctx, e, tick) {
    if (!e || e.hp <= 0) return;
    const isHit = e.hitFlashTimer > 0;

    ctx.save();
    ctx.translate(e.x, e.y);

    const facingLeft = (e.isPreCharging || e.isCharging) ? (Math.cos(e.chargeAngle || 0) < 0) : (e.vx < 0);
    if (facingLeft) {
      ctx.scale(-1, 1);
    }

    // Ground Shadow
    const shadowGrad = ctx.createRadialGradient(0, e.radius, 2, 0, e.radius, e.radius * 0.9);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, e.radius, e.radius * 0.9, e.radius * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // White flash on hit
    if (isHit) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, e.radius + 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    // Boss Enrage Aura & Demon Magic Circle (Phase 2)
    if (e.isBoss && e.isEnraged) {
      const jitter = Math.sin(tick * 0.8) * 2;

      // 1. Pháp Trận Ác Quỷ (Demon Magic Circle) đỏ thẫm (#ef4444) xoay nhanh dưới chân + rung gằn nhẹ
      ctx.save();
      ctx.translate(0, e.radius * 0.85 + jitter);
      const rot = (tick * 0.12) % (Math.PI * 2);
      ctx.rotate(rot);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.ellipse(0, 0, e.radius * 1.35, e.radius * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Magic Runes / Pentagram spokes
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
      for (let i = 0; i < 4; i++) {
        const ang = rot + i * (Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * e.radius * 1.15, Math.sin(ang) * e.radius * 0.45);
        ctx.lineTo(Math.cos(ang + Math.PI) * e.radius * 1.15, Math.sin(ang + Math.PI) * e.radius * 0.45);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // 2. Lớp hào quang lửa đen-đỏ nhấp nháy quanh thân Boss
      const auraPulse = Math.sin(tick * 0.35) * 4;
      const auraGrad = ctx.createRadialGradient(0, -e.radius * 0.2, e.radius * 0.3, 0, -e.radius * 0.2, e.radius * 1.35 + auraPulse);
      auraGrad.addColorStop(0, 'rgba(239, 68, 68, 0.38)');
      auraGrad.addColorStop(0.5, 'rgba(153, 27, 27, 0.25)');
      auraGrad.addColorStop(0.85, 'rgba(24, 24, 27, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, -e.radius * 0.2, e.radius * 1.35 + auraPulse, 0, Math.PI * 2);
      ctx.fill();
    }

    // Khiên Bất Tử Cuồng Nộ (1.2s Enrage Shield)
    if (e.enrageShieldTimer > 0) {
      ctx.save();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#eab308';
      ctx.shadowBlur = 12;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.arc(0, -e.radius * 0.2, e.radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = 'rgba(250, 204, 21, 0.18)';
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    switch (e.type) {
      case 'armored_boar':
        this.drawArmoredBoar(ctx, e, tick);
        break;
      case 'demon_charger':
        this.drawDemonCharger(ctx, e, tick);
        break;
      case 'bandit':
        this.drawBandit(ctx, e, tick);
        break;
      case 'cultist':
        this.drawCultist(ctx, e, tick);
        break;
      case 'zombie':
        this.drawZombie(ctx, e, tick);
        break;
      case 'spade_soldier':
        this.drawSpadeSoldier(ctx, e, tick);
        break;
      case 'hellhound':
        this.drawHellhound(ctx, e, tick);
        break;
      case 'shadow_mage':
        this.drawShadowMage(ctx, e, tick);
        break;
      case 'bone_golem':
        this.drawBoneGolem(ctx, e, tick);
        break;
      case 'lesser_devil':
        this.drawLesserDevil(ctx, e, tick);
        break;
      case 'high_devil':
        this.drawHighDevil(ctx, e, tick);
        break;

      // BOSSES
      case 'boss_mars':
        this.drawBossMars(ctx, e, tick);
        break;
      case 'boss_vetto':
        this.drawBossVetto(ctx, e, tick);
        break;
      case 'boss_patri':
        this.drawBossPatri(ctx, e, tick);
        break;
      case 'boss_zenon':
        this.drawBossZenon(ctx, e, tick);
        break;
      case 'boss_vanica':
        this.drawBossVanica(ctx, e, tick);
        break;
      case 'boss_dante':
        this.drawBossDante(ctx, e, tick);
        break;
      case 'boss_zagred':
        this.drawBossZagred(ctx, e, tick);
        break;
      case 'boss_lucifero':
        this.drawBossLucifero(ctx, e, tick);
        break;

      default:
        // Generic horned demon if unknown
        this.drawLesserDevil(ctx, e, tick);
        break;
    }

    // 3. Biểu tượng 💢 CUỒNG NỘ phía trên thanh máu mục tiêu / đầu Boss
    if (e.isBoss && e.isEnraged) {
      ctx.save();
      if (facingLeft) {
        ctx.scale(-1, 1); // Unflip so text is always readable left-to-right
      }
      const tagY = -e.radius - 24;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Badge pill background
      const badgeText = '💢 CUỒNG NỘ (PHASE 2)';
      const textW = ctx.measureText(badgeText).width + 12;
      ctx.fillStyle = 'rgba(127, 29, 29, 0.9)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(-textW / 2, tagY - 9, textW, 18, 9);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.rect(-textW / 2, tagY - 9, textW, 18);
        ctx.fill();
        ctx.stroke();
      }

      // Text with red glow
      ctx.fillStyle = '#fee2e2';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 6;
      ctx.fillText(badgeText, 0, tagY);
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    ctx.restore();
  },

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

  // =========================================================================
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
        const rainbowColor = `hsl(${hue}, 100%, 65%)`;
        const rainbowGlow = `hsla(${hue}, 100%, 65%, 0.85)`;
        this.drawAura(ctx, 0, bob, 22, rainbowGlow, 24);

        // Rotating outer sacred rings
        ctx.save();
        ctx.strokeStyle = rainbowColor;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(0, bob, 16 + Math.sin(tick * 0.25) * 2, tick * 0.1, tick * 0.1 + Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `hsl(${(hue + 180) % 360}, 100%, 75%)`;
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
    // 10. TREASURE CHEST (RƯƠNG CỔ VẬT - MAGIC SURVIVAL STYLE)
    else if (drop.type === 'chest') {
      // Shimmering Golden Sun Aura & Pulsing Light
      const glowR = 26 + Math.sin(tick * 0.25) * 4;
      this.drawAura(ctx, 0, bob, glowR, 'rgba(251, 191, 36, 0.95)', 28);

      // Rotating Runic Light Orbit
      ctx.save();
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, bob, 20 + Math.sin(tick * 0.2) * 2, tick * 0.1, tick * 0.1 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Chest Body (Rich mahogany wood)
      ctx.fillStyle = '#451a03';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(-14, bob - 5, 28, 16, 3) : ctx.rect(-14, bob - 5, 28, 16);
      ctx.fill();
      ctx.stroke();

      // Curved Chest Lid
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.moveTo(-14, bob - 5);
      ctx.bezierCurveTo(-14, bob - 16, 14, bob - 16, 14, bob - 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Golden Brackets / Metal Bands
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(-10, bob - 5, 3.5, 16);
      ctx.fillRect(6.5, bob - 5, 3.5, 16);

      // Glowing Jewel / Lock
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, bob - 1.5, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Floating Badge above chest
      ctx.font = '900 9.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.fillText('👑 TREASURE', 0, bob - 22);
      ctx.shadowBlur = 0;
    }
    // 11. ARTIFACT RELIC
    else if (drop.type === 'artifact_relic') {
      const hue = (tick * 4) % 360;
      this.drawAura(ctx, 0, bob, 24, `hsla(${hue}, 95%, 65%, 0.85)`, 28);
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏺', 0, bob);
      ctx.strokeStyle = `hsl(${(hue + 60) % 360}, 100%, 75%)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, bob, 16 + Math.sin(tick * 0.2) * 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

};

window.Sprites = new Proxy(Sprites, {
  get(target, prop) {
    if (prop in target) {
      const val = target[prop];
      return typeof val === 'function' ? val.bind(target) : val;
    }
    // Return a dummy safe no-op function so missing sprite calls never crash rendering!
    return (...args) => {};
  }
});
