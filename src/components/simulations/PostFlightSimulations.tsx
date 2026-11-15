import React, { useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Flame,
  Gauge,
  HeartPulse,
  Printer,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useGalaKidd } from '../../context/GalaKiddContext';
import { BADGES } from '../../data/curriculum';
import type { ActivityId, Language } from '../../types/galakidd';
import { soundEngine } from '../../utils/soundEffects';

interface SimProps {
  activityId: ActivityId;
  onSimComplete: () => void;
}

const L = (lang: Language, en: string, ar: string, fr: string) =>
  lang === 'ar' ? ar : lang === 'fr' ? fr : en;

export const PostFlightSimulations: React.FC<SimProps> = ({ activityId, onSimComplete }) => {
  const { language, progress } = useGalaKidd();

  // 1. Return prep
  const [stowed, setStowed] = useState<string[]>([]);

  // 2. Landing prep timeline
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [visitedPhases, setVisitedPhases] = useState<number[]>([0]);

  // 3. Animated Landing Sim
  const [descentRunning, setDescentRunning] = useState(false);
  const [altitudeKm, setAltitudeKm] = useState(120);
  const [chutesDeployed, setChutesDeployed] = useState(false);
  const [landedSafely, setLandedSafely] = useState(false);

  // 4. Gravity readjustment
  const [recoveryDay, setRecoveryDay] = useState(1);

  // 5. Post-flight evaluation
  const [reviewedMetrics, setReviewedMetrics] = useState<string[]>([]);

  useEffect(() => {
    if (!descentRunning || landedSafely) return;
    const timer = window.setInterval(() => {
      setAltitudeKm((prev) => {
        const drop = chutesDeployed ? 2 : 6;
        const next = Math.max(0, prev - drop);
        if (next === 0) {
          setDescentRunning(false);
          if (chutesDeployed) {
            soundEngine.playSplashdown();
            setLandedSafely(true);
            onSimComplete();
          } else {
            soundEngine.playAlertPing();
          }
        }
        return next;
      });
    }, 350);
    return () => window.clearInterval(timer);
  }, [descentRunning, chutesDeployed, landedSafely, onSimComplete]);

  // 1. POST_RETURN_PREP
  if (activityId === 'post_return_prep') {
    const tasks = [
      { id: 'samples', label: L(language, 'Stow Science Samples in Cold Locker', 'حفظ العينات العلمية في الحافظة المبردة', 'Ranger les échantillons au frais') },
      { id: 'cameras', label: L(language, 'Strap Loose Cameras & Tablets', 'تثبيت الكاميرات والأجهزة اللوحية', 'Sangler caméras et tablettes') },
      { id: 'hatch', label: L(language, 'Run Hatch Seal Pressure Test', 'اختبار ضغط إغلاق باب الكبسولة', 'Tester l’étanchéité de l’écoutille') },
      { id: 'thrusters', label: L(language, 'Verify Deorbit Thruster Propellant', 'فحص وقود محركات الخروج من المدار', 'Vérifier les propulseurs de freinage') },
    ];

    const toggle = (id: string) => {
      const next = stowed.includes(id) ? stowed : [...stowed, id];
      setStowed(next);
      if (next.length === tasks.length) onSimComplete();
    };

    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tasks.map((task) => {
          const done = stowed.includes(task.id);
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => toggle(task.id)}
              className={`rounded-xl border p-4 text-start flex items-center justify-between gap-3 transition-colors ${
                done ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100' : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400'
              }`}
            >
              <span className="text-xs font-semibold">{task.label}</span>
              <CheckCircle2 className={`h-4 w-4 shrink-0 ${done ? 'text-emerald-400' : 'text-slate-600'}`} />
            </button>
          );
        })}
      </div>
    );
  }

  // 2. POST_LANDING_PREP
  if (activityId === 'post_landing_prep') {
    const phases = [
      {
        title: L(language, '1. Deorbit Burn', '١. احتراق الخروج من المدار', '1. Poussée de désorbitation'),
        detail: L(language, 'Thrusters fire opposite to flight direction to slow the capsule slightly so gravity curves it toward Earth.', 'تشتعل المحركات بعكس اتجاه الحركة لتبطئة الكبسولة قليلاً فتبدأ بالهبوط نحو الأرض.', 'Les moteurs freinent légèrement la capsule pour entamer sa descente.'),
      },
      {
        title: L(language, '2. Heat Shield Plasma (1,650°C)', '٢. بلازما الدرع الحراري (١٦٥٠°م)', '2. Bouclier thermique (1 650 °C)'),
        detail: L(language, 'Air friction slows the capsule from 28,000 km/h while the ablative heat shield keeps the crew cabin cool.', 'يبطئ احتكاك الهواء الكبسولة بينما يحمي الدرع الحراري المقصورة.', 'L’air freine la capsule et le bouclier ablatif protège l’équipage.'),
      },
      {
        title: L(language, '3. Drogue & Main Parachutes', '٣. المظلات التوجيهية والرئيسية', '3. Parachutes extracteurs et principaux'),
        detail: L(language, 'Drogue chutes steady the descent, then three giant striped main chutes open for gentle descent.', 'تثبّت مظلات التوجيه الهبوط ثم تفتح المظلات الرئيسية الثلاث الكبيرة.', 'Les parachutes extracteurs stabilisent puis les 3 grands s’ouvrent.'),
      },
      {
        title: L(language, '4. Ocean Splashdown & Recovery', '٤. الهبوط في المحيط والإنقاذ', '4. Amerrissage et récupération'),
        detail: L(language, 'Recovery boats lift the floating capsule safely onto deck and welcome the astronauts home!', 'تنتشل سفن الإنقاذ الكبسولة بأمان وتستقبل رواد الفضاء العائدين!', 'Les navires récupèrent la capsule et accueillent les astronautes !'),
      },
    ];

    const pickPhase = (i: number) => {
      setPhaseIdx(i);
      const next = Array.from(new Set([...visitedPhases, i]));
      setVisitedPhases(next);
      if (next.length >= 4) onSimComplete();
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {phases.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => pickPhase(idx)}
              className={`rounded-xl border p-3 text-start text-xs font-semibold transition-colors ${
                phaseIdx === idx
                  ? 'border-sky-400 bg-sky-500/20 text-white'
                  : visitedPhases.includes(idx)
                    ? 'border-emerald-400/50 bg-emerald-950/25 text-emerald-100'
                    : 'border-indigo-400/20 bg-[#0B1124] text-slate-300'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
          <h4 className="font-display text-base font-bold text-white">{phases[phaseIdx].title}</h4>
          <p className="mt-1.5 text-sm text-slate-200 leading-relaxed">{phases[phaseIdx].detail}</p>
        </div>
      </div>
    );
  }

  // 3. POST_LANDING_SIM
  if (activityId === 'post_landing_sim') {
    const heatTemp = altitudeKm > 35 && altitudeKm < 90 ? 1650 : altitudeKm >= 90 ? 120 : 65;
    const inChuteZone = altitudeKm > 0 && altitudeKm <= 18;
    const failedLanding = !descentRunning && altitudeKm === 0 && !landedSafely;

    const startDescent = () => {
      setAltitudeKm(120);
      setChutesDeployed(false);
      setLandedSafely(false);
      setDescentRunning(true);
    };

    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-5 overflow-hidden rounded-xl border border-indigo-400/25 bg-[#070B19]">
          <img
            src="/src/assets/images/postflight_reentry_capsule_1794775764194.jpg"
            alt="Return capsule under three parachutes"
            referrerPolicy="no-referrer"
            className="h-56 w-full object-cover sm:h-64"
          />
        </div>
        <div className="lg:col-span-7 rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-indigo-400/15 bg-[#070B19] p-3">
              <p className="text-[11px] text-slate-400">{L(language, 'Altitude', 'الارتفاع', 'Altitude')}</p>
              <p className="font-mono-tabular text-xl font-bold text-sky-400">{altitudeKm} km</p>
            </div>
            <div className="rounded-lg border border-indigo-400/15 bg-[#070B19] p-3">
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-400" />
                {L(language, 'Heat Shield', 'الدرع الحراري', 'Bouclier')}
              </p>
              <p className={`font-mono-tabular text-xl font-bold ${heatTemp > 1000 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {heatTemp}°C
              </p>
            </div>
            <div className="rounded-lg border border-indigo-400/15 bg-[#070B19] p-3">
              <p className="text-[11px] text-slate-400">{L(language, 'Parachutes', 'المظلات', 'Parachutes')}</p>
              <p className="font-mono-tabular text-sm font-bold text-white mt-1">
                {chutesDeployed ? 'OPEN' : 'STOWED'}
              </p>
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-sky-400 transition-all duration-300"
              style={{ width: `${Math.round(((120 - altitudeKm) / 120) * 100)}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!descentRunning && (
              <button
                type="button"
                onClick={startDescent}
                className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
              >
                {landedSafely || failedLanding
                  ? L(language, 'Run Landing Simulation Again', 'إعادة محاكاة الهبوط', 'Rejouer la descente')
                  : L(language, 'Begin Re-Entry Descent', 'بدء الهبوط المداري', 'Démarrer la rentrée')}
              </button>
            )}

            <button
              type="button"
              disabled={!descentRunning || !inChuteZone || chutesDeployed}
              onClick={() => {
                soundEngine.playClick();
                setChutesDeployed(true);
              }}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:opacity-40"
            >
              {L(
                language,
                inChuteZone ? 'Deploy Main Parachutes Now!' : 'Wait for ≤ 18 km Altitude',
                inChuteZone ? 'افتح المظلات الرئيسية الآن!' : 'انتظر الارتفاع ≤ ١٨ كم',
                inChuteZone ? 'Ouvrir les parachutes maintenant !' : 'Attendre ≤ 18 km d’altitude'
              )}
            </button>
          </div>

          {landedSafely && (
            <p className="text-xs font-semibold text-emerald-300">
              ● {L(language, 'Gentle ocean splashdown achieved! Welcome back to Earth.', 'هبوط آمن وهادئ على المحيط! أهلاً بعودتك للأرض.', 'Amerrissage réussi en douceur ! Bienvenue sur Terre.')}
            </p>
          )}
          {failedLanding && (
            <p className="text-xs font-semibold text-amber-300">
              ▲ {L(language, 'Parachutes were not deployed in time—click Run Again and open them under 18 km!', 'لم تُفتح المظلات في الوقت المناسب — أعد المحاولة وافتحها تحت ١٨ كم!', 'Parachutes non ouverts à temps — recommence sous 18 km !')}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 4. POST_GRAVITY
  if (activityId === 'post_gravity') {
    const balanceScore = Math.min(100, 35 + recoveryDay * 5);
    const legStrength = Math.min(100, 50 + recoveryDay * 4);

    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-white">
              {L(language, 'Recovery Timeline on Earth (1g Gravity)', 'جدول التعافي على الأرض (جاذبية 1g)', 'Réadaptation sur Terre (gravité 1g)')}
            </span>
            <span className="font-mono-tabular font-bold text-sky-400">
              {L(language, `Day ${recoveryDay} / 14`, `اليوم ${recoveryDay} / ١٤`, `Jour ${recoveryDay} / 14`)}
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={14}
            value={recoveryDay}
            onChange={(e) => {
              const d = Number(e.target.value);
              setRecoveryDay(d);
              if (d >= 10) onSimComplete();
            }}
            className="w-full accent-sky-400"
          />

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-indigo-400/15 bg-[#070B19] p-3">
              <p className="text-xs text-slate-400">{L(language, 'Inner-Ear Balance', 'توازن الأذن الداخلية', 'Équilibre vestibulaire')}</p>
              <p className="font-mono-tabular text-xl font-bold text-sky-400">{balanceScore}%</p>
            </div>
            <div className="rounded-lg border border-indigo-400/15 bg-[#070B19] p-3">
              <p className="text-xs text-slate-400">{L(language, 'Posture & Leg Stability', 'ثبات الساقين والقوة', 'Force musculaire')}</p>
              <p className="font-mono-tabular text-xl font-bold text-emerald-400">{legStrength}%</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-300">
            {recoveryDay <= 3
              ? L(language, 'Day 1–3: Walking feels heavy and wobbly while your brain recalibrates from 0g to 1g.', 'الأيام ١–٣: يشعر الرائد بثقل ودوار خفيف بينما يتأقلم الدماغ مع جاذبية الأرض.', 'Jours 1–3 : marcher paraît lourd le temps que le cerveau se réadapte à 1g.')
              : L(language, 'Day 4+: Daily physical therapy restores smooth balance, blood pressure, and strength!', 'اليوم ٤+: العلاج الطبيعي اليومي يستعيد التوازن والقوة بالكامل!', 'Jour 4+ : la rééducation restaure pleinement équilibre et force !')}
          </p>
        </div>
      </div>
    );
  }

  // 5. POST_EVALUATION
  if (activityId === 'post_evaluation') {
    const metrics = [
      {
        id: 'cardio',
        title: L(language, 'Heart & Blood Pressure Check', 'فحص القلب وضغط الدم', 'Bilan cardiaque'),
        result: L(language, 'Healthy cardiovascular adaptation recorded', 'تكيف قلبي سليم مع الجاذبية', 'Adaptation cardiaque saine'),
      },
      {
        id: 'vision',
        title: L(language, 'Optic & Vision Scan', 'فحص العيون والبصر', 'Examen de la vision'),
        result: L(language, 'Fluid pressure normalized back at 1g', 'عاد ضغط السوائل إلى وضعه الطبيعي', 'Pression oculaire normalisée'),
      },
      {
        id: 'science',
        title: L(language, 'Orbital Science Logbook', 'سجل التجارب المدارية', 'Journal scientifique orbital'),
        result: L(language, 'Earth photos & microgravity data shared with NASA researchers', 'تمت مشاركة صور الأرض وبيانات التجارب مع الباحثين', 'Données partagées avec les chercheurs'),
      },
    ];

    const review = (id: string) => {
      const next = reviewedMetrics.includes(id) ? reviewedMetrics : [...reviewedMetrics, id];
      setReviewedMetrics(next);
      if (next.length === metrics.length) onSimComplete();
    };

    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metrics.map((m) => {
          const done = reviewedMetrics.includes(m.id);
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => review(m.id)}
              className={`rounded-xl border p-4 text-start transition-colors ${
                done ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
              }`}
            >
              <HeartPulse className="h-4 w-4 text-sky-400 mb-2" />
              <p className="font-display text-sm font-bold text-white">{m.title}</p>
              <p className="mt-1.5 text-xs text-slate-300">{m.result}</p>
            </button>
          );
        })}
      </div>
    );
  }

  // 6. POST_CERTIFICATE
  const earnedCount = progress.earnedBadges.length;
  const quizCorrect = Object.values(progress.quizRecords).filter((q) => q.completed).length;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-[#0F1836] via-[#131B3A] to-[#0A1024] p-6 sm:p-8 text-center shadow-2xl">
        <Award className="mx-auto h-12 w-12 text-amber-400" />
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-sky-300">
          GalaKidd Space Academy
        </p>
        <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
          {L(language, 'Official Junior Astronaut Certificate', 'شهادة رائد الفضاء الصغير الرسمية', 'Diplôme Officiel de Jeune Astronaute')}
        </h3>
        <p className="mt-3 text-sm text-slate-300">
          {L(language, 'Awarded to', 'تُمنح هذه الشهادة إلى', 'Décerné à')}
        </p>
        <p className="mt-1 font-display text-3xl font-extrabold text-amber-300">
          {progress.astronautName}
        </p>
        <p className="mt-3 text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          {L(
            language,
            'For completing Pre-Flight Astronaut Training, In-Flight Space Station Operations, and Safe Post-Flight Return to Earth.',
            'لإتمامه تدريب ما قبل الإطلاق، والحياة اليومية في محطة الفضاء، والعودة الآمنة إلى كوكب الأرض.',
            'Pour avoir accompli la préparation Pré-vol, la vie à bord de la station et le retour sain et sauf sur Terre.'
          )}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="rounded-xl border border-white/10 bg-[#080E21] p-3">
            <Gauge className="mx-auto h-4 w-4 text-sky-400" />
            <p className="mt-1 font-mono-tabular text-lg font-bold text-white">
              {progress.completedActivities.length}/21
            </p>
            <p className="text-[11px] text-slate-400">{L(language, 'Missions', 'مهام', 'Missions')}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080E21] p-3">
            <Sparkles className="mx-auto h-4 w-4 text-emerald-400" />
            <p className="mt-1 font-mono-tabular text-lg font-bold text-white">{quizCorrect}</p>
            <p className="text-[11px] text-slate-400">{L(language, 'Quizzes', 'اختبارات', 'Quiz')}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#080E21] p-3">
            <ShieldCheck className="mx-auto h-4 w-4 text-amber-400" />
            <p className="mt-1 font-mono-tabular text-lg font-bold text-white">
              {earnedCount}/{BADGES.length}
            </p>
            <p className="text-[11px] text-slate-400">{L(language, 'Badges', 'أوسمة', 'Badges')}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              onSimComplete();
              window.print();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300"
          >
            <Printer className="h-4 w-4" />
            <span>{L(language, 'Print / Save Certificate', 'طباعة / حفظ الشهادة', 'Imprimer / Sauvegarder')}</span>
          </button>
          <button
            type="button"
            onClick={onSimComplete}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/50 bg-emerald-950/40 px-5 py-2.5 text-xs font-semibold text-emerald-200 hover:bg-emerald-900/50"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{L(language, 'Claim Certificate & Finish', 'تأكيد الشهادة وإنهاء الرحلة', 'Valider le diplôme')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
