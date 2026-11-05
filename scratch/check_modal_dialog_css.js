const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const m = [...html.matchAll(/(\.modal-dialog-box|\.modal-body-scrollable|\.modal-overlay-custom)\s*\{[^}]*\}/g)].map(x => x[0]);
console.log('Modal CSS rules:');
m.forEach(r => console.log(r));
