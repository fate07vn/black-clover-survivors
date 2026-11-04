const fs = require('fs');
const path = require('path');

const enemiesPath = path.join(__dirname, '..', 'src', 'enemies.js');
let code = fs.readFileSync(enemiesPath, 'utf8');

// 1. Replace getVampireSurvivorsHpMultiplier and add getBalancedHpMultiplier
const oldFormula = `  // Vampire Survivors Standard HP Scaling Formula
  getVampireSurvivorsHpMultiplier(scaleWithLevel = true, isBoss = false) {
    const playerLevel = (this.game.player && this.game.player.level) ? this.game.player.level : 1;
    const playerCurse = (this.game.player && this.game.player.curse) ? this.game.player.curse : 0;
    const levelMult = scaleWithLevel ? playerLevel : 1;
    return levelMult * (1 + playerCurse);
  }`;

const newFormula = `  // Balanced Real-time & Level HP Scaling Formula (Overhaul)
  getBalancedHpMultiplier(gameTime, isBoss = false) {
    const minutes = (gameTime || 0) / 60;
    const pLv = (this.game.player && this.game.player.level) ? this.game.player.level : 1;
    // Tăng trưởng mượt theo phút + 3.5% mỗi cấp độ nhân vật
    const timeScale = 1 + Math.pow(minutes, 1.85) * 0.38;
    const lvScale = 1 + (pLv - 1) * 0.035;
    return timeScale * lvScale * (isBoss ? 1.35 : 1.0);
  }

  // Alias for compatibility
  getVampireSurvivorsHpMultiplier(scaleWithLevel = true, isBoss = false) {
    return this.getBalancedHpMultiplier(this.game.gameTime || 0, isBoss);
  }`;

if (code.includes(oldFormula)) {
  code = code.replace(oldFormula, newFormula);
  console.log('Replaced HP multiplier function');
} else {
  console.error('Could not find old HP formula');
}

// 2. In spawnRegularEnemy: Update time brackets, baseHp, and expVal
// Let's inspect spawnRegularEnemy
const oldSpawnRegularRegex = /spawnRegularEnemy\(gameTime\) \{[\s\S]*?this\.spawnEnemyAt\(pos\.x, pos\.y, type, hp, speed, contactDmg, expVal\);\s*\}/;

const newSpawnRegular = `spawnRegularEnemy(gameTime) {
    const pos = this.getSpawnPositionOffscreen();
    const mapId = this.game.selectedMapId || 'clover_plains';

    let type = 'bandit';
    let baseHp = 48;
    let speed = 75;
    let contactDmg = 6;
    let expVal = 2;

    const endlessMult = gameTime > 1800 ? (1 + (gameTime - 1800) * 0.003) : 1.0;

    if (mapId === 'underworld_palace') {
      // MAP 2: ĐẠI MA CUNG MINH GIỚI
      if (gameTime < 120) {
        // Phút 0 - 2: Hellhound & Bone Golem
        type = Math.random() < 0.75 ? 'hellhound' : 'bone_golem';
        baseHp = 48;
        expVal = 2;
        speed = 80 + Math.random() * 12;
        contactDmg = 6;
      } else if (gameTime < 300) {
        // Phút 2 - 5: Demon Charger, Shadow Mage, Bone Golem
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'shadow_mage' : (r < 0.85 ? 'bone_golem' : 'hellhound'));
        baseHp = 85;
        expVal = 3;
        speed = 78 + Math.random() * 12;
        contactDmg = 11;
      } else if (gameTime < 600) {
        // Phút 5 - 10: Shadow Mage, Bone Golem & Demon Charger
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'shadow_mage' : (r < 0.85 ? 'bone_golem' : 'hellhound'));
        baseHp = 140;
        expVal = 5;
        speed = 82 + Math.random() * 14;
        contactDmg = 15;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'lesser_devil' : 'high_devil');
        baseHp = 220;
        expVal = 8;
        speed = 96 + Math.random() * 16;
        contactDmg = 20;
      } else if (gameTime < 1320) {
        // Phút 15 - 22: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.7 ? 'lesser_devil' : 'high_devil');
        baseHp = 340;
        expVal = 12;
        speed = 104 + Math.random() * 16;
        contactDmg = 25;
      } else {
        // Phút 22 - 30: High Devil Legion & Demon Charger
        type = Math.random() < 0.35 ? 'demon_charger' : 'high_devil';
        baseHp = 500;
        expVal = 18;
        speed = 112 + Math.random() * 18;
        contactDmg = 30;
      }
    } else {
      // MAP 1: VƯƠNG QUỐC CLOVER
      if (gameTime < 120) {
        // Phút 0 - 2: Bandit, Zombie & Armored Boar
        type = Math.random() < 0.65 ? 'bandit' : 'zombie';
        baseHp = 48;
        expVal = 2;
        speed = 70 + Math.random() * 12;
        contactDmg = 5;
      } else if (gameTime < 300) {
        // Phút 2 - 5: Cultist, Armored Boar, Zombie & Bandit
        const r = Math.random();
        type = r < 0.35 ? 'armored_boar' : (r < 0.6 ? 'cultist' : (r < 0.8 ? 'zombie' : 'bandit'));
        baseHp = 85;
        expVal = 3;
        speed = 74 + Math.random() * 12;
        contactDmg = 9;
      } else if (gameTime < 600) {
        // Phút 5 - 10: Zombie, Armored Boar, Cultist & Spade Soldier
        const r = Math.random();
        type = r < 0.35 ? 'armored_boar' : (r < 0.6 ? 'spade_soldier' : (r < 0.8 ? 'zombie' : 'cultist'));
        baseHp = 140;
        expVal = 5;
        speed = 80 + Math.random() * 14;
        contactDmg = 14;
      } else if (gameTime < 900) {
        // Phút 10 - 15: Spade Soldier, Demon Charger & Lesser Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'spade_soldier' : 'lesser_devil');
        baseHp = 220;
        expVal = 8;
        speed = 92 + Math.random() * 15;
        contactDmg = 19;
      } else if (gameTime < 1320) {
        // Phút 15 - 22: Lesser Devil, Demon Charger & High Devil
        const r = Math.random();
        type = r < 0.35 ? 'demon_charger' : (r < 0.65 ? 'lesser_devil' : 'high_devil');
        baseHp = 340;
        expVal = 12;
        speed = 100 + Math.random() * 16;
        contactDmg = 24;
      } else {
        // Phút 22 - 30: High Devil Legion & Demon Charger
        type = Math.random() < 0.35 ? 'demon_charger' : 'high_devil';
        baseHp = 500;
        expVal = 18;
        speed = 110 + Math.random() * 18;
        contactDmg = 29;
      }
    }

    const hpMult = this.getBalancedHpMultiplier(gameTime, false);
    let hp = Math.round(baseHp * hpMult * endlessMult);

    const diffKey = this.game.selectedDifficulty || 'normal';
    const diffMod = (typeof MAP_DIFFICULTIES !== 'undefined' ? MAP_DIFFICULTIES[diffKey] : null) || (window.MAP_DIFFICULTIES && window.MAP_DIFFICULTIES[diffKey]) || { hpMult: 1, bossHpMult: 1, dmgMult: 1, speedMult: 1, rewardMult: 1 };

    hp = Math.round(hp * diffMod.hpMult);
    speed = Math.round(speed * diffMod.speedMult);
    contactDmg = Math.round(contactDmg * diffMod.dmgMult);
    expVal = Math.round(expVal * diffMod.rewardMult);

    this.spawnEnemyAt(pos.x, pos.y, type, hp, speed, contactDmg, expVal);
  }`;

if (oldSpawnRegularRegex.test(code)) {
  code = code.replace(oldSpawnRegularRegex, newSpawnRegular);
  console.log('Replaced spawnRegularEnemy');
} else {
  console.error('Could not match spawnRegularEnemy');
}

// 3. In spawnBoss: use getBalancedHpMultiplier
code = code.replace(
  `const vsHpMult = this.getVampireSurvivorsHpMultiplier(true, true);`,
  `const vsHpMult = this.getBalancedHpMultiplier(this.game.gameTime || 0, true);`
);

// 4. In checkBossSpawns: Set baseHp for all bosses
// Underworld Palace:
// Phút 3: Vanica: 2800
code = code.replace(
  `this.spawnBoss('boss_vanica', 'VANICA & MEGICULA (Huyết Ma Pháp)', 450, 105, 30, 80);`,
  `this.spawnBoss('boss_vanica', 'VANICA & MEGICULA (Huyết Ma Pháp)', 2800, 105, 30, 80);`
);
// Phút 6: Zenon: 5500
code = code.replace(
  `this.spawnBoss('boss_zenon', 'ZENON ZOGRATIS (Xương & Không Gian)', 900, 100, 36, 180);`,
  `this.spawnBoss('boss_zenon', 'ZENON ZOGRATIS (Xương & Không Gian)', 5500, 100, 36, 180);`
);
// Phút 10: Dante: 11000
code = code.replace(
  `const b = this.spawnBoss('boss_dante', '⚠️ BOSS NHỎ PHÚT 10: DANTE & LUCIFERO (Trọng Lực Tuyệt Đối)', 1650, 115, 46, 400);`,
  `const b = this.spawnBoss('boss_dante', '⚠️ BOSS NHỎ PHÚT 10: DANTE & LUCIFERO (Trọng Lực Tuyệt Đối)', 11000, 115, 46, 400);`
);
// Phút 15: Megicula Awakened: 20000
code = code.replace(
  `this.spawnBoss('boss_vanica', 'MEGICULA THỨC TỈNH TOÀN DIỆN (Huyết Chú Ma Vương)', 2550, 110, 55, 650);`,
  `this.spawnBoss('boss_vanica', 'MEGICULA THỨC TỈNH TOÀN DIỆN (Huyết Chú Ma Vương)', 20000, 110, 55, 650);`
);
// Phút 20: Moris: 35000
code = code.replace(
  `const b = this.spawnBoss('boss_zenon', '⚠️ BOSS NHỎ PHÚT 20: MORIS Á MA HỢP THỂ (Cấu Trúc Ma Vương)', 3700, 105, 62, 1000);`,
  `const b = this.spawnBoss('boss_zenon', '⚠️ BOSS NHỎ PHÚT 20: MORIS Á MA HỢP THỂ (Cấu Trúc Ma Vương)', 35000, 105, 62, 1000);`
);
// Phút 25: Naamah & Lilith: 55000
code = code.replace(
  `this.spawnBoss('boss_dante', 'SONG MA ĐẠO TỐI CAO: NAAMAH & LILITH', 4900, 118, 72, 1500);`,
  `this.spawnBoss('boss_dante', 'SONG MA ĐẠO TỐI CAO: NAAMAH & LILITH', 55000, 118, 72, 1500);`
);
// Phút 30: Lucifero: 90000
code = code.replace(
  `const b = this.spawnBoss('boss_lucifero', '👑 ĐẠI BOSS CUỐI PHÚT 30: MINH GIỚI TỐI CAO MA VƯƠNG LUCIFERO', 7000, 85, 82, 3000);`,
  `const b = this.spawnBoss('boss_lucifero', '👑 ĐẠI BOSS CUỐI PHÚT 30: MINH GIỚI TỐI CAO MA VƯƠNG LUCIFERO', 90000, 85, 82, 3000);`
);

// Clover Plains:
// Phút 3: Mars: 2800
code = code.replace(
  `this.spawnBoss('boss_mars', 'MARS (Khoáng Thạch Ma Pháp)', 380, 62, 25, 60);`,
  `this.spawnBoss('boss_mars', 'MARS (Khoáng Thạch Ma Pháp)', 2800, 62, 25, 60);`
);
// Phút 6: Vetto: 5500
code = code.replace(
  `this.spawnBoss('boss_vetto', 'VETTO (Thú Ma Pháp Tuyệt Vọng)', 770, 100, 32, 140);`,
  `this.spawnBoss('boss_vetto', 'VETTO (Thú Ma Pháp Tuyệt Vọng)', 5500, 100, 32, 140);`
);
// Phút 10: Patri: 11000
code = code.replace(
  `const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 10: PATRI (Ánh Sáng Phán Xét & Thần Tốc)', 1400, 118, 42, 300);`,
  `const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 10: PATRI (Ánh Sáng Phán Xét & Thần Tốc)', 11000, 118, 42, 300);`
);
// Phút 15: Vetto Awakened: 20000
code = code.replace(
  `this.spawnBoss('boss_vetto', 'VETTO THỨC TỈNH MA NHÃN (Tuyệt Vọng Ma Thú)', 2050, 105, 50, 500);`,
  `this.spawnBoss('boss_vetto', 'VETTO THỨC TỈNH MA NHÃN (Tuyệt Vọng Ma Thú)', 20000, 105, 50, 500);`
);
// Phút 20: Demon God: 35000
code = code.replace(
  `const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 20: MA THẦN CỔ ĐẠI (Ancient Demon God)', 3100, 90, 60, 800);`,
  `const b = this.spawnBoss('boss_patri', '⚠️ BOSS NHỎ PHÚT 20: MA THẦN CỔ ĐẠI (Ancient Demon God)', 35000, 90, 60, 800);`
);
// Phút 25: Dark Elf: 55000
code = code.replace(
  `this.spawnBoss('boss_mars', 'HẮC YÊU TINH QUANG KIẾM CỰC HẠN', 4100, 115, 68, 1200);`,
  `this.spawnBoss('boss_mars', 'HẮC YÊU TINH QUANG KIẾM CỰC HẠN', 55000, 115, 68, 1200);`
);
// Phút 30: Zagred: 90000
code = code.replace(
  `const b = this.spawnBoss('boss_zagred', '👑 ĐẠI BOSS CUỐI PHÚT 30: ÁC QUỶ MINH GIỚI ZAGRED', 5800, 78, 75, 3000);`,
  `const b = this.spawnBoss('boss_zagred', '👑 ĐẠI BOSS CUỐI PHÚT 30: ÁC QUỶ MINH GIỚI ZAGRED', 90000, 78, 75, 3000);`
);

fs.writeFileSync(enemiesPath, code, 'utf8');

// Copy to enemies_2.js
const enemies2Path = path.join(__dirname, '..', 'src', 'enemies_2.js');
fs.writeFileSync(enemies2Path, code, 'utf8');
console.log('Successfully written to enemies.js and enemies_2.js');
