const fs = require('fs');

['index.html', 'src/game.js'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  content.split('\n').forEach((l, i) => {
    if (l.includes('levelUpCards') || l.includes('levelUpOverlay') || l.includes('retrieveManaBonus')) {
      console.log(`${file}:${i+1}: ${l}`);
    }
  });
});
