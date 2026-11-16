// Web Audio API Sound Synthesizer & Speech Engine for JoJo effects
class JoJoSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Iconic ZA WARUDO Time Stop Sound (Bass drop + sweep + glitch + clock tick)
  playZaWarudo() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Sub-bass sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.exponentialRampToValueAtTime(28, t + 0.65);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(80, t + 0.7);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.75);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.8);

    // High frequency time-freeze pulse
    setTimeout(() => {
      if (!this.ctx) return;
      const t2 = this.ctx.currentTime;
      const pOsc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      pOsc.type = 'sine';
      pOsc.frequency.setValueAtTime(880, t2);
      pOsc.frequency.exponentialRampToValueAtTime(110, t2 + 0.4);
      pGain.gain.setValueAtTime(0.3, t2);
      pGain.gain.exponentialRampToValueAtTime(0.001, t2 + 0.45);
      pOsc.connect(pGain);
      pGain.connect(this.ctx.destination);
      pOsc.start(t2);
      pOsc.stop(t2 + 0.5);
    }, 450);

    // Ticking clocks
    for (let i = 1; i <= 4; i++) {
      setTimeout(() => {
        this.playClockTick();
      }, 700 + i * 350);
    }

    this.speak("ZA WARUDO! Toki wo tomare!", 0.85, 0.75);
  }

  // Time Resumes
  playTimeResume() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.5);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.6);

    this.speak("Toki wa ugokidasu.", 0.9, 0.9);
  }

  playClockTick() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.04);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  // Stand Rush: ORA ORA ORA
  playOraRush() {
    if (this.isMuted) return;
    this.init();
    this.speak("ORA ORA ORA ORA ORA ORA ORA! ORAAAA!", 1.25, 1.15);

    // Rapid burst punches
    for (let i = 0; i < 9; i++) {
      setTimeout(() => {
        this.playPunchImpact(200 + (i % 3) * 60);
      }, i * 90);
    }
  }

  // Stand Rush: MUDA MUDA MUDA
  playMudaRush() {
    if (this.isMuted) return;
    this.init();
    this.speak("MUDA MUDA MUDA MUDA MUDA MUDA MUDA! WRYYYYYYY!", 1.3, 0.9);

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.playPunchImpact(260 + (i % 2) * 80);
      }, i * 85);
    }
  }

  // Heavy Punch / Impact
  playPunchImpact(baseFreq = 220) {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;

    // Sub thump
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.12);

    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // "Menacing" (ゴゴゴゴ) Ambient rumble
  playMenacingRumble() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65, t);
    osc.frequency.linearRampToValueAtTime(70, t + 1.2);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(68.5, t); // Detuned for dissonance

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, t);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + 1.6);
    osc2.stop(t + 1.6);
  }

  // Iconic "To Be Continued..." Roundabout Bass Pluck
  playRoundaboutBass() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    // Classic Yes - Roundabout intro acoustic harmonic + bass notes: E3 -> G3 -> A3 -> B3 -> E2
    const notes = [
      { freq: 329.63, time: 0, dur: 0.8 },    // E4 harmonic
      { freq: 164.81, time: 0.35, dur: 0.5 }, // E3 slap
      { freq: 196.00, time: 0.7, dur: 0.4 },  // G3
      { freq: 220.00, time: 1.0, dur: 0.4 },  // A3
      { freq: 246.94, time: 1.3, dur: 0.6 },  // B3
      { freq: 82.41,  time: 1.8, dur: 1.5 }   // Deep E2 boom
    ];

    const t = this.ctx.currentTime;
    notes.forEach(n => {
      const start = t + n.time;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.freq, start);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(n.freq * 4, start);
      filter.frequency.exponentialRampToValueAtTime(n.freq * 1.2, start + n.dur);

      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + n.dur + 0.05);
    });
  }

  // Dramatic anime pose sting / Stand summon
  playStandSummon() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(1320, t + 0.25);
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.7);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.8);
  }

  // Voice synthesis helper
  speak(text, rate = 1.0, pitch = 1.0) {
    if (this.isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 0.9;
      
      // Look for dramatic voices if available
      const voices = window.speechSynthesis.getVoices();
      const jpVoice = voices.find(v => v.lang.includes('ja') || v.name.includes('Japanese'));
      if (jpVoice && text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff]/)) {
        utterance.voice = jpVoice;
      }
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore audio synthesis errors silently
    }
  }
}

export const soundEngine = new JoJoSoundEngine();
export default soundEngine;
