import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { ADMIN_ROLE_DEFINITIONS, AuthSession } from '../types';
import { loginUser } from '../services/api';

interface LoginPageProps {
  onLogin: (session: AuthSession) => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const session = await loginUser(email.trim(), password);
      window.localStorage.setItem('ieca-auth-session', JSON.stringify(session));
      onLogin(session);
    } catch {
      setError('Email ou palavra-passe incorretos.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-150px)] bg-ieca-light flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-2xl rounded-card overflow-hidden border border-ieca-gray-border">
        <section className="bg-ieca-dark text-white p-8 sm:p-12 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="w-12 h-12 bg-ieca-coral flex items-center justify-center rounded-card mb-8">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-ieca-coral text-xs font-bold uppercase tracking-[0.2em]">Área reservada</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3 leading-tight">Portal de gestão IECA</h1>
            <p className="text-gray-300 mt-5 max-w-md leading-relaxed">
              Aceda ao centro de conteúdos, congregações, documentos e permissões da Igreja.
            </p>
          </div>
          <div className="border-t border-white/15 pt-5 mt-10">
            <p className="text-xs text-gray-400">Acesso protegido para equipas autorizadas da IECA.</p>
          </div>
        </section>

        <section className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 text-ieca-coral mb-3">
              <LockKeyhole className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Iniciar sessão</span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-ieca-black">Bem-vindo ao painel</h2>
            <p className="text-sm text-ieca-gray mt-2 mb-8">Introduza os seus dados para continuar.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-ieca-black mb-2">Email institucional</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="nome@ieca.ao"
                  className="w-full px-4 py-3 border border-ieca-gray-border rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral/30 focus:border-ieca-coral"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-ieca-black mb-2">Palavra-passe</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder="Introduza a sua palavra-passe"
                    className="w-full px-4 py-3 pr-12 border border-ieca-gray-border rounded-btn text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral/30 focus:border-ieca-coral"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ieca-gray hover:text-ieca-black" aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}>
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded-btn">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-ieca-coral hover:bg-ieca-coral-hover disabled:opacity-60 text-white py-3 rounded-btn font-bold text-sm transition-colors">
                <span>{isSubmitting ? 'A validar...' : 'Entrar no painel'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="mt-8 pt-5 border-t border-ieca-gray-border space-y-3">
              <p className="text-[11px] text-ieca-gray leading-relaxed font-semibold">Acesso Rápido de Demonstração (Clique para Entrar):</p>
              <div className="flex flex-wrap gap-2">
                {ADMIN_ROLE_DEFINITIONS.map(role => (
                  <button 
                    key={role.id} 
                    type="button"
                    onClick={async () => {
                      setIsSubmitting(true);
                      const session = await loginUser(`${role.id}@ieca.ao`, 'demo123');
                      window.localStorage.setItem('ieca-auth-session', JSON.stringify(session));
                      onLogin(session);
                    }}
                    className="text-[11px] font-bold text-white bg-ieca-black hover:bg-ieca-coral px-3 py-1.5 rounded transition-colors shadow-sm"
                  >
                    Entrar como {role.label}
                  </button>
                ))}
              </div>
              <button type="button" onClick={onBack} className="block mt-4 text-xs font-semibold text-ieca-coral hover:underline">← Voltar ao site público</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};