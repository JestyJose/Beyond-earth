import React from 'react';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

export const DECADE_CONFIG = [
  {
    id: '',
    decade: 'ALL',
    label: 'Complete Timeline',
    epochTheme: '1960 — 2026',
    description: 'Every verified NASA mission milestone across six decades of exploration.'
  },
  {
    id: '1960s',
    decade: '1960s',
    label: 'Dawn of Apollo',
    epochTheme: 'Lunar Touchdowns',
    description: 'The monumental race to the Moon and the first robotic & crewed landings on another world.'
  },
  {
    id: '1970s',
    decade: '1970s',
    label: 'The Grand Tour',
    epochTheme: 'Mars & Giant Planets',
    description: 'Viking 1 touches down on Mars; Pioneers and Voyagers embark on the historic outer planet tour.'
  },
  {
    id: '1980s',
    decade: '1980s',
    label: 'The Ice Giants',
    epochTheme: 'Uranus & Neptune',
    description: 'Voyager 2 executes humanity’s sole encounters with Uranus and Neptune at the solar edge.'
  },
  {
    id: '1990s',
    decade: '1990s',
    label: 'Cosmic Eyes',
    epochTheme: 'Hubble & Orbiters',
    description: 'Hubble peers into deep cosmological time; Galileo and Magellan map Venus and Jupiter.'
  },
  {
    id: '2000s',
    decade: '2000s',
    label: 'The Mars Armada',
    epochTheme: 'Spirit & Opportunity',
    description: 'Robotic rovers prove ancient liquid water on Mars; Cassini begins decade-long Saturn orbital study.'
  },
  {
    id: '2010s',
    decade: '2010s',
    label: 'Interstellar & Pluto',
    epochTheme: 'New Horizons & MSL',
    description: 'Voyager enters interstellar space; Curiosity lands in Gale Crater; New Horizons reveals Pluto.'
  },
  {
    id: '2020s',
    decade: '2020s',
    label: 'Touch the Sun',
    epochTheme: 'Perseverance & Ingenuity',
    description: 'Parker Solar Probe enters the solar corona; Perseverance and Ingenuity explore Jezero Crater.'
  }
];

export default function DecadeNavigator({ activeEra = '', onSelectEra, countsByEra = {} }) {
  return (
    <div className="mb-8">
      {/* Label */}
      <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
        <span className="uppercase tracking-widest text-space-cyan flex items-center gap-1.5 font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Epoch Scrubber (Select Decade)</span>
        </span>
        <span className="hidden sm:inline text-slate-400">
          Scroll or click to filter by historical era
        </span>
      </div>

      {/* Horizontal Scrubber */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {DECADE_CONFIG.map((d) => {
          const isSelected = activeEra === d.id;
          const count = countsByEra[d.id] ?? (d.id === '' ? Object.values(countsByEra).reduce((a, b) => a + b, 0) : 0);

          return (
            <button
              key={d.decade}
              onClick={() => onSelectEra(d.id)}
              aria-pressed={isSelected}
              className={`shrink-0 px-4 py-2.5 rounded-2xl text-left border transition-all focus-ring ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white border-purple-400 shadow-violet-glow'
                  : 'bg-space-navy/80 hover:bg-[#1A1230] text-slate-200 border-space-border hover:border-purple-400/50'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-white">
                  {d.decade}
                </span>
                {count > 0 && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white font-semibold'
                        : 'bg-purple-900/40 text-purple-200 border border-purple-500/20'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </div>
              <div className={`text-[11px] font-sans truncate max-w-[130px] font-medium mt-0.5 ${isSelected ? 'text-purple-100 font-semibold' : 'text-slate-400'}`}>
                {d.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
