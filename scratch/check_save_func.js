const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = gameCode.split('\n');
console.log('--- loadSaveData lines 1009 to 1060 ---');
for (let i = 1008; i < 1060; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
