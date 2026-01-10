'use client';

import { useEffect, useMemo, useState } from 'react';
import { TerminalIntro } from '@/components/terminal-intro';
import { ContactCTA } from '@/components/contact-cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Metrics } from '@/components/metrics';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Timeline } from '@/components/timeline';
import { WebsitesMade } from '@/components/websites-made';

export function TerminalLanding() {
  const [mode, setMode] = useState<'terminal' | 'closing' | 'site'>('terminal');
  const [typed, setTyped] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const closingScript = useMemo(
    () =>
      [
        '$ exit',
        'closing terminal...',
        '',
        '$ loading navigation...',
        '→ /projects',
        '→ /work',
        '→ /skills',
        '→ /timeline',
        '→ /contact',
        '',
        '$ done',
      ].join('\n'),
    [],
  );

  useEffect(() => {
    if (mode !== 'closing') return;

    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setTyped(closingScript.slice(0, i));
      if (i >= closingScript.length) {
        window.clearInterval(id);
        window.setTimeout(() => setMode('site'), 300);
      }
    }, 12);

    return () => window.clearInterval(id);
  }, [mode, closingScript]);

  function closeTerminal() {
    setMode('closing');
  }

  function openTerminal() {
    setMode('terminal');
  }

  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      {mode === 'terminal' ? (
        <div className="fixed inset-0 z-[60] bg-bg-900">
          <div className="flex h-full items-start justify-center px-4 pt-16 sm:pt-20">
            <div className="w-full">
              <TerminalIntro embedded onMinimizeAction={closeTerminal} />
            </div>
          </div>
        </div>
      ) : null}

      {mode === 'closing' ? (
        <div className="fixed inset-0 z-[60] bg-bg-900">
          <div className="flex h-full items-start justify-center px-4 pt-16 sm:pt-20">
            <div className="w-full max-w-3xl rounded-lg border border-bg-700 bg-bg-850/40 p-4 shadow-xl">
              <pre className="whitespace-pre-wrap font-mono text-sm text-fg-200">{typed}</pre>
              <div className="mt-3 font-mono text-xs text-fg-500">tip: press ↑ to regret your last command</div>
            </div>
          </div>
        </div>
      ) : null}

      {mode === 'site' ? (
        <>
          <Header />
          <div className="md:pl-[280px]">
            <main>
              <Hero />
              <Metrics />
              <Projects />
              <WebsitesMade />
              <Skills />
              <Timeline />
              <ContactCTA />
            </main>
            <Footer />
          </div>

          {/* Minimized launcher */}
          {mounted ? (
            <button
              onClick={openTerminal}
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
        </>
      ) : null}
    </div>
  );
}
