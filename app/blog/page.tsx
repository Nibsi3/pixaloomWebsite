import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogListing } from '@/components/blog-listing';

export const metadata: Metadata = {
  title: 'Blog — Web Development Insights for George & the Garden Route',
  description:
    'Expert articles on web design, SEO, ecommerce, and digital strategy for businesses in George, Western Cape and the Garden Route. Tips, guides, and insights from Pixaloom.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog · Pixaloom',
    description:
      'Expert articles on web design, SEO, ecommerce, and digital strategy for businesses in George, Western Cape and the Garden Route.',
    url: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Header />
      <div className="md:pl-[70px]">
        <main>
          <BlogListing />
        </main>
        <Footer />
      </div>
    </div>
  );
}
