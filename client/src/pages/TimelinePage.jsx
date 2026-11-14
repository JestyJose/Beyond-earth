import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  Rocket, 
  Radio, 
  Sparkles, 
  MapPin, 
  Filter, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ERAS = [
  { id: '', label: 'All Eras' },
  { id: '1960s', label: '1960s (Apollo Era)' },
  { id: '1970s', label: '1970s (Grand Tour)' },
  { id: '1980s', label: '1980s (Voyager & Shuttle)' },
  { id: '1990s', label: '1990s (Outer Planets)' },
  { id: '2000s', label: '2000s (Mars Exploration)' },
  { id: '2010s', label: '2010s (New Horizons & MSL)' },
  { id: '2020s', label: '2020s (Modern Era)' },
];

const EVENT_TYPE_COLORS = {
  LAUNCH: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  LANDING: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  FLYBY: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  ORBIT_INSERTION: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  DISCOVERY: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  FINAL_SIGNAL: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  MILESTONE: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
};

export default function TimelinePage() {
  const [milestones, setMilestones] = useState([]);
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimeline() {
      setLoading(true);
      try {
        const data = await api.getTimeline({
          era: selectedEra,
          event_type: selectedType
        });
        setMilestones(data || []);
      } catch (err) {
        console.error('Failed to load timeline:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTimeline();
  }, [selectedEra, selectedType]);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep-space">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-space-cyan mb-1">
            Chronological Mission History
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Mission Timeline
          </h1>
          <p className="mt-2 text-slate-300 max-w-xl text-sm leading-relaxed">
            Follow humanity’s journey across the solar system since 1960. From historic Cape Canaveral launches to the far edges of interstellar space.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel p-4 rounded-2xl mb-10 space-y-3">
          {/* Era Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            {ERAS.map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedEra === era.id
                    ? 'bg-space-cyan text-space-black font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Event Type Filter */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-space-border text-xs font-mono">
            <span className="text-slate-400 mr-2">Filter Event:</span>
            {['', 'LAUNCH', 'LANDING', 'FLYBY', 'ORBIT_INSERTION', 'DISCOVERY', 'MILESTONE', 'FINAL_SIGNAL'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedType === type
                    ? 'bg-space-violet text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {type === '' ? 'ALL' : type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 text-xs font-mono text-slate-400">
          Showing {milestones.length} historic milestones
        </div>

        {/* Timeline Stream */}
        {loading ? (
          <LoadingSpinner message="Reconstructing historical mission chronology..." />
        ) : milestones.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl text-slate-400 text-sm">
            No milestones found for selected filters. Try another era or event type.
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l-2 border-space-cyan/30 space-y-8">
            {milestones.map((m, index) => {
              const badgeStyle = EVENT_TYPE_COLORS[m.event_type] || 'bg-white/10 text-slate-300 border-white/20';
              return (
                <div key={index} className="relative group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-space-black border-2 border-space-cyan group-hover:scale-125 group-hover:border-white transition-all shadow-cyan-glow" />

                  {/* Card */}
                  <div className="glass-panel glass-panel-hover p-5 rounded-2xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-space-cyan" />
                        <span className="font-mono text-xs sm:text-sm font-bold text-space-cyan">
                          {m.date}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${badgeStyle}`}>
                        {m.event_type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-space-cyan transition-colors">
                      {m.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {m.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-space-border flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Rocket className="w-3.5 h-3.5 text-space-violet" />
                        <span>Craft:</span>
                        <span className="text-white font-medium">{m.hardware_name}</span>
                      </div>

                      <Link
                        to={`/hardware/${m.hardware_slug}`}
                        className="text-space-cyan hover:underline flex items-center gap-1"
                      >
                        <span>View Craft Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
