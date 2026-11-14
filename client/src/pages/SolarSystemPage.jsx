import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Layers, 
  Cpu, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Info,
  Radio
} from 'lucide-react';
import { api } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function SolarSystemPage() {
  const [destinations, setDestinations] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHardwareList, setActiveHardwareList] = useState([]);
  const [loadingHardware, setLoadingHardware] = useState(false);
  const [viewMode, setViewMode] = useState('schematic'); // 'schematic' or 'grid'

  useEffect(() => {
    async function loadDestinations() {
      try {
        const data = await api.getDestinations();
        setDestinations(data || []);
        if (data && data.length > 0) {
          // Default select Mars
          const defaultTarget = data.find(d => d.slug === 'mars') || data[0];
          handleSelectDestination(defaultTarget);
        }
      } catch (err) {
        console.error('Failed to load destinations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDestinations();
  }, []);

  const handleSelectDestination = async (dest) => {
    setSelectedDest(dest);
    setLoadingHardware(true);
    try {
      const detailed = await api.getDestination(dest.slug);
      setActiveHardwareList(detailed.hardware || []);
    } catch (err) {
      console.error('Failed to load destination hardware:', err);
      setActiveHardwareList([]);
    } finally {
      setLoadingHardware(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-deep-space relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-space-cyan mb-1">
              Interactive Solar System Navigator
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Solar System Explorer
            </h1>
            <p className="mt-2 text-slate-300 max-w-xl text-sm leading-relaxed">
              Explore destinations from the Sun to interstellar space. Select any celestial body to inspect its robotic residents and orbiting observatories.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-space-navy border border-space-border self-start md:self-auto">
            <button
              onClick={() => setViewMode('schematic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'schematic'
                  ? 'bg-space-cyan/20 text-space-cyan border border-space-cyan/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Orbital Map
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'grid'
                  ? 'bg-space-cyan/20 text-space-cyan border border-space-cyan/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Destination Grid
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Calculating planetary ephemeris and orbital vectors..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Explorer */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {viewMode === 'schematic' ? (
                /* Orbital Map / Visualizer */
                <div className="glass-panel p-6 rounded-3xl border border-space-border relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400">
                      Heliocentric Distance from the Sun (Astronomical Units - AU)
                    </span>
                    <span className="text-[10px] font-mono text-space-cyan">
                      1 AU = 149.6 Million km
                    </span>
                  </div>

                  {/* Visual Orbital Tracks */}
                  <div className="space-y-3">
                    {destinations.map((dest) => {
                      const isSelected = selectedDest?.slug === dest.slug;
                      return (
                        <div
                          key={dest.slug}
                          onClick={() => handleSelectDestination(dest)}
                          className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                            isSelected
                              ? 'bg-space-cyan/15 border-space-cyan shadow-cyan-glow'
                              : 'bg-space-navy/60 border-space-border hover:border-slate-500 hover:bg-space-navy/90'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Color Planet Indicator */}
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center shadow-md relative"
                              style={{ backgroundColor: dest.color || '#38BDF8' }}
                            >
                              <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className={`font-heading font-bold text-sm ${isSelected ? 'text-space-cyan' : 'text-white'}`}>
                                  {dest.name}
                                </h3>
                                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
                                  {dest.type}
                                </span>
                              </div>
                              <div className="text-xs text-slate-400 font-mono">
                                {dest.distance_from_sun_au} AU from Sun
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs font-mono font-bold text-white block">
                                {dest.hardware_count} {dest.hardware_count === 1 ? 'Craft' : 'Crafts'}
                              </span>
                              {dest.active_hardware_count > 0 && (
                                <span className="text-[10px] font-mono text-emerald-400">
                                  {dest.active_hardware_count} Active
                                </span>
                              )}
                            </div>
                            <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-space-cyan' : 'text-slate-500'}`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map((dest) => {
                    const isSelected = selectedDest?.slug === dest.slug;
                    return (
                      <div
                        key={dest.slug}
                        onClick={() => handleSelectDestination(dest)}
                        className={`p-5 rounded-2xl glass-panel cursor-pointer transition-all border ${
                          isSelected
                            ? 'border-space-cyan bg-space-cyan/15 shadow-cyan-glow'
                            : 'border-space-border hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: dest.color || '#38BDF8' }}
                          >
                            <div className="w-3 h-3 rounded-full bg-white/40" />
                          </div>
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                            {dest.hardware_count} Missions
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-lg text-white">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {dest.description}
                        </p>
                        <div className="mt-3 text-[11px] font-mono text-space-cyan">
                          {dest.distance_from_sun_au} AU from Sun
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Destination Inspector Panel */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
              {selectedDest ? (
                <div className="glass-panel p-6 rounded-3xl border border-space-border">
                  <div className="flex items-center justify-between pb-4 border-b border-space-border">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: selectedDest.color || '#38BDF8' }}
                      />
                      <span className="text-xs font-mono uppercase tracking-wider text-space-cyan font-bold">
                        Destination Telemetry
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {selectedDest.distance_from_sun_au} AU
                    </span>
                  </div>

                  <div className="mt-4">
                    <h2 className="font-heading font-extrabold text-2xl text-white">
                      {selectedDest.name}
                    </h2>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {selectedDest.description}
                    </p>
                  </div>

                  {/* Hardware at this Destination */}
                  <div className="mt-6 pt-4 border-t border-space-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-space-cyan" />
                        <span>NASA Hardware Here ({activeHardwareList.length})</span>
                      </h4>
                    </div>

                    {loadingHardware ? (
                      <div className="text-xs text-slate-400 font-mono py-4 text-center">
                        Querying orbiters and landers...
                      </div>
                    ) : activeHardwareList.length === 0 ? (
                      <p className="text-xs text-slate-400 py-3">
                        No NASA hardware currently recorded at this celestial body.
                      </p>
                    ) : (
                      <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                        {activeHardwareList.map((hw) => (
                          <Link
                            key={hw.slug}
                            to={`/hardware/${hw.slug}`}
                            className="group block p-3.5 rounded-xl bg-space-navy/80 hover:bg-space-navy border border-space-border hover:border-space-cyan/40 transition-all"
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-heading font-bold text-sm text-white group-hover:text-space-cyan transition-colors">
                                {hw.name}
                              </span>
                              <StatusBadge status={hw.operational_status} size="sm" />
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                              <span>{hw.category.replace(/_/g, ' ')}</span>
                              <span>Launched {hw.launch_date.slice(0, 4)}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 text-xs font-mono">
                  Select a destination to view telemetry and spacecraft profiles.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
