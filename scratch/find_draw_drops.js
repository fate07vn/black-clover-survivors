const fs = require('fs');
const game = fs.readFileSync('src/game.js', 'utf8');
game.split('\n').forEach((l, i) => {
  if (l.includes('drop.type ===') || l.includes('drawDrop') || l.includes('case \'chest\'')) {
    console.log(`game.js:${i+1}: ${l.trim()}`);
  }
});

const sprites = fs.readFileSync('src/sprites.js', 'utf8');
sprites.split('\n').forEach((l, i) => {
  if (l.includes('chest') || l.includes('Chest')) {
    console.log(`sprites.js:${i+1}: ${l.trim()}`);
  }
});
