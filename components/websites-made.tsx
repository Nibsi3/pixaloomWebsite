import { Container } from '@/components/ui/container';

const items = [
  {
    name: 'CAPS Tutor',
    png: '/work/capstutor.png',
    fallback: '/work/caps-tutor.svg',
    meta: 'EdTech · UI/UX · Web App',
    scope:
      'AI-powered educational platform aligned to the South African CAPS curriculum (Grades 10–12). Includes interactive tutoring, practice questions, past papers, analytics, and admin tooling.',
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Appwrite (auth, DB, storage)',
      'AI integrations',
      'PDF processing pipeline',
    ],
  },
  {
    name: 'VicBay',
    png: '/work/vicbay.png',
    fallback: '/work/vicbay.svg',
    meta: 'Ecommerce · Branding · Landing',
    scope:
      'WordPress ecommerce website with SEO-focused structure and conversion-first landing sections for a George-based South African company.',
    stack: ['WordPress', 'WooCommerce', 'SEO setup', 'Performance tuning'],
  },
  {
    name: 'NexAI',
    png: '/work/nexai.png',
    fallback: '/work/nexai.svg',
    meta: 'B2B · SaaS · Lead Gen',
    scope:
      'AI phone-calls product site and backend integration work (details available on request).',
    stack: ['Web app build', 'API integration', 'Backend services'],
  },
  {
    name: 'Team Colours',
    png: '/work/teamcolours.png',
    fallback: '/work/team-colours.svg',
    meta: 'Storefront · Catalog · Search',
    scope:
      'WordPress ecommerce website for a George-based South African company, with SEO, product catalog, and conversion-focused layout.',
    stack: ['WordPress', 'WooCommerce', 'SEO', 'Performance optimization'],
  },
  {
    name: 'Kikay Pharma Consultants',
    png: '/work/kikay.png',
    fallback: '/work/kikay.svg',
    meta: 'Corporate · Trust · CTA Focus',
    scope:
      'Informational website for a pharmaceutical consultant, focused on clarity for the public and driving enquiries through contact CTAs.',
    stack: ['WordPress', 'SEO', 'Lead generation forms'],
  },
  {
    name: 'Paws On Route',
    png: '/work/pawsonroute.png',
    fallback: '/work/paws-on-route.svg',
    meta: 'Local Business · Service Site',
    scope:
      'WordPress website for a pet grooming and pet sitting business based in George, focused on services, trust, and easy contact.',
    stack: ['WordPress', 'SEO', 'Service pages', 'Contact flows'],
  },
  {
    name: 'AI Testing',
    png: '/work/ai.png',
    fallback: '/work/ai-testing.svg',
    meta: 'Landing · Product',
    scope:
      'Product landing and internal tooling work for an AI testing company (details available on request).',
    stack: ['Product site', 'API integration', 'Backend services'],
  },
  {
    name: 'Physiotherapy',
    png: '/work/physiope.png',
    fallback: '/work/physiotherapy.svg',
    meta: 'Healthcare · Bookings',
    scope:
      'Website for a physiotherapy business based in Port Elizabeth, including service pages, about/company profile, and contact flow.',
    stack: ['WordPress', 'SEO', 'Contact forms', 'Portfolio/content sections'],
  },
  {
    name: 'Key Masters',
    png: '/work/keymasters.png',
    fallback: '/work/key-masters.svg',
    meta: 'Service · Lead Form',
    scope:
      'SEO + lead generation WordPress site, optimized for enquiries and local search.',
    stack: ['WordPress', 'SEO', 'Lead forms', 'Conversion optimization'],
  },
  {
    name: 'Spotlight',
    png: '/work/spotlight.png',
    fallback: '/work/spotlight.svg',
    meta: 'Maps · Admin · SEO',
    scope:
      'Interactive Garden Route business discovery experience with map exploration, SEO blog system, analytics, authentication, and an admin dashboard.',
    stack: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase (Postgres)',
      'NextAuth.js',
      'Mapbox GL JS',
      'Resend',
    ],
  },
];

export function WebsitesMade() {
  return (
    <section id="work" className="py-12 sm:py-14">
      <Container>
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-fg-100 sm:text-lg">
              Websites I’ve made
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200">
              <span className="h-2 w-2 rounded-full bg-success-500" />
              <span>Showcase</span>
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-fg-300">A few builds I’ve worked on.</p>
        </div>

        <div className="work-marquee" aria-label="Website screenshots">
          <div className="work-marquee-track">
            <div className="work-marquee-group">
              {items.map((i) => (
                <div key={i.name} className="card card-hover work-marquee-card overflow-hidden">
                  <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{i.name}</div>
                        <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                      </div>
                      <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">Details</div>
                    </div>
                  </div>

                  <div className="aspect-[16/9] w-full bg-bg-850">
                    <picture>
                      <source srcSet={i.png} type="image/png" />
                      <img
                        src={i.fallback}
                        alt={i.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  <details className="border-t border-bg-700 bg-bg-900/10 px-4 py-3">
                    <summary className="cursor-pointer select-none text-xs font-medium text-fg-200">
                      View project details
                    </summary>
                    <div className="mt-3 space-y-3 text-xs text-fg-300">
                      <div>
                        <div className="text-[11px] font-semibold text-fg-200">Scope</div>
                        <div className="mt-1 leading-relaxed">{i.scope}</div>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-fg-200">Tech stack</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {i.stack.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="work-marquee-group" aria-hidden="true">
              {items.map((i) => (
                <div key={`${i.name}-dup`} className="card card-hover work-marquee-card overflow-hidden">
                  <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{i.name}</div>
                        <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                      </div>
                      <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">Details</div>
                    </div>
                  </div>

                  <div className="aspect-[16/9] w-full bg-bg-850">
                    <picture>
                      <source srcSet={i.png} type="image/png" />
                      <img
                        src={i.fallback}
                        alt={i.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
