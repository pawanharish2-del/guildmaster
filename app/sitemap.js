import { SITE_URL } from '@/lib/seo';
import { getAllSlugs } from '@/lib/blogs';

// Regenerate the sitemap from the DB on each request (blog posts are dynamic).
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Static marketing routes (the /admin console is intentionally excluded).
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/models/boon', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/models/joey', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/customer', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/investors', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/locations/jaipur', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/locations/rajasthan', priority: 0.7, changeFrequency: 'monthly' },
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  let blogEntries = [];
  try {
    const slugs = await getAllSlugs();
    blogEntries = slugs.map((entry) => ({
      url: `${SITE_URL}/blog/${entry.slug}`,
      lastModified: entry.updatedAt ? new Date(entry.updatedAt) : now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // If the DB is unreachable at build/request time, still emit static routes.
    blogEntries = [];
  }

  return [...staticEntries, ...blogEntries];
}
