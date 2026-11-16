import React, { useState } from 'react';
import soundEngine from '../utils/soundEngine.js';
import { Volume2, Play, Sparkles, Mic, Radio, Award } from 'lucide-react';

const REAL_VOICE_TRIGGERS = [
  {
    id: 'za-warudo',
    title: 'ZA WARUDO! (Time Stop)',
    sub: '世界 - 時よ止まれ！',
    actor: 'Takehito Koyasu (子安 武人)',
    character: 'DIO (Part 3)',
    action: () => soundEngine.playZaWarudo(),
    color: 'bg-yellow-400 text-black',
    icon: '⏳',
    isReal: true
  },
  {
    id: 'ora-rush',
    title: 'ORA ORA ORA ORA!',
    sub: 'オラオラ連打ラッシュ',
    actor: 'Daisuke Ono (小野 大輔)',
    character: 'Jotaro Kujo',
    action: () => soundEngine.playOraRush(),
    color: 'bg-purple-600 text-white',
    icon: '👊',
    isReal: true
  },
  {
    id: 'muda-rush',
    title: 'MUDA MUDA MUDA!',
    sub: '無駄無駄ラッシュ',
    actor: 'Takehito Koyasu',
    character: 'DIO',
    action: () => soundEngine.playMudaRush(),
    color: 'bg-amber-500 text-black',
    icon: '⚡',
    isReal: true
  },
  {
    id: 'ger-muda',
    title: '7-Page MUDA! (Requiem)',
    sub: '無駄無駄無駄 7ページ',
    actor: 'Kensho Ono (小野 賢章)',
    character: 'Giorno Giovanna',
    action: () => soundEngine.playGerMuda(),
    color: 'bg-yellow-500 text-black',
    icon: '🌟',
    isReal: true
  },
  {
    id: 'yare-yare',
    title: 'Yare Yare Daze',
    sub: 'やれやれだぜ...',
    actor: 'Daisuke Ono',
    character: 'Jotaro Kujo',
    action: () => soundEngine.playYareYareDaze(),
    color: 'bg-indigo-700 text-white',
    icon: '🧢',
    isReal: true
  },
  {
    id: 'sp-the-world',
    title: 'Star Platinum: The World!',
    sub: 'スタープラチナ ザ・ワールド',
    actor: 'Daisuke Ono',
    character: 'Jotaro Kujo',
    action: () => soundEngine.playStarPlatinumTheWorld(),
    color: 'bg-purple-800 text-yellow-300',
    icon: '⭐',
    isReal: true
  },
  {
    id: 'road-roller',
    title: 'ROAD ROLLER DA!',
    sub: 'ロードローラーだッ！',
    actor: 'Takehito Koyasu',
    character: 'DIO',
    action: () => soundEngine.playRoadRollerDa(),
    color: 'bg-yellow-600 text-black',
    icon: '🚜',
    isReal: true
  },
  {
    id: 'dio-wryyy',
    title: 'WRYYYYYYYYYY!',
    sub: '最高に「ハイ！」ってやつだ！',
    actor: 'Takehito Koyasu',
    character: 'DIO',
    action: () => soundEngine.playDioWryyy(),
    color: 'bg-red-600 text-white',
    icon: '🩸',
    isReal: true
  },
  {
    id: 'dio-approach',
    title: 'Approaching Me? (Ho...)',
    sub: 'ほう… 向かって来るのか',
    actor: 'Takehito Koyasu',
    character: 'DIO',
    action: () => soundEngine.playDioApproach(),
    color: 'bg-rose-600 text-white',
    icon: '🚶',
    isReal: true
  },
  {
    id: 'nigerundayo',
    title: 'Nigerundayo, Smokey!',
    sub: '逃げるんだよォ！スモーキー！',
    actor: 'Tomokazu Sugita (杉田 智和)',
    character: 'Joseph Joestar',
    action: () => soundEngine.playNigerundayo(),
    color: 'bg-amber-600 text-white',
    icon: '🏃',
    isReal: true
  },
  {
    id: 'joseph-nice',
    title: 'NAAAICE!',
    sub: 'ナイス！',
    actor: 'Unshō Ishizuka (石塚 運昇)',
    character: 'Joseph Joestar',
    action: () => soundEngine.playJosephNice(),
    color: 'bg-emerald-600 text-white',
    icon: '👍',
    isReal: true
  },
  {
    id: 'giorno-dream',
    title: 'I Have a Dream!',
    sub: 'ジョルノ・ジョバァーナには夢がある',
    actor: 'Kensho Ono',
    character: 'Giorno Giovanna',
    action: () => soundEngine.playGiornoDream(),
    color: 'bg-amber-400 text-black',
    icon: '🐞',
    isReal: true
  },
  {
    id: 'this-is-requiem',
    title: 'Kore ga Requiem da',
    sub: 'これが… レクイエムだ',
    actor: 'Kensho Ono',
    character: 'Giorno Giovanna',
    action: () => soundEngine.playThisIsRequiem(),
    color: 'bg-yellow-300 text-black',
    icon: '✨',
    isReal: true
  },
  {
    id: 'ari-arrivederci',
    title: 'Ari Ari... Arrivederci!',
    sub: 'アリアリアリ... アリーヴェデルチ！',
    actor: 'Yuichi Nakamura (中村 悠一)',
    character: 'Bruno Bucciarati',
    action: () => soundEngine.playAriArrivederci(),
    color: 'bg-sky-600 text-white',
    icon: '🤐',
    isReal: true
  },
  {
    id: 'dora-rush',
    title: 'DORA RA RA RA!',
    sub: 'ドラララ連打ラッシュ',
    actor: 'Yuuki Ono (小野 友樹)',
    character: 'Josuke Higashikata',
    action: () => soundEngine.playDoraRush(),
    color: 'bg-pink-600 text-white',
    icon: '💎',
    isReal: true
  },
  {
    id: 'bites-the-dust',
    title: 'Bites the Dust (Click!)',
    sub: '負け犬を踏み潰す！',
    actor: 'Toshiyuki Morikawa (森川 智之)',
    character: 'Yoshikage Kira',
    action: () => soundEngine.playBitesTheDust(),
    color: 'bg-fuchsia-700 text-white',
    icon: '💣',
    isReal: true
  },
  {
    id: 'king-crimson',
    title: 'Results Remain (Kekka Dake Da)',
    sub: '結果だけだ！',
    actor: 'Katsuyuki Konishi (小西 克幸)',
    character: 'Diavolo',
    action: () => soundEngine.playKingCrimsonResults(),
    color: 'bg-red-800 text-white',
    icon: '👁️',
    isReal: true
  },
  {
    id: 'stone-free',
    title: 'Stone Free ORA!',
    sub: 'ストーン・フリー 連打',
    actor: 'Fairouz Ai (ファイルーズ あい)',
    character: 'Jolyne Cujoh',
    action: () => soundEngine.playStoneFreeOra(),
    color: 'bg-cyan-600 text-black',
    icon: '🦋',
    isReal: true
  },
  {
    id: 'tusk-ora',
    title: 'Tusk ACT 4 ORA!',
    sub: 'オラオラ (黄金の回転)',
    actor: 'Yuki Kaji (梶 裕貴)',
    character: 'Johnny Joestar',
    action: () => soundEngine.playTuskOra(),
    color: 'bg-rose-500 text-white',
    icon: '🐎',
    isReal: true
  },
  {
    id: 'chumimiin',
    title: 'CHUMIMI~~N!',
    sub: 'チュミミ〜〜ン！',
    actor: 'Tusk Act 4',
    character: 'Tusk ACT 4',
    action: () => soundEngine.playChumimiin(),
    color: 'bg-pink-400 text-black',
    icon: '🌀',
    isReal: true
  },
  {
    id: 'volare-via',
    title: 'Volare Via!',
    sub: 'ボラーレ・ヴィーア (飛んで行きな！)',
    actor: 'Daiki Yamashita (山下 大輝)',
    character: 'Narancia Ghirga',
    action: () => soundEngine.playVolareVia(),
    color: 'bg-orange-500 text-white',
    icon: '✈️',
    isReal: true
  },
  {
    id: 'roundabout',
    title: 'To Be Continued...',
    sub: 'Roundabout Funky Bassline',
    actor: 'Yes (Ending Theme)',
    character: 'Iconic Endcard',
    action: () => soundEngine.playRoundaboutBass(),
    color: 'bg-emerald-600 text-white',
    icon: '➡️',
    isReal: false
  }
];

const getCharacterImage = (char) => {
  if (char.includes('DIO')) return '/images/dio.png';
  if (char.includes('Jotaro')) return '/images/jotaro.png';
  if (char.includes('Giorno')) return '/images/giorno.png';
  if (char.includes('Joseph')) return '/images/joseph.png';
  if (char.includes('Josuke')) return '/images/josuke.png';
  if (char.includes('Kira')) return '/images/kira.png';
  if (char.includes('Bucciarati')) return '/images/bucciarati.png';
  if (char.includes('Diavolo')) return '/images/diavolo.png';
  if (char.includes('Jolyne')) return '/images/jolyne.png';
  if (char.includes('Johnny')) return '/images/johnny.png';
  if (char.includes('Tusk')) return '/images/tusk.png';
  if (char.includes('Narancia')) return '/images/bucciarati.png';
  return null;
};

export default function Soundboard() {
  const [activeSoundId, setActiveSoundId] = useState(null);
  const [filterType, setFilterType] = useState('ALL');

  const filteredVoices = REAL_VOICE_TRIGGERS.filter((item) => {
    if (filterType === 'Jotaro') return item.character.includes('Jotaro');
    if (filterType === 'DIO') return item.character.includes('DIO');
    if (filterType === 'Giorno') return item.character.includes('Giorno');
    if (filterType === 'Joestar') return ['Jotaro', 'Joseph', 'Josuke', 'Giorno', 'Jolyne', 'Johnny'].some(j => item.character.includes(j));
    if (filterType === 'Villain') return ['DIO', 'Kira', 'Diavolo'].some(v => item.character.includes(v));
    return true;
  });

  const handleTrigger = (item) => {
    setActiveSoundId(item.id);
    item.action();
    setTimeout(() => setActiveSoundId(null), 1800);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b-4 border-black pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>ORIGINAL JAPANESE ANIME VOICE CLIPS (OFFICIAL SEIYU)</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            REAL CHARACTER VOICE ARCHIVE
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Featuring authentic anime voice lines from Daisuke Ono, Takehito Koyasu, Kensho Ono, Fairouz Ai, Tomokazu Sugita, and more!
          </p>
        </div>

        {/* Live Audio Indicator */}
        <div className="flex items-center gap-3 bg-[#150a2b] border-2 border-black px-4 py-2">
          <Radio className="w-5 h-5 text-green-400 animate-pulse" />
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-bold">Audio Engine</div>
            <div className="font-manga text-yellow-400 text-sm">REAL ANIME VOICES • LOADED</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
        <span className="text-xs font-manga text-yellow-400 shrink-0">FILTER VOICES:</span>
        {[
          { id: 'ALL', label: 'All Voices (22)' },
          { id: 'Joestar', label: 'Joestars Only' },
          { id: 'Villain', label: 'Villains & Bosses' },
          { id: 'Jotaro', label: 'Jotaro Kujo' },
          { id: 'DIO', label: 'DIO' },
          { id: 'Giorno', label: 'Giorno Giovanna' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`comic-btn px-3 py-1 text-xs whitespace-nowrap ${
              filterType === tab.id
                ? 'bg-[#ff0077] text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#150d2c] text-gray-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Soundboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {filteredVoices.map((item) => {
          const isPlaying = activeSoundId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTrigger(item)}
              className={`comic-box p-4 text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[145px] ${
                item.color
              } ${isPlaying ? 'scale-95 ring-4 ring-yellow-300 shadow-none' : ''}`}
            >
              {/* Top Tag & Real Voice Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  {getCharacterImage(item.character) && (
                    <img
                      src={getCharacterImage(item.character)}
                      alt={item.character}
                      className="w-6 h-6 rounded-full object-cover border border-black/60 shadow-xs shrink-0 bg-black/40"
                      loading="lazy"
                    />
                  )}
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider bg-black/60 text-yellow-300 px-2 py-0.5 border border-black/40 truncate">
                    {item.character}
                  </span>
                </div>
                <span className="text-2xl shrink-0">{item.icon}</span>
              </div>

              {/* Title & Kanji */}
              <div>
                <h4 className="font-manga text-xl md:text-2xl tracking-wide leading-tight drop-shadow-[1px_1px_0px_#000]">
                  {item.title}
                </h4>
                <div className="font-kanji text-[11px] font-bold opacity-80 mt-0.5">
                  {item.sub}
                </div>
              </div>

              {/* Voice Actor Credit */}
              <div className="mt-2 pt-2 border-t border-black/20 flex items-center justify-between text-[10px]">
                <span className="font-medium opacity-90 truncate">
                  🎙️ {item.actor}
                </span>
                <span className="font-manga font-bold text-yellow-300 uppercase shrink-0">
                  {isPlaying ? 'PLAYING...' : 'PLAY ▶'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
