import React, { useEffect, useState } from 'react';
import { BookOpen, ExternalLink, Globe2, Orbit } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { NASA_ARTICLES } from '../data/nasaResources';

interface IssSpecs {
  averageAltitudeKm: number;
  orbitalSpeedKmPerSec: number;
  orbitalPeriodMinutes: number;
  sunrisesPerDay: number;
  waterRecoveryTargetPercent: number;
  source: string;
  sourceUrl: string;
}

export const NasaResourcesView: React.FC = () => {
  const { language, t } = useGalaKidd();
  const [specs, setSpecs] = useState<IssSpecs | null>(null);

  useEffect(() => {
    fetch('/api/nasa/education')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.issReferenceSpecs) setSpecs(data.issReferenceSpecs);
      })
      .catch(() => {});
  }, []);

  const titleText =
    language === 'ar'
      ? 'مكتبة ناسا العلمية وموارد الفضاء'
      : language === 'fr'
        ? 'Bibliothèque Scientifique NASA'
        : 'NASA Science & Educational Resources';

  const subText =
    language === 'ar'
      ? 'معلومات علمية دقيقة وموثقة للأطفال من مصادر وكالة ناسا المفتوحة.'
      : language === 'fr'
        ? 'Ressources éducatives fiables adaptées aux jeunes astronautes, issues des données ouvertes de la NASA.'
        : 'Verified, age-appropriate spaceflight knowledge sourced from NASA STEM, NASA Space Place, and ISS open resources.';

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
      <div className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Globe2 className="h-6 w-6 text-sky-400" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{titleText}</h1>
        </div>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl">{subText}</p>

        {specs && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'متوسط الارتفاع' : language === 'fr' ? 'Altitude moyenne' : 'Avg. ISS Altitude'}
              </p>
              <p className="mt-1 font-mono-tabular text-xl font-bold text-sky-400">
                {specs.averageAltitudeKm} km
              </p>
            </div>
            <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'السرعة المدارية' : language === 'fr' ? 'Vitesse orbitale' : 'Orbital Speed'}
              </p>
              <p className="mt-1 font-mono-tabular text-xl font-bold text-white">
                {specs.orbitalSpeedKmPerSec} km/s
              </p>
            </div>
            <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'مدة الدورة' : language === 'fr' ? 'Période orbitale' : 'Orbit Period'}
              </p>
              <p className="mt-1 font-mono-tabular text-xl font-bold text-violet-300">
                {specs.orbitalPeriodMinutes} min
              </p>
            </div>
            <div className="rounded-xl border border-indigo-400/15 bg-[#0A1023] p-4">
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'استعادة المياه' : language === 'fr' ? 'Recyclage d’eau' : 'Water Recovery'}
              </p>
              <p className="mt-1 font-mono-tabular text-xl font-bold text-emerald-400">
                ~{specs.waterRecoveryTargetPercent}%
              </p>
            </div>
          </div>
        )}
        {specs && (
          <a
            href={specs.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline"
          >
            <Orbit className="h-3.5 w-3.5" />
            <span>{specs.source}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {NASA_ARTICLES.map((art) => {
          const cardImages: Record<string, string> = {
            nasa_iss_life: '/src/assets/images/hero_space_station_1794775763108.jpg',
            nasa_microgravity: '/src/assets/images/space_food_meals_1794776376384.jpg',
            nasa_water_loop: '/src/assets/images/iss_life_support_1794776382415.jpg',
            nasa_earth_obs: '/src/assets/images/earth_observation_view_1794775764111.jpg',
          };
          return (
            <article
              key={art.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-indigo-400/20 bg-[#10172E]/85"
            >
              <div>
                <img
                  src={cardImages[art.id] || '/src/assets/images/hero_space_station_1794775763108.jpg'}
                  alt={art.title[language]}
                  referrerPolicy="no-referrer"
                  className="h-44 w-full object-cover"
                />
                <div className="p-6 pb-0">
                  <p className="text-xs font-semibold text-sky-400">{art.category[language]}</p>
                  <h2 className="mt-1.5 font-display text-xl font-bold text-white">{art.title[language]}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{art.summary[language]}</p>
                  <div className="mt-4 rounded-xl border border-indigo-400/15 bg-[#0A1023] p-3.5 text-xs text-slate-200 leading-relaxed">
                    <BookOpen className="inline h-3.5 w-3.5 text-amber-400 me-1.5" />
                    {art.keyFact[language]}
                  </div>
                </div>
              </div>

              <div className="mx-6 my-5 pt-3 border-t border-indigo-400/15 flex items-center justify-between text-xs">
                <span className="text-slate-400">{t.activityView.nasaSourceLabel}</span>
                <a
                  href={art.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-sky-400 hover:underline"
                >
                  <span>{art.sourceName}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
