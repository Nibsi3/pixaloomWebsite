'use client';

import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? Math.random() * 15 + 5 : Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setFadeOut(true), 300);
      const hideTimeout = setTimeout(() => setVisible(false), 800);
      return () => {
        clearTimeout(timeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-900 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative">
        {/* Animated logo */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute h-20 w-20 animate-ping rounded-full bg-accent-500/20" />
          <div className="absolute h-16 w-16 animate-pulse rounded-full bg-accent-500/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-lg border border-bg-700 bg-bg-800 text-xl font-bold text-fg-100 shadow-glow">
            cf
          </div>
        </div>

        {/* Terminal-style text */}
        <div className="font-mono text-sm text-fg-300">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-accent-500">$</span>
            <span className="typing-animation">initializing portfolio...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-accent-500">$</span>
            <span>loading assets [{Math.round(progress)}%]</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-bg-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Animated dots */}
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-500"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}
