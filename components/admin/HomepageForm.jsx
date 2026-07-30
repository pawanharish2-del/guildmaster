'use client';

import { useState, useEffect } from 'react';

export default function HomepageForm() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/homepage')
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to load configuration.' });
        setLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = [...data.testimonials];
    newTestimonials[index][field] = value;
    setData({ ...data, testimonials: newTestimonials });
  };

  const addTestimonial = () => {
    setData({
      ...data,
      testimonials: [...data.testimonials, { name: '', role: '', quote: '', avatarUrl: '' }]
    });
  };

  const removeTestimonial = (index) => {
    const newTestimonials = data.testimonials.filter((_, i) => i !== index);
    setData({ ...data, testimonials: newTestimonials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Homepage configuration updated.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to update homepage.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error.' });
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-white/50 text-sm">Loading configuration...</div>;
  }

  if (!data) return null;

  const InputGroup = ({ label, value, onChange, textarea }) => (
    <div className="mb-4">
      <label className="block text-[10px] uppercase tracking-[0.2em] text-gold mb-2">{label}</label>
      {textarea ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-4xl">
      {message && (
        <div className={`mb-8 rounded-sm px-5 py-4 text-sm border ${message.type === 'success' ? 'bg-gold/10 border-gold/30 text-goldLight' : 'bg-red-500/10 border-red-500/25 text-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Images */}
        <section className="glass p-8 rounded-sm border-t-2 border-gold/50">
          <h3 className="font-serif text-2xl text-white mb-6">Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Hero Banner Image URL" value={data.heroBannerImage} onChange={(val) => handleChange('heroBannerImage', val)} />
            <InputGroup label="4-Seater Full Width Image URL" value={data.fullWidthImage} onChange={(val) => handleChange('fullWidthImage', val)} />
          </div>
        </section>

        {/* Aircraft Overview */}
        <section className="glass p-8 rounded-sm border-t-2 border-gold/50">
          <h3 className="font-serif text-2xl text-white mb-6">Aircraft Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Heading" value={data.overviewHeading} onChange={(val) => handleChange('overviewHeading', val)} />
            <InputGroup label="Subheading" value={data.overviewSubheading} onChange={(val) => handleChange('overviewSubheading', val)} />
          </div>
        </section>

        {/* Technology */}
        <section className="glass p-8 rounded-sm border-t-2 border-gold/50">
          <h3 className="font-serif text-2xl text-white mb-6">Technology Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Heading" value={data.techHeading} onChange={(val) => handleChange('techHeading', val)} />
            <InputGroup label="Subheading" value={data.techSubheading} onChange={(val) => handleChange('techSubheading', val)} />
          </div>
          <div className="mt-2">
             <InputGroup label="Subtext" value={data.techSubtext} onChange={(val) => handleChange('techSubtext', val)} textarea />
          </div>
        </section>

        {/* Community */}
        <section className="glass p-8 rounded-sm border-t-2 border-gold/50">
          <h3 className="font-serif text-2xl text-white mb-6">Community Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InputGroup label="Heading" value={data.communityHeading} onChange={(val) => handleChange('communityHeading', val)} />
            <InputGroup label="Subheading" value={data.communitySubheading} onChange={(val) => handleChange('communitySubheading', val)} />
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex justify-between items-center mb-6">
               <h4 className="font-serif text-xl text-white">Testimonials</h4>
               <button type="button" onClick={addTestimonial} className="text-[10px] uppercase tracking-[0.2em] text-gold hover:text-white transition-colors">
                 + Add Testimonial
               </button>
            </div>
            
            <div className="space-y-6">
              {data.testimonials.map((t, i) => (
                <div key={i} className="bg-black/20 border border-white/5 p-6 rounded-sm relative">
                  <button type="button" onClick={() => removeTestimonial(i)} className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors">
                    <i className="fa-solid fa-times" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <InputGroup label="Name" value={t.name} onChange={(val) => handleTestimonialChange(i, 'name', val)} />
                    <InputGroup label="Role" value={t.role} onChange={(val) => handleTestimonialChange(i, 'role', val)} />
                  </div>
                  <InputGroup label="Avatar URL (Optional)" value={t.avatarUrl} onChange={(val) => handleTestimonialChange(i, 'avatarUrl', val)} />
                  <InputGroup label="Quote" value={t.quote} onChange={(val) => handleTestimonialChange(i, 'quote', val)} textarea />
                </div>
              ))}
              {data.testimonials.length === 0 && (
                <p className="text-white/40 text-sm">No testimonials added yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="glass p-8 rounded-sm border-t-2 border-gold/50">
          <h3 className="font-serif text-2xl text-white mb-6">CTA Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup label="Heading" value={data.ctaHeading} onChange={(val) => handleChange('ctaHeading', val)} />
            <InputGroup label="Subheading" value={data.ctaSubheading} onChange={(val) => handleChange('ctaSubheading', val)} />
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-gold-gradient text-black text-xs uppercase tracking-[0.25em] font-medium px-8 py-4 rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
