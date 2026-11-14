import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Calendar, 
  Compass, 
  Rocket, 
  ExternalLink, 
  Sparkles, 
  Camera, 
  BookOpen, 
  Zap, 
  Weight, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function EventDetailModal({ milestone, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!milestone) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-space-black/80 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-space-border/80 shadow-2xl overflow-hidden z-10 bg-space-navy/95 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-space-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-space-cyan font-bold">
              Historical Event Dossier
            </span>
            <span className="text-slate-400 font-mono text-xs">• {milestone.date}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Visual Banner */}
          {milestone.hardware_image && (
            <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden bg-space-black border border-white/10">
              <img
                src={milestone.hardware_image}
                alt={milestone.hardware_name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-black/30" />

              {/* Attribution */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-space-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                  <Camera className="w-3 h-3 text-space-cyan" />
                  <span>{milestone.hardware_attribution}</span>
                </span>
              </div>

              {/* Destination Pill */}
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-space-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                  <Compass className="w-3.5 h-3.5 text-space-cyan" />
                  <span>Destination: {milestone.destination_name}</span>
                </span>
              </div>
            </div>
          )}

          {/* Event Title & Type */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                {milestone.event_type.replace(/_/g, ' ')}
              </span>
              {milestone.is_major_milestone && (
                <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Landmark Space Moment</span>
                </span>
              )}
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              {milestone.title}
            </h2>
          </div>

          {/* Educational Breakdown */}
          <div className="p-4 rounded-2xl bg-space-black/50 border border-white/10 space-y-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-space-cyan font-bold block mb-1">
                What Happened on this Date:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {milestone.description}
              </p>
            </div>

            {milestone.educational_context && milestone.educational_context !== milestone.description && (
              <div className="pt-3 border-t border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                  Why It Altered Space History:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {milestone.educational_context}
                </p>
              </div>
            )}
          </div>

          {/* Spacecraft Snapshot Card */}
          <div className="p-5 rounded-2xl bg-space-navy/70 border border-space-border space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-space-border">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-space-violet" />
                <span className="font-heading font-bold text-base text-white">
                  {milestone.hardware_name}
                </span>
              </div>
              <StatusBadge status={milestone.operational_status} size="sm" />
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-space-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                <span className="text-white font-bold">{milestone.hardware_category?.replace(/_/g, ' ')}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-space-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px]">LAUNCH DATE</span>
                <span className="text-white font-bold">{milestone.launch_date || 'N/A'}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-space-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px]">POWER SOURCE</span>
                <span className="text-white font-bold truncate block" title={milestone.power_source}>
                  {milestone.power_source?.split(' ')[0] || 'Solar'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-space-black/40 border border-white/5">
                <span className="text-slate-400 block text-[10px]">LAUNCH VEHICLE</span>
                <span className="text-white font-bold truncate block" title={milestone.launch_vehicle}>
                  {milestone.launch_vehicle || 'NASA Rocket'}
                </span>
              </div>
            </div>
          </div>

          {/* Official NASA Sources & Provenance */}
          <div className="pt-2">
            <div className="flex items-center gap-1.5 mb-2 text-xs font-mono text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-space-cyan" />
              <span>NASA Archive Citations & Identifiers:</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {milestone.nssdca_id && (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-space-black/40 border border-white/5">
                  <span className="text-slate-300">
                    NSSDCA Master Catalog ID: <strong className="text-space-cyan">{milestone.nssdca_id}</strong>
                  </span>
                  <a
                    href={`https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=${encodeURIComponent(milestone.nssdca_id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-space-cyan hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Archive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {milestone.sources && milestone.sources.length > 0 && (
                <div className="p-2.5 rounded-xl bg-space-black/40 border border-white/5 text-slate-400">
                  <span className="block text-slate-300 font-semibold mb-1">
                    Primary Reference: {milestone.sources[0]?.title}
                  </span>
                  {milestone.sources[0]?.url && (
                    <a
                      href={milestone.sources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-space-cyan hover:underline inline-flex items-center gap-1"
                    >
                      <span>{milestone.sources[0].url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-space-border flex flex-wrap items-center justify-between gap-3 bg-space-black/40">
          <div className="flex flex-wrap items-center gap-3">
            {/* Link to Spacecraft Detail */}
            <Link
              to={`/hardware/${milestone.hardware_slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-space-cyan text-space-black font-mono font-bold text-xs hover:bg-space-cyan/90 transition-all shadow-cyan-glow"
            >
              <span>Explore Spacecraft Chronicles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Link to 3D Solar System */}
            <Link
              to="/solar-system"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-space-navy border border-space-border text-slate-300 hover:text-space-cyan font-mono text-xs transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-space-cyan" />
              <span>Locate in 3D Cosmos</span>
            </Link>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
