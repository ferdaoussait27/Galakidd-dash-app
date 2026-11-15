import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  BatteryCharging,
  Compass,
  Droplets,
  Feather,
  Play,
  Radio,
  RotateCcw,
  Sun,
  Utensils,
  Wind,
  Wrench,
} from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import type { Language } from '../types/galakidd';
import { soundEngine } from '../utils/soundEffects';

const L = (lang: Language, en: string, ar: string, fr: string) =>
  lang === 'ar' ? ar : lang === 'fr' ? fr : en;

export const SpaceSimulatorView: React.FC = () => {
  const { t, language, progress, updateSimulator } = useGalaKidd();
  const sim = progress.simulator;

  // Microgravity Physics Lab state
  const [gravityEnv, setGravityEnv] = useState<'earth' | 'moon' | 'iss'>('iss');
  const [dropProgress, setDropProgress] = useState(0); // 0 to 100
  const [dropping, setDropping] = useState(false);

  // Space station explorer module state
  const [activeModule, setActiveModule] = useState<string>('cupola');

  // Real-time educational resource simulation loop
  useEffect(() => {
    const timer = window.setInterval(() => {
      const solarEfficiency = 1 - Math.abs(sim.solarAngle - 45) / 90; // optimal at 45 deg
      const energyDelta = solarEfficiency * 1.4 - (sim.electrolysisRate / 100) * 0.9 - 0.15;
      const oxygenDelta = (sim.electrolysisRate / 100) * 1.1 - 0.6;
      const waterDelta = (sim.recyclingActive ? 0.55 : -0.8) - (sim.electrolysisRate / 100) * 0.25;
      const foodDelta = -0.05;

      updateSimulator({
        missionSeconds: sim.missionSeconds + 1,
        energy: Math.max(5, Math.min(100, Number((sim.energy + energyDelta).toFixed(1)))),
        oxygen: Math.max(5, Math.min(100, Number((sim.oxygen + oxygenDelta).toFixed(1)))),
        water: Math.max(5, Math.min(100, Number((sim.water + waterDelta).toFixed(1)))),
        food: Math.max(10, Math.min(100, Number((sim.food + foodDelta).toFixed(1)))),
        commsActive: sim.missionSeconds % 18 < 14,
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [sim, updateSimulator]);

  // Microgravity drop animation
  useEffect(() => {
    if (!dropping) return;
    const stepMs = 40;
    const speed = gravityEnv === 'earth' ? 4.5 : gravityEnv === 'moon' ? 1.4 : 0.2;
    const id = window.setInterval(() => {
      setDropProgress((prev) => {
        const next = prev + speed;
        if (next >= 100) {
          setDropping(false);
          return 100;
        }
        return next;
      });
    }, stepMs);
    return () => window.clearInterval(id);
  }, [dropping, gravityEnv]);

  const formatMissionTime = (sec: number) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const modules = [
    {
      id: 'cupola',
      name: L(language, 'Cupola Observatory', 'القبة الزجاجية للمراقبة', 'Observatoire Cupola'),
      image: '/src/assets/images/earth_observation_view_1794775764111.jpg',
      desc: L(language, '7-window dome used to photograph Earth and guide arriving cargo spacecraft with the robotic arm.', 'قبة بـ ٧ نوافذ لتصوير الأرض وتوجيه مركبات الشحن بالذراع الآلية.', 'Dôme à 7 hublots pour photographier la Terre et piloter le bras robotique.'),
    },
    {
      id: 'destiny',
      name: L(language, 'Destiny Science Lab', 'مختبر ديستني العلمي', 'Laboratoire Destiny'),
      image: '/src/assets/images/hero_space_station_1794775763108.jpg',
      desc: L(language, 'Houses experiment racks studying microgravity biology, crystals, combustion, and space medicine.', 'يضم رفوف تجارب علمية لدراسة الأحياء والبلورات والاحتراق وطب الفضاء.', 'Abrite les expériences de biologie, cristaux et médecine en apesanteur.'),
    },
    {
      id: 'tranquility',
      name: L(language, 'Tranquility Life Support & Gym', 'وحدة ترانكويليتي لدعم الحياة والرياضة', 'Module Tranquility (Survie & Sport)'),
      image: '/src/assets/images/iss_life_support_1794776382415.jpg',
      desc: L(language, 'Contains the Water Recovery System, Oxygen Generation, and exercise machines (ARED & T2 treadmill).', 'تضم نظام تدوير المياه وإنتاج الأكسجين وأجهزة الرياضة اليومية.', 'Contient le recyclage d’eau, la production d’O₂ et les appareils de sport.'),
    },
    {
      id: 'harmony',
      name: L(language, 'Harmony Crew Quarters', 'وحدة هارموني لمقصورات الطاقم', 'Quartiers d’équipage Harmony'),
      image: '/src/assets/images/iss_crew_quarters_1794776376725.jpg',
      desc: L(language, 'Provides private sleeping booths where astronauts strap in vertically and dock visiting crew capsules.', 'توفر غرف نوم خاصة يثبت فيها الرواد أكياسهم وتلتحم بها كبسولات الطاقم.', 'Abrite les cabines de sommeil individuelles et le port d’amarrage.'),
    },
  ];

  const activeModObj = modules.find((m) => m.id === activeModule) || modules[0];

  const resetSim = () => {
    updateSimulator({
      oxygen: 96,
      water: 92,
      food: 95,
      energy: 88,
      missionSeconds: 0,
      solarAngle: 45,
      recyclingActive: true,
      electrolysisRate: 65,
    });
  };

  const lowAlert = sim.oxygen < 45 || sim.water < 45 || sim.energy < 40;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header & Disclaimer */}
      <div className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{t.simulator.title}</h1>
            <p className="mt-1 text-sm text-slate-300">{t.simulator.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={resetSim}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/30 bg-[#0A1023] px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t.simulator.resetSim}</span>
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{t.simulator.disclaimer}</span>
        </div>
      </div>

      {/* Resource Telemetry + Controls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Live Spacecraft Telemetry */}
        <section className="lg:col-span-7 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold text-white">{t.simulator.dashboardHeading}</h2>
            <span className={`text-xs font-semibold ${lowAlert ? 'text-amber-300' : 'text-emerald-300'}`}>
              {lowAlert ? `▲ ${t.simulator.statusLow}` : `● ${t.simulator.statusNominal}`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: t.simulator.oxygen, val: `${Math.round(sim.oxygen)}%`, icon: Wind, warn: sim.oxygen < 45 },
              { label: t.simulator.water, val: `${Math.round(sim.water)}%`, icon: Droplets, warn: sim.water < 45 },
              { label: t.simulator.food, val: `${Math.round(sim.food)}%`, icon: Utensils, warn: sim.food < 30 },
              { label: t.simulator.energy, val: `${Math.round(sim.energy)}%`, icon: BatteryCharging, warn: sim.energy < 40 },
              { label: t.simulator.missionTime, val: formatMissionTime(sim.missionSeconds), icon: Compass, warn: false },
              {
                label: t.simulator.commsLink,
                val: sim.commsActive ? t.simulator.commsNominal : t.simulator.commsDelayed,
                icon: Radio,
                warn: !sim.commsActive,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`rounded-xl border p-3.5 ${
                    item.warn ? 'border-amber-400/50 bg-amber-950/30' : 'border-indigo-400/15 bg-[#0A1023]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Icon className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <p className="mt-2 font-mono-tabular text-lg font-bold text-white">{item.val}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Controls */}
        <section className="lg:col-span-5 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-5">
          <h2 className="font-display text-lg font-bold text-white">{t.simulator.controlsHeading}</h2>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                {t.simulator.solarAngle}
              </span>
              <span className="font-mono-tabular font-bold text-sky-400">{sim.solarAngle}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              value={sim.solarAngle}
              onChange={(e) => updateSimulator({ solarAngle: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-200">{t.simulator.electrolysisRate}</span>
              <span className="font-mono-tabular font-bold text-sky-400">{sim.electrolysisRate}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={sim.electrolysisRate}
              onChange={(e) => updateSimulator({ electrolysisRate: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
          </div>

          <button
            type="button"
            onClick={() => updateSimulator({ recyclingActive: !sim.recyclingActive })}
            className={`w-full rounded-xl border p-3.5 text-start text-xs font-semibold flex items-center justify-between ${
              sim.recyclingActive
                ? 'border-emerald-400/60 bg-emerald-950/35 text-emerald-100'
                : 'border-amber-400/50 bg-amber-950/30 text-amber-100'
            }`}
          >
            <span>{t.simulator.waterRecycling}</span>
            <span>{sim.recyclingActive ? t.simulator.active : t.simulator.paused}</span>
          </button>
        </section>
      </div>

      {/* Microgravity Physics Lab & Space Station Room Explorer */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Microgravity Sandbox */}
        <section className="lg:col-span-6 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-white">{t.simulator.microgravityTitle}</h2>
          <p className="text-xs text-slate-300">{t.simulator.microgravitySubtitle}</p>

          <div className="flex flex-wrap gap-2">
            {(['earth', 'moon', 'iss'] as const).map((env) => (
              <button
                key={env}
                type="button"
                onClick={() => {
                  setGravityEnv(env);
                  setDropping(false);
                  setDropProgress(0);
                }}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  gravityEnv === env
                    ? 'bg-sky-500 text-slate-950'
                    : 'border border-indigo-400/25 bg-[#0A1023] text-slate-200'
                }`}
              >
                {t.simulator.gravityEnv[env]}
              </button>
            ))}
          </div>

          <div className="relative h-48 overflow-hidden rounded-xl border border-indigo-400/20 bg-[#070B19] p-4 grid grid-cols-3 gap-4">
            {[
              { key: 'feather', label: t.simulator.objects.feather, icon: Feather, color: 'text-amber-300', factor: gravityEnv === 'earth' ? 0.55 : 1 },
              { key: 'water', label: t.simulator.objects.waterDrop, icon: Droplets, color: 'text-cyan-300', factor: 1 },
              { key: 'wrench', label: t.simulator.objects.wrench, icon: Wrench, color: 'text-slate-200', factor: 1 },
            ].map((obj) => {
              const Icon = obj.icon;
              const yOffset =
                gravityEnv === 'iss'
                  ? Math.sin(dropProgress * 0.15) * 6 + 32
                  : Math.min(72, dropProgress * obj.factor * 0.72);
              return (
                <div key={obj.key} className="relative flex flex-col items-center border-x border-white/5">
                  <span className="text-[11px] text-slate-400">{obj.label}</span>
                  <div
                    className="absolute transition-transform duration-75"
                    style={{ top: `${24 + yOffset}%` }}
                  >
                    <Icon className={`h-7 w-7 ${obj.color}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setDropProgress(0);
              setDropping(true);
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
          >
            <Play className="h-3.5 w-3.5" />
            <span>{t.simulator.dropObjects}</span>
          </button>
        </section>

        {/* Interactive Space Station Explorer */}
        <section className="lg:col-span-6 rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-white">{t.simulator.stationMapTitle}</h2>
          <p className="text-xs text-slate-300">{t.simulator.stationMapSubtitle}</p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveModule(m.id);
                }}
                className={`rounded-xl border p-3.5 text-start transition-colors ${
                  activeModule === m.id
                    ? 'border-sky-400 bg-sky-500/15 text-white'
                    : 'border-indigo-400/20 bg-[#0A1023] text-slate-300 hover:border-sky-400/40'
                }`}
              >
                <p className="font-display text-sm font-bold">{m.name}</p>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-xl border border-indigo-400/20 bg-[#0A1023]">
            <img
              src={activeModObj.image}
              alt={activeModObj.name}
              referrerPolicy="no-referrer"
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-display text-base font-bold text-sky-300">{activeModObj.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{activeModObj.desc}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
