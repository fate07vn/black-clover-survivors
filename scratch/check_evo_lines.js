const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- LINES 4660-4710 OF INDEX.HTML ---');
console.log(lines.slice(4660, 4710).join('\n'));

console.log('--- LINES 5740-5820 OF INDEX.HTML ---');
console.log(lines.slice(5740, 5820).join('\n'));
