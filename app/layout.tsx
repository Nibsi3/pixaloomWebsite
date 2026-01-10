import type { Metadata } from 'next';
import Script from 'next/script';
import { LoadingScreen } from '@/components/loading-screen';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Cameron Falck — Full-Stack Developer',
    template: '%s · Cameron Falck',
  },
  description:
    'Modern, performance-focused websites and web apps. Based in George, Western Cape. Available for freelance and full-time work.',
  applicationName: 'Cameron Falck Portfolio',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Cameron Falck — Full-Stack Developer',
    description:
      'Modern, performance-focused websites and web apps. Based in George, Western Cape.',
    siteName: 'Cameron Falck',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cameron Falck — Full-Stack Developer',
    description:
      'Modern, performance-focused websites and web apps. Based in George, Western Cape.',
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
    '@type': 'Person',
    name: 'Cameron Falck',
    jobTitle: 'Full-Stack Developer',
    url: siteUrl,
    sameAs: ['https://github.com/Nibsi3'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'George',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA',
    },
    telephone: '+27662995533',
    knowsAbout: [
      'Frontend Development',
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'UI Engineering',
      'SEO',
      'Performance Optimization',
    ],
  };

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-900">
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
