import { cn } from '@/components/utils';
import { Container } from '@/components/ui/container';

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('py-12 sm:py-14', className)}>
      <Container>
        {eyebrow ? (
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200">
              <span className="h-2 w-2 rounded-full bg-accent-500" />
              <span>{eyebrow}</span>
            </span>
          </div>
        ) : null}

        <div className="overflow-hidden rounded-lg border border-bg-700 bg-bg-800/40">
          <div className="relative flex flex-col gap-3 border-b border-bg-700 bg-bg-900/25 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight text-fg-100 sm:text-lg">
                  {title}
                </h2>
              </div>
              {subtitle ? <p className="mt-2 max-w-2xl text-sm text-fg-300">{subtitle}</p> : null}
            </div>
          </div>

          <div className="p-4 sm:p-6">{children}</div>
        </div>
      </Container>
    </section>
  );
}
