const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('keydown') || l.includes('e.code') || l.includes('e.key')) {
    console.log(`game.js:${i+1}: ${l.trim()}`);
  }
});
