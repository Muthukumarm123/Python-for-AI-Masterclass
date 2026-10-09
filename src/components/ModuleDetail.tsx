import React, { useState } from 'react';
import { CourseModule } from '../data/courseData';
import { runPythonCode, RunResult } from '../utils/pythonRunner';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  Copy,
  Check,
  RotateCcw,
  Lightbulb,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Terminal,
  HelpCircle,
  FileCode2,
} from 'lucide-react';

interface ModuleDetailProps {
  module: CourseModule;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string) => void;
  onBack: () => void;
  onNavigateModule: (nextModuleId: string) => void;
  allModules: CourseModule[];
}

export const ModuleDetail: React.FC<ModuleDetailProps> = ({
  module,
  isCompleted,
  onToggleComplete,
  onBack,
  onNavigateModule,
  allModules,
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'sandbox' | 'challenge' | 'quiz' | 'cheatsheet'>('lessons');
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  // Sandbox state
  const currentSection = module.sections[selectedSectionIndex];
  const [sandboxCode, setSandboxCode] = useState(currentSection.codeExample.code);
  const [sandboxResult, setSandboxResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Challenge state
  const [challengeCode, setChallengeCode] = useState(module.exercise.starterCode);
  const [challengeResult, setChallengeResult] = useState<RunResult | null>(null);
  const [isChallengeRunning, setIsChallengeRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Quiz state
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // Navigation indices
  const currentIndex = allModules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  // Run Sandbox code
  const handleRunSandbox = async () => {
    setIsRunning(true);
    const res = await runPythonCode(sandboxCode);
    setSandboxResult(res);
    setIsRunning(false);
  };

  // Run Challenge code
  const handleRunChallenge = async () => {
    setIsChallengeRunning(true);
    const res = await runPythonCode(challengeCode);
    setChallengeResult(res);
    setIsChallengeRunning(false);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectSection = (index: number) => {
    setSelectedSectionIndex(index);
    setSandboxCode(module.sections[index].codeExample.code);
    setSandboxResult(null);
  };

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted[questionId]) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = (questionId: string) => {
    if (selectedQuizAnswers[questionId] !== undefined) {
      setQuizSubmitted((prev) => ({ ...prev, [questionId]: true }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleComplete(module.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-2 ${
              isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>{isCompleted ? 'Module Completed' : 'Mark as Complete'}</span>
          </button>
        </div>
      </div>

      {/* Module Header Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
          <span>MODULE {module.number.toString().padStart(2, '0')}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{module.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{module.duration}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          {module.title}
        </h1>

        <p className="text-sm text-slate-300 mb-4 max-w-3xl">
          {module.subtitle}
        </p>

        {/* AI Relevance Banner */}
        <div className="p-4 rounded-lg bg-slate-950 border border-emerald-500/20 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Why this matters for AI Engineering</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {module.aiRelevance}
          </p>
        </div>

        {/* Key Takeaways */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Key Learning Outcomes
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {module.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'lessons'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Core Lessons ({module.sections.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sandbox')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'sandbox'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Code Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('challenge')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'challenge'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>Practice Challenge</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Check ({module.quiz.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'cheatsheet'
              ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Copy className="w-4 h-4" />
          <span>Cheat Sheet</span>
        </button>
      </div>

      {/* Tab 1: Core Lessons */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Subnav of Sections */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono text-slate-400 mb-2">SECTIONS IN THIS MODULE</div>
            {module.sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => handleSelectSection(idx)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs ${
                  selectedSectionIndex === idx
                    ? 'bg-slate-900 border-emerald-500/50 text-slate-100 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div className="font-mono text-emerald-400 mb-1 text-[11px] flex items-center justify-between">
                  <span>Topic {idx + 1}</span>
                  <span className="text-slate-400 text-[10px] truncate max-w-[150px]">{sec.subtopicTag}</span>
                </div>
                <div className="font-semibold text-slate-200 mb-1">{sec.title}</div>
                <div className="text-slate-400 line-clamp-1">{sec.conceptSummary}</div>
              </button>
            ))}

            {/* Visual card if module has one */}
            {module.imageVisual && (
              <div className="mt-6 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <img
                  src={module.imageVisual}
                  alt={module.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
                <div className="p-3 text-[11px] text-slate-400 font-mono">
                  Architecture & Tooling Reference Diagram
                </div>
              </div>
            )}
          </div>

          {/* Right Detailed Reading Pane */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <span>TOPIC {selectedSectionIndex + 1} OF {module.sections.length}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">{currentSection.subtopicTag}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-3">
                {currentSection.title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium mb-6 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20">
                {currentSection.conceptSummary}
              </p>

              {/* Lesson Text Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {currentSection.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Code Example Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden mb-6">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span>{currentSection.codeExample.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(currentSection.codeExample.code)}
                      className="px-2 py-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSandboxCode(currentSection.codeExample.code);
                        setActiveTab('sandbox');
                        handleRunSandbox();
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>Run Code</span>
                    </button>
                  </div>
                </div>

                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed selection:bg-emerald-500/30">
                  <code>{currentSection.codeExample.code}</code>
                </pre>

                {/* Explanation */}
                <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-100">Why it works: </strong>
                  {currentSection.codeExample.explanation}
                </div>
              </div>

              {/* Pro Tip & Common Pitfall */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSection.proTip && (
                  <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pro Tip</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentSection.proTip}
                    </p>
                  </div>
                )}

                {currentSection.commonPitfall && (
                  <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Common Pitfall</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentSection.commonPitfall}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Next / Previous Section Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => selectedSectionIndex > 0 && handleSelectSection(selectedSectionIndex - 1)}
                disabled={selectedSectionIndex === 0}
                className="px-4 py-2 text-xs rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Topic</span>
              </button>

              <button
                onClick={() => {
                  if (selectedSectionIndex < module.sections.length - 1) {
                    handleSelectSection(selectedSectionIndex + 1);
                  } else {
                    setActiveTab('challenge');
                  }
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
              >
                <span>{selectedSectionIndex < module.sections.length - 1 ? 'Next Topic' : 'Start Practice Challenge'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Code Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Interactive Python Sandbox</h3>
              <p className="text-xs text-slate-400">
                Modify code and run live in your browser with real stdout capture.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSandboxCode(currentSection.codeExample.code)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Topic Example</span>
              </button>

              <button
                onClick={handleRunSandbox}
                disabled={isRunning}
                className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isRunning ? 'Executing...' : 'Run Python'}</span>
              </button>
            </div>
          </div>

          {/* Sandbox Editor & Output Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Pane */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 flex flex-col h-[400px]">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>main.py (Python 3.12)</span>
                <span>Editable</span>
              </div>
              <textarea
                value={sandboxCode}
                onChange={(e) => setSandboxCode(e.target.value)}
                className="flex-1 w-full p-4 bg-transparent text-xs font-mono text-slate-100 resize-none focus:outline-none selection:bg-emerald-500/30 leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Terminal Console Pane */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 flex flex-col h-[400px]">
              <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Output Console / Stdout</span>
                {sandboxResult && (
                  <span className="text-emerald-400 text-[11px]">
                    {sandboxResult.executionTimeMs}ms · {sandboxResult.engineUsed}
                  </span>
                )}
              </div>
              <div className="flex-1 p-4 overflow-y-auto text-xs font-mono leading-relaxed">
                {isRunning ? (
                  <div className="text-slate-500">Executing code in Python runtime...</div>
                ) : sandboxResult ? (
                  sandboxResult.success ? (
                    <pre className="text-emerald-300 whitespace-pre-wrap">{sandboxResult.output}</pre>
                  ) : (
                    <pre className="text-rose-400 whitespace-pre-wrap">{sandboxResult.error}</pre>
                  )
                ) : (
                  <div className="text-slate-500">
                    Click "Run Python" above to execute this script and view stdout.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Practice Challenge */}
      {activeTab === 'challenge' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="text-xs font-mono text-emerald-400 mb-1">HANDS-ON CODING CHALLENGE</div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">{module.exercise.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {module.exercise.instruction}
            </p>

            {/* Test description */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 mb-6">
              <span className="text-slate-200 font-semibold">Verification Target: </span>
              {module.exercise.testCaseDescription}
            </div>

            {/* Editor & Runner */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="rounded-xl border border-slate-800 bg-slate-950 flex flex-col h-[350px]">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>exercise.py</span>
                  <button
                    onClick={() => setChallengeCode(module.exercise.starterCode)}
                    className="text-[11px] text-slate-400 hover:text-slate-200"
                  >
                    Reset Code
                  </button>
                </div>
                <textarea
                  value={challengeCode}
                  onChange={(e) => setChallengeCode(e.target.value)}
                  className="flex-1 w-full p-4 bg-transparent text-xs font-mono text-slate-100 resize-none focus:outline-none selection:bg-emerald-500/30 leading-relaxed"
                  spellCheck={false}
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 flex flex-col h-[350px]">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Challenge Output</span>
                  <button
                    onClick={handleRunChallenge}
                    disabled={isChallengeRunning}
                    className="px-3 py-1 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-slate-950" />
                    <span>Run & Verify</span>
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto text-xs font-mono leading-relaxed">
                  {isChallengeRunning ? (
                    <div className="text-slate-500">Evaluating challenge test...</div>
                  ) : challengeResult ? (
                    <div>
                      <div className="text-slate-400 mb-2">Your Output:</div>
                      <pre className="text-emerald-300 whitespace-pre-wrap mb-4">{challengeResult.output}</pre>
                      <div className="pt-3 border-t border-slate-800 text-slate-400">
                        Expected Output Preview:
                        <pre className="text-slate-300 mt-1 whitespace-pre-wrap">{module.exercise.expectedOutput}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500">
                      Write your solution in the left editor and click "Run & Verify".
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hint & Solution Toggles */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium flex items-center gap-1.5"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>{showSolution ? 'Hide Solution' : 'Reveal Solution Code'}</span>
              </button>
            </div>

            {showHint && (
              <div className="mt-4 p-4 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-slate-300">
                <strong className="text-amber-400">Hint: </strong>
                {module.exercise.hint}
              </div>
            )}

            {showSolution && (
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>Reference Solution</span>
                  <button
                    onClick={() => setChallengeCode(module.exercise.solutionCode)}
                    className="text-emerald-400 hover:underline"
                  >
                    Copy to Editor
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-200 overflow-x-auto">
                  <code>{module.exercise.solutionCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Knowledge Check Quiz */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="text-xs font-mono text-slate-400">
            TEST YOUR UNDERSTANDING · {module.quiz.length} QUESTIONS
          </div>

          {module.quiz.map((q, qIdx) => {
            const isAnswered = selectedQuizAnswers[q.id] !== undefined;
            const isSubmitted = quizSubmitted[q.id];
            const isCorrect = isSubmitted && selectedQuizAnswers[q.id] === q.correctIndex;

            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-sm font-semibold text-slate-100">
                    {qIdx + 1}. {q.question}
                  </h4>
                  {isSubmitted && (
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedQuizAnswers[q.id] === optIdx;
                    let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900';

                    if (isSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-950/40 border-rose-500/50 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-slate-800 border-emerald-500/50 text-slate-100';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleQuizAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isSelected && !isSubmitted && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!isSubmitted && (
                  <button
                    onClick={() => handleSubmitQuiz(q.id)}
                    disabled={!isAnswered}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors disabled:opacity-40"
                  >
                    Check Answer
                  </button>
                )}

                {isSubmitted && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-emerald-400">Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 5: Cheat Sheet */}
      {activeTab === 'cheatsheet' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-bold text-slate-100 mb-2">Module Syntax Reference</h3>
          <p className="text-xs text-slate-400 mb-6">
            Quick reference code snippets to copy and apply in your AI applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {module.cheatSheet.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 mb-1">{item.label}</div>
                  <pre className="p-2 rounded bg-slate-900 text-xs font-mono text-emerald-300 mb-2 overflow-x-auto whitespace-pre-wrap">
                    <code>{item.snippet}</code>
                  </pre>
                </div>
                <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between">
                  <span>{item.note}</span>
                  <button
                    onClick={() => handleCopyCode(item.snippet)}
                    className="text-slate-400 hover:text-slate-200"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Next / Prev Navigation Footer */}
      <div className="mt-12 pt-6 border-t border-slate-800/80 flex items-center justify-between">
        {prevModule ? (
          <button
            onClick={() => onNavigateModule(prevModule.id)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-slate-500">PREVIOUS MODULE</div>
              <div className="font-semibold text-slate-300">{prevModule.title}</div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextModule && (
          <button
            onClick={() => onNavigateModule(nextModule.id)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-100 transition-colors"
          >
            <div className="text-right">
              <div className="text-[10px] text-slate-500">NEXT MODULE</div>
              <div className="font-semibold text-emerald-400">{nextModule.title}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        )}
      </div>
    </div>
  );
};
