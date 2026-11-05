const fs = require('fs');

const artJs = fs.readFileSync('src/artifacts.js', 'utf8');
const lines = artJs.split('\n');
console.log(lines.slice(220, 360).join('\n'));
