const fs = require('fs');

const files = ['index.html', 'style.css'];
files.forEach(f => {
  const c = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('menuOverlay') || l.includes('topNavBar')) {
      console.log(`${f}:${i+1} -> ${l}`);
    }
  });
});
