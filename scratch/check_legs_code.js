const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- L216 to L260 ---');
for (let i = 215; i < 260; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
