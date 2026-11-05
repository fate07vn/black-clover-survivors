const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- TOP NAV BAR (lines 3840 - 3880) ---');
lines.forEach((l, i) => {
  if (l.includes('id="topNavBar"') || (i > 3830 && i < 3870)) console.log(i+1, l);
});
