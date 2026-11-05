const fs = require('fs');
const lines = fs.readFileSync('src/artifacts.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('IN_RUN_ARTIFACT_DEFS') || l.includes('MAP_ARTIFACT_DEFS')) {
    console.log(`artifacts.js:${i+1}: ${l}`);
  }
});
