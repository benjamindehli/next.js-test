/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
    pwa: {
        dest: "public",
        runtimeCaching
    },
    trailingSlash: true,
    reactStrictMode: true,
    i18n: {
        locales: ["en", "no"],
        defaultLocale: "no",
        localeDetection: false
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [350, 540, 945],
        imageSizes: [16, 32, 48, 64, 128, 256],
        domains: ['ik.imagekit.io']
    }
});

module.exports = nextConfig;
