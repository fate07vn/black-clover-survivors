const fs = require('fs');

['index.html', 'src/game.js'].forEach(f => {
  const content = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('menuOverlay')) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
