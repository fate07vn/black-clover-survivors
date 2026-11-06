const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log(html.split('\n').slice(4720, 4750).join('\n'));
