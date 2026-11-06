const fs = require('fs');
const path = require('path');

function getTrackedFiles(dir) {
  let list = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (['node_modules', 'scratch', '.git'].includes(item.name)) continue;
      list = list.concat(getTrackedFiles(full));
    } else {
      if (['cloudflared.exe', 'users.json'].includes(item.name)) continue;
      list.push(full);
    }
  }
  return list;
}

const root = path.join(__dirname, '..');
const files = getTrackedFiles(root);
let totalBytes = 0;
console.log('--- TRACKED REPOSITORY FILES ---');
for (const f of files) {
  const stat = fs.statSync(f);
  totalBytes += stat.size;
  const rel = path.relative(root, f);
  console.log(`${rel.padEnd(30)} ${(stat.size / 1024).toFixed(1).padStart(8)} KB`);
}
console.log('--------------------------------');
console.log(`TOTAL PROJECT SIZE FOR GITHUB: ${(totalBytes / 1024).toFixed(1)} KB (~${(totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
