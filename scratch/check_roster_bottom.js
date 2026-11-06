const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const lines = html.split('\n');
console.log('--- L4345 to L4375 ---');
for (let i = 4344; i < 4375; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
