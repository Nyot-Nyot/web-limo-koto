import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript errors
  },
  images: {
    domains: ['placehold.co', 'img.youtube.com', 'i.ytimg.com', 'i.vimeocdn.com'],
    unoptimized: true
  },
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({
//   // ...config Next.js lain
//   // Jika ada config lain, merge di sini
// });

export default nextConfig;
