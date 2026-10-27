import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Archivo, Geist, Geist_Mono } from 'next/font/google'
import { PLAUSIBLE_DOMAIN, SITE_URL } from '@/lib/site'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

// Display face for the intro and headings.
const archivo = Archivo({ subsets: ['latin'], weight: ['400', '800', '900'], variable: '--font-archivo-face' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Kjetil Indrehus',
    template: '%s · IndrehusDev',
  },
  description: 'Kjetil Indrehus: software developer at Bekk and long-distance runner. Posts, projects and research.',
  openGraph: {
    siteName: 'IndrehusDev',
    locale: 'en_US',
  },
}

// Only count real visits, not local dev or Vercel previews.
const enableAnalytics = process.env.VERCEL_ENV === 'production'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body className="font-sans antialiased">
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
