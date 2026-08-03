import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Coshal — La plateforme de freelancing africaine et internationale',
  description: 'Trouvez les meilleurs freelances africains ou proposez vos services. Paiement sécurisé par LigdiCash, séquestre intégré.',
  keywords: ['freelance', 'afrique', 'coshal', 'services', 'paiement mobile', 'ligdicash', 'escrow'],
  openGraph: { title: 'Coshal — Freelancing Africain', description: 'Achetez et vendez des services freelance en toute sécurité.', url: 'https://coshal.com', siteName: 'Coshal', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-cosh-black text-slate-200 antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
