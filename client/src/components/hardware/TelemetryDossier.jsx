import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, Rocket, Zap, Weight, Clock, ShieldCheck } from 'lucide-react';

export default function TelemetryDossier({ hardware }) {
  const destinationName = hardware.destination_details?.name || hardware.destination_slug;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Flight Telemetry Dossier
          </span>
          <h3 className="font-heading font-bold text-xl text-white">
            Engineering Specifications & Operating Horizon
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Telemetry Verified: {hardware.status_verified_date}</span>
        </div>
      </div>

      {/* Grid of Key Specifications */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-mono">
        {/* Destination */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Compass className="w-4 h-4 text-space-cyan" />
            <span>Destination</span>
          </div>
          <Link
            to="/solar-system"
            className="text-white font-bold hover:text-space-cyan transition-colors truncate block"
            title="Inspect at destination in 3D Solar System"
          >
            {destinationName} &rarr;
          </Link>
        </div>

        {/* Launch Date */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Calendar className="w-4 h-4 text-space-cyan" />
            <span>Launch Date</span>
          </div>
          <div className="text-white font-bold">{hardware.launch_date}</div>
        </div>

        {/* Launch Vehicle */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Rocket className="w-4 h-4 text-space-violet" />
            <span>Launch Rocket</span>
          </div>
          <div className="text-white font-bold truncate" title={hardware.launch_vehicle}>
            {hardware.launch_vehicle}
          </div>
        </div>

        {/* Power Architecture */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Power System</span>
          </div>
          <div className="text-white font-bold truncate" title={hardware.power_source}>
            {hardware.power_source?.split(' ')[0] || 'Solar'}
          </div>
        </div>

        {/* Spacecraft Mass */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Weight className="w-4 h-4 text-emerald-400" />
            <span>Launch Mass</span>
          </div>
          <div className="text-white font-bold">
            {hardware.mass_kg ? `${hardware.mass_kg.toLocaleString()} kg` : 'N/A'}
          </div>
        </div>

        {/* Mission Lifespan */}
        <div className="p-3.5 rounded-2xl bg-space-navy/80 border border-space-border">
          <div className="text-slate-400 flex items-center gap-1.5 mb-1">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Longevity</span>
          </div>
          <div className="text-white font-bold truncate" title={hardware.operational_lifespan}>
            {hardware.operational_status === 'OPERATIONAL' ? 'Active in Flight' : 'Concluded'}
          </div>
        </div>
      </div>

      {/* Lifespan Detail & Telemetry Banner */}
      <div className="mt-4 pt-4 border-t border-space-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="text-slate-300">
          <strong className="text-space-cyan font-mono mr-2">OPERATIONAL HORIZON:</strong>
          {hardware.operational_lifespan || 'Designed for primary exploration; completed extended science investigations.'}
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Power source: <span className="text-slate-200">{hardware.power_source}</span>
        </div>
      </div>
    </div>
  );
}
