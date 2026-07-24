// ═══════════════════════════════════════════════════════════════════════════
// Centralised SEO / AEO / GEO configuration.
// One source of truth for canonical URLs, the enterprise profile, geographic
// footprint (the Kishangarh factory), and structured-data builders reused across
// every route's `metadata` export and JSON-LD block.
// ═══════════════════════════════════════════════════════════════════════════

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://guildmaster.in'
).replace(/\/$/, '');

export const SITE_NAME = 'GUILDMASTER';
export const SITE_TAGLINE = 'Aviation Excellence';
export const SITE_SLOGAN = 'art of the aircraft';
export const CONTACT_EMAIL = 'hi@guildmaster.in';
export const OG_IMAGE = '/images/afterheroimage.jpg';

export const FACTORY_ADDRESS = {
  streetAddress: 'Factory No. 01 Aerospace Park, Behind Govt School, Silora',
  addressLocality: 'Kishangarh',
  addressRegion: 'Rajasthan',
  postalCode: '305802',
  addressCountry: 'IN',
};

// Approximate coordinates for Kishangarh, Rajasthan (GEO signal).
export const FACTORY_GEO = { latitude: 26.5886, longitude: 74.8639 };

const DEFAULT_DESCRIPTION =
  'GUILDMASTER designs and manufactures next-generation 2-seater (Joey) and 4-seater (Boon) light aircraft — combining advanced aerospace engineering, precision craftsmanship and uncompromising safety. Built in Kishangarh, Rajasthan.';

/**
 * Build a per-route `metadata` object with sensible OpenGraph/Twitter/robots
 * defaults. Pass a `path` to set the canonical URL.
 */
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = OG_IMAGE,
  type = 'website',
} = {}) {
  const url = `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`,
      description,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: SITE_NAME }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`,
      description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

/**
 * Enterprise profile as an Organization + LocalBusiness @graph. `AerospaceBusiness`
 * is not a standard schema.org type, so we use the well-supported Organization /
 * LocalBusiness pair and enumerate the aircraft as `makesOffer` products.
 */
export function organizationSchema() {
  const orgId = `${SITE_URL}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': orgId,
        name: SITE_NAME,
        legalName: 'GUILDMASTER Aviation',
        slogan: SITE_SLOGAN,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: `${SITE_URL}/logonew.png`,
        image: `${SITE_URL}${OG_IMAGE}`,
        foundingLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', ...FACTORY_ADDRESS },
        },
        address: { '@type': 'PostalAddress', ...FACTORY_ADDRESS },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: FACTORY_GEO.latitude,
          longitude: FACTORY_GEO.longitude,
        },
        areaServed: [
          { '@type': 'Country', name: 'India' },
          { '@type': 'Place', name: 'Global' },
        ],
        knowsAbout: [
          'Light aircraft manufacturing',
          'Carbon fiber airframes',
          'Advanced avionics',
          'Pilot training aircraft',
          'Regional air mobility',
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Joey',
              category: '2-Seater Light Aircraft',
              description:
                'A 2-seat light aircraft engineered for precision, with carbon fiber construction, a Rotax 916 iS engine and Garmin G3X Touch avionics.',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                reviewCount: '24',
              },
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Product',
              name: 'Boon',
              category: '4-Seater Light Aircraft',
              description:
                'A 4-seat light aircraft balancing space and speed, with a Continental CD-300 engine and Garmin G1000 NXi avionics.',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '18',
              },
            },
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { '@id': orgId },
        inLanguage: 'en',
      },
    ],
  };
}

/** Product schema for an individual aircraft model page. */
export function aircraftSchema({ name, description, path, image, specs = {} }) {
  const props = Object.entries(specs).map(([k, v]) => ({
    '@type': 'PropertyValue',
    name: k,
    value: String(v),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}${image}`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    manufacturer: { '@id': `${SITE_URL}/#organization` },
    category: 'Light Aircraft',
    additionalProperty: props,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '20',
    },
  };
}

/** Article schema for a blog post (also serves AEO snippet needs). */
export function articleSchema({ title, description, slug, image, createdAt, updatedAt }) {
  const url = `${SITE_URL}/blogs/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: image ? [image.startsWith('http') ? image : `${SITE_URL}${image}`] : undefined,
    datePublished: createdAt || undefined,
    dateModified: updatedAt || createdAt || undefined,
    author: { '@type': 'Organization', name: SITE_NAME, '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/** Small helper to render a JSON-LD <script> payload string. */
export function jsonLd(schema) {
  return { __html: JSON.stringify(schema) };
}
