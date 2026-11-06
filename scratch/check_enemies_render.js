const fs = require('fs');

const enemiesJs = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/enemies.js', 'utf8');

const lines = enemiesJs.split('\n');
lines.forEach((l, i) => {
  if (l.includes('draw(') || l.includes('drawEnemy') || l.includes('ENEMY_TYPES') || l.includes('BOSS_TYPES') || l.includes('render')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
