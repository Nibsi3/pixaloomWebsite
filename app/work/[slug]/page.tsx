import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { workItems } from '@/components/work-items';

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const item = workItems.find((x) => x.slug === params.slug);
  if (!item) notFound();

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

        <div className="card overflow-hidden">
          <div className="aspect-[16/9] w-full bg-bg-850">
            <picture>
              <source srcSet={item.png} type="image/png" />
              <img
                src={item.fallback}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </picture>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="card p-5 lg:col-span-7">
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
          </div>

          <div className="card p-5 lg:col-span-5">
            <div className="text-sm font-semibold text-fg-100">Tech stack</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-bg-700 bg-bg-850/30 p-4">
              <div className="text-xs font-medium text-fg-200">Note</div>
              <div className="mt-2 text-xs text-fg-300">
                This portfolio page intentionally has no outbound links.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
