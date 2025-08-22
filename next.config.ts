import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV == "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    basePath: "/sw-landing",
    assetPrefix: "/sw-landing/",
  }),
};

module.exports = nextConfig;
