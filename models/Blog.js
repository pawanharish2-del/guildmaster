import mongoose from 'mongoose';

const { Schema } = mongoose;

// ═══════════════════════════════════════════════════════════════════════════
// Blog model
// `summary` is deliberately a short, self-contained answer to the post's core
// question so it can be surfaced verbatim as an Answer-Engine-Optimisation
// snippet (JSON-LD `description`, meta description, and AI-assistant answers).
// ═══════════════════════════════════════════════════════════════════════════

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A title is required.'],
      trim: true,
      maxlength: [180, 'Title cannot exceed 180 characters.'],
    },
    slug: {
      type: String,
      required: [true, 'A slug is required.'],
      unique: true, // creates a unique index (see also the explicit index below)
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'Slug may only contain lowercase letters, numbers and single hyphens.',
      ],
    },
    // Rich HTML / Markdown body of the article.
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    // Concise, answer-first summary structured for AEO snippets.
    summary: {
      type: String,
      required: [true, 'A summary is required for Answer Engine Optimisation.'],
      trim: true,
      maxlength: [320, 'Summary cannot exceed 320 characters.'],
    },
    // Cover image URL (absolute or /public-relative).
    coverImage: {
      type: String,
      trim: true,
      default: '',
    },
    seoKeyword: { type: String, trim: true, default: '' },
    metaDescription: { type: String, trim: true, default: '', maxlength: 160 },
    aeoQuestion: { type: String, trim: true, default: '' },
    geoEntities: { type: [String], default: [] },
    geoCitations: { type: [String], default: [] },
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
);

// Note: the unique index on `slug` is created by the field-level `unique: true`
// above, so it is intentionally NOT redeclared here (that would emit a
// "duplicate schema index" warning). This index supports recency ordering on
// the listing page.
BlogSchema.index({ createdAt: -1 });

// Reuse the compiled model across hot-reloads to avoid
// "OverwriteModelError: Cannot overwrite `Blog` model once compiled".
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
