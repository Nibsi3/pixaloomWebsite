'use client';

import { useEffect, useState } from 'react';
import { TerminalIntro } from '@/components/terminal-intro';
import { Hero } from '@/components/hero';

export function TerminalLanding() {
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative">
      <Hero />

      {/* Minimized launcher */}
      {!open && mounted ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-6 top-24 z-[55] rounded-xl border border-bg-700 bg-bg-850/90 px-3 py-2 shadow-xl backdrop-blur transition hover:border-accent-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">💻</span>
            <div className="text-left">
              <div className="font-mono text-[11px] text-fg-100">terminal</div>
              <div className="text-[10px] text-fg-300">click to reopen</div>
            </div>
          </div>
        </button>
      ) : null}

      {/* Terminal overlay */}
      <div
        className={`fixed inset-0 z-[54] flex items-start justify-center px-4 pt-20 transition-all duration-300 sm:pt-24 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`w-full transition-all duration-300 ${
            open ? 'translate-y-0 scale-100' : '-translate-y-2 scale-[0.98]'
          }`}
        >
          <TerminalIntro embedded onMinimizeAction={() => setOpen(false)} />
        </div>
      </div>

      {/* Dim background when open */}
      <div
        className={`fixed inset-0 z-[53] bg-bg-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
