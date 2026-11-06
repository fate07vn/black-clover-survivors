const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldCss = `#levelUpOverlay {
  background: rgba(0, 0, 0, 0.72) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 120 !important;
}`;

const newCss = `#levelUpOverlay {
  background: rgba(0, 0, 0, 0.75) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  z-index: 120 !important;
}
#levelUpOverlay.hidden {
  display: none !important;
}`;

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
  console.log('Fixed #levelUpOverlay display: flex !important bug!');
} else {
  console.error('Target CSS not found! Searching with regex...');
  const reg = /#levelUpOverlay\s*\{[\s\S]*?display:\s*flex\s*!important;[\s\S]*?z-index:\s*120\s*!important;\s*\}/;
  if (reg.test(html)) {
    html = html.replace(reg, newCss);
    console.log('Fixed #levelUpOverlay with regex!');
  } else {
    console.error('Regex did not match!');
  }
}

// Bump cache buster to v=bc190
html = html.replace(/v=bc18[0-9]/g, 'v=bc190');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html saved with cache buster v=bc190.');
