const fs = require('fs');
const game = fs.readFileSync('src/game.js', 'utf8');

game.split('\n').forEach((l, i) => {
  if (l.includes('window.game =') || l.includes('window.gameInstance =')) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
