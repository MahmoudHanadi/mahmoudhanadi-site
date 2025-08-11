import nextMDX from '@next/mdx';

// Enable MDX support and specify page extensions
const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

const nextConfig = {
  // Enable the new app directory (Next.js 13/14 feature)
  experimental: {
    appDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);