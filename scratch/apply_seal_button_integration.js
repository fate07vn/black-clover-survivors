const fs = require('fs');

console.log('--- UPDATING INDEX.HTML WITH INTERACTIVE OCCULT SEAL BUTTON ---');
let html = fs.readFileSync('index.html', 'utf8');

// Target the .ms-header-right-tools content
const oldHeaderRightStart = '<div class="ms-header-right-tools">';
const oldHeaderRightEnd = '</div>\n      </div>\n\n      <!-- Compact Magic Cards Container';

const startIdx = html.indexOf(oldHeaderRightStart);
const endIdx = html.indexOf(oldHeaderRightEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const newHeaderRightHtml = `<div class="ms-header-right-tools">
          <!-- Interactive Magic Survival Occult Star Seal: Tích hợp Bảng Tiến Hóa (Bí Kíp Ma Đạo Thư) -->
          <button id="btnLevelUpEvoSeal" class="ms-evo-seal-btn" onclick="openEvolutionModal()" title="Bí Kíp Ma Đạo Thư: Bấm để xem Bảng Công Thức Tiến Hóa (Phím B)">
            <svg class="ms-magic-circle-seal-interactive" viewBox="0 0 100 100" width="46" height="46">
              <defs>
                <radialGradient id="sealCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
                  <stop offset="60%" stop-color="#0284c7" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#0369a1" stop-opacity="0"/>
                </radialGradient>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>

              <!-- 1. Outer Dark Circular Base -->
              <circle cx="50" cy="50" r="46" fill="#080c14" stroke="#1e293b" stroke-width="2.5"/>

              <!-- 2. Dotted Outer Rivet Ring (Studs around perimeter) -->
              <circle cx="50" cy="50" r="41" fill="none" stroke="#64748b" stroke-width="1.8" stroke-dasharray="1.5 3.5"/>

              <!-- 3. Dark Inner Background -->
              <circle cx="50" cy="50" r="37" fill="#030712" stroke="#334155" stroke-width="1.2"/>

              <!-- 4. 4-Pointed Curved Occult Star (Shuriken Shape from Photo) -->
              <path d="M 50 14 C 50 32 32 50 14 50 C 32 50 50 68 50 86 C 50 68 68 50 86 50 C 68 50 50 32 50 14 Z" 
                    fill="#0f172a" stroke="#38bdf8" stroke-width="1.8" filter="url(#cyanGlow)"/>

              <!-- 5. Cyan Runic Inset Dotted Path along the star arms -->
              <path d="M 50 20 C 50 34 34 50 20 50 C 34 50 50 66 50 80 C 50 66 66 50 80 50 C 66 50 50 34 50 20 Z" 
                    fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="1.2 3.8" opacity="0.95"/>

              <!-- 6. Inner Center Ring -->
              <circle cx="50" cy="50" r="13" fill="#030712" stroke="#38bdf8" stroke-width="1.5"/>

              <!-- 7. Center Glowing Cyan Core Orb (From Photo) -->
              <circle cx="50" cy="50" r="7.5" fill="url(#sealCenterGlow)" filter="drop-shadow(0 0 4px #38bdf8)"/>
              <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="0.95"/>
            </svg>
            <span class="ms-evo-seal-hint">TIẾN HÓA (B)</span>
          </button>`;

  html = html.slice(0, startIdx) + newHeaderRightHtml + html.slice(endIdx);
  console.log('Replaced header right tools with interactive Occult Seal button.');
} else {
  console.error('Could not find .ms-header-right-tools region in index.html!');
}

// Update CSS rules for interactive seal button
const oldSealCss = `.ms-magic-circle-seal {
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
}`;

const newSealCss = `/* Magic Survival Interactive Occult Star Seal Button */
.ms-evo-seal-btn {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  position: relative;
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), filter 0.22s ease;
  user-select: none;
  outline: none;
}

.ms-evo-seal-btn:hover {
  transform: scale(1.12);
}

.ms-evo-seal-btn:hover .ms-magic-circle-seal-interactive {
  filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 4px #ffffff);
  animation-duration: 8s;
}

.ms-evo-seal-btn:active {
  transform: scale(0.95);
}

.ms-magic-circle-seal-interactive {
  display: block;
  animation: msSealRotate 24s linear infinite;
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.45));
  transition: filter 0.2s ease;
}

@keyframes msSealRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ms-evo-seal-hint {
  font-size: 8.5px;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 0.4px;
  text-shadow: 0 0 4px rgba(56, 189, 248, 0.6);
  opacity: 0.85;
  transition: opacity 0.2s ease, color 0.2s ease;
  margin-top: -1px;
}

.ms-evo-seal-btn:hover .ms-evo-seal-hint {
  opacity: 1;
  color: #fde047;
  text-shadow: 0 0 6px rgba(253, 224, 71, 0.8);
}`;

if (html.includes(oldSealCss)) {
  html = html.replace(oldSealCss, newSealCss);
  console.log('Replaced seal CSS with interactive seal CSS.');
} else {
  console.log('Old seal CSS not matched exactly, appending new CSS before </style>');
  html = html.replace('</style>', `${newSealCss}\n</style>`);
}

// Bump cache buster to v=bc192
html = html.replace(/v=bc19[0-9]/g, 'v=bc192');

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with cache buster v=bc192.');
