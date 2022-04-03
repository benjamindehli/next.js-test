/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'no'],
    defaultLocale: 'no',
    localeDetection: false
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig
