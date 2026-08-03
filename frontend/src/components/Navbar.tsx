'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AuthModal } from './AuthModal'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cosh-black/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cosh-green to-cosh-green-600 flex items-center justify-center font-extrabold text-cosh-black text-lg shadow-lg shadow-cosh-green/30">C</div>
              <span className="text-xl font-extrabold text-white font-heading tracking-tight">Coshal</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/explore" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Explorer</Link>
              <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Catégories</Link>
              <Link href="/freelances" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Freelances</Link>
              <Link href="/how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Comment ça marche</Link>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button onClick={() => openAuth('login')} className="text-slate-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors">Connexion</button>
              <button onClick={() => openAuth('register')} className="btn-primary py-2 px-5 text-sm">Inscription</button>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-400 hover:text-white transition-colors">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-cosh-navy border-t border-slate-800/50">
            <div className="px-4 py-4 space-y-3">
              <Link href="/explore" className="block text-slate-400 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Explorer</Link>
              <Link href="/categories" className="block text-slate-400 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Catégories</Link>
              <Link href="/freelances" className="block text-slate-400 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>Freelances</Link>
              <div className="pt-3 border-t border-slate-800/50 flex gap-3">
                <button onClick={() => { setMobileOpen(false); openAuth('login') }} className="btn-secondary flex-1 py-2.5 text-sm">Connexion</button>
                <button onClick={() => { setMobileOpen(false); openAuth('register') }} className="btn-primary flex-1 py-2.5 text-sm">Inscription</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
    </>
  )
}
