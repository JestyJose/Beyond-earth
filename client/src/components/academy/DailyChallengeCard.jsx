import React, { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Award, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DailyChallengeCard({
  dailyData,
  hasCompletedToday,
  streak = 0,
  onCompleteDaily
}) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!dailyData || !dailyData.question) {
    return (
      <div className="glass-panel p-8 rounded-3xl text-center text-slate-400 font-mono text-xs">
        Loading today's NASA flight challenge...
      </div>
    );
  }

  const { date, question, badge_points = 50 } = dailyData;

  const handleSubmit = () => {
    if (selectedIdx === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedIdx === question.correct_option_index;
    if (isCorrect) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }

    onCompleteDaily({
      date,
      isCorrect,
      points: isCorrect ? badge_points : 10 // small consolation points for effort
    });
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto border border-space-border relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-space-border mb-6">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs border border-amber-400/30">
            <Calendar className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              Daily Flight Evaluation
            </span>
            <span className="text-xs font-mono text-slate-400">{date}</span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>{streak} Day Streak</span>
        </div>
      </div>

      {hasCompletedToday && !isSubmitted ? (
        /* Already Completed Banner */
        <div className="p-6 rounded-2xl bg-space-navy/80 border border-space-border text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-white">
            Daily Challenge Completed!
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            You have already recorded today’s flight evaluation telemetry. Return tomorrow to extend your daily streak and earn more cadet points!
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-space-cyan" />
            <span>Next evaluation resets at 00:00 UTC</span>
          </div>
        </div>
      ) : (
        /* Active Daily Question */
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-3">
            <span className="text-space-cyan">Topic: {question.quiz_title}</span>
            <span className="text-amber-400 font-bold">+{badge_points} Bonus PTS</span>
          </div>

          <h3 className="font-heading font-bold text-lg sm:text-xl text-white mb-5 leading-snug">
            {question.question_text}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt, idx) => {
              const isSelected = selectedIdx === idx;
              const isCorrect = idx === question.correct_option_index;

              let style = 'bg-space-navy/70 border-space-border hover:border-purple-400/50 text-slate-200';
              if (isSelected && !isSubmitted) {
                style = 'bg-purple-900/40 border-purple-400 text-white shadow-violet-glow';
              }
              if (isSubmitted) {
                if (isCorrect) {
                  style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                } else {
                  style = 'bg-space-navy/40 border-space-border opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isSubmitted && (
            <div className="space-y-3 mb-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-space-navy border border-space-border text-xs leading-relaxed">
                <strong className="text-space-cyan font-mono block mb-1">
                  Scientific Explanation:
                </strong>
                <p className="text-slate-200">{question.explanation}</p>
              </div>

              {question.fun_fact && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2.5 text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Cosmic Fun Fact:</strong>
                    {question.fun_fact}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted ? (
            <button
              disabled={selectedIdx === null}
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-amber-400 text-space-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md font-bold"
            >
              Lock In Daily Answer
            </button>
          ) : (
            <div className="text-center text-xs font-mono text-emerald-400 pt-2 font-bold">
              ✓ Telemetry recorded! Daily streak updated.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
