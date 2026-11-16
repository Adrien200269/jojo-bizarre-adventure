import React, { useState } from 'react';
import { FAMILY_TREE_DATA } from '../data/familyTreeData.js';
import soundEngine from '../utils/soundEngine.js';
import { Users, GitFork, Shield, Sparkles, X, ChevronRight } from 'lucide-react';

export default function FamilyTree() {
  const [universe, setUniverse] = useState('original'); // 'original' | 'sbr'
  const [selectedMember, setSelectedMember] = useState(null);

  const members = FAMILY_TREE_DATA[universe] || [];

  // Group by generation
  const generations = members.reduce((acc, member) => {
    const gen = member.generation || 1;
    if (!acc[gen]) acc[gen] = [];
    acc[gen].push(member);
    return acc;
  }, {});

  const handleSelectMember = (member) => {
    soundEngine.playStandSummon();
    setSelectedMember(member);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            JOESTAR GENEALOGY & BLOODLINE
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            THE JOESTAR FAMILY TREE
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Explore the star-marked bloodline across the original universe and the alternate Steel Ball Run continuity.
          </p>
        </div>

        {/* Universe Switcher Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playStandSummon();
              setUniverse('original');
            }}
            className={`comic-btn px-4 py-2 text-xs md:text-sm font-bold flex items-center gap-2 ${
              universe === 'original'
                ? 'bg-[#ff0077] text-white shadow-[3px_3px_0px_#000]'
                : 'bg-[#150d2c] text-gray-300'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>ORIGINAL UNIVERSE (PARTS 1-6)</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playStandSummon();
              setUniverse('sbr');
            }}
            className={`comic-btn px-4 py-2 text-xs md:text-sm font-bold flex items-center gap-2 ${
              universe === 'sbr'
                ? 'bg-yellow-400 text-black shadow-[3px_3px_0px_#000]'
                : 'bg-[#150d2c] text-gray-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>SBR MULTIVERSE (PARTS 7-9)</span>
          </button>
        </div>
      </div>

      {/* Universe Description Banner */}
      <div className="comic-box bg-[#160e2f] p-4 mb-8 border-2 border-purple-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center font-manga text-xl text-black">
            ★
          </div>
          <div>
            <div className="font-manga text-yellow-400 text-base">
              {universe === 'original'
                ? 'ORIGINAL TIMELINE: FROM JONATHAN TO JOLYNE'
                : 'STEEL BALL RUN TIMELINE: FROM JOHNNY TO JODIO'}
            </div>
            <div className="text-xs text-gray-300">
              {universe === 'original'
                ? 'Spans 1880 Victorian England to 2011 Florida, united by the star birthmark and Hamon / Stand destiny.'
                : 'Begins with the 1890 trans-American horse race, the Golden Spin, and the Morioh Wall Eyes.'}
            </div>
          </div>
        </div>
      </div>

      {/* Generation Rows */}
      <div className="space-y-8 relative">
        {/* Subtle connecting vertical line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-purple-900/40 -translate-x-1/2 pointer-events-none" />

        {Object.keys(generations).map((genKey) => (
          <div key={genKey} className="relative z-10">
            {/* Gen Header Label */}
            <div className="flex items-center justify-center mb-4">
              <span className="font-manga text-xs bg-yellow-400 text-black px-4 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                ★ GENERATION {genKey} ★
              </span>
            </div>

            {/* Members in Generation */}
            <div className="flex flex-wrap justify-center gap-4">
              {generations[genKey].map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleSelectMember(member)}
                  className="comic-box bg-[#1b1038] hover:bg-[#25154d] border-3 border-black p-4 w-full sm:w-64 cursor-pointer relative group transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-manga text-[10px] bg-purple-950 text-yellow-300 px-2 py-0.5 border border-purple-700">
                      {member.badge}
                    </span>
                    <span className="text-yellow-400 font-manga text-xs">★</span>
                  </div>

                  <h3 className="font-manga text-xl text-white group-hover:text-yellow-400 transition-colors">
                    {member.name}
                  </h3>
                  <div className="font-kanji text-xs text-purple-300 font-bold mb-1">
                    {member.japanese}
                  </div>

                  <div className="text-xs text-pink-400 font-medium mb-2">
                    {member.role}
                  </div>

                  {member.stand && (
                    <div className="bg-[#0b0518] px-2 py-1 text-[11px] font-mono text-cyan-300 border border-cyan-800/60 mb-2 truncate">
                      ⚡ Stand: {member.stand}
                    </div>
                  )}

                  <div className="text-[11px] text-gray-400 border-t border-purple-900/60 pt-2 flex items-center justify-between">
                    <span>{member.part.split(':')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Member Drawer / Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="comic-box bg-[#150a2c] border-4 border-black max-w-md w-full p-6 relative shadow-[10px_10px_0px_#ffd700]">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute right-4 top-4 bg-red-600 hover:bg-red-500 text-white p-1.5 border-2 border-black"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold">
                {selectedMember.badge}
              </span>
              <span className="text-xs text-gray-400">{selectedMember.part}</span>
            </div>

            <h3 className="font-manga text-3xl text-yellow-400 text-stroke-black">
              {selectedMember.name}
            </h3>
            <div className="font-kanji text-purple-300 font-bold mb-3">
              {selectedMember.japanese}
            </div>

            <div className="space-y-3 border-t-2 border-purple-900/80 pt-3">
              <div>
                <span className="text-xs font-manga text-pink-400 block">ROLE & TITLE:</span>
                <span className="text-white text-sm font-semibold">{selectedMember.role}</span>
              </div>

              {selectedMember.stand && (
                <div>
                  <span className="text-xs font-manga text-cyan-400 block">AWAKENED STAND:</span>
                  <span className="text-cyan-300 text-sm font-mono font-bold">
                    ⚡ {selectedMember.stand}
                  </span>
                </div>
              )}

              {selectedMember.spouse && (
                <div>
                  <span className="text-xs font-manga text-yellow-400 block">PARTNER / SPOUSE:</span>
                  <span className="text-gray-200 text-xs">{selectedMember.spouse}</span>
                </div>
              )}

              {selectedMember.parent && (
                <div>
                  <span className="text-xs font-manga text-yellow-400 block">PARENTS / CONCEPTION:</span>
                  <span className="text-gray-200 text-xs">{selectedMember.parent}</span>
                </div>
              )}

              <div>
                <span className="text-xs font-manga text-gray-400 block">BIOGRAPHY:</span>
                <p className="text-gray-200 text-xs leading-relaxed mt-1">
                  {selectedMember.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playStandSummon();
                soundEngine.speak(selectedMember.name, 1.0, 1.0);
              }}
              className="w-full comic-btn bg-purple-600 hover:bg-purple-500 text-white py-2 text-xs font-bold mt-4"
            >
              PRONOUNCE NAME
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
