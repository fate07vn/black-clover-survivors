// Zero-dependency local web server for Black Clover: Magic Survivor
// Supports Localhost, LAN (Wi-Fi) & Internet (Cloudflare Tunnel)
// Includes Account Authentication & Cloud Save API
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory / file-backed user DB
function loadDb() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Lỗi đọc database users.json:', e);
  }
  return { users: {}, sessions: {} };
}

let db = loadDb();

function saveDb() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error('Lỗi ghi database users.json:', e);
  }
}

function hashPassword(password, salt) {
  return crypto.createHash('sha256').update(password + ':' + salt).digest('hex');
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function extractToken(req) {
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }
  return req.headers['x-auth-token'] || null;
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg'
};

function getLocalIpAddresses() {
  const nets = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        ips.push({ name, address: net.address });
      }
    }
  }
  return ips;
}

async function handleApiRequest(req, res, pathname) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. REGISTER: POST /api/register
  if (pathname === '/api/register' && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();
    const initialData = body.initialData || null;

    if (!username || username.length < 3) {
      res.writeHead(400);
      res.end(JSON.stringify({ success: false, error: 'Tên tài khoản phải từ 3 ký tự trở lên!' }));
      return;
    }
    if (!password || password.length < 4) {
      res.writeHead(400);
      res.end(JSON.stringify({ success: false, error: 'Mật khẩu phải từ 4 ký tự trở lên!' }));
      return;
    }

    const lowerUser = username.toLowerCase();
    if (db.users[lowerUser]) {
      res.writeHead(409);
      res.end(JSON.stringify({ success: false, error: 'Tên tài khoản này đã được sử dụng!' }));
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const pwdHash = hashPassword(password, salt);
    const token = crypto.randomBytes(24).toString('hex');

    const newUser = {
      username: username,
      lowerUser: lowerUser,
      salt: salt,
      passwordHash: pwdHash,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      saveData: initialData || null
    };

    db.users[lowerUser] = newUser;
    db.sessions[token] = { lowerUser: lowerUser, createdAt: Date.now() };
    saveDb();

    console.log(`✨ [AUTH] Đăng ký thành công: ${username}`);
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      token: token,
      user: { username: username, createdAt: newUser.createdAt },
      saveData: newUser.saveData
    }));
    return;
  }

  // 2. LOGIN: POST /api/login
  if (pathname === '/api/login' && req.method === 'POST') {
    const body = await parseJsonBody(req);
    const username = (body.username || '').trim();
    const password = (body.password || '').trim();
    const lowerUser = username.toLowerCase();
    const clientIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    console.log(`[AUTH] Yêu cầu đăng nhập tài khoản: "${username}" từ IP: ${clientIp}`);

    // 1. Tìm theo username chuẩn (lowercase)
    let user = db.users[lowerUser];

    // 2. Hỗ trợ tìm kiếm theo tên người chơi in-game nếu người chơi nhập nhầm (VD: tiendat vs tiendat27)
    if (!user) {
      for (const k of Object.keys(db.users)) {
        const u = db.users[k];
        if (u.saveData && u.saveData.playerName && u.saveData.playerName.toLowerCase() === lowerUser) {
          user = u;
          console.log(`[AUTH] Tìm thấy tài khoản "${user.username}" thông qua tên người chơi in-game: "${username}"`);
          break;
        }
      }
    }

    if (!user) {
      const availableList = Object.keys(db.users).join(', ');
      console.warn(`[AUTH] Đăng nhập thất bại: Tài khoản "${username}" không tồn tại! (Các tài khoản đang có: ${availableList})`);
      res.writeHead(401);
      res.end(JSON.stringify({
        success: false,
        error: `Tài khoản "${username}" không tồn tại trên hệ thống! Vui lòng kiểm tra lại tên tài khoản.`
      }));
      return;
    }

    const testHash = hashPassword(password, user.salt);
    if (testHash !== user.passwordHash) {
      console.warn(`[AUTH] Đăng nhập thất bại: Sai mật khẩu cho tài khoản "${user.username}"!`);
      res.writeHead(401);
      res.end(JSON.stringify({
        success: false,
        error: 'Mật khẩu không chính xác! Hãy kiểm tra phím Caps Lock hoặc bộ gõ tiếng Việt (Unikey/EVKey).'
      }));
      return;
    }

    const token = crypto.randomBytes(24).toString('hex');
    user.lastLogin = new Date().toISOString();
    db.sessions[token] = { lowerUser: user.lowerUser || lowerUser, createdAt: Date.now() };
    saveDb();

    console.log(`🔑 [AUTH] Đăng nhập thành công: ${user.username} (Tiến trình: ${user.saveData ? 'Có dữ liệu cloud' : 'Trống'})`);
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      token: token,
      user: { username: user.username, createdAt: user.createdAt },
      saveData: user.saveData
    }));
    return;
  }

  // 3. GET CURRENT USER & SAVE DATA: GET /api/me
  if (pathname === '/api/me' && req.method === 'GET') {
    const token = extractToken(req);
    const session = token ? db.sessions[token] : null;

    if (!session || !db.users[session.lowerUser]) {
      res.writeHead(401);
      res.end(JSON.stringify({ success: false, error: 'Phiên đăng nhập hết hạn hoặc không hợp lệ!' }));
      return;
    }

    const user = db.users[session.lowerUser];
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      user: { username: user.username, createdAt: user.createdAt, lastLogin: user.lastLogin },
      saveData: user.saveData
    }));
    return;
  }

  // 4. SAVE PROGRESS: POST /api/save
  if (pathname === '/api/save' && req.method === 'POST') {
    const token = extractToken(req);
    const session = token ? db.sessions[token] : null;

    if (!session || !db.users[session.lowerUser]) {
      res.writeHead(401);
      res.end(JSON.stringify({ success: false, error: 'Chưa đăng nhập để lưu đám mây!' }));
      return;
    }

    const body = await parseJsonBody(req);
    const user = db.users[session.lowerUser];

    if (body.saveData) {
      user.saveData = body.saveData;
      user.lastSaved = new Date().toISOString();
      saveDb();
    }

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, savedAt: Date.now() }));
    return;
  }

  // 5. LOGOUT: POST /api/logout
  if (pathname === '/api/logout' && req.method === 'POST') {
    const token = extractToken(req);
    if (token && db.sessions[token]) {
      delete db.sessions[token];
      saveDb();
    }
    res.writeHead(200);
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ success: false, error: 'API route not found' }));
}

function handleRequest(req, res) {
  let reqPath = req.url.split('?')[0];

  // Route API calls
  if (reqPath.startsWith('/api/')) {
    handleApiRequest(req, res, reqPath);
    return;
  }

  let filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 File Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(content);
    }
  });
}

function startServer(port = 3000) {
  const server = http.createServer(handleRequest);

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} đang bận, thử chuyển sang port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Lỗi Server:', err);
    }
  });

  // Listen on 0.0.0.0 to allow access from all devices on the LAN / Wi-Fi
  server.listen(port, '0.0.0.0', () => {
    const localIps = getLocalIpAddresses();
    console.log(`=======================================================`);
    console.log(`🍀 BLACK CLOVER: MAGIC SURVIVOR - SERVER ĐANG CHẠY 🍀`);
    console.log(`🔐 HỆ THỐNG ĐĂNG NHẬP & CLOUD SAVE: ĐÃ KÍCH HOẠT 🔐`);
    console.log(`-------------------------------------------------------`);
    console.log(`💻 Chơi trên máy này:`);
    console.log(`   👉 http://localhost:${port}`);
    console.log(``);
    console.log(`📱 Chơi trên máy khác / Điện thoại / Laptop (Chung Wi-Fi):`);
    localIps.forEach(net => {
      console.log(`   👉 http://${net.address}:${port}   (${net.name})`);
    });
    console.log(`=======================================================`);
  });
}

const initialPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
startServer(initialPort);
