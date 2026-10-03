import type { NextConfig } from "next";

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: storageUrl
      ? [
          {
            protocol: "https",
            hostname: new URL(storageUrl).hostname,
            pathname: "/**",
          },
        ]
      : [],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  devIndicators: false,

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;