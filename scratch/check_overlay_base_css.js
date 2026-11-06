const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

html.split('\n').forEach((l, i) => {
  if (l.includes('.overlay') && (l.includes('{') || l.includes('display'))) {
    console.log(`${i+1}: ${l}`);
  }
});
