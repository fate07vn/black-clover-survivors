const fs = require('fs');
const spells = fs.readFileSync('src/spells.js', 'utf8');

const m = spells.match(/const SPELL_DEFS = {([\s\S]*?)const PASSIVES_DEF/);
if (m) {
  const keys = [...m[1].matchAll(/^\s+([a-zA-Z0-9_]+):\s*{/gm)].map(x => x[1]);
  console.log('Weapons in SPELL_DEFS (' + keys.length + '):', keys);
}

const p = spells.match(/const PASSIVES_DEF = {([\s\S]*?)class/);
if (p) {
  const keys2 = [...p[1].matchAll(/^\s+([a-zA-Z0-9_]+):\s*{/gm)].map(x => x[1]);
  console.log('Passives in PASSIVES_DEF (' + keys2.length + '):', keys2);
}
