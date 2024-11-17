/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vercel-blob-storage.vercel.app'],
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 