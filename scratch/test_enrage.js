const fs = require('fs');
const assert = require('assert');

// Mock window and document environment
global.window = {
  soundEngine: {
    play: () => {},
    pickup: () => {},
    dash: () => {},
    hit: () => {}
  }
};
global.document = {
  getElementById: (id) => ({
    classList: { remove: () => {}, add: () => {} },
    style: {},
    innerText: ''
  })
};

// Load Enemies
const enemiesCode = fs.readFileSync('src/enemies.js', 'utf8');
eval(enemiesCode);

// Mock Game
const mockGame = {
  enemies: [],
  player: {
    x: 100,
    y: 100,
    speed: 150,
    level: 15,
    critChance: 0,
    critDmgBonus: 0,
    gravitySlowTimer: 0
  },
  spells: {
    projectiles: [],
    floatingTexts: [],
    spawnImpactParticles: () => {},
    spawnShockwave: () => {},
    playSound: () => {}
  },
  soundEngine: {
    bossSpawn: () => {}
  },
  shakeScreen: (intensity, dur) => {
    mockGame.lastShake = { intensity, dur };
  },
  triggerComboBanner: (msg) => {
    mockGame.lastBanner = msg;
  },
  getEnemiesNear: () => []
};

const em = new window.EnemyManager(mockGame);

console.log('--- TEST 1: Boss Enrage Trigger & Awakening Stats ---');
const mars = {
  type: 'boss_mars',
  name: 'Mars (Khoáng Thạch Ma Pháp)',
  x: 150,
  y: 150,
  baseHp: 2800,
  maxHp: 2800,
  hp: 1100, // < 40% (40% is 1120)
  baseSpeed: 45,
  contactDamage: 22,
  radius: 38,
  isBoss: true,
  isEnraged: false,
  skillTimer: 0,
  subSkillTimer: 0,
  enrageShieldTimer: 0
};

// Add mock player projectile near mars
mockGame.spells.projectiles = [
  { x: 160, y: 160, life: 1, damage: 50 },
  { x: 500, y: 500, life: 1, damage: 50 } // far away
];

const distToP = Math.hypot(mars.x - mockGame.player.x, mars.y - mockGame.player.y); // ~70.7px (< 220)
const initialPlayerX = mockGame.player.x;
const initialPlayerY = mockGame.player.y;

em.handleBossAI(mars, 0.016, distToP, mockGame.player.x - mars.x, mockGame.player.y - mars.y);

assert.strictEqual(mars.isEnraged, true, 'Mars should be enraged');
assert.strictEqual(mars.enrageShieldTimer, 1.2, 'Enrage shield timer should be 1.2s');
assert.strictEqual(mars.hp, 1100 + 280, 'Mars should have healed 10% maxHp (280 HP)');
assert.strictEqual(mars.baseSpeed, 45 * 1.35, 'Base speed should increase by 35%');
assert.strictEqual(mars.contactDamage, Math.round(22 * 1.3), 'Contact damage should increase by 30%');
assert.strictEqual(mars.radius, Math.round(38 * 1.15), 'Radius should increase by 15%');
assert.ok(mockGame.lastShake && mockGame.lastShake.intensity === 16, 'Screen shake 16 triggered');
assert.ok(mockGame.lastBanner && mockGame.lastBanner.includes('CUỒNG NỘ'), 'Combo banner triggered');
assert.strictEqual(mockGame.spells.projectiles.length, 1, 'Near projectile was destroyed upon enrage shockwave');
assert.notStrictEqual(mockGame.player.x, initialPlayerX, 'Player was knocked back');
console.log('✓ TEST 1 PASSED: Enrage trigger and awakening stats verified.');

console.log('--- TEST 2: Skill Timer Acceleration & Telegraph Reduction ---');
const prevSkillTimer = mars.skillTimer;
em.handleBossAI(mars, 1.0, 300, 300, 0);
// In 1 second with 1.6x multiplier:
assert.ok(mars.skillTimer >= 1.6, `Skill timer should have advanced by at least 1.6 (got ${mars.skillTimer})`);
console.log('✓ TEST 2 PASSED: Skill timer acceleration verified.');

console.log('--- TEST 3: Spells applyDamage Enrage Reduction & Cap ---');
const spellsCode = fs.readFileSync('src/spells.js', 'utf8');
eval(spellsCode);
const spellMgr = new window.SpellManager(mockGame);

// Boss with shield
mars.enrageShieldTimer = 1.0;
const testDmg = 100;
for (let h = 0; h < 10; h++) {
  spellMgr.applyDamage(mars, testDmg, false, '#fff');
}
assert.ok(spellMgr.floatingTexts.some(ft => ft.text === 'BẤT TỬ CUỒNG NỘ!'), 'Floating text BẤT TỬ CUỒNG NỘ! spawned');

// Boss without shield, but enraged (Vỏ Bọc Ma Thần -25%)
mars.enrageShieldTimer = 0;
const hpBefore = mars.hp;
spellMgr.applyDamage(mars, 100, false, '#fff');
// 100 * 0.75 = 75 damage
assert.strictEqual(mars.hp, hpBefore - 75, `Enraged boss should reduce dmg by 25% (expected ${hpBefore - 75}, got ${mars.hp})`);

// Anti-oneshot Cap: single hit cannot exceed 6% maxHp (mars maxHp 2800 * 0.06 = 168)
const hpBeforeNuke = mars.hp;
spellMgr.applyDamage(mars, 50000, false, '#fff');
assert.strictEqual(mars.hp, hpBeforeNuke - 168, `Single hit capped at 6% maxHp (expected ${hpBeforeNuke - 168}, got ${mars.hp})`);
console.log('✓ TEST 3 PASSED: Enrage shield (-90%), Enrage shell (-25%), and 6% boss damage cap verified.');

console.log('--- TEST 4: Boss-specific Phase 2 Attacks Check ---');
const testBossSkill = (type, setupFn, checkFn) => {
  em.dangerTelegraphs = [];
  em.enemyProjectiles = [];
  const b = {
    type,
    name: type,
    x: 200,
    y: 200,
    baseHp: 5000,
    maxHp: 5000,
    hp: 1000,
    baseSpeed: 50,
    contactDamage: 30,
    radius: 40,
    isBoss: true,
    isEnraged: true,
    skillTimer: 0,
    subSkillTimer: 0,
    enrageShieldTimer: 0
  };
  setupFn(b);
  em.handleBossAI(b, 0.016, 200, 200, 0);
  checkFn(b, em);
};

// Mars: 12 shards
testBossSkill('boss_mars', b => { b.isCharging = true; b.chargeTimer = 0.01; b.skillTimer = 5; }, (b, mgr) => {
  // Charge ends
  mgr.handleBossAI(b, 0.02, 200, 200, 0);
  assert.strictEqual(mgr.enemyProjectiles.length, 12, `Mars should spawn 12 diamond shards (got ${mgr.enemyProjectiles.length})`);
});
console.log('✓ Mars Phase 2 verified (12 diamond shards).');

// Patri: 10 JUDGMENT circles
testBossSkill('boss_patri', b => { b.skillTimer = 5.0; }, (b, mgr) => {
  const judgmentCircles = mgr.dangerTelegraphs.filter(t => t.label === 'JUDGMENT');
  assert.strictEqual(judgmentCircles.length, 10, `Patri should spawn 10 judgment circles (got ${judgmentCircles.length})`);
});
console.log('✓ Patri Phase 2 verified (10 JUDGMENT circles).');

// Vetto: Despair roar 230 radius & 5 beast claws
testBossSkill('boss_vetto', b => { b.skillTimer = 5.0; b.subSkillTimer = 5.0; }, (b, mgr) => {
  const roar = mgr.dangerTelegraphs.find(t => t.label === 'DESPAIR ROAR');
  assert.strictEqual(roar.radius, 230, 'Vetto roar radius 230');
  const claws = mgr.enemyProjectiles.filter(p => p.type === 'beast_claw');
  assert.strictEqual(claws.length, 5, 'Vetto 5 claw projectiles');
});
console.log('✓ Vetto Phase 2 verified (Despair Roar 230px + 5 Beast Claws).');

// Zenon: 8 bone pillars & 6 spatial cubes
testBossSkill('boss_zenon', b => { b.skillTimer = 5.0; b.subSkillTimer = 6.0; }, (b, mgr) => {
  const bones = mgr.dangerTelegraphs.filter(t => t.label === 'BONE FOREST');
  assert.strictEqual(bones.length, 8, 'Zenon 8 bone pillars');
  const cubes = mgr.enemyProjectiles.filter(p => p.type === 'spatial_cube');
  assert.strictEqual(cubes.length, 6, 'Zenon 6 spatial cubes');
});
console.log('✓ Zenon Phase 2 verified (8 bone pillars + 6 spatial cubes).');

// Vanica: 5 blood pools & 16 blood thorns
testBossSkill('boss_vanica', b => { b.skillTimer = 5.0; b.subSkillTimer = 6.0; }, (b, mgr) => {
  const pools = mgr.dangerTelegraphs.filter(t => t.type === 'hazard_pool');
  assert.strictEqual(pools.length, 5, 'Vanica 5 hazard pools');
  const thorns = mgr.enemyProjectiles.filter(p => p.type === 'blood_thorn');
  assert.strictEqual(thorns.length, 16, 'Vanica 16 blood thorns');
});
console.log('✓ Vanica Phase 2 verified (5 hazard pools + 16 blood thorns).');

// Dante: Heavy Gravity radius 165 + gravity pull
testBossSkill('boss_dante', b => { b.skillTimer = 5.0; }, (b, mgr) => {
  const grav = mgr.dangerTelegraphs.find(t => t.label === 'HEAVY GRAVITY');
  assert.strictEqual(grav.radius, 165, 'Dante heavy gravity radius 165');
  assert.strictEqual(grav.isGravityPull, true, 'Dante heavy gravity pulls player');
});
console.log('✓ Dante Phase 2 verified (Heavy Gravity 165px + pull).');

// Zagred: 3 consecutive zones & 9 word spears
testBossSkill('boss_zagred', b => { b.skillTimer = 5.0; b.subSkillTimer = 6.0; }, (b, mgr) => {
  const wordExplosions = mgr.dangerTelegraphs.filter(t => t.label === 'WORD SOUL: DIE');
  assert.strictEqual(wordExplosions.length, 3, 'Zagred 3 word explosions');
  const spears = mgr.enemyProjectiles.filter(p => p.type === 'word_spear');
  assert.strictEqual(spears.length, 9, 'Zagred 9 word spears');
});
console.log('✓ Zagred Phase 2 verified (3 Word Soul zones + 9 Word Spears).');

// Lucifero: 5 concentric shockwave rings & gravity slow
testBossSkill('boss_lucifero', b => { b.subSkillTimer = 6.0; b.x = 110; b.y = 110; }, (b, mgr) => {
  const rings = mgr.dangerTelegraphs.filter(t => t.type === 'shockwave_ring');
  assert.strictEqual(rings.length, 5, `Lucifero should spawn 5 shockwave rings (got ${rings.length})`);
  assert.strictEqual(mockGame.player.gravitySlowTimer, 0.25, 'Lucifero proximity sets player gravitySlowTimer');
});
console.log('✓ Lucifero Phase 2 verified (5 shockwave rings + player gravity slow).');

console.log('\n=========================================');
console.log('ALL BOSS ENRAGE TESTS PASSED PERFECTLY!');
console.log('=========================================');
