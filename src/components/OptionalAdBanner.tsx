import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useGalaKidd } from '../context/GalaKiddContext';

/**
 * Optional, clearly separated, child-safe banner slot.
 * Never interrupts missions, activities, or quizzes.
 * Contains no fake ads or simulated ad revenue.
 */
export const OptionalAdBanner: React.FC = () => {
  const { t } = useGalaKidd();

  return (
    <aside
      aria-label={t.adSlot.label}
      data-ad-slot="galakidd-child-safe-banner"
      className="mx-auto mt-10 max-w-7xl px-4 pb-8 sm:px-6"
    >
      <div className="rounded-xl border border-dashed border-slate-700/80 bg-[#0B1124]/70 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-sky-400 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-300">{t.adSlot.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{t.adSlot.notice}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
