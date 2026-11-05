const fs = require('fs');

const artifacts = fs.readFileSync('src/artifacts.js', 'utf8');
console.log('=== ARTIFACT_DEFS keys ===');
const defsMatch = artifacts.match(/const ARTIFACT_DEFS = {([\s\S]*?)};/);
if (defsMatch) {
  const keys = defsMatch[1].match(/([a-zA-Z0-9_]+): \{/g);
  console.log('ARTIFACT_DEFS:', keys ? keys.map(k => k.replace(': {', '')) : []);
}

console.log('\n=== IN_RUN_ARTIFACT_DEFS keys ===');
const inRunMatch = artifacts.match(/const IN_RUN_ARTIFACT_DEFS = {([\s\S]*?)};/);
if (inRunMatch) {
  const keys = inRunMatch[1].match(/([a-zA-Z0-9_]+): \{/g);
  console.log('IN_RUN_ARTIFACT_DEFS:', keys ? keys.map(k => k.replace(': {', '')) : []);
}
