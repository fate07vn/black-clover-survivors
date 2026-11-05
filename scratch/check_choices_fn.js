const fs = require('fs');
const game = fs.readFileSync('src/game.js', 'utf8');
const lines = game.split('\n');

lines.forEach((l, i) => {
  if (l.includes('getAvailableLevelUpChoices()') || (i > 1900 && i < 1920)) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
