const fs = require('fs');

const artJs = fs.readFileSync('src/artifacts.js', 'utf8');
const idx = artJs.indexOf('const ARTIFACT_DEFS = {');
const endIdx = artJs.indexOf('// =========================================================================\n// 2. BỘ CỔ VẬT TRONG MAP');
console.log(artJs.slice(idx, endIdx));
