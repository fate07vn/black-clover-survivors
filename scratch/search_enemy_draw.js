const fs = require('fs');

const files = ['src/sprites.js', 'src/enemies.js', 'src/game.js'];

files.forEach(f => {
  const c = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('drawEnemy') || l.includes('enemy.type') || l.includes('enemy.isBoss') || l.includes('drawBoss')) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
