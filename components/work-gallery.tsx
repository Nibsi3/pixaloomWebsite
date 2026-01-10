'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/components/utils';

type Props = {
  title: string;
  heroPng: string;
  heroFallback: string;
  gallery?: string[];
};

export function WorkGallery({ title, heroPng, heroFallback, gallery }: Props) {
  const images = useMemo(() => {
    const merged = [heroPng, ...(gallery || [])];
    const uniq: string[] = [];
    for (const src of merged) {
      if (!src) continue;
      if (!uniq.includes(src)) uniq.push(src);
    }
    return uniq;
  }, [heroPng, gallery]);

  const [active, setActive] = useState(images[0] || heroPng);

  return (
    <div className="card overflow-hidden">
      <div className="bg-bg-900/20 p-3 sm:p-4">
        <div className="rounded-lg border border-bg-700 bg-bg-900/20 p-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-bg-850">
            <picture>
              <source srcSet={encodeURI(active)} type="image/png" />
              <img
                src={heroFallback}
                alt={title}
                className="h-full w-full object-cover"
              />
            </picture>
          </div>
        </div>

        {images.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((src) => {
              const selected = src === active;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(src)}
                  className={cn(
                    'shrink-0 rounded-md border bg-bg-850/40 p-1 transition',
                    selected
                      ? 'border-accent-500/60 shadow-glow'
                      : 'border-bg-700 hover:border-fg-300/30',
                  )}
                  aria-pressed={selected}
                >
                  <div className="h-14 w-24 overflow-hidden rounded bg-bg-850">
                    <img
                      src={encodeURI(src)}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
