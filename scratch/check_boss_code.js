const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('--- Boss Lucifero sample lines 4184-4240 ---');
for (let i = 4183; i < 4240; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
