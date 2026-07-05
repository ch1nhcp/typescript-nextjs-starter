import type { NextConfig } from 'next';

import './src/lib/env/client';
import './src/lib/env/server';
import { redirects } from './redirects';

/**
 * Content Security Policy (CSP).
 *
 * This is an intentionally strict-but-minimal baseline. Each directive is a
 * separate entry so it's easy to see what's locked down and what to open up.
 *
 * How to extend when you add third-party resources:
 * - Analytics / external scripts → add the origin to `script-src`
 *   (e.g. `script-src 'self' https://plausible.io`).
 * - Image CDN / remote images → add the origin to `img-src`
 *   (e.g. `img-src 'self' data: https://images.example.com`).
 * - API / fetch / websocket calls → add the origin to `connect-src`.
 * - Custom fonts → add the origin to `font-src`.
 * - Embedded iframes (video, maps) → add the origin to `frame-src`.
 *
 * Notes:
 * - No `default-src` is set so this doesn't break Next.js' inline runtime
 *   scripts/styles out of the box. Once you adopt a nonce-based setup you can
 *   tighten this into a full `default-src 'self'` policy.
 * - `report-to default` sends violation reports to a `default` reporting group;
 *   wire up a `Report-To`/`Reporting-Endpoints` header to actually collect them.
 */
const contentSecurityPolicyDirectives = [
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "manifest-src 'self'",
  'report-to default',
  // Add resource directives here as the app grows, for example:
  // "script-src 'self'",
  // "style-src 'self' 'unsafe-inline'",
  // "img-src 'self' data:",
  // "connect-src 'self'",
  // "font-src 'self'",
];

const contentSecurityPolicy = contentSecurityPolicyDirectives.join('; ');

// For more information, check https://nextjs.org/docs/app/api-reference/config/next-config-js/headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    // `strict-origin-when-cross-origin` is the modern default: it sends the full
    // URL same-origin, only the origin cross-origin, and nothing when downgrading
    // to HTTP. `no-referrer-when-downgrade` (the old default) leaks full URLs
    // cross-origin.
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: `accelerometer=(), camera=(), gyroscope=(), microphone=(), usb=()`,
  },
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return redirects;
  },
  experimental: {
    // Enable caching for next build. FileSystem caching is enabled by default for development
    turbopackFileSystemCacheForBuild: true,
  },
  reactStrictMode: true,
  reactCompiler: true,
};

export default nextConfig;
