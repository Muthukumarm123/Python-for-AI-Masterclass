import React from 'react';
import { BookOpen, Terminal, Sparkles, FileText, MapPin, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'modules' | 'playground' | 'flashcards' | 'cheatsheet' | 'roadmap';
  onSelectTab: (tab: 'modules' | 'playground' | 'flashcards' | 'cheatsheet' | 'roadmap') => void;
  completedCount: number;
  totalModules: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  completedCount,
  totalModules,
}) => {
  const percent = Math.round((completedCount / totalModules) * 100);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('modules')}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <span className="font-mono font-bold text-sm">py</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-100 group-hover:text-emerald-400 transition-colors">
              Python for AI Masterclass
            </span>
          </div>
        </button>

        {/* Zone 2: 4–5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => onSelectTab('modules')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 py-1 ${
              activeTab === 'modules' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => onSelectTab('playground')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 py-1 ${
              activeTab === 'playground' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Python Playground
          </button>
          <button
            onClick={() => onSelectTab('flashcards')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 py-1 ${
              activeTab === 'flashcards' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => onSelectTab('cheatsheet')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 py-1 ${
              activeTab === 'cheatsheet' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            Cheat Sheet
          </button>
          <button
            onClick={() => onSelectTab('roadmap')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-100 py-1 ${
              activeTab === 'roadmap' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : ''
            }`}
          >
            6-Week Roadmap
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {completedCount}/{totalModules} Done
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-semibold">{percent}%</span>
          </div>

          <button
            onClick={() => onSelectTab('playground')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20 active:scale-95"
          >
            Open Console
          </button>
        </div>
      </div>
    </header>
  );
};
