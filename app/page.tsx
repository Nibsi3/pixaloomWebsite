import { ContactCTA } from '@/components/contact-cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Metrics } from '@/components/metrics';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { SpaceGame } from '@/components/space-game';
import { Timeline } from '@/components/timeline';
import { WebsitesMade } from '@/components/websites-made';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[280px]">
        <main>
          <Hero />
          <Metrics />
          <Projects />
          <WebsitesMade />
          <Skills />
          <Timeline />
          <section className="py-12 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold tracking-tight text-fg-100 sm:text-lg">
                    Get to know me
                  </h2>
                  <span className="inline-flex items-center gap-2 rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[11px] text-fg-200">
                    <span className="h-2 w-2 rounded-full bg-accent-500" />
                    <span>Interactive</span>
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-fg-300">
                  Play a quick game to discover facts about me. Shoot the aliens!
                </p>
              </div>
              <SpaceGame />
            </div>
          </section>
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
