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
  output: 'standalone',
  staticPageGenerationTimeout: 120,
}