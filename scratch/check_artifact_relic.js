const fs = require('fs');
['src/game.js', 'src/enemies.js'].forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  content.split('\n').forEach((l, i) => {
    if (l.includes('artifact_relic')) console.log(`${file}:${i+1}: ${l.trim()}`);
  });
});
