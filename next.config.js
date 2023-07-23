/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.notion.so", "images.unsplash.com", "blog.kakaocdn.net"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://prove2.notion.site/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
