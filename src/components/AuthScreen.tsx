import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';
import { LanguageSelector } from './TopNav';

interface AuthScreenProps {
  initialMode: 'signup' | 'signin';
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode, onBack }) => {
  const { t, login, register } = useGalaKidd();
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  const [astronautName, setAstronautName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotInfo, setShowForgotInfo] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const mapError = (code: string): string => {
    const map = t.auth.errors as Record<string, string>;
    return map[code] || t.auth.errors.NETWORK_ERROR;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);
    try {
      if (mode === 'signup') {
        await register({
          email,
          password,
          astronautName,
          guardianName,
          guardianConsent,
          rememberMe,
        });
      } else {
        await login(email, password, rememberMe);
      }
    } catch (err) {
      const code = err instanceof Error ? err.message : 'NETWORK_ERROR';
      setErrorMsg(mapError(code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          <span>{t.auth.backToWelcome}</span>
        </button>
        <LanguageSelector compact />
      </header>

      <main className="mx-auto flex w-full max-w-lg flex-1 items-center px-4 py-6">
        <div className="w-full rounded-2xl border border-indigo-400/25 bg-[#10172E]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <h1 className="font-display text-2xl font-bold text-white">
            {mode === 'signup' ? t.auth.signUpTitle : t.auth.signInTitle}
          </h1>

          {errorMsg && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/50 px-4 py-3 text-sm text-rose-200"
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    {t.auth.astronautName}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute top-3 start-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      maxLength={32}
                      value={astronautName}
                      onChange={(e) => setAstronautName(e.target.value)}
                      placeholder={t.auth.astronautPlaceholder}
                      className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] py-2.5 ps-9 pe-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    {t.auth.guardianName}
                  </label>
                  <div className="relative">
                    <ShieldCheck className="pointer-events-none absolute top-3 start-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      maxLength={48}
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder={t.auth.guardianPlaceholder}
                      className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] py-2.5 ps-9 pe-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                {t.auth.email}
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-3 start-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.auth.emailPlaceholder}
                  className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] py-2.5 ps-9 pe-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-200">{t.auth.password}</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setShowForgotInfo((prev) => !prev)}
                    className="text-xs text-sky-400 hover:underline"
                  >
                    {t.auth.forgotPasswordLink}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-3 start-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.auth.passwordPlaceholder}
                  className="w-full rounded-xl border border-indigo-400/25 bg-[#080E20] py-2.5 ps-9 pe-3 text-sm text-white placeholder-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            {showForgotInfo && mode === 'signin' && (
              <div className="rounded-xl border border-sky-400/30 bg-sky-950/40 p-3.5 text-xs text-slate-200">
                <div className="flex items-center gap-2 font-semibold text-sky-300">
                  <HelpCircle className="h-4 w-4 shrink-0" />
                  <span>{t.auth.forgotPasswordTitle}</span>
                </div>
                <p className="mt-1.5 leading-relaxed">{t.auth.forgotPasswordBody}</p>
              </div>
            )}

            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500"
              />
              <span>{t.auth.rememberMe}</span>
            </label>

            {mode === 'signup' && (
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3.5 space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 shrink-0"
                  />
                  <span>{t.auth.guardianConsent}</span>
                </label>
                <p className="text-[11px] text-slate-400">{t.auth.privacyNote}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-sky-500 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-400 disabled:opacity-60"
            >
              {submitting ? '...' : mode === 'signup' ? t.auth.submitSignUp : t.auth.submitSignIn}
            </button>
          </form>

          <p className="mt-4 text-xs leading-relaxed text-slate-400">{t.auth.externalAuthNote}</p>

          <div className="mt-5 border-t border-indigo-400/15 pt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setMode(mode === 'signup' ? 'signin' : 'signup');
              }}
              className="text-xs font-medium text-sky-400 hover:underline"
            >
              {mode === 'signup' ? t.auth.switchToSignIn : t.auth.switchToSignUp}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
