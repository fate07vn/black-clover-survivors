const fs = require('fs');

function patchGameFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  // 1. Add getArtifactArtSvg helper to Game class if not present
  if (!content.includes('getArtifactArtSvg(artId')) {
    const helperCode = `
  getArtifactArtSvg(artId, rarityColor = '#38bdf8') {
    if (artId === 'magitech_module') {
      return \`<svg viewBox="0 0 72 72" width="62" height="62" style="display:block;margin:auto;">
        <!-- Two vertical silver rails -->
        <line x1="20" y1="8" x2="20" y2="64" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/>
        <line x1="52" y1="8" x2="52" y2="64" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/>
        <!-- Red coils on rails -->
        <rect x="15" y="16" width="10" height="6" rx="2" fill="#ef4444"/>
        <rect x="15" y="32" width="10" height="6" rx="2" fill="#ef4444"/>
        <rect x="15" y="48" width="10" height="6" rx="2" fill="#ef4444"/>
        <rect x="47" y="16" width="10" height="6" rx="2" fill="#ef4444"/>
        <rect x="47" y="32" width="10" height="6" rx="2" fill="#ef4444"/>
        <rect x="47" y="48" width="10" height="6" rx="2" fill="#ef4444"/>
        <!-- Electric green zig-zag sparks between rails -->
        <path d="M 24 19 L 34 23 L 30 28 L 48 19" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 24 35 L 36 38 L 32 43 L 48 35" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 24 51 L 38 53 L 33 58 L 48 51" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
      </svg>\`;
    }
    if (artId === 'holy_cross') {
      return \`<svg viewBox="0 0 72 72" width="62" height="62" style="display:block;margin:auto;">
        <!-- Ornate silver cross body -->
        <path d="M 31 6 L 41 6 L 41 23 L 58 23 L 58 33 L 41 33 L 41 66 L 31 66 L 31 33 L 14 33 L 14 23 L 31 23 Z" fill="#e2e8f0" stroke="#334155" stroke-width="2"/>
        <line x1="36" y1="10" x2="36" y2="62" stroke="#94a3b8" stroke-width="1.5"/>
        <line x1="18" y1="28" x2="54" y2="28" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Crimson ruby gems -->
        <circle cx="36" cy="28" r="4.8" fill="#e11d48" stroke="#ffffff" stroke-width="1.2"/>
        <circle cx="36" cy="10" r="2.8" fill="#e11d48"/>
        <circle cx="36" cy="60" r="2.8" fill="#e11d48"/>
        <circle cx="18" cy="28" r="2.8" fill="#e11d48"/>
        <circle cx="54" cy="28" r="2.8" fill="#e11d48"/>
      </svg>\`;
    }
    if (artId === 'dimensional_backpack') {
      return \`<svg viewBox="0 0 72 72" width="62" height="62" style="display:block;margin:auto;">
        <!-- Tan leather backpack -->
        <path d="M 22 20 C 22 13 50 13 50 20 L 54 53 C 54 59 18 59 18 53 Z" fill="#d97706" stroke="#78350f" stroke-width="2"/>
        <path d="M 20 20 C 20 16 52 16 52 20 L 48 34 C 36 38 36 38 24 34 Z" fill="#b45309" stroke="#78350f" stroke-width="1.5"/>
        <!-- Center cyclops buckle -->
        <circle cx="36" cy="30" r="4.5" fill="#38bdf8" stroke="#0369a1" stroke-width="1.5"/>
        <path d="M 18 32 L 14 36 L 14 48 L 18 46 Z" fill="#92400e"/>
        <path d="M 54 32 L 58 36 L 58 48 L 54 46 Z" fill="#92400e"/>
        <rect x="18" y="53" width="36" height="8" rx="4" fill="#ca8a04" stroke="#78350f" stroke-width="1.5"/>
      </svg>\`;
    }
    if (artId === 'uranium_core') {
      return \`<svg viewBox="0 0 72 72" width="62" height="62" style="display:block;margin:auto;">
        <circle cx="36" cy="36" r="23" fill="#064e3b" stroke="#10b981" stroke-width="3"/>
        <circle cx="36" cy="36" r="13" fill="#10b981" opacity="0.6"/>
        <circle cx="36" cy="36" r="6" fill="#6ee7b7"/>
        <path d="M 36 13 L 36 21 M 36 51 L 36 59 M 13 36 L 21 36 M 51 36 L 59 36" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/>
      </svg>\`;
    }
    if (artId === 'blood_grail') {
      return \`<svg viewBox="0 0 72 72" width="62" height="62" style="display:block;margin:auto;">
        <path d="M 22 15 L 50 15 L 46 39 C 46 47 26 47 26 39 Z" fill="#1e1b4b" stroke="#fbbf24" stroke-width="2"/>
        <path d="M 26 21 L 46 21 C 44 34 28 34 26 21 Z" fill="#e11d48"/>
        <line x1="36" y1="42" x2="36" y2="56" stroke="#fbbf24" stroke-width="3"/>
        <ellipse cx="36" cy="58" rx="14" ry="4" fill="#b45309" stroke="#fbbf24" stroke-width="2"/>
      </svg>\`;
    }
    return null;
  }
`;
    // Insert right before renderTreasureChestModal
    content = content.replace('renderTreasureChestModal() {', helperCode + '\n  renderTreasureChestModal() {');
  }

  // 2. Fix allDefs in renderTreasureChestModal and updateChestDetailsView
  content = content.replace(
    'const allDefs = window.ARTIFACT_DEFS || {};',
    'const allDefs = window.IN_RUN_ARTIFACT_DEFS || window.ARTIFACT_DEFS || {};'
  );

  // 3. Update card.innerHTML in renderTreasureChestModal to use getArtifactArtSvg
  const oldCardInner = `<div class="chest-card-art-box" style="filter: drop-shadow(0 0 10px \${rarityColor});">
            \${def.icon}
          </div>`;
  const newCardInner = `\${(() => {
          const svgArt = this.getArtifactArtSvg(artId, rarityColor);
          return \`<div class="chest-card-art-box" style="filter: drop-shadow(0 0 10px \${rarityColor});">
            \${svgArt ? svgArt : def.icon}
          </div>\`;
        })()}`;

  if (content.includes(oldCardInner)) {
    content = content.replace(oldCardInner, newCardInner);
  }

  // 4. Update updateChestDetailsView to use svgArt in crestIconEl
  const oldCrestUpdate = `if (crestIconEl) {
      crestIconEl.textContent = (def.icon ? def.icon.slice(0, 2) : '🏺');
    }`;
  const newCrestUpdate = `if (crestIconEl) {
      const svgArt = this.getArtifactArtSvg(artId, '#38bdf8');
      if (svgArt) {
        crestIconEl.innerHTML = svgArt;
      } else {
        crestIconEl.textContent = (def.icon ? def.icon.slice(0, 2) : '🏺');
      }
    }`;
  if (content.includes(oldCrestUpdate)) {
    content = content.replace(oldCrestUpdate, newCrestUpdate);
  }

  // 5. Clean up obtainChestArtifact to NOT add to permanent collection
  const oldCollectionBlock = `    // Also register into permanent collection
    if (!this.artifacts.collection[chosenId]) {
      this.artifacts.collection[chosenId] = { star: 1, count: 1 };
    } else {
      this.artifacts.collection[chosenId].count = (this.artifacts.collection[chosenId].count || 1) + 1;
      if (this.artifacts.collection[chosenId].star < 3) {
        this.artifacts.collection[chosenId].star++;
      }
    }`;
  const newCollectionBlock = `    // Cổ vật trận đấu (In-Run Artifacts): Hoàn toàn tách biệt với Cổ Vật Sảnh (không ghi đè collection)`;
  if (content.includes(oldCollectionBlock)) {
    content = content.replace(oldCollectionBlock, newCollectionBlock);
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log('Successfully patched', filepath);
}

patchGameFile('src/game.js');
patchGameFile('src/game_2.js');
