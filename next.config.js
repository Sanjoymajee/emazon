/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "source.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
