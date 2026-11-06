const fs = require('fs');

console.log('--- 1. UPDATING GAME.JS & GAME_2.JS ---');
let gameCode = fs.readFileSync('src/game.js', 'utf8');

// 1.1 Add getSkillSilhouetteSvg and retrieveManaBonus methods to Game class
const skillSvgFn = `  // =========================================================================
  // MAGIC SURVIVAL SKILL SILHOUETTE GRAPHICS (WHITE LINE-ART SVG)
  // =========================================================================
  getSkillSilhouetteSvg(choice) {
    const id = (choice.id || '').toLowerCase();
    const name = (choice.name || '').toLowerCase();

    // 1. ELECTRIC SHOCK / THUNDER (Like image 1 in photo)
    if (id.includes('thunder') || id.includes('electric') || id.includes('lightning') || id.includes('luck') || name.includes('sấm') || name.includes('sét')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 38 4 L 20 28 L 32 30 L 14 58 L 44 26 L 30 24 Z" fill="#ffffff" filter="drop-shadow(0 0 2px #ffffff)"/>
        <path d="M 24 20 L 12 28 L 20 32 L 8 44" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 34 32 L 48 38 L 42 44 L 56 50" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      </svg>\`;
    }

    // 2. TSUNAMI / OCEAN TIDAL WAVE (Like image 2 in photo)
    if (id.includes('sea') || id.includes('water') || id.includes('tsunami') || id.includes('noelle') || name.includes('sóng') || name.includes('thủy')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 6 56 C 14 56 18 50 22 42 C 28 30 38 12 52 14 C 58 15 58 24 50 26 C 42 28 36 34 34 42 C 32 50 26 56 6 56 Z" fill="#ffffff"/>
        <path d="M 24 56 C 28 50 34 40 44 32 C 48 29 48 25 44 25 C 38 25 32 32 30 40 C 28 48 24 54 18 56 Z" fill="#ffffff"/>
        <circle cx="56" cy="18" r="2" fill="#ffffff"/>
        <circle cx="58" cy="24" r="1.5" fill="#ffffff"/>
      </svg>\`;
    }

    // 3. METEOR / FALLING COMET (Like image 3 in photo)
    if (id.includes('fire') || id.includes('flame') || id.includes('meteor') || id.includes('fuegoleon') || id.includes('calidus') || name.includes('hỏa') || name.includes('lửa')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 12 48 C 8 42 12 34 20 28 L 52 6 C 54 8 50 16 44 22 L 32 38 C 26 46 18 52 12 48 Z" fill="#ffffff"/>
        <ellipse cx="20" cy="42" rx="7" ry="5" transform="rotate(-35 20 42)" fill="#ffffff"/>
        <path d="M 46 8 L 36 24 M 52 16 L 42 30 M 56 22 L 48 34" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
        <circle cx="14" cy="50" r="2" fill="#ffffff"/>
        <circle cx="24" cy="48" r="2.5" fill="#ffffff"/>
      </svg>\`;
    }

    // 4. SPIRIT / SYLPH (Rough white spirit ring)
    if (id.includes('spirit') || id.includes('sylph') || name.includes('tinh linh')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <circle cx="32" cy="32" r="18" fill="none" stroke="#ffffff" stroke-width="4.5" stroke-dasharray="14 3 8 4"/>
        <circle cx="32" cy="32" r="11" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 4"/>
        <circle cx="32" cy="14" r="2.5" fill="#ffffff"/>
        <circle cx="48" cy="36" r="2" fill="#ffffff"/>
      </svg>\`;
    }

    // 5. SWORD / SLASH / ANTI-MAGIC
    if (id.includes('slash') || id.includes('sword') || id.includes('blade') || id.includes('anti_magic') || id.includes('asta') || id.includes('licht') || name.includes('kiếm') || name.includes('trảm')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 10 54 L 50 14 L 54 18 L 14 58 Z" fill="#ffffff"/>
        <path d="M 8 18 C 24 10 46 16 56 36 C 42 26 24 26 8 18 Z" fill="#ffffff"/>
        <rect x="14" y="46" width="6" height="6" transform="rotate(45 17 49)" fill="#ffffff"/>
      </svg>\`;
    }

    // 6. DARK / SHADOW / DIMENSION
    if (id.includes('dark') || id.includes('black') || id.includes('yami') || id.includes('nacht') || name.includes('hắc') || name.includes('bóng')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 16 12 C 34 8 52 24 50 48 C 40 28 26 22 16 12 Z" fill="#ffffff"/>
        <circle cx="34" cy="34" r="6" fill="#ffffff"/>
        <circle cx="34" cy="34" r="2.5" fill="#000000"/>
        <path d="M 28 48 C 36 46 44 40 48 32" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      </svg>\`;
    }

    // 7. SHIELD / ARMOR / MANA SKIN
    if (id.includes('armor') || id.includes('mana_skin') || id.includes('vitality') || name.includes('giáp') || name.includes('máu')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 32 8 L 52 16 L 46 44 C 42 52 32 58 32 58 C 32 58 22 52 18 44 L 12 16 Z" fill="#ffffff"/>
        <path d="M 32 14 L 46 20 L 41 42 C 38 48 32 52 32 52 C 32 52 26 48 23 42 L 18 20 Z" fill="#000000"/>
        <polygon points="32,22 38,34 32,44 26,34" fill="#ffffff"/>
      </svg>\`;
    }

    // 8. WIND / TORNADO / STORM
    if (id.includes('wind') || id.includes('tornado') || id.includes('storm') || id.includes('yuno') || name.includes('gió') || name.includes('bão')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 12 18 C 24 14 44 14 52 20 C 44 24 28 22 16 26 Z" fill="#ffffff"/>
        <path d="M 18 30 C 28 26 44 26 50 32 C 40 36 28 34 22 38 Z" fill="#ffffff"/>
        <path d="M 24 42 C 30 38 42 38 46 44 C 38 46 28 46 26 50 Z" fill="#ffffff"/>
      </svg>\`;
    }

    // 9. STRIDE / SPEED
    if (id.includes('stride') || id.includes('speed') || id.includes('glide') || name.includes('tốc')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 24 14 L 34 14 L 38 34 L 52 38 L 54 48 L 22 48 L 20 28 Z" fill="#ffffff"/>
        <path d="M 12 18 C 18 20 20 28 14 36 C 22 34 26 26 24 18 Z" fill="#ffffff"/>
      </svg>\`;
    }

    // 10. CRIT / KI SENSE / TARGET
    if (id.includes('ki') || id.includes('crit') || id.includes('target') || name.includes('chí mạng')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <circle cx="32" cy="32" r="20" fill="none" stroke="#ffffff" stroke-width="3"/>
        <circle cx="32" cy="32" r="8" fill="none" stroke="#ffffff" stroke-width="2"/>
        <line x1="32" y1="6" x2="32" y2="18" stroke="#ffffff" stroke-width="3"/>
        <line x1="32" y1="46" x2="32" y2="58" stroke="#ffffff" stroke-width="3"/>
        <line x1="6" y1="32" x2="18" y2="32" stroke="#ffffff" stroke-width="3"/>
        <line x1="46" y1="32" x2="58" y2="32" stroke="#ffffff" stroke-width="3"/>
      </svg>\`;
    }

    // 11. MAGNET
    if (id.includes('magnet') || name.includes('hút')) {
      return \`<svg viewBox="0 0 64 64" width="44" height="44" style="display:block;margin:auto;">
        <path d="M 16 12 L 26 12 L 26 34 C 26 38 38 38 38 34 L 38 12 L 48 12 L 48 34 C 48 48 16 48 16 34 Z" fill="#ffffff"/>
        <rect x="16" y="12" width="10" height="6" fill="#38bdf8"/>
        <rect x="38" y="12" width="10" height="6" fill="#ef4444"/>
      </svg>\`;
    }

    return null;
  }

  // Mana 20% Retrieve Action (Magic Survival style bottom button)
  retrieveManaBonus() {
    if (this.state !== 'LEVEL_UP') return;
    const p = this.player;
    if (!p) return;

    const manaAmt = Math.max(1, Math.round((p.nextExp || 100) * 0.20));
    this.addExp(manaAmt);
    if (window.soundEngine && window.soundEngine.pickup) window.soundEngine.pickup();

    this.spells.floatingTexts.push({
      x: p.x,
      y: p.y - 30,
      text: \`✨ THU HỒI +\${manaAmt} MANA (20%)!\`,
      color: '#38bdf8',
      size: 17,
      life: 1.0
    });
    this.spells.spawnImpactParticles(p.x, p.y, '#38bdf8', 12);

    if (this.pendingLevelUps > 0) {
      this.pendingLevelUps--;
      this.triggerLevelUp();
    } else if (p.exp >= p.nextExp) {
      p.exp -= p.nextExp;
      p.level++;
      p.nextExp = this.calculateNextExp(p.level);
      this.triggerLevelUp();
    } else {
      const overlay = document.getElementById('levelUpOverlay');
      if (overlay) overlay.classList.add('hidden');
      this.state = 'PLAYING';
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
      window.focus();
    }
  }\n\n`;

// Insert methods before renderLevelUpCards
const renderStartStr = '  renderLevelUpCards() {';
const renderStartIdx = gameCode.indexOf(renderStartStr);

// Find end of renderLevelUpCards (before getAvailableLevelUpChoices)
const getChoicesStr = '  getAvailableLevelUpChoices() {';
const getChoicesIdx = gameCode.indexOf(getChoicesStr);

if (renderStartIdx !== -1 && getChoicesIdx !== -1) {
  const newRenderLevelUpCode = `  renderLevelUpCards() {
    const cardsContainer = document.getElementById('levelUpCards');
    if (!cardsContainer) return;
    cardsContainer.innerHTML = '';

    // Update Current Level Header Text
    const curLvEl = document.getElementById('msLevelUpCurrentLevel');
    if (curLvEl && this.player) {
      curLvEl.textContent = \`Current Level : \${this.player.level}\`;
    }

    const choices = this.getAvailableLevelUpChoices();
    if (choices.length === 0) {
      choices.push({
        id: 'bonus_heal_coins',
        type: 'bonus_heal_coins',
        name: 'Trị Liệu & Clover Coins',
        icon: '💖',
        description: 'Hồi phục 50% HP tối đa và nhận thêm 300 Clover Coins!'
      });
      choices.push({
        id: 'bonus_stat_dmg',
        type: 'bonus_stat_dmg',
        name: 'Chiến Ý Bất Diệt',
        icon: '⚔️',
        description: 'Tăng vĩnh viễn 8% Sát Thương toàn bộ Ma Pháp trong trận đấu!'
      });
    }

    choices.forEach((choice) => {
      const card = document.createElement('div');
      card.className = \`ms-magic-card \${choice.isEvolution ? 'evolution' : ''} \${choice.isSuperEvolution ? 'super-evolution' : ''}\`;

      // Determine Level String
      let levelText = 'Lv 1';
      if (choice.type === 'weapon_upgrade') {
        const cur = (this.player && this.player.weapons && this.player.weapons[choice.id]) ? this.player.weapons[choice.id].level : 1;
        levelText = \`Lv \${cur + 1}\`;
      } else if (choice.type === 'new_weapon') {
        levelText = 'Lv 1';
      } else if (choice.type === 'passive_upgrade') {
        const cur = (this.player && this.player.passives && this.player.passives[choice.id]) ? this.player.passives[choice.id] : 1;
        levelText = \`Lv \${cur + 1}\`;
      } else if (choice.type === 'new_passive') {
        levelText = 'Lv 1';
      } else if (choice.isSuperEvolution) {
        levelText = 'TIER 3';
      } else if (choice.isEvolution) {
        levelText = 'EVO';
      } else if (choice.type === 'infinite_passive') {
        const inf = (this.player && this.player.infinitePassives && this.player.infinitePassives[choice.id]) || 0;
        levelText = \`Lv \${inf + 1}\`;
      }

      // Format description with highlighted keywords/stats (Magic Survival style)
      let formatted = (choice.description || '');
      formatted = formatted.replace(/([0-9]+%)/g, '<span style="color:#38bdf8; font-weight:700;">$1</span>');
      formatted = formatted.replace(/(\\+[0-9]+)/g, '<span style="color:#34d399; font-weight:700;">$1</span>');
      formatted = formatted.replace(/(Tsunamis|Tsunami|Meteor|Sét|Sóng Thần|Tia|Đạn)/gi, '<span style="color:#38bdf8; font-weight:700;">$1</span>');
      formatted = formatted.replace(/(Sát thương|Damage|Chí mạng|Critical|Hồi chiêu|Tốc độ)/gi, '<span style="color:#fbbf24; font-weight:700;">$1</span>');

      // Evolution Sub-pill
      let evoTag = '';
      if (choice.isSuperEvolution) {
        evoTag = '<div style="font-size:10px; color:#fbbf24; font-weight:800; margin-top:3px;">👑 SIÊU TIẾN HÓA LẦN 2 (TIER 3)</div>';
      } else if (choice.isEvolution) {
        evoTag = '<div style="font-size:10px; color:#c084fc; font-weight:800; margin-top:3px;">✨ TIẾN HÓA HUYỀN THOẠI</div>';
      } else if (choice.evolutionInfo && choice.evolutionInfo.evoName) {
        const ei = choice.evolutionInfo;
        const cleanBook = (ei.reqBookName || '').split('(')[0].trim();
        evoTag = \`<div style="font-size:9.5px; color:#38bdf8; margin-top:3px;">⚡ Ghép: \${ei.reqBookIcon || '📘'} \${cleanBook} \${ei.hasReqBook ? '✓' : ''}</div>\`;
      }

      // Generate White Silhouette Icon Art
      const svgArt = this.getSkillSilhouetteSvg(choice);

      card.innerHTML = \`
        <div class="ms-card-icon-box">
          \${svgArt ? svgArt : \`<span class="ms-card-icon-fallback">\${choice.icon || '✨'}</span>\`}
        </div>
        <div class="ms-card-content">
          <div class="ms-card-title">\${choice.name}</div>
          <div class="ms-card-desc">\${formatted}</div>
          \${evoTag}
        </div>
        <div class="ms-card-level">\${levelText}</div>
      \`;

      card.addEventListener('click', () => {
        this.applyUpgrade(choice);
        if (this.pendingLevelUps > 0) {
          this.pendingLevelUps--;
          this.triggerLevelUp();
        } else if (this.player && this.player.exp >= this.player.nextExp) {
          this.player.exp -= this.player.nextExp;
          this.player.level++;
          this.player.nextExp = this.calculateNextExp(this.player.level);
          this.triggerLevelUp();
        } else {
          document.getElementById('levelUpOverlay').classList.add('hidden');
          this.state = 'PLAYING';
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }
          window.focus();
        }
      });
      cardsContainer.appendChild(card);
    });

    // Reroll button (Image 2 - Talent: Card Reroll)
    const rerollContainer = document.getElementById('levelUpRerollContainer');
    const left = this.player ? (this.player.rerollsLeft || 0) : 0;
    if (rerollContainer) {
      if (left > 0) {
        rerollContainer.innerHTML = \`
          <button id="btnRerollLevelUp" class="ms-btn-reroll">
            🔄 Đổi Thẻ (Còn lại: \${left} lượt)
          </button>
        \`;
        const btn = document.getElementById('btnRerollLevelUp');
        if (btn) {
          btn.onclick = () => {
            if (this.player.rerollsLeft > 0) {
              this.player.rerollsLeft--;
              if (window.soundEngine && window.soundEngine.cardFlip) window.soundEngine.cardFlip();
              this.renderLevelUpCards();
            }
          };
        }
      } else {
        rerollContainer.innerHTML = '';
      }
    }
  }\n\n`;

  gameCode = gameCode.slice(0, renderStartIdx) + skillSvgFn + newRenderLevelUpCode + gameCode.slice(getChoicesIdx);
  fs.writeFileSync('src/game.js', gameCode, 'utf8');
  fs.writeFileSync('src/game_2.js', gameCode, 'utf8');
  console.log('game.js and game_2.js updated with Magic Survival style level up!');
} else {
  console.error('Indices not found in game.js!');
}

console.log('--- 2. UPDATING INDEX.HTML ---');
let html = fs.readFileSync('index.html', 'utf8');

// Replace levelUpOverlay HTML
const oldLevelUpModalStart = '  <!-- LEVEL UP MODAL -->';
const oldLevelUpModalEnd = '  <!-- SETTINGS MODAL -->';
const modalStartIdx = html.indexOf(oldLevelUpModalStart);
const modalEndIdx = html.indexOf(oldLevelUpModalEnd);

if (modalStartIdx !== -1 && modalEndIdx !== -1) {
  const newLevelUpHtml = `  <!-- LEVEL UP MODAL (MAGIC SURVIVAL STYLE) -->
  <div id="levelUpOverlay" class="overlay hidden">
    <div class="menu-card level-up-modal-box ms-levelup-box">
      <!-- Top Level Indicator -->
      <div id="msLevelUpCurrentLevel" class="ms-current-level">Current Level : 1</div>

      <!-- Main Title Row with Occult Star Circle & Book Helper -->
      <div class="ms-levelup-header-row">
        <div class="ms-select-magic-title">Select Magic</div>
        <div class="ms-header-right-tools">
          <button id="btnLevelUpEvo" class="ms-evo-book-btn" onclick="openEvolutionModal()" title="Xem Toàn Bộ Sách & Công Thức Tiến Hóa (Phím B)">
            📖
          </button>
          <!-- Magic Survival Occult Star Circle Seal -->
          <svg class="ms-magic-circle-seal" viewBox="0 0 100 100" width="44" height="44">
            <circle cx="50" cy="50" r="46" fill="#050505" stroke="#262626" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="41" fill="none" stroke="#404040" stroke-width="1.2" stroke-dasharray="3 3"/>
            <polygon points="50,6 63,37 94,50 63,63 50,94 37,63 6,50 37,37" fill="#141414" stroke="#525252" stroke-width="1.8"/>
            <polygon points="50,15 60,40 85,50 60,60 50,85 40,60 15,50 40,40" fill="#1a1a1a" stroke="#38bdf8" stroke-width="1.2" opacity="0.7"/>
            <circle cx="50" cy="50" r="14" fill="#000000" stroke="#525252" stroke-width="1.5"/>
            <circle cx="50" cy="50" r="6" fill="#38bdf8" opacity="0.8"/>
          </svg>
        </div>
      </div>

      <!-- Compact Magic Cards Container (Vertical Stack of 3 Sleek Horizontal Cards) -->
      <div id="levelUpCards" class="ms-level-cards-container">
        <!-- Injected via JavaScript -->
      </div>

      <!-- Bottom Actions: Mana 20% Retrieve + Reroll -->
      <div class="ms-levelup-bottom-actions">
        <button id="btnManaRetrieve" class="ms-btn-retrieve" onclick="window.game.retrieveManaBonus()" title="Bỏ qua lựa chọn và thu hồi 20% Mana / EXP">
          Mana 20% Retrieve
        </button>
        <div id="levelUpRerollContainer" class="ms-reroll-wrap"></div>
      </div>
    </div>
  </div>\n\n\n`;

  html = html.slice(0, modalStartIdx) + newLevelUpHtml + html.slice(modalEndIdx);
  console.log('levelUpOverlay modal HTML replaced.');
}

// Add CSS styles for Magic Survival Level Up before </style>
const styleInsert = `
/* ========================================================= */
/* MAGIC SURVIVAL STYLE LEVEL UP MODAL                       */
/* ========================================================= */
#levelUpOverlay {
  background: rgba(0, 0, 0, 0.72) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 120 !important;
}

#levelUpOverlay .ms-levelup-box {
  background: rgba(8, 10, 14, 0.96) !important;
  border: 1.5px solid #27272a !important;
  border-radius: 6px !important;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(56, 189, 248, 0.15) !important;
  max-width: 440px !important;
  width: 92% !important;
  padding: 18px 16px 14px 16px !important;
  position: relative !important;
  user-select: none !important;
}

.ms-current-level {
  color: #fde047;
  font-family: 'Cinzel', serif;
  font-size: 14.5px;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
  text-shadow: 0 0 8px rgba(253, 224, 71, 0.4);
}

.ms-levelup-header-row {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 14px;
  padding: 0 4px;
}

.ms-select-magic-title {
  color: #38bdf8;
  font-family: 'Cinzel', cursive, sans-serif;
  font-size: 27px;
  font-weight: 800;
  text-shadow: 0 0 12px rgba(56, 189, 248, 0.55);
  letter-spacing: 0.8px;
  text-align: center;
}

.ms-header-right-tools {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
}

.ms-magic-circle-seal {
  display: block;
  animation: msSealRotate 30s linear infinite;
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.3));
}

@keyframes msSealRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ms-evo-book-btn {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid #38bdf8;
  color: #38bdf8;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ms-evo-book-btn:hover {
  background: #0284c7;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
  transform: scale(1.08);
}

.ms-level-cards-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.ms-magic-card {
  width: 100%;
  background: #000000;
  border: 1.5px solid #27272a;
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  overflow: hidden;
  box-sizing: border-box;
}

.ms-magic-card:hover {
  border-color: #38bdf8;
  transform: translateY(-2px);
  box-shadow: 0 0 16px rgba(56, 189, 248, 0.35), inset 0 0 8px rgba(56, 189, 248, 0.15);
}

.ms-magic-card:active {
  transform: scale(0.98);
}

.ms-magic-card.evolution {
  border-color: #a855f7;
}

.ms-magic-card.evolution:hover {
  border-color: #c084fc;
  box-shadow: 0 0 18px rgba(192, 132, 252, 0.45);
}

.ms-magic-card.super-evolution {
  border-color: #f59e0b;
}

.ms-magic-card.super-evolution:hover {
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.55);
}

.ms-card-icon-box {
  width: 52px;
  height: 52px;
  min-width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  flex-shrink: 0;
}

.ms-card-icon-fallback {
  font-size: 26px;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.7));
}

.ms-card-content {
  flex: 1;
  min-width: 0;
  padding-right: 42px; /* room for level tag */
}

.ms-card-title {
  color: #ffffff;
  font-size: 15.5px;
  font-weight: 800;
  font-family: 'Cinzel', serif;
  letter-spacing: 0.3px;
  line-height: 1.2;
  text-align: left;
}

.ms-card-desc {
  color: #94a3b8;
  font-size: 11.5px;
  line-height: 1.35;
  margin-top: 4px;
  text-align: left;
}

.ms-card-level {
  position: absolute;
  right: 14px;
  top: 12px;
  color: #fde047;
  font-family: 'Cinzel', serif;
  font-size: 13.5px;
  font-weight: 800;
  text-shadow: 0 0 6px rgba(253, 224, 71, 0.4);
}

.ms-levelup-bottom-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
}

.ms-btn-retrieve {
  background: #000000;
  border: 1.5px solid #27272a;
  border-radius: 4px;
  color: #e2e8f0;
  font-family: 'Cinzel', serif;
  font-size: 12.5px;
  font-weight: 800;
  padding: 7px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.ms-btn-retrieve:hover {
  border-color: #38bdf8;
  color: #38bdf8;
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.4);
  transform: translateY(-1px);
}

.ms-btn-reroll {
  background: transparent;
  border: 1px solid rgba(245, 158, 11, 0.4);
  border-radius: 4px;
  color: #fbbf24;
  font-size: 11.5px;
  font-weight: 700;
  padding: 4px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ms-btn-reroll:hover:not(:disabled) {
  border-color: #fbbf24;
  background: rgba(245, 158, 11, 0.15);
  box-shadow: 0 0 10px rgba(251, 191, 36, 0.35);
}

.ms-btn-reroll:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #475569;
  color: #94a3b8;
}
`;

html = html.replace('</style>', `${styleInsert}\n</style>`);

// Bump cache buster to v=bc189
html = html.replace(/v=bc18[0-9]/g, 'v=bc189');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with Magic Survival Level Up CSS and cache buster v=bc189.');
