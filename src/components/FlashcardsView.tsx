import React, { useState } from 'react';
import { CourseModule, Flashcard } from '../data/courseData';
import { RotateCw, CheckCircle, HelpCircle, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardsViewProps {
  modules: CourseModule[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ modules }) => {
  // Aggregate all flashcards across modules
  const allCards: (Flashcard & { moduleTitle: string; category: string })[] = [];
  modules.forEach((mod) => {
    mod.flashcards.forEach((fc) => {
      allCards.push({
        ...fc,
        moduleTitle: mod.title,
        category: mod.category,
      });
    });
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pyai_mastered_cards');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const categories = ['All', 'Foundation', 'Core Python', 'Data & Structures', 'AI Engineering'];

  const filteredCards = allCards.filter(
    (c) => selectedCategory === 'All' || c.category === selectedCategory
  );

  const activeCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  };

  const handleMarkMastered = (cardId: string) => {
    const updated = new Set(masteredCards);
    if (updated.has(cardId)) {
      updated.delete(cardId);
    } else {
      updated.add(cardId);
    }
    setMasteredCards(updated);
    try {
      localStorage.setItem('pyai_mastered_cards', JSON.stringify(Array.from(updated)));
    } catch {}
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>ACTIVE RECALL PRACTICE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          Python for AI Flashcards
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Reinforce critical syntax rules, library conventions, and AI design patterns through spaced repetition.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex items-center justify-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 mb-8 max-w-fit mx-auto overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Flashcard Stats */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4 px-2">
        <span>
          Card {currentIndex + 1} of {filteredCards.length}
        </span>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {masteredCards.size} / {allCards.length} Mastered
          </span>
        </div>
      </div>

      {/* Main Flashcard Container */}
      {activeCard && (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-80 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl select-none"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{activeCard.moduleTitle}</span>
              <span className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-400 transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Click to view Prompt' : 'Click to Reveal Answer'}</span>
              </span>
            </div>

            {/* Card Content (Front vs Back) */}
            <div className="flex flex-col justify-center items-center text-center my-auto px-4">
              {!isFlipped ? (
                <div>
                  <div className="text-xs font-mono text-emerald-400 mb-3">QUESTION / CONCEPT</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
                    {activeCard.front}
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-cyan-400">ANSWER / EXPLANATION</div>
                  <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed max-w-xl">
                    {activeCard.back}
                  </p>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-lg mx-auto">
                    <strong className="text-emerald-400">AI Context: </strong>
                    {activeCard.aiContext}
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer status */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="capitalize">{activeCard.category}</span>
              {masteredCards.has(activeCard.id) && (
                <span className="text-emerald-400 font-mono flex items-center gap-1">
                  ✓ Marked as Mastered
                </span>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => handleMarkMastered(activeCard.id)}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
                masteredCards.has(activeCard.id)
                  ? 'bg-slate-800 text-slate-300 border border-slate-700'
                  : 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{masteredCards.has(activeCard.id) ? 'Unmark Mastered' : 'Mark as Mastered'}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition-colors flex items-center gap-1.5"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
