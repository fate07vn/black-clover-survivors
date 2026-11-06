const fs = require('fs');

console.log('--- ALL CHEST SPAWN OCCURRENCES IN GAME.JS ---');
const game = fs.readFileSync('src/game.js', 'utf8');
const lines = game.split('\n');
lines.forEach((l, i) => {
  if (l.includes("'chest'") || l.includes('"chest"') || l.includes('chestSpawnTimer')) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
