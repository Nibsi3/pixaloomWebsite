import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { workItems } from '@/components/work-items';

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
              {workItems.map((i) => (
                <Link
                  key={i.slug}
                  href={`/work/${i.slug}`}
                  className="card card-hover work-marquee-card overflow-hidden"
                >
                  <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{i.name}</div>
                        <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                      </div>
                      <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                        View
                      </div>
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
                </Link>
              ))}
            </div>

            <div className="work-marquee-group" aria-hidden="true">
              {workItems.map((i) => (
                <Link
                  key={`${i.slug}-dup`}
                  href={`/work/${i.slug}`}
                  className="card card-hover work-marquee-card overflow-hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="border-b border-bg-700 bg-bg-900/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{i.name}</div>
                        <div className="mt-1 truncate text-xs text-fg-300">{i.meta}</div>
                      </div>
                      <div className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px] text-fg-200">
                        View
                      </div>
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
