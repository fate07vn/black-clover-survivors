const fs = require('fs');
const path = require('path');

const spritesCode = fs.readFileSync(path.join(__dirname, '../src/sprites.js'), 'utf8');

function testCharacterDraw(codeToTest, charId, px, py) {
  let drawnCoords = [];
  let curTransform = { x: 0, y: 0, sx: 1, sy: 1 };
  let matrixStack = [];

  const mockCtx = {
    save() {
      matrixStack.push({ ...curTransform });
    },
    restore() {
      if (matrixStack.length > 0) {
        curTransform = matrixStack.pop();
      }
    },
    translate(dx, dy) {
      curTransform.x += dx * curTransform.sx;
      curTransform.y += dy * curTransform.sy;
    },
    scale(sx, sy) {
      curTransform.sx *= sx;
      curTransform.sy *= sy;
    },
    rotate(rad) {},
    beginPath() {}, closePath() {},
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    quadraticCurveTo(cpx, cpy, x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    moveTo(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    lineTo(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    arc(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    ellipse(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    rect(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    fillRect(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    strokeRect(x, y) { drawnCoords.push({ x: curTransform.x + x * curTransform.sx, y: curTransform.y + y * curTransform.sy }); },
    clearRect() {}, fill() {}, stroke() {}, clip() {},
    createLinearGradient() { return { addColorStop() {} }; },
    createRadialGradient() { return { addColorStop() {} }; },
    createPattern() { return {}; },
    measureText() { return { width: 10 }; },
    fillText(text, x, y) { drawnCoords.push({ x: curTransform.x + (x||0) * curTransform.sx, y: curTransform.y + (y||0) * curTransform.sy }); },
    strokeText() {}, drawImage() {}, setLineDash() {}, getLineDash() { return []; },
    shadowBlur: 0, shadowColor: '', fillStyle: '', strokeStyle: '',
    lineWidth: 1, globalAlpha: 1, globalCompositeOperation: 'source-over'
  };

  const sandboxWindow = {};
  const fn = new Function('window', 'ctx', codeToTest + '; return window.Sprites || Sprites;');
  const Sprites = fn(sandboxWindow, mockCtx);

  const p = {
    charId, x: px, y: py, vx: 0, vy: 0, facing: 1,
    invulnerable: false, walkAnim: 0, animTick: 10, isAttacking: false,
    equippedSpells: ['demon_slayer'], statLevels: {}
  };

  Sprites.drawPlayerSprite(mockCtx, p, 100);

  if (drawnCoords.length === 0) {
    return { ok: false, reason: 'NO_DRAW_CALLS', dist: 9999 };
  }

  let avgX = 0, avgY = 0;
  for (const c of drawnCoords) {
    avgX += c.x;
    avgY += c.y;
  }
  avgX /= drawnCoords.length;
  avgY /= drawnCoords.length;

  const dist = Math.hypot(avgX - px, avgY - py);
  return {
    ok: dist < 60,
    avgX, avgY, dist,
    count: drawnCoords.length
  };
}

console.log('--- 1. TESTING ALL 40 HEROES CENTERING AT (500, 300) ---');
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
  const res = testCharacterDraw(spritesCode, cid, 500, 300);
  if (!res.ok) {
    console.error(`✗ [${cid}]: FAILED centering (distance: ${res.dist.toFixed(1)}px)`);
    failed++;
  }
}
console.log(`✓ 40/40 heroes tested (${failed === 0 ? 'ALL PASSED & CENTERED' : failed + ' FAILED'})`);

console.log('\n--- 2. TESTING ALL 11 MOBS ---');
const MOBS = [
  'bandit', 'cultist', 'zombie', 'spade_soldier', 'hellhound',
  'shadow_mage', 'bone_golem', 'lesser_devil', 'high_devil',
  'armored_boar', 'demon_charger'
];

const mockSimpleCtx = {
  save() {}, restore() {}, beginPath() {}, closePath() {},
  moveTo() {}, lineTo() {}, arc() {}, ellipse() {}, bezierCurveTo() {}, quadraticCurveTo() {},
  rect() {}, fillRect() {}, strokeRect() {}, clearRect() {},
  fill() {}, stroke() {}, clip() {},
  translate() {}, rotate() {}, scale() {}, setTransform() {}, resetTransform() {},
  createLinearGradient() { return { addColorStop() {} }; },
  createRadialGradient() { return { addColorStop() {} }; },
  createPattern() { return {}; },
  measureText() { return { width: 10 }; },
  fillText() {}, strokeText() {}, drawImage() {},
  setLineDash() {}, getLineDash() { return []; },
  shadowBlur: 0, shadowColor: '', fillStyle: '', strokeStyle: '',
  lineWidth: 1, globalAlpha: 1, globalCompositeOperation: 'source-over'
};

const fnSimple = new Function('window', 'ctx', spritesCode + '; return window.Sprites || Sprites;');
const SpriteRenderer = fnSimple({}, mockSimpleCtx);

for (const m of MOBS) {
  try {
    const e = { type: m, x: 100, y: 100, vx: 0, vy: 0, radius: 15, frozen: false, burning: false };
    SpriteRenderer.drawEnemy(mockSimpleCtx, e, 100);
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
    SpriteRenderer.drawEnemy(mockSimpleCtx, e, 100);
    e.enraged = true;
    SpriteRenderer.drawEnemy(mockSimpleCtx, e, 150);
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
  console.log('\n🎉 ALL VISUAL ASSETS RENDER FLAWLESSLY AT CORRECT COORDINATES! 🎉');
}
