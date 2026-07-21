/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Plain <img> tags are used throughout to guarantee a pixel-perfect replica of
  // the static layout (next/image can alter intrinsic sizing / wrapping). Remote
  // hosts are still whitelisted here in case next/image is adopted later.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  // Mongoose ships optional native deps that must not be bundled for the browser
  // or traced into the serverless build graph.
  serverExternalPackages: ['mongoose'],
  async redirects() {
    return [
      {
        source: '/joey',
        destination: '/models/joey',
        permanent: true,
      },
      {
        source: '/boon',
        destination: '/models/boon',
        permanent: true,
      },
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
