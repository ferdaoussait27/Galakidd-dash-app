import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type {
  ActivityId,
  AppRoute,
  AuthUser,
  Language,
  MissionProgress,
  SimulatorState,
  StageId,
  SuitId,
} from '../types/galakidd';
import { STAGE_ACTIVITY_MAP } from '../data/curriculum';
import { TRANSLATIONS } from '../i18n/translations';
import type { Translations } from '../i18n/translations';

const LOCAL_PROGRESS_KEY = 'galakidd_guest_progress_v1';
const LOCAL_LANG_KEY = 'galakidd_language_v1';

export function createInitialProgress(astronautName = 'Explorer', language: Language = 'en'): MissionProgress {
  return {
    language,
    astronautName,
    selectedSuit: 'eva_spacewalk',
    completedActivities: [],
    quizRecords: {},
    unlockedStages: ['PRE_FLIGHT'],
    earnedBadges: [],
    lastActivityId: null,
    launchCompleted: false,
    missionCompleted: false,
    simulator: {
      oxygen: 96,
      water: 92,
      food: 95,
      energy: 88,
      missionSeconds: 0,
      commsActive: true,
      solarAngle: 45,
      recyclingActive: true,
      electrolysisRate: 65,
    },
    updatedAt: new Date().toISOString(),
  };
}

function computeDerivedProgress(p: MissionProgress): MissionProgress {
  const completed = new Set<ActivityId>(p.completedActivities);
  const unlocked = new Set<StageId>(['PRE_FLIGHT']);

  const preDone = STAGE_ACTIVITY_MAP.PRE_FLIGHT.every((id) => completed.has(id));
  const inDone = STAGE_ACTIVITY_MAP.IN_FLIGHT.every((id) => completed.has(id));
  const postDone = STAGE_ACTIVITY_MAP.POST_FLIGHT.every((id) => completed.has(id));

  if (preDone || p.launchCompleted) unlocked.add('IN_FLIGHT');
  if (inDone) unlocked.add('POST_FLIGHT');

  const badges = new Set<string>(p.earnedBadges);
  if (completed.has('pre_suit')) badges.add('badge_suit_specialist');
  if (preDone) badges.add('badge_launch_ready');
  if (completed.has('in_oxygen') && completed.has('in_water')) badges.add('badge_life_support');
  if (completed.has('in_earth')) badges.add('badge_earth_observer');
  if (inDone) badges.add('badge_orbital_crew');
  if (completed.has('post_landing_sim')) badges.add('badge_safe_splashdown');

  const correctQuizCount = Object.values(p.quizRecords).filter((q) => q.completed).length;
  if (correctQuizCount >= 10) badges.add('badge_science_ace');
  if (preDone && inDone && postDone) badges.add('badge_junior_commander');

  return {
    ...p,
    unlockedStages: Array.from(unlocked),
    earnedBadges: Array.from(badges),
    launchCompleted: p.launchCompleted || preDone,
    missionCompleted: preDone && inDone && postDone,
  };
}

interface AuthCapabilities {
  emailPassword: boolean;
  guestMode: boolean;
  googleSignIn: boolean;
  phoneSmsOtp: boolean;
  emailDeliveryConfigured: boolean;
}

interface GalaKiddContextValue {
  language: Language;
  isRtl: boolean;
  t: Translations;
  setLanguage: (lang: Language) => void;
  user: AuthUser | null;
  isGuest: boolean;
  authReady: boolean;
  capabilities: AuthCapabilities;
  route: AppRoute;
  activeActivityId: ActivityId | null;
  navigate: (route: AppRoute, activityId?: ActivityId) => void;
  progress: MissionProgress;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (params: {
    email: string;
    password: string;
    astronautName: string;
    guardianName: string;
    guardianConsent: boolean;
    rememberMe: boolean;
  }) => Promise<void>;
  logout: () => Promise<void>;
  continueAsGuest: (astronautName?: string) => void;
  updateProfile: (astronautName: string) => Promise<void>;
  completeActivity: (activityId: ActivityId) => void;
  recordQuizAnswer: (questionId: string, selectedIndex: number, isCorrect: boolean) => void;
  selectSuit: (suit: SuitId) => void;
  updateSimulator: (patch: Partial<SimulatorState>) => void;
  resetAllProgress: () => void;
  markLaunchCompleted: () => void;
}

const GalaKiddContext = createContext<GalaKiddContextValue | null>(null);

export const GalaKiddProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedLang = ((): Language => {
    const raw = localStorage.getItem(LOCAL_LANG_KEY);
    return raw === 'ar' || raw === 'fr' ? raw : 'en';
  })();

  const [language, setLanguageState] = useState<Language>(savedLang);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [route, setRoute] = useState<AppRoute>('welcome');
  const [activeActivityId, setActiveActivityId] = useState<ActivityId | null>(null);
  const [capabilities, setCapabilities] = useState<AuthCapabilities>({
    emailPassword: true,
    guestMode: true,
    googleSignIn: false,
    phoneSmsOtp: false,
    emailDeliveryConfigured: false,
  });

  const [progress, setProgress] = useState<MissionProgress>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as MissionProgress;
        return computeDerivedProgress({ ...createInitialProgress('Explorer', savedLang), ...parsed });
      }
    } catch {
      // ignore invalid storage
    }
    return createInitialProgress('Explorer', savedLang);
  });

  const syncTimerRef = useRef<number | null>(null);

  // Sync HTML lang and RTL direction immediately
  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    localStorage.setItem(LOCAL_LANG_KEY, language);
  }, [language]);

  // Check existing session on mount
  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const [capRes, meRes] = await Promise.all([
          fetch('/api/auth/capabilities'),
          fetch('/api/auth/me', { credentials: 'include' }),
        ]);
        if (capRes.ok) {
          const capData = (await capRes.json()) as AuthCapabilities;
          if (active) setCapabilities(capData);
        }
        if (meRes.ok) {
          const meData = (await meRes.json()) as { user: AuthUser | null; progress: MissionProgress | null };
          if (active && meData.user) {
            setUser(meData.user);
            setIsGuest(false);
            if (meData.progress) {
              const derived = computeDerivedProgress(meData.progress);
              setProgress(derived);
              setLanguageState(derived.language || meData.user.language || savedLang);
            }
            setRoute('dashboard');
          } else if (active) {
            const guestActive = sessionStorage.getItem('galakidd_guest_active') === '1';
            if (guestActive) {
              setIsGuest(true);
              setRoute('dashboard');
            }
          }
        }
      } catch {
        // Offline / server unavailable fallback
      } finally {
        if (active) setAuthReady(true);
      }
    }
    init();
    return () => {
      active = false;
    };
  }, [savedLang]);

  const persistProgress = useCallback(
    (next: MissionProgress) => {
      const computed = computeDerivedProgress({
        ...next,
        updatedAt: new Date().toISOString(),
      });
      setProgress(computed);

      if (user) {
        if (syncTimerRef.current) window.clearTimeout(syncTimerRef.current);
        syncTimerRef.current = window.setTimeout(() => {
          fetch('/api/progress', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ progress: computed }),
          }).catch(() => {});
        }, 300);
      } else {
        try {
          localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(computed));
        } catch {
          // ignore quota issues
        }
      }
    },
    [user]
  );

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      persistProgress({ ...progress, language: lang });
      if (user) {
        fetch('/api/auth/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ language: lang }),
        }).catch(() => {});
      }
    },
    [persistProgress, progress, user]
  );

  const navigate = useCallback(
    (nextRoute: AppRoute, activityId?: ActivityId) => {
      setRoute(nextRoute);
      if (activityId) {
        setActiveActivityId(activityId);
        persistProgress({ ...progress, lastActivityId: activityId });
      } else if (nextRoute !== 'activity') {
        setActiveActivityId(null);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [persistProgress, progress]
  );

  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = (await res.json()) as { user?: AuthUser; progress?: MissionProgress; error?: string };
      if (!res.ok || !data.user) {
        throw new Error(data.error || 'INVALID_CREDENTIALS');
      }
      setUser(data.user);
      setIsGuest(false);
      sessionStorage.removeItem('galakidd_guest_active');
      if (data.progress) {
        const derived = computeDerivedProgress(data.progress);
        setProgress(derived);
        setLanguageState(derived.language || data.user.language || language);
      }
      setRoute('dashboard');
    },
    [language]
  );

  const register = useCallback(
    async (params: {
      email: string;
      password: string;
      astronautName: string;
      guardianName: string;
      guardianConsent: boolean;
      rememberMe: boolean;
    }) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...params,
          language,
          initialProgress: isGuest ? progress : undefined,
        }),
      });
      const data = (await res.json()) as { user?: AuthUser; progress?: MissionProgress; error?: string };
      if (!res.ok || !data.user) {
        throw new Error(data.error || 'NETWORK_ERROR');
      }
      setUser(data.user);
      setIsGuest(false);
      sessionStorage.removeItem('galakidd_guest_active');
      if (data.progress) {
        setProgress(computeDerivedProgress(data.progress));
      }
      setRoute('dashboard');
    },
    [isGuest, language, progress]
  );

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    setUser(null);
    setIsGuest(false);
    sessionStorage.removeItem('galakidd_guest_active');
    setRoute('welcome');
  }, []);

  const continueAsGuest = useCallback(
    (astronautName?: string) => {
      setIsGuest(true);
      sessionStorage.setItem('galakidd_guest_active', '1');
      if (astronautName && astronautName.trim()) {
        persistProgress({ ...progress, astronautName: astronautName.trim().slice(0, 32) });
      }
      setRoute('dashboard');
    },
    [persistProgress, progress]
  );

  const updateProfile = useCallback(
    async (astronautName: string) => {
      const cleaned = astronautName.trim().slice(0, 32) || 'Explorer';
      persistProgress({ ...progress, astronautName: cleaned });
      if (user) {
        const res = await fetch('/api/auth/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ astronautName: cleaned, language }),
        });
        if (res.ok) {
          const data = (await res.json()) as { user: AuthUser };
          setUser(data.user);
        }
      }
    },
    [language, persistProgress, progress, user]
  );

  const completeActivity = useCallback(
    (activityId: ActivityId) => {
      const set = new Set<ActivityId>(progress.completedActivities);
      set.add(activityId);
      persistProgress({
        ...progress,
        completedActivities: Array.from(set),
        lastActivityId: activityId,
      });
    },
    [persistProgress, progress]
  );

  const recordQuizAnswer = useCallback(
    (questionId: string, selectedIndex: number, isCorrect: boolean) => {
      const existing = progress.quizRecords[questionId];
      const nextAttempts = (existing?.attempts || 0) + 1;
      const nextRecord = {
        questionId,
        selectedIndex,
        attempts: nextAttempts,
        correctOnFirstTry: existing ? existing.correctOnFirstTry : isCorrect && nextAttempts === 1,
        completed: Boolean(existing?.completed || isCorrect),
      };
      persistProgress({
        ...progress,
        quizRecords: {
          ...progress.quizRecords,
          [questionId]: nextRecord,
        },
      });
    },
    [persistProgress, progress]
  );

  const selectSuit = useCallback(
    (suit: SuitId) => {
      persistProgress({ ...progress, selectedSuit: suit });
    },
    [persistProgress, progress]
  );

  const updateSimulator = useCallback(
    (patch: Partial<SimulatorState>) => {
      persistProgress({
        ...progress,
        simulator: {
          ...progress.simulator,
          ...patch,
        },
      });
    },
    [persistProgress, progress]
  );

  const markLaunchCompleted = useCallback(() => {
    persistProgress({
      ...progress,
      launchCompleted: true,
    });
  }, [persistProgress, progress]);

  const resetAllProgress = useCallback(() => {
    const fresh = createInitialProgress(user?.astronautName || progress.astronautName || 'Explorer', language);
    persistProgress(fresh);
  }, [language, persistProgress, progress.astronautName, user?.astronautName]);

  const value = useMemo<GalaKiddContextValue>(
    () => ({
      language,
      isRtl: language === 'ar',
      t: TRANSLATIONS[language],
      setLanguage,
      user,
      isGuest,
      authReady,
      capabilities,
      route,
      activeActivityId,
      navigate,
      progress,
      login,
      register,
      logout,
      continueAsGuest,
      updateProfile,
      completeActivity,
      recordQuizAnswer,
      selectSuit,
      updateSimulator,
      resetAllProgress,
      markLaunchCompleted,
    }),
    [
      language,
      setLanguage,
      user,
      isGuest,
      authReady,
      capabilities,
      route,
      activeActivityId,
      navigate,
      progress,
      login,
      register,
      logout,
      continueAsGuest,
      updateProfile,
      completeActivity,
      recordQuizAnswer,
      selectSuit,
      updateSimulator,
      resetAllProgress,
      markLaunchCompleted,
    ]
  );

  return <GalaKiddContext.Provider value={value}>{children}</GalaKiddContext.Provider>;
};

export function useGalaKidd(): GalaKiddContextValue {
  const ctx = useContext(GalaKiddContext);
  if (!ctx) throw new Error('useGalaKidd must be used within GalaKiddProvider');
  return ctx;
}
