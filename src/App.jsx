import React, { useState } from 'react';
import Navbar, { PALETTES } from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import StandDatabase from './components/StandDatabase.jsx';
import StandCreator from './components/StandCreator.jsx';
import Soundboard from './components/Soundboard.jsx';
import FamilyTree from './components/FamilyTree.jsx';
import BattleSimulator from './components/BattleSimulator.jsx';
import StandQuiz from './components/StandQuiz.jsx';
import MangaEffectsOverlay from './components/MangaEffectsOverlay.jsx';
import Footer from './components/Footer.jsx';
import soundEngine from './utils/soundEngine.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('database');
  const [selectedPart, setSelectedPart] = useState('ALL');
  const [isMuted, setIsMuted] = useState(false);
  const [currentPalette, setCurrentPalette] = useState('default');
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const [customStand, setCustomStand] = useState(null);

  // ZA WARUDO 5-second time freeze
  const triggerTimeStop = () => {
    if (isTimeStopped) return;
    setIsTimeStopped(true);
    soundEngine.playZaWarudo();

    setTimeout(() => {
      soundEngine.playTimeResume();
      setIsTimeStopped(false);
    }, 5000);
  };

  const activePaletteClass = PALETTES.find((p) => p.id === currentPalette)?.class || '';

  return (
    <div className={`min-h-screen flex flex-col bg-[#0d071c] text-white transition-all duration-500 ${activePaletteClass}`}>
      {/* Interactive Manga SFX & Time-Stop Overlay */}
      <MangaEffectsOverlay
        isTimeStopped={isTimeStopped}
        onTimeStopEnd={() => setIsTimeStopped(false)}
      />

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        currentPalette={currentPalette}
        setCurrentPalette={setCurrentPalette}
        triggerTimeStop={triggerTimeStop}
        isTimeStopped={isTimeStopped}
      />

      {/* Main Hero Header */}
      <HeroBanner
        setActiveTab={setActiveTab}
        onSelectPart={(partId) => setSelectedPart(partId)}
      />

      {/* Dynamic Tab Content */}
      <main className="flex-1">
        {activeTab === 'database' && (
          <StandDatabase
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
          />
        )}

        {activeTab === 'creator' && (
          <StandCreator
            customStand={customStand}
            setCustomStand={setCustomStand}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'soundboard' && (
          <Soundboard />
        )}

        {activeTab === 'family-tree' && (
          <FamilyTree />
        )}

        {activeTab === 'battle-arena' && (
          <BattleSimulator
            customStand={customStand}
          />
        )}

        {activeTab === 'quiz' && (
          <StandQuiz />
        )}
      </main>

      {/* Footer & End-card */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
