const fs = require('fs');

const artJs = fs.readFileSync('src/artifacts.js', 'utf8');
const lines = artJs.split('\n');
console.log(lines.slice(140, 220).join('\n'));
