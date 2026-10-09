import React from 'react';
import { Search, Play, CheckCircle2, Terminal, ArrowRight, BookOpen, Hash } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onStartLearning: () => void;
  onOpenPlayground: () => void;
  completedCount: number;
  totalModules: number;
}

const POPULAR_SUBTOPICS = [
  'Addition',
  'Shortcut (+=)',
  'While Loops',
  'For Loops',
  'range()',
  'break',
  'continue',
  'Functions (def)',
  '*args & **kwargs',
  'Type Hints',
  'Lists',
  'List Comprehensions',
  'Dictionaries',
  'Tuples',
  'Sets',
  'Classes & OOP',
  'Dataclasses',
  'try/except',
  'Files & open',
  'Pandas',
  'APIs & Requests',
  'Pydantic',
  'uv',
  'Ruff'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onStartLearning,
  onOpenPlayground,
  completedCount,
  totalModules,
}) => {
  const categories = ['All', 'Foundation', 'Core Python', 'Data & Structures', 'AI Engineering'];

  return (
    <div className="relative border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          {/* Left Column: Heading and value proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet text kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3 tracking-wide">
              <span>PYTHON FOR AI ACADEMY</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>COMPLETE CURRICULUM</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>12 MODULES & 60+ SUBTOPICS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 text-balance leading-tight mb-4">
              Master Python for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Artificial Intelligence</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6">
              The exhaustive study handbook for modern AI engineering. Every topic is covered in full depth: arithmetic operators (+, -, *, //, %, **), shortcut assignments (+=), loops (for, while, range, break, continue), functions (*args, **kwargs, type hints), data structures, OOP, robust retries, Pandas, APIs, and Pydantic validation.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button
                onClick={onStartLearning}
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-emerald-500/20 active:scale-95 whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>{completedCount > 0 ? 'Continue Curriculum' : 'Start from Module 1'}</span>
              </button>

              <button
                onClick={onOpenPlayground}
                className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Launch Interactive Sandbox</span>
              </button>
            </div>

            {/* Proof line */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>Zero Toy Code</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Live In-Browser Execution</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Complete Topic & Subtopic Coverage</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <img
                src="/src/assets/images/hero_python_for_ai_1791572988925.jpg"
                alt="Python for AI neural pipeline architecture visual"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[300px] sm:max-h-[340px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-950/90 backdrop-blur-sm border border-slate-800/80 px-3 py-1.5 rounded-lg">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Code to LLM Tokens
                </span>
                <span className="text-slate-400">Python 3.12+ · uv · Pydantic</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Metric / Fact Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-8">
          <div>
            <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">12</div>
            <div className="text-xs text-slate-400">Master Modules</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">60+</div>
            <div className="text-xs text-slate-400">Granular Subtopics</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">10x-100x</div>
            <div className="text-xs text-slate-400">Faster Package Setup with uv</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">
              {completedCount}/{totalModules}
            </div>
            <div className="text-xs text-slate-400">Your Modules Completed</div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
          {/* Category Tabs (Segmented buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search any subtopic (e.g. addition, while, functions, uv)..."
              className="w-full pl-9 pr-3 py-2 text-xs text-slate-100 bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-lg placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Subtopic Fast Navigation Strip */}
        <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
          <span className="shrink-0 text-slate-500 flex items-center gap-1">
            <Hash className="w-3 h-3" /> Quick Jump:
          </span>
          {POPULAR_SUBTOPICS.map((topic) => {
            const isActive = searchQuery.toLowerCase().trim() === topic.toLowerCase().trim();
            return (
              <button
                key={topic}
                onClick={() => onSearchChange(isActive ? '' : topic)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'hover:bg-slate-800 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                }`}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
