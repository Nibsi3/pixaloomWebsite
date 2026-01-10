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
      return 'About Pixaloom';
    case 'services':
      return 'Services';
    case 'portfolio':
      return 'Portfolio';
    case 'contact':
      return 'Contact Us';
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

function AboutApp() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl">
            🚀
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Pixaloom</h1>
            <p className="text-purple-200">Web Design & Development Studio</p>
          </div>
        </div>
        
        <div className="mb-6 rounded-xl bg-white/10 p-4">
          <h2 className="mb-2 font-semibold text-white">Who We Are</h2>
          <p className="text-sm leading-relaxed text-purple-100">
            Pixaloom is a web design and development studio focused on shipping websites that convert. 
            We combine conversion-first UX, clean engineering, and performance that feels instant.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-xs text-purple-200">Projects Delivered</div>
          </div>
          <div className="rounded-xl bg-white/10 p-4 text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-xs text-purple-200">Client Satisfaction</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="mb-3 font-semibold text-white">What We Care About</h2>
          <div className="space-y-2">
            {[
              { icon: '🎯', text: 'Conversion-first UX and clear messaging' },
              { icon: '⚡', text: 'Performance + SEO (Core Web Vitals)' },
              { icon: '🛠️', text: 'Clean engineering, fast iterations' },
              { icon: '🎨', text: 'Modern, beautiful design' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm text-purple-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-medium text-white">George, Western Cape</div>
              <div className="text-sm text-purple-200">South Africa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesApp() {
  const services = [
    {
      icon: '🌐',
      title: 'Landing Pages',
      desc: 'High-converting landing pages with compelling copy, strategic layouts, and clear CTAs',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: '🏢',
      title: 'Business Websites',
      desc: 'Fast, modern, SEO-ready websites that represent your brand professionally',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: '📊',
      title: 'Web Applications',
      desc: 'Dashboards, portals, and admin panels with seamless integrations',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔧',
      title: 'Maintenance & Support',
      desc: 'Ongoing updates, performance tuning, and technical support',
      color: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <div className="h-full overflow-auto bg-slate-900">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
        <h1 className="text-2xl font-bold text-white">Our Services</h1>
        <p className="text-cyan-100">What Pixaloom builds for you</p>
      </div>
      
      <div className="p-4 space-y-4">
        {services.map((s, i) => (
          <div key={i} className="rounded-xl bg-slate-800 p-4 border border-slate-700">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-2xl`}>
                {s.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-4">
          <h3 className="font-semibold text-cyan-100 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'].map((t) => (
              <span key={t} className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioApp() {
  return (
    <div className="h-full overflow-auto bg-neutral-900">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
        <h1 className="text-2xl font-bold text-white">Portfolio</h1>
        <p className="text-amber-100">Our recent work</p>
      </div>
      
      <div className="p-4 space-y-4">
        {workItems.map((project) => (
          <div key={project.slug} className="group rounded-xl bg-neutral-800 overflow-hidden border border-neutral-700">
            {project.png && (
              <div className="h-32 overflow-hidden">
                <img 
                  src={project.png} 
                  alt={project.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{project.name}</h3>
                  <p className="text-xs text-neutral-400">{project.meta}</p>
                </div>
              </div>
              {project.stack && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((t) => (
                    <span key={t} className="rounded bg-neutral-700 px-2 py-0.5 text-[10px] text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactApp() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-rose-900 via-pink-900 to-rose-800">
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">
            💬
          </div>
          <h1 className="text-2xl font-bold text-white">Get In Touch</h1>
          <p className="text-rose-200">Let&apos;s build something amazing together</p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3">
          <a href="tel:+27662995533" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-xl">📞</span>
            <div>
              <div className="text-xs text-rose-300">Phone</div>
              <div className="font-medium text-white">066 299 5533</div>
            </div>
          </a>
          <a href="mailto:info@pixaloom.co.za" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-xl">✉️</span>
            <div>
              <div className="text-xs text-rose-300">Email</div>
              <div className="font-medium text-white">info@pixaloom.co.za</div>
            </div>
          </a>
          <a href="https://wa.me/27662995533" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-white/10 p-4 hover:bg-white/15 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-xl">💬</span>
            <div>
              <div className="text-xs text-rose-300">WhatsApp</div>
              <div className="font-medium text-white">Send a message</div>
            </div>
          </a>
        </div>

        <div className="rounded-xl bg-white/10 p-4">
          <h2 className="mb-4 font-semibold text-white">Quick Message</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Your message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-rose-300/50 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
            />
            <button className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-2 font-medium text-white hover:from-pink-600 hover:to-rose-600 transition">
              Send Message
            </button>
          </div>
        </div>
      </div>
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
        className="absolute inset-0 bg-[#1a1a2e]"
        style={{
          backgroundImage: "url('/os/kali-wallpaper.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

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
              className={`absolute rounded-xl border border-neutral-700 shadow-2xl overflow-hidden ${
                w.id === activeWindowId ? 'ring-1 ring-white/20' : ''
              }`}
              style={style as CSSProperties}
              onMouseDown={() => focusWindow(w.id)}
            >
              {/* Titlebar */}
              <div
                className="flex cursor-default items-center justify-between gap-3 border-b border-neutral-700 bg-neutral-800 px-3 py-2"
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
              <div className="h-[calc(100%-40px)] overflow-hidden">
                {w.booting ? (
                  <div className="h-full bg-neutral-900 p-4 font-mono text-xs text-green-400">
                    <pre className="whitespace-pre-wrap">{w.bootText.slice(0, w.bootIndex)}</pre>
                    <div className="mt-2 animate-pulse">▮</div>
                  </div>
                ) : isTerminal ? (
                  <div className="h-full bg-[#1e1e2e]">
                    <TerminalIntro embedded hideHeader hideExit />
                  </div>
                ) : w.app === 'about' ? (
                  <AboutApp />
                ) : w.app === 'services' ? (
                  <ServicesApp />
                ) : w.app === 'portfolio' ? (
                  <PortfolioApp />
                ) : (
                  <ContactApp />
                )}
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
                <img src={a.icon} alt={a.label} className="h-8 w-8 object-contain brightness-0 invert" />
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
