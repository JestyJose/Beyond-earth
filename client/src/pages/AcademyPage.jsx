import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Trophy,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function AcademyPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // User Profile / Badges from LocalStorage
  const [userPoints, setUserPoints] = useState(() => {
    return parseInt(localStorage.getItem('beyond_earth_points') || '0', 10);
  });
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('beyond_earth_badges') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const list = await api.getQuizzes();
        setQuizzes(list || []);
      } catch (err) {
        console.error('Failed to load quizzes:', err);
      } finally {
        setLoading(false);
      }
    }
    loadQuizzes();
  }, []);

  const handleStartQuiz = async (slug) => {
    setLoading(true);
    try {
      const fullQuiz = await api.getQuiz(slug);
      setActiveQuiz(fullQuiz);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setScore(0);
      setQuizCompleted(false);
    } catch (err) {
      console.error('Failed to load quiz details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct_option_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed quiz!
      setQuizCompleted(true);
      const passed = score >= Math.ceil(activeQuiz.questions.length * 0.7);

      if (passed) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas-confetti is not loaded
        }

        const newPoints = userPoints + activeQuiz.badge_points;
        setUserPoints(newPoints);
        localStorage.setItem('beyond_earth_points', newPoints.toString());

        if (!unlockedBadges.includes(activeQuiz.badge_name)) {
          const newBadges = [...unlockedBadges, activeQuiz.badge_name];
          setUnlockedBadges(newBadges);
          localStorage.setItem('beyond_earth_badges', JSON.stringify(newBadges));
        }
      }
    }
  };

  const handleResetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-deep-space">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-space-cyan mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>NASA Space Academy Cadet Terminal</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Space Academy
            </h1>
            <p className="mt-2 text-slate-300 max-w-xl text-sm leading-relaxed">
              Test your knowledge of robotic exploration, planetary geology, and space physics to earn NASA rank badges.
            </p>
          </div>

          {/* User Score Pill */}
          <div className="glass-panel px-5 py-3 rounded-2xl flex items-center gap-4 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-xl bg-space-cyan/20 border border-space-cyan/40 flex items-center justify-center text-space-cyan">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Cadet Score</span>
              <span className="text-xl font-heading font-bold text-white text-space-cyan">
                {userPoints} PTS
              </span>
            </div>
          </div>
        </div>

        {/* Unlocked Badges Bar */}
        {unlockedBadges.length > 0 && (
          <div className="glass-panel p-4 rounded-2xl mb-8 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Award className="w-4 h-4 text-space-violet" />
              Earned Badges:
            </span>
            {unlockedBadges.map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-space-violet/20 text-space-violet border border-space-violet/40 font-semibold"
              >
                🏅 {badge}
              </span>
            ))}
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Calibrating flight exam terminal..." />
        ) : !activeQuiz ? (
          /* Quiz Selection Grid */
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-white">
              Available Mission Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.slug}
                  className="glass-panel p-6 rounded-3xl border border-space-border flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-space-cyan/15 text-space-cyan border border-space-cyan/30">
                        {quiz.difficulty} TIER
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        +{quiz.badge_points} PTS
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-2xl text-white mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {quiz.description}
                    </p>
                    <div className="text-xs font-mono text-slate-400 mb-6">
                      Questions: {quiz.question_count} Missions | Reward: 🏅 {quiz.badge_name}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartQuiz(quiz.slug)}
                    className="w-full py-3 rounded-xl bg-space-cyan text-space-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-cyan/90 transition-all flex items-center justify-center gap-2 shadow-cyan-glow"
                  >
                    <span>Start Flight Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : quizCompleted ? (
          /* Quiz Results View */
          <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-space-cyan/20 border border-space-cyan/40 text-space-cyan flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="font-heading font-extrabold text-3xl text-white mb-2">
              Mission Exam Completed!
            </h2>
            <p className="text-sm text-slate-300 mb-6">
              You scored <strong className="text-space-cyan">{score}</strong> out of{' '}
              <strong className="text-white">{activeQuiz.questions.length}</strong> questions correct.
            </p>

            <div className="p-4 rounded-2xl bg-space-navy/80 border border-space-border mb-8 text-xs text-slate-300">
              {score >= Math.ceil(activeQuiz.questions.length * 0.7) ? (
                <div className="text-emerald-400 font-semibold">
                  🎉 Congratulations Cadet! You passed the evaluation and unlocked the{' '}
                  <strong>{activeQuiz.badge_name}</strong> badge and +{activeQuiz.badge_points} points!
                </div>
              ) : (
                <div className="text-amber-400">
                  Keep studying! Review the Hardware and Science wings to score 70% or higher and claim your badge.
                </div>
              )}
            </div>

            <button
              onClick={handleResetQuiz}
              className="px-6 py-3 rounded-xl bg-space-cyan text-space-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-cyan/90 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Challenge</span>
            </button>
          </div>
        ) : (
          /* Active Question View */
          <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-2xl mx-auto">
            {/* Progress header */}
            <div className="flex items-center justify-between pb-4 border-b border-space-border mb-6 text-xs font-mono">
              <span className="text-space-cyan font-bold">
                Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </span>
              <button
                onClick={handleResetQuiz}
                className="text-slate-400 hover:text-white"
              >
                Exit Exam
              </button>
            </div>

            {/* Question Text */}
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6">
              {activeQuiz.questions[currentQuestionIndex].question_text}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {activeQuiz.questions[currentQuestionIndex].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuiz.questions[currentQuestionIndex].correct_option_index;

                let optionStyle = 'bg-space-navy/80 border-space-border hover:border-slate-500 text-slate-200';
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = 'bg-space-cyan/20 border-space-cyan text-white';
                }
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  } else {
                    optionStyle = 'bg-space-navy/40 border-space-border opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Fun Fact (if submitted) */}
            {isAnswerSubmitted && (
              <div className="space-y-3 mb-6 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-space-navy border border-space-border text-xs leading-relaxed">
                  <strong className="text-space-cyan font-mono block mb-1">
                    Scientific Explanation:
                  </strong>
                  <p className="text-slate-200">
                    {activeQuiz.questions[currentQuestionIndex].explanation}
                  </p>
                </div>

                {activeQuiz.questions[currentQuestionIndex].fun_fact && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2.5 text-amber-200">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300 block mb-0.5">Cosmic Fun Fact:</strong>
                      {activeQuiz.questions[currentQuestionIndex].fun_fact}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            {!isAnswerSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className="w-full py-3 rounded-xl bg-space-cyan text-space-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-cyan/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 rounded-xl bg-space-violet text-white font-semibold text-xs font-mono uppercase tracking-wider hover:bg-space-violet/90 transition-all flex items-center justify-center gap-2"
              >
                <span>
                  {currentQuestionIndex + 1 < activeQuiz.questions.length ? 'Next Question' : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
