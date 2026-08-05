// ── Typography — self-hosted variable fonts (@fontsource) ────────────────────
// The static source loaded Inter (300/400/500) and Playfair Display (400/600 +
// italic) from Google Fonts via <link>. We ship the identical typefaces as
// self-hosted variable fonts instead: no third-party request at runtime, no
// FOUT, and no build-time dependency on fonts.googleapis.com. The family names
// registered by these packages ('Inter Variable' / 'Playfair Display Variable')
// are mapped onto the --font-inter / --font-playfair CSS variables in
// globals.css, which the Tailwind `sans` / `serif` tokens consume.
import '@fontsource-variable/inter';
import '@fontsource-variable/playfair-display'; // roman axis (400–900)
import '@fontsource-variable/playfair-display/wght-italic.css'; // italic axis
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  organizationSchema,
  jsonLd,
  buildMetadata,
} from '@/lib/seo';

// ── Global metadata (per-route pages extend/override this) ────────────────────
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  ...buildMetadata({ path: '/' }),
  // buildMetadata sets a null `title`; restore the default/template above.
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },

  keywords: [
    'Guildmaster',
    'light aircraft',
    'aviation',
    '2-seater aircraft',
    '4-seater aircraft',
    'Joey aircraft',
    'Boon aircraft',
    'Kishangarh aerospace',
    'India aircraft manufacturer',
  ],
  verification: {
    google: '4JifuKVYGW8An3nqV8CPEpV3t8eGjQAGMFLut_Yya1o',
  },
};

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <head>
        {/* Icon library used across the UI (matches the static source). */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Enterprise profile: Organization + LocalBusiness + WebSite @graph. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationSchema())}
        />
      </head>
      <body className="selection:bg-gold selection:text-black">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
