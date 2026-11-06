const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');
console.log(lines.slice(3920, 3960).join('\n'));
