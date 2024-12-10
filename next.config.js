/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lwteensministrytrainingportal.org'],
  },
};

module.exports = nextConfig;
