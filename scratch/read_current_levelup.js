const fs = require('fs');

console.log('--- INDEX.HTML LEVEL UP MODAL ---');
const html = fs.readFileSync('index.html', 'utf8');
const linesHtml = html.split('\n');
console.log(linesHtml.slice(4440, 4495).join('\n'));

console.log('--- GAME.JS RENDER LEVEL UP ---');
const game = fs.readFileSync('src/game.js', 'utf8');
const linesGame = game.split('\n');
console.log(linesGame.slice(2145, 2260).join('\n'));
