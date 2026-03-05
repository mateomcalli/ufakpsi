import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
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
  }
};

export default nextConfig;
