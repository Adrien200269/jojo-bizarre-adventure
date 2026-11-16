import React from 'react';
import { Volume2, VolumeX, Sparkles, Clock, Compass, Shield, Award, Users, Swords } from 'lucide-react';
import soundEngine from '../utils/soundEngine.js';

export const PALETTES = [
  { id: 'default', name: 'Original Anime', class: '' },
  { id: 'morioh', name: 'Morioh Sunset', class: 'color-shift-morioh' },
  { id: 'golden', name: 'Golden Wind', class: 'color-shift-golden' },
  { id: 'dio', name: 'Vampire DIO', class: 'color-shift-dio' },
];

export default function Navbar({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  currentPalette,
  setCurrentPalette,
  triggerTimeStop,
  isTimeStopped
}) {
  const handleToggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundEngine.playStandSummon();
    }
  };

  const cyclePalette = () => {
    soundEngine.playStandSummon();
    const currentIndex = PALETTES.findIndex(p => p.id === currentPalette);
    const nextIndex = (currentIndex + 1) % PALETTES.length;
    setCurrentPalette(PALETTES[nextIndex].id);
  };

  const navItems = [
    { id: 'database', label: 'Stand & Lore', icon: Shield, badge: 'Parts 1-9' },
    { id: 'creator', label: 'Stand Creator', icon: Sparkles, badge: 'Custom Radar' },
    { id: 'soundboard', label: 'Soundboard', icon: Volume2, badge: 'FX Engine' },
    { id: 'family-tree', label: 'Bloodline Tree', icon: Users, badge: 'Generations' },
    { id: 'battle-arena', label: 'Battle Arena', icon: Swords, badge: 'Clash Simulator' },
    { id: 'quiz', label: 'Stand Matcher', icon: Award, badge: 'Personality' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#0e091d]/95 backdrop-blur-md border-b-4 border-black shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-black py-1 px-4 font-manga text-xs tracking-wider flex items-center justify-between border-b-2 border-black overflow-hidden">
        <div className="flex items-center gap-3">
          <span className="bg-black text-yellow-300 px-2 py-0.5 rounded font-bold uppercase text-[10px]">
            ARAKI MANGA HUB
          </span>
          <span className="hidden sm:inline font-bold">
            ★ MENACING • BIZARRE • HAMON • STAND ABILITY RESEARCH ARCHIVE ★
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <span className="font-kanji">ゴゴゴゴ</span>
          <span className="hidden md:inline">CLICK ANYWHERE FOR MANGA PARTICLES</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Main Logo */}
        <div
          onClick={() => setActiveTab('database')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-12 h-12 bg-yellow-400 border-3 border-black shadow-[3px_3px_0px_#ff0055] flex items-center justify-center font-manga text-2xl text-black group-hover:rotate-6 transition-transform">
            ★
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-manga text-2xl md:text-3xl text-yellow-400 text-stroke-black drop-shadow-[2px_2px_0px_#000] tracking-wide">
                JOJO'S
              </span>
              <span className="font-manga text-lg md:text-xl text-pink-500 drop-shadow-[1px_1px_0px_#000]">
                BIZARRE ADVENTURE
              </span>
            </div>
            <div className="font-kanji text-xs text-purple-300 font-bold tracking-widest -mt-1">
              ジョジョの奇妙な冒険 • INTERACTIVE HUB
            </div>
          </div>
        </div>

        {/* Action Buttons: Za Warudo, Palette Shift, Audio */}
        <div className="flex items-center gap-2">
          {/* ZA WARUDO Button */}
          <button
            onClick={triggerTimeStop}
            disabled={isTimeStopped}
            className={`comic-btn px-3 py-1.5 text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all ${
              isTimeStopped
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-300 text-black shadow-[3px_3px_0px_#000]'
            }`}
            title="Freeze time for 5 seconds!"
          >
            <Clock className={`w-4 h-4 ${isTimeStopped ? 'animate-spin' : ''}`} />
            <span>{isTimeStopped ? 'FROZEN...' : 'ZA WARUDO!'}</span>
          </button>

          {/* Palette Shift */}
          <button
            onClick={cyclePalette}
            className="comic-btn bg-purple-600 hover:bg-purple-500 text-white px-2.5 py-1.5 text-xs font-bold flex items-center gap-1.5"
            title="Cycle Araki Color Filter"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="hidden sm:inline">PALETTE:</span>
            <span className="text-yellow-300 uppercase">
              {PALETTES.find(p => p.id === currentPalette)?.name.split(' ')[0]}
            </span>
          </button>

          {/* Mute Toggle */}
          <button
            onClick={handleToggleSound}
            className={`comic-btn px-2.5 py-1.5 text-xs flex items-center gap-1 ${
              isMuted ? 'bg-red-600 text-white' : 'bg-emerald-500 text-black'
            }`}
            title={isMuted ? 'Unmute JoJo Sound Effects' : 'Mute JoJo Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:inline font-bold">{isMuted ? 'MUTED' : 'SFX ON'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="bg-[#150d2c] border-t-2 border-black/80 px-4 overflow-x-auto scrollbar-none py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundEngine.playStandSummon();
                  setActiveTab(item.id);
                }}
                className={`comic-btn px-3 py-1.5 text-xs md:text-sm flex items-center gap-2 rounded-none transition-all ${
                  isActive
                    ? 'bg-[#ff0077] text-white shadow-[3px_3px_0px_#000] scale-105'
                    : 'bg-[#201542] hover:bg-[#2e1d61] text-gray-200 shadow-[2px_2px_0px_#000]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-300' : 'text-purple-300'}`} />
                <span className="font-manga">{item.label}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded font-sans uppercase font-bold ${
                  isActive ? 'bg-black text-yellow-300' : 'bg-black/50 text-gray-400'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
