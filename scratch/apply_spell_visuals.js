const fs = require('fs');
const path = require('path');

const spellsPath = path.join(__dirname, '..', 'src', 'spells.js');
let code = fs.readFileSync(spellsPath, 'utf8');

// 1. New drawAoEZones
const newAoEZones = `  drawAoEZones(ctx, tick) {
    for (const zone of this.aoeZones) {
      const alpha = Math.max(0, Math.min(1, zone.life / (zone.maxLife || 1)));
      const r = zone.radius;
      const color = zone.color || '#38bdf8';

      ctx.save();
      ctx.translate(zone.x, zone.y);

      // A. Ground Mana Floor Gradient Fill with Pulsing Core
      ctx.globalAlpha = alpha * 0.28;
      const floorGrad = ctx.createRadialGradient(0, 0, r * 0.15, 0, 0, r);
      floorGrad.addColorStop(0, '#ffffff');
      floorGrad.addColorStop(0.3, color);
      floorGrad.addColorStop(0.85, color);
      floorGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // B. Outer Rotating Grand Occult Runic Seal
      ctx.save();
      ctx.rotate(tick * 0.04);
      ctx.globalAlpha = alpha * 0.85;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // 12 Outer Runic Marks & Clover Insignias
      ctx.lineWidth = 1.4;
      const ticksCount = 12;
      for (let i = 0; i < ticksCount; i++) {
        const a = (i * Math.PI * 2) / ticksCount;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cos * (r - 7), sin * (r - 7));
        ctx.lineTo(cos * (r + 5), sin * (r + 5));
        ctx.stroke();

        // Clover runic dots on ticks
        ctx.fillStyle = (i % 3 === 0) ? '#ffffff' : color;
        ctx.beginPath();
        ctx.arc(cos * (r - 12), sin * (r - 12), (i % 3 === 0 ? 2.5 : 1.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // C. Inscribed Counter-Rotating Geometric Octagram Star
      ctx.save();
      ctx.rotate(-tick * 0.05);
      ctx.globalAlpha = alpha * 0.9;
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.6;

      const starPoints = 8;
      const outerR = r * 0.76;
      const innerR = r * 0.40;
      ctx.beginPath();
      for (let i = 0; i < starPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / starPoints;
        const px = Math.cos(a) * radius;
        const py = Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Cardinal Clover Nodes at North, South, East, West
      ctx.fillStyle = color;
      for (let c = 0; c < 4; c++) {
        const ca = (c * Math.PI) / 2;
        ctx.beginPath();
        ctx.arc(Math.cos(ca) * outerR, Math.sin(ca) * outerR, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Inner Concentric Glyph Ring
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.46, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // D. Elemental Centerpieces for Special AoE Spells
      if (zone.isShadowClaw) {
        // Nacht's Shadow Claws slashing through circle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#c084fc';
        ctx.shadowColor = '#9333ea';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2.2;
        for (let c = -1; c <= 1; c++) {
          ctx.save();
          ctx.translate(c * 15, 0);
          ctx.rotate(-0.35 + c * 0.22);
          ctx.beginPath();
          ctx.moveTo(-5, 24);
          ctx.bezierCurveTo(-10, -4, 0, -32, 7, -38);
          ctx.bezierCurveTo(2, -20, 0, 4, 5, 24);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        ctx.shadowBlur = 0;
      } else if (zone.isGiantSword) {
        // Licht's Giant Celestial Origin Greatsword plunging into ground
        ctx.globalAlpha = alpha;
        ctx.save();
        const dropProgress = Math.min(1, (zone.maxLife - zone.life) * 5);
        ctx.translate(0, -65 * (1 - dropProgress));
        // Golden Greatsword Blade
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#fbbf24';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 16;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(0, 38);
        ctx.lineTo(13, -48);
        ctx.lineTo(-13, -48);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Crossguard & Pommel
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-24, -52, 48, 8);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, -60, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }

      ctx.restore();
    }
  }`;

// 2. New drawShockwaves
const newShockwaves = `  drawShockwaves(ctx, tick) {
    for (const sw of this.shockwaves) {
      const alpha = Math.max(0, sw.life / sw.maxLife);
      const r = sw.radius;
      const color = sw.color || '#f59e0b';

      ctx.save();
      ctx.translate(sw.x, sw.y);

      // Outer Soft Wave Ring with Intense Neon Glow
      ctx.globalAlpha = alpha * 0.55;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.lineWidth = 8 * alpha;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // Sharp Core Brilliant Ring
      ctx.globalAlpha = alpha * 0.98;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.0 * alpha;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.97, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 8 Radiating Anime Burst Spikes
      ctx.globalAlpha = alpha * 0.85;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.4 * alpha;
      const burstLen = 16 * alpha;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI * 2) / 8 + sw.life * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cos * (r - burstLen), sin * (r - burstLen));
        ctx.lineTo(cos * (r + burstLen), sin * (r + burstLen));
        ctx.stroke();

        // Tip diamond spark
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cos * (r + burstLen), sin * (r + burstLen), 1.8 * alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }`;

// 3. New drawProjectiles
const newProjectiles = `  drawProjectiles(ctx, tick) {
    for (const proj of this.projectiles) {
      const r = proj.radius || 12;
      const angle = (proj.vx || proj.vy) ? Math.atan2(proj.vy, proj.vx) : (proj.angle || 0);

      ctx.save();
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);

      // Trailing Light Glow (Đuôi vệt sáng năng lượng rực rỡ có hạt wisp)
      const speed = Math.hypot(proj.vx, proj.vy);
      const trailLen = Math.min(42, speed * 0.075);
      if (trailLen > 4) {
        ctx.save();
        const trailColor = proj.color || '#38bdf8';
        const trailGrad = ctx.createLinearGradient(-trailLen, 0, 0, 0);
        trailGrad.addColorStop(0, 'rgba(255,255,255,0)');
        trailGrad.addColorStop(0.65, trailColor);
        trailGrad.addColorStop(1, '#ffffff');
        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(-trailLen, 0);
        ctx.lineTo(0, r * 0.7);
        ctx.closePath();
        ctx.fill();

        // 2 rippling side energy wisps
        const wispOffset = Math.sin(tick * 8) * (r * 0.35);
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.5);
        ctx.quadraticCurveTo(-trailLen * 0.5, -r * 0.8 + wispOffset, -trailLen * 0.8, 0);
        ctx.moveTo(0, r * 0.5);
        ctx.quadraticCurveTo(-trailLen * 0.5, r * 0.8 - wispOffset, -trailLen * 0.8, 0);
        ctx.stroke();
        ctx.restore();
      }

      switch (proj.type) {
        // SPIRIT BOLT (Tiễn Tinh Linh & Phi Kiếm Ngự Kiếm - Magic Survival Spirit & Telekinetic Sword)
        case 'sylph_spirit_bolt': {
          const isSuper = proj.isSuperEvo;
          const isFamiliar = proj.isFamiliar;
          const isMissile = proj.isMissile;

          // Pure Magic Survival Spirit Missile (Ethereal light comet with chalky wisp texture)
          const coreR = r * 0.65;
          const boltColor = proj.color || (isFamiliar ? '#f472b6' : (isMissile ? '#38bdf8' : '#34d399'));

          // Ethereal Outer Glow
          const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 1.8);
          glowGrad.addColorStop(0, '#ffffff');
          glowGrad.addColorStop(0.45, boltColor);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.8, 0, Math.PI * 2);
          ctx.fill();

          // Rough chalk / brush stroke spirit nucleus
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(0, 0, coreR, 0, Math.PI * 2);
          ctx.stroke();

          // Trailing spiritual brush fibers
          ctx.strokeStyle = boltColor;
          ctx.lineWidth = 1.6;
          for (let f = 0; f < 5; f++) {
            const fAngle = Math.PI + (f - 2) * 0.38;
            ctx.beginPath();
            ctx.moveTo(Math.cos(fAngle) * coreR, Math.sin(fAngle) * coreR);
            ctx.lineTo(Math.cos(fAngle) * (r * 1.5), Math.sin(fAngle) * (r * 1.5));
            ctx.stroke();
          }
          ctx.restore();

          // Brilliant White Spark Center with 4-Point Micro Star
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.15, 0, coreR * 0.55, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(r * 0.15 - 4, 0);
          ctx.lineTo(r * 0.15 + 4, 0);
          ctx.moveTo(r * 0.15, -4);
          ctx.lineTo(r * 0.15, 4);
          ctx.stroke();
          break;
        }

        // A. WIND SCYTHE (Lưỡi Dao Gió Cực Sắc Yuno)
        case 'wind_scythe': {
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 14;

          // Outer aerodynamic wind envelope
          ctx.fillStyle = '#10b981';
          ctx.strokeStyle = '#34d399';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0); // Front sharp tip
          ctx.bezierCurveTo(r * 0.6, -r * 1.4, -r * 0.8, -r * 1.1, -r * 1.1, -r * 0.4);
          ctx.bezierCurveTo(-r * 0.3, 0, -r * 0.3, 0, -r * 1.1, r * 0.4);
          ctx.bezierCurveTo(-r * 0.8, r * 1.1, r * 0.6, r * 1.4, r * 1.8, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Lõi phát quang trắng sắc lẹm (Ultra-fine cutting core)
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(r * 1.6, 0);
          ctx.bezierCurveTo(r * 0.4, -r * 0.8, -r * 0.4, -r * 0.6, -r * 0.6, 0);
          ctx.bezierCurveTo(-r * 0.4, r * 0.6, r * 0.4, r * 0.8, r * 1.6, 0);
          ctx.stroke();

          // 2 Spiral trailing wind vortices
          ctx.strokeStyle = '#a7f3d0';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(-r * 0.4, -r * 0.6, 4, 0, Math.PI * 1.5);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(-r * 0.4, r * 0.6, 4, -Math.PI * 0.5, Math.PI);
          ctx.stroke();
          ctx.shadowBlur = 0;
          break;
        }

        // B. SEA DRAGON (Thủy Long Gầm Rú Noelle - Majestic Water Dragon)
        case 'sea_dragon': {
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 14;

          // Dynamic Dragon Head with Water Crest
          ctx.fillStyle = '#0284c7';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0); // Snout
          ctx.lineTo(r * 1.1, -r * 0.7); // Brow
          ctx.lineTo(r * 0.3, -r * 1.2); // Horn tip
          ctx.lineTo(-r * 0.2, -r * 0.7);
          ctx.lineTo(-r * 1.4, -r * 0.6); // Water mane
          ctx.lineTo(-r * 0.6, 0);
          ctx.lineTo(-r * 1.4, r * 0.6);
          ctx.lineTo(-r * 0.2, r * 0.7);
          ctx.lineTo(r * 0.3, r * 1.2); // Lower horn
          ctx.lineTo(r * 1.1, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Water scales & inner snout
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(r * 1.4, 0);
          ctx.lineTo(r * 0.7, -r * 0.4);
          ctx.lineTo(0, 0);
          ctx.lineTo(r * 0.7, r * 0.4);
          ctx.closePath();
          ctx.fill();

          // White sharp water fangs
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.moveTo(r * 1.2, -2);
          ctx.lineTo(r * 1.5, 0);
          ctx.lineTo(r * 1.2, 2);
          ctx.fill();

          // Glowing Dragon Eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.6, -r * 0.35, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0369a1';
          ctx.beginPath();
          ctx.arc(r * 0.7, -r * 0.35, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // C. VALKYRIE LANCE (Thương Xoáy Nước Áp Lực Valkyrie)
        case 'valkyrie_lance': {
          ctx.shadowColor = '#0ea5e9';
          ctx.shadowBlur = 14;

          // Piercing Crystalline Spearhead
          ctx.fillStyle = '#0284c7';
          ctx.strokeStyle = '#e0f2fe';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(r * 2.3, 0); // Tip
          ctx.lineTo(-r * 0.8, -r * 0.75);
          ctx.lineTo(-r * 0.4, 0);
          ctx.lineTo(-r * 0.8, r * 0.75);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Inner facet reflection
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(r * 2.1, 0);
          ctx.lineTo(-r * 0.5, -r * 0.4);
          ctx.lineTo(-r * 0.2, 0);
          ctx.closePath();
          ctx.fill();

          // 2 Helical Water Vortex Rings rotating around shaft
          const spinA = tick * 6;
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.ellipse(r * 0.2, 0, r * 0.5, r * 1.1, spinA, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.ellipse(-r * 0.5, 0, r * 0.45, r * 0.9, -spinA, 0, Math.PI * 2);
          ctx.stroke();

          // Diamond sparkle at tip
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 2.2, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // D. FIRE FIST / CALIDOS BRACHIUM (Hỏa Sư Quyền Mereoleona)
        case 'fire_fist': {
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 16;

          // Blazing Lion Claw Plasma Aura
          ctx.fillStyle = '#dc2626';
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0); // Center claw
          ctx.bezierCurveTo(r * 1.1, -r * 1.3, -r * 0.4, -r * 1.2, -r * 1.3, -r * 0.6);
          ctx.bezierCurveTo(-r * 0.7, 0, -r * 0.7, 0, -r * 1.3, r * 0.6);
          ctx.bezierCurveTo(-r * 0.4, r * 1.2, r * 1.1, r * 1.3, r * 1.8, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Molten Golden Core
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(r * 1.4, 0);
          ctx.lineTo(r * 0.4, -r * 0.7);
          ctx.lineTo(-r * 0.6, 0);
          ctx.lineTo(r * 0.4, r * 0.7);
          ctx.closePath();
          ctx.fill();

          // White-hot Solar Core
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(r * 0.3, 0, r * 0.45, 0, Math.PI * 2);
          ctx.fill();

          // Fiery claw sparks
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 1.6, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // E. FIREBALL (Hỏa Cầu Bóng Chày Magna - Volcanic Magma Meteor)
        case 'fireball': {
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 14;

          // Volcanic Outer Mantle
          ctx.fillStyle = '#7f1d1d';
          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Molten Lava Fissures
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(r * 0.15, 0, r * 0.5, 0, Math.PI * 2);
          ctx.fill();

          // Curved baseball flame stitch with glowing white seam
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(-r * 0.25, 0, r * 0.75, -Math.PI / 2.5, Math.PI / 2.5);
          ctx.stroke();
          ctx.shadowBlur = 0;
          break;
        }

        // F. LIGHT SWORD (Gươm Quang Ma Pháp Patri - Holy Divine Light Rapier)
        case 'light_sword': {
          ctx.shadowColor = '#fde047';
          ctx.shadowBlur = 16;

          // Blinding White Beam Blade
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(r * 2.4, 0); // Tip
          ctx.lineTo(-r * 1.0, -r * 0.45);
          ctx.lineTo(-r * 0.7, 0);
          ctx.lineTo(-r * 1.0, r * 0.45);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Golden Crossguard Halo Star
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(-r * 0.7, 0, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // 4-Point Holy Starburst at the hilt
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-r * 0.7 - 7, 0);
          ctx.lineTo(-r * 0.7 + 7, 0);
          ctx.moveTo(-r * 0.7, -7);
          ctx.lineTo(-r * 0.7, 7);
          ctx.stroke();

          // Diamond spark at tip
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 2.3, 0, 2.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // G. ORIGIN SWORD (Chân Kiếm Khai Nguyên Licht - Ancient Elf True Sword)
        case 'origin_sword': {
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 14;

          // Broad True Sword Blade
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(r * 2.2, 0);
          ctx.lineTo(-r * 0.8, -r * 0.55);
          ctx.lineTo(-r * 1.3, 0);
          ctx.lineTo(-r * 0.8, r * 0.55);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Gold Runic Fuller Line with Etched Runes
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(r * 1.4, 0);
          ctx.lineTo(-r * 0.6, 0);
          ctx.stroke();

          // Ancient runic nodes
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(r * 0.6, 0, 2.2, 0, Math.PI * 2);
          ctx.arc(-r * 0.1, 0, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // H. SHADOW WOLF (Á Ma Canis Nacht - Demonic Shadow Wolf)
        case 'shadow_wolf': {
          ctx.shadowColor = '#9333ea';
          ctx.shadowBlur = 16;

          // Shadow Wolf Head & Smoky Mane
          ctx.fillStyle = '#09090b';
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(r * 1.7, 0); // Snout
          ctx.lineTo(r * 0.8, -r * 0.7);
          ctx.lineTo(0, -r * 1.25); // Sharp demon ear
          ctx.lineTo(-r * 0.8, -r * 0.7);
          ctx.lineTo(-r * 1.3, -r * 0.3); // Mane plume
          ctx.lineTo(-r * 0.5, 0);
          ctx.lineTo(-r * 1.3, r * 0.3);
          ctx.lineTo(-r * 0.8, r * 0.7);
          ctx.lineTo(0, r * 1.25); // Lower ear
          ctx.lineTo(r * 0.8, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Menacing Glowing Amethyst Eyes
          ctx.fillStyle = '#c084fc';
          ctx.beginPath();
          ctx.ellipse(r * 0.5, -r * 0.35, 2.5, 1.4, 0.3, 0, Math.PI * 2);
          ctx.ellipse(r * 0.5, r * 0.35, 2.5, 1.4, -0.3, 0, Math.PI * 2);
          ctx.fill();

          // White demon pupils
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.6, -r * 0.35, 1, 0, Math.PI * 2);
          ctx.arc(r * 0.6, r * 0.35, 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // I. SPATIAL BONE JAVELIN (Cốt Ma Thương Zenon)
        case 'spatial_bone': {
          ctx.shadowColor = '#9333ea';
          ctx.shadowBlur = 14;

          // Demonic Bone Spearhead
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(r * 2.4, 0);
          ctx.lineTo(-r * 1.2, -r * 0.45);
          ctx.lineTo(-r * 0.8, 0);
          ctx.lineTo(-r * 1.2, r * 0.45);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // 2 Orbiting 3D Spatial Void Cubes
          const cubeA = tick * 5;
          ctx.save();
          ctx.translate(-r * 0.2, Math.sin(cubeA) * 6);
          ctx.rotate(cubeA);
          ctx.fillStyle = '#09090b';
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 1.4;
          ctx.fillRect(-4, -4, 8, 8);
          ctx.strokeRect(-4, -4, 8, 8);
          ctx.restore();
          ctx.shadowBlur = 0;
          break;
        }

        // J. BLOOD BEAST (Huyết Ma Thú Vanica & Megicula)
        case 'blood_beast': {
          ctx.shadowColor = '#dc2626';
          ctx.shadowBlur = 16;

          // Cursed Blood Dragon Head
          ctx.fillStyle = '#881337';
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0);
          ctx.lineTo(r * 0.6, -r * 0.9);
          ctx.lineTo(-r * 0.8, -r * 0.6);
          ctx.lineTo(-r * 0.3, 0);
          ctx.lineTo(-r * 0.8, r * 0.6);
          ctx.lineTo(r * 0.6, r * 0.9);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Viscous dripping crimson core
          ctx.fillStyle = '#f43f5e';
          ctx.beginPath();
          ctx.arc(r * 0.5, 0, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.6, -1, 1.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // K. PHOENIX FEATHER (Hỏa Điểu Vũ Fuegoleon)
        case 'phoenix_feather': {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 16;

          // Burning Phoenix Wing Feather
          ctx.fillStyle = '#ea580c';
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(r * 2.0, 0);
          ctx.bezierCurveTo(r * 0.6, -r * 1.0, -r * 0.8, -r * 0.7, -r * 1.3, 0);
          ctx.bezierCurveTo(-r * 0.8, r * 0.7, r * 0.6, r * 1.0, r * 2.0, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Golden quill spine
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0);
          ctx.lineTo(-r * 1.1, 0);
          ctx.stroke();

          // Molten flame vanes
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(r * 0.4, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // L. STEEL DRILL (Cương Thiết Khoan Klaus)
        case 'steel_drills': {
          ctx.shadowColor = '#94a3b8';
          ctx.shadowBlur = 10;

          // Polished Titanium Cone
          ctx.fillStyle = '#64748b';
          ctx.strokeStyle = '#f8fafc';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(r * 2.0, 0); // Drill tip
          ctx.lineTo(-r * 1.1, -r * 0.85);
          ctx.lineTo(-r * 0.7, 0);
          ctx.lineTo(-r * 1.1, r * 0.85);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Spiral steel helical flutes
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.0, -r * 0.4);
          ctx.lineTo(r * 0.3, r * 0.5);
          ctx.moveTo(0, -r * 0.65);
          ctx.lineTo(-r * 0.6, r * 0.7);
          ctx.stroke();

          // Golden friction sparks at the tip
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(r * 1.9, -2, 1.8, 0, Math.PI * 2);
          ctx.arc(r * 1.9, 2, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // M. FLOWER CANNON (Ma Hoa Pháo Mimosa)
        case 'flower_cannon': {
          ctx.shadowColor = '#f472b6';
          ctx.shadowBlur = 14;

          // Enchanted Lotus Bloom with 6 Petals
          ctx.fillStyle = '#f472b6';
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.8;
          for (let p = 0; p < 6; p++) {
            const a = (p * Math.PI) / 3 + tick * 0.12;
            ctx.beginPath();
            ctx.ellipse(Math.cos(a) * r * 0.65, Math.sin(a) * r * 0.65, r * 0.6, r * 0.32, a, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }

          // Golden Pollen Sunburst Core
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // N. BULL GOLEM (Thiết Ngưu Henry - Heavy Iron Ram)
        case 'bull_golem': {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 14;

          // Heavy Iron Bull Head
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.3, r * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Swept-Forward Polished Gold Horns
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.moveTo(r * 0.5, -r * 0.5);
          ctx.lineTo(r * 1.4, -r * 1.1);
          ctx.lineTo(r * 0.8, -r * 0.2);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(r * 0.5, r * 0.5);
          ctx.lineTo(r * 1.4, r * 1.1);
          ctx.lineTo(r * 0.8, r * 0.2);
          ctx.closePath();
          ctx.fill();

          // Glowing Demonic Red Bull Eyes
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(r * 0.4, -r * 0.3, 2.2, 0, Math.PI * 2);
          ctx.arc(r * 0.4, r * 0.3, 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // O. ALCHEMICAL TRANSMUTATION CRYSTAL (Grey)
        case 'magic_conversion':
        case 'substance_transmute': {
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = 14;

          // Faceted Philosopher Octahedron
          ctx.fillStyle = '#7c3aed';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.5, 0);
          ctx.lineTo(0, -r * 1.0);
          ctx.lineTo(-r * 1.3, 0);
          ctx.lineTo(0, r * 1.0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Shifting iridescent inner facet
          ctx.fillStyle = '#c084fc';
          ctx.beginPath();
          ctx.moveTo(r * 1.2, 0);
          ctx.lineTo(0, -r * 0.6);
          ctx.lineTo(-r * 0.8, 0);
          ctx.closePath();
          ctx.fill();

          // Luminous white core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        }

        // P. GENERIC ENERGY COMET ORB (Lõi phát quang trắng đa tầng)
        default: {
          const color = proj.color || '#38bdf8';
          ctx.shadowColor = color;
          ctx.shadowBlur = 14;

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();

          // White Luminous Core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.2, 0, r * 0.55, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.4;
          ctx.stroke();
          ctx.shadowBlur = 0;
          break;
        }
      }

      ctx.restore();
    }
  }`;

// 4. New drawSlashes
const newSlashes = `  drawSlashes(ctx, tick) {
    for (const slash of this.slashes) {
      const p = slash.progress || 0;
      const alpha = Math.max(0, 1 - p);
      const r = slash.radius;
      const color = slash.color || '#dc2626';

      ctx.save();
      ctx.translate(slash.x, slash.y);

      // 360-degree Spin Slash (Black Divider 360 & Dimension Slash Vortex)
      if (slash.arc >= Math.PI * 1.9) {
        ctx.rotate(slash.progress * 4.5);

        // A. Sweeping Outer Dark Rim with Intense Chromatic Aura
        ctx.globalAlpha = alpha * 0.7;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.lineWidth = 28 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // B. 4 Spinning Curved Scythe Blades with Speed-Line Blur
        ctx.globalAlpha = alpha * 0.95;
        ctx.fillStyle = color;
        for (let b = 0; b < 4; b++) {
          const ba = (b * Math.PI) / 2;
          ctx.save();
          ctx.rotate(ba);
          ctx.beginPath();
          ctx.moveTo(r * 0.25, 0);
          ctx.bezierCurveTo(r * 0.65, r * 0.45, r * 0.92, -r * 0.12, r * 1.12, 0);
          ctx.bezierCurveTo(r * 0.82, -r * 0.35, r * 0.5, -r * 0.22, r * 0.25, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // C. Blinding White Blade Gleam Cutting Perimeter
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 4.0 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
        ctx.stroke();

        // D. Crackling Anti-Magic / Void Lightning across Vortex
        if (Math.random() < 0.6) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          const la = Math.random() * Math.PI * 2;
          ctx.moveTo(Math.cos(la) * r * 0.3, Math.sin(la) * r * 0.3);
          ctx.lineTo(Math.cos(la + 0.3) * r * 0.95, Math.sin(la + 0.3) * r * 0.95);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      } else {
        // Directional Crescent Anime Arc (Nhát chém hình cung trăng uốn lượn sắc sảo)
        const halfArc = slash.arc / 2;
        const startA = slash.facingAngle - halfArc;
        const endA = slash.facingAngle + halfArc;
        const thickness = Math.max(7, r * 0.30 * (1 - p * 0.45));

        // A. Outer Radiant Bloom Glow
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 22;
        ctx.lineWidth = thickness * 1.35;
        ctx.beginPath();
        ctx.arc(0, 0, r, startA, endA, false);
        ctx.stroke();

        // B. Crescent Body Path (Dày vồng ở giữa, vát nhọn sắc lẹm ở 2 đầu)
        ctx.globalAlpha = alpha * 0.92;
        ctx.fillStyle = color;
        ctx.beginPath();
        // Outer arc
        ctx.arc(0, 0, r + thickness * 0.5, startA, endA, false);
        // Inner arc returning
        ctx.arc(0, 0, r - thickness * 0.5, endA, startA, true);
        ctx.closePath();
        ctx.fill();

        // C. Inner Concentric Speed-Ribs / Slash Shock Ripples
        ctx.globalAlpha = alpha * 0.65;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(0, 0, r - thickness * 0.15, startA + 0.15, endA - 0.15, false);
        ctx.stroke();

        // D. Ultra-Sharp Razor White Cutting Edge (Lưỡi kiếm phát quang trắng sắc lẹm)
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.lineWidth = 4.2 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r + thickness * 0.35, startA + 0.04, endA - 0.04, false);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // E. Slash Spark Embers scattering off the blade
        for (let s = 0; s < 3; s++) {
          const sa = startA + (s / 2) * slash.arc + (Math.random() - 0.5) * 0.1;
          const sDist = r + (Math.random() - 0.5) * thickness;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(Math.cos(sa) * sDist, Math.sin(sa) * sDist, 1.6 * alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }
  }`;

// 5. New drawLightningChains
const newLightningChains = `  drawLightningChains(ctx, tick) {
    for (const lc of this.lightningChains) {
      if (!lc.points || lc.points.length < 2) continue;
      const color = lc.color || '#38bdf8';

      ctx.save();
      // Outer electric bloom glow
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.lineWidth = 5.5;
      ctx.beginPath();
      ctx.moveTo(lc.points[0].x, lc.points[0].y);
      for (let i = 1; i < lc.points.length; i++) {
        const p1 = lc.points[i - 1];
        const p2 = lc.points[i];
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 18;
        const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 18;
        ctx.lineTo(midX, midY);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Inner blinding white-hot lightning core
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 2.0;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Electric spark nodes at each chain vertex
      for (let i = 0; i < lc.points.length; i++) {
        const pt = lc.points[i];
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 5.0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }`;

// Apply replacements
// A. drawAoEZones
const aoeStart = code.indexOf('  drawAoEZones(ctx, tick) {');
const swHeader = '  // -------------------------------------------------------------------------\n  // 2. MULTI-TIER SHOCKWAVES';
const aoeEnd = code.indexOf(swHeader);
if (aoeStart !== -1 && aoeEnd !== -1) {
  code = code.substring(0, aoeStart) + newAoEZones + '\n\n' + code.substring(aoeEnd);
  console.log('Replaced drawAoEZones successfully!');
} else {
  console.error('Failed to locate drawAoEZones boundaries');
}

// B. drawShockwaves
const swStart = code.indexOf('  drawShockwaves(ctx, tick) {');
const srHeader = '  // -------------------------------------------------------------------------\n  // 2.5. MAGIC SURVIVAL SPIRIT RING RENDERER';
const swEnd = code.indexOf(srHeader);
if (swStart !== -1 && swEnd !== -1) {
  code = code.substring(0, swStart) + newShockwaves + '\n\n' + code.substring(swEnd);
  console.log('Replaced drawShockwaves successfully!');
} else {
  console.error('Failed to locate drawShockwaves boundaries');
}

// C. drawProjectiles
const pStart = code.indexOf('  drawProjectiles(ctx, tick) {');
const slashHeader = '  // -------------------------------------------------------------------------\n  // 4. CRESCENT ANIME SLASHES';
const pEnd = code.indexOf(slashHeader);
if (pStart !== -1 && pEnd !== -1) {
  code = code.substring(0, pStart) + newProjectiles + '\n\n' + code.substring(pEnd);
  console.log('Replaced drawProjectiles successfully!');
} else {
  console.error('Failed to locate drawProjectiles boundaries');
}

// D. drawSlashes
const sStart = code.indexOf('  drawSlashes(ctx, tick) {');
const lcHeader = '  // -------------------------------------------------------------------------\n  // 5. LIGHTNING CHAINS';
const sEnd = code.indexOf(lcHeader);
if (sStart !== -1 && sEnd !== -1) {
  code = code.substring(0, sStart) + newSlashes + '\n\n' + code.substring(sEnd);
  console.log('Replaced drawSlashes successfully!');
} else {
  console.error('Failed to locate drawSlashes boundaries');
}

// E. drawLightningChains
const lcStart = code.indexOf('  drawLightningChains(ctx, tick) {');
const ptHeader = '  // -------------------------------------------------------------------------\n  // 6. IMPACT PARTICLES & MANA EMBERS';
const lcEnd = code.indexOf(ptHeader);
if (lcStart !== -1 && lcEnd !== -1) {
  code = code.substring(0, lcStart) + newLightningChains + '\n\n' + code.substring(lcEnd);
  console.log('Replaced drawLightningChains successfully!');
} else {
  console.error('Failed to locate drawLightningChains boundaries');
}

fs.writeFileSync(spellsPath, code, 'utf8');
console.log('Updated spells.js successfully! New length:', code.length);
