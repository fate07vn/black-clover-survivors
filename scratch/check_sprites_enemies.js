const fs = require('fs');

const spritesJs = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');
const enemiesJs = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/enemies.js', 'utf8');

console.log('sprites.js length:', spritesJs.length);
console.log('enemies.js length:', enemiesJs.length);

const sLines = spritesJs.split('\n');
sLines.forEach((l, i) => {
  if (l.includes('drawPlayer') || l.includes('drawCharacter') || l.includes('drawWeapon') || l.includes('drawLegs')) {
    console.log(`sprites.js L${i+1}: ${l.trim()}`);
  }
});

const eLines = enemiesJs.split('\n');
eLines.forEach((l, i) => {
  if (l.includes('draw(') || l.includes('drawBoss') || l.includes('render') || l.includes('class Enemy')) {
    console.log(`enemies.js L${i+1}: ${l.trim()}`);
  }
});
