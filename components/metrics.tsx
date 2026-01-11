import { Container } from '@/components/ui/container';
import { SpotlightCard } from '@/components/ui/spotlight-card';

export function Metrics() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid gap-3 sm:grid-cols-3 group" data-spotlight>
          {[
            { k: '5+', v: 'Years experience', d: 'Professional web development' },
            { k: 'SEO+', v: 'Built-in', d: 'Metadata, OG, JSON-LD, sitemap' },
            { k: 'Conversion', v: 'Focused', d: 'CTAs, lead forms, contact flows' },
          ].map((m) => (
            <SpotlightCard key={m.k}>
              <div className="text-2xl font-semibold">{m.k}</div>
              <div className="mt-1 text-sm font-medium text-fg-200">{m.v}</div>
              <div className="mt-2 text-xs text-fg-300">{m.d}</div>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
