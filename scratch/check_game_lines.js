const fs = require('fs');
const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');

const lines = code.split('\n');
console.log('--- L1725 to L1750 ---');
for (let i = 1724; i < 1750; i++) console.log(`L${i+1}: ${lines[i]}`);

console.log('--- L3030 to L3055 ---');
for (let i = 3029; i < 3055; i++) console.log(`L${i+1}: ${lines[i]}`);
