/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lwteensministrytrainingportal.org'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
