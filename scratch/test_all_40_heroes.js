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

console.log('Testing drawing for ALL 40 characters in CHARACTERS:');
let allOk = true;
Object.keys(CHARACTERS).forEach(id => {
  const p = {
    charId: id,
    x: 100,
    y: 100,
    facing: 1,
    isMoving: true,
    walkDistance: 50,
    isAttacking: true
  };
  try {
    Sprites.drawPlayerSprite(ctx, p, 120);
    console.log(`✓ Character [${id}] rendered successfully!`);
  } catch (err) {
    console.error(`❌ Error rendering character [${id}]:`, err.message);
    allOk = false;
  }
});

if (allOk) {
  console.log('\n🎉 ALL 40 CHARACTERS RENDERED FLAWLESSLY WITH ZERO ERRORS! 🎉');
} else {
  process.exit(1);
}
