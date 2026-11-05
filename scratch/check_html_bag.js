const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('inRunArtifacts') || l.includes('inGameArtifacts') || l.includes('drawerCount') || l.includes('chestBagBadge')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});
