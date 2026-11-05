const fs = require('fs');
console.log('--- start.bat ---');
console.log(fs.readFileSync('start.bat', 'utf8'));
console.log('--- package.json ---');
console.log(fs.readFileSync('package.json', 'utf8'));
