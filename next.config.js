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
    deviceSizes: [350, 540, 945],
    imageSizes: [16, 32, 48, 64, 128, 256]
  }
}

module.exports = nextConfig
