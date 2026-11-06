const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const styleLines = html.split('\n');
styleLines.forEach((l, i) => {
  if (l.includes('.overlay ') || l.includes('#menuOverlay') || l.includes('.lobby-center-card')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
