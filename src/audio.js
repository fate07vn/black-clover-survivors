// Web Audio API Synthesizer for Black Clover: Magic Survivor
// Procedural audio engine with Gacha pulls, card flips, and legendary summon fanfares!

class SoundController {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmMuted = false;
    this.sfxVolume = 0.35;
    this.bgmVolume = 0.22;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.bgmStep = 0;
    this.tempo = 138;
    this.pickupPitchChain = 0;
    this.lastPickupTime = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startVol = 0.2, endVol = 0.001, pitchEnd = null) {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      if (pitchEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, pitchEnd), now + duration);
      }

      gain.gain.setValueAtTime(startVol * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(endVol, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }

  playNoise(duration, filterFreq, filterType = 'bandpass', startVol = 0.3, sweepTo = null) {
    if (this.muted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.setValueAtTime(filterFreq, now);
      if (sweepTo) {
        filter.frequency.exponentialRampToValueAtTime(sweepTo, now + duration);
      }

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(startVol * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {}
  }

  // Combat SFX
  slash() {
    this.playNoise(0.1, 1300, 'bandpass', 0.4, 280);
    this.playTone(280, 'sawtooth', 0.09, 0.25, 0.01, 80);
  }

  dimensionSlash() {
    this.playNoise(0.35, 750, 'lowpass', 0.6, 100);
    this.playTone(180, 'sawtooth', 0.3, 0.4, 0.01, 40);
    this.playTone(60, 'sine', 0.45, 0.5, 0.01, 30);
  }

  windBlade() {
    this.playNoise(0.12, 2900, 'bandpass', 0.35, 800);
    this.playTone(540, 'sine', 0.1, 0.15, 0.01, 340);
  }

  waterSplash() {
    this.playNoise(0.22, 950, 'bandpass', 0.35, 380);
    this.playTone(340, 'triangle', 0.18, 0.25, 0.01, 140);
  }

  lightning() {
    this.playNoise(0.16, 3600, 'highpass', 0.5, 600);
    this.playTone(920, 'sawtooth', 0.07, 0.3, 0.01, 150);
  }

  timeWarp() {
    this.playTone(750, 'sine', 0.28, 0.25, 0.01, 1150);
    this.playTone(450, 'triangle', 0.28, 0.2, 0.01, 900);
  }

  fireExplosion() {
    this.playNoise(0.28, 650, 'lowpass', 0.5, 80);
    this.playTone(160, 'sawtooth', 0.22, 0.35, 0.01, 40);
  }

  pickup() {
    if (this.muted || !this.ctx) return;
    const now = Date.now();
    if (now - this.lastPickupTime < 400) {
      this.pickupPitchChain = (this.pickupPitchChain + 1) % 8;
    } else {
      this.pickupPitchChain = 0;
    }
    this.lastPickupTime = now;

    const baseFreqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5];
    const freq = baseFreqs[this.pickupPitchChain];
    this.playTone(freq, 'sine', 0.07, 0.22, 0.01, freq * 1.25);
  }

  hit() {
    this.playNoise(0.05, 1900, 'bandpass', 0.18, 500);
  }

  bossAlert() {
    if (this.muted || !this.ctx) return;
    [0, 0.28, 0.56].forEach((delay) => {
      setTimeout(() => {
        this.playTone(440, 'sawtooth', 0.2, 0.35, 0.01, 330);
        this.playTone(220, 'sawtooth', 0.22, 0.4, 0.01, 165);
      }, delay * 1000);
    });
  }

  levelUp() {
    if (this.muted || !this.ctx) return;
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.22, 0.3, 0.01);
      }, idx * 70);
    });
  }

  evolution() {
    if (this.muted || !this.ctx) return;
    const notes = [523, 659, 784, 1046, 1318, 1568];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'sawtooth', 0.28, 0.35, 0.01);
      }, idx * 75);
    });
  }

  playerHurt() {
    this.playTone(160, 'sawtooth', 0.14, 0.38, 0.01, 60);
    this.playNoise(0.09, 400, 'lowpass', 0.28, 100);
  }

  dash() {
    this.playNoise(0.16, 1500, 'bandpass', 0.32, 400);
    this.playTone(320, 'sawtooth', 0.14, 0.24, 0.01, 620);
  }

  gameOver() {
    if (this.muted || !this.ctx) return;
    const notes = [440, 415, 392, 330, 220];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'sawtooth', 0.4, 0.35, 0.01);
      }, idx * 200);
    });
  }

  victory() {
    if (this.muted || !this.ctx) return;
    const notes = [523, 659, 784, 880, 1046, 1174, 1318];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.28, 0.3, 0.01);
      }, idx * 90);
    });
  }

  // GACHA & UPGRADE SOUNDS
  gachaSummonStart() {
    this.init();
    this.playNoise(0.6, 800, 'bandpass', 0.4, 2500);
    this.playTone(220, 'sawtooth', 0.5, 0.25, 0.01, 880);
  }

  gachaCardFlip(rarity) {
    this.init();
    if (rarity === 'legendary') {
      // Grand Fanfare
      const notes = [440, 554, 659, 880, 1108, 1318, 1760];
      notes.forEach((f, idx) => {
        setTimeout(() => {
          this.playTone(f, 'sawtooth', 0.35, 0.4, 0.01);
        }, idx * 80);
      });
      this.playNoise(0.5, 1200, 'lowpass', 0.5, 100);
    } else if (rarity === 'epic') {
      const notes = [440, 554, 659, 880];
      notes.forEach((f, idx) => {
        setTimeout(() => {
          this.playTone(f, 'triangle', 0.25, 0.3, 0.01);
        }, idx * 75);
      });
    } else if (rarity === 'rare') {
      this.playTone(659, 'triangle', 0.2, 0.25, 0.01, 880);
      this.playTone(880, 'sine', 0.25, 0.25, 0.01);
    } else {
      this.playTone(523, 'sine', 0.15, 0.2, 0.01);
    }
  }

  upgradeBuy() {
    this.init();
    this.playTone(659.25, 'triangle', 0.12, 0.25, 0.01);
    setTimeout(() => {
      this.playTone(880, 'triangle', 0.18, 0.3, 0.01);
    }, 80);
  }

  // PROCEDURAL BATTLE BGM
  startBGM() {
    if (this.bgmPlaying || this.bgmMuted) return;
    this.init();
    this.bgmPlaying = true;
    this.bgmStep = 0;

    const bassline = [
      110, 110, 130.81, 110,  146.83, 110, 164.81, 130.81,
      87.31, 87.31, 110, 87.31,  130.81, 87.31, 146.83, 110,
      98, 98, 123.47, 98,  146.83, 98, 164.81, 123.47,
      110, 110, 164.81, 146.83,  130.81, 123.47, 110, 82.41
    ];

    const leadMelody = [
      440, 0, 523, 0, 659, 0, 587, 523,
      392, 0, 440, 0, 523, 659, 587, 0,
      493, 0, 587, 0, 659, 0, 784, 659,
      880, 0, 784, 659, 587, 523, 440, 0
    ];

    const stepDuration = 60 / this.tempo / 2;

    const tick = () => {
      if (!this.bgmPlaying || this.bgmMuted || !this.ctx) return;

      const now = this.ctx.currentTime;
      const step = this.bgmStep % 32;

      if (step % 4 === 0) {
        const kickOsc = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kickOsc.frequency.setValueAtTime(140, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.1);
        kickGain.gain.setValueAtTime(0.3 * this.bgmVolume, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        kickOsc.connect(kickGain);
        kickGain.connect(this.ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.1);
      } else if (step % 4 === 2) {
        this.playNoise(0.08, 1400, 'highpass', 0.16 * this.bgmVolume, 300);
      }

      if (step % 2 === 1) {
        this.playNoise(0.03, 7000, 'highpass', 0.07 * this.bgmVolume);
      }

      const bassFreq = bassline[step];
      if (bassFreq) {
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = 'sawtooth';
        bOsc.frequency.setValueAtTime(bassFreq, now);
        bGain.gain.setValueAtTime(0.16 * this.bgmVolume, now);
        bGain.gain.exponentialRampToValueAtTime(0.01, now + stepDuration * 0.9);
        bOsc.connect(bGain);
        bGain.connect(this.ctx.destination);
        bOsc.start(now);
        bOsc.stop(now + stepDuration * 0.9);
      }

      const leadFreq = leadMelody[step];
      if (leadFreq > 0) {
        const lOsc = this.ctx.createOscillator();
        const lGain = this.ctx.createGain();
        lOsc.type = 'triangle';
        lOsc.frequency.setValueAtTime(leadFreq, now);
        lGain.gain.setValueAtTime(0.11 * this.bgmVolume, now);
        lGain.gain.exponentialRampToValueAtTime(0.005, now + stepDuration * 0.85);
        lOsc.connect(lGain);
        lGain.connect(this.ctx.destination);
        lOsc.start(now);
        lOsc.stop(now + stepDuration * 0.85);
      }

      this.bgmStep++;
    };

    this.bgmInterval = setInterval(tick, stepDuration * 1000);
  }

  setSFXVolume(val) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    this.muted = this.sfxVolume === 0;
  }

  setBGMVolume(val) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    this.bgmMuted = this.bgmVolume === 0;
  }

  chestOpen() {
    this.init();
    const notes = [587, 740, 880, 1175, 1480];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.22, 0.35, 0.01);
      }, idx * 60);
    });
    this.playNoise(0.2, 2200, 'highpass', 0.25, 4000);
  }

  bombExplode() {
    this.init();
    this.playNoise(0.7, 450, 'lowpass', 0.8, 40);
    this.playTone(120, 'sawtooth', 0.6, 0.6, 0.01, 25);
    this.playTone(55, 'sine', 0.8, 0.7, 0.01, 20);
  }

  magnetPickup() {
    this.init();
    const freqs = [350, 480, 620, 800, 1050, 1400];
    freqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'sine', 0.12, 0.25, 0.01);
      }, idx * 45);
    });
  }

  divineLight() {
    this.init();
    this.playNoise(0.35, 3200, 'bandpass', 0.45, 1200);
    this.playTone(880, 'sine', 0.35, 0.3, 0.01, 1760);
  }

  shadowSlash() {
    this.init();
    this.playNoise(0.18, 900, 'bandpass', 0.35, 200);
    this.playTone(180, 'sawtooth', 0.2, 0.28, 0.01, 80);
  }

  originSwords() {
    this.init();
    this.playNoise(0.22, 2800, 'highpass', 0.3, 1400);
    this.playTone(660, 'triangle', 0.2, 0.25, 0.01, 1320);
  }

  conqueringEon() {
    this.init();
    this.playNoise(0.65, 450, 'lowpass', 0.75, 50);
    this.playTone(130, 'sawtooth', 0.6, 0.5, 0.01, 30);
    this.playTone(880, 'triangle', 0.5, 0.4, 0.01, 220);
  }

  chronoFreeze() {
    this.init();
    this.playNoise(0.3, 1600, 'bandpass', 0.35, 600);
    this.playTone(720, 'sine', 0.4, 0.3, 0.01, 360);
  }

  waterMagic() {
    this.init();
    this.waterSplash();
  }

  fireball() {
    this.init();
    this.playNoise(0.2, 800, 'lowpass', 0.35, 100);
    this.playTone(220, 'sawtooth', 0.22, 0.25, 0.01, 90);
  }

  cardFlip() {
    this.init();
    this.playTone(520, 'triangle', 0.08, 0.2, 0.01, 780);
  }

  uiClick() {
    this.init();
    this.playTone(600, 'sine', 0.05, 0.15, 0.01, 900);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBGM() {
    this.bgmMuted = !this.bgmMuted;
    if (this.bgmMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return !this.bgmMuted;
  }

  toggleSFX() {
    this.muted = !this.muted;
    return !this.muted;
  }
}

// Wrap SoundController with a Proxy to guarantee missing methods NEVER throw or crash the game!
const rawSoundInstance = new SoundController();
window.soundEngine = new Proxy(rawSoundInstance, {
  get(target, prop) {
    if (prop in target) {
      const val = target[prop];
      return typeof val === 'function' ? val.bind(target) : val;
    }
    // Return a safe dummy callable function so missing sound methods NEVER throw!
    return (...args) => {
      try {
        if (typeof target.playTone === 'function' && !target.muted) {
          target.playTone(440, 'triangle', 0.1, 0.1, 0.01);
        }
      } catch (e) {}
    };
  }
});
