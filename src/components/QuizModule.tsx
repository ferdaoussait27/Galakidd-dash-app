import React, { useState } from 'react';
import { Award, CheckCircle2, HelpCircle, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { QUIZ_BANK } from '../data/quizzes';
import { soundEngine } from '../utils/soundEffects';

interface QuizModuleProps {
  quizIds: string[];
  onAllPassed: () => void;
  titleOverride?: string;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ quizIds, onAllPassed, titleOverride }) => {
  const { language, t, progress, recordQuizAnswer } = useGalaKidd();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submittedOption, setSubmittedOption] = useState<number | null>(null);

  const questions = quizIds.map((id) => QUIZ_BANK[id]).filter(Boolean);
  const currentQ = questions[currentIdx];

  if (!currentQ) {
    return null;
  }

  const alreadyPassed = Boolean(progress.quizRecords[currentQ.id]?.completed);
  const isSubmitted = submittedOption !== null;
  const isCorrect = isSubmitted && submittedOption === currentQ.correctIndex;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const right = selectedOption === currentQ.correctIndex;
    setSubmittedOption(selectedOption);
    recordQuizAnswer(currentQ.id, selectedOption, right);
    if (right) {
      soundEngine.playQuizCorrect();
    } else {
      soundEngine.playQuizIncorrect();
    }
  };

  const handleRetry = () => {
    soundEngine.playClick();
    setSubmittedOption(null);
    setSelectedOption(null);
  };

  const handleNext = () => {
    soundEngine.playSuccess();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSubmittedOption(null);
      setSelectedOption(null);
    } else {
      onAllPassed();
    }
  };

  const correctCount = questions.filter((q) => progress.quizRecords[q.id]?.completed).length;

  return (
    <section className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-5 sm:p-6 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-400/15 pb-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-5 w-5 text-sky-400 shrink-0" />
          <h3 className="font-display text-lg font-bold text-white">
            {titleOverride || t.quiz.title}
          </h3>
        </div>
        <div className="text-xs font-mono-tabular text-slate-300">
          {t.quiz.questionOf} {currentIdx + 1} / {questions.length} · {correctCount}/{questions.length}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-base sm:text-lg font-semibold text-white leading-snug">
          {currentQ.question[language]}
        </p>
        <p className="mt-1.5 text-xs text-slate-400">{t.quiz.selectAnswer}</p>

        <div className="mt-4 space-y-2.5">
          {currentQ.options[language].map((opt, idx) => {
            const selected = selectedOption === idx;
            const showCorrectHighlight = isSubmitted && isCorrect && idx === currentQ.correctIndex;
            const showWrongHighlight = isSubmitted && !isCorrect && idx === submittedOption;

            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedOption(idx);
                }}
                className={`w-full rounded-xl border p-3.5 text-start text-sm transition-colors flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  showCorrectHighlight
                    ? 'border-emerald-400 bg-emerald-950/50 text-emerald-100'
                    : showWrongHighlight
                      ? 'border-amber-400 bg-amber-950/40 text-amber-100'
                      : selected
                        ? 'border-sky-400 bg-sky-500/15 text-white'
                        : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-indigo-400/45 hover:bg-[#131D3B]'
                }`}
              >
                <span className="font-mono-tabular text-xs font-semibold mt-0.5 text-sky-400 shrink-0">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="flex-1 leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Educational Feedback Panel */}
        {isSubmitted && (
          <div
            className={`mt-5 rounded-xl border p-4 ${
              isCorrect
                ? 'border-emerald-500/40 bg-emerald-950/35'
                : 'border-amber-500/40 bg-amber-950/35'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 text-sm">
                <p className={`font-display font-bold ${isCorrect ? 'text-emerald-200' : 'text-amber-200'}`}>
                  {isCorrect ? t.quiz.correctTitle : t.quiz.incorrectTitle}
                </p>

                {isCorrect ? (
                  <>
                    <p className="text-slate-100 leading-relaxed">
                      <span className="font-semibold text-emerald-300">{t.quiz.whyCorrect} </span>
                      {currentQ.correctExplanation[language]}
                    </p>
                    <p className="text-xs text-sky-300">
                      <span className="font-semibold">{t.quiz.scienceConcept} </span>
                      {currentQ.scienceConcept[language]}
                    </p>
                  </>
                ) : (
                  <p className="text-slate-100 leading-relaxed">
                    <span className="font-semibold text-amber-300">{t.quiz.whyIncorrect} </span>
                    {currentQ.optionExplanations[language][submittedOption]}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {!isSubmitted ? (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleSubmit}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 disabled:opacity-40"
              >
                {t.quiz.checkAnswer}
              </button>
              {alreadyPassed && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-950/40 px-4 py-2.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/50"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{currentIdx + 1 < questions.length ? t.quiz.nextQuestion : t.quiz.finishQuiz}</span>
                </button>
              )}
            </div>
          ) : isCorrect ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              <Award className="h-4 w-4" />
              <span>{currentIdx + 1 < questions.length ? t.quiz.nextQuestion : t.quiz.finishQuiz}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
            >
              <RotateCcw className="h-4 w-4" />
              <span>{t.quiz.tryAgain}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
