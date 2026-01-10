'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { gardenBugs, gardenPlants, type GardenBug, type GardenPlant } from '@/components/tech-garden-data';

type BloomState = {
  growth: number;
  wateredAt: number;
};

type BugState = {
  bug: GardenBug;
  x: number;
  y: number;
  createdAt: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function TechGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [waterMode, setWaterMode] = useState(false);
  const [selected, setSelected] = useState<GardenPlant | null>(null);
  const [bug, setBug] = useState<BugState | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const [blooms, setBlooms] = useState<Record<string, BloomState>>(() => {
    const initial: Record<string, BloomState> = {};
    for (const p of gardenPlants) {
      initial[p.id] = { growth: 0.35 + Math.random() * 0.25, wateredAt: 0 };
    }
    return initial;
  });

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000 / 30);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // Random bug popups
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (Math.random() > 0.35) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const b = gardenBugs[Math.floor(Math.random() * gardenBugs.length)];
      setBug({
        bug: b,
        x: 10 + Math.random() * (rect.width - 120),
        y: 12 + Math.random() * 60,
        createdAt: Date.now(),
      });

      window.setTimeout(() => setBug(null), 3500);
    }, 4500);

    return () => window.clearInterval(id);
  }, []);

  const enrichedPlants = useMemo(() => {
    return gardenPlants.map((p) => {
      const bloom = blooms[p.id] || { growth: 0.5, wateredAt: 0 };
      const t = (now - bloom.wateredAt) / 1000;
      const pulse = bloom.wateredAt ? Math.max(0, 1 - t / 2.2) : 0;
      return { ...p, bloom, pulse };
    });
  }, [blooms, now]);

  function waterPlant(id: string) {
    setBlooms((prev) => {
      const current = prev[id] || { growth: 0.4, wateredAt: 0 };
      const nextGrowth = clamp(current.growth + 0.18, 0.2, 1);
      return { ...prev, [id]: { growth: nextGrowth, wateredAt: Date.now() } };
    });
  }

  function onPlantClick(plant: GardenPlant) {
    if (waterMode) {
      waterPlant(plant.id);
      return;
    }
    setSelected(plant);
    waterPlant(plant.id);
  }

  return (
    <div className="rounded-xl border border-bg-700 bg-bg-800/50 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-mono text-sm font-medium text-fg-100">Interactive Tech Garden</div>
          <div className="mt-1 text-xs text-fg-300">
            Click plants to learn. Toggle water mode to make them grow.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={waterMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setWaterMode((v) => !v)}
          >
            {waterMode ? 'Watering: ON' : 'Watering: OFF'}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
            Close
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-hidden rounded-lg border border-bg-700 bg-[#070a0f]">
        {/* Sky */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-80" style={{
            background:
              'radial-gradient(900px 400px at 20% 10%, rgba(47,129,247,0.18), transparent 60%), radial-gradient(700px 360px at 80% 20%, rgba(168,85,247,0.14), transparent 60%), radial-gradient(600px 360px at 50% 0%, rgba(34,211,238,0.10), transparent 60%)',
          }} />
          <div className="absolute inset-0" style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            opacity: 0.25,
          }} />
        </div>

        {/* Ground */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]" style={{
          background:
            'radial-gradient(600px 260px at 30% 80%, rgba(34,197,94,0.20), transparent 60%), radial-gradient(700px 260px at 70% 90%, rgba(16,185,129,0.14), transparent 65%), linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)',
        }} />

        {/* Plants */}
        <div className="relative h-[440px] w-full">
          {enrichedPlants.map((p) => {
            const size = 42 + p.bloom.growth * 36;
            const glow = p.pulse ? 0.35 + p.pulse * 0.65 : 0.15;
            const raise = Math.sin((now / 650) + p.x) * 1.5;

            return (
              <button
                key={p.id}
                onClick={() => onPlantClick(p)}
                className="absolute rounded-full transition active:scale-95"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(-50%, -50%) translateY(${raise}px)`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `radial-gradient(circle at 30% 30%, ${p.color}55, ${p.color}22 40%, rgba(0,0,0,0.2) 70%)`,
                  border: `1px solid ${p.color}66`,
                  boxShadow: `0 0 ${18 + p.bloom.growth * 12}px ${p.color}${Math.round(glow * 255).toString(16).padStart(2, '0')}`,
                }}
                title={waterMode ? `Water ${p.name}` : p.name}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-0.5">
                  <div className="text-lg" style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.4))' }}>
                    {p.icon}
                  </div>
                  <div className="hidden sm:block font-mono text-[10px] text-fg-200" style={{ opacity: 0.85 }}>
                    {p.kind === 'project' ? 'project' : p.kind === 'fun' ? '??' : 'skill'}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Water droplets */}
          {waterMode && (
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 14 }).map((_, i) => {
                const x = (i * 73) % 100;
                const y = (i * 41) % 100;
                const t = (now / 1000) + i;
                const drift = Math.sin(t) * 2;
                const fall = (t * 18) % 110;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${(x + drift + 100) % 100}%`,
                      top: `${fall}%`,
                      width: '6px',
                      height: '10px',
                      background: 'linear-gradient(to bottom, rgba(59,130,246,0.0), rgba(59,130,246,0.65))',
                      borderRadius: '999px',
                      opacity: 0.6,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Bug */}
          {bug && (
            <div
              className="absolute z-20 rounded-lg border border-bg-600 bg-bg-900/80 px-3 py-2 backdrop-blur"
              style={{
                left: bug.x,
                top: bug.y,
                transform: `translateX(${Math.sin(now / 250) * 8}px)`,
              }}
            >
              <div className="font-mono text-[11px] text-fg-100">{bug.bug.title}</div>
              <div className="mt-1 max-w-[260px] text-xs text-fg-300">{bug.bug.message}</div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between border-t border-bg-700 bg-bg-900/40 px-3 py-2">
          <div className="font-mono text-[10px] text-fg-300">
            {waterMode ? 'Click plants to water them 🌧️' : 'Click a plant to read more 🌱'}
          </div>
          <div className="font-mono text-[10px] text-fg-400">bugs may appear…</div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-900/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="w-full max-w-lg rounded-xl border border-bg-600 bg-bg-850 p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{selected.icon}</div>
                  <div className="font-mono text-sm font-semibold text-fg-100">{selected.name}</div>
                </div>
                <div className="mt-1 text-sm text-fg-300">{selected.subtitle}</div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>

            {selected.tech && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="rounded-full border border-bg-600 bg-bg-900/40 px-2 py-0.5 text-xs text-fg-200">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 space-y-2">
              {selected.facts.map((f, i) => (
                <div key={i} className="rounded-lg border border-bg-700 bg-bg-900/35 p-3 text-sm text-fg-200">
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selected.href ? (
                <Button href={selected.href} variant="primary" size="sm">
                  Open
                </Button>
              ) : null}
              <Button
                variant={waterMode ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWaterMode((v) => !v)}
              >
                {waterMode ? 'Watering: ON' : 'Watering: OFF'}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => waterPlant(selected.id)}>
                Water this
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
