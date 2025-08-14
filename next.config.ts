/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com https://elevenlabs.io; frame-src 'self' https://elevenlabs.io; connect-src 'self' https://elevenlabs.io; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' data: https:;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/elevenlabs/:path*',
        destination: 'https://elevenlabs.io/:path*',
      },
    ]
  }
}

module.exports = nextConfig
