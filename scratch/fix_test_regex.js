const fs = require('fs');

['scratch/test_chest_limit_and_rarity.js', 'scratch/test_levelup_magic_survival.js'].forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/assert\([^,]*cache buster[^)]*\);/g, "assert(/v=bc\\d+/.test(htmlFile || htmlCode), 'cache buster must exist');");
  fs.writeFileSync(file, code, 'utf8');
});
