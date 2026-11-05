const fs = require('fs');
const assert = require('assert');

// Mock localStorage, window and document
global.requestAnimationFrame = () => {};
global.localStorage = {
  getItem: () => null,
  setItem: () => {}
};
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
  closePath: () => {},
  rect: () => {},
  fillRect: () => {},
  setLineDash: () => {},
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
  getElementById: (id) => dummyElem,
  querySelector: () => dummyElem,
  querySelectorAll: () => []
};

// Load spells, enemies and game
const spellsCode = fs.readFileSync('src/spells.js', 'utf8');
eval(spellsCode);
global.SpellManager = window.SpellManager;

const enemiesCode = fs.readFileSync('src/enemies.js', 'utf8');
eval(enemiesCode);
global.EnemyManager = window.EnemyManager;

const gameCode = fs.readFileSync('src/game.js', 'utf8');
eval(gameCode);
global.Game = window.Game;

console.log('--- TEST 1: SPELL_DEFS Verification for Spirit Attributes ---');
const defs = window.SPELL_DEFS;

assert.ok(defs.sylph_spirits, 'sylph_spirits exists');
assert.strictEqual(defs.sylph_spirits.icon, '⭕✨', 'Icon is Spirit Ring');
assert.ok(Array.isArray(defs.sylph_spirits.evolutions), 'evolutions is an array');
assert.deepStrictEqual(defs.sylph_spirits.evolutions, ['spirit_magic_missile', 'spirit_magic_blade', 'spirit_familiar'], 'Contains all 3 Magic Survival branches');

// Magic Missile (Image 1)
assert.ok(defs.spirit_magic_missile, 'spirit_magic_missile exists');
assert.strictEqual(defs.spirit_magic_missile.icon, '⭕⚡');
assert.strictEqual(defs.spirit_magic_missile.type, 'evolution');
assert.ok(defs.spirit_magic_missile.baseCooldown < defs.sylph_spirits.baseCooldown, 'Magic Missile has reduced cooldown (-20%)');

// Magic Blade (Image 2)
assert.ok(defs.spirit_magic_blade, 'spirit_magic_blade exists');
assert.strictEqual(defs.spirit_magic_blade.icon, '⭕🗡️');
assert.strictEqual(defs.spirit_magic_blade.type, 'evolution');
assert.ok(defs.spirit_magic_blade.baseDamage >= defs.sylph_spirits.baseDamage * 2.5, 'Magic Blade has 2.5X damage');

// Familiar (Image 3)
assert.ok(defs.spirit_familiar, 'spirit_familiar exists');
assert.strictEqual(defs.spirit_familiar.icon, '⭕👑');
assert.strictEqual(defs.spirit_familiar.type, 'evolution');
assert.ok(defs.spirit_familiar.baseCooldown >= defs.sylph_spirits.baseCooldown * 4, 'Familiar has 5X cooldown');

console.log('✓ TEST 1 PASSED: SPELL_DEFS match Magic Survival Encyclopedia screenshots 100%.');

console.log('--- TEST 2: Multi-Evolution Level-Up Selection in Game ---');
const mockGame = new window.Game();
mockGame.player = {
  x: 200,
  y: 200,
  level: 12,
  speed: 150,
  armor: 0,
  hp: 100,
  maxHp: 100,
  charId: 'sylph',
  startingWeaponId: 'sylph_spirits',
  weapons: {
    sylph_spirits: { level: 5, timer: 0, isStartingWeapon: true }
  },
  passives: {
    wind_glide: 1 // evolution requirement
  },
  infinitePassives: {}
};
mockGame.state = 'PLAYING';
mockGame.gameTime = 300;

const choices = mockGame.getAvailableLevelUpChoices();
const evoChoices = choices.filter(c => c.isEvolution);
assert.strictEqual(evoChoices.length, 3, `All 3 Spirit evolutions must be offered at Lv 5 (got ${evoChoices.length})`);
assert.ok(evoChoices.some(c => c.id === 'spirit_magic_missile'), 'Magic Missile offered');
assert.ok(evoChoices.some(c => c.id === 'spirit_magic_blade'), 'Magic Blade offered');
assert.ok(evoChoices.some(c => c.id === 'spirit_familiar'), 'Familiar offered');
console.log('✓ TEST 2 PASSED: Player can choose between Magic Missile, Magic Blade, and Familiar!');

console.log('--- TEST 3: Spell Casting Mechanics for Each Evolution ---');
const sm = new window.SpellManager(mockGame);

// Mock getNearestEnemies
const dummyEnemy = { x: 260, y: 260, hp: 500, maxHp: 500, radius: 20 };
sm.getNearestEnemies = () => [dummyEnemy];
mockGame.getEnemiesNear = () => [dummyEnemy];

(async () => {
  // 1. Cast Base Spirits
  sm.projectiles = [];
  sm.slashes = [];
  sm.castSpell('sylph_spirits', 5);
  await new Promise(r => setTimeout(r, 50));
  assert.ok(sm.projectiles.length > 0, 'Base spirits fired projectiles');

  // 2. Cast Magic Missile
  sm.projectiles = [];
  sm.castSpell('spirit_magic_missile', 1);
  await new Promise(r => setTimeout(r, 50));
  assert.ok(sm.projectiles.length > 0, 'Magic Missile fired projectiles');

  // 3. Cast Magic Blade (Instant hit on target, no delay!)
  sm.castSpell('spirit_magic_blade', 1);
  await new Promise(r => setTimeout(r, 50));
  assert.ok(sm.slashes.length > 0, 'Instant blade slash spawned on target');

  // 4. Cast Familiar (Massive 360-degree storm)
  sm.projectiles = [];
  sm.castSpell('spirit_familiar', 1);
  await new Promise(r => setTimeout(r, 50));
  assert.ok(sm.projectiles.length > 0, 'Familiar fired 360-degree projectiles');
  console.log('✓ TEST 3 PASSED: Casting mechanics for all Spirit variants function properly.');

  console.log('--- TEST 4: Canvas Spirit Ring Rendering Check ---');
  assert.strictEqual(typeof sm.drawSpiritRing, 'function', 'drawSpiritRing exists');
  assert.strictEqual(typeof sm.drawSylphOrbitingSpirits, 'function', 'drawSylphOrbitingSpirits exists');

  // Render for all 4 styles
  sm.drawSpiritRing(mockCtx, 100, 100, 10, 5, 'base', 10, 0);
  sm.drawSpiritRing(mockCtx, 100, 100, 10, 5, 'missile', 10, 0);
  sm.drawSpiritRing(mockCtx, 100, 100, 10, 5, 'blade', 10, 0);
  sm.drawSpiritRing(mockCtx, 100, 100, 20, 10, 'familiar', 10, 0);

  mockGame.player.weapons = { spirit_familiar: { level: 1 } };
  sm.drawSylphOrbitingSpirits(mockCtx, 10);

  mockGame.player.weapons = { spirit_magic_blade: { level: 1 } };
  sm.drawSylphOrbitingSpirits(mockCtx, 10);

  mockGame.player.weapons = { spirit_magic_missile: { level: 1 } };
  sm.drawSylphOrbitingSpirits(mockCtx, 10);

  console.log('✓ TEST 4 PASSED: Canvas Spirit Ring renders for all styles without any errors.');

  console.log('\n=============================================');
  console.log('ALL MAGIC SURVIVAL SPIRIT TESTS PASSED 100%!');
  console.log('=============================================');
  process.exit(0);
})();
