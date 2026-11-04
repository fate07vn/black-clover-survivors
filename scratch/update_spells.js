const fs = require('fs');
const path = require('path');

const spellsPath = path.join(__dirname, '..', 'src', 'spells.js');
let code = fs.readFileSync(spellsPath, 'utf8');

const damageUpdates = {
  // Tier 1 (22 - 38)
  wind_scythe: 24,
  lightning_boots: 24,
  calidos_brachium: 26,
  silver_rain: 25,
  briar_whip: 24,
  chrono_stasis: 22,
  charmy_cotton: 23,
  world_tree: 25,
  dream_mist: 23,
  paint_splash: 25,
  sealing_chains: 24,
  diamond_blades: 25,
  poison_cloud: 23,
  magic_conversion: 24,
  flower_cannon: 25,
  heavy_gravity: 38,
  beast_claws: 36,

  // Tier 2 (75 - 125)
  black_divider: 95,
  sylph_tempest_domain: 105,
  dimension_slash: 118,
  calidos_purgatory: 105,
  shadow_canis: 108,
  origin_conquering_eon: 120,
  counter_trap: 98,
  mistilteinn_roots: 96,
  glamour_world: 102,
  death_scythe: 110,
  masterpiece_beast: 98,
  nero_binding: 96,
  spiral_inferno: 106,
  archangel_slash: 112,
  nemesis_harpoon: 98,
  ray_of_divine_punishment: 108,
  absolute_spatial_domain: 125,
  red_beast_crimson_curse: 120,
  singularity_black_hole: 125,
  eternal_phoenix_inferno: 115,
  all_magic_omnislash: 110,
  mythic_beast_rampage: 125,

  // Tier 3 (165 - 240)
  demon_slasher_infinity: 210,
  spirit_zephyr_supreme: 195,
  spirit_storm_empress: 215,
  leviathan_goddess: 220,
  death_thrust_void: 240,
  thunder_emperor_rampage: 180,
  sol_prominence_sun: 230,
  silver_shield_god: 205,
  blue_rose_cage: 195,
  chrono_eternal_domain: 220,
  soul_chain_deathmatch: 215,
  wolf_gluttony: 225,
  lumiere_god_light: 190,
  shadow_devil_union: 235,
  ultimate_light_slash: 240,
  infernal_reflect_void: 225,
  yggdrasil_rebirth: 220,
  dream_god_reality: 230,
  infinite_cleave: 235,
  twilight_valhalla: 225,
  eternal_prison_coffin: 230,
  flame_dragon_emperor: 235,
  absolute_void_annihilation: 240,
  crystal_colossus: 225,
  demon_light_judgment: 235,
  forbidden_poison_god: 185,
  genesis_transmutation: 195,
  raging_bull_fortress: 220,
  eden_floral_domain: 190,
  absolute_steel_colossus: 210,
  terra_titan_earthquake: 215
};

let missing = [];
let replacedCount = 0;
for (const id in damageUpdates) {
  const newDmg = damageUpdates[id];
  // Match `id: 'spell_id',` followed shortly by `baseDamage: 123,`
  const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?baseDamage:\\s*)(\\d+)`);
  if (regex.test(code)) {
    code = code.replace(regex, `$1${newDmg}`);
    replacedCount++;
  } else {
    missing.push(id);
  }
}

console.log('Replaced count:', replacedCount);
console.log('Missing count:', missing.length, missing);

// Descriptions of passives
code = code.replace(
  `reinforcement: {
    id: 'reinforcement',
    name: 'Ma Pháp Cường Hóa (Reinforcement)',
    type: 'passive',
    icon: '⚔️',
    description: 'Tăng tổng sát thương gây ra thêm +14% mỗi cấp.',
    maxLevel: 5
  },`,
  `reinforcement: {
    id: 'reinforcement',
    name: 'Ma Pháp Cường Hóa (Reinforcement)',
    type: 'passive',
    icon: '⚔️',
    description: 'Tăng tổng sát thương gây ra thêm +10% mỗi cấp (Tối đa +50%).',
    maxLevel: 5
  },`
);

code = code.replace(
  `  infinite_vitality: {
    id: 'infinite_vitality',
    name: 'Sinh Mệnh Vô Cực (Infinite Vitality)',
    type: 'infinite_passive',
    icon: '💖',
    description: 'Tăng vĩnh viễn +50 Máu Tối Đa và hồi phục ngay +50 HP. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  },
  infinite_might: {
    id: 'infinite_might',
    name: 'Sức Mạnh Vô Cực (Infinite Might)',
    type: 'infinite_passive',
    icon: '🔥',
    description: 'Tăng vĩnh viễn +10% toàn bộ Sát Thương của nhân vật. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  }`,
  `  infinite_vitality: {
    id: 'infinite_vitality',
    name: 'Sinh Mệnh Vô Cực (Infinite Vitality)',
    type: 'infinite_passive',
    icon: '💖',
    description: 'Tăng vĩnh viễn +25 Máu Tối Đa và hồi phục ngay +25 HP. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  },
  infinite_might: {
    id: 'infinite_might',
    name: 'Sức Mạnh Vô Cực (Infinite Might)',
    type: 'infinite_passive',
    icon: '🔥',
    description: 'Tăng vĩnh viễn +5% toàn bộ Sát Thương của nhân vật. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  }`
);

// In castSpell: levelScale
code = code.replace(
  `const levelScale = 1 + (p.level - 1) * 0.025;`,
  `const levelScale = 1 + (p.level - 1) * 0.012;`
);

// In applyDamage: critMult & boss anti-oneshot
const critTarget = `    if (actualCrit) {
      const critMult = Math.min(2.0, Math.max(1.0, 1.0 + ((p && p.critDmgBonus) || 0) * 0.5));
      amount = Math.round(amount * critMult);
    }`;

const critReplacement = `    if (actualCrit) {
      const critMult = Math.min(3.0, 1.75 + ((p && p.critDmgBonus) || 0));
      amount = Math.round(amount * critMult);
    }`;

code = code.replace(critTarget, critReplacement);

const bossCapTarget = `    if (enemy.isShielding) {
      amount = Math.max(1, Math.round(amount * 0.25));
    }
    enemy.hp -= amount;`;

const bossCapReplacement = `    if (enemy.isShielding) {
      amount = Math.max(1, Math.round(amount * 0.25));
    }

    // Boss Damage Reduction & Anti-oneshot Cap: đòn đánh đơn lẻ không thể gây quá 6% maxHp của Boss
    if (enemy.isBoss && enemy.maxHp > 0) {
      amount = Math.min(amount, Math.ceil(enemy.maxHp * 0.06));
    }

    enemy.hp -= amount;`;

code = code.replace(bossCapTarget, bossCapReplacement);

fs.writeFileSync(spellsPath, code, 'utf8');

// Copy to spells_2.js
const spells2Path = path.join(__dirname, '..', 'src', 'spells_2.js');
fs.writeFileSync(spells2Path, code, 'utf8');
console.log('Successfully written to spells.js and spells_2.js');
