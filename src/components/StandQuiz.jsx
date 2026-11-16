import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizData.js';
import { STANDS_AND_CHARACTERS } from '../data/jojoData.js';
import StandRadarChart from './StandRadarChart.jsx';
import soundEngine from '../utils/soundEngine.js';
import confetti from 'canvas-confetti';
import { RotateCcw, Volume2, Sparkles, Brain } from 'lucide-react';

export default function StandQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [resultStand, setResultStand] = useState(null);

  const currentQ = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (option) => {
    soundEngine.playPunchImpact(200);
    const newAnswers = { ...selectedAnswers, [currentStep]: option.stand };
    setSelectedAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (answers) => {
    soundEngine.playStandSummon();

    const counts = {};
    Object.values(answers).forEach((standId) => {
      counts[standId] = (counts[standId] || 0) + 1;
    });

    let topStandId = 'star-platinum';
    let maxCount = -1;
    Object.entries(counts).forEach(([id, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topStandId = id;
      }
    });

    const matched = STANDS_AND_CHARACTERS.find((s) => s.id === topStandId) || STANDS_AND_CHARACTERS[0];
    setResultStand(matched);

    setTimeout(() => {
      if (matched.id === 'star-platinum') soundEngine.playOraRush();
      else if (matched.id === 'the-world') soundEngine.playMudaRush();
      else if (matched.id === 'gold-experience') soundEngine.playGerMuda();
      else if (matched.id === 'crazy-diamond') soundEngine.playDoraRush();
      else if (matched.id === 'sticky-fingers') soundEngine.playAriArrivederci();
      else if (matched.id === 'tusk-act-4') soundEngine.playTuskOra();
      else soundEngine.playStandSummon();

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.55 }
      });
    }, 400);
  };

  const handleRetake = () => {
    soundEngine.playStandSummon();
    setCurrentStep(0);
    setSelectedAnswers({});
    setResultStand(null);
  };

  const handlePlayResultVoice = () => {
    if (!resultStand) return;
    if (resultStand.id === 'star-platinum') soundEngine.playYareYareDaze();
    else if (resultStand.id === 'the-world') soundEngine.playDioApproach();
    else if (resultStand.id === 'gold-experience') soundEngine.playGiornoDream();
    else if (resultStand.id === 'sticky-fingers') soundEngine.playArrivederci();
    else if (resultStand.id === 'killer-queen') soundEngine.playBitesTheDust();
    else if (resultStand.id === 'king-crimson') soundEngine.playKingCrimsonResults();
    else if (resultStand.id === 'crazy-diamond') soundEngine.playDoraRush();
    else if (resultStand.id === 'tusk-act-4') soundEngine.playChumimiin();
    else soundEngine.speak(resultStand.quote || resultStand.standCry, 1.1, 1.0);
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-black pb-4">
        <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black font-manga px-4 py-0.5 text-xs border-2 border-black mb-1">
          <Brain className="w-3.5 h-3.5" />
          <span>PSYCHOLOGICAL PERSONALITY & TEMPERAMENT PROFILING</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-manga text-white text-stroke-black tracking-wide">
          WHAT IS YOUR STAND?
        </h2>
        <p className="text-gray-300 text-sm mt-1 max-w-lg mx-auto">
          No hypothetical scenarios—explore your core traits, temperament, internal drives, and worldview to discover your Stand alignment!
        </p>
      </div>

      {!resultStand ? (
        /* Quiz Questions Flow */
        <div className="comic-box bg-[#160d2e] border-4 border-black p-6 md:p-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-manga text-yellow-400 mb-2">
            <span>QUESTION {currentStep + 1} OF {QUIZ_QUESTIONS.length}</span>
            <span>{Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE</span>
          </div>

          <div className="w-full bg-black/80 h-2.5 border border-black mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 via-pink-500 to-[#ff0077] h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="font-manga text-2xl md:text-3xl text-white tracking-wide mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className="w-full comic-box bg-[#221345] hover:bg-[#ff0077] hover:text-white text-gray-100 p-4 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-none bg-yellow-400 text-black font-manga text-sm flex items-center justify-center font-bold border border-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    {opt.text}
                  </span>
                </div>
                <Sparkles className="w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Result Stand Reveal Card */
        <div className="comic-box bg-[#1b0d38] border-4 border-black p-6 md:p-8 text-center relative overflow-hidden shadow-[10px_10px_0px_#ff0077]">
          <div className="font-manga text-yellow-400 text-sm tracking-widest uppercase mb-1">
            ★ YOUR STAND HAS AWAKENED! ★
          </div>

          <h3 className="font-manga text-4xl md:text-6xl text-white text-stroke-black mb-2">
            [{resultStand.name}]
          </h3>
          <div className="font-kanji text-purple-300 text-lg font-bold mb-4">
            {resultStand.japanese}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="font-manga text-xs bg-yellow-400 text-black px-3 py-1 border border-black font-bold">
              PART {resultStand.part}
            </span>
            <span className="font-manga text-xs bg-pink-600 text-white px-3 py-1 border border-black font-bold">
              TYPE: {resultStand.type}
            </span>
            <span className="font-manga text-xs bg-purple-700 text-white px-3 py-1 border border-black font-bold">
              CANON MASTER: {resultStand.user}
            </span>
          </div>

          {/* Radar Chart */}
          <div className="bg-[#0b0518] border-4 border-black p-4 max-w-sm mx-auto mb-6 flex justify-center">
            <StandRadarChart
              stats={resultStand.statValues}
              rawStats={resultStand.stats}
              size={240}
              color={resultStand.themeColor}
            />
          </div>

          {/* Personality Breakdown */}
          <div className="bg-[#120826] border-2 border-purple-800 p-4 max-w-xl mx-auto text-left mb-6 space-y-2">
            <div className="font-manga text-xs text-yellow-400">STAND ESSENCE & SOUL MATCH:</div>
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed">
              {resultStand.description}
            </p>
            <div className="font-manga text-pink-400 text-xs pt-1">
              FINISHER: {resultStand.signatureMove} • CRY: 『{resultStand.standCry}』
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePlayResultVoice}
              className="comic-btn bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 text-sm font-bold flex items-center gap-2 shadow-[3px_3px_0px_#000]"
            >
              <Volume2 className="w-4 h-4" />
              <span>PLAY CHARACTER VOICE</span>
            </button>

            <button
              onClick={handleRetake}
              className="comic-btn bg-purple-700 hover:bg-purple-600 text-white px-5 py-2.5 text-sm font-bold flex items-center gap-2 shadow-[3px_3px_0px_#000]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RETAKE TEST</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
