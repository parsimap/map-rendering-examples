module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /maplibre-gl-worker\.mjs$/,
      resourceQuery: /url/,
      type: 'asset/resource',
    });
    return config;
  },
};
