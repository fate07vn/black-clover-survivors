const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const startCss = indexHtml.indexOf('.chest-card {');
console.log(indexHtml.slice(startCss, startCss + 2000));
