import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Droplets,
  Eye,
  Moon,
  Radio,
  Recycle,
  Send,
  Trash2,
  Utensils,
  Wind,
} from 'lucide-react';
import { useGalaKidd } from '../../context/GalaKiddContext';
import type { ActivityId, Language } from '../../types/galakidd';
import { soundEngine } from '../../utils/soundEffects';

interface SimProps {
  activityId: ActivityId;
  onSimComplete: () => void;
}

const L = (lang: Language, en: string, ar: string, fr: string) =>
  lang === 'ar' ? ar : lang === 'fr' ? fr : en;

export const InFlightSimulations: React.FC<SimProps> = ({ activityId, onSimComplete }) => {
  const { language, updateSimulator } = useGalaKidd();

  // 1. Sleep state
  const [sleepPos, setSleepPos] = useState<'floating' | 'wall'>('floating');
  const [fanOn, setFanOn] = useState(false);
  const [maskOn, setMaskOn] = useState(false);

  // 2. Eat & Drink state
  const [rehydrated, setRehydrated] = useState(false);
  const [trayLocked, setTrayLocked] = useState(false);
  const [waterSphereReleased, setWaterSphereReleased] = useState(false);

  // 3. Exercise state
  const [gymDone, setGymDone] = useState<string[]>([]);

  // 4. Oxygen & Breathing state
  const [electrolysis, setElectrolysis] = useState(50);
  const [co2Scrubber, setCo2Scrubber] = useState(40);

  // 5. Water recycling state
  const [waterStages, setWaterStages] = useState<number>(0);

  // 6. Waste sorting state
  const [sortedWaste, setSortedWaste] = useState<Record<string, boolean>>({});

  // 7. Comms state
  const [commsTarget, setCommsTarget] = useState<'iss' | 'moon' | 'mars'>('iss');
  const [messageText, setMessageText] = useState('Hello Earth from Orbit!');
  const [sentLog, setSentLog] = useState<string | null>(null);

  // 8. Earth Observation state
  const [observedSpots, setObservedSpots] = useState<string[]>([]);

  // 9. Emergency training state
  const [alertChoiceA, setAlertChoiceA] = useState<'ok' | 'wrong' | null>(null);
  const [alertChoiceB, setAlertChoiceB] = useState<'ok' | 'wrong' | null>(null);

  // 1. IN_SLEEP
  if (activityId === 'in_sleep') {
    const checkSleep = (pos: 'floating' | 'wall', fan: boolean, mask: boolean) => {
      if (pos === 'wall' && fan && mask) onSimComplete();
    };

    return (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-5 flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-sky-400">
              {L(language, 'Crew Sleep Station', 'مقصورة النوم', 'Cabine de couchage')}
            </span>
            <Moon className="h-4 w-4 text-violet-400" />
          </div>
          <div className="my-4 rounded-xl border border-dashed border-indigo-400/30 bg-[#070B19] p-4 text-center">
            <p className="text-xs text-slate-300">
              {sleepPos === 'wall'
                ? L(language, '● Sleeping bag strapped securely to cabin wall!', '● كيس النوم مثبت بإحكام على جدار المقصورة!', '● Sac de couchage bien sanglé à la paroi !')
                : L(language, '▲ Unstrapped: You would drift into control switches!', '▲ غير مثبت: قد تطفو وتصطدم بأزرار التحكم!', '▲ Non attaché : tu risquerais de dériver !')}
            </p>
            <p className="mt-2 text-xs text-slate-300">
              {fanOn
                ? L(language, '● Airflow Fan ON: Fresh oxygen circulating.', '● المروحة تعمل: الهواء النقي يتجدد.', '● Ventilation active : l’air circule.')
                : L(language, '▲ Fan OFF: Exhaled CO₂ pooling near face.', '▲ المروحة متوقفة: تجمع CO₂ حول الوجه.', '▲ Ventilateur éteint : poche de CO₂.')}
            </p>
            <p className="mt-2 text-xs text-slate-300">
              {maskOn
                ? L(language, '● Sleep Mask ON: 16 orbital sunrises blocked.', '● قناع النوم مفعل: حجب ١٦ شروقاً مدارياً.', '● Masque mis : 16 levers de soleil bloqués.')
                : L(language, '▲ Bright sunlight flashes every ~45 minutes.', '▲ ضوء الشمس يسطع كل ٤٥ دقيقة تقريباً.', '▲ Lumière solaire toutes les ~45 minutes.')}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              const next = sleepPos === 'wall' ? 'floating' : 'wall';
              setSleepPos(next);
              checkSleep(next, fanOn, maskOn);
            }}
            className={`w-full rounded-xl border p-4 text-start text-sm font-semibold transition-colors ${
              sleepPos === 'wall'
                ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400'
            }`}
          >
            {L(language, '1. Strap Sleeping Bag to Cabin Wall', '١. ثبّت كيس النوم على الجدار', '1. Attacher le sac à la paroi')}
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !fanOn;
              setFanOn(next);
              checkSleep(sleepPos, next, maskOn);
            }}
            className={`w-full rounded-xl border p-4 text-start text-sm font-semibold transition-colors ${
              fanOn
                ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400'
            }`}
          >
            {L(language, '2. Turn On Head Ventilation Fan', '٢. شغّل مروحة التهوية الجانبية', '2. Activer le ventilateur d’air')}
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !maskOn;
              setMaskOn(next);
              checkSleep(sleepPos, fanOn, next);
            }}
            className={`w-full rounded-xl border p-4 text-start text-sm font-semibold transition-colors ${
              maskOn
                ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400'
            }`}
          >
            {L(language, '3. Put On Eye Mask', '٣. ارتدِ قناع العين للنوم', '3. Mettre le masque de nuit')}
          </button>
        </div>
      </div>
    );
  }

  // 2. IN_EAT_DRINK
  if (activityId === 'in_eat_drink') {
    const checkEat = (r: boolean, t: boolean, w: boolean) => {
      if (r && t && w) onSimComplete();
    };
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => {
              setRehydrated(true);
              checkEat(true, trayLocked, waterSphereReleased);
            }}
            className={`rounded-xl border p-4 text-start transition-colors ${
              rehydrated ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
            }`}
          >
            <Utensils className="h-5 w-5 text-sky-400 mb-2" />
            <p className="text-sm font-bold text-white">
              {L(language, 'Inject Water into Meal Pouch', 'حقن الماء في كيس الطعام', 'Réhydrater le sachet repas')}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {rehydrated
                ? L(language, '● Warm meal ready inside sealed pouch!', '● الوجبة دافئة وجاهزة داخل الكيس!', '● Repas chaud prêt dans son sachet !')
                : L(language, 'Click to rehydrate freeze-dried pasta.', 'اضغط لإضافة الماء الساخن للمعكرونة المجففة.', 'Clique pour réhydrater le plat.')}
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setTrayLocked(true);
              checkEat(rehydrated, true, waterSphereReleased);
            }}
            className={`rounded-xl border p-4 text-start transition-colors ${
              trayLocked ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
            }`}
          >
            <CheckCircle2 className="h-5 w-5 text-violet-400 mb-2" />
            <p className="text-sm font-bold text-white">
              {L(language, 'Lock Spoon with Magnet & Velcro', 'تثبيت الملعقة بالمغناطيس والفيلكرو', 'Fixer la cuillère avec aimant')}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {trayLocked
                ? L(language, '● Tray & utensils anchored safely!', '● الصينية والأدوات مثبتة بأمان!', '● Plateau et couverts bien fixés !')
                : L(language, 'Click so utensils don’t float away.', 'اضغط حتى لا تطفو الملعقة بعيداً.', 'Clique pour éviter qu’elle ne flotte.')}
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setWaterSphereReleased(true);
              checkEat(rehydrated, trayLocked, true);
            }}
            className={`rounded-xl border p-4 text-start transition-colors ${
              waterSphereReleased ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
            }`}
          >
            <Droplets className="h-5 w-5 text-cyan-400 mb-2" />
            <p className="text-sm font-bold text-white">
              {L(language, 'Test Microgravity Water Drop', 'اختبار قطرة الماء الطافية', 'Tester la goutte d’eau en 0g')}
            </p>
            <p className="mt-1 text-xs text-slate-300">
              {waterSphereReleased
                ? L(language, '● Surface tension pulls water into a floating sphere—use the straw!', '● التوتر السطحي يكوّر الماء، استخدم القشّة للشرب!', '● La tension superficielle forme une sphère !')
                : L(language, 'Squeeze a tiny drop from the drink pouch.', 'اعصر قطرة صغيرة لمراقبة شكلها.', 'Observe une goutte flotter en 0g.')}
            </p>
          </button>
        </div>
      </div>
    );
  }

  // 3. IN_EXERCISE
  if (activityId === 'in_exercise') {
    const stations = [
      {
        id: 'ared',
        name: L(language, 'ARED Resistance Lifting', 'جهاز المقاومة ARED', 'Appareil de résistance ARED'),
        benefit: L(language, 'Uses vacuum cylinders to load leg & back bones.', 'يستخدم أسطوانات مفرغة لتقوية العظام.', 'Protège les os du dos et des jambes.'),
      },
      {
        id: 'cevis',
        name: L(language, 'CEVIS Space Bike', 'الدراجة الفضائية CEVIS', 'Vélo spatial CEVIS'),
        benefit: L(language, 'Keeps your heart and lungs strong without a saddle!', 'يقوّي القلب والرئتين في المدار.', 'Entraîne le cœur et l’endurance.'),
      },
      {
        id: 't2',
        name: L(language, 'T2 Harness Treadmill', 'جهاز المشي بالأحزمة T2', 'Tapis roulant à sangles T2'),
        benefit: L(language, 'Bungee straps pull you onto the belt so you can run.', 'أحزمة مطاطية تثبتك على السير أثناء الجري.', 'Des sangles te maintiennent sur le tapis.'),
      },
    ];

    const toggleGym = (id: string) => {
      const next = gymDone.includes(id) ? gymDone : [...gymDone, id];
      setGymDone(next);
      if (next.length >= 2) onSimComplete();
    };

    const healthPercent = 55 + gymDone.length * 15;

    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              {L(language, 'Bone & Muscle Fitness Level', 'مستوى صحة العظام والعضلات', 'Santé osseuse et musculaire')}
            </span>
          </div>
          <span className="font-mono-tabular text-lg font-bold text-emerald-400">{healthPercent}%</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stations.map((s) => {
            const done = gymDone.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleGym(s.id)}
                className={`rounded-xl border p-4 text-start transition-colors ${
                  done ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
                }`}
              >
                <p className="font-display text-sm font-bold text-white">{s.name}</p>
                <p className="mt-1.5 text-xs text-slate-300">{s.benefit}</p>
                <p className="mt-3 text-xs font-semibold text-sky-300">
                  {done ? L(language, '● Session Complete', '● اكتمل التمرين', '● Séance terminée') : L(language, 'Start Workout', 'ابدأ التمرين', 'Commencer')}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. IN_OXYGEN
  if (activityId === 'in_oxygen') {
    const o2Pct = (17 + electrolysis * 0.06).toFixed(1);
    const co2Pct = (1.1 - co2Scrubber * 0.01).toFixed(2);
    const balanced = Number(o2Pct) >= 20.5 && Number(o2Pct) <= 22.0 && Number(co2Pct) <= 0.45;

    const handleSlider = (el: number, sc: number) => {
      setElectrolysis(el);
      setCo2Scrubber(sc);
      const nextO2 = 17 + el * 0.06;
      const nextCo2 = 1.1 - sc * 0.01;
      updateSimulator({ electrolysisRate: el, oxygen: Math.min(100, Math.round(el * 1.15)) });
      if (nextO2 >= 20.5 && nextO2 <= 22.0 && nextCo2 <= 0.45) onSimComplete();
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 flex items-center gap-1.5">
                <Wind className="h-4 w-4 text-sky-400" />
                {L(language, 'Cabin Oxygen (Target ~21%)', 'نسبة الأكسجين (الهدف ~٢١٪)', 'Oxygène cabine (cible ~21 %)')}
              </span>
              <span className="font-mono-tabular text-xl font-bold text-sky-400">{o2Pct}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={electrolysis}
              onChange={(e) => handleSlider(Number(e.target.value), co2Scrubber)}
              className="mt-3 w-full accent-sky-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              {L(language, 'Electrolysis Power: splits H₂O into O₂', 'طاقة التحليل الكهربائي: تفصل الماء لأكسجين', 'Puissance d’électrolyse : sépare H₂O en O₂')}
            </p>
          </div>

          <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">
                {L(language, 'Cabin CO₂ (Keep ≤ 0.45%)', 'ثاني أكسيد الكربون (≤ ٠.٤٥٪)', 'CO₂ cabine (garder ≤ 0,45 %)')}
              </span>
              <span className="font-mono-tabular text-xl font-bold text-amber-300">{co2Pct}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={co2Scrubber}
              onChange={(e) => handleSlider(electrolysis, Number(e.target.value))}
              className="mt-3 w-full accent-amber-400"
            />
            <p className="mt-1 text-xs text-slate-400">
              {L(language, 'CDRA Scrubber Airflow Speed', 'سرعة سحب منقي ثاني أكسيد الكربون', 'Vitesse du filtre à CO₂ (CDRA)')}
            </p>
          </div>
        </div>

        <p className={`text-xs font-semibold ${balanced ? 'text-emerald-300' : 'text-amber-300'}`}>
          {balanced
            ? L(language, '● Cabin air is balanced and safe to breathe!', '● هواء المقصورة متوازن وآمن للتنفس!', '● L’air de la cabine est parfaitement équilibré !')
            : L(language, '▲ Adjust sliders until O₂ is 20.5–22.0% and CO₂ ≤ 0.45%.', '▲ اضبط المؤشرات ليصبح الأكسجين ٢٠.٥–٢٢٪ و CO₂ ≤ ٠.٤٥٪.', '▲ Ajuste pour O₂ entre 20,5–22 % et CO₂ ≤ 0,45 %.')}
        </p>
      </div>
    );
  }

  // 5. IN_WATER
  if (activityId === 'in_water') {
    const steps = [
      L(language, '1. Collect Humidity & Wastewater', '١. جمع الرطوبة ومياه الغسيل', '1. Collecter humidité et eaux usées'),
      L(language, '2. Rotary Distillation Filter', '٢. التقطير الدوار في الجاذبية الصغرى', '2. Distillation rotative'),
      L(language, '3. Multi-Filtration & Catalytic Oxidation', '٣. الترشيح المتعدد والأكسدة الحفزية', '3. Multi-filtration et oxydation'),
      L(language, '4. Pure Drinking Water (~98% Recovered!)', '٤. مياه شرب نقية (استعادة ~٩٨٪!)', '4. Eau potable pure (~98 % recyclée !)'),
    ];
    const recovery = Math.min(98, waterStages * 25);

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4">
          <div className="flex items-center gap-2">
            <Recycle className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-white">
              {L(language, 'Water Recovery Progress', 'نسبة استعادة المياه', 'Taux de récupération d’eau')}
            </span>
          </div>
          <span className="font-mono-tabular text-xl font-bold text-cyan-400">{recovery}%</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {steps.map((label, idx) => {
            const active = waterStages >= idx + 1;
            const clickable = waterStages === idx;
            return (
              <button
                key={label}
                type="button"
                disabled={!clickable && !active}
                onClick={() => {
                  const next = idx + 1;
                  setWaterStages(next);
                  updateSimulator({ recyclingActive: true, water: Math.min(98, next * 25) });
                  if (next >= 4) onSimComplete();
                }}
                className={`rounded-xl border p-4 text-start text-xs font-semibold transition-colors ${
                  active
                    ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100'
                    : clickable
                      ? 'border-sky-400 bg-sky-500/15 text-white hover:bg-sky-500/25'
                      : 'border-slate-800 bg-[#080D1B] text-slate-500'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 6. IN_WASTE
  if (activityId === 'in_waste') {
    const items = [
      {
        id: 'wrapper',
        name: L(language, 'Dry Plastic Food Wrapper', 'غلاف طعام بلاستيكي جاف', 'Emballage plastique sec'),
        bin: L(language, 'Dry Cargo Trash Bag', 'حقيبة النفايات الجافة', 'Sac à déchets secs'),
      },
      {
        id: 'wipe',
        name: L(language, 'Damp Hygiene Wipe', 'منشفة تنظيف رطبة', 'Lingette humide'),
        bin: L(language, 'Moisture-Sealed Wet Bag', 'كيس محكم للرطوبة', 'Sac hermétique humide'),
      },
      {
        id: 'bio',
        name: L(language, 'Sealed Bio-Canister', 'حاوية حيوية مغلقة', 'Conteneur biologique scellé'),
        bin: L(language, 'Cargo Disposal Lock', 'حجرة التخلص بالشحن', 'Soute cargo de rejet'),
      },
    ];

    const sortItem = (id: string) => {
      const next = { ...sortedWaste, [id]: true };
      setSortedWaste(next);
      if (Object.keys(next).length >= items.length) onSimComplete();
    };

    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-200">
          {L(
            language,
            'Click each item to pack it into the correct sealed containment system.',
            'اضغط على كل عنصر لوضعه في نظام الاحتواء المغلق الصحيح.',
            'Clique sur chaque objet pour le ranger dans le bon conteneur hermétique.'
          )}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {items.map((item) => {
            const done = sortedWaste[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => sortItem(item.id)}
                className={`rounded-xl border p-4 text-start transition-colors ${
                  done ? 'border-emerald-400 bg-emerald-950/35' : 'border-indigo-400/20 bg-[#0B1124] hover:border-sky-400'
                }`}
              >
                <Trash2 className="h-4 w-4 text-sky-400 mb-2" />
                <p className="text-sm font-bold text-white">{item.name}</p>
                <p className="mt-1.5 text-xs text-sky-300">→ {item.bin}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 7. IN_COMMS
  if (activityId === 'in_comms') {
    const delays: Record<'iss' | 'moon' | 'mars', { label: string; delay: string }> = {
      iss: {
        label: L(language, 'ISS Orbit (~408 km)', 'مدار المحطة (~٤٠٨ كم)', 'Orbite ISS (~408 km)'),
        delay: L(language, '~0.3 seconds via TDRS satellite', '~٠.٣ ثانية عبر قمر التتابع', '~0,3 s via satellite TDRS'),
      },
      moon: {
        label: L(language, 'Moon (~384,400 km)', 'القمر (~٣٨٤,٤٠٠ كم)', 'Lune (~384 400 km)'),
        delay: L(language, '~2.6 seconds round-trip', '~٢.٦ ثانية ذهاباً وإياباً', '~2,6 secondes aller-retour'),
      },
      mars: {
        label: L(language, 'Mars (~225M km avg)', 'المريخ (~٢٢٥ مليون كم)', 'Mars (~225 M km)'),
        delay: L(language, '~12–25 minutes round-trip!', '~١٢–٢٥ دقيقة ذهاباً وإياباً!', '~12–25 minutes aller-retour !'),
      },
    };

    const handleSend = () => {
      soundEngine.playRadioTransmit();
      setSentLog(`${delays[commsTarget].label} · ${delays[commsTarget].delay}`);
      onSimComplete();
    };

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['iss', 'moon', 'mars'] as const).map((tKey) => (
            <button
              key={tKey}
              type="button"
              onClick={() => setCommsTarget(tKey)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                commsTarget === tKey
                  ? 'bg-sky-500 text-slate-950'
                  : 'border border-indigo-400/25 bg-[#0B1124] text-slate-200'
              }`}
            >
              {delays[tKey].label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-sky-300">
            <span className="flex items-center gap-1.5">
              <Radio className="h-4 w-4" />
              {L(language, 'Light-Speed Signal Delay:', 'تأخير إشارة سرعة الضوء:', 'Délai à la vitesse de la lumière :')}
            </span>
            <span className="font-mono-tabular font-semibold">{delays[commsTarget].delay}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              maxLength={80}
              className="flex-1 rounded-xl border border-indigo-400/25 bg-[#070B19] px-3 py-2 text-sm text-white focus:border-sky-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{L(language, 'Transmit to Houston', 'إرسال إلى هيوستن', 'Transmettre à Houston')}</span>
            </button>
          </div>
          {sentLog && (
            <p className="text-xs text-emerald-300">
              ● {L(language, 'Message transmitted:', 'تم إرسال الرسالة:', 'Message transmis :')} "{messageText}" ({sentLog})
            </p>
          )}
        </div>
      </div>
    );
  }

  // 8. IN_EARTH
  if (activityId === 'in_earth') {
    const spots = [
      {
        id: 'cyclone',
        label: L(language, 'Swirling Cloud Cyclone', 'دوامة سحب الإعصار', 'Cyclone nuageux'),
        info: L(language, 'Astronauts track massive spinning weather systems over warm oceans to help forecasters.', 'يتابع الرواد أنظمة الأعاصير الدوارة لمساعدة خبراء الأرصاد.', 'Les astronautes suivent les grands cyclones au-dessus des océans.'),
      },
      {
        id: 'reefs',
        label: L(language, 'Turquoise Coastal Reefs', 'الشعاب المرجانية الفيروزية', 'Récifs coralliens turquoise'),
        info: L(language, 'Shallow sunlight reflects bright turquoise over coral reefs and sandbars.', 'تعكس المياه الضحلة والشعاب المرجانية لوناً فيروزياً مبهراً.', 'Les eaux peu profondes révèlent de superbes récifs turquoise.'),
      },
      {
        id: 'desert',
        label: L(language, 'Sunlit Desert Coastline', 'الصحراء والساحل المضيء', 'Côte désertique ensoleillée'),
        info: L(language, 'Mineral-rich desert sandstorms can even travel across oceans to fertilize rainforests!', 'تستطيع عواصف الغبار الصحراوية عبور المحيطات لتغذية الغابات المطيرة!', 'Les poussières désertiques traversent parfois les océans !'),
      },
      {
        id: 'limb',
        label: L(language, 'Thin Blue Atmospheric Limb', 'الشريط الأزرق للغلاف الجوي', 'Fine ligne bleue atmosphérique'),
        info: L(language, 'Our fragile, life-giving atmosphere wraps Earth like a delicate blue ribbon.', 'غلافنا الجوي الرقيق يحيط بالأرض كشريط أزرق يحفظ الحياة.', 'Notre atmosphère protectrice forme un mince ruban bleu.'),
      },
    ];

    const observe = (id: string) => {
      const next = observedSpots.includes(id) ? observedSpots : [...observedSpots, id];
      setObservedSpots(next);
      if (next.length >= 3) onSimComplete();
    };

    const currentSpot = spots.find((s) => s.id === observedSpots[observedSpots.length - 1]) || spots[0];

    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7 overflow-hidden rounded-xl border border-indigo-400/25 bg-[#070B19]">
          <img
            src="/src/assets/images/earth_observation_view_1794775764111.jpg"
            alt="View of Earth from Space Station Cupola"
            referrerPolicy="no-referrer"
            className="h-64 w-full object-cover sm:h-72"
          />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div>
            <p className="text-xs font-semibold text-sky-400 flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {L(language, `Log 3+ Earth Features (${observedSpots.length}/4)`, `سجّل ٣ معالم أرضية (${observedSpots.length}/٤)`, `Observe 3+ détails (${observedSpots.length}/4)`)}
            </p>
            <div className="mt-2.5 grid grid-cols-1 gap-2">
              {spots.map((s) => {
                const seen = observedSpots.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => observe(s.id)}
                    className={`rounded-xl border px-3.5 py-2.5 text-start text-xs font-semibold transition-colors ${
                      seen ? 'border-emerald-400 bg-emerald-950/35 text-emerald-100' : 'border-indigo-400/20 bg-[#0B1124] text-slate-200 hover:border-sky-400'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="rounded-xl border border-indigo-400/15 bg-[#0B1124] p-3 text-xs text-slate-200">
            <span className="font-semibold text-sky-300">{currentSpot.label}: </span>
            {currentSpot.info}
          </div>
        </div>
      </div>
    );
  }

  // 9. IN_EMERGENCY
  const chooseA = (ok: boolean) => {
    if (ok) soundEngine.playClick();
    else soundEngine.playAlertPing();
    setAlertChoiceA(ok ? 'ok' : 'wrong');
    if (ok && alertChoiceB === 'ok') onSimComplete();
  };
  const chooseB = (ok: boolean) => {
    if (ok) soundEngine.playClick();
    else soundEngine.playAlertPing();
    setAlertChoiceB(ok ? 'ok' : 'wrong');
    if (ok && alertChoiceA === 'ok') onSimComplete();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-sky-400/30 bg-sky-950/30 p-3 text-xs text-sky-200 flex items-center gap-2">
        <AlertCircle className="h-4 w-4 shrink-0" />
        <span>
          {L(
            language,
            'Educational Training Simulation Only — Simplified decision drills, not real flight procedures.',
            'محاكاة تدريبية تعليمية فقط — تمارين مبسطة للأطفال وليست إجراءات طوارئ حقيقية.',
            'Simulation éducative uniquement — Exercices simplifiés, pas des procédures réelles.'
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 space-y-2.5">
          <p className="font-display text-sm font-bold text-white">
            {L(language, 'Scenario A: Solar Panel Power Dip', 'الموقف أ: انخفاض طاقة الألواح الشمسية', 'Scénario A : Baisse d’énergie solaire')}
          </p>
          <p className="text-xs text-slate-300">
            {L(language, 'Mission Control notes temporary shadow power dip. Best response?', 'أبلغ مركز التحكم عن انخفاض مؤقت بالطاقة. ما التصرف الأمثل؟', 'Le contrôle signale une baisse temporaire. Meilleur choix ?')}
          </p>
          <button
            type="button"
            onClick={() => chooseA(true)}
            className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
              alertChoiceA === 'ok' ? 'border-emerald-400 bg-emerald-950/40 text-emerald-100' : 'border-indigo-400/20 bg-[#10172E] text-slate-200'
            }`}
          >
            {L(language, 'Switch non-essential lab experiments to power-save mode', 'تحويل التجارب غير الضرورية لوضع توفير الطاقة', 'Mettre les expériences non vitales en mode économie')}
          </button>
          <button
            type="button"
            onClick={() => chooseA(false)}
            className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
              alertChoiceA === 'wrong' ? 'border-amber-400 bg-amber-950/40 text-amber-100' : 'border-indigo-400/20 bg-[#10172E] text-slate-200'
            }`}
          >
            {L(language, 'Turn off cabin oxygen and life support', 'إيقاف نظام الأكسجين ودعم الحياة', 'Couper l’oxygène de la cabine')}
          </button>
        </div>

        <div className="rounded-xl border border-indigo-400/20 bg-[#0B1124] p-4 space-y-2.5">
          <p className="font-display text-sm font-bold text-white">
            {L(language, 'Scenario B: Orbital Debris Warning', 'الموقف ب: تحذير اقتراب حطام فضائي', 'Scénario B : Alerte débris orbital')}
          </p>
          <p className="text-xs text-slate-300">
            {L(language, 'A tracked pebble is passing near orbit. What does Mission Control advise?', 'يمر جسم صغير قرب المدار. بمَ ينصح مركز التحكم؟', 'Un petit débris passe près de l’orbite. Que conseille Houston ?')}
          </p>
          <button
            type="button"
            onClick={() => chooseB(true)}
            className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
              alertChoiceB === 'ok' ? 'border-emerald-400 bg-emerald-950/40 text-emerald-100' : 'border-indigo-400/20 bg-[#10172E] text-slate-200'
            }`}
          >
            {L(language, 'Shelter calmly inside docked crew return capsule until clear', 'الاحتماء بهدوء داخل مركبة العودة حتى يمر', 'Se mettre à l’abri dans la capsule amarrée')}
          </button>
          <button
            type="button"
            onClick={() => chooseB(false)}
            className={`w-full rounded-lg border p-2.5 text-start text-xs font-medium ${
              alertChoiceB === 'wrong' ? 'border-amber-400 bg-amber-950/40 text-amber-100' : 'border-indigo-400/20 bg-[#10172E] text-slate-200'
            }`}
          >
            {L(language, 'Step outside to wave it away', 'الخروج خارج المحطة لإبعاده باليد', 'Sortir lui faire signe')}
          </button>
        </div>
      </div>
    </div>
  );
};
