import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Compass } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function RelatedMissions({ relatedMissions = [] }) {
  if (!relatedMissions || relatedMissions.length === 0) return null;

  return (
    <div id="related" className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-space-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-space-border gap-2 mb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-space-cyan block">
            Fleet Lineage
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            Related NASA Missions & Sibling Spacecraft
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Explore counterpart probes exploring neighboring worlds
        </p>
      </div>

      {/* Grid of Related Missions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {relatedMissions.map((item) => (
          <Link
            key={item.slug}
            to={`/hardware/${item.slug}`}
            className="group glass-panel rounded-2xl overflow-hidden border border-space-border hover:border-space-cyan/50 transition-all flex flex-col justify-between hover:translate-y-[-2px]"
          >
            <div>
              {/* Thumbnail Image */}
              <div className="relative h-36 w-full overflow-hidden bg-space-navy">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/30 to-transparent" />
                
                {/* Destination Badge */}
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-mono text-white/90 bg-space-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
                  <Compass className="w-3 h-3 text-space-cyan" />
                  <span>{item.destination_name}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-space-cyan">
                    {item.category.replace(/_/g, ' ')}
                  </span>
                  <StatusBadge status={item.operational_status} />
                </div>

                <h4 className="font-heading font-bold text-base text-white group-hover:text-space-cyan transition-colors">
                  {item.name}
                </h4>
              </div>
            </div>

            {/* Footer Link Prompt */}
            <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-space-cyan transition-colors">
              <span>Read Mission Chronicle</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
