const fs = require('fs');

let gameCode = fs.readFileSync('src/game.js', 'utf8');

const targetStr = `    // Periodic chest spawning across the map (Infinite Procedural Map: spawns around player)
    if (this.chestPingTimer > 0) this.chestPingTimer -= dt;
    this.chestSpawnTimer = (this.chestSpawnTimer || 35) - dt;
    if (this.chestSpawnTimer <= 0) {
      this.chestSpawnTimer = 35 + Math.random() * 15;
      const existingChests = this.drops.filter(d => d.type === 'chest').length;
      if (existingChests < 4) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 360 + Math.random() * 400; // 360 - 760px radius
        const cx = p.x + Math.cos(angle) * dist;
        const cy = p.y + Math.sin(angle) * dist;
        this.spawnDrop(cx, cy, 'chest', 100);
        this.spells.floatingTexts.push({ x: p.x, y: p.y - 40, text: \`🎁 RƯƠNG MA ĐẠO XUẤT HIỆN!\`, color: '#fbbf24', size: 16, life: 1.2 });
      }
    }`;

const replacementStr = `    // Lâu lâu mới có 1 rương: Chu kỳ 110s - 150s (gần 2 đến 2.5 phút một rương) và chỉ tối đa 1 rương trên sân
    if (this.chestPingTimer > 0) this.chestPingTimer -= dt;
    this.chestSpawnTimer = (this.chestSpawnTimer || 120) - dt;
    if (this.chestSpawnTimer <= 0) {
      this.chestSpawnTimer = 110 + Math.random() * 40;
      const existingChests = this.drops.filter(d => d.type === 'chest').length;
      if (existingChests < 1) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 450 + Math.random() * 400; // 450 - 850px radius
        const cx = p.x + Math.cos(angle) * dist;
        const cy = p.y + Math.sin(angle) * dist;
        this.spawnDrop(cx, cy, 'chest', 100);
        this.spells.floatingTexts.push({ x: p.x, y: p.y - 40, text: '🎁 RƯƠNG CỔ VẬT XUẤT HIỆN!', color: '#fbbf24', size: 16, life: 1.5 });
        this.triggerComboBanner('👑 RƯƠNG CỔ VẬT ĐÃ XUẤT HIỆN TRÊN BẢN ĐỒ! BẤM [R] HOẶC NHÌN LA BÀN ĐỂ TÌM!');
      }
    }`;

if (gameCode.includes(targetStr)) {
  gameCode = gameCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/game.js', gameCode, 'utf8');
  fs.writeFileSync('src/game_2.js', gameCode, 'utf8');
  console.log('Successfully patched periodic chest timer in game.js and game_2.js!');
} else {
  console.error('Target string not found!');
}
