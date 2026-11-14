import React, { useState } from 'react';
import { 
  Sparkles, 
  Rocket, 
  Compass, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  Info,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MissionSimulator({
  simulations = [],
  completedSims = [],
  onCompleteSimulation
}) {
  const [selectedSimSlug, setSelectedSimSlug] = useState(null);
  const [chosenOptionId, setChosenOptionId] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const activeSim = simulations.find(s => s.slug === selectedSimSlug) || null;

  const handleSelectSim = (slug) => {
    setSelectedSimSlug(slug);
    setChosenOptionId(null);
    setEvaluationResult(null);
  };

  const handleConfirmDecision = () => {
    if (!chosenOptionId || !activeSim) return;
    const option = activeSim.options.find(o => o.id === chosenOptionId);
    if (!option) return;

    setEvaluationResult(option);

    if (option.is_optimal) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      onCompleteSimulation({
        sim: activeSim,
        points: activeSim.badge_points || 300,
        badge: activeSim.badge_name
      });
    }
  };

  const handleResetSim = () => {
    setChosenOptionId(null);
    setEvaluationResult(null);
  };

  // 1. Scenario Catalog Grid
  if (!activeSim) {
    return (
      <div className="space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-space-cyan mb-1 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Flight Controller Simulator</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Mission Controller Scenarios
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Step into the shoes of NASA flight directors and roboticists. Face authentic deep-space emergencies, evaluate scientific trade-offs, and guide spacecraft through history-making decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {simulations.map((sim) => {
            const isCompleted = completedSims.includes(sim.slug);

            return (
              <div
                key={sim.slug}
                className="glass-panel p-6 rounded-3xl border border-space-border flex flex-col justify-between hover:border-space-cyan/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                      {sim.destination} • {sim.year}
                    </span>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Resolved</span>
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        +{sim.badge_points} PTS
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-space-cyan transition-colors mb-2">
                    {sim.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {sim.context}
                  </p>

                  <div className="text-[11px] font-mono text-slate-400 mb-6 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-space-violet" />
                    <span>Reward: 🏅 {sim.badge_name}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectSim(sim.slug)}
                  className="btn-violet w-full py-3 rounded-xl font-semibold text-xs font-mono uppercase tracking-wider hover:scale-102 transition-all flex items-center justify-center gap-2 shadow-violet-glow"
                >
                  <span>Assume Flight Control</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Active Scenario Simulation Console
  return (
    <div className="glass-panel p-6 sm:p-10 rounded-3xl max-w-3xl mx-auto border border-space-border animate-fadeIn">
      {/* Console Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-space-border mb-6">
        <button
          onClick={() => setSelectedSimSlug(null)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Scenarios</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-space-cyan font-bold">{activeSim.mission}</span>
          <span className="text-slate-400">• {activeSim.destination} ({activeSim.year})</span>
        </div>
      </div>

      {/* Scenario Title */}
      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-4">
        {activeSim.title}
      </h2>

      {/* Context Briefing */}
      <div className="p-4 rounded-2xl bg-space-navy/80 border border-space-border text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
        <span className="text-space-cyan font-mono font-bold block mb-1 uppercase tracking-wider text-[11px]">
          Mission Telemetry Briefing:
        </span>
        {activeSim.context}
      </div>

      {/* The Dilemma */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 leading-relaxed mb-6">
        <div className="flex items-center gap-2 text-amber-300 font-mono font-bold mb-2 uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4" />
          <span>Flight Control Emergency Dilemma:</span>
        </div>
        <p>{activeSim.dilemma}</p>
      </div>

      {/* Options Selection */}
      {!evaluationResult ? (
        <div className="space-y-4 mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block">
            Select Your Flight Command Decision:
          </span>

          {activeSim.options.map((option) => {
            const isSelected = chosenOptionId === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setChosenOptionId(option.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-purple-900/40 border-purple-400 text-white shadow-violet-glow'
                    : 'bg-space-navy/60 border-space-border hover:border-purple-400/50 text-slate-200'
                }`}
              >
                <div className="font-heading font-bold text-sm sm:text-base text-white mb-1">
                  {option.label}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {option.description}
                </p>
              </button>
            );
          })}

          <button
            disabled={!chosenOptionId}
            onClick={handleConfirmDecision}
            className="btn-violet w-full mt-4 py-3.5 rounded-xl font-semibold text-xs font-mono uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-violet-glow"
          >
            Execute Flight Command Decision
          </button>
        </div>
      ) : (
        /* Evaluation & Consequence Reveal */
        <div className="space-y-6 mb-8 animate-fadeIn">
          <div className={`p-5 rounded-2xl border ${
            evaluationResult.is_optimal
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-heading font-bold text-lg mb-2">
              {evaluationResult.is_optimal ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Mission Success: Optimal Scientific Trajectory!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span>Mission Compromised: High Scientific Risk</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed mb-4">
              {evaluationResult.consequence}
            </p>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs">
              <strong className="text-white font-mono block mb-1">
                Historical Reality (What NASA Actually Did):
              </strong>
              <p className="text-slate-200 leading-relaxed">
                {evaluationResult.historical_fact}
              </p>
            </div>
          </div>

          {/* Educational Takeaway */}
          <div className="p-4 rounded-2xl bg-space-navy border border-space-border text-xs text-slate-300">
            <span className="text-purple-300 font-mono font-bold block mb-1 uppercase tracking-wide">
              Engineering & Physics Takeaway:
            </span>
            <p className="leading-relaxed">{activeSim.educational_takeaway}</p>
          </div>

          {/* Post-Resolution Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-space-border">
            <button
              onClick={handleResetSim}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-space-navy border border-space-border text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-300" />
              <span>Try Alternate Command</span>
            </button>

            <button
              onClick={() => setSelectedSimSlug(null)}
              className="btn-violet inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-mono font-bold text-xs hover:scale-105 transition-all shadow-violet-glow"
            >
              <span>Return to Simulator Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Educational Disclaimer */}
      <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
        <Info className="w-3.5 h-3.5 text-space-cyan shrink-0" />
        <span>
          Educational Simulation: Decisions simulate real aerospace engineering trade-offs and adhere to verified NASA mission records.
        </span>
      </div>
    </div>
  );
}
