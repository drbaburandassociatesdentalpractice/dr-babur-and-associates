import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  allowedDevOrigins: [
    "192.168.100.11",
    "192.168.0.126",
    "192.168.100.38",
  ],
};

export default nextConfig;