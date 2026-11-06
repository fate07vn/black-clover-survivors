const fs = require('fs');

const gamePath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js';
const indexPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html';

let gameCode = fs.readFileSync(gamePath, 'utf8');
let htmlCode = fs.readFileSync(indexPath, 'utf8');

// --- 1. GAME.JS UPDATES ---

// A. Constructor
const oldGameConstructorInit = `    this.state = 'MENU';
    this.selectedCharId = 'asta';
    this.selectedMapId = 'clover_plains';
    this.selectedDifficulty = 'normal';`;

const newGameConstructorInit = `    this.state = 'MENU';
    this.selectedCharId = 'asta';
    this.selectedMapId = 'clover_plains';
    this.selectedDifficulty = 'normal';
    try {
      const sh = localStorage.getItem('BC_SELECTED_HERO');
      if (sh) this.selectedCharId = sh;
      const sm = localStorage.getItem('BC_SELECTED_MAP');
      if (sm) this.selectedMapId = sm;
      const sd = localStorage.getItem('BC_SELECTED_DIFF');
      if (sd) this.selectedDifficulty = sd;
    } catch (e) {}`;

gameCode = gameCode.replace(oldGameConstructorInit, newGameConstructorInit);

// B. loadSaveData
const oldLoadPity = `        if (data.bannerPity) this.bannerPity = data.bannerPity;
        if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;`;

const newLoadPity = `        if (data.bannerPity) this.bannerPity = data.bannerPity;
        if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;
        if (data.selectedCharId && (CHARACTERS[data.selectedCharId] || data.selectedCharId === 'asta')) {
          this.selectedCharId = data.selectedCharId;
        } else {
          try {
            const sh = localStorage.getItem('BC_SELECTED_HERO');
            if (sh && CHARACTERS[sh]) this.selectedCharId = sh;
          } catch (e) {}
        }
        if (data.selectedMapId) this.selectedMapId = data.selectedMapId;
        if (data.selectedDifficulty) this.selectedDifficulty = data.selectedDifficulty;`;

gameCode = gameCode.replace(oldLoadPity, newLoadPity);

// C. exportSaveData
const oldExportData = `  exportSaveData() {
    return {
      currency: this.currency,
      playerName: this.playerName,
      unlocked: Array.from(this.unlockedCharacters),
      upgrades: this.upgrades,`;

const newExportData = `  exportSaveData() {
    return {
      currency: this.currency,
      playerName: this.playerName,
      unlocked: Array.from(this.unlockedCharacters),
      selectedCharId: this.selectedCharId || 'asta',
      selectedMapId: this.selectedMapId || 'clover_plains',
      selectedDifficulty: this.selectedDifficulty || 'normal',
      upgrades: this.upgrades,`;

gameCode = gameCode.replace(oldExportData, newExportData);

// D. applySaveData
const oldApplyPity = `      if (data.bannerPity) this.bannerPity = data.bannerPity;
      if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;
      if (data.artifactsSystem && this.artifacts) this.artifacts.loadData(data.artifactsSystem);`;

const newApplyPity = `      if (data.bannerPity) this.bannerPity = data.bannerPity;
      if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;
      if (data.artifactsSystem && this.artifacts) this.artifacts.loadData(data.artifactsSystem);
      if (data.selectedCharId && (CHARACTERS[data.selectedCharId] || data.selectedCharId === 'asta')) {
        this.selectedCharId = data.selectedCharId;
        try { localStorage.setItem('BC_SELECTED_HERO', data.selectedCharId); } catch (e) {}
      }
      if (data.selectedMapId) {
        this.selectedMapId = data.selectedMapId;
        try { localStorage.setItem('BC_SELECTED_MAP', data.selectedMapId); } catch (e) {}
      }
      if (data.selectedDifficulty) {
        this.selectedDifficulty = data.selectedDifficulty;
        try { localStorage.setItem('BC_SELECTED_DIFF', data.selectedDifficulty); } catch (e) {}
      }`;

gameCode = gameCode.replace(oldApplyPity, newApplyPity);

// E. startGame
const oldStartGameInit = `  startGame(charId, mapId, diffId) {
    this.selectedCharId = charId || this.selectedCharId;
    this.selectedMapId = mapId || this.selectedMapId;
    this.selectedDifficulty = diffId || this.selectedDifficulty || 'normal';`;

const newStartGameInit = `  startGame(charId, mapId, diffId) {
    this.selectedCharId = charId || this.selectedCharId;
    this.selectedMapId = mapId || this.selectedMapId;
    this.selectedDifficulty = diffId || this.selectedDifficulty || 'normal';
    try {
      localStorage.setItem('BC_SELECTED_HERO', this.selectedCharId);
      localStorage.setItem('BC_SELECTED_MAP', this.selectedMapId);
      localStorage.setItem('BC_SELECTED_DIFF', this.selectedDifficulty);
    } catch (e) {}`;

gameCode = gameCode.replace(oldStartGameInit, newStartGameInit);


// --- 2. INDEX.HTML UPDATES ---

// A. Variables
const oldHtmlVars = `    let gameInstance = null;
    let selectedHeroId = 'asta';
    let selectedMapId = 'clover_plains';
    let selectedDifficulty = 'normal';`;

const newHtmlVars = `    let gameInstance = null;
    let selectedHeroId = 'asta';
    try {
      const persistedHero = localStorage.getItem('BC_SELECTED_HERO');
      if (persistedHero) selectedHeroId = persistedHero;
    } catch (e) {}
    let selectedMapId = 'clover_plains';
    try {
      const persistedMap = localStorage.getItem('BC_SELECTED_MAP');
      if (persistedMap) selectedMapId = persistedMap;
    } catch (e) {}
    let selectedDifficulty = 'normal';
    try {
      const persistedDiff = localStorage.getItem('BC_SELECTED_DIFF');
      if (persistedDiff) selectedDifficulty = persistedDiff;
    } catch (e) {}`;

htmlCode = htmlCode.replace(oldHtmlVars, newHtmlVars);

// B. selectHero
const oldSelectHero = `    function selectHero(charId) {
      selectedHeroId = charId;
      if (gameInstance) gameInstance.selectedCharId = charId;
      updateSelectedCharInfo(charId);
      renderCharRosterGrid();
      if (window.soundEngine && window.soundEngine.upgrade) {
        try { window.soundEngine.upgrade(); } catch (e) {}
      }
    }`;

const newSelectHero = `    function selectHero(charId) {
      selectedHeroId = charId;
      try {
        localStorage.setItem('BC_SELECTED_HERO', charId);
      } catch (e) {}
      if (gameInstance) {
        gameInstance.selectedCharId = charId;
        gameInstance.saveGameData();
      }
      updateSelectedCharInfo(charId);
      renderCharRosterGrid();
      if (window.soundEngine && window.soundEngine.upgrade) {
        try { window.soundEngine.upgrade(); } catch (e) {}
      }
    }`;

htmlCode = htmlCode.replace(oldSelectHero, newSelectHero);

// C. chooseMapOption & chooseDifficultyOption
const oldMapOptions = `    function chooseMapOption(mapId) {
      selectedMapId = mapId;
      if (gameInstance) gameInstance.selectedMapId = mapId;
      document.querySelectorAll('#mapSelectModal .char-roster-card').forEach(c => c.classList.remove('selected'));
      const activeCard = selectedMapId === 'underworld_palace' ? document.getElementById('mapCard2') : document.getElementById('mapCard1');
      if (activeCard) activeCard.classList.add('selected');
      updateSelectedCharInfo(selectedHeroId);
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }

    function chooseDifficultyOption(diffId) {
      selectedDifficulty = diffId;
      if (gameInstance) gameInstance.selectedDifficulty = diffId;
      document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
      const activeDiff = document.getElementById(\`diffCard_\${diffId}\`);
      if (activeDiff) activeDiff.classList.add('selected');
      updateSelectedCharInfo(selectedHeroId);
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }`;

const newMapOptions = `    function chooseMapOption(mapId) {
      selectedMapId = mapId;
      try { localStorage.setItem('BC_SELECTED_MAP', mapId); } catch (e) {}
      if (gameInstance) {
        gameInstance.selectedMapId = mapId;
        gameInstance.saveGameData();
      }
      document.querySelectorAll('#mapSelectModal .char-roster-card').forEach(c => c.classList.remove('selected'));
      const activeCard = selectedMapId === 'underworld_palace' ? document.getElementById('mapCard2') : document.getElementById('mapCard1');
      if (activeCard) activeCard.classList.add('selected');
      updateSelectedCharInfo(selectedHeroId);
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }

    function chooseDifficultyOption(diffId) {
      selectedDifficulty = diffId;
      try { localStorage.setItem('BC_SELECTED_DIFF', diffId); } catch (e) {}
      if (gameInstance) {
        gameInstance.selectedDifficulty = diffId;
        gameInstance.saveGameData();
      }
      document.querySelectorAll('.diff-card').forEach(c => c.classList.remove('selected'));
      const activeDiff = document.getElementById(\`diffCard_\${diffId}\`);
      if (activeDiff) activeDiff.classList.add('selected');
      updateSelectedCharInfo(selectedHeroId);
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }`;

htmlCode = htmlCode.replace(oldMapOptions, newMapOptions);

// D. init()
const oldInit = `    // Initialize immediately without waiting
    function init() {
      const g = ensureGameInstance();
      if (window.authManager) {
        window.authManager.init(g);
      }
      if (g) g.updateTopBarCurrency();
      updateSelectedCharInfo(selectedHeroId);
      syncSettingsValues();
    }`;

const newInit = `    // Initialize immediately without waiting
    function init() {
      const g = ensureGameInstance();
      if (window.authManager) {
        window.authManager.init(g);
      }
      try {
        const sh = localStorage.getItem('BC_SELECTED_HERO') || (g && g.selectedCharId);
        if (sh) {
          const allChars = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : (window.CHARACTERS || {});
          if (allChars[sh]) {
            selectedHeroId = sh;
            if (g) g.selectedCharId = sh;
          }
        }
        const sm = localStorage.getItem('BC_SELECTED_MAP');
        if (sm) {
          selectedMapId = sm;
          if (g) g.selectedMapId = sm;
        }
        const sd = localStorage.getItem('BC_SELECTED_DIFF');
        if (sd) {
          selectedDifficulty = sd;
          if (g) g.selectedDifficulty = sd;
        }
      } catch (e) {}
      if (g) g.updateTopBarCurrency();
      updateSelectedCharInfo(selectedHeroId);
      syncSettingsValues();
    }`;

htmlCode = htmlCode.replace(oldInit, newInit);

// Bump version in index.html to v=bc197
htmlCode = htmlCode.replace(/v=bc196/g, 'v=bc197');

fs.writeFileSync(gamePath, gameCode, 'utf8');
fs.writeFileSync(indexPath, htmlCode, 'utf8');

console.log('Successfully applied character persistence across web sessions and reloads!');
