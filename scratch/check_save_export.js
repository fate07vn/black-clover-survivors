const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = gameCode.split('\n');
console.log('--- exportSaveData lines 1140 to 1195 ---');
for (let i = 1140; i < 1195; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
