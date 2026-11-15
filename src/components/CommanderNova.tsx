import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';

interface CommanderNovaProps {
  message: string;
}

export const CommanderNova: React.FC<CommanderNovaProps> = ({ message }) => {
  const { t, isRtl } = useGalaKidd();
  const [minimized, setMinimized] = useState(false);

  return (
    <div
      className={`fixed bottom-4 z-30 max-w-xs sm:max-w-sm ${
        isRtl ? 'left-4' : 'right-4'
      }`}
    >
      {minimized ? (
        <button
          type="button"
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2.5 rounded-full border border-indigo-400/30 bg-[#10172E]/95 px-4 py-2.5 text-sm font-medium text-slate-100 shadow-lg backdrop-blur-md transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-sky-400"
        >
          <img
            src="/src/assets/images/guide_astro_character_1794775762732.jpg"
            alt={t.novaGuide.name}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full object-cover border border-sky-400/50"
          />
          <span className="whitespace-nowrap">{t.novaGuide.expand}</span>
          <MessageCircle className="h-4 w-4 text-sky-400" />
        </button>
      ) : (
        <div className="rounded-2xl border border-indigo-400/25 bg-[#10172E]/95 p-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-start gap-3">
            <img
              src="/src/assets/images/guide_astro_character_1794775762732.jpg"
              alt={t.novaGuide.name}
              referrerPolicy="no-referrer"
              className="h-12 w-12 shrink-0 rounded-xl object-cover border border-sky-400/40 bg-[#0B1226]"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-display text-sm font-semibold text-white">{t.novaGuide.name}</p>
                  <p className="text-xs text-sky-300">{t.novaGuide.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMinimized(true)}
                  aria-label={t.novaGuide.minimize}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-200">{message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
