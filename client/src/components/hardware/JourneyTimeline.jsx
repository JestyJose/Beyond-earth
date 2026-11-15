import React from 'react';
import { History, Rocket, Compass, Sparkles, CheckCircle2, Flag, AlertTriangle, Radio, Info } from 'lucide-react';

const EVENT_CONFIG = {
  LAUNCH: {
    icon: Rocket,
    color: 'text-purple-300',
    badge: 'bg-purple-900/40 text-purple-200 border-purple-500/30',
  },
  ORBIT_INSERTION: {
    icon: Compass,
    color: 'text-violet-400',
    badge: 'bg-violet-900/40 text-violet-200 border-violet-500/30',
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
    color: 'text-purple-300',
    badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  },
  MILESTONE: {
    icon: CheckCircle2,
    color: 'text-purple-300',
    badge: 'bg-purple-900/30 text-purple-300 border-purple-500/30',
  },
  END_OF_MISSION: {
    icon: Radio,
    color: 'text-slate-400',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  },
};

export default function JourneyTimeline({ milestones = [] }) {
  if (!milestones || milestones.length === 0) {
    return (
      <div id="timeline" className="glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border border-purple-500/20">
        <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block mb-1 font-bold">
          Mission Chronicle
        </span>
        <h3 className="font-heading font-bold text-xl text-white mb-2">
          Flight Log & Historical Milestones
        </h3>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#A99BBF]">
          <Info className="w-4 h-4 text-purple-300 shrink-0" />
          <span>Chronological mission flight log records are currently being compiled from primary NASA flight archives.</span>
        </div>
      </div>
    );
  }

  return (
    <div id="timeline" className="glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300 block font-bold">
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
      <div className="relative border-l-2 border-purple-500/20 ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {milestones.map((m, idx) => {
          const config = EVENT_CONFIG[m.event_type] || EVENT_CONFIG.MILESTONE;
          const Icon = config.icon;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-space-black border-2 border-purple-500/30 group-hover:border-purple-400 flex items-center justify-center transition-colors">
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>

              {/* Event Content Card */}
              <div className="p-5 rounded-2xl bg-space-navy/70 border border-space-border group-hover:border-purple-400/30 transition-all">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">
                      {m.date || 'Date Unrecorded'}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${config.badge}`}>
                      {(m.event_type || 'MILESTONE').replace(/_/g, ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A99BBF]">
                    Step {idx + 1} of {milestones.length}
                  </span>
                </div>

                {/* Event Title */}
                <h4 className="font-heading font-bold text-base text-white mb-2">
                  {m.title || 'Mission Milestone'}
                </h4>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {m.description || 'Flight event telemetry logged.'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
