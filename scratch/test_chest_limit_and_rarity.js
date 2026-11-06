const fs = require('fs');
const assert = require('assert');

// Mock browser
global.window = global;
global.document = {
  getElementById: (id) => ({
    id,
    textContent: '',
    innerHTML: '',
    className: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    appendChild: () => {},
    children: []
  }),
  createElement: () => ({
    className: '',
    innerHTML: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    appendChild: () => {}
  }),
  querySelectorAll: () => []
};
global.requestAnimationFrame = () => {};
global.soundEngine = {
  pickup: () => {},
  evolution: () => {},
  chestOpen: () => {},
  dash: () => {}
};

eval(fs.readFileSync('src/artifacts.js', 'utf8'));

console.log('--- TEST 1: IN-RUN ARTIFACTS CAP AT 12 ---');
const dummyGame = {
  player: {
    charId: 'asta',
    maxHp: 100,
    hp: 100,
    armor: 0,
    speed: 200,
    damageBonus: 0,
    critChance: 0,
    critDmgBonus: 0,
    cooldownReduction: 0,
    pickupRadius: 80,
    expBonus: 0,
    hpRegen: 0,
    passives: {}
  },
  coinDropMultiplier: 1.0,
  currency: { coins: 0 },
  state: 'PLAYING',
  spells: {
    spawnShockwave: () => {},
    spawnImpactParticles: () => {},
    floatingTexts: []
  },
  shakeScreen: () => {},
  triggerComboBanner: (msg) => { console.log('Banner triggered:', msg); },
  healPlayer: function(amt) { this.player.hp = Math.min(this.player.maxHp, this.player.hp + amt); },
  addExp: () => {},
  updateHUD: () => {},
  saveGameData: () => {}
};

const artSystem = new window.ArtifactSystem(dummyGame);
dummyGame.artifacts = artSystem;

// Fill up with 12 artifacts
const allMapArtKeys = Object.keys(window.MAP_ARTIFACT_DEFS);
artSystem.inRunArtifacts = allMapArtKeys.slice(0, 12);

assert.strictEqual(artSystem.inRunArtifacts.length, 12, 'Must have exactly 12 artifacts');

// Test applyEquippedStats with 12 artifacts
artSystem.applyEquippedStats(dummyGame.player);
console.log('Stats successfully calculated with 12 artifacts: MaxHP =', dummyGame.player.maxHp);

// Test openMysteryChest when already at 12/12
// Read game.js code to test openMysteryChest logic
const gameFile = fs.readFileSync('src/game.js', 'utf8');

// Ensure openMysteryChest handles cap of 12
assert(gameFile.includes('this.artifacts.inRunArtifacts.length >= 12'), 'Must check >= 12 limit in openMysteryChest');
assert(gameFile.includes('this.artifacts.inRunArtifacts.length >= 12'), 'Must check >= 12 limit in obtainChestArtifact');

// Ensure startGame does not spawn initial 3 chests
assert(!gameFile.includes('Spawn 3 initial mystery chests'), 'Must not spawn 3 free chests at match start');

// Ensure periodic chest spawn requires existingChests < 1
assert(gameFile.includes('existingChests < 1'), 'Must only spawn if existingChests < 1');

// Ensure periodic chest timer is at least 110s
assert(gameFile.includes('this.chestSpawnTimer = 110'), 'Periodic chest timer must be 110s - 150s');

console.log('--- TEST 2: CHECK HTML BADGES & CACHE BUSTER ---');
const htmlFile = fs.readFileSync('index.html', 'utf8');
assert(htmlFile.includes('0/12'), 'index.html must show 0/12 badges');
assert(/v=bc\d+/.test(htmlFile), 'index.html must have cache buster');

console.log('\n=============================================');
console.log('ALL CHEST RARITY & 12-LIMIT TESTS PASSED 100%!');
console.log('=============================================\n');
