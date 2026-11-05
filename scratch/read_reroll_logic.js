const fs = require('fs');
const game = fs.readFileSync('src/game.js', 'utf8');
const lines = game.split('\n');
console.log(lines.slice(2245, 2290).join('\n'));
