const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = gameCode.split('\n');
console.log('--- saveGameData lines 1195 to 1250 ---');
for (let i = 1194; i < 1250; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
