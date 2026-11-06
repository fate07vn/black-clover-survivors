const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const m = [...html.matchAll(/(id="[^"]+"|class="[^"]+")[^>]*style="[^"]*z-index:\s*([0-9]+)[^"]*"/gi)];
console.log('Inline z-indexes:');
m.forEach(x => console.log(x[0]));

const mCss = [...html.matchAll(/(#[a-zA-Z0-9_-]+|\.[a-zA-Z0-9_-]+)\s*\{[^}]*z-index:\s*([0-9]+)[^}]*\}/gi)];
console.log('CSS z-indexes:');
mCss.forEach(x => console.log(x[0]));
