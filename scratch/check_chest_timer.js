const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('chestSpawnTimer')) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
