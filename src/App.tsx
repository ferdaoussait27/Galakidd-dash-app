import React, { useState } from 'react';
import { GalaKiddProvider, useGalaKidd } from './context/GalaKiddContext';
import { GalaxyBackground } from './components/GalaxyBackground';
import { TopNav } from './components/TopNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { StageOverview } from './components/StageOverview';
import { ActivityView } from './components/ActivityView';
import { SpaceSimulatorView } from './components/SpaceSimulatorView';
import { NasaResourcesView } from './components/NasaResourcesView';
import { BadgesView } from './components/BadgesView';
import { SettingsView } from './components/SettingsView';

const GalaKiddShell: React.FC = () => {
  const { authReady, route, activeActivityId } = useGalaKidd();
  const [authModalMode, setAuthModalMode] = useState<'signup' | 'signin' | null>(null);

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GalaxyBackground />
        <div className="text-center space-y-3">
          <div className="mx-auto h-10 w-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
          <p className="font-display text-sm text-slate-300">GalaKidd</p>
        </div>
      </div>
    );
  }

  if (authModalMode) {
    return (
      <>
        <GalaxyBackground />
        <AuthScreen
          initialMode={authModalMode}
          onBack={() => setAuthModalMode(null)}
        />
      </>
    );
  }

  if (route === 'welcome') {
    return (
      <>
        <GalaxyBackground />
        <WelcomeScreen onOpenAuth={(mode) => setAuthModalMode(mode)} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GalaxyBackground />
      <TopNav />
      <main className="flex-1">
        {route === 'dashboard' && (
          <Dashboard onRequestSignUp={() => setAuthModalMode('signup')} />
        )}
        {route === 'stage_preflight' && <StageOverview stage="PRE_FLIGHT" />}
        {route === 'stage_inflight' && <StageOverview stage="IN_FLIGHT" />}
        {route === 'stage_postflight' && <StageOverview stage="POST_FLIGHT" />}
        {route === 'activity' && activeActivityId && (
          <ActivityView activityId={activeActivityId} />
        )}
        {route === 'simulator' && <SpaceSimulatorView />}
        {route === 'nasa_resources' && <NasaResourcesView />}
        {route === 'badges' && <BadgesView />}
        {route === 'settings' && <SettingsView />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <GalaKiddProvider>
      <GalaKiddShell />
    </GalaKiddProvider>
  );
}
