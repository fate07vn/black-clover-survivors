const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const m = [...html.matchAll(/class="[^"]*start-screen[^"]*"|id="menuOverlay"[\s\S]*?<div class="hero-selection/gi)];
console.log(m.map(x => x[0].slice(0, 1000)));
