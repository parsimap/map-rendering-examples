import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /maplibre-gl-worker\.mjs$/,
      resourceQuery: /url/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
