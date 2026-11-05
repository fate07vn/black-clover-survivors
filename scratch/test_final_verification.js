const fs = require('fs');

// Mock DOM
const mockCtx = {
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  beginPath: () => {},
  arc: () => {},
  rect: () => {},
  roundRect: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  fill: () => {},
  stroke: () => {},
  fillText: () => {},
  setLineDash: () => {},
  ellipse: () => {},
  drawImage: () => {},
  clearRect: () => {},
  createRadialGradient: () => ({ addColorStop: () => {} }),
  createLinearGradient: () => ({ addColorStop: () => {} })
};

const mockElements = {};
function createMockElement(id) {
  return {
    id,
    classList: {
      add: () => {},
      remove: () => {},
      contains: () => false
    },
    style: {
      setProperty: () => {}
    },
    innerHTML: '',
    textContent: '',
    children: [],
    appendChild: function(c) { this.children.push(c); },
    addEventListener: () => {},
    getContext: () => mockCtx,
    width: 1280,
    height: 720
  };
}

const storage = {};
global.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

global.requestAnimationFrame = () => {};

global.window = {
  localStorage: global.localStorage,
  soundEngine: {
    select: () => {},
    chestOpen: () => {},
    evolution: () => {},
    levelUp: () => {},
    hit: () => {},
    dash: () => {}
  },
  addEventListener: () => {},
  requestAnimationFrame: global.requestAnimationFrame
};

global.document = {
  getElementById: (id) => {
    if (!mockElements[id]) mockElements[id] = createMockElement(id);
    return mockElements[id];
  },
  querySelector: (sel) => createMockElement(sel),
  querySelectorAll: (sel) => [],
  createElement: (tag) => createMockElement(tag),
  addEventListener: () => {}
};

// Load artifacts
const artifactsJs = fs.readFileSync('src/artifacts.js', 'utf8');
eval(artifactsJs);
global.ArtifactSystem = window.ArtifactSystem;
global.ARTIFACT_DEFS = window.ARTIFACT_DEFS;
global.IN_RUN_ARTIFACT_DEFS = window.IN_RUN_ARTIFACT_DEFS;

console.log('1. Checking Artifact Defs...');
const lobbyKeys = Object.keys(window.ARTIFACT_DEFS || {});
const inRunKeys = Object.keys(window.IN_RUN_ARTIFACT_DEFS || {});
console.log(`Lobby artifacts: ${lobbyKeys.length} (expected 14)`);
console.log(`In-run artifacts: ${inRunKeys.length} (expected 18)`);
if (lobbyKeys.length !== 14 || inRunKeys.length !== 18) {
  throw new Error('Artifact counts mismatch!');
}

// Ensure 0 overlap
const overlap = lobbyKeys.filter(k => inRunKeys.includes(k));
console.log(`Artifact overlap: ${overlap.length} (expected 0)`);
if (overlap.length !== 0) {
  throw new Error('Found overlap between lobby and in-run artifacts: ' + overlap.join(', '));
}

// Load spells
const spellsJs = fs.readFileSync('src/spells.js', 'utf8');
eval(spellsJs);
global.SpellManager = window.SpellManager;
global.SPELL_DEFS = window.SPELL_DEFS;

// Load enemies
const enemiesJs = fs.readFileSync('src/enemies.js', 'utf8');
eval(enemiesJs);
global.EnemyManager = window.EnemyManager;
global.ENEMY_DEFS = window.ENEMY_DEFS;

// Load game
const gameJs = fs.readFileSync('src/game.js', 'utf8');
eval(gameJs);
global.Game = window.Game;

console.log('\n2. Testing Game initialization...');
const game = new window.Game();
game.canvas = createMockElement('gameCanvas');
game.ctx = mockCtx;
game.player = {
  x: 500,
  y: 500,
  hp: 200,
  maxHp: 200,
  level: 10,
  nextExp: 300,
  exp: 50,
  weapons: {},
  passives: {},
  charId: 'sylph'
};
game.artifacts = new window.ArtifactSystem(game);
game.drops = [
  { type: 'chest', x: 1500, y: 1500, radius: 24, val: 500 }
];

console.log('\n3. Testing Treasure Chest Opening...');
game.openTreasureChest();
console.log(`Chosen artifacts:`, game.currentChestChoices);
console.log(`Selected card index: ${game.selectedChestIndex} (expected 1)`);
if (game.currentChestChoices.length !== 3 || game.selectedChestIndex !== 1) {
  throw new Error('Chest selection failed!');
}

console.log('\n4. Testing SVG Art generation...');
const magitechSvg = game.getArtifactArtSvg('magitech_module');
const crossSvg = game.getArtifactArtSvg('holy_cross');
const backpackSvg = game.getArtifactArtSvg('dimensional_backpack');
if (!magitechSvg || !magitechSvg.includes('stroke="#22c55e"')) throw new Error('Magitech SVG missing green sparks!');
if (!crossSvg || !crossSvg.includes('fill="#e11d48"')) throw new Error('Cross SVG missing ruby gems!');
if (!backpackSvg || !backpackSvg.includes('fill="#d97706"')) throw new Error('Backpack SVG missing tan leather body!');
console.log('SVG Art generation passed!');

console.log('\n5. Testing In-Run Artifact Collection...');
const beforeCollectionKeys = Object.keys(game.artifacts.collection);
game.obtainChestArtifact();
const afterCollectionKeys = Object.keys(game.artifacts.collection);
console.log(`In-run artifacts count: ${game.artifacts.inRunArtifacts.length}`);
console.log(`Collection keys before: ${beforeCollectionKeys.length}, after: ${afterCollectionKeys.length}`);
if (game.artifacts.inRunArtifacts.length !== 1) throw new Error('In-run artifact not stored in inRunArtifacts!');
if (beforeCollectionKeys.length !== afterCollectionKeys.length) {
  throw new Error('CRITICAL: In-run artifact leaked into permanent lobby collection!');
}

console.log('\n6. Testing Compass Pointer to Chest...');
game.state = 'PLAYING';
game.drawChestDirectionPointers(mockCtx);
console.log('Compass pointer rendered without errors!');
const compassEl = document.getElementById('chestCompassDist');
console.log('HUD compass distance text:', compassEl.textContent);

console.log('\n7. Testing Sylph 3-Stage Attacks...');
// Stage 1
game.player.weapons = { sylph_spirits: { level: 2 } };
game.spells.castSpell('sylph_spirits', 2);
console.log(`Stage 1 executed!`);

// Stage 2
game.player.weapons = { spirit_magic_blade: { level: 1 } };
game.spells.castSpell('spirit_magic_blade', 1);
console.log(`Stage 2 executed!`);

// Stage 3
game.player.weapons = { spirit_familiar: { level: 1 } };
game.spells.castSpell('spirit_familiar', 1);
console.log(`Stage 3 executed!`);

console.log('\n🎉 ALL VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
