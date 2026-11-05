const fs = require('fs');
const lines = fs.readFileSync('src/game.js', 'utf8').split('\n');

console.log('--- LINES 1720-1735 ---');
console.log(lines.slice(1718, 1735).join('\n'));

console.log('--- LINES 2775-2815 ---');
console.log(lines.slice(2775, 2815).join('\n'));
