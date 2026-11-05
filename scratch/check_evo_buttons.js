const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/<button[^>]*onclick="[^"]*openEvolutionModal[^"]*"[^>]*>([\s\S]*?)<\/button>/gi)];
console.log('Buttons calling openEvolutionModal():', matches.length);
matches.forEach((m, i) => console.log(`${i+1}: ${m[0]}`));
