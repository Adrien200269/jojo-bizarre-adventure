import React, { useEffect, useState } from 'react';

const ONOMATOPOEIA_LIST = [
  { text: "ゴゴゴゴ", sub: "MENACING...", color: "#a855f7" },
  { text: "ドドドド", sub: "DODODODO!", color: "#ec4899" },
  { text: "ズキューン！", sub: "ZUKYUUUN!", color: "#ef4444" },
  { text: "メメタァ！", sub: "MEMETAAA!", color: "#10b981" },
  { text: "バァァァン！", sub: "BAAAAN!", color: "#f59e0b" },
  { text: "WRYYYY!", sub: "WRYYYY!", color: "#eab308" },
  { text: "オラァ！", sub: "ORAAA!", color: "#38bdf8" },
  { text: "無駄ァ！", sub: "MUDAAA!", color: "#f43f5e" }
];

export default function MangaEffectsOverlay({ isTimeStopped, onTimeStopEnd }) {
  const [particles, setParticles] = useState([]);

  // Listen to global clicks to spawn floating manga kanji
  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger if clicked on an input or button with special prevent class
      if (e.target.closest('input, textarea, select')) return;

      const randomSfx = ONOMATOPOEIA_LIST[Math.floor(Math.random() * ONOMATOPOEIA_LIST.length)];
      const rotation = (Math.random() * 30 - 15).toFixed(1);
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        text: randomSfx.text,
        sub: randomSfx.sub,
        color: randomSfx.color,
        rotation: rotation
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);

      // Remove after animation finishes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {/* Floating Click SFX Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-sfx-float flex flex-col items-center select-none"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`
            }}
          >
            <span
              className="font-kanji font-black text-3xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
              style={{
                color: p.color,
                WebkitTextStroke: '1.5px black'
              }}
            >
              {p.text}
            </span>
            <span className="font-manga text-xs tracking-widest text-black bg-yellow-300 px-1 py-0.5 border border-black font-bold uppercase -mt-1 shadow-[2px_2px_0px_#000]">
              {p.sub}
            </span>
          </div>
        ))}
      </div>

      {/* ZA WARUDO Fullscreen Time-Stop Visual Effect */}
      {isTimeStopped && (
        <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Chromatic Inversion & Negative Pulse Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-invert backdrop-hue-rotate-180 animate-pulse transition-all duration-300" />

          {/* Speed Lines Concentric Burst */}
          <div className="absolute inset-0 speed-lines opacity-40 animate-spin duration-[20s]" />

          {/* Giant Clock Face */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 bg-black/85 border-4 border-yellow-400 shadow-[10px_10px_0px_#ff0055] rounded-xl max-w-md animate-bounce">
            <div className="font-manga text-yellow-400 text-5xl md:text-6xl text-stroke-black animate-pulse">
              ZA WARUDO!
            </div>
            <div className="font-kanji text-white text-2xl font-bold tracking-wider mt-1">
              世界 — 時よ止まれ！
            </div>
            <p className="font-manga text-pink-400 text-lg mt-2 tracking-wide">
              TIME HAS FROZEN FOR 5 SECONDS!
            </p>
            <div className="mt-4 flex items-center gap-2 text-yellow-300 font-mono text-sm bg-yellow-950/80 px-4 py-2 border border-yellow-500 rounded">
              <span className="animate-spin inline-block">⏳</span> 1 second has passed... 2 seconds...
            </div>
          </div>
        </div>
      )}
    </>
  );
}
