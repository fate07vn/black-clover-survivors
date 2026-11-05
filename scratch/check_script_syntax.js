const fs = require('fs');

console.log('--- 1. CHECK SCRIPT TAGS IN INDEX.HTML ---');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatches = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m => m[1]);
console.log('Scripts in index.html:', scriptMatches);

console.log('--- 2. SYNTAX CHECK EACH SCRIPT FILE ---');
scriptMatches.forEach(scriptPath => {
  const cleanPath = scriptPath.split('?')[0];
  try {
    const code = fs.readFileSync(cleanPath, 'utf8');
    new Function(code);
    console.log(`✓ ${cleanPath} syntax OK (${code.length} bytes)`);
  } catch (err) {
    console.error(`❌ SYNTAX ERROR in ${cleanPath}:`, err.message);
    console.error(err.stack);
  }
});
