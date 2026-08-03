'use client'

import { useState } from 'react'
import { Search, ArrowRight, Shield, Zap, Globe, Star, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react'
import { AuthModal } from '@/components/AuthModal'

const categories = [
  { name: 'Graphisme & Design', icon: '🎨', count: 1240 },
  { name: 'Développement Web', icon: '💻', count: 980 },
  { name: 'Rédaction & Traduction', icon: '✍️', count: 756 },
  { name: 'Marketing Digital', icon: '📈', count: 632 },
  { name: 'Vidéo & Animation', icon: '🎬', count: 445 },
  { name: 'Musique & Audio', icon: '🎵', count: 312 },
  { name: 'Business & Consulting', icon: '💼', count: 289 },
  { name: 'Formation & Coaching', icon: '🎓', count: 198 },
]

const featuredServices = [
  { id: 1, title: 'Je crée un logo professionnel pour votre marque', seller: 'Amara K.', rating: 4.9, reviews: 234, price: 25, image: '🎨', category: 'Graphisme' },
  { id: 2, title: 'Site web vitrine responsive en React/Next.js', seller: 'David M.', rating: 4.8, reviews: 156, price: 150, image: '💻', category: 'Développement' },
  { id: 3, title: 'Rédaction article blog SEO optimisé (1000 mots)', seller: 'Fatou S.', rating: 5.0, reviews: 89, price: 30, image: '✍️', category: 'Rédaction' },
  { id: 4, title: 'Montage vidéo YouTube professionnel', seller: 'Kofi A.', rating: 4.7, reviews: 312, price: 60, image: '🎬', category: 'Vidéo' },
  { id: 5, title: 'Gestion publicitaire Facebook & Instagram Ads', seller: 'Grace O.', rating: 4.9, reviews: 178, price: 100, image: '📈', category: 'Marketing' },
  { id: 6, title: 'Traduction Français-Anglais professionnelle', seller: 'Yves T.', rating: 4.8, reviews: 445, price: 15, image: '🌍', category: 'Traduction' },
]

const stats = [
  { value: '5,000+', label: 'Freelances' },
  { value: '25,000+', label: 'Projets réalisés' },
  { value: '15+', label: 'Pays africains' },
  { value: '98%', label: 'Clients satisfaits' },
]

const advantages = [
  { icon: Shield, title: 'Paiement Sécurisé', description: 'Vos fonds sont protégés par le système de séquestre LigdiCash. Le freelance n\'est payé qu\'après validation.' },
  { icon: Zap, title: 'Livraison Rapide', description: 'Des freelances qualifiés prêts à démarrer votre projet immédiatement.' },
  { icon: Globe, title: 'Talent Africain', description: 'Accédez aux meilleurs talents du continent. Pensé pour le marché local et international.' },
  { icon: MessageCircle, title: 'Communication Directe', description: 'Échangez directement avec les freelances avant de commander. Messagerie intégrée.' },
]

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const handleCtaClick = () => setAuthModalOpen(true)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-glow-green rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosh-green/10 border border-cosh-green/20 text-cosh-green text-sm mb-8 animate-fade-in-up">
              <TrendingUp className="w-4 h-4" /><span>La plateforme africaine en pleine croissance</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
              <span className="text-white">Trouvez le </span>
              <span className="bg-gradient-to-r from-cosh-green to-cosh-green-600 bg-clip-text text-transparent">talent parfait</span>
              <br /><span className="text-white">pour votre projet</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up">
              Coshal connecte les entreprises avec les meilleurs freelances africains. Paiement sécurisé, séquestre intégré.
            </p>
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
              <div className="flex items-center gap-2 p-2 bg-cosh-navy border border-slate-700/50 rounded-2xl shadow-2xl focus-within:border-cosh-green/50 transition-all">
                <Search className="w-5 h-5 text-slate-500 ml-3 flex-shrink-0" />
                <input type="text" placeholder="Rechercher un service... (ex: logo, site web, rédaction)" className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 py-3 focus:outline-none text-sm sm:text-base" />
                <button onClick={handleCtaClick} className="btn-primary py-2.5 px-5 text-sm whitespace-nowrap">Rechercher</button>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 animate-fade-in-up">
              <span>Populaire :</span>
              {['Logo design', 'Site WordPress', 'SEO', 'Montage vidéo'].map(tag => (
                <button key={tag} className="px-3 py-1 rounded-full bg-cosh-navy/50 border border-slate-700/30 hover:border-cosh-green/30 hover:text-cosh-green transition-colors">{tag}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cosh-black to-transparent pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (<div key={stat.label} className="text-center"><div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-heading">{stat.value}</div><div className="text-sm text-slate-500">{stat.label}</div></div>))}
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">Explorez les catégories</h2><p className="text-slate-400 max-w-xl mx-auto">Des milliers de services organisés par catégories.</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(cat => (<button key={cat.name} className="card-hover text-left group cursor-pointer"><span className="text-3xl mb-3 block">{cat.icon}</span><h3 className="font-semibold text-slate-200 group-hover:text-white transition-colors mb-1">{cat.name}</h3><p className="text-sm text-slate-500">{cat.count} services</p></button>))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-cosh-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12"><div><h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">Services populaires</h2><p className="text-slate-400">Découvrez les services les plus demandés</p></div></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <button key={service.id} onClick={handleCtaClick} className="card-hover text-left group w-full cursor-pointer">
                <div className="w-full h-40 bg-cosh-black rounded-xl mb-4 flex items-center justify-center text-5xl border border-slate-800/30 group-hover:border-cosh-green/20 transition-colors">{service.image}</div>
                <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-cosh-green/20 flex items-center justify-center text-sm font-bold text-cosh-green">{service.seller.charAt(0)}</div><div><p className="text-sm font-medium text-slate-300">{service.seller}</p><div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /><span className="text-xs text-slate-400">{service.rating} ({service.reviews})</span></div></div></div>
                <h3 className="text-slate-200 group-hover:text-white font-medium transition-colors line-clamp-2 mb-3">{service.title}</h3>
                <div className="flex items-center justify-between"><span className="badge-green">{service.category}</span><span className="text-lg font-bold text-cosh-green">À partir de ${service.price}</span></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">Pourquoi choisir Coshal ?</h2><p className="text-slate-400 max-w-xl mx-auto">Une plateforme conçue pour la confiance et la simplicité.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map(adv => (<div key={adv.title} className="card text-center group"><div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cosh-green/10 border border-cosh-green/20 flex items-center justify-center group-hover:bg-cosh-green/20 transition-colors"><adv.icon className="w-6 h-6 text-cosh-green" /></div><h3 className="text-lg font-semibold text-white mb-2">{adv.title}</h3><p className="text-sm text-slate-400 leading-relaxed">{adv.description}</p></div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosh-green/10 via-cosh-navy to-cosh-green/5 border border-cosh-green/20 p-10 sm:p-16 text-center animate-glow-pulse">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-4">Prêt à démarrer ?</h2>
            <p className="text-slate-300 max-w-lg mx-auto mb-8 text-lg">Rejoignez des milliers de freelances et clients. Inscription gratuite en 30 secondes.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button onClick={handleCtaClick} className="btn-primary text-lg px-8 py-4">Créer un compte gratuit <ArrowRight className="w-5 h-5" /></button>
              <button onClick={handleCtaClick} className="btn-secondary text-lg px-8 py-4">Je suis freelance</button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400"><span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-cosh-green" /> Sans engagement</span><span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-cosh-green" /> Paiement sécurisé</span><span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-cosh-green" /> Support 24/7</span></div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
