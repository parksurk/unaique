/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: https://unpkg.com https://elevenlabs.io https://*.elevenlabs.io; frame-src 'self' https: https://elevenlabs.io https://*.elevenlabs.io; connect-src 'self' https: https://elevenlabs.io https://*.elevenlabs.io wss:; img-src 'self' data: https: https://elevenlabs.io https://*.elevenlabs.io; style-src 'self' 'unsafe-inline' https: https://elevenlabs.io https://*.elevenlabs.io; font-src 'self' data: https: https://elevenlabs.io https://*.elevenlabs.io; object-src 'none'; base-uri 'self'; form-action 'self';"
          },
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade'
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
