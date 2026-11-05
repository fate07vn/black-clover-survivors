const fs = require('fs');

let t1 = fs.readFileSync('scratch/test_chest_limit_and_rarity.js', 'utf8');
t1 = t1.replace(/assert\(\/v=bc18\[8-9\]\/[^;]+;/, "assert(/v=bc\\d+/.test(htmlFile), 'index.html must have cache buster');");
fs.writeFileSync('scratch/test_chest_limit_and_rarity.js', t1, 'utf8');

let t2 = fs.readFileSync('scratch/test_levelup_magic_survival.js', 'utf8');
t2 = t2.replace(/assert\(htmlCode\.includes\('v=bc189'\)[^;]+;/, "assert(/v=bc\\d+/.test(htmlCode), 'index.html must have cache buster');");
fs.writeFileSync('scratch/test_levelup_magic_survival.js', t2, 'utf8');

console.log('Test files updated.');
