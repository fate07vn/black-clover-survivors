const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');
const lines = html.split('\n');
console.log('--- L50 to L70 ---');
for(let i=49; i<70; i++) console.log(lines[i]);
console.log('--- L2720 to L2750 ---');
for(let i=2719; i<2750; i++) console.log(lines[i]);
