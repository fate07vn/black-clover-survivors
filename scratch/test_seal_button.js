const fs = require('fs');

const sealSvg = `
<button id="btnLevelUpEvoSeal" class="ms-evo-seal-btn" onclick="openEvolutionModal()" title="Bí Kíp Ma Đạo Thư: Bấm để xem Bảng Công Thức Tiến Hóa (Phím B)">
  <svg class="ms-magic-circle-seal-interactive" viewBox="0 0 100 100" width="46" height="46">
    <defs>
      <radialGradient id="sealCenterGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
        <stop offset="60%" stop-color="#0284c7" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0369a1" stop-opacity="0"/>
      </radialGradient>
      <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- 1. Outer Dark Circular Base -->
    <circle cx="50" cy="50" r="46" fill="#080c14" stroke="#1e293b" stroke-width="2.5"/>

    <!-- 2. Dotted Outer Rivet Ring -->
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
    <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="0.9"/>
  </svg>
  <span class="ms-evo-seal-hint">📖 TIẾN HÓA</span>
</button>
`;

console.log('Generated interactive seal SVG button.');
