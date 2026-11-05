const fs = require('fs');

function cleanArtifactsFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  // Find yami_dark_pipe ending
  const yamiMarker = "cooldown: 5\n  }";
  const yamiIdx = content.indexOf(yamiMarker);
  if (yamiIdx === -1) {
    console.error('Could not find yami_dark_pipe in', filepath);
    return;
  }

  // Find start of IN_RUN_ARTIFACT_DEFS
  const inRunMarker = "// CỔ VẬT TRẬN ĐẤU / CHIẾN TRƯỜNG";
  const inRunIdx = content.indexOf(inRunMarker);
  if (inRunIdx === -1) {
    console.error('Could not find inRunMarker in', filepath);
    return;
  }

  // Between yami_dark_pipe end and IN_RUN_ARTIFACT_DEFS, close ARTIFACT_DEFS cleanly:
  const newMiddle = "cooldown: 5\n  }\n};\n\n// =========================================================================\n";
  const before = content.slice(0, yamiIdx);
  const after = content.slice(inRunIdx);

  content = before + newMiddle + after;
  fs.writeFileSync(filepath, content, 'utf8');
  console.log('Successfully cleaned', filepath);
}

cleanArtifactsFile('src/artifacts.js');
cleanArtifactsFile('src/artifacts_2.js');
