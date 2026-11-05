// Artifact and Relic System (Hệ Thống Tạo Vật & Cổ Vật Ma Thuật)
// Bosses drop rare Ancient Artifacts that grant unique passive stats and special triggered skills!

const ARTIFACT_DEFS = {
  crown_of_wizard_king: {
    id: 'crown_of_wizard_king',
    name: 'Vương Miện Ma Pháp Đế (Crown of Julius)',
    rarity: 'legendary',
    icon: '👑',
    tagline: 'Thời Gian Thần Khí Tối Cao',
    description: 'Bảo vật tối thượng chứa Thời Gian Ma Pháp của Đệ Nhị Thập Bát Đại Ma Pháp Đế Julius Novachrono.',
    stats: { damageBonus: 0.05, cooldownReduction: 0.04, expBonus: 0.07 },
    skillName: 'Ngưng Đọng Thời Không',
    skillDesc: 'Cứ mỗi 45 giây, làm đóng băng toàn bộ quái vật (Boss bị làm chậm 50%) trong 3.5 giây!',
    cooldown: 45
  },
  demon_blade_licht: {
    id: 'demon_blade_licht',
    name: 'Tàn Kiếm Khai Nguyên Licht (Blade of Licht)',
    rarity: 'legendary',
    icon: '🗡️✨',
    tagline: 'Thánh Kiếm Tộc Yêu Tinh',
    description: 'Mảnh vỡ thanh kiếm thần của thủ lĩnh tộc Yêu Tinh Licht, chứa linh lực kiếm thuật vô song.',
    stats: { critChance: 0.04, critDmgBonus: 0.10, damageBonus: 0.05 },
    skillName: 'Kiếm Khí Cổ Đại',
    skillDesc: 'Đòn đánh có 35% cơ hội phóng ra 6 luồng kiếm khí ánh sáng tự truy sát kẻ địch!',
    cooldown: 1.5
  },
  lucifero_demon_heart: {
    id: 'lucifero_demon_heart',
    name: 'Hắc Ma Tâm Lucifero (Lucifero Core)',
    rarity: 'legendary',
    icon: '🩸😈',
    tagline: 'Trái Tim Tối Cao Ma Vương',
    description: 'Trái tim ác quỷ tối cao của Ma Vương Minh Giới Lucifero, khao khát nuốt chửng sinh mệnh.',
    stats: { maxHp: 42, damageBonus: 0.07, areaBonus: 0.07 },
    skillName: 'Hấp Huyết Ma Trận',
    skillDesc: 'Tiêu diệt quái hồi 1 HP. Khi hạ Boss hồi ngay 25% Máu và cuồng bạo +30% Tốc Đánh trong 10s!',
    cooldown: 0
  },
  chronos_hourglass: {
    id: 'chronos_hourglass',
    name: 'Đồng Hồ Cát Chronos (Chronos Hourglass)',
    rarity: 'legendary',
    icon: '⏳',
    tagline: 'Bảo Vật Nghịch Chuyển Tử Sinh',
    description: 'Tạo vật thời gian cổ xưa có thể đảo ngược dòng chảy sinh tử và tái sinh linh hồn.',
    stats: { cooldownReduction: 0.05, maxHp: 28, speed: 0.04 },
    skillName: 'Nghịch Đảo Thời Gian',
    skillDesc: 'Khi nhận sát thương chí tử, thoát chết và xóa sạch đạn xung quanh, hồi phục 50% HP (1 lần/trận).',
    cooldown: 99999
  },
  aegis_silvamillion: {
    id: 'aegis_silvamillion',
    name: 'Quang Khiên Silvamillion (Sacred Aegis)',
    rarity: 'epic',
    icon: '🛡️✨',
    tagline: 'Khiên Thánh Hoàng Tộc',
    description: 'Khiên hộ thể của hoàng tộc Silvamillion, tỏa ra ánh sáng thuần khiết bảo vệ chủ nhân.',
    stats: { maxHp: 45, armor: 0.06, hpRegen: 0.5 },
    skillName: 'Bảo Hộ Quang Khiên',
    skillDesc: 'Khi HP tụt dưới 30%, kích hoạt khiên bất tử chặn 100% sát thương trong 2.5s và hồi ngay 20% HP (Hồi chiêu 80s).',
    cooldown: 80
  },
  sylph_tempest_stone: {
    id: 'sylph_tempest_stone',
    name: 'Phong Hạch Thần Tinh Sylph (Sylph Tempest Core)',
    rarity: 'epic',
    icon: '🌪️💎',
    tagline: 'Lõi Phong Tinh Linh Bão Tố',
    description: 'Tinh thạch phong tinh linh chứa sức gió cuồng phong vô tận nâng đỡ người mang.',
    stats: { speed: 0.08, pickupRadius: 25, cooldownReduction: 0.05 },
    skillName: 'Lốc Xoáy Bão Cuộn',
    skillDesc: 'Mỗi khi Lướt (Space), tạo lốc xoáy bão hút quái vật và gom đạn trong bán kính 260px trong 2.0s!',
    cooldown: 4.0
  },
  zagred_cursed_rosary: {
    id: 'zagred_cursed_rosary',
    name: 'Tràng Hạt Ác Ma Zagred (Cursed Rosary)',
    rarity: 'epic',
    icon: '📿👁️',
    tagline: 'Tà Vật Ngôn Linh Ma Pháp',
    description: 'Tràng hạt nguyền rủa chứa Ngôn Linh Ma Pháp từng gây họa diệt vong cho tộc Elf.',
    stats: { areaBonus: 0.10, damageBonus: 0.08, critChance: 0.04 },
    skillName: 'Ma Bàn Tay Nguyền Rủa',
    skillDesc: 'Mỗi 15s triệu hồi bàn tay ác ma đập nát khu vực đông quái nhất, gây 250 sát thương và giảm 15% giáp kẻ địch!',
    cooldown: 15
  },
  yggdrasil_life_seed: {
    id: 'yggdrasil_life_seed',
    name: 'Hạt Mầm Thế Giới Thụ (World Tree Seed)',
    rarity: 'epic',
    icon: '🌿✨',
    tagline: 'Mầm Sống Thần Thoại',
    description: 'Hạt mầm thần thoại của Thế Giới Thụ Yggdrasil, truyền sinh khí bất diệt và giam cầm kẻ ác.',
    stats: { maxHp: 40, hpRegen: 0.6, pickupRadius: 20 },
    skillName: 'Rễ Cây Trói Buộc',
    skillDesc: 'Cứ mỗi 10 giây mọc rễ ma pháp trói chặt quái vật trong bán kính 200px trong 2.0 giây!',
    cooldown: 10
  },
  salamander_flame_core: {
    id: 'salamander_flame_core',
    name: 'Hỏa Cầu Tinh Linh Salamander (Salamander Core)',
    rarity: 'epic',
    icon: '🔥🐉',
    tagline: 'Hỏa Diễm Tinh Linh Bất Diệt',
    description: 'Ngọn lửa thiêu đốt vạn vật của Hỏa Tinh Linh Salamander rực cháy dữ dội.',
    stats: { damageBonus: 0.08, areaBonus: 0.08, critDmgBonus: 0.12 },
    skillName: 'Hỏa Trận Thiêu Đốt',
    skillDesc: 'Cứ mỗi 9 giây bùng nổ vòng tròn lửa quét 360 độ thiêu đốt kẻ địch xung quanh, gây 220 sát thương!',
    cooldown: 9
  },
  gauche_phantom_mirror: {
    id: 'gauche_phantom_mirror',
    name: 'Gương Thần Phân Thân (Phantom Mirror)',
    rarity: 'rare',
    icon: '🪞✨',
    tagline: 'Ma Kính Phản Chiếu',
    description: 'Tấm gương phản chiếu ma thuật tinh xảo, nhân bản các đòn ma pháp bắn ra.',
    stats: { damageBonus: 0.05, critChance: 0.04, armor: 0.03 },
    skillName: 'Phản Chiếu Ma Ảnh',
    skillDesc: 'Các đòn tấn công dạng đạn phép có 25% tỷ lệ bắn thêm 1 tia đạn phản xạ song song!',
    cooldown: 1.0
  },
  charmy_feast_box: {
    id: 'charmy_feast_box',
    name: 'Hộp Ẩm Thực Charmy (Feast Basket)',
    rarity: 'rare',
    icon: '🍲🍖',
    tagline: 'Tiệc Nấu Bất Tận Của Bếp Trưởng',
    description: 'Chiếc giỏ thức ăn thần kỳ chứa các món ăn tẩm bổ hồi phục mana và thể lực tức thì.',
    stats: { maxHp: 35, coinBonus: 0.12, expBonus: 0.06 },
    skillName: 'Đùi Cừu Ma Thuật',
    skillDesc: 'Cứ mỗi 25 giây tự rơi ra một món ăn ma pháp giúp hồi phục 30 HP và buff +10% Tốc Độ trong 5 giây!',
    cooldown: 25
  },
  luck_thunder_gauntlets: {
    id: 'luck_thunder_gauntlets',
    name: 'Găng Tay Lôi Thần Luck (Thunder Gauntlets)',
    rarity: 'rare',
    icon: '⚡🧤',
    tagline: 'Cuồng Lôi Quyền Pháp',
    description: 'Đôi găng tích tụ dòng điện cao thế kích thích cơ bắp của Lôi Ma Đạo Sĩ Luck Voltia.',
    stats: { speed: 0.07, cooldownReduction: 0.04, damageBonus: 0.05 },
    skillName: 'Lôi Thần Trảo Kích',
    skillDesc: 'Cứ mỗi 8 giây giáng tia sét liên hoàn giật xuyên qua 6 quái vật gần nhất, làm choáng 1.0 giây!',
    cooldown: 8
  },
  nero_sealing_stone: {
    id: 'nero_sealing_stone',
    name: 'Phong Ấn Ma Thạch Secre (Sealing Stone)',
    rarity: 'rare',
    icon: '🐦🪨',
    tagline: 'Khóa Phong Ấn Cổ Đại',
    description: 'Viên đá phong ấn cổ xưa của Secre Swallowtail lưu giữ ma thuật qua 500 năm.',
    stats: { armor: 0.05, maxHp: 30, cooldownReduction: 0.04 },
    skillName: 'Giam Hãm Phong Ấn',
    skillDesc: 'Giảm sát thương nhận vào; khi trúng đòn có 25% cơ hội phong ấn quái vật tấn công trong 2.5s!',
    cooldown: 6
  },
  yami_dark_pipe: {
    id: 'yami_dark_pipe',
    name: 'Tẩu Thuốc Hắc Ám Yami (Captain Dark Pipe)',
    rarity: 'rare',
    icon: '🚬🗡️',
    tagline: 'Uy Áp Đột Phá Giới Hạn',
    description: 'Chiếc tẩu thuốc mang theo luồng khí công Ki thâm sâu và uy áp vô hình của Đoàn Trưởng Yami.',
    stats: { damageBonus: 0.06, critChance: 0.04, critDmgBonus: 0.10 },
    skillName: 'Tụ Khí Đột Phá',
    skillDesc: 'Khi đứng yên 1 giây, tích lũy Ki tăng +35% Sát Thương và +15% Bạo Kích cho đòn đánh kế tiếp!',
    cooldown: 5
  }
};

// =========================================================================
// CỔ VẬT TRẬN ĐẤU / CHIẾN TRƯỜNG (DEDICATED IN-RUN ARTIFACTS - MAGIC SURVIVAL STYLE)
// Hoàn toàn tách biệt với Cổ Vật Sảnh (Lobby Meta Relics).
// Chỉ xuất hiện khi mở Rương Báu (Treasure Chest 👑) trên bản đồ!
// =========================================================================
const IN_RUN_ARTIFACT_DEFS = {
  // 1. HÌNH ẢNH 1: MAGITECH MODULE
  magitech_module: {
    id: 'magitech_module',
    name: 'Mô-đun Ma Thuật Kỹ Nghệ (Magitech Module)',
    rarity: 'rare',
    icon: '⚡🔋',
    tagline: 'Ma Thuật Kỹ Nghệ (Magic Survival)',
    description: '22% cơ hội cho mỗi tia đạn Ma Pháp phân tách thành 2 tia ma pháp tự truy sát kẻ địch!',
    stats: { damageBonus: 0.08, areaBonus: 0.12 }
  },

  // 2. HÌNH ẢNH 2: HOLY CROSS
  holy_cross: {
    id: 'holy_cross',
    name: 'Thánh Giá Quang Minh (Holy Cross)',
    rarity: 'rare',
    icon: '✝️✨',
    tagline: 'Thánh Vật Thanh Tẩy Tà Ma (Magic Survival)',
    description: 'Tăng +20% Sát thương Chí mạng. Đòn đánh chí mạng giáng một cột sáng thần thánh thanh tẩy quái vật!',
    stats: { critChance: 0.06, critDmgBonus: 0.20 }
  },

  // 3. HÌNH ẢNH 3: TRAVELER'S BACKPACK
  dimensional_backpack: {
    id: 'dimensional_backpack',
    name: 'Ba Lô Thám Hiểm (Traveler Backpack)',
    rarity: 'rare',
    icon: '🎒📜',
    tagline: 'Hành Trang Không Gian Vô Tận (Magic Survival)',
    description: 'Mở rộng không gian chứa đồ: +45 Bán kính nhặt đồ, +35 Máu Tối đa và +15% Clover Coins nhặt được!',
    stats: { pickupRadius: 45, maxHp: 35, coinBonus: 0.15 }
  },

  // 4. TARGET FIXATOR (Magic Survival)
  target_fixator: {
    id: 'target_fixator',
    name: 'Kính Ngắm Khóa Mục Tiêu (Target Fixator)',
    rarity: 'rare',
    icon: '🎯🔭',
    tagline: 'Định Vị Điểm Yếu (Magic Survival)',
    description: 'Tăng +20% Tốc độ bay của đạn và tăng +15% Sát thương tầm xa cho toàn bộ Ma Pháp!',
    stats: { speed: 0.08, damageBonus: 0.15 }
  },

  // 5. URANIUM CORE (Magic Survival)
  uranium_core: {
    id: 'uranium_core',
    name: 'Lõi Năng Lượng Uranium (Uranium Core)',
    rarity: 'epic',
    icon: '☢️🟢',
    tagline: 'Năng Lượng Phóng Xạ Cực Hạn (Magic Survival)',
    description: 'Tăng cực mạnh +30% Toàn Bộ Sát Thương, nhưng tăng thêm +8% Thời gian hồi chiêu!',
    stats: { damageBonus: 0.30, cooldownReduction: -0.08 }
  },

  // 6. BLOOD GRAIL (Magic Survival)
  blood_grail: {
    id: 'blood_grail',
    name: 'Chén Thánh Huyết Ma (Blood Grail)',
    rarity: 'rare',
    icon: '🍷🩸',
    tagline: 'Huyết Tế Sinh Mệnh (Magic Survival)',
    description: 'Hồi phục 1% Máu tối đa mỗi khi tiêu diệt 15 quái vật. Tăng +0.5 HP/s hồi phục tự nhiên!',
    stats: { hpRegen: 0.5, maxHp: 25 }
  },

  // 7. ASSASSIN'S DAGGER (Magic Survival)
  assassin_dagger: {
    id: 'assassin_dagger',
    name: 'Dao Găm Bóng Đêm (Assassin Dagger)',
    rarity: 'rare',
    icon: '🗡️🌑',
    tagline: 'Trảm Kích Yếu Điểm (Magic Survival)',
    description: 'Tăng +10% Tỉ lệ Chí Mạng và tăng +35% Sát thương Chí mạng đối với quái vật!',
    stats: { critChance: 0.10, critDmgBonus: 0.35 }
  },

  // 8. FOUR-LEAF CLOVER
  clover_four_leaf: {
    id: 'clover_four_leaf',
    name: 'Bùa Cỏ 4 Lá May Mắn (Four-Leaf Clover)',
    rarity: 'epic',
    icon: '🍀✨',
    tagline: 'Phước Lành Cỏ 4 Lá',
    description: 'Tăng +15% Kinh nghiệm (EXP) nhận vào và +8% Tỉ lệ Đòn Chí Mạng!',
    stats: { expBonus: 0.15, critChance: 0.08 }
  },

  // 9. MANA SHIELD AMULET
  mana_shield_amulet: {
    id: 'mana_shield_amulet',
    name: 'Bùa Hộ Mệnh Khiên Mana (Mana Shield)',
    rarity: 'epic',
    icon: '🛡️💠',
    tagline: 'Hộ Thể Kết Giới',
    description: 'Tạo một lớp khiên chắn mana hấp thụ hoàn toàn 1 đòn đánh của quái mỗi 25 giây!',
    stats: { armor: 0.08, maxHp: 30 }
  },

  // 10. WIND STRIDE BOOTS
  wind_stride_boots: {
    id: 'wind_stride_boots',
    name: 'Giày Lướt Gió Thần Tốc (Wind Stride Boots)',
    rarity: 'rare',
    icon: '👢🌪️',
    tagline: 'Bộ Pháp Thần Tốc',
    description: 'Tăng +18% Tốc độ di chuyển và giảm -25% Hồi chiêu Lướt Dash (Space)!',
    stats: { speed: 0.18, cooldownReduction: 0.05 }
  },

  // 11. SPIRIT PRISM
  spirit_prism: {
    id: 'spirit_prism',
    name: 'Lăng Kính Tinh Linh (Spirit Prism)',
    rarity: 'epic',
    icon: '💎🌈',
    tagline: 'Khúc Xạ Ma Lực',
    description: 'Khúc xạ ma lực: Mở rộng +18% Diện tích nổ và tăng +10% Sát thương ma pháp!',
    stats: { areaBonus: 0.18, damageBonus: 0.10 }
  },

  // 12. FORBIDDEN GRIMOIRE PAGE
  forbidden_grimoire_page: {
    id: 'forbidden_grimoire_page',
    name: 'Trang Sách Đen Cấm Kỵ (Forbidden Page)',
    rarity: 'epic',
    icon: '📖🔥',
    tagline: 'Cấm Thuật Cổ Xưa',
    description: 'Khai mở cấm thuật: Mở rộng +22% Diện tích nổ của mọi ma pháp (AoE Explosion)!',
    stats: { areaBonus: 0.22, damageBonus: 0.08 }
  },

  // 13. ADAMANT HEART
  adamant_heart: {
    id: 'adamant_heart',
    name: 'Trái Tim Kim Cương (Adamant Core)',
    rarity: 'rare',
    icon: '💎❤️',
    tagline: 'Cường Hóa Cơ Thể',
    description: 'Cường hóa cơ thể: Tăng +50 Máu Tối đa và +10% Giáp phòng ngự giảm sát thương!',
    stats: { maxHp: 50, armor: 0.10 }
  },

  // 14. PHOENIX FEATHER
  phoenix_feather: {
    id: 'phoenix_feather',
    name: 'Lông Vũ Phượng Hoàng (Phoenix Feather)',
    rarity: 'legendary',
    icon: '🪶🔥',
    tagline: 'Tái Sinh Từ Tro Tàn',
    description: 'Ban thêm 1 lần HỒI SINH (50% HP) trong trận đấu! Tăng +15% Tốc chạy khi dưới 30% HP.',
    stats: { maxHp: 30, hpRegen: 0.6 }
  },

  // 15. OVERLOAD BATTERY
  overload_battery: {
    id: 'overload_battery',
    name: 'Lõi Quá Tải Ma Lực (Overload Battery)',
    rarity: 'epic',
    icon: '🔋⚡',
    tagline: 'Giải Phóng Cực Hạn',
    description: 'Xả ma lực cực hạn: Giảm -10% Thời gian hồi chiêu toàn bộ vũ khí và kỹ năng!',
    stats: { cooldownReduction: 0.10, speed: 0.05 }
  },

  // 16. DEMON SKULL FRAGMENT
  demon_skull_fragment: {
    id: 'demon_skull_fragment',
    name: 'Mảnh Sọ Ma Thần (Demon Skull Fragment)',
    rarity: 'legendary',
    icon: '💀😈',
    tagline: 'Khí Tức Minh Giới',
    description: 'Khí tức Minh Giới: Tăng +20% Sát thương lên Boss. Khi máu quái dưới 15%, có 50% cơ hội kết liễu lập tức!',
    stats: { damageBonus: 0.20, critChance: 0.05 }
  },

  // 17. GOLDEN CLOVER COIN
  golden_clover_coin: {
    id: 'golden_clover_coin',
    name: 'Đồng Xu Hoàng Kim (Golden Clover Coin)',
    rarity: 'rare',
    icon: '🪙✨',
    tagline: 'Thần Tài Gõ Cửa',
    description: 'Tăng +25% Clover Coins và +15% EXP nhận được trong suốt trận đấu!',
    stats: { coinBonus: 0.25, expBonus: 0.15 }
  },

  // 18. SPIRIT BELL FEATHER
  spirit_bell_feather: {
    id: 'spirit_bell_feather',
    name: 'Lông Vũ Tinh Linh Bell (Spirit Bell Feather)',
    rarity: 'rare',
    icon: '🪶🌪️',
    tagline: 'Phong Linh Tinh Túy',
    description: 'Tăng +16% Tốc độ di chuyển và giảm -6% Thời gian hồi chiêu toàn bộ ma pháp!',
    stats: { speed: 0.16, cooldownReduction: 0.06 }
  }
};


class ArtifactSystem {
  constructor(game) {
    this.game = game;
    // Map of artifactId -> { star: 1..3, count: 1 }
    this.collection = {};
    // Array of up to 3 equipped artifact IDs
    this.equipped = [null, null, null];
    this.inRunArtifacts = [];
    // Timers for relic skills in battle
    this.timers = {};
    this.reviveUsed = false;
    this.stillTimer = 0;
    this.isKiCharged = false;
  }

  reset() {
    this.collection = {};
    this.equipped = [null, null, null];
    this.inRunArtifacts = [];
    this.timers = {};
    this.reviveUsed = false;
    this.stillTimer = 0;
    this.isKiCharged = false;
  }

  loadData(savedData) {
    this.reset();
    if (savedData && savedData.artifacts && typeof savedData.artifacts === 'object') {
      this.collection = Object.assign({}, savedData.artifacts);
    }
    if (savedData && Array.isArray(savedData.equippedArtifacts)) {
      this.equipped = savedData.equippedArtifacts.slice(0, 3);
    }
    // Clean up invalid IDs
    this.equipped = this.equipped.map(id => (id && ARTIFACT_DEFS[id]) ? id : null);
  }

  exportData() {
    return {
      artifacts: this.collection,
      equippedArtifacts: this.equipped
    };
  }

  resetRun() {
    this.timers = {};
    this.reviveUsed = false;
    this.stillTimer = 0;
    this.isKiCharged = false;
    for (const id of this.equipped) {
      if (id && ARTIFACT_DEFS[id]) {
        this.timers[id] = 0;
      }
    }
  }

  isUnlocked(id) {
    return !!this.collection[id];
  }

  getStar(id) {
    return (this.collection[id] && this.collection[id].star) || 1;
  }

  // Equip / Unequip
  equip(id, slotIndex) {
    if (!ARTIFACT_DEFS[id] || !this.collection[id]) return false;
    if (slotIndex < 0 || slotIndex >= 3) return false;

    // If already equipped in another slot, unequip that slot
    const existingIdx = this.equipped.indexOf(id);
    if (existingIdx !== -1) {
      this.equipped[existingIdx] = null;
    }

    this.equipped[slotIndex] = id;
    this.game.saveGameData();
    return true;
  }

  unequip(slotIndex) {
    if (slotIndex >= 0 && slotIndex < 3) {
      this.equipped[slotIndex] = null;
      this.game.saveGameData();
      return true;
    }
    return false;
  }

  // Helper to check if player currently has an artifact in run or meta
  hasArtifact(artId) {
    if (!artId) return false;
    if (this.equipped && this.equipped.includes(artId)) return true;
    if (this.inRunArtifacts && this.inRunArtifacts.includes(artId)) return true;
    return false;
  }

  // Apply all equipped relic stat bonuses + in-run Treasure Chest artifacts (Magic Survival style!)
  applyEquippedStats(player) {
    if (!player) return;

    // 1. Pre-run Meta Relics (up to 3 equipped slots)
    for (const artId of this.equipped) {
      if (!artId) continue;
      this.applySingleArtifactStats(player, artId, this.getStar(artId));
    }

    // 2. In-Run Artifacts collected from in-map Treasure Chests (Giới hạn tối đa 12 Cổ Vật)
    if (Array.isArray(this.inRunArtifacts)) {
      const activeList = this.inRunArtifacts.slice(0, 12);
      for (const artId of activeList) {
        if (!artId) continue;
        this.applySingleArtifactStats(player, artId, 1);
      }
    }
  }

  applySingleArtifactStats(player, artId, star = 1) {
    const def = (typeof IN_RUN_ARTIFACT_DEFS !== "undefined" && IN_RUN_ARTIFACT_DEFS[artId]) || ARTIFACT_DEFS[artId];
    if (!def || !def.stats) return;

    const starMult = 1.0 + (star - 1) * 0.15; // ★1: 1.0x, ★2: 1.15x, ★3: 1.30x

    if (def.stats.maxHp) player.maxHp += Math.round(def.stats.maxHp * starMult);
    if (def.stats.damageBonus) player.damageBonus = (player.damageBonus || 0) + def.stats.damageBonus * starMult;
    if (def.stats.armor) player.armor = Math.min(0.70, (player.armor || 0) + def.stats.armor * starMult);
    if (def.stats.speed) player.speed *= (1 + def.stats.speed * starMult);
    if (def.stats.cooldownReduction) player.cooldownReduction = Math.min(0.50, (player.cooldownReduction || 0) + def.stats.cooldownReduction * starMult);
    if (def.stats.areaBonus) player.areaBonus = (player.areaBonus || 0) + def.stats.areaBonus * starMult;
    if (def.stats.critChance) player.critChance = Math.min(1.0, (player.critChance || 0) + def.stats.critChance * starMult);
    if (def.stats.critDmgBonus) player.critDmgBonus = Math.min(2.0, (player.critDmgBonus || 0) + def.stats.critDmgBonus * starMult);
    if (def.stats.hpRegen) player.hpRegen = (player.hpRegen || 0) + def.stats.hpRegen * starMult;
    if (def.stats.pickupRadius) player.pickupRadius = (player.pickupRadius || 80) + Math.round(def.stats.pickupRadius * starMult);
    if (def.stats.expBonus) player.expBonus = (player.expBonus || 0) + def.stats.expBonus * starMult;
    if (def.stats.coinBonus && this.game) this.game.coinDropMultiplier = (this.game.coinDropMultiplier || 1.0) + def.stats.coinBonus * starMult;
  }

  // Update loop for triggered skills
  update(dt) {
    const p = this.game.player;
    if (!p || p.hp <= 0) return;

    // Check equipped artifacts
    for (const artId of this.equipped) {
      if (!artId) continue;
      const def = ARTIFACT_DEFS[artId];
      if (!def) continue;

      this.timers[artId] = (this.timers[artId] || 0) + dt;

      // 1. Crown of Wizard King: Time Freeze every 45s
      if (artId === 'crown_of_wizard_king' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.activateTimeFreeze(3.5);
      }

      // 2. Zagred Cursed Rosary: Demon Hand crush every 14s
      if (artId === 'zagred_cursed_rosary' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.activateDemonHand();
      }

      // 3. Yggdrasil Life Seed: Roots entangle every 9s
      if (artId === 'yggdrasil_life_seed' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.activateYggdrasilRoots();
      }

      // 4. Salamander Flame Core: Ring of Fire every 8s
      if (artId === 'salamander_flame_core' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.activateSalamanderFlame();
      }

      // 5. Charmy Feast Basket: Drops food every 25s
      if (artId === 'charmy_feast_box' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.game.spawnDrop(p.x + (Math.random() - 0.5) * 60, p.y + (Math.random() - 0.5) * 60, 'food', 50);
        this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '🍖 TIỆC CỪU CHARMY!', color: '#fbbf24', size: 16, life: 0.8 });
      }

      // 6. Luck Thunder Gauntlets: Chain Lightning every 7s
      if (artId === 'luck_thunder_gauntlets' && this.timers[artId] >= def.cooldown) {
        this.timers[artId] = 0;
        this.activateChainLightning();
      }
    }

    // Yami Dark Pipe: Standing still for 1s charges Ki
    if (this.hasEquipped('yami_dark_pipe')) {
      if (!p.isMoving) {
        this.stillTimer += dt;
        if (this.stillTimer >= 1.0 && !this.isKiCharged) {
          this.isKiCharged = true;
          p.damageBonus += 0.50;
          p.critChance += 0.25;
          this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '⚡ TỤ KHÍ KI: +50% DMG!', color: '#c084fc', size: 16, life: 0.7 });
          this.game.spells.spawnShockwave(p.x, p.y, '#a855f7', 120, 0.25);
        }
      } else {
        if (this.isKiCharged) {
          p.damageBonus = Math.max(0, p.damageBonus - 0.50);
          p.critChance = Math.max(0.05, p.critChance - 0.25);
          this.isKiCharged = false;
        }
        this.stillTimer = 0;
      }
    }
  }

  hasEquipped(id) {
    return this.equipped.includes(id);
  }

  // Dash hook: Sylph Tempest Vortex
  onPlayerDash() {
    if (!this.hasEquipped('sylph_tempest_stone')) return;
    const p = this.game.player;
    if (!p) return;

    window.soundEngine.windBlow();
    this.game.shakeScreen(6, 0.25);
    this.game.spells.spawnShockwave(p.x, p.y, '#34d399', 320, 0.35);

    // Pull all nearby enemies in 300px radius toward center
    for (const e of this.game.enemies) {
      if (!e || e.isDead || e.isBoss) continue;
      const dx = p.x - e.x;
      const dy = p.y - e.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 320 && dist > 10) {
        e.x += (dx / dist) * 140;
        e.y += (dy / dist) * 140;
        this.game.spells.applyDamage(e, 85, false, '#10b981');
      }
    }
    this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '🌪️ BÃO CUỘN SYLPH!', color: '#34d399', size: 16, life: 0.7 });
  }

  // Kill hook: Lucifero Demon Heart
  onEnemyKill(enemy) {
    if (!this.hasEquipped('lucifero_demon_heart')) return;
    const p = this.game.player;
    if (!p) return;

    if (enemy.isBoss) {
      const heal = Math.round(p.maxHp * 0.25);
      this.game.healPlayer(heal);
      p.cooldownReduction = Math.min(0.50, p.cooldownReduction + 0.15);
      this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 35, text: '🩸 MA TÂM CUỒNG NỘ: +25% HP & TỐC ĐÁNH!', color: '#dc2626', size: 18, life: 1.2 });
      this.game.shakeScreen(8, 0.25);
      this.game.spells.spawnShockwave(p.x, p.y, '#dc2626', 400, 0.4);
      setTimeout(() => {
        if (this.game && this.game.player) {
          this.game.player.cooldownReduction = Math.max(0, this.game.player.cooldownReduction - 0.15);
        }
      }, 10000);
    } else {
      p.hp = Math.min(p.maxHp, p.hp + 1);
    }
  }

  // Hurt hook: Silvamillion Aegis, Chronos Hourglass, Nero Sealing Stone
  onPlayerHurt(incomingDmg) {
    const p = this.game.player;
    if (!p) return;

    // 1. Nero Sealing Stone: chance to freeze attacker
    if (this.hasEquipped('nero_sealing_stone') && Math.random() < 0.30) {
      this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '🐦 PHONG ẤN BẢO VỆ!', color: '#38bdf8', size: 14, life: 0.7 });
      if (this.game.enemies.length > 0) {
        const nearest = this.game.spells.getNearestEnemies(p.x, p.y, 1);
        if (nearest[0] && !nearest[0].isBoss) {
          nearest[0].speedMod = 0;
          nearest[0].speedModTimer = 3.0;
        }
      }
    }

    // 2. Silvamillion Aegis: low HP invulnerability shield
    if (this.hasEquipped('aegis_silvamillion')) {
      const cooldown = ARTIFACT_DEFS['aegis_silvamillion'].cooldown;
      if ((this.timers['aegis_silvamillion'] || 999) >= cooldown && p.hp / p.maxHp <= 0.35) {
        this.timers['aegis_silvamillion'] = 0;
        p.isInvulnerable = true;
        this.game.healPlayer(Math.round(p.maxHp * 0.30));
        this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 35, text: '🛡️ QUANG KHIÊN BẤT TỬ (3.5s)!', color: '#fbbf24', size: 20, life: 1.0 });
        this.game.spells.spawnShockwave(p.x, p.y, '#fde047', 350, 0.4);
        window.soundEngine.evolution();
        setTimeout(() => {
          if (this.game && this.game.player) this.game.player.isInvulnerable = false;
        }, 3500);
      }
    }

    // 3. Chronos Hourglass: Cheat Death once per run!
    if (this.hasEquipped('chronos_hourglass') && p.hp <= 0 && !this.reviveUsed) {
      this.reviveUsed = true;
      p.hp = Math.round(p.maxHp * 0.50);
      this.game.shakeScreen(15, 0.5);
      this.game.activateScreenBomb();
      this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 45, text: '⏳ NGHỊCH ĐẢO THỜI GIAN: HỒI SINH 50% HP!', color: '#38bdf8', size: 24, life: 1.5 });
      this.game.triggerComboBanner('⏳ NGHỊCH ĐẢO THỜI GIAN: TÁI SINH THẦN KỲ! ⏳');
      window.soundEngine.evolution();
      return true; // prevented death!
    }

    return false;
  }

  // Active Skill: Time Freeze (Crown of Julius)
  activateTimeFreeze(duration) {
    window.soundEngine.timeStop();
    this.game.shakeScreen(8, 0.3);
    this.game.triggerComboBanner('👑 THỜI GIAN MA PHÁP: NGƯNG ĐỌNG TOÀN THẾ GIỚI! 👑');
    this.game.spells.floatingTexts.push({ x: this.game.player.x, y: this.game.player.y - 35, text: '👑 NGƯNG ĐỌNG THỜI GIAN!', color: '#38bdf8', size: 22, life: 1.2 });
    this.game.spells.spawnShockwave(this.game.player.x, this.game.player.y, '#38bdf8', 600, 0.5);

    // Freeze all regular enemies and projectiles (Bosses are slowed by 50% instead of frozen)
    for (const e of this.game.enemies) {
      if (e.isBoss) {
        e.speedMod = 0.5;
        e.speedModTimer = duration;
      } else {
        e.speedMod = 0;
        e.speedModTimer = duration;
      }
    }
    if (this.game.enemyManager && this.game.enemyManager.enemyProjectiles) {
      this.game.enemyManager.enemyProjectiles = [];
    }
  }

  // Active Skill: Zagred Demon Hand
  activateDemonHand() {
    const p = this.game.player;
    if (!p) return;
    const enemies = this.game.spells.getNearestEnemies(p.x, p.y, 10);
    if (enemies.length === 0) return;

    // Pick central target
    const target = enemies[0];
    this.game.shakeScreen(9, 0.35);
    this.game.spells.spawnShockwave(target.x, target.y, '#7c3aed', 240, 0.4);
    this.game.spells.floatingTexts.push({ x: target.x, y: target.y - 30, text: '👁️ MA BÀN TAY HẮC ÁM!', color: '#c084fc', size: 18, life: 0.9 });

    for (const e of enemies) {
      if (Math.hypot(e.x - target.x, e.y - target.y) < 220) {
        this.game.spells.applyDamage(e, 450, false, '#a855f7');
        e.speedMod = 0.4;
        e.speedModTimer = 3.0;
      }
    }
  }

  // Active Skill: Yggdrasil Roots
  activateYggdrasilRoots() {
    const p = this.game.player;
    if (!p) return;
    window.soundEngine.slash();
    this.game.spells.spawnShockwave(p.x, p.y, '#10b981', 250, 0.3);
    this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '🌿 RỄ CÂY THẾ GIỚI THỤ!', color: '#34d399', size: 16, life: 0.8 });

    for (const e of this.game.enemies) {
      if (Math.hypot(e.x - p.x, e.y - p.y) < 240) {
        if (e.isBoss) {
          e.speedMod = 0.5;
          e.speedModTimer = 2.5;
        } else {
          e.speedMod = 0;
          e.speedModTimer = 2.5;
        }
        this.game.spells.applyDamage(e, 160, false, '#059669');
      }
    }
  }

  // Active Skill: Salamander Flame
  activateSalamanderFlame() {
    const p = this.game.player;
    if (!p) return;
    window.soundEngine.fireCast();
    this.game.shakeScreen(7, 0.25);
    this.game.spells.spawnShockwave(p.x, p.y, '#f97316', 260, 0.35);
    this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '🔥 HỎA CẦU SALAMANDER!', color: '#f97316', size: 17, life: 0.8 });

    for (const e of this.game.enemies) {
      if (Math.hypot(e.x - p.x, e.y - p.y) < 260) {
        this.game.spells.applyDamage(e, 320, false, '#ea580c');
      }
    }
  }

  // Active Skill: Luck Chain Lightning
  activateChainLightning() {
    const p = this.game.player;
    if (!p) return;
    const enemies = this.game.spells.getNearestEnemies(p.x, p.y, 8);
    if (enemies.length === 0) return;

    window.soundEngine.lightning();
    this.game.shakeScreen(5, 0.2);
    this.game.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: '⚡ LÔI THẦN TRẢO KÍCH!', color: '#fde047', size: 16, life: 0.8 });

    for (const e of enemies) {
      this.game.spells.applyDamage(e, 220, false, '#eab308');
      e.speedMod = 0;
      e.speedModTimer = 1.5;
      this.game.spells.spawnImpactParticles(e.x, e.y, '#facc15', 8);
    }
  }

  // BOSS DROP LOOT LOGIC
  // When a Boss or Mini Boss dies, call this to drop a relic
  spawnBossRelicDrop(x, y, bossType) {
    // Pick an artifact suitable for the boss or random
    const allIds = Object.keys(ARTIFACT_DEFS);
    let chosenId = null;

    if (bossType === 'boss_lucifero') {
      chosenId = 'lucifero_demon_heart';
    } else if (bossType === 'boss_zagred') {
      chosenId = 'zagred_cursed_rosary';
    } else if (bossType === 'boss_licht') {
      chosenId = 'demon_blade_licht';
    } else {
      // Prioritize uncollected relics first!
      const uncollected = allIds.filter(id => !this.collection[id]);
      if (uncollected.length > 0) {
        chosenId = uncollected[Math.floor(Math.random() * uncollected.length)];
      } else {
        chosenId = allIds[Math.floor(Math.random() * allIds.length)];
      }
    }

    this.game.drops.push({
      x: x,
      y: y,
      type: 'artifact_relic',
      val: chosenId,
      radius: 18,
      life: 9999
    });
  }

  // When player picks up the relic drop in battle
  collectRelicDrop(drop) {
    const artId = drop.val;
    const def = ARTIFACT_DEFS[artId];
    if (!def) return;

    window.soundEngine.chestOpen();
    this.game.shakeScreen(12, 0.4);
    this.game.spells.spawnShockwave(this.game.player.x, this.game.player.y, '#f59e0b', 500, 0.45);

    let isNew = false;
    let oldStar = 1;

    if (!this.collection[artId]) {
      this.collection[artId] = { star: 1, count: 1 };
      isNew = true;
    } else {
      this.collection[artId].count = (this.collection[artId].count || 1) + 1;
      oldStar = this.collection[artId].star || 1;
      if (this.collection[artId].star < 3) {
        this.collection[artId].star++;
      }
    }

    const currentStar = this.collection[artId].star;

    // Auto-equip if an empty slot exists!
    let autoEquippedSlot = -1;
    if (!this.equipped.includes(artId)) {
      const emptySlot = this.equipped.indexOf(null);
      if (emptySlot !== -1) {
        this.equipped[emptySlot] = artId;
        autoEquippedSlot = emptySlot + 1;
        this.timers[artId] = 0;
        // Immediately apply to current run
        this.game.recalculatePassives();
      }
    }

    this.game.saveGameData();

    // Trigger in-game popup toast / modal banner
    this.showRelicAcquiredModal(def, isNew, currentStar, autoEquippedSlot);
  }

  showRelicAcquiredModal(def, isNew, star, autoEquippedSlot) {
    const bannerText = isNew
      ? `🏺 THU HOẠCH TẠO VẬT MỚI TỪ BOSS: ${def.name.toUpperCase()}!`
      : `🌟 NÂNG CẤP TẠO VẬT CỔ ĐẠI: ${def.name.toUpperCase()} (★${star})!`;

    this.game.triggerComboBanner(bannerText);

    // Show floating texts
    this.game.spells.floatingTexts.push({
      x: this.game.player.x,
      y: this.game.player.y - 45,
      text: `${def.icon} ${def.name}!`,
      color: '#f59e0b',
      size: 22,
      life: 1.5
    });

    // Populate and show the modal overlay
    const overlay = document.getElementById('artifactDiscoveryModal');
    if (overlay) {
      const iconEl = document.getElementById('adIcon');
      const nameEl = document.getElementById('adName');
      const badgeEl = document.getElementById('adBadge');
      const starEl = document.getElementById('adStars');
      const statsEl = document.getElementById('adStats');
      const skillEl = document.getElementById('adSkill');
      const noteEl = document.getElementById('adEquipNote');

      if (iconEl) iconEl.innerText = def.icon;
      if (nameEl) nameEl.innerText = def.name;
      if (badgeEl) {
        badgeEl.className = `showcase-rarity-badge ${def.rarity}`;
        badgeEl.innerText = def.rarity === 'legendary' ? '⭐ THẦN THOẠI' : (def.rarity === 'epic' ? '✨ SỬ THI' : '🌟 HIẾM');
      }
      if (starEl) {
        starEl.innerText = '★'.repeat(star) + '☆'.repeat(3 - star) + ` (Cấp ${star}/3)`;
      }

      // Format stats
      const statLines = [];
      const s = def.stats;
      if (s.maxHp) statLines.push(`💚 +${s.maxHp} Máu Tối Đa`);
      if (s.damageBonus) statLines.push(`⚔️ +${Math.round(s.damageBonus * 100)}% Sát Thương`);
      if (s.armor) statLines.push(`🛡️ +${Math.round(s.armor * 100)}% Giáp`);
      if (s.speed) statLines.push(`⚡ +${Math.round(s.speed * 100)}% Tốc Độ`);
      if (s.cooldownReduction) statLines.push(`⏱️ -${Math.round(s.cooldownReduction * 100)}% Hồi Chiêu`);
      if (s.areaBonus) statLines.push(`💥 +${Math.round(s.areaBonus * 100)}% Diện Tích`);
      if (s.critChance) statLines.push(`🎯 +${Math.round(s.critChance * 100)}% Tỷ Lệ Chí Mạng`);
      if (s.hpRegen) statLines.push(`💖 +${s.hpRegen} HP/s Hồi Phục`);
      if (s.expBonus) statLines.push(`📘 +${Math.round(s.expBonus * 100)}% EXP`);
      if (s.coinBonus) statLines.push(`🪙 +${Math.round(s.coinBonus * 100)}% Vàng`);

      if (statsEl) statsEl.innerHTML = statLines.map(t => `<div class="stat-pill-item">${t}</div>`).join('');
      if (skillEl) skillEl.innerHTML = `<b>${def.skillName}:</b> ${def.skillDesc}`;

      if (noteEl) {
        if (autoEquippedSlot > 0) {
          noteEl.innerHTML = `<span style="color:#34d399; font-weight:800;">✅ Đã tự động trang bị vào Ô ${autoEquippedSlot}! Hiệu quả đã có tác dụng ngay trong trận chiến này!</span>`;
        } else {
          noteEl.innerHTML = `<span style="color:#cbd5e1;">Đã lưu vĩnh viễn vào Bộ Sưu Tập! Vào mục <b>🏺 TẠO VẬT</b> tại sảnh để trang bị.</span>`;
        }
      }

      overlay.classList.remove('hidden');
    }
  }
}

window.ARTIFACT_DEFS = ARTIFACT_DEFS;
window.IN_RUN_ARTIFACT_DEFS = IN_RUN_ARTIFACT_DEFS;
window.MAP_ARTIFACT_DEFS = IN_RUN_ARTIFACT_DEFS;
window.ArtifactSystem = ArtifactSystem;
