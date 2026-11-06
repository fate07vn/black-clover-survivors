const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const lines = gameJs.split('\n');
console.log(lines.slice(3575, 3630).join('\n'));
