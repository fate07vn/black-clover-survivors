const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, i) => {
  if (l.includes('ms-magic-circle-seal') || l.includes('ms-evo-book-btn') || l.includes('btnLevelUpEvo')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});
