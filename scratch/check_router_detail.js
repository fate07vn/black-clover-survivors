const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- L320 to L396 ---');
for (let i = 319; i < 396; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
