import React from 'react';
import { History, Compass, Rocket, Globe, Sparkles } from 'lucide-react';

export default function GrandTourHero({ totalMilestones = 68, activeEra = '' }) {
  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-space-border mb-8 p-6 sm:p-10 bg-gradient-to-br from-space-navy/90 via-space-black/95 to-space-navy/80">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-space-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-space-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-cyan/15 text-space-cyan border border-space-cyan/30 text-xs font-mono uppercase tracking-widest mb-4">
          <History className="w-3.5 h-3.5" />
          <span>Interactive Historical Chronicle • 1960 — 2026</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
          The Grand Tour
        </h1>

        {/* Storytelling Prologue */}
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Follow humanity’s machines as they ventured beyond Earth's cradle. From the dust of the Apollo 11 touchdown to Voyager’s passage between stars and Parker Solar Probe dipping into the Sun’s fiery corona, explore every verified launch, landing, planetary encounter, and scientific revelation.
        </p>

        {/* Quick Metrics Bar */}
        <div className="mt-8 pt-6 border-t border-space-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-space-black/40 border border-white/5">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <History className="w-3.5 h-3.5 text-space-cyan" />
              <span>Exploration Span</span>
            </div>
            <div className="text-white font-bold text-sm sm:text-base">7 Decades</div>
            <div className="text-[10px] text-slate-400 mt-0.5">1960s to 2020s</div>
          </div>

          <div className="p-3 rounded-2xl bg-space-black/40 border border-white/5">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Rocket className="w-3.5 h-3.5 text-space-violet" />
              <span>Machines Cataloged</span>
            </div>
            <div className="text-white font-bold text-sm sm:text-base">18 Spacecraft</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Rovers, Orbiters & Probes</div>
          </div>

          <div className="p-3 rounded-2xl bg-space-black/40 border border-white/5">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Worlds Reached</span>
            </div>
            <div className="text-white font-bold text-sm sm:text-base">12 Horizons</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Sun to Interstellar</div>
          </div>

          <div className="p-3 rounded-2xl bg-space-black/40 border border-white/5">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Flight Milestones</span>
            </div>
            <div className="text-white font-bold text-sm sm:text-base">{totalMilestones} Events</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Verified NASA Records</div>
          </div>
        </div>
      </div>
    </div>
  );
}
