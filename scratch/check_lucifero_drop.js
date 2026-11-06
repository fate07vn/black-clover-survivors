const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');

console.log('L4250:', lines[4249]);
console.log('L4255:', lines[4254]);
console.log('L4256:', lines[4255]);

// find drawBossLucifero end
let luciferoStart = -1;
let dropStart = -1;
lines.forEach((l, i) => {
  if (l.includes('drawBossLucifero(')) luciferoStart = i;
  if (l.includes('drawDrop(')) dropStart = i;
});

console.log('drawBossLucifero at line:', luciferoStart + 1);
console.log('drawDrop at line:', dropStart + 1);
console.log('Lines between:', dropStart - luciferoStart);
