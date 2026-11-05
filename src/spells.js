// Enhanced Spell, Passive and Evolution System for Black Clover: Magic Survivor
// High damage output, clear evolution requirements, and optimized particle limits.

const SPELL_DEFS = {
  // ACTIVE WEAPONS
  demon_slayer: {
    id: 'demon_slayer',
    name: 'Kiếm Diệt Ma (Demon-Slayer)',
    type: 'weapon',
    icon: '🗡️⚫',
    description: 'Chém nhát kiếm Kháng Ma cực mạnh về phía mục tiêu, đẩy lùi kẻ địch và phá hủy đạn phép.',
    baseCooldown: 1.44,
    baseDamage: 25,
    baseArea: 90,
    maxLevel: 5,
    evolution: 'black_divider',
    requires: 'devil_pact'
  },
  black_divider: {
    id: 'black_divider',
    name: 'Hắc Đại Kiếm Hủy Diệt (Black Divider)',
    type: 'evolution',
    icon: '⚔️🔴',
    description: 'TIẾN HÓA CẤP 1: Đại kiếm anti-magic xoay 360 độ cực đại, quét sạch mọi ma pháp và quái vật!',
    baseCooldown: 1.7,
    baseDamage: 95,
    baseArea: 170,
    maxLevel: 1,
    evolution: 'demon_slasher_infinity',
    requires: 'reinforcement'
  },
  demon_slasher_infinity: {
    id: 'demon_slasher_infinity',
    name: 'Tuyệt Ma Kiếm Vô Cực (Demon-Slasher Infinite)',
    type: 'super_evolution',
    icon: '😈🗡️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Nhát chém Kháng Ma Vô Cực phủ đen cả không gian, giải phóng 2 sóng xung kích diệt thần 360 độ!',
    baseCooldown: 1.23,
    baseDamage: 210,
    baseArea: 260,
    maxLevel: 1
  },

  wind_scythe: {
    id: 'wind_scythe',
    name: 'Lưỡi Dao Gió (Wind Blade)',
    type: 'weapon',
    icon: '🍃🌪️',
    description: 'Tự động ghim mục tiêu và phóng ra các lưỡi liềm gió sắc bén xuyên thấu hàng ngũ địch.',
    baseCooldown: 1.22,
    baseDamage: 24,
    baseSpeed: 480,
    pierce: 3,
    maxLevel: 5,
    evolution: 'spirit_zephyr',
    requires: 'wind_glide'
  },
  spirit_zephyr: {
    id: 'spirit_zephyr',
    name: 'Kiếm Tinh Linh Zephyr (Spirit of Zephyr)',
    type: 'evolution',
    icon: '🗡️🍃',
    description: 'TIẾN HÓA CẤP 1: Tạo ra 2 cơn bão lốc xoáy khổng lồ hút chặt kẻ địch vào tâm và nghiền nát liên tục!',
    baseCooldown: 1.77,
    baseDamage: 90,
    duration: 3.8,
    maxLevel: 1,
    evolution: 'spirit_zephyr_supreme'
  },
  spirit_zephyr_supreme: {
    id: 'spirit_zephyr_supreme',
    name: 'Thần Phong Cung Thánh Khải (Saint Spirit Zephyr)',
    type: 'super_evolution',
    icon: '🏹🌪️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Hóa thân Thánh Khải Saint Stage, bắn liên hoàn 8 mũi tên phong bão xuyên không và tạo bão xoáy khổng lồ toàn map!',
    baseCooldown: 1.39,
    baseDamage: 195,
    baseArea: 280,
    maxLevel: 1
  },

  sylph_spirits: {
    id: 'sylph_spirits',
    name: 'Tinh Linh (Spirit)',
    type: 'weapon',
    icon: '⭕✨',
    badge: 'MAGIC SURVIVAL SPIRIT',
    description: 'Chiêu Tinh Linh (Spirit - Magic Survival): Triệu hồi các Vòng Tinh Linh (Spirit Ring) xoay quanh người, liên tục phóng Tiễn Ma Pháp truy sát kẻ địch gần nhất!',
    levelDescriptions: {
      2: 'CẤP 2: +1 Vòng Tinh Linh (Tổng 2, Sylph 3), +20% Sát thương.',
      3: 'CẤP 3: +1 Vòng Tinh Linh (Tổng 3, Sylph 4), -15% Hồi chiêu.',
      4: 'CẤP 4: +1 Vòng Tinh Linh (Tổng 4, Sylph 5), đạn nhận thêm khả năng Xuyên Thấu (+1 Pierce).',
      5: 'CẤP 5 [Spirit Mastery]: +1 Vòng Tinh Linh (Tổng 5, Sylph 6). Khai mở 3 Nhánh Thức Tỉnh: Magic Missile (Bắn Liên Thanh), Magic Blade (Kiếm Trảm Tức Thời), Familiar (Đại Tinh Linh 360°)'
    },
    baseCooldown: 0.85,
    baseDamage: 28,
    baseSpeed: 640,
    baseArea: 22,
    pierce: 1,
    maxLevel: 5,
    evolution: 'spirit_magic_missile',
    evolutions: ['spirit_magic_missile', 'spirit_magic_blade', 'spirit_familiar'],
    requires: 'wind_glide'
  },

  // 1. BRANCH 1: MAGIC MISSILE (Image 1 - Tên Lửa Ma Pháp)
  spirit_magic_missile: {
    id: 'spirit_magic_missile',
    name: 'Tinh Linh - Magic Missile (Tên Lửa Ma Pháp)',
    type: 'evolution',
    icon: '⭕⚡',
    badge: 'TIẾN HÓA: MAGIC MISSILE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Giảm 20% hồi chiêu. Các Tinh Linh phóng đạn liên tục cách đều nhau theo hồi chiêu, bắn liên thanh như súng máy không ngừng nghỉ!',
    baseCooldown: 0.58,
    baseDamage: 85,
    baseSpeed: 800,
    baseArea: 26,
    pierce: 2,
    maxLevel: 1,
    evolution: 'spirit_storm_empress',
    requires: 'reinforcement'
  },

  // 2. BRANCH 2: MAGIC BLADE (Image 2 - Lưỡi Kiếm Ma Pháp)
  spirit_magic_blade: {
    id: 'spirit_magic_blade',
    name: 'Tinh Linh - Magic Blade (Lưỡi Kiếm Ma Pháp)',
    type: 'evolution',
    icon: '⭕🗡️',
    badge: 'TIẾN HÓA: MAGIC BLADE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Đạn Tinh Linh chuyển hóa thành Kiếm Ma Pháp tạo ra tức thời ngay trên mục tiêu! Sát thương tăng x2.5 lần, trảm sát lập tức không có độ trễ bay!',
    baseCooldown: 0.95,
    baseDamage: 125,
    baseSpeed: 9999,
    baseArea: 65,
    pierce: 4,
    maxLevel: 1,
    evolution: 'spirit_blade_sovereign',
    requires: 'reinforcement'
  },

  // 3. BRANCH 3: FAMILIAR (Image 3 - Đại Tinh Linh Hợp Nhất)
  spirit_familiar: {
    id: 'spirit_familiar',
    name: 'Tinh Linh - Familiar (Đại Tinh Linh Hợp Nhất)',
    type: 'evolution',
    icon: '⭕👑',
    badge: 'TIẾN HÓA: FAMILIAR (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Tất cả Tinh Linh dung hợp thành 1 Đại Tinh Linh Thú to lớn! Bão đạn 360 độ cực khủng (+15 đạn mỗi Tinh Linh), khoảng cách phóng đạn cực ngắn (xả cực nhanh), hồi chiêu tăng 5x!',
    baseCooldown: 3.8,
    baseDamage: 78,
    baseSpeed: 640,
    baseArea: 32,
    pierce: 2,
    maxLevel: 1,
    evolution: 'spirit_familiar_overlord',
    requires: 'reinforcement'
  },

  // Backward compatibility alias
  sylph_tempest_domain: {
    id: 'sylph_tempest_domain',
    name: 'Tinh Linh - Magic Blade (Ngự Kiếm Linh Hồn)',
    type: 'evolution',
    icon: '⭕🗡️',
    badge: 'TIẾN HÓA: MAGIC BLADE (MAGIC SURVIVAL)',
    description: 'TIẾN HÓA CẤP 1 (Magic Survival): Đạn Tinh Linh chuyển hóa thành Kiếm Ma Pháp tạo ra tức thời ngay trên mục tiêu! Sát thương tăng x2.5 lần, trảm sát lập tức không có độ trễ bay!',
    baseCooldown: 0.95,
    baseDamage: 125,
    baseSpeed: 9999,
    baseArea: 65,
    pierce: 4,
    maxLevel: 1,
    evolution: 'spirit_blade_sovereign',
    requires: 'reinforcement'
  },

  // TIER 3 SUPER EVOLUTIONS (SIÊU TIẾN HÓA LẦN 2)
  spirit_storm_empress: {
    id: 'spirit_storm_empress',
    name: 'Bão Đạn Tinh Linh Thần Thánh (Empress Gatling Storm)',
    type: 'super_evolution',
    icon: '👑⚡',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): 12 Vòng Tinh Linh súng máy xả bão đạn liên hồi + cuồng phong chân không hút quái toàn màn hình kèm sóng xung kích chấn động!',
    baseCooldown: 0.38,
    baseDamage: 195,
    baseSpeed: 880,
    baseArea: 40,
    pierce: 4,
    maxLevel: 1
  },

  spirit_blade_sovereign: {
    id: 'spirit_blade_sovereign',
    name: 'Vạn Kiếm Trảm Không (Infinite Spirit Blade Sovereign)',
    type: 'super_evolution',
    icon: '👑🗡️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Khai mở Vạn Kiếm Trận với 16 Thần Kiếm Linh Hồn trảm sát tức thời liên hoàn toàn bản đồ kèm kiếm áp chấn động rung chuyển chiến trường!',
    baseCooldown: 0.70,
    baseDamage: 240,
    baseSpeed: 9999,
    baseArea: 90,
    pierce: 8,
    maxLevel: 1
  },

  spirit_familiar_overlord: {
    id: 'spirit_familiar_overlord',
    name: 'Thái Cổ Tinh Linh Vương (Primordial Spirit Familiar Overlord)',
    type: 'super_evolution',
    icon: '👑🌀',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Đại Tinh Linh Thần Khởi triệu hồi bão đạn 360 độ 120 tia đạn + 3 vòng sóng xung kích bão tố tàn phá mọi quái vật xung quanh!',
    baseCooldown: 3.2,
    baseDamage: 185,
    baseSpeed: 720,
    baseArea: 50,
    pierce: 3,
    maxLevel: 1
  },

  sea_dragon: {
    id: 'sea_dragon',
    name: 'Thủy Long Gầm Rú (Sea Dragon Roar)',
    type: 'weapon',
    icon: '🐉🌊',
    description: 'Triệu hồi Thủy Long uốn lượn lao thẳng vào mục tiêu bị ghim, tạo sóng nước quét sạch quái vật.',
    baseCooldown: 1.84,
    baseDamage: 30,
    baseSpeed: 360,
    pierce: 99,
    maxLevel: 5,
    evolution: 'valkyrie_lance',
    requires: 'mana_skin'
  },
  valkyrie_lance: {
    id: 'valkyrie_lance',
    name: 'Thương Thần Nữ Valkyrie (Valkyrie Dress)',
    type: 'evolution',
    icon: '🔱🌊',
    description: 'TIẾN HÓA CẤP 1: Phóng ra 8 ngọn giáo nước thần thánh xoay quanh và đâm xuyên mọi hướng!',
    baseCooldown: 1.7,
    baseDamage: 112,
    maxLevel: 1,
    evolution: 'leviathan_goddess'
  },
  leviathan_goddess: {
    id: 'leviathan_goddess',
    name: 'Thần Nữ Hải Long Vương Leviathan',
    type: 'super_evolution',
    icon: '🔱🐉',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Hóa thân Hải Thần Noelle, triệu hồi 3 Thủy Long khổng lồ và 12 thương thần bảo hộ xoay quanh nghiền nát địch!',
    baseCooldown: 1.39,
    baseDamage: 220,
    baseArea: 300,
    maxLevel: 1
  },

  dark_katana: {
    id: 'dark_katana',
    name: 'Hắc Ma Pháp Đao (Dark Katana)',
    type: 'weapon',
    icon: '🗡️🌑',
    description: 'Chém đao hắc ám về phía mục tiêu, hút quái vật lại gần, làm chậm 50% và gây sát thương chí mạng.',
    baseCooldown: 1.68,
    baseDamage: 28,
    baseArea: 100,
    maxLevel: 5,
    evolution: 'dimension_slash',
    requires: 'ki_sense'
  },
  dimension_slash: {
    id: 'dimension_slash',
    name: 'Hắc Trảm Xuyên Không (Dimension Slash Equinox)',
    type: 'evolution',
    icon: '🌌⚔️',
    description: 'TIẾN HÓA CẤP 1: Nhát chém xé toạc không gian xuyên suốt toàn màn hình theo hướng mục tiêu!',
    baseCooldown: 2.64,
    baseDamage: 118,
    baseArea: 480,
    maxLevel: 1,
    evolution: 'death_thrust_void',
    requires: 'mana_skin'
  },
  death_thrust_void: {
    id: 'death_thrust_void',
    name: 'Tử Kích Đoạt Vị Hắc Ám (Death Thrust Void)',
    type: 'super_evolution',
    icon: '⚡🌑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Đòn đâm nén tụ hắc ma pháp thổi bay và tiêu diệt mọi kẻ địch trên đường thẳng xuyên màn hình!',
    baseCooldown: 1.6,
    baseDamage: 240,
    baseArea: 650,
    maxLevel: 1
  },

  lightning_boots: {
    id: 'lightning_boots',
    name: 'Lôi Thần Trụy Kích (Thunderclap)',
    type: 'weapon',
    icon: '⚡👢',
    description: 'Tia sét nhảy chuyền liên tiếp giữa mục tiêu bị khóa và các kẻ địch lân cận.',
    baseCooldown: 1.05,
    baseDamage: 24,
    chains: 6,
    maxLevel: 5,
    evolution: 'thunder_fiend',
    requires: 'mana_resonance'
  },
  thunder_fiend: {
    id: 'thunder_fiend',
    name: 'Lôi Thần Khởi Lôi (Raijin Storm)',
    type: 'evolution',
    icon: '🌩️⚡',
    description: 'TIẾN HÓA CẤP 1: Sấm sét từ trời liên tục giáng xuống các cụm quái vật, làm choáng diện rộng!',
    baseCooldown: 0.86,
    baseDamage: 81,
    maxLevel: 1,
    evolution: 'thunder_emperor_rampage'
  },
  thunder_emperor_rampage: {
    id: 'thunder_emperor_rampage',
    name: 'Lôi Thần Đế Cuồng Bạo (Thunder God Emperor)',
    type: 'super_evolution',
    icon: '⚡👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Hóa Lôi Ma Thần Tối Thượng, sấm sét liên hoàn giáng 16 tia một lúc, giật lan toàn bản đồ và làm choáng vĩnh viễn!',
    baseCooldown: 0.98,
    baseDamage: 180,
    baseArea: 320,
    maxLevel: 1
  },

  calidos_brachium: {
    id: 'calidos_brachium',
    name: 'Hỏa Sư Quyền (Calidos Brachium)',
    type: 'weapon',
    icon: '🦁🔥',
    description: 'Tung chuỗi đấm lửa cuồng bạo liên hoàn về phía mục tiêu với tốc độ cực đại.',
    baseCooldown: 0.96,
    baseDamage: 26,
    baseArea: 75,
    maxLevel: 5,
    evolution: 'calidos_purgatory',
    requires: 'reinforcement'
  },
  calidos_purgatory: {
    id: 'calidos_purgatory',
    name: 'Địa Ngục Hỏa Sư (Calidos Purgatory)',
    type: 'evolution',
    icon: '🌋🔥',
    description: 'TIẾN HÓA CẤP 1: Cột lửa địa ngục bùng nổ toàn diện bao trùm mặt đất, thiêu rụi mọi kẻ địch!',
    baseCooldown: 1.77,
    baseDamage: 105,
    baseArea: 180,
    maxLevel: 1,
    evolution: 'sol_prominence_sun'
  },
  sol_prominence_sun: {
    id: 'sol_prominence_sun',
    name: 'Đại Nhật Thái Dương Sol Prominence',
    type: 'super_evolution',
    icon: '☀️🔥',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Quả cầu mặt trời rực lửa thiêu rụi toàn màn hình, bùng nổ sóng lửa liên tục đẩy lùi và thiêu đốt quái vật ra tro!',
    baseCooldown: 1.23,
    baseDamage: 230,
    baseArea: 350,
    maxLevel: 1
  },

  silver_rain: {
    id: 'silver_rain',
    name: 'Mưa Thủy Ngân (Silver Rain)',
    type: 'weapon',
    icon: '💧🗡️',
    description: 'Rót những ngọn thương thủy ngân kim loại từ trên trời cắm phập xuống mục tiêu.',
    baseCooldown: 1.52,
    baseDamage: 25,
    baseArea: 80,
    maxLevel: 5,
    evolution: 'silver_spears',
    requires: 'reinforcement'
  },
  silver_spears: {
    id: 'silver_spears',
    name: 'Ngân Dực Vạn Thương (Silver Rain Spears)',
    type: 'evolution',
    icon: '🗡️🦅',
    description: 'TIẾN HÓA CẤP 1: Mưa thương thủy ngân rơi liên tục ghim cứng kẻ địch và nổ chùm kim loại.',
    baseCooldown: 1.48,
    baseDamage: 118,
    baseArea: 160,
    maxLevel: 1,
    evolution: 'silver_shield_god'
  },
  silver_shield_god: {
    id: 'silver_shield_god',
    name: 'Ngân Dực Thần Khiên Vạn Kiếm (Silver Aegis God)',
    type: 'super_evolution',
    icon: '🛡️🦅',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Thần khiên thủy ngân bao phủ đẩy lùi kẻ địch, đồng thời phóng 32 ngọn thương hủy diệt mọi mục tiêu!',
    baseCooldown: 1.23,
    baseDamage: 205,
    baseArea: 300,
    maxLevel: 1
  },

  briar_whip: {
    id: 'briar_whip',
    name: 'Roi Gai Hoa Hồng (Briar Whip)',
    type: 'weapon',
    icon: '🌹➰',
    description: 'Quất những ngọn roi gai hoa hồng màu lam uốn lượn hình quạt, làm chảy máu kẻ địch.',
    baseCooldown: 1.28,
    baseDamage: 24,
    baseArea: 95,
    maxLevel: 5,
    evolution: 'scarlet_rose_bloom',
    requires: 'mana_skin'
  },
  scarlet_rose_bloom: {
    id: 'scarlet_rose_bloom',
    name: 'Gai Đỏ Huyết Ngục (Scarlet Rose Whip)',
    type: 'evolution',
    icon: '🥀🩸',
    description: 'TIẾN HÓA CẤP 1: Roi gai hoa hồng huyết sắc quét 360 độ, trói chân toàn bộ quái vật và gây chảy máu liên tục.',
    baseCooldown: 1.48,
    baseDamage: 109,
    baseArea: 170,
    maxLevel: 1,
    evolution: 'blue_rose_cage'
  },
  blue_rose_cage: {
    id: 'blue_rose_cage',
    name: 'Lam Hồng Thần Ngục Vĩnh Cửu (Blue Rose Paradise)',
    type: 'super_evolution',
    icon: '🌹💙',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Vườn hoa hồng xanh nở rộ toàn bản đồ giam hãm và xé nát toàn bộ kẻ địch trong hương hoa hủy diệt!',
    baseCooldown: 1.39,
    baseDamage: 195,
    baseArea: 320,
    maxLevel: 1
  },

  chrono_stasis: {
    id: 'chrono_stasis',
    name: 'Ngưng Đọng Thời Gian (Chrono Stasis)',
    type: 'weapon',
    icon: '⏳✨',
    description: 'Tạo quả cầu thời gian giam cầm kẻ địch và rút cạn sinh mệnh của chúng.',
    baseCooldown: 2.32,
    baseDamage: 22,
    baseArea: 95,
    duration: 3.5,
    maxLevel: 5,
    evolution: 'chrono_loop',
    requires: 'mana_resonance'
  },
  chrono_loop: {
    id: 'chrono_loop',
    name: 'Luân Hồi Thời Gian (Chrono Loop)',
    type: 'evolution',
    icon: '⌛🔄',
    description: 'TIẾN HÓA CẤP 1: 3 quả cầu thời gian giam giữ vĩnh viễn quái vật trong vòng lặp vô tận và bòn rút sinh mệnh.',
    baseCooldown: 2.29,
    baseDamage: 99,
    baseArea: 180,
    maxLevel: 1,
    evolution: 'chrono_eternal_domain'
  },
  chrono_eternal_domain: {
    id: 'chrono_eternal_domain',
    name: 'Vĩnh Cửu Lãnh Địa Thời Gian (Chrono Eternal Domain)',
    type: 'super_evolution',
    icon: '⏳👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Ngưng đọng tuyệt đối thời gian toàn bản đồ, nghiền nát mọi kẻ địch thành tro bụi của lịch sử!',
    baseCooldown: 1.6,
    baseDamage: 220,
    baseArea: 380,
    maxLevel: 1
  },

  magna_fireballs: {
    id: 'magna_fireballs',
    name: 'Hỏa Cầu Bóng Chày (Magna Fireball)',
    type: 'weapon',
    icon: '⚾🔥',
    description: 'Bắn những quả cầu lửa phát nổ thiêu đốt mặt đất nhắm thẳng vào mục tiêu.',
    baseCooldown: 1.68,
    baseDamage: 25,
    maxLevel: 5,
    evolution: 'soul_chain_fire',
    requires: 'devil_pact'
  },
  soul_chain_fire: {
    id: 'soul_chain_fire',
    name: 'Viêm Hồn Xích Ngục (Soul Chain Fire)',
    type: 'evolution',
    icon: '⛓️🔥',
    description: 'TIẾN HÓA CẤP 1: Phóng xích lửa trói buộc và chia sẻ sát thương giữa các cụm quái, gây nổ dây chuyền.',
    baseCooldown: 1.7,
    baseDamage: 115,
    baseArea: 160,
    maxLevel: 1,
    evolution: 'soul_chain_deathmatch'
  },
  soul_chain_deathmatch: {
    id: 'soul_chain_deathmatch',
    name: 'Sinh Tử Quyết Đấu Viêm Long (Soul Deathmatch Extreme)',
    type: 'super_evolution',
    icon: '⛓️💥',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Cú vung chày bão lửa thần thánh thổi bay mọi quái vật với 100% tỉ lệ chí mạng nổ long trời lở đất!',
    baseCooldown: 1.39,
    baseDamage: 215,
    baseArea: 280,
    maxLevel: 1
  },

  charmy_cotton: {
    id: 'charmy_cotton',
    name: 'Cừu Bông Hồi Phục (Charmy Sheep)',
    type: 'weapon',
    icon: '🐑☁️',
    description: 'Cừu bông xoay quanh bảo vệ người chơi, gây sát thương và thỉnh thoảng tạo ra đùi thịt hồi máu.',
    baseCooldown: 2.17,
    baseDamage: 23,
    maxLevel: 5,
    evolution: 'food_feast',
    requires: 'clover_fortune'
  },
  food_feast: {
    id: 'food_feast',
    name: 'Đại Tiệc Ẩm Thực (Food Feast Master)',
    type: 'evolution',
    icon: '🍲🍖',
    description: 'TIẾN HÓA CẤP 1: Cừu khổng lồ nấu nướng liên tục tạo ra đùi thịt hồi phục HP và hất tung kẻ địch.',
    baseCooldown: 1.87,
    baseDamage: 99,
    baseArea: 170,
    maxLevel: 1,
    evolution: 'wolf_gluttony'
  },
  wolf_gluttony: {
    id: 'wolf_gluttony',
    name: 'Ma Sói Bạo Thực Tham Lam (Wolf of Gluttony)',
    type: 'super_evolution',
    icon: '🐺🍲',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Triệu hồi Ma Sói Khổng Lồ ngoạm sạch mọi kẻ địch trên màn hình, hồi đầy thanh máu tức thì!',
    baseCooldown: 1.34,
    baseDamage: 225,
    baseArea: 320,
    maxLevel: 1
  },

  // NEW HERO WEAPON: LUMIERE (TIER 1 -> TIER 2 -> TIER 3 SUPER EVOLUTION)
  light_swords: {
    id: 'light_swords',
    name: 'Gươm Quang Ma Pháp (Light Swords)',
    type: 'weapon',
    icon: '🗡️✨',
    description: 'Phóng ra các thanh kiếm ánh sáng thần thánh bay với vận tốc ánh sáng ghim thẳng vào mục tiêu!',
    baseCooldown: 1.14,
    baseDamage: 25,
    baseSpeed: 580,
    pierce: 3,
    maxLevel: 5,
    evolution: 'light_judgment',
    requires: 'reinforcement'
  },
  light_judgment: {
    id: 'light_judgment',
    name: 'Quang Kiếm Phán Quyết (Light Judgment)',
    type: 'evolution',
    icon: '⚔️☀️',
    description: 'TIẾN HÓA CẤP 1: Mưa kiếm ánh sáng thiên giới liên tục giáng xuống các cụm quái vật!',
    baseCooldown: 1.25,
    baseDamage: 112,
    baseArea: 140,
    maxLevel: 1,
    evolution: 'lumiere_god_light',
    requires: 'mana_skin'
  },
  lumiere_god_light: {
    id: 'lumiere_god_light',
    name: 'Thần Quang Vô Tận Khai Sáng (Divine Light Awakening)',
    type: 'super_evolution',
    icon: '☀️👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Quả cầu Thái Dương phát ra 4 chùm laser ánh sáng xoay 360 độ quét rực toàn màn hình và bão kiếm quang rơi như mưa sao băng!',
    baseCooldown: 1.08,
    baseDamage: 190,
    baseArea: 280,
    maxLevel: 1
  },

  // NEW HERO WEAPON: NACHT FAUST (SHADOW CLAWS & DEVIL UNION: CANIS)
  shadow_hands: {
    id: 'shadow_hands',
    name: 'Hắc Ảnh Quỷ Trảo (Shadow Claws)',
    type: 'weapon',
    icon: '🐾🌑',
    description: 'Bàn tay bóng tối vươn lên từ lòng đất túm chặt và xé toạc kẻ thù xung quanh, hút máu hồi phục HP!',
    baseCooldown: 1.28,
    baseDamage: 26,
    baseArea: 135,
    maxLevel: 5,
    evolution: 'shadow_canis',
    requires: 'ki_sense'
  },
  shadow_canis: {
    id: 'shadow_canis',
    name: 'Á Ma Hợp Thể Canis (Devil Union: Canis)',
    type: 'evolution',
    icon: '🐺🌑',
    description: 'TIẾN HÓA HUYỀN THOẠI: Bầy Sói Bóng Tối Canis lao vút 4 hướng cắn xé kẻ địch, tạo lốc hắc ám nuốt chửng quái vật và hồi máu cực mạnh!',
    baseCooldown: 1.14,
    baseDamage: 108,
    baseArea: 220,
    maxLevel: 1,
    evolution: 'shadow_devil_union'
  },
  shadow_devil_union: {
    id: 'shadow_devil_union',
    name: 'Quỷ Khế Hắc Ám Đồng Hóa (Shadow Devil Union Extreme)',
    type: 'super_evolution',
    icon: '😈🌑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Đồng hóa 4 đại quỷ cùng lúc, mở cánh cổng địa ngục nuốt chửng quái vật và tàng hình hút máu bất tử!',
    baseCooldown: 1.18,
    baseDamage: 235,
    baseArea: 360,
    maxLevel: 1
  },

  // NEW HERO WEAPON: LICHT (ORIGIN SWORDS & CONQUERING EON)
  origin_swords: {
    id: 'origin_swords',
    name: 'Chân Kiếm Khai Nguyên (Origin Swords)',
    type: 'weapon',
    icon: '🗡️🌟',
    description: 'Triệu hồi cổ kiếm ánh sáng nguyên bản của Tộc Yêu Tinh bay xoáy ốc xuyên thủng mọi hàng ngũ địch!',
    baseCooldown: 1.22,
    baseDamage: 28,
    baseSpeed: 540,
    pierce: 4,
    maxLevel: 5,
    evolution: 'origin_conquering_eon',
    requires: 'reinforcement'
  },
  origin_conquering_eon: {
    id: 'origin_conquering_eon',
    name: 'Chân Kiếm Tối Thượng (Conquering Eon)',
    type: 'evolution',
    icon: '⚔️🌌',
    description: 'TIẾN HÓA HUYỀN THOẠI: Cự Kiếm Khai Thiên giáng xuống tạo chấn động địa chấn ma thuật hủy diệt toàn bộ khu vực!',
    baseCooldown: 1.77,
    baseDamage: 120,
    baseArea: 320,
    maxLevel: 1,
    evolution: 'ultimate_light_slash'
  },
  ultimate_light_slash: {
    id: 'ultimate_light_slash',
    name: 'Chân Kiếm Cổ Đại Thần Uy (Origin Divine God Blade)',
    type: 'super_evolution',
    icon: '🌟⚔️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Triệu hồi 100 Cổ Kiếm Khai Thiên giáng xuống như mưa sao băng quét sạch toàn bộ lục địa Clover!',
    baseCooldown: 1.39,
    baseDamage: 240,
    baseArea: 400,
    maxLevel: 1
  },

  // ZORA IDEALE (TRAP MAGIC)
  trap_magic: {
    id: 'trap_magic',
    name: 'Bẫy Tro Kháng Kích (Ash Trap)',
    type: 'weapon',
    icon: '🕸️💨',
    description: 'Đặt các bẫy tro tàng hình dưới đất, phát nổ khi quái vật bước qua và phản đòn x2 sát thương!',
    baseCooldown: 1.76,
    baseDamage: 24,
    baseArea: 110,
    maxLevel: 5,
    evolution: 'counter_trap',
    requires: 'ki_sense'
  },
  counter_trap: {
    id: 'counter_trap',
    name: 'Bẫy Phản Phách Ma Đạo (Counter Trap Circle)',
    type: 'evolution',
    icon: '🔄🕸️',
    description: 'TIẾN HÓA CẤP 1: Vòng tròn bẫy liên hoàn phản lại mọi sát thương và tạo chấn động nổ diện rộng!',
    baseCooldown: 1.66,
    baseDamage: 98,
    baseArea: 200,
    maxLevel: 1,
    evolution: 'infernal_reflect_void'
  },
  infernal_reflect_void: {
    id: 'infernal_reflect_void',
    name: 'Hư Không Vạn Pháp Phản Phách (Void Reflect Matrix)',
    type: 'super_evolution',
    icon: '💥🪞',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Ma trận bẫy hư không phản kích vô hạn x5 sát thương, biến toàn bộ đòn đánh địch thành vụ nổ diệt vong!',
    baseCooldown: 1.39,
    baseDamage: 225,
    baseArea: 350,
    maxLevel: 1
  },

  // WILLIAM VANGEANCE (WORLD TREE MAGIC)
  world_tree: {
    id: 'world_tree',
    name: 'Thế Giới Ma Thụ (World Tree Magic)',
    type: 'weapon',
    icon: '🌳✨',
    description: 'Rễ cây ma thuật trồi lên quấn chặt quái vật, rút mana hồi máu cho người chơi!',
    baseCooldown: 1.6,
    baseDamage: 25,
    baseArea: 120,
    maxLevel: 5,
    evolution: 'mistilteinn_roots',
    requires: 'mana_skin'
  },
  mistilteinn_roots: {
    id: 'mistilteinn_roots',
    name: 'Đại Mộc Mistilteinn (Great Tree of Mistilteinn)',
    type: 'evolution',
    icon: '🌲✨',
    description: 'TIẾN HÓA CẤP 1: Cây Thần Mistilteinn nở hoa trói toàn bộ chiến trường và hút sinh mệnh!',
    baseCooldown: 1.7,
    baseDamage: 96,
    baseArea: 220,
    maxLevel: 1,
    evolution: 'yggdrasil_rebirth'
  },
  yggdrasil_rebirth: {
    id: 'yggdrasil_rebirth',
    name: 'Thần Mộc Đại Khải Yggdrasil (Yggdrasil Rebirth)',
    type: 'super_evolution',
    icon: '🌳👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Cây Sinh Mệnh Yggdrasil khổng lồ bao bọc toàn thế giới, ban quyền bất tử hồi phục và nghiền nát quân địch!',
    baseCooldown: 1.39,
    baseDamage: 220,
    baseArea: 380,
    maxLevel: 1
  },

  // DOROTHY UNSWORTH (DREAM WORLD)
  dream_mist: {
    id: 'dream_mist',
    name: 'Sương Mộng Glamour (Dream Mist)',
    type: 'weapon',
    icon: '💭🌸',
    description: 'Tỏa ra làn sương mộng ảo ru ngủ quái vật và làm biến dạng không gian gây sát thương ma thuật.',
    baseCooldown: 1.74,
    baseDamage: 23,
    baseArea: 130,
    maxLevel: 5,
    evolution: 'glamour_world',
    requires: 'clover_fortune'
  },
  glamour_world: {
    id: 'glamour_world',
    name: 'Huyễn Mộng Giới (Glamour World)',
    type: 'evolution',
    icon: '🌌💭',
    description: 'TIẾN HÓA CẤP 1: Nhấn chìm chiến trường vào chiều không gian giấc mơ, quái vật hóa thành bánh kẹo và nổ tung!',
    baseCooldown: 1.77,
    baseDamage: 102,
    baseArea: 240,
    maxLevel: 1,
    evolution: 'dream_god_reality'
  },
  dream_god_reality: {
    id: 'dream_god_reality',
    name: 'Huyền Mộng Thần Cảnh Vô Nhai (Dream Goddess Reality)',
    type: 'super_evolution',
    icon: '👑💭',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Biến mọi giấc mơ thành hiện thực, triệu hồi thiên thạch kẹo ngọt và sấm chớp mộng cảnh xóa sổ toàn bản đồ!',
    baseCooldown: 1.23,
    baseDamage: 230,
    baseArea: 380,
    maxLevel: 1
  },

  // JACK THE RIPPER (SEVERING MAGIC)
  severing_blades: {
    id: 'severing_blades',
    name: 'Song Trảm Liêm Đao (Severing Scythe)',
    type: 'weapon',
    icon: '🦗⚔️',
    description: 'Lưỡi hái chém quạt xé toạc không khí, tốc độ càng đánh càng tăng!',
    baseCooldown: 1.14,
    baseDamage: 25,
    baseArea: 95,
    maxLevel: 5,
    evolution: 'death_scythe',
    requires: 'reinforcement'
  },
  death_scythe: {
    id: 'death_scythe',
    name: 'Đoạn Không Ma Liêm (Death Scythe Equinox)',
    type: 'evolution',
    icon: '⚔️💨',
    description: 'TIẾN HÓA CẤP 1: Lưỡi hái thích nghi với thuộc tính của địch, chém xuyên giáp 100%!',
    baseCooldown: 1.29,
    baseDamage: 110,
    baseArea: 180,
    maxLevel: 1,
    evolution: 'infinite_cleave'
  },
  infinite_cleave: {
    id: 'infinite_cleave',
    name: 'Trảm Tuyệt Vạn Vật (Infinite Cleave Reality)',
    type: 'super_evolution',
    icon: '⚡⚔️',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Chém đứt chính cả không gian và thời gian, 16 nhát chém xé rách toàn màn hình quét sạch mọi loại boss!',
    baseCooldown: 0.92,
    baseDamage: 235,
    baseArea: 320,
    maxLevel: 1
  },

  // RILL BOISMORTIER (PICTURE MAGIC)
  paint_splash: {
    id: 'paint_splash',
    name: 'Hội Họa Ma Sơn (Picture Paint)',
    type: 'weapon',
    icon: '🎨🖌️',
    description: 'Phóng ra các vệt màu ma thuật kết hợp nguyên tố Đất, Nước, Lửa, Gió!',
    baseCooldown: 1.36,
    baseDamage: 25,
    baseArea: 100,
    maxLevel: 5,
    evolution: 'masterpiece_beast',
    requires: 'devil_pact'
  },
  masterpiece_beast: {
    id: 'masterpiece_beast',
    name: 'Thần Thú Hội Họa (Masterpiece Chimera)',
    type: 'evolution',
    icon: '🐉🎨',
    description: 'TIẾN HÓA CẤP 1: Vẽ nên thần thú khổng lồ phun bão nguyên tố 4 mùa quét sạch chiến trường!',
    baseCooldown: 1.59,
    baseDamage: 98,
    baseArea: 210,
    maxLevel: 1,
    evolution: 'twilight_valhalla'
  },
  twilight_valhalla: {
    id: 'twilight_valhalla',
    name: 'Hoàng Hôn Của Chư Thần (Twilight of Valhalla)',
    type: 'super_evolution',
    icon: '🌈👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Bức tranh kiệt tác thần thánh ban sức mạnh tuyệt đối, quái vật chạm vào lập tức tan thành sắc màu!',
    baseCooldown: 1.39,
    baseDamage: 225,
    baseArea: 360,
    maxLevel: 1
  },

  // SECRE SWALLOWTAIL / NERO (SEALING MAGIC)
  sealing_chains: {
    id: 'sealing_chains',
    name: 'Hắc Điểu Nero (Secre Sealing Bird)',
    type: 'weapon',
    icon: '🐦⛓️',
    description: 'Hắc điểu bay lượn mổ mắt và bắn ra các đinh ma pháp phong ấn tốc độ di chuyển của địch.',
    baseCooldown: 1.31,
    baseDamage: 24,
    baseArea: 105,
    maxLevel: 5,
    evolution: 'nero_binding',
    requires: 'mana_resonance'
  },
  nero_binding: {
    id: 'nero_binding',
    name: 'Xích Ma Phong Ấn (Sealing Chains of Fate)',
    type: 'evolution',
    icon: '⛓️⬛',
    description: 'TIẾN HÓA CẤP 1: Xích phong ấn cổ đại trói cứng các cụm quái vật và khóa toàn bộ chiêu thức của chúng!',
    baseCooldown: 1.37,
    baseDamage: 96,
    baseArea: 190,
    maxLevel: 1,
    evolution: 'eternal_prison_coffin'
  },
  eternal_prison_coffin: {
    id: 'eternal_prison_coffin',
    name: 'Vĩnh Hằng Ma Khế Hắc Quan (Eternal Seal Prison)',
    type: 'super_evolution',
    icon: '⚰️⬛',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Quan tài phong ấn vĩnh cửu nuốt chửng toàn bộ quái vật và boss, khóa chặt vĩnh viễn không thể cựa quậy!',
    baseCooldown: 1.23,
    baseDamage: 230,
    baseArea: 350,
    maxLevel: 1
  },

  // LEOPOLD VERMILLION (SPIRAL FLAME)
  spiral_flame: {
    id: 'spiral_flame',
    name: 'Hỏa Toàn Thạch (Spiral Flame Blast)',
    type: 'weapon',
    icon: '🔥🌀',
    description: 'Bắn tia lửa xoắn ốc uy lực xuyên thủng nhiều kẻ địch thẳng hàng!',
    baseCooldown: 1.31,
    baseDamage: 24,
    baseSpeed: 500,
    pierce: 5,
    maxLevel: 5,
    evolution: 'spiral_inferno',
    requires: 'reinforcement'
  },
  spiral_inferno: {
    id: 'spiral_inferno',
    name: 'Viêm Ngục Long (Spiral Inferno Dragon)',
    type: 'evolution',
    icon: '🐉🔥',
    description: 'TIẾN HÓA CẤP 1: Rồng lửa xoắn ốc càn quét toàn màn hình để lại vệt nham thạch thiêu đốt vạn vật!',
    baseCooldown: 1.48,
    baseDamage: 106,
    baseArea: 220,
    maxLevel: 1,
    evolution: 'flame_dragon_emperor'
  },
  flame_dragon_emperor: {
    id: 'flame_dragon_emperor',
    name: 'Viêm Long Bá Đế Thức Tỉnh (Flame Emperor Dragon King)',
    type: 'super_evolution',
    icon: '👑🐉',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Hóa thân Viêm Long Bá Đế, triệu hồi bão rồng lửa thiêu rụi toàn map với sát thương nổ long trời lở đất!',
    baseCooldown: 1.29,
    baseDamage: 235,
    baseArea: 370,
    maxLevel: 1
  },

  // LANGRIS VAUDE (SPATIAL DESTRUCTION)
  spatial_destruction: {
    id: 'spatial_destruction',
    name: 'Cầu Không Gian Hủy Diệt (Archangel Void Orb)',
    type: 'weapon',
    icon: '🔮💥',
    description: 'Bắn các quả cầu không gian xóa sổ vật chất, nghiền nát mọi thứ chạm vào!',
    baseCooldown: 1.36,
    baseDamage: 26,
    baseSpeed: 420,
    pierce: 6,
    maxLevel: 5,
    evolution: 'archangel_slash',
    requires: 'mana_resonance'
  },
  archangel_slash: {
    id: 'archangel_slash',
    name: 'Đoạn Không Hư Ảnh (Archangel Severance)',
    type: 'evolution',
    icon: '🌌✂️',
    description: 'TIẾN HÓA CẤP 1: Nhát chém không gian xóa sổ hoàn toàn quái vật và đạn ma pháp!',
    baseCooldown: 1.48,
    baseDamage: 112,
    baseArea: 210,
    maxLevel: 1,
    evolution: 'absolute_void_annihilation'
  },
  absolute_void_annihilation: {
    id: 'absolute_void_annihilation',
    name: 'Tuyệt Đối Hư Vô Tận Diệt (Absolute Void Annihilation)',
    type: 'super_evolution',
    icon: '🌌👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Tạo lỗ đen không gian tuyệt đối nuốt chửng toàn bộ bản đồ và xóa sạch kẻ địch khỏi thực tại!',
    baseCooldown: 1.39,
    baseDamage: 240,
    baseArea: 380,
    maxLevel: 1
  },

  // MARS (MINERAL MAGIC)
  diamond_blades: {
    id: 'diamond_blades',
    name: 'Tinh Thể Kim Cương (Diamond Blades)',
    type: 'weapon',
    icon: '💎🗡️',
    description: 'Phóng hàng loạt phi kiếm kim cương sắc nhọn ghim cứng kẻ địch.',
    baseCooldown: 1.28,
    baseDamage: 25,
    baseSpeed: 490,
    pierce: 4,
    maxLevel: 5,
    evolution: 'nemesis_harpoon',
    requires: 'mana_skin'
  },
  nemesis_harpoon: {
    id: 'nemesis_harpoon',
    name: 'Lao Băng Báo Thù (Nemesis Harpoon)',
    type: 'evolution',
    icon: '🔱💎',
    description: 'TIẾN HÓA CẤP 1: Đại thương kim cương kết hợp lửa địa ngục phát nổ diện rộng!',
    baseCooldown: 1.48,
    baseDamage: 98,
    baseArea: 200,
    maxLevel: 1,
    evolution: 'crystal_colossus'
  },
  crystal_colossus: {
    id: 'crystal_colossus',
    name: 'Kim Cương Thần Tượng Bất Hoại (Crystal Colossus Titan)',
    type: 'super_evolution',
    icon: '🗿💎',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Người khổng lồ khoáng thạch bất hoại giáng chùy xuống đất tạo động đất xóa sổ toàn bộ địch!',
    baseCooldown: 1.39,
    baseDamage: 225,
    baseArea: 350,
    maxLevel: 1
  },

  // PATRY (DARK LIGHT MAGIC)
  light_swords_dark: {
    id: 'light_swords_dark',
    name: 'Hắc Quang Kiếm (Dark Light Swords)',
    type: 'weapon',
    icon: '🗡️🌑',
    description: 'Phóng ra các thanh kiếm ánh sáng đen cực nhanh với tốc độ ánh sáng u ám!',
    baseCooldown: 1.05,
    baseDamage: 26,
    baseSpeed: 600,
    pierce: 4,
    maxLevel: 5,
    evolution: 'ray_of_divine_punishment',
    requires: 'reinforcement'
  },
  ray_of_divine_punishment: {
    id: 'ray_of_divine_punishment',
    name: 'Quang Phạt Ma Trảm (Ray of Divine Punishment)',
    type: 'evolution',
    icon: '⚡🌑',
    description: 'TIẾN HÓA CẤP 1: Chùm tia ánh sáng đen hủy diệt quét xuyên suốt bản đồ thiêu rụi mọi hàng ngũ!',
    baseCooldown: 1.25,
    baseDamage: 108,
    baseArea: 230,
    maxLevel: 1,
    evolution: 'demon_light_judgment'
  },
  demon_light_judgment: {
    id: 'demon_light_judgment',
    name: 'Ma Quang Phán Quyết Tối Cao (Demon Light Judgment Supreme)',
    type: 'super_evolution',
    icon: '🌑👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Hắc ma thần quang giáng 32 tia sấm sét đen từ thiên giới nghiền nát toàn bộ chiến trường!',
    baseCooldown: 1.18,
    baseDamage: 235,
    baseArea: 390,
    maxLevel: 1
  },

  // 25. POISON CLOUD (Gordon Agrippa)
  poison_cloud: {
    id: 'poison_cloud',
    name: 'Màn Sương Độc (Poison Cloud)',
    type: 'weapon',
    icon: '🧪☠️',
    description: 'Tạo vùng sương mù độc dược ăn mòn liên tục kẻ địch và làm chậm 25% tốc độ chạy.',
    baseCooldown: 1.44,
    baseDamage: 23,
    baseArea: 80,
    duration: 2.5,
    maxLevel: 5,
    evolution: 'toxic_miasma',
    requires: 'mana_skin'
  },
  toxic_miasma: {
    id: 'toxic_miasma',
    name: 'Chướng Khí Kịch Độc (Toxic Miasma)',
    type: 'evolution',
    icon: '☠️💨',
    description: 'TIẾN HÓA CẤP 1: Mở rộng vùng khí độc cực đại, làm suy giảm 40% phòng ngự và độc ăn sâu!',
    baseCooldown: 1.59,
    baseDamage: 90,
    baseArea: 160,
    duration: 3.5,
    maxLevel: 1,
    evolution: 'forbidden_poison_god',
    requires: 'ki_sense'
  },
  forbidden_poison_god: {
    id: 'forbidden_poison_god',
    name: 'Cấm Thuật Độc Thần Vô Biên (Forbidden Poison God)',
    type: 'super_evolution',
    icon: '☠️👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Màn sương độc thần cổ đại bao phủ cả bản đồ, quái vật dính độc phát nổ lây lan sang kẻ địch khác!',
    baseCooldown: 1.39,
    baseDamage: 185,
    baseArea: 280,
    maxLevel: 1
  },

  // 26. MAGIC CONVERSION (Grey)
  magic_conversion: {
    id: 'magic_conversion',
    name: 'Chuyển Hóa Ma Pháp (Magic Conversion)',
    type: 'weapon',
    icon: '🪄✨',
    description: 'Bắn ra tinh thể lăng kính ma pháp đa sắc xuyên phá kẻ địch và phân tách thành nhiều tia nhỏ.',
    baseCooldown: 1.28,
    baseDamage: 24,
    baseSpeed: 420,
    pierce: 3,
    maxLevel: 5,
    evolution: 'substance_transmute',
    requires: 'mana_magnet'
  },
  substance_transmute: {
    id: 'substance_transmute',
    name: 'Biến Dị Vật Chất (Substance Transmute)',
    type: 'evolution',
    icon: '🪄💎',
    description: 'TIẾN HÓA CẤP 1: Bắn chùm 5 tinh thể biến dị, biến quái vật bị tiêu diệt thành ngọc Mana và tiền xu!',
    baseCooldown: 1.48,
    baseDamage: 96,
    baseSpeed: 480,
    pierce: 6,
    maxLevel: 1,
    evolution: 'genesis_transmutation',
    requires: 'mana_resonance'
  },
  genesis_transmutation: {
    id: 'genesis_transmutation',
    name: 'Sáng Thế Biến Dị Thần Năng (Genesis Transmutation)',
    type: 'super_evolution',
    icon: '🪄👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Sóng ánh sáng cầu vồng chuyển hóa toàn màn hình biến đạn địch thành ngọc hồi máu và nghiền nát quân đoàn quái!',
    baseCooldown: 1.39,
    baseDamage: 195,
    baseArea: 320,
    maxLevel: 1
  },

  // 27. BULL GOLEM (Henry Levolant)
  bull_golem: {
    id: 'bull_golem',
    name: 'Golem Thiết Ngưu (Bull Golem)',
    type: 'weapon',
    icon: '🐂🏰',
    description: 'Triệu hồi Golem Ngưu Ma bằng gỗ và đá lao thẳng húc văng hàng loạt kẻ địch cản đường.',
    baseCooldown: 1.76,
    baseDamage: 26,
    baseSpeed: 380,
    pierce: 99,
    maxLevel: 5,
    evolution: 'black_bull_rampage',
    requires: 'reinforcement'
  },
  black_bull_rampage: {
    id: 'black_bull_rampage',
    name: 'Thiết Ngưu Xung Trận (Black Bull Rampage)',
    type: 'evolution',
    icon: '🏰🐂',
    description: 'TIẾN HÓA CẤP 1: Phóng ra 2 Cự Ngưu bọc sắt song hành càn quét 2 hướng và hất tung quái vật!',
    baseCooldown: 1.77,
    baseDamage: 115,
    baseSpeed: 450,
    pierce: 99,
    maxLevel: 1,
    evolution: 'raging_bull_fortress',
    requires: 'devil_pact'
  },
  raging_bull_fortress: {
    id: 'raging_bull_fortress',
    name: 'Pháo Đài Ngưu Ma Bất Diệt (Raging Bull Fortress)',
    type: 'super_evolution',
    icon: '🏰👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Triệu hồi Cự Pháo Đài Hắc Bộc Ngưu dậm nát mặt đất tạo sóng xung kích diệt thần 360 độ!',
    baseCooldown: 1.34,
    baseDamage: 220,
    baseArea: 300,
    maxLevel: 1
  },

  // 28. FLOWER CANNON (Mimosa Vermillion)
  flower_cannon: {
    id: 'flower_cannon',
    name: 'Đại Bác Ma Hoa (Flower Cannon)',
    type: 'weapon',
    icon: '🌸💥',
    description: 'Bắn ra chùm tia pháo hoa thực vật xuyên thấu hàng ngũ địch, có 20% hồi 2 HP khi trúng đích.',
    baseCooldown: 1.36,
    baseDamage: 25,
    baseSpeed: 460,
    pierce: 4,
    maxLevel: 5,
    evolution: 'princess_healing',
    requires: 'mana_skin'
  },
  princess_healing: {
    id: 'princess_healing',
    name: 'Thánh Nữ Ma Hoa Chi Địa (Princess Healing Field)',
    type: 'evolution',
    icon: '🌺💖',
    description: 'TIẾN HÓA CẤP 1: Nở rộ vườn hoa thánh địa xung quanh người chơi liên tục hồi máu và bắn gai nhọn diệt địch!',
    baseCooldown: 1.59,
    baseDamage: 99,
    baseArea: 170,
    duration: 3.5,
    maxLevel: 1,
    evolution: 'eden_floral_domain',
    requires: 'mana_resonance'
  },
  eden_floral_domain: {
    id: 'eden_floral_domain',
    name: 'Vườn Địa Đàng Tối Thượng (Eden Floral Domain)',
    type: 'super_evolution',
    icon: '🌸👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Cây Thần Địa Đàng khai mở, liên tục phóng 16 chùm hoa pháo diệt thần và bất tử hồi máu 5% mỗi 2 giây!',
    baseCooldown: 1.39,
    baseDamage: 190,
    baseArea: 320,
    maxLevel: 1
  },

  // 29. STEEL DRILLS (Klaus Lunettes)
  steel_drills: {
    id: 'steel_drills',
    name: 'Mũi Khoan Thiết Hắc (Steel Drills)',
    type: 'weapon',
    icon: '🔩⚡',
    description: 'Phóng ra 3 mũi khoan kim loại xoay tít khoan thủng mọi phòng ngự của quái vật.',
    baseCooldown: 1.31,
    baseDamage: 24,
    baseSpeed: 450,
    pierce: 5,
    maxLevel: 5,
    evolution: 'whirlwind_drill',
    requires: 'ki_sense'
  },
  whirlwind_drill: {
    id: 'whirlwind_drill',
    name: 'Toàn Phong Cương Thiết (Whirlwind Steel Drill)',
    type: 'evolution',
    icon: '🌀🔩',
    description: 'TIẾN HÓA CẤP 1: 5 đại khoan thép xoay bão lốc càn quét theo hình nan quạt, đẩy lùi cực mạnh!',
    baseCooldown: 1.37,
    baseDamage: 109,
    baseSpeed: 520,
    pierce: 99,
    maxLevel: 1,
    evolution: 'absolute_steel_colossus',
    requires: 'reinforcement'
  },
  absolute_steel_colossus: {
    id: 'absolute_steel_colossus',
    name: 'Đại Thiết Cực Thần Khoan (Absolute Steel Colossus)',
    type: 'super_evolution',
    icon: '🔩👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Cột giáo khoan thép khổng lồ từ thiên giới cắm thẳng xuống đất tạo sóng chấn động sắt thép toàn màn hình!',
    baseCooldown: 1.29,
    baseDamage: 210,
    baseArea: 290,
    maxLevel: 1
  },

  // 30. EARTH GOLEM (Sol Marron)
  earth_golem: {
    id: 'earth_golem',
    name: 'Cự Nham Thổ Thần (Earth Golem)',
    type: 'weapon',
    icon: '🗿🪨',
    description: 'Đấm nắm đấm đá khổng lồ xuống mặt đất tạo sóng chấn động làm chậm kẻ địch xung quanh.',
    baseCooldown: 1.52,
    baseDamage: 25,
    baseArea: 85,
    maxLevel: 5,
    evolution: 'mountain_smash',
    requires: 'reinforcement'
  },
  mountain_smash: {
    id: 'mountain_smash',
    name: 'Chấn Sơn Cự Kình (Mountain Smash)',
    type: 'evolution',
    icon: '🏔️💥',
    description: 'TIẾN HÓA CẤP 1: 2 bàn tay khổng lồ bằng nham thạch đập vào nhau nghiền nát tất cả kẻ địch ở giữa!',
    baseCooldown: 1.7,
    baseDamage: 121,
    baseArea: 175,
    maxLevel: 1,
    evolution: 'terra_titan_earthquake',
    requires: 'mana_skin'
  },
  terra_titan_earthquake: {
    id: 'terra_titan_earthquake',
    name: 'Địa Thần Bạo Liệt Chấn (Terra Titan Earthquake)',
    type: 'super_evolution',
    icon: '🗿👑',
    description: 'SIÊU TIẾN HÓA LẦN 2 (TIER 3): Đại địa nứt toác toàn màn hình, dung nham và đá tảng phun trào làm choáng và quét sạch quái vật!',
    baseCooldown: 1.48,
    baseDamage: 215,
    baseArea: 310,
    maxLevel: 1
  },

  // ⭐ HẮC KHÔNG GIAN & MA QUỶ (ZENON - SPADE DARK TRIAD)
  spatial_rupture: {
    id: 'spatial_rupture',
    name: 'Vết Nứt Không Gian (Spatial Rupture)',
    type: 'weapon',
    icon: '⬛💀',
    description: 'Phóng gai xương không gian xé toạc chân không, xuyên qua nhiều kẻ địch và để lại vết rách hư không.',
    baseCooldown: 1.6,
    baseDamage: 38,
    baseArea: 110,
    maxLevel: 5,
    evolution: 'absolute_spatial_domain',
    requires: 'mana_resonance'
  },
  absolute_spatial_domain: {
    id: 'absolute_spatial_domain',
    name: 'Lãnh Địa Tuyệt Đối (Absolute Spatial Domain)',
    type: 'evolution',
    icon: '⬛⚡',
    description: 'TIẾN HÓA CẤP 1: Thiết lập khối không gian đen tối áp chế tuyệt đối mọi sinh linh, phóng mưa gai xương Ma Quỷ 360 độ!',
    baseCooldown: 1.43,
    baseDamage: 125,
    baseArea: 230,
    maxLevel: 1
  },

  // 🩸 HUYẾT & NGUYỀN MA PHÁP (VANICA - SPADE DARK TRIAD)
  blood_beasts: {
    id: 'blood_beasts',
    name: 'Huyết Thú Cuồng Bạo (Crimson Blood Beasts)',
    type: 'weapon',
    icon: '🩸🐺',
    description: 'Triệu hồi bầy quái thú máu lao thẳng vào hàng ngũ kẻ địch, xé toạc mục tiêu và hồi phục sinh mệnh!',
    baseCooldown: 1.8,
    baseDamage: 35,
    baseArea: 100,
    maxLevel: 5,
    evolution: 'red_beast_crimson_curse',
    requires: 'devil_pact'
  },
  red_beast_crimson_curse: {
    id: 'red_beast_crimson_curse',
    name: 'Huyết Thần Nguyền Rủa (Megicula Crimson Curse)',
    type: 'evolution',
    icon: '🩸😈',
    description: 'TIẾN HÓA CẤP 1: Triệu hồi Cự Đại Huyết Ma Thú càn quét bản đồ, kích nổ vòng hoa huyết nguyền rủa và hút máu cực đại!',
    baseCooldown: 1.69,
    baseDamage: 120,
    baseArea: 220,
    maxLevel: 1
  },

  // 🌌 TRỌNG LỰC & QUỶ VƯƠNG (DANTE - SPADE DARK TRIAD)
  heavy_gravity: {
    id: 'heavy_gravity',
    name: 'Trọng Lực Vực Sâu (Heavy Gravity)',
    type: 'weapon',
    icon: '🌌⚫',
    description: 'Giáng vùng trọng lực ngàn cân ép bẹp toàn bộ kẻ địch xuống đất, làm chậm và gây sát thương nghiền nát.',
    baseCooldown: 2.2,
    baseDamage: 38,
    baseArea: 130,
    maxLevel: 5,
    evolution: 'singularity_black_hole',
    requires: 'reinforcement'
  },
  singularity_black_hole: {
    id: 'singularity_black_hole',
    name: 'Hố Đen Dị Thường (Singularity Black Hole)',
    type: 'evolution',
    icon: '⚫💥',
    description: 'TIẾN HÓA CẤP 1: Tạo ra điểm dị thường trọng lực nuốt chửng toàn bộ quái vật vào tâm rồi phát nổ hủy diệt không gian!',
    baseCooldown: 1.95,
    baseDamage: 125,
    baseArea: 250,
    maxLevel: 1
  },

  // 🕊️ HỎA PHƯỢNG HOÀNG (FANA - TỘC ELF)
  phoenix_feather: {
    id: 'phoenix_feather',
    name: 'Lông Vũ Phượng Hoàng (Phoenix Feather)',
    type: 'weapon',
    icon: '🦅🔥',
    description: 'Bắn ra chùm lông vũ bốc cháy xoay tròn quanh người hoặc phóng về phía trước, phát nổ thiêu đốt khi chạm quái vật.',
    baseCooldown: 1.5,
    baseDamage: 32,
    baseArea: 95,
    maxLevel: 5,
    evolution: 'eternal_phoenix_inferno',
    requires: 'clover_fortune'
  },
  eternal_phoenix_inferno: {
    id: 'eternal_phoenix_inferno',
    name: 'Hỏa Ngục Phượng Hoàng (Eternal Phoenix Inferno)',
    type: 'evolution',
    icon: '🔥🦅',
    description: 'TIẾN HÓA CẤP 1: Thần Điểu Phượng Hoàng rực lửa sải cánh bay lượn toàn chiến trường, để lại vệt lửa vĩnh cửu và hồi sinh mệnh!',
    baseCooldown: 1.3,
    baseDamage: 115,
    baseArea: 220,
    maxLevel: 1
  },

  // 🌪️ MÔ PHỎNG MA PHÁP (RHYA - TỘC ELF)
  copy_spell_storm: {
    id: 'copy_spell_storm',
    name: 'Bão Sao Chép Ma Pháp (Copy Magic Storm)',
    type: 'weapon',
    icon: '📜✨',
    description: 'Bắt chước các hệ ma pháp nguyên tố (Lửa, Nước, Gió, Sét) phóng ra liên hoàn đạn phép đa sắc màu về phía kẻ địch.',
    baseCooldown: 1.4,
    baseDamage: 30,
    baseArea: 85,
    maxLevel: 5,
    evolution: 'all_magic_omnislash',
    requires: 'ki_sense'
  },
  all_magic_omnislash: {
    id: 'all_magic_omnislash',
    name: 'Vạn Thuật Tề Phát (All Magic Omnislash)',
    type: 'evolution',
    icon: '🌈⚔️',
    description: 'TIẾN HÓA CẤP 1: Khai mở kho tàng ma pháp sao chép tối thượng, giải phóng liên tục 8 loại ma đạn nguyên tố bão táp 360 độ!',
    baseCooldown: 1.23,
    baseDamage: 110,
    baseArea: 240,
    maxLevel: 1
  },

  // 🐺 MA THÚ TUYỆT VỌNG (VETTO - TỘC ELF)
  beast_claws: {
    id: 'beast_claws',
    name: 'Móng Vuốt Ma Thú (Beast Claws)',
    type: 'weapon',
    icon: '🐾🐺',
    description: 'Nhát vuốt ma thú hung bạo cào xé mục tiêu trong cự ly gần, gây choáng nhẹ và hất tung quái vật cản đường.',
    baseCooldown: 1.3,
    baseDamage: 36,
    baseArea: 105,
    maxLevel: 5,
    evolution: 'mythic_beast_rampage',
    requires: 'mana_skin'
  },
  mythic_beast_rampage: {
    id: 'mythic_beast_rampage',
    name: 'Cuồng Bạo Ma Thú Tuyệt Vọng (Despair Beast Rampage)',
    type: 'evolution',
    icon: '🐺💥',
    description: 'TIẾN HÓA CẤP 1: Khai mở Con Mắt Thứ Ba, phóng ra các đợt cào xé ma khí khổng lồ đan chéo kèm sóng xung kích thú thần hủy diệt!',
    baseCooldown: 1.11,
    baseDamage: 125,
    baseArea: 220,
    maxLevel: 1
  },

  // PASSIVE GRIMOIRES (SÁCH MA PHÁP BỔ TRỢ)
  reinforcement: {
    id: 'reinforcement',
    name: 'Ma Pháp Cường Hóa (Reinforcement)',
    type: 'passive',
    icon: '💪⚡',
    description: 'Tăng tổng sát thương gây ra thêm +14% mỗi cấp.',
    maxLevel: 5
  },
  wind_glide: {
    id: 'wind_glide',
    name: 'Phong Ngự Thần Tốc (Wind Glide)',
    type: 'passive',
    icon: '💨🌪️',
    description: 'Tăng tốc độ di chuyển của pháp sư thêm +14% mỗi cấp.',
    maxLevel: 5
  },
  mana_skin: {
    id: 'mana_skin',
    name: 'Vỏ Bọc Mana (Mana Skin)',
    type: 'passive',
    icon: '🛡️✨',
    description: 'Tăng Máu tối đa +30 và giảm 10% sát thương nhận vào.',
    maxLevel: 5
  },
  ki_sense: {
    id: 'ki_sense',
    name: 'Cảm Nhận Khí (Ki Sense / Crit Rate)',
    type: 'passive',
    icon: '👁️🎯',
    description: 'Tăng Tỉ Lệ Đánh Chí Mạng (Crit Rate) +20% mỗi cấp (Tối đa 100%).',
    maxLevel: 5
  },
  crit_damage: {
    id: 'crit_damage',
    name: 'Bạo Kích Tử Diệt (Critical Damage)',
    type: 'passive',
    icon: '🗡️💥',
    description: 'Tăng Sát Thương Chí Mạng (Crit Damage) +40% mỗi cấp (Tối đa 200%).',
    maxLevel: 5
  },
  mana_resonance: {
    id: 'mana_resonance',
    name: 'Cộng Hưởng Ma Đạo (Cooldown Reduction)',
    type: 'passive',
    icon: '⏳⏱️',
    description: 'Giảm thời gian hồi chiêu của tất cả phép thuật -10% mỗi cấp.',
    maxLevel: 5
  },
  devil_pact: {
    id: 'devil_pact',
    name: 'Giao Ước Quỷ Dữ (Devil Contract)',
    type: 'passive',
    icon: '👿🖤',
    description: 'Tăng phạm vi ảnh hưởng (AoE) và kích thước chiêu thức +20% mỗi cấp.',
    maxLevel: 5
  },
  mana_magnet: {
    id: 'mana_magnet',
    name: 'Dẫn Lực Ma Vực (Mana Zone Attract)',
    type: 'passive',
    icon: '🌀✨',
    description: 'Tăng bán kính hút tinh thể Mana và tiền xu thêm +50% mỗi cấp.',
    maxLevel: 5
  },
  clover_fortune: {
    id: 'clover_fortune',
    name: 'Vận Mệnh Tứ Diệp (Clover Luck)',
    type: 'passive',
    icon: '🍀✨',
    description: 'Tăng +25% lượng kinh nghiệm (EXP) nhận được và tăng cơ hội rơi rương báu.',
    maxLevel: 5
  },

  // 2 CHIÊU BỊ ĐỘNG VÔ HẠN (KHÔNG GIỚI HẠN SỐ LẦN CHỌN)
  infinite_vitality: {
    id: 'infinite_vitality',
    name: 'Sinh Mệnh Vô Cực (Infinite Vitality)',
    type: 'infinite_passive',
    icon: '❤️🍀',
    description: 'Tăng vĩnh viễn +50 Máu Tối Đa và hồi phục ngay +50 HP. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  },
  infinite_might: {
    id: 'infinite_might',
    name: 'Sức Mạnh Vô Cực (Infinite Might)',
    type: 'infinite_passive',
    icon: '⚔️🔥',
    description: 'Tăng vĩnh viễn +10% toàn bộ Sát Thương của nhân vật. Có thể nâng cấp vô hạn lần!',
    maxLevel: 9999
  }
};

class SpellManager {
  playSound(name) {
    try {
      if (window.soundEngine && typeof window.soundEngine[name] === 'function') {
        window.soundEngine[name]();
      }
    } catch (e) {}
  }

  constructor(game) {
    this.game = game;
    this.projectiles = [];
    this.slashes = [];
    this.aoeZones = [];
    this.floatingTexts = [];
    this.lightningChains = [];
    this.particles = [];
    this.shockwaves = [];
  }

  reset() {
    this.projectiles = [];
    this.slashes = [];
    this.aoeZones = [];
    this.floatingTexts = [];
    this.lightningChains = [];
    this.particles = [];
    this.shockwaves = [];
  }

  update(dt) {
    const p = this.game.player;
    if (!p || p.hp <= 0) return;

    // Tick weapon cooldowns
    for (const [spellId, item] of Object.entries(p.weapons || {})) {
      item.timer -= dt;
      if (item.timer <= 0) {
        try {
          this.castSpell(spellId, item.level);
        } catch (err) {
          console.error('Lỗi tung phép:', spellId, err);
        }
        const sDef = SPELL_DEFS[spellId];
        const baseCd = sDef ? sDef.baseCooldown : 1.5;
        const finalCd = Math.max(0.22, baseCd * (1 - Math.min(0.55, (p.cooldownReduction || 0))) * (1 - (item.level - 1) * 0.04));
        item.timer = finalCd;
      }
    }

    // Update active projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];

      if (proj.isHoming) {
        if (!proj.targetEnemy || proj.targetEnemy.hp <= 0 || proj.targetEnemy.isDead) {
          const targets = this.getNearestEnemies(proj.x, proj.y, 1);
          proj.targetEnemy = targets.length > 0 ? targets[0] : null;
        }
        if (proj.targetEnemy) {
          const tdx = proj.targetEnemy.x - proj.x;
          const tdy = proj.targetEnemy.y - proj.y;
          const targetAngle = Math.atan2(tdy, tdx);
          const currentAngle = Math.atan2(proj.vy, proj.vx);
          let diff = targetAngle - currentAngle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          const turnRate = (proj.turnSpeed || (proj.isSuperEvo ? 14 : 10)) * dt;
          const newAngle = currentAngle + Math.sign(diff) * Math.min(Math.abs(diff), turnRate);
          const curSpeed = Math.hypot(proj.vx, proj.vy) || 450;
          proj.vx = Math.cos(newAngle) * curSpeed;
          proj.vy = Math.sin(newAngle) * curSpeed;
        }
      }

      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;
      proj.life -= dt;

      if (proj.type === 'sea_dragon') {
        proj.angle += dt * 6;
        proj.y += Math.sin(proj.angle) * 3.5;
      }

      // Check collision with enemies using spatial grid
      const nearbyEnemies = this.game.getEnemiesNear(proj.x, proj.y, (proj.radius || 15) + 35);
      if (!proj.hitTargets) {
        proj.hitTargets = new Set();
      }
      for (const enemy of nearbyEnemies) {
        if (!enemy || enemy.isDead || enemy.hp <= 0) continue;
        if (!proj.hitTargets.has(enemy)) {
          const dx = enemy.x - proj.x;
          const dy = enemy.y - proj.y;
          const distSq = dx * dx + dy * dy;
          const hitR = proj.radius + enemy.radius;

          if (distSq < hitR * hitR) {
            proj.hitTargets.add(enemy);
            this.applyDamage(enemy, proj.damage, proj.isCrit, proj.color);
            this.spawnImpactParticles(proj.x, proj.y, proj.color, 4);

            if (proj.pierce > 0) {
              proj.pierce--;
              if (proj.pierce <= 0) {
                proj.life = 0;
                break;
              }
            }
          }
        }
      }

      if (proj.life <= 0) {
        this.projectiles.splice(i, 1);
      }
    }

    // Update Slashes
    for (let i = this.slashes.length - 1; i >= 0; i--) {
      const slash = this.slashes[i];
      slash.life -= dt;
      slash.progress = 1 - (slash.life / slash.maxLife);

      if (!slash.hasHit) {
        slash.hasHit = true;
        const enemies = this.game.getEnemiesNear(slash.x, slash.y, slash.radius);
        for (const enemy of enemies) {
          if (!enemy || enemy.isDead || enemy.hp <= 0) continue;
          const dx = enemy.x - slash.x;
          const dy = enemy.y - slash.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= slash.radius * slash.radius) {
            if (slash.arc !== Math.PI * 2) {
              const angleToEnemy = Math.atan2(dy, dx);
              let angleDiff = Math.abs(angleToEnemy - slash.facingAngle);
              while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
              if (Math.abs(angleDiff) > slash.arc / 2) continue;
            }

            this.applyDamage(enemy, slash.damage, slash.isCrit, slash.color);
            const dist = Math.sqrt(distSq) || 1;
            enemy.x += (dx / dist) * (slash.knockback || 30);
            enemy.y += (dy / dist) * (slash.knockback || 30);
            this.spawnImpactParticles(enemy.x, enemy.y, slash.color, 5);
          }
        }
      }

      if (slash.life <= 0) {
        this.slashes.splice(i, 1);
      }
    }

    // Update AoE Zones
    for (let i = this.aoeZones.length - 1; i >= 0; i--) {
      const zone = this.aoeZones[i];
      zone.life -= dt;
      zone.tickTimer -= dt;

      if (zone.followPlayer) {
        zone.x = p.x;
        zone.y = p.y;
      } else if (zone.vx || zone.vy) {
        zone.x += zone.vx * dt;
        zone.y += zone.vy * dt;
      }

      if (zone.tickTimer <= 0) {
        zone.tickTimer = zone.interval || 0.25;
        const enemies = this.game.getEnemiesNear(zone.x, zone.y, zone.radius);
        for (const enemy of enemies) {
          if (!enemy || enemy.isDead || enemy.hp <= 0) continue;
          const dx = enemy.x - zone.x;
          const dy = enemy.y - zone.y;
          const distSq = dx * dx + dy * dy;

          if (distSq <= zone.radius * zone.radius) {
            if (zone.slow) {
              enemy.speedMod = 0.45;
              enemy.speedModTimer = 0.5;
            }
            if (zone.pull) {
              const pullAngle = Math.atan2(zone.y - enemy.y, zone.x - enemy.x);
              enemy.x += Math.cos(pullAngle) * 45 * dt;
              enemy.y += Math.sin(pullAngle) * 45 * dt;
            }
            this.applyDamage(enemy, zone.damage, !!zone.isCrit, zone.color);
          }
        }
      }

      if (zone.life <= 0) {
        this.aoeZones.splice(i, 1);
      }
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += sw.speed * dt;
      sw.life -= dt;
      if (sw.life <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update Floating Text (limit max 18 for 60-144 FPS)
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 45 * dt;
      ft.life -= dt;
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
    if (this.floatingTexts.length > 18) {
      this.floatingTexts.splice(0, this.floatingTexts.length - 18);
    }

    // Update Lightning Chains
    for (let i = this.lightningChains.length - 1; i >= 0; i--) {
      const lc = this.lightningChains[i];
      lc.life -= dt;
      if (lc.life <= 0) {
        this.lightningChains.splice(i, 1);
      }
    }

    // Update Particles (cap max 45 for smooth performance)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.life -= dt;
      if (pt.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    if (this.particles.length > 45) {
      this.particles.splice(0, this.particles.length - 45);
    }

    // Cap active AoE zones & shockwaves to eliminate lag
    if (this.aoeZones.length > 25) {
      this.aoeZones.splice(0, this.aoeZones.length - 25);
    }
    if (this.shockwaves.length > 16) {
      this.shockwaves.splice(0, this.shockwaves.length - 16);
    }
  }

  getTargetAngle() {
    const p = this.game.player;
    const target = this.game.currentTarget;
    if (target && target.hp > 0 && !target.isDead) {
      return Math.atan2(target.y - p.y, target.x - p.x);
    }
    const nearest = this.getNearestEnemies(p.x, p.y, 1);
    if (nearest.length > 0) {
      return Math.atan2(nearest[0].y - p.y, nearest[0].x - p.x);
    }
    return p.facing === 1 ? 0 : Math.PI;
  }

  castSpell(spellId, level) {
    const p = this.game.player;
    const def = SPELL_DEFS[spellId];
    if (!def) return;

    const levelScale = 1 + (p.level - 1) * 0.012;
    const dmgMult = (1 + p.damageBonus) * (1 + (level - 1) * 0.18) * levelScale;
    const areaMult = (1 + p.areaBonus) * (1 + (level - 1) * 0.12);
    const damage = Math.round(def.baseDamage * dmgMult);
    const isCrit = false;
    const targetAngle = this.getTargetAngle();

    if (Math.abs(Math.cos(targetAngle)) > 0.2) {
      p.facing = Math.cos(targetAngle) >= 0 ? 1 : -1;
    }

    switch (spellId) {
      case 'demon_slayer': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 0.95,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#e11d48',
          knockback: 45,
          life: 0.22,
          maxLife: 0.22,
          hasHit: false
        });
        this.playSound('slash');
        p.isAttacking = true;
        setTimeout(() => { p.isAttacking = false; }, 200);
        break;
      }

      case 'black_divider': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#dc2626',
          knockback: 75,
          life: 0.32,
          maxLife: 0.32,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#dc2626', 340, 0.35);
        this.playSound('slash');
        this.game.shakeScreen(7, 0.22);
        break;
      }

      case 'wind_scythe': {
        const count = 1 + Math.floor(level / 2) + (p.charId === 'yuno' ? 1 : 0);
        for (let c = 0; c < count; c++) {
          const spread = (c - (count - 1) / 2) * 0.18;
          const a = targetAngle + spread;
          this.projectiles.push({
            type: 'wind_scythe',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * def.baseSpeed,
            vy: Math.sin(a) * def.baseSpeed,
            radius: 14 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#34d399',
            pierce: def.pierce + (level >= 3 ? 2 : 0),
            hitTargets: new Set(),
            life: 2.2
          });
        }
        this.playSound('windBlade');
        break;
      }

      case 'spirit_zephyr': {
        for (let i = 0; i < 2; i++) {
          const spread = (i - 0.5) * 0.5;
          const a = targetAngle + spread;
          this.aoeZones.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 85,
            vy: Math.sin(a) * 85,
            radius: 90 * areaMult,
            damage: Math.round(damage * 0.45),
            interval: 0.18,
            tickTimer: 0,
            life: 4.5,
            pull: true,
            color: '#10b981',
            isCrit: isCrit
          });
        }
        this.playSound('windBlade');
        break;
      }

      case 'sylph_spirits': {
        const spiritCount = 1 + level + (p.charId === 'sylph' ? 1 : 0);
        const orbitR = 50 + level * 2.8;
        const scaledSpeed = def.baseSpeed * (1 + (level >= 3 ? 0.15 : 0));
        const scaledDamage = Math.round(damage * (1 + (level - 1) * 0.18));
        const pierce = level >= 4 ? 2 : 1;
        const nearestEnemies = this.getNearestEnemies(p.x, p.y, spiritCount);

        for (let i = 0; i < spiritCount; i++) {
          const orbitAngle = (this.game.tick * 3.0) + (i * Math.PI * 2) / spiritCount;
          const sx = p.x + Math.cos(orbitAngle) * orbitR;
          const sy = p.y + Math.sin(orbitAngle) * orbitR;

          let aimAngle = targetAngle;
          let target = null;
          if (nearestEnemies.length > 0) {
            target = nearestEnemies[i % nearestEnemies.length];
            aimAngle = Math.atan2(target.y - sy, target.x - sx);
          } else {
            aimAngle = targetAngle + (i - (spiritCount - 1) / 2) * 0.22;
          }

          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * scaledSpeed,
              vy: Math.sin(aimAngle) * scaledSpeed,
              radius: 13 * areaMult,
              damage: scaledDamage,
              isCrit: isCrit,
              color: '#34d399',
              pierce: pierce,
              life: 1.8,
              isHoming: true,
              turnSpeed: 12,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#ffffff', 3);
          }, i * 36);
        }
        this.playSound('windBlade');
        break;
      }

      // BRANCH 1: MAGIC MISSILE (Image 1 from Magic Survival)
      case 'spirit_magic_missile': {
        const spiritCount = 6 + (p.charId === 'sylph' ? 1 : 0);
        const orbitR = 68;
        const actualCd = (def.baseCooldown * (1 - (p.cooldownReduction || 0))) || 0.45;
        const stepDelay = Math.max(25, Math.round((actualCd * 1000) / spiritCount));

        for (let i = 0; i < spiritCount; i++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const orbitAngle = (this.game.tick * 4.0) + (i * Math.PI * 2) / spiritCount;
            const sx = p.x + Math.cos(orbitAngle) * orbitR;
            const sy = p.y + Math.sin(orbitAngle) * orbitR;

            const targets = this.getNearestEnemies(sx, sy, 3);
            const target = targets.length > 0 ? targets[Math.floor(Math.random() * targets.length)] : null;
            const aimAngle = target ? Math.atan2(target.y - sy, target.x - sx) : (targetAngle + (Math.random() - 0.5) * 0.4);

            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * def.baseSpeed,
              vy: Math.sin(aimAngle) * def.baseSpeed,
              radius: 14 * areaMult,
              damage: damage,
              isCrit: isCrit,
              color: '#38bdf8',
              pierce: def.pierce || 2,
              life: 2.0,
              isHoming: true,
              turnSpeed: 18,
              isMissile: true,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#7dd3fc', 3);
            this.playSound('windBlade');
          }, i * stepDelay);
        }
        break;
      }

      // BRANCH 2: MAGIC BLADE (Image 2 from Magic Survival - Instant blade on target, 2.5X damage)
      case 'spirit_magic_blade':
      case 'sylph_tempest_domain': {
        const spiritCount = 6 + (p.charId === 'sylph' ? 1 : 0);
        const enemies = this.getNearestEnemies(p.x, p.y, spiritCount);
        const slashDmg = damage;

        if (enemies.length === 0) {
          for (let i = 0; i < 3; i++) {
            const dist = 120 + i * 75;
            const bx = p.x + Math.cos(targetAngle) * dist;
            const by = p.y + Math.sin(targetAngle) * dist;
            this.slashes.push({
              x: bx,
              y: by,
              radius: 55 * areaMult,
              facingAngle: targetAngle + (i % 2 === 0 ? 0.35 : -0.35),
              arc: Math.PI * 0.9,
              damage: slashDmg,
              isCrit: isCrit,
              color: '#fef08a',
              life: 0.22,
              maxLife: 0.22,
              knockback: 25,
              hasHit: false
            });
            this.spawnImpactParticles(bx, by, '#fef08a', 4);
          }
          this.playSound('slash');
          break;
        }

        for (let i = 0; i < spiritCount; i++) {
          const target = enemies[i % enemies.length];
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const tx = target.x + (Math.random() - 0.5) * 16;
            const ty = target.y + (Math.random() - 0.5) * 16;
            const slashAngle = Math.random() * Math.PI * 2;

            const splashEnemies = this.game.getEnemiesNear(tx, ty, 65 * areaMult);
            for (const e of splashEnemies) {
              if (!e || e.isDead || e.hp <= 0) continue;
              this.applyDamage(e, slashDmg, isCrit, '#fef08a');
            }

            this.slashes.push({
              x: tx,
              y: ty,
              radius: 48 * areaMult,
              facingAngle: slashAngle,
              arc: Math.PI * 1.2,
              damage: 0,
              isCrit: isCrit,
              color: '#ffffff',
              life: 0.18,
              maxLife: 0.18,
              knockback: 10,
              hasHit: true
            });
            this.spawnImpactParticles(tx, ty, '#facc15', 6);
            this.spawnImpactParticles(tx, ty, '#ffffff', 4);
          }, i * 35);
        }
        this.playSound('slash');
        break;
      }

      // BRANCH 3: FAMILIAR (Image 3 from Magic Survival - All spirits combined into one, 360° barrage, 5x CD)
      case 'spirit_familiar': {
        const baseSpirits = 5 + (p.charId === 'sylph' ? 1 : 0);
        const totalProjectiles = baseSpirits * 15; // 75 - 90 projectiles!
        const waves = 15;
        const projPerWave = Math.round(totalProjectiles / waves);
        const intervalDelay = 38;

        this.game.shakeScreen(7, 0.25);
        this.spawnShockwave(p.x, p.y, '#f472b6', 220 * areaMult, 0.35);

        for (let w = 0; w < waves; w++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const waveOffset = (w * 0.32) + targetAngle;
            for (let j = 0; j < projPerWave; j++) {
              const ang = waveOffset + (j * Math.PI * 2) / projPerWave;
              this.projectiles.push({
                type: 'sylph_spirit_bolt',
                x: p.x,
                y: p.y,
                vx: Math.cos(ang) * def.baseSpeed,
                vy: Math.sin(ang) * def.baseSpeed,
                radius: 15 * areaMult,
                damage: damage,
                isCrit: isCrit,
                color: '#f472b6',
                pierce: def.pierce || 2,
                life: 1.8,
                isHoming: true,
                turnSpeed: 10,
                isFamiliar: true
              });
            }
            this.spawnImpactParticles(p.x, p.y, '#fbcfe8', 4);
            if (w % 3 === 0) this.playSound('windBlade');
          }, w * intervalDelay);
        }
        break;
      }

      // TIER 3 SUPER EVOLUTIONS
      case 'spirit_storm_empress': {
        this.game.shakeScreen(15, 0.45);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 560, 0.5);
        this.spawnShockwave(p.x, p.y, '#fef08a', 400, 0.4);

        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: 250 * areaMult,
          damage: Math.round(damage * 0.4),
          interval: 0.10,
          tickTimer: 0,
          life: 3.2,
          color: '#38bdf8',
          pull: true,
          isEmpressStorm: true
        });

        const spiritCount = 12;
        for (let i = 0; i < spiritCount; i++) {
          const orbitAngle = (this.game.tick * 5.0) + (i * Math.PI * 2) / spiritCount;
          const sx = p.x + Math.cos(orbitAngle) * 88;
          const sy = p.y + Math.sin(orbitAngle) * 88;
          const targets = this.getNearestEnemies(sx, sy, 3);
          const target = targets[i % (targets.length || 1)] || null;
          const aimAngle = target ? Math.atan2(target.y - sy, target.x - sx) : targetAngle + (i - 5.5) * 0.2;

          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            this.projectiles.push({
              type: 'sylph_spirit_bolt',
              x: sx,
              y: sy,
              vx: Math.cos(aimAngle) * def.baseSpeed,
              vy: Math.sin(aimAngle) * def.baseSpeed,
              radius: 20 * areaMult,
              damage: damage,
              isCrit: isCrit,
              color: '#38bdf8',
              pierce: 99,
              life: 2.2,
              isHoming: true,
              isSuperEvo: true,
              turnSpeed: 22,
              targetEnemy: target
            });
            this.spawnImpactParticles(sx, sy, '#ffffff', 4);
          }, i * 20);
        }
        this.playSound('windBlade');
        break;
      }

      case 'spirit_blade_sovereign': {
        this.game.shakeScreen(16, 0.5);
        this.spawnShockwave(p.x, p.y, '#fef08a', 620, 0.5);

        const enemies = this.getNearestEnemies(p.x, p.y, 16);
        for (let i = 0; i < 16; i++) {
          const target = enemies.length > 0 ? enemies[i % enemies.length] : null;
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const tx = target ? target.x + (Math.random() - 0.5) * 20 : p.x + Math.cos(targetAngle + (i - 8) * 0.25) * (100 + i * 30);
            const ty = target ? target.y + (Math.random() - 0.5) * 20 : p.y + Math.sin(targetAngle + (i - 8) * 0.25) * (100 + i * 30);

            const splashEnemies = this.game.getEnemiesNear(tx, ty, 90 * areaMult);
            for (const e of splashEnemies) {
              if (!e || e.isDead || e.hp <= 0) continue;
              this.applyDamage(e, damage, isCrit, '#fef08a');
            }

            this.slashes.push({
              x: tx,
              y: ty,
              radius: 65 * areaMult,
              facingAngle: Math.random() * Math.PI * 2,
              arc: Math.PI * 1.5,
              damage: 0,
              isCrit: isCrit,
              color: '#fef08a',
              life: 0.25,
              maxLife: 0.25,
              knockback: 15,
              hasHit: true
            });
            this.spawnImpactParticles(tx, ty, '#facc15', 8);
            this.spawnImpactParticles(tx, ty, '#ffffff', 6);
          }, i * 28);
        }
        this.playSound('slash');
        break;
      }

      case 'spirit_familiar_overlord': {
        this.game.shakeScreen(18, 0.55);
        this.spawnShockwave(p.x, p.y, '#f472b6', 500, 0.45);
        this.spawnShockwave(p.x, p.y, '#a855f7', 350, 0.35);

        const totalProjectiles = 120;
        const waves = 20;
        const projPerWave = 6;

        for (let w = 0; w < waves; w++) {
          setTimeout(() => {
            if (!this.game || this.game.state !== 'PLAYING') return;
            const waveOffset = (w * 0.45) + targetAngle;
            for (let j = 0; j < projPerWave; j++) {
              const ang = waveOffset + (j * Math.PI * 2) / projPerWave;
              this.projectiles.push({
                type: 'sylph_spirit_bolt',
                x: p.x,
                y: p.y,
                vx: Math.cos(ang) * def.baseSpeed,
                vy: Math.sin(ang) * def.baseSpeed,
                radius: 20 * areaMult,
                damage: damage,
                isCrit: isCrit,
                color: '#f472b6',
                pierce: 5,
                life: 2.2,
                isHoming: true,
                turnSpeed: 15,
                isSuperEvo: true,
                isFamiliar: true
              });
            }
            this.spawnImpactParticles(p.x, p.y, '#fbcfe8', 5);
            if (w % 3 === 0) this.playSound('windBlade');
          }, w * 32);
        }
        break;
      }

      case 'sea_dragon': {
        this.projectiles.push({
          type: 'sea_dragon',
          x: p.x,
          y: p.y,
          vx: Math.cos(targetAngle) * def.baseSpeed,
          vy: Math.sin(targetAngle) * def.baseSpeed,
          radius: 25 * areaMult,
          angle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#0284c7',
          pierce: 999,
          hitTargets: new Set(),
          life: 3.0
        });
        this.playSound('waterSplash');
        break;
      }

      case 'valkyrie_lance': {
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI * 2) / 8 + targetAngle;
          this.projectiles.push({
            type: 'valkyrie_lance',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 450,
            vy: Math.sin(a) * 450,
            radius: 16 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#38bdf8',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.0
          });
        }
        this.spawnShockwave(p.x, p.y, '#38bdf8', 220, 0.25);
        this.playSound('waterSplash');
        this.game.shakeScreen(5, 0.18);
        break;
      }

      case 'dark_katana': {
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          arc: Math.PI * 0.95,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#7e22ce',
          knockback: 15,
          life: 0.24,
          maxLife: 0.24,
          hasHit: false
        });
        this.playSound('slash');
        break;
      }

      case 'dimension_slash': {
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: 480 * areaMult,
          arc: Math.PI * 0.4,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#a855f7',
          knockback: 90,
          life: 0.5,
          maxLife: 0.5,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#9333ea', 500, 0.4);
        this.playSound('dimensionSlash');
        this.game.shakeScreen(12, 0.38);
        break;
      }

      case 'lightning_boots': {
        const enemies = this.getNearestEnemies(p.x, p.y, def.chains + level);
        if (enemies.length > 0) {
          const chainPoints = [{ x: p.x, y: p.y }];
          for (const target of enemies) {
            this.applyDamage(target, damage, isCrit, '#facc15');
            chainPoints.push({ x: target.x, y: target.y });
          }
          this.lightningChains.push({
            points: chainPoints,
            color: '#facc15',
            life: 0.18
          });
          this.playSound('lightning');
        }
        break;
      }

      case 'thunder_fiend': {
        for (let i = 0; i < 4; i++) {
          const offsetX = (Math.random() - 0.5) * 360;
          const offsetY = (Math.random() - 0.5) * 360;
          const tx = p.x + offsetX;
          const ty = p.y + offsetY;

          this.aoeZones.push({
            x: tx,
            y: ty,
            radius: 60 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.22,
            color: '#fde047',
            isCrit: isCrit
          });
          this.lightningChains.push({
            points: [{ x: tx, y: ty - 280 }, { x: tx, y: ty }],
            color: '#ffffff',
            life: 0.18
          });
        }
        this.playSound('lightning');
        break;
      }

      case 'calidos_brachium': {
        // Rapid fire punches in target direction
        for (let f = 0; f < 3; f++) {
          setTimeout(() => {
            if (!this.game.player) return;
            const spread = (Math.random() - 0.5) * 0.3;
            const fa = targetAngle + spread;
            this.projectiles.push({
              type: 'fire_fist',
              x: p.x,
              y: p.y,
              vx: Math.cos(fa) * 440,
              vy: Math.sin(fa) * 440,
              radius: 16 * areaMult,
              damage: Math.round(damage * 0.7),
              isCrit: isCrit,
              color: '#ea580c',
              pierce: 2,
              hitTargets: new Set(),
              life: 0.8
            });
            this.playSound('fireExplosion');
          }, f * 90);
        }
        break;
      }

      case 'calidos_purgatory': {
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.2,
          tickTimer: 0,
          life: 2.5,
          color: '#ef4444',
            isCrit: isCrit
          });
        this.spawnShockwave(p.x, p.y, '#f97316', 380, 0.35);
        this.playSound('fireExplosion');
        this.game.shakeScreen(8, 0.25);
        break;
      }

      case 'silver_rain': {
        const target = this.game.currentTarget;
        const tx = target ? target.x : p.x + Math.cos(targetAngle) * 150;
        const ty = target ? target.y : p.y + Math.sin(targetAngle) * 150;

        for (let i = 0; i < 4; i++) {
          const rx = tx + (Math.random() - 0.5) * 80;
          const ry = ty + (Math.random() - 0.5) * 80;
          this.aoeZones.push({
            x: rx,
            y: ry,
            radius: 35 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.2,
            color: '#cbd5e1',
            isCrit: isCrit
          });
        }
        this.playSound('slash');
        break;
      }

      case 'briar_whip': {
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          arc: Math.PI * 1.1,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#2563eb',
          knockback: 25,
          life: 0.25,
          maxLife: 0.25,
          hasHit: false
        });
        this.playSound('windBlade');
        break;
      }

      case 'chrono_stasis': {
        const target = this.game.currentTarget;
        const tx = target ? target.x : p.x + Math.cos(targetAngle) * 140;
        const ty = target ? target.y : p.y + Math.sin(targetAngle) * 140;

        this.aoeZones.push({
          x: tx,
          y: ty,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.28,
          tickTimer: 0,
          life: def.duration,
          slow: true,
          color: '#fbbf24',
            isCrit: isCrit
          });
        this.playSound('timeWarp');
        break;
      }

      case 'magna_fireballs': {
        for (let i = 0; i < 2; i++) {
          const spread = (i - 0.5) * 0.25;
          const a = targetAngle + spread;
          this.projectiles.push({
            type: 'fireball',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 360,
            vy: Math.sin(a) * 360,
            radius: 14 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#f97316',
            pierce: 1,
            hitTargets: new Set(),
            life: 1.6
          });
        }
        this.playSound('fireExplosion');
        break;
      }

      case 'charmy_cotton': {
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: 70 * areaMult,
          damage: damage,
          interval: 0.35,
          tickTimer: 0,
          life: 3.2,
          followPlayer: true,
          color: '#ec4899',
            isCrit: isCrit
          });
        if (Math.random() < 0.3) {
          this.game.spawnDrop(p.x + (Math.random() - 0.5) * 60, p.y + (Math.random() - 0.5) * 60, 'food', 30);
        }
        break;
      }

      // TIER 1: GƯƠM ÁNH SÁNG LUMIERE
      case 'light_swords': {
        const count = 3 + Math.floor(level / 2);
        for (let c = 0; c < count; c++) {
          const spread = (c - (count - 1) / 2) * 0.14;
          const a = targetAngle + spread;
          this.projectiles.push({
            type: 'light_sword',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * def.baseSpeed,
            vy: Math.sin(a) * def.baseSpeed,
            angle: a,
            radius: 15 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#fef08a',
            pierce: def.pierce,
            hitTargets: new Set(),
            life: 1.8
          });
        }
        this.playSound('divineLight');
        break;
      }

      // TIER 2: QUANG KIẾM PHÁN QUYẾT (TIẾN HÓA 1)
      case 'light_judgment': {
        const target = this.game.currentTarget;
        const cx = target ? target.x : p.x + Math.cos(targetAngle) * 160;
        const cy = target ? target.y : p.y + Math.sin(targetAngle) * 160;

        for (let i = 0; i < 4; i++) {
          const rx = cx + (Math.random() - 0.5) * 160;
          const ry = cy + (Math.random() - 0.5) * 160;
          this.aoeZones.push({
            x: rx,
            y: ry,
            radius: 45 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.25 + (i * 0.04),
            color: '#fbbf24',
            isCrit: isCrit
          });
          this.spawnShockwave(rx, ry, '#fef08a', 200, 0.2);
        }
        this.playSound('divineLight');
        break;
      }

      // TIER 3: THẦN QUANG VÔ TẬN KHAI SÁNG (TIẾN HÓA LẦN NỮA / SUPER EVOLUTION)
      case 'lumiere_god_light': {
        this.game.shakeScreen(12, 0.35);
        this.spawnShockwave(p.x, p.y, '#fef08a', 450, 0.4);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 320, 0.3);
        this.playSound('divineLight');

        // 4 rotating solar lasers + massive damage area
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 1.8,
          followPlayer: true,
          color: '#fbbf24',
            isCrit: isCrit
          });

        // 6 Light rain swords all around (immediate with staggered life)
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI * 2) / 6;
          const rx = p.x + Math.cos(a) * (140 + Math.random() * 100);
          const ry = p.y + Math.sin(a) * (140 + Math.random() * 100);
          this.aoeZones.push({
            x: rx,
            y: ry,
            radius: 55 * areaMult,
            damage: Math.round(damage * 0.75),
            interval: 0.1,
            tickTimer: 0,
            life: 0.28 + (i * 0.03),
            color: '#ffffff',
            isCrit: isCrit
          });
          this.spawnShockwave(rx, ry, '#fbbf24', 240, 0.2);
        }
        break;
      }

      // TIER 3: TUYỆT MA KIẾM VÔ CỰC (ASTA SUPER EVOLUTION)
      case 'demon_slasher_infinity': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#dc2626',
          knockback: 100,
          life: 0.4,
          maxLife: 0.4,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#000000', 450, 0.45);
        this.spawnShockwave(p.x, p.y, '#dc2626', 600, 0.5);
        this.playSound('dimensionSlash');
        this.game.shakeScreen(15, 0.45);
        break;
      }

      // TIER 3: TỬ KÍCH ĐOẠT VỊ HẮC ÁM (YAMI SUPER EVOLUTION)
      case 'death_thrust_void': {
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          arc: Math.PI * 0.22,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#a855f7',
          knockback: 120,
          life: 0.55,
          maxLife: 0.55,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#7e22ce', 700, 0.5);
        this.playSound('dimensionSlash');
        this.game.shakeScreen(16, 0.42);
        break;
      }

      // NACHT FAUST: HẮC ẢNH QUỶ TRẢO
      case 'shadow_hands': {
        const count = 3 + Math.floor(level / 2);
        this.playSound('shadowSlash');
        for (let i = 0; i < count; i++) {
          const a = (i * Math.PI * 2) / count + (Math.random() - 0.5) * 0.4;
          const dist = 65 + Math.random() * 85;
          const sx = p.x + Math.cos(a) * dist;
          const sy = p.y + Math.sin(a) * dist;
          this.aoeZones.push({
            x: sx,
            y: sy,
            radius: 46 * areaMult,
            damage: damage,
            interval: 0.15,
            tickTimer: 0,
            life: 0.35 + (i * 0.03),
            color: '#581c87',
            isShadowClaw: true,
            isCrit: isCrit
          });
          this.spawnShockwave(sx, sy, '#7c3aed', 160, 0.25);
        }
        break;
      }

      // NACHT FAUST EVOLUTION: Á MA HỢP THỂ CANIS
      case 'shadow_canis': {
        this.game.shakeScreen(10, 0.35);
        this.spawnShockwave(p.x, p.y, '#3b0764', 420, 0.42);
        this.spawnShockwave(p.x, p.y, '#a855f7', 280, 0.35);
        this.playSound('shadowSlash');

        // 4 Shadow wolves charging out
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI / 2) + targetAngle;
          this.projectiles.push({
            type: 'shadow_wolf',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 460,
            vy: Math.sin(a) * 460,
            radius: 20,
            damage: damage,
            isCrit: isCrit,
            pierce: 99,
            hitTargets: new Set(),
            life: 1.3,
            color: '#7c3aed'
          });
        }

        // Central dark void vortex
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: Math.round(damage * 0.65),
          interval: 0.15,
          tickTimer: 0,
          life: 1.6,
          followPlayer: true,
          color: '#3b0764',
            isCrit: isCrit
          });

        // Life steal burst
        p.hp = Math.min(p.maxHp, p.hp + 12);
        break;
      }

      // LICHT: CHÂN KIẾM KHAI NGUYÊN
      case 'origin_swords': {
        const count = 4 + Math.floor(level / 2);
        this.playSound('originSwords');
        for (let i = 0; i < count; i++) {
          const spread = (i - (count - 1) / 2) * 0.15;
          const a = targetAngle + spread;
          this.projectiles.push({
            type: 'origin_sword',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * (def.baseSpeed || 540),
            vy: Math.sin(a) * (def.baseSpeed || 540),
            radius: 12,
            damage: damage,
            isCrit: false,
            pierce: def.pierce || 4,
            hitTargets: new Set(),
            life: 1.4,
            color: '#fef08a'
          });
        }
        break;
      }

      // LICHT EVOLUTION: CHÂN KIẾM TỐI THƯỢNG (CONQUERING EON)
      case 'origin_conquering_eon': {
        const target = this.game.currentTarget;
        const cx = target ? target.x : p.x + Math.cos(targetAngle) * 160;
        const cy = target ? target.y : p.y + Math.sin(targetAngle) * 160;
        this.game.shakeScreen(16, 0.5);
        this.playSound('conqueringEon');
        this.spawnShockwave(cx, cy, '#38bdf8', 680, 0.5);
        this.spawnShockwave(cx, cy, '#fef08a', 880, 0.6);
        this.aoeZones.push({
          x: cx,
          y: cy,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.1,
          tickTimer: 0,
          life: 0.65,
          color: '#fef08a',
          isGiantSword: true,
            isCrit: isCrit
          });
        break;
      }

      // TIER 3 SUPER EVOLUTIONS & NEW WEAPONS
      case 'spirit_zephyr_supreme': {
        this.game.shakeScreen(14, 0.4);
        this.spawnShockwave(p.x, p.y, '#10b981', 500, 0.45);
        this.spawnShockwave(p.x, p.y, '#6ee7b7', 350, 0.35);
        for (let i = 0; i < 8; i++) {
          const a = (i * Math.PI * 2) / 8 + targetAngle;
          this.projectiles.push({
            type: 'wind_scythe',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 600,
            vy: Math.sin(a) * 600,
            radius: 20 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#10b981',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.5
          });
        }
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: Math.round(damage * 0.5),
          interval: 0.12,
          tickTimer: 0,
          life: 2.0,
          followPlayer: true,
          color: '#059669',
            isCrit: isCrit
          });
        this.playSound('windBlade');
        break;
      }

      case 'leviathan_goddess': {
        this.game.shakeScreen(15, 0.4);
        this.spawnShockwave(p.x, p.y, '#0284c7', 550, 0.5);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 380, 0.35);
        for (let i = 0; i < 3; i++) {
          const a = targetAngle + (i - 1) * 0.4;
          this.projectiles.push({
            type: 'sea_dragon',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 450,
            vy: Math.sin(a) * 450,
            radius: 35 * areaMult,
            angle: 0,
            damage: damage,
            isCrit: isCrit,
            color: '#0ea5e9',
            pierce: 999,
            hitTargets: new Set(),
            life: 3.2
          });
        }
        this.playSound('waterMagic');
        break;
      }

      case 'thunder_emperor_rampage': {
        this.game.shakeScreen(16, 0.45);
        this.spawnShockwave(p.x, p.y, '#eab308', 600, 0.5);
        for (let i = 0; i < 12; i++) {
          const a = Math.random() * Math.PI * 2;
          const d = 50 + Math.random() * 260;
          const tx = p.x + Math.cos(a) * d;
          const ty = p.y + Math.sin(a) * d;
          this.aoeZones.push({
            x: tx,
            y: ty,
            radius: 65 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.25,
            color: '#facc15',
            isCrit: isCrit
          });
          this.lightningChains.push({
            points: [{ x: tx, y: ty - 320 }, { x: tx, y: ty }],
            color: '#ffffff',
            life: 0.22
          });
        }
        this.playSound('lightning');
        break;
      }

      case 'sol_prominence_sun': {
        this.game.shakeScreen(16, 0.5);
        this.spawnShockwave(p.x, p.y, '#ef4444', 650, 0.55);
        this.spawnShockwave(p.x, p.y, '#f97316', 450, 0.4);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.12,
          tickTimer: 0,
          life: 2.2,
          followPlayer: true,
          color: '#ea580c',
            isCrit: isCrit
          });
        this.playSound('fireball');
        break;
      }

      case 'silver_spears':
      case 'silver_shield_god': {
        const count = spellId === 'silver_shield_god' ? 16 : 8;
        this.game.shakeScreen(spellId === 'silver_shield_god' ? 14 : 8, 0.35);
        this.spawnShockwave(p.x, p.y, '#94a3b8', 420, 0.4);
        for (let i = 0; i < count; i++) {
          const a = (i * Math.PI * 2) / count;
          const dist = 70 + Math.random() * 160;
          const sx = p.x + Math.cos(a) * dist;
          const sy = p.y + Math.sin(a) * dist;
          this.aoeZones.push({
            x: sx,
            y: sy,
            radius: 50 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.28,
            color: '#cbd5e1',
            isCrit: isCrit
          });
          this.spawnShockwave(sx, sy, '#f8fafc', 180, 0.2);
        }
        this.playSound('slash');
        break;
      }

      case 'scarlet_rose_bloom':
      case 'blue_rose_cage': {
        const rad = def.baseArea * areaMult;
        this.game.shakeScreen(10, 0.3);
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: rad,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: spellId === 'blue_rose_cage' ? '#38bdf8' : '#e11d48',
          knockback: 60,
          life: 0.38,
          maxLife: 0.38,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, spellId === 'blue_rose_cage' ? '#0284c7' : '#ec4899', 460, 0.4);
        this.playSound('slash');
        break;
      }

      case 'chrono_loop':
      case 'chrono_eternal_domain': {
        this.game.shakeScreen(15, 0.45);
        this.spawnShockwave(p.x, p.y, '#f59e0b', 650, 0.5);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 2.8,
          color: '#fbbf24',
          pull: true,
            isCrit: isCrit
          });
        this.playSound('chronoFreeze');
        break;
      }

      case 'soul_chain_fire':
      case 'soul_chain_deathmatch': {
        this.game.shakeScreen(14, 0.4);
        this.spawnShockwave(p.x, p.y, '#ef4444', 500, 0.45);
        for (let i = 0; i < 6; i++) {
          const a = targetAngle + (i - 2.5) * 0.25;
          this.projectiles.push({
            type: 'fire_fist',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 450,
            vy: Math.sin(a) * 450,
            radius: 20 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#dc2626',
            pierce: 99,
            hitTargets: new Set(),
            life: 1.8
          });
        }
        this.playSound('fireball');
        break;
      }

      case 'food_feast':
      case 'wolf_gluttony': {
        this.game.shakeScreen(12, 0.35);
        this.spawnShockwave(p.x, p.y, '#f472b6', 450, 0.4);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 1.5,
          color: '#f43f5e',
            isCrit: isCrit
          });
        p.hp = Math.min(p.maxHp, p.hp + 20);
        this.playSound('levelUp');
        break;
      }

      case 'shadow_devil_union': {
        this.game.shakeScreen(16, 0.5);
        this.spawnShockwave(p.x, p.y, '#000000', 600, 0.55);
        this.spawnShockwave(p.x, p.y, '#7c3aed', 450, 0.45);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.1,
          tickTimer: 0,
          life: 2.2,
          color: '#3b0764',
          followPlayer: true,
            isCrit: isCrit
          });
        p.hp = Math.min(p.maxHp, p.hp + 30);
        this.playSound('shadowSlash');
        break;
      }

      case 'ultimate_light_slash': {
        this.game.shakeScreen(18, 0.55);
        this.spawnShockwave(p.x, p.y, '#ffffff', 800, 0.6);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 600, 0.5);
        for (let i = 0; i < 16; i++) {
          const a = (i * Math.PI * 2) / 16;
          this.projectiles.push({
            type: 'origin_sword',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 620,
            vy: Math.sin(a) * 620,
            radius: 18,
            damage: damage,
            isCrit: isCrit,
            pierce: 99,
            hitTargets: new Set(),
            life: 2.2,
            color: '#fef08a'
          });
        }
        this.playSound('conqueringEon');
        break;
      }

      case 'trap_magic':
      case 'counter_trap':
      case 'infernal_reflect_void': {
        const count = spellId === 'infernal_reflect_void' ? 8 : (spellId === 'counter_trap' ? 5 : 3);
        this.game.shakeScreen(spellId === 'infernal_reflect_void' ? 14 : 7, 0.3);
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          const dist = 50 + Math.random() * 180;
          const tx = p.x + Math.cos(a) * dist;
          const ty = p.y + Math.sin(a) * dist;
          this.aoeZones.push({
            x: tx,
            y: ty,
            radius: 55 * areaMult,
            damage: damage,
            interval: 0.1,
            tickTimer: 0,
            life: 0.35,
            color: '#78716c',
            isCrit: isCrit
          });
          this.spawnShockwave(tx, ty, '#f97316', 220, 0.25);
        }
        this.playSound('fireball');
        break;
      }

      case 'world_tree':
      case 'mistilteinn_roots':
      case 'yggdrasil_rebirth': {
        this.game.shakeScreen(spellId === 'yggdrasil_rebirth' ? 15 : 8, 0.35);
        this.spawnShockwave(p.x, p.y, '#15803d', 500, 0.45);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 2.0,
          color: '#16a34a',
            isCrit: isCrit
          });
        p.hp = Math.min(p.maxHp, p.hp + 15);
        this.playSound('levelUp');
        break;
      }

      case 'dream_mist':
      case 'glamour_world':
      case 'dream_god_reality': {
        this.game.shakeScreen(spellId === 'dream_god_reality' ? 16 : 9, 0.4);
        this.spawnShockwave(p.x, p.y, '#a855f7', 580, 0.5);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 2.2,
          color: '#d946ef',
          pull: true,
            isCrit: isCrit
          });
        this.playSound('chronoFreeze');
        break;
      }

      case 'severing_blades':
      case 'death_scythe':
      case 'infinite_cleave': {
        const count = spellId === 'infinite_cleave' ? 8 : (spellId === 'death_scythe' ? 4 : 2);
        this.game.shakeScreen(spellId === 'infinite_cleave' ? 16 : 9, 0.35);
        for (let i = 0; i < count; i++) {
          const a = (i * Math.PI * 2) / count + targetAngle;
          this.slashes.push({
            x: p.x,
            y: p.y,
            radius: def.baseArea * areaMult,
            arc: Math.PI * 0.7,
            facingAngle: a,
            damage: damage,
            isCrit: isCrit,
            color: '#84cc16',
            knockback: 75,
            life: 0.35,
            maxLife: 0.35,
            hasHit: false
          });
        }
        this.spawnShockwave(p.x, p.y, '#65a30d', 460, 0.4);
        this.playSound('slash');
        break;
      }

      case 'paint_splash':
      case 'masterpiece_beast':
      case 'twilight_valhalla': {
        this.game.shakeScreen(spellId === 'twilight_valhalla' ? 15 : 8, 0.38);
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
        for (let i = 0; i < 5; i++) {
          const a = targetAngle + (i - 2) * 0.3;
          this.projectiles.push({
            type: 'wind_scythe',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 480,
            vy: Math.sin(a) * 480,
            radius: 20 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: colors[i],
            pierce: 99,
            hitTargets: new Set(),
            life: 2.0
          });
        }
        this.playSound('windBlade');
        break;
      }

      case 'sealing_chains':
      case 'nero_binding':
      case 'eternal_prison_coffin': {
        this.game.shakeScreen(spellId === 'eternal_prison_coffin' ? 16 : 8, 0.4);
        this.spawnShockwave(p.x, p.y, '#000000', 500, 0.45);
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.12,
          tickTimer: 0,
          life: 2.0,
          color: '#1c1917',
          pull: true,
            isCrit: isCrit
          });
        this.playSound('shadowSlash');
        break;
      }

      case 'spiral_flame':
      case 'spiral_inferno':
      case 'flame_dragon_emperor': {
        const count = spellId === 'flame_dragon_emperor' ? 8 : (spellId === 'spiral_inferno' ? 4 : 2);
        this.game.shakeScreen(spellId === 'flame_dragon_emperor' ? 16 : 10, 0.4);
        for (let i = 0; i < count; i++) {
          const a = targetAngle + (i - (count - 1) / 2) * 0.25;
          this.projectiles.push({
            type: 'fire_fist',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 550,
            vy: Math.sin(a) * 550,
            radius: 22 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#f97316',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.2
          });
        }
        this.playSound('fireball');
        break;
      }

      case 'spatial_destruction':
      case 'archangel_slash':
      case 'absolute_void_annihilation': {
        this.game.shakeScreen(spellId === 'absolute_void_annihilation' ? 18 : 11, 0.45);
        this.spawnShockwave(p.x, p.y, '#9333ea', 650, 0.5);
        this.aoeZones.push({
          x: p.x + Math.cos(targetAngle) * 120,
          y: p.y + Math.sin(targetAngle) * 120,
          radius: def.baseArea * areaMult,
          damage: damage,
          interval: 0.1,
          tickTimer: 0,
          life: 1.8,
          color: '#581c87',
          pull: true,
            isCrit: isCrit
          });
        this.playSound('dimensionSlash');
        break;
      }

      case 'diamond_blades':
      case 'nemesis_harpoon':
      case 'crystal_colossus': {
        this.game.shakeScreen(spellId === 'crystal_colossus' ? 16 : 9, 0.4);
        this.spawnShockwave(p.x, p.y, '#06b6d4', 550, 0.45);
        for (let i = 0; i < 6; i++) {
          const a = targetAngle + (i - 2.5) * 0.22;
          this.projectiles.push({
            type: 'origin_sword',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 540,
            vy: Math.sin(a) * 540,
            radius: 16,
            damage: damage,
            isCrit: isCrit,
            color: '#67e8f9',
            pierce: 99,
            hitTargets: new Set(),
            life: 1.8
          });
        }
        this.playSound('slash');
        break;
      }

      case 'light_swords_dark':
      case 'ray_of_divine_punishment':
      case 'demon_light_judgment': {
        this.game.shakeScreen(spellId === 'demon_light_judgment' ? 18 : 11, 0.45);
        this.spawnShockwave(p.x, p.y, '#0f172a', 680, 0.5);
        this.spawnShockwave(p.x, p.y, '#e2e8f0', 480, 0.4);
        for (let i = 0; i < 10; i++) {
          const a = targetAngle + (i - 4.5) * 0.18;
          this.projectiles.push({
            type: 'light_sword',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 650,
            vy: Math.sin(a) * 650,
            radius: 18,
            damage: damage,
            isCrit: isCrit,
            color: '#1e293b',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.0
          });
        }
        this.playSound('divineLight');
        break;
      }

      // 25. POISON CLOUD (Gordon Agrippa)
      case 'poison_cloud': {
        const radius = def.baseArea * areaMult;
        const target = this.game.currentTarget;
        const tx = target ? target.x : p.x + Math.cos(targetAngle) * 90;
        const ty = target ? target.y : p.y + Math.sin(targetAngle) * 90;
        this.aoeZones.push({
          x: tx,
          y: ty,
          radius: radius,
          damage: damage,
          interval: 0.25,
          tickTimer: 0,
          life: def.duration || 2.5,
          maxLife: def.duration || 2.5,
          color: '#10b981',
          name: 'poison_cloud',
            isCrit: isCrit
          });
        this.spawnShockwave(tx, ty, '#10b981', 120, 0.2);
        this.playSound('waterMagic');
        break;
      }
      case 'toxic_miasma': {
        const radius = def.baseArea * areaMult;
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: radius,
          damage: damage,
          interval: 0.2,
          tickTimer: 0,
          life: def.duration || 3.5,
          maxLife: def.duration || 3.5,
          color: '#059669',
          name: 'toxic_miasma',
            isCrit: isCrit
          });
        this.spawnShockwave(p.x, p.y, '#34d399', 220, 0.3);
        this.playSound('waterMagic');
        break;
      }
      case 'forbidden_poison_god': {
        this.game.shakeScreen(8, 0.3);
        const radius = def.baseArea * areaMult;
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: radius,
          damage: damage,
          interval: 0.15,
          tickTimer: 0,
          life: 4.5,
          maxLife: 4.5,
          color: '#047857',
          name: 'forbidden_poison_god',
            isCrit: isCrit
          });
        this.spawnShockwave(p.x, p.y, '#6ee7b7', 350, 0.4);
        this.playSound('dimensionSlash');
        break;
      }

      // 26. MAGIC CONVERSION (Grey)
      case 'magic_conversion': {
        const speed = def.baseSpeed;
        for (let i = 0; i < 2; i++) {
          const a = targetAngle + (i - 0.5) * 0.2;
          this.projectiles.push({
            type: 'magic_conversion',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            radius: 8 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#a855f7',
            pierce: def.pierce,
            hitTargets: new Set(),
            life: 1.8
          });
        }
        this.playSound('slash');
        break;
      }
      case 'substance_transmute': {
        const speed = def.baseSpeed;
        for (let i = 0; i < 5; i++) {
          const a = targetAngle + (i - 2) * 0.18;
          this.projectiles.push({
            type: 'substance_transmute',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            radius: 10 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#c084fc',
            pierce: def.pierce,
            hitTargets: new Set(),
            life: 2.2
          });
        }
        this.playSound('fireball');
        break;
      }
      case 'genesis_transmutation': {
        this.game.shakeScreen(10, 0.35);
        this.spawnShockwave(p.x, p.y, '#f472b6', 420, 0.4);
        this.spawnShockwave(p.x, p.y, '#38bdf8', 300, 0.3);
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#e879f9',
          knockback: 75,
          life: 0.35,
          maxLife: 0.35,
          hasHit: false
        });
        this.playSound('dimensionSlash');
        break;
      }

      // 27. BULL GOLEM (Henry Levolant)
      case 'bull_golem': {
        this.projectiles.push({
          type: 'bull_golem',
          x: p.x,
          y: p.y,
          vx: Math.cos(targetAngle) * def.baseSpeed,
          vy: Math.sin(targetAngle) * def.baseSpeed,
          radius: 16 * areaMult,
          damage: damage,
          isCrit: isCrit,
          color: '#b45309',
          pierce: 99,
          hitTargets: new Set(),
          life: 2.0
        });
        this.playSound('dash');
        break;
      }
      case 'black_bull_rampage': {
        this.game.shakeScreen(6, 0.2);
        [-0.15, 0.15].forEach(angOff => {
          this.projectiles.push({
            type: 'bull_golem',
            x: p.x,
            y: p.y,
            vx: Math.cos(targetAngle + angOff) * def.baseSpeed,
            vy: Math.sin(targetAngle + angOff) * def.baseSpeed,
            radius: 22 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#92400e',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.4
          });
        });
        this.playSound('slash');
        break;
      }
      case 'raging_bull_fortress': {
        this.game.shakeScreen(14, 0.4);
        this.spawnShockwave(p.x, p.y, '#78350f', 480, 0.45);
        this.spawnShockwave(p.x, p.y, '#f59e0b', 320, 0.3);
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#d97706',
          knockback: 90,
          life: 0.4,
          maxLife: 0.4,
          hasHit: false
        });
        this.playSound('dimensionSlash');
        break;
      }

      // 28. FLOWER CANNON (Mimosa Vermillion)
      case 'flower_cannon': {
        for (let i = 0; i < 2; i++) {
          const a = targetAngle + (i - 0.5) * 0.12;
          this.projectiles.push({
            type: 'flower_cannon',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * def.baseSpeed,
            vy: Math.sin(a) * def.baseSpeed,
            radius: 8 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#f43f5e',
            pierce: def.pierce,
            hitTargets: new Set(),
            life: 2.0
          });
        }
        this.playSound('windBlade');
        break;
      }
      case 'princess_healing': {
        const radius = def.baseArea * areaMult;
        this.aoeZones.push({
          x: p.x,
          y: p.y,
          radius: radius,
          damage: damage,
          interval: 0.2,
          tickTimer: 0,
          life: def.duration || 3.5,
          maxLife: def.duration || 3.5,
          color: '#fb7185',
          name: 'princess_healing',
            isCrit: isCrit
          });
        p.hp = Math.min(p.maxHp, p.hp + 6);
        this.spawnShockwave(p.x, p.y, '#fda4af', 240, 0.3);
        this.playSound('waterMagic');
        break;
      }
      case 'eden_floral_domain': {
        this.game.shakeScreen(9, 0.35);
        this.spawnShockwave(p.x, p.y, '#f43f5e', 440, 0.4);
        p.hp = Math.min(p.maxHp, p.hp + 20);
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          this.projectiles.push({
            type: 'flower_cannon',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * 520,
            vy: Math.sin(a) * 520,
            radius: 12 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#fda4af',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.5
          });
        }
        this.playSound('divineLight');
        break;
      }

      // 29. STEEL DRILLS (Klaus Lunettes)
      case 'steel_drills': {
        for (let i = 0; i < 3; i++) {
          const a = targetAngle + (i - 1) * 0.15;
          this.projectiles.push({
            type: 'steel_drills',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * def.baseSpeed,
            vy: Math.sin(a) * def.baseSpeed,
            radius: 9 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#94a3b8',
            pierce: def.pierce,
            hitTargets: new Set(),
            life: 1.8
          });
        }
        this.playSound('slash');
        break;
      }
      case 'whirlwind_drill': {
        for (let i = 0; i < 5; i++) {
          const a = targetAngle + (i - 2) * 0.18;
          this.projectiles.push({
            type: 'steel_drills',
            x: p.x,
            y: p.y,
            vx: Math.cos(a) * def.baseSpeed,
            vy: Math.sin(a) * def.baseSpeed,
            radius: 14 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#cbd5e1',
            pierce: 99,
            hitTargets: new Set(),
            life: 2.2
          });
        }
        this.playSound('slash');
        break;
      }
      case 'absolute_steel_colossus': {
        this.game.shakeScreen(12, 0.35);
        this.spawnShockwave(p.x, p.y, '#e2e8f0', 460, 0.4);
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#94a3b8',
          knockback: 85,
          life: 0.35,
          maxLife: 0.35,
          hasHit: false
        });
        this.playSound('dimensionSlash');
        break;
      }

      // 30. EARTH GOLEM (Sol Marron)
      case 'earth_golem': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x + Math.cos(targetAngle) * 45,
          y: p.y + Math.sin(targetAngle) * 45,
          radius: radius,
          arc: Math.PI * 0.9,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#d97706',
          knockback: 60,
          life: 0.25,
          maxLife: 0.25,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#d97706', 150, 0.2);
        this.playSound('slash');
        break;
      }
      case 'mountain_smash': {
        this.game.shakeScreen(8, 0.25);
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 1.5,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#b45309',
          knockback: 75,
          life: 0.3,
          maxLife: 0.3,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#b45309', 280, 0.3);
        this.playSound('slash');
        break;
      }
      case 'terra_titan_earthquake': {
        this.game.shakeScreen(15, 0.45);
        this.spawnShockwave(p.x, p.y, '#b45309', 520, 0.45);
        this.spawnShockwave(p.x, p.y, '#f59e0b', 360, 0.35);
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#92400e',
          knockback: 95,
          life: 0.45,
          maxLife: 0.45,
          hasHit: false
        });
        this.playSound('dimensionSlash');
        break;
      }
      case 'spatial_rupture': {
        const count = 2 + Math.floor(level / 2);
        for (let i = 0; i < count; i++) {
          const spread = (i - (count - 1) / 2) * 0.22;
          const angle = targetAngle + spread;
          const spd = 460;
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            radius: 12 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#a855f7',
            borderColor: '#1e1b4b',
            pierce: 3,
            life: 1.5,
            type: 'spatial_bone'
          });
        }
        this.playSound('shoot');
        break;
      }

      case 'absolute_spatial_domain': {
        const radius = def.baseArea * areaMult;
        this.spawnShockwave(p.x, p.y, '#9333ea', 380, 0.45);
        this.spawnShockwave(p.x, p.y, '#18181b', 260, 0.35);
        this.game.shakeScreen(9, 0.3);
        const nearby = this.game.getEnemiesNear(p.x, p.y, radius);
        for (const e of nearby) {
          if (e && !e.isDead && e.hp > 0) {
            this.applyDamage(e, damage, isCrit, '#a855f7');
            e.speed = (e.speed || 100) * 0.3;
          }
        }
        for (let a = 0; a < 8; a++) {
          const angle = (Math.PI * 2 / 8) * a;
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 520,
            vy: Math.sin(angle) * 520,
            radius: 14 * areaMult,
            damage: Math.round(damage * 0.85),
            isCrit: isCrit,
            color: '#c084fc',
            borderColor: '#581c87',
            pierce: 99,
            life: 1.8,
            type: 'spatial_bone'
          });
        }
        this.playSound('dimensionSlash');
        break;
      }

      case 'blood_beasts': {
        const count = 2 + Math.floor(level / 2);
        const targets = this.getNearestEnemies(p.x, p.y, count);
        for (let i = 0; i < count; i++) {
          const target = targets[i];
          const angle = target ? Math.atan2(target.y - p.y, target.x - p.x) : (targetAngle + (i - 1) * 0.3);
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 440,
            vy: Math.sin(angle) * 440,
            radius: 14 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#dc2626',
            borderColor: '#450a0a',
            pierce: 2,
            life: 1.4,
            type: 'blood_beast'
          });
        }
        if (p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + 2);
        this.playSound('shoot');
        break;
      }

      case 'red_beast_crimson_curse': {
        const radius = def.baseArea * areaMult;
        this.spawnShockwave(p.x, p.y, '#dc2626', 420, 0.45);
        this.game.shakeScreen(8, 0.25);
        const nearby = this.game.getEnemiesNear(p.x, p.y, radius);
        let hits = 0;
        for (const e of nearby) {
          if (e && !e.isDead && e.hp > 0) {
            this.applyDamage(e, damage, isCrit, '#ef4444');
            hits++;
          }
        }
        if (hits > 0 && p.hp < p.maxHp) {
          p.hp = Math.min(p.maxHp, p.hp + Math.min(25, hits * 3));
        }
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 / 6) * i;
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 480,
            vy: Math.sin(angle) * 480,
            radius: 16 * areaMult,
            damage: Math.round(damage * 0.9),
            isCrit: isCrit,
            color: '#ef4444',
            borderColor: '#7f1d1d',
            pierce: 5,
            life: 1.6,
            type: 'blood_beast'
          });
        }
        this.playSound('dimensionSlash');
        break;
      }

      case 'heavy_gravity': {
        const nearest = this.getNearestEnemies(p.x, p.y, 1);
        const gx = nearest.length > 0 ? nearest[0].x : p.x + Math.cos(targetAngle) * 160;
        const gy = nearest.length > 0 ? nearest[0].y : p.y + Math.sin(targetAngle) * 160;
        const radius = def.baseArea * areaMult;
        this.spawnShockwave(gx, gy, '#450a0a', 280, 0.4);
        const enemies = this.game.getEnemiesNear(gx, gy, radius);
        for (const e of enemies) {
          if (e && !e.isDead && e.hp > 0) {
            this.applyDamage(e, damage, isCrit, '#78350f');
            const ddx = gx - e.x;
            const ddy = gy - e.y;
            const ddist = Math.hypot(ddx, ddy) || 1;
            e.x += (ddx / ddist) * 40;
            e.y += (ddy / ddist) * 40;
          }
        }
        this.game.shakeScreen(6, 0.2);
        this.playSound('meteor');
        break;
      }

      case 'singularity_black_hole': {
        const nearest = this.getNearestEnemies(p.x, p.y, 1);
        const gx = nearest.length > 0 ? nearest[0].x : p.x + Math.cos(targetAngle) * 200;
        const gy = nearest.length > 0 ? nearest[0].y : p.y + Math.sin(targetAngle) * 200;
        const radius = def.baseArea * areaMult;
        this.spawnShockwave(gx, gy, '#09090b', 350, 0.5);
        this.spawnShockwave(gx, gy, '#7f1d1d', 450, 0.55);
        this.game.shakeScreen(12, 0.35);
        const enemies = this.game.getEnemiesNear(gx, gy, radius);
        for (const e of enemies) {
          if (e && !e.isDead && e.hp > 0) {
            this.applyDamage(e, damage, isCrit, '#dc2626');
            const ddx = gx - e.x;
            const ddy = gy - e.y;
            const ddist = Math.hypot(ddx, ddy) || 1;
            e.x += (ddx / ddist) * 90;
            e.y += (ddy / ddist) * 90;
          }
        }
        this.playSound('dimensionSlash');
        break;
      }

      case 'phoenix_feather': {
        const count = 3 + Math.floor(level / 2);
        for (let i = 0; i < count; i++) {
          const spread = (i - (count - 1) / 2) * 0.25;
          const angle = targetAngle + spread;
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 450,
            vy: Math.sin(angle) * 450,
            radius: 12 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#f97316',
            borderColor: '#ea580c',
            pierce: 2,
            life: 1.4,
            type: 'phoenix_feather'
          });
        }
        if (p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + 1.5);
        this.playSound('shoot');
        break;
      }

      case 'eternal_phoenix_inferno': {
        const radius = def.baseArea * areaMult;
        this.spawnShockwave(p.x, p.y, '#f97316', 420, 0.4);
        this.game.shakeScreen(8, 0.25);
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI * 2 / 10) * i;
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 460,
            vy: Math.sin(angle) * 460,
            radius: 15 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: '#fbbf24',
            borderColor: '#c2410c',
            pierce: 6,
            life: 1.8,
            type: 'phoenix_feather'
          });
        }
        if (p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + 8);
        this.playSound('meteor');
        break;
      }

      case 'copy_spell_storm': {
        const colors = ['#f97316', '#06b6d4', '#22c55e', '#eab308'];
        const count = 4 + Math.floor(level / 2);
        for (let i = 0; i < count; i++) {
          const spread = (i - (count - 1) / 2) * 0.2;
          const angle = targetAngle + spread;
          const clr = colors[i % colors.length];
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * (420 + (i % 2) * 60),
            vy: Math.sin(angle) * (420 + (i % 2) * 60),
            radius: 11 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: clr,
            borderColor: '#ffffff',
            pierce: 2,
            life: 1.5,
            type: 'elemental_orb'
          });
        }
        this.playSound('shoot');
        break;
      }

      case 'all_magic_omnislash': {
        const colors = ['#f97316', '#06b6d4', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#38bdf8', '#f59e0b'];
        this.spawnShockwave(p.x, p.y, '#a855f7', 440, 0.45);
        this.game.shakeScreen(9, 0.28);
        for (let i = 0; i < 16; i++) {
          const angle = (Math.PI * 2 / 16) * i;
          const clr = colors[i % colors.length];
          this.projectiles.push({
            x: p.x,
            y: p.y,
            vx: Math.cos(angle) * 500,
            vy: Math.sin(angle) * 500,
            radius: 14 * areaMult,
            damage: damage,
            isCrit: isCrit,
            color: clr,
            borderColor: '#ffffff',
            pierce: 99,
            life: 1.8,
            type: 'elemental_orb'
          });
        }
        this.playSound('dimensionSlash');
        break;
      }

      case 'beast_claws': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 0.85,
          facingAngle: targetAngle,
          damage: damage,
          isCrit: isCrit,
          color: '#ea580c',
          knockback: 65,
          life: 0.22,
          maxLife: 0.22,
          hasHit: false
        });
        this.playSound('slash');
        break;
      }

      case 'mythic_beast_rampage': {
        const radius = def.baseArea * areaMult;
        this.slashes.push({
          x: p.x,
          y: p.y,
          radius: radius,
          arc: Math.PI * 2,
          facingAngle: 0,
          damage: damage,
          isCrit: isCrit,
          color: '#c2410c',
          knockback: 100,
          life: 0.35,
          maxLife: 0.35,
          hasHit: false
        });
        this.spawnShockwave(p.x, p.y, '#ea580c', 360, 0.35);
        this.game.shakeScreen(10, 0.28);
        this.playSound('dimensionSlash');
        break;
      }

    }
  }

  spawnShockwave(x, y, color, speed, life) {
    this.shockwaves.push({
      x: x,
      y: y,
      radius: 10,
      speed: speed,
      color: color,
      life: life,
      maxLife: life
    });
  }

  applyDamage(enemy, amount, isCrit, color) {
    const p = this.game.player;
    const playerCrit = p ? Math.min(1.0, Math.max(0, p.critChance || 0)) : 0;

    // Independent Per-Hit Critical Strike Roll (Ensures 23% means ~23% of hits, not 100% of entire 4.5s spells/pierces)
    let actualCrit = false;
    if (playerCrit > 0) {
      if (isCrit === true) {
        actualCrit = true; // Guaranteed crit from special proc
      } else {
        actualCrit = Math.random() < playerCrit;
      }
    }

    if (actualCrit) {
      const critMult = Math.min(3.0, 1.75 + ((p && p.critDmgBonus) || 0));
      amount = Math.round(amount * critMult);
    }

    if (enemy.isShielding) {
      amount = Math.max(1, Math.round(amount * 0.25));
    }

    // Boss Phase 2 Enrage & Enrage Shield
    if (enemy.enrageShieldTimer > 0) {
      amount = Math.max(1, Math.round(amount * 0.10));
      if (Math.random() < 0.4) {
        this.floatingTexts.push({
          x: enemy.x + (Math.random() - 0.5) * 30,
          y: enemy.y - 35,
          text: 'BẤT TỬ CUỒNG NỘ!',
          color: '#facc15',
          size: 16,
          life: 0.65
        });
      }
    } else if (enemy.isBoss && enemy.isEnraged) {
      // Vỏ Bọc Ma Thần: giảm 25% sát thương nhận vào
      amount = Math.max(1, Math.round(amount * 0.75));
    }

    // Boss Damage Reduction & Anti-oneshot Cap: đòn đánh đơn lẻ không thể gây quá 6% maxHp của Boss
    if (enemy.isBoss && enemy.maxHp > 0) {
      amount = Math.min(amount, Math.ceil(enemy.maxHp * 0.06));
    }

    enemy.hp -= amount;
    enemy.hitFlashTimer = 0.08;
    this.playSound('hit');

    // Special Character Trait Effects on hit
    if (this.game.player) {
      if (this.game.player.charId === 'nacht' && Math.random() < 0.18) {
        const heal = Math.min(6, Math.ceil(amount * 0.05));
        this.game.player.hp = Math.min(this.game.player.maxHp, this.game.player.hp + heal);
      }
      if (this.game.player.charId === 'mimosa' && Math.random() < 0.15) {
        this.game.player.hp = Math.min(this.game.player.maxHp, this.game.player.hp + 2);
      }
    }

    // Erase enemy projectiles near hit if anti-magic/slash
    if (this.game.enemyManager && this.game.enemyManager.enemyProjectiles && this.game.enemyManager.enemyProjectiles.length > 0) {
      const eProjs = this.game.enemyManager.enemyProjectiles;
      for (let ep = eProjs.length - 1; ep >= 0; ep--) {
        if (Math.hypot(eProjs[ep].x - enemy.x, eProjs[ep].y - enemy.y) < 70) {
          this.spawnImpactParticles(eProjs[ep].x, eProjs[ep].y, '#38bdf8', 4);
          eProjs.splice(ep, 1);
        }
      }
    }

    this.floatingTexts.push({
      x: enemy.x + (Math.random() - 0.5) * 18,
      y: enemy.y - 12,
      text: actualCrit ? `${amount} CRIT!` : `${amount}`,
      color: actualCrit ? '#facc15' : (color || '#ffffff'),
      size: actualCrit ? 18 : 13,
      life: 0.65
    });

    if (enemy.hp <= 0 && !enemy.isDead) {
      enemy.isDead = true;
      this.game.onEnemyKilled(enemy);
      this.spawnImpactParticles(enemy.x, enemy.y, '#38bdf8', 10);
    }
  }

  getNearestEnemies(x, y, count) {
    const list = (this.game.enemies || []).filter(e => e && !e.isDead && e.hp > 0);
    list.sort((a, b) => {
      const d1 = (a.x - x) ** 2 + (a.y - y) ** 2;
      const d2 = (b.x - x) ** 2 + (b.y - y) ** 2;
      return d1 - d2;
    });
    return list.slice(0, count);
  }

  spawnImpactParticles(x, y, color, count = 5) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 80;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 2.5,
        color: color,
        life: 0.25 + Math.random() * 0.15
      });
    }
  }

  // =========================================================================
  // HIGH-OCTANE ANIME SPELL & VFX RENDERER (Canvas 2D Path Engine)
  // =========================================================================
  draw(ctx) {
    const tick = (this.game && this.game.tick) ? this.game.tick : (performance.now() * 0.001);
    
    // 1. AoE Magic Circles & Ground Runes (Dưới cùng)
    this.drawAoEZones(ctx, tick);

    // 2. Shockwaves (Sóng xung kích đa tầng)
    this.drawShockwaves(ctx, tick);

    // 3. Lightning Chains (Lôi ma pháp liên hoàn)
    this.drawLightningChains(ctx, tick);

    // 3.5. Sylph Orbiting Spirits (Tinh linh hộ vệ bay xung quanh người chơi)
    this.drawSylphOrbitingSpirits(ctx, tick);

    // 4. Projectiles (Đạn ma pháp & Tinh linh có vệt sáng)
    this.drawProjectiles(ctx, tick);

    // 5. Crescent Slashes (Nhát chém hình cung trăng phát sáng)
    this.drawSlashes(ctx, tick);

    // 6. Impact Particles & Mana Embers
    this.drawParticles(ctx, tick);

    // 7. Floating Damage Texts
    this.drawFloatingTexts(ctx);
  }

  // -------------------------------------------------------------------------
  // 1. AOE ZONES & ROTATING GRAND MAGIC CIRCLES (Pháp Trận Ma Thuật)
  // -------------------------------------------------------------------------
  drawAoEZones(ctx, tick) {
    for (const zone of this.aoeZones) {
      const alpha = Math.max(0, Math.min(1, zone.life / (zone.maxLife || 1)));
      const r = zone.radius;
      const color = zone.color || '#38bdf8';

      ctx.save();
      ctx.translate(zone.x, zone.y);

      // A. Ground Mana Floor Gradient Fill
      ctx.globalAlpha = alpha * 0.22;
      const floorGrad = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
      floorGrad.addColorStop(0, color);
      floorGrad.addColorStop(0.8, color);
      floorGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // B. Outer Rotating Grand Magic Seal (Vành ma trận quay theo chiều kim đồng hồ)
      ctx.save();
      ctx.rotate(tick * 0.04);
      ctx.globalAlpha = alpha * 0.75;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Runic Ticks & Clover Leaves
      ctx.lineWidth = 1.2;
      const ticksCount = 12;
      for (let i = 0; i < ticksCount; i++) {
        const a = (i * Math.PI * 2) / ticksCount;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cos * (r - 6), sin * (r - 6));
        ctx.lineTo(cos * (r + 4), sin * (r + 4));
        ctx.stroke();
      }
      ctx.restore();

      // C. Inscribed Counter-Rotating Geometric Octagram / Star (Pháp trận hình sao đảo chiều)
      ctx.save();
      ctx.rotate(-tick * 0.06);
      ctx.globalAlpha = alpha * 0.85;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;

      const starPoints = 8;
      const outerR = r * 0.74;
      const innerR = r * 0.38;
      ctx.beginPath();
      for (let i = 0; i < starPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / starPoints;
        const px = Math.cos(a) * radius;
        const py = Math.sin(a) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner Concentric Glyph Ring
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // D. Elemental Centerpieces for Special AoE Spells
      if (zone.isShadowClaw) {
        // Nacht's Shadow Claws slashing through circle
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        for (let c = -1; c <= 1; c++) {
          ctx.save();
          ctx.translate(c * 14, 0);
          ctx.rotate(-0.35 + c * 0.2);
          ctx.beginPath();
          ctx.moveTo(-4, 22);
          ctx.bezierCurveTo(-8, -4, 0, -28, 6, -34);
          ctx.bezierCurveTo(2, -18, 0, 4, 4, 22);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      } else if (zone.isGiantSword) {
        // Licht's Giant Celestial Origin Greatsword plunging into ground
        ctx.globalAlpha = alpha;
        ctx.save();
        const dropProgress = Math.min(1, (zone.maxLife - zone.life) * 5);
        ctx.translate(0, -60 * (1 - dropProgress));
        // Golden Greatsword Blade
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, 35);
        ctx.lineTo(12, -45);
        ctx.lineTo(-12, -45);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // Crossguard & Pommel
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-22, -48, 44, 7);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, -56, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // 2. MULTI-TIER SHOCKWAVES (Sóng Xung Kích Đa Tầng Phát Sáng)
  // -------------------------------------------------------------------------
  drawShockwaves(ctx, tick) {
    for (const sw of this.shockwaves) {
      const alpha = Math.max(0, sw.life / sw.maxLife);
      const r = sw.radius;
      const color = sw.color || '#f59e0b';

      ctx.save();
      ctx.translate(sw.x, sw.y);

      // Outer Soft Wave Ring
      ctx.globalAlpha = alpha * 0.45;
      ctx.strokeStyle = color;
      ctx.lineWidth = 7 * alpha;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();

      // Sharp Core Brilliant Ring
      ctx.globalAlpha = alpha * 0.95;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5 * alpha;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.97, 0, Math.PI * 2);
      ctx.stroke();

      // 8 Radiating Anime Burst Spikes (Tia xung kích bùng nổ)
      ctx.globalAlpha = alpha * 0.8;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * alpha;
      const burstLen = 14 * alpha;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI * 2) / 8 + sw.life * 2;
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(cos * (r - burstLen), sin * (r - burstLen));
        ctx.lineTo(cos * (r + burstLen), sin * (r + burstLen));
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // 2.5. MAGIC SURVIVAL SPIRIT RING RENDERER (Vòng Tinh Linh Chalk/Brush Ethereal Ring)
  // -------------------------------------------------------------------------
  drawSpiritRing(ctx, x, y, radius, innerRadius, style = 'base', tick = 0, rotAngle = 0) {
    ctx.save();
    ctx.translate(x, y);

    const isFamiliar = style === 'familiar';
    const isBlade = style === 'blade';
    const isMissile = style === 'missile';

    // 1. Soft ethereal aura glow
    const auraR = radius * 1.85;
    const auraGrad = ctx.createRadialGradient(0, 0, innerRadius * 0.5, 0, 0, auraR);
    if (isFamiliar) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      auraGrad.addColorStop(0.35, 'rgba(244, 114, 182, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isBlade) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      auraGrad.addColorStop(0.4, 'rgba(253, 224, 71, 0.45)');
      auraGrad.addColorStop(0.75, 'rgba(52, 211, 153, 0.25)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else if (isMissile) {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      auraGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.55)');
      auraGrad.addColorStop(0.75, 'rgba(16, 185, 129, 0.2)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    } else {
      auraGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      auraGrad.addColorStop(0.4, 'rgba(110, 231, 183, 0.45)');
      auraGrad.addColorStop(0.8, 'rgba(16, 185, 129, 0.15)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    }
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, 0, auraR, 0, Math.PI * 2);
    ctx.fill();

    // 2. Magic Survival Rough Chalk/Brush Ring (Iconic 'O' from Encyclopedia)
    ctx.rotate(rotAngle);
    const midR = (radius + innerRadius) * 0.5;
    const ringThickness = (radius - innerRadius);
    const strokeCount = isFamiliar ? 18 : 12;

    ctx.save();
    ctx.lineCap = 'round';

    // Base glowing ring band
    ctx.strokeStyle = isFamiliar ? '#f472b6' : (isBlade ? '#fef08a' : (isMissile ? '#7dd3fc' : '#a7f3d0'));
    ctx.lineWidth = ringThickness * 0.75;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(0, 0, midR, 0, Math.PI * 2);
    ctx.stroke();

    // Overlapping jittered textured strokes (Pure white & spectral highlights)
    ctx.strokeStyle = '#ffffff';
    for (let s = 0; s < strokeCount; s++) {
      const aStart = (s / strokeCount) * Math.PI * 2 + Math.sin(s * 3.7 + tick * 2) * 0.12;
      const aLen = (Math.PI * 2 / strokeCount) * (1.35 + ((s % 3) * 0.25));
      const rOffset = Math.sin(s * 5.1 + tick * 3) * (ringThickness * 0.25);
      const strokeW = (ringThickness * 0.38) + ((s % 4) * 0.55);

      ctx.lineWidth = strokeW;
      ctx.globalAlpha = 0.7 + ((s % 2) * 0.28);
      ctx.beginPath();
      ctx.arc(0, 0, midR + rOffset, aStart, aStart + aLen);
      ctx.stroke();

      // Bristling tangential spiritual sparks / feather fibers
      if (s % 2 === 0) {
        const fiberAng = aStart + aLen * 0.5;
        const fx = Math.cos(fiberAng) * (midR + rOffset);
        const fy = Math.sin(fiberAng) * (midR + rOffset);
        const fLen = 3 + (isFamiliar ? 3.5 : 0);
        const fTang = fiberAng + Math.PI / 2 + (Math.sin(s + tick * 4) * 0.4);
        ctx.lineWidth = 1.1;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + Math.cos(fTang) * fLen, fy + Math.sin(fTang) * fLen);
        ctx.stroke();
      }
    }
    ctx.restore();

    // 3. Clear inner hole (Dark / hollow core with faint shimmer)
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.88, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Inner bright rim highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.95, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Special mode details
    if (isBlade) {
      // Ethereal mini sword hovering in the center
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.0;
      const bLen = radius * 1.15;
      ctx.beginPath();
      ctx.moveTo(bLen, 0);
      ctx.lineTo(-bLen * 0.5, -2.5);
      ctx.lineTo(-bLen * 0.5, 2.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else if (isFamiliar) {
      // Swirling center vortex core
      ctx.save();
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius * 0.55, tick * 4, tick * 4 + Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  drawSylphOrbitingSpirits(ctx, tick) {
    const p = this.game.player;
    if (!p || p.hp <= 0) return;

    let spiritCount = 0;
    let orbitR = 52;
    let style = 'base';
    let isFamiliar = false;

    // 1. Tier 3 Super Evolutions
    if (p.weapons && p.weapons['spirit_familiar_overlord']) {
      isFamiliar = true;
      spiritCount = 1;
      orbitR = 60;
      style = 'familiar';
    } else if (p.weapons && p.weapons['spirit_blade_sovereign']) {
      spiritCount = 10;
      orbitR = 84;
      style = 'blade';
    } else if (p.weapons && p.weapons['spirit_storm_empress']) {
      spiritCount = 10;
      orbitR = 84;
      style = 'missile';
    }
    // 2. Tier 2 Evolutions
    else if (p.weapons && p.weapons['spirit_familiar']) {
      isFamiliar = true;
      spiritCount = 1;
      orbitR = 56;
      style = 'familiar';
    } else if (p.weapons && (p.weapons['spirit_magic_blade'] || p.weapons['sylph_tempest_domain'])) {
      spiritCount = 6;
      orbitR = 72;
      style = 'blade';
    } else if (p.weapons && p.weapons['spirit_magic_missile']) {
      spiritCount = 6;
      orbitR = 72;
      style = 'missile';
    }
    // 3. Base weapon
    else if (p.weapons && p.weapons['sylph_spirits']) {
      const item = p.weapons['sylph_spirits'];
      const lv = item.level || 1;
      spiritCount = 1 + lv + (p.charId === 'sylph' ? 1 : 0);
      orbitR = 50 + lv * 2.8;
      style = 'base';
    } else if (p.charId === 'sylph') {
      spiritCount = 2;
      orbitR = 48;
      style = 'base';
    }

    if (spiritCount <= 0) return;

    const rotSpeed = isFamiliar ? 1.8 : (style === 'missile' ? 3.6 : (style === 'blade' ? 3.2 : 2.5));

    // Orbital faint boundary circle
    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = isFamiliar ? '#f472b6' : (style === 'blade' ? '#fef08a' : (style === 'missile' ? '#38bdf8' : '#6ee7b7'));
    ctx.lineWidth = 1.4;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 4, orbitR, orbitR * 0.72, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    for (let i = 0; i < spiritCount; i++) {
      const angle = (tick * rotSpeed) + (i * Math.PI * 2) / spiritCount;
      const sx = p.x + Math.cos(angle) * orbitR;
      const sy = p.y + Math.sin(angle) * (orbitR * 0.72) + Math.sin(tick * 5 + i * 2) * 2.5;

      const r = isFamiliar ? 20 : 9;
      const innerR = isFamiliar ? 9.5 : 4.2;

      this.drawSpiritRing(ctx, sx, sy, r, innerR, style, tick, angle + Math.PI / 2);
    }
  }

  // 3. PROJECTILES (Đạn Ma Pháp, Tinh Linh & Phi Kiếm Có Vệt Sáng)
  // -------------------------------------------------------------------------
  drawProjectiles(ctx, tick) {
    for (const proj of this.projectiles) {
      const r = proj.radius || 12;
      const angle = (proj.vx || proj.vy) ? Math.atan2(proj.vy, proj.vx) : (proj.angle || 0);

      ctx.save();
      ctx.translate(proj.x, proj.y);
      ctx.rotate(angle);

      // Trailing Light Glow (Đuôi vệt sáng năng lượng)
      const trailLen = Math.min(36, Math.hypot(proj.vx, proj.vy) * 0.06);
      if (trailLen > 4) {
        ctx.save();
        const trailGrad = ctx.createLinearGradient(-trailLen, 0, 0, 0);
        trailGrad.addColorStop(0, 'rgba(255,255,255,0)');
        trailGrad.addColorStop(1, proj.color || '#38bdf8');
        ctx.fillStyle = trailGrad;
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.6);
        ctx.lineTo(-trailLen, 0);
        ctx.lineTo(0, r * 0.6);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      switch (proj.type) {
        // SPIRIT BOLT (Tiễn Tinh Linh & Phi Kiếm Ngự Kiếm - Magic Survival Spirit & Telekinetic Sword)
        case 'sylph_spirit_bolt': {
          const isSuper = proj.isSuperEvo;
          const isFamiliar = proj.isFamiliar;
          const isMissile = proj.isMissile;

          // Pure Magic Survival Spirit Missile (Ethereal light comet with chalky wisp texture)
          const coreR = r * 0.65;
          const boltColor = proj.color || (isFamiliar ? '#f472b6' : (isMissile ? '#38bdf8' : '#34d399'));

          // Ethereal Outer Glow
          const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 1.6);
          glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
          glowGrad.addColorStop(0.4, boltColor);
          glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
          ctx.fill();

          // Rough chalk / brush stroke spirit nucleus
          ctx.save();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(0, 0, coreR, 0, Math.PI * 2);
          ctx.stroke();

          // Trailing spiritual brush fibers
          ctx.strokeStyle = boltColor;
          ctx.lineWidth = 1.5;
          for (let f = 0; f < 4; f++) {
            const fAngle = Math.PI + (f - 1.5) * 0.45;
            ctx.beginPath();
            ctx.moveTo(Math.cos(fAngle) * coreR, Math.sin(fAngle) * coreR);
            ctx.lineTo(Math.cos(fAngle) * (r * 1.4), Math.sin(fAngle) * (r * 1.4));
            ctx.stroke();
          }
          ctx.restore();

          // Brilliant White Spark Center
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.15, 0, coreR * 0.55, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // A. WIND SCYTHE (Lưỡi Dao Gió Cực Sắc Yuno)
        case 'wind_scythe': {
          ctx.fillStyle = '#34d399';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.5, 0); // Front sharp tip
          ctx.bezierCurveTo(r * 0.5, -r * 1.3, -r * 0.6, -r * 1.1, -r * 0.9, -r * 0.4);
          ctx.bezierCurveTo(-r * 0.2, 0, -r * 0.2, 0, -r * 0.9, r * 0.4);
          ctx.bezierCurveTo(-r * 0.6, r * 1.1, r * 0.5, r * 1.3, r * 1.5, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Lõi phát quang trắng
          ctx.strokeStyle = '#ecfdf5';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.4, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          break;
        }

        // B. SEA DRAGON (Thủy Long Gầm Rú Noelle - Serpentine Water Dragon)
        case 'sea_dragon': {
          // Dragon Head Silhouette
          ctx.fillStyle = '#38bdf8';
          ctx.strokeStyle = '#e0f2fe';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(r * 1.6, 0); // Snout
          ctx.lineTo(r * 0.8, -r * 0.8); // Brow
          ctx.lineTo(0, -r * 0.9); // Crest horn
          ctx.lineTo(-r * 1.2, -r * 0.5);
          ctx.lineTo(-r * 0.6, 0);
          ctx.lineTo(-r * 1.2, r * 0.5);
          ctx.lineTo(0, r * 0.9);
          ctx.lineTo(r * 0.8, r * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Glowing Dragon Eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.4, -r * 0.3, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#0284c7';
          ctx.beginPath();
          ctx.arc(r * 0.5, -r * 0.3, 1.2, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // C. VALKYRIE LANCE (Thương Xoáy Nước Áp Lực Valkyrie)
        case 'valkyrie_lance': {
          ctx.fillStyle = '#0ea5e9';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 2.0, 0); // Lance tip
          ctx.lineTo(-r * 0.8, -r * 0.7);
          ctx.lineTo(-r * 0.4, 0);
          ctx.lineTo(-r * 0.8, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Spiral Water Ring wrapping around lance
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 0.6, r * 1.1, 0.4, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }

        // D. FIRE FIST / CALIDOS BRACHIUM (Hỏa Sư Quyền Mereoleona)
        case 'fire_fist': {
          // Blazing Fire Aura
          ctx.fillStyle = '#ea580c';
          ctx.beginPath();
          ctx.moveTo(r * 1.4, 0);
          ctx.bezierCurveTo(r * 0.8, -r * 1.2, -r * 0.5, -r * 1.0, -r * 1.3, -r * 0.6);
          ctx.bezierCurveTo(-r * 0.7, 0, -r * 0.7, 0, -r * 1.3, r * 0.6);
          ctx.bezierCurveTo(-r * 0.5, r * 1.0, r * 0.8, r * 1.2, r * 1.4, 0);
          ctx.closePath();
          ctx.fill();

          // White-hot Molten Core
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(r * 0.2, 0, r * 0.55, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // E. FIREBALL (Hỏa Cầu Bóng Chày Magna)
        case 'fireball': {
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
          ctx.fill();

          // Curved baseball flame stitch
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(-r * 0.3, 0, r * 0.7, -Math.PI / 3, Math.PI / 3);
          ctx.stroke();
          break;
        }

        // F. LIGHT SWORD (Gươm Quang Ma Pháp Patri)
        case 'light_sword': {
          // Radiant Light Rapier
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(r * 2.2, 0); // Tip
          ctx.lineTo(-r * 1.0, -r * 0.45);
          ctx.lineTo(-r * 0.7, 0);
          ctx.lineTo(-r * 1.0, r * 0.45);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Crossguard light star
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(-r * 0.7, 0, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // G. ORIGIN SWORD (Chân Kiếm Khai Nguyên Licht)
        case 'origin_sword': {
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 2.0, 0);
          ctx.lineTo(-r * 0.8, -r * 0.5);
          ctx.lineTo(-r * 1.2, 0);
          ctx.lineTo(-r * 0.8, r * 0.5);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Runic Fuller line
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(r * 1.0, 0);
          ctx.lineTo(-r * 0.6, 0);
          ctx.stroke();
          break;
        }

        // H. SHADOW WOLF (Á Ma Canis Nacht)
        case 'shadow_wolf': {
          ctx.fillStyle = '#09090b';
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.5, 0); // Wolf Snout
          ctx.lineTo(r * 0.6, -r * 0.7); // Forehead
          ctx.lineTo(0, -r * 1.1); // Ear
          ctx.lineTo(-r * 1.0, -r * 0.4);
          ctx.lineTo(-r * 0.4, 0);
          ctx.lineTo(-r * 1.0, r * 0.4);
          ctx.lineTo(0, r * 1.1); // Ear
          ctx.lineTo(r * 0.6, r * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Amethyst Glowing Eyes
          ctx.fillStyle = '#c084fc';
          ctx.beginPath();
          ctx.arc(r * 0.4, -r * 0.3, 1.8, 0, Math.PI * 2);
          ctx.arc(r * 0.4, r * 0.3, 1.8, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // I. SPATIAL BONE JAVELIN (Cốt Ma Thương Zenon)
        case 'spatial_bone': {
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#9333ea';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(r * 2.2, 0);
          ctx.lineTo(-r * 1.2, -r * 0.4);
          ctx.lineTo(-r * 0.8, 0);
          ctx.lineTo(-r * 1.2, r * 0.4);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Spatial void block orbiting
          ctx.fillStyle = '#09090b';
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(-4, -4, 8, 8);
          ctx.fillRect(-4, -4, 8, 8);
          break;
        }

        // J. BLOOD BEAST (Huyết Ma Thú Vanica & Megicula)
        case 'blood_beast': {
          ctx.fillStyle = '#991b1b';
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(r * 1.6, 0);
          ctx.lineTo(r * 0.5, -r * 0.8);
          ctx.lineTo(-r * 1.0, -r * 0.5);
          ctx.lineTo(-r * 0.4, 0);
          ctx.lineTo(-r * 1.0, r * 0.5);
          ctx.lineTo(r * 0.5, r * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Crimson Blood Core
          ctx.fillStyle = '#f87171';
          ctx.beginPath();
          ctx.arc(r * 0.4, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // K. PHOENIX FEATHER (Hỏa Điểu Vũ Fuegoleon)
        case 'phoenix_feather': {
          ctx.fillStyle = '#ea580c';
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0);
          ctx.bezierCurveTo(r * 0.5, -r * 0.9, -r * 0.8, -r * 0.6, -r * 1.2, 0);
          ctx.bezierCurveTo(-r * 0.8, r * 0.6, r * 0.5, r * 0.9, r * 1.8, 0);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Golden quill spine
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(r * 1.5, 0);
          ctx.lineTo(-r * 1.0, 0);
          ctx.stroke();
          break;
        }

        // L. STEEL DRILL (Cương Thiết Khoan Klaus)
        case 'steel_drills': {
          ctx.fillStyle = '#94a3b8';
          ctx.strokeStyle = '#f8fafc';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(r * 1.8, 0);
          ctx.lineTo(-r * 1.0, -r * 0.8);
          ctx.lineTo(-r * 0.7, 0);
          ctx.lineTo(-r * 1.0, r * 0.8);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          // Spiral steel grooves
          ctx.strokeStyle = '#334155';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(r * 0.8, -r * 0.4);
          ctx.lineTo(r * 0.2, r * 0.5);
          ctx.moveTo(0, -r * 0.6);
          ctx.lineTo(-r * 0.6, r * 0.6);
          ctx.stroke();
          break;
        }

        // M. FLOWER CANNON (Ma Hoa Pháo Mimosa)
        case 'flower_cannon': {
          ctx.fillStyle = '#f472b6';
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 1.5;
          for (let p = 0; p < 4; p++) {
            const a = (p * Math.PI) / 2 + tick * 0.1;
            ctx.beginPath();
            ctx.ellipse(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, r * 0.6, r * 0.35, a, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.fillStyle = '#fbbf24';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // N. BULL GOLEM (Thiết Ngưu Henry)
        case 'bull_golem': {
          ctx.fillStyle = '#0f172a';
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.ellipse(0, 0, r * 1.2, r * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Iron horns
          ctx.fillStyle = '#e2e8f0';
          ctx.beginPath();
          ctx.moveTo(r * 0.6, -r * 0.5);
          ctx.lineTo(r * 1.3, -r * 1.0);
          ctx.lineTo(r * 0.8, -r * 0.2);
          ctx.moveTo(r * 0.6, r * 0.5);
          ctx.lineTo(r * 1.3, r * 1.0);
          ctx.lineTo(r * 0.8, r * 0.2);
          ctx.fill();
          break;
        }

        // O. ALCHEMICAL TRANSMUTATION CRYSTAL (Grey)
        case 'magic_conversion':
        case 'substance_transmute': {
          ctx.fillStyle = '#c084fc';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(r * 1.4, 0);
          ctx.lineTo(0, -r * 0.9);
          ctx.lineTo(-r * 1.2, 0);
          ctx.lineTo(0, r * 0.9);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = 'rgba(255,255,255,0.75)';
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        // P. GENERIC ENERGY COMET ORB (Lõi phát quang trắng)
        default: {
          const color = proj.color || '#38bdf8';
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();

          // White Luminous Core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(r * 0.2, 0, r * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.stroke();
          break;
        }
      }

      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // 4. CRESCENT ANIME SLASHES (Vệt Chém Hình Cung Trăng Uốn Lượn)
  // -------------------------------------------------------------------------
  drawSlashes(ctx, tick) {
    for (const slash of this.slashes) {
      const p = slash.progress || 0;
      const alpha = Math.max(0, 1 - p);
      const r = slash.radius;
      const color = slash.color || '#dc2626';

      ctx.save();
      ctx.translate(slash.x, slash.y);

      // 360-degree Spin Slash (Black Divider 360 & Dimension Slash Vortex)
      if (slash.arc >= Math.PI * 1.9) {
        ctx.rotate(slash.progress * 4);

        // Sweeping Outer Dark Rim
        ctx.globalAlpha = alpha * 0.6;
        ctx.strokeStyle = color;
        ctx.lineWidth = 26 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Spinning Curved Blades
        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle = color;
        for (let b = 0; b < 4; b++) {
          const ba = (b * Math.PI) / 2;
          ctx.save();
          ctx.rotate(ba);
          ctx.beginPath();
          ctx.moveTo(r * 0.3, 0);
          ctx.bezierCurveTo(r * 0.7, r * 0.4, r * 0.9, -r * 0.1, r * 1.08, 0);
          ctx.bezierCurveTo(r * 0.8, -r * 0.3, r * 0.5, -r * 0.2, r * 0.3, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // White Blade Gleam Edge
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.5 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.98, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Directional Crescent Anime Arc (Cung trăng có độ dày vát nhọn 2 đầu)
        const halfArc = slash.arc / 2;
        const startA = slash.facingAngle - halfArc;
        const endA = slash.facingAngle + halfArc;
        const thickness = Math.max(6, r * 0.26 * (1 - p * 0.5));

        // A. Crescent Body Path (Dày ở giữa, nhọn dần ở 2 đầu)
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = color;
        ctx.beginPath();
        // Outer arc
        ctx.arc(0, 0, r + thickness * 0.5, startA, endA, false);
        // Inner arc returning
        ctx.arc(0, 0, r - thickness * 0.5, endA, startA, true);
        ctx.closePath();
        ctx.fill();

        // B. White Sharp Blade Edge (Lưỡi kiếm phát quang trắng sắc lẹm)
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.5 * alpha;
        ctx.beginPath();
        ctx.arc(0, 0, r, startA + 0.05, endA - 0.05, false);
        ctx.stroke();

        // C. Outer Colored Glow Fringe
        ctx.globalAlpha = alpha * 0.4;
        ctx.strokeStyle = color;
        ctx.lineWidth = thickness * 1.2;
        ctx.beginPath();
        ctx.arc(0, 0, r, startA, endA, false);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // 5. LIGHTNING CHAINS (Lôi Điện Ma Pháp Liên Hoàn)
  // -------------------------------------------------------------------------
  drawLightningChains(ctx, tick) {
    for (const lc of this.lightningChains) {
      if (!lc.points || lc.points.length < 2) continue;
      const color = lc.color || '#38bdf8';

      ctx.save();
      // Outer electric glow
      ctx.strokeStyle = color;
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(lc.points[0].x, lc.points[0].y);
      for (let i = 1; i < lc.points.length; i++) {
        const p1 = lc.points[i - 1];
        const p2 = lc.points[i];
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 16;
        const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 16;
        ctx.lineTo(midX, midY);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.stroke();

      // Inner white lightning core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // 6. IMPACT PARTICLES & MANA EMBERS
  // -------------------------------------------------------------------------
  drawParticles(ctx, tick) {
    for (const pt of this.particles) {
      const alpha = Math.max(0, pt.life / (pt.maxLife || 0.4));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = pt.color || '#ffffff';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius || 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // -------------------------------------------------------------------------
  // 7. FLOATING DAMAGE TEXTS (Sát Thương Nảy Sắc Nét)
  // -------------------------------------------------------------------------
  drawFloatingTexts(ctx) {
    for (const ft of this.floatingTexts) {
      ctx.save();
      ctx.font = `bold ${ft.size || 14}px "Nunito", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = ft.color || '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3.5;
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    }
  }
}
window.SPELL_DEFS = SPELL_DEFS;
window.SpellManager = SpellManager;
