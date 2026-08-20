import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igzvgvghzpggncbdqsfr.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ],
    minimumCacheTTL: 1339200
  }
};

export default nextConfig;
