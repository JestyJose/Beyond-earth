import React from 'react';
import { 
  GraduationCap, 
  Trophy, 
  Award, 
  Flame, 
  Printer, 
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react';

export function getCadetRank(points = 0) {
  if (points >= 2500) return { title: 'Flight Director', badgeColor: 'text-amber-400 bg-amber-400/15 border-amber-400/30' };
  if (points >= 1500) return { title: 'Chief Flight Scientist', badgeColor: 'text-purple-400 bg-purple-400/15 border-purple-400/30' };
  if (points >= 750) return { title: 'Mission Navigator', badgeColor: 'text-space-cyan bg-space-cyan/15 border-space-cyan/30' };
  if (points >= 300) return { title: 'Flight Specialist', badgeColor: 'text-emerald-400 bg-emerald-400/15 border-emerald-400/30' };
  return { title: 'Cadet 3rd Class', badgeColor: 'text-slate-300 bg-white/10 border-white/20' };
}

export default function AcademyHero({
  userPoints = 0,
  unlockedBadges = [],
  completedQuizzes = [],
  completedSims = [],
  dailyStreak = 0,
  onOpenCertificate
}) {
  const rank = getCadetRank(userPoints);

  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-space-border mb-8 p-6 sm:p-10 bg-gradient-to-br from-space-navy/95 via-space-black/90 to-space-navy/80">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-space-cyan/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-space-violet/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Titles & Rank */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-cyan/15 text-space-cyan border border-space-cyan/30 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>NASA Space Academy • Flight Evaluation Terminal</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Space Academy 2.0
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the robotic flight evaluation terminal. Master planetary science, solve real mission dilemmas as a NASA flight controller, and earn certified exploration badges.
          </p>

          {/* Cadet Rank Badge */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold ${rank.badgeColor}`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Rank: {rank.title}</span>
            </span>

            {dailyStreak > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{dailyStreak} Day Streak!</span>
              </span>
            )}

            {/* Certificate Button */}
            {(userPoints > 0 || unlockedBadges.length > 0) && (
              <button
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-space-navy/90 hover:bg-space-navy border border-space-border text-slate-200 hover:text-space-cyan text-xs font-mono font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-space-cyan" />
                <span>Print Cadet Certificate</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Telemetry Scorecard */}
        <div className="grid grid-cols-2 gap-3 text-xs font-mono self-start lg:self-auto min-w-[280px]">
          {/* Total Points */}
          <div className="p-4 rounded-2xl bg-space-black/50 border border-space-border">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Cadet Score</span>
            </div>
            <div className="text-2xl font-heading font-extrabold text-white text-space-cyan">
              {userPoints} <span className="text-xs font-mono text-slate-400">PTS</span>
            </div>
          </div>

          {/* Badges Earned */}
          <div className="p-4 rounded-2xl bg-space-black/50 border border-space-border">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-space-violet" />
              <span>Badges</span>
            </div>
            <div className="text-2xl font-heading font-extrabold text-white">
              {unlockedBadges.length} <span className="text-xs font-mono text-slate-400">/ 8</span>
            </div>
          </div>

          {/* Quizzes Passed */}
          <div className="p-4 rounded-2xl bg-space-black/50 border border-space-border">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Quizzes Passed</span>
            </div>
            <div className="text-lg font-heading font-bold text-white">
              {completedQuizzes.length} <span className="text-xs font-mono text-slate-400">/ 6</span>
            </div>
          </div>

          {/* Simulations Resolved */}
          <div className="p-4 rounded-2xl bg-space-black/50 border border-space-border">
            <div className="text-slate-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Simulations</span>
            </div>
            <div className="text-lg font-heading font-bold text-white">
              {completedSims.length} <span className="text-xs font-mono text-slate-400">/ 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
