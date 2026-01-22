'use client';

import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '[ OK ] Starting boot sequence for PixaOS...',
  '[ OK ] Running startup functions...',
  '[ OK ] - startTerminal()',
  '[ OK ] - mountPortfolioFS()',
  '[ OK ] - hydrateUI()',
  '[ OK ] - initAnimations()',
  '[ OK ] - connectGitHub()',
  '[ OK ] - warmupCache()',
  '[ OK ] Finished running startup functions.',
  '[ OK ] Starting graphical user interface...',
];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dots, setDots] = useState('');
  const [showDots, setShowDots] = useState(false);
  const [linesShown, setLinesShown] = useState(0);

  useEffect(() => {
    const key = 'pixaloom_boot_shown';
    const startedAt = performance.now();

    let shouldShow = true;
    try {
      shouldShow = window.sessionStorage.getItem(key) !== '1';
      if (shouldShow) window.sessionStorage.setItem(key, '1');
    } catch {
      shouldShow = true;
    }

    if (!shouldShow) {
      setVisible(false);
      return;
    }

    const onBeforeUnload = () => {
      try {
        window.sessionStorage.removeItem(key);
      } catch {
        // ignore
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    const MIN_DURATION_MS = 3600;

    let progressValue = 0;
    let linesValue = 0;

    const progressId = window.setInterval(() => {
      if (progressValue >= 100) return;
      const increment = progressValue < 60 ? Math.random() * 10 + 6 : Math.random() * 6 + 2;
      progressValue = Math.min(progressValue + increment, 100);
      setProgress(progressValue);
    }, 140);

    const linesId = window.setInterval(() => {
      if (linesValue >= BOOT_LINES.length) return;
      linesValue = Math.min(linesValue + 1, BOOT_LINES.length);
      setLinesShown(linesValue);
    }, 240);

    const doneCheckId = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const linesDone = linesValue >= BOOT_LINES.length;
      const progressDone = progressValue >= 100;
      if (elapsed >= MIN_DURATION_MS && linesDone && progressDone) {
        window.clearInterval(doneCheckId);
        window.clearInterval(progressId);
        window.clearInterval(linesId);
        setShowDots(true);
        let dotCount = 0;
        const dotInterval = setInterval(() => {
          dotCount++;
          setDots('.'.repeat(dotCount));
          if (dotCount >= 3) {
            clearInterval(dotInterval);
            setTimeout(() => setVisible(false), 400);
          }
        }, 400);
      }
    }, 120);

    return () => {
      window.clearInterval(progressId);
      window.clearInterval(linesId);
      window.clearInterval(doneCheckId);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full max-w-4xl px-6">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
            <div className="h-4 w-4 rounded-sm bg-white" />
          </div>
          <div className="font-mono text-3xl tracking-[0.35em] text-white">PIXA OS</div>
          <div className="mt-2 font-mono text-sm text-white/60">Version 1.0 ¯\\_(ツ)_/¯</div>
        </div>

        <div className="mx-auto mb-8 h-1 w-full max-w-3xl overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-white transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mx-auto max-w-3xl font-mono text-[13px] leading-relaxed text-white/60">
          {BOOT_LINES.slice(0, linesShown).map((l) => (
            <div key={l} className="whitespace-pre-wrap">
              {l}
            </div>
          ))}
          {showDots ? (
            <div className="mt-4 text-2xl text-white font-mono tracking-widest">{dots}</div>
          ) : (
            <div className="mt-2 text-white/40">▮</div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.03)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}
