const fs = require('fs');
const spells = fs.readFileSync('src/spells.js', 'utf8');
spells.split('\n').forEach((l, i) => {
  if (l.includes('const ') && (l.includes('DEFS') || l.includes('PASSIVE'))) {
    console.log(i+1, l);
  }
});
