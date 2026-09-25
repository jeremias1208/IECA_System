import React from 'react';
import { Logo } from '../ui/Logo';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, ArrowUp } from 'lucide-react';
import { useSitePreferences } from '../../context/SitePreferencesContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useSitePreferences();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ieca-black text-white pt-16 pb-8 border-t-4 border-ieca-coral font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Column 1: IECA Identity */}
          <div className="space-y-4">
            <Logo variant="full" size="md" />
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              {t('footerDescription')}
            </p>
            <div className="flex items-center gap-3 pt-2 text-ieca-coral">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{t('followIeca')}</span>
              <a href="https://www.facebook.com/profile.php?id=61594335956813" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-ieca-coral hover:text-white rounded-full transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@jeremiasevaristo8215" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-ieca-coral hover:text-white rounded-full transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61594335956813" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-900 hover:bg-ieca-coral hover:text-white rounded-full transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-ieca-coral/30 pb-2 inline-block">
              {t('resourcesLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-ieca-coral transition-colors">
                  História & Sínodos Provinciais
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('conteudos')} className="hover:text-ieca-coral transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ieca-gold"></span>
                  Artigos & Pregações
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hinario')} className="hover:text-ieca-coral transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ieca-coral"></span>
                  Hinário Digital
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('transmissoes')} className="hover:text-ieca-coral transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Transmissões Ao Vivo
                </button>
              </li>
              <li>
                {/*<button onClick={() => onNavigate('doacoes')} className="hover:text-ieca-coral transition-colors font-bold text-ieca-gold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ieca-gold"></span>
                  Apoie a IECA (Doações)
                </button>*/}
              </li>
              <li>
                <button onClick={() => onNavigate('galeria')} className="hover:text-ieca-coral transition-colors">
                  Galeria Fotográfica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-ieca-coral transition-colors text-ieca-coral font-semibold">
                  {t('adminCms')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Sínodos Principais */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-ieca-coral/30 pb-2 inline-block">
              {t('mainSynods')}
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Geral (Sede Nacional)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Central do Huambo (Dondi)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Provincial de Luanda</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Provincial de Benguela</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Provincial do Bié</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ieca-green font-bold">•</span>
                <span>Sínodo Provincial da Huíla</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contactos em Angola */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-white mb-4 border-b border-ieca-coral/30 pb-2 inline-block">
              {t('officialContacts')}
            </h3>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-ieca-coral flex-shrink-0 mt-0.5" />
              <span>Sede Nacional: Luanda, Município de Belas, Bairro Morro Bento II, Rua das Mangueirinhas — Angola</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-ieca-coral flex-shrink-0" />
              <span>+244 923 000 111 / +244 912 345 678</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-ieca-coral flex-shrink-0" />
              <span>geral@ieca.ao</span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('congregacoes')}
                className="w-full bg-ieca-green hover:bg-ieca-green-hover text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors"
              >
                {t('findNearest')}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            © 2026 Igreja Evangélica Congregacional em Angola (IECA). Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">{t('privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('accessibility')}</a>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1 text-ieca-coral hover:text-white font-medium transition-colors"
            >
              <span>{t('top')}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
