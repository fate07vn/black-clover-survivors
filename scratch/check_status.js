const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/index.html', 'utf8');

console.log('--- Checking index.html ---');
console.log('Length:', html.length);
console.log('Contains main lobby char card:', html.includes('id="selectedCharCard"'));
console.log('Contains char detail modal:', html.includes('charDetailModal') || html.includes('characterDetailModal'));
console.log('Contains BC_SELECTED_HERO:', html.includes('BC_SELECTED_HERO'));

const sprites = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/sprites.js', 'utf8');
console.log('--- Checking src/sprites.js ---');
console.log('Length:', sprites.length);
console.log('Contains drawMereoleona:', sprites.includes('drawMereoleona'));
console.log('Contains drawBossLucifero:', sprites.includes('drawBossLucifero'));
console.log('Contains drawBandit:', sprites.includes('drawBandit'));

const game = fs.readFileSync('C:/Users/Admin/.gemini/antigravity/scratch/black-clover-survivors/src/game.js', 'utf8');
console.log('--- Checking src/game.js ---');
console.log('Length:', game.length);
console.log('Contains exportSaveData selectedCharId:', game.includes('selectedCharId: this.selectedCharId'));
console.log('Contains loadSaveData selectedCharId:', game.includes('this.selectedCharId = data.selectedCharId'));
