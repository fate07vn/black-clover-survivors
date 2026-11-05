const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const idx = indexHtml.indexOf('id="treasureChestOverlay"');
console.log('=== TREASURE CHEST OVERLAY HTML ===');
console.log(indexHtml.slice(idx, idx + 1500));

console.log('\n=== CHECKING SYLPH WEAPONS ===');
const spells = fs.readFileSync('src/spells.js', 'utf8');
const hasSylphSpirits = spells.includes('sylph_spirits:');
const hasMagicBlade = spells.includes('spirit_magic_blade:');
const hasFamiliar = spells.includes('spirit_familiar:');
console.log({ hasSylphSpirits, hasMagicBlade, hasFamiliar });

console.log('\n=== CHECKING ARTIFACTS ===');
const artifacts = fs.readFileSync('src/artifacts.js', 'utf8');
const hasInRunDefs = artifacts.includes('IN_RUN_ARTIFACT_DEFS');
console.log({ hasInRunDefs });
