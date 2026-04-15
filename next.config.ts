import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? "/sw-landing" : "",
  assetPrefix: isProd ? "/sw-landing/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
