const fs = require('fs');

global.window = global;
eval(fs.readFileSync('src/spells.js', 'utf8'));

const defs = window.SPELL_DEFS;
const startingWeaponId = 'sylph_spirits';
const p = {
  startingWeaponId: 'sylph_spirits',
  level: 10,
  weapons: {
    sylph_spirits: { level: 5 }
  },
  passives: {
    wind_glide: 1
  }
};

const recipeList = [];
for (const [wId, wDef] of Object.entries(defs)) {
  if (wDef.type !== 'weapon' || !wDef.evolution) continue;

  const evoDef = defs[wDef.evolution];
  const superDef = (evoDef && evoDef.evolution) ? defs[evoDef.evolution] : null;
  const reqBookDef = wDef.requires ? defs[wDef.requires] : null;

  if (!evoDef) {
    console.log(`ERROR: ${wId} evoDef is missing!`);
  }

  recipeList.push({
    wId,
    name: wDef.name,
    evoName: evoDef ? evoDef.name : 'MISSING',
    superName: superDef ? superDef.name : 'None',
    reqBook: reqBookDef ? reqBookDef.name : 'None'
  });
}

console.log(`Total recipes found: ${recipeList.length}`);
recipeList.forEach((r, idx) => {
  console.log(`${idx + 1}. [${r.wId}] ${r.name} + [${r.reqBook}] ➔ ${r.evoName} ➔ ${r.superName}`);
});
