const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- drawEnemy lines 2680 to 2750 ---');
for (let i = 2679; i < 2750; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
