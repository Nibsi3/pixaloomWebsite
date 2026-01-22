'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import {
  IconLayoutGrid,
  IconCode,
  IconBriefcase,
  IconMail,
  IconBrandGithub,
  IconDeviceDesktop,
  IconMapPin,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

const github = 'https://github.com/Nibsi3';

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hashPrefix = pathname === '/' ? '' : '/';

  const navLinks = useMemo(
    () => [
      { label: 'Projects', href: `${hashPrefix}#projects`, icon: <IconLayoutGrid className="h-5 w-5 shrink-0 text-fg-100" /> },
      { label: 'Skills', href: `${hashPrefix}#skills`, icon: <IconCode className="h-5 w-5 shrink-0 text-fg-100" /> },
      { label: 'Experience', href: `${hashPrefix}#experience`, icon: <IconBriefcase className="h-5 w-5 shrink-0 text-fg-100" /> },
      { label: 'Contact', href: `${hashPrefix}#contact`, icon: <IconMail className="h-5 w-5 shrink-0 text-fg-100" /> },
    ],
    [hashPrefix]
  );

  const externalLinks = useMemo(
    () => [
      { label: 'Pixaloom OS', href: '/os', icon: <IconDeviceDesktop className="h-5 w-5 shrink-0 text-fg-100" /> },
      { label: 'GitHub', href: github, icon: <IconBrandGithub className="h-5 w-5 shrink-0 text-fg-100" /> },
    ],
    []
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 border-b border-bg-700/70 bg-bg-900/70 backdrop-blur md:hidden">
        <Container className="flex h-14 items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-800 px-3 py-2 text-sm text-fg-200"
            onClick={() => setMobileOpen(true)}
          >
            <IconMenu2 className="h-4 w-4" />
            <span>Menu</span>
          </button>

          <a href={`${hashPrefix}#top`} className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-bg-700 bg-bg-800 font-bold text-fg-100 text-sm">
              PX
            </span>
          </a>

          <Button href={`${hashPrefix}#contact`} variant="primary" size="sm">
            Hire
          </Button>
        </Container>
      </header>

      {/* Desktop Sidebar - Aceternity Style */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="fixed left-0 top-0 z-40 h-screen justify-between gap-6 border-r border-bg-700/70 bg-bg-900/90 backdrop-blur">
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* Logo */}
            <a
              href={`${hashPrefix}#top`}
              className="grid w-full grid-cols-[70px_1fr] items-center py-2"
            >
              <div className="flex h-10 items-center justify-center">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-bg-700 bg-bg-850 font-bold text-fg-100 text-sm">
                  PX
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <div className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SidebarLink key={link.href} link={link} />
              ))}
            </div>

            {/* External Links */}
            <div className="mt-6 flex flex-col gap-1 border-t border-bg-700/50 pt-4">
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/sidebar grid w-full grid-cols-[70px_1fr] items-center py-2"
                >
                  <div className="flex h-10 items-center justify-center">{link.icon}</div>
                  <motion.span
                    animate={{ opacity: open ? 1 : 0, scaleX: open ? 1 : 0 }}
                    initial={false}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="whitespace-pre text-sm text-fg-200 group-hover/sidebar:translate-x-1"
                    style={{ overflow: 'hidden', transformOrigin: 'left center', willChange: 'transform, opacity' }}
                  >
                    {link.label}
                  </motion.span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="grid w-full grid-cols-[70px_1fr] items-center py-2">
            <div className="flex h-10 items-center justify-center">
              <IconMapPin className="h-5 w-5 shrink-0 text-fg-400" />
            </div>
            <motion.span
              animate={{ opacity: open ? 1 : 0, scaleX: open ? 1 : 0 }}
              initial={false}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="whitespace-pre text-xs text-fg-400"
              style={{ overflow: 'hidden', transformOrigin: 'left center' }}
            >
              George, Western Cape
            </motion.span>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Mobile Sidebar Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/55 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-[86%] max-w-[320px] border-r border-bg-700 bg-bg-900/95 backdrop-blur transition-transform',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex h-14 items-center justify-between border-b border-bg-700 px-4">
            <div className="text-sm font-semibold">Menu</div>
            <button
              type="button"
              className="rounded-full border border-bg-700 bg-bg-800 px-3 py-2 text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className="nav-item flex items-center gap-3"
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 border-t border-bg-700/50 pt-4">
              <nav className="space-y-1">
                {externalLinks.map((link) => (
                  <a
                    key={link.href}
                    className="nav-item flex items-center gap-3"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.icon}
                    {link.label}
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
