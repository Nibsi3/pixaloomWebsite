import { Section } from '@/components/ui/section';
import { CometCard } from '@/components/ui/comet-card';

const groups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI Systems'],
  },
  {
    title: 'Backend / Integration',
    items: ['APIs', 'Auth basics', 'Payments', 'Email flows', 'Headless CMS'],
  },
  {
    title: 'Quality & Growth',
    items: ['SEO', 'Performance', 'Accessibility', 'Analytics', 'Conversion UX'],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbelt"
      title="Developer-grade UX"
      subtitle="A GitHub-like feel, but optimized for real customers: clarity, trust, and high-intent actions across the page."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((g) => (
          <CometCard key={g.title} className="h-full">
            <div className="card card-hover h-full p-5">
              <div className="text-sm font-semibold">{g.title}</div>
              <div className="mt-4 space-y-2">
                {g.items.map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-fg-200">{i}</span>
                    <span className="text-xs text-fg-300">verified</span>
                  </div>
                ))}
              </div>
            </div>
          </CometCard>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <div className="text-sm font-semibold">What clients usually ask for</div>
          <div className="mt-3 space-y-2 text-sm text-fg-300">
            <div>Landing pages that convert visitors into WhatsApp / calls</div>
            <div>Business sites that rank locally and look premium</div>
            <div>Web apps with clean dashboards and scalable UI</div>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm font-semibold">My approach</div>
          <div className="mt-3 space-y-2 text-sm text-fg-300">
            <div>Start with your goal, not the tech</div>
            <div>Design the funnel (CTAs) before building the UI</div>
            <div>Ship fast, iterate, and measure</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
