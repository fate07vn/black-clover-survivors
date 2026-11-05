const fs = require('fs');
const lines = fs.readFileSync('src/artifacts.js', 'utf8').split('\n');
console.log(lines.slice(930, 950).join('\n'));
