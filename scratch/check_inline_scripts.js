const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('Total index.html lines:', html.split('\n').length);
console.log('Total bytes:', html.length);

// Extract inline scripts
const inlineScriptMatches = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Inline scripts count:', inlineScriptMatches.length);

inlineScriptMatches.forEach((m, idx) => {
  try {
    new Function(m[1]);
    console.log(`✓ Inline script #${idx + 1} syntax OK (${m[1].length} chars)`);
  } catch (err) {
    console.error(`❌ SYNTAX ERROR in inline script #${idx + 1}:`, err.message);
    console.error(err.stack);
  }
});
