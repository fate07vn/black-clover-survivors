const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- RUNNING SYNTAX CHECK SUITE ---');

const filesToTest = [
  'server.js',
  'src/audio.js',
  'src/auth.js',
  'src/sprites.js',
  'src/spells.js',
  'src/enemies.js',
  'src/artifacts.js',
  'src/game.js'
];

let failed = false;

for (const rel of filesToTest) {
  const full = path.join(__dirname, '..', rel);
  try {
    const code = fs.readFileSync(full, 'utf8');
    new vm.Script(code, { filename: rel });
    console.log(`✓ ${rel}: Syntax OK (${(code.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`✗ ${rel}: Syntax Error:`, err.message);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL JAVASCRIPT FILES PASS SYNTAX VALIDATION! 🎉');
}
