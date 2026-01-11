import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { StellarBackground } from '@/components/stellar-background';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Pixaloom — Web Design & Development',
    template: '%s · Pixaloom',
  },
  description:
    'Modern, conversion-first websites and web apps. Performance-focused, SEO-ready, and designed to generate leads.',
  applicationName: 'Pixaloom',
  category: 'technology',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Pixaloom — Web Design & Development',
    description:
      'Modern, conversion-first websites and web apps. Performance-focused, SEO-ready, and designed to generate leads.',
    siteName: 'Pixaloom',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pixaloom — Web Design & Development' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pixaloom — Web Design & Development',
    description:
      'Modern, conversion-first websites and web apps. Performance-focused, SEO-ready, and designed to generate leads.',
    images: ['/twitter-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pixaloom',
    url: siteUrl,
    sameAs: ['https://github.com/Nibsi3'],
    description:
      'Modern, conversion-first websites and web apps. Performance-focused, SEO-ready, and designed to generate leads.',
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-900">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <StellarBackground />
        <div
          className="pointer-events-none fixed inset-0 z-10 opacity-[0.12] contrast-150"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
          aria-hidden="true"
        />
        <div className="relative z-20">{children}</div>
      </body>
    </html>
  );
}
