/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint in production builds
  eslint: {
    // Only run ESLint in development, not in production
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
