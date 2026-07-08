/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// GUILDMASTER Design System
// Ported 1:1 from the original static `tailwind.config` (inline CDN config).
// Every token below matches the source exactly — colours, fonts, and the two
// custom background utilities (`luxury-gradient`, `gold-gradient`).
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './hooks/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#050505',
        bgSec: '#0A0A0A',
        gold: '#D4AF37',
        goldLight: '#E7C873',
        muted: 'rgba(255,255,255,0.6)',
      },
      fontFamily: {
        // `next/font` injects these CSS variables (see app/layout.js).
        // The variable-first fallback keeps the exact 'Inter' / 'Playfair Display'
        // stacks the static site relied on.
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      backgroundImage: {
        'luxury-gradient':
          'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.2) 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #D4AF37 0%, #E7C873 50%, #D4AF37 100%)',
      },
    },
  },
  plugins: [],
};
