const fs = require('fs');

console.log('--- 1. UPDATING INDEX.HTML FOR EVOLUTION MODAL ---');
let html = fs.readFileSync('index.html', 'utf8');

// 1.1 Add TIẾN HÓA button to top navigation bar center
if (!html.includes('class="nav-tab-btn btn-tienhoa"')) {
  html = html.replace(
    '<button class="nav-tab-btn btn-bando" onclick="openMapModal()">🗺️ CHIẾN TRƯỜNG</button>',
    '<button class="nav-tab-btn btn-bando" onclick="openMapModal()">🗺️ CHIẾN TRƯỜNG</button>\n      <button class="nav-tab-btn btn-tienhoa" onclick="openEvolutionModal()" style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4);" title="Xem Toàn Bộ Công Thức & Yêu Cầu Tiến Hóa Chiêu Thức (Phím B)">📖 TIẾN HÓA</button>'
  );
  console.log('Added TIẾN HÓA button to top navigation bar.');
}

// 1.2 Update #evolutionModal container: z-index 160 and backdrop click
html = html.replace(
  '<div id="evolutionModal" class="modal-overlay-custom hidden" style="z-index: 95;">',
  '<div id="evolutionModal" class="modal-overlay-custom hidden" style="z-index: 160;" onclick="if (event.target === this) closeEvolutionModal();">'
);

// 1.3 Update Quick Rule Guide Box for Level 25 & Minute 10+
html = html.replace(
  `<b style="color: #f472b6;">2. Siêu Tiến Hóa Lần 2 (Tier 3):</b> Dành riêng cho <b>Vũ Khí Khởi Đầu của Pháp sư xuất trận</b> + Nhân vật đạt <b>Cấp 10+</b> trong trận!`,
  `<b style="color: #f472b6;">2. Siêu Tiến Hóa Lần 2 (Tier 3):</b> Dành riêng cho <b>Vũ Khí Khởi Đầu của Pháp sư xuất trận</b> + Nhân vật đạt <b>Cấp 25+</b> VÀ Thời gian trận đấu <b>sau phút thứ 10 (10:00+)</b>!`
);

// 1.4 Update Filter Tab All button count
html = html.replace(
  '<button class="filter-tab-btn active" id="tabEvoAll" onclick="setEvolutionTab(\'all\')">TẤT CẢ (30 CÔNG THỨC)</button>',
  '<button class="filter-tab-btn active" id="tabEvoAll" onclick="setEvolutionTab(\'all\')">TẤT CẢ (37 CÔNG THỨC)</button>'
);

// 1.5 Update renderEvolutionRecipes in index.html for correct Level 25 & minute 10 condition
const oldIsReadySuper = 'const isReadyForSuper = isStartingWeapon && isEvoAcquired && p.level >= 10 && !isSuperAcquired;';
const newIsReadySuper = 'const isReadyForSuper = isStartingWeapon && isEvoAcquired && (p.level >= 25) && (g && g.gameTime >= 600) && !isSuperAcquired;';
if (html.includes(oldIsReadySuper)) {
  html = html.replace(oldIsReadySuper, newIsReadySuper);
  console.log('Updated isReadyForSuper logic for Level 25 & Minute 10+');
}

// 1.6 Update status badges in renderEvolutionRecipes
html = html.replace(
  `statusBadge = \`<span class="evo-status-pill ready">🔥 ĐỦ ĐK SIÊU TIẾN HÓA LẦN 2 (Cấp \${p ? p.level : 10}/10 ✅)</span>\`;`,
  `statusBadge = \`<span class="evo-status-pill ready">🔥 ĐỦ ĐK SIÊU TIẾN HÓA LẦN 2 (Cấp \${p ? p.level : 25}/25 & Phút 10+ ✅)</span>\`;`
);

html = html.replace(
  `statusBadge = \`<span class="evo-status-pill in-progress">⭐ ĐÃ TIẾN HÓA &bull; Cần Cấp 10 để Siêu Cấp 2 (\${p ? p.level : 1}/10)</span>\`;`,
  `{
            const tMin = g ? Math.floor((g.gameTime || 0) / 60) : 0;
            statusBadge = \`<span class="evo-status-pill in-progress">⭐ ĐÃ TIẾN HÓA &bull; Cần Cấp 25 & Phút 10+ (Lv.\${p ? p.level : 1}/25 - \${tMin}/10p)</span>\`;
          }`
);

// 1.7 Add CSS for #evolutionModal z-index and responsive layout before </style>
const evoStyle = `
#evolutionModal {
  z-index: 160 !important;
}
#evolutionModal.hidden {
  display: none !important;
}
.evo-recipe-flow {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  flex-wrap: wrap !important;
}
.evo-flow-box {
  flex: 1 1 auto !important;
  min-width: 140px !important;
  box-sizing: border-box !important;
}
`;
html = html.replace('</style>', `${evoStyle}\n</style>`);

// Bump cache buster
html = html.replace(/v=bc19[0-9]/g, 'v=bc191');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with cache buster v=bc191.');

console.log('--- 2. UPDATING GAME.JS & GAME_2.JS KEY HANDLERS ---');
let gameCode = fs.readFileSync('src/game.js', 'utf8');

// Ensure keydown listener closes evoModal on Escape or toggles on B
if (!gameCode.includes("if (e.key === 'b' || e.key === 'B')")) {
  gameCode = gameCode.replace(
    "if (this.matchesAction(e, 'dash')) {",
    `// Toggle Evolution Guide Modal on key B\n      if (e.key === 'b' || e.key === 'B') {\n        if (!e.ctrlKey && !e.altKey && !e.metaKey) {\n          if (typeof toggleEvolutionModal === 'function') toggleEvolutionModal();\n        }\n      }\n\n      if (this.matchesAction(e, 'dash')) {`
  );
}

// Ensure Escape closes evoModal
gameCode = gameCode.replace(
  `      if (this.matchesAction(e, 'pause')) {
        const evoModal = document.getElementById('evolutionModal');
        if (evoModal && !evoModal.classList.contains('hidden')) {
          if (typeof closeEvolutionModal === 'function') closeEvolutionModal();
          return;
        }`,
  `      if (e.key === 'Escape' || this.matchesAction(e, 'pause')) {
        const evoModal = document.getElementById('evolutionModal');
        if (evoModal && !evoModal.classList.contains('hidden')) {
          if (typeof closeEvolutionModal === 'function') closeEvolutionModal();
          return;
        }`
);

fs.writeFileSync('src/game.js', gameCode, 'utf8');
fs.writeFileSync('src/game_2.js', gameCode, 'utf8');
console.log('game.js and game_2.js updated successfully.');
