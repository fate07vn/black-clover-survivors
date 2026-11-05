const fs = require('fs');

console.log('--- FIND .evo-recipe IN INDEX.HTML ---');
const html = fs.readFileSync('index.html', 'utf8');
html.split('\n').forEach((l, i) => {
  if (l.includes('evo-recipe') || l.includes('evo-flow')) {
    console.log(`index.html:${i+1}: ${l}`);
  }
});

console.log('--- FIND .evo-recipe IN STYLE.CSS ---');
const css = fs.readFileSync('style.css', 'utf8');
css.split('\n').forEach((l, i) => {
  if (l.includes('evo-recipe') || l.includes('evo-flow')) {
    console.log(`style.css:${i+1}: ${l}`);
  }
});
