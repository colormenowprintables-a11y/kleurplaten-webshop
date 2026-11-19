import type { NextConfig } from 'next';

const cspHeader = [
  "default-src 'self' https: data: blob:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "frame-src 'self' https:",
  "connect-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'colormenow.ams3.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'colormenow.ams3.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
  
  async redirects() {
    return [
      {
        source: '/:lang/kawaii-food-sweets',
        destination: '/:lang/special-deals-promo-packs/promo-packs/all-ages/50-kawaii-sweets',
        permanent: true,
      },
      {
        source: '/kawaii-food-sweets',
        destination: '/nl/special-deals-promo-packs/promo-packs/all-ages/50-kawaii-sweets',
        permanent: true,
      },
      {
        source: '/:lang/mandalas-patterns',
        destination: '/:lang/special-deals-promo-packs/promo-packs/all-ages/50-relaxing-mandalas',
        permanent: true,
      },
      {
        source: '/mandalas-patterns',
        destination: '/nl/special-deals-promo-packs/promo-packs/all-ages/50-relaxing-mandalas',
        permanent: true,
      },
      {
        source: '/:lang/fantasy-fairytales',
        destination: '/:lang/cute-animals-fantasy',
        permanent: true,
      },
      {
        source: '/fantasy-fairytales',
        destination: '/nl/cute-animals-fantasy',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/sitemap.xml',
        destination: '/sitemap.xml',
      },
      {
        source: '/:lang/inspiratie',
        destination: '/:lang/inspiration',
      },
      {
        source: '/inspiratie',
        destination: '/nl/inspiration',
      },
      {
        source: '/pinterestproducts.xml',
        destination: '/api/pinterest-feed',
      },
      {
        source: '/pinterest-feed.xml',
        destination: '/api/pinterest-feed',
      },
      {
        source: '/pinterest.xml',
        destination: '/api/pinterest-feed',
      },
      {
        source: '/coloring-book/:slug',
        destination: '/en/coloring-book/:slug',
      },
      {
        source: '/cv-vault-8942',
        destination: '/admin?secret=cv-vault-8942',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
