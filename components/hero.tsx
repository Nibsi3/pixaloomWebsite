'use client';

import { Container } from '@/components/ui/container';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { FlipWords } from '@/components/ui/flip-words';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const whatsapp = 'https://wa.me/27662995533?text=';

export function Hero() {
  const waText = encodeURIComponent(
    "Hi Cameron — I'd like to chat about a website/web app project. What's your availability?"
  );

  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-14">
      <Container>
        <div className="rounded-lg border border-bg-700 bg-bg-800/40">
          <div className="flex items-center justify-between border-b border-bg-700 bg-bg-900/25 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-fg-200">
              <span className="rounded-md border border-bg-700 bg-bg-850 px-2 py-1 text-[11px]">README.md</span>
              <span className="hidden sm:inline">cameron-falck</span>
            </div>
            <div className="text-xs text-fg-300">status: available</div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-3 py-1 text-xs text-fg-200">
                  <span className="h-2 w-2 rounded-full bg-accent-500" />
                  <span>George, Western Cape · 5 years experience</span>
                </div>

                <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  Cameron Falck
                  <span className="block text-fg-200">
                    <FlipWords
                      words={['Full-Stack Developer', 'Web Development', 'Mobile App Development', 'Software Development']}
                      duration={3000}
                      className="text-fg-200"
                    />
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base text-fg-300 sm:text-lg">
                  I build modern, conversion-first websites and web apps with a clean engineering
                  mindset: fast, accessible, SEO-ready, and designed to generate leads.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <HoverBorderGradient
                    as="a"
                    containerClassName="rounded-full"
                    className="px-7 py-3 text-sm font-semibold"
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Start a project
                  </HoverBorderGradient>
                  <InteractiveHoverButton href={whatsapp + waText}>
                    WhatsApp me
                  </InteractiveHoverButton>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 text-xs text-fg-200">
                  <span className="kbd">Next.js</span>
                  <span className="kbd">React</span>
                  <span className="kbd">TypeScript</span>
                  <span className="kbd">Tailwind</span>
                  <span className="kbd">SEO</span>
                  <span className="kbd">Performance</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <SpotlightCard className="h-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Lead-gen checklist</div>
                      <div className="mt-1 text-xs text-fg-300">What you get by default</div>
                    </div>
                    <div className="rounded-md border border-bg-700 bg-bg-850 px-3 py-1 text-xs text-fg-200">
                      v1.0
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { t: 'SEO foundations', d: 'Metadata, OpenGraph, structured data' },
                      { t: 'Conversion UX', d: 'CTA placement, sticky actions, clear flow' },
                      { t: 'Performance', d: 'Fast loading, optimized rendering' },
                      { t: 'Accessibility', d: 'Keyboard-first, readable contrast' },
                    ].map((i) => (
                      <div key={i.t} className="rounded-md border border-bg-700 bg-bg-850/40 p-3">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{i.t}</div>
                          <span className="text-xs text-accent-500">pass</span>
                        </div>
                        <div className="mt-1 text-xs text-fg-300">{i.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-md border border-bg-700 bg-bg-850/30 p-3 text-xs text-fg-300">
                    Want this style for your brand? Drop your goals and I’ll propose a design + build
                    plan.
                  </div>
                </SpotlightCard>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
