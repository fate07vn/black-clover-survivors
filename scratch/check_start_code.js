const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
for (let i = 1627; i < 1740; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
