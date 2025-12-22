/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Optimize production builds
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  // React strict mode
  reactStrictMode: true,
};

module.exports = nextConfig;






