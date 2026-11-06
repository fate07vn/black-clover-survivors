const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log(html.split('\n').slice(5090, 5125).join('\n'));
