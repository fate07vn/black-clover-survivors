const fs = require('fs');
const path = require('path');

const gameCode = fs.readFileSync(path.join(__dirname, '../src/game.js'), 'utf8');

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

console.log('--- TESTING CHARACTER SELECTION PERSISTENCE ---');
const g1 = new Game();
console.log('Initial charId:', g1.selectedCharId);

// User selects mereoleona
g1.selectedCharId = 'mereoleona';
localStorage.setItem('BC_SELECTED_HERO', 'mereoleona');
g1.saveGameData();

// User reloads page
const g2 = new Game();
console.log('After page reload charId:', g2.selectedCharId);

if (g2.selectedCharId !== 'mereoleona') {
  console.error('❌ FAILED: Character selection did not persist!');
  process.exit(1);
} else {
  console.log('✓ Character persistence test passed!');
}
