const fs = require('fs');

const spritesJs = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const sLines = spritesJs.split('\n');
console.log('--- sprites.js sample ---');
for (let i = 310; i < 370; i++) {
  console.log(`L${i+1}: ${sLines[i]}`);
}
