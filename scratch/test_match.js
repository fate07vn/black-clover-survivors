const fs = require('fs');

let html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

// 1. Verify target HTML around menuOverlay
const targetLobbyOld = `      <!-- Active Selected Hero Showcase Box -->
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

console.log('Old lobby match:', html.includes(targetLobbyOld));
