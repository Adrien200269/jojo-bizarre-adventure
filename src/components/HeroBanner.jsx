import React, { useState, useEffect } from 'react';
import { FAMOUS_QUOTES, JOJO_PARTS } from '../data/jojoData.js';
import soundEngine from '../utils/soundEngine.js';
import { Play, Sparkles, Swords, Volume2, ArrowRight } from 'lucide-react';

export default function HeroBanner({ setActiveTab, onSelectPart }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FAMOUS_QUOTES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeQuote = FAMOUS_QUOTES[quoteIndex];

  const handlePlayQuoteAudio = (quote) => {
    const text = quote.quote.toLowerCase();
    if (text.includes('yare yare')) {
      soundEngine.playYareYareDaze();
    } else if (text.includes('wryyy')) {
      soundEngine.playDioWryyy();
    } else if (text.includes('dio da')) {
      soundEngine.playDioApproach();
    } else if (text.includes('nigerundayo')) {
      soundEngine.playNigerundayo();
    } else if (text.includes('giorno')) {
      soundEngine.playGiornoDream();
    } else if (text.includes('arrivederci')) {
      soundEngine.playArrivederci();
    } else if (text.includes('lesson 5') || text.includes('gyro')) {
      soundEngine.playTuskOra();
    } else {
      soundEngine.playStandSummon();
      soundEngine.speak(quote.quote, 1.0, 0.9);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1b0c36] via-[#120726] to-[#0b0714] border-b-4 border-black manga-dots py-10 md:py-14 px-4">
      {/* Background Japanese SFX Watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-kanji text-[120px] md:text-[200px] font-black text-purple-600/10 pointer-events-none select-none">
        ゴゴゴゴ
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Title & Intro */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 font-manga text-sm border-2 border-black shadow-[3px_3px_0px_#000]">
            <Sparkles className="w-4 h-4" />
            <span>ORIGINAL JAPANESE ANIME VOICE ARCHIVE INTEGRATED</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-manga tracking-wide leading-none text-white">
            <span className="block text-stroke-thick text-yellow-400 drop-shadow-[5px_5px_0px_#ff0077]">
              JOJO'S BIZARRE
            </span>
            <span className="block text-stroke-thick text-[#ff0077] drop-shadow-[5px_5px_0px_#ffd700]">
              ADVENTURE
            </span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base max-w-xl font-medium leading-relaxed">
            Welcome to the definitive interactive archive of Hirohiko Araki’s legendary masterpiece. 
            Now featuring <strong className="text-yellow-400">authentic anime voice lines</strong> from Daisuke Ono, Takehito Koyasu, Kensho Ono, Fairouz Ai, and Tomokazu Sugita!
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundEngine.playOraRush();
                setActiveTab('creator');
              }}
              className="comic-btn bg-[#ff0077] hover:bg-[#ff1a8c] text-white px-5 py-2.5 text-base flex items-center gap-2 shadow-[4px_4px_0px_#000]"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>CUSTOM STAND BUILDER</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playMudaRush();
                setActiveTab('battle-arena');
              }}
              className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 text-base flex items-center gap-2 shadow-[4px_4px_0px_#000]"
            >
              <Swords className="w-5 h-5" />
              <span>STAND CLASH ARENA</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playZaWarudo();
                setActiveTab('soundboard');
              }}
              className="comic-btn bg-purple-700 hover:bg-purple-600 text-white px-4 py-2.5 text-base flex items-center gap-2 shadow-[4px_4px_0px_#000]"
            >
              <Volume2 className="w-5 h-5 text-yellow-300" />
              <span>REAL VOICE SOUNDBOARD</span>
            </button>
          </div>
        </div>

        {/* Right Column: Quote Card & Interactive Sound Widget */}
        <div className="lg:col-span-5">
          <div className="comic-box bg-[#1d1238] border-4 border-black p-6 relative rounded-none shadow-[8px_8px_0px_#ffd700]">
            <div className="flex items-center justify-between border-b-2 border-purple-800 pb-3 mb-4">
              <span className="font-manga text-yellow-400 text-lg flex items-center gap-1.5">
                ★ ICONIC QUOTE OF THE MOMENT
              </span>
              <span className="font-kanji text-purple-400 text-sm font-bold">名言</span>
            </div>

            <div className="min-h-[110px] flex flex-col justify-center">
              <blockquote className="font-manga text-2xl md:text-3xl text-white tracking-wide text-stroke-black">
                "{activeQuote.quote}"
              </blockquote>
              <div className="mt-2 text-pink-400 font-semibold text-xs tracking-wider uppercase">
                — {activeQuote.character} ({activeQuote.meaning})
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-purple-800/80 flex items-center justify-between">
              <button
                onClick={() => handlePlayQuoteAudio(activeQuote)}
                className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>PLAY REAL ANIME VOICE</span>
              </button>

              <button
                onClick={() => setQuoteIndex((prev) => (prev + 1) % FAMOUS_QUOTES.length)}
                className="text-xs text-gray-400 hover:text-white underline font-medium flex items-center gap-1"
              >
                <span>Next Quote</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part 1-9 Quick Horizontal Selector */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t-2 border-black/80">
        <div className="text-xs font-manga text-yellow-400 mb-2 tracking-wider flex items-center gap-2">
          <span>EXPLORE BY PART (PARTS 1 — 9):</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {JOJO_PARTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                soundEngine.playStandSummon();
                setActiveTab('database');
                if (onSelectPart) onSelectPart(p.id);
              }}
              className="comic-box bg-[#150d2c] hover:bg-purple-900/60 p-2 text-center transition-all group"
            >
              <div className="font-manga text-yellow-400 text-xs">PART {p.id}</div>
              <div className="text-[10px] text-gray-300 truncate font-bold group-hover:text-white">
                {p.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
