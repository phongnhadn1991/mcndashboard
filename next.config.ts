/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'github.com'
        },
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
        },
        {
            protocol: 'http',
            hostname: 'localhost',
        }
    ],
    domains: ['localhost'],
  }
};

export default nextConfig;
