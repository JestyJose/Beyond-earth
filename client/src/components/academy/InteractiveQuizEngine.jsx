import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Award,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveQuizEngine({ quiz, onComplete, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answersRecord, setAnswersRecord] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const currentQ = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const passingScore = Math.ceil(totalQuestions * 0.7);

  const handleSelect = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = selectedOption === currentQ.correct_option_index;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) {
      setScore(newScore);
    }

    setAnswersRecord(prev => [
      ...prev,
      {
        questionIndex: currentIndex,
        question: currentQ,
        selectedOption,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // Quiz finished
      setIsFinished(true);
      const passed = score >= passingScore;

      if (passed) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas-confetti is not loaded
        }
      }

      onComplete({
        quiz,
        score,
        totalQuestions,
        passed,
        answers: answersRecord
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswersRecord([]);
    setIsFinished(false);
    setShowReview(false);
  };

  // Results View
  if (isFinished) {
    const passed = score >= passingScore;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="glass-panel p-6 sm:p-10 rounded-3xl max-w-2xl mx-auto border border-space-border animate-fadeIn">
        {/* Header Icon */}
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
          passed ? 'bg-amber-400/20 text-amber-400 border-amber-400/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
        }`}>
          {passed ? <Trophy className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
        </div>

        {/* Title */}
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white text-center mb-2">
          {passed ? 'Mission Evaluation Passed!' : 'Flight Evaluation Incomplete'}
        </h2>

        {/* Score Telemetry */}
        <div className="text-center mb-6">
          <p className="text-slate-300 text-sm">
            You achieved an accuracy of <strong className="text-space-cyan">{percentage}%</strong> ({score} / {totalQuestions} correct).
          </p>
        </div>

        {/* Result Callout Banner */}
        <div className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed ${
          passed 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
        }`}>
          {passed ? (
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 font-bold block mb-1">
                  🎉 Certified Cadet Achievement!
                </strong>
                You earned the <strong>{quiz.badge_name}</strong> badge and <strong>+{quiz.badge_points} Cadet Points</strong>! Your flight telemetry has been officially stamped into your record.
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-bold block mb-1">
                  Recommended Recalibration:
                </strong>
                Cadets need 70% or higher to earn the badge. Review your answers below, inspect the NASA Hardware Chronicles, and take the flight exam again!
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setShowReview(!showReview)}
            className="px-4 py-2.5 rounded-xl bg-space-navy border border-space-border hover:border-space-cyan/40 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-space-cyan" />
            <span>{showReview ? 'Hide Question Review' : 'Review All Questions & Explanations'}</span>
            {showReview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2.5 rounded-xl bg-space-cyan/20 text-space-cyan hover:bg-space-cyan/30 border border-space-cyan/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Exam</span>
          </button>

          <button
            onClick={onExit}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            Back to Catalog
          </button>
        </div>

        {/* Post-Exam Question Review Drawer */}
        {showReview && (
          <div className="pt-6 border-t border-space-border space-y-6 animate-fadeIn">
            <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-space-cyan" />
              <span>Comprehensive Scientific Review</span>
            </h4>

            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const recorded = answersRecord[idx];
                const wasCorrect = recorded?.isCorrect;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      wasCorrect
                        ? 'bg-space-navy/70 border-emerald-500/30'
                        : 'bg-space-navy/70 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-slate-400">
                        Question #{idx + 1}
                      </span>
                      {wasCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono font-bold">
                          <CheckCircle className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-mono font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Missed
                        </span>
                      )}
                    </div>

                    <h5 className="font-heading font-bold text-sm text-white mb-2">
                      {q.question_text}
                    </h5>

                    <div className="space-y-1 mb-3 text-xs font-mono">
                      <div className="text-emerald-400">
                        ✓ Correct Answer: {q.options[q.correct_option_index]}
                      </div>
                      {!wasCorrect && recorded?.selectedOption !== undefined && (
                        <div className="text-rose-400">
                          ✗ Your Choice: {q.options[recorded.selectedOption]}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-space-black/50 border border-white/5 text-slate-300">
                      <strong className="text-space-cyan font-mono block mb-1">
                        Scientific Explanation:
                      </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Active Question View
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto border border-space-border animate-fadeIn">
      {/* Progress Bar & Header */}
      <div className="flex items-center justify-between pb-4 border-b border-space-border mb-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-space-cyan font-bold">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-400">• {quiz.difficulty}</span>
        </div>

        <button
          onClick={onExit}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Exit Exam
        </button>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full h-1.5 bg-space-black/60 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-space-cyan transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6 leading-snug">
        {currentQ.question_text}
      </h3>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {currentQ.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQ.correct_option_index;

          let optionStyle = 'bg-space-navy/80 border-space-border hover:border-slate-500 text-slate-200';
          if (isSelected && !isSubmitted) {
            optionStyle = 'bg-space-cyan/20 border-space-cyan text-white shadow-cyan-glow';
          }
          if (isSubmitted) {
            if (isCorrect) {
              optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
            } else {
              optionStyle = 'bg-space-navy/40 border-space-border opacity-50';
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelect(idx)}
              className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${optionStyle}`}
            >
              <span>{option}</span>
              {isSubmitted && isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Immediate Explanation & Fun Fact Banner (revealed after submission) */}
      {isSubmitted && (
        <div className="space-y-3 mb-6 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-space-navy border border-space-border text-xs leading-relaxed">
            <strong className="text-space-cyan font-mono block mb-1">
              Scientific Explanation:
            </strong>
            <p className="text-slate-200">
              {currentQ.explanation}
            </p>
          </div>

          {currentQ.fun_fact && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2.5 text-amber-200">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 block mb-0.5">Cosmic Fun Fact:</strong>
                {currentQ.fun_fact}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {!isSubmitted ? (
        <button
          disabled={selectedOption === null}
          onClick={handleSubmitAnswer}
          className="w-full py-3.5 rounded-xl bg-space-cyan text-space-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-cyan/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-cyan-glow"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-xl bg-space-violet text-white font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-violet/90 transition-all flex items-center justify-center gap-2"
        >
          <span>
            {currentIndex + 1 < totalQuestions ? 'Next Flight Question' : 'View Flight Evaluation'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
