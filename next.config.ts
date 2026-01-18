import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Update this to match your GitHub repository name if it differs
  basePath: '/curr.org',
  assetPrefix: '/curr.org',
};

export default nextConfig;
