// Real Character Voice Audio Player & Web Audio Synthesizer
class JoJoSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.audioCache = {};
    this.currentVoice = null;
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
    if (this.isMuted && this.currentVoice) {
      this.currentVoice.pause();
    }
    return this.isMuted;
  }

  // Helper to play real character audio clip from /audio/
  playRealVoice(fileName, volume = 1.0) {
    if (this.isMuted || typeof window === 'undefined') return;

    try {
      // Stop previously playing voice clip to prevent muddy overlap
      if (this.currentVoice) {
        this.currentVoice.pause();
        this.currentVoice.currentTime = 0;
      }

      let audio = this.audioCache[fileName];
      if (!audio) {
        audio = new Audio(`/audio/${fileName}`);
        this.audioCache[fileName] = audio;
      } else {
        audio.currentTime = 0;
      }

      audio.volume = Math.max(0, Math.min(1, volume));
      this.currentVoice = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio play blocked or unavailable, using fallback:", err);
        });
      }
      return audio;
    } catch (err) {
      console.warn("Real voice playback error:", err);
    }
  }

  // --- Real Character Voice Methods ---

  // DIO: ZA WARUDO! (Real Takehito Koyasu anime audio)
  playZaWarudo() {
    if (this.isMuted) return;
    this.playRealVoice('za_warudo.wav', 1.0);
  }

  // Jotaro Kujo: Star Platinum The World (Real Daisuke Ono audio)
  playStarPlatinumTheWorld() {
    this.playRealVoice('star_platinum_the_world.wav', 1.0);
  }

  // Jotaro Kujo: ORA ORA ORA ORA! (Real anime rush)
  playOraRush() {
    this.playRealVoice('ora_rush.wav', 1.0);
  }

  // DIO: MUDA MUDA MUDA! (Real anime rush)
  playMudaRush() {
    this.playRealVoice('muda_rush.wav', 1.0);
  }

  // Giorno Giovanna: 7-Page MUDA! (Real anime rush)
  playGerMuda() {
    this.playRealVoice('ger_muda.wav', 1.0);
  }

  // Josuke Higashikata: DORA RA RA RA! (Real anime rush)
  playDoraRush() {
    this.playRealVoice('dora_rush.wav', 1.0);
  }

  // Bruno Bucciarati: ARI ARI ARI ARIVEDERCI! (Real anime voice)
  playAriArrivederci() {
    this.playRealVoice('ari_arrivederci.wav', 1.0);
  }

  // Bruno Bucciarati: Arrivederci (Short signature quote)
  playArrivederci() {
    this.playRealVoice('arrivederci.wav', 1.0);
  }

  // Jotaro Kujo: Yare Yare Daze (Real Daisuke Ono voice)
  playYareYareDaze() {
    this.playRealVoice('yare_yare_daze.wav', 1.0);
  }

  // DIO: WRYYYYYYYYYYY! (Real Takehito Koyasu scream)
  playDioWryyy() {
    this.playRealVoice('dio_wryyy.mp3', 1.0);
  }

  // DIO: ROAD ROLLER DA!
  playRoadRollerDa() {
    this.playRealVoice('road_roller_da.wav', 1.0);
  }

  // DIO: Ho... Mukatte kuru no ka (Approach quote)
  playDioApproach() {
    this.playRealVoice('dio_approach.wav', 1.0);
  }

  // Joseph Joestar: NIGERUNDAYO, SMOKEY! (Real anime voice)
  playNigerundayo() {
    this.playRealVoice('nigerundayo.mp3', 1.0);
  }

  // Joseph Joestar: NAAAICE!
  playJosephNice() {
    this.playRealVoice('joseph_nice.wav', 1.0);
  }

  // Giorno Giovanna: Kono Giorno Giovanna ni wa yume ga aru! (Real anime voice)
  playGiornoDream() {
    this.playRealVoice('giorno_dream.wav', 1.0);
  }

  // Giorno Giovanna: Kore ga... Requiem da
  playThisIsRequiem() {
    this.playRealVoice('this_is_requiem.wav', 1.0);
  }

  // Yoshikage Kira: Bites the Dust / Click
  playBitesTheDust() {
    this.playRealVoice('bites_the_dust.wav', 1.0);
  }

  // Diavolo: Kekka dake da! (King Crimson results quote)
  playKingCrimsonResults() {
    this.playRealVoice('king_crimson_results.wav', 1.0);
  }

  // Jolyne Cujoh: Stone Free ORA ORA! (Real anime voice)
  playStoneFreeOra() {
    this.playRealVoice('stone_free_ora.wav', 1.0);
  }

  // Johnny Joestar: Tusk Act 4 ORA ORA! (Real anime voice)
  playTuskOra() {
    this.playRealVoice('tusk_ora.wav', 1.0);
  }

  // Tusk Act 4: CHUMIMI~~N!
  playChumimiin() {
    this.playRealVoice('chumimiin.wav', 1.0);
  }

  // Narancia Ghirga: Volare Via! (Real anime voice)
  playVolareVia() {
    this.playRealVoice('volare_via.wav', 1.0);
  }

  // --- Sound Synthesizer Fallbacks & FX ---

  playTimeResume() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.45);

    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  // Iconic "To Be Continued..." Roundabout Bass Pluck
  playRoundaboutBass() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

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

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.75);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.8);
  }

  // Heavy Punch / Impact
  playPunchImpact(baseFreq = 220) {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
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
    osc2.frequency.setValueAtTime(68.5, t);

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

  // Voice synthesis fallback
  speak(text, rate = 1.0, pitch = 1.0) {
    if (this.isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new JoJoSoundEngine();
export default soundEngine;
