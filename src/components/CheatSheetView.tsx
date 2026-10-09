import React, { useState } from 'react';
import { CourseModule } from '../data/courseData';
import { Search, Copy, Check, Terminal, FileCode, Sparkles } from 'lucide-react';

interface CheatSheetViewProps {
  modules: CourseModule[];
}

export const CheatSheetView: React.FC<CheatSheetViewProps> = ({ modules }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Collect all cheatsheet entries
  const allSnippets: {
    moduleNumber: number;
    moduleTitle: string;
    category: string;
    label: string;
    snippet: string;
    note: string;
  }[] = [];

  modules.forEach((mod) => {
    mod.cheatSheet.forEach((item) => {
      allSnippets.push({
        moduleNumber: mod.number,
        moduleTitle: mod.title,
        category: mod.category,
        ...item,
      });
    });
  });

  const filteredSnippets = allSnippets.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.label.toLowerCase().includes(q) ||
      s.snippet.toLowerCase().includes(q) ||
      s.note.toLowerCase().includes(q) ||
      s.moduleTitle.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Terminal className="w-4 h-4" />
            <span>SYNTAX CHEAT SHEET</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
            Python for AI Quick Reference
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Quickly lookup syntax, data structures, uv package commands, and AI engineering patterns across the entire curriculum.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syntax, functions, uv commands..."
            className="w-full pl-9 pr-3 py-2 text-xs text-slate-100 bg-slate-900 border border-slate-800 focus:border-emerald-500/60 rounded-lg placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Snippets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSnippets.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span className="text-emerald-400">
                  MOD {item.moduleNumber.toString().padStart(2, '0')} · {item.category}
                </span>
                <span className="text-slate-500">{item.note}</span>
              </div>

              <h4 className="text-xs font-semibold text-slate-200 mb-2">{item.label}</h4>

              {/* Code Snippet */}
              <div className="relative group rounded-lg bg-slate-950 border border-slate-800 p-3 mb-3">
                <pre className="text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                  <code>{item.snippet}</code>
                </pre>
                <button
                  onClick={() => handleCopy(item.snippet, idx)}
                  className="absolute top-2 right-2 p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 opacity-80 hover:opacity-100 transition-opacity"
                  title="Copy snippet"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              From: {item.moduleTitle}
            </div>
          </div>
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-xs">
          No syntax snippets found matching "{searchQuery}".
        </div>
      )}
    </div>
  );
};
