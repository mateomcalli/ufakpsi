import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "igzvgvghzpggncbdqsfr.supabase.co",
      },
    ],
  },

  async redirects() {
    if (!isProd) {
      return [];
    }

    return [
      {
        source: "/",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },
      {
        source: "/service",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },
      {
        source: "/brotherhood",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },
      {
        source: "/events",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },
      {
        source: "/hikelly",
        destination: "https://ufakpsi.com/admin",
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
