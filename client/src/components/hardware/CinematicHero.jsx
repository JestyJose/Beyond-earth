import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Compass, Cpu, History, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function CinematicHero({ hardware, onScrollToSection }) {
  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-space-border mb-10 group">
      {/* Background Image with Deep Space Gradients */}
      <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full overflow-hidden bg-space-navy">
        <img
          src={hardware.image_url}
          alt={hardware.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Multi-Layer Gradients for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 via-space-black/30 to-transparent" />
      </div>

      {/* Floating Photo Attribution Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-space-black/80 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-slate-300">
          <Camera className="w-3.5 h-3.5 text-space-cyan" />
          <span>{hardware.image_attribution || 'NASA / JPL-Caltech'}</span>
        </div>
      </div>

      {/* Floating Back Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/hardware"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 hover:text-space-cyan hover:border-space-cyan/40 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Hardware Catalog</span>
        </Link>
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <div className="max-w-4xl">
          {/* Category & Status Pill Stack */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-space-cyan px-2.5 py-0.5 rounded-full bg-space-cyan/15 border border-space-cyan/30">
              {hardware.category.replace(/_/g, ' ')}
            </span>
            <StatusBadge
              status={hardware.operational_status}
              verifiedDate={hardware.status_verified_date}
            />
          </div>

          {/* Mission Title */}
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
            {hardware.name}
          </h1>

          {/* Subtitle / Mission Purpose */}
          <p className="mt-3 text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-3xl">
            {hardware.mission_purpose}
          </p>

          {/* Action Toolbar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
            {/* 3D Solar System Gateway Button */}
            <Link
              to="/solar-system"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-space-cyan text-space-black font-bold hover:bg-space-cyan/90 transition-all shadow-cyan-glow"
            >
              <Compass className="w-4 h-4" />
              <span>Explore in 3D Solar System</span>
            </Link>

            {/* Quick Section Jumpers */}
            <button
              onClick={() => onScrollToSection('instruments')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-space-navy/90 hover:bg-space-navy border border-space-border text-slate-200 hover:text-space-cyan transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-space-cyan" />
              <span>Scientific Instruments ({hardware.instruments?.length || 0})</span>
            </button>

            <button
              onClick={() => onScrollToSection('fate')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-space-navy/90 hover:bg-space-navy border border-space-border text-slate-200 hover:text-space-violet transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-space-violet" />
              <span>Physical Fate</span>
            </button>

            <button
              onClick={() => onScrollToSection('timeline')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-space-navy/90 hover:bg-space-navy border border-space-border text-slate-200 hover:text-amber-400 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Flight Log</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
