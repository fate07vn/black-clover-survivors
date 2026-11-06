const fs = require('fs');

const spritesPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js';
let code = fs.readFileSync(spritesPath, 'utf8');

code = code.replace(/this\.getLegAnim\([^)]*\)/g, 'this.getWalkAnim(p, tick)');

fs.writeFileSync(spritesPath, code, 'utf8');
console.log('Fixed getWalkAnim in src/sprites.js');
