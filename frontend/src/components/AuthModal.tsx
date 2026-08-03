'use client'

import { useState, useEffect } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')

  useEffect(() => { setMode(initialMode) }, [initialMode])
  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Auth submit:', { mode, email, password, username, displayName })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-cosh-navy border border-slate-700/50 rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cosh-green to-cosh-green-600 flex items-center justify-center font-extrabold text-cosh-black text-lg">C</div>
          <span className="text-lg font-extrabold text-white font-heading">Coshal</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white font-heading mb-1">{mode === 'login' ? 'Content de vous revoir' : 'Créez votre compte'}</h2>
        <p className="text-slate-400 text-sm mb-6">{mode === 'login' ? 'Connectez-vous pour accéder à votre compte' : 'Rejoignez la communauté Coshal en quelques secondes'}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Jean Dupont" className="input-dark pl-10" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Nom d&apos;utilisateur</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="jeandupont" className="input-dark pl-10" required />
                </div>
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@email.com" className="input-dark pl-10" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-dark pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full py-3">{mode === 'login' ? 'Se connecter' : "S'inscrire gratuitement"}</button>
        </form>
        <div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700/50" /></div><div className="relative flex justify-center text-xs"><span className="px-3 bg-cosh-navy text-slate-500">ou</span></div></div>
        <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-cosh-black border border-slate-700/50 rounded-xl text-sm text-slate-300 hover:border-slate-600 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continuer avec Google
        </button>
        <p className="mt-6 text-center text-sm text-slate-500">
          {mode === 'login' ? (
            <>Pas encore de compte ? <button onClick={() => setMode('register')} className="text-cosh-green hover:text-cosh-green-600 font-medium transition-colors">S&apos;inscrire</button></>
          ) : (
            <>Déjà un compte ? <button onClick={() => setMode('login')} className="text-cosh-green hover:text-cosh-green-600 font-medium transition-colors">Se connecter</button></>
          )}
        </p>
      </div>
    </div>
  )
}
