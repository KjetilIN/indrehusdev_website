/** @type {import('next').NextConfig} */
const nextConfig = {
  // Proxy Plausible through our own domain so ad-blockers don't drop page views.
  async rewrites() {
    return [
      { source: '/stats/js/script.js', destination: 'https://plausible.io/js/script.js' },
      { source: '/stats/api/event', destination: 'https://plausible.io/api/event' },
    ]
  },
}

module.exports = nextConfig
