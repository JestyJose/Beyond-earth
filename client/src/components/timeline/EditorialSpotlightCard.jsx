import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Compass, Rocket, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

const TYPE_CONFIG = {
  LANDING: {
    bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Surface Landing'
  },
  FLYBY: {
    bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Planetary Flyby'
  },
  LAUNCH: {
    bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    label: 'Spacecraft Launch'
  },
  DISCOVERY: {
    bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    label: 'Historic Discovery'
  },
  ORBIT_INSERTION: {
    bg: 'bg-space-violet/20 text-space-violet border-space-violet/30',
    label: 'Orbit Insertion'
  },
  MILESTONE: {
    bg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    label: 'Landmark Milestone'
  },
  FINAL_SIGNAL: {
    bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    label: 'Final Transmission'
  }
};

export default function EditorialSpotlightCard({ milestone, onOpenDetail }) {
  const typeStyle = TYPE_CONFIG[milestone.event_type] || TYPE_CONFIG.MILESTONE;

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-amber-400/40 bg-gradient-to-r from-space-navy/95 via-space-black/90 to-space-navy/90 p-6 sm:p-8 mb-8 shadow-2xl group hover:border-amber-400/60 transition-all">
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Column */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden h-52 sm:h-64 bg-space-navy border border-white/10 group-hover:border-amber-400/30 transition-all">
          <img
            src={milestone.hardware_image}
            alt={milestone.hardware_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-black/20" />
          
          {/* Destination Pill */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-space-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
            <Compass className="w-3.5 h-3.5 text-space-cyan" />
            <span>{milestone.destination_name}</span>
          </div>
        </div>

        {/* Storytelling Content Column */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Pivotal Historical Landmark</span>
              </span>

              <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border ${typeStyle.bg}`}>
                {typeStyle.label}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 ml-auto">
                <Calendar className="w-3.5 h-3.5 text-space-cyan" />
                <span className="font-bold text-white">{milestone.date}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white group-hover:text-amber-300 transition-colors leading-snug">
              {milestone.title}
            </h3>

            {/* Spacecraft Association */}
            <div className="mt-1.5 flex items-center gap-2 text-xs font-mono text-slate-300">
              <Rocket className="w-3.5 h-3.5 text-space-violet shrink-0" />
              <span>Spacecraft:</span>
              <strong className="text-white">{milestone.hardware_name}</strong>
            </div>

            {/* Educational Context Banner */}
            <div className="mt-3.5 p-3.5 rounded-xl bg-space-black/60 border border-amber-400/20 text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-amber-300 font-mono block mb-1">
                HISTORICAL SIGNIFICANCE:
              </strong>
              {milestone.educational_context || milestone.description}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onOpenDetail(milestone)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 text-space-black font-mono font-bold text-xs hover:bg-amber-300 transition-all shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Landmark Dossier</span>
            </button>

            <Link
              to={`/hardware/${milestone.hardware_slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-space-cyan transition-colors"
            >
              <span>Explore Spacecraft Chronicles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
