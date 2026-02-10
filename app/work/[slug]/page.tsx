import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { WorkGallery } from '@/components/work-gallery';
import { workItems } from '@/components/work-items';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = workItems.find((x) => x.slug === params.slug);
  if (!item) return {};

  const title = `${item.name} — ${item.meta}`;
  const description = item.scope.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      title: `${item.name} · Pixaloom`,
      description,
      url: `/work/${item.slug}`,
      images: item.png ? [{ url: item.png, alt: item.name }] : undefined,
    },
  };
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = workItems.find((x) => x.slug === params.slug);
  if (!item) notFound();

  const gallery = (item.gallery || []).filter(Boolean);
  const facts = (item.facts || []).filter((f) => f.label && f.value);
  const sections = (item.sections || []).filter((s) => s.title);

  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[70px]">
        <main className="py-8 sm:py-10">
          <Container>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs text-fg-300 transition hover:text-fg-100"
            >
              <span>←</span>
              <span>Back to projects</span>
            </Link>

            <div className="mt-6 rounded-lg border border-bg-700 bg-bg-800/50 p-4 sm:p-6">
              <div className="flex flex-col gap-1 border-b border-bg-700 pb-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-semibold tracking-tight text-fg-100 sm:text-xl">
                    {item.name}
                  </h1>
                  <span className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[10px] text-fg-300">
                    {item.meta.split('·')[0]?.trim()}
                  </span>
                </div>
                <p className="text-xs text-fg-300">{item.meta}</p>
              </div>

              <div className="mt-4 grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <WorkGallery
                    title={item.name}
                    heroPng={item.png}
                    heroFallback={item.fallback}
                    gallery={gallery}
                  />

                  <div className="mt-6">
                    <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
                      About this project
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-200">
                      {item.scope}
                    </p>
                  </div>

                  {item.highlights.length > 0 && (
                    <div className="mt-6">
                      <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
                        Key highlights
                      </div>
                      <ul className="mt-3 space-y-2">
                        {item.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-fg-200">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  {facts.length > 0 && (
                    <div className="rounded-lg border border-bg-700 bg-bg-850/30 p-4">
                      <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
                        Quick facts
                      </div>
                      <dl className="mt-3 space-y-3">
                        {facts.map((f) => (
                          <div key={f.label}>
                            <dt className="text-[11px] text-fg-300">{f.label}</dt>
                            <dd className="text-sm font-medium text-fg-100">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  <div className="rounded-lg border border-bg-700 bg-bg-850/30 p-4">
                    <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
                      Tech stack
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-bg-700 bg-bg-800 px-2 py-1 text-[11px] text-fg-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {sections.length > 0 && (
              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-wide text-fg-300">
                  Detailed breakdown
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {sections.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-lg border border-bg-700 bg-bg-800/40 p-4"
                    >
                      <div className="text-sm font-medium text-fg-100">{s.title}</div>
                      {s.description && (
                        <p className="mt-2 text-xs leading-relaxed text-fg-300">
                          {s.description}
                        </p>
                      )}
                      {s.bullets && s.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {s.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-xs text-fg-300"
                            >
                              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}
