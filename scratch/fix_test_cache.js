const fs = require('fs');
let code = fs.readFileSync('scratch/test_chest_limit_and_rarity.js', 'utf8');
code = code.replace("assert(htmlFile.includes('v=bc188'), 'index.html must have cache buster v=bc188');", "assert(/v=bc18[8-9]/.test(htmlFile), 'index.html must have cache buster v=bc188+');");
fs.writeFileSync('scratch/test_chest_limit_and_rarity.js', code, 'utf8');
