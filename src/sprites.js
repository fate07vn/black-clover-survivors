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
    const scale = p.isPreview ? 1.0 : (p.spriteScale || 0.74); // Compact hero size (~26% smaller for optimal battlefield view)

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

  // 1. ASTA (Tam Diệp -> Ngũ Diệp Thảo / Black Asta)
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

      // Red lightning sparks
      if (Math.random() < 0.3) {
        ctx.strokeStyle = '#f43f5e';
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sx = (Math.random() - 0.5) * 30;
        const sy = (Math.random() - 0.5) * 30;
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + (Math.random() - 0.5) * 14, sy + (Math.random() - 0.5) * 14);
        ctx.stroke();
      }

      // Large Demon Wing (Right side)
      ctx.save();
      const wingFlap = Math.sin(tick * 0.16) * 0.25;
      ctx.translate(-10, -14);
      ctx.rotate(-0.35 + wingFlap);

      // Wing feathers
      ctx.fillStyle = '#0a0305';
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-25, -45, -55, -28, -60, 5);
      ctx.bezierCurveTo(-45, 15, -30, 32, 0, 12);
      ctx.fill();

      // Red inner wing veins
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(-45, -15);
      ctx.moveTo(-20, -8);
      ctx.lineTo(-38, 8);
      ctx.stroke();
      ctx.restore();
    }

    // Dynamic ground shadow with gradient
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 16);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs / Trousers
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-8, 8, 6, 12);
    ctx.fillRect(2, 8, 6, 12);
    // Dark Boots with gold buckles
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-9, 16, 8, 6);
    ctx.fillRect(1, 16, 8, 6);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-6, 17, 3, 2);
    ctx.fillRect(4, 17, 3, 2);

    // Torso: Muscular white tank top
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-8, -4, 16, 14);
    // Shading on muscles
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-3, -2, 6, 10);

    // Black Bulls Jacket (Cropped open jacket)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-11, -5, 5, 15);
    ctx.fillRect(6, -5, 5, 15);
    // Gold trim on collar
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-11, -6, 5, 2);
    ctx.fillRect(6, -6, 5, 2);

    // Leather Belt & Grimoire Holster
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-10, 6, 20, 4);

    // 5-LEAF CLOVER GRIMOIRE (Floating at hip with crimson aura)
    ctx.save();
    ctx.translate(9, 2 + Math.sin(tick * 0.12) * 2);
    ctx.fillStyle = isDevil ? '#450a0a' : '#1c1917';
    ctx.shadowColor = isDevil ? '#ef4444' : '#71717a';
    ctx.shadowBlur = 8;
    ctx.fillRect(-4, -6, 8, 13);
    // Red 5-leaf Clover Emblem
    ctx.fillStyle = isDevil ? '#ef4444' : '#dc2626';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Muscular Tan Arms
    ctx.fillStyle = '#fed7aa';
    ctx.fillRect(-11, -3, 4, 11);
    ctx.fillRect(7, -3, 4, 11);
    // Armbands
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-11, 2, 4, 2);
    ctx.fillRect(7, 2, 4, 2);

    // Head / Face
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -13, 9.5, 0, Math.PI * 2);
    ctx.fill();

    // Eyes: Fierce expression
    if (isDevil) {
      // Glowing Red Devil Eye with light streak
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 8;
      ctx.fillRect(2, -15, 3.5, 3.5);
      // Red light trail behind eye
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(3, -13);
      ctx.lineTo(-6, -13);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#15803d'; // Determined green eye
      ctx.fillRect(2, -15, 3, 3);
    }

    // Black Bulls Headband with Bull Skull Logo
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-10, -20, 20, 6);
    ctx.fillStyle = '#fbbf24'; // Bull skull
    ctx.fillRect(-1.5, -19, 4, 4);

    // Ash Blonde / Gray Spiky Hair with Shading
    ctx.fillStyle = isDevil ? '#334155' : '#e2e8f0';
    ctx.beginPath();
    ctx.moveTo(-11, -19);
    ctx.lineTo(-16, -28);
    ctx.lineTo(-8, -23);
    ctx.lineTo(-3, -32);
    ctx.lineTo(2, -24);
    ctx.lineTo(9, -30);
    ctx.lineTo(12, -20);
    ctx.closePath();
    ctx.fill();
    // Hair Highlight
    ctx.fillStyle = isDevil ? '#64748b' : '#ffffff';
    ctx.fillRect(-5, -26, 3, 4);

    // Devil Horn (Curved obsidian horn)
    if (isDevil) {
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.moveTo(4, -22);
      ctx.quadraticCurveTo(10, -38, 17, -36);
      ctx.quadraticCurveTo(11, -28, 7, -20);
      ctx.fill();
    }

    // DEMON-SLAYER SWORD (Cự Kiếm Kháng Ma)
    ctx.save();
    const swordAngle = p.isAttacking ? (tick * 0.5) % Math.PI : -0.65;
    ctx.translate(6, 0);
    ctx.rotate(swordAngle);

    // Giant Broad Blade (Matte dark iron with battle scars)
    const bladeGrad = ctx.createLinearGradient(0, -35, 10, 0);
    bladeGrad.addColorStop(0, isDevil ? '#09090b' : '#18181b');
    bladeGrad.addColorStop(1, isDevil ? '#450a0a' : '#27272a');
    ctx.fillStyle = bladeGrad;
    ctx.fillRect(0, -32, 10, 36);

    // Pointed Tip
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(5, -42);
    ctx.lineTo(10, -32);
    ctx.closePath();
    ctx.fill();

    // Sharp Cutting Edges
    ctx.fillStyle = isDevil ? '#e11d48' : '#a1a1aa';
    ctx.fillRect(0, -32, 1.5, 36);
    ctx.fillRect(8.5, -32, 1.5, 36);

    // Crossguard & Hilt
    ctx.fillStyle = '#52525b';
    ctx.fillRect(-5, 4, 20, 4);
    ctx.fillStyle = '#78350f'; // Leather wrap hilt
    ctx.fillRect(3, 8, 4, 10);
    ctx.fillStyle = '#18181b'; // Pommel
    ctx.fillRect(2, 18, 6, 3);
    ctx.restore();

    ctx.restore();
  },

  // 2. YUNO (Phong Ma Pháp & Tinh Linh Sylph)
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

    // Golden Dawn Flowing Cape
    const capeFlutter = Math.sin(tick * 0.2) * 4;
    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.moveTo(-8, -5);
    ctx.lineTo(-16 + capeFlutter, 18);
    ctx.lineTo(4, 16);
    ctx.lineTo(6, -5);
    ctx.closePath();
    ctx.fill();
    // Gold trim
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pants & Boots
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(-7, 8, 5, 12);
    ctx.fillRect(1, 8, 5, 12);
    ctx.fillStyle = '#382215';
    ctx.fillRect(-8, 16, 6, 6);
    ctx.fillRect(0, 16, 6, 6);

    // Tunic (Navy blue with gold belt)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-7, -4, 14, 14);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-7, 5, 14, 3);

    // Head / Face
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, -13, 9, 0, Math.PI * 2);
    ctx.fill();

    // Amber Eyes
    ctx.fillStyle = '#d97706';
    ctx.fillRect(2, -15, 3, 3);

    // Messy Jet-Black Hair with Cyan Highlights
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.moveTo(-10, -15);
    ctx.lineTo(-14, -25);
    ctx.lineTo(-7, -20);
    ctx.lineTo(0, -29);
    ctx.lineTo(6, -22);
    ctx.lineTo(11, -27);
    ctx.lineTo(9, -14);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-2, -24, 2, 3);

    // 4-LEAF GOLDEN GRIMOIRE (Floating with open pages & green runes)
    const grimBob = Math.sin(tick * 0.14) * 4;
    ctx.save();
    ctx.translate(-18, -8 + grimBob);
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#34d399';
    ctx.shadowBlur = 10;
    ctx.fillRect(-5, -7, 10, 14);
    // Green 4-leaf clover
    ctx.fillStyle = '#059669';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // SYLPH (BELL - Wind Fairy)
    const bellBob = Math.cos(tick * 0.18) * 5;
    ctx.save();
    ctx.translate(18, -20 + bellBob);
    ctx.fillStyle = '#a7f3d0';
    ctx.shadowColor = '#34d399';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();
    // Translucent Fairy Wings
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    ctx.ellipse(-5, -3, 6, 2.5, -0.4, 0, Math.PI * 2);
    ctx.ellipse(-5, 4, 5, 2, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // SPIRIT OF ZEPHYR SWORD
    if (isZephyr) {
      ctx.save();
      ctx.translate(12, 2);
      ctx.rotate(0.5);
      ctx.strokeStyle = '#4ade80';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 20;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -38);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  },

  // 3. NOELLE SILVA (Thủy Long & Valkyrie Dress)
  drawNoelle(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;
    const isValkyrie = p.isValkyrie;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Swirling water aura
    this.drawAura(ctx, 0, -2, isValkyrie ? 38 : 26, isValkyrie ? 'rgba(56, 189, 248, 0.5)' : 'rgba(14, 165, 233, 0.3)', 25);

    // Orbiting Water Droplets
    for (let i = 0; i < 3; i++) {
      const a = tick * 0.08 + (i * Math.PI * 2) / 3;
      const wx = Math.cos(a) * 22;
      const wy = Math.sin(a) * 12;
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(wx, wy - 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 14);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Royal Dress / Valkyrie Armor
    if (isValkyrie) {
      // Translucent Valkyrie Wings
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(-30, -25);
      ctx.lineTo(-18, 5);
      ctx.stroke();
      // Water Lance
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(44, -12);
      ctx.stroke();
      ctx.restore();
    }

    // Silver / Royal Purple Dress
    ctx.fillStyle = isValkyrie ? '#e0f2fe' : '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-7, 2);
    ctx.lineTo(-13, 17);
    ctx.lineTo(13, 17);
    ctx.lineTo(7, 2);
    ctx.closePath();
    ctx.fill();

    // Purple Silk Ribbon
    ctx.fillStyle = '#9333ea';
    ctx.fillRect(-8, 1, 16, 3.5);

    // Head / Face
    ctx.fillStyle = '#fff1f2';
    ctx.beginPath();
    ctx.arc(0, -13, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Pink Eyes
    ctx.fillStyle = '#db2777';
    ctx.fillRect(2, -15, 3, 3);

    // Silver Twin-tails Hair with Ribbons
    ctx.fillStyle = '#e2e8f0';
    // Bangs
    ctx.beginPath();
    ctx.arc(0, -15, 9, Math.PI, 0);
    ctx.fill();

    // Twin Pigtails with physics bob
    const pBob = Math.sin(tick * 0.18) * 3;
    ctx.fillRect(-14, -16 + pBob, 5, 24);
    ctx.fillRect(9, -16 + pBob, 5, 24);
    ctx.fillStyle = '#9333ea'; // Purple ribbons
    ctx.fillRect(-13, -16 + pBob, 4, 3);
    ctx.fillRect(9, -16 + pBob, 4, 3);

    // Magic Wand
    ctx.save();
    ctx.translate(9, 2);
    ctx.rotate(0.35);
    ctx.fillStyle = '#c084fc';
    ctx.fillRect(0, -16, 3, 18);
    // Glowing water orb at tip
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#0284c7';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(1.5, -17, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },

  // 4. YAMI SUKEHIRO (Hắc Ma Pháp & Đao Katana)
  drawYami(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.2) * 2;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Dark Gravity Miasma Aura
    this.drawAura(ctx, 0, -2, 30, 'rgba(88, 28, 135, 0.45)', 25);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 20, 2, 0, 20, 18);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 20, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Brown Pants & Boots
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-9, 10, 8, 13);
    ctx.fillRect(2, 10, 8, 13);
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(-10, 18, 9, 6);
    ctx.fillRect(1, 18, 9, 6);

    // Muscular White Tank Top with Pec Shading
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(-10, -6, 20, 18);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(-4, -2, 8, 12);

    // Black Bulls Half-Cape slung over shoulder
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-11, -7);
    ctx.lineTo(-20, 18);
    ctx.lineTo(-6, 15);
    ctx.lineTo(-4, -7);
    ctx.closePath();
    ctx.fill();
    // Bull Emblem in gold
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-14, 2, 5, 5);

    // Muscular Arms
    ctx.fillStyle = '#d97706';
    ctx.fillRect(-13, -5, 5, 14);
    ctx.fillRect(9, -5, 5, 14);

    // Head, Stubble, Cigarette
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -15, 9.5, 0, Math.PI * 2);
    ctx.fill();
    // Stubble
    ctx.fillStyle = '#78716c';
    ctx.fillRect(-4, -8, 8, 3.5);
    // Fierce Eyes
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(1, -17, 3.5, 2);

    // Slicked Back Jet-Black Hair
    ctx.fillStyle = '#171717';
    ctx.beginPath();
    ctx.moveTo(-10, -16);
    ctx.lineTo(-13, -27);
    ctx.lineTo(2, -29);
    ctx.lineTo(11, -24);
    ctx.lineTo(9, -15);
    ctx.closePath();
    ctx.fill();

    // Cigarette & Smoke Puffs!
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(3, -10, 7, 2);
    ctx.fillStyle = '#ef4444'; // Glowing red tip
    ctx.fillRect(9, -10, 2, 2);
    // Smoke
    const smokeY = Math.sin(tick * 0.12) * 3;
    ctx.fillStyle = 'rgba(220, 220, 220, 0.45)';
    ctx.beginPath();
    ctx.arc(14, -14 + smokeY, 3, 0, Math.PI * 2);
    ctx.arc(18, -18 + smokeY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Dark Cloaked Katana
    ctx.save();
    ctx.translate(9, 2);
    ctx.rotate(0.4);
    ctx.fillStyle = '#7f1d1d'; // Crimson scabbard
    ctx.fillRect(0, -11, 3.5, 24);
    ctx.fillStyle = '#f59e0b'; // Gold tsuba
    ctx.fillRect(-2, -12, 8, 2.5);
    ctx.fillStyle = '#18181b'; // Hilt
    ctx.fillRect(0, -20, 3.5, 8);
    // Dark void aura around katana
    ctx.strokeStyle = '#581c87';
    ctx.shadowColor = '#9333ea';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 4;
    ctx.strokeRect(-1, -18, 6, 32);
    ctx.restore();

    ctx.restore();
  },

  // 5. LUCK VOLTIA (Lôi Ma Pháp - Cuồng Ma Tốc Độ)
  drawLuck(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.32) * 2.5;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Electric Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(234, 179, 8, 0.4)', 22);

    // Lightning forks around feet
    if (Math.random() < 0.4) {
      ctx.strokeStyle = '#60a5fa';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const lx = (Math.random() - 0.5) * 24;
      ctx.moveTo(lx, 10);
      ctx.lineTo(lx + (Math.random() - 0.5) * 10, 18);
      ctx.stroke();
    }

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 14);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Robe
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(-7, -4, 14, 15);

    // Electric Boots
    ctx.fillStyle = '#eab308';
    ctx.shadowColor = '#60a5fa';
    ctx.shadowBlur = 12;
    ctx.fillRect(-7, 10, 5, 11);
    ctx.fillRect(2, 10, 5, 11);

    // Head / Face (Cheerful crazy battle grin!)
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -13, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Blue eyes & smile
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(2, -15, 3, 3);
    ctx.strokeStyle = '#b91c1c';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(2, -10, 3.5, 0.2, Math.PI - 0.2); // grin!
    ctx.stroke();

    // Spiky Messy Blond Hair
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.moveTo(-10, -15);
    ctx.lineTo(-14, -25);
    ctx.lineTo(-6, -21);
    ctx.lineTo(0, -30);
    ctx.lineTo(7, -22);
    ctx.lineTo(12, -26);
    ctx.lineTo(9, -14);
    ctx.closePath();
    ctx.fill();

    // Sparking Electric Gauntlets on hands
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(-8, 3, 4.5, 0, Math.PI * 2);
    ctx.arc(8, 3, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // 6. JULIUS NOVACHRONO (Ma Pháp Đế - Thời Gian)
  drawJulius(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.16) * 2;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Temporal Golden Halo Aura
    this.drawAura(ctx, 0, -2, 32, 'rgba(245, 158, 11, 0.45)', 28);

    // Shadow
    const shadowGrad = ctx.createRadialGradient(0, 18, 2, 0, 18, 15);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.4)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 18, 15, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wizard King Grand Crimson & Gold Robes
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    ctx.moveTo(-8, -4);
    ctx.lineTo(-15, 19);
    ctx.lineTo(15, 19);
    ctx.lineTo(8, -4);
    ctx.closePath();
    ctx.fill();
    // Gold embroidery & Fur collar
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-2, -4, 4, 23);
    ctx.fillStyle = '#f8fafc'; // White fur collar
    ctx.fillRect(-8, -6, 16, 4);

    // Head / Face
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -13, 9, 0, Math.PI * 2);
    ctx.fill();

    // Blue eyes & Forehead Star Mark
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(2, -15, 3, 3);
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(-1.5, -20, 3.5, 3.5);

    // Neat Blond Hair
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(0, -15, 9.5, Math.PI, 0);
    ctx.fill();

    // COVERLESS ROTATING TIME GRIMOIRE (Iconic Julius feature!)
    const grimSpin = tick * 0.04;
    ctx.save();
    ctx.translate(0, -30);
    ctx.rotate(grimSpin);
    ctx.strokeStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.stroke();

    // Clock hour markings
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(Math.cos(a) * 8 - 1, Math.sin(a) * 8 - 1, 2, 2);
    }
    // Clock hands
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -7);
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 2);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  },

  // ENEMY RENDERERS (With dynamic shading & hit feedback)
  drawEnemy(ctx, e, tick) {
    const isHit = e.hitFlashTimer > 0;
    ctx.save();
    ctx.translate(e.x, e.y);

    if (e.vx < 0) {
      ctx.scale(-1, 1);
    }

    // Ground Shadow
    const shadowGrad = ctx.createRadialGradient(0, e.radius, 2, 0, e.radius, e.radius * 0.9);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
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

    switch (e.type) {
      case 'bandit':
        ctx.fillStyle = '#3f3f46';
        ctx.beginPath();
        ctx.arc(0, -2, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ef4444'; // Red eyes
        ctx.fillRect(2, -4, 2.5, 2.5);
        ctx.fillStyle = '#a1a1aa'; // Dagger
        ctx.fillRect(8, 0, 7, 2.5);
        break;

      case 'cultist':
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.moveTo(0, -17);
        ctx.lineTo(-13, 11);
        ctx.lineTo(13, 11);
        ctx.closePath();
        ctx.fill();
        // Golden Eye symbol
        ctx.fillStyle = '#eab308';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, -2, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#991b1b';
        ctx.fillRect(-1.5, -3.5, 3, 3);
        break;

      case 'zombie':
        ctx.fillStyle = '#365314';
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#84cc16';
        ctx.fillRect(-4, -4, 3, 3);
        ctx.fillRect(3, -4, 3, 3);
        ctx.strokeStyle = '#1a2e05';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-6, 4);
        ctx.lineTo(6, 4);
        ctx.stroke();
        break;

      case 'spade_soldier':
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(0, -2, 13, 0, Math.PI * 2);
        ctx.fill();
        // Demon Horns
        ctx.fillStyle = '#4338ca';
        ctx.beginPath();
        ctx.moveTo(-6, -10);
        ctx.lineTo(-11, -19);
        ctx.lineTo(-3, -11);
        ctx.moveTo(6, -10);
        ctx.lineTo(11, -19);
        ctx.lineTo(3, -11);
        ctx.fill();
        ctx.fillStyle = '#c084fc';
        ctx.fillRect(2, -4, 3, 3);
        break;

      case 'lesser_devil':
        this.drawAura(ctx, 0, 0, 20, 'rgba(185, 28, 28, 0.45)', 16);
        ctx.fillStyle = '#7f1d1d';
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        // Devil Wings
        ctx.fillStyle = '#450a0a';
        ctx.beginPath();
        ctx.moveTo(-6, -6);
        ctx.lineTo(-26, -20);
        ctx.lineTo(-15, 9);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#f87171';
        ctx.fillRect(3, -3, 3.5, 2.5);
        break;

      // BOSS 1: MARS
      case 'boss_mars':
        this.drawAura(ctx, 0, 0, 40, 'rgba(56, 189, 248, 0.6)', 30);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.lineTo(26, 0);
        ctx.lineTo(18, 28);
        ctx.lineTo(-18, 28);
        ctx.lineTo(-26, 0);
        ctx.closePath();
        ctx.fill();
        // Fire Magic Sword
        ctx.strokeStyle = '#ef4444';
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.moveTo(18, -10);
        ctx.lineTo(38, -32);
        ctx.stroke();
        break;

      // BOSS 2: VETTO
      case 'boss_vetto':
        this.drawAura(ctx, 0, 0, 48, 'rgba(239, 68, 68, 0.65)', 35);
        ctx.fillStyle = '#78350f';
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.arc(0, -6, 34, 0, Math.PI * 2);
        ctx.fill();
        // Third Eye of Despair
        ctx.fillStyle = '#dc2626';
        ctx.shadowColor = '#f87171';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(0, -17, 6, 0, Math.PI * 2);
        ctx.fill();
        break;

      // BOSS 3: PATRI
      case 'boss_patri':
        this.drawAura(ctx, 0, 0, 52, 'rgba(250, 204, 21, 0.75)', 40);
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 4.5;
        ctx.beginPath();
        ctx.arc(0, -9, 32, 0, Math.PI * 2);
        ctx.stroke();
        // Orbiting Light Swords
        for (let i = 0; i < 4; i++) {
          const ang = tick * 0.08 + (i * Math.PI) / 2;
          const sx = Math.cos(ang) * 40;
          const sy = Math.sin(ang) * 40;
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 12;
          ctx.fillRect(sx - 2.5, sy - 9, 5, 18);
        }
        break;

      // FINAL BOSS: ZAGRED (Word Soul Devil)
      case 'boss_zagred':
        this.drawAura(ctx, 0, 0, 68, 'rgba(126, 34, 206, 0.75)', 50);
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(0, 0, 38, 0, Math.PI * 2);
        ctx.fill();
        // Giant Devil Horns
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.moveTo(-18, -26);
        ctx.quadraticCurveTo(-50, -60, -28, -70);
        ctx.quadraticCurveTo(-16, -48, -9, -32);
        ctx.moveTo(18, -26);
        ctx.quadraticCurveTo(50, -60, 28, -70);
        ctx.quadraticCurveTo(16, -48, 9, -32);
        ctx.fill();
        // Red Demon Eyes
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 12;
        ctx.fillRect(-13, -11, 6, 5);
        ctx.fillRect(8, -11, 6, 5);
        ctx.fillRect(-4, -20, 9, 5);
        // Chest Mouth
        ctx.fillStyle = '#831843';
        ctx.beginPath();
        ctx.ellipse(0, 13, 18, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Sharp White Fangs
        ctx.fillStyle = '#ffffff';
        for (let fx = -14; fx <= 14; fx += 7) {
          ctx.fillRect(fx, 10, 2.5, 7);
        }
        break;
    }

    ctx.restore();
  },

  // DROP ITEMS (Mana Crystals, Grimoire Pages, Charmy Food, Chests)
  drawDrop(ctx, drop, tick) {
    ctx.save();
    ctx.translate(drop.x, drop.y);

    const bob = Math.sin(tick * 0.16 + drop.x) * 3.5;

    if (drop.type === 'mana') {
      const colors = {
        1: { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.45)', r: 3.2 },
        5: { fill: '#34d399', glow: 'rgba(52, 211, 153, 0.55)', r: 4.2 },
        20: { fill: '#c084fc', glow: 'rgba(192, 132, 252, 0.65)', r: 5.5 },
        50: { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.75)', r: 7.0 }
      };
      const tier = colors[drop.val] || (drop.val >= 50 ? colors[50] : (drop.val >= 20 ? colors[20] : (drop.val >= 5 ? colors[5] : colors[1])));
      this.drawAura(ctx, 0, bob, tier.r + 2, tier.glow, 8);
      ctx.fillStyle = tier.fill;
      // Diamond crystal shape (tinh thể mana nhỏ gọn, sắc sảo)
      ctx.beginPath();
      ctx.moveTo(0, bob - tier.r * 1.25);
      ctx.lineTo(tier.r * 0.75, bob);
      ctx.lineTo(0, bob + tier.r * 1.25);
      ctx.lineTo(-tier.r * 0.75, bob);
      ctx.closePath();
      ctx.fill();

      // Highlight điểm sáng trắng ở tâm
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.moveTo(0, bob - tier.r * 0.6);
      ctx.lineTo(tier.r * 0.35, bob);
      ctx.lineTo(0, bob + tier.r * 0.6);
      ctx.lineTo(-tier.r * 0.35, bob);
      ctx.closePath();
      ctx.fill();
    } else if (drop.type === 'food') {
      this.drawAura(ctx, 0, bob, 14, 'rgba(249, 115, 22, 0.55)', 12);
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(0, bob, 9, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(-12, bob - 2, 5, 4);
      ctx.fillRect(8, bob - 2, 5, 4);
    } else if (drop.type === 'chest') {
      this.drawAura(ctx, 0, bob, 20, 'rgba(234, 179, 8, 0.85)', 22);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-11, bob - 8, 22, 16);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.strokeRect(-11, bob - 8, 22, 16);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-3.5, bob - 3.5, 7, 7);
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
  },

  // 7. ZENON ZOGRATIS (Spade Dark Triad - Spatial & Bone Magic)
  drawZenon(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.2) * 2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Spatial Black Void Aura
    this.drawAura(ctx, 0, -4, 30, 'rgba(147, 51, 234, 0.4)', 20);
    this.drawAura(ctx, 0, -4, 20, 'rgba(15, 23, 42, 0.85)', 15);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bone Spikes hovering on back
    ctx.strokeStyle = '#f1f5f9';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-10, -6);
    ctx.lineTo(-24, -22);
    ctx.moveTo(-6, -2);
    ctx.lineTo(-20, -10);
    ctx.moveTo(-8, 6);
    ctx.lineTo(-22, 16);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dark Spade Overcoat
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-10, -6, 20, 22);
    // Dark trousers & boots
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-8, 12, 6, 8);
    ctx.fillRect(2, 12, 6, 8);

    // White Fluffy Fur Collar
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(0, -7, 13, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, -16, 8.5, 0, Math.PI * 2);
    ctx.fill();
    // Dark messy hair
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(0, -18, 9, Math.PI, Math.PI * 2);
    ctx.fill();
    // Cold glowing purple eye
    ctx.fillStyle = '#c084fc';
    ctx.shadowColor = '#a855f7';
    ctx.shadowBlur = 6;
    ctx.fillRect(2, -17, 3, 2.5);
    ctx.shadowBlur = 0;

    ctx.restore();
  },

  // 8. VANICA ZOGRATIS (Spade Dark Triad - Blood & Megicula Curse)
  drawVanica(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.24) * 2.5;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Megicula Blood & Curse Aura
    this.drawAura(ctx, 0, -2, 28, 'rgba(220, 38, 38, 0.45)', 22);
    this.drawAura(ctx, 0, -2, 18, 'rgba(69, 10, 10, 0.75)', 15);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Demonic Blood Wing (Flapping)
    ctx.save();
    const wingFlap = Math.sin(tick * 0.2) * 0.28;
    ctx.translate(-8, -10);
    ctx.rotate(-0.3 + wingFlap);
    ctx.fillStyle = '#7f1d1d';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-20, -32, -42, -18, -46, 8);
    ctx.bezierCurveTo(-34, 16, -18, 22, 0, 8);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    // Gothic Spade Outfit
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-8, -4, 16, 20);
    // Crimson Corset & details
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-6, -2, 12, 10);
    // Dark boots
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-7, 14, 5, 6);
    ctx.fillRect(2, 14, 5, 6);

    // Head & Face
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, -15, 8.5, 0, Math.PI * 2);
    ctx.fill();

    // Black Bob Hair
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.arc(0, -17, 9.5, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-9, -17, 3, 10);
    ctx.fillRect(6, -17, 3, 10);

    // Eyepatch on right eye
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-4, -17, 4, 4);
    // Sadistic glowing red left eye
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 8;
    ctx.fillRect(2, -16, 3, 3);
    ctx.shadowBlur = 0;

    ctx.restore();
  },

  // 9. DANTE ZOGRATIS (Spade Dark Triad - Gravity & Lucifero)
  drawDante(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.18) * 1.8;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Heavy Gravity Crushing Pulse
    this.drawAura(ctx, 0, 0, 32, 'rgba(69, 10, 10, 0.5)', 25);
    this.drawAura(ctx, 0, 0, 20, 'rgba(0, 0, 0, 0.8)', 15);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Lucifero Devil Horns
    ctx.fillStyle = '#09090b';
    ctx.beginPath();
    ctx.moveTo(-5, -23);
    ctx.lineTo(-12, -35);
    ctx.lineTo(-2, -25);
    ctx.moveTo(5, -23);
    ctx.lineTo(12, -35);
    ctx.lineTo(2, -25);
    ctx.fill();

    // Regal Spade Coat with Green Jewel
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-11, -6, 22, 24);
    ctx.fillStyle = '#10b981';
    ctx.shadowColor = '#34d399';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dark boots
    ctx.fillStyle = '#09090b';
    ctx.fillRect(-9, 14, 7, 8);
    ctx.fillRect(2, 14, 7, 8);

    // Head & Slicked Back Dark Hair
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, -16, 9.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.arc(0, -18, 10, Math.PI, Math.PI * 2);
    ctx.fill();

    // Small King Crown
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-5, -26, 10, 4);

    // Red Smug Eye
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(2, -17, 3, 2.5);

    ctx.restore();
  },

  // 10. FANA (Elf Apostle - Fire Phoenix)
  drawFana(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Blazing Phoenix Halo
    this.drawAura(ctx, 0, -4, 30, 'rgba(249, 115, 22, 0.45)', 24);
    this.drawAura(ctx, 0, -4, 18, 'rgba(251, 191, 36, 0.65)', 15);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 13, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Flaming Phoenix Wings (Dual wings)
    const flap = Math.sin(tick * 0.25) * 4;
    ctx.fillStyle = '#f97316';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(-26, -22 + flap);
    ctx.lineTo(-16, 0);
    ctx.moveTo(8, -8);
    ctx.lineTo(26, -22 + flap);
    ctx.lineTo(16, 0);
    ctx.fill();
    ctx.shadowBlur = 0;

    // White & Gold Elf Tunic
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-8, -4, 16, 20);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8, 10, 16, 4);

    // Pinkish-Red Elf Hair
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(0, -16, 10, 0, Math.PI * 2);
    ctx.fill();

    // Face
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(0, -14, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Elf 3rd Eye on Forehead
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(0, -19, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
  },

  // 11. RHYA (Elf Apostle - Copy Magic)
  drawRhya(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.16) * 1.5;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Multi-elemental aura
    this.drawAura(ctx, 0, -2, 26, 'rgba(56, 189, 248, 0.35)', 18);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(0, 16, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Orbiting elemental orbs
    const colors = ['#f97316', '#06b6d4', '#22c55e', '#eab308'];
    for (let i = 0; i < 4; i++) {
      const orbAngle = tick * 0.12 + (Math.PI * 2 / 4) * i;
      const ox = Math.cos(orbAngle) * 22;
      const oy = Math.sin(orbAngle) * 10 - 6;
      ctx.fillStyle = colors[i];
      ctx.shadowColor = colors[i];
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Loose White Elf Robe
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(-9, -4, 18, 22);

    // Dark messy hair
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(0, -16, 9.5, 0, Math.PI * 2);
    ctx.fill();

    // Face
    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(0, -14, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Glowing Elf 3rd Eye on Forehead
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, -19, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  },

  // 12. VETTO (Elf Apostle - Mythic Despair Beast)
  drawVetto(ctx, p, tick) {
    const facing = p.facing || 1;
    const walkBob = Math.sin(tick * 0.22) * 2.2;
    ctx.save();
    ctx.translate(p.x, p.y + walkBob);
    ctx.scale(facing, 1);

    // Savage Beast Aura
    this.drawAura(ctx, 0, -2, 34, 'rgba(234, 88, 12, 0.45)', 26);

    // Ground Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 16, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Muscular Broad Body
    ctx.fillStyle = '#78350f'; // Fur pelt
    ctx.fillRect(-12, -6, 24, 24);
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-8, -2, 16, 12);

    // Wild Beast Mane Hair
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.arc(0, -17, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#451a03';
    ctx.beginPath();
    ctx.arc(0, -19, 12, Math.PI, Math.PI * 2);
    ctx.fill();

    // Face & Sharp Fangs
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, -14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(-3, -11, 2, 3);
    ctx.fillRect(1, -11, 2, 3);

    // Glowing Red 3rd Eye
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, -19, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

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
