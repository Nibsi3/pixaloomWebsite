'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Game2048, GuessGame, HackOverlay, SnakeGame } from '@/components/hack-overlay';
import { workItems } from '@/components/work-items';

type Line =
  | { id: string; kind: 'banner'; text: string }
  | { id: string; kind: 'prompt'; cwd: string; input: string }
  | { id: string; kind: 'out'; text: string }
  | { id: string; kind: 'out_typing'; text: string; full: string }
  | { id: string; kind: 'out_html'; html: string };

type HackGameId = 'snake' | '2048' | 'guess';

type TerminalIntroProps = {
  embedded?: boolean;
  onMinimizeAction?: () => void;
};

type CommandCtx = {
  cwd: string;
  setCwd: (cwd: string) => void;
  router: ReturnType<typeof useRouter>;
  clear: () => void;
  scrollToId: (id: string) => void;
};

function uid() {
  return Math.random().toString(16).slice(2);
}

function sanitizeText(s: string) {
  return s.replace(/[\u0000-\u001F\u007F]/g, '');
}

function formatProjectsList() {
  const items = workItems.map((w, idx) => {
    const slug = w.slug;
    const name = w.name;
    return `${String(idx + 1).padStart(2, '0')}. ${name}  (open ${slug})`;
  });
  return items.join('\n');
}

function formatPortfolioDetails() {
  const items = workItems.map((w) => {
    const meta = w.meta ? ` — ${w.meta}` : '';
    const stack = (w.stack || []).slice(0, 6).join(' · ');
    const highlights = (w.highlights || []).slice(0, 4);

    const lines = [
      `- ${w.name}${meta}`,
      `  slug: ${w.slug}`,
      `  stack: ${stack || '-'}`,
    ];

    if (highlights.length) {
      lines.push('  highlights:');
      for (const h of highlights) lines.push(`    • ${h}`);
    }

    lines.push(`  open: open ${w.slug}`);
    return lines.join('\n');
  });

  return items.join('\n\n');
}

function helpText() {
  return [
    'Available commands:',
    '  help                         Show this help',
    '  about                        Who Pixaloom is',
    '  services                     What Pixaloom builds',
    '  portfolio                    Portfolio overview (open <slug>)',
    '  projects                     Alias of portfolio',
    '  open <slug>                  Open project detail page',
    '  goto <section>               Scroll to section (projects|work|skills|timeline|contact)',
    '  github                       Show latest GitHub activity',
    '  weather                      Show live weather (George, WC)',
    '  joke                         Fetch a random dev joke',
    '  hack                         Open built-in mini games menu',
    '  contact                      Show contact details',
    '  clear                        Clear terminal',
  ].join('\n');
}

function bannerAscii() {
  return [
    ' ____  _            _                       ',
    '|  _ \\(_)_  ____ _| | ___   ___  _ __ ___ ',
    "| |_) | \\ \/ / _` | |/ _ \\ / _ \\| '_ ` _ \\",
    '|  __/| |>  < (_| | | (_) | (_) | | | | | |',
    '|_|   |_/_/\\_\\__,_|_|\\___/ \\___/|_| |_| |_|',
  ].join('\n');
}

function sectionToId(section: string) {
  switch (section) {
    case 'projects':
      return 'projects';
    case 'work':
      return 'work';
    case 'skills':
      return 'skills';
    case 'timeline':
      return 'timeline';
    case 'contact':
      return 'contact';
    default:
      return '';
  }
}

function runCommand(raw: string, ctx: CommandCtx): { out: Line[]; nextPromptCwd?: string } {
  const input = sanitizeText(raw).trim();
  if (!input) return { out: [] };

  const [cmd, ...args] = input.split(/\s+/);

  const out: Line[] = [];

  if (cmd === 'help') {
    out.push({ id: uid(), kind: 'out', text: helpText() });
    return { out };
  }

  if (cmd === 'clear') {
    ctx.clear();
    return { out: [] };
  }

  if (cmd === 'about') {
    out.push({
      id: uid(),
      kind: 'out',
      text: [
        'Pixaloom is a web design + development studio focused on shipping websites that convert.',
        '',
        'What I care about:',
        '  - conversion-first UX and clear messaging',
        '  - performance + SEO (Core Web Vitals, metadata, structure)',
        '  - clean engineering (fast iterations, maintainable code)',
        '',
        'Try: services | portfolio | contact',
      ].join('\n'),
    });
    return { out };
  }

  if (cmd === 'services') {
    out.push({
      id: uid(),
      kind: 'out',
      text: [
        'Services (what Pixaloom does):',
        '',
        'Websites:',
        '  - Landing pages that convert (copy, layout, CTAs)',
        '  - Business websites (fast, modern, SEO-ready)',
        '',
        'Web apps:',
        '  - Dashboards, portals, admin panels',
        '  - Integrations + automation',
        '',
        'Quality:',
        '  - SEO foundations, analytics, performance tuning',
        '  - Ongoing support + iteration',
      ].join('\n'),
    });
    return { out };
  }

  if (cmd === 'portfolio' || cmd === 'projects') {
    out.push({ id: uid(), kind: 'out', text: formatPortfolioDetails() || 'No projects found.' });
    return { out };
  }

  if (cmd === 'contact') {
    out.push({
      id: uid(),
      kind: 'out',
      text: [
        'Contact:',
        '  phone: 0662995533',
        '  email: info@pixaloom.co.za',
        '  whatsapp: https://wa.me/27662995533?text=',
      ].join('\n'),
    });
    return { out };
  }

  if (cmd === 'open') {
    const slug = (args[0] || '').trim();
    if (!slug) {
      out.push({ id: uid(), kind: 'out', text: 'usage: open <slug>' });
      return { out };
    }
    const exists = workItems.some((w) => w.slug === slug);
    if (!exists) {
      out.push({ id: uid(), kind: 'out', text: `project not found: ${slug}` });
      return { out };
    }
    out.push({ id: uid(), kind: 'out', text: `opening /work/${slug} ...` });
    ctx.router.push(`/work/${slug}`);
    return { out };
  }

  if (cmd === 'goto') {
    const section = (args[0] || '').toLowerCase();
    const id = sectionToId(section);
    if (!id) {
      out.push({
        id: uid(),
        kind: 'out',
        text: 'usage: goto <projects|work|skills|timeline|contact>',
      });
      return { out };
    }
    out.push({ id: uid(), kind: 'out', text: `navigating to #${id} ...` });
    ctx.scrollToId(id);
    return { out };
  }

  if (cmd === 'cd') {
    const next = args.join(' ');
    if (!next || next === '~') {
      ctx.setCwd('~/pixaloom');
      return { out, nextPromptCwd: '~/pixaloom' };
    }
    if (next === '..') {
      ctx.setCwd('~');
      return { out, nextPromptCwd: '~' };
    }
    out.push({ id: uid(), kind: 'out', text: `cd: no such file or directory: ${next}` });
    return { out };
  }

  if (cmd === 'ls') {
    out.push({
      id: uid(),
      kind: 'out',
      text: [
        'help',
        'about',
        'services',
        'portfolio',
        'projects',
        'open',
        'goto',
        'github',
        'weather',
        'joke',
        'hack',
        'contact',
        'clear',
        'cd',
        'ls',
        'jokes?',
      ].join('   '),
    });
    return { out };
  }

  if (cmd === 'jokes') {
    out.push({ id: uid(), kind: 'out', text: 'opening /jokes …' });
    ctx.router.push('/jokes');
    return { out };
  }

  out.push({ id: uid(), kind: 'out', text: `${cmd}: command not found` });
  return { out };
}

export function TerminalIntro({ embedded = false, onMinimizeAction }: TerminalIntroProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  const [cwd, setCwd] = useState('~/pixaloom');

  const [lines, setLines] = useState<Line[]>(() => [
    { id: uid(), kind: 'banner', text: bannerAscii() },
    {
      id: uid(),
      kind: 'out',
      text: 'Welcome to Pixaloom. Type help to get started.',
    },
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [currentInput, setCurrentInput] = useState('');

  const [hackOpen, setHackOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<HackGameId | null>(null);

  const themeClasses = useMemo(() => {
    return 'bg-bg-900 border-bg-700 text-fg-100';
  }, []);

  const accent = useMemo(() => {
    return '#2f81f7';
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clear() {
    setLines([{ id: uid(), kind: 'banner', text: bannerAscii() }]);
  }

  function appendOut(text: string) {
    const id = uid();
    setLines((prev) => [...prev, { id, kind: 'out_typing', text: '', full: text }]);
  }

  useEffect(() => {
    const hasTyping = lines.some((l) => l.kind === 'out_typing');
    if (!hasTyping) {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      return;
    }

    if (typingTimerRef.current) return;

    typingTimerRef.current = window.setInterval(() => {
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.kind === 'out_typing' && l.text.length < l.full.length);
        if (idx === -1) return prev;

        const line = prev[idx];
        if (line.kind !== 'out_typing') return prev;

        const remaining = line.full.length - line.text.length;
        const step = Math.min(remaining, 6);
        const nextText = line.full.slice(0, line.text.length + step);

        const nextLine: Line =
          nextText.length >= line.full.length
            ? { id: line.id, kind: 'out', text: line.full }
            : { ...line, text: nextText };

        const out = prev.slice();
        out[idx] = nextLine;
        return out;
      });
    }, 16);

    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [lines]);

  async function runAsyncCommand(cmd: 'github' | 'weather' | 'joke') {
    try {
      if (cmd === 'github') {
        const res = await fetch('/api/github', { cache: 'no-store' });
        const data = (await res.json()) as
          | { ok: true; user: string; items: { repo: string; createdAt: string | null; messages: string[] }[] }
          | { ok: false; error: string };
        if (!('ok' in data) || !data.ok) {
          appendOut(`github: ${'error' in data ? data.error : 'failed'}`);
          return;
        }

        if (!data.items.length) {
          appendOut(`GitHub (${data.user}): no recent push events found.`);
          return;
        }

        const lines = [
          `GitHub (${data.user}) — latest pushes:`,
          ...data.items.flatMap((it) => {
            const header = `- ${it.repo}${it.createdAt ? ` (${new Date(it.createdAt).toLocaleString()})` : ''}`;
            const commits = it.messages.map((m) => `    • ${m}`);
            return [header, ...commits];
          }),
        ];
        appendOut(lines.join('\n'));
        return;
      }

      if (cmd === 'weather') {
        const res = await fetch('/api/weather', { cache: 'no-store' });
        const data = (await res.json()) as
          | { ok: true; city: string; temperatureC: number | null; windKmh: number | null; weatherCode: number | null }
          | { ok: false; error: string };
        if (!('ok' in data) || !data.ok) {
          appendOut(`weather: ${'error' in data ? data.error : 'failed'}`);
          return;
        }
        const t = data.temperatureC === null ? '?' : `${Math.round(data.temperatureC)}°C`;
        const w = data.windKmh === null ? '?' : `${Math.round(data.windKmh)} km/h wind`;
        const c = data.weatherCode === null ? '?' : `code ${data.weatherCode}`;
        appendOut(`Weather — ${data.city}: ${t} · ${w} · ${c}`);
        return;
      }

      const res = await fetch('/api/joke', { cache: 'no-store' });
      const data = (await res.json()) as { ok: true; joke: string } | { ok: false; error: string };
      if (!('ok' in data) || !data.ok) {
        appendOut(`joke: ${'error' in data ? data.error : 'failed'}`);
        return;
      }
      appendOut(data.joke);
    } catch {
      appendOut(`${cmd}: unexpected error`);
    }
  }

  const ctx: CommandCtx = {
    cwd,
    setCwd,
    router,
    clear,
    scrollToId,
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // keep scrolled to bottom
    const el = shellRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, currentInput]);

  function submitValue(value: string) {
    const input = value;

    const trimmed = sanitizeText(input).trim();
    const [cmd] = trimmed.split(/\s+/);

    setLines((prev) => [
      ...prev,
      { id: uid(), kind: 'prompt', cwd, input },
    ]);

    if (cmd === 'github' || cmd === 'weather' || cmd === 'joke') {
      appendOut('fetching…');
      void runAsyncCommand(cmd);
    } else if (cmd === 'hack') {
      appendOut('opening hack menu…');
      setHackOpen(true);
    } else {
      const { out } = runCommand(input, ctx);

      if (out.length) {
        setLines((prev) => [
          ...prev,
          ...out.map((l) => {
            if (l.kind === 'out') return { id: l.id, kind: 'out_typing', text: '', full: l.text } as const;
            return l;
          }),
        ]);
      }
    }

    setHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
    setCurrentInput('');
  }

  function onSubmit() {
    submitValue(currentInput);
  }

  function typeAndRun(value: string) {
    const target = value;
    inputRef.current?.focus();
    setCurrentInput('');
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setCurrentInput(target.slice(0, i));
      if (i >= target.length) {
        window.clearInterval(id);
        window.setTimeout(() => submitValue(target), 120);
      }
    }, 18);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setCurrentInput(history[nextIndex] || '');
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setCurrentInput(nextIndex === -1 ? '' : history[nextIndex] || '');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const v = currentInput.trimStart();
      const candidates = [
        'help',
        'about',
        'services',
        'portfolio',
        'projects',
        'open',
        'goto',
        'github',
        'weather',
        'joke',
        'hack',
        'contact',
        'clear',
        'ls',
        'cd',
      ];
      const match = candidates.find((c) => c.startsWith(v));
      if (match) setCurrentInput(match + (match === 'open' || match === 'goto' || match === 'cd' ? ' ' : ''));
    }
  }

  const windowControls = (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
      <button
        aria-label="Close"
        onClick={() => onMinimizeAction?.()}
        className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
      />
      <button
        aria-label="Minimize"
        onClick={() => onMinimizeAction?.()}
        className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
      />
      <button
        aria-label="Maximize"
        className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]"
      />
      </div>
      <div className="hidden sm:block font-mono text-[11px] text-fg-400">info: click to close</div>
    </div>
  );

  return (
    <section id={embedded ? undefined : 'top'} className={embedded ? 'relative' : 'relative overflow-hidden pt-10 sm:pt-14'}>
      <div className={embedded ? 'mx-auto w-[min(1200px,95vw)]' : 'mx-auto w-full max-w-7xl px-4 sm:px-6'}>
        <div className={`overflow-hidden rounded-lg border ${themeClasses}`}>
          <div className="flex items-center justify-between border-b border-bg-700 bg-bg-900/25 px-4 py-3">
            <div className="flex items-center gap-3">
              {windowControls}
              <div className="flex items-center gap-2 text-sm font-medium text-fg-200">
                <span className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px]">Terminal</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-fg-300">EN</span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div
              ref={shellRef}
              className="h-[520px] overflow-y-auto rounded-lg border border-bg-700 bg-black/20 p-4 font-mono text-sm leading-relaxed"
            >
              {lines.map((l) => {
                if (l.kind === 'banner') {
                  return (
                    <pre key={l.id} className="mb-4 text-[11px] leading-tight text-fg-200">
                      {l.text}
                    </pre>
                  );
                }
                if (l.kind === 'prompt') {
                  return (
                    <div key={l.id} className="mt-2">
                      <span style={{ color: accent }} className="mr-2">
                        pixaloom:{l.cwd}$
                      </span>
                      <span className="text-fg-100">{l.input}</span>
                    </div>
                  );
                }
                if (l.kind === 'out_html') {
                  return (
                    <div
                      key={l.id}
                      className="mt-2 text-fg-200"
                      dangerouslySetInnerHTML={{ __html: l.html }}
                    />
                  );
                }
                return (
                  <pre key={l.id} className="mt-2 whitespace-pre-wrap text-fg-200">
                    {l.text}
                  </pre>
                );
              })}

              <div className="mt-4 flex items-center gap-2">
                <span style={{ color: accent }} className="shrink-0">
                  pixaloom:{cwd}$
                </span>
                <input
                  ref={inputRef}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  className="w-full bg-transparent font-mono text-fg-100 outline-none"
                  placeholder="type a command…"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-fg-400">Quick:</span>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('help')}
              >
                help
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('about')}
              >
                about
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('services')}
              >
                services
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('portfolio')}
              >
                portfolio
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('contact')}
              >
                contact
              </button>
              <span className="mx-1 text-fg-600">|</span>
              <span className="font-mono text-[11px] text-fg-400">More:</span>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('github')}
              >
                github
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('weather')}
              >
                weather
              </button>
              <button
                className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 font-mono text-[11px] text-fg-200 hover:border-accent-500"
                onClick={() => typeAndRun('joke')}
              >
                joke
              </button>
              <button
                className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] text-accent-400 hover:border-accent-500/60"
                onClick={() => typeAndRun('hack')}
              >
                hack
              </button>
            </div>
          </div>
        </div>
      </div>

      <HackOverlay
        open={hackOpen}
        onCloseAction={() => setHackOpen(false)}
        onSelectAction={(id) => {
          setHackOpen(false);
          setActiveGame(id);
        }}
      />
      <SnakeGame open={activeGame === 'snake'} onCloseAction={() => setActiveGame(null)} />
      <Game2048 open={activeGame === '2048'} onCloseAction={() => setActiveGame(null)} />
      <GuessGame open={activeGame === 'guess'} onCloseAction={() => setActiveGame(null)} />
    </section>
  );
}
