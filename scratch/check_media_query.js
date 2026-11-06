const fs = require('fs');
const css = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/style.css', 'utf8');

const lines = css.split('\n');
for (let i = 2715; i < 2760; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
