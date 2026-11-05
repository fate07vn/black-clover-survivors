const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const start = gameJs.indexOf('openTreasureChest() {');
console.log(gameJs.slice(start, start + 3200));
