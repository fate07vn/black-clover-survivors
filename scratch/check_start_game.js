const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.includes('startGame(')) {
    console.log(`L${i+1}: ${l}`);
  }
});
