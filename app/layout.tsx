import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Navbar from '@/components/nav/Navbar'
import { PLAUSIBLE_DOMAIN, SITE_URL } from '@/lib/site'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'IndrehusDev </>',
    template: '%s · IndrehusDev',
  },
  description: 'Kjetil Indrehus: software developer and M.Sc. student at UiO. Posts, projects and research.',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Background />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
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
