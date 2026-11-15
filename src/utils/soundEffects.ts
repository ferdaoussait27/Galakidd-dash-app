const SOUND_PREF_KEY = 'galakidd_sound_enabled_v1';

class SpaceSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean;

  constructor() {
    try {
      const saved = localStorage.getItem(SOUND_PREF_KEY);
      this.enabled = saved !== '0';
    } catch {
      this.enabled = true;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    try {
      localStorage.setItem(SOUND_PREF_KEY, next ? '1' : '0');
    } catch {
      // ignore storage errors
    }
    if (next) {
      this.playClick();
    }
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainPeak = 0.08,
    delaySec = 0,
    endFreq?: number
  ): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainPeak, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick(): void {
    this.tone(660, 0.07, 'sine', 0.05, 0, 820);
  }

  public playSuccess(): void {
    this.tone(523.25, 0.14, 'triangle', 0.08, 0);
    this.tone(659.25, 0.14, 'triangle', 0.08, 0.08);
    this.tone(783.99, 0.24, 'triangle', 0.09, 0.16);
  }

  public playQuizCorrect(): void {
    this.tone(523.25, 0.12, 'sine', 0.08, 0);
    this.tone(659.25, 0.12, 'sine', 0.08, 0.07);
    this.tone(783.99, 0.14, 'sine', 0.09, 0.14);
    this.tone(1046.5, 0.3, 'triangle', 0.09, 0.21);
  }

  public playQuizIncorrect(): void {
    this.tone(330, 0.16, 'triangle', 0.07, 0, 260);
    this.tone(246.94, 0.22, 'triangle', 0.06, 0.13, 210);
  }

  public playCountdownBeep(isFinal = false): void {
    if (isFinal) {
      this.tone(880, 0.35, 'triangle', 0.1, 0);
    } else {
      this.tone(640, 0.16, 'sine', 0.08, 0);
    }
  }

  public playRocketLiftoff(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const duration = 1.6;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.04 * white) / 1.04;
      lastOut = data[i];
      data[i] *= 2.8;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + duration);

    this.tone(523.25, 0.22, 'triangle', 0.07, 0.25);
    this.tone(783.99, 0.3, 'triangle', 0.08, 0.45);
  }

  public playRadioTransmit(): void {
    // Space-to-ground telemetry chirp
    this.tone(1200, 0.06, 'sine', 0.05, 0);
    this.tone(1650, 0.08, 'sine', 0.05, 0.06);
    this.tone(2200, 0.09, 'sine', 0.06, 0.14);
  }

  public playAlertPing(): void {
    this.tone(587.33, 0.12, 'triangle', 0.07, 0);
    this.tone(587.33, 0.12, 'triangle', 0.07, 0.18);
  }

  public playSplashdown(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const duration = 0.75;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(650, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    noise.stop(ctx.currentTime + duration);

    this.playSuccess();
  }
}

export const soundEngine = new SpaceSoundEngine();
