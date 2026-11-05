const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');
console.log(lines.slice(3155, 3295).join('\n'));
