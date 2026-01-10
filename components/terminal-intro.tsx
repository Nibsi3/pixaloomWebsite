'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Game2048, GuessGame, HackOverlay, SnakeGame } from '@/components/hack-overlay';
import { workItems } from '@/components/work-items';

type Line =
  | { id: string; kind: 'banner'; text: string }
  | { id: string; kind: 'prompt'; cwd: string; input: string }
  | { id: string; kind: 'out'; text: string }
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

function helpText() {
  return [
    'Available commands:',
    '  help                         Show this help',
    '  about                        Who Pixaloom is',
    '  services                     What Pixaloom builds',
    '  projects                     List projects (open <slug>)',
    '  open <slug>                  Open project detail page',
    '  goto <section>               Scroll to section (projects|work|skills|timeline|contact)',
    '  github                       Show latest GitHub activity',
    '  weather                      Show live weather (George, WC)',
    '  joke                         Fetch a random dev joke',
    '  hack                         Open built-in mini games menu',
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
        'Pixaloom builds modern websites and web apps:',
        '  - conversion-first UX',
        '  - performance + SEO',
        '  - clean engineering',
        '',
        "type: services  |  projects  |  goto contact",
      ].join('\n'),
    });
    return { out };
  }

  if (cmd === 'services') {
    out.push({
      id: uid(),
      kind: 'out',
      text: [
        'Services:',
        '  - Web design + development (Next.js)',
        '  - Landing pages that convert',
        '  - Web apps / dashboards',
        '  - SEO foundations + performance tuning',
        '  - Ongoing support + iteration',
      ].join('\n'),
    });
    return { out };
  }

  if (cmd === 'projects') {
    out.push({ id: uid(), kind: 'out', text: formatProjectsList() || 'No projects found.' });
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
      text: ['about', 'services', 'projects', 'contact'].join('   '),
    });
    return { out };
  }

  out.push({ id: uid(), kind: 'out', text: `${cmd}: command not found` });
  return { out };
}

export function TerminalIntro({ embedded = false, onMinimizeAction }: TerminalIntroProps) {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    return 'bg-white border-bg-200 text-bg-950';
  }, []);

  const accent = useMemo(() => {
    return '#2563eb';
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
    setLines((prev) => [...prev, { id: uid(), kind: 'out', text }]);
  }

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

  function onSubmit() {
    const input = currentInput;

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
        setLines((prev) => [...prev, ...out]);
      }
    }

    setHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
    setCurrentInput('');
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
        'projects',
        'open',
        'goto',
        'github',
        'weather',
        'joke',
        'hack',
        'clear',
        'ls',
        'cd',
      ];
      const match = candidates.find((c) => c.startsWith(v));
      if (match) setCurrentInput(match + (match === 'open' || match === 'goto' || match === 'cd' ? ' ' : ''));
    }
  }

  const windowControls = (
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
  );

  return (
    <section id={embedded ? undefined : 'top'} className={embedded ? 'relative' : 'relative overflow-hidden pt-10 sm:pt-14'}>
      <div className={embedded ? 'mx-auto w-[min(1200px,95vw)]' : 'mx-auto w-full max-w-7xl px-4 sm:px-6'}>
        <div className={`overflow-hidden rounded-lg border ${themeClasses}`}>
          <div className="flex items-center justify-between border-b border-bg-200 bg-bg-50 px-4 py-3">
            <div className="flex items-center gap-3">
              {windowControls}
              <div className="flex items-center gap-2 text-sm font-medium text-bg-900">
                <span className="rounded-md border border-bg-200 bg-white px-2 py-1 text-[11px]">Terminal</span>
                <span className="hidden sm:inline">pixaloom</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-bg-600">EN</span>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div
              ref={shellRef}
              className="h-[520px] overflow-y-auto rounded-lg border border-bg-200 bg-white p-4 font-mono text-sm leading-relaxed"
            >
              {lines.map((l) => {
                if (l.kind === 'banner') {
                  return (
                    <pre key={l.id} className="mb-4 text-[11px] leading-tight text-bg-800">
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
                      <span className="text-bg-950">{l.input}</span>
                    </div>
                  );
                }
                if (l.kind === 'out_html') {
                  return (
                    <div
                      key={l.id}
                      className="mt-2 text-bg-800"
                      dangerouslySetInnerHTML={{ __html: l.html }}
                    />
                  );
                }
                return (
                  <pre key={l.id} className="mt-2 whitespace-pre-wrap text-bg-800">
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
                  className="w-full bg-transparent font-mono text-bg-950 outline-none"
                  placeholder="type a command…"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-bg-600">More:</span>
              <button
                className="rounded-full border border-bg-200 bg-white px-3 py-1 font-mono text-[11px] text-bg-800 hover:border-accent-500"
                onClick={() => {
                  setCurrentInput('github');
                  inputRef.current?.focus();
                }}
              >
                github
              </button>
              <button
                className="rounded-full border border-bg-200 bg-white px-3 py-1 font-mono text-[11px] text-bg-800 hover:border-accent-500"
                onClick={() => {
                  setCurrentInput('weather');
                  inputRef.current?.focus();
                }}
              >
                weather
              </button>
              <button
                className="rounded-full border border-bg-200 bg-white px-3 py-1 font-mono text-[11px] text-bg-800 hover:border-accent-500"
                onClick={() => {
                  setCurrentInput('joke');
                  inputRef.current?.focus();
                }}
              >
                joke
              </button>
              <span className="mx-1 text-bg-300">|</span>
              <button
                className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] text-accent-600 hover:border-accent-500/60"
                onClick={() => {
                  setHackOpen(true);
                  inputRef.current?.focus();
                }}
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
