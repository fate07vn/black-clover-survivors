const fs = require('fs');

const gameCode = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');
const indexHtml = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

// Search for saveGameData and loadSaveData in game.js
const gLines = gameCode.split('\n');
gLines.forEach((l, i) => {
  if (l.includes('saveGameData') || l.includes('loadSaveData') || l.includes('selectedCharId') || l.includes('selectedHeroId')) {
    console.log(`game.js L${i+1}: ${l.trim()}`);
  }
});

// Search for selectedHeroId in index.html
const iLines = indexHtml.split('\n');
iLines.forEach((l, i) => {
  if (l.includes('selectedHeroId') || l.includes('localStorage') || l.includes('init()')) {
    if (l.includes('selectedHeroId') || l.includes('BC_')) {
      console.log(`index.html L${i+1}: ${l.trim()}`);
    }
  }
});
