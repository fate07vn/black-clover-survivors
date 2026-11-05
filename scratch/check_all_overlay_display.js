const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/(#[a-zA-Z0-9_-]+(?:Overlay|Modal)[^\{]*\{[^\}]*\})/g)].map(m => m[1]);
console.log('Found ID overlay rules:', matches.length);
matches.forEach((m, i) => {
  if (m.includes('display:') && m.includes('!important')) {
    console.log(`⚠️ Problematic rule #${i+1}:\n${m}`);
  }
});
