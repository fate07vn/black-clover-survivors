const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const lines = code.split('\n');

// Check line range for drawPlayerSprite
console.log('L314:', lines[313]);
for (let i = 313; i < 395; i++) {
  console.log(`L${i+1}: ${lines[i]}`);
}
