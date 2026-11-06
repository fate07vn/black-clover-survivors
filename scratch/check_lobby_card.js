const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
for (let i = 1300; i < 1325; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
