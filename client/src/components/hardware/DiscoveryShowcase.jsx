import React from 'react';
import { Sparkles, Globe, Lightbulb, Compass, Award } from 'lucide-react';

const DOMAIN_STYLES = {
  ASTROBIOLOGY: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    label: 'Astrobiology & Life',
  },
  GEOLOGY: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    label: 'Planetary Geology',
  },
  COSMOLOGY: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    label: 'Cosmology & Interstellar',
  },
  ATMOSPHERE: {
    bg: 'bg-cyan-500/15',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    label: 'Atmospheric Physics',
  },
  HELIOPHYSICS: {
    bg: 'bg-yellow-500/15',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    label: 'Solar & Heliophysics',
  },
};

export default function DiscoveryShowcase({ discoveries = [] }) {
  if (!discoveries || discoveries.length === 0) return null;

  return (
    <div id="discoveries" className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Scientific Legacy
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            Major Discoveries & Earth Significance
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-space-cyan font-mono">
          <Award className="w-4 h-4" />
          <span>{discoveries.length} Landmark Finding{discoveries.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Discovery Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {discoveries.map((disc, idx) => {
          const style = DOMAIN_STYLES[disc.scientific_domain] || {
            bg: 'bg-space-cyan/15',
            text: 'text-space-cyan',
            border: 'border-space-cyan/30',
            label: disc.scientific_domain || 'Planetary Science',
          };

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-space-navy/80 border border-space-border hover:border-space-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Domain & Index Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10.5px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
                    {style.label}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Finding #{idx + 1}
                  </span>
                </div>

                {/* Discovery Title */}
                <h4 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                  {disc.title}
                </h4>

                {/* Plain English Summary */}
                <p className="text-sm text-slate-200 leading-relaxed mb-5">
                  {disc.plain_english_summary}
                </p>
              </div>

              {/* Why It Matters On Earth Callout */}
              <div className="mt-4 pt-4 border-t border-white/10 rounded-xl bg-space-card/90 p-4 border border-white/5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Why It Matters on Earth:
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {disc.why_it_matters}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
