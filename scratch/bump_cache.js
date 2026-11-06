const fs = require('fs');

const indexPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/v=bc195/g, 'v=bc196');
fs.writeFileSync(indexPath, html, 'utf8');

console.log('Bumped cache buster to v=bc196 in index.html');
