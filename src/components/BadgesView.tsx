import React from 'react';
import { Award, CheckCircle2, Lock, Printer } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { BADGES } from '../data/curriculum';

export const BadgesView: React.FC = () => {
  const { t, language, progress, navigate } = useGalaKidd();
  const completedQuizzes = Object.values(progress.quizRecords).filter((q) => q.completed).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
      <div className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 sm:p-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{t.badges.title}</h1>
        <p className="mt-2 text-sm text-slate-300">{t.badges.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BADGES.map((badge) => {
          const unlocked = progress.earnedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`rounded-2xl border p-5 transition-colors ${
                unlocked
                  ? 'border-amber-400/50 bg-[#131B3A]'
                  : 'border-slate-800 bg-[#0A1020]/80 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <Award className={`h-7 w-7 ${unlocked ? 'text-amber-400' : 'text-slate-600'}`} />
                <span className={`text-xs font-semibold flex items-center gap-1 ${unlocked ? 'text-emerald-300' : 'text-slate-500'}`}>
                  {unlocked ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  {unlocked ? t.badges.earned : t.badges.locked}
                </span>
              </div>
              <h2 className="mt-3 font-display text-base font-bold text-white">{badge.title[language]}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">{badge.description[language]}</p>
            </div>
          );
        })}
      </div>

      {/* Astronaut Certificate Section */}
      <section className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">{t.badges.certificateTitle}</h2>
          <p className="mt-1 text-sm text-slate-300">
            {progress.missionCompleted
              ? `${progress.astronautName} · ${progress.completedActivities.length}/21 · ${completedQuizzes} Quizzes`
              : t.badges.certificateSubtitle}
          </p>
        </div>

        {progress.missionCompleted ? (
          <button
            type="button"
            onClick={() => navigate('activity', 'post_certificate')}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 shrink-0"
          >
            <Printer className="h-4 w-4" />
            <span>{t.badges.printCertificate}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('dashboard')}
            className="rounded-xl border border-indigo-400/35 bg-[#0A1023] px-4 py-2.5 text-xs font-semibold text-sky-300 hover:bg-slate-800 shrink-0"
          >
            {t.dashboard.continueMission}
          </button>
        )}
      </section>
    </div>
  );
};
