import React, { useState } from 'react';
import { STANDS_AND_CHARACTERS, JOJO_PARTS } from '../data/jojoData.js';
import StandRadarChart from './StandRadarChart.jsx';
import soundEngine from '../utils/soundEngine.js';
import { Search, Volume2, Music, UserCheck, X, Sparkles, BarChart2, Image as ImageIcon } from 'lucide-react';

export default function StandDatabase({ selectedPart, setSelectedPart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlignment, setSelectedAlignment] = useState('ALL');
  const [activeStandModal, setActiveStandModal] = useState(null);
  const [viewModes, setViewModes] = useState({}); // stand.id -> 'art' | 'radar'

  // Filter stands
  const filteredStands = STANDS_AND_CHARACTERS.filter((stand) => {
    const matchesSearch =
      stand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stand.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stand.japanese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stand.musicalReference.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPart = selectedPart === 'ALL' || stand.part === Number(selectedPart);
    const matchesAlignment = selectedAlignment === 'ALL' || stand.alignment === selectedAlignment;

    return matchesSearch && matchesPart && matchesAlignment;
  });

  const toggleViewMode = (id, e) => {
    e.stopPropagation();
    setViewModes((prev) => ({
      ...prev,
      [id]: prev[id] === 'radar' ? 'art' : 'radar'
    }));
  };

  const handlePlayRealVoice = (stand, e) => {
    if (e) e.stopPropagation();

    switch (stand.id) {
      case 'star-platinum':
        soundEngine.playOraRush();
        break;
      case 'the-world':
        soundEngine.playMudaRush();
        break;
      case 'crazy-diamond':
        soundEngine.playDoraRush();
        break;
      case 'killer-queen':
        soundEngine.playBitesTheDust();
        break;
      case 'gold-experience':
        soundEngine.playGerMuda();
        break;
      case 'sticky-fingers':
        soundEngine.playAriArrivederci();
        break;
      case 'king-crimson':
        soundEngine.playKingCrimsonResults();
        break;
      case 'stone-free':
        soundEngine.playStoneFreeOra();
        break;
      case 'tusk-act-4':
        soundEngine.playTuskOra();
        break;
      case 'd4c':
        soundEngine.playRealVoice('volare_via.wav');
        break;
      case 'hermit-purple':
        soundEngine.playJosephOhNo();
        break;
      case 'hierophant-green':
        soundEngine.playRealVoice('emerald_splash.wav');
        break;
      case 'heavens-door':
        soundEngine.playDagaKotowaru();
        break;
      case 'silver-chariot':
        soundEngine.playRealVoice('bravo.wav');
        break;
      default:
        soundEngine.playStandSummon();
        soundEngine.speak(stand.standCry || stand.quote, 1.1, 1.0);
        break;
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            CANON STAND ARCHIVE & CHARACTER RENDERS
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            STAND DATABASE & CHARACTER ART
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Explore authentic anime artwork, 6-axis radar stat wheels, and official voice lines across Parts 1-9!
          </p>
        </div>

        {/* Count Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-[#1f153a] border-2 border-black px-4 py-2 text-right">
            <span className="text-xs text-gray-400 font-bold uppercase block">Stands Indexed</span>
            <span className="font-manga text-2xl text-yellow-400">{filteredStands.length} ARCHIVED</span>
          </div>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="comic-box bg-[#160f2d] p-4 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Stand, User, Kanji, or Song reference..."
              className="w-full bg-[#0d071c] border-2 border-black text-white pl-9 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Alignment Filter */}
          <div className="md:col-span-4 flex items-center gap-1">
            {['ALL', 'Joestar', 'Villain', 'Ally'].map((align) => (
              <button
                key={align}
                onClick={() => setSelectedAlignment(align)}
                className={`flex-1 py-2 text-xs font-manga border-2 border-black transition-all ${
                  selectedAlignment === align
                    ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_#000]'
                    : 'bg-[#0d071c] text-gray-300 hover:text-white'
                }`}
              >
                {align.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Clear button */}
          <div className="md:col-span-3 flex justify-end">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedPart('ALL');
                setSelectedAlignment('ALL');
              }}
              className="text-xs text-gray-400 hover:text-yellow-400 font-manga underline uppercase"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Parts Quick Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedPart('ALL')}
            className={`px-3 py-1 text-xs font-manga border border-black whitespace-nowrap transition-colors ${
              selectedPart === 'ALL'
                ? 'bg-[#ff0077] text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#0d071c] text-gray-300 hover:text-white'
            }`}
          >
            All Parts (1-9)
          </button>
          {JOJO_PARTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPart(p.id)}
              className={`px-2.5 py-1 text-xs font-manga border border-black whitespace-nowrap transition-colors ${
                selectedPart === p.id
                  ? 'bg-[#ff0077] text-white shadow-[2px_2px_0px_#000]'
                  : 'bg-[#0d071c] text-gray-300 hover:text-white'
              }`}
            >
              Part {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Stand Grid */}
      {filteredStands.length === 0 ? (
        <div className="comic-box bg-[#1b1236] p-12 text-center my-8">
          <div className="font-manga text-3xl text-yellow-400 mb-2">NO STAND DETECTED!</div>
          <p className="text-gray-300 text-sm">No Stand matching your search criteria was found in the archive.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPart('ALL');
              setSelectedAlignment('ALL');
            }}
            className="comic-btn bg-[#ff0077] text-white px-4 py-2 text-sm mt-4 inline-block"
          >
            RESET ALL FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStands.map((stand) => {
            const currentMode = viewModes[stand.id] || 'art';

            return (
              <div
                key={stand.id}
                onClick={() => setActiveStandModal(stand)}
                className="comic-box bg-[#140b2b] hover:bg-[#1b0f38] border-4 border-black p-5 cursor-pointer relative flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-manga text-xs bg-black text-yellow-300 px-2 py-0.5 border border-yellow-400/50">
                      PART {stand.part}
                    </span>
                    <span
                      className={`font-manga text-xs px-2 py-0.5 border border-black ${
                        stand.alignment === 'Joestar'
                          ? 'bg-blue-600 text-white'
                          : stand.alignment === 'Villain'
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {stand.alignment.toUpperCase()}
                    </span>
                  </div>

                  {/* Stand Name & User */}
                  <h3 className="font-manga text-2xl text-white group-hover:text-yellow-400 transition-colors tracking-wide leading-tight">
                    {stand.name}
                  </h3>
                  <div className="font-kanji text-xs text-purple-300 font-bold mb-1">
                    {stand.japanese}
                  </div>
                  <div className="text-xs text-pink-400 font-semibold mb-3 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>User: {stand.user}</span>
                  </div>

                  {/* Visual Showcase (Artwork vs Radar Chart) */}
                  <div className="relative h-56 bg-[#0a0414] border-2 border-black my-3 overflow-hidden flex items-center justify-center group/cardimg">
                    {currentMode === 'art' && (stand.standImage || stand.image) ? (
                      <div className="w-full h-full flex items-center justify-center p-2 relative">
                        {/* Background comic speed lines */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle,rgba(255,215,0,0.4)_1px,transparent_1px)] bg-[size:10px_10px]" />
                        
                        <img
                          src={stand.standImage || stand.image}
                          alt={stand.name}
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_12px_rgba(255,215,0,0.35)] group-hover/cardimg:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />

                        {/* User Inset Portrait */}
                        {stand.image && (
                          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/85 border border-yellow-400/80 px-2 py-1 shadow-md backdrop-blur-xs">
                            <img
                              src={stand.image}
                              alt={stand.user}
                              className="w-7 h-7 rounded-full object-cover border border-white"
                              loading="lazy"
                            />
                            <span className="text-[10px] font-manga text-yellow-300 truncate max-w-[100px]">
                              {stand.user.split(' ')[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 flex items-center justify-center w-full h-full">
                        <StandRadarChart
                          stats={stand.statValues}
                          rawStats={stand.stats}
                          size={180}
                          color={stand.themeColor}
                        />
                      </div>
                    )}

                    {/* Toggle View Mode Button */}
                    <button
                      onClick={(e) => toggleViewMode(stand.id, e)}
                      className="absolute top-2 right-2 bg-black/85 hover:bg-yellow-400 hover:text-black text-gray-300 text-[10px] font-manga px-2 py-1 border border-black flex items-center gap-1 transition-colors shadow-sm"
                      title="Switch between Character Art and Radar Wheel"
                    >
                      {currentMode === 'art' ? (
                        <>
                          <BarChart2 className="w-3 h-3" />
                          <span>STATS</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          <span>ART</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Stat pills summary */}
                  <div className="grid grid-cols-6 gap-1 text-center font-manga text-xs bg-black/60 p-2 border border-purple-900/60 mb-3">
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">PWR</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.power}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">SPD</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.speed}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">RNG</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.range}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">DUR</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.durability}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">PRC</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.precision}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 block font-sans">DEV</span>
                      <span className="text-yellow-400 font-bold">{stand.stats.potential}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 flex items-center gap-1 truncate mb-3">
                    <Music className="w-3 h-3 text-pink-400 shrink-0" />
                    <span className="truncate">Ref: {stand.musicalReference}</span>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handlePlayRealVoice(stand, e)}
                    className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-2.5 py-1 text-xs flex items-center gap-1 font-bold"
                    title="Play authentic character voice clip"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>REAL VOICE</span>
                  </button>

                  <span className="text-xs font-manga text-purple-300 group-hover:text-white flex items-center gap-1">
                    FULL PROFILE →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stand Detailed Modal */}
      {activeStandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="comic-box bg-[#150a2c] border-4 border-black max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-[10px_10px_0px_#ff0077]">
            <button
              onClick={() => setActiveStandModal(null)}
              className="absolute right-4 top-4 bg-red-600 hover:bg-red-500 text-white p-1.5 border-2 border-black shadow-[2px_2px_0px_#000] z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="border-b-4 border-black pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold">
                  PART {activeStandModal.part}
                </span>
                <span className="font-manga text-xs bg-purple-700 text-white px-2 py-0.5 border border-black font-bold">
                  {activeStandModal.type}
                </span>
              </div>
              <h3 className="font-manga text-4xl md:text-5xl text-yellow-400 text-stroke-black">
                {activeStandModal.name}
              </h3>
              <div className="font-kanji text-purple-300 font-bold text-lg">
                {activeStandModal.japanese}
              </div>
              <div className="text-pink-400 font-bold text-sm mt-1">
                Stand Master: {activeStandModal.user}
              </div>
            </div>

            {/* Dual Renders Banner (User + Stand) */}
            <div className="bg-[#0b0416] border-4 border-black p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Stand Art */}
              <div className="relative h-64 flex flex-col items-center justify-center border-2 border-purple-900/60 p-2 bg-gradient-to-b from-purple-950/40 to-black">
                <span className="absolute top-2 left-2 font-manga text-[10px] bg-yellow-400 text-black px-2 py-0.5 border border-black">
                  STAND: {activeStandModal.name}
                </span>
                {activeStandModal.standImage ? (
                  <img
                    src={activeStandModal.standImage}
                    alt={activeStandModal.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                  />
                ) : (
                  <div className="text-gray-400 text-xs font-manga">CANON STAND RENDER</div>
                )}
              </div>

              {/* Character Art */}
              <div className="relative h-64 flex flex-col items-center justify-center border-2 border-purple-900/60 p-2 bg-gradient-to-b from-pink-950/40 to-black">
                <span className="absolute top-2 left-2 font-manga text-[10px] bg-pink-600 text-white px-2 py-0.5 border border-black">
                  MASTER: {activeStandModal.user}
                </span>
                {activeStandModal.image ? (
                  <img
                    src={activeStandModal.image}
                    alt={activeStandModal.user}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,0,119,0.4)]"
                  />
                ) : (
                  <div className="text-gray-400 text-xs font-manga">CANON USER RENDER</div>
                )}
              </div>
            </div>

            {/* Radar & Ability Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-[#0b0518] p-4 border-4 border-black flex flex-col items-center">
                <div className="font-manga text-xs text-yellow-300 tracking-wider mb-2">
                  STAND PARAMETER WHEEL (6-AXIS)
                </div>
                <StandRadarChart
                  stats={activeStandModal.statValues}
                  rawStats={activeStandModal.stats}
                  size={240}
                  color={activeStandModal.themeColor}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-manga text-sm text-yellow-400 tracking-wider">STAND ABILITY:</h4>
                  <p className="text-gray-200 text-xs md:text-sm mt-1 leading-relaxed">
                    {activeStandModal.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-manga text-sm text-pink-400 tracking-wider">SIGNATURE MOVE:</h4>
                  <div className="inline-block bg-[#201040] border-2 border-black px-3 py-1 font-bold text-xs text-yellow-300 mt-1">
                    ⚡ {activeStandModal.signatureMove}
                  </div>
                </div>

                <div>
                  <h4 className="font-manga text-sm text-purple-300 tracking-wider">MUSICAL ORIGIN:</h4>
                  <p className="text-gray-300 text-xs mt-1">
                    🎵 {activeStandModal.musicalReference}
                  </p>
                </div>

                <div className="bg-black/60 p-3 border-2 border-black">
                  <div className="text-[10px] font-manga text-yellow-400 uppercase">STAND CRY & QUOTE</div>
                  <div className="font-manga text-lg text-white">
                    "{activeStandModal.quote || activeStandModal.standCry}"
                  </div>
                </div>

                <button
                  onClick={() => handlePlayRealVoice(activeStandModal)}
                  className="w-full comic-btn bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 text-sm flex items-center justify-center gap-2 font-bold shadow-[4px_4px_0px_#000]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>PLAY REAL CHARACTER VOICE CLIP</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
