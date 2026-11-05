const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const start = gameJs.indexOf('openTreasureChest() {');
const end = gameJs.indexOf('// =========================================================================\n  // MŨI TÊN & NÚT CHỈ HƯỚNG ĐẾN RƯƠNG CỔ VẬT');
console.log('Lines length:', end - start);
console.log(gameJs.slice(start, start + 600));
