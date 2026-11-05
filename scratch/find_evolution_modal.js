const fs = require('fs');

console.log('--- FIND evolutionModal IN INDEX.HTML ---');
const html = fs.readFileSync('index.html', 'utf8');
html.split('\n').forEach((l, i) => {
  if (l.includes('evolutionModal') || l.includes('openEvolutionModal') || l.includes('renderEvolution') || l.includes('closeEvolutionModal')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});

console.log('--- FIND evolutionModal IN GAME.JS ---');
const game = fs.readFileSync('src/game.js', 'utf8');
game.split('\n').forEach((l, i) => {
  if (l.includes('evolutionModal') || l.includes('openEvolutionModal') || l.includes('renderEvolution') || l.includes('closeEvolutionModal') || l.includes('EvolutionModal')) {
    console.log(`game.js:${i+1}: ${l}`);
  }
});
