const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
console.log('--- L4260 to L4340 ---');
for (let i = 4259; i < 4350; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
