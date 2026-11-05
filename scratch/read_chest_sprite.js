const fs = require('fs');
const lines = fs.readFileSync('src/sprites.js', 'utf8').split('\n');
console.log(lines.slice(4155, 4225).join('\n'));
