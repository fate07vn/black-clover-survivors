const path = require('path');

global.window = {};

class MockCanvasContext {
  constructor() {
    this.saveCount = 0;
    this.restoreCount = 0;
    this.shadowColor = '';
    this.shadowBlur = 0;
    this.lineWidth = 1;
    this.fillStyle = '';
    this.strokeStyle = '';
    this.globalAlpha = 1;
  }
  save() { this.saveCount++; }
  restore() { this.restoreCount++; }
  translate(x, y) {}
  scale(x, y) {}
  rotate(a) {}
  beginPath() {}
  closePath() {}
  moveTo(x, y) {}
  lineTo(x, y) {}
  bezierCurveTo() {}
  quadraticCurveTo() {}
  arc() {}
  ellipse() {}
  rect() {}
  fillRect() {}
  strokeRect() {}
  stroke() {}
  fill() {}
  createRadialGradient() { return { addColorStop() {} }; }
  createLinearGradient() { return { addColorStop() {} }; }
}

require('../src/spells.js');
const SpellManager = window.SpellManager;

const fakeGame = {
  tick: 100,
  player: { x: 200, y: 200, radius: 15, facing: 1 }
};

const sm = new SpellManager(fakeGame);

console.log('--- TESTING ALL SPELL VISUALS ---');

// 1. Test Projectiles
const testProjTypes = [
  'sylph_spirit_bolt', 'wind_scythe', 'sea_dragon', 'valkyrie_lance',
  'fire_fist', 'fireball', 'light_sword', 'origin_sword',
  'shadow_wolf', 'spatial_bone', 'blood_beast', 'phoenix_feather',
  'steel_drills', 'flower_cannon', 'bull_golem', 'magic_conversion',
  'substance_transmute', 'elemental_orb', 'unknown_test_type'
];

for (const type of testProjTypes) {
  sm.projectiles = [{
    x: 150,
    y: 150,
    vx: 120,
    vy: 60,
    radius: 14,
    type,
    color: '#38bdf8'
  }];

  const ctx = new MockCanvasContext();
  sm.drawProjectiles(ctx, 50);

  if (ctx.saveCount !== ctx.restoreCount) {
    throw new Error(`Unbalanced save/restore in drawProjectiles for type [${type}]: saves=${ctx.saveCount}, restores=${ctx.restoreCount}`);
  }
  console.log(`✓ Projectile [${type}] rendered successfully!`);
}

// 2. Test Slashes (Directional and 360 Spin)
sm.slashes = [
  { x: 100, y: 100, radius: 45, arc: Math.PI * 0.8, facingAngle: 0.5, progress: 0.3, color: '#dc2626' },
  { x: 200, y: 200, radius: 60, arc: Math.PI * 2.0, facingAngle: 0, progress: 0.5, color: '#9333ea' }
];
const ctxSlashes = new MockCanvasContext();
sm.drawSlashes(ctxSlashes, 75);
if (ctxSlashes.saveCount !== ctxSlashes.restoreCount) {
  throw new Error(`Unbalanced save/restore in drawSlashes: saves=${ctxSlashes.saveCount}, restores=${ctxSlashes.restoreCount}`);
}
console.log('✓ Slashes (Directional & 360 Vortex) rendered successfully!');

// 3. Test AoE Zones
sm.aoeZones = [
  { x: 300, y: 300, radius: 80, life: 2.0, maxLife: 3.0, color: '#38bdf8', isGiantSword: true },
  { x: 400, y: 400, radius: 70, life: 1.5, maxLife: 3.0, color: '#9333ea', isShadowClaw: true }
];
const ctxAoE = new MockCanvasContext();
sm.drawAoEZones(ctxAoE, 80);
if (ctxAoE.saveCount !== ctxAoE.restoreCount) {
  throw new Error(`Unbalanced save/restore in drawAoEZones: saves=${ctxAoE.saveCount}, restores=${ctxAoE.restoreCount}`);
}
console.log('✓ AoE Zones (Occult Grand Seals) rendered successfully!');

// 4. Test Shockwaves
sm.shockwaves = [
  { x: 250, y: 250, radius: 50, life: 0.2, maxLife: 0.4, color: '#f59e0b' }
];
const ctxSW = new MockCanvasContext();
sm.drawShockwaves(ctxSW, 90);
if (ctxSW.saveCount !== ctxSW.restoreCount) {
  throw new Error(`Unbalanced save/restore in drawShockwaves: saves=${ctxSW.saveCount}, restores=${ctxSW.restoreCount}`);
}
console.log('✓ Shockwaves rendered successfully!');

// 5. Test Lightning Chains
sm.lightningChains = [
  { points: [{ x: 10, y: 10 }, { x: 50, y: 40 }, { x: 100, y: 80 }], color: '#38bdf8' }
];
const ctxLC = new MockCanvasContext();
sm.drawLightningChains(ctxLC, 95);
if (ctxLC.saveCount !== ctxLC.restoreCount) {
  throw new Error(`Unbalanced save/restore in drawLightningChains: saves=${ctxLC.saveCount}, restores=${ctxLC.restoreCount}`);
}
console.log('✓ Lightning Chains rendered successfully!');

console.log('🎉 ALL SPELL VISUAL TESTS PASSED 100%! 🎉');
