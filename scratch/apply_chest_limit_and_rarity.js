const fs = require('fs');

console.log('--- 1. UPDATING GAME.JS & GAME_2.JS ---');
let gameCode = fs.readFileSync('src/game.js', 'utf8');

// 1.1 In resetGame(): change initial chestSpawnTimer from 35 to 120
gameCode = gameCode.replace(
  'this.chestSpawnTimer = 35;',
  'this.chestSpawnTimer = 120; // 2 minutes before first periodic chest'
);

// 1.2 In startGame(): REMOVE the 3 initial chests at match start!
const oldInitChests = `    // Spawn 3 initial mystery chests on the battlefield!
    for (let c = 0; c < 3; c++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 320 + Math.random() * 450;
      this.spawnDrop(this.player.x + Math.cos(angle) * dist, this.player.y + Math.sin(angle) * dist, 'chest', 100);
    }`;

if (gameCode.includes(oldInitChests)) {
  gameCode = gameCode.replace(oldInitChests, '    // Lâu lâu mới có 1 rương: Không spawn rương ban đầu, rương xuất hiện theo chu kỳ hoặc khi hạ Boss');
  console.log('Removed 3 initial free chests at match start.');
}

// 1.3 In boss defeat drops: ensure mini-boss 10 and 20 don't spawn duplicate chests
gameCode = gameCode.replace(
  `      } else if (enemy.isMiniBoss10) {
        this.triggerComboBanner('⚔️ ĐÃ HẠ GỤC BOSS NHỎ PHÚT 10! TIẾP TỤC ĐẾN PHÚT 20!');
        this.spawnDrop(enemy.x + 40, enemy.y, 'chest', 100);`,
  `      } else if (enemy.isMiniBoss10) {
        this.triggerComboBanner('⚔️ ĐÃ HẠ GỤC BOSS NHỎ PHÚT 10! TIẾP TỤC ĐẾN PHÚT 20!');`
);

gameCode = gameCode.replace(
  `      } else if (enemy.isMiniBoss20) {
        this.triggerComboBanner('💥 ĐÃ HẠ GỤC BOSS NHỎ PHÚT 20! CHUẨN BỊ ĐẠI CHIẾN PHÚT 30!');
        this.spawnDrop(enemy.x + 40, enemy.y, 'chest', 100);`,
  `      } else if (enemy.isMiniBoss20) {
        this.triggerComboBanner('💥 ĐÃ HẠ GỤC BOSS NHỎ PHÚT 20! CHUẨN BỊ ĐẠI CHIẾN PHÚT 30!');`
);

// 1.4 In update loop: Make periodic chest spawning infrequent (110-150s) and max 1 active chest
const oldPeriodicChestRegex = /this\.chestSpawnTimer = \(this\.chestSpawnTimer \|\| [0-9]+\) - dt;[\s\S]*?this\.chestSpawnTimer = [0-9\.\+\*a-zA-Z ]+;[\s\S]*?const existingChests = this\.drops\.filter\(d => d\.type === 'chest'\)\.length;[\s\S]*?if \(existingChests < [0-9]+\) {[\s\S]*?this\.spawnDrop\(cx, cy, 'chest', 100\);[\s\S]*?this\.triggerComboBanner\([^)]+\);[\s\S]*?}/;

const newPeriodicChestCode = `this.chestSpawnTimer = (this.chestSpawnTimer || 120) - dt;
    if (this.chestSpawnTimer <= 0) {
      this.chestSpawnTimer = 110 + Math.random() * 40; // 110s - 150s (gần 2 - 2.5 phút mới xuất hiện 1 rương)
      const existingChests = this.drops.filter(d => d.type === 'chest').length;
      if (existingChests < 1) { // Lâu lâu mới có 1 rương: Chỉ có tối đa 1 rương trên toàn bản đồ
        const angle = Math.random() * Math.PI * 2;
        const dist = 450 + Math.random() * 400; // 450 - 850px radius
        const cx = p.x + Math.cos(angle) * dist;
        const cy = p.y + Math.sin(angle) * dist;
        this.spawnDrop(cx, cy, 'chest', 100);
        this.spells.floatingTexts.push({ x: p.x, y: p.y - 40, text: '🎁 RƯƠNG CỔ VẬT XUẤT HIỆN!', color: '#fbbf24', size: 16, life: 1.5 });
        this.triggerComboBanner('👑 RƯƠNG CỔ VẬT ĐÃ XUẤT HIỆN! HÃY BẬT LA BÀN HOẶC BẤM [R] ĐỂ ĐỊNH VỊ!');
      }
    }`;

if (oldPeriodicChestRegex.test(gameCode)) {
  gameCode = gameCode.replace(oldPeriodicChestRegex, newPeriodicChestCode);
  console.log('Periodic chest timer adjusted to 110s - 150s (max 1 active chest).');
} else {
  console.log('Warning: periodic chest regex did not match, checking manual string replacement.');
}

// 1.5 In openMysteryChest(drop): Enforce 12 artifacts limit
const oldOpenMystery = `  openMysteryChest(drop) {
    this.openTreasureChest();
  }`;

const newOpenMystery = `  openMysteryChest(drop) {
    if (!this.artifacts) this.artifacts = new window.ArtifactSystem(this);
    if (!this.artifacts.inRunArtifacts) this.artifacts.inRunArtifacts = [];

    // GIỚI HẠN TỐI ĐA 12 CỔ VẬT TRONG TRẬN
    if (this.artifacts.inRunArtifacts.length >= 12) {
      const coinReward = 800;
      const healAmt = Math.round(this.player.maxHp * 0.40);
      const expReward = Math.round((this.player.nextExp || 100) * 0.45);

      this.currency.coins += coinReward;
      this.healPlayer(healAmt);
      this.addExp(expReward);

      if (window.soundEngine && window.soundEngine.evolution) window.soundEngine.evolution();
      this.shakeScreen(12, 0.45);
      this.spells.spawnShockwave(this.player.x, this.player.y, '#fbbf24', 450, 0.45);
      this.spells.spawnImpactParticles(this.player.x, this.player.y, '#f59e0b', 30);

      this.triggerComboBanner(\`👑 ĐÃ ĐẠT TỐI ĐA 12/12 CỔ VẬT! NHẬN THƯỞNG KHO BÁU ĐẶC BIỆT (+800 COINS, +40% MÁU, +EXP)!\`);
      this.spells.floatingTexts.push({
        x: this.player.x,
        y: this.player.y - 45,
        text: \`💎 ĐẦY 12/12 CỔ VẬT! +800 COINS & +40% HP!\`,
        color: '#facc15',
        size: 20,
        life: 1.8
      });
      return;
    }

    this.openTreasureChest();
  }`;

gameCode = gameCode.replace(oldOpenMystery, newOpenMystery);

// 1.6 In openTreasureChest(): Safeguard for 12 artifacts
gameCode = gameCode.replace(
  `  openTreasureChest() {
    if (!this.artifacts) return;`,
  `  openTreasureChest() {
    if (!this.artifacts) this.artifacts = new window.ArtifactSystem(this);
    if (!this.artifacts.inRunArtifacts) this.artifacts.inRunArtifacts = [];

    if (this.artifacts.inRunArtifacts.length >= 12) {
      this.currency.coins += 800;
      this.healPlayer(Math.round(this.player.maxHp * 0.40));
      this.triggerComboBanner('👑 ĐÃ ĐẠT TỐI ĐA 12/12 CỔ VẬT!');
      return;
    }`
);

// 1.7 In obtainChestArtifact(): Prevent adding beyond 12
gameCode = gameCode.replace(
  `  obtainChestArtifact() {
    if (!this.currentChestChoices || this.currentChestChoices.length === 0) return;`,
  `  obtainChestArtifact() {
    if (!this.currentChestChoices || this.currentChestChoices.length === 0) return;
    if (!this.artifacts) this.artifacts = new window.ArtifactSystem(this);
    if (!this.artifacts.inRunArtifacts) this.artifacts.inRunArtifacts = [];

    if (this.artifacts.inRunArtifacts.length >= 12) {
      this.triggerComboBanner('⚠️ ĐÃ ĐẠT GIỚI HẠN TỐI ĐA 12/12 CỔ VẬT!');
      const overlay = document.getElementById('treasureChestOverlay');
      if (overlay) overlay.classList.add('hidden');
      this.state = 'PLAYING';
      return;
    }`
);

// 1.8 In renderTreasureChestModal(): Display badge as X/12
gameCode = gameCode.replace(
  `    const badge = document.getElementById('chestBagBadge');
    if (badge && this.artifacts) {
      badge.textContent = (this.artifacts.inRunArtifacts ? this.artifacts.inRunArtifacts.length : 0);
    }`,
  `    const badge = document.getElementById('chestBagBadge');
    if (badge && this.artifacts) {
      const curCount = (this.artifacts.inRunArtifacts ? this.artifacts.inRunArtifacts.length : 0);
      badge.textContent = \`\${curCount}/12\`;
    }`
);

// 1.9 In renderArtifactsListInto(): Show capacity and slot numbers
const oldRenderList = `  renderArtifactsListInto(listId, countId) {
    const allDefs = { ...(window.MAP_ARTIFACT_DEFS || {}), ...(window.IN_RUN_ARTIFACT_DEFS || {}), ...(window.ARTIFACT_DEFS || {}) };
    const list = (this.artifacts && this.artifacts.inRunArtifacts) ? this.artifacts.inRunArtifacts : [];
    const listEl = document.getElementById(listId);
    const countEl = document.getElementById(countId);

    if (countEl) countEl.textContent = list.length;`;

const newRenderList = `  renderArtifactsListInto(listId, countId) {
    const allDefs = { ...(window.MAP_ARTIFACT_DEFS || {}), ...(window.IN_RUN_ARTIFACT_DEFS || {}), ...(window.ARTIFACT_DEFS || {}) };
    const list = (this.artifacts && this.artifacts.inRunArtifacts) ? this.artifacts.inRunArtifacts : [];
    const listEl = document.getElementById(listId);
    const countEl = document.getElementById(countId);

    if (countEl) countEl.textContent = \`\${list.length}/12\`;`;

gameCode = gameCode.replace(oldRenderList, newRenderList);

fs.writeFileSync('src/game.js', gameCode, 'utf8');
fs.writeFileSync('src/game_2.js', gameCode, 'utf8');
console.log('game.js and game_2.js updated successfully.');

console.log('--- 2. UPDATING ARTIFACTS.JS & ARTIFACTS_2.JS ---');
let artCode = fs.readFileSync('src/artifacts.js', 'utf8');

// Cap inRunArtifacts slice at 12 when applying stats
artCode = artCode.replace(
  `    // 2. In-Run Artifacts collected from in-map Treasure Chests
    if (Array.isArray(this.inRunArtifacts)) {
      for (const artId of this.inRunArtifacts) {`,
  `    // 2. In-Run Artifacts collected from in-map Treasure Chests (Giới hạn tối đa 12 Cổ Vật)
    if (Array.isArray(this.inRunArtifacts)) {
      const activeList = this.inRunArtifacts.slice(0, 12);
      for (const artId of activeList) {`
);

fs.writeFileSync('src/artifacts.js', artCode, 'utf8');
fs.writeFileSync('src/artifacts_2.js', artCode, 'utf8');
console.log('artifacts.js and artifacts_2.js updated successfully.');

console.log('--- 3. UPDATING INDEX.HTML ---');
let html = fs.readFileSync('index.html', 'utf8');

// Update badges to display /12
html = html.replace(
  '<span id="chestBagBadge" class="chest-bag-badge">0</span>',
  '<span id="chestBagBadge" class="chest-bag-badge" style="min-width:32px; border-radius:12px; font-size:11px;">0/12</span>'
);

html = html.replace(
  '<b style="font-size:13px; color:#38bdf8;">🎒 CỔ VẬT ĐÃ THU THẬP (<span id="drawerCount">0</span>)</b>',
  '<b style="font-size:13px; color:#38bdf8;">🎒 CỔ VẬT ĐÃ THU THẬP (<span id="drawerCount">0/12</span>)</b>'
);

html = html.replace(
  '🏺 CỔ VẬT TRẬN ĐẤU (MAGIC SURVIVAL): <span id="inGameArtifactsCountHeader">0</span>',
  '🏺 CỔ VẬT TRẬN ĐẤU (MAGIC SURVIVAL): <span id="inGameArtifactsCountHeader">0/12</span>'
);

// Bump cache buster to v=bc188
html = html.replace(/v=bc18[0-9]/g, 'v=bc188');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with cache buster v=bc188.');
