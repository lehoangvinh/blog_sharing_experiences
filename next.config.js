/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  images: {
    domains: [
      "images.pexels.com",
      "scontent.fdad3-5.fna.fbcdn.net",
      ".com",
      "googleusercontent.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
