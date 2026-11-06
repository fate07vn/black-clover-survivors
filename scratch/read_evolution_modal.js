const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- HTML OF evolutionModal (lines 4660 - 4710) ---');
console.log(lines.slice(4660, 4715).join('\n'));

console.log('--- JS OF renderEvolutionRecipes (lines 5740 - 5860) ---');
console.log(lines.slice(5740, 5860).join('\n'));
