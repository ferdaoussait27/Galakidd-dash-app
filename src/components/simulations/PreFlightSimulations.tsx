import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Flame,
  HeartPulse,
  Rocket,
  ShieldAlert,
  Sparkles,
  Utensils,
  Wind,
} from 'lucide-react';
import { useGalaKidd } from '../../context/GalaKiddContext';
import type { ActivityId, Language, SuitId } from '../../types/galakidd';
import { soundEngine } from '../../utils/soundEffects';

interface SimProps {
  activityId: ActivityId;
  onSimComplete: () => void;
}

const L = (lang: Language, en: string, ar: string, fr: string) =>
  lang === 'ar' ? ar : lang === 'fr' ? fr : en;

export const PreFlightSimulations: React.FC<SimProps> = ({ activityId, onSimComplete }) => {
  const { language, progress, selectSuit, markLaunchCompleted, navigate } = useGalaKidd();

  // Activity 1: Suit state
  const [inspectedPart, setInspectedPart] = useState<'helmet' | 'gloves' | 'boots' | 'layers'>('helmet');
  const [visitedParts, setVisitedParts] = useState<string[]>(['helmet']);

  // Activity 2: Physical training state
  const [balanceHits, setBalanceHits] = useState(0);
  const [strengthLevel, setStrengthLevel] = useState(60);
  const [targetSide, setTargetSide] = useState<'left' | 'center' | 'right'>('center');

  // Activity 3: Food state
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [crumbTested, setCrumbTested] = useState(false);

  // Activity 4: Oxygen & Water state
  const [oxygenLevel, setOxygenLevel] = useState(65);
  const [waterLevel, setWaterLevel] = useState(55);
  const [scrubberActive, setScrubberActive] = useState(false);

  // Activity 5: Safety state
  const [safetyAnswers, setSafetyAnswers] = useState<{ smoke?: boolean; leak?: boolean }>({});

  // Activity 6: Checklist & Launch state
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [launched, setLaunched] = useState(progress.launchCompleted);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      soundEngine.playCountdownBeep(true);
      soundEngine.playRocketLiftoff();
      setLaunched(true);
      markLaunchCompleted();
      onSimComplete();
      return;
    }
    soundEngine.playCountdownBeep(false);
    const timer = window.setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 850);
    return () => window.clearTimeout(timer);
  }, [countdown, markLaunchCompleted, onSimComplete]);

  // 1. PRE_SUIT
  if (activityId === 'pre_suit') {
    const suits: { id: SuitId; name: string; use: string; layers: string }[] = [
      {
        id: 'eva_spacewalk',
        name: L(language, 'EVA Spacewalk Suit (EMU)', 'بدلة السير في الفضاء (EMU)', 'Combinaison de sortie (EMU)'),
        use: L(language, 'Built for working outside in vacuum (-157°C to +121°C).', 'مصممة للعمل خارج المحطة في الفراغ الحراري الشديد.', 'Conçue pour les sorties extravéhiculaires dans le vide.'),
        layers: L(language, '14 protective layers + life-support backpack', '١٤ طبقة واقية + حقيبة دعم الحياة', '14 couches protectrices + sac de survie'),
      },
      {
        id: 'launch_entry',
        name: L(language, 'Launch & Entry Pressure Suit', 'بدلة الإطلاق والعودة', 'Combinaison de lancement et rentrée'),
        use: L(language, 'Lightweight pressure suit worn inside the rocket capsule.', 'بدلة ضغط خفيفة تُرتدى داخل كبسولة الصاروخ.', 'Combinaison légère portée dans la capsule spatiale.'),
        layers: L(language, 'Fire-resistant shell + emergency air seal', 'طبقة مقاومة للحريق + إغلاق هوائي طارئ', 'Enveloppe ignifugée + étanchéité d’urgence'),
      },
      {
        id: 'station_flight',
        name: L(language, 'Orbital Station Flight Suit', 'بدلة الحياة اليومية في المحطة', 'Tenue de vol en station'),
        use: L(language, 'Comfortable everyday attire inside the pressurized station.', 'ملابس مريحة للعمل اليومي داخل المحطة المضغوطة.', 'Tenue confortable à l’intérieur de la station pressurisée.'),
        layers: L(language, 'Breathable cotton/fire-retardant utility pockets', 'أنسجة مريحة مع جيوب تثبيت للأدوات', 'Tissu respirant avec poches utilitaires'),
      },
    ];

    const parts: Record<'helmet' | 'gloves' | 'boots' | 'layers', { title: string; detail: string }> = {
      helmet: {
        title: L(language, 'Helmet & Gold Sun Visor', 'الخوذة والواقي الذهبي', 'Casque et visière dorée'),
        detail: L(
          language,
          'Transparent polycarbonate bubble holds breathable oxygen around your head, while the gold visor reflects blinding sunlight.',
          'القبة الشفافة تحفظ الأكسجين حول رأسك، والطبقة الذهبية تعكس وهج الشمس والإشعاعات.',
          'La bulle retient l’oxygène respirable et la visière dorée réfléchit la lumière solaire aveuglante.'
        ),
      },
      gloves: {
        title: L(language, 'Pressurized Heated Gloves', 'قفازات مضغوطة ومدفأة', 'Gants pressurisés chauffants'),
        detail: L(
          language,
          'Fingertip heaters keep hands warm in shadow, and textured silicone grips let astronauts turn tiny bolts safely.',
          'سخانات في أطراف الأصابع تحمي اليدين من التجمد، وملمس مانع للانزلاق للإمساك بالأدوات.',
          'Des filaments chauffants protègent les doigts du froid extrême tout en gardant de la précision.'
        ),
      },
      boots: {
        title: L(language, 'Thermal Space Boots', 'أحذية الفضاء العازلة', 'Bottes spatiales thermiques'),
        detail: L(
          language,
          'Insulated soles guard against freezing metal surfaces and clip securely into spacewalk foot restraints.',
          'نعال عازلة تحمي من الأسطح المعدنية المتجمدة وتثبت القدمين في مساند السير الفضائي.',
          'Semelles isolantes contre les métaux glacés avec attaches pour les cale-pieds.'
        ),
      },
      layers: {
        title: L(language, '14-Layer Micrometeoroid Armor', '١٤ طبقة حماية وعزل', '14 couches anti-micrométéorites'),
        detail: L(
          language,
          'Includes a water-cooled inner tube suit, pressure bladder, Kevlar-like shield against tiny space dust, and white outer thermal layer.',
          'تضم بدلة تبريد مائية داخلية وكيس ضغط وطبقة ضد غبار الفضاء السريع وطبقة خارجية بيضاء عاكسة للحرارة.',
          'Comprend refroidissement par eau, vessie de pression, bouclier Kevlar et couche blanche réfléchissante.'
        ),
      },
    };

    const inspect = (p: 'helmet' | 'gloves' | 'boots' | 'layers') => {
      setInspectedPart(p);
      const next = Array.from(new Set([...visitedParts, p]));
      setVisitedParts(next);
      if (next.length >= 3) onSimComplete();
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {suits.map((suit) => {
            const active = progress.selectedSuit === suit.id;
            return (
              <button
                key={suit.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  selectSuit(suit.id);
                  onSimComplete();
                }}
                className={`rounded-xl border p-4 text-start transition-colors ${
                  active
                    ? 'border-sky-400 bg-sky-500/15'
                    : 'border-indigo-400/20 bg-[#0B1124] hover:border-indigo-400/50'
                }`}
              >
                <p className="font-display text-sm font-bold text-white">{suit.name}</p>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{suit.use}</p>
                <p className="mt-2 text-[11px] font-medium text-sky-300">{suit.layers}</p>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5">
          <p className="text-xs font-semibold text-sky-400">
            {L(
              language,
              `Inspect Suit Components (${visitedParts.length}/4 inspected)`,
              `افحص أجزاء البدلة (${visitedParts.length}/٤)`,
              `Inspecte les composants (${visitedParts.length}/4)`
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(['helmet', 'gloves', 'boots', 'layers'] as const).map((part) => (
              <button
                key={part}
                type="button"
                onClick={() => inspect(part)}
                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  inspectedPart === part
                    ? 'bg-sky-500 text-slate-950'
                    : 'border border-indigo-400/25 bg-[#10172E] text-slate-200 hover:bg-slate-800'
                }`}
              >
                {parts[part].title}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-indigo-400/15 bg-[#10172E] p-4">
            <h4 className="font-display text-base font-bold text-white">{parts[inspectedPart].title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{parts[inspectedPart].detail}</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. PRE_TRAINING
  if (activityId === 'pre_training') {
    const sides: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
    const handleBalanceClick = (side: 'left' | 'center' | 'right') => {
      if (side === targetSide) {
        soundEngine.playClick();
        const nextHits = balanceHits + 1;
        setBalanceHits(nextHits);
        setTargetSide(sides[(sides.indexOf(side) + 1 + Math.floor(Math.random() * 2)) % 3]);
        if (nextHits >= 4 && strengthLevel >= 75) onSimComplete();
      } else {
        soundEngine.playAlertPing();
      }
    };

    const handleStrengthChange = (val: number) => {
      setStrengthLevel(val);
      if (balanceHits >= 4 && val >= 75) onSimComplete();
    };

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-base font-bold text-white">
              {L(language, 'Balance & Coordination Drill', 'تدريب التوازن والتنسيق', 'Exercice d’équilibre et coordination')}
            </h4>
            <span className="font-mono-tabular text-xs font-semibold text-sky-400">{balanceHits}/4</span>
          </div>
          <p className="mt-1.5 text-xs text-slate-300">
            {L(
              language,
              'Click the highlighted stabilizer pad 4 times to calibrate astronaut balance.',
              'اضغط على منصة التوازن المضيئة ٤ مرات لضبط توازن رائد الفضاء.',
              'Clique 4 fois sur le capteur d’équilibre illuminé.'
            )}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {sides.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleBalanceClick(s)}
                className={`rounded-xl py-6 text-xs font-semibold transition-transform active:scale-95 ${
                  targetSide === s
                    ? 'bg-sky-500 text-slate-950 shadow-lg'
                    : 'border border-indigo-400/20 bg-[#10172E] text-slate-400'
                }`}
              >
                {s === 'left'
                  ? L(language, 'Left', 'يسار', 'Gauche')
                  : s === 'center'
                    ? L(language, 'Center', 'وسط', 'Centre')
                    : L(language, 'Right', 'يمين', 'Droite')}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-emerald-400" />
              <h4 className="font-display text-base font-bold text-white">
                {L(language, 'Core Strength & Cardio Load', 'قوة العضلات والقلب', 'Force musculaire & cardio')}
              </h4>
            </div>
            <p className="mt-1.5 text-xs text-slate-300">
              {L(
                language,
                'Raise physical conditioning to at least 75% to handle 3g rocket launch forces.',
                'ارفع اللياقة البدنية إلى ٧٥٪ على الأقل لتحمّل قوى إطلاق الصاروخ.',
                'Monte la préparation physique à au moins 75 % pour supporter les 3g du décollage.'
              )}
            </p>
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300">{L(language, 'Readiness', 'الجاهزية', 'Préparation')}</span>
                <span className="font-mono-tabular font-bold text-emerald-400">{strengthLevel}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                value={strengthLevel}
                onChange={(e) => handleStrengthChange(Number(e.target.value))}
                className="w-full accent-sky-400"
              />
            </div>
          </div>
          <p className="mt-4 text-xs text-sky-300">
            {balanceHits >= 4 && strengthLevel >= 75
              ? L(language, '● Physical training target reached!', '● تم تحقيق هدف التدريب البدني!', '● Objectif physique atteint !')
              : L(language, 'Target: 4 balance hits + 75% conditioning.', 'الهدف: ٤ نقاط توازن + ٧٥٪ لياقة.', 'Objectif : 4 cibles + 75 % de forme.')}
          </p>
        </div>
      </div>
    );
  }

  // 3. PRE_FOOD
  if (activityId === 'pre_food') {
    const foodItems = [
      {
        id: 'tortilla',
        name: L(language, 'Whole-Wheat Tortillas', 'خبز التورتيلا', 'Tortillas complètes'),
        safe: true,
        note: L(language, 'Zero crumbs, wraps any filling neatly.', 'لا ينثر فتاتاً ويحفظ الحشوة.', 'Aucune miette flottante.'),
      },
      {
        id: 'strawberries',
        name: L(language, 'Freeze-Dried Strawberries', 'فراولة مجففة بالتجميد', 'Fraises lyophilisées'),
        safe: true,
        note: L(language, 'Lightweight, sealed pack, rich in Vitamin C.', 'خفيفة الوزن وغنية بفيتامين C.', 'Léger et riche en vitamine C.'),
      },
      {
        id: 'stew',
        name: L(language, 'Thermostabilized Beef & Veggie Pouch', 'وجبة يخنة معقمة حرارياً', 'Ragoût thermostabilisé'),
        safe: true,
        note: L(language, 'Sticky sauce clings to the spoon in microgravity!', 'الصلصة تلتصق بالملعقة في انعدام الجاذبية!', 'La sauce adhère à la cuillère en 0g !'),
      },
      {
        id: 'crackers',
        name: L(language, 'Crumchy Dry Crackers', 'بسكويت مالح هش يتفتت', 'Biscuits secs friables'),
        safe: false,
        note: L(language, 'Warning: creates dozens of floating crumbs!', 'تحذير: ينثر فتاتاً طائراً يضر الفلاتر!', 'Attention : crée trop de miettes flottantes !'),
      },
    ];

    const toggleFood = (id: string, safe: boolean) => {
      if (!safe) {
        soundEngine.playAlertPing();
        setCrumbTested(true);
        return;
      }
      soundEngine.playClick();
      const next = selectedFoods.includes(id)
        ? selectedFoods.filter((x) => x !== id)
        : [...selectedFoods, id];
      setSelectedFoods(next);
      if (next.length >= 2) onSimComplete();
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-200">
          {L(
            language,
            'Select at least 2 space-safe meals for your mission pantry (watch out for high-crumb foods!).',
            'اختر وجبتين آمنتين للفضاء على الأقل (احذر من الأطعمة كثيرة الفتات!).',
            'Sélectionne au moins 2 aliments sûrs pour l’espace (attention aux miettes !).'
          )}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {foodItems.map((item) => {
            const chosen = selectedFoods.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleFood(item.id, item.safe)}
                className={`rounded-xl border p-4 text-start transition-colors ${
                  chosen
                    ? 'border-emerald-400 bg-emerald-950/35'
                    : !item.safe && crumbTested
                      ? 'border-amber-400/60 bg-amber-950/30'
                      : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-sm font-bold text-white flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-sky-400" />
                    {item.name}
                  </span>
                  {chosen && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </div>
                <p className="mt-1.5 text-xs text-slate-300">{item.note}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. PRE_OXYGEN_WATER
  if (activityId === 'pre_oxygen_water') {
    const ready = oxygenLevel >= 90 && waterLevel >= 90 && scrubberActive;
    const checkComplete = (o2: number, w: number, sc: boolean) => {
      if (o2 >= 90 && w >= 90 && sc) onSimComplete();
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Wind className="h-4 w-4 text-sky-400" />
                {L(language, 'Oxygen Reserve Tanks', 'خزانات الأكسجين الاحتياطية', 'Réservoirs d’oxygène')}
              </span>
              <span className="font-mono-tabular text-sm font-bold text-sky-400">{oxygenLevel}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              value={oxygenLevel}
              onChange={(e) => {
                const v = Number(e.target.value);
                setOxygenLevel(v);
                checkComplete(v, waterLevel, scrubberActive);
              }}
              className="mt-3 w-full accent-sky-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              {L(language, 'Fill to 90%+ before launch.', 'املأ الخزان إلى ٩٠٪+ قبل الإقلاع.', 'Remplis à 90 %+ avant le décollage.')}
            </p>
          </div>

          <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <Droplets className="h-4 w-4 text-cyan-400" />
                {L(language, 'Potable Water Storage', 'خزانات المياه الصالحة للشرب', 'Réserves d’eau potable')}
              </span>
              <span className="font-mono-tabular text-sm font-bold text-cyan-400">{waterLevel}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={100}
              value={waterLevel}
              onChange={(e) => {
                const v = Number(e.target.value);
                setWaterLevel(v);
                checkComplete(oxygenLevel, v, scrubberActive);
              }}
              className="mt-3 w-full accent-cyan-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              {L(language, 'Fill to 90%+ before launch.', 'املأ الخزان إلى ٩٠٪+ قبل الإقلاع.', 'Remplis à 90 %+ avant le décollage.')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const next = !scrubberActive;
            setScrubberActive(next);
            checkComplete(oxygenLevel, waterLevel, next);
          }}
          className={`w-full rounded-xl border p-4 text-start transition-colors flex items-center justify-between ${
            scrubberActive
              ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
              : 'border-indigo-400/25 bg-[#0B1124] text-slate-200 hover:border-sky-400/40'
          }`}
        >
          <span className="text-sm font-semibold">
            {L(
              language,
              'Test CO₂ Scrubber Cartridges (Verify Air Filter Flow)',
              'فحص مرشحات ثاني أكسيد الكربون (CO₂)',
              'Tester les cartouches de filtrage CO₂'
            )}
          </span>
          <span className="text-xs font-mono-tabular font-bold">
            {scrubberActive ? '● OK' : L(language, 'Click to Test', 'اضغط للفحص', 'Tester')}
          </span>
        </button>

        {ready && (
          <p className="text-xs font-semibold text-emerald-300">
            {L(
              language,
              '● Oxygen, water, and CO₂ scrubbers are launch-ready!',
              '● الأكسجين والماء ومنقيات الهواء جاهزة للإطلاق!',
              '● Oxygène, eau et filtres CO₂ prêts pour le vol !'
            )}
          </p>
        )}
      </div>
    );
  }

  // 5. PRE_SAFETY
  if (activityId === 'pre_safety') {
    const handlePick = (kind: 'smoke' | 'leak', correct: boolean) => {
      const next = { ...safetyAnswers, [kind]: correct };
      setSafetyAnswers(next);
      if (next.smoke && next.leak) onSimComplete();
    };

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 space-y-3">
          <div className="flex items-center gap-2 text-amber-300">
            <Flame className="h-4 w-4" />
            <h4 className="font-display text-sm font-bold text-white">
              {L(language, 'Drill 1: Cabin Smoke Sensor', 'تدريب ١: مستشعر الدخان', 'Exercice 1 : Détecteur de fumée')}
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            {L(
              language,
              'A warning light indicates smoke near an electronics rack. What gear do you grab first?',
              'يشير التنبيه إلى دخان قرب رف الأجهزة. ما المعدات التي ترتديها أولاً؟',
              'Un capteur signale de la fumée près d’un panneau. Quel équipement prends-tu ?'
            )}
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handlePick('smoke', true)}
              className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
                safetyAnswers.smoke === true
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-100'
                  : 'border-indigo-400/20 bg-[#10172E] text-slate-200 hover:border-sky-400'
              }`}
            >
              {L(
                language,
                'Portable Breathing Mask + CO₂ Extinguisher',
                'قناع التنفس المحمول + طفاية CO₂',
                'Masque respiratoire portable + extincteur CO₂'
              )}
            </button>
            <button
              type="button"
              onClick={() => handlePick('smoke', false)}
              className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
                safetyAnswers.smoke === false
                  ? 'border-amber-400 bg-amber-950/40 text-amber-100'
                  : 'border-indigo-400/20 bg-[#10172E] text-slate-200 hover:border-sky-400'
              }`}
            >
              {L(language, 'Open a window to outer space', 'فتح نافذة نحو الفضاء', 'Ouvrir une fenêtre vers l’espace')}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 space-y-3">
          <div className="flex items-center gap-2 text-sky-300">
            <ShieldAlert className="h-4 w-4" />
            <h4 className="font-display text-sm font-bold text-white">
              {L(language, 'Drill 2: Hatch Seal Check', 'تدريب ٢: فحص إغلاق الكوة', 'Exercice 2 : Joint d’écoutille')}
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            {L(
              language,
              'Before closing a spacecraft hatch, what must you inspect carefully?',
              'قبل إغلاق باب المركبة، ما الذي يجب فحصه بدقة؟',
              'Avant de fermer l’écoutille, que faut-il vérifier attentivement ?'
            )}
          </p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handlePick('leak', true)}
              className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
                safetyAnswers.leak === true
                  ? 'border-emerald-400 bg-emerald-950/40 text-emerald-100'
                  : 'border-indigo-400/20 bg-[#10172E] text-slate-200 hover:border-sky-400'
              }`}
            >
              {L(
                language,
                'Clean rubber O-ring seals & run cabin pressure leak check',
                'نظافة الحلقات المطاطية وإجراء اختبار ضغط الهواء',
                'Propreté des joints et test d’étanchéité de pression'
              )}
            </button>
            <button
              type="button"
              onClick={() => handlePick('leak', false)}
              className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
                safetyAnswers.leak === false
                  ? 'border-amber-400 bg-amber-950/40 text-amber-100'
                  : 'border-indigo-400/20 bg-[#10172E] text-slate-200 hover:border-sky-400'
              }`}
            >
              {L(language, 'Leave a towel in the doorway', 'ترك منشفة في فتحة الباب', 'Laisser une serviette dans le joint')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 6. PRE_CHECKLIST
  const prereqs: { id: ActivityId; label: string }[] = [
    { id: 'pre_suit', label: L(language, 'Spacesuit Fitted & Inspected', 'فحص وارتداء بدلة الفضاء', 'Combinaison vérifiée') },
    { id: 'pre_training', label: L(language, 'Physical Training Cleared', 'اجتياز التدريب البدني', 'Entraînement physique validé') },
    { id: 'pre_food', label: L(language, 'Low-Crumb Food Packed', 'تجهيز طعام الفضاء الآمن', 'Repas spatiaux emballés') },
    { id: 'pre_oxygen_water', label: L(language, 'O₂ & Water Tanks Verified', 'فحص الأكسجين والمياه', 'O₂ et eau vérifiés') },
    { id: 'pre_safety', label: L(language, 'Safety Drills Passed', 'اجتياز تدريبات السلامة', 'Exercices de sécurité réussis') },
  ];

  const allPrereqsDone = prereqs.every((p) => progress.completedActivities.includes(p.id));
  const allChecked = checkedItems.length === prereqs.length;

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-5">
      {!allPrereqsDone && (
        <div className="rounded-xl border border-amber-400/40 bg-amber-950/35 p-4 flex items-start gap-3 text-xs text-amber-100">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            {L(
              language,
              'Tip: Complete activities 1–5 first so your whole pre-flight training is verified, or verify the items below to practice the launch sequence.',
              'نصيحة: أكمل الأنشطة ١–٥ أولاً لإتمام التدريب كاملاً، أو تحقق من القائمة أدناه لتجربة تسلسل الإطلاق.',
              'Astuce : termine les activités 1 à 5 pour tout valider, ou coche la liste ci-dessous pour tester le lancement.'
            )}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {prereqs.map((item) => {
          const checked = checkedItems.includes(item.id);
          const actuallyDone = progress.completedActivities.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCheck(item.id)}
              className={`rounded-xl border p-3.5 text-start flex items-center justify-between gap-2 transition-colors ${
                checked
                  ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                  : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400/40'
              }`}
            >
              <span className="text-xs font-semibold">{item.label}</span>
              <span className="text-[11px] font-mono-tabular text-sky-300">
                {checked ? 'GO' : actuallyDone ? 'READY' : 'CHECK'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Rocket Launch Sequence */}
      <div className="rounded-2xl border border-sky-400/30 bg-[#090F22] p-6 text-center">
        {launched ? (
          <div className="space-y-3">
            <Sparkles className="mx-auto h-9 w-9 text-emerald-400" />
            <h4 className="font-display text-xl font-bold text-white">
              {L(language, 'Liftoff Successful — Welcome to Orbit!', 'انطلاق ناجح — أهلاً بك في المدار!', 'Décollage réussi — Bienvenue en orbite !')}
            </h4>
            <p className="text-xs text-slate-300">
              {L(
                language,
                'Stage 2 (In-Flight Space Station Life) is now unlocked!',
                'تم فتح المرحلة الثانية: الحياة اليومية على محطة الفضاء!',
                'L’étape 2 (Vie à bord de la station) est maintenant débloquée !'
              )}
            </p>
            <button
              type="button"
              onClick={() => navigate('stage_inflight')}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400"
            >
              <Rocket className="h-4 w-4" />
              <span>{L(language, 'Enter Stage 2: In-Flight', 'ادخل المرحلة ٢: في المدار', 'Aller à l’étape 2 : En vol')}</span>
            </button>
          </div>
        ) : countdown !== null ? (
          <div className="space-y-2 py-3">
            <Rocket className="mx-auto h-10 w-10 text-amber-400 animate-bounce" />
            <p className="font-mono-tabular text-4xl font-bold text-white">T-{countdown}</p>
            <p className="text-xs text-sky-300">
              {L(language, 'Main engines igniting...', 'إشعال المحركات الرئيسية...', 'Allumage des moteurs principaux...')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-200">
              {allChecked
                ? L(language, 'All systems GO! Ready for rocket ignition.', 'جميع الأنظمة جاهزة! مستعد لإطلاق الصاروخ.', 'Tous les systèmes sont GO ! Prêt pour le lancement.')
                : L(language, 'Check all 5 items above to arm the launch sequence.', 'تحقق من العناصر الخمسة أعلاه لتفعيل الإطلاق.', 'Coche les 5 vérifications ci-dessus pour débloquer le lancement.')}
            </p>
            <button
              type="button"
              disabled={!allChecked}
              onClick={() => setCountdown(3)}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 disabled:opacity-40"
            >
              <Rocket className="h-4 w-4" />
              <span>{L(language, 'Initiate Launch Countdown', 'بدء العد التنازلي للإطلاق', 'Lancer le compte à rebours')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
