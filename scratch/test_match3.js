const fs = require('fs');
let html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const targetSelectHeroOld = `    // Showcase & Char Info Sync
    function selectHero(charId) {
      selectedHeroId = charId;
      if (gameInstance) gameInstance.selectedCharId = charId;
      updateSelectedCharInfo(charId);
      renderCharRosterGrid();
    }

    function updateSelectedCharInfo(id) {
      const allChars = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : (window.CHARACTERS || {});
      const allSpells = (typeof SPELL_DEFS !== 'undefined') ? SPELL_DEFS : (window.SPELL_DEFS || {});
      const c = allChars[id] || allChars['asta'];
      if (!c) return;

      const avEl = document.getElementById('scAvatarRing');
      const nameEl = document.getElementById('scHeroName');
      const badgeEl = document.getElementById('scRarityBadge');
      const titleEl = document.getElementById('scHeroTitle');
      const squadEl = document.getElementById('scSquadBadge');
      const magicEl = document.getElementById('scMagicBadge');
      const ownedEl = document.getElementById('scOwnedBadge');
      const weaponEl = document.getElementById('scWeaponName');
      const evoEl = document.getElementById('scEvoName');
      const superEvoEl = document.getElementById('scSuperEvoName');
      const mapEl = document.getElementById('scMapName');
      const statsEl = document.getElementById('scStatsSummary');
      const traitEl = document.getElementById('scSpecialTrait');

      const g = ensureGameInstance();
      if (avEl) avEl.innerText = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[id]) || '🍀';
      if (nameEl) nameEl.innerText = c.name.toUpperCase();
      if (badgeEl) {
        badgeEl.className = \`showcase-rarity-badge \${c.rarity}\`;
        badgeEl.innerText = {
          legendary: '⭐ THẦN THOẠI',
          epic: '✨ SỬ THI',
          rare: '🌟 HIẾM',
          common: '🔹 PHỔ THÔNG'
        }[c.rarity] || c.rarity.toUpperCase();
      }
      if (titleEl) titleEl.innerText = c.title || '';
      if (squadEl) squadEl.innerText = window.getSquadBadge ? window.getSquadBadge(c.squad) : \`🛡️ \${c.squad || 'Clover'}\`;
      if (magicEl) magicEl.innerText = \`✨ \${c.magic || 'Ma Pháp'}\`;
      if (ownedEl && g) {
        const total = Object.keys(allChars).length;
        ownedEl.innerText = \`🏆 Sở Hữu: \${g.unlockedCharacters ? g.unlockedCharacters.size : total}/\${total}\`;
      }

      const wDef = allSpells[c.startingWeapon];
      if (weaponEl) weaponEl.innerText = wDef ? \`\${wDef.icon || '⚔️'} \${wDef.name}\` : c.startingWeapon;

      const evoDef = wDef && wDef.evolution ? allSpells[wDef.evolution] : null;
      const reqDef = wDef && wDef.requires ? allSpells[wDef.requires] : null;
      const superDef = evoDef && evoDef.evolution ? allSpells[evoDef.evolution] : null;

      if (evoEl) evoEl.innerText = evoDef ? \`\${evoDef.icon || '⭐'} \${evoDef.name}\` : 'Chưa Khai Mở';
      const evoReqEl = document.getElementById('scEvoReq');
      if (evoReqEl) {
        evoReqEl.innerHTML = evoDef ? \`Yêu cầu: <b>Vũ khí Cấp 5</b> + <b>Sách \${reqDef ? reqDef.name : 'Không cần'}</b>\` : '';
      }

      if (superEvoEl) superEvoEl.innerText = superDef ? \`\${superDef.icon || '🌟'} \${superDef.name}\` : 'Chưa Khai Mở';
      const superEvoReqEl = document.getElementById('scSuperEvoReq');
      if (superEvoReqEl) {
        superEvoReqEl.innerHTML = superDef ? \`Yêu cầu: Kỹ năng chính + <b>Nhân vật đạt Cấp 10+</b>\` : '';
      }

      if (mapEl) {
        const diffDef = (window.MAP_DIFFICULTIES && window.MAP_DIFFICULTIES[selectedDifficulty]) || { icon: '🟢', name: 'Bình Thường' };
        const mapName = selectedMapId === 'underworld_palace' ? 'Map 2: Đại Ma Cung Minh Giới' : 'Map 1: Vương Quốc Clover';
        mapEl.innerText = \`\${mapName} (\${diffDef.icon} \${diffDef.name}) ▾\`;
      }

      if (statsEl) {
        statsEl.innerText = \`HP: \${c.baseHp} | Tốc Độ: \${c.baseSpeed} | Giáp: \${Math.round((c.baseArmor || 0) * 100)}%\`;
      }
      if (traitEl) traitEl.innerText = c.specialTrait || '';
    }`;

console.log('selectHeroOld match:', html.includes(targetSelectHeroOld));
