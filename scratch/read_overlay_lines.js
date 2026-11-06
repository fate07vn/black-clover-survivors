const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log(html.split('\n').slice(50, 75).join('\n'));
