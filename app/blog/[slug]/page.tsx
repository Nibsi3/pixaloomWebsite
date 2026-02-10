import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { blogPosts } from '@/components/blog-posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pixaloom.co.za';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} · Pixaloom`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const postIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Pixaloom',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pixaloom',
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  const paragraphs = post.content.split('\n\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-bg-900 bg-grid-fade">
      <Script
        id={`article-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <div className="md:pl-[70px]">
        <main className="py-8 sm:py-10">
          <Container className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs text-fg-300 transition hover:text-fg-100"
            >
              <span>←</span>
              <span>Back to blog</span>
            </Link>

            <article className="mt-6">
              <div className="rounded-lg border border-bg-700 bg-bg-800/50 p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-bg-700 bg-bg-850 px-2 py-0.5 text-[10px] text-fg-300">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-fg-400">{post.date}</span>
                  <span className="text-[10px] text-fg-400">·</span>
                  <span className="text-[10px] text-fg-400">{post.readTime}</span>
                </div>

                <h1 className="mt-4 text-xl font-bold tracking-tight text-fg-100 sm:text-2xl">
                  {post.title}
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-fg-200">
                  {post.excerpt}
                </p>

                <div className="mt-6 border-t border-bg-700 pt-6">
                  <div className="prose-custom space-y-4">
                    {paragraphs.map((para, idx) => {
                      if (para.startsWith('**') && para.endsWith('**')) {
                        const text = para.replace(/\*\*/g, '');
                        return (
                          <h2
                            key={idx}
                            className="mt-6 text-base font-semibold text-fg-100"
                          >
                            {text}
                          </h2>
                        );
                      }

                      if (para.startsWith('- ')) {
                        const items = para.split('\n').filter((l) => l.startsWith('- '));
                        return (
                          <ul key={idx} className="space-y-1.5 pl-1">
                            {items.map((item, i) => {
                              const text = item.replace(/^- /, '');
                              const boldMatch = text.match(/^\*\*(.+?)\*\*(.*)$/);
                              return (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-fg-200"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                                  <span>
                                    {boldMatch ? (
                                      <>
                                        <strong className="text-fg-100">
                                          {boldMatch[1]}
                                        </strong>
                                        {boldMatch[2]}
                                      </>
                                    ) : (
                                      text.replace(/\*\*/g, '')
                                    )}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }

                      const parts = para.split(/(\*\*[^*]+\*\*)/g);
                      return (
                        <p key={idx} className="text-sm leading-relaxed text-fg-200">
                          {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={i} className="text-fg-100">
                                  {part.replace(/\*\*/g, '')}
                                </strong>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 border-t border-bg-700 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-bg-700 bg-bg-850/40 px-2 py-0.5 text-[10px] text-fg-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 rounded-lg border border-accent-600/20 bg-accent-600/5 p-5 sm:p-6">
                <h3 className="text-sm font-semibold text-fg-100">
                  Ready to build a website that works for your business?
                </h3>
                <p className="mt-1 text-xs text-fg-300">
                  We design and develop conversion-first websites for businesses in George, Western Cape and the Garden Route.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center rounded-full border border-accent-600 bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-500"
                  >
                    Get a Free Quote
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center rounded-full border border-bg-700 bg-bg-800 px-4 py-2 text-sm font-medium text-fg-100 transition hover:bg-bg-700"
                  >
                    View Our Work
                  </Link>
                </div>
              </div>

              {/* Prev/Next nav */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="rounded-lg border border-bg-700 bg-bg-800/40 p-4 transition hover:border-bg-600"
                  >
                    <span className="text-[10px] text-fg-400">← Previous</span>
                    <div className="mt-1 text-xs font-medium text-fg-100 line-clamp-2">
                      {prevPost.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="rounded-lg border border-bg-700 bg-bg-800/40 p-4 text-right transition hover:border-bg-600"
                  >
                    <span className="text-[10px] text-fg-400">Next →</span>
                    <div className="mt-1 text-xs font-medium text-fg-100 line-clamp-2">
                      {nextPost.title}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}
