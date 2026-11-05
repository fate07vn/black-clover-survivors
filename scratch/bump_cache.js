const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Bump cache buster from bc186 to bc187
indexHtml = indexHtml.replace(/\?v=bc186/g, '?v=bc187');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Bumped cache buster to v=bc187 in index.html');
