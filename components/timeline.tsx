import { Section } from '@/components/ui/section';

const items = [
  {
    title: '5 years in web development',
    when: '2019 → now',
    body: 'Frontend-heavy with full-stack delivery when needed. Fast iterations, strong UI and clean code.',
  },
  {
    title: 'Conversion-first builds',
    when: 'ongoing',
    body: 'I focus on call-to-actions, trust signals, and lead capture—so the site performs as a business tool.',
  },
  {
    title: 'Performance + SEO',
    when: 'always',
    body: 'Technical SEO, structured data, and speed are baked in—not added later.',
  },
];

export function Timeline() {
  return (
    <Section
      id="experience"
      eyebrow="Activity"
      title="Experience"
      subtitle="A simple timeline of how I work and what you can expect from a build."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="card card-hover p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{i.title}</div>
              <div className="text-xs text-fg-300">{i.when}</div>
            </div>
            <div className="mt-3 text-sm text-fg-300">{i.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
