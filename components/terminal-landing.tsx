'use client';

import { ContactCTA } from '@/components/contact-cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Metrics } from '@/components/metrics';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Timeline } from '@/components/timeline';

export function TerminalLanding() {
  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[320px] md:pr-10">
        <main>
          <Hero />
          <Metrics />
          <Projects />
          <Skills />
          <Timeline />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
