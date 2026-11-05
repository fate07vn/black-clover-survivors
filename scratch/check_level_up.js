const fs = require('fs');

console.log('--- FIND LEVEL UP IN INDEX.HTML ---');
const html = fs.readFileSync('index.html', 'utf8');
html.split('\n').forEach((l, i) => {
  if (l.includes('levelUp') || l.includes('level-up') || l.includes('Level Up')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});

console.log('--- FIND LEVEL UP IN GAME.JS ---');
const game = fs.readFileSync('src/game.js', 'utf8');
game.split('\n').forEach((l, i) => {
  if (l.includes('showLevelUp') || l.includes('levelUpChoices') || l.includes('renderLevelUp')) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
