const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

// Find lines containing menuOverlay
const lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('menuOverlay') || line.includes('showcase-hero-container')) {
    console.log(`L${i+1}: ${line.trim()}`);
  }
});
