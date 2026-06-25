import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
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
