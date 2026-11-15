import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink, Info } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { ACTIVITIES, STAGE_ACTIVITY_MAP } from '../data/curriculum';
import type { ActivityId } from '../types/galakidd';
import { PreFlightSimulations } from './simulations/PreFlightSimulations';
import { InFlightSimulations } from './simulations/InFlightSimulations';
import { PostFlightSimulations } from './simulations/PostFlightSimulations';
import { QuizModule } from './QuizModule';
import { CommanderNova } from './CommanderNova';
import { soundEngine } from '../utils/soundEffects';

const ACTIVITY_IMAGES: Record<ActivityId, string> = {
  pre_suit: '/src/assets/images/eva_spacesuit_layers_1794776374824.jpg',
  pre_training: '/src/assets/images/preflight_training_facility_1794775764546.jpg',
  pre_food: '/src/assets/images/space_food_meals_1794776376384.jpg',
  pre_oxygen_water: '/src/assets/images/iss_life_support_1794776382415.jpg',
  pre_safety: '/src/assets/images/preflight_training_facility_1794775764546.jpg',
  pre_checklist: '/src/assets/images/hero_space_station_1794775763108.jpg',
  in_sleep: '/src/assets/images/iss_crew_quarters_1794776376725.jpg',
  in_eat_drink: '/src/assets/images/space_food_meals_1794776376384.jpg',
  in_exercise: '/src/assets/images/iss_exercise_gym_1794776375896.jpg',
  in_oxygen: '/src/assets/images/iss_life_support_1794776382415.jpg',
  in_water: '/src/assets/images/iss_life_support_1794776382415.jpg',
  in_waste: '/src/assets/images/hero_space_station_1794775763108.jpg',
  in_comms: '/src/assets/images/mars_deep_space_comms_1794776375220.jpg',
  in_earth: '/src/assets/images/earth_observation_view_1794775764111.jpg',
  in_emergency: '/src/assets/images/hero_space_station_1794775763108.jpg',
  post_return_prep: '/src/assets/images/postflight_reentry_capsule_1794775764194.jpg',
  post_landing_prep: '/src/assets/images/postflight_reentry_capsule_1794775764194.jpg',
  post_landing_sim: '/src/assets/images/postflight_reentry_capsule_1794775764194.jpg',
  post_gravity: '/src/assets/images/guide_astro_character_1794775762732.jpg',
  post_evaluation: '/src/assets/images/preflight_training_facility_1794775764546.jpg',
  post_certificate: '/src/assets/images/guide_astro_character_1794775762732.jpg',
};

interface ActivityViewProps {
  activityId: ActivityId;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ activityId }) => {
  const { t, language, progress, completeActivity, navigate } = useGalaKidd();
  const meta = ACTIVITIES[activityId];
  const [simCompleted, setSimCompleted] = useState<boolean>(() =>
    progress.completedActivities.includes(activityId)
  );

  if (!meta) return null;

  const isDone = progress.completedActivities.includes(activityId);
  const stageRoute =
    meta.stage === 'PRE_FLIGHT'
      ? 'stage_preflight'
      : meta.stage === 'IN_FLIGHT'
        ? 'stage_inflight'
        : 'stage_postflight';

  const allOrdered: ActivityId[] = [
    ...STAGE_ACTIVITY_MAP.PRE_FLIGHT,
    ...STAGE_ACTIVITY_MAP.IN_FLIGHT,
    ...STAGE_ACTIVITY_MAP.POST_FLIGHT,
  ];
  const currentIdx = allOrdered.indexOf(activityId);
  const nextActivity = currentIdx >= 0 && currentIdx + 1 < allOrdered.length ? allOrdered[currentIdx + 1] : null;

  const handleQuizPassed = () => {
    soundEngine.playSuccess();
    completeActivity(activityId);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-28 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            navigate(stageRoute);
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t.activityView.backToStage}</span>
        </button>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
            isDone ? 'text-emerald-300' : 'text-sky-300'
          }`}
        >
          {isDone && <CheckCircle2 className="h-4 w-4" />}
          <span>{isDone ? t.activityView.completedLabel : t.activityView.inProgressLabel}</span>
        </span>
      </div>

      {/* Activity Header with Bespoke Illustration */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-indigo-400/25 bg-[#10172E]/90">
        <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch">
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-center">
            <p className="font-mono-tabular text-xs font-semibold text-sky-400">
              {t.dashboard.stages[meta.stage].title} · 0{meta.order}
            </p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
              {meta.title[language]}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{meta.summary[language]}</p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Info className="h-3.5 w-3.5 text-sky-400 shrink-0" />
              <span>{t.activityView.simulationNotice}</span>
            </div>
          </div>
          <div className="md:col-span-5 relative min-h-[180px] bg-[#070B19]">
            <img
              src={ACTIVITY_IMAGES[activityId]}
              alt={meta.title[language]}
              referrerPolicy="no-referrer"
              className="h-48 w-full object-cover md:h-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10172E]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-[#10172E]/60 md:via-transparent" />
          </div>
        </div>
      </div>

      {/* Step 1: Interactive Simulation */}
      <section className="mt-6 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-indigo-400/15 pb-3.5 mb-5">
          <h2 className="font-display text-lg font-bold text-white">{t.activityView.stepSimulation}</h2>
          {simCompleted && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{t.activityView.completedLabel}</span>
            </span>
          )}
        </div>

        {meta.stage === 'PRE_FLIGHT' && (
          <PreFlightSimulations
            activityId={activityId}
            onSimComplete={() => {
              soundEngine.playSuccess();
              setSimCompleted(true);
            }}
          />
        )}
        {meta.stage === 'IN_FLIGHT' && (
          <InFlightSimulations
            activityId={activityId}
            onSimComplete={() => {
              soundEngine.playSuccess();
              setSimCompleted(true);
            }}
          />
        )}
        {meta.stage === 'POST_FLIGHT' && (
          <PostFlightSimulations
            activityId={activityId}
            onSimComplete={() => {
              soundEngine.playSuccess();
              setSimCompleted(true);
            }}
          />
        )}
      </section>

      {/* Step 2: Integrated Science Quiz */}
      <div className="mt-6">
        <QuizModule
          quizIds={meta.quizIds}
          onAllPassed={handleQuizPassed}
          titleOverride={activityId === 'post_evaluation' ? t.quiz.finalQuizTitle : undefined}
        />
      </div>

      {/* NASA Scientific Fact & Source Attribution */}
      <section className="mt-6 rounded-2xl border border-indigo-400/20 bg-[#0B1226]/90 p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 h-5 w-5 text-sky-400 shrink-0" />
          <div className="flex-1">
            <p className="text-xs font-semibold text-sky-300">{t.activityView.nasaSourceLabel}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-200">{meta.scienceFact[language]}</p>
            <a
              href={meta.nasaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:underline"
            >
              <span>{meta.nasaSource}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {!isDone ? (
          <button
            type="button"
            onClick={() => completeActivity(activityId)}
            className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-5 py-2.5 text-xs font-semibold text-sky-200 hover:bg-sky-500 hover:text-slate-950"
          >
            {t.activityView.markComplete}
          </button>
        ) : (
          <div />
        )}

        {nextActivity && (
          <button
            type="button"
            onClick={() => {
              const nextMeta = ACTIVITIES[nextActivity];
              if (
                nextMeta.stage === meta.stage ||
                progress.unlockedStages.includes(nextMeta.stage) ||
                isDone
              ) {
                if (!isDone) completeActivity(activityId);
                navigate('activity', nextActivity);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400"
          >
            <span>{t.activityView.nextActivity}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        )}
      </div>

      <CommanderNova message={meta.novaTip[language]} />
    </div>
  );
};
