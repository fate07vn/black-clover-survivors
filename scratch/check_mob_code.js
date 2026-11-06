const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- sample mob drawing lines 2883-2940 ---');
for (let i = 2882; i < 2940; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
