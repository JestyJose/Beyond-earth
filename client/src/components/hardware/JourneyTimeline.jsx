import React from 'react';
import { History, Rocket, Compass, Sparkles, CheckCircle2, Flag, AlertTriangle, Radio } from 'lucide-react';

const EVENT_CONFIG = {
  LAUNCH: {
    icon: Rocket,
    color: 'text-space-cyan',
    badge: 'bg-space-cyan/15 text-space-cyan border-space-cyan/30',
  },
  ORBIT_INSERTION: {
    icon: Compass,
    color: 'text-space-violet',
    badge: 'bg-space-violet/15 text-space-violet border-space-violet/30',
  },
  LANDING: {
    icon: Flag,
    color: 'text-emerald-400',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  FLYBY: {
    icon: Compass,
    color: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  DISCOVERY: {
    icon: Sparkles,
    color: 'text-purple-400',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
  MILESTONE: {
    icon: CheckCircle2,
    color: 'text-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  },
  END_OF_MISSION: {
    icon: Radio,
    color: 'text-slate-400',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  },
};

export default function JourneyTimeline({ milestones = [] }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div id="timeline" className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Mission Chronicle
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            Flight Log & Historical Milestones
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
          <History className="w-4 h-4" />
          <span>{milestones.length} Recorded Flight Events</span>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-space-border ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {milestones.map((m, idx) => {
          const config = EVENT_CONFIG[m.event_type] || EVENT_CONFIG.MILESTONE;
          const Icon = config.icon;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-space-black border-2 border-space-border group-hover:border-space-cyan flex items-center justify-center transition-colors">
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>

              {/* Event Content Card */}
              <div className="p-5 rounded-2xl bg-space-navy/70 border border-space-border group-hover:border-white/20 transition-all">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">
                      {m.date}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${config.badge}`}>
                      {m.event_type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Step {idx + 1} of {milestones.length}
                  </span>
                </div>

                {/* Event Title */}
                <h4 className="font-heading font-bold text-base text-white mb-2">
                  {m.title}
                </h4>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
