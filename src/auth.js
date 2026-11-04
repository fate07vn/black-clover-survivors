// Black Clover: Magic Survivor - Authentication & Cloud Save Manager
// Handles User Register, Login, Auto-Sync, and Cross-Device Save Data

class AuthManager {
  constructor() {
    this.token = this.safeGetItem('BC_AUTH_TOKEN');
    this.currentUser = null;
    const savedUser = this.safeGetItem('BC_AUTH_USER');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = null;
      }
    }
    // Fallback: check last logged-in user if savedUser was corrupted
    if (!this.currentUser) {
      const lastUser = this.safeGetItem('BC_LAST_USER');
      if (lastUser && this.token) {
        this.currentUser = { username: lastUser };
      }
    }

    this.syncTimeout = null;
    this.isSyncing = false;
    this.apiBase = this.resolveApiBase();
  }

  safeGetItem(key) {
    try {
      return (typeof localStorage !== 'undefined') ? localStorage.getItem(key) : null;
    } catch (e) {
      return null;
    }
  }

  safeSetItem(key, val) {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, val);
    } catch (e) {}
  }

  safeRemoveItem(key) {
    try {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    } catch (e) {}
  }

  resolveApiBase() {
    if (typeof window === 'undefined') return 'http://127.0.0.1:3000';
    if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
      return 'http://127.0.0.1:3000';
    }
    return window.location.origin;
  }

  init(gameInstance) {
    this.game = gameInstance;

    // Refresh credentials from localStorage in case updated elsewhere
    if (!this.token) this.token = this.safeGetItem('BC_AUTH_TOKEN');
    if (!this.currentUser) {
      const savedUser = this.safeGetItem('BC_AUTH_USER');
      if (savedUser) {
        try { this.currentUser = JSON.parse(savedUser); } catch (e) {}
      }
    }

    const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());

    if (this.isLoggedIn()) {
      if (g) {
        g.playerName = this.currentUser.username;
        // Synchronously load the user's saved data so there is ZERO delay or guest flash
        if (typeof g.loadSaveData === 'function') {
          g.loadSaveData();
        }
        if (typeof g.updateTopBarCurrency === 'function') {
          g.updateTopBarCurrency();
        }
      }
      this.updateUI();

      // Verify and fetch cloud save in the background
      this.verifyAndFetchSave();
    } else {
      // Guest mode
      if (g && typeof g.loadSaveData === 'function') {
        g.loadSaveData();
        g.updateTopBarCurrency();
      }
      this.updateUI();
    }
  }

  isLoggedIn() {
    return !!(this.currentUser && (this.currentUser.username || this.token));
  }

  async verifyAndFetchSave() {
    if (!this.isLoggedIn()) return;
    this.setSyncStatus('syncing');

    try {
      const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

      const fetchOptions = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };
      if (controller) fetchOptions.signal = controller.signal;

      const res = await fetch(`${this.apiBase}/api/me`, fetchOptions);
      if (timeoutId) clearTimeout(timeoutId);

      const data = await res.json();
      if (data.success && data.user) {
        this.currentUser = data.user;
        this.safeSetItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.safeSetItem('BC_LAST_USER', data.user.username);
        this.updateUI();

        // If server has valid cloud save data, merge/apply into the game
        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (data.saveData && g && typeof g.applySaveData === 'function') {
          console.log('☁️ Đã đồng bộ dữ liệu từ đám mây cho tài khoản:', this.currentUser.username);
          g.applySaveData(data.saveData);
        }
        this.setSyncStatus('synced');
      } else {
        // IMPORTANT: NEVER auto-logout the user when closing or reloading the page!
        // The user stays logged in locally with all their saved data intact.
        console.warn('⚠️ Chưa thể xác thực phiên đám mây từ máy chủ, duy trì đăng nhập cục bộ cho:', this.currentUser ? this.currentUser.username : '');
        this.setSyncStatus('offline');
        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (g && typeof g.loadSaveData === 'function') {
          g.loadSaveData();
        }
      }
    } catch (err) {
      // Network error, offline, or timeout: keep user logged in locally!
      console.warn('Không thể kết nối máy chủ cloud save (chế độ ngoại tuyến):', err.message || err);
      this.setSyncStatus('offline');
      const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
      if (g && typeof g.loadSaveData === 'function') {
        g.loadSaveData();
      }
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
        this.safeSetItem('BC_AUTH_TOKEN', data.token);
        this.safeSetItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.safeSetItem('BC_LAST_USER', data.user.username);
        this.safeSetItem('BC_REMEMBER_LOGIN', 'true');
        this.updateUI();

        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (g) {
          g.playerName = this.currentUser.username;
          if (data.saveData) {
            g.applySaveData(data.saveData);
          } else {
            g.saveGameData();
          }
          g.updateTopBarCurrency();
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
        this.safeSetItem('BC_AUTH_TOKEN', data.token);
        this.safeSetItem('BC_AUTH_USER', JSON.stringify(data.user));
        this.safeSetItem('BC_LAST_USER', data.user.username);
        this.safeSetItem('BC_REMEMBER_LOGIN', 'true');
        this.updateUI();

        const g = this.game || window.gameInstance || (window.ensureGameInstance && window.ensureGameInstance());
        if (g) {
          g.playerName = this.currentUser.username;
          if (data.saveData) {
            g.applySaveData(data.saveData);
          } else {
            const localKey = 'BC_USER_DATA_' + username.toLowerCase();
            const localSaved = this.safeGetItem(localKey);
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
          g.saveGameData(); // immediately write to user key in localStorage
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
    this.safeRemoveItem('BC_AUTH_TOKEN');
    this.safeRemoveItem('BC_AUTH_USER');
    this.safeRemoveItem('BC_REMEMBER_LOGIN');
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
    if (!this.isLoggedIn()) return;

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
    if (!this.isLoggedIn()) return { success: false, reason: 'not_logged_in' };

    try {
      const res = await fetch(`${this.apiBase}/api/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          saveData,
          token: this.token,
          username: this.currentUser ? this.currentUser.username : undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        this.setSyncStatus('synced');
        return { success: true, savedAt: data.savedAt };
      } else {
        this.setSyncStatus('offline');
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
      dot.title = 'Chế độ ngoại tuyến (Dữ liệu được lưu an toàn trên máy)';
    } else {
      dot.innerHTML = '⚠️';
      dot.title = 'Đã lưu cục bộ an toàn';
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
      if (txtUser) txtUser.innerText = (this.currentUser && this.currentUser.username) || 'Pháp Sư';
      if (btnSave) btnSave.style.display = 'inline-flex';
    } else {
      if (btnAuth) btnAuth.style.display = 'inline-flex';
      if (pillUser) pillUser.style.display = 'none';
      if (btnSave) btnSave.style.display = 'none';
    }
  }
}

window.authManager = new AuthManager();
