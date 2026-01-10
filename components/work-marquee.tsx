'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/components/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
  speedPxPerSec?: number;
};

export function WorkMarquee({ className, children, speedPxPerSec = 35 }: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    dragged: false,
  });

  const [paused, setPaused] = useState(false);

  const msPerPx = useMemo(() => 1000 / Math.max(1, speedPxPerSec), [speedPxPerSec]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // Start in the first half.
    el.scrollLeft = 0;

    let last = performance.now();

    const tick = (now: number) => {
      const node = viewportRef.current;
      if (!node) return;

      const state = dragRef.current;
      const shouldPause = paused || state.active;

      if (!shouldPause) {
        const dt = now - last;
        const dx = dt / msPerPx;
        node.scrollLeft += dx;

        const half = node.scrollWidth / 2;
        if (half > 0 && node.scrollLeft >= half) {
          node.scrollLeft -= half;
        }
      }

      last = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [msPerPx, paused]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = viewportRef.current;
    if (!el) return;

    dragRef.current.active = true;
    dragRef.current.dragged = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = el.scrollLeft;

    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = viewportRef.current;
    if (!el) return;

    const s = dragRef.current;
    if (!s.active) return;

    const dx = e.clientX - s.startX;
    if (!s.dragged && Math.abs(dx) > 6) s.dragged = true;

    el.scrollLeft = s.startScrollLeft - dx;

    const half = el.scrollWidth / 2;
    if (half > 0) {
      if (el.scrollLeft < 0) el.scrollLeft += half;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    }
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const el = viewportRef.current;
    if (!el) return;

    dragRef.current.active = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    // Let clicks through only if it wasn't a drag.
    setTimeout(() => {
      dragRef.current.dragged = false;
    }, 0);
  }

  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    if (dragRef.current.dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div className={cn('work-marquee', className)}>
      <div
        ref={viewportRef}
        className="work-marquee-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
    </div>
  );
}
