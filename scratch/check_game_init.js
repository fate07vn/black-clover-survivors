const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
for (let i = 0; i < 70; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
