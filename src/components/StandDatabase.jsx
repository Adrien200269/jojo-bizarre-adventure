import React, { useState } from 'react';
import { STANDS_AND_CHARACTERS, JOJO_PARTS } from '../data/jojoData.js';
import StandRadarChart from './StandRadarChart.jsx';
import soundEngine from '../utils/soundEngine.js';
import { Search, Filter, Volume2, Shield, Sparkles, X, Music, UserCheck } from 'lucide-react';

export default function StandDatabase({ selectedPart, setSelectedPart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedAlignment, setSelectedAlignment] = useState('ALL');
  const [activeStandModal, setActiveStandModal] = useState(null);

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

  const handlePlayCry = (stand, e) => {
    if (e) e.stopPropagation();
    soundEngine.playStandSummon();
    if (stand.id === 'star-platinum') {
      soundEngine.playOraRush();
    } else if (stand.id === 'the-world') {
      soundEngine.playMudaRush();
    } else if (stand.id === 'killer-queen') {
      soundEngine.playPunchImpact(300);
      soundEngine.speak("Kira Yoshikage. Click!", 1.1, 0.9);
    } else {
      soundEngine.speak(stand.standCry || stand.quote, 1.1, 1.0);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            STAND ARCHIVE & STAT ENCYCLOPEDIA
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            STAND DATABASE & RADAR CHARTS
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Browse official canon Stands, analyze the 6-axis stat wheels, and explore musical inspirations across all 9 parts.
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
              placeholder="Search Stand, User (e.g. Jotaro, Kira, D4C)..."
              className="w-full bg-[#0d071c] border-2 border-black text-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Part Filter */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs font-manga text-yellow-400 shrink-0">PART:</span>
            <select
              value={selectedPart}
              onChange={(e) => setSelectedPart(e.target.value)}
              className="w-full bg-[#0d071c] border-2 border-black text-white px-2 py-2 text-xs font-semibold focus:outline-none focus:border-yellow-400"
            >
              <option value="ALL">All Parts (1 - 9)</option>
              {JOJO_PARTS.map((p) => (
                <option key={p.id} value={p.id}>
                  Part {p.id}: {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Alignment Filter */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-xs font-manga text-pink-400 shrink-0">SIDE:</span>
            <select
              value={selectedAlignment}
              onChange={(e) => setSelectedAlignment(e.target.value)}
              className="w-full bg-[#0d071c] border-2 border-black text-white px-2 py-2 text-xs font-semibold focus:outline-none focus:border-pink-500"
            >
              <option value="ALL">All Alignments</option>
              <option value="Joestar">Joestar Lineage</option>
              <option value="Ally">Allies & Jobros</option>
              <option value="Villain">Antagonists & Villains</option>
            </select>
          </div>
        </div>

        {/* Quick Part Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-purple-900/60">
          <button
            onClick={() => setSelectedPart('ALL')}
            className={`px-2.5 py-1 text-xs font-manga border border-black ${
              selectedPart === 'ALL' ? 'bg-yellow-400 text-black' : 'bg-[#0d071c] text-gray-300 hover:text-white'
            }`}
          >
            ALL PARTS
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
          {filteredStands.map((stand) => (
            <div
              key={stand.id}
              onClick={() => setActiveStandModal(stand)}
              className="comic-box bg-[#140b2b] hover:bg-[#1b0f38] border-4 border-black p-5 cursor-pointer relative flex flex-col justify-between group transition-all"
            >
              {/* Top Bar / Part Badge & Alignment */}
              <div>
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

                {/* Stand & User Titles */}
                <h3 className="font-manga text-2xl text-white group-hover:text-yellow-400 transition-colors tracking-wide leading-tight">
                  {stand.name}
                </h3>
                <div className="font-kanji text-xs text-purple-300 font-bold mb-1">
                  {stand.japanese}
                </div>
                <div className="text-xs text-pink-400 font-semibold mb-3 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>User: {stand.user}</span>
                </div>

                {/* Mini Radar Chart */}
                <div className="bg-[#0b0517] p-2 border-2 border-black my-3 flex items-center justify-center">
                  <StandRadarChart
                    stats={stand.statValues}
                    rawStats={stand.stats}
                    size={200}
                    color={stand.themeColor}
                  />
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

                {/* Music Reference */}
                <div className="text-[11px] text-gray-400 flex items-center gap-1 truncate mb-3">
                  <Music className="w-3 h-3 text-pink-400 shrink-0" />
                  <span className="truncate">Ref: {stand.musicalReference}</span>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
                <button
                  onClick={(e) => handlePlayCry(stand, e)}
                  className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-2.5 py-1 text-xs flex items-center gap-1 font-bold"
                  title="Play Stand cry"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>STAND CRY</span>
                </button>

                <span className="text-xs font-manga text-purple-300 group-hover:text-white flex items-center gap-1">
                  FULL PROFILE →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stand Detailed Modal */}
      {activeStandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="comic-box bg-[#150a2c] border-4 border-black max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-[10px_10px_0px_#ff0077]">
            {/* Close Button */}
            <button
              onClick={() => setActiveStandModal(null)}
              className="absolute right-4 top-4 bg-red-600 hover:bg-red-500 text-white p-1.5 border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b-4 border-black pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black">
                  PART {activeStandModal.part}
                </span>
                <span className="font-manga text-xs bg-purple-700 text-white px-2 py-0.5 border border-black">
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

            {/* Modal Grid: Radar Chart & Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Radar Chart */}
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

              {/* Bio & Details */}
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
                  <h4 className="font-manga text-sm text-purple-300 tracking-wider">MUSICAL & TAROT ORIGIN:</h4>
                  <p className="text-gray-300 text-xs mt-1">
                    🎵 {activeStandModal.musicalReference}
                  </p>
                  {activeStandModal.tarot !== 'None' && (
                    <p className="text-gray-300 text-xs">
                      🃏 Tarot Card: {activeStandModal.tarot}
                    </p>
                  )}
                </div>

                <div className="bg-black/60 p-3 border-2 border-black">
                  <div className="text-[10px] font-manga text-yellow-400 uppercase">ICONIC QUOTE</div>
                  <div className="font-manga text-lg text-white">
                    "{activeQuoteForModal(activeStandModal)}"
                  </div>
                </div>

                <button
                  onClick={() => handlePlayCry(activeStandModal)}
                  className="w-full comic-btn bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 text-sm flex items-center justify-center gap-2 font-bold shadow-[4px_4px_0px_#000]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>PLAY STAND CRY & QUOTE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function activeQuoteForModal(stand) {
  return stand.quote || stand.standCry;
}
