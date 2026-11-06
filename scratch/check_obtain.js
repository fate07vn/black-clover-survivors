const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');
const idx = gameJs.indexOf('obtainChestArtifact()');
console.log(gameJs.slice(idx, idx + 1000));
