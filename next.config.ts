import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recruitment", 
        destination: "https://recruitment.ufakpsi.com",
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
