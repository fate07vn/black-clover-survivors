// Black Clover: Magic Survivor - Authentication & Cloud Save Manager
// Handles User Register, Login, Auto-Sync, and Cross-Device Save Data

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.token = null;
    this.syncTimeout = null;
    this.isSyncing = false;
    this.apiBase = window.location.origin; // works with localhost, LAN IP, or Cloudflare
  }

  init(gameInstance) {
    this.game = gameInstance;
    this.token = localStorage.getItem('BC_AUTH_TOKEN');
    const savedUser = localStorage.getItem('BC_AUTH_USER');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = null;
      }
    }

    this.updateUI();

    // Auto verify and fetch cloud save if token exists
    if (this.token && this.currentUser) {
      this.verifyAndFetchSave();
    } else {
      // Clean guest mode! Ensure game state is loaded for guest
      const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
      if (g && typeof g.loadSaveData === 'function') {
        g.loadSaveData();
        g.updateTopBarCurrency();
      }
    }
  }

  isLoggedIn() {
    return !!(this.currentUser && this.token);
  }

  async verifyAndFetchSave() {
    this.setSyncStatus('syncing');
    try {
      const res = await fetch(`${this.apiBase}/api/me`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (data.success && data.user) {
        this.currentUser = data.user;
        localStorage.setItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.updateUI();

        // If server has newer save data, load it into the game
        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (data.saveData && g) {
          console.log('☁️ Đã đồng bộ dữ liệu từ đám mây cho tài khoản:', this.currentUser.username);
          g.applySaveData(data.saveData);
        }
        this.setSyncStatus('synced');
      } else {
        // Token expired or invalid
        this.logout(false);
      }
    } catch (err) {
      console.warn('Không thể kết nối máy chủ cloud save:', err);
      this.setSyncStatus('offline');
    }
  }

  async register(username, password, syncCurrentLocalData = true) {
    username = (username || '').trim();
    password = (password || '').trim();

    if (username.length < 3) {
      return { success: false, error: 'Tên tài khoản phải có ít nhất 3 ký tự!' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Mật khẩu phải có ít nhất 4 ký tự!' };
    }

    const initialData = (syncCurrentLocalData && this.game) ? this.game.exportSaveData() : null;

    try {
      const res = await fetch(`${this.apiBase}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, initialData })
      });
      const data = await res.json();
      if (data.success) {
        this.token = data.token;
        this.currentUser = data.user;
        localStorage.setItem('BC_AUTH_TOKEN', data.token);
        localStorage.setItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.updateUI();
        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (data.saveData && g) {
          console.log('☁️ Đang nạp dữ liệu đám mây cho tài khoản:', this.currentUser.username);
          g.applySaveData(data.saveData);
        }
        return { success: true, user: data.user, saveData: data.saveData };
      } else {
        return { success: false, error: data.error || 'Đăng ký thất bại!' };
      }
    } catch (e) {
      return { success: false, error: 'Lỗi kết nối máy chủ! Vui lòng thử lại.' };
    }
  }

  async login(username, password) {
    username = (username || '').trim();
    password = (password || '').trim();

    if (!username || !password) {
      return { success: false, error: 'Vui lòng nhập đầy đủ tên tài khoản và mật khẩu!' };
    }

    try {
      const res = await fetch(`${this.apiBase}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        this.token = data.token;
        this.currentUser = data.user;
        localStorage.setItem('BC_AUTH_TOKEN', data.token);
        localStorage.setItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.updateUI();

        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (g) {
          if (data.saveData) {
            g.applySaveData(data.saveData);
          } else {
            const localKey = 'BC_USER_DATA_' + username.toLowerCase();
            const localSaved = localStorage.getItem(localKey);
            if (localSaved) {
              try {
                g.applySaveData(JSON.parse(localSaved));
              } catch (e) {
                g.loadSaveData();
              }
            } else {
              g.loadSaveData();
            }
          }
          g.playerName = this.currentUser.username;
          g.updateTopBarCurrency();
        }
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Sai tên tài khoản hoặc mật khẩu!' };
      }
    } catch (e) {
      return { success: false, error: 'Lỗi kết nối máy chủ! Vui lòng thử lại.' };
    }
  }

  async logout(promptConfirm = true) {
    if (promptConfirm && !confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản này?')) {
      return;
    }

    if (this.token) {
      try {
        await fetch(`${this.apiBase}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (e) {}
    }

    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('BC_AUTH_TOKEN');
    localStorage.removeItem('BC_AUTH_USER');
    this.updateUI();

    const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
    if (g && typeof g.resetToGuest === 'function') {
      g.resetToGuest();
    }

    if (window.soundEngine && window.soundEngine.pickup) {
      window.soundEngine.pickup();
    }
    if (promptConfirm) {
      alert('Đã đăng xuất thành công! Game hiện ở chế độ Khách (Guest) - tài khoản mới bắt đầu từ đầu.');
    }
  }

  queueSync(saveData) {
    if (!this.isLoggedIn() || !this.token) return;

    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    this.setSyncStatus('syncing');

    // Debounce sync by 1.2 seconds
    this.syncTimeout = setTimeout(() => {
      this.pushSaveToServer(saveData);
    }, 1200);
  }

  async pushSaveToServer(saveData) {
    if (!this.isLoggedIn() || !this.token) return { success: false, reason: 'not_logged_in' };

    try {
      const res = await fetch(`${this.apiBase}/api/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ saveData, username: this.currentUser ? this.currentUser.username : undefined })
      });
      const data = await res.json();
      if (data.success) {
        this.setSyncStatus('synced');
        return { success: true, savedAt: data.savedAt };
      } else {
        this.setSyncStatus('error');
        if (res.status === 401) {
          return { success: false, reason: 'unauthorized', error: data.error };
        }
        return { success: false, reason: 'server_error', error: data.error };
      }
    } catch (e) {
      this.setSyncStatus('offline');
      return { success: false, reason: 'network_error', error: e.message };
    }
  }

  setSyncStatus(status) {
    const dot = document.getElementById('authSyncStatusDot');
    if (!dot) return;

    if (status === 'syncing') {
      dot.innerHTML = '🔄';
      dot.title = 'Đang lưu lên đám mây...';
    } else if (status === 'synced') {
      dot.innerHTML = '☁️';
      dot.title = 'Đã lưu đám mây an toàn';
    } else if (status === 'offline') {
      dot.innerHTML = '⚠️';
      dot.title = 'Không có kết nối mạng (Lưu cục bộ)';
    } else {
      dot.innerHTML = '❌';
      dot.title = 'Lỗi đồng bộ';
    }
  }

  updateUI() {
    const btnAuth = document.getElementById('btnTopNavAuth');
    const pillUser = document.getElementById('topNavUserPill');
    const txtUser = document.getElementById('topNavUsernameText');
    const btnSave = document.getElementById('btnTopNavSave');

    if (this.isLoggedIn()) {
      if (btnAuth) btnAuth.style.display = 'none';
      if (pillUser) pillUser.style.display = 'inline-flex';
      if (txtUser) txtUser.innerText = this.currentUser.username;
      if (btnSave) btnSave.style.display = 'inline-flex';
    } else {
      if (btnAuth) btnAuth.style.display = 'inline-flex';
      if (pillUser) pillUser.style.display = 'none';
      if (btnSave) btnSave.style.display = 'none';
    }
  }
}

window.authManager = new AuthManager();
