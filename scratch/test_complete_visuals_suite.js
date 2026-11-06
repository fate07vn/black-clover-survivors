const fs = require('fs');

class MockContext {
  constructor() {
    this.saveCount = 0;
  }
  save() { this.saveCount++; }
  restore() { this.saveCount--; }
  translate() {}
  scale() {}
  rotate() {}
  beginPath() {}
  closePath() {}
  moveTo() {}
  lineTo() {}
  bezierCurveTo() {}
  quadraticCurveTo() {}
  arc() {}
  ellipse() {}
  rect() {}
  fillRect() {}
  strokeRect() {}
  fillText() {}
  measureText() { return { width: 60 }; }
  fill() {}
  stroke() {}
  createLinearGradient() { return { addColorStop() {} }; }
  createRadialGradient() { return { addColorStop() {} }; }
  setLineDash() {}
}

const spritesCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');
const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const ctx = new MockContext();

const sandbox = {
  window: { addEventListener: () => {}, removeEventListener: () => {} },
  document: { createElement: () => ({ getContext: () => new MockContext() }), addEventListener: () => {} },
  Math,
  performance: { now: () => 1000 },
  console
};

const fn1 = new Function('window', 'document', 'Math', 'performance', 'console', spritesCode + '; return Sprites;');
const Sprites = fn1(sandbox.window, sandbox.document, Math, sandbox.performance, console);

const fn2 = new Function('window', 'document', 'Math', 'performance', 'console', gameCode + '; return CHARACTERS;');
const CHARACTERS = fn2(sandbox.window, sandbox.document, Math, sandbox.performance, console);

console.log('=== 1. TESTING ALL 40 HEROES ===');
Object.keys(CHARACTERS).forEach(id => {
  const p = { charId: id, x: 100, y: 100, facing: 1, isMoving: true, walkDistance: 25 };
  Sprites.drawPlayerSprite(ctx, p, 100);
});
console.log('✓ All 40 heroes rendered without errors!');

console.log('=== 2. TESTING ALL 11 MOBS ===');
const mobTypes = [
  'bandit', 'cultist', 'zombie', 'spade_soldier', 'hellhound',
  'shadow_mage', 'bone_golem', 'lesser_devil', 'high_devil',
  'armored_boar', 'demon_charger'
];
mobTypes.forEach(t => {
  const e = { type: t, x: 200, y: 200, radius: 14, hp: 100, maxHp: 100, vx: -1 };
  Sprites.drawEnemy(ctx, e, 150);
});
console.log('✓ All 11 mobs rendered without errors!');

console.log('=== 3. TESTING ALL 8 BOSSES (Normal & Enraged) ===');
const bossTypes = [
  'boss_mars', 'boss_vetto', 'boss_patri', 'boss_zenon',
  'boss_vanica', 'boss_dante', 'boss_zagred', 'boss_lucifero'
];
bossTypes.forEach(b => {
  // Normal
  const e1 = { type: b, isBoss: true, isEnraged: false, x: 300, y: 300, radius: 32, hp: 5000, maxHp: 5000, vx: 1 };
  Sprites.drawEnemy(ctx, e1, 200);

  // Enraged
  const e2 = { type: b, isBoss: true, isEnraged: true, enrageShieldTimer: 0.8, x: 300, y: 300, radius: 32, hp: 1500, maxHp: 5000, vx: -1 };
  Sprites.drawEnemy(ctx, e2, 250);
});
console.log('✓ All 8 bosses (normal & enraged) rendered without errors!');

console.log('\n🌟 CONGRATULATIONS: 100% COMPLETE VISUAL SUITE TESTS PASSED! 🌟');
