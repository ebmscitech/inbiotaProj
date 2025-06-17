// next.config.js
module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'inbiota.duckdns.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 180,
  output: 'standalone',
  experimental: {
    workerThreads: false,
    concurrentFeatures: false,
    isrMemoryCacheSize: 0,
  },
  webpack: (config, { isServer }) => {
    config.performance = {
      ...config.performance,
      maxAssetSize: 1000000,
      maxEntrypointSize: 1000000,
    }
    return config
  },
}