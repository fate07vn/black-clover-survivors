const fs = require('fs');

console.log('--- 1. UPDATING ARTIFACTS.JS & ARTIFACTS_2.JS ---');
let artCode = fs.readFileSync('src/artifacts.js', 'utf8');

// Ensure window.MAP_ARTIFACT_DEFS is exported
if (!artCode.includes('window.MAP_ARTIFACT_DEFS')) {
  artCode = artCode.replace(
    'window.IN_RUN_ARTIFACT_DEFS = IN_RUN_ARTIFACT_DEFS;',
    'window.IN_RUN_ARTIFACT_DEFS = IN_RUN_ARTIFACT_DEFS;\nwindow.MAP_ARTIFACT_DEFS = IN_RUN_ARTIFACT_DEFS;'
  );
}

fs.writeFileSync('src/artifacts.js', artCode, 'utf8');
fs.writeFileSync('src/artifacts_2.js', artCode, 'utf8');
console.log('Artifacts files updated.');

console.log('--- 2. UPDATING GAME.JS & GAME_2.JS ---');
let gameCode = fs.readFileSync('src/game.js', 'utf8');

// 2.1 Ensure this.chestPingTimer is decremented in update()
if (!gameCode.includes('if (this.chestPingTimer > 0) this.chestPingTimer -= dt;')) {
  gameCode = gameCode.replace(
    'this.chestSpawnTimer = (this.chestSpawnTimer || 35) - dt;',
    'if (this.chestPingTimer > 0) this.chestPingTimer -= dt;\n    this.chestSpawnTimer = (this.chestSpawnTimer || 35) - dt;'
  );
}

// 2.2 Fix updateChestDetailsView() allDefs lookup
gameCode = gameCode.replace(
  'updateChestDetailsView() {\n    const allDefs = window.ARTIFACT_DEFS || {};',
  'updateChestDetailsView() {\n    const allDefs = window.MAP_ARTIFACT_DEFS || window.IN_RUN_ARTIFACT_DEFS || window.ARTIFACT_DEFS || {};'
);

// 2.3 Ensure openTreasureChest rolls only from MAP_ARTIFACT_DEFS / IN_RUN_ARTIFACT_DEFS
gameCode = gameCode.replace(
  '// Roll 3 distinct artifact choices from ARTIFACT_DEFS\n    const allDefs = window.IN_RUN_ARTIFACT_DEFS || {};',
  '// Roll 3 distinct artifact choices ONLY from MAP_ARTIFACT_DEFS (In-Map Chest Artifacts)\n    const allDefs = window.MAP_ARTIFACT_DEFS || window.IN_RUN_ARTIFACT_DEFS || {};'
);

// 2.4 Ensure renderTreasureChestModal uses MAP_ARTIFACT_DEFS
gameCode = gameCode.replace(
  'const allDefs = window.IN_RUN_ARTIFACT_DEFS || window.ARTIFACT_DEFS || {};\n\n    if (cardsRow) {',
  'const allDefs = window.MAP_ARTIFACT_DEFS || window.IN_RUN_ARTIFACT_DEFS || {};\n\n    if (cardsRow) {'
);

// 2.5 Ensure renderArtifactsListInto uses combined definitions
gameCode = gameCode.replace(
  'renderArtifactsListInto(listId, countId) {\n    const allDefs = window.ARTIFACT_DEFS || {};',
  'renderArtifactsListInto(listId, countId) {\n    const allDefs = { ...(window.MAP_ARTIFACT_DEFS || {}), ...(window.IN_RUN_ARTIFACT_DEFS || {}), ...(window.ARTIFACT_DEFS || {}) };'
);

// 2.6 Add hotkey R for pingNearestChest
if (!gameCode.includes("if (e.key === 'r' || e.key === 'R')")) {
  gameCode = gameCode.replace(
    "if (this.matchesAction(e, 'dash')) {\n        e.preventDefault();\n        this.playerDash();\n      }",
    `if (this.matchesAction(e, 'dash')) {\n        e.preventDefault();\n        this.playerDash();\n      }\n\n      // Hotkey R to ping nearest chest\n      if (e.key === 'r' || e.key === 'R') {\n        if (!e.ctrlKey && !e.altKey && !e.metaKey && this.state === 'PLAYING') {\n          this.pingNearestChest();\n        }\n      }`
  );
}

// 2.7 Replace drawChestDirectionPointers with enhanced version
const oldDrawCompassStart = '  drawChestDirectionPointers(ctx) {';
const oldDrawCompassEnd = '  pingNearestChest() {';
const startIdx = gameCode.indexOf(oldDrawCompassStart);
const endIdx = gameCode.indexOf(oldDrawCompassEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const newDrawCompassCode = `  drawChestDirectionPointers(ctx) {
    if (!this.player || !this.drops || this.state !== 'PLAYING') return;

    const p = this.player;
    const chests = this.drops.filter(d => d.type === 'chest');
    const widget = document.getElementById('chestCompassWidget');

    if (chests.length === 0) {
      if (widget) widget.classList.add('hidden');
      return;
    }

    // Sort to find the nearest chest
    chests.sort((a, b) => {
      const distA = (a.x - p.x) * (a.x - p.x) + (a.y - p.y) * (a.y - p.y);
      const distB = (b.x - p.x) * (b.x - p.x) + (b.y - p.y) * (b.y - p.y);
      return distA - distB;
    });

    const nearest = chests[0];
    const dx = nearest.x - p.x;
    const dy = nearest.y - p.y;
    const dist = Math.hypot(dx, dy);
    const distMeters = Math.max(1, Math.round(dist / 10));
    const deg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

    // Update Top HUD Compass Widget
    if (widget) {
      widget.classList.remove('hidden');
      const distEl = document.getElementById('chestCompassDist');
      const arrowEl = document.getElementById('chestCompassArrow');
      if (distEl) distEl.textContent = \`\${distMeters}m\`;
      if (arrowEl) {
        const arrows = ['➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️', '⬆️', '↗️'];
        const arrowIdx = Math.round(deg / 45) % 8;
        arrowEl.textContent = arrows[arrowIdx];
        arrowEl.style.transform = \`rotate(\${deg}deg)\`;
      }
    }

    const zoom = this.mapZoom || 1.0;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const margin = 55;

    const sx = (nearest.x - this.camera.x) * zoom;
    const sy = (nearest.y - this.camera.y) * zoom;
    const isOffScreen = (sx < margin || sx > cw - margin || sy < margin || sy > ch - margin);

    // If player pinged the compass (chestPingTimer > 0), draw laser guideline from player
    if (this.chestPingTimer > 0) {
      const pScreenX = (p.x - this.camera.x) * zoom;
      const pScreenY = (p.y - this.camera.y) * zoom;
      const alpha = Math.min(1.0, this.chestPingTimer / 2.0);

      ctx.save();
      ctx.strokeStyle = \`rgba(251, 191, 36, \${0.75 * alpha})\`;
      ctx.lineWidth = 3.5;
      ctx.setLineDash([12, 8]);
      ctx.lineDashOffset = -this.tick * 2.5;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(pScreenX, pScreenY);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    if (isOffScreen) {
      const cx = cw / 2;
      const cy = ch / 2;
      const ang = Math.atan2(dy, dx);

      const maxHalfW = cx - margin;
      const maxHalfH = cy - margin;
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);

      let scale = 99999;
      if (cos > 0) scale = Math.min(scale, maxHalfW / cos);
      if (cos < 0) scale = Math.min(scale, -maxHalfW / cos);
      if (sin > 0) scale = Math.min(scale, maxHalfH / sin);
      if (sin < 0) scale = Math.min(scale, -maxHalfH / sin);

      const px = cx + cos * scale;
      const py = cy + sin * scale;

      ctx.save();
      ctx.translate(px, py);

      // Pulsing golden aura
      const pulse = 0.8 + 0.2 * Math.sin(this.tick * 0.25);
      ctx.fillStyle = \`rgba(251, 191, 36, \${0.4 * pulse})\`;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();

      // Circular Compass Badge (Dark slate with gold border)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Golden Crown / Chest Icon in center
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👑', 0, -1);

      // Directional Arrow Head pointing towards the chest
      ctx.save();
      ctx.rotate(ang);
      ctx.fillStyle = '#fde047';
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(27, 0);
      ctx.lineTo(17, -8);
      ctx.lineTo(19, 0);
      ctx.lineTo(17, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Distance tag pill below
      ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(-24, 21, 48, 16, 4) : ctx.rect(-24, 21, 48, 16);
      ctx.fill();
      ctx.stroke();

      ctx.font = '900 10.5px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fef08a';
      ctx.fillText(\`\${distMeters}m\`, 0, 29);

      ctx.restore();
    } else {
      // Chest is ON-SCREEN! Draw a vertical beacon ray and pointer badge above chest
      ctx.save();
      // Ascending Light Beam
      const beamGrad = ctx.createLinearGradient(sx, sy, sx, sy - 140);
      beamGrad.addColorStop(0, 'rgba(251, 191, 36, 0.55)');
      beamGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = beamGrad;
      ctx.fillRect(sx - 10, sy - 140, 20, 140);

      // Bouncing Pointer Badge above chest
      const bounce = Math.sin(this.tick * 0.25) * 6;
      const ptrY = sy - 42 + bounce;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(sx - 36, ptrY - 14, 72, 22, 6) : ctx.rect(sx - 36, ptrY - 14, 72, 22);
      ctx.fill();
      ctx.stroke();

      ctx.font = '900 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fef08a';
      ctx.fillText('👑 RƯƠNG ⬇️', sx, ptrY - 2);
      ctx.restore();
    }
  }

  pingNearestChest() {
    if (!this.drops) return;
    const chests = this.drops.filter(d => d.type === 'chest');
    if (chests.length === 0) {
      this.triggerComboBanner('ℹ️ HIỆN CHƯA CÓ RƯƠNG TRÊN BẢN ĐỒ. ĐÁNH BẠI BOSS / CHỜ RƯƠNG XUẤT HIỆN!');
      return;
    }
    const p = this.player;
    chests.sort((a, b) => {
      const distA = (a.x - p.x) * (a.x - p.x) + (a.y - p.y) * (a.y - p.y);
      const distB = (b.x - p.x) * (b.x - p.x) + (b.y - p.y) * (b.y - p.y);
      return distA - distB;
    });
    const nearest = chests[0];
    const distMeters = Math.max(1, Math.round(Math.hypot(nearest.x - p.x, nearest.y - p.y) / 10));
    this.chestPingTimer = 4.5;
    if (window.soundEngine && window.soundEngine.evolution) window.soundEngine.evolution();
    this.triggerComboBanner(\`👑 RƯƠNG CỔ VẬT CÁCH ĐÂY \${distMeters}M! ĐÃ BẬT TIA SÁNG CHỈ HƯỚNG!\`);
    this.spells.spawnShockwave(p.x, p.y, '#fde047', 420, 0.35);
  }\n\n`;

  // Find end of pingNearestChest
  const oldPingEnd = gameCode.indexOf('// =========================================================================\n  // MAGIC SURVIVAL TREASURE CHEST SYSTEM');
  if (oldPingEnd !== -1) {
    gameCode = gameCode.slice(0, startIdx) + newDrawCompassCode + gameCode.slice(oldPingEnd);
    console.log('drawChestDirectionPointers and pingNearestChest replaced.');
  }
}

fs.writeFileSync('src/game.js', gameCode, 'utf8');
fs.writeFileSync('src/game_2.js', gameCode, 'utf8');
console.log('Game files updated.');

console.log('--- 3. UPDATING INDEX.HTML ---');
let html = fs.readFileSync('index.html', 'utf8');

// Update chestCompassWidget attributes and title
html = html.replace(
  '<div id="chestCompassWidget" class="chest-compass-pill hidden" onclick="window.game.pingNearestChest()" title="Bấm để định vị Rương Cổ Vật">',
  '<div id="chestCompassWidget" class="chest-compass-pill hidden" onclick="window.game.pingNearestChest()" title="Bấm để định vị Rương Cổ Vật (Phím R)">'
);

// Bump cache buster
html = html.replace(/v=bc18[0-9]/g, 'v=bc187');
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with cache buster v=bc187.');
