const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
console.log('Total lines in sprites.js:', lines.length);

// Check sections
lines.forEach((l, i) => {
  if (l.includes('// ===') || l.includes('// ---') || l.includes('drawPlayerSprite') || l.includes('drawEnemy')) {
    if (l.trim().length > 10) {
      console.log(`L${i+1}: ${l.trim().substring(0, 70)}`);
    }
  }
});
