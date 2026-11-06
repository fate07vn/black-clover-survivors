const fs = require('fs');
const css = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/style.css', 'utf8');

console.log('style.css length:', css.length);
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('#menuOverlay') || l.includes('#topNavBar') || l.includes('.overlay') || l.includes('hidden') || l.includes('z-index')) {
    console.log(`style.css L${i+1}: ${l.trim()}`);
  }
});
