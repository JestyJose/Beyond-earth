import React from 'react';
import { Lightbulb, Sparkles, Rocket } from 'lucide-react';

export default function FastFactsCard({ fastFacts = [] }) {
  if (!fastFacts || fastFacts.length === 0) return null;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-10 border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
            Curious Minds & Space Trivia
          </span>
          <h3 className="font-heading font-bold text-xl text-white">
            Cosmic Fast Facts
          </h3>
        </div>
      </div>

      {/* Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fastFacts.map((fact, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-space-navy/80 border border-white/5 hover:border-amber-400/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400/10 text-amber-400 text-xs font-mono font-bold flex items-center justify-center border border-amber-400/20">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {fact}
              </p>
            </div>
            <div className="mt-3 pt-2 flex items-center justify-end text-[10.5px] font-mono text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-400 mr-1" />
              <span>Verified NASA Trivia</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
