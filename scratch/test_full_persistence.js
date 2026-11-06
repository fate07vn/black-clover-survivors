const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

let mockLocalStorage = {};
const localStorage = {
  getItem: k => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = String(v); },
  removeItem: k => { delete mockLocalStorage[k]; }
};

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
  constructor() {}
  reset() {}
}

const mockStyle = {
  setProperty: () => {}
};

const mockElem = {
  innerText: '',
  classList: { add() {}, remove() {}, contains: () => false },
  style: mockStyle,
  addEventListener: () => {},
  removeEventListener: () => {}
};

const sandbox = {
  window: { addEventListener: () => {}, removeEventListener: () => {} },
  document: {
    createElement: () => mockCanvas,
    getElementById: id => (id === 'gameCanvas' ? mockCanvas : mockElem),
    querySelector: () => mockElem,
    querySelectorAll: () => []
  },
  localStorage,
  requestAnimationFrame: () => {},
  SpellManager: MockManager,
  EnemyManager: MockManager,
  ArtifactSystem: MockManager,
  DEFAULT_KEYBINDS: {},
  DEFAULT_TOUCH_CONFIG: {},
  MAP_DIFFICULTIES: {},
  Math,
  performance: { now: () => 1000 },
  console
};

const fnGame = new Function('window', 'document', 'localStorage', 'requestAnimationFrame', 'SpellManager', 'EnemyManager', 'ArtifactSystem', 'Math', 'performance', 'console', gameCode + '; return Game;');
const Game = fnGame(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.requestAnimationFrame, sandbox.SpellManager, sandbox.EnemyManager, sandbox.ArtifactSystem, Math, sandbox.performance, console);

console.log('1. Starting Game instance 1:');
const g1 = new Game();
console.log('Initial charId:', g1.selectedCharId);

console.log('2. User selects mereoleona:');
g1.selectedCharId = 'mereoleona';
localStorage.setItem('BC_SELECTED_HERO', 'mereoleona');
g1.saveGameData();

console.log('3. Simulating user closing web and reloading new Game instance 2:');
const g2 = new Game();
console.log('G2 charId after reload:', g2.selectedCharId);

if (g2.selectedCharId === 'mereoleona') {
  console.log('\n🎉 SUCCESS: Selected character [mereoleona] perfectly persisted across web reload! 🎉');
} else {
  console.error('\n❌ FAILED to persist character!');
  process.exit(1);
}
