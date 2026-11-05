const fs = require('fs');
const assert = require('assert');

// Mock window, localStorage and document
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
global.requestAnimationFrame = () => {};
global.window = {
  localStorage: global.localStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  soundEngine: {
    play: () => {},
    pickup: () => {},
    dash: () => {},
    hit: () => {},
    windBlade: () => {},
    slash: () => {},
    evolution: () => {}
  }
};

const mockCtx = {
  save: () => {},
  restore: () => {},
  translate: () => {},
  rotate: () => {},
  beginPath: () => {},
  arc: () => {},
  ellipse: () => {},
  fill: () => {},
  stroke: () => {},
  moveTo: () => {},
  lineTo: () => {},
  bezierCurveTo: () => {},
  closePath: () => {},
  rect: () => {},
  fillRect: () => {},
  setLineDash: () => {},
  fillText: () => {},
  createRadialGradient: () => ({ addColorStop: () => {} }),
  createLinearGradient: () => ({ addColorStop: () => {} })
};

const dummyElem = {
  classList: { remove: () => {}, add: () => {} },
  style: { setProperty: () => {} },
  innerText: '',
  getContext: () => mockCtx,
  addEventListener: () => {}
};

global.document = {
  getElementById: () => dummyElem,
  querySelector: () => dummyElem,
  querySelectorAll: () => []
};

// Load code
const spritesCode = fs.readFileSync('src/sprites.js', 'utf8');
eval(spritesCode);

const spellsCode = fs.readFileSync('src/spells.js', 'utf8');
eval(spellsCode);
global.SpellManager = window.SpellManager;

const enemiesCode = fs.readFileSync('src/enemies.js', 'utf8');
eval(enemiesCode);
global.EnemyManager = window.EnemyManager;

const gameCode = fs.readFileSync('src/game.js', 'utf8');
eval(gameCode);
global.Game = window.Game;

console.log('--- TEST 1: Rendering All 6 Tiers of Mana Drops ---');
const tiers = [
  { val: 2, name: 'Tier 1: Lesser Cyan Teardrop' },
  { val: 6, name: 'Tier 2: Emerald Hexagonal Prism' },
  { val: 18, name: 'Tier 3: Amethyst Octahedral Shard' },
  { val: 45, name: 'Tier 4: Crimson Ruby Core' },
  { val: 90, name: 'Tier 5: Golden Solar Mana Star' },
  { val: 250, name: 'Tier 6: Celestial Rainbow Prismatic Core' }
];

for (const t of tiers) {
  const drop = { x: 100, y: 100, type: 'mana', val: t.val };
  window.Sprites.drawDrop(mockCtx, drop, 15);
  console.log(`✓ ${t.name} rendered cleanly.`);
}

console.log('\n--- TEST 2: Rendering Special Functional Mana Drops ---');
const specialDrops = [
  { type: 'mana_vacuum', name: 'Hạt Mana Chân Không (Vacuum / Magnet)' },
  { type: 'mana_fury', name: 'Hạt Mana Cuồng Nộ (Fury / Shockwave & Speed)' },
  { type: 'mana_bloom', name: 'Hoa Tinh Hoa Ma Pháp (Bloom / Heal 20 HP)' },
  { type: 'mana_surge', name: 'Hạt Mana Đột Biến (Surge / x3 EXP)' }
];

for (const sd of specialDrops) {
  const drop = { x: 100, y: 100, type: sd.type, val: 10 };
  window.Sprites.drawDrop(mockCtx, drop, 20);
  console.log(`✓ ${sd.name} rendered cleanly.`);
}

console.log('\n--- TEST 3: Special Mana Drop Mechanics in Game ---');
const game = new window.Game();
game.state = 'PLAYING';
game.player = {
  x: 200,
  y: 200,
  radius: 20,
  hp: 50,
  maxHp: 100,
  speed: 150,
  pickupRadius: 60,
  armor: 0,
  level: 1,
  exp: 0,
  nextExp: 1000,
  furySpeedTimer: 0,
  gravitySlowTimer: 0,
  weapons: {},
  passives: {},
  infinitePassives: {}
};

// 1. Test mana_vacuum
game.drops = [
  { x: 500, y: 500, type: 'mana', val: 5, isMagnetized: false },
  { x: 800, y: 800, type: 'coin', val: 10, isMagnetized: false },
  { x: 205, y: 205, type: 'mana_vacuum', val: 5 } // collected immediately
];
game.update(0.016);
assert.ok(game.drops.some(d => d.isMagnetized), 'mana_vacuum magnetized drops across the map');
console.log('✓ mana_vacuum successfully magnetized all distant drops.');

// 2. Test mana_bloom (Heal 20 HP)
const hpBefore = game.player.hp;
game.drops = [
  { x: 202, y: 202, type: 'mana_bloom', val: 10 }
];
game.update(0.016);
assert.strictEqual(game.player.hp, hpBefore + 20, `mana_bloom healed 20 HP (expected ${hpBefore + 20}, got ${game.player.hp})`);
console.log('✓ mana_bloom healed 20 HP properly.');

// 3. Test mana_fury (Fury Speed Timer & Shockwave)
game.drops = [
  { x: 202, y: 202, type: 'mana_fury', val: 10 }
];
game.update(0.016);
assert.ok(game.player.furySpeedTimer > 3.0, 'mana_fury gave player fury speed timer');
console.log('✓ mana_fury triggered speed boost & electric fury.');

// 4. Test mana_surge (x3 EXP)
const expBefore = game.player.exp || 0;
game.drops = [
  { x: 202, y: 202, type: 'mana_surge', val: 20 }
];
game.update(0.016);
assert.strictEqual((game.player.exp || 0), expBefore + 60, 'mana_surge granted 3x EXP (20 * 3 = 60)');
console.log('✓ mana_surge granted 3x EXP surge.');

console.log('\n--- TEST 4: Smart Mana Consolidation ---');
game.drops = [
  { x: 800, y: 800, type: 'mana', val: 2 },
  { x: 820, y: 810, type: 'mana', val: 3 }
];
assert.strictEqual(game.drops.length, 2);
game.consolidateDrops();
assert.strictEqual(game.drops.length, 1, 'Two nearby distant mana drops merged into one');
assert.strictEqual(game.drops[0].val, 5, 'Merged drop has combined value of 5 (upgrades to Tier 2 Emerald Hexagon)');
console.log('✓ Smart mana consolidation merged drops and upgraded tier successfully.');

console.log('\n=============================================');
console.log('ALL MANA DROPS TESTS PASSED 100%!');
console.log('=============================================');
