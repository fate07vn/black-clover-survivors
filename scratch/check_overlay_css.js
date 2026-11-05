const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const m = html.match(/#levelUpOverlay\s*{([^}]*)}/g);
console.log('All #levelUpOverlay CSS rules:');
m.forEach((rule, i) => console.log(`${i+1}:`, rule));
