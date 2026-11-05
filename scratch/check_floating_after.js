const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const start = gameJs.indexOf('this.spells.floatingTexts.push({');
console.log(gameJs.slice(start, start + 1000));
