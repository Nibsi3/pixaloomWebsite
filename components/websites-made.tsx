import { Section } from '@/components/ui/section';

const items = [
  {
    name: 'CAPS Tutor',
    href: '#',
    image: '/work/caps-tutor.svg',
    meta: 'EdTech · UI/UX · Web App',
  },
  {
    name: 'VicBay',
    href: '#',
    image: '/work/vicbay.svg',
    meta: 'Ecommerce · Branding · Landing',
  },
  {
    name: 'NexAI',
    href: '#',
    image: '/work/nexai.svg',
    meta: 'B2B · SaaS · Lead Gen',
  },
  {
    name: 'Team Colours',
    href: '#',
    image: '/work/team-colours.svg',
    meta: 'Storefront · Catalog · Search',
  },
  {
    name: 'Kikay Pharma Consultants',
    href: '#',
    image: '/work/kikay.svg',
    meta: 'Corporate · Trust · CTA Focus',
  },
  {
    name: 'Paws On Route',
    href: '#',
    image: '/work/paws-on-route.svg',
    meta: 'Local Business · Service Site',
  },
  {
    name: 'AI Testing',
    href: '#',
    image: '/work/ai-testing.svg',
    meta: 'Landing · Product',
  },
  {
    name: 'Physiotherapy',
    href: '#',
    image: '/work/physiotherapy.svg',
    meta: 'Healthcare · Bookings',
  },
  {
    name: 'Key Masters',
    href: '#',
    image: '/work/key-masters.svg',
    meta: 'Service · Lead Form',
  },
];

export function WebsitesMade() {
  return (
    <Section
      id="work"
      eyebrow="Showcase"
      title="Websites I’ve made"
      subtitle="A few builds I’ve worked on."
    >
      <div className="work-marquee">
        <div className="work-marquee-viewport" aria-label="Website screenshots">
          <div className="work-marquee-track">
            {items.map((i) => (
              <a key={i.name} href={i.href} className="card card-hover work-marquee-card overflow-hidden">
                <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{i.name}</div>
                      <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                    </div>
                    <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                      Case
                    </div>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-bg-850">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>

          <div className="work-marquee-track" aria-hidden="true">
            {items.map((i) => (
              <a
                key={`${i.name}-dup`}
                href={i.href}
                className="card card-hover work-marquee-card overflow-hidden"
              >
                <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{i.name}</div>
                      <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                    </div>
                    <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                      Case
                    </div>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full bg-bg-850">
                  <img
                    src={i.image}
                    alt={i.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
