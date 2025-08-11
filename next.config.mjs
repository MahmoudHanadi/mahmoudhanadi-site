/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Keep only standard page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;
