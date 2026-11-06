const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = gameCode.split('\n');
console.log('--- exportSaveData lines 1125 to 1150 ---');
for (let i = 1124; i < 1150; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
