const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
console.log('--- L5185 to L5270 ---');
for (let i = 5184; i < 5270; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
