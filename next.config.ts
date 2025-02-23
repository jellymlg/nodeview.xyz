import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ["geist"],
  images: {
    unoptimized: true
  },
  webpack(config) {
    config.experiments = { ...config.experiments, syncWebAssembly: true }
    return config
},
};

export default nextConfig;
