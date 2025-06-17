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
  // Add these configurations
  output: 'standalone',
  experimental: {
    // Enable concurrent features
    concurrentFeatures: true,
    // Enable server components
    serverComponents: true,
  },
  // Increase static page generation timeout
  staticPageGenerationTimeout: 120,
}