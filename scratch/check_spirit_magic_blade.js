const fs = require('fs');

const spells = fs.readFileSync('src/spells.js', 'utf8');
const lines = spells.split('\n');

const idx = lines.findIndex(l => l.includes("spirit_magic_blade: {"));
if (idx !== -1) {
  console.log(lines.slice(idx, idx + 40).join('\n'));
}
