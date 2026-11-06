const fs = require('fs');
const game = fs.readFileSync('src/game.js', 'utf8');
const lines = game.split('\n');
console.log(lines.slice(2280, 2370).join('\n'));
