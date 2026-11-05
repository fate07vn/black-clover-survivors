const fs = require('fs');
const path = require('path');

const spritesPath = path.join(__dirname, '..', 'src', 'sprites.js');
let code = fs.readFileSync(spritesPath, 'utf8');

// 1. ADD getWalkAnim and drawHumanoidLegs helpers right before drawPlayerSprite
const helpers = `  // Get walking animation parameters based on player movement
  getWalkAnim(p, tick) {
    const isMoving = !!(p && p.isMoving);
    const cycle = (p && p.walkDistance !== undefined && p.walkDistance > 0)
      ? (p.walkDistance * 0.08)
      : (isMoving ? tick * 0.28 : 0);

    const swingMax = 0.50; // radians (~28.6 degrees)
    const legSwing = isMoving ? Math.sin(cycle) * swingMax : 0;

    // Knee bend lifts foot when swinging backward
    const leftBend = (isMoving && legSwing < 0) ? -legSwing * 0.55 : 0;
    const rightBend = (isMoving && -legSwing < 0) ? legSwing * 0.55 : 0;

    // Body vertical bob (running bounce at double frequency; idle gentle breath)
    const walkBob = isMoving ? (Math.sin(cycle * 2) * 2.2) : (Math.sin(tick * 0.06) * 1.0);

    // Arm swing: back arm swings opposite to front arm
    const backArmSwing = isMoving ? -Math.sin(cycle) * 0.42 : Math.sin(tick * 0.06) * 0.06;

    // Weapon idle sway / walk bob
    const weaponSway = isMoving ? (Math.sin(cycle) * 0.10) : (Math.sin(tick * 0.08) * 0.04);

    return {
      isMoving,
      cycle,
      walkBob,
      leftAngle: legSwing,
      rightAngle: -legSwing,
      leftBend,
      rightBend,
      backArmSwing,
      weaponSway
    };
  },

  drawHumanoidLegs(ctx, anim, {
    pantColor = '#18181b',
    bootColor = '#451a03',
    buckleColor = null,
    cuffColor = null,
    pantWidth = 5,
    thighLen = 8,
    bootLen = 8,
    toeLen = 3.5,
    leftHipX = -4.5,
    rightHipX = 4.0,
    hipY = 6
  } = {}) {
    // 1. Left leg (back leg in 3/4 view)
    ctx.save();
    ctx.translate(leftHipX, hipY);
    ctx.rotate(anim.leftAngle);

    // Thigh / Trousers
    ctx.fillStyle = pantColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2 - 0.5, thighLen);
    ctx.lineTo(-pantWidth / 2 + 0.5, thighLen);
    ctx.closePath();
    ctx.fill();

    // Knee joint & Boot
    ctx.translate(0, thighLen);
    ctx.rotate(anim.leftBend);

    // Boot cuff
    if (cuffColor) {
      ctx.fillStyle = cuffColor;
      ctx.fillRect(-pantWidth / 2 - 1, -1, pantWidth + 2, 2.5);
    }

    // Boot
    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2 - 0.5, 0);
    ctx.lineTo(pantWidth / 2 + 0.5, 0);
    ctx.lineTo(pantWidth / 2 + toeLen, bootLen);
    ctx.lineTo(-pantWidth / 2 - 1, bootLen);
    ctx.closePath();
    ctx.fill();

    // Buckle / Trim
    if (buckleColor) {
      ctx.fillStyle = buckleColor;
      ctx.fillRect(-pantWidth / 2 + 0.5, 2, pantWidth - 1, 1.8);
    }
    ctx.restore();

    // 2. Right leg (front leg)
    ctx.save();
    ctx.translate(rightHipX, hipY);
    ctx.rotate(anim.rightAngle);

    // Thigh / Trousers
    ctx.fillStyle = pantColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2, 0);
    ctx.lineTo(pantWidth / 2 - 0.5, thighLen);
    ctx.lineTo(-pantWidth / 2 + 0.5, thighLen);
    ctx.closePath();
    ctx.fill();

    // Knee joint & Boot
    ctx.translate(0, thighLen);
    ctx.rotate(anim.rightBend);

    // Boot cuff
    if (cuffColor) {
      ctx.fillStyle = cuffColor;
      ctx.fillRect(-pantWidth / 2 - 1, -1, pantWidth + 2, 2.5);
    }

    // Boot
    ctx.fillStyle = bootColor;
    ctx.beginPath();
    ctx.moveTo(-pantWidth / 2 - 0.5, 0);
    ctx.lineTo(pantWidth / 2 + 0.5, 0);
    ctx.lineTo(pantWidth / 2 + toeLen, bootLen);
    ctx.lineTo(-pantWidth / 2 - 1, bootLen);
    ctx.closePath();
    ctx.fill();

    // Buckle / Trim
    if (buckleColor) {
      ctx.fillStyle = buckleColor;
      ctx.fillRect(-pantWidth / 2 + 0.5, 2, pantWidth - 1, 1.8);
    }
    ctx.restore();
  },

  drawPlayerSprite(ctx, p, tick) {`;

if (!code.includes('getWalkAnim(p, tick)')) {
  code = code.replace('  drawPlayerSprite(ctx, p, tick) {', helpers);
  console.log('Added getWalkAnim & drawHumanoidLegs helpers.');
} else {
  console.log('Helpers already present.');
}

fs.writeFileSync(spritesPath, code, 'utf8');
console.log('Successfully saved helpers in sprites.js');
