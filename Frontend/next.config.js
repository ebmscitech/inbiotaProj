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
        hostname: 'api.aspirasi.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
}