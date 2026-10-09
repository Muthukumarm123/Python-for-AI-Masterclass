/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COURSE_MODULES, CourseModule } from './data/courseData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleCard } from './components/ModuleCard';
import { ModuleDetail } from './components/ModuleDetail';
import { PythonPlayground } from './components/PythonPlayground';
import { FlashcardsView } from './components/FlashcardsView';
import { CheatSheetView } from './components/CheatSheetView';
import { RoadmapView } from './components/RoadmapView';
import { Terminal, BookOpen, Sparkles, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'modules' | 'playground' | 'flashcards' | 'cheatsheet' | 'roadmap'>('modules');
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Completed modules tracking with localStorage
  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pyai_completed_modules');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const handleToggleComplete = (moduleId: string) => {
    setCompletedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      try {
        localStorage.setItem('pyai_completed_modules', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Filter modules
  const filteredModules = COURSE_MODULES.filter((mod) => {
    const matchesCategory = selectedCategory === 'All' || mod.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      mod.title.toLowerCase().includes(q) ||
      mod.subtitle.toLowerCase().includes(q) ||
      mod.aiRelevance.toLowerCase().includes(q) ||
      mod.sections.some(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.conceptSummary.toLowerCase().includes(q) ||
          s.codeExample.code.toLowerCase().includes(q)
      );

    return matchesCategory && matchesSearch;
  });

  const handleSelectModule = (mod: CourseModule) => {
    setSelectedModule(mod);
    setActiveTab('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCurriculum = () => {
    setSelectedModule(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateModule = (nextModuleId: string) => {
    const target = COURSE_MODULES.find((m) => m.id === nextModuleId);
    if (target) {
      setSelectedModule(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartLearning = () => {
    // Find first uncompleted module or module 1
    const firstUnfinished = COURSE_MODULES.find((m) => !completedModules.has(m.id));
    handleSelectModule(firstUnfinished || COURSE_MODULES[0]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'modules') {
            setSelectedModule(null);
          }
        }}
        completedCount={completedModules.size}
        totalModules={COURSE_MODULES.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Module Detail View */}
        {activeTab === 'modules' && selectedModule && (
          <ModuleDetail
            module={selectedModule}
            isCompleted={completedModules.has(selectedModule.id)}
            onToggleComplete={handleToggleComplete}
            onBack={handleBackToCurriculum}
            onNavigateModule={handleNavigateModule}
            allModules={COURSE_MODULES}
          />
        )}

        {/* Modules Grid / Curriculum View */}
        {activeTab === 'modules' && !selectedModule && (
          <div>
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              onStartLearning={handleStartLearning}
              onOpenPlayground={() => setActiveTab('playground')}
              completedCount={completedModules.size}
              totalModules={COURSE_MODULES.length}
            />

            {/* Curriculum Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-6">
                <span>
                  SHOWING {filteredModules.length} OF {COURSE_MODULES.length} MODULES
                </span>
                {completedModules.size > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all course progress?')) {
                        setCompletedModules(new Set());
                        localStorage.removeItem('pyai_completed_modules');
                      }
                    }}
                    className="hover:text-slate-200 underline"
                  >
                    Reset Progress
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isCompleted={completedModules.has(module.id)}
                    onSelect={handleSelectModule}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>

              {filteredModules.length === 0 && (
                <div className="text-center py-20 bg-slate-900/30 rounded-xl border border-slate-800">
                  <div className="text-sm text-slate-400 mb-2">No modules match your filter.</div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs text-emerald-400 hover:underline font-mono"
                  >
                    Clear search and filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Python Playground Tab */}
        {activeTab === 'playground' && <PythonPlayground />}

        {/* Flashcards Tab */}
        {activeTab === 'flashcards' && <FlashcardsView modules={COURSE_MODULES} />}

        {/* Cheat Sheet Tab */}
        {activeTab === 'cheatsheet' && <CheatSheetView modules={COURSE_MODULES} />}

        {/* 6-Week Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            modules={COURSE_MODULES}
            completedModules={completedModules}
            onSelectModule={handleSelectModule}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Python for AI Engineering Masterclass</span>
            <span>·</span>
            <span>Created for modern AI Engineers</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Python 3.12+</span>
            <span>Astral uv</span>
            <span>Pydantic v2</span>
            <span>Ruff</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
