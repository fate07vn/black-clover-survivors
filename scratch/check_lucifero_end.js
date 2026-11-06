const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- Lines 5665 to 5676 ---');
for (let i = 5664; i < 5676; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
