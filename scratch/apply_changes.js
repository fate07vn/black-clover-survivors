const fs = require('fs');

const indexPath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html';
const stylePath = 'C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/style.css';

let html = fs.readFileSync(indexPath, 'utf8');
let css = fs.readFileSync(stylePath, 'utf8');

// --- 1. CSS to Add ---
const newCssRules = `
/* LOBBY SELECTION BARS (Clean UI replacing large hero showcase) */
.lobby-selection-group {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 14px 0 16px 0;
}

.lobby-select-bar {
  background: rgba(15, 23, 42, 0.85);
  border: 1.5px solid rgba(245, 158, 11, 0.4);
  border-radius: 12px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
}

.lobby-select-bar:hover {
  transform: translateY(-2px);
  background: rgba(30, 41, 59, 0.95);
  border-color: #fbbf24;
  box-shadow: 0 0 18px rgba(245, 158, 11, 0.35);
}

.lobby-select-bar.lobby-map-bar {
  border-color: rgba(56, 189, 248, 0.4);
}

.lobby-select-bar.lobby-map-bar:hover {
  border-color: #38bdf8;
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.35);
}

.lobby-bar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.lobby-bar-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #f59e0b;
  background: radial-gradient(circle, #1e293b, #0f172a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
  flex-shrink: 0;
}

.lobby-bar-avatar.map-icon {
  border-color: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.35);
  font-size: 22px;
}

.lobby-bar-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
}

.lobby-bar-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #94a3b8;
  text-transform: uppercase;
}

.lobby-bar-main-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.lobby-bar-title {
  font-size: 16px;
  font-weight: 800;
  color: #fbbf24;
  letter-spacing: 0.5px;
}

.lobby-map-bar .lobby-bar-title {
  color: #f1f5f9;
  font-size: 15px;
}

.lobby-bar-action-pill {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.lobby-bar-action-pill.hero-pill {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.lobby-select-bar:hover .lobby-bar-action-pill.hero-pill {
  background: #f59e0b;
  color: #0f172a;
}

.lobby-bar-action-pill.map-pill {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.4);
}

.lobby-select-bar:hover .lobby-bar-action-pill.map-pill {
  background: #38bdf8;
  color: #0f172a;
}

/* Selected Hero Badge in Roster Grid */
.roster-active-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: linear-gradient(135deg, #059669, #10b981);
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #34d399;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  letter-spacing: 0.5px;
}

.char-roster-card.selected {
  border-color: #10b981 !important;
  box-shadow: 0 0 16px rgba(16, 185, 129, 0.45) !important;
}
`;

// Insert new CSS rules in html (before .showcase-hero-container)
if (!html.includes('.lobby-selection-group')) {
  html = html.replace('.showcase-hero-container {', newCssRules + '\n.showcase-hero-container {');
}
if (!css.includes('.lobby-selection-group')) {
  css = css.replace('.showcase-hero-container {', newCssRules + '\n.showcase-hero-container {');
}

// --- 2. Replace Lobby HTML ---
const oldLobbyHtml = `      <!-- Active Selected Hero Showcase Box -->
      <div class="showcase-hero-container">
        <div class="showcase-hero-header">
          <div id="scAvatarRing" class="showcase-avatar-ring">🗡️</div>
          <div class="showcase-title-block">
            <div class="showcase-hero-name">
              <span id="scHeroName">ASTA</span>
              <span id="scRarityBadge" class="showcase-rarity-badge common">PHỔ THÔNG</span>
            </div>
            <div id="scHeroTitle" class="showcase-hero-sub">Tam Diệp Thảo (Ngũ Diệp Thức Tỉnh)</div>
            <div class="showcase-badges-row">
              <span id="scSquadBadge" class="hero-pill-tag">🛡️ Hắc Bộc Ngưu</span>
              <span id="scMagicBadge" class="hero-pill-tag">✨ Kháng Ma Pháp</span>
              <span id="scOwnedBadge" class="hero-pill-tag" style="color: #fde047;">🏆 Sở Hữu: 26/26</span>
            </div>
          </div>
        </div>

        <div class="showcase-details-grid">
          <div class="showcase-box">
            <div class="showcase-box-label">⚔️ VŨ KHÍ KHỞI ĐẦU</div>
            <div id="scWeaponName" class="showcase-box-val">Kiếm Diệt Ma (Demon-Slayer)</div>
          </div>
          <div class="showcase-box">
            <div class="showcase-box-label">⭐ TIẾN HÓA CẤP 5 (TIER 2)</div>
            <div id="scEvoName" class="showcase-box-val gold">Hắc Đại Kiếm Hủy Diệt (Black Divider)</div>
            <div id="scEvoReq" style="font-size: 11px; color: #94a3b8; margin-top: 3px;">Yêu cầu: Vũ khí Cấp 5 + Sách Giao Ước Quỷ Dữ</div>
          </div>
          <div class="showcase-box">
            <div class="showcase-box-label">🌟 SIÊU TIẾN HÓA LẦN 2 (TIER 3)</div>
            <div id="scSuperEvoName" class="showcase-box-val purple">Tuyệt Ma Kiếm Vô Cực (Demon Slasher Infinity)</div>
            <div id="scSuperEvoReq" style="font-size: 11px; color: #c084fc; margin-top: 3px;">Yêu cầu: Kỹ năng chính + Nhân vật đạt Cấp 10+</div>
          </div>
          <div class="showcase-box">
            <div class="showcase-box-label">🗺️ BẢN ĐỒ CHIẾN TRƯỜNG</div>
            <div id="scMapName" class="showcase-box-val cyan" style="cursor: pointer;" onclick="openMapModal()" title="Nhấn để đổi bản đồ">Map 1: Vương Quốc Clover ▾</div>
          </div>
          <div class="showcase-box" style="grid-column: span 2;">
            <div class="showcase-box-label">📊 CHỈ SỐ CƠ BẢN</div>
            <div id="scStatsSummary" class="showcase-box-val">HP: 160 | Tốc Độ: 175 | Giáp: 15%</div>
          </div>
        </div>

        <div class="showcase-trait-box">
          <b>Đặc Kỹ Nội Tại:</b> <span id="scSpecialTrait">+15% Kháng Sát Thương & Cận chiến xóa tan ma pháp đạn. Cấp 8+ kích hoạt Black Asta!</span>
        </div>
      </div>`;

const newLobbyHtml = `      <!-- Clean Selection Controls on Main Screen -->
      <div class="lobby-selection-group">
        <!-- 1. Selected Character Quick Bar -->
        <div class="lobby-select-bar lobby-hero-bar" onclick="openCharSelectModal()" title="Bấm để mở danh sách và đổi Ma Đạo Sĩ">
          <div class="lobby-bar-left">
            <div id="lobbyHeroAvatar" class="lobby-bar-avatar">🗡️</div>
            <div class="lobby-bar-info">
              <div class="lobby-bar-label">MA ĐẠO SĨ XUẤT TRẬN</div>
              <div class="lobby-bar-main-row">
                <span id="lobbyHeroName" class="lobby-bar-title">ASTA</span>
                <span id="lobbyHeroRarity" class="showcase-rarity-badge common">PHỔ THÔNG</span>
                <span id="lobbyHeroSquad" class="hero-pill-tag">🛡️ Hắc Bộc Ngưu</span>
              </div>
            </div>
          </div>
          <div class="lobby-bar-action-pill hero-pill">ĐỔI MA ĐẠO SĨ ▾</div>
        </div>

        <!-- 2. Selected Battlefield Map Bar -->
        <div class="lobby-select-bar lobby-map-bar" onclick="openMapModal()" title="Bấm để đổi Bản Đồ hoặc Độ Khó">
          <div class="lobby-bar-left">
            <div class="lobby-bar-avatar map-icon">🗺️</div>
            <div class="lobby-bar-info">
              <div class="lobby-bar-label">CHIẾN TRƯỜNG & ĐỘ KHÓ</div>
              <div id="lobbyMapTitle" class="lobby-bar-title">Map 1: Vương Quốc Clover (🟢 Bình Thường)</div>
            </div>
          </div>
          <div class="lobby-bar-action-pill map-pill">ĐỔI BẢN ĐỒ ▾</div>
        </div>
      </div>`;

html = html.replace(oldLobbyHtml, newLobbyHtml);

// --- 3. Add Character Detail Modal after #charSelectModal ---
const targetCharModalEnd = `        <button class="btn-start" style="padding: 10px 32px; font-size: 15px;" onclick="closeCharSelectModal()">XÁC NHẬN CHỌN</button>
      </div>
    </div>
  </div>`;

const charDetailModalHtml = `        <button class="btn-start" style="padding: 10px 32px; font-size: 15px;" onclick="closeCharSelectModal()">XÁC NHẬN CHỌN</button>
      </div>
    </div>
  </div>

  <!-- DEDICATED CHARACTER DETAIL MODAL (BẢNG THÔNG TIN MA ĐẠO SĨ KHI ẤN VÀO NHÂN VẬT) -->
  <div id="charDetailModal" class="modal-overlay-custom hidden" style="z-index: 120;">
    <div class="modal-dialog-box" style="max-width: 780px; border-color: #f59e0b; box-shadow: 0 0 50px rgba(245, 158, 11, 0.35);">
      <div class="modal-header-bar" style="border-bottom: 1px solid rgba(245, 158, 11, 0.3);">
        <div class="modal-header-title" id="cdModalHeaderTitle">📜 HỒ SƠ CHI TIẾT MA ĐẠO SĨ</div>
        <button class="modal-btn-close" onclick="closeCharDetailModal()">✕</button>
      </div>

      <div class="modal-body-scrollable" style="padding: 16px 20px;">
        <!-- The Complete Character Info Container (Matches User Screenshot) -->
        <div class="showcase-hero-container" style="margin: 0; background: rgba(15, 23, 42, 0.85);">
          <div class="showcase-hero-header">
            <div id="cdAvatarRing" class="showcase-avatar-ring">🗡️</div>
            <div class="showcase-title-block">
              <div class="showcase-hero-name">
                <span id="cdHeroName">ASTA</span>
                <span id="cdRarityBadge" class="showcase-rarity-badge common">PHỔ THÔNG</span>
              </div>
              <div id="cdHeroTitle" class="showcase-hero-sub">Tam Diệp Thảo (Ngũ Diệp Thức Tỉnh)</div>
              <div class="showcase-badges-row">
                <span id="cdSquadBadge" class="hero-pill-tag">🛡️ Hắc Bộc Ngưu</span>
                <span id="cdMagicBadge" class="hero-pill-tag">✨ Kháng Ma Pháp</span>
                <span id="cdStatusBadge" class="hero-pill-tag" style="color: #34d399;">🔓 Đã Mở Khóa</span>
              </div>
            </div>
          </div>

          <div class="showcase-details-grid">
            <div class="showcase-box">
              <div class="showcase-box-label">⚔️ VŨ KHÍ KHỞI ĐẦU</div>
              <div id="cdWeaponName" class="showcase-box-val">Kiếm Diệt Ma (Demon-Slayer)</div>
            </div>
            <div class="showcase-box">
              <div class="showcase-box-label">⭐ TIẾN HÓA CẤP 5 (TIER 2)</div>
              <div id="cdEvoName" class="showcase-box-val gold">Hắc Đại Kiếm Hủy Diệt (Black Divider)</div>
              <div id="cdEvoReq" style="font-size: 11px; color: #94a3b8; margin-top: 3px;">Yêu cầu: Vũ khí Cấp 5 + Sách Giao Ước Quỷ Dữ</div>
            </div>
            <div class="showcase-box">
              <div class="showcase-box-label">🌟 SIÊU TIẾN HÓA LẦN 2 (TIER 3)</div>
              <div id="cdSuperEvoName" class="showcase-box-val purple">Tuyệt Ma Kiếm Vô Cực (Demon Slasher Infinity)</div>
              <div id="cdSuperEvoReq" style="font-size: 11px; color: #c084fc; margin-top: 3px;">Yêu cầu: Kỹ năng chính + Nhân vật đạt Cấp 10+</div>
            </div>
            <div class="showcase-box">
              <div class="showcase-box-label">📊 CHỈ SỐ CƠ BẢN</div>
              <div id="cdStatsSummary" class="showcase-box-val">HP: 160 | Tốc Độ: 175 | Giáp: 15%</div>
            </div>
          </div>

          <div class="showcase-trait-box">
            <b>Đặc Kỹ Nội Tại:</b> <span id="cdSpecialTrait">+15% Kháng Sát Thương & Cận chiến xóa tan ma pháp đạn. Cấp 8+ kích hoạt Black Asta!</span>
          </div>
        </div>
      </div>

      <div style="padding: 12px 20px; background: rgba(15, 23, 42, 0.95); border-top: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <button class="hud-btn" style="padding: 10px 22px; font-size: 13.5px;" onclick="closeCharDetailModal()">QUAY LẠI DANH SÁCH</button>
        <button id="cdActionBtn" class="btn-start" style="padding: 10px 32px; font-size: 15px; margin: 0; width: auto;" onclick="closeCharDetailModal()">⚔️ CHỌN MA ĐẠO SĨ NÀY</button>
      </div>
    </div>
  </div>`;

html = html.replace(targetCharModalEnd, charDetailModalHtml);

// --- 4. Update JavaScript ---
const oldJsBlock = `    // Showcase & Char Info Sync
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

const newJsBlock = `    // Showcase & Char Info Sync
    let currentDetailHeroId = 'asta';

    function selectHero(charId) {
      selectedHeroId = charId;
      if (gameInstance) gameInstance.selectedCharId = charId;
      updateSelectedCharInfo(charId);
      renderCharRosterGrid();
      if (window.soundEngine && window.soundEngine.upgrade) {
        try { window.soundEngine.upgrade(); } catch (e) {}
      }
    }

    function updateSelectedCharInfo(id) {
      const allChars = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : (window.CHARACTERS || {});
      const c = allChars[id] || allChars['asta'];
      if (!c) return;

      const emoji = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[id]) || '🍀';
      const rarityLabel = {
        legendary: '⭐ THẦN THOẠI',
        epic: '✨ SỬ THI',
        rare: '🌟 HIẾM',
        common: '🔹 PHỔ THÔNG'
      }[c.rarity] || c.rarity.toUpperCase();

      // 1. Update Lobby Hero Bar on Main Screen
      const lAvatar = document.getElementById('lobbyHeroAvatar');
      const lName = document.getElementById('lobbyHeroName');
      const lRarity = document.getElementById('lobbyHeroRarity');
      const lSquad = document.getElementById('lobbyHeroSquad');

      if (lAvatar) {
        lAvatar.innerText = emoji;
        const rColor = { legendary: '#f59e0b', epic: '#c084fc', rare: '#38bdf8', common: '#94a3b8' }[c.rarity] || '#f59e0b';
        lAvatar.style.borderColor = rColor;
        lAvatar.style.boxShadow = \`0 0 10px \${rColor}66\`;
      }
      if (lName) lName.innerText = c.name.toUpperCase();
      if (lRarity) {
        lRarity.className = \`showcase-rarity-badge \${c.rarity}\`;
        lRarity.innerText = rarityLabel;
      }
      if (lSquad) lSquad.innerText = window.getSquadBadge ? window.getSquadBadge(c.squad.split('(')[0]) : \`🛡️ \${c.squad.split('(')[0]}\`;

      // 2. Update Lobby Map Bar on Main Screen
      const lMap = document.getElementById('lobbyMapTitle');
      if (lMap) {
        const diffDef = (window.MAP_DIFFICULTIES && window.MAP_DIFFICULTIES[selectedDifficulty]) || { icon: '🟢', name: 'Bình Thường' };
        const mapName = selectedMapId === 'underworld_palace' ? 'Map 2: Đại Ma Cung Minh Giới' : 'Map 1: Vương Quốc Clover';
        lMap.innerText = \`\${mapName} (\${diffDef.icon} \${diffDef.name})\`;
      }
    }

    // Modal Character Detail Sheet (Mở khi ấn vào bất kỳ nhân vật nào trong Ma Đạo Sĩ)
    function openCharDetailModal(heroId) {
      currentDetailHeroId = heroId || selectedHeroId;
      const allChars = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : (window.CHARACTERS || {});
      const allSpells = (typeof SPELL_DEFS !== 'undefined') ? SPELL_DEFS : (window.SPELL_DEFS || {});
      const c = allChars[currentDetailHeroId] || allChars['asta'];
      if (!c) return;

      const g = ensureGameInstance();
      const isUnlocked = g ? g.unlockedCharacters.has(currentDetailHeroId) : (c.unlocked !== false);
      const isSelected = (currentDetailHeroId === selectedHeroId);

      const avEl = document.getElementById('cdAvatarRing');
      const nameEl = document.getElementById('cdHeroName');
      const badgeEl = document.getElementById('cdRarityBadge');
      const titleEl = document.getElementById('cdHeroTitle');
      const squadEl = document.getElementById('cdSquadBadge');
      const magicEl = document.getElementById('cdMagicBadge');
      const statusEl = document.getElementById('cdStatusBadge');
      const weaponEl = document.getElementById('cdWeaponName');
      const evoEl = document.getElementById('cdEvoName');
      const evoReqEl = document.getElementById('cdEvoReq');
      const superEvoEl = document.getElementById('cdSuperEvoName');
      const superEvoReqEl = document.getElementById('cdSuperEvoReq');
      const statsEl = document.getElementById('cdStatsSummary');
      const traitEl = document.getElementById('cdSpecialTrait');
      const actionBtn = document.getElementById('cdActionBtn');

      if (avEl) {
        avEl.innerText = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[currentDetailHeroId]) || '🍀';
        const rarityBorder = {
          legendary: '#f59e0b',
          epic: '#c084fc',
          rare: '#38bdf8',
          common: '#94a3b8'
        }[c.rarity] || '#f59e0b';
        avEl.style.borderColor = rarityBorder;
        avEl.style.boxShadow = \`0 0 18px \${rarityBorder}88\`;
      }

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
      if (statusEl) {
        statusEl.innerHTML = isUnlocked ? '🔓 <span style="color: #34d399; font-weight:800;">Đã Sở Hữu</span>' : '🔒 <span style="color: #f87171; font-weight:800;">Chưa Mở Khóa</span>';
      }

      const wDef = allSpells[c.startingWeapon];
      if (weaponEl) weaponEl.innerText = wDef ? \`\${wDef.icon || '⚔️'} \${wDef.name}\` : c.startingWeapon;

      const evoDef = wDef && wDef.evolution ? allSpells[wDef.evolution] : null;
      const reqDef = wDef && wDef.requires ? allSpells[wDef.requires] : null;
      const superDef = evoDef && evoDef.evolution ? allSpells[evoDef.evolution] : null;

      if (evoEl) evoEl.innerText = evoDef ? \`\${evoDef.icon || '⭐'} \${evoDef.name}\` : 'Chưa Khai Mở';
      if (evoReqEl) {
        evoReqEl.innerHTML = evoDef ? \`Yêu cầu: <b>Vũ khí Cấp 5</b> + <b>Sách \${reqDef ? reqDef.name : 'Không cần'}</b>\` : '';
      }

      if (superEvoEl) superEvoEl.innerText = superDef ? \`\${superDef.icon || '🌟'} \${superDef.name}\` : 'Chưa Khai Mở';
      if (superEvoReqEl) {
        superEvoReqEl.innerHTML = superDef ? \`Yêu cầu: Kỹ năng chính + <b>Nhân vật đạt Cấp 10+</b>\` : '';
      }

      if (statsEl) {
        statsEl.innerText = \`HP: \${c.baseHp} | Tốc Độ: \${c.baseSpeed} | Giáp: \${Math.round((c.baseArmor || 0) * 100)}%\`;
      }
      if (traitEl) traitEl.innerText = c.specialTrait || '';

      if (actionBtn) {
        if (!isUnlocked) {
          actionBtn.innerHTML = '🎰 TRIỆU HỒI GACHA ĐỂ MỞ';
          actionBtn.style.background = 'linear-gradient(135deg, #7c3aed, #4f46e5)';
          actionBtn.style.borderColor = '#c084fc';
          actionBtn.onclick = function() {
            closeCharDetailModal();
            closeCharSelectModal();
            openGachaModal();
            switchGachaBannerMode('heroes');
          };
        } else if (isSelected) {
          actionBtn.innerHTML = '✓ ĐANG CHỌN (XÁC NHẬN)';
          actionBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
          actionBtn.style.borderColor = '#34d399';
          actionBtn.onclick = function() {
            closeCharDetailModal();
            closeCharSelectModal();
          };
        } else {
          actionBtn.innerHTML = '⚔️ CHỌN MA ĐẠO SĨ NÀY';
          actionBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
          actionBtn.style.borderColor = '#fbbf24';
          actionBtn.onclick = function() {
            selectHero(currentDetailHeroId);
            closeCharDetailModal();
            closeCharSelectModal();
          };
        }
      }

      const modal = document.getElementById('charDetailModal');
      if (modal) modal.classList.remove('hidden');
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }

    function closeCharDetailModal() {
      const modal = document.getElementById('charDetailModal');
      if (modal) modal.classList.add('hidden');
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }`;

html = html.replace(oldJsBlock, newJsBlock);

// --- 5. Update renderCharRosterGrid to open Detail Modal ---
const oldCardClickBlock = `        const isUnlocked = g ? g.unlockedCharacters.has(id) : (c.unlocked !== false);
        const card = document.createElement('div');
        card.className = \`char-roster-card \${c.rarity} \${id === selectedHeroId ? 'selected' : ''} \${!isUnlocked ? 'locked' : ''}\`;
        card.onclick = () => {
          if (!isUnlocked) {
            const goToGacha = confirm(\`🔒 Nhân vật [\${c.name}] (\${rName}) chưa được mở khóa!\\n\\nBạn có muốn mở ngay Bảng Triệu Hồi (Gacha) để triệu hồi nhân vật này không?\`);
            if (goToGacha) {
              closeCharSelectModal();
              openGachaModal();
              switchGachaBannerMode('heroes');
            }
            if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
            return;
          }
          selectHero(id);
          if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
        };

        const emoji = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[id]) || '🍀';
        const rName = rarityNameMap[c.rarity] || c.rarity.toUpperCase();
        const rColor = rarityColorMap[c.rarity] || '#ffffff';

        card.innerHTML = \`
          <div class="roster-avatar">\${emoji}</div>
          <div class="roster-name">\${c.name}</div>
          <div class="roster-squad">\${window.getSquadBadge ? window.getSquadBadge(c.squad.split('(')[0]) : c.squad.split('(')[0]}</div>
          <div style="font-size: 10px; font-weight: 800; color: \${rColor}; margin-top: 3px; letter-spacing: 0.5px;">
            \${rName}
          </div>
          \${!isUnlocked ? '<div class="roster-lock-badge">🔒 CHƯA MỞ</div>' : ''}
        \`;`;

const newCardClickBlock = `        const isUnlocked = g ? g.unlockedCharacters.has(id) : (c.unlocked !== false);
        const isSelected = (id === selectedHeroId);
        const card = document.createElement('div');
        card.className = \`char-roster-card \${c.rarity} \${isSelected ? 'selected' : ''} \${!isUnlocked ? 'locked' : ''}\`;
        card.onclick = () => {
          openCharDetailModal(id);
        };

        const emoji = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[id]) || '🍀';
        const rName = rarityNameMap[c.rarity] || c.rarity.toUpperCase();
        const rColor = rarityColorMap[c.rarity] || '#ffffff';

        card.innerHTML = \`
          <div class="roster-avatar">\${emoji}</div>
          <div class="roster-name">\${c.name}</div>
          <div class="roster-squad">\${window.getSquadBadge ? window.getSquadBadge(c.squad.split('(')[0]) : c.squad.split('(')[0]}</div>
          <div style="font-size: 10px; font-weight: 800; color: \${rColor}; margin-top: 3px; letter-spacing: 0.5px;">
            \${rName}
          </div>
          \${isSelected ? '<div class="roster-active-badge">✓ ĐANG CHỌN</div>' : ''}
          \${!isUnlocked ? '<div class="roster-lock-badge">🔒 CHƯA MỞ</div>' : ''}
        \`;`;

html = html.replace(oldCardClickBlock, newCardClickBlock);

// Bump version in index.html to v=bc195
html = html.replace(/v=bc194/g, 'v=bc195');

// Save updated files
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(stylePath, css, 'utf8');

console.log('Successfully updated index.html and style.css with character detail modal and clean lobby UI!');
