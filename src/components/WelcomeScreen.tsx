import React from 'react';
import { ArrowRight, Compass, Rocket, Shield, UserCheck } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { LanguageSelector, SoundToggleButton } from './TopNav';
import { OptionalAdBanner } from './OptionalAdBanner';
import { soundEngine } from '../utils/soundEffects';

interface WelcomeScreenProps {
  onOpenAuth: (mode: 'signup' | 'signin') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenAuth }) => {
  const { t, continueAsGuest } = useGalaKidd();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Clean top bar */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-violet-600 text-slate-950 shadow-md">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white whitespace-nowrap">
            {t.brandName}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <SoundToggleButton />
          <LanguageSelector />
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Left Hero Copy & Auth Entry */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-sm font-semibold text-sky-400">{t.welcome.badgeText}</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-white sm:text-5xl text-balance">
              {t.welcome.heroTitle}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-xl">
              {t.welcome.heroSubtitle}
            </p>

            {/* Primary Actions */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenAuth('signup');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                <UserCheck className="h-4 w-4" />
                <span>{t.welcome.signUp}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onOpenAuth('signin');
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-400/35 bg-[#10172E] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#172142] focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                <span>{t.welcome.signIn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playSuccess();
                  continueAsGuest();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-5 py-3.5 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400/50 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-300"
              >
                <Compass className="h-4 w-4 text-violet-400" />
                <span>{t.welcome.continueGuest}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </button>
            </div>

            {/* Child Safety Notice */}
            <div className="mt-8 rounded-2xl border border-indigo-400/20 bg-[#10172E]/85 p-5 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 text-emerald-400 shrink-0" />
                <div>
                  <h2 className="font-display text-sm font-semibold text-white">
                    {t.welcome.childSafetyTitle}
                  </h2>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                    {t.welcome.childSafetyBody}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-indigo-400/25 bg-[#10172E] shadow-2xl">
              <img
                src="/src/assets/images/hero_space_station_1794775763108.jpg"
                alt="Orbital Space Station above Earth"
                referrerPolicy="no-referrer"
                className="h-72 w-full object-cover sm:h-96 lg:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B19]/95 via-[#070B19]/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6">
                <p className="text-xs font-semibold text-sky-300">{t.welcome.previewLabel}</p>
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-white/10 bg-[#0B1228]/85 p-3 backdrop-blur-sm">
                    <p className="font-mono-tabular text-xs text-sky-400">01</p>
                    <p className="mt-1 text-xs font-semibold text-white">{t.welcome.stagesPreview.pre}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B1228]/85 p-3 backdrop-blur-sm">
                    <p className="font-mono-tabular text-xs text-violet-400">02</p>
                    <p className="mt-1 text-xs font-semibold text-white">{t.welcome.stagesPreview.in}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#0B1228]/85 p-3 backdrop-blur-sm">
                    <p className="font-mono-tabular text-xs text-amber-400">03</p>
                    <p className="mt-1 text-xs font-semibold text-white">{t.welcome.stagesPreview.post}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <OptionalAdBanner />
    </div>
  );
};
