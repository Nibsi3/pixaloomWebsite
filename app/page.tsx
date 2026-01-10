import { ContactCTA } from '@/components/contact-cta';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Metrics } from '@/components/metrics';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
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
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
