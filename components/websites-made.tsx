import Image from 'next/image';
import { Section } from '@/components/ui/section';

const items = [
  {
    name: 'CAPS Tutor',
    href: '#',
    image: '/work/caps-tutor.png',
    meta: 'EdTech · UI/UX · Web App',
  },
  {
    name: 'VicBay',
    href: '#',
    image: '/work/vicbay.png',
    meta: 'Ecommerce · Branding · Landing',
  },
  {
    name: 'NexAI',
    href: '#',
    image: '/work/nexai.png',
    meta: 'B2B · SaaS · Lead Gen',
  },
  {
    name: 'Team Colours',
    href: '#',
    image: '/work/team-colours.png',
    meta: 'Storefront · Catalog · Search',
  },
  {
    name: 'Kikay Pharma Consultants',
    href: '#',
    image: '/work/kikay.png',
    meta: 'Corporate · Trust · CTA Focus',
  },
];

export function WebsitesMade() {
  return (
    <Section
      id="work"
      eyebrow="Showcase"
      title="Websites I’ve made"
      subtitle="A few builds I’ve worked on. Drop your screenshots in /public/work with the filenames below to display them here."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((i) => (
          <a key={i.name} href={i.href} className="card card-hover overflow-hidden">
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
              <div className="mt-2 text-[11px] text-fg-300">{i.image}</div>
            </div>

            <div className="relative aspect-[16/9] w-full bg-bg-850">
              <Image
                src={i.image}
                alt={i.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-bg-700 bg-bg-850/25 p-4 text-sm text-fg-300">
        If an image doesn’t show, add it to:
        <span className="ml-2 rounded-md border border-bg-700 bg-bg-900/40 px-2 py-1 font-mono text-[12px] text-fg-200">
          public/work/
        </span>
      </div>
    </Section>
  );
}
