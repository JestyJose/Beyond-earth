import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, Rocket, ChevronRight, Eye, Sparkles } from 'lucide-react';

const EVENT_TYPE_STYLES = {
  LAUNCH: {
    bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    dot: 'border-blue-400 bg-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.5)]',
    label: 'Launch'
  },
  LANDING: {
    bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    dot: 'border-emerald-400 bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    label: 'Landing'
  },
  FLYBY: {
    bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    dot: 'border-purple-400 bg-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    label: 'Flyby'
  },
  ORBIT_INSERTION: {
    bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    dot: 'border-cyan-400 bg-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.5)]',
    label: 'Orbit Insertion'
  },
  DISCOVERY: {
    bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    dot: 'border-amber-400 bg-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    label: 'Discovery'
  },
  FINAL_SIGNAL: {
    bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    dot: 'border-rose-400 bg-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.5)]',
    label: 'Final Signal'
  },
  MILESTONE: {
    bg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    dot: 'border-indigo-400 bg-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.5)]',
    label: 'Milestone'
  }
};

export default function TimelineEventCard({ milestone, onOpenDetail }) {
  const style = EVENT_TYPE_STYLES[milestone.event_type] || EVENT_TYPE_STYLES.MILESTONE;

  return (
    <div className="relative group">
      {/* Glowing Axis Node Dot */}
      <div
        className={`absolute -left-[31px] sm:-left-[39px] top-4 w-4 h-4 rounded-full border-2 ${style.dot} transition-transform group-hover:scale-125 z-10`}
      />

      {/* Main Card */}
      <div className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl border border-space-border group-hover:border-space-cyan/40 transition-all">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-space-cyan" />
            <span className="font-mono text-xs sm:text-sm font-bold text-space-cyan">
              {milestone.date}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {milestone.is_major_milestone && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Landmark</span>
              </span>
            )}
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${style.bg}`}>
              {style.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetail(milestone)}
          className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-space-cyan transition-colors cursor-pointer"
        >
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {milestone.description}
        </p>

        {/* Educational Context Snippet if available */}
        {milestone.educational_context && milestone.educational_context !== milestone.description && (
          <div className="mt-3 p-3 rounded-xl bg-space-navy/80 border border-white/5 text-xs text-slate-300">
            <span className="text-space-cyan font-mono font-semibold block mb-0.5 text-[10.5px] uppercase tracking-wide">
              Historical Context:
            </span>
            {milestone.educational_context}
          </div>
        )}

        {/* Footer Meta & Action Links */}
        <div className="mt-4 pt-3.5 border-t border-space-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-3">
            {/* Spacecraft Pill */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <Rocket className="w-3.5 h-3.5 text-space-violet shrink-0" />
              <Link
                to={`/hardware/${milestone.hardware_slug}`}
                className="hover:text-space-cyan transition-colors font-medium truncate max-w-[180px] sm:max-w-none"
                title={milestone.hardware_name}
              >
                {milestone.hardware_name}
              </Link>
            </div>

            {/* Destination Pill */}
            <div className="flex items-center gap-1 text-slate-400">
              <Compass className="w-3.5 h-3.5 text-space-cyan shrink-0" />
              <span>{milestone.destination_name}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => onOpenDetail(milestone)}
              className="text-space-cyan hover:text-white flex items-center gap-1 text-xs font-medium transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Event</span>
            </button>

            <Link
              to={`/hardware/${milestone.hardware_slug}`}
              className="text-slate-400 hover:text-space-cyan flex items-center gap-1 transition-colors"
            >
              <span>Craft &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
