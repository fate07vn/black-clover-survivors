const fs = require('fs');

const indexHtml = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = indexHtml.split('\n');
console.log('--- index.html lines 6815 to 6845 ---');
for (let i = 6814; i < 6845; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
