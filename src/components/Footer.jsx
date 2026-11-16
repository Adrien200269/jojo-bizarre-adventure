import React from 'react';
import soundEngine from '../utils/soundEngine.js';
import confetti from 'canvas-confetti';
import { Volume2, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const handleRoundabout = () => {
    soundEngine.playRoundaboutBass();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 }
    });
  };

  const handleStarClick = () => {
    soundEngine.playStandSummon();
    soundEngine.speak("Joestar bloodline awakened!", 1.1, 1.0);
  };

  return (
    <footer className="bg-[#0b0517] border-t-4 border-black text-white py-12 px-4 relative overflow-hidden">
      {/* Background Japanese Watermark */}
      <div className="absolute left-8 bottom-4 font-kanji text-8xl font-black text-purple-900/10 pointer-events-none select-none">
        荒木飛呂彦
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Iconic "To Be Continued..." Arrow Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#180d32] border-4 border-black p-6 shadow-[6px_6px_0px_#ffd700]">
          <div className="flex items-center gap-4">
            <button
              onClick={handleRoundabout}
              className="w-12 h-12 bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#000] shrink-0"
              title="Click to play Roundabout bass!"
            >
              ▶
            </button>
            <div>
              <div className="font-manga text-2xl text-yellow-400 tracking-wide flex items-center gap-2">
                <span>TO BE CONTINUED...</span>
                <span className="text-xl">➔</span>
              </div>
              <p className="text-xs text-gray-300">
                Click the arrow to play Yes - Roundabout bass riff and trigger the end-card sequence!
              </p>
            </div>
          </div>

          <button
            onClick={handleRoundabout}
            className="comic-btn bg-[#ff0077] hover:bg-[#ff1a8c] text-white px-4 py-2 text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <Volume2 className="w-4 h-4 text-yellow-300" />
            <span>PLAY ROUNDABOUT SFX</span>
          </button>
        </div>

        {/* Middle Credits & Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-purple-900/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={handleStarClick}
                className="w-7 h-7 bg-purple-600 hover:bg-purple-500 text-yellow-300 border border-black flex items-center justify-center font-manga text-sm cursor-pointer"
                title="Joestar Star Birthmark"
              >
                ★
              </button>
              <h4 className="font-manga text-xl text-yellow-400">
                HIROHIKO ARAKI ARCHIVE
              </h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Created in honor of Hirohiko Araki’s ongoing masterpiece since 1987. From Phantom Blood in Weekly Shonen Jump to The JOJOLands in Ultra Jump.
            </p>
          </div>

          <div>
            <h4 className="font-manga text-sm text-pink-400 mb-3 tracking-wider">
              INTERACTIVE MODULES
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
              <button onClick={() => setActiveTab('database')} className="text-left hover:text-yellow-400 underline font-medium">
                • Stand Database
              </button>
              <button onClick={() => setActiveTab('creator')} className="text-left hover:text-yellow-400 underline font-medium">
                • Custom Stand Lab
              </button>
              <button onClick={() => setActiveTab('soundboard')} className="text-left hover:text-yellow-400 underline font-medium">
                • Retro Soundboard
              </button>
              <button onClick={() => setActiveTab('family-tree')} className="text-left hover:text-yellow-400 underline font-medium">
                • Joestar Bloodline
              </button>
              <button onClick={() => setActiveTab('battle-arena')} className="text-left hover:text-yellow-400 underline font-medium">
                • Battle Arena
              </button>
              <button onClick={() => setActiveTab('quiz')} className="text-left hover:text-yellow-400 underline font-medium">
                • Stand Matcher
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-manga text-sm text-purple-300 mb-3 tracking-wider">
              ARAKI AESTHETIC NOTES
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Features custom SVG 6-axis Stand parameter charts, Web Audio API sound synthesis, dynamic manga onomatopoeia particles, and Araki palette shift filters.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 font-medium">
          <div>
            JoJo's Bizarre Adventure © Hirohiko Araki / Lucky Land Communications / Shueisha.
          </div>
          <div className="flex items-center gap-1 font-manga text-yellow-400">
            <span>BUILT WITH REACT & TAILWIND CSS</span>
            <span className="text-pink-500">★</span>
            <span className="font-kanji">ゴゴゴゴ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
