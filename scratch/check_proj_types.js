const fs = require('fs');
const code = fs.readFileSync('src/spells.js', 'utf8');
const matches = [...code.matchAll(/type:\s*['"]([a-zA-Z0-9_]+)['"]/g)].map(m => m[1]);
console.log('Unique projectile types:', [...new Set(matches)]);
