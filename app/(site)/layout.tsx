import Background from '@/components/Background'
import Footer from '@/components/Footer'
import Navbar from '@/components/nav/Navbar'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Background />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
