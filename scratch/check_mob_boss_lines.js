const fs = require('fs');

const code = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');

const targets = [
  'drawBandit',
  'drawCultist',
  'drawZombie',
  'drawSpadeSoldier',
  'drawHellhound',
  'drawShadowMage',
  'drawBoneGolem',
  'drawLesserDevil',
  'drawHighDevil',
  'drawArmoredBoar',
  'drawDemonCharger',
  'drawBossMars',
  'drawBossVetto',
  'drawBossPatri',
  'drawBossZenon',
  'drawBossVanica',
  'drawBossDante',
  'drawBossZagred',
  'drawBossLucifero'
];

const lines = code.split('\n');
targets.forEach(t => {
  lines.forEach((l, i) => {
    if (l.includes(t + '(')) {
      console.log(`${t} found at line ${i+1}`);
    }
  });
});
