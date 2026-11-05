const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- LINES 615-680 (LEVEL UP CSS) ---');
console.log(lines.slice(615, 680).join('\n'));

console.log('--- FIND .level-card IN CSS ---');
lines.forEach((l, i) => {
  if (l.includes('.level-card') && l.includes('{')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});
