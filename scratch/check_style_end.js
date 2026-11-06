const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('</style>')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
