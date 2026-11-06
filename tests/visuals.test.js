const fs = require('fs');
const path = require('path');

const spritesCode = fs.readFileSync(path.join(__dirname, '../src/sprites.js'), 'utf8');

const mockCtx = {
  save() {}, restore() {}, beginPath() {}, closePath() {},
  moveTo() {}, lineTo() {}, arc() {}, ellipse() {}, bezierCurveTo() {}, quadraticCurveTo() {},
  rect() {}, fillRect() {}, strokeRect() {}, clearRect() {},
  fill() {}, stroke() {}, clip() {},
  translate() {}, rotate() {}, scale() {}, setTransform() {}, resetTransform() {},
  createLinearGradient() { return { addColorStop() {} }; },
  createRadialGradient() { return { addColorStop() {} }; },
  createPattern() { return {}; },
  measureText() { return { width: 10 }; },
  fillText() {}, strokeText() {},
  drawImage() {},
  setLineDash() {},
  getLineDash() { return []; },
  shadowBlur: 0, shadowColor: '', fillStyle: '', strokeStyle: '',
  lineWidth: 1, globalAlpha: 1, globalCompositeOperation: 'source-over',
  font: '', textAlign: '', textBaseline: '', lineCap: '', lineJoin: ''
};

const sandboxWindow = {};
const fn = new Function('window', 'ctx', spritesCode + '; return window.Sprites || Sprites;');
const SpriteRenderer = fn(sandboxWindow, mockCtx);

console.log('--- 1. TESTING ALL 40 HEROES ---');
const CHAR_IDS = [
  'asta', 'yuno', 'noelle', 'yami', 'luck', 'julius',
  'mereoleona', 'fuegoleon', 'lumiere', 'licht', 'nacht', 'secre',
  'patry', 'charlotte', 'william', 'nozel', 'jack', 'dorothy',
  'rill', 'zora', 'finral', 'charmy', 'magna', 'langris',
  'henry', 'leopold', 'mars', 'gordon', 'grey', 'mimosa',
  'klaus', 'sol', 'zenon', 'vanica', 'dante', 'fana',
  'rhya', 'vetto', 'sylph', 'black_asta'
];

let failed = 0;
for (const cid of CHAR_IDS) {
  try {
    const p = {
      charId: cid, x: 200, y: 200, vx: 1, vy: 0, facing: 1,
      invulnerable: false, walkAnim: 0, animTick: 10, isAttacking: false,
      blackForm: cid === 'black_asta',
      equippedSpells: ['demon_slayer'],
      statLevels: {}
    };
    SpriteRenderer.drawPlayer(mockCtx, p, 100);
  } catch (err) {
    console.error(`✗ Error rendering hero [${cid}]:`, err.message);
    failed++;
  }
}
console.log(`✓ 40/40 heroes tested (${failed === 0 ? 'ALL PASSED' : failed + ' FAILED'})`);

console.log('\n--- 2. TESTING ALL 11 MOBS ---');
const MOBS = [
  'bandit', 'cultist', 'zombie', 'spade_soldier', 'hellhound',
  'shadow_mage', 'bone_golem', 'lesser_devil', 'high_devil',
  'armored_boar', 'demon_charger'
];

for (const m of MOBS) {
  try {
    const e = { type: m, x: 100, y: 100, vx: 0, vy: 0, radius: 15, frozen: false, burning: false };
    SpriteRenderer.drawEnemy(mockCtx, e, 100);
  } catch (err) {
    console.error(`✗ Error rendering mob [${m}]:`, err.message);
    failed++;
  }
}
console.log(`✓ 11/11 mobs tested`);

console.log('\n--- 3. TESTING ALL 8 BOSSES ---');
const BOSSES = ['mars', 'vetto', 'patri', 'zenon', 'vanica', 'dante', 'zagred', 'lucifero'];
for (const b of BOSSES) {
  try {
    const e = { type: b, isBoss: true, x: 100, y: 100, vx: 0, vy: 0, radius: 30, enraged: false };
    SpriteRenderer.drawEnemy(mockCtx, e, 100);
    e.enraged = true;
    SpriteRenderer.drawEnemy(mockCtx, e, 150);
  } catch (err) {
    console.error(`✗ Error rendering boss [${b}]:`, err.message);
    failed++;
  }
}
console.log(`✓ 8/8 bosses (normal & enraged) tested`);

if (failed > 0) {
  console.error(`\n❌ TEST FAILED: ${failed} errors encountered.`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL VISUAL ASSETS RENDER FLAWLESSLY! 🎉');
}
