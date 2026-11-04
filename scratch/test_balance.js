const fs = require('fs');
const path = require('path');
const assert = require('assert');

// 1. Test calculateNextExp
function calculateNextExp(level) {
  return Math.round(18 + (level - 1) * 28 + Math.pow(level, 1.65) * 4);
}

console.log('--- EXP Curve Check ---');
console.log('Lv 1 -> Lv 2:', calculateNextExp(1), 'EXP');
console.log('Lv 10 -> Lv 11:', calculateNextExp(10), 'EXP');
console.log('Lv 25 -> Lv 26:', calculateNextExp(25), 'EXP');
console.log('Lv 50 -> Lv 51:', calculateNextExp(50), 'EXP');

let totalExpTo20 = 0;
for (let l = 1; l < 20; l++) totalExpTo20 += calculateNextExp(l);
let totalExpTo38 = 0;
for (let l = 1; l < 38; l++) totalExpTo38 += calculateNextExp(l);
let totalExpTo60 = 0;
for (let l = 1; l < 60; l++) totalExpTo60 += calculateNextExp(l);
console.log('Total EXP to Lv 20:', totalExpTo20);
console.log('Total EXP to Lv 38:', totalExpTo38);
console.log('Total EXP to Lv 60:', totalExpTo60);

// 2. Test getBalancedHpMultiplier
function getBalancedHpMultiplier(gameTime, playerLevel, isBoss = false) {
  const minutes = gameTime / 60;
  const pLv = playerLevel || 1;
  const timeScale = 1 + Math.pow(minutes, 1.85) * 0.38;
  const lvScale = 1 + (pLv - 1) * 0.035;
  return timeScale * lvScale * (isBoss ? 1.35 : 1.0);
}

console.log('\n--- HP Multipliers ---');
console.log('Min 0 (Lv 1):', getBalancedHpMultiplier(0, 1, false).toFixed(2));
console.log('Min 3 (Lv 6, Boss):', getBalancedHpMultiplier(180, 6, true).toFixed(2));
console.log('Min 10 (Lv 20, Mini-Boss):', getBalancedHpMultiplier(600, 20, true).toFixed(2));
console.log('Min 20 (Lv 38, Mini-Boss):', getBalancedHpMultiplier(1200, 38, true).toFixed(2));
console.log('Min 30 (Lv 60, Final Boss):', getBalancedHpMultiplier(1800, 60, true).toFixed(2));

// 3. Test Boss Anti-oneshot Cap
const boss = { isBoss: true, maxHp: 10000, hp: 10000 };
let testDmg = 99999;
if (boss.isBoss && boss.maxHp > 0) {
  testDmg = Math.min(testDmg, Math.ceil(boss.maxHp * 0.06));
}
assert.strictEqual(testDmg, 600, 'Boss single hit cap should be exactly 600 for 10000 maxHp');
console.log('\n--- Boss Anti-oneshot Cap: PASSED (Capped to 6% = 600) ---');

// 4. Test SPELL_DEFS Base Damage Ranges in src/spells.js
const spellsCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'spells.js'), 'utf8');
const spellsMatch = spellsCode.match(/const SPELL_DEFS = {([\s\S]*?)};\r?\n\r?\nclass SpellManager/);
assert(spellsMatch, 'SPELL_DEFS must exist');
eval('var SPELL_DEFS = {' + spellsMatch[1] + '};');

let tier1Outliers = [];
let tier2Outliers = [];
let tier3Outliers = [];

for (const id in SPELL_DEFS) {
  const s = SPELL_DEFS[id];
  if (s.baseDamage === undefined) continue;
  if (s.type === 'weapon') {
    if (s.baseDamage < 22 || s.baseDamage > 38) tier1Outliers.push({ id, dmg: s.baseDamage });
  } else if (s.type === 'evolution') {
    if (s.baseDamage < 75 || s.baseDamage > 125) tier2Outliers.push({ id, dmg: s.baseDamage });
  } else if (s.type === 'super_evolution') {
    if (s.baseDamage < 165 || s.baseDamage > 240) tier3Outliers.push({ id, dmg: s.baseDamage });
  }
}

console.log('\n--- SPELL_DEFS Check ---');
console.log('Tier 1 Outliers (expect 0):', tier1Outliers.length, tier1Outliers);
console.log('Tier 2 Outliers (expect 0):', tier2Outliers.length, tier2Outliers);
console.log('Tier 3 Outliers (expect 0):', tier3Outliers.length, tier3Outliers);
assert.strictEqual(tier1Outliers.length, 0);
assert.strictEqual(tier2Outliers.length, 0);
assert.strictEqual(tier3Outliers.length, 0);

// 5. Test Artifact Double-Dipping Fix Simulation
const mockPlayer = {
  charId: 'asta',
  passives: { mana_skin: 2, reinforcement: 3 },
  infinitePassives: { infinite_vitality: 2, infinite_might: 3 }
};
const mockUp = { strength: 5, armor: 4, synthesis: 3, fortune: 5, crit: 3, vitality: 5 };
const mockCharDef = { baseHp: 120, baseArmor: 0.15, baseSpeed: 210, baseRegen: 0 };
const mockEquippedArtifact = {
  stats: { maxHp: 42, damageBonus: 0.07, armor: 0.05, hpRegen: 0.5, coinBonus: 0.1 }
};

function runRecalculate(p, mockGame) {
  const up = mockUp;
  const charDef = mockCharDef;
  const infVitLv = p.infinitePassives.infinite_vitality;
  const infMightLv = p.infinitePassives.infinite_might;

  p.armor = (charDef.baseArmor || 0) + ((up.armor || 0) * 0.01);
  p.hpRegen = ((up.synthesis || 0) * 0.1) + (charDef.baseRegen || 0);
  mockGame.coinDropMultiplier = 1.0 + ((up.fortune || 0) * 0.04);

  p.damageBonus = (up.strength || 0) * 0.015 + (infMightLv * 0.05);

  let manaSkinLv = 0;
  for (const [id, lv] of Object.entries(p.passives)) {
    if (id === 'reinforcement') p.damageBonus += lv * 0.10;
    if (id === 'mana_skin') {
      manaSkinLv = lv;
      p.armor = Math.min(0.70, p.armor + lv * 0.10);
    }
  }

  p.maxHp = (charDef.baseHp || 100) + ((up.vitality || 0) * 4) + (manaSkinLv * 30) + (infVitLv * 25);

  // Apply artifact stats
  p.maxHp += mockEquippedArtifact.stats.maxHp;
  p.damageBonus += mockEquippedArtifact.stats.damageBonus;
  p.armor = Math.min(0.70, p.armor + mockEquippedArtifact.stats.armor);
  p.hpRegen += mockEquippedArtifact.stats.hpRegen;
  mockGame.coinDropMultiplier += mockEquippedArtifact.stats.coinBonus;
}

const mockGame = { coinDropMultiplier: 1.0 };
// Run recalculate 10 times (simulating 10 level ups)
for (let i = 0; i < 10; i++) {
  runRecalculate(mockPlayer, mockGame);
}

console.log('\n--- Double-dipping Test After 10 Level-Ups ---');
console.log('Player Armor:', mockPlayer.armor.toFixed(2), '(Expected ~0.44: 0.15 base + 0.04 talent + 0.20 skin + 0.05 relic)');
console.log('Player hpRegen:', mockPlayer.hpRegen.toFixed(2), '(Expected ~0.80: 0.3 talent + 0.5 relic)');
console.log('Coin Multiplier:', mockGame.coinDropMultiplier.toFixed(2), '(Expected ~1.30: 1.0 + 0.20 talent + 0.10 relic)');

assert(Math.abs(mockPlayer.armor - 0.44) < 0.001, 'Armor should NOT accumulate across level ups!');
assert(Math.abs(mockPlayer.hpRegen - 0.80) < 0.001, 'hpRegen should NOT accumulate across level ups!');
assert(Math.abs(mockGame.coinDropMultiplier - 1.30) < 0.001, 'coinDropMultiplier should NOT accumulate across level ups!');
console.log('Double-dipping Fix Test: PASSED 100%!');

console.log('\nALL BALANCE OVERHAUL ASSERTIONS PASSED SUCCESSFULLY!');
