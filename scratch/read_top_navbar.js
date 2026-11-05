const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log(html.split('\n').slice(4110, 4150).join('\n'));
