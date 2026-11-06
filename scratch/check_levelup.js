const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="levelUpOverlay"') || l.includes('levelUpOverlay') || l.includes('openEvolutionModal')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
