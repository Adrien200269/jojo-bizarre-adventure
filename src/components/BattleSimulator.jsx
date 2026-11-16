import React, { useState } from 'react';
import { STANDS_AND_CHARACTERS } from '../data/jojoData.js';
import soundEngine from '../utils/soundEngine.js';
import confetti from 'canvas-confetti';
import { Swords, Play, RotateCcw, MapPin, Zap } from 'lucide-react';

const VENUES = [
  { id: 'cairo', name: 'Cairo Clock Tower (1989)', sub: 'Midnight Time Stop Arena', color: 'from-amber-600 to-purple-900' },
  { id: 'morioh', name: 'Morioh Town Square (1999)', sub: 'Quiet Suburban Battlefield', color: 'from-pink-600 to-blue-900' },
  { id: 'rome', name: 'Rome Colosseum (2001)', sub: 'Ancient Arrow Requiem Ruins', color: 'from-yellow-600 to-red-900' },
  { id: 'cape', name: 'Cape Canaveral (2011)', sub: 'Zero-Gravity Acceleration Platform', color: 'from-cyan-600 to-emerald-900' },
  { id: 'desert', name: 'San Diego Plains (1890)', sub: 'Golden Spin Infinite Horizon', color: 'from-rose-600 to-orange-900' },
];

export default function BattleSimulator({ customStand }) {
  // Combine canon stands with custom stand if present
  const availableFighters = customStand
    ? [customStand, ...STANDS_AND_CHARACTERS]
    : STANDS_AND_CHARACTERS;

  const [fighter1Id, setFighter1Id] = useState(availableFighters[0].id);
  const [fighter2Id, setFighter2Id] = useState(
    availableFighters.length > 1 ? availableFighters[1].id : availableFighters[0].id
  );
  const [selectedVenue, setSelectedVenue] = useState(VENUES[0]);

  // Battle state
  const [isBattling, setIsBattling] = useState(false);
  const [battleLogs, setBattleLogs] = useState([]);
  const [winner, setWinner] = useState(null);
  const [hp1, setHp1] = useState(100);
  const [hp2, setHp2] = useState(100);

  const f1 = availableFighters.find((f) => f.id === fighter1Id) || availableFighters[0];
  const f2 = availableFighters.find((f) => f.id === fighter2Id) || availableFighters[1];

  const handleStartClash = () => {
    if (isBattling) return;

    soundEngine.playStandSummon();
    setIsBattling(true);
    setBattleLogs([]);
    setWinner(null);
    setHp1(100);
    setHp2(100);

    const logs = [];

    // Round 1: Approach & Taunts
    setTimeout(() => {
      soundEngine.speak(f1.quote || f1.standCry, 1.1, 1.0);
      logs.push({
        round: 1,
        title: "APPROACH & INTENT",
        text: `${f1.user} steps forward with [${f1.name}]: "${f1.quote || f1.standCry}"!`,
        sfx: "ゴゴゴゴ"
      });
      setBattleLogs([...logs]);
    }, 600);

    // Round 2: Clash of Destructive Power
    setTimeout(() => {
      soundEngine.playOraRush();
      const pwr1 = f1.statValues?.power || 80;
      const pwr2 = f2.statValues?.power || 80;
      const damageTo2 = Math.min(45, Math.floor(pwr1 * 0.4));
      const damageTo1 = Math.min(40, Math.floor(pwr2 * 0.35));

      setHp1(100 - damageTo1);
      setHp2(100 - damageTo2);

      logs.push({
        round: 2,
        title: "STAND RUSH BARRAGE",
        text: `Furious fist barrage! [${f1.name}] unleashes 『${f1.standCry}』 clashing against [${f2.name}]'s defense!`,
        sfx: "ドドドド"
      });
      setBattleLogs([...logs]);
    }, 2200);

    // Round 3: Special Ability Trigger
    setTimeout(() => {
      soundEngine.playPunchImpact(300);
      logs.push({
        round: 3,
        title: "SIGNATURE TECHNIQUE ACTIVATION",
        text: `At ${selectedVenue.name}, [${f1.name}] activates [${f1.signatureMove}] while [${f2.name}] counters with [${f2.signatureMove}]! Shockwaves tear through the terrain!`,
        sfx: "バァァァン！"
      });
      setBattleLogs([...logs]);
    }, 4200);

    // Round 4: Decisive Climax & Victory
    setTimeout(() => {
      // Calculate winner based on composite stats + slight RNG
      const score1 = (f1.statValues?.power || 80) + (f1.statValues?.speed || 80) + Math.random() * 25;
      const score2 = (f2.statValues?.power || 80) + (f2.statValues?.speed || 80) + Math.random() * 25;

      const victor = score1 >= score2 ? f1 : f2;
      const loser = victor.id === f1.id ? f2 : f1;

      if (victor.id === f1.id) {
        setHp2(0);
      } else {
        setHp1(0);
      }

      setWinner(victor);
      setIsBattling(false);

      logs.push({
        round: 4,
        title: "DECISIVE RETIRED!",
        text: `With an earth-shattering blow, [${victor.name}] strikes down [${loser.name}]! ${loser.user} is RETIRED!`,
        sfx: "K.O. !!"
      });
      setBattleLogs([...logs]);

      soundEngine.playRoundaboutBass();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 6200);
  };

  const handleReset = () => {
    setIsBattling(false);
    setBattleLogs([]);
    setWinner(null);
    setHp1(100);
    setHp2(100);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-400 text-black font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            SIMULATED STAND COMBAT
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
            STAND BATTLE ARENA
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Match up any two Stands (including your custom creations), pick a venue, and witness an anime-style tactical clash!
          </p>
        </div>

        {winner && (
          <button
            onClick={handleReset}
            className="comic-btn bg-yellow-400 text-black px-4 py-2 text-xs font-bold flex items-center gap-1.5 self-start md:self-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET ARENA</span>
          </button>
        )}
      </div>

      {/* Arena Stage & Fighter Pickers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
        {/* Fighter 1 Card */}
        <div className="lg:col-span-5 comic-box bg-[#1b0e36] border-4 border-black p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold">
                FIGHTER 1 (RED CORNER)
              </span>
              <span className="font-mono text-xs text-yellow-300 font-bold">HP: {hp1}%</span>
            </div>

            {/* Health Bar */}
            <div className="w-full bg-black/80 h-3 border border-black mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 to-yellow-400 h-full transition-all duration-500"
                style={{ width: `${hp1}%` }}
              />
            </div>

            {/* Select dropdown */}
            <select
              value={fighter1Id}
              disabled={isBattling}
              onChange={(e) => setFighter1Id(e.target.value)}
              className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm font-semibold focus:outline-none focus:border-yellow-400 mb-4"
            >
              {availableFighters.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id.startsWith('custom') ? '★ [CUSTOM] ' : ''}{f.name} ({f.user})
                </option>
              ))}
            </select>

            <h3 className="font-manga text-3xl text-white drop-shadow-[2px_2px_0px_#000]">
              {f1.name}
            </h3>
            <div className="text-xs text-pink-400 font-semibold mb-3">
              Master: {f1.user}
            </div>

            <div className="bg-[#0b0517] p-3 border border-purple-900/60 text-xs text-gray-300 space-y-1">
              <div><strong className="text-yellow-400 font-manga">TYPE:</strong> {f1.type}</div>
              <div><strong className="text-pink-400 font-manga">FINISHER:</strong> {f1.signatureMove}</div>
              <div><strong className="text-purple-300 font-manga">CRY:</strong> 『{f1.standCry}』</div>
            </div>
          </div>
        </div>

        {/* VS Center Pillar & Venue */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 space-y-3">
          <div className="font-manga text-6xl text-yellow-400 text-stroke-thick drop-shadow-[4px_4px_0px_#ff0077] animate-pulse">
            VS
          </div>

          {/* Venue selector */}
          <div className="w-full text-center">
            <span className="text-[10px] font-manga text-yellow-300 block mb-1">
              <MapPin className="w-3 h-3 inline mr-1" />
              VENUE:
            </span>
            <select
              value={selectedVenue.id}
              disabled={isBattling}
              onChange={(e) => {
                const found = VENUES.find(v => v.id === e.target.value);
                if (found) setSelectedVenue(found);
              }}
              className="w-full bg-[#150d2c] border-2 border-black text-white text-xs px-2 py-1.5 font-bold"
            >
              {VENUES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartClash}
            disabled={isBattling}
            className={`w-full comic-btn py-3 text-sm md:text-base font-bold flex items-center justify-center gap-2 ${
              isBattling
                ? 'bg-gray-700 text-gray-400 cursor-wait'
                : 'bg-[#ff0077] hover:bg-[#ff1a8c] text-white shadow-[4px_4px_0px_#000]'
            }`}
          >
            <Swords className={`w-5 h-5 ${isBattling ? 'animate-spin' : ''}`} />
            <span>{isBattling ? 'CLASHING...' : 'INITIATE CLASH!'}</span>
          </button>
        </div>

        {/* Fighter 2 Card */}
        <div className="lg:col-span-5 comic-box bg-[#1b0e36] border-4 border-black p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-manga text-xs bg-cyan-400 text-black px-2 py-0.5 border border-black font-bold">
                FIGHTER 2 (BLUE CORNER)
              </span>
              <span className="font-mono text-xs text-cyan-300 font-bold">HP: {hp2}%</span>
            </div>

            {/* Health Bar */}
            <div className="w-full bg-black/80 h-3 border border-black mb-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full transition-all duration-500"
                style={{ width: `${hp2}%` }}
              />
            </div>

            {/* Select dropdown */}
            <select
              value={fighter2Id}
              disabled={isBattling}
              onChange={(e) => setFighter2Id(e.target.value)}
              className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm font-semibold focus:outline-none focus:border-cyan-400 mb-4"
            >
              {availableFighters.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id.startsWith('custom') ? '★ [CUSTOM] ' : ''}{f.name} ({f.user})
                </option>
              ))}
            </select>

            <h3 className="font-manga text-3xl text-white drop-shadow-[2px_2px_0px_#000]">
              {f2.name}
            </h3>
            <div className="text-xs text-cyan-300 font-semibold mb-3">
              Master: {f2.user}
            </div>

            <div className="bg-[#0b0517] p-3 border border-purple-900/60 text-xs text-gray-300 space-y-1">
              <div><strong className="text-yellow-400 font-manga">TYPE:</strong> {f2.type}</div>
              <div><strong className="text-pink-400 font-manga">FINISHER:</strong> {f2.signatureMove}</div>
              <div><strong className="text-purple-300 font-manga">CRY:</strong> 『{f2.standCry}』</div>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Combat Log / Feed */}
      <div className="comic-box bg-[#0d071b] border-4 border-black p-6">
        <div className="flex items-center justify-between border-b-2 border-purple-900/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
            <h3 className="font-manga text-2xl text-yellow-400 tracking-wide">
              STAND TACTICAL COMBAT FEED
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-400">
            {isBattling ? 'SIMULATION IN PROGRESS...' : winner ? 'MATCH CONCLUDED' : 'STANDBY'}
          </span>
        </div>

        {battleLogs.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            Select two combatants and press <strong className="text-yellow-400">"INITIATE CLASH!"</strong> to begin the battle simulation.
          </div>
        ) : (
          <div className="space-y-4">
            {battleLogs.map((log, index) => (
              <div
                key={index}
                className="bg-[#170e2d] border-2 border-black p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold">
                      ROUND {log.round}
                    </span>
                    <span className="font-manga text-sm text-pink-400 tracking-wide">
                      {log.title}
                    </span>
                  </div>
                  <p className="text-gray-200 text-xs md:text-sm font-medium">
                    {log.text}
                  </p>
                </div>
                <div className="font-kanji text-xl md:text-2xl font-black text-yellow-300 shrink-0 select-none">
                  {log.sfx}
                </div>
              </div>
            ))}

            {/* Victor Card */}
            {winner && (
              <div className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black border-4 border-black p-6 shadow-[6px_6px_0px_#ff0077] text-center space-y-2 mt-6">
                <div className="font-manga text-sm font-bold tracking-widest uppercase">
                  🏆 MATCH DECISION & VICTORY 🏆
                </div>
                <div className="font-manga text-4xl md:text-5xl tracking-wide">
                  WINNER: [{winner.name}]!
                </div>
                <div className="text-sm font-bold">
                  Stand Master: {winner.user}
                </div>
                <p className="text-xs font-semibold italic pt-2">
                  "{winner.quote || winner.standCry}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
