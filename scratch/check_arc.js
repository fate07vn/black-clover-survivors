const fs = require('fs');
const glob = ['index.html', 'src/game.js', 'src/sprites.js', 'src/spells.js', 'src/enemies.js', 'src/artifacts.js'];

glob.forEach(f => {
  const c = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('.arc(')) {
      // print if it mentions gold, yellow, bg, or menu
      if (l.includes('ctx.') || l.includes('.arc')) {
        const snippet = lines.slice(Math.max(0, i-2), Math.min(lines.length, i+3)).join(' | ');
        if (snippet.includes('bg') || snippet.includes('Menu') || snippet.includes('menu') || snippet.includes('particle') || snippet.includes('ambient') || snippet.includes('orb')) {
          console.log(`${f}:${i+1} -> ${l.trim()} | context: ${snippet.substring(0, 100)}`);
        }
      }
    }
  });
});
