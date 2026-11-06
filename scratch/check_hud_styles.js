const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('.hud-center') || l.includes('#chestCompassWidget') || l.includes('top-hud')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});
