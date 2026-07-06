/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    // Don't fail production builds on lint issues; lint is run separately.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Ensure Prisma client is treated as an external in server components.
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
};

module.exports = nextConfig;
