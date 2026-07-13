/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "frame-src 'self' https://contents.bownow.jp https://*.bownow.jp;" },
          { key: 'X-Frame-Options', value: 'ALLOWALL' }
        ],
      },
    ];
  },
};
export default nextConfig;