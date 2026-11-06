const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- drawEnemy lines 2750 to 2840 ---');
for (let i = 2749; i < 2840; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
