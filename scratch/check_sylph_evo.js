const fs = require('fs');

const spells = fs.readFileSync('src/spells.js', 'utf8');
const lines = spells.split('\n');

console.log('--- CHECK sylph_spirits IN SPELLS.JS ---');
const idx = lines.findIndex(l => l.includes("sylph_spirits: {"));
if (idx !== -1) {
  console.log(lines.slice(idx, idx + 35).join('\n'));
}

console.log('--- CHECK ALL WEAPONS WITH EVOLUTIONS ---');
const m = spells.match(/const SPELL_DEFS = {([\s\S]*?)const PASSIVES_DEF/);
if (m) {
  // Check each weapon
  const wepBlocks = m[1].split(/^\s+([a-zA-Z0-9_]+):\s*{/gm);
  for (let i = 1; i < wepBlocks.length; i += 2) {
    const id = wepBlocks[i];
    const body = wepBlocks[i+1];
    if (body.includes("type: 'weapon'") || body.includes('type: "weapon"')) {
      const hasEvo = body.includes('evolution:');
      const hasEvos = body.includes('evolutions:');
      console.log(`${id}: evolution=${hasEvo}, evolutions=${hasEvos}`);
    }
  }
}
