const fs = require('fs');

const spells = fs.readFileSync('src/spells.js', 'utf8');
const idx = spells.indexOf('drawSpiritRing(');
if (idx !== -1) {
  console.log('=== drawSpiritRing ===');
  console.log(spells.slice(idx, idx + 1500));
}

const idx2 = spells.indexOf('drawSylphOrbitingSpirits(');
if (idx2 !== -1) {
  console.log('\n=== drawSylphOrbitingSpirits ===');
  console.log(spells.slice(idx2, idx2 + 1500));
}
