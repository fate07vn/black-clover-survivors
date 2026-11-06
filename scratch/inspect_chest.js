const fs = require('fs');

console.log('--- EN ダンジョン / ENEMIES DROPS ---');
const enemies = fs.readFileSync('src/enemies.js', 'utf8');
enemies.split('\n').forEach((l, i) => {
  if (l.toLowerCase().includes('chest')) console.log(`enemies.js:${i+1}: ${l.trim()}`);
});

console.log('--- GAME CHEST LOGIC ---');
const game = fs.readFileSync('src/game.js', 'utf8');
game.split('\n').forEach((l, i) => {
  if (l.toLowerCase().includes('chest') && (l.includes('spawn') || l.includes('drop') || l.includes('open') || l.includes('timer'))) {
    console.log(`game.js:${i+1}: ${l.trim()}`);
  }
});
