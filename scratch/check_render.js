const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.includes('render(') || l.includes('drawBackground') || l.includes('renderBackground') || l.includes('drawMenu') || l.includes('drawParticles')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
