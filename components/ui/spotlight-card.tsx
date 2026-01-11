'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group/spotlight relative h-full overflow-hidden rounded-2xl bg-bg-800 p-px',
        className
      )}
      style={
        {
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Outer glow - gray */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 z-10 h-80 w-80 translate-x-[var(--mouse-x)] translate-y-[var(--mouse-y)] rounded-full bg-slate-400 opacity-0 blur-[100px] transition-opacity duration-500 group-hover/spotlight:opacity-100"
        aria-hidden="true"
      />
      {/* Outer glow - accent */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 z-30 h-96 w-96 translate-x-[var(--mouse-x)] translate-y-[var(--mouse-y)] rounded-full bg-accent-500 opacity-0 blur-[100px] transition-opacity duration-500 group-hover/spotlight:opacity-10"
        aria-hidden="true"
      />
      {/* Inner card */}
      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-bg-900 p-5">
        {/* Bottom radial gradient */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 aspect-square w-1/2 -translate-x-1/2 translate-y-1/2"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-full bg-bg-800 blur-[80px]" />
        </div>
        {children}
      </div>
    </div>
  );
}
