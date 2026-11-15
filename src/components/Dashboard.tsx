import React from 'react';
import {
  Award,
  CheckCircle2,
  Compass,
  Lock,
  Play,
  Rocket,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { ACTIVITIES, STAGE_ACTIVITY_MAP } from '../data/curriculum';
import type { ActivityId, StageId } from '../types/galakidd';
import { OptionalAdBanner } from './OptionalAdBanner';

interface DashboardProps {
  onRequestSignUp: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onRequestSignUp }) => {
  const { t, language, user, isGuest, progress, navigate } = useGalaKidd();

  const totalActivities = 21;
  const completedCount = progress.completedActivities.length;
  const overallPercent = Math.round((completedCount / totalActivities) * 100);
  const completedQuizzes = Object.values(progress.quizRecords).filter((q) => q.completed).length;
  const totalQuizzes = 22;

  const currentStage: StageId = progress.unlockedStages.includes('POST_FLIGHT')
    ? 'POST_FLIGHT'
    : progress.unlockedStages.includes('IN_FLIGHT')
      ? 'IN_FLIGHT'
      : 'PRE_FLIGHT';

  const findNextIncompleteActivity = (): ActivityId => {
    const allOrdered: ActivityId[] = [
      ...STAGE_ACTIVITY_MAP.PRE_FLIGHT,
      ...STAGE_ACTIVITY_MAP.IN_FLIGHT,
      ...STAGE_ACTIVITY_MAP.POST_FLIGHT,
    ];
    for (const id of allOrdered) {
      if (!progress.completedActivities.includes(id)) {
        return id;
      }
    }
    return 'post_certificate';
  };

  const nextActivityId = findNextIncompleteActivity();

  const stageCards: {
    id: StageId;
    route: 'stage_preflight' | 'stage_inflight' | 'stage_postflight';
    image: string;
    accentColor: string;
  }[] = [
    {
      id: 'PRE_FLIGHT',
      route: 'stage_preflight',
      image: '/src/assets/images/preflight_training_facility_1794775764546.jpg',
      accentColor: 'text-sky-400',
    },
    {
      id: 'IN_FLIGHT',
      route: 'stage_inflight',
      image: '/src/assets/images/hero_space_station_1794775763108.jpg',
      accentColor: 'text-violet-400',
    },
    {
      id: 'POST_FLIGHT',
      route: 'stage_postflight',
      image: '/src/assets/images/postflight_reentry_capsule_1794775764194.jpg',
      accentColor: 'text-amber-400',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Personalized Hero / Status */}
      <section className="rounded-2xl border border-indigo-400/20 bg-[#10172E]/85 p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src="/src/assets/images/guide_astro_character_1794775762732.jpg"
              alt={progress.astronautName}
              referrerPolicy="no-referrer"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover border border-sky-400/40 shrink-0"
            />
            <div>
              <p className="text-xs font-medium text-sky-300">
                {user ? t.dashboard.accountBadge : t.dashboard.guestBadge}
              </p>
              <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                {t.dashboard.welcomeBack}, {progress.astronautName}
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                {t.dashboard.currentMission}:{' '}
                <span className="font-semibold text-white">
                  {t.dashboard.stages[currentStage].title}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('activity', nextActivityId)}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
            >
              <Play className="h-4 w-4" />
              <span>{t.dashboard.continueMission}</span>
            </button>

            {progress.lastActivityId && progress.lastActivityId !== nextActivityId && (
              <button
                type="button"
                onClick={() => navigate('activity', progress.lastActivityId!)}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/35 bg-[#152042] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1C2A54]"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>
                  {t.dashboard.resumeActivity}: {ACTIVITIES[progress.lastActivityId].title[language]}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => navigate('simulator')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-[#0B1124] px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-white"
            >
              <Compass className="h-4 w-4 text-violet-400" />
              <span>{t.dashboard.exploreSpace}</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Bar + Metrics */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.dashboard.missionProgress}</span>
              <span className="font-mono-tabular font-semibold text-sky-400">{overallPercent}%</span>
            </div>
            <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500 transition-all duration-300"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
            <p className="text-xs text-slate-400">{t.dashboard.completedActivities}</p>
            <p className="mt-1 font-mono-tabular text-2xl font-bold text-white">
              {completedCount} <span className="text-sm font-normal text-slate-400">/ {totalActivities}</span>
            </p>
          </div>

          <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
            <p className="text-xs text-slate-400">{t.dashboard.quizScore}</p>
            <p className="mt-1 font-mono-tabular text-2xl font-bold text-white">
              {completedQuizzes} <span className="text-sm font-normal text-slate-400">/ {totalQuizzes}</span>
            </p>
          </div>

          <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">{t.dashboard.badgesEarned}</p>
              <p className="mt-1 font-mono-tabular text-2xl font-bold text-white">
                {progress.earnedBadges.length} <span className="text-sm font-normal text-slate-400">/ 8</span>
              </p>
            </div>
            <Award className="h-8 w-8 text-amber-400/90" />
          </div>
        </div>
      </section>

      {/* Guest Account Save Callout */}
      {isGuest && !user && (
        <section className="mt-6 rounded-2xl border border-violet-400/30 bg-[#141736]/80 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-base font-bold text-white">{t.dashboard.upgradeGuestTitle}</h2>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl">{t.dashboard.upgradeGuestBody}</p>
          </div>
          <button
            type="button"
            onClick={onRequestSignUp}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-violet-400 shrink-0"
          >
            <UserPlus className="h-4 w-4" />
            <span>{t.dashboard.createAccountBtn}</span>
          </button>
        </section>
      )}

      {/* Interactive Galaxy Mission Map */}
      <section className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">{t.dashboard.galaxyMapTitle}</h2>
            <p className="mt-1 text-sm text-slate-300">{t.dashboard.galaxyMapSubtitle}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {stageCards.map((card, index) => {
            const stageActivities = STAGE_ACTIVITY_MAP[card.id];
            const stageDoneCount = stageActivities.filter((a) =>
              progress.completedActivities.includes(a)
            ).length;
            const stageTotal = stageActivities.length;
            const stageComplete = stageDoneCount === stageTotal;
            const unlocked = progress.unlockedStages.includes(card.id);
            const stageMeta = t.dashboard.stages[card.id];

            return (
              <div
                key={card.id}
                className={`flex flex-col overflow-hidden rounded-2xl border transition-colors ${
                  unlocked
                    ? 'border-indigo-400/30 bg-[#10172E]/90'
                    : 'border-slate-800 bg-[#0B1020]/70 opacity-80'
                }`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={card.image}
                    alt={stageMeta.title}
                    referrerPolicy="no-referrer"
                    className={`h-full w-full object-cover ${!unlocked ? 'grayscale opacity-50' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10172E] via-transparent to-transparent" />
                  <div className="absolute top-3 start-3 rounded-lg bg-[#070B19]/85 px-2.5 py-1 text-xs font-mono-tabular text-slate-200 border border-white/10">
                    0{index + 1} · {stageDoneCount}/{stageTotal}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${card.accentColor}`}>
                      {stageComplete
                        ? t.dashboard.stageCompleted
                        : unlocked
                          ? t.dashboard.stageUnlocked
                          : t.dashboard.stageLocked}
                    </span>
                    {stageComplete ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : !unlocked ? (
                      <Lock className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Rocket className="h-4 w-4 text-sky-400" />
                    )}
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-white">{stageMeta.title}</h3>
                  <p className="text-xs font-medium text-sky-300 mt-0.5">{stageMeta.subtitle}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300 flex-1">{stageMeta.desc}</p>

                  <div className="mt-5">
                    {unlocked ? (
                      <button
                        type="button"
                        onClick={() => navigate(card.route)}
                        className="w-full rounded-xl bg-sky-500/15 border border-sky-400/40 py-2.5 text-sm font-semibold text-sky-200 transition-colors hover:bg-sky-500 hover:text-slate-950"
                      >
                        {t.dashboard.openStage}
                      </button>
                    ) : (
                      <p className="rounded-xl border border-slate-800 bg-[#080C18] px-3 py-2.5 text-xs text-slate-400">
                        {t.dashboard.completePreviousTip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <OptionalAdBanner />
    </div>
  );
};
