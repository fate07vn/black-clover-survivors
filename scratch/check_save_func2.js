const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = gameCode.split('\n');
console.log('--- loadSaveData lines 1060 to 1120 ---');
for (let i = 1060; i < 1120; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
