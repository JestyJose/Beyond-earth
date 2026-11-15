import React from 'react';
import { Sparkles, MapPin, Radio, Compass, AlertCircle } from 'lucide-react';

export default function PhysicalFateCard({ hardware = {} }) {
  const isSurface = hardware.operational_status === 'INACTIVE_SURFACE' || hardware.category === 'ROVER' || hardware.category === 'LANDER';
  const isDeepSpace = hardware.operational_status === 'DEEP_SPACE_TRAVELLING' || hardware.destination_slug === 'interstellar-space';
  const isDestroyed = hardware.operational_status === 'ATMOSPHERIC_ENTRY_DESTROYED' || hardware.operational_status === 'SURFACE_IMPACT_DESTROYED';

  let borderGlow = 'border-purple-500/40';
  let badgeColor = 'bg-purple-900/40 text-purple-200 border-purple-500/30';
  let tag = 'Active Mission';

  if (isSurface && hardware.operational_status === 'INACTIVE_SURFACE') {
    borderGlow = 'border-slate-500/40';
    badgeColor = 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    tag = 'Surface Monument';
  } else if (isDeepSpace) {
    borderGlow = 'border-purple-500/40';
    badgeColor = 'bg-purple-900/40 text-purple-200 border-purple-500/30';
    tag = 'Interstellar Ambassador';
  } else if (isDestroyed) {
    borderGlow = 'border-amber-500/40';
    badgeColor = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    tag = 'Planetary Protection Concluded';
  }

  const fateText = hardware.physical_fate || hardware.status_summary || 'Physical telemetry currently tracking at last recorded orbital coordinates.';
  const significanceText = hardware.historical_significance || 'Pioneering NASA deep-space explorer contributing foundational science to humanity.';

  return (
    <div id="fate" className={`glass-panel scroll-mt-24 p-6 sm:p-8 rounded-3xl mb-10 border ${borderGlow} relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-300" />
          <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
            The Physical Fate & Current Journey
          </span>
        </div>
        <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
          {tag}
        </span>
      </div>

      <h3 className="font-heading font-extrabold text-2xl text-white mb-3">
        Where is {hardware.name || 'this spacecraft'} right now?
      </h3>

      <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl mb-6">
        {fateText}
      </p>

      {/* Historical Significance Highlights */}
      <div className="p-4 rounded-2xl bg-space-navy/80 border border-white/5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 block mb-1 font-bold">
          Historical Significance in Space Exploration:
        </span>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {significanceText}
        </p>
      </div>
    </div>
  );
}
