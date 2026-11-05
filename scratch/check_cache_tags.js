const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/v=bc\d+/g)].map(m => m[0]);
console.log('All cache buster tags in index.html:', [...new Set(matches)]);
