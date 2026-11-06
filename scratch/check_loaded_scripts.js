const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const scriptMatches = indexHtml.match(/<script src="[^"]+"><\/script>/g);
console.log('Scripts loaded in index.html:');
console.log(scriptMatches);
