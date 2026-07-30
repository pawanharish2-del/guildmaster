'use client';

import { useEffect, useMemo, useState } from 'react';
import RichTextEditor from './RichTextEditor';

// ═══════════════════════════════════════════════════════════════════════════
// Create / edit form for a Journal post. 
// Overhauled to feature a 2-column Content Creation Suite integrating advanced 
// SEO, AEO, and GEO optimization panels.
// ═══════════════════════════════════════════════════════════════════════════

const SUMMARY_MAX = 320;
const META_DESC_MAX = 160;

// Mirror of lib/slug.slugify for preview only (server remains source of truth).
function previewSlug(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

const EMPTY = { 
  title: '', slug: '', summary: '', coverImage: '', content: '',
  seoKeyword: '', metaDescription: '', aeoQuestion: '', 
  geoEntities: '', geoCitations: '' 
};

export default function BlogForm({ initial, onSubmit, onCancel, submitting }) {
  const isEdit = Boolean(initial && initial.id);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');

  // Hydrate when the target post changes.
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        slug: initial.slug || '',
        summary: initial.summary || '',
        coverImage: initial.coverImage || '',
        content: initial.content || '',
        seoKeyword: initial.seoKeyword || '',
        metaDescription: initial.metaDescription || '',
        aeoQuestion: initial.aeoQuestion || '',
        geoEntities: Array.isArray(initial.geoEntities) ? initial.geoEntities.join(', ') : '',
        geoCitations: Array.isArray(initial.geoCitations) ? initial.geoCitations.join('\n') : '',
      });
    } else {
      setForm(EMPTY);
    }
    setError('');
  }, [initial]);

  const effectiveSlug = useMemo(
    () => previewSlug(form.slug || form.title),
    [form.slug, form.title]
  );

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      setError('Title, AEO snippet (summary), and content are all required.');
      return;
    }
    if (form.summary.length > SUMMARY_MAX) {
      setError(`AEO snippet must be ${SUMMARY_MAX} characters or fewer.`);
      return;
    }
    if (form.metaDescription.length > META_DESC_MAX) {
      setError(`Meta description must be ${META_DESC_MAX} characters or fewer.`);
      return;
    }

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      summary: form.summary.trim(),
      coverImage: form.coverImage.trim(),
      content: form.content.trim(),
      seoKeyword: form.seoKeyword.trim(),
      metaDescription: form.metaDescription.trim(),
      aeoQuestion: form.aeoQuestion.trim(),
      geoEntities: form.geoEntities.split(',').map(s => s.trim()).filter(Boolean),
      geoCitations: form.geoCitations.split('\n').map(s => s.trim()).filter(Boolean),
    };

    const result = await onSubmit(payload);
    if (result && !result.ok) {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  }

  const remainingSummary = SUMMARY_MAX - form.summary.length;
  const remainingMeta = META_DESC_MAX - form.metaDescription.length;

  const fieldBase =
    'w-full bg-black/40 border border-white/10 focus:border-gold/60 outline-none text-white text-sm px-4 py-3 rounded-sm transition-colors placeholder-white/25';
  const labelBase =
    'block text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div>
          <h2 className="font-serif text-3xl text-white">
            {isEdit ? 'Edit Dispatch' : 'New Dispatch'}
          </h2>
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold mt-2">
            Content Creation Suite
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-white/60 hover:text-white text-[10px] uppercase tracking-[0.25em] transition-colors disabled:opacity-40"
          >
            Cancel
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-sm">
          <p className="text-sm text-red-300/90">{error}</p>
        </div>
      ) : null}

      {/* ── 2-Column Layout ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ── MAIN COLUMN (2/3) ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-[#111] border border-white/5 shadow-lg rounded-sm p-8">
            {/* Title */}
            <div className="mb-8">
              <label htmlFor="bf-title" className={labelBase}>Article Title</label>
              <input
                id="bf-title"
                type="text"
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 focus:border-gold outline-none text-white text-2xl font-serif py-2 transition-colors placeholder-white/20"
                placeholder="Enter Title..."
                maxLength={180}
              />
            </div>

            {/* Rich Text Editor */}
            <div className="mb-8">
              <label className={labelBase}>Content Body</label>
              <RichTextEditor 
                value={form.content} 
                onChange={(html) => update('content', html)} 
              />
            </div>

            {/* Media Uploader (Cover Image) */}
            <div>
              <label className={labelBase}>Featured Header Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={form.coverImage}
                  onChange={(e) => update('coverImage', e.target.value)}
                  className={fieldBase + ' flex-1'}
                  placeholder="https://... or /images/..."
                />
                <label className="bg-[#1a1a1a] border border-white/10 hover:border-gold/50 text-white/80 text-[10px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-sm transition-colors whitespace-nowrap cursor-pointer">
                  <i className="fa-solid fa-cloud-arrow-up mr-2" /> Upload
                  <input 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      // Instantly upload the file and patch the state
                      try {
                        const formData = new FormData();
                        formData.append('file', file);
                        const res = await fetch('/api/admin/upload', {
                          method: 'POST',
                          body: formData
                        });
                        const data = await res.json();
                        if (data.url) {
                          update('coverImage', data.url);
                        } else {
                          alert(data.error || 'Upload failed');
                        }
                      } catch (err) {
                        alert('Network error during upload');
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold-gradient text-black text-[10px] uppercase tracking-[0.25em] font-medium px-8 py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-gold/10 hover:shadow-gold/20"
          >
            {submitting ? 'Saving to Database…' : isEdit ? 'Update Post & Metadata' : 'Publish Post'}
          </button>

        </div>

        {/* ── OPTIMIZATION SIDEBAR (1/3) ────────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* URL Slug (System) */}
          <div className="bg-[#111] border border-white/5 shadow-lg rounded-sm p-6">
            <h3 className="font-serif text-lg text-white mb-4">Routing</h3>
            <label htmlFor="bf-slug" className={labelBase}>
              URL Slug <span className="text-white/25 normal-case tracking-normal">(auto-derived)</span>
            </label>
            <input
              id="bf-slug"
              type="text"
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              className={fieldBase}
              placeholder="custom-slug-here"
            />
            <p className="mt-2 text-[10px] text-white/40 truncate">
              Preview: <span className="text-gold/80">/blogs/{effectiveSlug || '…'}</span>
            </p>
          </div>

          {/* SEO Card */}
          <div className="bg-[#111] border border-white/5 shadow-lg rounded-sm p-6 border-l-2 border-l-[#4285F4]">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-brands fa-google text-[#4285F4]" />
              <h3 className="font-serif text-lg text-white">SEO Settings</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bf-seo-keyword" className={labelBase}>Target Keyword</label>
                <input
                  id="bf-seo-keyword"
                  type="text"
                  value={form.seoKeyword}
                  onChange={(e) => update('seoKeyword', e.target.value)}
                  className={fieldBase}
                  placeholder="e.g. Luxury aviation"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="bf-meta-desc" className={labelBase + ' mb-0'}>Meta Description</label>
                  <span className={`text-[10px] ${remainingMeta < 0 ? 'text-red-300' : 'text-white/40'}`}>
                    {remainingMeta}
                  </span>
                </div>
                <textarea
                  id="bf-meta-desc"
                  value={form.metaDescription}
                  onChange={(e) => update('metaDescription', e.target.value)}
                  rows={3}
                  className={fieldBase + ' resize-none'}
                  placeholder="Optimal 150-160 character description for search results."
                />
              </div>
            </div>
          </div>

          {/* AEO Card */}
          <div className="bg-[#111] border border-white/5 shadow-lg rounded-sm p-6 border-l-2 border-l-[#10a37f]">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-robot text-[#10a37f]" />
              <h3 className="font-serif text-lg text-white">Answer Engine (AEO)</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bf-aeo-question" className={labelBase}>Target Question</label>
                <input
                  id="bf-aeo-question"
                  type="text"
                  value={form.aeoQuestion}
                  onChange={(e) => update('aeoQuestion', e.target.value)}
                  className={fieldBase}
                  placeholder="e.g. What is the range of the Joey?"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="bf-summary" className={labelBase + ' mb-0'}>Concise Snippet</label>
                  <span className={`text-[10px] ${remainingSummary < 0 ? 'text-red-300' : 'text-white/40'}`}>
                    {remainingSummary}
                  </span>
                </div>
                <textarea
                  id="bf-summary"
                  value={form.summary}
                  onChange={(e) => update('summary', e.target.value)}
                  rows={4}
                  className={fieldBase + ' resize-none focus:border-[#10a37f]/50 focus:ring-1 focus:ring-[#10a37f]/50'}
                  placeholder="Direct, factual 40-50 word answer optimized for AI extraction."
                />
              </div>
            </div>
          </div>

          {/* GEO Card */}
          <div className="bg-[#111] border border-white/5 shadow-lg rounded-sm p-6 border-l-2 border-l-[#a855f7]">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-network-wired text-[#a855f7]" />
              <h3 className="font-serif text-lg text-white">Generative Engine (GEO)</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="bf-geo-entities" className={labelBase}>Entities (Comma Separated)</label>
                <textarea
                  id="bf-geo-entities"
                  value={form.geoEntities}
                  onChange={(e) => update('geoEntities', e.target.value)}
                  rows={2}
                  className={fieldBase + ' resize-none'}
                  placeholder="Aviation, Turboprop, FAA, Carbon Fiber"
                />
              </div>
              
              <div>
                <label htmlFor="bf-geo-citations" className={labelBase}>Sources / Citations (One per line)</label>
                <textarea
                  id="bf-geo-citations"
                  value={form.geoCitations}
                  onChange={(e) => update('geoCitations', e.target.value)}
                  rows={3}
                  className={fieldBase + ' resize-none'}
                  placeholder="https://faa.gov/...&#10;https://boeing.com/..."
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
