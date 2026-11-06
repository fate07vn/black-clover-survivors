const fs = require('fs');

const indexHtml = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = indexHtml.split('\n');
console.log('--- index.html lines 5355 to 5410 ---');
for (let i = 5354; i < 5410; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
