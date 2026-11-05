const fs = require('fs');

const game = fs.readFileSync('src/game.js', 'utf8');
const lines = game.split('\n');

console.log('--- LINES 2150-2260 ---');
console.log(lines.slice(2150, 2260).join('\n'));
