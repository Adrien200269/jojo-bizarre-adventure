import React, { useState } from 'react';
import StandRadarChart from './StandRadarChart.jsx';
import soundEngine from '../utils/soundEngine.js';
import confetti from 'canvas-confetti';
import { Sparkles, Volume2, Swords, Copy, Check, Dice5 } from 'lucide-react';

const RANDOM_NAMES = [
  "Star Dust", "Velvet Underground", "Radiohead", "Black Sabbath",
  "Daft Punk", "Iron Maiden", "Judas Priest", "Pink Floyd",
  "Electric Feel", "Stairway to Heaven", "Master of Puppets", "Blue Oyster"
];

const PRESET_CRIES = [
  "ORA ORA ORA ORA ORA!",
  "MUDA MUDA MUDA MUDA!",
  "ARI ARI ARI ARI ARIVEDERCI!",
  "DORA RA RA RA RA RA!",
  "VOLA VOLA VOLA VOLARE VIA!",
  "SHIBO BO BO BO BO!",
  "UBASHAAAAA!"
];

const AURA_COLORS = [
  { name: "Neon Magenta", hex: "#ec4899" },
  { name: "Joestar Purple", hex: "#8b5cf6" },
  { name: "Golden Aura", hex: "#eab308" },
  { name: "Emerald Splash", hex: "#10b981" },
  { name: "Cyber Cyan", hex: "#06b6d4" },
  { name: "Crimson Red", hex: "#ef4444" },
];

export default function StandCreator({ customStand, setCustomStand, setActiveTab }) {
  const [standName, setStandName] = useState(customStand?.name || "Velvet Underground");
  const [masterName, setMasterName] = useState(customStand?.user || "You (Stand Master)");
  const [standCry, setStandCry] = useState(customStand?.standCry || "ORA ORA ORA ORA ORA!");
  const [standType, setStandType] = useState(customStand?.type || "Close-Range Spatial");
  const [description, setDescription] = useState(
    customStand?.description || "Can manipulate gravitational frequencies within a 5-meter radius, turning kinetic impacts into vibrating sound waves."
  );
  const [auraColor, setAuraColor] = useState(customStand?.themeColor || "#ec4899");
  const [copied, setCopied] = useState(false);

  // Stats from 20 to 100
  const [stats, setStats] = useState(
    customStand?.statValues || {
      power: 88,
      speed: 92,
      range: 45,
      durability: 75,
      precision: 85,
      potential: 90
    }
  );

  const valueToRank = (val) => {
    if (val >= 88) return 'A';
    if (val >= 70) return 'B';
    if (val >= 50) return 'C';
    if (val >= 35) return 'D';
    return 'E';
  };

  const handleStatChange = (key, val) => {
    setStats((prev) => ({ ...prev, [key]: Number(val) }));
  };

  const handleRandomize = () => {
    const randomName = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    const randomCry = PRESET_CRIES[Math.floor(Math.random() * PRESET_CRIES.length)];
    const randomColor = AURA_COLORS[Math.floor(Math.random() * AURA_COLORS.length)].hex;
    const randomStats = {
      power: Math.floor(Math.random() * 70) + 30,
      speed: Math.floor(Math.random() * 70) + 30,
      range: Math.floor(Math.random() * 70) + 30,
      durability: Math.floor(Math.random() * 70) + 30,
      precision: Math.floor(Math.random() * 70) + 30,
      potential: Math.floor(Math.random() * 70) + 30,
    };

    setStandName(randomName);
    setStandCry(randomCry);
    setAuraColor(randomColor);
    setStats(randomStats);
    soundEngine.playStandSummon();
  };

  const handleSaveAndTest = () => {
    const standData = {
      id: "custom-stand-user",
      name: standName || "Custom Stand",
      japanese: "オリジナル・スタンド",
      user: masterName || "Custom Master",
      part: 9,
      type: standType,
      tarot: "Custom Major Arcana",
      musicalReference: standName,
      standCry: standCry,
      quote: `My Stand [${standName}] knows no equal!`,
      description: description,
      signatureMove: "Custom Stand Finisher",
      stats: {
        power: valueToRank(stats.power),
        speed: valueToRank(stats.speed),
        range: valueToRank(stats.range),
        durability: valueToRank(stats.durability),
        precision: valueToRank(stats.precision),
        potential: valueToRank(stats.potential)
      },
      statValues: stats,
      themeColor: auraColor,
      accentColor: "#ffffff",
      alignment: "Joestar"
    };

    setCustomStand(standData);
    soundEngine.playOraRush();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActiveTab('battle-arena');
  };

  const handlePlayCustomCry = () => {
    soundEngine.playPunchImpact(260);
    soundEngine.speak(standCry, 1.2, 1.1);
  };

  const handleCopyCard = () => {
    const text = `★ JOJO CUSTOM STAND CARD ★\nName: ${standName}\nStand Master: ${masterName}\nType: ${standType}\nStand Cry: "${standCry}"\nStats: PWR: ${valueToRank(stats.power)} | SPD: ${valueToRank(stats.speed)} | RNG: ${valueToRank(stats.range)} | DUR: ${valueToRank(stats.durability)} | PRC: ${valueToRank(stats.precision)} | DEV: ${valueToRank(stats.potential)}\nAbility: ${description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b-4 border-black pb-4">
        <div>
          <div className="inline-block bg-[#ff0077] text-white font-manga px-3 py-0.5 text-xs border-2 border-black mb-1">
            STAND FORGE & PARAMETER LAB
          </div>
          <h2 className="text-3xl md:text-5xl font-manga text-yellow-400 text-stroke-black tracking-wide">
            DESIGN YOUR PERSONAL STAND
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Craft your own musical-named Stand, tune the 6-axis radar wheel, assign your Stand cry, and send it into battle!
          </p>
        </div>

        <button
          onClick={handleRandomize}
          className="comic-btn bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 text-sm flex items-center gap-2 self-start md:self-auto"
        >
          <Dice5 className="w-4 h-4 text-yellow-300" />
          <span>RANDOMIZE STAND</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Form Controls */}
        <div className="lg:col-span-7 space-y-6 comic-box bg-[#150d2c] p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-manga text-xs text-yellow-400 mb-1">
                STAND NAME (MUSICAL / BAND INSPIRATION)
              </label>
              <input
                type="text"
                value={standName}
                onChange={(e) => setStandName(e.target.value)}
                placeholder="e.g. Bohemian Rhapsody, Daft Punk"
                className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 font-semibold"
              />
            </div>

            <div>
              <label className="block font-manga text-xs text-pink-400 mb-1">
                STAND MASTER (YOUR NAME / ALIAS)
              </label>
              <input
                type="text"
                value={masterName}
                onChange={(e) => setMasterName(e.target.value)}
                placeholder="e.g. Jotaro Kujo, Your Name"
                className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm focus:outline-none focus:border-pink-500 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-manga text-xs text-yellow-400 mb-1">
                STAND CRY
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={standCry}
                  onChange={(e) => setStandCry(e.target.value)}
                  placeholder="e.g. ORA ORA! or ARI ARI!"
                  className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 font-bold"
                />
                <button
                  onClick={handlePlayCustomCry}
                  className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1 flex items-center justify-center shrink-0"
                  title="Test battle cry audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block font-manga text-xs text-purple-300 mb-1">
                STAND ABILITY ARCHETYPE
              </label>
              <select
                value={standType}
                onChange={(e) => setStandType(e.target.value)}
                className="w-full bg-[#0b0517] border-2 border-black text-white px-3 py-2 text-sm focus:outline-none focus:border-purple-400 font-semibold"
              >
                <option value="Close-Range Power">Close-Range Power (High Destructive Force)</option>
                <option value="Time / Spatial Manipulation">Time / Spatial Manipulation</option>
                <option value="Long-Distance Automatic">Long-Distance Automatic</option>
                <option value="Colony / Swarm Stand">Colony / Swarm Stand</option>
                <option value="Elemental / Weather Hazard">Elemental / Weather Hazard</option>
                <option value="Subconscious / Psychological">Subconscious / Psychological</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-manga text-xs text-gray-300 mb-1">
              STAND ABILITY DESCRIPTION & MECHANICS
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how your Stand's power works, its limitations, and conditions..."
              className="w-full bg-[#0b0517] border-2 border-black text-white p-3 text-xs md:text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Aura Color Choice */}
          <div>
            <label className="block font-manga text-xs text-yellow-400 mb-2">
              AURA THEME COLOR
            </label>
            <div className="flex flex-wrap items-center gap-3">
              {AURA_COLORS.map((col) => (
                <button
                  key={col.hex}
                  onClick={() => setAuraColor(col.hex)}
                  className={`w-9 h-9 rounded-full border-3 transition-transform ${
                    auraColor === col.hex ? 'border-white scale-125 shadow-[0_0_10px_white]' : 'border-black hover:scale-110'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* 6-Axis Stat Sliders */}
          <div className="pt-4 border-t-2 border-purple-900/60 space-y-3">
            <div className="font-manga text-sm text-yellow-400 flex items-center justify-between">
              <span>STAND STAT ALLOCATION (A to E)</span>
              <span className="text-xs text-gray-400 font-sans">A=95+ • B=75 • C=55 • D=35 • E=20</span>
            </div>

            {Object.entries(stats).map(([statKey, statVal]) => (
              <div key={statKey} className="flex items-center gap-3">
                <span className="w-24 font-manga text-xs text-gray-300 uppercase">
                  {statKey}:
                </span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={statVal}
                  onChange={(e) => handleStatChange(statKey, e.target.value)}
                  className="flex-1 accent-[#ff0077] cursor-pointer"
                />
                <span className="w-8 text-center font-manga text-lg text-yellow-400 font-bold">
                  {valueToRank(statVal)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Stand Card Preview with Radar Chart */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div
            className="comic-box bg-[#1b0d36] border-4 border-black p-6 relative overflow-hidden shadow-[8px_8px_0px_#000]"
            style={{ borderColor: auraColor }}
          >
            {/* Araki Kanji Stamp Watermark */}
            <div className="absolute right-2 top-2 font-kanji text-7xl font-black text-white/5 pointer-events-none select-none">
              幽波紋
            </div>

            <div className="flex items-center justify-between border-b-2 border-black/80 pb-3 mb-4">
              <span className="font-manga text-xs bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold">
                STAND CARD (NEW)
              </span>
              <span className="font-manga text-xs text-purple-300">
                {standType}
              </span>
            </div>

            <h3 className="font-manga text-3xl md:text-4xl text-white text-stroke-black drop-shadow-[2px_2px_0px_#000]">
              {standName || "UNNAMED STAND"}
            </h3>
            <div className="text-pink-400 font-bold text-xs mb-4">
              Master: {masterName || "Unknown Master"}
            </div>

            {/* Radar Chart Display */}
            <div className="bg-[#0b0518] p-4 border-4 border-black my-4 flex justify-center">
              <StandRadarChart
                stats={stats}
                size={230}
                color={auraColor}
              />
            </div>

            {/* Stat Pills */}
            <div className="grid grid-cols-6 gap-1 text-center font-manga text-xs bg-black/70 p-2 border border-black mb-4">
              {Object.entries(stats).map(([k, v]) => (
                <div key={k}>
                  <div className="text-[8px] text-gray-400 uppercase font-sans">{k.slice(0, 3)}</div>
                  <div className="text-yellow-400 font-bold">{valueToRank(v)}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-300 bg-black/50 p-3 border border-purple-900/60 mb-4 line-clamp-3">
              "{description}"
            </div>

            <div className="font-manga text-sm text-yellow-300 text-center mb-4">
              『 {standCry} 』
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t-2 border-black">
              <button
                onClick={handleSaveAndTest}
                className="w-full comic-btn bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 text-sm flex items-center justify-center gap-2 font-bold shadow-[4px_4px_0px_#000]"
              >
                <Swords className="w-4 h-4" />
                <span>SAVE & DEPLOY TO BATTLE ARENA!</span>
              </button>

              <button
                onClick={handleCopyCard}
                className="w-full comic-btn bg-purple-700 hover:bg-purple-600 text-white py-2 text-xs flex items-center justify-center gap-2 font-bold"
              >
                {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "COPIED STAND STATS!" : "COPY STAND CARD SUMMARY"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
