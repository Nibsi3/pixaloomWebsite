'use client';

import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { TerminalIntro } from '@/components/terminal-intro';
import { workItems } from '@/components/work-items';

type AppId = 'terminal' | 'about' | 'services' | 'portfolio' | 'contact';

type WindowState = {
  id: string;
  app: AppId;
  title: string;
  minimized: boolean;
  maximized: boolean;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
  booting: boolean;
  bootText: string;
  bootIndex: number;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function appTitle(app: AppId) {
  switch (app) {
    case 'terminal':
      return 'Terminal';
    case 'about':
      return 'About';
    case 'services':
      return 'Services';
    case 'portfolio':
      return 'Portfolio';
    case 'contact':
      return 'Contact';
  }
}

function bootScript(app: AppId) {
  const name = appTitle(app);
  return [
    `[ OK ] Launching ${name}...`,
    `[ OK ] Initializing UI...`,
    `[ OK ] Mounting modules...`,
    `[ OK ] Rendering window...`,
    `[ OK ] Ready.`,
  ].join('\n');
}

function TerminalLikePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="h-full w-full rounded-md border border-bg-700 bg-bg-900/40">
      <div className="border-b border-bg-700 bg-bg-900/25 px-4 py-3">
        <div className="font-mono text-[11px] text-fg-200">{title}</div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function DesktopShell() {
  const zTopRef = useRef(10);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const dragRef = useRef<{
    id: string | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  }>({ id: null, startX: 0, startY: 0, startLeft: 0, startTop: 0 });

  const [windows, setWindows] = useState<WindowState[]>(() => {
    // Start with terminal open
    const id = uid();
    const b = bootScript('terminal');
    return [
      {
        id,
        app: 'terminal',
        title: 'Terminal',
        minimized: false,
        maximized: false,
        z: 10,
        x: 120,
        y: 90,
        w: 980,
        h: 640,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ];
  });

  // Boot animation per window
  useEffect(() => {
    const id = window.setInterval(() => {
      setWindows((prev) => {
        let changed = false;
        const next = prev.map((w) => {
          if (!w.booting) return w;
          const step = Math.min(w.bootIndex + 6, w.bootText.length);
          if (step >= w.bootText.length) {
            changed = true;
            return { ...w, booting: false, bootIndex: w.bootText.length };
          }
          changed = true;
          return { ...w, bootIndex: step };
        });
        return changed ? next : prev;
      });
    }, 16);

    return () => window.clearInterval(id);
  }, []);

  // Clock + weather
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState<{ temp: number | null; city: string } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        const data = (await res.json()) as
          | { ok: true; city: string; temperatureC: number | null }
          | { ok: false; error: string };
        if (cancelled) return;
        if ('ok' in data && data.ok) {
          setWeather({ city: data.city, temp: data.temperatureC });
        }
      } catch {
        // ignore
      }
    }
    void load();
    const id = window.setInterval(load, 1000 * 60 * 5);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  function focusWindow(id: string) {
    zTopRef.current += 1;
    const nextZ = zTopRef.current;
    setActiveWindowId(id);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: nextZ, minimized: false } : w)));
  }

  function openApp(app: AppId) {
    // If already open but minimized, restore
    const existing = windows.find((w) => w.app === app);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    const id = uid();
    const title = appTitle(app);
    const b = bootScript(app);

    zTopRef.current += 1;
    const z = zTopRef.current;

    setWindows((prev) => [
      ...prev,
      {
        id,
        app,
        title,
        minimized: false,
        maximized: false,
        z,
        x: 140 + Math.round(Math.random() * 80),
        y: 90 + Math.round(Math.random() * 60),
        w: app === 'terminal' ? 980 : 720,
        h: app === 'terminal' ? 640 : 520,
        booting: true,
        bootText: b,
        bootIndex: 0,
      },
    ]);
    setActiveWindowId(id);
  }

  function closeWindow(id: string) {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function minimizeWindow(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveWindowId((cur) => (cur === id ? null : cur));
  }

  function toggleMaximize(id: string) {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }

  function startDrag(id: string, e: React.PointerEvent<HTMLDivElement>) {
    const win = windows.find((w) => w.id === id);
    if (!win || win.maximized) return;
    focusWindow(id);
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, startLeft: win.x, startTop: win.y };
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    const activeId = dragRef.current.id;
    if (!activeId) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== activeId) return w;
        const nx = clamp(dragRef.current.startLeft + dx, 12, window.innerWidth - 120);
        const ny = clamp(dragRef.current.startTop + dy, 12, window.innerHeight - 120);
        return { ...w, x: nx, y: ny };
      }),
    );
  }

  function endDrag() {
    dragRef.current.id = null;
  }

  const taskbarApps = useMemo(
    () => [
      { app: 'terminal' as const, icon: '/os/terminal.png', label: 'Terminal' },
      { app: 'about' as const, icon: '/os/about.png', label: 'About' },
      { app: 'services' as const, icon: '/os/services.png', label: 'Services' },
      { app: 'portfolio' as const, icon: '/os/portfolio.png', label: 'Portfolio' },
      { app: 'contact' as const, icon: '/os/contact.png', label: 'Contact' },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: "url('/os/kali-wallpaper.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/35" />

      {/* Windows */}
      {windows
        .filter((w) => !w.minimized)
        .sort((a, b) => a.z - b.z)
        .map((w) => {
          const style = w.maximized
            ? { left: 10, top: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 62px)' }
            : { left: w.x, top: w.y, width: w.w, height: w.h };

          const isTerminal = w.app === 'terminal';

          return (
            <div
              key={w.id}
              className={`absolute rounded-xl border border-white/10 shadow-2xl backdrop-blur-md ${
                w.id === activeWindowId ? 'bg-bg-900/55' : 'bg-bg-900/45'
              }`}
              style={style as CSSProperties}
              onMouseDown={() => focusWindow(w.id)}
            >
              {/* Titlebar */}
              <div
                className="flex cursor-default items-center justify-between gap-3 rounded-t-xl border-b border-white/10 bg-bg-900/45 px-3 py-2"
                onPointerDown={(e) => startDrag(w.id, e)}
                onPointerMove={onDragMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-3 w-3 rounded-full bg-[#ff5f57]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (w.app === 'terminal') {
                          minimizeWindow(w.id);
                        } else {
                          closeWindow(w.id);
                        }
                      }}
                      title="Close"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#febc2e]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        minimizeWindow(w.id);
                      }}
                      title="Minimize"
                    />
                    <button
                      className="h-3 w-3 rounded-full bg-[#28c840]"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMaximize(w.id);
                      }}
                      title="Maximize"
                    />
                  </div>
                  <div className="font-mono text-[11px] text-fg-200">{w.title}</div>
                </div>
                <div className="font-mono text-[10px] text-fg-400">kali@pixa:~</div>
              </div>

              {/* Content */}
              <div className="h-[calc(100%-40px)] p-3">
                <div className="h-full">
                  {w.booting ? (
                    <div className="h-full rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs text-fg-200">
                      <pre className="whitespace-pre-wrap">{w.bootText.slice(0, w.bootIndex)}</pre>
                      <div className="mt-2 text-fg-500">▮</div>
                    </div>
                  ) : isTerminal ? (
                    <div className="h-full">
                      <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                        <TerminalIntro embedded hideHeader hideExit />
                      </div>
                    </div>
                  ) : w.app === 'about' ? (
                    <TerminalLikePanel title="about">
                      <div className="text-sm text-fg-100">Pixaloom is a web design + development studio.</div>
                      <div className="mt-3 text-sm text-fg-300">
                        Conversion-first UX, clean engineering, and performance that feels instant.
                      </div>
                    </TerminalLikePanel>
                  ) : w.app === 'services' ? (
                    <TerminalLikePanel title="services">
                      <div className="text-sm text-fg-100">Websites + web apps that convert.</div>
                      <div className="mt-3 space-y-2 text-sm text-fg-300">
                        <div>- Landing pages</div>
                        <div>- Business sites</div>
                        <div>- Dashboards + portals</div>
                        <div>- SEO + performance</div>
                      </div>
                    </TerminalLikePanel>
                  ) : w.app === 'portfolio' ? (
                    <TerminalLikePanel title="portfolio">
                      <div className="text-sm text-fg-100">Projects</div>
                      <div className="mt-3 space-y-3">
                        {workItems.slice(0, 5).map((p) => (
                          <div key={p.slug} className="rounded-md border border-bg-700 bg-bg-850/30 p-3">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-medium text-fg-100">{p.name}</div>
                              <button
                                className="rounded border border-accent-500/30 bg-accent-500/10 px-2 py-1 text-xs text-accent-400 hover:border-accent-500/60"
                                onClick={() => {
                                  // open in browser
                                  window.location.href = `/work/${p.slug}`;
                                }}
                              >
                                Open
                              </button>
                            </div>
                            <div className="mt-1 text-xs text-fg-300">{p.meta}</div>
                          </div>
                        ))}
                      </div>
                    </TerminalLikePanel>
                  ) : (
                    <TerminalLikePanel title="contact">
                      <div className="text-sm text-fg-100">Let’s build something.</div>
                      <div className="mt-3 space-y-2 font-mono text-sm text-fg-200">
                        <div>phone: 0662995533</div>
                        <div>email: info@pixaloom.co.za</div>
                      </div>
                    </TerminalLikePanel>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {/* Taskbar - Linux dock style */}
      <div className="absolute bottom-2 left-1/2 z-[80] -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-bg-900/70 px-2 py-2 shadow-2xl backdrop-blur-xl">
          {taskbarApps.map((a) => {
            const win = windows.find((w) => w.app === a.app);
            const active = win && !win.minimized && win.id === activeWindowId;
            const open = !!win && !win.minimized;
            return (
              <button
                key={a.app}
                onClick={() => openApp(a.app)}
                title={a.label}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-150 hover:scale-110 hover:bg-white/10 ${
                  active ? 'bg-white/15' : open ? 'bg-white/5' : ''
                }`}
              >
                <img src={a.icon} alt={a.label} className="h-8 w-8 object-contain" />
                {open && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-500" />
                )}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-bg-900/90 px-2 py-1 text-xs text-fg-100 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {a.label}
                </span>
              </button>
            );
          })}

          {/* Separator */}
          <div className="mx-1 h-8 w-px bg-white/10" />

          {/* Clock/Weather widget */}
          <div className="flex flex-col items-center justify-center px-3 text-center">
            <div className="font-mono text-[11px] text-fg-200">
              {now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="font-mono text-[9px] text-fg-400">
              {weather?.temp != null ? `${Math.round(weather.temp)}°C` : '--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
