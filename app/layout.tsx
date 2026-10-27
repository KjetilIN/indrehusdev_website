import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { PLAUSIBLE_DOMAIN, SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IndrehusDev </>',
    template: '%s · IndrehusDev',
  },
  description: 'Portfolio page created by Kjetil Indrehus',
}

// Only count real visits, not local dev or Vercel previews.
const enableAnalytics = process.env.VERCEL_ENV === 'production'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {enableAnalytics && (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            data-api="/stats/api/event"
            src="/stats/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
