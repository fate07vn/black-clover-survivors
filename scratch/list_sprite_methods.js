const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');
lines.forEach((l, i) => {
  if (l.match(/^\s*(draw[A-Za-z0-9_]+)\s*\(/)) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
