const fs = require('fs');

global.window = global;
eval(fs.readFileSync('src/spells.js', 'utf8'));

console.log('--- INSPECTING ALL WEAPONS IN SPELL_DEFS ---');
for (const [id, def] of Object.entries(SPELL_DEFS)) {
  if (def.type === 'weapon') {
    const evo = def.evolution || (def.evolutions ? def.evolutions[0] : null);
    const req = def.requires;
    const evoDef = evo ? SPELL_DEFS[evo] : null;
    const superDef = evoDef ? (evoDef.evolution || (evoDef.evolutions ? evoDef.evolutions[0] : null)) : null;
    const superEvoDef = superDef ? SPELL_DEFS[superDef] : null;
    const reqDef = req ? SPELL_DEFS[req] : null;

    console.log(`[${id}] ${def.name}`);
    console.log(`   ➔ Requires Book: [${req}] -> ${reqDef ? reqDef.name : 'MISSING REQ DEF!'}`);
    console.log(`   ➔ Evo Tier 2: [${evo}] -> ${evoDef ? evoDef.name : 'MISSING EVO DEF!'}`);
    console.log(`   ➔ Super Tier 3: [${superDef}] -> ${superEvoDef ? superEvoDef.name : 'No Super'}`);

    if (evo && !evoDef) {
      console.error(`❌ BROKEN EVO LINK: weapon ${id} has evolution ${evo} which is undefined in SPELL_DEFS!`);
    }
    if (req && !reqDef) {
      console.error(`❌ BROKEN REQ LINK: weapon ${id} requires ${req} which is undefined in SPELL_DEFS!`);
    }
  }
}
