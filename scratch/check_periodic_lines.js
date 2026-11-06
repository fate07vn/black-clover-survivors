const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');
console.log(lines.slice(3160, 3195).join('\n'));
