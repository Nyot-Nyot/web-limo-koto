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
  },
};

export default nextConfig;
