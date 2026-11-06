const fs = require('fs');

const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

const requiredElements = [
  'id="menuOverlay"',
  'class="lobby-center-card"',
  'class="lobby-selection-group"',
  'class="lobby-select-bar lobby-hero-bar"',
  'class="lobby-select-bar lobby-map-bar"',
  'id="lobbyHeroAvatar"',
  'id="lobbyHeroName"',
  'id="lobbyHeroRarity"',
  'id="lobbyHeroSquad"',
  'id="lobbyMapTitle"',
  'id="btnStartGame"',
  'id="charSelectModal"',
  'id="charRosterGrid"',
  'id="charDetailModal"',
  'id="cdModalHeaderTitle"',
  'id="cdAvatarRing"',
  'id="cdHeroName"',
  'id="cdRarityBadge"',
  'id="cdHeroTitle"',
  'id="cdSquadBadge"',
  'id="cdMagicBadge"',
  'id="cdStatusBadge"',
  'id="cdWeaponName"',
  'id="cdEvoName"',
  'id="cdEvoReq"',
  'id="cdSuperEvoName"',
  'id="cdSuperEvoReq"',
  'id="cdStatsSummary"',
  'id="cdSpecialTrait"',
  'id="cdActionBtn"'
];

console.log('Verifying elements in index.html:');
let allPassed = true;
requiredElements.forEach(el => {
  const ok = html.includes(el);
  if (!ok) {
    console.error(`FAILED: Missing ${el}`);
    allPassed = false;
  } else {
    console.log(`OK: ${el}`);
  }
});

// Check that old showcase container is NOT in menuOverlay
const menuOverlaySection = html.substring(html.indexOf('id="menuOverlay"'), html.indexOf('id="charSelectModal"'));
if (menuOverlaySection.includes('class="showcase-hero-container"')) {
  console.error('FAILED: showcase-hero-container still present in menuOverlay!');
  allPassed = false;
} else {
  console.log('OK: showcase-hero-container correctly removed from main menuOverlay');
}

if (allPassed) {
  console.log('\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
