'use client';

import { useMemo, type HTMLAttributes } from 'react';
import { cn } from '@/components/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
  speedPxPerSec?: number;
};

export function WorkMarquee({ className, children, speedPxPerSec = 140, ...props }: Props) {
  const durationSec = useMemo(() => {
    const clamped = Math.max(1, speedPxPerSec);
    return Math.max(6, 12 * (140 / clamped));
  }, [speedPxPerSec]);

  return (
    <div className={cn('work-marquee', className)} {...props}>
      <div className="work-marquee-viewport">
        <div
          className="work-marquee-track"
          style={{ animation: `work-marquee-scroll ${durationSec}s linear infinite` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
