'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { workItems } from '@/components/work-items';

type Line =
  | { id: string; kind: 'banner'; text: string }
  | { id: string; kind: 'prompt'; cwd: string; input: string }
  | { id: string; kind: 'out'; text: string }
  | { id: string; kind: 'out_html'; html: string };

type ThemeName = 'pixaloom' | 'dracula' | 'dark';

type CommandCtx = {
  cwd: string;
  setCwd: (cwd: string) => void;
  router: ReturnType<typeof useRouter>;
  clear: () => void;
  setTheme: (t: ThemeName) => void;
  theme: ThemeName;
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
    '  clear                        Clear terminal',
    '  theme <pixaloom|dracula|dark> Change terminal theme',
    '  whoami                       Identify',
    '  date                         Current time',
    '  echo <text>                  Print text',
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
  const argStr = input.slice(cmd.length).trim();

  const out: Line[] = [];

  if (cmd === 'help') {
    out.push({ id: uid(), kind: 'out', text: helpText() });
    return { out };
  }

  if (cmd === 'clear') {
    ctx.clear();
    return { out: [] };
  }

  if (cmd === 'whoami') {
    out.push({ id: uid(), kind: 'out', text: 'pixaloom' });
    return { out };
  }

  if (cmd === 'date') {
    out.push({ id: uid(), kind: 'out', text: new Date().toString() });
    return { out };
  }

  if (cmd === 'echo') {
    out.push({ id: uid(), kind: 'out', text: argStr || '' });
    return { out };
  }

  if (cmd === 'theme') {
    const t = (args[0] || '').toLowerCase() as ThemeName;
    if (t === 'pixaloom' || t === 'dracula' || t === 'dark') {
      ctx.setTheme(t);
      out.push({ id: uid(), kind: 'out', text: `theme: ${t}` });
    } else {
      out.push({ id: uid(), kind: 'out', text: 'usage: theme <pixaloom|dracula|dark>' });
    }
    return { out };
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
      text: ['about', 'services', 'projects', 'contact', 'themes'].join('   '),
    });
    return { out };
  }

  out.push({ id: uid(), kind: 'out', text: `${cmd}: command not found` });
  return { out };
}

export function TerminalIntro() {
  const router = useRouter();
  const shellRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState<ThemeName>('pixaloom');
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

  const themeClasses = useMemo(() => {
    if (theme === 'dracula') return 'bg-[#282a36] border-[#6272a4] text-[#f8f8f2]';
    if (theme === 'dark') return 'bg-bg-900 border-bg-700 text-fg-100';
    return 'bg-bg-900 border-bg-700 text-fg-100';
  }, [theme]);

  const accent = useMemo(() => {
    if (theme === 'dracula') return '#bd93f9';
    if (theme === 'dark') return '#2f81f7';
    return '#2f81f7';
  }, [theme]);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clear() {
    setLines([{ id: uid(), kind: 'banner', text: bannerAscii() }]);
  }

  const ctx: CommandCtx = {
    cwd,
    setCwd,
    router,
    clear,
    theme,
    setTheme,
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

    setLines((prev) => [
      ...prev,
      { id: uid(), kind: 'prompt', cwd, input },
    ]);

    const { out } = runCommand(input, ctx);

    if (out.length) {
      setLines((prev) => [...prev, ...out]);
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
      const candidates = ['help', 'about', 'services', 'projects', 'open', 'goto', 'clear', 'theme', 'whoami', 'date', 'echo', 'ls', 'cd'];
      const match = candidates.find((c) => c.startsWith(v));
      if (match) setCurrentInput(match + (match === 'open' || match === 'goto' || match === 'theme' || match === 'cd' || match === 'echo' ? ' ' : ''));
    }
  }

  const quickCommands = [
    { label: 'help', cmd: 'help' },
    { label: 'services', cmd: 'services' },
    { label: 'projects', cmd: 'projects' },
    { label: 'goto contact', cmd: 'goto contact' },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className={`overflow-hidden rounded-lg border ${themeClasses}`}>
          <div className="flex items-center justify-between border-b border-bg-700 bg-bg-900/25 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-fg-200">
              <span className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px]">Terminal</span>
              <span className="hidden sm:inline">pixaloom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-fg-300">EN</span>
              <span className="text-xs text-fg-400">|</span>
              <span className="text-xs text-fg-300">theme:</span>
              <button
                className="text-xs text-accent-500 hover:text-accent-400"
                onClick={() => setTheme((t) => (t === 'pixaloom' ? 'dracula' : t === 'dracula' ? 'dark' : 'pixaloom'))}
              >
                {theme}
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div
                  ref={shellRef}
                  className="h-[420px] overflow-y-auto rounded-lg border border-bg-700 bg-black/20 p-4 font-mono text-sm leading-relaxed"
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

                <div className="mt-3 flex flex-wrap gap-2">
                  {quickCommands.map((c) => (
                    <button
                      key={c.label}
                      className="rounded-full border border-bg-700 bg-bg-850 px-3 py-1 text-[11px] text-fg-200 hover:border-accent-500"
                      onClick={() => {
                        setCurrentInput(c.cmd);
                        inputRef.current?.focus();
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card card-hover p-5">
                  <div className="text-sm font-medium">Quick actions</div>
                  <div className="mt-1 text-xs text-fg-300">Skip typing if you want</div>

                  <div className="mt-5 grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        scrollToId('contact');
                      }}
                    >
                      Start a project
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => {
                        scrollToId('work');
                      }}
                    >
                      View work
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        setCurrentInput('help');
                        inputRef.current?.focus();
                      }}
                    >
                      Show commands
                    </Button>
                  </div>

                  <div className="mt-5 rounded-md border border-bg-700 bg-bg-850/30 p-3 text-xs text-fg-300">
                    Tip: press <span className="kbd">Tab</span> to autocomplete and <span className="kbd">↑</span> for history.
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-bg-700 bg-bg-850/30 p-4">
                  <div className="font-mono text-[11px] text-fg-300">Try:</div>
                  <div className="mt-2 space-y-2 font-mono text-[11px]">
                    <div className="text-fg-200">projects</div>
                    <div className="text-fg-200">open caps-tutor</div>
                    <div className="text-fg-200">goto contact</div>
                    <div className="text-fg-200">theme dracula</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
