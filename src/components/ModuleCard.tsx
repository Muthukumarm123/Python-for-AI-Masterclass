import React from 'react';
import { CourseModule } from '../data/courseData';
import { Clock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface ModuleCardProps {
  module: CourseModule;
  isCompleted: boolean;
  onSelect: (module: CourseModule) => void;
  onToggleComplete: (moduleId: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isCompleted,
  onSelect,
  onToggleComplete,
}) => {
  const formattedNumber = module.number.toString().padStart(2, '0');

  return (
    <div
      onClick={() => onSelect(module)}
      className={`group relative rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between p-6 ${
        isCompleted
          ? 'bg-slate-900/40 border-slate-800 hover:border-emerald-500/40'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-emerald-400">MODULE {formattedNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{module.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {module.duration}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(module.id);
            }}
            title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <CheckCircle2
              className={`w-4 h-4 transition-colors ${
                isCompleted ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-emerald-300 transition-colors mb-1.5">
          {module.title}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {module.subtitle}
        </p>

        {/* AI Relevance Highlight */}
        <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-4">
          <div className="text-[11px] font-mono text-emerald-400/90 mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Why this matters for AI</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {module.aiRelevance}
          </p>
        </div>
      </div>

      {/* Card Footer: Lesson count & CTA */}
      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-mono">
          {module.sections.length} core topics · 1 practice challenge
        </span>
        <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
          Study <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
