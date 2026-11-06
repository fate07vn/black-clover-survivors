const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- L2670 to L2685 ---');
for (let i = 2669; i < 2685; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
