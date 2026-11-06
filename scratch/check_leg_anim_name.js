const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- L170 to L216 ---');
for (let i = 169; i < 216; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
