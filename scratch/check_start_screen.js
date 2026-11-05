const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('--- FIND startScreen IN INDEX.HTML ---');
html.split('\n').forEach((l, i) => {
  if (l.includes('startScreen') || l.includes('start-screen') || l.includes('menuOverlay') || l.includes('lobbyScreen')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});
