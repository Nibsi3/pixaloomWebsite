 'use client';

 import { useMemo, useState } from 'react';
 import { usePathname } from 'next/navigation';
 import Image from 'next/image';
 import { cn } from '@/components/utils';
 import { Container } from '@/components/ui/container';
 import { Button } from '@/components/ui/button';

const github = 'https://github.com/Nibsi3';

const nav = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const links = [
  { href: '/os', label: 'Pixaloom OS' },
  { href: github, label: 'GitHub' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hashPrefix = pathname === '/' ? '' : '/';

  const navResolved = useMemo(
    () =>
      nav.map((n) => ({
        ...n,
        href: n.href.startsWith('#') ? `${hashPrefix}${n.href}` : n.href,
      })),
    [hashPrefix]
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-bg-700/70 bg-bg-900/70 backdrop-blur md:hidden">
        <Container className="flex h-14 items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-800 px-3 py-2 text-sm text-fg-200"
            onClick={() => setOpen(true)}
          >
            <span className="text-xs">≡</span>
            <span>Menu</span>
          </button>

          <a href={`${hashPrefix}#top`} className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-bg-700 bg-bg-800 p-1">
              <Image src="/pixaloom-logo.svg" alt="Pixaloom" width={24} height={24} />
            </span>
            <span className="text-sm font-medium text-fg-200">cameronfalck.dev</span>
          </a>

          <Button href={`${hashPrefix}#contact`} variant="primary" size="sm">
            Hire
          </Button>
        </Container>
      </header>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] border-r border-bg-700/70 bg-bg-900/60 backdrop-blur md:block">
        <div className="flex h-full flex-col p-4">
          <a
            href={`${hashPrefix}#top`}
            className="flex items-center gap-2 rounded-lg border border-bg-700 bg-bg-800/60 px-3 py-2"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-bg-700 bg-bg-850 p-1">
              <Image src="/pixaloom-logo.svg" alt="Pixaloom" width={24} height={24} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Cameron Falck</div>
              <div className="truncate text-xs text-fg-300">Full-Stack Developer</div>
            </div>
          </a>

          <div className="mt-4">
            <div className="px-2 text-xs font-medium text-fg-300">Navigation</div>
            <nav className="mt-2 space-y-1">
              {navResolved.map((n) => (
                <a key={n.href} className="nav-item" href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-4">
            <div className="px-2 text-xs font-medium text-fg-300">Links</div>
            <nav className="mt-2 space-y-1">
              {links.map((l) => (
                <a key={l.href} className="nav-item" href={l.href}>
                  <span>{l.label}</span>
                  <span className="text-[11px] text-fg-400">↗</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-4 space-y-2">
            <Button href={`${hashPrefix}#contact`} variant="primary" size="md" className="w-full">
              Start a project
            </Button>
          </div>

          <div className="mt-auto rounded-lg border border-bg-700 bg-bg-800/50 p-3 text-xs text-fg-300">
            Based in George, Western Cape
          </div>
        </div>
      </aside>

      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/55 transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-[86%] max-w-[320px] border-r border-bg-700 bg-bg-900/95 backdrop-blur transition-transform',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-bg-700 px-4">
            <div className="text-sm font-semibold">Menu</div>
            <button
              type="button"
              className="rounded-full border border-bg-700 bg-bg-800 px-3 py-2 text-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="p-4">
            <nav className="space-y-1">
              {navResolved.map((n) => (
                <a
                  key={n.href}
                  className="nav-item"
                  href={n.href}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="mt-4">
              <div className="px-2 text-xs font-medium text-fg-300">Links</div>
              <nav className="mt-2 space-y-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    className="nav-item"
                    href={l.href}
                    onClick={() => setOpen(false)}
                  >
                    <span>{l.label}</span>
                    <span className="text-[11px] text-fg-400">↗</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-4 space-y-2">
              <Button href="#contact" variant="primary" size="md" className="w-full">
                Start a project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
