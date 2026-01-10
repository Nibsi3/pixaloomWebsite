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
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-bg-700 bg-bg-850">
        <div className="aspect-[16/9] w-full">
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
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((src) => {
            const selected = src === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className={cn(
                  'shrink-0 overflow-hidden rounded-md border transition',
                  selected
                    ? 'border-accent-500 ring-1 ring-accent-500/40'
                    : 'border-bg-700 opacity-60 hover:opacity-100',
                )}
                aria-pressed={selected}
              >
                <div className="h-12 w-20 bg-bg-850">
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
  );
}
