import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sw-landing",
  assetPrefix: "/sw-landing/",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
