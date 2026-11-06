# 🍀 Black Clover: Magic Survivor (Ma Pháp Sinh Tồn)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5 Canvas](https://img.shields.io/badge/Tech-HTML5%20Canvas-orange.svg)](#)
[![Vanilla JavaScript](https://img.shields.io/badge/Language-Vanilla%20JS-F7DF1E.svg)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org)

> Game Roguelite Bullet-Heaven Sinh Tồn Ma Pháp đỉnh cao lấy cảm hứng từ **Magic Survival**, **Vampire Survivors** và **PokeSurvivor**, được xây dựng trong vũ trụ anime **Black Clover**. Hoàn toàn bằng Vanilla JavaScript, HTML5 Canvas và Web Audio API tổng hợp âm thanh thực tế mà không cần bất kỳ asset hình ảnh/âm thanh bên ngoài nặng nề nào.

---

## 🌟 Tính Năng Nổi Bật (Key Features)

- 🧙 **40 Ma Đạo Sĩ Tuyển Chọn**: Đầy đủ các nhân vật kinh điển (Asta, Yuno, Noelle, Yami, Julius, Mereoleona, Fuegoleon, Lumiere, Licht, Nacht, Secre, Charlotte, William, Nozel, Jack, Dorothy, Rill, Zora, Finral, Charmy...). Mỗi nhân vật có tạo hình Anime Canvas độc quyền, vũ khí khởi đầu, chỉ số riêng biệt và hoạt ảnh bước chân/vũ khí linh hoạt.
- ⚡ **Hệ Thống Tiến Hóa Ma Pháp (Grimoire Evolution)**:
  - **Tier 1**: Kỹ năng cơ bản cấp 1 - 5.
  - **Tier 2 (Thần Thoại)**: Nâng kỹ năng lên Cấp 5 kết hợp Sách Bổ Trợ tương ứng.
  - **Tier 3 (Siêu Tiến Hóa)**: Thăng hoa sức mạnh vô cực khi nhân vật đạt Cấp 10+ với các tuyệt kỹ hủy diệt toàn màn hình.
- 🔮 **Giao Diện Thăng Cấp Phong Cách Magic Survival**: Gọn gàng, huyền bí, dễ thao tác với thẻ kỹ năng ma đạo, nút nhận lại 20% Mana và biểu tượng Ngôi Sao Ma Pháp tra cứu nhanh công thức tiến hóa.
- 🏆 **Cổ Vật & La Bàn Chiến Trường (Artifact System)**: Rơi từ rương báu hoặc tìm thấy ngẫu nhiên trên bản đồ với 4 bậc phẩm cấp: *Common (Thường)*, *Rare (Hiếm)*, *Epic (Sử Thi)*, *Legendary (Huyền Thoại)*.
- 👹 **11 Loại Quái Vật & 8 Đại Boss Đa Giai Đoạn**: Quái vật đa dạng hành vi (áp sát, bắn tỉa, lao húc, quỷ dơi); Boss sở hữu trạng thái Cuồng Nộ (Enraged), kỹ năng đặc biệt và vòng hào quang ác ma hoành tráng.
- 💾 **Lưu Trữ Bền Vững & Cloud Save**: Lưu trạng thái nhân vật đã chọn, màn chơi, độ khó qua `localStorage` và tài khoản lưu trữ đám mây. Không bao giờ bị mất tiến trình khi F5 hoặc tắt trình duyệt.
- 🎮 **Hỗ Trợ Mọi Thiết Bị**: Chơi mượt mà 60 FPS trên máy tính (Bàn phím WASD / Mũi tên) và điện thoại di động / tablet (Virtual Touch Joystick).

---

## 🚀 Hướng Dẫn Chạy Game (Quick Start)

### Cách 1: Chạy file Batch (Windows)
1. Mở thư mục dự án `black-clover-survivors`.
2. Nhấp đúp chuột vào file **`start.bat`**. Trình duyệt sẽ tự động mở game tại `http://localhost:3000`.

### Cách 2: Dùng Node.js Server
```bash
# Khởi động máy chủ cục bộ
npm start
# hoặc: node server.js
```
Mở trình duyệt truy cập: `http://localhost:3000`

### Cách 3: Chơi Trực Tiếp Không Cần Cài Đặt
Mở trực tiếp file `index.html` bằng bất kỳ trình duyệt web nào (Chrome, Edge, Firefox, Brave, Safari). Game hoạt động 100% độc lập với Vanilla Web Canvas.

---

## 🧪 Kiểm Thử Tự Động (Automated Testing)

Dự án tích hợp bộ kiểm thử tự động toàn diện:
```bash
npm test
```
* Bộ test bao gồm:
  1. `tests/syntax_check.test.js`: Kiểm tra cú pháp toàn bộ các file JS trong dự án.
  2. `tests/visuals.test.js`: Kiểm thử render Canvas 40 Ma Đạo Sĩ, 11 Quái Vật và 8 Boss.
  3. `tests/persistence.test.js`: Kiểm thử tính bền vững lưu trữ nhân vật khi tải lại web.

---

## 📁 Cấu Trúc Dự Án (Project Structure)

```text
black-clover-survivors/
├── index.html            # Giao diện chính, canvas, modal ma đạo sĩ & hud
├── style.css             # Định kiểu giao diện hiện đại phong cách anime
├── server.js             # Máy chủ Node.js phục vụ API đăng nhập & lưu game
├── start.bat             # Script khởi động 1-click tiện lợi trên Windows
├── package.json          # Cấu hình dự án & scripts (start, test)
├── .gitignore            # Loại bỏ file tạm, binary lớn (cloudflared), logs, data nhạy cảm
├── .gitattributes       # Chuẩn hóa line endings (LF/CRLF) cross-platform
├── LICENSE               # Giấy phép MIT mã nguồn mở
├── src/                  # Mã nguồn logic trò chơi
│   ├── audio.js          # Hệ thống âm thanh tổng hợp Web Audio API
│   ├── auth.js           # Xử lý đăng ký, đăng nhập & đồng bộ save game
│   ├── sprites.js        # Đồ họa Canvas cho 40 nhân vật, 11 quái và 8 boss
│   ├── spells.js         # Toàn bộ phép thuật, kỹ năng & công thức tiến hóa
│   ├── enemies.js        # Logic AI quái vật, boss, đợt tấn công & nhặt đồ
│   ├── artifacts.js      # Hệ thống cổ vật, rương báu & la bàn
│   └── game.js           # Vòng lặp trò chơi chính (Game Loop, Input, Save)
├── data/                 # Thư mục dữ liệu người dùng (local database)
│   ├── .gitkeep          # Giữ cấu trúc thư mục trên Git
│   └── users.example.json# Template mẫu cơ sở dữ liệu
└── tests/                # Bộ test tự động
    ├── syntax_check.test.js
    ├── visuals.test.js
    └── persistence.test.js
```

---

## 📤 Hướng Dẫn Đẩy Dự Án Lên GitHub (Push to GitHub)

### Bước 1: Khởi tạo Git (nếu chưa có)
Mở PowerShell hoặc Git Bash tại thư mục dự án:
```bash
git init
git branch -M main
```

### Bước 2: Thêm files và Commit
Nhờ file `.gitignore` đã được tối ưu, các file binary lớn (`cloudflared.exe`) và file tạm đã được tự động loại bỏ:
```bash
git add .
git commit -m "feat: release Black Clover Magic Survivor full release with 40 heroes and visual overhaul"
```

### Bước 3: Đẩy lên kho lưu trữ GitHub của bạn
Tạo một repository mới trên GitHub (ví dụ: `black-clover-magic-survivors`), sau đó liên kết và đẩy code:
```bash
git remote add origin https://github.com/<tai-khoan-cua-ban>/black-clover-magic-survivors.git
git push -u origin main
```

---

## 📜 Giấy Phép (License)

Dự án được phân phối dưới giấy phép **MIT**. Xem chi tiết tại [LICENSE](LICENSE).
Tác phẩm lấy cảm hứng từ nguyên tác anime/manga **Black Clover** của tác giả Yūki Tabata / Shueisha.
