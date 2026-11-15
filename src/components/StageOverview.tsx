import React from 'react';
import { ArrowLeft, CheckCircle2, Circle, Play } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { ACTIVITIES, STAGE_ACTIVITY_MAP } from '../data/curriculum';
import type { StageId } from '../types/galakidd';

interface StageOverviewProps {
  stage: StageId;
}

export const StageOverview: React.FC<StageOverviewProps> = ({ stage }) => {
  const { t, language, progress, navigate } = useGalaKidd();
  const stageMeta = t.dashboard.stages[stage];
  const activityIds = STAGE_ACTIVITY_MAP[stage];
  const completedCount = activityIds.filter((id) => progress.completedActivities.includes(id)).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={() => navigate('dashboard')}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        <span>{t.nav.dashboard}</span>
      </button>

      <div className="mt-5 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-400">{stageMeta.subtitle}</p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              {stageMeta.title}
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">{stageMeta.desc}</p>
          </div>
          <div className="rounded-xl border border-indigo-400/20 bg-[#0A1023] px-4 py-3 text-center">
            <p className="text-xs text-slate-400">{t.dashboard.completedActivities}</p>
            <p className="font-mono-tabular text-2xl font-bold text-sky-400">
              {completedCount}/{activityIds.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {activityIds.map((actId) => {
          const act = ACTIVITIES[actId];
          const isDone = progress.completedActivities.includes(actId);

          return (
            <button
              key={actId}
              type="button"
              onClick={() => navigate('activity', actId)}
              className="w-full rounded-2xl border border-indigo-400/20 bg-[#10172E]/85 p-5 text-start transition-colors hover:border-sky-400/50 hover:bg-[#152042] flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono-tabular text-sky-400">0{act.order}</span>
                    <span aria-hidden="true">·</span>
                    <span>{isDone ? t.activityView.completedLabel : t.activityView.inProgressLabel}</span>
                  </div>
                  <h2 className="mt-1 font-display text-lg font-bold text-white">{act.title[language]}</h2>
                  <p className="mt-1 text-sm text-slate-300">{act.summary[language]}</p>
                </div>
              </div>

              <div className="shrink-0 rounded-xl bg-sky-500/15 p-3 text-sky-300">
                <Play className="h-4 w-4 rtl:rotate-180" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
