'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { workItems, type WorkItem } from '@/components/work-items';
import { cn } from '@/components/utils';
import { IconChevronLeft, IconChevronRight, IconExternalLink } from '@tabler/icons-react';

const categories = ['All', 'Web App', 'Ecommerce', 'Business', 'News', 'Healthcare', 'AI & Backend', 'Automotive'] as const;

const featuredSlugs = ['nordflam', 'buildvolume', 'covercrete', 'featherbleu', 'george-herald', 'trakcare-barcode-scanner'];
const featuredItems = featuredSlugs
  .map((slug) => workItems.find((w) => w.slug === slug))
  .filter(Boolean) as WorkItem[];

export function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filtered =
    activeCategory === 'All'
      ? workItems
      : workItems.filter((w) => w.category === activeCategory);

  const prev = useCallback(() => {
    setCarouselIndex((i) => (i === 0 ? featuredItems.length - 1 : i - 1));
  }, []);

  const next = useCallback(() => {
    setCarouselIndex((i) => (i === featuredItems.length - 1 ? 0 : i + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const featured = featuredItems[carouselIndex];

  return (
    <section className="py-8 sm:py-10">
      <Container>
        {/* Page header */}
        <div className="mb-8">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200">
              <span className="h-2 w-2 rounded-full bg-accent-500" />
              <span>Portfolio</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-fg-100 sm:text-3xl">
            Our Projects
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-fg-300">
            A complete overview of every website and application we&apos;ve built — from ecommerce stores and business sites to healthcare tools and news platforms.
          </p>
        </div>

        {/* Featured carousel */}
        <div className="mb-10 overflow-hidden rounded-lg border border-bg-700 bg-bg-800/40">
          <div className="border-b border-bg-700 bg-bg-900/25 px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-fg-100">Featured Projects</h2>
              <div className="flex items-center gap-1">
                {featuredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      idx === carouselIndex
                        ? 'w-6 bg-accent-500'
                        : 'w-1.5 bg-bg-600 hover:bg-bg-500'
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-850 md:aspect-auto md:min-h-[360px]">
                <Image
                  key={featured.slug}
                  src={featured.png}
                  alt={`${featured.name} project screenshot`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-500"
                  priority
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[10px] text-fg-300">
                      {featured.category}
                    </span>
                    {featured.facts?.find((f) => f.label === 'Status')?.value === 'Work in progress' && (
                      <span className="rounded-full border border-yellow-600/30 bg-yellow-900/20 px-2 py-0.5 text-[10px] text-yellow-400">
                        WIP
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-fg-100 sm:text-xl">
                    {featured.name}
                  </h3>
                  <p className="mt-1 text-xs text-fg-300">{featured.meta}</p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-200">
                    {featured.scope}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {featured.stack.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-bg-700 bg-bg-800 px-2 py-0.5 text-[10px] text-fg-200"
                      >
                        {s}
                      </span>
                    ))}
                    {featured.stack.length > 5 && (
                      <span className="rounded-full border border-bg-700 bg-bg-800 px-2 py-0.5 text-[10px] text-fg-300">
                        +{featured.stack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <Link
                    href={`/work/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-accent-600 bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:border-accent-500 hover:bg-accent-500"
                  >
                    View Project
                  </Link>
                  {featured.url && (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-bg-700 bg-bg-800 px-4 py-2 text-sm font-medium text-fg-100 transition hover:border-fg-300/30 hover:bg-bg-700"
                    >
                      Live Site
                      <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-bg-700 bg-bg-900/80 p-1.5 text-fg-200 backdrop-blur-sm transition hover:bg-bg-800 md:left-3"
              aria-label="Previous project"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-bg-700 bg-bg-900/80 p-1.5 text-fg-200 backdrop-blur-sm transition hover:bg-bg-800 md:right-3"
              aria-label="Next project"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? workItems.length
                : workItems.filter((w) => w.category === cat).length;
            if (count === 0 && cat !== 'All') return null;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  activeCategory === cat
                    ? 'border-accent-600 bg-accent-600/10 text-accent-400'
                    : 'border-bg-700 bg-bg-800 text-fg-200 hover:border-fg-300/30 hover:bg-bg-700'
                )}
              >
                {cat}
                <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group overflow-hidden rounded-lg border border-bg-700 bg-bg-800/40 transition hover:border-bg-600 hover:bg-bg-800/60"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-850">
                <Image
                  src={project.png || project.fallback}
                  alt={`${project.name} — ${project.meta}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale transition duration-300 group-hover:grayscale-0"
                  loading="lazy"
                />
                {project.category && (
                  <span className="absolute right-2 top-2 rounded-full border border-bg-700/60 bg-bg-900/70 px-2 py-0.5 text-[10px] text-fg-200 backdrop-blur-sm">
                    {project.category}
                  </span>
                )}
                {project.facts?.find((f) => f.label === 'Status')?.value === 'Work in progress' && (
                  <span className="absolute left-2 top-2 rounded-full border border-yellow-600/30 bg-yellow-900/60 px-2 py-0.5 text-[10px] text-yellow-300 backdrop-blur-sm">
                    WIP
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-fg-100">
                      {project.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-fg-300">{project.meta}</p>
                  </div>
                  <div className="shrink-0 rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                    View
                  </div>
                </div>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-fg-300">
                  {project.scope}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-bg-700 bg-bg-850/40 px-2 py-0.5 text-[10px] text-fg-200"
                    >
                      {s}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="rounded-full border border-bg-700 bg-bg-850/40 px-2 py-0.5 text-[10px] text-fg-300">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-fg-300">
            No projects found in this category.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 rounded-lg border border-bg-700 bg-bg-800/40 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-fg-100">Want your project here next?</h3>
              <p className="mt-1 text-xs text-fg-300">
                We build conversion-first websites and web apps. Let&apos;s talk about your project.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-accent-600 bg-accent-600 px-5 py-2.5 text-sm font-medium text-white transition hover:border-accent-500 hover:bg-accent-500"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
