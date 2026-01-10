import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';

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
          <div key={p.name} className="card card-hover p-5">
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

            <div className="mt-5 flex items-center justify-between">
              <div className="text-xs text-fg-300">Lead score</div>
              <div className="text-xs font-medium text-accent-500">A+</div>
            </div>
          </div>
        ))}
      </div>

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
    </Section>
  );
}
