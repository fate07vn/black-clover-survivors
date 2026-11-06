const path = require('path');

global.window = {};

class MockCanvasContext {
  constructor() {
    this.saveCount = 0;
    this.restoreCount = 0;
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
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {}
  quadraticCurveTo(cpx, cpy, x, y) {}
  arc(x, y, r, sa, ea) {}
  ellipse(x, y, rx, ry, rot, sa, ea) {}
  rect(x, y, w, h) {}
  fillRect(x, y, w, h) {}
  strokeRect(x, y, w, h) {}
  stroke() {}
  fill() {}
  createRadialGradient(x0, y0, r0, x1, y1, r1) {
    return { addColorStop() {} };
  }
  createLinearGradient(x0, y0, x1, y1) {
    return { addColorStop() {} };
  }
}

require('../src/sprites.js');
const Sprites = window.Sprites;

const chars = [
  'asta', 'black_asta', 'yuno', 'noelle', 'yami',
  'luck', 'julius', 'zenon', 'vanica', 'dante', 'sylph',
  'finral', 'charlotte', 'nacht', 'magna', 'lumiere', 'licht'
];

console.log('--- TESTING DRAWING FOR ALL CHARACTERS ---');

for (const charId of chars) {
  // 1. Idle test
  const ctxIdle = new MockCanvasContext();
  Sprites.drawPlayerSprite(ctxIdle, {
    charId,
    x: 100,
    y: 100,
    facing: 1,
    isMoving: false,
    walkDistance: 0,
    isDevilMode: charId === 'black_asta',
    isSpiritMode: charId === 'yuno'
  }, 10);

  if (ctxIdle.saveCount !== ctxIdle.restoreCount) {
    throw new Error(`Unbalanced save/restore in idle for ${charId}: saves=${ctxIdle.saveCount}, restores=${ctxIdle.restoreCount}`);
  }

  // 2. Moving test
  const ctxMoving = new MockCanvasContext();
  Sprites.drawPlayerSprite(ctxMoving, {
    charId,
    x: 100,
    y: 100,
    facing: -1,
    isMoving: true,
    walkDistance: 240,
    isDevilMode: charId === 'black_asta',
    isSpiritMode: charId === 'yuno'
  }, 50);

  if (ctxMoving.saveCount !== ctxMoving.restoreCount) {
    throw new Error(`Unbalanced save/restore in moving for ${charId}: saves=${ctxMoving.saveCount}, restores=${ctxMoving.restoreCount}`);
  }

  // 3. Attacking test
  const ctxAttack = new MockCanvasContext();
  Sprites.drawPlayerSprite(ctxAttack, {
    charId,
    x: 100,
    y: 100,
    facing: 1,
    isMoving: true,
    isAttacking: true,
    walkDistance: 320,
    isDevilMode: charId === 'black_asta',
    isSpiritMode: charId === 'yuno'
  }, 60);

  if (ctxAttack.saveCount !== ctxAttack.restoreCount) {
    throw new Error(`Unbalanced save/restore in attack for ${charId}: saves=${ctxAttack.saveCount}, restores=${ctxAttack.restoreCount}`);
  }

  console.log(`✓ Character [${charId}]: Idle, Moving, and Attacking passed! (saves=${ctxMoving.saveCount})`);
}

console.log('🎉 ALL CHARACTER ANIMATION TESTS PASSED 100%! 🎉');
