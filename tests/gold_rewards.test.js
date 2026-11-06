const fs = require('fs');
const path = require('path');

const gameCode = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');

let mockLocalStorage = {};
const localStorage = {
  getItem: k => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: k => { delete mockLocalStorage[k]; }
};

const domElements = {};
function getOrCreateElem(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      innerText: '',
      innerHTML: '',
      classList: { add() {}, remove() {}, contains: () => false },
      style: { width: '', setProperty() {} },
      appendChild() {},
      addEventListener() {},
      removeEventListener() {}
    };
  }
  return domElements[id];
}

const mockCanvas = {
  getContext: () => ({
    fillRect() {}, clearRect() {}, save() {}, restore() {},
    translate() {}, scale() {}, rotate() {}, beginPath() {},
    closePath() {}, moveTo() {}, lineTo() {}, arc() {}, fill() {}, stroke() {}
  }),
  width: 800,
  height: 600,
  addEventListener: () => {}
};

class MockManager {
  constructor() {
    this.equipped = [];
  }
  reset() {}
  resetRun() {}
  applyEquippedStats() {}
}

const mockSound = {
  init() {}, startBGM() {}, stopBGM() {}, gameOver() {}, victory() {},
  evolution() {}, pickup() {}, chestOpen() {}
};

const sandbox = {
  window: {
    focus: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    soundEngine: mockSound,
    SPELL_DEFS: { demon_slayer: {} }
  },
  document: {
    createElement: () => mockCanvas,
    getElementById: id => (id === 'gameCanvas' ? mockCanvas : getOrCreateElem(id)),
    querySelector: () => getOrCreateElem('query'),
    querySelectorAll: () => []
  },
  localStorage,
  requestAnimationFrame: () => {},
  SpellManager: MockManager,
  EnemyManager: MockManager,
  ArtifactSystem: MockManager,
  DEFAULT_KEYBINDS: {},
  DEFAULT_TOUCH_CONFIG: {},
  Math,
  performance: { now: () => 1000 },
  console
};

const fnGame = new Function('window', 'document', 'localStorage', 'requestAnimationFrame', 'SpellManager', 'EnemyManager', 'ArtifactSystem', 'Math', 'performance', 'console', gameCode + '; return Game;');
const Game = fnGame(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.requestAnimationFrame, sandbox.SpellManager, sandbox.EnemyManager, sandbox.ArtifactSystem, Math, sandbox.performance, console);

console.log('--- 1. TESTING GOLD REWARD ON GAME OVER (DEFEAT) ---');
const g1 = new Game();
g1.currency.coins = 1000;
g1.startGame('asta', 'clover_plains', 'nightmare'); // 1.5x reward
g1.killCount = 120;
g1.gameTime = 300; // 5 minutes
g1.player.level = 8;
g1.runCoinsCollected = 450; // picked up 450 during game

const startCoins = g1.currency.coins;
g1.gameOver();

console.log('Coins before Game Over:', startCoins);
console.log('Coins after Game Over:', g1.currency.coins);
console.log('DOM goGold text:', domElements['goGold'].innerText);
console.log('DOM goGoldSub html:', domElements['goGoldSub'].innerHTML);

const diff = g1.currency.coins - startCoins;
if (diff <= 0) {
  console.error('❌ FAILED: No gold awarded on Game Over!');
  process.exit(1);
} else {
  console.log(`✓ SUCCESS: Awarded +${diff} performance gold on Game Over!`);
}

console.log('\n--- 2. TESTING GOLD REWARD ON VICTORY (STAGE FINISH) ---');
const g2 = new Game();
g2.currency.coins = 500;
g2.currency.tickets = 5;
g2.startGame('asta', 'clover_plains', 'normal');
g2.killCount = 850;
g2.gameTime = 1800; // 30 minutes
g2.player.level = 25;
g2.runCoinsCollected = 1200;

const vStartCoins = g2.currency.coins;
const vStartTickets = g2.currency.tickets;
g2.victory();

console.log('Victory coins before:', vStartCoins, 'after:', g2.currency.coins);
console.log('Victory tickets before:', vStartTickets, 'after:', g2.currency.tickets);
console.log('DOM vicGold text:', domElements['vicGold'].innerText);
console.log('DOM vicGoldSub html:', domElements['vicGoldSub'].innerHTML);

const vDiff = g2.currency.coins - vStartCoins;
if (vDiff < 3000) {
  console.error('❌ FAILED: Insufficient gold awarded on Victory!');
  process.exit(1);
} else {
  console.log(`✓ SUCCESS: Awarded +${vDiff} gold and +${g2.currency.tickets - vStartTickets} tickets on Victory!`);
}

console.log('\n--- 3. TESTING GOLD REWARD ON QUIT RUN ---');
const g3 = new Game();
g3.currency.coins = 100;
g3.startGame('asta', 'clover_plains', 'normal');
g3.gameTime = 120; // 2 minutes
g3.killCount = 50;
g3.state = 'PLAYING';
const qStart = g3.currency.coins;
g3.quitCurrentRun();
console.log('Coins before quit:', qStart, 'after quit:', g3.currency.coins);
if (g3.currency.coins <= qStart) {
  console.error('❌ FAILED: No partial gold awarded on quit!');
  process.exit(1);
} else {
  console.log(`✓ SUCCESS: Awarded +${g3.currency.coins - qStart} partial gold on quit!`);
}

console.log('\n🎉 ALL GOLD REWARD TESTS PASSED PERFECTLY! 🎉');
