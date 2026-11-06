const fs = require('fs');
const files = ['index.html', 'src/game.js', 'src/sprites.js'];

files.forEach(f => {
  const content = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('arc(') && (l.includes('gold') || l.includes('yellow') || l.includes('255, 215') || l.includes('rgba(255') || l.includes('rgba(251') || l.includes('particle') || l.includes('menu'))) {
      console.log(`${f}:${idx+1} -> ${l.trim()}`);
    }
  });
});
