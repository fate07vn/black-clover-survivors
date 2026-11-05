const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('<div id="levelUpOverlay"');
console.log(html.slice(start, start + 1200));
