const fs = require('fs');
const path = require('path');

const spritesPath = path.join(__dirname, '..', 'src', 'sprites.js');
let code = fs.readFileSync(spritesPath, 'utf8');

const drawSylphNew = `  drawSylph(ctx, p, tick) {
    const facing = p.facing || 1;
    const floatBob = Math.sin(tick * 0.24) * 4;
    const wingFlutter = Math.sin(tick * 0.55);

    ctx.save();
    ctx.translate(p.x, p.y + floatBob);
    ctx.scale(facing, 1);

    // Radiant Emerald & Golden Spirit Aura
    this.drawAura(ctx, 0, -4, 30, 'rgba(52, 211, 153, 0.45)', 25);
    this.drawAura(ctx, 0, -4, 18, 'rgba(254, 240, 138, 0.35)', 15);

    // Floating Ground Shadow
    const shadowGrad = ctx.createRadialGradient(0, 20 - floatBob, 1, 0, 20 - floatBob, 14);
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0.35)');
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 20 - floatBob, 14, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4 Fairy Wings (2 Upper, 2 Lower with translucent emerald/gold gradient)
    const upperWingSpan = 22 + wingFlutter * 3;
    const lowerWingSpan = 14 + wingFlutter * 2;

    const wingGrad = ctx.createLinearGradient(0, -10, -upperWingSpan, -25);
    wingGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    wingGrad.addColorStop(0.4, 'rgba(110, 231, 183, 0.85)');
    wingGrad.addColorStop(0.8, 'rgba(253, 224, 71, 0.7)');
    wingGrad.addColorStop(1, 'rgba(52, 211, 153, 0.4)');

    ctx.save();
    ctx.fillStyle = wingGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;

    // Upper Left Wing (back)
    ctx.beginPath();
    ctx.moveTo(-2, -8);
    ctx.bezierCurveTo(-10, -22, -upperWingSpan, -26, -upperWingSpan - 4, -14);
    ctx.bezierCurveTo(-upperWingSpan + 2, -6, -10, -4, -2, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Lower Left Wing (back)
    ctx.beginPath();
    ctx.moveTo(-2, -5);
    ctx.bezierCurveTo(-8, -10, -lowerWingSpan, -8, -lowerWingSpan - 2, 2);
    ctx.bezierCurveTo(-lowerWingSpan + 4, 8, -6, 2, -2, -3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Slender Fairy Legs with mint slippers (Flutter-kicking gently while moving/flying!)
    const fairyKick = p.isMoving ? Math.sin(tick * 0.35) * 0.35 : Math.sin(tick * 0.15) * 0.12;
    // Left leg
    ctx.save();
    ctx.translate(-2.5, 8);
    ctx.rotate(fairyKick);
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-1.25, 0, 2.5, 9);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(0, 9, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right leg
    ctx.save();
    ctx.translate(2.5, 8);
    ctx.rotate(-fairyKick);
    ctx.fillStyle = '#ffedd5';
    ctx.fillRect(-1.25, 0, 2.5, 9);
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.ellipse(0, 9, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Emerald Fairy Tunic / Dress with golden ribbon
    const dressGrad = ctx.createLinearGradient(0, -6, 0, 10);
    dressGrad.addColorStop(0, '#059669');
    dressGrad.addColorStop(0.5, '#10b981');
    dressGrad.addColorStop(1, '#34d399');

    ctx.fillStyle = dressGrad;
    ctx.beginPath();
    ctx.moveTo(0, -7);
    ctx.lineTo(4, -4);
    ctx.lineTo(7, 7);
    ctx.bezierCurveTo(4, 9, -4, 9, -7, 7);
    ctx.lineTo(-4, -4);
    ctx.closePath();
    ctx.fill();

    // Gold waist belt & ribbon
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.rect(-4.5, 1, 9, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.quadraticCurveTo(-4, 7, -6, 12);
    ctx.lineTo(-4, 12);
    ctx.quadraticCurveTo(-2, 7, 1, 3);
    ctx.fill();

    // Slender Left Arm swinging
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.ellipse(-6, -2, 2, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Petite Fairy Face
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, -11, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Cute pink blush
    ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-3.5, -9.5, 2, 1, 0, 0, Math.PI * 2);
    ctx.ellipse(3.5, -9.5, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Big Anime Emerald Eyes
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.ellipse(2.5, -11.5, 2.2, 3, 0, 0, Math.PI * 2);
    ctx.ellipse(-2.5, -11.5, 1.8, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.ellipse(2.5, -10.5, 1.6, 1.8, 0, 0, Math.PI * 2);
    ctx.ellipse(-2.5, -10.5, 1.3, 1.7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(3.2, -12.5, 1, 0, Math.PI * 2);
    ctx.arc(-1.8, -12.5, 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Cute Smile
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0.5, -8, 1.8, 0.1, Math.PI - 0.1);
    ctx.stroke();

    // Golden Fairy Hair with flowing anime twintails & bangs
    ctx.fillStyle = '#fef08a';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.arc(0, -12.5, 8.5, Math.PI, Math.PI * 2);
    ctx.fill();

    // Left Twin Tail (wind swaying)
    const hairSway = Math.sin(tick * 0.28) * 4;
    ctx.beginPath();
    ctx.moveTo(-6, -12);
    ctx.bezierCurveTo(-14, -8, -16 + hairSway, 0, -12 + hairSway, 8);
    ctx.bezierCurveTo(-9 + hairSway, 5, -8, -4, -4, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right Twin Tail (wind swaying)
    ctx.beginPath();
    ctx.moveTo(6, -12);
    ctx.bezierCurveTo(14, -8, 16 - hairSway, 0, 12 - hairSway, 8);
    ctx.bezierCurveTo(9 - hairSway, 5, 8, -4, 4, -8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Front bangs
    ctx.beginPath();
    ctx.moveTo(-7, -13);
    ctx.lineTo(-4, -9);
    ctx.lineTo(-1, -12);
    ctx.lineTo(2, -9);
    ctx.lineTo(6, -11);
    ctx.lineTo(7, -14);
    ctx.closePath();
    ctx.fill();

    // Ahoge (hair antenna) swaying in the breeze
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.quadraticCurveTo(5 + hairSway * 0.5, -25, 2, -26);
    ctx.quadraticCurveTo(3, -21, 0, -18);
    ctx.fill();
    ctx.stroke();

    // Gold Leaf Tiara / Fairy Crown
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-4, -17);
    ctx.lineTo(-2, -21);
    ctx.lineTo(0, -18);
    ctx.lineTo(2, -21);
    ctx.lineTo(4, -17);
    ctx.closePath();
    ctx.fill();

    // Front Wing (overlapping body for 3D depth)
    ctx.save();
    ctx.fillStyle = wingGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(2, -8);
    ctx.bezierCurveTo(10, -22, upperWingSpan, -26, upperWingSpan + 4, -14);
    ctx.bezierCurveTo(upperWingSpan - 2, -6, 10, -4, 2, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // FRONT ARM & SPIRIT FAIRY SCEPTER / WAND (Held in hand pointing forward!)
    ctx.save();
    ctx.translate(5, -2);
    ctx.rotate(0.2 + (p.isMoving ? Math.sin(tick * 0.25) * 0.1 : 0));

    // Slender arm
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.ellipse(0, 0, 1.8, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Fairy Hand holding Wand
    ctx.translate(2, 4);
    // Glowing emerald star scepter
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 3);
    ctx.lineTo(0, -14);
    ctx.stroke();

    // Glowing Spirit Star on wand tip
    ctx.fillStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, -14, 2.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Dainty hand
    ctx.fillStyle = '#ffedd5';
    ctx.beginPath();
    ctx.arc(0, 0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  },`;

const sylphStart = code.indexOf('  drawSylph(ctx, p, tick) {');
const sylphEndMarker = '  // ENEMY & BOSS SPRITE ROUTER';
const sylphEnd = code.indexOf(sylphEndMarker);

// Find the last "  }," before sylphEndMarker
const lastBraceBefore = code.lastIndexOf('  },', sylphEnd);
if (sylphStart !== -1 && lastBraceBefore !== -1) {
  code = code.substring(0, sylphStart) + drawSylphNew + '\n\n' + code.substring(lastBraceBefore + 5);
  console.log('Successfully replaced drawSylph!');
  fs.writeFileSync(spritesPath, code, 'utf8');
} else {
  console.error('Failed to locate boundaries for drawSylph');
}
