import React from 'react';
import { 
  Award, 
  Lock, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  Trophy, 
  ShieldCheck 
} from 'lucide-react';

export const ALL_BADGES = [
  {
    name: 'Junior Flight Controller',
    category: 'CADET_TIER',
    points: 100,
    icon: '🏅',
    criteria: 'Pass the Solar System Cadet Challenge quiz (70%+ score).',
    description: 'Mastered the foundational orbits, scale, and flagship probes of our solar system.'
  },
  {
    name: 'Lunar Pioneer',
    category: 'CADET_TIER',
    points: 100,
    icon: '🌕',
    criteria: 'Pass the Lunar Pioneers & Apollo Heritage quiz (70%+ score).',
    description: 'Demonstrated mastery of Apollo hardware, retroreflectors, and lunar surface geology.'
  },
  {
    name: 'Deep Space Navigator',
    category: 'EXPLORER_TIER',
    points: 250,
    icon: '🚀',
    criteria: 'Pass the Deep Space & Nuclear Power quiz (70%+ score).',
    description: 'Understands planetary gravity assists, the inverse-square law, and RTG nuclear power.'
  },
  {
    name: 'Martian Geologist',
    category: 'EXPLORER_TIER',
    points: 250,
    icon: '🔴',
    criteria: 'Pass the Martian Surface Armada quiz (70%+ score).',
    description: 'Mastered Mars rover mechanics, Ingenuity atmospheric flight, and lakebed habitability.'
  },
  {
    name: 'Interstellar Voyager',
    category: 'COMMANDER_TIER',
    points: 500,
    icon: '🌌',
    criteria: 'Pass the Ice Giants & Interstellar Physics quiz (70%+ score).',
    description: 'Explored the heliopause crossing, Pluto cryovolcanism, and Uranus magnetic tilt.'
  },
  {
    name: 'Astrophysics Commander',
    category: 'COMMANDER_TIER',
    points: 500,
    icon: '🔭',
    criteria: 'Pass the Solar Corona & Cosmic Eyes quiz (70%+ score).',
    description: 'Mastered coronal physics, thermal protection systems, and Hubble deep field surveys.'
  },
  {
    name: 'Planetary Protector',
    category: 'SIMULATION',
    points: 300,
    icon: '🛡️',
    criteria: 'Execute the optimal trajectory in the Cassini Saturn scenario.',
    description: 'Enforced United Nations planetary protection protocols to safeguard alien oceans.'
  },
  {
    name: 'Solar Shield Engineer',
    category: 'SIMULATION',
    points: 300,
    icon: '☀️',
    criteria: 'Resolve the Parker Solar Probe autonomous coronal recovery scenario.',
    description: 'Engineered autonomous sensor reflexes to shield sensitive instruments from 1,400°C heat.'
  }
];

export default function AchievementTrophyRoom({
  unlockedBadges = [],
  onOpenCertificate
}) {
  const unlockedCount = unlockedBadges.length;
  const totalCount = ALL_BADGES.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Trophy Room Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-space-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-space-cyan mb-1 flex items-center gap-1.5 font-bold">
            <Award className="w-4 h-4" />
            <span>NASA Space Academy • Official Trophy Room</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Exploration Badges & Achievements
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Unlock all 8 certified flight badges by completing tiered mission quizzes and interactive flight controller simulations.
          </p>
        </div>

        {/* Certificate CTA */}
        {unlockedCount > 0 && (
          <button
            type="button"
            onClick={onOpenCertificate}
            className="btn-violet focus-ring inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-mono font-bold text-xs hover:scale-105 transition-all shadow-violet-glow shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Academy Certificate</span>
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-space-border">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-300">Academy Badge Completion</span>
          <span className="text-purple-300 font-bold">{unlockedCount} / {totalCount} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2 bg-space-black/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 8-Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ALL_BADGES.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.name);

          return (
            <div
              key={badge.name}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isUnlocked
                  ? 'glass-panel bg-space-navy/90 border-purple-400/60 shadow-violet-glow'
                  : 'bg-space-navy/40 border-space-border/60 opacity-60'
              }`}
            >
              <div>
                {/* Header Icon & Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
                    isUnlocked 
                      ? 'bg-purple-900/40 border-purple-400/50 shadow-sm' 
                      : 'bg-space-black/40 border-white/5 grayscale'
                  }`}>
                    {badge.icon}
                  </div>

                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                {/* Badge Title */}
                <h3 className={`font-heading font-bold text-base mb-1 ${isUnlocked ? 'text-white' : 'text-slate-300'}`}>
                  {badge.name}
                </h3>

                <span className="text-[10.5px] font-mono uppercase text-purple-300 block mb-2 font-bold">
                  +{badge.points} PTS
                </span>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {badge.description}
                </p>
              </div>

              {/* Criteria */}
              <div className="pt-3 border-t border-white/5 text-[10.5px] font-mono text-slate-400">
                <span className="block text-slate-300 mb-0.5">Criteria:</span>
                {badge.criteria}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
