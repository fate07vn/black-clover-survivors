const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const startCss = indexHtml.indexOf('#treasureChestOverlay');
console.log('=== CHEST CSS ===');
console.log(indexHtml.slice(startCss, startCss + 2500));
