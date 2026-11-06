const fs = require('fs');

const gameJs = fs.readFileSync('src/game.js', 'utf8');

function showMethod(name) {
  const idx = gameJs.indexOf(name);
  if (idx === -1) {
    console.log(`Method ${name} not found`);
    return;
  }
  console.log(`=== ${name} ===`);
  console.log(gameJs.slice(idx, idx + 1200));
}

showMethod('openTreasureChest');
showMethod('selectChestArtifact');
showMethod('obtainChestArtifact');
showMethod('drawChestDirectionPointers');
