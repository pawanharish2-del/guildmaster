import { SITE_URL } from '@/lib/seo';

// Allow crawlers everywhere except the private console and API surface.
// AI answer engines are welcome — the Journal's answer-first summaries and
// JSON-LD are designed to be quoted.
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
