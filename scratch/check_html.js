const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

console.log('HTML length:', html.length);
console.log('Includes menuOverlay:', html.includes('id="menuOverlay"'));

// Find script tags
const scriptRegex = /<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const fullTag = match[0];
  const content = match[1];
  const srcMatch = fullTag.match(/src=["']([^"']+)["']/i);
  if (srcMatch) {
    console.log(`Script ${count}: External src="${srcMatch[1]}"`);
  } else {
    try {
      new Function(content);
      console.log(`Script ${count}: Inline JS syntax OK (length ${content.length})`);
    } catch (e) {
      console.error(`Script ${count}: Syntax error:`, e.message);
    }
  }
}
