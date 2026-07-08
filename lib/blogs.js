import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

// ═══════════════════════════════════════════════════════════════════════════
// Read-side data access used directly by Server Components (no HTTP round-trip).
// Mutations still go through the protected /api/blogs route handlers.
// All functions return plain, JSON-serialisable objects (via `.lean()` +
// normalisation) so they can be handed straight to client components / metadata.
// ═══════════════════════════════════════════════════════════════════════════

function serialize(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
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
  await dbConnect();
  const docs = await Blog.find({}).sort({ createdAt: -1 }).lean();
  return docs.map(serialize);
}

export async function getBlogBySlug(slug) {
  await dbConnect();
  const doc = await Blog.findOne({ slug: String(slug).toLowerCase() }).lean();
  return serialize(doc);
}

export async function getAllSlugs() {
  await dbConnect();
  const docs = await Blog.find({}, { slug: 1, updatedAt: 1 }).lean();
  return docs.map((d) => ({
    slug: d.slug,
    updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : null,
  }));
}
