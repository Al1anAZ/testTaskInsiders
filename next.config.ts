import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashBoard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
