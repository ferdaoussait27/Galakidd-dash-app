import React, { useState } from 'react';
import { CheckCircle2, KeyRound, RotateCcw, Save, Shield } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { LanguageSelector } from './TopNav';

export const SettingsView: React.FC = () => {
  const { t, user, progress, updateProfile, resetAllProgress } = useGalaKidd();
  const [nameInput, setNameInput] = useState(progress.astronautName);
  const [profileSaved, setProfileSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(nameInput);
    setProfileSaved(true);
    window.setTimeout(() => setProfileSaved(false), 2500);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);
    setPasswordError(null);
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) {
      setPasswordStatus(t.settings.passwordUpdated);
      setCurrentPassword('');
      setNewPassword('');
    } else {
      const data = (await res.json()) as { error?: string };
      const errMap = t.auth.errors as Record<string, string>;
      setPasswordError(errMap[data.error || ''] || t.auth.errors.NETWORK_ERROR);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-6">
      <div className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{t.settings.title}</h1>
        <p className="mt-2 text-xs text-sky-300 flex items-center gap-2">
          <Shield className="h-4 w-4 shrink-0" />
          <span>{user ? t.settings.syncStatusCloud : t.settings.syncStatusLocal}</span>
        </p>
      </div>

      {/* Profile */}
      <form
        onSubmit={handleSaveProfile}
        className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-4"
      >
        <h2 className="font-display text-lg font-bold text-white">{t.settings.profileSection}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.settings.astronautCallsign}
            </label>
            <input
              type="text"
              maxLength={32}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
            />
          </div>
          {user && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.settings.guardianEmail}
              </label>
              <input
                type="text"
                disabled
                value={user.email}
                className="w-full rounded-xl border border-slate-800 bg-[#060A17] px-3.5 py-2.5 text-sm text-slate-400"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-semibold text-slate-950 hover:bg-sky-400"
          >
            <Save className="h-4 w-4" />
            <span>{t.settings.saveProfile}</span>
          </button>
          {profileSaved && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              {t.settings.profileSaved}
            </span>
          )}
        </div>
      </form>

      {/* Language Selector */}
      <section className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-3">
        <h2 className="font-display text-lg font-bold text-white">{t.settings.languageSection}</h2>
        <LanguageSelector />
      </section>

      {/* Password Update for Parent Account */}
      {user && (
        <form
          onSubmit={handlePasswordUpdate}
          className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-4"
        >
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-sky-400" />
            <h2 className="font-display text-lg font-bold text-white">{t.settings.securitySection}</h2>
          </div>

          {passwordError && (
            <p className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">
              {passwordError}
            </p>
          )}
          {passwordStatus && (
            <p className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-200">
              {passwordStatus}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.settings.currentPassword}
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {t.settings.newPassword}
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] px-3.5 py-2.5 text-sm text-white focus:border-sky-400 focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-xl border border-sky-400/40 bg-sky-500/15 px-4 py-2.5 text-xs font-semibold text-sky-200 hover:bg-sky-500 hover:text-slate-950"
          >
            {t.settings.updatePassword}
          </button>
        </form>
      )}

      {/* Progress Reset */}
      <section className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 space-y-3">
        <h2 className="font-display text-lg font-bold text-white">{t.settings.progressSection}</h2>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/30 px-4 py-2.5 text-xs font-semibold text-rose-200 hover:bg-rose-900/50"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t.settings.resetProgress}</span>
          </button>
        ) : (
          <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 space-y-3">
            <p className="text-xs text-rose-100">{t.settings.resetConfirm}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  resetAllProgress();
                  setConfirmReset(false);
                }}
                className="rounded-lg bg-rose-500 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-400"
              >
                {t.settings.confirmResetBtn}
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-lg border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
              >
                {t.settings.cancelBtn}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
