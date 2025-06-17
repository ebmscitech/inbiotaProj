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
  experimental: {
    workerThreads: false,
    turbo: false,
  },
}