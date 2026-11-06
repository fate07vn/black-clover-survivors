const fs = require('fs');

const files = ['index.html', 'src/game.js'];
const scIds = ['scAvatarRing', 'scHeroName', 'scRarityBadge', 'scHeroTitle', 'scSquadBadge', 'scMagicBadge', 'scOwnedBadge', 'scWeaponName', 'scEvoName', 'scEvoReq', 'scSuperEvoName', 'scSuperEvoReq', 'scMapName', 'scStatsSummary', 'scSpecialTrait'];

files.forEach(f => {
  const c = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/' + f, 'utf8');
  scIds.forEach(id => {
    if (c.includes(id)) {
      console.log(`Found ${id} in ${f}`);
    }
  });
});
