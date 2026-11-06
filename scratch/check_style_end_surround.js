const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
for (let i = 4135; i < 4165; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
