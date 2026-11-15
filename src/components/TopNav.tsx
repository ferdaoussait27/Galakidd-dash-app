import React, { useState } from 'react';
import { Globe, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import type { AppRoute, Language } from '../types/galakidd';
import { soundEngine } from '../utils/soundEffects';

export const SoundToggleButton: React.FC = () => {
  const { t } = useGalaKidd();
  const [enabled, setEnabled] = useState<boolean>(() => soundEngine.isEnabled());

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    soundEngine.setEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? t.soundOn : t.soundMuted}
      title={enabled ? t.soundOn : t.soundMuted}
      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/25 bg-[#10172E]/80 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400"
    >
      {enabled ? (
        <Volume2 className="h-3.5 w-3.5 text-sky-400" />
      ) : (
        <VolumeX className="h-3.5 w-3.5 text-slate-400" />
      )}
      <span className="hidden sm:inline">{enabled ? t.soundOn : t.soundMuted}</span>
    </button>
  );
};

export const LanguageSelector: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, t } = useGalaKidd();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-indigo-400/25 bg-[#10172E]/80 p-1">
      {!compact && <Globe className="mx-1.5 h-3.5 w-3.5 text-sky-400 shrink-0" />}
      {(['en', 'ar', 'fr'] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setLanguage(lang);
          }}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 ${
            language === lang
              ? 'bg-sky-500 text-slate-950 font-semibold'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
        >
          {t.languages[lang]}
        </button>
      ))}
    </div>
  );
};

export const TopNav: React.FC = () => {
  const { t, route, navigate, user, isGuest, logout } = useGalaKidd();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { id: AppRoute; label: string }[] = [
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'simulator', label: t.nav.simulator },
    { id: 'nasa_resources', label: t.nav.nasa },
    { id: 'badges', label: t.nav.badges },
    { id: 'settings', label: t.nav.settings },
  ];

  const handleNav = (id: AppRoute) => {
    soundEngine.playClick();
    navigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-indigo-400/15 bg-[#070B19]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleNav('dashboard')}
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          {t.brandName}
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active =
              route === item.id ||
              (item.id === 'dashboard' &&
                (route === 'stage_preflight' ||
                  route === 'stage_inflight' ||
                  route === 'stage_postflight' ||
                  route === 'activity'));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`border-b-2 py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  active
                    ? 'border-sky-400 text-white'
                    : 'border-transparent text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Sound, Language selector + Primary Auth Action */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <SoundToggleButton />
          <LanguageSelector compact />
          {user ? (
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                logout();
              }}
              className="rounded-lg border border-indigo-400/30 bg-[#10172E] px-4 py-2 text-xs font-semibold text-slate-100 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              {t.nav.signOut}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNav('welcome')}
              className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-sky-400 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-sky-400"
            >
              {isGuest ? t.nav.signIn : t.nav.signIn}
            </button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <SoundToggleButton />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-indigo-400/25 p-2 text-slate-200 hover:bg-slate-800"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-indigo-400/15 bg-[#0A1024] px-4 py-4 lg:hidden space-y-3">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`rounded-lg px-3 py-2.5 text-start text-sm font-medium ${
                  route === item.id ? 'bg-sky-500/15 text-sky-300' : 'text-slate-200 hover:bg-slate-800/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-indigo-400/15 flex flex-wrap items-center justify-between gap-3">
            <LanguageSelector />
            {user ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="rounded-lg border border-indigo-400/30 px-4 py-2 text-xs font-semibold text-slate-100"
              >
                {t.nav.signOut}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNav('welcome')}
                className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950"
              >
                {t.nav.signIn}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
