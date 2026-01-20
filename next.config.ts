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
      // Root
      {
        source: "/",
        destination: "https://recruitment.ufakpsi.com",
        permanent: false,
      },

      // Sections + all subpaths
      {
        source: "/service/:path*",
        destination: "https://recruitment.ufakpsi.com/service/:path*",
        permanent: false,
      },
      {
        source: "/brotherhood/:path*",
        destination: "https://recruitment.ufakpsi.com/brotherhood/:path*",
        permanent: false,
      },
      {
        source: "/admin/:path*",
        destination: "https://recruitment.ufakpsi.com/admin/:path*",
        permanent: false,
      },
      {
        source: "/events/:path*",
        destination: "https://recruitment.ufakpsi.com/events/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
