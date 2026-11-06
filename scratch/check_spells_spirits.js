const fs = require('fs');

const spells = fs.readFileSync('src/spells.js', 'utf8');
const lines = spells.split('\n');
console.log(lines.slice(4230, 4420).join('\n'));
