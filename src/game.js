// Black Clover: Magic Survivor - Complete Game Engine
// Features 14 Heroes, PokeSurvivor Gacha System, Upgrades Talent Tree, 2 Maps, and 60 FPS Optimization.

const CHARACTERS = {
  // ⭐ THẦN THOẠI (MYTHIC / LEGENDARY) - 5 SAO
  julius: {
    id: 'julius',
    name: 'Julius Novachrono',
    title: 'Ma Pháp Đế (Wizard King)',
    rarity: 'legendary',
    squad: 'Vương Quốc Clover',
    magic: 'Thời Gian Ma Pháp',
    baseHp: 150,
    baseSpeed: 200,
    baseArmor: 0.10,
    startingWeapon: 'chrono_stasis',
    specialTrait: 'Làm chậm toàn bộ quái vật 20% và nhận thêm +30% EXP từ mọi nguồn! Siêu Tiến Hóa Lĩnh Vực Thời Gian!',
    unlocked: false
  },
  lumiere: {
    id: 'lumiere',
    name: 'Lumiere Silvamillion Clover',
    title: 'Đệ Nhất Ma Pháp Đế',
    rarity: 'legendary',
    squad: 'Hoàng Tộc Cổ Đại',
    magic: 'Quang Sáng Tạo Ma Pháp',
    baseHp: 180,
    baseSpeed: 235,
    baseArmor: 0.18,
    startingWeapon: 'light_swords',
    specialTrait: 'Vận tốc ánh sáng cực hạn; Gươm Ánh Sáng có thể Siêu Tiến Hóa Lần 2 thành Thần Quang Vô Tận!',
    unlocked: false
  },
  black_asta: {
    id: 'black_asta',
    name: 'Black Asta (Thần Quỷ)',
    title: 'Ngũ Diệp Thảo Thức Tỉnh',
    rarity: 'legendary',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Kháng Ma Hoàn Toàn',
    baseHp: 190,
    baseSpeed: 235,
    baseArmor: 0.25,
    startingWeapon: 'black_divider',
    specialTrait: 'Khởi đầu ngay với Đại Kiếm Black Divider xoay 360 độ! Tiến hóa lên Tuyệt Ma Kiếm Vô Cực!',
    unlocked: false
  },
  licht: {
    id: 'licht',
    name: 'Licht',
    title: 'Thủ Lĩnh Tộc Elf',
    rarity: 'legendary',
    squad: 'Tộc Yêu Tinh (Elf Clan)',
    magic: 'Chân Kiếm Khai Nguyên',
    baseHp: 165,
    baseSpeed: 230,
    baseArmor: 0.14,
    startingWeapon: 'origin_swords',
    specialTrait: '+35% Diện Tích Lan và +20% Tốc Độ Hồi Chiêu! Kiếm Khai Nguyên trảm diệt vạn vật!',
    unlocked: false
  },
  nacht: {
    id: 'nacht',
    name: 'Nacht Faust',
    title: 'Phó Đoàn Trưởng Hắc Bộc Ngưu',
    rarity: 'legendary',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Hắc Ảnh & Ác Quỷ Đồng Hành',
    baseHp: 165,
    baseSpeed: 215,
    baseArmor: 0.15,
    startingWeapon: 'shadow_hands',
    specialTrait: 'Đòn đánh bóng tối có 18% hút máu (Life Steal); Hợp Thể Ác Quỷ Canis cắn xé toàn map!',
    unlocked: false
  },
  secre: {
    id: 'secre',
    name: 'Secre Swallowtail (Nero)',
    title: 'Hắc Điểu Nghìn Năm',
    rarity: 'legendary',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Phong Ấn Cổ Đại',
    baseHp: 150,
    baseSpeed: 225,
    baseArmor: 0.15,
    startingWeapon: 'sealing_chains',
    specialTrait: 'Xích phong ấn giam cầm kẻ địch; Tự động kích hoạt hồi sinh 1 lần khi cạn máu!',
    unlocked: false
  },
  patry: {
    id: 'patry',
    name: 'Patry (Hắc Hóa)',
    title: 'Hắc Yêu Tinh Ma Nhãn',
    rarity: 'legendary',
    squad: 'Bạch Dạ Ma Nhãn',
    magic: 'Ma Quang Thần Phạt',
    baseHp: 165,
    baseSpeed: 240,
    baseArmor: 0.14,
    startingWeapon: 'light_swords_dark',
    specialTrait: 'Tia thần phạt ma quang hắc ám xuyên thủng mọi chướng ngại vật; +25% Tốc độ di chuyển!',
    unlocked: false
  },

  // ✨ SỬ THI (EPIC) - 4 SAO
  yami: {
    id: 'yami',
    name: 'Yami Sukehiro',
    title: 'Đoàn Trưởng Hắc Bộc Ngưu',
    rarity: 'epic',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Hắc Ma Pháp & Cảm Nhận Khí',
    baseHp: 160,
    baseSpeed: 185,
    baseArmor: 0.12,
    startingWeapon: 'dark_katana',
    specialTrait: '+15% Tỉ lệ Chí Mạng; Khi HP dưới 40% tự động tăng +80% Sát Thương (Vượt Giới Hạn)!',
    unlocked: false
  },
  mereoleona: {
    id: 'mereoleona',
    name: 'Mereoleona Vermillion',
    title: 'Nữ Vương Sư Tử Lửa',
    rarity: 'epic',
    squad: 'Hồng Liên Sư Tử',
    magic: 'Mana Zone & Hỏa Quyền',
    baseHp: 175,
    baseSpeed: 215,
    baseArmor: 0.15,
    startingWeapon: 'calidos_brachium',
    specialTrait: 'Hỏa quyền bạo liệt thiêu rụi mục tiêu; +30% Tốc độ tấn công liên hoàn!',
    unlocked: false
  },
  fuegoleon: {
    id: 'fuegoleon',
    name: 'Fuegoleon Vermillion',
    title: 'Hồng Liên Sư Tử Vương',
    rarity: 'epic',
    squad: 'Hồng Liên Sư Tử',
    magic: 'Hỏa Tinh Linh Salamander',
    baseHp: 160,
    baseSpeed: 185,
    baseArmor: 0.12,
    startingWeapon: 'calidos_brachium',
    specialTrait: '+35% Sát thương hệ Lửa; Tinh Linh Salamander phun hơi thở rồng hủy diệt!',
    unlocked: false
  },
  nozel: {
    id: 'nozel',
    name: 'Nozel Silva',
    title: 'Đoàn Trưởng Ngân Dực',
    rarity: 'epic',
    squad: 'Ngân Dực Đại Bàng',
    magic: 'Thủy Ngân Sáng Tạo',
    baseHp: 145,
    baseSpeed: 190,
    baseArmor: 0.14,
    startingWeapon: 'silver_rain',
    specialTrait: 'Mưa thủy ngân giáng từ trên cao ghim chặt và xuyên thủng mọi lớp giáp kẻ địch!',
    unlocked: false
  },
  charlotte: {
    id: 'charlotte',
    name: 'Charlotte Roselei',
    title: 'Đoàn Trưởng Lam Linh Lộc',
    rarity: 'epic',
    squad: 'Lam Linh Lộc Uyển',
    magic: 'Gai Hồng Xanh Ma Pháp',
    baseHp: 145,
    baseSpeed: 195,
    baseArmor: 0.10,
    startingWeapon: 'briar_whip',
    specialTrait: 'Roi gai hồng quét góc rộng trói chân kẻ địch và làm suy yếu khả năng phòng ngự!',
    unlocked: false
  },
  dorothy: {
    id: 'dorothy',
    name: 'Dorothy Unsworth',
    title: 'Nữ Chúa Mộng Cảnh',
    rarity: 'epic',
    squad: 'Huyễn Tưởng Khổng Tước',
    magic: 'Mộng Cảnh Glamour World',
    baseHp: 140,
    baseSpeed: 200,
    baseArmor: 0.08,
    startingWeapon: 'dream_mist',
    specialTrait: 'Sương mù mộng cảnh ru ngủ quái vật và chuyển hóa chúng thành quà tặng phát nổ!',
    unlocked: false
  },
  william: {
    id: 'william',
    name: 'William Vangeance',
    title: 'Đoàn Trưởng Hoàng Kim',
    rarity: 'epic',
    squad: 'Hoàng Kim Nhật Quang',
    magic: 'Thế Giới Thụ Ma Pháp',
    baseHp: 165,
    baseSpeed: 185,
    baseArmor: 0.14,
    startingWeapon: 'world_tree',
    specialTrait: 'Cây thần trồi lên hút sinh mệnh của quái và hồi phục máu liên tục cho bản thân!',
    unlocked: false
  },
  jack: {
    id: 'jack',
    name: 'Jack the Ripper',
    title: 'Đoàn Trưởng Lục Bọ Ngựa',
    rarity: 'epic',
    squad: 'Lục Bọ Ngựa (Green Mantis)',
    magic: 'Trảm Cắt Ma Pháp',
    baseHp: 150,
    baseSpeed: 215,
    baseArmor: 0.08,
    startingWeapon: 'severing_blades',
    specialTrait: 'Nhát chém thích ứng bỏ qua 100% phòng ngự; Tốc độ chém tăng dần theo thời gian!',
    unlocked: false
  },
  langris: {
    id: 'langris',
    name: 'Langris Vaude',
    title: 'Phó Đoàn Trưởng Hoàng Kim',
    rarity: 'epic',
    squad: 'Hoàng Kim Nhật Quang',
    magic: 'Không Gian Hủy Diệt',
    baseHp: 140,
    baseSpeed: 210,
    baseArmor: 0.08,
    startingWeapon: 'spatial_destruction',
    specialTrait: 'Quả cầu không gian xóa sổ vật chất, nuốt chửng mọi quái vật và đạn pháp!',
    unlocked: false
  },
  henry: {
    id: 'henry',
    name: 'Henry Levolant',
    title: 'Linh Hồn Pháo Đài Ngưu',
    rarity: 'epic',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Cấu Trúc Tái Tổ Hợp',
    baseHp: 175,
    baseSpeed: 165,
    baseArmor: 0.16,
    startingWeapon: 'bull_golem',
    specialTrait: '+40 Máu tối đa & Tự động hút Mana từ mọi quái vật xung quanh trong bán kính 160px!',
    unlocked: false
  },

  // 🌟 HIẾM (RARE) - 3 SAO
  yuno: {
    id: 'yuno',
    name: 'Yuno Grinberryall',
    title: 'Thiên Tài Cỏ 4 Lá',
    rarity: 'rare',
    squad: 'Hoàng Kim Nhật Quang',
    magic: 'Phong Ma Pháp & Sylph',
    baseHp: 130,
    baseSpeed: 220,
    baseArmor: 0.05,
    startingWeapon: 'wind_scythe',
    specialTrait: '+25% Tốc độ di chuyển, +1 tia đạn gió cho mọi chiêu tầm xa. Tinh Linh Sylph hộ mệnh!',
    unlocked: true
  },
  noelle: {
    id: 'noelle',
    name: 'Noelle Silva',
    title: 'Nữ Vương Thủy Long',
    rarity: 'rare',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Thủy Sáng Tạo Ma Pháp',
    baseHp: 140,
    baseSpeed: 185,
    baseArmor: 0.08,
    startingWeapon: 'sea_dragon',
    specialTrait: '+30% Phạm vi ảnh hưởng (AoE); Rồng nước cuốn phăng mọi quái vật!',
    unlocked: true
  },
  luck: {
    id: 'luck',
    name: 'Luck Voltia',
    title: 'Cuồng Lôi Chiến Ma',
    rarity: 'rare',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Lôi Sáng Tạo Ma Pháp',
    baseHp: 130,
    baseSpeed: 240,
    baseArmor: 0.04,
    startingWeapon: 'lightning_boots',
    specialTrait: '+30% Giảm thời gian hồi chiêu (Cooldown Reduction). Sấm sét giáng liên tục!',
    unlocked: false
  },
  leopold: {
    id: 'leopold',
    name: 'Leopold Vermillion',
    title: 'Sư Tử Hỏa Toàn',
    rarity: 'rare',
    squad: 'Hồng Liên Sư Tử',
    magic: 'Hỏa Toàn Ma Pháp',
    baseHp: 155,
    baseSpeed: 190,
    baseArmor: 0.08,
    startingWeapon: 'spiral_flame',
    specialTrait: 'Tia lửa xoáy ốc xuyên thủng mọi kẻ địch, tăng +30% sát thương chí mạng khi máu thấp!',
    unlocked: false
  },
  rill: {
    id: 'rill',
    name: 'Rill Boismortier',
    title: 'Họa Sĩ Thủy Hươu Tuyết',
    rarity: 'rare',
    squad: 'Thủy Hươu Tuyết',
    magic: 'Hội Họa Ma Pháp',
    baseHp: 135,
    baseSpeed: 205,
    baseArmor: 0.06,
    startingWeapon: 'paint_splash',
    specialTrait: 'Vẽ nên quái thú 4 hệ nguyên tố kết hợp, thiêu rụi và đóng băng kẻ địch diện rộng!',
    unlocked: false
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    title: 'Ma Đạo Sĩ Kim Cương',
    rarity: 'rare',
    squad: 'Đế Quốc Diamond',
    magic: 'Khoáng Thạch & Lửa',
    baseHp: 180,
    baseSpeed: 170,
    baseArmor: 0.20,
    startingWeapon: 'diamond_blades',
    specialTrait: 'Lớp giáp kim cương siêu bền bỉ giảm 20% sát thương và phản chấn thương cực mạnh!',
    unlocked: false
  },
  zora: {
    id: 'zora',
    name: 'Zora Ideale',
    title: 'Pháp Sư Cạm Bẫy',
    rarity: 'rare',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Bẫy Tro Ma Pháp',
    baseHp: 145,
    baseSpeed: 195,
    baseArmor: 0.08,
    startingWeapon: 'trap_magic',
    specialTrait: 'Bẫy tro phản x2 sát thương nhận vào, tự động kích nổ khi kẻ địch bao vây!',
    unlocked: false
  },
  gordon: {
    id: 'gordon',
    name: 'Gordon Agrippa',
    title: 'Độc Dược Ma Sư',
    rarity: 'rare',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Kịch Độc Ma Pháp',
    baseHp: 140,
    baseSpeed: 180,
    baseArmor: 0.08,
    startingWeapon: 'poison_cloud',
    specialTrait: '+10% Kháng sát thương; Màn sương độc ăn mòn quái vật và làm chậm 25% tốc chạy!',
    unlocked: false
  },
  grey: {
    id: 'grey',
    name: 'Grey',
    title: 'Huyễn Thuật Biến Hình',
    rarity: 'rare',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Biến Biến Ma Pháp',
    baseHp: 130,
    baseSpeed: 195,
    baseArmor: 0.06,
    startingWeapon: 'magic_conversion',
    specialTrait: '+30% Bán kính nam châm nhặt đồ; Chuyển hóa sát thương địch thành EXP!',
    unlocked: false
  },
  mimosa: {
    id: 'mimosa',
    name: 'Mimosa Vermillion',
    title: 'Thánh Nữ Ma Thảo',
    rarity: 'rare',
    squad: 'Hoàng Kim Nhật Quang',
    magic: 'Thực Vật & Trị Liệu',
    baseHp: 145,
    baseSpeed: 185,
    baseArmor: 0.08,
    startingWeapon: 'flower_cannon',
    specialTrait: '+1.5 HP hồi máu mỗi giây; Pháo hoa thực vật vừa càn quét địch vừa chữa lành vết thương!',
    unlocked: false
  },
  klaus: {
    id: 'klaus',
    name: 'Klaus Lunettes',
    title: 'Thiết Hắc Ma Đạo Sĩ',
    rarity: 'rare',
    squad: 'Hoàng Kim Nhật Quang',
    magic: 'Cương Thiết Sáng Tạo',
    baseHp: 160,
    baseSpeed: 180,
    baseArmor: 0.15,
    startingWeapon: 'steel_drills',
    specialTrait: '+20% Giáp cơ bản; Mũi khoan kim loại nghiền nát và hất tung quái vật cản đường!',
    unlocked: false
  },

  // 🔹 PHỔ THÔNG (COMMON) - 2 SAO
  asta: {
    id: 'asta',
    name: 'Asta',
    title: 'Tam Diệp Thảo',
    rarity: 'common',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Kháng Ma Pháp (Anti-Magic)',
    baseHp: 160,
    baseSpeed: 175,
    baseArmor: 0.15,
    startingWeapon: 'demon_slayer',
    specialTrait: '+15% Kháng Sát Thương & Cận chiến xóa tan ma pháp đạn. Cấp 8+ kích hoạt Black Asta!',
    unlocked: true // Default starting hero
  },
  magna: {
    id: 'magna',
    name: 'Magna Swing',
    title: 'Linh Hồn Rực Lửa',
    rarity: 'common',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Hỏa Cầu Ma Pháp',
    baseHp: 145,
    baseSpeed: 185,
    baseArmor: 0.06,
    startingWeapon: 'magna_fireballs',
    specialTrait: '+25% Sát thương hỏa cầu nổ diện rộng.',
    unlocked: true
  },
  finral: {
    id: 'finral',
    name: 'Finral Roulacase',
    title: 'Người Dẫn Đường',
    rarity: 'common',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Không Gian Ma Pháp',
    baseHp: 135,
    baseSpeed: 215,
    baseArmor: 0.02,
    startingWeapon: 'wind_scythe',
    specialTrait: '+30% Tốc độ di chuyển & Hút đồ từ cực xa.',
    unlocked: false
  },
  charmy: {
    id: 'charmy',
    name: 'Charmy Pappitson',
    title: 'Cừu Bông Ẩm Thực',
    rarity: 'common',
    squad: 'Hắc Bộc Ngưu (Black Bulls)',
    magic: 'Bông Gòn & Thức Ăn',
    baseHp: 150,
    baseSpeed: 175,
    baseArmor: 0.10,
    startingWeapon: 'charmy_cotton',
    specialTrait: 'Liên tục tạo ra đùi thịt hồi phục máu và cừu bông đánh lùi kẻ địch.',
    unlocked: false
  },
  sol: {
    id: 'sol',
    name: 'Sol Marron',
    title: 'Thổ Nữ Chiến Binh',
    rarity: 'common',
    squad: 'Lam Linh Lộc Uyển',
    magic: 'Thổ Sáng Tạo Ma Pháp',
    baseHp: 165,
    baseSpeed: 175,
    baseArmor: 0.12,
    startingWeapon: 'earth_golem',
    specialTrait: 'Triệu hồi Golem Đất Nung càn quét quái vật; Tạo địa chấn làm choáng địch xung quanh!',
    unlocked: false
  },
  // ⭐ TAM HIỆP ĐẾ QUỐC SPADE (DARK TRIAD) - THẦN THOẠI 5 SAO
  zenon: {
    id: 'zenon',
    name: 'Zenon Zogratis',
    title: 'Tam Hiệp Spade · Cốt & Không Gian',
    rarity: 'legendary',
    squad: 'Đế Quốc Spade (Dark Triad)',
    magic: 'Cốt & Không Gian Ma Pháp',
    baseHp: 195,
    baseSpeed: 215,
    baseArmor: 0.22,
    startingWeapon: 'spatial_rupture',
    specialTrait: 'Cốt ma pháp phóng gai xương xuyên thấu tạo vết nứt không gian; Tiến hóa lên Lãnh Địa Không Gian Tuyệt Đối giam hãm vạn vật!',
    unlocked: false
  },
  vanica: {
    id: 'vanica',
    name: 'Vanica Zogratis',
    title: 'Nữ Chúa Hắc Huyết · Ác Ma Megicula',
    rarity: 'legendary',
    squad: 'Đế Quốc Spade (Dark Triad)',
    magic: 'Huyết & Nguyền Ma Pháp',
    baseHp: 180,
    baseSpeed: 235,
    baseArmor: 0.16,
    startingWeapon: 'blood_beasts',
    specialTrait: 'Huyết Thú khát máu cắn xé hồi 15% HP; Lời nguyền Megicula phát tán lây lan giảm 35% tốc độ và giáp của quái vật!',
    unlocked: false
  },
  dante: {
    id: 'dante',
    name: 'Dante Zogratis',
    title: 'Hắc Vương Trọng Lực · Chúa Tể Lucifero',
    rarity: 'legendary',
    squad: 'Đế Quốc Spade (Dark Triad)',
    magic: 'Trọng Lực & Nhục Thể Tái Sinh',
    baseHp: 230,
    baseSpeed: 190,
    baseArmor: 0.28,
    startingWeapon: 'heavy_gravity',
    specialTrait: 'Trọng Lực Vực Sâu đè bẹp quái vật xuống mặt đất; Hồi phục +3 HP mỗi giây và hút quái vào Hố Đen Dị Thường!',
    unlocked: false
  },

  // ✨ TÔNG ĐỒ TỘC YÊU TINH (ELF APOSTLES) - SỬ THI 4 SAO
  fana: {
    id: 'fana',
    name: 'Fana',
    title: 'Tông Đồ Tộc Elf · Hỏa Phượng Hoàng',
    rarity: 'epic',
    squad: 'Tộc Yêu Tinh (Elf Clan)',
    magic: 'Hỏa Phượng Hoàng & Trị Liệu',
    baseHp: 165,
    baseSpeed: 210,
    baseArmor: 0.12,
    startingWeapon: 'phoenix_feather',
    specialTrait: 'Lông vũ phượng hoàng bốc cháy nổ diện rộng; Tự chữa lành vết thương liên tục và tiến hóa Hỏa Ngục Bất Diệt!',
    unlocked: false
  },
  rhya: {
    id: 'rhya',
    name: 'Rhya',
    title: 'Tông Đồ Thấu Suốt · Mô Phỏng Vạn Thuật',
    rarity: 'epic',
    squad: 'Tộc Yêu Tinh (Elf Clan)',
    magic: 'Mô Phỏng Ma Pháp (Copy Magic)',
    baseHp: 155,
    baseSpeed: 220,
    baseArmor: 0.10,
    startingWeapon: 'copy_spell_storm',
    specialTrait: 'Bão sao chép ma pháp ngẫu nhiên phóng đồng loạt hỏa, băng, lôi và phong; Tiến hóa Vạn Thuật Tề Phát hủy diệt map!',
    unlocked: false
  },
  vetto: {
    id: 'vetto',
    name: 'Vetto',
    title: 'Tuyệt Vọng Thần Thú Tộc Elf',
    rarity: 'epic',
    squad: 'Tộc Yêu Tinh (Elf Clan)',
    magic: 'Ma Thú Tuyệt Vọng Ma Pháp',
    baseHp: 210,
    baseSpeed: 200,
    baseArmor: 0.20,
    startingWeapon: 'beast_claws',
    specialTrait: 'Càng mất máu sát thương và giáp càng tăng vọt; Móng vuốt thần thú cào xé hất tung kẻ địch trong góc rộng!',
    unlocked: false
  },

};

const MAPS = {
  clover_plains: {
    id: 'clover_plains',
    name: 'Vương Quốc Clover (Clover Plains)',
    desc: 'Đồng cỏ thần bí và tàn tích cổ đại nơi các đạo tặc và giáo phái Bạch Dạ lộng hành.',
    badge: 'MAP 1 - DỄ TIẾP CẬN',
    boss: 'Zagred (Word Soul Devil)'
  },
  underworld_palace: {
    id: 'underworld_palace',
    name: 'Đại Ma Cung Minh Giới (Underworld Magma)',
    desc: 'Lãnh địa nham thạch hắc ám ngập tràn hỏa khuyển và ma vương tối cao Lucifero!',
    badge: 'MAP 2 - THỬ THÁCH MA GIỚI',
    boss: 'Lucifero (Chúa Tể Ác Quỷ)'
  }
};

const MAP_DIFFICULTIES = {
  normal: {
    id: 'normal',
    name: 'Bình Thường',
    icon: '🟢',
    badge: 'CHUẨN (1.0x MÁU)',
    color: '#4ade80',
    hpMult: 1.0,
    bossHpMult: 1.0,
    dmgMult: 1.0,
    speedMult: 1.0,
    rewardMult: 1.0,
    desc: 'Độ khó tiêu chuẩn, quái và boss theo chỉ số mặc định.'
  },
  nightmare: {
    id: 'nightmare',
    name: 'Ác Mộng',
    icon: '🟡',
    badge: 'KHÓ (1.8x MÁU · +50% THƯỞNG)',
    color: '#fbbf24',
    hpMult: 1.8,
    bossHpMult: 1.8,
    dmgMult: 1.25,
    speedMult: 1.10,
    rewardMult: 1.5,
    desc: 'Quái vật và Boss trâu hơn 1.8 lần, sát thương +25%, thưởng +50% Vàng & EXP!'
  },
  hell: {
    id: 'hell',
    name: 'Địa Ngục',
    icon: '🔴',
    badge: 'ĐỊA NGỤC (3.0x MÁU · +120% THƯỞNG)',
    color: '#f87171',
    hpMult: 3.0,
    bossHpMult: 3.0,
    dmgMult: 1.50,
    speedMult: 1.20,
    rewardMult: 2.2,
    desc: 'Lũ ác quỷ điên cuồng trâu gấp 3.0 lần! Sát thương +50%, thưởng +120% Vàng & EXP!'
  },
  chaos: {
    id: 'chaos',
    name: 'Hỗn Mang',
    icon: '🟣',
    badge: 'HỖN MANG (5.0x MÁU · +250% THƯỞNG)',
    color: '#c084fc',
    hpMult: 5.0,
    bossHpMult: 5.0,
    dmgMult: 2.0,
    speedMult: 1.30,
    rewardMult: 3.5,
    desc: 'Độ khó cực hạn! Quái và Boss trâu gấp 5.0 lần! Thưởng khủng +250% Vàng & EXP!'
  }
};
window.MAP_DIFFICULTIES = MAP_DIFFICULTIES;


const DEFAULT_KEYBINDS = {
  up: 'KeyW',
  down: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
  dash: 'Space',
  stats: 'KeyC',
  evo: 'KeyB',
  pause: 'Escape'
};

const DEFAULT_TOUCH_CONFIG = {
  layout: 'right', // 'right': joy left, dash right | 'left': joy right, dash left
  joystickSize: 'medium', // 'small', 'medium', 'large'
  dashSize: 'medium', // 'small', 'medium', 'large'
  sensitivity: 1.0 // 0.8, 1.0, 1.2, 1.5
};

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.state = 'MENU';
    this.selectedCharId = 'asta';
    this.selectedMapId = 'clover_plains';
    this.selectedDifficulty = 'normal';

    this.worldWidth = 4000;
    this.worldHeight = 4000;
    this.camera = { x: 0, y: 0 };
    this.shake = { intensity: 0, duration: 0 };
    this.screenShakeEnabled = true;
    this.gameSpeed = 1.0;
    this.chestSpawnTimer = 35;
    this.whiteFlash = 0;

    this.spells = new SpellManager(this);
    this.enemyManager = new EnemyManager(this);
    this.artifacts = (typeof ArtifactSystem !== 'undefined') ? new ArtifactSystem(this) : (window.ArtifactSystem ? new window.ArtifactSystem(this) : null);

    this.player = null;
    this.enemies = [];
    this.drops = [];

    this.currentTarget = null;
    this.autoTargetEnabled = true;

    // Combo Chain
    this.comboCount = 0;
    this.comboTimer = 0;
    this.comboBanner = { text: '', alpha: 0, scale: 1 };

    // Persistent Economy & Save Data (PokeSurvivor Style) - Default Fresh Guest
    this.currency = {
      coins: 0,
      tickets: 0,
      purpleTickets: 0,
      diamonds: 0
    };
    this.playerName = 'Khách (Tập Sự)';
    this.unlockedCharacters = new Set(['asta']);
    this.pity1000Counter = 0;
    this.upgrades = {
      vitality: 0,
      strength: 0,
      stride: 0,
      reflexes: 0,
      armor: 0,
      synthesis: 0,
      magnet: 0,
      wisdom: 0,
      fortune: 0,
      repertoire: 0,
      crit: 0,
      reroll: 0
    };
    this.characterUpgrades = {};
    this.bannerPity = {};
    this.currentGachaBanner = 'spooky';
    this.upgradeCharId = 'asta';
    this.godMode = false;

    this.loadSaveData();

    // High performance integer spatial grid
    this.gridSize = 120;
    this.grid = new Map();

    this.applyTouchConfig();
    this.gameTime = 0;
    this.killCount = 0;
    this.totalDamageDealt = 0;
    this.tick = 0;
    this.lastDt = 0.016;

    this.keys = {};
    this.touchInput = { active: false, startX: 0, startY: 0, vx: 0, vy: 0 };

    this.loadControlSettings();
    this.setupInputs();
    this.applyTouchConfig();
    this.resizeCanvas();
    this.loadSettings();
    window.addEventListener('resize', () => this.resizeCanvas());

    if (window.authManager) {
      window.authManager.init(this);
    }
    this.lastTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  loadSettings() {
    try {
      const s = localStorage.getItem('BC_SETTINGS');
      if (s) {
        const data = JSON.parse(s);
        if (data.gameSpeed !== undefined) this.gameSpeed = data.gameSpeed;
        if (data.screenShakeEnabled !== undefined) this.screenShakeEnabled = data.screenShakeEnabled;
        if (data.sfxVolume !== undefined && window.soundEngine && window.soundEngine.setSFXVolume) {
          window.soundEngine.setSFXVolume(data.sfxVolume);
        }
        if (data.bgmVolume !== undefined && window.soundEngine && window.soundEngine.setBGMVolume) {
          window.soundEngine.setBGMVolume(data.bgmVolume);
        }
      }
    } catch (e) {}
  }

  saveSettings() {
    try {
      const data = {
        gameSpeed: this.gameSpeed || 1.0,
        screenShakeEnabled: this.screenShakeEnabled !== false,
        sfxVolume: window.soundEngine ? window.soundEngine.sfxVolume : 0.8,
        bgmVolume: window.soundEngine ? window.soundEngine.bgmVolume : 0.6
      };
      localStorage.setItem('BC_SETTINGS', JSON.stringify(data));
    } catch (e) {}
  }

  // SAVE & LOAD SYSTEM (PokeSurvivor Style)

  pullArtifactGacha(count = 10) {
    if (!this.artifacts) {
      alert('Hệ thống Tạo Vật chưa sẵn sàng!');
      return;
    }

    let canAfford = false;
    const ticketCost = count;
    const coinCost = count === 1 ? 2500 : (count === 10 ? 22500 : (count === 100 ? 200000 : count * 2250));

    if (this.currency.tickets >= ticketCost) {
      this.currency.tickets -= ticketCost;
      canAfford = true;
    } else if (this.currency.coins >= coinCost) {
      this.currency.coins -= coinCost;
      canAfford = true;
    }

    if (!canAfford) {
      alert(`Không đủ Vé Triệu Hồi hoặc Coins!\nCần ${ticketCost} Vé hoặc ${coinCost.toLocaleString()} Coins.`);
      return;
    }

    if (window.soundEngine && window.soundEngine.gachaSummonStart) {
      window.soundEngine.gachaSummonStart();
    }

    const defs = (typeof ARTIFACT_DEFS !== 'undefined') ? ARTIFACT_DEFS : (window.ARTIFACT_DEFS || {});
    const allRelicKeys = Object.keys(defs);
    const legendaries = allRelicKeys.filter(k => defs[k].rarity === 'legendary');
    const epics = allRelicKeys.filter(k => defs[k].rarity === 'epic');
    const rares = allRelicKeys.filter(k => defs[k].rarity === 'rare');

    // Giảm tỷ lệ trùng lặp: Ưu tiên cổ vật chưa sở hữu (85%) hoặc chưa đạt 3 sao
    const selectArtifact = (pool) => {
      const coll = (this.artifacts && this.artifacts.collection) ? this.artifacts.collection : {};
      const unowned = pool.filter(k => !coll[k]);
      if (unowned.length > 0 && Math.random() < 0.85) {
        return unowned[Math.floor(Math.random() * unowned.length)];
      }
      const notMaxed = pool.filter(k => !coll[k] || (coll[k].star || 1) < 3);
      if (notMaxed.length > 0 && Math.random() < 0.85) {
        return notMaxed[Math.floor(Math.random() * notMaxed.length)];
      }
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const results = [];
    let highestRarity = 'rare';
    let totalDupCoins = 0;

    for (let i = 0; i < count; i++) {
      const roll = Math.random() * 100;
      let pickedId = 'cursed_necklace';
      let rTier = 'rare';

      const isGuaranteedSlot = (count >= 10 && (i % 10 === 9) && highestRarity === 'rare');

      if (roll < 5.0) {
        rTier = 'legendary';
        pickedId = selectArtifact(legendaries);
        highestRarity = 'legendary';
      } else if (roll < 30.0 || isGuaranteedSlot) {
        rTier = 'epic';
        pickedId = selectArtifact(epics);
        if (highestRarity !== 'legendary') highestRarity = 'epic';
      } else {
        rTier = 'rare';
        pickedId = selectArtifact(rares);
      }

      const coll = this.artifacts.collection;
      let isNew = false;
      let starBefore = 1;
      let starAfter = 1;

      if (!coll[pickedId]) {
        coll[pickedId] = { star: 1, count: 1 };
        isNew = true;
        starBefore = 1;
        starAfter = 1;
      } else {
        coll[pickedId].count = (coll[pickedId].count || 1) + 1;
        starBefore = coll[pickedId].star || 1;
        if (coll[pickedId].star < 3) {
          coll[pickedId].star++;
        }
        starAfter = coll[pickedId].star;

        const dupBonus = rTier === 'legendary' ? 1500 : (rTier === 'epic' ? 600 : 250);
        this.currency.coins += dupBonus;
        totalDupCoins += dupBonus;
      }

      results.push({
        id: pickedId,
        relic: defs[pickedId],
        rarity: rTier,
        isNew: isNew,
        starBefore: starBefore,
        starAfter: starAfter
      });
    }

    this.saveGameData();
    if (window.soundEngine && window.soundEngine.gachaCardFlip) {
      window.soundEngine.gachaCardFlip(highestRarity);
    }
    this.showArtifactGachaResults(results, count >= 10, totalDupCoins);
  }

  showArtifactGachaResults(results, isMulti, dupCoins = 0) {
    const modal = document.getElementById('gachaResultOverlay');
    const container = document.getElementById('gachaCardsContainer');
    if (!modal || !container) return;

    container.innerHTML = '';

    const hasLegendary = results.some(r => r.rarity === 'legendary');
    const hasEpic = results.some(r => r.rarity === 'epic');

    modal.classList.remove('modal-shake-legendary', 'modal-shake-epic');
    if (hasLegendary) {
      void modal.offsetWidth;
      modal.classList.add('modal-shake-legendary');
    } else if (hasEpic) {
      void modal.offsetWidth;
      modal.classList.add('modal-shake-epic');
    }

    if (isMulti) {
      const newCount = results.filter(r => r.isNew).length;
      const legCount = results.filter(r => r.rarity === 'legendary').length;
      const epicCount = results.filter(r => r.rarity === 'epic').length;

      const summary = document.createElement('div');
      summary.className = 'gacha-100-summary';
      summary.style.width = '100%';
      summary.innerHTML = `
        <div class="summary-stats-banner" style="display: flex; gap: 15px; justify-content: center; background: rgba(15,23,42,0.9); padding: 10px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.15); margin-bottom: 12px; font-weight: 800; font-size: 13px;">
          <div>🎉 TỔNG QUAY: <b style="color: #38bdf8;">${results.length}</b></div>
          <div>🏺 MỚI KHAI MỞ: <b style="color: #4ade80;">${newCount}</b></div>
          <div>⭐ CỔ VẬT THẦN THOẠI: <b style="color: #f59e0b;">${legCount}</b></div>
          <div>✨ CỔ VẬT SỬ THI: <b style="color: #c084fc;">${epicCount}</b></div>
          ${dupCoins > 0 ? `<div>🪙 BÙ TRÙNG LẶP: <b style="color: #fde047;">+${dupCoins.toLocaleString()}</b></div>` : ''}
        </div>
      `;
      container.appendChild(summary);
    }

    results.forEach((item, idx) => {
      const r = item.relic;
      const card = document.createElement('div');
      card.className = `gacha-card-result ${item.rarity}`;
      const animDelay = results.length > 20 ? Math.min(0.35, idx * 0.005) : (idx * 0.05);
      card.style.animationDelay = `${animDelay}s`;
      card.style.background = 'linear-gradient(145deg, #0f172a, #1e293b)';
      card.style.border = `2px solid ${item.rarity === 'legendary' ? '#f59e0b' : (item.rarity === 'epic' ? '#a855f7' : '#38bdf8')}`;
      card.style.borderRadius = '12px';
      card.style.padding = '12px';
      card.style.width = '180px';
      card.style.textAlign = 'center';
      card.style.boxShadow = `0 0 16px ${item.rarity === 'legendary' ? 'rgba(245,158,11,0.4)' : 'rgba(168,85,247,0.3)'}`;

      const starStr = '★'.repeat(item.starAfter) + '☆'.repeat(3 - item.starAfter);

      card.innerHTML = `
        ${item.isNew ? '<div style="background: #10b981; color: #fff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 6px; display: inline-block; margin-bottom: 4px;">✨ MỚI KHAI MỞ!</div>' : (item.starAfter > item.starBefore ? '<div style="background: #f59e0b; color: #fff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 6px; display: inline-block; margin-bottom: 4px;">⭐ NÂNG SAO THÀNH CÔNG!</div>' : '<div style="background: #64748b; color: #fff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 6px; display: inline-block; margin-bottom: 4px;">TRÙNG LẶP (+COINS)</div>')}
        <div style="font-size: 38px; margin: 6px 0; text-shadow: 0 0 12px rgba(255,255,255,0.4);">${r.icon}</div>
        <div style="font-size: 13px; font-weight: 900; color: #fff; line-height: 1.3;">${r.name}</div>
        <div style="font-size: 11px; color: #f59e0b; font-weight: 900; margin: 4px 0;">${starStr}</div>
        <div style="font-size: 11px; color: #94a3b8; font-style: italic;">${r.tagline}</div>
        <div style="margin-top: 6px; padding: 4px; background: rgba(0,0,0,0.3); border-radius: 6px; font-size: 10px; color: #38bdf8; font-weight: 800;">
          ⚡ ${r.skillName}
        </div>
      `;
      container.appendChild(card);
    });

    modal.classList.remove('hidden');
  }

  getSaveStorageKey() {
    if (typeof window !== 'undefined' && window.authManager && window.authManager.isLoggedIn() && window.authManager.currentUser) {
      return 'BC_USER_DATA_' + window.authManager.currentUser.username.toLowerCase();
    }
    return 'BC_GUEST_DATA';
  }

  loadSaveData() {
    try {
      const storageKey = this.getSaveStorageKey();
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.currency) this.currency = Object.assign(this.currency, data.currency);
        if (this.currency.purpleTickets === undefined) this.currency.purpleTickets = 0;
        if (data.playerName) this.playerName = data.playerName;
        
        // Guaranteed starter heroes - ONLY ASTA
        this.unlockedCharacters = new Set(['asta']);
        if (data.unlocked && Array.isArray(data.unlocked)) {
          data.unlocked.forEach(id => {
            if (CHARACTERS[id]) {
              this.unlockedCharacters.add(id);
            }
          });
        }
        // Sync unlocked state to CHARACTERS
        Object.keys(CHARACTERS).forEach(id => {
          CHARACTERS[id].unlocked = this.unlockedCharacters.has(id);
        });
        if (data.upgrades) this.upgrades = Object.assign(this.upgrades, data.upgrades);
        if (data.characterUpgrades) this.characterUpgrades = data.characterUpgrades;
        if (data.bannerPity) this.bannerPity = data.bannerPity;
        if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;
        if (data.artifactsSystem && this.artifacts) this.artifacts.loadData(data.artifactsSystem);
      } else {
        // Fresh guest or new user clean slate
        this.currency = {
          coins: 0,
          tickets: 0,
          purpleTickets: 0,
          diamonds: 0
        };
        this.playerName = (typeof window !== 'undefined' && window.authManager && window.authManager.isLoggedIn() && window.authManager.currentUser)
          ? window.authManager.currentUser.username
          : 'Khách (Tập Sự)';
        this.unlockedCharacters = new Set(['asta']);
        Object.keys(CHARACTERS).forEach(id => {
          CHARACTERS[id].unlocked = (id === 'asta');
        });
      }
    } catch (e) {
      console.warn('Lỗi khi nạp dữ liệu lưu game:', e);
    }
  }

  resetToGuest() {
    this.currency = {
      coins: 0,
      tickets: 0,
      purpleTickets: 0,
      diamonds: 0
    };
    this.playerName = 'Khách (Tập Sự)';
    this.unlockedCharacters = new Set(['asta']);
    Object.keys(CHARACTERS).forEach(id => {
      CHARACTERS[id].unlocked = (id === 'asta');
    });
    this.selectedCharId = 'asta';
    this.upgradeCharId = 'asta';
    this.pity1000Counter = 0;
    this.upgrades = {
      vitality: 0,
      strength: 0,
      stride: 0,
      reflexes: 0,
      armor: 0,
      synthesis: 0,
      magnet: 0,
      wisdom: 0,
      fortune: 0,
      repertoire: 0,
      crit: 0,
      reroll: 0
    };
    this.characterUpgrades = {};
    this.bannerPity = {};
    if (this.artifacts) {
      this.artifacts.owned = {};
      this.artifacts.equipped = [null, null, null];
    }
    try {
      localStorage.setItem('BC_GUEST_DATA', JSON.stringify(this.exportSaveData()));
    } catch (e) {}
    this.updateTopBarCurrency();
    if (typeof updateSelectedCharInfo === 'function') updateSelectedCharInfo('asta');
    if (typeof renderCharRosterGrid === 'function') renderCharRosterGrid();
    if (typeof renderArtifactsModal === 'function') renderArtifactsModal();
    if (window.updateSelectedCharInfo) window.updateSelectedCharInfo('asta');
    if (window.renderCharRosterGrid) window.renderCharRosterGrid();
    if (window.renderArtifactsModal) window.renderArtifactsModal();
  }

  exportSaveData() {
    return {
      currency: this.currency,
      playerName: this.playerName,
      unlocked: Array.from(this.unlockedCharacters),
      upgrades: this.upgrades,
      characterUpgrades: this.characterUpgrades,
      bannerPity: this.bannerPity,
      pity1000Counter: this.pity1000Counter || 0,
      artifactsSystem: this.artifacts ? this.artifacts.exportData() : null,
      keybinds: this.keybinds,
      touchConfig: this.touchConfig
    };
  }

  applySaveData(data) {
    if (!data) return;
    if (data.keybinds) {
      this.keybinds = { ...DEFAULT_KEYBINDS, ...data.keybinds };
      try { localStorage.setItem('BC_KEYBINDS', JSON.stringify(this.keybinds)); } catch (e) {}
    }
    if (data.touchConfig) {
      this.touchConfig = { ...DEFAULT_TOUCH_CONFIG, ...data.touchConfig };
      try { localStorage.setItem('BC_TOUCH_CONFIG', JSON.stringify(this.touchConfig)); } catch (e) {}
      this.applyTouchConfig();
    }
    try {
      if (data.currency) this.currency = Object.assign(this.currency, data.currency);
      if (this.currency.purpleTickets === undefined) this.currency.purpleTickets = 0;
      if (data.playerName) this.playerName = data.playerName;
      
      this.unlockedCharacters = new Set(['asta']);
      if (data.unlocked && Array.isArray(data.unlocked)) {
        data.unlocked.forEach(id => {
          if (CHARACTERS[id]) {
            this.unlockedCharacters.add(id);
          }
        });
      }
      Object.keys(CHARACTERS).forEach(id => {
        CHARACTERS[id].unlocked = this.unlockedCharacters.has(id);
      });
      if (data.upgrades) this.upgrades = Object.assign(this.upgrades, data.upgrades);
      if (data.characterUpgrades) this.characterUpgrades = data.characterUpgrades;
      if (data.bannerPity) this.bannerPity = data.bannerPity;
      if (data.pity1000Counter !== undefined) this.pity1000Counter = data.pity1000Counter;
      if (data.artifactsSystem && this.artifacts) this.artifacts.loadData(data.artifactsSystem);

      const storageKey = this.getSaveStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(this.exportSaveData()));
      this.updateTopBarCurrency();

      if (typeof updateSelectedCharInfo === 'function') updateSelectedCharInfo(this.selectedCharId || 'asta');
      if (typeof renderCharRosterGrid === 'function') renderCharRosterGrid();
      if (typeof renderArtifactsModal === 'function') renderArtifactsModal();
      if (window.updateSelectedCharInfo) window.updateSelectedCharInfo(this.selectedCharId || 'asta');
      if (window.renderCharRosterGrid) window.renderCharRosterGrid();
      if (window.renderArtifactsModal) window.renderArtifactsModal();
    } catch (e) {
      console.error('Lỗi nạp cloud save data:', e);
    }
  }

  saveGameData() {
    try {
      const storageKey = this.getSaveStorageKey();
      const data = this.exportSaveData();
      localStorage.setItem(storageKey, JSON.stringify(data));
      this.updateTopBarCurrency();
      if (typeof window !== 'undefined' && window.authManager && window.authManager.isLoggedIn()) {
        window.authManager.queueSync(data);
      }
    } catch (e) {}
  }

  formatCurrency(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.0', '') + 'm';
    }
    if (num >= 10000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toLocaleString();
  }

  updateTopBarCurrency() {
    const elCoins = document.getElementById('currencyCoins');
    const elTickets = document.getElementById('currencyTickets');

    if (elCoins) elCoins.innerText = this.formatCurrency(this.currency.coins);
    if (elTickets) elTickets.innerText = (this.currency.tickets || 0).toLocaleString();
  }

  getCharUpgrades(charId) {
    if (!this.upgrades) {
      this.upgrades = {
        vitality: 0,
        strength: 0,
        stride: 0,
        reflexes: 0,
        armor: 0,
        synthesis: 0,
        magnet: 0,
        wisdom: 0,
        fortune: 0,
        repertoire: 0,
        crit: 0,
        reroll: 0
      };
    }
    return this.upgrades;
  }

  buyCharUpgrade(charId, talentId) {
    const u = this.getCharUpgrades(charId);
    const maxLv = talentId === 'repertoire' ? 1 : (talentId === 'reroll' ? 3 : 10);
    const curLv = u[talentId] || 0;
    if (curLv >= maxLv) return;

    const baseCost = talentId === 'repertoire' ? 800 : (talentId === 'reroll' ? 500 : 200);
    const cost = Math.round(baseCost * Math.pow(1.3, curLv));

    if (this.currency.coins < cost) {
      alert(`Bạn không đủ Coins! Cần ${cost.toLocaleString()} Coins.`);
      return;
    }

    this.currency.coins -= cost;
    u[talentId] = curLv + 1;
    if (window.soundEngine && window.soundEngine.upgradeBuy) window.soundEngine.upgradeBuy();
    this.saveGameData();
    if (this.updateTopBarCurrency) this.updateTopBarCurrency();
    if (typeof renderUpgradesTalentGrid === 'function') renderUpgradesTalentGrid();
  }

  
  loadControlSettings() {
    try {
      const k = localStorage.getItem('BC_KEYBINDS');
      this.keybinds = k ? { ...DEFAULT_KEYBINDS, ...JSON.parse(k) } : { ...DEFAULT_KEYBINDS };
    } catch (e) {
      this.keybinds = { ...DEFAULT_KEYBINDS };
    }

    try {
      const t = localStorage.getItem('BC_TOUCH_CONFIG');
      this.touchConfig = t ? { ...DEFAULT_TOUCH_CONFIG, ...JSON.parse(t) } : { ...DEFAULT_TOUCH_CONFIG };
    } catch (e) {
      this.touchConfig = { ...DEFAULT_TOUCH_CONFIG };
    }
    this.currentJoyMaxR = 44;
  }

  saveControlSettings() {
    try {
      localStorage.setItem('BC_KEYBINDS', JSON.stringify(this.keybinds));
      localStorage.setItem('BC_TOUCH_CONFIG', JSON.stringify(this.touchConfig));
    } catch (e) {}
    this.applyTouchConfig();
    if (window.authManager && window.authManager.isLoggedIn()) {
      window.authManager.queueSync(this.exportSaveData());
    }
  }

  formatKeyLabel(code) {
    if (!code) return 'None';
    if (code === 'Space') return 'Space';
    if (code === 'ShiftLeft') return 'Shift (T)';
    if (code === 'ShiftRight') return 'Shift (P)';
    if (code === 'ControlLeft') return 'Ctrl (T)';
    if (code === 'ControlRight') return 'Ctrl (P)';
    if (code === 'AltLeft') return 'Alt (T)';
    if (code === 'AltRight') return 'Alt (P)';
    if (code === 'ArrowUp') return '↑ Lên';
    if (code === 'ArrowDown') return '↓ Xuống';
    if (code === 'ArrowLeft') return '← Trái';
    if (code === 'ArrowRight') return '→ Phải';
    if (code === 'Escape') return 'Esc';
    if (code.startsWith('Key')) return code.slice(3).toUpperCase();
    if (code.startsWith('Digit')) return code.slice(5);
    if (code.startsWith('Numpad')) return 'Num ' + code.slice(6);
    return code;
  }

  matchesAction(e, action) {
    if (!e) return false;
    const target = this.keybinds ? this.keybinds[action] : DEFAULT_KEYBINDS[action];
    if (!target) return false;

    const inputCode = e.code || '';
    const inputKey = e.key || '';

    // Direct code match (physical hardware key)
    if (inputCode.toLowerCase() === target.toLowerCase()) return true;

    // Space match
    if (target === 'Space' && (inputCode === 'Space' || inputKey === ' ')) return true;

    // Escape match
    if (target === 'Escape' && (inputCode === 'Escape' || inputKey === 'Escape')) return true;

    // Letter matching with Vietnamese IME support (e.g. KeyW -> w, ư, ẃ)
    if (target.startsWith('Key')) {
      const letter = target.slice(3).toLowerCase();
      if (inputKey.toLowerCase() === letter) return true;
      if (letter === 'w' && (inputKey === 'ư' || inputKey === 'ẃ')) return true;
      if (letter === 'a' && (inputKey === 'â' || inputKey === 'ă')) return true;
      if (letter === 'd' && inputKey === 'đ') return true;
    }

    // Universal Arrow key fallback for movement
    if (action === 'up' && (inputCode === 'ArrowUp' || inputKey === 'ArrowUp')) return true;
    if (action === 'down' && (inputCode === 'ArrowDown' || inputKey === 'ArrowDown')) return true;
    if (action === 'left' && (inputCode === 'ArrowLeft' || inputKey === 'ArrowLeft')) return true;
    if (action === 'right' && (inputCode === 'ArrowRight' || inputKey === 'ArrowRight')) return true;

    // Pause fallback
    if (action === 'pause' && (inputCode === 'KeyP' || inputKey.toLowerCase() === 'p')) return true;

    return false;
  }

  isActionActive(action) {
    if (!this.keys) return false;
    const target = this.keybinds ? this.keybinds[action] : DEFAULT_KEYBINDS[action];
    if (!target) return false;

    const targetLower = target.toLowerCase();
    if (this.keys[targetLower]) return true;

    // Space key
    if (target === 'Space' && (this.keys['space'] || this.keys[' '])) return true;

    // Letter + Vietnamese IME
    if (target.startsWith('Key')) {
      const letter = target.slice(3).toLowerCase();
      if (this.keys[letter]) return true;
      if (letter === 'w' && (this.keys['ư'] || this.keys['ẃ'])) return true;
      if (letter === 'a' && (this.keys['â'] || this.keys['ă'])) return true;
      if (letter === 'd' && this.keys['đ']) return true;
    }

    // Universal Arrow key fallback for movement
    if (action === 'up' && this.keys['arrowup']) return true;
    if (action === 'down' && this.keys['arrowdown']) return true;
    if (action === 'left' && this.keys['arrowleft']) return true;
    if (action === 'right' && this.keys['arrowright']) return true;

    return false;
  }

  applyTouchConfig() {
    if (!this.touchConfig) {
      this.touchConfig = { ...DEFAULT_TOUCH_CONFIG };
    }
    const joy = document.getElementById('joystickZone');
    const dashDock = document.querySelector('.dash-dock');
    const dashBtn = document.getElementById('dashBtn');
    const joyKnob = document.getElementById('joystickKnob');

    const layout = this.touchConfig.layout || 'right';
    const joystickSize = this.touchConfig.joystickSize || 'medium';
    const dashSize = this.touchConfig.dashSize || 'medium';

    // Hand Layout (Swapping Joystick & Dash Dock)
    if (joy && dashDock) {
      if (layout === 'left') {
        joy.style.setProperty('left', 'auto', 'important');
        joy.style.setProperty('right', '20px', 'important');
        dashDock.style.setProperty('right', 'auto', 'important');
        dashDock.style.setProperty('left', '20px', 'important');
      } else {
        joy.style.setProperty('right', 'auto', 'important');
        joy.style.setProperty('left', '20px', 'important');
        dashDock.style.setProperty('left', 'auto', 'important');
        dashDock.style.setProperty('right', '20px', 'important');
      }
    }

    // Joystick sizes
    const joySizes = {
      small: { zone: 88, knob: 36, maxR: 32 },
      medium: { zone: 116, knob: 46, maxR: 44 },
      large: { zone: 148, knob: 58, maxR: 56 }
    };
    const jConf = joySizes[joystickSize] || joySizes.medium;
    this.currentJoyMaxR = jConf.maxR;
    if (joy) {
      joy.style.width = `${jConf.zone}px`;
      joy.style.height = `${jConf.zone}px`;
    }
    if (joyKnob) {
      joyKnob.style.width = `${jConf.knob}px`;
      joyKnob.style.height = `${jConf.knob}px`;
    }

    // Dash button sizes
    const dashSizes = {
      small: { btn: 60, font: 11, meter: 52 },
      medium: { btn: 74, font: 13, meter: 64 },
      large: { btn: 92, font: 15, meter: 80 }
    };
    const dConf = dashSizes[dashSize] || dashSizes.medium;
    if (dashBtn) {
      dashBtn.style.width = `${dConf.btn}px`;
      dashBtn.style.height = `${dConf.btn}px`;
      dashBtn.style.fontSize = `${dConf.font}px`;
    }
    const dashMeter = document.querySelector('.dash-meter-container');
    if (dashMeter) {
      dashMeter.style.width = `${dConf.meter}px`;
    }

    // Dash button key label
    const dashSubKey = document.getElementById('dashBtnSubKey');
    if (dashSubKey && this.keybinds) {
      const kLabel = this.formatKeyLabel(this.keybinds.dash || 'Space');
      dashSubKey.innerHTML = `<br>(${kLabel})`;
    }
  }

  setupInputs() {
    this.keys = {};

    window.addEventListener('keydown', (e) => {
      if (e.key) this.keys[e.key.toLowerCase()] = true;
      if (e.code) this.keys[e.code.toLowerCase()] = true;

      // If user is currently rebinding a key in Settings, don't trigger in-game actions
      if (window.isListeningForKeybind) {
        return;
      }

      if (this.matchesAction(e, 'pause')) {
        const evoModal = document.getElementById('evolutionModal');
        if (evoModal && !evoModal.classList.contains('hidden')) {
          if (typeof closeEvolutionModal === 'function') closeEvolutionModal();
          return;
        }
        if (this.statsInspectorOpen) {
          this.toggleStatsInspector();
          return;
        }
        this.togglePause();
      }

      if (this.matchesAction(e, 'stats')) {
        this.toggleStatsInspector();
      }

      if (this.matchesAction(e, 'evo')) {
        if (typeof toggleEvolutionModal === 'function') {
          toggleEvolutionModal();
        }
      }

      if (this.matchesAction(e, 'dash')) {
        e.preventDefault();
        this.playerDash();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key) this.keys[e.key.toLowerCase()] = false;
      if (e.code) this.keys[e.code.toLowerCase()] = false;
    });

    window.addEventListener('blur', () => {
      this.keys = {};
    });

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (this.state === 'PLAYING') {
        this.playerDash();
      }
    });

    window.addEventListener('pointerdown', (e) => {
      if (this.state !== 'PLAYING') return;
      if (e.button !== 0) return;
      // Do not process enemy targeting if clicking interactive HUD or overlay elements
      if (e.target.closest('button, .hud-btn, .dash-btn, .slot-icon, .overlay, #joystickZone, input, select')) return;

      const worldX = e.clientX + this.camera.x;
      const worldY = e.clientY + this.camera.y;

      let clicked = null;
      let closest = 50;
      for (const enemy of this.enemies) {
        if (enemy.hp <= 0 || enemy.isDead) continue;
        const d = Math.hypot(enemy.x - worldX, enemy.y - worldY);
        if (d < enemy.radius + 28 && d < closest) {
          closest = d;
          clicked = enemy;
        }
      }

      if (clicked) {
        this.currentTarget = clicked;
        window.soundEngine.pickup();
      }
    });

    // Touch controls
    const joyZone = document.getElementById('joystickZone');
    const joyKnob = document.getElementById('joystickKnob');
    if (joyZone) {
      joyZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const t = e.touches[0];
        this.touchInput.active = true;
        this.touchInput.startX = t.clientX;
        this.touchInput.startY = t.clientY;
      }, { passive: false });
      joyZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!this.touchInput.active) return;
        const t = e.touches[0];
        const dx = t.clientX - this.touchInput.startX;
        const dy = t.clientY - this.touchInput.startY;
        const dist = Math.hypot(dx, dy);
        const maxR = this.currentJoyMaxR || 44;
        const sens = (this.touchConfig && this.touchConfig.sensitivity) ? Number(this.touchConfig.sensitivity) : 1.0;
        const effectiveLimit = Math.max(16, maxR / sens);
        const norm = dist > 0 ? Math.min(dist, effectiveLimit) / dist : 0;
        this.touchInput.vx = (dx * norm) / effectiveLimit;
        this.touchInput.vy = (dy * norm) / effectiveLimit;
        if (joyKnob) {
          const visualLimit = Math.min(dist, maxR);
          const visualNorm = dist > 0 ? visualLimit / dist : 0;
          joyKnob.style.transform = `translate(${dx * visualNorm}px, ${dy * visualNorm}px)`;
        }
      }, { passive: false });
      const resetTouch = (e) => {
        if (e && e.cancelable) e.preventDefault();
        this.touchInput.active = false;
        this.touchInput.vx = 0;
        this.touchInput.vy = 0;
        if (joyKnob) joyKnob.style.transform = 'translate(0px, 0px)';
      };
      joyZone.addEventListener('touchend', resetTouch, { passive: false });
      joyZone.addEventListener('touchcancel', resetTouch, { passive: false });
    }

    const dashBtn = document.getElementById('dashBtn');
    if (dashBtn) {
      const handleDash = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        this.playerDash();
      };
      dashBtn.addEventListener('click', handleDash);
      dashBtn.addEventListener('pointerdown', handleDash);
    }
  }

  // START RUN
  startGame(charId, mapId, diffId) {
    this.selectedCharId = charId || this.selectedCharId;
    this.selectedMapId = mapId || this.selectedMapId;
    this.selectedDifficulty = diffId || this.selectedDifficulty || 'normal';
    const char = CHARACTERS[this.selectedCharId];

    window.soundEngine.init();
    window.soundEngine.startBGM();

    this.gameTime = 0;
    this.killCount = 0;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.comboBanner = { text: '', alpha: 0, scale: 1 };
    this.enemies = [];
    this.drops = [];
    this.currentTarget = null;
    this.victoryShown = false;
    this.isEndlessMode = false;
    this.pendingLevelUps = 0;
    this.spells.reset();
    this.enemyManager.reset();
    if (this.artifacts) this.artifacts.resetRun();

    // Permanent upgrades applied to base stats (Global Talents)
    const up = this.getCharUpgrades(char.id);
    const bonusHp = (up.vitality || 0) * 4;
    const bonusDmg = (up.strength || 0) * 0.015;
    const bonusSpd = 1 + ((up.stride || 0) * 0.015);
    const bonusCd = (up.reflexes || 0) * 0.01;
    const bonusArmor = (up.armor || 0) * 0.01;
    const regenHp = (up.synthesis || 0) * 0.1;
    const bonusMagnet = (up.magnet || 0) * 6;
    const bonusExp = (up.wisdom || 0) * 0.02;
    const bonusCrit = (up.crit || 0) * 0.015;
    this.coinDropMultiplier = 1.0 + ((up.fortune || 0) * 0.04);

    this.player = {
      charId: char.id,
      name: char.name,
      x: this.worldWidth / 2,
      y: this.worldHeight / 2,
      vx: 0,
      vy: 0,
      radius: 14,
      facing: 1,
      isMoving: false,

      maxHp: char.baseHp + bonusHp,
      hp: char.baseHp + bonusHp,
      hpRegen: regenHp,
      speed: char.baseSpeed * bonusSpd,
      armor: Math.min(0.70, (char.baseArmor || 0) + bonusArmor),
      damageBonus: bonusDmg,
      areaBonus: (char.id === 'noelle' ? 0.3 : 0),
      critChance: (char.id === 'yami' ? 0.15 : (char.id === 'nacht' ? 0.12 : 0)) + bonusCrit,
      critDmgBonus: (up.crit || 0) * 0.02,
      cooldownReduction: (char.id === 'luck' ? 0.15 : (char.id === 'licht' ? 0.12 : 0)) + bonusCd,
      pickupRadius: 80 + bonusMagnet,
      expBonus: (char.id === 'julius' ? 0.3 : 0) + bonusExp,
      rerollsLeft: up.reroll || 0,

      dashCooldown: 3.5,
      dashTimer: 0,
      isDashing: false,
      dashDuration: 0.24,
      dashDurationTimer: 0,

      isDevilMode: char.id === 'black_asta',
      isSpiritMode: false,
      isValkyrie: false,
      isAttacking: false,

      level: 1,
      exp: 0,
      nextExp: this.calculateNextExp(1), // 15 EXP for Lv 1 -> Lv 2
      startingWeaponId: char.startingWeapon,
      weapons: {
        [char.startingWeapon]: { level: 1, timer: 0, isStartingWeapon: true }
      },
      passives: {},
      infinitePassives: { infinite_vitality: 0, infinite_might: 0 }
    };

    // Apply Artifact & Relic stats
    if (this.artifacts) {
      this.artifacts.applyEquippedStats(this.player);
      this.player.hp = this.player.maxHp;
    }
    this.player.critChance = Math.min(1.0, Math.max(0, this.player.critChance || 0));
    this.player.critDmgBonus = Math.min(2.0, Math.max(0, this.player.critDmgBonus || 0));

    // Repertoire: Start with 2 moves if unlocked!
    if ((up.repertoire || 0) >= 1) {
      const extraPool = ['wind_scythe', 'sea_dragon', 'calidos_brachium', 'lightning_boots', 'dark_katana', 'magna_fireballs', 'briar_whip', 'silver_rain'].filter(w => w !== char.startingWeapon);
      const randomExtra = extraPool[Math.floor(Math.random() * extraPool.length)];
      if (randomExtra) {
        this.player.weapons[randomExtra] = { level: 1, timer: 0 };
      }
    }

    // Spawn 3 initial mystery chests on the battlefield!
    for (let c = 0; c < 3; c++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 320 + Math.random() * 450;
      this.spawnDrop(this.player.x + Math.cos(angle) * dist, this.player.y + Math.sin(angle) * dist, 'chest', 100);
    }

    this.state = 'PLAYING';
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.modal-overlay-custom').forEach(el => el.classList.add('hidden'));
    this.statsInspectorOpen = false;
    const topNav = document.getElementById('topNavBar');
    if (topNav) topNav.classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');

    // Blur active elements (like start button) so Space/WASD isn't intercepted
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
    window.focus();

    this.updateHUD();
  }

  playerDash() {
    const p = this.player;
    if (!p || p.dashTimer > 0 || p.isDashing) return;

    p.isDashing = true;
    p.dashDurationTimer = p.dashDuration;
    p.dashTimer = p.dashCooldown;
    window.soundEngine.dash();

    this.spells.spawnImpactParticles(p.x, p.y, p.isDevilMode ? '#dc2626' : '#38bdf8', 14);

    // Artifact Dash Hook (Sylph Tempest Vortex)
    if (this.artifacts) {
      this.artifacts.onPlayerDash();
    }
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      document.getElementById('pauseOverlay').classList.remove('hidden');
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      document.getElementById('pauseOverlay').classList.add('hidden');
    }
  }

  toggleStatsInspector() {
    if (!this.player) return;
    const overlay = document.getElementById('statsInspectorOverlay');
    if (!overlay) return;

    if (this.statsInspectorOpen) {
      overlay.classList.add('hidden');
      this.statsInspectorOpen = false;
      if (this.prevStatsState) {
        this.state = this.prevStatsState;
        this.prevStatsState = null;
      } else {
        this.state = 'PLAYING';
      }
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    } else {
      if (this.state !== 'PLAYING' && this.state !== 'PAUSED') return;
      this.prevStatsState = this.state;
      this.state = 'PAUSED_BY_STATS';
      this.renderStatsInspector();
      overlay.classList.remove('hidden');
      this.statsInspectorOpen = true;
      if (window.soundEngine && window.soundEngine.uiClick) window.soundEngine.uiClick();
    }
  }

  renderStatsInspector() {
    const p = this.player;
    if (!p) return;

    const charDef = (typeof CHARACTERS !== 'undefined' ? CHARACTERS[p.charId] : null) || {};
    const emoji = (window.CHAR_EMOJIS && window.CHAR_EMOJIS[p.charId]) || '🍀';

    const av = document.getElementById('statCharAvatar');
    if (av) av.innerText = emoji;

    const nameEl = document.getElementById('statCharName');
    if (nameEl) nameEl.innerText = (charDef.name || p.charId).toUpperCase();

    const titleEl = document.getElementById('statCharTitle');
    if (titleEl) titleEl.innerText = `${charDef.title || 'Ma Đạo Sĩ'} · ${charDef.squad || 'Vương Quốc Clover'}`;

    const lvEl = document.getElementById('statCharLevel');
    if (lvEl) lvEl.innerText = `Cấp Độ: Lv.${p.level}`;

    const timeEl = document.getElementById('statSurviveTime');
    if (timeEl) timeEl.innerText = this.formatTime(this.gameTime || 0);

    const killEl = document.getElementById('statKillCount');
    if (killEl) killEl.innerText = `${this.killCount || 0}`;

    // 1. Sinh Lực & Phòng Thủ
    const hpEl = document.getElementById('stValHp');
    if (hpEl) hpEl.innerText = `${Math.round(p.hp)} / ${Math.round(p.maxHp)}`;

    const regenEl = document.getElementById('stValRegen');
    if (regenEl) regenEl.innerText = `+${(p.hpRegen || 0).toFixed(1)} HP/s`;

    const armorEl = document.getElementById('stValArmor');
    if (armorEl) armorEl.innerText = `${Math.round((p.armor || 0) * 100)}% Giảm ST`;

    // 2. Tấn Công & Sát Thương
    const dmgEl = document.getElementById('stValDmg');
    if (dmgEl) {
      const dmgBonus = Math.round((p.damageBonus || 0) * 100);
      dmgEl.innerText = `${dmgBonus >= 0 ? '+' : ''}${dmgBonus}%`;
    }

    const critEl = document.getElementById('stValCrit');
    if (critEl) {
      const critPct = Math.min(100, Math.round((p.critChance || 0) * 100));
      critEl.innerText = `${critPct}% (Tối đa 100%)`;
    }

    const critDmgEl = document.getElementById('stValCritDmg');
    if (critDmgEl) {
      const critDmgPct = Math.min(200, Math.round((p.critDmgBonus || 0) * 100));
      critDmgEl.innerText = `${critDmgPct}% (Tối đa 200%)`;
    }

    const cdrEl = document.getElementById('stValCdr');
    if (cdrEl) {
      const cdrVal = Math.round((p.cooldownReduction || 0) * 100);
      cdrEl.innerText = `${cdrVal}%`;
    }

    const aoeEl = document.getElementById('stValAoe');
    if (aoeEl) {
      const aoeVal = Math.round((p.areaBonus || 0) * 100);
      aoeEl.innerText = `${aoeVal >= 0 ? '+' : ''}${aoeVal}%`;
    }

    const spdEl = document.getElementById('stValSpeed');
    if (spdEl) spdEl.innerText = `${Math.round(p.speed)} px/s`;

    // 3. Tiện Ích & Thu Hoạch
    const magEl = document.getElementById('stValMagnet');
    if (magEl) magEl.innerText = `${Math.round(p.pickupRadius || 80)} px`;

    const expEl = document.getElementById('stValExp');
    if (expEl) {
      const expVal = Math.round((p.expBonus || 0) * 100);
      expEl.innerText = `${expVal >= 0 ? '+' : ''}${expVal}%`;
    }

    const greedEl = document.getElementById('stValGreed');
    if (greedEl) {
      const greedVal = Math.round(((this.coinDropMultiplier || 1.0) - 1.0) * 100);
      greedEl.innerText = `${greedVal >= 0 ? '+' : ''}${greedVal}%`;
    }

    // 4. Weapons
    const wepContainer = document.getElementById('stEquippedWeapons');
    if (wepContainer) {
      wepContainer.innerHTML = '';
      const spellDefs = (typeof SPELL_DEFS !== 'undefined') ? SPELL_DEFS : (window.SPELL_DEFS || {});
      for (const [wId, item] of Object.entries(p.weapons || {})) {
        const def = spellDefs[wId] || {};
        const isSuper = (def.type === 'evolution' && def.evolution === undefined) || (def.tier === 3);
        const isEvo = def.type === 'evolution' || (def.tier === 2);
        const isMain = item.isStartingWeapon || wId === p.startingWeaponId;

        const evoDef = def.evolution ? spellDefs[def.evolution] : null;
        const reqDef = def.requires ? spellDefs[def.requires] : null;
        const superDef = evoDef && evoDef.evolution ? spellDefs[evoDef.evolution] : null;
        const hasReqBook = def.requires ? !!p.passives[def.requires] : true;
        const isLv5 = item.level >= 5;

        let badgeTag = `<span style="color:#60a5fa; font-weight:700;">[Cấp ${item.level}]</span>`;
        let cardClass = 'stat-gear-item';
        if (isSuper) {
          cardClass += ' super-evo';
          badgeTag = `<span style="color:#f59e0b; font-weight:900;">🌟 THỨC TỈNH TỐI THƯỢNG (SIÊU CẤP)</span>`;
        } else if (isEvo) {
          cardClass += ' evo';
          badgeTag = `<span style="color:#a855f7; font-weight:800;">⭐ TIẾN HÓA CẤP 5</span>`;
        }

        let evoReqHtml = '';
        if (isSuper) {
          evoReqHtml = `<div style="font-size:11px; color:#fbbf24; margin-top:4px; font-weight:700;">🌟 Đã đạt Thức Tỉnh Tối Thượng (Cực Hạn).</div>`;
        } else if (isEvo) {
          if (isMain && superDef) {
            const readySuper = p.level >= 10;
            evoReqHtml = `
              <div style="font-size:11px; color:#c084fc; margin-top:4px; background:rgba(15,23,42,0.6); padding:4px 8px; border-radius:6px;">
                🌟 <b>Siêu Tiến Hóa Lần 2 ➔ ${superDef.name}:</b>
                <br>&bull; Yêu cầu: Đạt Cấp 10+ (Hiện tại: <b>Lv.${p.level}/10</b> ${readySuper ? '<span style="color:#34d399;">✅ Đủ điều kiện!</span>' : '<span style="color:#f87171;">⏳ Cần thêm ' + (10 - p.level) + ' cấp</span>'})
              </div>
            `;
          } else {
            evoReqHtml = `<div style="font-size:11px; color:#a855f7; margin-top:4px;">⭐ Đã đạt cấp Tiến Hóa tối đa trong trận.</div>`;
          }
        } else if (evoDef) {
          evoReqHtml = `
            <div style="font-size:11px; color:#cbd5e1; margin-top:4px; background:rgba(15,23,42,0.6); padding:5px 8px; border-radius:6px; line-height:1.4;">
              <span style="color:#fbbf24; font-weight:700;">✨ Yêu cầu Tiến Hóa ➔ ${evoDef.name}:</span>
              <br>&bull; Cấp vũ khí: <b>Lv.${item.level}/5</b> ${isLv5 ? '<span style="color:#34d399;">✅ (Đạt Cực Hạn)</span>' : '<span style="color:#f87171;">⚠️ (Cần đạt Lv.5)</span>'}
              <br>&bull; Sách bổ trợ: <b>${reqDef ? reqDef.name : 'Không cần'}</b> ${hasReqBook ? '<span style="color:#34d399;">✅ (Đã sở hữu)</span>' : '<span style="color:#f87171;">❌ (Chưa có - Cần chọn khi lên cấp)</span>'}
              ${isMain ? '<br>&bull; <span style="color:#c084fc;">🌟 Kỹ năng chính của Pháp sư: Cho phép Siêu Tiến Hóa Lần 2 ở Cấp 10+!</span>' : ''}
            </div>
          `;
        }

        const gearDiv = document.createElement('div');
        gearDiv.className = cardClass;
        gearDiv.innerHTML = `
          <div class="stat-gear-icon">${def.icon || '⚔️'}</div>
          <div class="stat-gear-info" style="flex: 1;">
            <div class="stat-gear-name" style="display:flex; justify-content:space-between; align-items:center;">
              <span>${def.name || wId}</span>
              ${badgeTag}
            </div>
            <div class="stat-gear-desc">${def.description || def.desc || ''}</div>
            ${evoReqHtml}
          </div>
        `;
        wepContainer.appendChild(gearDiv);
      }
    }

    // 5. Passives
    const passContainer = document.getElementById('stEquippedPassives');
    if (passContainer) {
      passContainer.innerHTML = '';
      const spellDefs = (typeof SPELL_DEFS !== 'undefined') ? SPELL_DEFS : (window.SPELL_DEFS || {});
      const passEntries = Object.entries(p.passives || {});
      if (passEntries.length === 0) {
        passContainer.innerHTML = '<div style="color:#64748b; font-size:12px; font-style:italic; padding: 4px;">Chưa trang bị Sách Bổ Trợ nào. Thu thập thêm ngọc EXP để thăng cấp!</div>';
      } else {
        for (const [pId, lv] of passEntries) {
          const def = spellDefs[pId] || {};
          const evolvesList = [];
          for (const [wKey, wVal] of Object.entries(spellDefs)) {
            if (wVal.type === 'weapon' && wVal.requires === pId) {
              const eVal = spellDefs[wVal.evolution];
              const ownsWep = !!p.weapons[wKey];
              evolvesList.push(`&bull; <b>${wVal.name.split('(')[0]}</b> ➔ ${eVal ? eVal.name.split('(')[0] : ''} ${ownsWep ? '<span style="color:#34d399;">(✅ Đang trang bị)</span>' : '<span style="color:#94a3b8;">(⚠️ Chưa có)</span>'}`);
            }
          }
          const evoHelpText = evolvesList.length > 0 ? `
            <div style="font-size:11px; color:#38bdf8; margin-top:4px; background:rgba(15,23,42,0.6); padding:4px 8px; border-radius:6px; line-height:1.4;">
              ⚡ <b>Dùng để tiến hóa vũ khí:</b><br>${evolvesList.join('<br>')}
            </div>
          ` : '';

          const gearDiv = document.createElement('div');
          gearDiv.className = 'stat-gear-item';
          gearDiv.innerHTML = `
            <div class="stat-gear-icon">${def.icon || '📘'}</div>
            <div class="stat-gear-info" style="flex: 1;">
              <div class="stat-gear-name" style="display:flex; justify-content:space-between; align-items:center;">
                <span>${def.name || pId}</span>
                <span style="color:#34d399; font-weight:700;">[Cấp ${lv}/${def.maxLevel || 5}]</span>
              </div>
              <div class="stat-gear-desc">${def.description || def.desc || ''}</div>
              ${evoHelpText}
            </div>
          `;
          passContainer.appendChild(gearDiv);
        }
      }

      // Display infinite passives
      if (p.infinitePassives) {
        for (const [infId, infLv] of Object.entries(p.infinitePassives)) {
          if (infLv > 0) {
            const def = spellDefs[infId] || {};
            const gearDiv = document.createElement('div');
            gearDiv.className = 'stat-gear-item infinite-card';
            gearDiv.style.border = '1px solid #f59e0b';
            gearDiv.style.background = 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(120,53,15,0.35))';
            gearDiv.innerHTML = `
              <div class="stat-gear-icon">${def.icon || '💖'}</div>
              <div class="stat-gear-info" style="flex: 1;">
                <div class="stat-gear-name" style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#fbbf24; font-weight:800;">${def.name || infId}</span>
                  <span style="color:#f59e0b; font-weight:900;">[VÔ HẠN: Cấp ${infLv}]</span>
                </div>
                <div class="stat-gear-desc">${def.description || ''}</div>
                <div style="font-size:11px; color:#34d399; margin-top:4px; font-weight:700;">
                  ✨ Tích lũy hiện tại: ${infId === 'infinite_vitality' ? `+${infLv * 50} HP Tối Đa` : `+${infLv * 10}% Sát Thương Toàn Bộ`}
                </div>
              </div>
            `;
            passContainer.appendChild(gearDiv);
          }
        }
      }
      // 6. Artifacts & Relics
      const artContainer = document.getElementById('stEquippedArtifacts');
      if (artContainer) {
        artContainer.innerHTML = '';
        const equippedList = this.artifacts ? this.artifacts.equipped : [null, null, null];
        const hasAny = equippedList.some(id => id !== null);
        if (!hasAny) {
          artContainer.innerHTML = '<div style="color:#64748b; font-size:12px; font-style:italic; padding: 4px;">Chưa trang bị Tạo Vật Cổ Đại nào. Tiêu diệt Boss để thu thập Cổ Vật thần bí!</div>';
        } else {
          for (let slot = 0; slot < 3; slot++) {
            const artId = equippedList[slot];
            if (!artId) continue;
            const def = window.ARTIFACT_DEFS ? window.ARTIFACT_DEFS[artId] : null;
            if (!def) continue;
            const star = this.artifacts ? this.artifacts.getStar(artId) : 1;
            const gearDiv = document.createElement('div');
            gearDiv.className = 'stat-gear-item relic-card';
            gearDiv.style.border = '1px solid #f59e0b';
            gearDiv.style.background = 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(120,53,15,0.45))';
            gearDiv.innerHTML = `
              <div class="stat-gear-icon">${def.icon}</div>
              <div class="stat-gear-info" style="flex: 1;">
                <div class="stat-gear-name" style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#fbbf24; font-weight:800;">${def.name}</span>
                  <span style="color:#f59e0b; font-weight:900;">[★ Cấp ${star}/3 &bull; Ô ${slot + 1}]</span>
                </div>
                <div class="stat-gear-desc">${def.description}</div>
                <div style="font-size:11.5px; color:#38bdf8; margin-top:4px; font-weight:700;">
                  ✨ Kỹ Năng Độc Quyền: <b>${def.skillName}</b> - ${def.skillDesc}
                </div>
              </div>
            `;
            artContainer.appendChild(gearDiv);
          }
        }
      }
    }
  }

  hurtPlayer(amount) {
    const p = this.player;
    if (!p || p.hp <= 0 || p.isDashing || p.isInvulnerable || this.godMode) return;

    const actualDmg = Math.max(1, amount * (1 - p.armor));

    // Artifact Shield / Cheat Death Hooks
    if (this.artifacts && this.artifacts.onPlayerHurt(actualDmg)) {
      this.updateHUD();
      return; // cheat death activated!
    }

    p.hp -= actualDmg;

    if (p.charId === 'yami' && p.hp / p.maxHp <= 0.4) {
      p.damageBonus = 0.8;
    }

    if (Math.random() < 0.2) {
      window.soundEngine.playerHurt();
      this.shakeScreen(3, 0.1);
    }

    this.updateHUD();

    if (p.hp <= 0) {
      this.gameOver();
    }
  }

  healPlayer(amount) {
    const p = this.player;
    if (!p) return;
    p.hp = Math.min(p.maxHp, p.hp + amount);
    this.spells.floatingTexts.push({
      x: p.x,
      y: p.y - 20,
      text: `+${Math.round(amount)} HP`,
      color: '#4ade80',
      size: 15,
      life: 0.8
    });
    this.updateHUD();
  }

  // Vampire Survivors Standard Linear Step EXP Formula (Paced & Balanced)
  calculateNextExp(level) {
    if (level < 20) {
      return 15 + (level - 1) * 18;
    } else if (level < 40) {
      return 358 + (level - 20) * 25;
    } else {
      return 858 + (level - 40) * 35;
    }
  }

  addExp(amount) {
    const p = this.player;
    if (!p || p.hp <= 0) return;
    const gained = amount * (1 + (p.expBonus || 0));
    p.exp += gained;

    let leveledUp = false;
    while (p.exp >= p.nextExp) {
      p.exp -= p.nextExp;
      p.level++;
      p.nextExp = this.calculateNextExp(p.level);
      this.pendingLevelUps = (this.pendingLevelUps || 0) + 1;
      leveledUp = true;
    }

    if (leveledUp && this.state === 'PLAYING') {
      this.pendingLevelUps--;
      this.triggerLevelUp();
    }
    this.updateHUD();
  }

  triggerLevelUp() {
    this.state = 'LEVEL_UP';
    window.soundEngine.levelUp();

    if (this.player.level >= 8) {
      if (this.player.charId === 'asta') this.player.isDevilMode = true;
      if (this.player.charId === 'yuno') this.player.isSpiritMode = true;
      if (this.player.charId === 'noelle') this.player.isValkyrie = true;
      if (this.player.charId === 'nacht') this.player.isDevilUnion = true;
      if (this.player.charId === 'licht') this.player.isElfAwakened = true;
    }

    try {
      this.renderLevelUpCards();
    } catch (err) {
      console.error('Lỗi khi render Level Up:', err);
    }
    const overlay = document.getElementById('levelUpOverlay');
    if (overlay) overlay.classList.remove('hidden');
  }

  renderLevelUpCards() {
    const cardsContainer = document.getElementById('levelUpCards');
    cardsContainer.innerHTML = '';

    const choices = this.getAvailableLevelUpChoices();
    if (choices.length === 0) {
      // Safe fallback so level-up screen NEVER freezes if all skills are maxed out
      choices.push({
        id: 'bonus_heal_coins',
        type: 'bonus_heal_coins',
        name: 'Trị Liệu & Clover Coins',
        icon: '💖',
        badge: 'HỒI PHỤC TỐI ĐA',
        description: 'Hồi phục 50% HP tối đa và nhận thêm 300 Clover Coins!'
      });
      choices.push({
        id: 'bonus_stat_dmg',
        type: 'bonus_stat_dmg',
        name: 'Chiến Ý Bất Diệt',
        icon: '⚔️',
        badge: 'BUFF SỨC MẠNH',
        description: 'Tăng vĩnh viễn 8% Sát Thương toàn bộ Ma Pháp trong trận đấu!'
      });
    }

    choices.forEach((choice) => {
      const card = document.createElement('div');
      card.className = `level-card ${choice.isEvolution ? 'evolution' : ''} ${choice.isSuperEvolution ? 'super-evolution' : ''} ${choice.isInfinite ? 'infinite-card' : ''}`;

      let evoReqHtml = '';
      if (choice.evolutionInfo && choice.evolutionInfo.evoName) {
        const ei = choice.evolutionInfo;
        const cleanEvoName = (ei.evoName || '').split('(')[0].trim();
        const cleanBookName = (ei.reqBookName || '').split('(')[0].trim();
        evoReqHtml = `
          <div class="evo-req-box">
            <div class="evo-req-title">✨ ${cleanEvoName}</div>
            <div class="evo-req-compact-row">
              <span class="evo-badge-pill ${ei.isWeaponLvReady ? 'done' : 'todo'}">🗡️ Lv.${ei.currentWeaponLv}/5 ${ei.isWeaponLvReady ? '✓' : '🔺'}</span>
              <span class="evo-badge-pill ${ei.hasReqBook ? 'done' : 'todo'}">${ei.reqBookIcon || '📕'} ${cleanBookName} ${ei.hasReqBook ? '✓' : '✗'}</span>
            </div>
            ${ei.superEvoName ? `
              <div style="font-size: 9.5px; color: #c084fc; margin-top: 1px; font-weight: 700;">
                🌟 Siêu Cấp 2: ${(ei.superEvoName || '').split('(')[0].trim()} (Cấp 10+)
              </div>
            ` : ''}
          </div>
        `;
      } else if (choice.passiveEvolutionInfo && choice.passiveEvolutionInfo.length > 0) {
        const items = choice.passiveEvolutionInfo.map(w => {
          const wName = (w.weaponName || '').split('(')[0].trim();
          return `<span class="evo-badge-pill ${w.hasWeapon ? 'done' : 'todo'}">${w.weaponIcon || '⚔️'} ${wName} ${w.hasWeapon ? `(Lv.${w.weaponLv})` : '✗'}</span>`;
        }).join('');
        evoReqHtml = `
          <div class="evo-req-box passive-link">
            <div class="evo-req-title">⚡ HỖ TRỢ TIẾN HÓA:</div>
            <div class="evo-req-compact-row">${items}</div>
          </div>
        `;
      } else if (choice.isEvolution) {
        if (choice.isSuperEvolution) {
          evoReqHtml = `
            <div class="evo-req-box ready-burst super-ready" style="border-color:#fbbf24; background:linear-gradient(135deg, rgba(120,53,15,0.7), rgba(88,28,135,0.7)); padding: 5px 8px; box-shadow: 0 0 15px rgba(245,158,11,0.5);">
              <div class="evo-req-title" style="color:#fef08a; font-size: 10px; font-weight:900;">👑 SIÊU TIẾN HÓA TỐI THƯỢNG (TIER 3)!</div>
            </div>
          `;
        } else {
          evoReqHtml = `
            <div class="evo-req-box ready-burst" style="border-color:#34d399; background:rgba(6,78,59,0.5); padding: 4px 6px;">
              <div class="evo-req-title" style="color:#34d399; font-size: 10px;">🔥 ĐÃ ĐỦ ĐIỀU KIỆN TIẾN HÓA!</div>
            </div>
          `;
        }
      }

      card.innerHTML = `
        <div class="card-icon">${choice.icon}</div>
        <div class="card-title">${choice.name}</div>
        <div class="card-badge">${choice.badge}</div>
        <div class="card-desc">${choice.description}</div>
        ${evoReqHtml}
      `;
      card.addEventListener('click', () => {
        this.applyUpgrade(choice);
        if (this.pendingLevelUps > 0) {
          this.pendingLevelUps--;
          this.triggerLevelUp();
        } else if (this.player && this.player.exp >= this.player.nextExp) {
          this.player.exp -= this.player.nextExp;
          this.player.level++;
          this.player.nextExp = this.calculateNextExp(this.player.level);
          this.triggerLevelUp();
        } else {
          document.getElementById('levelUpOverlay').classList.add('hidden');
          this.state = 'PLAYING';
          if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
          }
          window.focus();
        }
      });
      cardsContainer.appendChild(card);
    });

    // Reroll button (Image 2 - Talent: Card Reroll)
    let rerollContainer = document.getElementById('levelUpRerollContainer');
    if (!rerollContainer) {
      rerollContainer = document.createElement('div');
      rerollContainer.id = 'levelUpRerollContainer';
      rerollContainer.style.marginTop = '18px';
      rerollContainer.style.textAlign = 'center';
      cardsContainer.parentElement.appendChild(rerollContainer);
    }
    const left = this.player ? (this.player.rerollsLeft || 0) : 0;
    rerollContainer.innerHTML = `
      <button id="btnRerollLevelUp" class="btn-reroll-modal" ${left <= 0 ? 'disabled' : ''}>
        🔄 Đổi Thẻ (Còn lại: ${left} lượt)
      </button>
    `;
    const btn = document.getElementById('btnRerollLevelUp');
    if (btn && left > 0) {
      btn.onclick = () => {
        if (this.player.rerollsLeft > 0) {
          this.player.rerollsLeft--;
          window.soundEngine.cardFlip ? window.soundEngine.cardFlip() : null;
          this.renderLevelUpCards();
        }
      };
    }
  }

  getAvailableLevelUpChoices() {
    const p = this.player;
    const pool = [];

    // 1. Check Evolutions (Tier 2 and Tier 3 Super Evolution!)
    for (const [wId, item] of Object.entries(p.weapons)) {
      const def = window.SPELL_DEFS[wId];
      if (def && def.evolution) {
        const evoDef = window.SPELL_DEFS[def.evolution];
        const isSuper = (def.type === 'evolution');

        if (isSuper) {
          // Tier 3 Super Evolution: Chỉ áp dụng cho kĩ năng chính của nhân vật đã chọn khi đạt Cấp 10+!
          const isMain = item.isStartingWeapon || wId === p.startingWeaponId || def.id === p.startingWeaponId;
          if (isMain && p.level >= 10 && evoDef && !p.weapons[evoDef.id]) {
            pool.push({
              id: evoDef.id,
              type: 'evolution',
              replaces: wId,
              name: evoDef.name,
              icon: evoDef.icon,
              badge: '🌟 SIÊU TIẾN HÓA LẦN 2 (TIER 3) - THỨC TỈNH TỐI THƯỢNG 🌟',
              description: evoDef.description,
              isEvolution: true,
              isSuperEvolution: true,
              isStartingWeapon: true
            });
          }
        } else {
          // Tier 2: Mọi vũ khí đạt Cấp 5 kèm sách yêu cầu có thể tiến hóa
          const hasReqPassive = !def.requires || p.passives[def.requires];
          if (item.level >= 5 && hasReqPassive && evoDef && !p.weapons[evoDef.id]) {
            pool.push({
              id: evoDef.id,
              type: 'evolution',
              replaces: wId,
              name: evoDef.name,
              icon: evoDef.icon,
              badge: 'TIẾN HÓA HUYỀN THOẠI ⭐⭐⭐',
              description: evoDef.description,
              isEvolution: true,
              isSuperEvolution: false,
              isStartingWeapon: !!item.isStartingWeapon
            });
          }
        }
      }
    }

    // 2. Weapon upgrades (show evolution recipe and requirements)
    for (const [wId, item] of Object.entries(p.weapons)) {
      const def = window.SPELL_DEFS[wId];
      if (def && item.level < def.maxLevel) {
        const nextLv = item.level + 1;
        const evoDef = def.evolution ? window.SPELL_DEFS[def.evolution] : null;
        const reqDef = def.requires ? window.SPELL_DEFS[def.requires] : null;
        const superDef = evoDef && evoDef.evolution ? window.SPELL_DEFS[evoDef.evolution] : null;
        const isMain = item.isStartingWeapon || wId === p.startingWeaponId;
        const hasReqBook = def.requires ? !!p.passives[def.requires] : true;

        pool.push({
          id: wId,
          type: 'weapon_upgrade',
          name: def.name,
          icon: def.icon,
          badge: `Cấp ${item.level} ➔ Cấp ${nextLv}`,
          description: def.description,
          evolutionInfo: evoDef ? {
            evoName: evoDef.name,
            evoIcon: evoDef.icon,
            reqBookName: reqDef ? reqDef.name : 'Không cần',
            reqBookIcon: reqDef ? (reqDef.icon || '📘') : '📘',
            currentWeaponLv: item.level,
            isWeaponLvReady: nextLv >= 5,
            hasReqBook: hasReqBook,
            isStartingWeapon: isMain,
            superEvoName: isMain && superDef ? superDef.name : null,
            superEvoReqLv: 10,
            playerLevel: p.level
          } : null
        });
      }
    }

    // 3. New weapon (max 4)
    if (Object.keys(p.weapons).length < 4) {
      for (const [wId, def] of Object.entries(window.SPELL_DEFS)) {
        if (def.type === 'weapon' && !p.weapons[wId]) {
          const evoDef = def.evolution ? window.SPELL_DEFS[def.evolution] : null;
          const reqDef = def.requires ? window.SPELL_DEFS[def.requires] : null;
          const hasReqBook = def.requires ? !!p.passives[def.requires] : true;

          pool.push({
            id: wId,
            type: 'new_weapon',
            name: def.name,
            icon: def.icon,
            badge: 'VŨ KHÍ MỚI',
            description: def.description,
            evolutionInfo: evoDef ? {
              evoName: evoDef.name,
              evoIcon: evoDef.icon,
              reqBookName: reqDef ? reqDef.name : 'Không cần',
              reqBookIcon: reqDef ? (reqDef.icon || '📘') : '📘',
              currentWeaponLv: 0,
              isWeaponLvReady: false,
              hasReqBook: hasReqBook,
              isStartingWeapon: false,
              superEvoName: null,
              superEvoReqLv: 10,
              playerLevel: p.level
            } : null
          });
        }
      }
    }

    // 4. Passive upgrades
    for (const [pasId, level] of Object.entries(p.passives)) {
      const def = window.SPELL_DEFS[pasId];
      if (def && level < def.maxLevel) {
        const evolvesList = [];
        for (const [wKey, wVal] of Object.entries(window.SPELL_DEFS)) {
          if (wVal.type === 'weapon' && wVal.requires === pasId) {
            const eVal = window.SPELL_DEFS[wVal.evolution];
            evolvesList.push({
              weaponName: wVal.name.split('(')[0],
              weaponIcon: wVal.icon || '⚔️',
              evoName: eVal ? eVal.name.split('(')[0] : '',
              hasWeapon: !!p.weapons[wKey],
              weaponLv: p.weapons[wKey] ? p.weapons[wKey].level : 0
            });
          }
        }
        pool.push({
          id: pasId,
          type: 'passive_upgrade',
          name: def.name,
          icon: def.icon,
          badge: `Cấp ${level} ➔ Cấp ${level + 1}`,
          description: def.description,
          passiveEvolutionInfo: evolvesList
        });
      }
    }

    // 5. New passive (max 4)
    if (Object.keys(p.passives).length < 4) {
      for (const [pasId, def] of Object.entries(window.SPELL_DEFS)) {
        if (def.type === 'passive' && !p.passives[pasId]) {
          const evolvesList = [];
          for (const [wKey, wVal] of Object.entries(window.SPELL_DEFS)) {
            if (wVal.type === 'weapon' && wVal.requires === pasId) {
              const eVal = window.SPELL_DEFS[wVal.evolution];
              evolvesList.push({
                weaponName: wVal.name.split('(')[0],
                weaponIcon: wVal.icon || '⚔️',
                evoName: eVal ? eVal.name.split('(')[0] : '',
                hasWeapon: !!p.weapons[wKey],
                weaponLv: p.weapons[wKey] ? p.weapons[wKey].level : 0
              });
            }
          }
          pool.push({
            id: pasId,
            type: 'new_passive',
            name: def.name,
            icon: def.icon,
            badge: 'SÁCH PHÉP MỚI',
            description: def.description,
            passiveEvolutionInfo: evolvesList
          });
        }
      }
    }

    // 6. Bị động Vô Hạn (Infinite Passives - Chọn vô hạn lần để tăng Máu và Sát Thương cực hạn)
    if (!p.infinitePassives) {
      p.infinitePassives = { infinite_vitality: 0, infinite_might: 0 };
    }
    const infVitLv = p.infinitePassives.infinite_vitality || 0;
    const infMightLv = p.infinitePassives.infinite_might || 0;

    const vitDef = (typeof SPELL_DEFS !== 'undefined' ? SPELL_DEFS['infinite_vitality'] : null) || (window.SPELL_DEFS && window.SPELL_DEFS['infinite_vitality']);
    const mightDef = (typeof SPELL_DEFS !== 'undefined' ? SPELL_DEFS['infinite_might'] : null) || (window.SPELL_DEFS && window.SPELL_DEFS['infinite_might']);

    pool.push({
      id: 'infinite_vitality',
      type: 'infinite_passive',
      name: vitDef ? vitDef.name : 'Sinh Mệnh Vô Cực',
      icon: vitDef ? vitDef.icon : '💖',
      badge: `VÔ HẠN (Cấp ${infVitLv} ➔ ${infVitLv + 1})`,
      description: `Tăng vĩnh viễn +50 Máu Tối Đa và hồi phục ngay +50 HP (Đã tích lũy: +${infVitLv * 50} HP). Có thể chọn vô hạn lần!`,
      isInfinite: true
    });

    pool.push({
      id: 'infinite_might',
      type: 'infinite_passive',
      name: mightDef ? mightDef.name : 'Sức Mạnh Vô Cực',
      icon: mightDef ? mightDef.icon : '🔥',
      badge: `VÔ HẠN (Cấp ${infMightLv} ➔ ${infMightLv + 1})`,
      description: `Tăng vĩnh viễn +10% Sát Thương toàn bộ chiêu thức (Đã tích lũy: +${infMightLv * 10}%). Có thể chọn vô hạn lần!`,
      isInfinite: true
    });

    // Prioritize evolutions! Evolutions ALWAYS show up in choices when unlocked!
    const evos = pool.filter(c => c.isEvolution);
    const others = pool.filter(c => !c.isEvolution);
    others.sort(() => Math.random() - 0.5);

    const result = [...evos, ...others];
    return result.slice(0, 3);
  }

  applyUpgrade(choice) {
    const p = this.player;

    if (choice.type === 'evolution') {
      const wasMain = (p.weapons[choice.replaces] && p.weapons[choice.replaces].isStartingWeapon) || choice.isStartingWeapon;
      delete p.weapons[choice.replaces];
      p.weapons[choice.id] = { level: 1, timer: 0, isStartingWeapon: !!wasMain };
      window.soundEngine.evolution();
      this.shakeScreen(choice.isSuperEvolution ? 16 : 8, 0.4);
      if (choice.isSuperEvolution) {
        this.triggerComboBanner(`🌟 SIÊU TIẾN HÓA LẦN 2: ${choice.name.toUpperCase()}! 🌟`);
        this.spells.spawnShockwave(p.x, p.y, '#fef08a', 600, 0.5);
      }
    } else if (choice.type === 'weapon_upgrade') {
      p.weapons[choice.id].level++;
    } else if (choice.type === 'new_weapon') {
      p.weapons[choice.id] = { level: 1, timer: 0 };
    } else if (choice.type === 'passive_upgrade') {
      p.passives[choice.id]++;
      this.recalculatePassives();
    } else if (choice.type === 'new_passive') {
      p.passives[choice.id] = 1;
      this.recalculatePassives();
    } else if (choice.type === 'infinite_passive') {
      if (!p.infinitePassives) p.infinitePassives = { infinite_vitality: 0, infinite_might: 0 };
      p.infinitePassives[choice.id] = (p.infinitePassives[choice.id] || 0) + 1;
      this.recalculatePassives();
      if (choice.id === 'infinite_vitality') {
        p.hp = Math.min(p.maxHp, p.hp + 50);
        window.soundEngine.pickup();
        this.spells.floatingTexts.push({
          x: p.x,
          y: p.y - 20,
          text: '+50 MÁU TỐI ĐA! (HỒI 50 HP)',
          color: '#ec4899',
          size: 16,
          life: 0.8
        });
      } else if (choice.id === 'infinite_might') {
        window.soundEngine.evolution();
        this.spells.floatingTexts.push({
          x: p.x,
          y: p.y - 20,
          text: '+10% SÁT THƯƠNG VÔ HẠN!',
          color: '#f97316',
          size: 16,
          life: 0.8
        });
      }
    } else if (choice.type === 'bonus_heal_coins') {
      p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.5);
      this.currency.coins += 300;
      window.soundEngine.pickup();
    } else if (choice.type === 'bonus_stat_dmg') {
      p.damageBonus = (p.damageBonus || 0) + 0.08;
      window.soundEngine.evolution();
    }

    this.updateHUD();
  }

  recalculatePassives() {
    const p = this.player;
    if (!p) return;
    const up = this.getCharUpgrades(p.charId);

    const infVitLv = (p.infinitePassives && p.infinitePassives.infinite_vitality) || 0;
    const infMightLv = (p.infinitePassives && p.infinitePassives.infinite_might) || 0;

    p.damageBonus = (up.strength || 0) * 0.015 + (infMightLv * 0.10);
    p.cooldownReduction = (p.charId === 'luck' ? 0.15 : (p.charId === 'licht' ? 0.12 : 0)) + ((up.reflexes || 0) * 0.01);
    p.areaBonus = (p.charId === 'noelle' ? 0.3 : (p.charId === 'licht' ? 0.35 : 0));
    
    // Base Crit Values: If no character trait and no upgrades/relics, starts from 0%
    const baseCharCrit = (p.charId === 'yami' ? 0.15 : (p.charId === 'nacht' ? 0.12 : 0));
    const upgradeCrit = (up.crit || 0) * 0.015;
    const upgradeCritDmg = (up.crit || 0) * 0.02;

    p.critChance = baseCharCrit + upgradeCrit;
    p.critDmgBonus = upgradeCritDmg;
    p.pickupRadius = 80 + ((up.magnet || 0) * 6);
    p.expBonus = (p.charId === 'julius' ? 0.3 : 0) + ((up.wisdom || 0) * 0.02);

    let speedBonus = 1 + ((up.stride || 0) * 0.015);
    if (p.charId === 'yuno') speedBonus += 0.2;
    if (p.charId === 'grey') p.pickupRadius += 30;

    let manaSkinLv = 0;
    for (const [id, lv] of Object.entries(p.passives)) {
      if (id === 'reinforcement') p.damageBonus += lv * 0.14;
      if (id === 'wind_glide') speedBonus += lv * 0.14;
      if (id === 'mana_skin') {
        manaSkinLv = lv;
        p.armor = Math.min(0.70, (CHARACTERS[p.charId].baseArmor || 0) + ((up.armor || 0) * 0.01) + lv * 0.10);
      }
      if (id === 'ki_sense') p.critChance += lv * 0.20; // +20% Crit Rate per level (Max 100%)
      if (id === 'crit_damage') p.critDmgBonus += lv * 0.40; // +40% Crit Damage per level (Max 200% at Lv 5)
      if (id === 'mana_resonance') p.cooldownReduction = Math.min(0.55, p.cooldownReduction + lv * 0.10);
      if (id === 'devil_pact') p.areaBonus += lv * 0.20;
      if (id === 'mana_magnet') p.pickupRadius += lv * 40;
      if (id === 'clover_fortune') p.expBonus += lv * 0.25;
    }

    p.maxHp = CHARACTERS[p.charId].baseHp + ((up.vitality || 0) * 4) + (manaSkinLv * 30) + (infVitLv * 50);
    p.speed = CHARACTERS[p.charId].baseSpeed * speedBonus;

    // Apply Artifact & Relic stats
    if (this.artifacts) {
      this.artifacts.applyEquippedStats(p);
    }

    // Caps per user requirement: Max Crit Rate = 100% (1.0), Max Crit Damage = 200% (2.0)
    p.critChance = Math.min(1.0, Math.max(0, p.critChance || 0));
    p.critDmgBonus = Math.min(2.0, Math.max(0, p.critDmgBonus || 0));
  }

  updateTargeting() {
    const p = this.player;
    if (!p) return;

    if (this.currentTarget) {
      const dx = this.currentTarget.x - p.x;
      const dy = this.currentTarget.y - p.y;
      if (this.currentTarget.hp <= 0 || this.currentTarget.isDead || (dx * dx + dy * dy > 640000)) {
        this.currentTarget = null;
      }
    }

    if (!this.currentTarget && this.autoTargetEnabled && this.enemies.length > 0) {
      let bestTarget = null;
      let highestScore = -Infinity;

      for (const e of this.enemies) {
        if (e.hp <= 0 || e.isDead) continue;
        const dx = e.x - p.x;
        const dy = e.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > 422500) continue; // 650px

        const dist = Math.sqrt(distSq);
        let score = 1000 - dist;
        if (e.isBoss) score += 3000;
        else if (e.type === 'lesser_devil' || e.type === 'high_devil') score += 400;

        if (score > highestScore) {
          highestScore = score;
          bestTarget = e;
        }
      }

      this.currentTarget = bestTarget;
    }

    if (this.currentTarget && !p.isMoving) {
      const dx = this.currentTarget.x - p.x;
      if (Math.abs(dx) > 5) {
        p.facing = dx >= 0 ? 1 : -1;
      }
    }
  }

  spawnDrop(x, y, type, val) {
    this.drops.push({
      x: x,
      y: y,
      type: type,
      val: val || 1,
      collected: false
    });
  }

  triggerComboBanner(text) {
    this.comboBanner.text = text;
    this.comboBanner.alpha = 1.0;
    this.comboBanner.scale = 1.35;
  }

  onEnemyKilled(enemy) {
    this.killCount++;
    this.totalDamageDealt += enemy.maxHp;

    // Combo system
    this.comboCount++;
    this.comboTimer = 2.8;
    if (this.comboCount === 10) this.triggerComboBanner("🔥 10 COMBO - LIÊN KÍCH MANA!");
    else if (this.comboCount === 25) this.triggerComboBanner("⚡ 25 COMBO - BÃO TỐ MA PHÁP!");
    else if (this.comboCount === 50) this.triggerComboBanner("⚔️ 50 COMBO - VƯỢT QUA GIỚI HẠN!");
    else if (this.comboCount === 100) this.triggerComboBanner("👑 100 COMBO - UY LỰC MA PHÁP ĐẾ!");
    else if (this.comboCount % 50 === 0 && this.comboCount > 100) this.triggerComboBanner(`🌟 ${this.comboCount} COMBO HUYỀN THOẠI!`);

    if (this.currentTarget === enemy) {
      this.currentTarget = null;
    }

    // Drops
    this.spawnDrop(enemy.x, enemy.y, 'mana', enemy.expValue);

    // Artifact kill hook (Lucifero Demon Heart)
    if (this.artifacts) {
      this.artifacts.onEnemyKill(enemy);
    }

    // Coin drop chance (earn coins for gacha & upgrades!)
    if (Math.random() < 0.25) {
      const mult = this.coinDropMultiplier || 1.0;
      const coinAmt = Math.max(1, Math.round((2 + Math.floor(Math.random() * 4)) * mult));
      this.spawnDrop(enemy.x + 8, enemy.y + 8, 'coin', coinAmt);
    }

    if (enemy.isBoss) {
      this.spawnDrop(enemy.x, enemy.y, 'chest', 100);
      this.spawnDrop(enemy.x + 20, enemy.y, 'ticket', 5); // 5 Summon Tickets from boss!
      this.spawnDrop(enemy.x - 20, enemy.y, 'coin', 200);

      // BOSS LUÔN RƠI RA TẠO VẬT CỔ ĐẠI (ANCIENT RELIC DROP)!
      if (this.artifacts) {
        this.artifacts.spawnBossRelicDrop(enemy.x, enemy.y, enemy.type);
      }

      if (enemy.isFinalBoss || (this.gameTime >= 1740 && (enemy.type === 'boss_zagred' || enemy.type === 'boss_lucifero'))) {
        this.spawnDrop(enemy.x + 50, enemy.y, 'ticket', 15);
        this.spawnDrop(enemy.x - 50, enemy.y, 'coin', 1500);
        setTimeout(() => this.victory(), 1500);
      } else if (enemy.isMiniBoss10) {
        this.triggerComboBanner('⚔️ ĐÃ HẠ GỤC BOSS NHỎ PHÚT 10! TIẾP TỤC ĐẾN PHÚT 20!');
        this.spawnDrop(enemy.x + 40, enemy.y, 'chest', 100);
        this.spawnDrop(enemy.x - 40, enemy.y, 'ticket', 5);
        this.spawnDrop(enemy.x, enemy.y + 20, 'coin', 500);
      } else if (enemy.isMiniBoss20) {
        this.triggerComboBanner('💥 ĐÃ HẠ GỤC BOSS NHỎ PHÚT 20! CHUẨN BỊ ĐẠI CHIẾN PHÚT 30!');
        this.spawnDrop(enemy.x + 40, enemy.y, 'chest', 100);
        this.spawnDrop(enemy.x - 40, enemy.y, 'ticket', 10);
        this.spawnDrop(enemy.x, enemy.y + 20, 'coin', 1000);
      }
    } else if (Math.random() < 0.04) {
      this.spawnDrop(enemy.x, enemy.y, 'food', 30);
    }

    // Khi quái chết sẽ biến mất ngay lập tức khỏi mảng enemies!
    const deadIdx = this.enemies.indexOf(enemy);
    if (deadIdx !== -1) {
      this.enemies.splice(deadIdx, 1);
    }
  }

  shakeScreen(intensity, duration) {
    if (!this.screenShakeEnabled) return;
    this.shake.intensity = intensity;
    this.shake.duration = duration;
  }

  showBossBanner(name) {
    const banner = document.getElementById('bossBanner');
    if (banner) {
      banner.innerText = `CẢNH BÁO BOSS XUẤT HIỆN: ${name}!`;
      banner.classList.remove('hidden');
      setTimeout(() => banner.classList.add('hidden'), 4500);
    }
  }

  gameOver() {
    this.state = 'GAME_OVER';
    window.soundEngine.gameOver();
    this.saveGameData();

    document.getElementById('hud').classList.add('hidden');
    document.getElementById('gameOverOverlay').classList.remove('hidden');
    document.getElementById('goKills').innerText = this.killCount;
    document.getElementById('goTime').innerText = this.formatTime(this.gameTime);
    document.getElementById('goLevel').innerText = this.player.level;
  }

  victory() {
    if (this.victoryShown) return;
    this.victoryShown = true;

    this.state = 'VICTORY';
    window.soundEngine.victory();

    // Reward big victory currency!
    this.currency.coins += 2000;
    this.currency.tickets += 15;
    this.saveGameData();

    document.getElementById('hud').classList.add('hidden');
    document.getElementById('victoryOverlay').classList.remove('hidden');
    document.getElementById('vicKills').innerText = this.killCount;
    document.getElementById('vicTime').innerText = this.formatTime(this.gameTime);
    document.getElementById('vicLevel').innerText = this.player.level;
  }

  continueEndlessMode() {
    this.isEndlessMode = true;
    this.state = 'PLAYING';
    document.getElementById('victoryOverlay').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    this.triggerComboBanner('🔥 TIẾP TỤC VƯỢT GIỚI HẠN: TIẾN VÀO CHẾ ĐỘ VÔ TẬN!');
    window.soundEngine.evolution();
  }

  quitCurrentRun() {
    this.saveGameData();
    window.soundEngine.stopBGM();
    this.state = 'MENU';
    document.querySelectorAll('.overlay').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.modal-overlay-custom').forEach(el => el.classList.add('hidden'));
    this.statsInspectorOpen = false;
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('menuOverlay').classList.remove('hidden');
    const topNav = document.getElementById('topNavBar');
    if (topNav) topNav.classList.remove('hidden');
    this.updateTopBarCurrency();
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  updateHUD() {
    const p = this.player;
    if (!p) return;

    const hpPct = Math.max(0, Math.min(100, (p.hp / p.maxHp) * 100));
    document.getElementById('hpFill').style.width = `${hpPct}%`;
    document.getElementById('hpText').innerText = `${Math.ceil(p.hp)} / ${p.maxHp}`;

    const expPct = Math.max(0, Math.min(100, (p.exp / p.nextExp) * 100));
    document.getElementById('expFill').style.width = `${expPct}%`;
    document.getElementById('levelBadge').innerText = `Lv.${p.level}`;

    document.getElementById('timerText').innerText = this.formatTime(this.gameTime);
    document.getElementById('killText').innerText = `💀 ${this.killCount}`;

    const targetPill = document.getElementById('targetLockPill');
    if (targetPill) {
      if (this.currentTarget && this.currentTarget.hp > 0) {
        const tName = this.currentTarget.isBoss ? (this.currentTarget.name || 'ĐẠI BOSS') : this.currentTarget.type.toUpperCase();
        targetPill.innerText = `🎯 ĐÃ GHIM: ${tName}`;
        targetPill.classList.remove('hidden');
      } else {
        targetPill.classList.add('hidden');
      }
    }

    const dashCdPct = Math.max(0, 1 - (p.dashTimer / p.dashCooldown)) * 100;
    const dashElem = document.getElementById('dashIndicator');
    if (dashElem) dashElem.style.width = `${dashCdPct}%`;

    const wContainer = document.getElementById('activeWeapons');
    if (wContainer) {
      wContainer.innerHTML = '';
      for (const [wId, item] of Object.entries(p.weapons)) {
        const def = window.SPELL_DEFS[wId];
        if (def) {
          const icon = document.createElement('div');
          icon.className = 'slot-icon';
          icon.title = `${def.name} (Lv.${item.level})`;
          icon.innerHTML = `${def.icon}<span class="slot-lv">${item.level}</span>`;
          wContainer.appendChild(icon);
        }
      }
    }

    const pContainer = document.getElementById('activePassives');
    if (pContainer) {
      pContainer.innerHTML = '';
      for (const [pId, lv] of Object.entries(p.passives)) {
        const def = window.SPELL_DEFS[pId];
        if (def) {
          const icon = document.createElement('div');
          icon.className = 'slot-icon passive';
          icon.title = `${def.name} (Lv.${lv})`;
          icon.innerHTML = `${def.icon}<span class="slot-lv">${lv}</span>`;
          pContainer.appendChild(icon);
        }
      }
      if (p.infinitePassives) {
        for (const [infId, infLv] of Object.entries(p.infinitePassives)) {
          if (infLv > 0) {
            const def = (typeof SPELL_DEFS !== 'undefined' ? SPELL_DEFS[infId] : null) || (window.SPELL_DEFS && window.SPELL_DEFS[infId]);
            if (def) {
              const icon = document.createElement('div');
              icon.className = 'slot-icon passive infinite';
              icon.title = `${def.name} (Cấp Vô Hạn: ${infLv})`;
              icon.innerHTML = `${def.icon}<span class="slot-lv inf">∞${infLv}</span>`;
              pContainer.appendChild(icon);
            }
          }
        }
      }
    }

    const artContainer = document.getElementById('activeArtifacts');
    if (artContainer && this.artifacts) {
      artContainer.innerHTML = '';
      for (const artId of this.artifacts.equipped) {
        if (!artId) continue;
        const def = window.ARTIFACT_DEFS ? window.ARTIFACT_DEFS[artId] : null;
        if (def) {
          const star = this.artifacts.getStar(artId);
          const icon = document.createElement('div');
          icon.className = 'slot-icon artifact';
          icon.title = `${def.name} (★${star})\nKỹ năng: ${def.skillName} - ${def.skillDesc}`;
          icon.innerHTML = `${def.icon}<span class="slot-lv art-star">★${star}</span>`;
          artContainer.appendChild(icon);
        }
      }
    }

    const boss = this.enemyManager.bossActive;
    const bossContainer = document.getElementById('bossBarContainer');
    if (boss && boss.hp > 0 && !boss.isDead) {
      bossContainer.classList.remove('hidden');
      const bPct = Math.max(0, Math.min(100, (boss.hp / boss.maxHp) * 100));
      document.getElementById('bossHpFill').style.width = `${bPct}%`;
      document.getElementById('bossNameText').innerText = boss.name;
    } else {
      bossContainer.classList.add('hidden');
    }
  }

  // HIGH PERFORMANCE INTEGER KEY SPATIAL PARTITIONING
  rebuildSpatialGrid() {
    this.grid.clear();
    const gs = this.gridSize;
    for (const e of this.enemies) {
      if (!e || e.isDead || e.hp <= 0) continue;
      const gx = Math.floor(e.x / gs);
      const gy = Math.floor(e.y / gs);
      const key = ((gx & 0xFFFF) << 16) | (gy & 0xFFFF);
      if (!this.grid.has(key)) this.grid.set(key, []);
      this.grid.get(key).push(e);
    }
  }

  getEnemiesNear(x, y, radius) {
    const results = [];
    const gs = this.gridSize;
    const minGx = Math.floor((x - radius) / gs);
    const maxGx = Math.floor((x + radius) / gs);
    const minGy = Math.floor((y - radius) / gs);
    const maxGy = Math.floor((y + radius) / gs);

    for (let gx = minGx; gx <= maxGx; gx++) {
      for (let gy = minGy; gy <= maxGy; gy++) {
        const key = ((gx & 0xFFFF) << 16) | (gy & 0xFFFF);
        const cell = this.grid.get(key);
        if (cell) {
          for (const e of cell) {
            if (e && !e.isDead && e.hp > 0) {
              results.push(e);
            }
          }
        }
      }
    }
    return results;
  }

  loop(now) {
    const rawDt = Math.min(0.08, (now - this.lastTime) / 1000);
    this.lastTime = now;
    let dt = rawDt;
    if (this.gameSpeed && this.gameSpeed > 0) {
      dt *= this.gameSpeed;
    }
    this.lastDt = dt;

    try {
      if (this.state === 'PLAYING') {
        // Sub-step physics so x10 game speed runs accurately without collision tunneling or lag
        const maxSubStep = 0.033;
        const steps = Math.min(10, Math.ceil(dt / maxSubStep));
        const subDt = dt / steps;
        for (let s = 0; s < steps; s++) {
          this.update(subDt);
        }
      }
      this.render();
    } catch (err) {
      console.error('Lỗi Game Loop:', err);
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  update(dt) {
    this.tick++;
    this.gameTime += dt;
    const p = this.player;

    // Passive HP Regen
    if (p.hpRegen > 0 && p.hp < p.maxHp) {
      p.hp = Math.min(p.maxHp, p.hp + p.hpRegen * dt);
    }

    // Combo Timer Decay
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.comboCount = 0;
    }
    if (this.comboBanner.alpha > 0) {
      this.comboBanner.alpha -= dt * 0.7;
      if (this.comboBanner.scale > 1.0) {
        this.comboBanner.scale = Math.max(1.0, this.comboBanner.scale - dt * 2.0);
      }
    }

    // Movement: supports WASD, Arrow keys, physical KeyW/A/S/D codes (immune to Vietnamese IME) and IME characters
        // MOVEMENT INPUT: dynamic customizable keybinds + touch input
    let mx = 0;
    let my = 0;
    const isUp = this.isActionActive('up');
    const isDown = this.isActionActive('down');
    const isLeft = this.isActionActive('left');
    const isRight = this.isActionActive('right');

    if (isUp) my -= 1;
    if (isDown) my += 1;
    if (isLeft) mx -= 1;
    if (isRight) mx += 1;

    if (this.touchInput.active) {
      mx = this.touchInput.vx;
      my = this.touchInput.vy;
    }

    const moveLen = Math.hypot(mx, my);
    p.isMoving = moveLen > 0;

    if (moveLen > 0) {
      const normX = mx / moveLen;
      const normY = my / moveLen;
      let spd = p.speed;

      if (p.isDashing) spd *= 2.8;

      p.x += normX * spd * dt;
      p.y += normY * spd * dt;

      if (mx > 0) p.facing = 1;
      else if (mx < 0) p.facing = -1;
    }

    p.x = Math.max(50, Math.min(this.worldWidth - 50, p.x));
    p.y = Math.max(50, Math.min(this.worldHeight - 50, p.y));

    if (p.dashTimer > 0) p.dashTimer -= dt;
    if (p.dashDurationTimer > 0) {
      p.dashDurationTimer -= dt;
      if (p.dashDurationTimer <= 0) p.isDashing = false;
    }

    this.rebuildSpatialGrid();
    this.updateTargeting();
    try {
      this.spells.update(dt);
    } catch (spellErr) {
      console.error('Spells update error:', spellErr);
    }
    try {
      this.enemyManager.update(dt, this.gameTime);
    } catch (enemyErr) {
      console.error('EnemyManager update error:', enemyErr);
    }
    try {
      if (this.artifacts) this.artifacts.update(dt);
    } catch (artErr) {
      console.error('Artifacts update error:', artErr);
    }

    // Periodic chest spawning across the map
    this.chestSpawnTimer = (this.chestSpawnTimer || 35) - dt;
    if (this.chestSpawnTimer <= 0) {
      this.chestSpawnTimer = 35 + Math.random() * 15;
      const existingChests = this.drops.filter(d => d.type === 'chest').length;
      if (existingChests < 4) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 360 + Math.random() * 400;
        const cx = Math.max(100, Math.min(this.worldWidth - 100, p.x + Math.cos(angle) * dist));
        const cy = Math.max(100, Math.min(this.worldHeight - 100, p.y + Math.sin(angle) * dist));
        this.spawnDrop(cx, cy, 'chest', 100);
        this.spells.floatingTexts.push({ x: p.x, y: p.y - 40, text: `🎁 RƯƠNG MA ĐẠO XUẤT HIỆN!`, color: '#fbbf24', size: 16, life: 1.2 });
      }
    }

    // Drops & Magnetism
    const pX = p.x;
    const pY = p.y;
    const prSq = (p.radius + 15) * (p.radius + 15);
    const magSq = p.pickupRadius * p.pickupRadius;

    for (let i = this.drops.length - 1; i >= 0; i--) {
      const drop = this.drops[i];
      const dx = pX - drop.x;
      const dy = pY - drop.y;
      const distSq = dx * dx + dy * dy;

      if (drop.isMagnetized || distSq < magSq) {
        const dist = Math.sqrt(distSq) || 1;
        const spd = drop.isMagnetized ? (drop.magnetSpeed || 680) : 480;
        drop.x += (dx / dist) * spd * dt;
        drop.y += (dy / dist) * spd * dt;
      }

      if (distSq < prSq) {
        if (drop.type === 'mana') {
          this.addExp(drop.val);
          window.soundEngine.pickup();
        } else if (drop.type === 'coin') {
          this.currency.coins += drop.val;
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 15, text: `+${drop.val} COINS`, color: '#fbbf24', size: 14, life: 0.6 });
          window.soundEngine.pickup();
        } else if (drop.type === 'diamond') {
          this.currency.diamonds += drop.val;
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: `+${drop.val} 💎 KIM CƯƠNG!`, color: '#38bdf8', size: 18, life: 0.8 });
          window.soundEngine.evolution();
        } else if (drop.type === 'ticket') {
          this.currency.tickets += drop.val;
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: `+${drop.val} 🎫 TICKETS!`, color: '#f59e0b', size: 16, life: 0.8 });
          window.soundEngine.evolution();
        } else if (drop.type === 'purple_ticket') {
          this.currency.purpleTickets = (this.currency.purpleTickets || 0) + drop.val;
          this.spells.floatingTexts.push({ x: p.x, y: p.y - 25, text: `+${drop.val} 🎟️ VÉ HOÀNG KIM!`, color: '#c084fc', size: 18, life: 0.9 });
          window.soundEngine.evolution();
        } else if (drop.type === 'food') {
          this.healPlayer(drop.val);
          window.soundEngine.pickup();
        } else if (drop.type === 'artifact_relic') {
          if (this.artifacts) this.artifacts.collectRelicDrop(drop);
        } else if (drop.type === 'chest') {
          this.openMysteryChest(drop);
        } else if (drop.type === 'bomb') {
          this.activateScreenBomb();
        } else if (drop.type === 'magnet') {
          this.activateFullMapMagnet();
        }
        this.drops.splice(i, 1);
      }
    }

    // Cap total active drops to 160 to eliminate lag
    if (this.drops.length > 160) {
      this.drops.splice(0, this.drops.length - 160);
    }

    // Camera follow
    this.camera.x = p.x - this.canvas.width / 2;
    this.camera.y = p.y - this.canvas.height / 2;

    if (this.shake.duration > 0) {
      this.shake.duration -= dt;
      this.camera.x += (Math.random() - 0.5) * this.shake.intensity * 2;
      this.camera.y += (Math.random() - 0.5) * this.shake.intensity * 2;
    }

    if (this.tick % 6 === 0) {
      this.updateHUD();
    }
  }

  openMysteryChest(drop) {
    window.soundEngine.chestOpen();
    this.shakeScreen(7, 0.28);
    this.spells.spawnImpactParticles(this.player.x, this.player.y, '#fbbf24', 25);

    const roll = Math.random();
    if (roll < 0.30) {
      // 1. Coins (300 - 800)
      const amt = 300 + Math.floor(Math.random() * 500);
      this.currency.coins += amt;
      this.triggerComboBanner(`🪙 RƯƠNG BÁU: NHẬN +${amt} CLOVER COINS!`);
      this.spells.floatingTexts.push({ x: this.player.x, y: this.player.y - 35, text: `+${amt} 🪙 COINS!`, color: '#fbbf24', size: 22, life: 1.0 });
    } else if (roll < 0.55) {
      // 2. Yellow tickets (3 - 8)
      const amt = 3 + Math.floor(Math.random() * 6);
      this.currency.tickets += amt;
      this.triggerComboBanner(`🎫 RƯƠNG MAY MẮN: NHẬN +${amt} VÉ TRIỆU HỒI!`);
      this.spells.floatingTexts.push({ x: this.player.x, y: this.player.y - 35, text: `+${amt} 🎫 VÉ!`, color: '#fbbf24', size: 22, life: 1.0 });
    } else if (roll < 0.70) {
      // 3. Level Up immediately
      this.triggerComboBanner(`🆙 RƯƠNG TRI THỨC: THĂNG CẤP MA PHÁP NGAY LẬP TỨC!`);
      this.triggerLevelUp();
    } else if (roll < 0.85) {
      // 4. Full Map Magnet
      this.triggerComboBanner(`🧲 RƯƠNG BÍ THUẬT: KÍCH HOẠT NAM CHÂM TOÀN BẢN ĐỒ!`);
      this.activateFullMapMagnet();
    } else {
      // 5. Smart Bomb (Nuke map)
      this.triggerComboBanner(`💣 RƯƠNG HỦY DIỆT: KÍCH HOẠT BOM HẠ GỤC TOÀN MAP!`);
      this.activateScreenBomb();
    }
  }

  activateFullMapMagnet() {
    window.soundEngine.magnetPickup();
    this.shakeScreen(5, 0.2);
    for (const d of this.drops) {
      d.isMagnetized = true;
      d.magnetSpeed = 680;
    }
    this.spells.spawnShockwave(this.player.x, this.player.y, '#38bdf8', 450, 0.35);
  }

  activateScreenBomb() {
    window.soundEngine.bombExplode();
    this.shakeScreen(18, 0.65);
    this.whiteFlash = 0.65;
    this.spells.spawnShockwave(this.player.x, this.player.y, '#f59e0b', 800, 0.6);
    this.spells.spawnShockwave(this.player.x, this.player.y, '#ef4444', 600, 0.5);

    const enemiesCopy = this.enemies.slice();
    for (const enemy of enemiesCopy) {
      if (!enemy || enemy.isDead || enemy.hp <= 0) continue;
      if (enemy.isBoss) {
        this.spells.applyDamage(enemy, 2500, true, '#ef4444');
      } else {
        this.spells.applyDamage(enemy, 9999, true, '#f59e0b');
      }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.state === 'MENU') {
      this.drawMenuBackdrop(ctx);
      return;
    }

    ctx.save();
    ctx.translate(-this.camera.x, -this.camera.y);

    const isUnderworld = this.selectedMapId === 'underworld_palace';

    // 1. World Background
    this.drawWorldBackground(ctx, isUnderworld);

    // 2. Ground Details (Clovers on Map 1, Magma Cracks on Map 2)
    if (window.Sprites && window.Sprites.drawGroundDetails) {
      window.Sprites.drawGroundDetails(ctx, this.camera, this.canvas.width, this.canvas.height, this.tick, isUnderworld);
    }

    // 3. Dynamic Player Illumination Halo
    if (this.player) {
      const pGrad = ctx.createRadialGradient(this.player.x, this.player.y, 25, this.player.x, this.player.y, 420);
      pGrad.addColorStop(0, isUnderworld ? 'rgba(251, 146, 60, 0.12)' : 'rgba(255, 255, 255, 0.12)');
      pGrad.addColorStop(0.35, isUnderworld ? 'rgba(168, 85, 247, 0.06)' : 'rgba(56, 189, 248, 0.06)');
      pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = pGrad;
      ctx.beginPath();
      ctx.arc(this.player.x, this.player.y, 420, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Ambient Motes
    if (window.Sprites && window.Sprites.drawAmbient) {
      window.Sprites.drawAmbient(ctx, this.camera, this.canvas.width, this.canvas.height, this.lastDt, this.tick, isUnderworld);
    }

    // 5. Drops
    if (window.Sprites && window.Sprites.drawDrop) {
      for (const drop of this.drops) {
        window.Sprites.drawDrop(ctx, drop, this.tick);
      }
    }

    // 5.5 Danger Telegraphs (Red ground warning zones)
    if (this.enemyManager && this.enemyManager.drawTelegraphs) {
      this.enemyManager.drawTelegraphs(ctx);
    }

    // 6. Enemies - Quái chết biến mất ngay lập tức!
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      if (!enemy || enemy.isDead || enemy.hp <= 0) {
        this.enemies.splice(i, 1);
        continue;
      }
      if (window.Sprites && window.Sprites.drawEnemy) {
        window.Sprites.drawEnemy(ctx, enemy, this.tick);
      }
    }

    // 7. Target Lock Reticle
    if (this.currentTarget && !this.currentTarget.isDead && this.currentTarget.hp > 0) {
      if (window.Sprites && window.Sprites.drawTargetReticle) {
        window.Sprites.drawTargetReticle(ctx, this.currentTarget, this.tick);
      }
    } else {
      this.currentTarget = null;
    }

    // 8. Player Sprite
    if (this.player && window.Sprites && window.Sprites.drawPlayerSprite) {
      window.Sprites.drawPlayerSprite(ctx, this.player, this.tick);
    }

    // 9. Spells & FX
    this.spells.draw(ctx);

    // 9.5 Enemy Projectiles
    if (this.enemyManager && this.enemyManager.drawProjectiles) {
      this.enemyManager.drawProjectiles(ctx);
    }

    ctx.restore();

    // 10. Cinematic Vignette
    this.drawCinematicVignette(ctx);

    // 11. Combo Banner
    if (this.comboBanner.alpha > 0.01) {
      ctx.save();
      ctx.globalAlpha = Math.min(1, this.comboBanner.alpha);
      ctx.translate(this.canvas.width / 2, 135);
      ctx.scale(this.comboBanner.scale, this.comboBanner.scale);
      ctx.font = '900 24px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText(this.comboBanner.text, 0, 0);
      ctx.fillText(this.comboBanner.text, 0, 0);
      ctx.restore();
    }

    // 12. Minimap
    this.drawMinimap(ctx);

    // 13. Screen Bomb White Flash
    if (this.whiteFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.85, this.whiteFlash)})`;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.whiteFlash -= (this.lastDt || 0.016) * 1.5;
    }
  }

  drawWorldBackground(ctx, isUnderworld) {
    const tileSize = 200;
    const startX = Math.floor(this.camera.x / tileSize) * tileSize;
    const startY = Math.floor(this.camera.y / tileSize) * tileSize;
    const endX = this.camera.x + this.canvas.width + tileSize;
    const endY = this.camera.y + this.canvas.height + tileSize;

    for (let x = startX; x < endX; x += tileSize) {
      for (let y = startY; y < endY; y += tileSize) {
        const checker = (Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0;

        if (isUnderworld) {
          // MAP 2: Obsidian & Molten Ground
          ctx.fillStyle = checker ? '#1c1917' : '#0c0a09';
          ctx.fillRect(x, y, tileSize, tileSize);
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.06)';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x, y, tileSize, tileSize);
        } else {
          // MAP 1: Clover Grass & Paving
          ctx.fillStyle = checker ? '#141a18' : '#0e1412';
          ctx.fillRect(x, y, tileSize, tileSize);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, tileSize, tileSize);
        }
      }
    }

    // Center Grand Magic Seal
    const centerX = this.worldWidth / 2;
    const centerY = this.worldHeight / 2;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(this.tick * 0.005);

    if (isUnderworld) {
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.4)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 320, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 280, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // World Boundary Barrier
    ctx.strokeStyle = isUnderworld ? '#7c2d12' : '#ef4444';
    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, this.worldWidth, this.worldHeight);
  }

  drawCinematicVignette(ctx) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.58)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  drawMinimap(ctx) {
    if (!this.player) return;

    const size = 110;
    const margin = 18;
    const rx = this.canvas.width - size - margin;
    const ry = 68; // Positioned cleanly below top HUD buttons so it never overlaps them!

    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.fillRect(rx, ry, size, size);
    ctx.strokeRect(rx, ry, size, size);

    const px = rx + (this.player.x / this.worldWidth) * size;
    const py = ry + (this.player.y / this.worldHeight) * size;
    ctx.fillStyle = '#4ade80';
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();

    if (this.currentTarget && this.currentTarget.hp > 0) {
      const tx = rx + (this.currentTarget.x / this.worldWidth) * size;
      const ty = ry + (this.currentTarget.y / this.worldHeight) * size;
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(tx, ty, 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    const boss = this.enemyManager.bossActive;
    if (boss && boss.hp > 0 && !boss.isDead) {
      const bx = rx + (boss.x / this.worldWidth) * size;
      const by = ry + (boss.y / this.worldHeight) * size;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mystery Chests on minimap
    for (const d of this.drops) {
      if (d.type === 'chest') {
        const cx = rx + (d.x / this.worldWidth) * size;
        const cy = ry + (d.y / this.worldHeight) * size;
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  drawMenuBackdrop(ctx) {
    ctx.fillStyle = '#090a0f';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const t = performance.now() * 0.001;
    for (let i = 0; i < 24; i++) {
      const rx = (i * 1234 + t * 25) % this.canvas.width;
      const ry = (i * 876 + Math.sin(t + i) * 50) % this.canvas.height;
      ctx.fillStyle = 'rgba(234, 179, 8, 0.15)';
      ctx.beginPath();
      ctx.arc(rx, ry, 12 + (i % 12), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ==========================================
  // POKESURVIVOR GACHA SYSTEM (Image 1)
  // ==========================================
  renderGachaBanner(bannerId) {
    const banner = GACHA_BANNERS[bannerId] || GACHA_BANNERS['spooky'];
    this.currentGachaBanner = banner.id;

    // Update active tab styling
    document.querySelectorAll('.poke-tab').forEach(tab => {
      if (tab.dataset.banner === banner.id) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    const titleEl = document.getElementById('pokeBannerTitle');
    const descEl = document.getElementById('pokeBannerDesc');
    const badgeEl = document.getElementById('pokeBannerBadge');
    const collEl = document.getElementById('pokeBannerCollection');

    if (titleEl) titleEl.innerText = banner.title;
    if (descEl) descEl.innerText = banner.desc;
    if (badgeEl) badgeEl.innerText = banner.badge;

    const totalChars = Object.keys(CHARACTERS).length;
    const owned = this.unlockedCharacters ? this.unlockedCharacters.size : 1;
    const legendaries = ['julius', 'mereoleona', 'black_asta', 'lumiere', 'nacht', 'licht'];
    const ownedLegs = legendaries.filter(id => this.unlockedCharacters.has(id)).length;
    if (collEl) collEl.innerText = `You have ${owned} of ${totalChars} · ⭐ ${ownedLegs} shiny`;

    // Draw 3 featured animated character sprites on canvases
    const canvases = [
      document.getElementById('showcaseCanvas1'),
      document.getElementById('showcaseCanvas2'),
      document.getElementById('showcaseCanvas3')
    ];
    canvases.forEach((cvs, idx) => {
      if (!cvs) return;
      const cId = banner.featured[idx] || 'asta';
      const ctx = cvs.getContext('2d');
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      window.Sprites.drawPlayerSprite(ctx, {
        charId: cId,
        x: cvs.width / 2,
        y: cvs.height / 2 + 10,
        radius: 18,
        facing: idx === 2 ? -1 : 1,
        isMoving: false,
        isDevilMode: (cId === 'black_asta'),
        isSpiritMode: (cId === 'yuno'),
        isValkyrie: (cId === 'noelle'),
        isDevilUnion: (cId === 'nacht'),
        isElfAwakened: (cId === 'licht')
      }, this.tick || 0);
    });
  }

  pullGacha(bannerId, count = 10, usePurple = false) {
    const banner = GACHA_BANNERS[bannerId] || GACHA_BANNERS['spooky'];

    let canAfford = false;
    const ticketCost = count;
    const coinCost = count === 1 ? 2500 : (count === 10 ? 22500 : 200000);

    if (this.currency.tickets >= ticketCost) {
      this.currency.tickets -= ticketCost;
      canAfford = true;
    } else if (this.currency.coins >= coinCost) {
      this.currency.coins -= coinCost;
      canAfford = true;
    }

    if (!canAfford) {
      alert(`Không đủ Vé Triệu Hồi hoặc Coins!\nCần ${ticketCost} Vé hoặc ${coinCost.toLocaleString()} Coins.`);
      return;
    }

    window.soundEngine.gachaSummonStart();

    const legendaries = ['julius', 'mereoleona', 'black_asta', 'lumiere', 'nacht', 'licht', 'zenon', 'vanica', 'dante', 'secre', 'patry'];
    const epics = ['yami', 'fuegoleon', 'nozel', 'charlotte', 'dorothy', 'william', 'jack', 'langris', 'henry', 'fana', 'rhya', 'vetto'];
    const rares = ['yuno', 'noelle', 'luck', 'leopold', 'rill', 'mars', 'zora', 'gordon', 'grey', 'mimosa', 'klaus'];
    const commons = ['asta', 'magna', 'finral', 'charmy', 'sol'];

    // Giảm tỷ lệ trùng lặp: Nếu còn tướng trong bậc này chưa sở hữu, ưu tiên 85% ra tướng mới!
    const pickFromPool = (candidatePool) => {
      const unowned = candidatePool.filter(id => !this.unlockedCharacters.has(id));
      if (unowned.length > 0 && Math.random() < 0.85) {
        return unowned[Math.floor(Math.random() * unowned.length)];
      }
      return candidatePool[Math.floor(Math.random() * candidatePool.length)];
    };

    if (!this.bannerPity) this.bannerPity = {};
    if (!this.bannerPity[bannerId]) this.bannerPity[bannerId] = 0;

    const results = [];
    let highestRarity = 'common';
    let totalDupCoins = 0;
    let totalDupTickets = 0;

    for (let i = 0; i < count; i++) {
      this.bannerPity[bannerId]++;
      this.pity1000Counter = (this.pity1000Counter || 0) + 1;
      let is1000PityTrigger = false;

      let pickedId = 'asta';
      let rTier = 'common';

      // 🎯 HARD PITY 1000 LƯỢT: CHẮC CHẮN RA CON CHƯA MỞ KHÓA!
      if (this.pity1000Counter >= 1000) {
        this.pity1000Counter = 0;
        const lockedCharIds = Object.keys(CHARACTERS).filter(id => !this.unlockedCharacters.has(id));
        if (lockedCharIds.length > 0) {
          const rarityPriority = { legendary: 3, epic: 2, rare: 1, common: 0 };
          lockedCharIds.sort((a, b) => (rarityPriority[CHARACTERS[b].rarity] || 0) - (rarityPriority[CHARACTERS[a].rarity] || 0));
          const highestLockedRarity = CHARACTERS[lockedCharIds[0]].rarity;
          const candidates = lockedCharIds.filter(id => CHARACTERS[id].rarity === highestLockedRarity);
          pickedId = candidates[Math.floor(Math.random() * candidates.length)];
          rTier = CHARACTERS[pickedId].rarity;
          highestRarity = rTier;
          is1000PityTrigger = true;
        } else {
          // Nếu đã mở khóa toàn bộ 39 tướng, thưởng lớn Jackpot +50,000 Coins (không tặng vé)!
          this.currency.coins += 50000;
          totalDupCoins += 50000;
        }
      }

      if (!is1000PityTrigger) {
        const roll = Math.random() * 100;
        const legRate = usePurple ? 3.5 : 1.5;
        const epicRate = usePurple ? 12.0 : 6.5;
        const rareRate = usePurple ? 25.0 : 17.0;

        const isPityLegendary = this.bannerPity[bannerId] >= 70;
        const isGuaranteedSlot = (count >= 10 && (i % 10 === 9) && highestRarity === 'common');

        if (roll < legRate || isPityLegendary) {
          rTier = 'legendary';
          const bannerLegs = legendaries.filter(id => banner.pool.includes(id));
          const pool = bannerLegs.length > 0 ? bannerLegs : legendaries;
          pickedId = pickFromPool(pool);
          highestRarity = 'legendary';
          this.bannerPity[bannerId] = 0;
        } else if (roll < (legRate + epicRate) || (isGuaranteedSlot && Math.random() < 0.5)) {
          rTier = 'epic';
          const bannerEpics = epics.filter(id => banner.pool.includes(id));
          const pool = bannerEpics.length > 0 ? bannerEpics : epics;
          pickedId = pickFromPool(pool);
          if (highestRarity !== 'legendary') highestRarity = 'epic';
        } else if (roll < (legRate + epicRate + rareRate) || isGuaranteedSlot) {
          rTier = 'rare';
          const bannerRares = rares.filter(id => banner.pool.includes(id));
          const pool = bannerRares.length > 0 ? bannerRares : rares;
          pickedId = pickFromPool(pool);
          if (highestRarity === 'common') highestRarity = 'rare';
        } else {
          rTier = 'common';
          const bannerCommons = commons.filter(id => banner.pool.includes(id));
          const pool = bannerCommons.length > 0 ? bannerCommons : commons;
          pickedId = pickFromPool(pool);
        }
      }

      const isNew = !this.unlockedCharacters.has(pickedId);
      if (isNew) {
        this.unlockedCharacters.add(pickedId);
        CHARACTERS[pickedId].unlocked = true;
      } else {
        const dupBonus = rTier === 'legendary' ? 2500 : (rTier === 'epic' ? 800 : (rTier === 'rare' ? 300 : 100));
        this.currency.coins += dupBonus;
        totalDupCoins += dupBonus;
        // Bỏ nhận vé khi trùng lặp
      }

      results.push({
        id: pickedId,
        char: CHARACTERS[pickedId],
        rarity: rTier,
        isNew: isNew,
        is1000Pity: is1000PityTrigger
      });
    }

    this.saveGameData();
    window.soundEngine.gachaCardFlip(highestRarity);
    this.showGachaResults(results, count >= 10, totalDupCoins, totalDupTickets);
    this.renderGachaBanner(bannerId);
  }

  showGachaResults(results, isMulti, dupCoins = 0, dupTickets = 0) {
    const modal = document.getElementById('gachaResultOverlay');
    const container = document.getElementById('gachaCardsContainer');
    if (!modal || !container) return;

    container.innerHTML = '';

    const hasLegendary = results.some(r => r.rarity === 'legendary');
    const hasEpic = results.some(r => r.rarity === 'epic');

    modal.classList.remove('modal-shake-legendary', 'modal-shake-epic');
    if (hasLegendary) {
      void modal.offsetWidth;
      modal.classList.add('modal-shake-legendary');
    } else if (hasEpic) {
      void modal.offsetWidth;
      modal.classList.add('modal-shake-epic');
    }

    const hasPity1000 = results.some(r => r.is1000Pity);

    if (isMulti) {
      const newCount = results.filter(r => r.isNew).length;
      const legCount = results.filter(r => r.rarity === 'legendary').length;
      const epicCount = results.filter(r => r.rarity === 'epic').length;
      const rareCount = results.filter(r => r.rarity === 'rare').length;

      const summary = document.createElement('div');
      summary.className = 'gacha-100-summary';
      summary.innerHTML = `
        <div class="summary-stats-banner">
          <div class="sum-stat">🎉 TỔNG SỐ QUAY: <b>${results.length}</b></div>
          <div class="sum-stat new">🌟 MỚI MỞ KHÓA: <b>${newCount}</b></div>
          <div class="sum-stat leg">⭐ THẦN THOẠI: <b>${legCount}</b></div>
          <div class="sum-stat epic">✨ SỬ THI: <b>${epicCount}</b></div>
          <div class="sum-stat rare">🌟 HIẾM: <b>${rareCount}</b></div>
          <div class="sum-stat dup">🪙 QUY ĐỔI TRÙNG: <b>+${dupCoins.toLocaleString()} Coins ${dupTickets > 0 ? `& +${dupTickets} 🎫` : ''}</b></div>
          ${hasPity1000 ? '<div class="sum-stat" style="color: #fbbf24; font-weight: 900; background: rgba(245,158,11,0.2); padding: 2px 8px; border-radius: 6px; border: 1px solid #f59e0b;">👑 ĐẠT 1000 LẦN: NHẬN TƯỚNG CHƯA MỞ KHÓA!</div>' : ''}
        </div>
      `;
      container.appendChild(summary);
    }

    results.forEach((res, idx) => {
      const card = document.createElement('div');
      card.className = `gacha-reveal-card ${res.rarity}`;
      const animDelay = results.length > 20 ? Math.min(0.35, idx * 0.005) : (idx * 0.05);
      card.style.animationDelay = `${animDelay}s`;

      if (res.is1000Pity) {
        card.style.border = '2px solid #fbbf24';
        card.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.85)';
      }

      const rarityBadge = {
        legendary: '⭐ HUYỀN THOẠI ⭐',
        epic: '✨ SỬ THI',
        rare: '🌟 HIẾM',
        common: '🔹 PHỔ THÔNG'
      }[res.rarity] || '🔹 PHỔ THÔNG';

      const emoji = window.CHAR_EMOJIS ? (window.CHAR_EMOJIS[res.id] || '🍀') : '🍀';
      const cName = res.char ? res.char.name : res.id;
      const cSquad = res.char ? res.char.squad : 'Black Clover';

      card.innerHTML = `
        ${res.is1000Pity ? '<div style="background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 6px; margin-bottom: 3px;">👑 BẢO HIỂM 1000 LẦN!</div>' : ''}
        <div class="gacha-card-badge">${rarityBadge}</div>
        <div class="gacha-avatar">${emoji}</div>
        <div class="gacha-name">${cName}</div>
        <div class="gacha-squad">${cSquad.split('(')[0]}</div>
        <div class="gacha-tag ${res.isNew ? 'tag-new' : 'tag-dup'}">
          ${res.isNew ? '✨ MỚI MỞ KHÓA!' : 'TRÙNG LẶP (+COINS)'}
        </div>
      `;
      container.appendChild(card);
    });

    modal.classList.remove('hidden');
  }

  // ==========================================
  // POKESURVIVOR UPGRADES SYSTEM (Image 2)
  // ==========================================
  renderUpgradesMenu(charId) {
    const selectedId = charId || this.upgradeCharId || this.selectedCharId || 'asta';
    this.upgradeCharId = selectedId;
    const c = CHARACTERS[selectedId] || CHARACTERS['asta'];
    const u = this.getCharUpgrades(selectedId);

    // Update hero preview canvas
    const previewCanvas = document.getElementById('upgradeHeroCanvas');
    if (previewCanvas) {
      const ctx = previewCanvas.getContext('2d');
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      window.Sprites.drawPlayerSprite(ctx, {
        charId: selectedId,
        x: previewCanvas.width / 2,
        y: previewCanvas.height / 2 + 10,
        radius: 18,
        facing: 1,
        isMoving: false,
        isDevilMode: (selectedId === 'black_asta'),
        isSpiritMode: (selectedId === 'yuno'),
        isValkyrie: (selectedId === 'noelle'),
        isDevilUnion: (selectedId === 'nacht'),
        isElfAwakened: (selectedId === 'licht')
      }, this.tick || 0);
    }

    // Populate or sync dropdown
    const select = document.getElementById('upgradeCharDropdown');
    if (select) {
      select.innerHTML = '';
      Object.keys(CHARACTERS).forEach(id => {
        if (this.unlockedCharacters.has(id)) {
          const opt = document.createElement('option');
          opt.value = id;
          const charUp = this.getCharUpgrades(id);
          const totalLvs = Object.values(charUp).reduce((a, b) => a + b, 0);
          opt.innerText = `${CHARACTERS[id].name} {partner} · ${totalLvs} niveles`;
          select.appendChild(opt);
        }
      });
      select.value = selectedId;
    }

    const container = document.getElementById('upgradeNodesContainer');
    if (!container) return;

    // 12 Exact Attributes
    const TALENTS = [
      { id: 'vitality', name: 'Vitality', desc: '+4 HP', icon: '❤️', max: 10, cost: 200 },
      { id: 'strength', name: 'Strength', desc: '+1.5% damage', icon: '🥊', max: 10, cost: 200 },
      { id: 'stride', name: 'Stride', desc: '+1.5% speed', icon: '👟', max: 10, cost: 200 },
      { id: 'reflexes', name: 'Reflexes', desc: '-1% cooldown', icon: '⏰', max: 10, cost: 200 },
      { id: 'armor', name: 'Armor', desc: '+1% defense', icon: '🛡️', max: 10, cost: 200 },
      { id: 'synthesis', name: 'Synthesis', desc: '+0.1 HP/s', icon: '🌿', max: 10, cost: 200 },
      { id: 'magnet', name: 'Magnet', desc: '+6px pickup', icon: '🧲', max: 10, cost: 200 },
      { id: 'wisdom', name: 'Wisdom', desc: '+2% experience', icon: '📘', max: 10, cost: 200 },
      { id: 'fortune', name: 'Fortune', desc: '+4% Clover Coins', icon: '🪙', max: 10, cost: 200 },
      { id: 'repertoire', name: 'Repertoire', desc: 'Start with 2 moves', icon: '🃏', max: 1, cost: 800 },
      { id: 'crit', name: 'Critical Hit', desc: '+1.5% crit (+2% crit dmg)', icon: '⭐', max: 10, cost: 200 },
      { id: 'reroll', name: 'Card reroll', desc: '+1 level-up reroll', icon: '⬆️', max: 3, cost: 500 }
    ];

    container.innerHTML = '';
    TALENTS.forEach(t => {
      const lv = u[t.id] || 0;
      const isMax = lv >= t.max;
      const cost = t.cost * (lv + 1);

      const card = document.createElement('div');
      card.className = 'poke-upgrade-card';
      card.innerHTML = `
        <div class="poke-up-icon">${t.icon}</div>
        <div class="poke-up-center">
          <div class="poke-up-title">${t.name} <span class="poke-up-stat">${t.desc}</span></div>
          <div class="poke-up-pips">
            ${Array.from({ length: t.max }).map((_, i) => `<span class="poke-pip ${i < lv ? 'filled' : ''}"></span>`).join('')}
          </div>
        </div>
        <button class="poke-up-btn ${isMax ? 'maxed' : ''}" ${isMax ? 'disabled' : ''}>
          ${isMax ? 'Max.' : `🪙 ${cost.toLocaleString()}`}
        </button>
      `;

      if (!isMax) {
        card.querySelector('.poke-up-btn').addEventListener('click', () => {
          this.buyCharUpgrade(selectedId, t.id);
        });
      }
      container.appendChild(card);
    });
  }

  // ==========================================
  // MOD MENU / CHEAT ENGINE (PokeSurvivor Style)
  // ==========================================
  applyMod(action) {
    switch (action) {
      case 'addCoins':
        this.currency.coins += 100000000;
        this.triggerComboBanner('⭐ MOD: ĐÃ CỘNG +100,000,000 CLOVER COINS!');
        break;
      case 'addTickets':
        this.currency.tickets += 100000;
        this.triggerComboBanner('⭐ MOD: ĐÃ CỘNG +100,000 VÉ THƯỜNG (VÀNG)!');
        break;
      case 'addPurpleTickets':
        this.currency.purpleTickets = (this.currency.purpleTickets || 0) + 100000;
        this.triggerComboBanner('⭐ MOD: ĐÃ CỘNG +100,000 VÉ HOÀNG KIM (TÍM)!');
        break;
      case 'addDiamonds':
        this.currency.diamonds += 999;
        this.triggerComboBanner('⭐ MOD: ĐÃ CỘNG +999 KIM CƯƠNG MA PHÁP!');
        break;
      case 'unlockAll':
        Object.keys(CHARACTERS).forEach(id => {
          this.unlockedCharacters.add(id);
          CHARACTERS[id].unlocked = true;
        });
        this.triggerComboBanner('⭐ MOD: ĐÃ MỞ KHÓA TẤT CẢ 17 PHÁP SƯ!');
        break;
      case 'maxCurrentHero':
      case 'maxAllHeroes': {
        ['vitality', 'strength', 'stride', 'reflexes', 'armor', 'synthesis', 'magnet', 'wisdom', 'fortune', 'crit'].forEach(k => this.upgrades[k] = 10);
        this.upgrades.repertoire = 1;
        this.upgrades.reroll = 3;
        this.characterUpgrades = {};
        this.triggerComboBanner('⭐ MOD: ĐÃ MAX TOÀN BỘ CHỈ SỐ NÂNG CẤP!');
        if (typeof renderUpgradesTalentGrid === 'function') renderUpgradesTalentGrid();
        break;
      }
      case 'godMode':
        this.godMode = !this.godMode;
        this.triggerComboBanner(this.godMode ? '🛡️ MOD: BẬT BẤT TỬ (GOD MODE)!' : '🛡️ MOD: TẮT BẤT TỬ!');
        break;
      case 'killAll':
        this.activateScreenBomb();
        this.triggerComboBanner('💣 MOD: ĐÃ TIÊU DIỆT SẠCH TOÀN BỘ QUÁI!');
        break;
      case 'addExp':
        if (this.player && this.state === 'PLAYING') {
          this.addExp(100000);
          this.triggerComboBanner('🚀 MOD: ĐÃ CỘNG +100,000 EXP!');
        } else {
          alert('Cần vào trận chiến để sử dụng tính năng cộng EXP!');
        }
        break;
      case 'resetData':
        if (confirm('Bạn có chắc muốn đặt lại toàn bộ dữ liệu game về ban đầu?')) {
          localStorage.removeItem('BC_SURVIVORS_DATA');
          localStorage.removeItem('BC_SURVIVOR_SETTINGS');
          location.reload();
        }
        return;
    }
    this.saveGameData();
    this.updateTopBarCurrency();
    if (this.renderUpgradesMenu) this.renderUpgradesMenu(this.upgradeCharId);
  }
}

const CHAR_EMOJIS = {
  zenon: '💀⬛',
  vanica: '🩸😈',
  dante: '🪨👑',
  fana: '🕊️🔥',
  rhya: '🌪️📜',
  vetto: '🐺🐾',
  // Thần Thoại
  julius: '⏳',
  lumiere: '👑',
  black_asta: '😈',
  licht: '🧝',
  nacht: '🐕',
  secre: '🐦',
  patry: '⚡',
  // Sử Thi
  yami: '🌑',
  mereoleona: '🦁',
  fuegoleon: '🔥',
  nozel: '🦅',
  charlotte: '🌹',
  dorothy: '💭',
  william: '🌳',
  jack: '🪓',
  langris: '🔮',
  henry: '🐂',
  // Hiếm
  yuno: '🌪️',
  noelle: '🐉',
  luck: '⚡',
  leopold: '🔥',
  rill: '🎨',
  mars: '💎',
  zora: '🕸️',
  gordon: '🧪',
  grey: '💎',
  mimosa: '🌸',
  klaus: '🔩',
  // Phổ Thông
  asta: '🗡️',
  magna: '⚾',
  finral: '🚪',
  charmy: '🐑',
  sol: '🗿'
};

const GACHA_BANNERS = {
  spooky: {
    id: 'spooky',
    title: '🎃 Hắc Ám Quỷ Giới',
    badge: 'Spooky Night (Halloween)',
    desc: 'Các Ma Đạo Sĩ Hắc Ám và Quỷ Thần từ khắp nơi, nhân đôi tỉ lệ Thần Thoại (Shiny/Legendary)!',
    featured: ['black_asta', 'nacht', 'julius'],
    pool: ['black_asta', 'nacht', 'licht', 'yami', 'luck', 'noelle', 'asta'],
    shinyOdds: '2%'
  },
  bulls: {
    id: 'bulls',
    title: '🍀 Hắc Bộc Ngưu',
    badge: 'Kanto Gen 1',
    desc: 'Tập hợp các chiến binh lập dị nhưng sở hữu tiềm năng vô hạn của Vương Quốc Clover!',
    featured: ['asta', 'yami', 'noelle'],
    pool: ['asta', 'yami', 'noelle', 'luck', 'magna', 'finral', 'charmy', 'nacht'],
    shinyOdds: '2%'
  },
  golden: {
    id: 'golden',
    title: '☀️ Hoàng Kim Lực Lượng',
    badge: 'Johto Gen 2',
    desc: 'Đội hình ma đạo sĩ tinh anh dưới sự dẫn dắt của William Vangeance và Yuno Grinberryall!',
    featured: ['yuno', 'nozel', 'charlotte'],
    pool: ['yuno', 'nozel', 'charlotte', 'fuegoleon', 'charmy'],
    shinyOdds: '2%'
  },
  legends: {
    id: 'legends',
    title: '👑 Ma Pháp Đế & Cổ Đại',
    badge: 'Hoenn Gen 3',
    desc: 'Julius Novachrono, Đệ Nhất Ma Pháp Đế Lumiere và Licht - sức mạnh tối cao của lịch sử Clover!',
    featured: ['julius', 'lumiere', 'licht'],
    pool: ['julius', 'lumiere', 'licht', 'black_asta', 'mereoleona'],
    shinyOdds: '2%'
  },
  lions: {
    id: 'lions',
    title: '🦁 Hồng Liên Sư Tử',
    badge: 'Sinnoh Gen 4',
    desc: 'Nữ Vương Sư Tử Lửa Mereoleona và Hồng Liên Sư Tử Vương Fuegoleon càn quét toàn bộ chiến trường!',
    featured: ['mereoleona', 'fuegoleon', 'magna'],
    pool: ['mereoleona', 'fuegoleon', 'magna', 'yami', 'charlotte'],
    shinyOdds: '2%'
  },
  eagles: {
    id: 'eagles',
    title: '🦅 Ngân Dực Đại Bàng',
    badge: 'Unova Gen 5',
    desc: 'Đoàn trưởng Nozel Silva và các chiến binh hoàng tộc sở hữu ma pháp tạo hình thủy ngân sắc bén!',
    featured: ['nozel', 'noelle', 'charlotte'],
    pool: ['nozel', 'noelle', 'charlotte', 'yuno', 'finral'],
    shinyOdds: '2%'
  },
  elves: {
    id: 'elves',
    title: '🧝 Tộc Yêu Tinh Cổ',
    badge: 'Kalos Gen 6',
    desc: 'Thủ lĩnh Licht và những sinh linh được ma pháp ưu ái với nguồn mana dồi dào gấp 10 lần người phàm!',
    featured: ['licht', 'fana', 'rhya'],
    pool: ['licht', 'fana', 'rhya', 'vetto', 'lumiere', 'patry'],
    shinyOdds: '2%'
  },
  spade: {
    id: 'spade',
    title: '♠️ Quỷ Giới Spade',
    badge: 'Alola Gen 7',
    desc: 'Thế lực hắc ám tối thượng từ Vương Quốc Spade và các quỷ vương Zagred, Lucifero, Megicula!',
    featured: ['zenon', 'vanica', 'dante'],
    pool: ['zenon', 'vanica', 'dante', 'black_asta', 'nacht', 'yami'],
    shinyOdds: '2%'
  },
  spirit: {
    id: 'spirit',
    title: '✨ Tinh Linh Thánh Khải',
    badge: 'Galar Gen 8',
    desc: 'Hòa quyện linh hồn cùng Sylph, Salamander và Undine để khai mở sức mạnh Thánh Khải tối thượng!',
    featured: ['yuno', 'fuegoleon', 'noelle'],
    pool: ['yuno', 'fuegoleon', 'noelle', 'charlotte', 'lumiere'],
    shinyOdds: '2%'
  },
  ultimate: {
    id: 'ultimate',
    title: '🌟 Thần Thoại Vô Cực',
    badge: 'Paldea Gen 9',
    desc: 'Cơ hội triệu hồi tất cả các Pháp Sư từ Phổ Thông đến Huyền Thoại với tỉ lệ nhận Thần Thoại cực cao!',
    featured: ['black_asta', 'julius', 'lumiere'],
    pool: Object.keys(CHARACTERS),
    shinyOdds: '2%'
  }
};

window.Game = Game;
window.CHARACTERS = CHARACTERS;
window.MAPS = MAPS;
window.CHAR_EMOJIS = CHAR_EMOJIS;
window.GACHA_BANNERS = GACHA_BANNERS;
