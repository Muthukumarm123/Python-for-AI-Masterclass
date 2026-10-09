import React from 'react';
import { AI_ROADMAP_STEPS, CourseModule } from '../data/courseData';
import { CheckCircle2, Clock, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface RoadmapViewProps {
  modules: CourseModule[];
  completedModules: Set<string>;
  onSelectModule: (module: CourseModule) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  modules,
  completedModules,
  onSelectModule,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>ZERO TO DEPLOYED AI SYSTEMS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          6-Week Python for AI Engineering Path
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          A structured, week-by-week curriculum roadmap designed to take you from foundational Python syntax to deploying robust AI agents and APIs.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-6">
        {AI_ROADMAP_STEPS.map((step) => {
          const stepModuleObjects = modules.filter((m) => step.modules.includes(m.number));
          const stepCompletedCount = stepModuleObjects.filter((m) =>
            completedModules.has(m.id)
          ).length;
          const isAllCompleted =
            stepModuleObjects.length > 0 && stepCompletedCount === stepModuleObjects.length;

          return (
            <div
              key={step.step}
              className={`rounded-xl border p-6 transition-all ${
                isAllCompleted
                  ? 'bg-slate-900/40 border-slate-800'
                  : 'bg-slate-900/80 border-slate-800 shadow-md'
              }`}
            >
              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                      isAllCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{step.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{step.duration}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-emerald-400">
                    {stepCompletedCount}/{stepModuleObjects.length} Done
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4 max-w-3xl">
                {step.desc}
              </p>

              {/* Associated Modules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
                {stepModuleObjects.map((mod) => {
                  const isModDone = completedModules.has(mod.id);

                  return (
                    <button
                      key={mod.id}
                      onClick={() => onSelectModule(mod)}
                      className="group p-3 rounded-lg border border-slate-800 bg-slate-950/70 hover:bg-slate-900 hover:border-slate-700 text-left transition-all flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="text-[10px] font-mono text-emerald-400 mb-0.5">
                          MODULE {mod.number.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-1">
                          {mod.title}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {mod.duration} · {mod.sections.length} topics
                        </div>
                      </div>

                      <div className="mt-1">
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isModDone ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-700'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
