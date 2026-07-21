import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { staticBlogs } from './data/blogs';

// ═══════════════════════════════════════════════════════════════════════════
// Read-side data access used directly by Server Components (no HTTP round-trip).
// Mutations still go through the protected /api/blogs route handlers.
// All functions return plain, JSON-serialisable objects (via `.lean()` +
// normalisation) so they can be handed straight to client components / metadata.
// ═══════════════════════════════════════════════════════════════════════════

function serialize(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id || doc.id),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    summary: doc.summary,
    coverImage: doc.coverImage || '',
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : null,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null,
  };
}

export async function getAllBlogs() {
  try {
    await dbConnect();
    const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    if (docs.length > 0) return docs.map(serialize);
  } catch (error) {
    // Database connection failed, gracefully fall back to static blogs
  }
  return staticBlogs.map(serialize).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getBlogBySlug(slug) {
  try {
    await dbConnect();
    const doc = await Blog.findOne({ slug: String(slug).toLowerCase() }).lean();
    if (doc) return serialize(doc);
  } catch (error) {
    // Database connection failed, gracefully fall back to static blogs
  }
  const staticDoc = staticBlogs.find((b) => b.slug === String(slug).toLowerCase());
  return serialize(staticDoc);
}

export async function getAllSlugs() {
  try {
    await dbConnect();
    const docs = await Blog.find({}, { slug: 1, updatedAt: 1 }).lean();
    if (docs.length > 0) {
      return docs.map((d) => ({
        slug: d.slug,
        updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : null,
      }));
    }
  } catch (error) {
    // Database connection failed, gracefully fall back to static blogs
  }
  return staticBlogs.map((b) => ({
    slug: b.slug,
    updatedAt: b.updatedAt,
  }));
}
