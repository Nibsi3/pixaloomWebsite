import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { WorkMarquee } from '@/components/work-marquee';
import { workItems } from '@/components/work-items';
import { CometCard } from '@/components/ui/comet-card';

const projects = [
  {
    name: 'Lead-Gen Landing Page',
    tag: 'Marketing',
    description:
      'High-converting landing page with sticky CTAs, fast performance, and a clean funnel from hero to contact.',
    stack: ['Next.js', 'Tailwind', 'SEO'],
  },
  {
    name: 'Business Website + Blog',
    tag: 'SEO',
    description:
      'Structured pages with schema markup, metadata, and content layout designed to rank and convert.',
    stack: ['React', 'Content', 'Schema'],
  },
  {
    name: 'Internal Dashboard UI',
    tag: 'Web App',
    description:
      'Data-rich UI with accessible components, crisp tables, and a GitHub-like interface that feels developer-grade.',
    stack: ['TypeScript', 'UI', 'Performance'],
  },
];

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Pinned repos"
      title="Projects that ship outcomes"
      subtitle="A small sample of what I build. If you tell me your goal, I’ll propose the simplest architecture that gets you there."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <CometCard key={p.name} className="h-full">
            <div className="card card-hover flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-fg-100">{p.name}</div>
                  <div className="mt-1 text-xs text-fg-300">{p.tag}</div>
                </div>
                <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                  Public
                </div>
              </div>

              <p className="mt-4 text-sm text-fg-300">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-bg-700 bg-bg-850/40 px-2 py-1 text-[11px] text-fg-200"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-5">
                <div className="text-xs text-fg-300">Lead score</div>
                <div className="text-xs font-medium text-accent-500">A+</div>
              </div>
            </div>
          </CometCard>
        ))}
      </div>

      <div className="mt-10">
        <WorkMarquee aria-label="Website screenshots">
          <div className="work-marquee-group">
            {workItems.map((i) => (
              <Link
                key={i.slug}
                href={`/work/${i.slug}`}
                className="group card card-hover work-marquee-card overflow-hidden md:w-[360px]"
              >
                <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{i.name}</div>
                      <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                    </div>
                    <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">View</div>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-bg-850">
                  <Image
                    src={i.png || i.fallback}
                    alt={i.name}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="work-marquee-group" aria-hidden="true">
            {workItems.map((i) => (
              <Link
                key={`${i.slug}-dup`}
                href={`/work/${i.slug}`}
                className="group card card-hover work-marquee-card overflow-hidden md:w-[360px]"
                tabIndex={-1}
                aria-hidden="true"
              >
                <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{i.name}</div>
                      <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                    </div>
                    <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">View</div>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-bg-850">
                  <Image
                    src={i.png || i.fallback}
                    alt={i.name}
                    width={1600}
                    height={900}
                    className="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              </Link>
            ))}
          </div>
        </WorkMarquee>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-fg-300">
            Want your project here next? I can build the site and the conversion system.
          </div>
          <div className="flex gap-2">
            <Button href="#contact" variant="primary">
              Get a quote
            </Button>
            <Button href="https://github.com/Nibsi3" variant="secondary">
              View GitHub
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
