import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/renomeador',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
