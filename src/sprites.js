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
      case 'finral':
      case 'langris':
      case 'klaus':
        this.drawYuno(ctx, p, tick);
        break;
      case 'noelle':
      case 'charlotte':
      case 'secre':
      case 'dorothy':
      case 'grey':
      case 'mimosa':
        this.drawNoelle(ctx, p, tick);
        break;
      case 'yami':
      case 'nacht':
      case 'zora':
      case 'jack':
      case 'gordon':
      case 'henry':
        this.drawYami(ctx, p, tick);
        break;
      case 'luck':
      case 'magna':
      case 'rill':
      case 'sol':
        this.drawLuck(ctx, p, tick);
        break;
      case 'sylph':
        this.drawSylph(ctx, p, tick);
        break;
      case 'julius':
      case 'lumiere':
      case 'licht':
      case 'patry':
      case 'william':
      case 'fuegoleon':
      case 'mereoleona':
      case 'leopold':
      case 'mars':
      case 'charmy':
      case 'nozel':
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
    const walkBob = Math.sin(tick * 0.22) * 2.5;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // LEGS & BOOTS (Contoured anime legs with knee joints)
    ctx.fillStyle = '#18181b';
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-8, 6);
    ctx.lineTo(-3, 6);
    ctx.lineTo(-2, 16);
    ctx.lineTo(-9, 16);
    ctx.closePath();
    ctx.fill();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(2, 6);
    ctx.lineTo(7, 6);
    ctx.lineTo(8, 16);
    ctx.lineTo(1, 16);
    ctx.closePath();
    ctx.fill();

    // High combat boots with cuffs
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.moveTo(-10, 15);
    ctx.lineTo(-1, 15);
    ctx.lineTo(-1, 22);
    ctx.lineTo(-12, 22);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(9, 15);
    ctx.lineTo(10, 22);
    ctx.lineTo(-1, 22);
    ctx.closePath();
    ctx.fill();

    // Gold boot buckles
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.rect(-7, 17, 3, 2);
    ctx.rect(3, 17, 3, 2);
    ctx.fill();

    // TORSO & MUSCULAR CHEST
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

    // Broad leather belt with holster
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

    // DEMON SLAYER GREATSWORD (Slung on back / ready)
    ctx.save();
    ctx.translate(-7, 0);
    ctx.rotate(0.38);
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-4, -26);
    ctx.lineTo(4, -26);
    ctx.lineTo(3, 14);
    ctx.lineTo(-3, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Chipped runic fuller
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-1.5, -22, 3, 30);
    // Crossguard & Hilt
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(-7, 14, 14, 3);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-2, 17, 4, 9);
    ctx.restore();

    // 5-LEAF CLOVER GRIMOIRE (Floating at hip with crimson aura)
    ctx.save();
    ctx.translate(9, 2 + Math.sin(tick * 0.12) * 2);
    ctx.fillStyle = '#1c1917';
    ctx.strokeStyle = isDevil ? '#ef4444' : '#475569';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.rect(-4, -6, 9, 12);
    ctx.fill();
    ctx.stroke();
    // Glowing 5-Leaf Clover
    ctx.fillStyle = isDevil ? '#ef4444' : '#000000';
    ctx.beginPath();
    ctx.arc(0.5, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // HEAD & ANIME JAWLINE
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

    ctx.restore();
  },

  // =========================================================================
  // 2. YUNO GRINBERRYALL (Tinh Linh Ngự Phong / Spirit Zephyr)
  // =========================================================================
  drawYuno(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;
    const isZephyr = p.isSpiritMode;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // LEGS & TUNIC
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-7, 6);
    ctx.lineTo(-2, 6);
    ctx.lineTo(-1, 16);
    ctx.lineTo(-8, 16);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(1, 6);
    ctx.lineTo(6, 6);
    ctx.lineTo(7, 16);
    ctx.lineTo(0, 16);
    ctx.closePath();
    ctx.fill();

    // High Riding Boots
    ctx.fillStyle = '#382215';
    ctx.beginPath();
    ctx.rect(-9, 15, 8, 7);
    ctx.rect(0, 15, 8, 7);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-8, 15, 6, 1.5);
    ctx.fillRect(1, 15, 6, 1.5);

    // Tunic Body (High-collared royal uniform)
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

    // ZEPHYR SWORD OF WIND (Glowing Emerald Energy Blade)
    ctx.save();
    ctx.translate(9, 2);
    ctx.rotate(-0.4);
    ctx.strokeStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -26);
    ctx.stroke();
    // Inner white light core
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(0, -24);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // FAIRY SYLPH (BELL) Hovering Companion
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
    ctx.restore();

    // HEAD & SLENDER JAWLINE
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // CALM AMBER ANIME EYES
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

    // WINDSWEPT JET-BLACK ANIME HAIR
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#064e3b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-10, -15);
    ctx.lineTo(-7, -17);
    ctx.lineTo(-10, -22);
    ctx.lineTo(-4, -22);
    ctx.lineTo(-2, -26);
    ctx.lineTo(2, -24);
    ctx.lineTo(5, -26);
    ctx.lineTo(6, -21);
    ctx.lineTo(10, -20);
    ctx.lineTo(8, -14);
    ctx.lineTo(11, -11);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Emerald hair sheen
    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.moveTo(-1, -22);
    ctx.lineTo(1, -17);
    ctx.lineTo(4, -22);
    ctx.closePath();
    ctx.fill();

    // SPIRIT DIVE CROWN (If in Spirit mode)
    if (isZephyr) {
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-6, -20);
      ctx.lineTo(-8, -28);
      ctx.lineTo(-4, -24);
      ctx.lineTo(-2, -30);
      ctx.lineTo(0, -25);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  },

  // =========================================================================
  // 3. NOELLE SILVA (Hải Thần Nữ Vương / Valkyrie Dress)
  // =========================================================================
  drawNoelle(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Sea Water Mana Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(56, 189, 248, 0.45)', 24);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 15);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

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

    // High Silver Leg Armor
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.rect(-6, 8, 4, 12);
    ctx.rect(2, 8, 4, 12);
    ctx.fill();

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

    // SEA DRAGON SPIRAL WATER LANCE
    ctx.save();
    ctx.translate(10, 2);
    ctx.rotate(-0.25);
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0ea5e9';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(0, -28); // Lance tip
    ctx.lineTo(5, 6);
    ctx.lineTo(-5, 6);
    ctx.closePath();
    ctx.fill();

    // Spiral white water currents around lance
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, -12, 6, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -4, 7, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // NOELLE FACE & AMETHYST EYES
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
    ctx.bezierCurveTo(-8, -20, 8, -20, 6, -10);
    ctx.lineTo(3, -11);
    ctx.lineTo(0, -8);
    ctx.lineTo(-3, -11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Flowing Silver Pigtails (Left & Right)
    const pigtailSway = Math.sin(tick * 0.2) * 2;
    // Left pigtail
    ctx.beginPath();
    ctx.moveTo(-6, -11);
    ctx.bezierCurveTo(-14, -13, -18 + pigtailSway, -2, -14 + pigtailSway, 8);
    ctx.bezierCurveTo(-12, 4, -10, -6, -6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Right pigtail
    ctx.beginPath();
    ctx.moveTo(6, -11);
    ctx.bezierCurveTo(14, -13, 18 + pigtailSway, -2, 14 + pigtailSway, 8);
    ctx.bezierCurveTo(12, 4, 10, -6, 6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Winged Valkyrie Tiara Crest
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(-4, -15);
    ctx.lineTo(0, -18);
    ctx.lineTo(4, -15);
    ctx.lineTo(0, -13);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  },

  // =========================================================================
  // 4. YAMI SUKEHIRO (Ám Ma Pháp Đoàn Trưởng / Dark Magic Katana)
  // =========================================================================
  drawYami(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // HEAVY COMBAT BOOTS & TROUSERS
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.rect(-9, 7, 7, 10);
    ctx.rect(2, 7, 7, 10);
    ctx.fill();

    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.rect(-10, 15, 9, 7);
    ctx.rect(1, 15, 9, 7);
    ctx.fill();

    // BROAD MUSCULAR TORSO & WHITE TANK TOP
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

    // DARK MAGIC KATANA (Drawn or at hip crackling with Void Purple Aura)
    ctx.save();
    ctx.translate(10, 4);
    ctx.rotate(0.3);
    // Sheath / Drawn blade
    ctx.strokeStyle = '#09090b';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-4, 8);
    ctx.lineTo(14, -20);
    ctx.stroke();
    // Katana Tsuba (Handguard)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(0, -2, 5, 3);
    ctx.shadowBlur = 0;
    ctx.restore();

    // HEAD & RUGGED JAWLINE
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

    ctx.restore();
  },

  // =========================================================================
  // 5. LUCK VOLTIA (Lôi Ma Pháp Cuồng Chiến / Thunder Fiend)
  // =========================================================================
  drawLuck(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.24) * 2.5;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Crackling Electric Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(56, 189, 248, 0.45)', 20);

    // Ground Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 14);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // JAGGED LIGHTNING BOOTS (Thunder Fiend Boots)
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.rect(-8, 8, 5, 12);
    ctx.rect(3, 8, 5, 12);
    ctx.fill();

    // Electric sparks on boots
    ctx.strokeStyle = '#facc15';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-8, 14);
    ctx.lineTo(-12, 18);
    ctx.lineTo(-6, 20);
    ctx.moveTo(3, 14);
    ctx.lineTo(8, 17);
    ctx.lineTo(5, 21);
    ctx.stroke();

    // TUNIC & BLACK BULLS CAPELET
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.moveTo(-6, -7);
    ctx.lineTo(6, -7);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.closePath();
    ctx.fill();

    // Black Bulls mantle on shoulder
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-7, -8);
    ctx.lineTo(-13, -3);
    ctx.lineTo(-10, 8);
    ctx.lineTo(-5, 4);
    ctx.closePath();
    ctx.fill();

    // THUNDER CLAW GAUNTLETS (Lightning crackles on hands)
    ctx.strokeStyle = '#facc15';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(7, 0);
    ctx.lineTo(14, -4);
    ctx.lineTo(11, 2);
    ctx.lineTo(16, 4);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // HEAD & WIDE BATTLE-CRAZED GRIN
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Big Manic Grin with sharp teeth
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(0, -4, 3, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Bright Electric Blue Anime Eyes
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.4, 0, Math.PI * 2);
    ctx.arc(2.5, -6.5, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // WILD SPIKY GOLDEN-BLONDE HAIR (Lightning-bolt spikes)
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-12, -13);
    ctx.lineTo(-7, -16);
    ctx.lineTo(-11, -22);
    ctx.lineTo(-4, -20);
    ctx.lineTo(-2, -26);
    ctx.lineTo(1, -21);
    ctx.lineTo(4, -26);
    ctx.lineTo(5, -19);
    ctx.lineTo(11, -19);
    ctx.lineTo(7, -14);
    ctx.lineTo(11, -11);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  },

  // =========================================================================
  // 6. JULIUS NOVACHRONO (Ma Pháp Vương / Wizard King & Royal Captains)
  // =========================================================================
  drawJulius(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.2) * 1.8;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // ROTATING CHRONO STASIS TIME GLYPH RING
    ctx.save();
    ctx.rotate(tick * -0.04);
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0, -2, 24, 0, Math.PI * 2);
    ctx.stroke();
    // 4 Roman numeral ticks
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.fillStyle = '#fde047';
      ctx.fillRect(Math.cos(a) * 24 - 1.5, Math.sin(a) * 24 - 1.5, 3, 3);
    }
    ctx.restore();

    // REGAL CRIMSON & GOLD WIZARD KING MANTLE (Deep flowing velvet)
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.bezierCurveTo(-18, 4, -18, 16, -14, 22);
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

    // DIGNIFIED ANIME FACE WITH BLUE STAR MARK
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

    ctx.restore();
  },

  // =========================================================================
  // 7. ZENON ZOGRATIS (Spade Dark Triad - Spatial & Bone Magic)
  // =========================================================================
  drawZenon(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.2) * 2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // SPADE MILITARY TRENCH COAT
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(8, -8);
    ctx.lineTo(10, 20);
    ctx.lineTo(-10, 20);
    ctx.closePath();
    ctx.fill();

    // White Fluffy Fur Collar
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, -8, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // HEAD & COLD CRUEL ANIME FACE
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Cross-shaped scar over left eye
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-3, -9);
    ctx.lineTo(-3, -4);
    ctx.moveTo(-5, -6.5);
    ctx.lineTo(-1, -6.5);
    ctx.stroke();

    // Cold Crimson Slit Eyes
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(1.5, -7, 2.5, 1.5);

    // SLEEK JET-BLACK PARTED ANIME HAIR
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-9, -15);
    ctx.lineTo(-5, -20);
    ctx.lineTo(0, -21);
    ctx.lineTo(5, -20);
    ctx.lineTo(9, -15);
    ctx.lineTo(6, -10);
    ctx.closePath();
    ctx.fill();

    // FLOATING BLACK SPATIAL CUBE
    ctx.save();
    const cubeBob = Math.sin(tick * 0.2) * 4;
    ctx.translate(14, -12 + cubeBob);
    ctx.rotate(tick * 0.05);
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-5, -5, 10, 10);
    ctx.fillRect(-5, -5, 10, 10);
    ctx.restore();

    ctx.restore();
  },

  // =========================================================================
  // 8. VANICA ZOGRATIS (Huyết Ma Pháp Nữ Vương & Megicula)
  // =========================================================================
  drawVanica(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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

    // CURSED BEAST TALONS
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(7, 2);
    ctx.lineTo(14, 6);
    ctx.lineTo(12, 10);
    ctx.stroke();

    // HEAD & MANIC ANIME FACE
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Spade Eyepatch over right eye
    ctx.fillStyle = '#09090b';
    ctx.fillRect(1, -8, 4, 3.5);
    // Unhinged Crimson Left Eye
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-2.5, -6.5, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Manic Fanged Smile
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, -3.5, 2.5, 0, Math.PI);
    ctx.stroke();

    // WILD JET-BLACK TWIN TAILS & RED DEVIL CROWN
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.bezierCurveTo(-16, -14, -20, 2, -14, 10);
    ctx.bezierCurveTo(-11, 4, -9, -4, -6, -10);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(6, -10);
    ctx.bezierCurveTo(16, -14, 20, 2, 14, 10);
    ctx.bezierCurveTo(11, 4, 9, -4, 6, -10);
    ctx.closePath();
    ctx.fill();

    // Red Devil Crown
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-4, -14);
    ctx.lineTo(-6, -19);
    ctx.lineTo(-2, -16);
    ctx.lineTo(0, -20);
    ctx.lineTo(2, -16);
    ctx.lineTo(6, -19);
    ctx.lineTo(4, -14);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  },

  // =========================================================================
  // 9. DANTE ZOGRATIS (Trọng Lực Ma Vương / Gravity Singularity)
  // =========================================================================
  drawDante(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.18) * 1.8;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
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
    ctx.arc(0, 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // White fur trim
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, -7, 13, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // HEAD WITH GOAT HORN CROWN
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(-5, -11);
    ctx.lineTo(5, -11);
    ctx.lineTo(4, -6);
    ctx.lineTo(0, -2);
    ctx.lineTo(-4, -6);
    ctx.closePath();
    ctx.fill();

    // Goatee
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-2, -3);
    ctx.lineTo(2, -3);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    // Devil Horn Crown (Spade King Crown)
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-5, -13);
    ctx.lineTo(-8, -20);
    ctx.lineTo(-3, -16);
    ctx.lineTo(0, -22);
    ctx.lineTo(3, -16);
    ctx.lineTo(8, -20);
    ctx.lineTo(5, -13);
    ctx.closePath();
    ctx.fill();

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

    // Slender Fairy Legs with mint slippers
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.rect(-3.5, 8, 2.5, 9);
    ctx.rect(1, 8, 2.5, 9);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(-2.2, 17, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.ellipse(2.2, 17, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();

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

    // Slender Arms with dainty hands
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.ellipse(-6, -2, 2, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(6, -1, 2, 6, 0.4, 0, Math.PI * 2);
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
  // BESTIARY 1: BANDIT (Thích Khách Áo Choàng / Dual Daggers)
  // -------------------------------------------------------------------------
  drawBandit(ctx, e, tick) {
    const bob = Math.sin(tick * 0.25) * 1.5;

    // Ragged Cloak
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.moveTo(0, -14 + bob);
    ctx.bezierCurveTo(-12, -4, -14, 8, -10, 14);
    ctx.lineTo(8, 14);
    ctx.bezierCurveTo(12, 8, 10, -4, 0, -14 + bob);
    ctx.closePath();
    ctx.fill();

    // Hood & Mask
    ctx.fillStyle = '#3f3f46';
    ctx.beginPath();
    ctx.moveTo(-6, -12 + bob);
    ctx.bezierCurveTo(-9, -20 + bob, 9, -20 + bob, 6, -12 + bob);
    ctx.lineTo(0, -6 + bob);
    ctx.closePath();
    ctx.fill();

    // Glowing Red Assassin Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-2.5, -11 + bob, 1.2, 0, Math.PI * 2);
    ctx.arc(2.5, -11 + bob, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dual Curved Daggers
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    // Left Dagger
    ctx.beginPath();
    ctx.moveTo(-8, 2);
    ctx.lineTo(-15, -4);
    ctx.lineTo(-13, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Right Dagger
    ctx.beginPath();
    ctx.moveTo(8, 2);
    ctx.lineTo(15, -4);
    ctx.lineTo(13, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 2: CULTIST (Bạch Y Giáo Đồ Ma Nhãn / Golden Eye Mage)
  // -------------------------------------------------------------------------
  drawCultist(ctx, e, tick) {
    const bob = Math.sin(tick * 0.2) * 1.5;

    // Flowing White Occult Robe
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(0, -16 + bob);
    ctx.bezierCurveTo(-14, -6, -16, 10, -12, 16);
    ctx.lineTo(12, 16);
    ctx.bezierCurveTo(16, 10, 14, -6, 0, -16 + bob);
    ctx.closePath();
    ctx.fill();

    // Golden Eye Insignia on chest
    ctx.fillStyle = '#eab308';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -1 + bob, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.arc(0, -1 + bob, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Pointed Hood
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-6, -12 + bob);
    ctx.lineTo(0, -22 + bob);
    ctx.lineTo(6, -12 + bob);
    ctx.closePath();
    ctx.fill();

    // Crimson Occult Blood Scythe
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(6, 12);
    ctx.lineTo(15, -16);
    ctx.stroke();
    // Curved blood scythe blade
    ctx.fillStyle = '#e11d48';
    ctx.shadowColor = '#be123c';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(15, -16);
    ctx.quadraticCurveTo(28, -20, 24, -6);
    ctx.quadraticCurveTo(20, -14, 15, -12);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // -------------------------------------------------------------------------
  // BESTIARY 3: ZOMBIE (Tử Thi Ma Thuật Rades / Wraith Corpse)
  // -------------------------------------------------------------------------
  drawZombie(ctx, e, tick) {
    const bob = Math.sin(tick * 0.18) * 1.5;

    // Hunched Decaying Body
    ctx.fillStyle = '#365314';
    ctx.beginPath();
    ctx.moveTo(-8, -12 + bob);
    ctx.lineTo(8, -10 + bob);
    ctx.lineTo(10, 14);
    ctx.lineTo(-10, 14);
    ctx.closePath();
    ctx.fill();

    // Exposed Glowing Green Ribcage
    ctx.strokeStyle = '#84cc16';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-5, -2 + bob);
    ctx.lineTo(5, -2 + bob);
    ctx.moveTo(-4, 2 + bob);
    ctx.lineTo(4, 2 + bob);
    ctx.moveTo(-3, 6 + bob);
    ctx.lineTo(3, 6 + bob);
    ctx.stroke();

    // Skull & Bandages
    ctx.fillStyle = '#4d7c0f';
    ctx.beginPath();
    ctx.arc(0, -14 + bob, 7, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Toxic Eye Sockets
    ctx.fillStyle = '#a3e635';
    ctx.shadowColor = '#4ade80';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-2.5, -14 + bob, 1.5, 0, Math.PI * 2);
    ctx.arc(2.5, -14 + bob, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // -------------------------------------------------------------------------
  // BESTIARY 4: SPADE SOLDIER (Chiến Binh Spade Thiết Giáp / Horned Halberd)
  // -------------------------------------------------------------------------
  drawSpadeSoldier(ctx, e, tick) {
    const bob = Math.sin(tick * 0.22) * 1.5;

    // Heavy Dark Iron Armor
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(-8, -10 + bob);
    ctx.lineTo(8, -10 + bob);
    ctx.lineTo(10, 15);
    ctx.lineTo(-10, 15);
    ctx.closePath();
    ctx.fill();

    // Steel Spade Insignia on Chest
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(0, 0 + bob, 3, 0, Math.PI * 2);
    ctx.fill();

    // Horned Iron Helmet
    ctx.fillStyle = '#312e81';
    ctx.beginPath();
    ctx.arc(0, -13 + bob, 8, 0, Math.PI * 2);
    ctx.fill();

    // Curved Devil Horns on Helmet
    ctx.fillStyle = '#4338ca';
    ctx.beginPath();
    ctx.moveTo(-6, -17 + bob);
    ctx.lineTo(-12, -26 + bob);
    ctx.lineTo(-2, -18 + bob);
    ctx.moveTo(6, -17 + bob);
    ctx.lineTo(12, -26 + bob);
    ctx.lineTo(2, -18 + bob);
    ctx.closePath();
    ctx.fill();

    // Glowing Crimson Visor Slit
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 6;
    ctx.fillRect(-4, -14 + bob, 8, 2);
    ctx.shadowBlur = 0;

    // Spiked Halberd
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 12);
    ctx.lineTo(14, -22);
    ctx.stroke();
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(14, -22);
    ctx.lineTo(22, -18);
    ctx.lineTo(14, -14);
    ctx.closePath();
    ctx.fill();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 5: HELLHOUND (Song Đầu Địa Ngục Khuyển / Twin-Headed Beast)
  // -------------------------------------------------------------------------
  drawHellhound(ctx, e, tick) {
    const runCycle = Math.sin(tick * 0.3) * 3;

    // Muscular Hound Body
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flaming Spines on Back
    ctx.fillStyle = '#ea580c';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 8;
    for (let i = -8; i <= 8; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i - 2, -7);
      ctx.lineTo(i, -14);
      ctx.lineTo(i + 2, -7);
      ctx.closePath();
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Twin Heads (Left & Right)
    for (let h = -1; h <= 1; h += 2) {
      ctx.save();
      ctx.translate(h * 6, -6);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      // Sharp fangs
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-2, 3);
      ctx.lineTo(0, 6);
      ctx.lineTo(2, 3);
      ctx.closePath();
      ctx.fill();

      // Glowing lava eye
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(0, -1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Flaming Tail
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-12, -2);
    ctx.bezierCurveTo(-18, -6, -22, 2, -24 + runCycle, -8);
    ctx.stroke();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 6: SHADOW MAGE (Hắc Ma Đạo Sĩ Vô Gian / Void Specter)
  // -------------------------------------------------------------------------
  drawShadowMage(ctx, e, tick) {
    const floatBob = Math.sin(tick * 0.18) * 3;

    // Tattered Floating Astral Robe (Ghostly tapered swirl)
    ctx.fillStyle = '#2e1065';
    ctx.beginPath();
    ctx.moveTo(0, -16 + floatBob);
    ctx.bezierCurveTo(-14, -6, -16, 8, -6, 18 + floatBob);
    ctx.bezierCurveTo(0, 14, 6, 18, 12, 10);
    ctx.bezierCurveTo(16, 2, 14, -8, 0, -16 + floatBob);
    ctx.closePath();
    ctx.fill();

    // Hood with Deep Shadow & Skull
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, -13 + floatBob, 7, 0, Math.PI * 2);
    ctx.fill();

    // Burning Violet Eye Flames
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(-2.5, -13 + floatBob, 1.5, 0, Math.PI * 2);
    ctx.arc(2.5, -13 + floatBob, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Orbiting Black Void Orb
    ctx.save();
    const orbA = tick * 0.08;
    const ox = Math.cos(orbA) * 16;
    const oy = Math.sin(orbA) * 10 - 2;
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#c084fc';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(ox, oy, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 7: BONE GOLEM (Bạch Cốt Cự Nhân / Zenon's Bone Construct)
  // -------------------------------------------------------------------------
  drawBoneGolem(ctx, e, tick) {
    const stompBob = Math.sin(tick * 0.2) * 2;

    // Massive Ribcage Torso
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-12, -14 + stompBob);
    ctx.lineTo(12, -14 + stompBob);
    ctx.lineTo(10, 16);
    ctx.lineTo(-10, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Horned Bone Skull Head
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, -18 + stompBob, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dark Eye Sockets with Violet Light
    ctx.fillStyle = '#9333ea';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-3, -18 + stompBob, 1.5, 0, Math.PI * 2);
    ctx.arc(3, -18 + stompBob, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Colossal Curved Bone Scythe Blades
    ctx.fillStyle = '#f1f5f9';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    // Left Scythe Arm
    ctx.beginPath();
    ctx.moveTo(-10, -8);
    ctx.bezierCurveTo(-24, -4, -28, 14, -22, 24);
    ctx.lineTo(-16, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Right Scythe Arm
    ctx.beginPath();
    ctx.moveTo(10, -8);
    ctx.bezierCurveTo(24, -4, 28, 14, 22, 24);
    ctx.lineTo(16, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 8: LESSER DEVIL (Hạ Vị Ác Quỷ Minh Giới / Winged Imp)
  // -------------------------------------------------------------------------
  drawLesserDevil(ctx, e, tick) {
    const flap = Math.sin(tick * 0.25) * 4;

    // Leathery Bat Wings
    ctx.fillStyle = '#450a0a';
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(-16, -20 + flap, -24, -4, -18, 10);
    ctx.lineTo(-4, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.bezierCurveTo(16, -20 + flap, 24, -4, 18, 10);
    ctx.lineTo(4, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Imp Body
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Devil Head & Curved Horns
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.arc(0, -10, 6, 0, Math.PI * 2);
    ctx.fill();

    // Hooked Horns
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-4, -14);
    ctx.lineTo(-8, -22);
    ctx.lineTo(-2, -16);
    ctx.moveTo(4, -14);
    ctx.lineTo(8, -22);
    ctx.lineTo(2, -16);
    ctx.fill();

    // Glowing Yellow Eyes
    ctx.fillStyle = '#fde047';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-2, -10, 1.3, 0, Math.PI * 2);
    ctx.arc(2, -10, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Barbed Spade Tail
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(8, 14, 14, 8, 18, 16);
    ctx.stroke();
  },

  // -------------------------------------------------------------------------
  // BESTIARY 9: HIGH DEVIL (Thượng Vị Ác Quỷ / Four-Winged Demon)
  // -------------------------------------------------------------------------
  drawHighDevil(ctx, e, tick) {
    const flap = Math.sin(tick * 0.2) * 5;

    // FOUR SLEEK DEMON WINGS
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#dc2626';
    ctx.shadowColor = '#991b1b';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1.5;

    // Upper Wings
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.bezierCurveTo(-22, -30 + flap, -38, -12, -28, 8);
    ctx.lineTo(0, 0);
    ctx.bezierCurveTo(22, -30 + flap, 38, -12, 28, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lower Wings
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-26, 4, -32, 20, -18, 26);
    ctx.lineTo(0, 8);
    ctx.bezierCurveTo(26, 4, 32, 20, 18, 26);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Obsidian Chitin Body
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(-8, -10);
    ctx.lineTo(8, -10);
    ctx.lineTo(6, 18);
    ctx.lineTo(-6, 18);
    ctx.closePath();
    ctx.fill();

    // Crown of 4 Curved Horns
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-5, -16);
    ctx.lineTo(-12, -28);
    ctx.lineTo(-2, -18);
    ctx.moveTo(5, -16);
    ctx.lineTo(12, -28);
    ctx.lineTo(2, -18);
    ctx.fill();

    // Crimson Slit Eyes & Head
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.arc(0, -12, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-2.5, -12, 1.5, 0, Math.PI * 2);
    ctx.arc(2.5, -12, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // -------------------------------------------------------------------------
  // BESTIARY: ARMORED BOAR (Thiết Giáp Ma Thú / Berserk Iron Charger)
  // -------------------------------------------------------------------------
  drawArmoredBoar(ctx, e, tick) {
    const isCharging = e.isCharging;
    const isPre = e.isPreCharging;
    const isStunned = e.stunTimer > 0;
    const bob = isCharging ? 0 : Math.sin(tick * 0.3) * 2;
    const shake = isPre ? (Math.random() - 0.5) * 4 : 0;

    ctx.save();
    ctx.translate(shake, bob);

    // Charging after-image / speed trail
    if (isCharging) {
      ctx.fillStyle = 'rgba(234, 88, 12, 0.35)';
      ctx.beginPath();
      ctx.ellipse(-14, 0, 16, 9, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy Boar Muscular Body
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(0, 2, 17, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Steel Back Armor Plates
    ctx.fillStyle = '#44403c';
    ctx.beginPath();
    ctx.ellipse(-2, -4, 13, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iron Plates / Rivets on back
    ctx.fillStyle = '#78716c';
    [-8, -2, 4].forEach(xOff => {
      ctx.beginPath();
      ctx.arc(xOff, -7, 1.8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Spiked Mane along spine
    ctx.fillStyle = '#ea580c';
    for (let i = -10; i <= 6; i += 5) {
      ctx.beginPath();
      ctx.moveTo(i, -9);
      ctx.lineTo(i + 2, -15);
      ctx.lineTo(i + 4, -9);
      ctx.closePath();
      ctx.fill();
    }

    // Boar Head with Heavy Iron Ramming Plate
    const headY = isCharging ? 4 : (isPre ? 5 : 0);
    ctx.fillStyle = '#292524';
    ctx.beginPath();
    ctx.moveTo(6, -6 + headY);
    ctx.lineTo(19, 1 + headY);
    ctx.lineTo(16, 8 + headY);
    ctx.lineTo(6, 7 + headY);
    ctx.closePath();
    ctx.fill();

    // Heavy Ramming Plate on Snout/Forehead
    ctx.fillStyle = isCharging ? '#f97316' : '#a8a29e';
    ctx.strokeStyle = '#57534e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(11, -5 + headY);
    ctx.lineTo(21, 2 + headY);
    ctx.lineTo(17, 7 + headY);
    ctx.lineTo(10, 4 + headY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Massive Curved Tusks
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1;
    // Lower Tusk
    ctx.beginPath();
    ctx.moveTo(16, 6 + headY);
    ctx.quadraticCurveTo(24, 7 + headY, 23, -2 + headY);
    ctx.lineTo(20, 4 + headY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Crimson / Fiery Eyes
    ctx.fillStyle = isPre ? '#ef4444' : (isCharging ? '#fbbf24' : '#dc2626');
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = isPre || isCharging ? 12 : 5;
    ctx.beginPath();
    ctx.arc(12, -1 + headY, isPre || isCharging ? 2.5 : 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Steam puffs from nostrils during pre-charge
    if (isPre) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(22, 4 + headY, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.arc(25, 3 + headY, 3 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Legs / Hooves
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-10, 10, 4, 6);
    ctx.fillRect(-2, 10, 4, 6);
    ctx.fillRect(6, 10, 4, 6);

    // Stun indicator
    if (isStunned) {
      ctx.fillStyle = '#fde047';
      ctx.font = '11px sans-serif';
      ctx.fillText('💫', 0, -18);
    }

    ctx.restore();
  },

  // -------------------------------------------------------------------------
  // BESTIARY: DEMON CHARGER (Ma Ngưu Cuồng Nộ / Demonic Minotaur Charger)
  // -------------------------------------------------------------------------
  drawDemonCharger(ctx, e, tick) {
    const isCharging = e.isCharging;
    const isPre = e.isPreCharging;
    const isStunned = e.stunTimer > 0;
    const bob = isCharging ? 0 : Math.sin(tick * 0.22) * 2;
    const shake = isPre ? (Math.random() - 0.5) * 5 : 0;

    ctx.save();
    ctx.translate(shake, bob);

    // Demonic Charging Aura / Shadow Flames
    if (isCharging) {
      ctx.fillStyle = 'rgba(220, 38, 38, 0.35)';
      ctx.beginPath();
      ctx.arc(-12, 0, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    // Heavy Muscular Demonic Torso
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-12, -14);
    ctx.lineTo(12, -14);
    ctx.lineTo(14, 14);
    ctx.lineTo(-14, 14);
    ctx.closePath();
    ctx.fill();

    // Spiked Crimson Plate Armor on Torso
    ctx.fillStyle = '#881337';
    ctx.beginPath();
    ctx.moveTo(-9, -10);
    ctx.lineTo(9, -10);
    ctx.lineTo(11, 8);
    ctx.lineTo(-11, 8);
    ctx.closePath();
    ctx.fill();

    // Spiked Iron Pauldrons (Shoulder Guards)
    ctx.fillStyle = '#312e81';
    ctx.beginPath();
    ctx.arc(-14, -10, 6, 0, Math.PI * 2);
    ctx.arc(14, -10, 6, 0, Math.PI * 2);
    ctx.fill();
    // Pauldron Spikes
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(-18, -12);
    ctx.lineTo(-24, -18);
    ctx.lineTo(-14, -16);
    ctx.moveTo(18, -12);
    ctx.lineTo(24, -18);
    ctx.lineTo(14, -16);
    ctx.fill();

    // Demonic Horned Head / Minotaur Skull
    const headY = isCharging ? 6 : (isPre ? 7 : -2);
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.arc(0, -18 + headY, 9, 0, Math.PI * 2);
    ctx.fill();

    // Massive Obsidian Forward-Curving Ramming Horns
    ctx.fillStyle = isCharging ? '#ef4444' : (isPre ? '#f59e0b' : '#020617');
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;

    // Left Horn (Curving forward for ramming)
    ctx.beginPath();
    ctx.moveTo(-6, -22 + headY);
    ctx.quadraticCurveTo(-22, -30 + headY, -18, -10 + headY);
    ctx.quadraticCurveTo(-14, -18 + headY, -4, -20 + headY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Horn
    ctx.beginPath();
    ctx.moveTo(6, -22 + headY);
    ctx.quadraticCurveTo(22, -30 + headY, 18, -10 + headY);
    ctx.quadraticCurveTo(14, -18 + headY, 4, -20 + headY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Glowing Demonic Eyes
    ctx.fillStyle = isPre ? '#fde047' : '#ef4444';
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = isPre || isCharging ? 14 : 6;
    ctx.beginPath();
    ctx.arc(-3.5, -17 + headY, isPre || isCharging ? 2.8 : 1.8, 0, Math.PI * 2);
    ctx.arc(3.5, -17 + headY, isPre || isCharging ? 2.8 : 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Glowing Rune on Forehead
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.arc(0, -22 + headY, 2, 0, Math.PI * 2);
    ctx.fill();

    // Heavy Hooves / Sturdy Stance
    ctx.fillStyle = '#020617';
    ctx.fillRect(-12, 14, 8, 8);
    ctx.fillRect(4, 14, 8, 8);
    ctx.fillStyle = '#475569';
    ctx.fillRect(-12, 20, 8, 3);
    ctx.fillRect(4, 20, 8, 3);

    // Stunned stars
    if (isStunned) {
      ctx.fillStyle = '#fde047';
      ctx.font = '12px sans-serif';
      ctx.fillText('💫', -4, -32);
    }

    ctx.restore();
  },

  // =========================================================================
  // BOSS 1: MARS (Khoáng Thạch Ma Pháp Cự Thần / Diamond Colossus)
  // =========================================================================
  drawBossMars(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.15) * 4;

    // Diamond Harun Crystal Aura
    this.drawAura(ctx, 0, 0, e.radius + 14, 'rgba(56, 189, 248, 0.45)', 26);

    // Colossal Faceted Diamond Armor Torso
    ctx.fillStyle = '#0284c7';
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(22, -14);
    ctx.lineTo(16, 24);
    ctx.lineTo(-16, 24);
    ctx.lineTo(-22, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Giant Crystal Shoulder Clusters
    ctx.fillStyle = '#38bdf8';
    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      ctx.beginPath();
      ctx.moveTo(side * 18, -16);
      ctx.lineTo(side * 34, -28);
      ctx.lineTo(side * 28, -6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Glowing Crimson Seal on Brow
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, -16, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Colossal Translucent Harun Greatsword
    ctx.save();
    ctx.translate(22, 6);
    ctx.rotate(0.3);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -42);
    ctx.lineTo(10, 10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },

  // =========================================================================
  // BOSS 2: VETTO (Tuyệt Vọng Ma Thú Thần / Beast of Despair)
  // =========================================================================
  drawBossVetto(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.2) * 5;

    // Giant Despair Blood-Orange Aura
    this.drawAura(ctx, 0, 0, e.radius + 18, 'rgba(234, 88, 12, 0.5)', 30);

    // 4 GIANT MYTHICAL BEAST ARMS ERUPTING FROM BACK
    ctx.fillStyle = '#ea580c';
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 14;

    for (let i = 0; i < 4; i++) {
      const angle = -1.2 + i * 0.8;
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-15, -30, -28, -45, -18, -55 + pulse);
      ctx.lineTo(-8, -42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.shadowBlur = 0;

    // Colossal Muscled Beast Torso
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.ellipse(0, 4, 22, 26, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wild Flaming Lion Mane
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -18, 20, 0, Math.PI * 2);
    ctx.fill();

    // Giant Blazing 3rd Eye of Despair
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(0, -18, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // =========================================================================
  // BOSS 3: PATRI (Quang Ma Pháp Bạch Y Dạ Ma Nhãn / Light & Dark Elf Patri)
  // =========================================================================
  drawBossPatri(ctx, e, tick) {
    const flap = Math.sin(tick * 0.22) * 6;

    // Blinding Divine Light Aura
    this.drawAura(ctx, 0, 0, e.radius + 16, 'rgba(250, 204, 21, 0.55)', 30);

    // FOUR RADIANT WINGS OF PURE GOLDEN LIGHT
    ctx.fillStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 2;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      // Upper Wing
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(side * 30, -42 + flap, side * 55, -24, side * 44, 4);
      ctx.lineTo(side * 8, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Lower Wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(side * 36, 12, side * 46, 34, side * 28, 42);
      ctx.lineTo(side * 6, 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Pure White Flowing Elf Robe with Gold Trim
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(16, 26);
    ctx.lineTo(-16, 26);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Elegant Elf Face & Ears
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -16, 9, 0, Math.PI * 2);
    ctx.fill();

    // Red Third Eye Seal on Brow
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -18, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Ray of Divine Punishment Light Rapier
    ctx.save();
    ctx.translate(18, 4);
    ctx.rotate(-0.35);
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -40);
    ctx.lineTo(0, 12);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  },

  // =========================================================================
  // BOSS 4: ZENON 100% DEVIL (Cốt Ma Pháp Minh Vương / Bone Devil Wings)
  // =========================================================================
  drawBossZenon(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.16) * 4;

    // Spatial Void Aura
    this.drawAura(ctx, 0, 0, e.radius + 20, 'rgba(147, 51, 234, 0.55)', 32);

    // MASSIVE SKELETAL BONE WINGS (Full Halo)
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#9333ea';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      for (let s = 0; s < 4; s++) {
        const a = -0.7 + s * 0.45;
        const len = 34 + s * 8;
        ctx.save();
        ctx.rotate(side * a);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(side * len, -len * 0.5);
        ctx.lineTo(side * (len - 6), -3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.shadowBlur = 0;

    // Spade Royal Mantle
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-16, -18);
    ctx.lineTo(16, -18);
    ctx.lineTo(18, 30);
    ctx.lineTo(-18, 30);
    ctx.closePath();
    ctx.fill();

    // Pure White Spinal Bone Crown
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(-10, -22);
    ctx.lineTo(-14, -36);
    ctx.lineTo(-6, -26);
    ctx.lineTo(0, -38);
    ctx.lineTo(6, -26);
    ctx.lineTo(14, -36);
    ctx.lineTo(10, -22);
    ctx.closePath();
    ctx.fill();

    // Cold Glowing Red Devil Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.fillRect(-5, -14, 3, 2);
    ctx.fillRect(2, -14, 3, 2);
    ctx.shadowBlur = 0;

    // Orbiting Spatial Void Cubes
    for (let i = 0; i < 3; i++) {
      const ca = tick * 0.05 + (i * Math.PI * 2) / 3;
      const cx = Math.cos(ca) * 34;
      const cy = Math.sin(ca) * 22;
      ctx.fillStyle = '#09090b';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5;
      ctx.fillRect(cx - 5, cy - 5, 10, 10);
      ctx.strokeRect(cx - 5, cy - 5, 10, 10);
    }
  },

  // =========================================================================
  // BOSS 5: VANICA & MEGICULA (Nguyền Huyết Chi Ma Vương / Blood Queen)
  // =========================================================================
  drawBossVanica(ctx, e, tick) {
    const wave = Math.sin(tick * 0.22) * 6;

    // Swirling Blood Mist Aura
    this.drawAura(ctx, 0, 0, e.radius + 20, 'rgba(220, 38, 38, 0.55)', 32);

    // COLOSSAL LIQUID BLOOD WINGS
    ctx.fillStyle = '#991b1b';
    ctx.strokeStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 16;
    ctx.lineWidth = 2.5;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(side * 28, -42 + wave, side * 60, -22, side * 48, 14);
      ctx.bezierCurveTo(side * 34, 18, side * 18, 12, 0, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Gothic Corset Dress & Blood Thorns
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.moveTo(-14, -14);
    ctx.lineTo(14, -14);
    ctx.lineTo(16, 28);
    ctx.lineTo(-16, 28);
    ctx.closePath();
    ctx.fill();

    // Blood Beast Claws
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(14, 4);
    ctx.lineTo(28, 12);
    ctx.lineTo(24, 20);
    ctx.stroke();

    // Crown of Blood Thorns & Spade Horns
    ctx.fillStyle = '#b91c1c';
    ctx.beginPath();
    ctx.moveTo(-10, -22);
    ctx.lineTo(-14, -36);
    ctx.lineTo(-4, -26);
    ctx.lineTo(0, -38);
    ctx.lineTo(4, -26);
    ctx.lineTo(14, -36);
    ctx.lineTo(10, -22);
    ctx.closePath();
    ctx.fill();

    // Manic Devil Smile & Crimson Eye
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(-4, -14, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // =========================================================================
  // BOSS 6: DANTE & LUCIFERO 80% (Trọng Lực Tuyệt Đối / Black Hole Singularity)
  // =========================================================================
  drawBossDante(ctx, e, tick) {
    const pulse = Math.sin(tick * 0.18) * 5;

    // Massive Gravity Vortex Aura
    this.drawAura(ctx, 0, 0, e.radius + 24, 'rgba(15, 23, 42, 0.85)', 36);

    // SWIRLING BLACK HOLE SINGULARITY OVERHEAD
    ctx.save();
    ctx.translate(0, -42);
    ctx.rotate(tick * 0.12);
    ctx.fillStyle = '#000000';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();

    // Double Red Accretion Disks
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 26, 7, 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();

    // FOUR LEATHERY GARGOYLE WINGS
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      ctx.beginPath();
      ctx.moveTo(0, -10);
      ctx.bezierCurveTo(side * 34, -36 + pulse, side * 62, -14, side * 44, 22);
      ctx.lineTo(side * 10, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Warped 80% Devil Torso
    ctx.fillStyle = '#1c1917';
    ctx.beginPath();
    ctx.ellipse(0, 4, 22, 28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Giant Pulsating Red Eye on Chest
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(0, 6, 6 + pulse * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(0, 6, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Goat Devil Crown
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-10, -22);
    ctx.lineTo(-18, -36);
    ctx.lineTo(-4, -26);
    ctx.lineTo(0, -38);
    ctx.lineTo(4, -26);
    ctx.lineTo(18, -36);
    ctx.lineTo(10, -22);
    ctx.closePath();
    ctx.fill();
  },

  // =========================================================================
  // BOSS 7: ZAGRED (Ngôn Linh Ma Ma Vương / Kotodama Word Soul Devil)
  // =========================================================================
  drawBossZagred(ctx, e, tick) {
    const flap = Math.sin(tick * 0.18) * 6;

    // Eldritch Word Soul Purple Abyss Aura
    this.drawAura(ctx, 0, 0, e.radius + 26, 'rgba(107, 33, 168, 0.65)', 38);

    // FOUR IMMENSE BAT WINGS WITH EMBEDDED OCCULT EYES
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#c084fc';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 20;
    ctx.lineWidth = 2.5;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      // Main wing
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.bezierCurveTo(side * 42, -55 + flap, side * 76, -24, side * 58, 22);
      ctx.bezierCurveTo(side * 38, 26, side * 18, 14, 0, 6);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Embedded glowing purple eye on wing
      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.arc(side * 36, -20 + flap * 0.5, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.arc(side * 36, -20 + flap * 0.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Slender Towering Shadow Devil Body
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-16, -24);
    ctx.bezierCurveTo(-22, 6, -18, 28, -12, 38);
    ctx.lineTo(12, 38);
    ctx.bezierCurveTo(18, 28, 22, 6, 16, -24);
    ctx.closePath();
    ctx.fill();

    // Sinister Shadow Visage with Razor-Sharp Needle Teeth
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(0, -26, 15, 0, Math.PI * 2);
    ctx.fill();

    // Menacing Needle-Tooth Grin
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-10, -22);
    ctx.bezierCurveTo(-6, -16, 6, -16, 10, -22);
    ctx.bezierCurveTo(6, -19, -6, -19, -10, -22);
    ctx.closePath();
    ctx.fill();

    // Glowing Purple Slit Eyes
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(-5, -28, 2.5, 0, Math.PI * 2);
    ctx.arc(5, -28, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Three Sweeping Demonic Horns
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-8, -34);
    ctx.lineTo(-18, -52);
    ctx.lineTo(-4, -38);
    ctx.moveTo(8, -34);
    ctx.lineTo(18, -52);
    ctx.lineTo(4, -38);
    ctx.moveTo(-2, -36);
    ctx.lineTo(0, -56);
    ctx.lineTo(2, -36);
    ctx.fill();

    // FLOATING 5-LEAF GRIMOIRE OF DESPAIR & WORD SPEARS
    ctx.save();
    const gBob = Math.sin(tick * 0.16) * 4;
    ctx.translate(28, 0 + gBob);
    ctx.fillStyle = '#09090b';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.fillRect(-6, -10, 12, 20);
    ctx.strokeRect(-6, -10, 12, 20);
    // Glowing red 5-leaf clover
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  },

  // =========================================================================
  // BOSS 8: LUCIFERO (Minh Giới Tối Cao Ma Vương / Supreme Devil King)
  // =========================================================================
  drawBossLucifero(ctx, e, tick) {
    const flap = Math.sin(tick * 0.15) * 7;

    // Apocalyptic Crimson & Void Darkness Aura
    this.drawAura(ctx, 0, 0, e.radius + 32, 'rgba(153, 27, 27, 0.7)', 42);
    this.drawAura(ctx, 0, 0, e.radius + 18, 'rgba(0, 0, 0, 0.9)', 28);

    // SIX GARGANTUAN OBSIDIAN DEVIL WINGS (Spanning the Screen!)
    ctx.fillStyle = '#0a0305';
    ctx.strokeStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 24;
    ctx.lineWidth = 3;

    for (let side = -1; side <= 1; side += 2) {
      if (side === 0) continue;
      // Tier 1 Top Massive Wing
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.bezierCurveTo(side * 50, -65 + flap, side * 95, -34, side * 75, 18);
      ctx.bezierCurveTo(side * 48, 22, side * 24, 12, 0, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tier 2 Middle Wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(side * 45, -20 + flap * 0.7, side * 85, 8, side * 65, 42);
      ctx.lineTo(side * 14, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Tier 3 Bottom Wing
      ctx.beginPath();
      ctx.moveTo(0, 14);
      ctx.bezierCurveTo(side * 36, 28, side * 68, 48, side * 48, 65);
      ctx.lineTo(side * 10, 24);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Crushing Gravitational Stone Fragments under feet
    ctx.fillStyle = '#451a03';
    for (let i = 0; i < 5; i++) {
      const fa = tick * 0.04 + (i * Math.PI * 2) / 5;
      const fx = Math.cos(fa) * 38;
      const fy = 30 + Math.sin(fa) * 8;
      ctx.beginPath();
      ctx.rect(fx - 4, fy - 3, 8, 6);
      ctx.fill();
    }

    // Sovereign Imperial Obsidian Mantle
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-22, -26);
    ctx.lineTo(22, -26);
    ctx.lineTo(26, 42);
    ctx.lineTo(-26, 42);
    ctx.closePath();
    ctx.fill();

    // Crimson Imperial Fur Collar
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.ellipse(0, -24, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Quadruple Demonic Horns (Dark Imperial Crown)
    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.8;
    // Outer Horns
    ctx.beginPath();
    ctx.moveTo(-12, -34);
    ctx.bezierCurveTo(-26, -55, -34, -68, -26, -78);
    ctx.lineTo(-16, -42);
    ctx.moveTo(12, -34);
    ctx.bezierCurveTo(26, -55, 34, -68, 26, -78);
    ctx.lineTo(16, -42);
    ctx.fill();
    ctx.stroke();

    // Inner Horns
    ctx.beginPath();
    ctx.moveTo(-6, -36);
    ctx.lineTo(-10, -62);
    ctx.lineTo(-2, -42);
    ctx.moveTo(6, -36);
    ctx.lineTo(10, -62);
    ctx.lineTo(2, -42);
    ctx.fill();
    ctx.stroke();

    // Absolute Sovereign Face & Blazing Red Eyes
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(0, -28, 16, 0, Math.PI * 2);
    ctx.fill();

    // Piercing Demonic Slit Eyes
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(-6, -28, 3.5, 0, Math.PI * 2);
    ctx.arc(6, -28, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  },

  // =========================================================================
  // DROPS & REWARDS
  // =========================================================================
  drawDrop(ctx, drop, tick) {
    ctx.save();
    ctx.translate(drop.x, drop.y);

    const bob = Math.sin(tick * 0.16 + drop.x) * 3.5;

    if (drop.type === 'mana') {
      const colors = {
        1: { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.55)', r: 5.5 },
        5: { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.65)', r: 7.2 },
        20: { fill: '#c084fc', glow: 'rgba(192, 132, 252, 0.75)', r: 9.0 },
        50: { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.85)', r: 11.5 }
      };
      const tier = colors[drop.val] || (drop.val >= 50 ? colors[50] : (drop.val >= 20 ? colors[20] : (drop.val >= 5 ? colors[5] : colors[1])));
      this.drawAura(ctx, 0, bob, tier.r + 4, tier.glow, 10);
      ctx.fillStyle = tier.fill;
      // Diamond crystal shape
      ctx.beginPath();
      ctx.moveTo(0, bob - tier.r * 1.3);
      ctx.lineTo(tier.r * 0.8, bob);
      ctx.lineTo(0, bob + tier.r * 1.3);
      ctx.lineTo(-tier.r * 0.8, bob);
      ctx.closePath();
      ctx.fill();

      // White crystal facet highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.moveTo(0, bob - tier.r * 0.65);
      ctx.lineTo(tier.r * 0.4, bob);
      ctx.lineTo(0, bob + tier.r * 0.65);
      ctx.lineTo(-tier.r * 0.4, bob);
      ctx.closePath();
      ctx.fill();

      // Inner white shining core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, bob, Math.max(1.5, tier.r * 0.22), 0, Math.PI * 2);
      ctx.fill();
    } else if (drop.type === 'food') {
      this.drawAura(ctx, 0, bob, 14, 'rgba(249, 115, 22, 0.55)', 12);
      // Anime Roast Meat with Bone
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(0, bob, 10, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      // Bone ends
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.rect(-14, bob - 2, 5, 4);
      ctx.rect(9, bob - 2, 5, 4);
      ctx.fill();
    } else if (drop.type === 'chest') {
      this.drawAura(ctx, 0, bob, 22, 'rgba(234, 179, 8, 0.85)', 24);
      // Treasure Chest with Domed Lid
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-12, bob - 4, 24, 14);
      ctx.fill();
      ctx.stroke();

      // Domed curved lid
      ctx.beginPath();
      ctx.moveTo(-12, bob - 4);
      ctx.bezierCurveTo(-12, bob - 14, 12, bob - 14, 12, bob - 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Gold Lock
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, bob - 1, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    } else if (drop.type === 'artifact_relic') {
      const hue = (tick * 4) % 360;
      this.drawAura(ctx, 0, bob, 24, `hsla(${hue}, 95%, 65%, 0.85)`, 28);
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🏺', 0, bob);
      // Sacred glowing ring
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
