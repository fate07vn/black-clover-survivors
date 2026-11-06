const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const match = code.match(/const CHARACTERS = \{([\s\S]*?)\n\};/);
if (match) {
  const ids = [];
  const lines = match[1].split('\n');
  lines.forEach(l => {
    const m = l.match(/^\s*([a-z0-9_]+):\s*\{/);
    if (m) ids.push(m[1]);
  });
  console.log('Total characters in CHARACTERS:', ids.length);
  console.log('List of character IDs:', ids);
}
