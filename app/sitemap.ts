import type { MetadataRoute } from 'next';
import { workItems } from '@/components/work-items';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const workPages: MetadataRoute.Sitemap = workItems.map((item) => ({
    url: `${baseUrl}/work/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl + '/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: baseUrl + '/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...workPages,
  ];
}
