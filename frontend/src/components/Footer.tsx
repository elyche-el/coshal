import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-800/30 bg-cosh-navy/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cosh-green to-cosh-green-600 flex items-center justify-center font-extrabold text-cosh-black text-base">C</div>
              <span className="text-lg font-extrabold text-white font-heading">Coshal</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">La plateforme de freelancing africaine. Paiement sécurisé, séquestre intégré.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Plateforme</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Explorer les services</Link></li>
              <li><Link href="/freelances" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Trouver un freelance</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Comment ça marche</Link></li>
              <li><Link href="/pricing" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Tarifs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Blog</Link></li>
              <li><Link href="/help" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Centre d&apos;aide</Link></li>
              <li><Link href="/community" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Communauté</Link></li>
              <li><Link href="/affiliate" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Affiliation</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Conditions d&apos;utilisation</Link></li>
              <li><Link href="/privacy" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Confidentialité</Link></li>
              <li><Link href="/cookies" className="text-sm text-slate-500 hover:text-cosh-green transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-slate-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">&copy; {new Date().getFullYear()} Coshal. Tous droits réservés.</p>
          <p className="text-sm text-slate-600 flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Africa</p>
        </div>
      </div>
    </footer>
  )
}
