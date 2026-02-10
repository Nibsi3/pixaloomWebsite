import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProjectsShowcase } from '@/components/projects-showcase';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore our full portfolio of websites and web applications — from ecommerce stores and business sites to healthcare tools and news platforms. Built with Next.js, React, and modern web technologies.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects · Pixaloom',
    description:
      'Explore our full portfolio of websites and web applications — from ecommerce stores and business sites to healthcare tools and news platforms.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[264px] md:pr-0">
        <main>
          <ProjectsShowcase />
        </main>
        <Footer />
      </div>
    </div>
  );
}
