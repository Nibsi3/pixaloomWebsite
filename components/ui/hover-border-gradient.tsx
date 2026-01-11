'use client';

import * as React from 'react';
import { cn } from '@/components/utils';

type Props<T extends React.ElementType> = {
  as?: T;
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function HoverBorderGradient<T extends React.ElementType = 'button'>(
  props: Props<T>
) {
  const { as, containerClassName, className, children, ...rest } = props;
  const Comp = (as ?? 'button') as React.ElementType;

  return (
    <Comp
      {...rest}
      className={cn(
        'group relative inline-flex items-center justify-center rounded-full p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-0',
        containerClassName
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#2f81f7_0%,#38bdf8_25%,#8484ff_50%,#2f81f7_75%,#38bdf8_100%)] opacity-60 blur-[10px] transition-opacity duration-300 group-hover:opacity-90"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#2f81f7_0%,#38bdf8_25%,#8484ff_50%,#2f81f7_75%,#38bdf8_100%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        className={cn(
          'relative z-10 inline-flex items-center gap-2 rounded-full border border-bg-700/60 bg-bg-900/70 px-5 py-3 text-sm font-semibold text-fg-100 backdrop-blur transition-colors duration-200 group-hover:border-bg-700 group-hover:bg-bg-900/60',
          className
        )}
      >
        {children}
      </span>
    </Comp>
  );
}
