const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
console.log('--- L4745 to L4800 ---');
for (let i = 4744; i < 4800; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
