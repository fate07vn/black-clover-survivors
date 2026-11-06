const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
for (let i = 672; i < 760; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
