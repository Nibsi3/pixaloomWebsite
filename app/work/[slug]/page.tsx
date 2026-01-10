import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { WorkGallery } from '@/components/work-gallery';
import { workItems } from '@/components/work-items';

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = workItems.find((x) => x.slug === params.slug);
  if (!item) notFound();

  const gallery = (item.gallery || []).filter(Boolean);
  const facts = (item.facts || []).filter((f) => f.label && f.value);
  const sections = (item.sections || []).filter((s) => s.title);

  return (
    <div className="py-10 sm:py-12">
      <Container>
        <div className="mb-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-fg-300 hover:text-fg-100"
          >
            <span className="text-lg">←</span>
            Back to websites
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg-100 sm:text-3xl">
            {item.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-fg-300">{item.meta}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WorkGallery
              title={item.name}
              heroPng={item.png}
              heroFallback={item.fallback}
              gallery={gallery}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="card p-5 lg:sticky lg:top-6">
              <div className="text-sm font-semibold text-fg-100">Tech stack</div>
              <div className="mt-3 flex flex-col gap-2">
                {item.stack.map((t) => (
                  <div
                    key={t}
                    className="inline-flex w-full items-center justify-between rounded-md border border-bg-700 bg-bg-850 px-3 py-2 text-xs text-fg-200"
                  >
                    <span>{t}</span>
                    <span className="text-[11px] text-fg-300">Stack</span>
                  </div>
                ))}
              </div>

              {facts.length ? (
                <div className="mt-6">
                  <div className="text-sm font-semibold text-fg-100">Quick facts</div>
                  <div className="mt-3 space-y-2">
                    {facts.map((f) => (
                      <div
                        key={f.label}
                        className="rounded-md border border-bg-700 bg-bg-850/40 px-3 py-2"
                      >
                        <div className="text-[11px] font-medium text-fg-200">{f.label}</div>
                        <div className="mt-1 text-xs text-fg-300">{f.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 rounded-lg border border-bg-700 bg-bg-850/30 p-4">
                <div className="text-xs font-medium text-fg-200">Note</div>
                <div className="mt-2 text-xs text-fg-300">
                  This portfolio page intentionally has no outbound links.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 card p-5">
          <div className="text-sm font-semibold text-fg-100">Project scope</div>
          <div className="mt-3 text-sm leading-relaxed text-fg-300">{item.scope}</div>

          <div className="mt-6">
            <div className="text-sm font-semibold text-fg-100">Highlights</div>
            <ul className="mt-3 space-y-2 text-sm text-fg-300">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {sections.length ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {sections.map((s) => (
                <div key={s.title} className="rounded-lg border border-bg-700 bg-bg-850/20 p-4">
                  <div className="text-sm font-semibold text-fg-100">{s.title}</div>
                  {s.description ? (
                    <div className="mt-2 text-sm leading-relaxed text-fg-300">{s.description}</div>
                  ) : null}
                  {s.bullets?.length ? (
                    <ul className="mt-3 space-y-2 text-sm text-fg-300">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
