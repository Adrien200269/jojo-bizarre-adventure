import React, { useState } from 'react';
import soundEngine from '../utils/soundEngine.js';
import { Volume2, Play, Sparkles, Mic, Radio } from 'lucide-react';

const SOUND_TRIGGERS = [
  {
    id: 'za-warudo',
    title: 'ZA WARUDO! (Time Stop)',
    sub: '世界 - 時よ止まれ！',
    action: () => soundEngine.playZaWarudo(),
    color: 'bg-yellow-400 text-black',
    tag: 'DIO / Star Platinum',
    icon: '⏳'
  },
  {
    id: 'time-resume',
    title: 'Time Resumes',
    sub: '時は動き出す...',
    action: () => soundEngine.playTimeResume(),
    color: 'bg-amber-500 text-black',
    tag: 'DIO',
    icon: '⏱️'
  },
  {
    id: 'ora-rush',
    title: 'ORA ORA ORA ORA!',
    sub: 'スタープラチナ 連打ラッシュ',
    action: () => soundEngine.playOraRush(),
    color: 'bg-purple-600 text-white',
    tag: 'Jotaro Kujo',
    icon: '👊'
  },
  {
    id: 'muda-rush',
    title: 'MUDA MUDA MUDA!',
    sub: '無駄無駄無駄 7ページラッシュ',
    action: () => soundEngine.playMudaRush(),
    color: 'bg-yellow-500 text-black',
    tag: 'DIO & Giorno',
    icon: '⚡'
  },
  {
    id: 'roundabout',
    title: 'To Be Continued...',
    sub: 'Roundabout Funky Bassline',
    action: () => soundEngine.playRoundaboutBass(),
    color: 'bg-emerald-600 text-white',
    tag: 'Iconic Ending Theme',
    icon: '➡️'
  },
  {
    id: 'menacing',
    title: 'Menacing Rumble (ゴゴゴゴ)',
    sub: '不気味な気配 / 重低音',
    action: () => soundEngine.playMenacingRumble(),
    color: 'bg-violet-900 text-yellow-300',
    tag: 'Araki SFX',
    icon: '👁️'
  },
  {
    id: 'stand-summon',
    title: 'Stand Summon Aura',
    sub: 'スタンド発動音',
    action: () => soundEngine.playStandSummon(),
    color: 'bg-cyan-600 text-white',
    tag: 'Aura Ignition',
    icon: '✨'
  },
  {
    id: 'wryyy',
    title: 'WRYYYYYYYYYY!',
    sub: '吸血鬼の咆哮',
    action: () => {
      soundEngine.playPunchImpact(350);
      soundEngine.speak("WRYYYYYYYYYY!", 1.3, 1.4);
    },
    color: 'bg-red-600 text-white',
    tag: 'DIO',
    icon: '🩸'
  },
  {
    id: 'kono-dio',
    title: 'Kono DIO da!',
    sub: 'このDIOだッ！',
    action: () => {
      soundEngine.playPunchImpact(200);
      soundEngine.speak("Kono DIO da!", 1.0, 0.9);
    },
    color: 'bg-rose-500 text-white',
    tag: 'Part 1 Dio',
    icon: '😈'
  },
  {
    id: 'yare-yare',
    title: 'Yare Yare Daze',
    sub: 'やれやれだぜ...',
    action: () => soundEngine.speak("Yare yare daze...", 0.85, 0.75),
    color: 'bg-indigo-700 text-white',
    tag: 'Jotaro Kujo',
    icon: '🧢'
  },
  {
    id: 'daga-kotowaru',
    title: 'Daga Kotowaru! (I refuse)',
    sub: 'だが断る！',
    action: () => soundEngine.speak("Daga kotowaru!", 1.1, 1.1),
    color: 'bg-pink-600 text-white',
    tag: 'Rohan Kishibe',
    icon: '🖋️'
  },
  {
    id: 'nigerundayo',
    title: 'Nigerundayo, Smokey!',
    sub: '逃げるんだよォ！',
    action: () => soundEngine.speak("Nigerundayo, Smokey!", 1.25, 1.2),
    color: 'bg-amber-600 text-white',
    tag: 'Joseph Joestar',
    icon: '🏃'
  },
  {
    id: 'ari-arrivederci',
    title: 'Ari Ari... Arrivederci!',
    sub: 'アリアリアリ... アリーヴェデルチ！',
    action: () => {
      soundEngine.playPunchImpact(240);
      soundEngine.speak("ARI ARI ARI ARI ARI... ARRIVEDERCI!", 1.2, 1.05);
    },
    color: 'bg-sky-600 text-white',
    tag: 'Bruno Bucciarati',
    icon: '🤐'
  },
  {
    id: 'dora-rush',
    title: 'DORA RA RA RA!',
    sub: 'クレイジー・ダイヤモンド 修復連打',
    action: () => {
      soundEngine.playPunchImpact(220);
      soundEngine.speak("DORA RA RA RA RA RA! DORAAA!", 1.3, 1.1);
    },
    color: 'bg-fuchsia-600 text-white',
    tag: 'Josuke Higashikata',
    icon: '💎'
  },
  {
    id: 'dojyaan',
    title: 'DOJYAA~~N!',
    sub: 'ドジャァ〜〜ン！',
    action: () => soundEngine.speak("DOJYAA~~N!", 1.15, 1.25),
    color: 'bg-blue-500 text-white',
    tag: 'Funny Valentine (D4C)',
    icon: '🇺🇸'
  }
];

export default function Soundboard() {
  const [activeSoundId, setActiveSoundId] = useState(null);
  const [customPhrase, setCustomPhrase] = useState("Kono Giorno Giovanna ni wa yume ga aru!");

  const handleTrigger = (item) => {
    setActiveSoundId(item.id);
    item.action();
    setTimeout(() => setActiveSoundId(null), 1500);
  };

  const handleCustomSpeech = () => {
    soundEngine.playStandSummon();
    soundEngine.speak(customPhrase, 1.0, 1.0);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            WEB AUDIO FX & SPEECH ENGINE
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            JOJO RETRO SOUNDBOARD
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Pure synthesizer & voice engine. Triggers iconic anime SFX without waiting for large mp3 downloads!
          </p>
        </div>

        {/* Live Audio Indicator */}
        <div className="flex items-center gap-3 bg-[#150a2b] border-2 border-black px-4 py-2">
          <Radio className="w-5 h-5 text-green-400 animate-pulse" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Sound Synthesizer</div>
            <div className="font-manga text-yellow-400 text-sm">ONLINE • WEB AUDIO API</div>
          </div>
        </div>
      </div>

      {/* Soundboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {SOUND_TRIGGERS.map((item) => {
          const isPlaying = activeSoundId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTrigger(item)}
              className={`comic-box p-4 text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[125px] ${
                item.color
              } ${isPlaying ? 'scale-95 ring-4 ring-yellow-300 shadow-none' : ''}`}
            >
              {/* Top Tag & Emoji */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white px-2 py-0.5 border border-black/30">
                  {item.tag}
                </span>
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Title & Kanji Sub */}
              <div>
                <h4 className="font-manga text-xl md:text-2xl tracking-wide leading-tight drop-shadow-[1px_1px_0px_#000]">
                  {item.title}
                </h4>
                <div className="font-kanji text-[11px] font-bold opacity-80 mt-0.5">
                  {item.sub}
                </div>
              </div>

              {/* Play Indicator */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mt-2 pt-2 border-t border-black/20">
                <span>{isPlaying ? 'PLAYING...' : 'CLICK TO FIRE'}</span>
                <Play className={`w-3 h-3 ${isPlaying ? 'animate-ping' : ''}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom JoJo Voice Synthesizer Input */}
      <div className="comic-box bg-[#1b0d36] border-4 border-black p-6">
        <div className="flex items-center gap-2 mb-3">
          <Mic className="w-5 h-5 text-yellow-400" />
          <h3 className="font-manga text-2xl text-yellow-400 tracking-wide">
            CUSTOM JOJO VOICE LINE GENERATOR
          </h3>
        </div>
        <p className="text-xs text-gray-300 mb-4">
          Type any custom phrase or battle quote in Japanese, English, or Italian to hear it synthesized!
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customPhrase}
            onChange={(e) => setCustomPhrase(e.target.value)}
            placeholder="Type your iconic quote..."
            className="flex-1 bg-[#0b0517] border-2 border-black text-white px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 font-semibold"
          />
          <button
            onClick={handleCustomSpeech}
            className="comic-btn bg-[#ff0077] hover:bg-[#ff1a8c] text-white px-6 py-2.5 text-sm flex items-center justify-center gap-2 font-bold shadow-[3px_3px_0px_#000] shrink-0"
          >
            <Volume2 className="w-4 h-4 text-yellow-300" />
            <span>SPEAK PHRASE</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-purple-900/60">
          <span className="text-[11px] font-manga text-yellow-400">QUICK PRESETS:</span>
          {[
            "Kono Giorno Giovanna ni wa yume ga aru!",
            "Star Platinum: The World!",
            "Killer Queen has already touched that doorknob.",
            "I reject my humanity, JoJo!",
            "Rerorero rerorero rerorero"
          ].map((phrase, i) => (
            <button
              key={i}
              onClick={() => {
                setCustomPhrase(phrase);
                soundEngine.speak(phrase, 1.0, 1.0);
              }}
              className="text-[10px] bg-[#0b0517] hover:bg-[#201040] text-purple-300 border border-purple-800/80 px-2 py-1 font-semibold transition-colors"
            >
              "{phrase}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
