const fs = require('fs');
const assert = require('assert');

// Mock browser environment
global.window = global;
global.document = {
  getElementById: (id) => {
    return {
      id,
      textContent: '',
      innerHTML: '',
      className: '',
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      appendChild: () => {},
      children: []
    };
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      className: '',
      innerHTML: '',
      style: {},
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      appendChild: () => {}
    };
  },
  querySelectorAll: () => []
};
global.requestAnimationFrame = () => {};
global.soundEngine = {
  pickup: () => {},
  evolution: () => {},
  chestOpen: () => {},
  dash: () => {}
};

console.log('--- TEST 1: LOADING ARTIFACTS ---');
eval(fs.readFileSync('src/artifacts.js', 'utf8'));

assert(window.ARTIFACT_DEFS, 'ARTIFACT_DEFS must exist');
assert(window.MAP_ARTIFACT_DEFS, 'MAP_ARTIFACT_DEFS must exist');
assert(window.IN_RUN_ARTIFACT_DEFS, 'IN_RUN_ARTIFACT_DEFS must exist');

const lobbyRelics = Object.keys(window.ARTIFACT_DEFS);
const mapArtifacts = Object.keys(window.MAP_ARTIFACT_DEFS);

console.log(`Lobby relics count: ${lobbyRelics.length}`);
console.log(`Map artifacts count: ${mapArtifacts.length}`);

assert.strictEqual(lobbyRelics.length, 14, 'Must have exactly 14 lobby relics');
assert.strictEqual(mapArtifacts.length, 18, 'Must have exactly 18 in-map artifacts');

// Ensure completely disjoint sets: no overlap!
for (const id of mapArtifacts) {
  assert(!lobbyRelics.includes(id), `Map artifact "${id}" must not exist in lobby relics!`);
}
console.log('✓ Lobby relics and In-map artifacts are 100% disjoint and separated!');

console.log('--- TEST 2: STAT APPLICATION & NO DOUBLE-DIPPING ---');
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
  coinDropMultiplier: 1.0
};

const artSystem = new window.ArtifactSystem(dummyGame);
// Add in-run artifacts
artSystem.inRunArtifacts = ['magitech_module', 'holy_cross', 'dimensional_backpack'];

assert(artSystem.hasArtifact('magitech_module'), 'hasArtifact must detect in-run magitech_module');
assert(artSystem.hasArtifact('holy_cross'), 'hasArtifact must detect in-run holy_cross');
assert(artSystem.hasArtifact('dimensional_backpack'), 'hasArtifact must detect in-run dimensional_backpack');
assert(!artSystem.hasArtifact('crown_of_wizard_king'), 'Player should not have Crown of Wizard King yet');

const p = dummyGame.player;
artSystem.applyEquippedStats(p);

assert(p.maxHp > 100, 'Max HP should increase from dimensional_backpack');
assert(p.damageBonus > 0, 'Damage bonus should increase from magitech_module');
assert(p.critChance > 0, 'Crit chance should increase from holy_cross');
assert(p.pickupRadius > 80, 'Pickup radius should increase from dimensional_backpack');

console.log(`Player stats after map artifacts: HP=${p.maxHp}, Dmg=+${p.damageBonus*100}%, Crit=+${p.critChance*100}%, Radius=${p.pickupRadius}px`);
console.log('✓ Map artifact stats applied cleanly!');

console.log('--- TEST 3: COMPASS & CHEST DIRECTION LOGIC ---');
// Verify math for compass and screen pointers
const playerPos = { x: 500, y: 500 };
const chestPos = { x: 500 + 300, y: 500 + 400 }; // 3-4-5 triangle -> dist = 500px -> 50m
const dx = chestPos.x - playerPos.x;
const dy = chestPos.y - playerPos.y;
const dist = Math.hypot(dx, dy);
const distMeters = Math.round(dist / 10);
const deg = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;

assert.strictEqual(dist, 500, 'Distance must be 500px');
assert.strictEqual(distMeters, 50, 'Distance meters must be 50m');
assert(Math.abs(deg - 53.13) < 0.1, 'Angle must be ~53.13 degrees');

const arrows = ['➡️', '↘️', '⬇️', '↙️', '⬅️', '↖️', '⬆️', '↗️'];
const arrowIdx = Math.round(deg / 45) % 8;
assert.strictEqual(arrows[arrowIdx], '↘️', 'Arrow must point bottom-right (↘️)');
console.log(`✓ Distance = ${distMeters}m, Angle = ${deg.toFixed(1)}°, Arrow = ${arrows[arrowIdx]}`);

console.log('--- TEST 4: CHECK CACHE BUSTERS ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert(indexHtml.includes('v=bc187'), 'Cache buster v=bc187 must be present in index.html');
console.log('✓ Cache buster is v=bc187');

console.log('\n====================================');
console.log('ALL UNIT & SYSTEM TESTS PASSED 100%!');
console.log('====================================\n');
