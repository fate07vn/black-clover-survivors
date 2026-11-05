const fs = require('fs');

const artifactsJs = fs.readFileSync('src/artifacts.js', 'utf8');

// Mock window
const window = {};
eval(artifactsJs);

console.log('Total in-run artifacts:', Object.keys(window.IN_RUN_ARTIFACT_DEFS || {}).length);
console.log('Total lobby artifacts:', Object.keys(window.ARTIFACT_DEFS || {}).length);

for (const [id, def] of Object.entries(window.IN_RUN_ARTIFACT_DEFS)) {
  console.log(`- ${id} [${def.rarity}]: ${def.name} -> ${def.description.slice(0, 50)}...`);
}
