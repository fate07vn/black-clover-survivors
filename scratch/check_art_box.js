const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const lines = gameJs.split('\n');
lines.forEach((l, i) => {
  if (l.includes('chest-card-art-box') || l.includes('chestArtCrestIcon')) {
    console.log((i+1) + ': ' + l);
  }
});
