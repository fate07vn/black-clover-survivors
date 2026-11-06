const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('href="style.css?v=bc177"', 'href="style.css?v=bc190"');
fs.writeFileSync('index.html', html, 'utf8');
console.log('style.css cache buster bumped to v=bc190.');
