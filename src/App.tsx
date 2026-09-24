import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CongregationsPage } from './pages/CongregationsPage';
import { HymnalPage } from './pages/HymnalPage';
import { AboutPage } from './pages/AboutPage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { AdminCMSPage } from './pages/AdminCMSPage';
import { LoginPage } from './pages/LoginPage';
import { GalleryPage } from './pages/GalleryPage';
import { DonationsPage } from './pages/DonationsPage';
import { ContentPage } from './pages/ContentPage';
import { StreamingPage } from './pages/StreamingPage';
import { SynodsPage } from './pages/SynodsPage';
import { MapModal } from './components/ui/MapModal';
import { AuthSession, Congregation } from './types';
import { Search, X, MapPin, BookOpen, Newspaper } from 'lucide-react';
import { MOCK_CONGREGATIONS, MOCK_HYMNS, MOCK_NEWS } from './data/mockData';
import { fetchCongregations, fetchNews } from './services/api';
import { fetchHinos } from './services/hinarioApi';
import { SitePreferencesProvider, useSitePreferences } from './context/SitePreferencesContext';

function AppContent() {
  const { t } = useSitePreferences();
  const VALID_PAGES = ['home', 'sobre', 'noticias', 'eventos', 'ministerios', 'hinario', 'congregacoes', 'galeria', 'doacoes', 'conteudos', 'transmissoes', 'synodos', 'admin'];

  const [currentPage, setCurrentPage] = useState<string>(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    return VALID_PAGES.includes(path) ? path : 'home';
  });
  const [activeCongregation, setActiveCongregation] = useState<Congregation | null>(null);
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => {
    const storedSession = window.localStorage.getItem('ieca-auth-session');
    if (!storedSession) return null;
    try {
      return JSON.parse(storedSession) as AuthSession;
    } catch {
      window.localStorage.removeItem('ieca-auth-session');
      return null;
    }
  });
  
  // Global Search Drawer
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');
  const [searchChurches, setSearchChurches] = useState(MOCK_CONGREGATIONS);
  const [searchHymns, setSearchHymns] = useState(MOCK_HYMNS);
  const [searchNews, setSearchNews] = useState(MOCK_NEWS);

  useEffect(() => {
    Promise.allSettled([fetchCongregations(), fetchHinos(), fetchNews()]).then(([churches, hymns, news]) => {
      if (churches.status === 'fulfilled' && churches.value.length) setSearchChurches(churches.value);
      if (hymns.status === 'fulfilled' && hymns.value.length) setSearchHymns(hymns.value);
      if (news.status === 'fulfilled' && news.value.length) setSearchNews(news.value);
    });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('main section, main article, main form');

    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('is-scroll-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('is-scroll-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach(element => {
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  // Scroll to top on navigation
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    const nextPath = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      setCurrentPage(VALID_PAGES.includes(path) ? path : 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLogin = (session: AuthSession) => {
    setAuthSession(session);
    handleNavigate('admin');
  };

  const handleLogout = () => {
    window.localStorage.removeItem('ieca-auth-session');
    setAuthSession(null);
    handleNavigate('home');
  };

  const handleOpenMapModal = (congregation?: Congregation) => {
    if (congregation) {
      setActiveCongregation(congregation);
    } else {
      setActiveCongregation(searchChurches[0] || MOCK_CONGREGATIONS[0]);
    }
  };

  // Filtered search results across app
  const matchedChurches = searchChurches.filter(c => 
    c.name.toLowerCase().includes(globalQuery.toLowerCase()) || 
    c.province.toLowerCase().includes(globalQuery.toLowerCase())
  );
  const matchedHymns = searchHymns.filter(h => 
    h.title.toLowerCase().includes(globalQuery.toLowerCase()) || 
    h.number.toString() === globalQuery
  );
  const matchedNews = searchNews.filter(n => 
    n.title.toLowerCase().includes(globalQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-ieca-black font-sans antialiased">
      {/* Header Navigation */}
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        onSearchOpen={() => setSearchDrawerOpen(true)}
      />

      {/* Main Page View Renderer */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenMapModal={handleOpenMapModal} />
        )}
        {currentPage === 'congregacoes' && (
          <CongregationsPage onOpenMapModal={handleOpenMapModal} />
        )}
        {currentPage === 'hinario' && (
          <HymnalPage />
        )}
        {currentPage === 'sobre' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'noticias' && (
          <NewsEventsPage />
        )}
        {currentPage === 'eventos' && (
          <NewsEventsPage />
        )}
        {currentPage === 'ministerios' && (
          <MinistriesPage />
        )}
        {currentPage === 'galeria' && (
          <GalleryPage />
        )}
        {currentPage === 'doacoes' && (
          <DonationsPage />
        )}
        {currentPage === 'conteudos' && (
          <ContentPage />
        )}
        {currentPage === 'transmissoes' && (
          <StreamingPage />
        )}
        {currentPage === 'synodos' && (
          <SynodsPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && !authSession && (
          <LoginPage onLogin={handleLogin} onBack={() => handleNavigate('home')} />
        )}
        {currentPage === 'admin' && authSession && (
          <AdminCMSPage session={authSession} onLogout={handleLogout} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Church Locator Map Modal */}
      <MapModal 
        congregation={activeCongregation} 
        onClose={() => setActiveCongregation(null)} 
      />

      {/* Global Search Drawer */}
      {searchDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-white w-full max-w-2xl rounded-card shadow-2xl overflow-hidden border border-ieca-gray-border p-6 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 text-ieca-coral font-bold font-serif text-lg">
                <Search className="w-5 h-5" />
                <span>{t('searchTitle')}</span>
              </div>
              <button 
                onClick={() => setSearchDrawerOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <input 
                type="text" 
                autoFocus
                placeholder={t('searchPlaceholder')}
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                className="w-full p-3.5 pl-4 pr-10 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
              />
            </div>

            {globalQuery ? (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 text-xs">
                {/* Church Results */}
                {matchedChurches.length > 0 && (
                  <div>
                    <span className="font-bold text-ieca-coral uppercase tracking-wider block mb-2">Congregações ({matchedChurches.length})</span>
                    <div className="space-y-1">
                      {matchedChurches.map(c => (
                        <button
                          key={c.id}
                          onClick={() => { handleNavigate('congregacoes'); setSearchDrawerOpen(false); }}
                          className="w-full text-left p-2.5 hover:bg-ieca-coral-light rounded flex items-center justify-between text-ieca-black"
                        >
                          <span className="font-semibold">{c.name} ({c.province})</span>
                          <MapPin className="w-3.5 h-3.5 text-ieca-coral" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hymn Results */}
                {matchedHymns.length > 0 && (
                  <div>
                    <span className="font-bold text-ieca-coral uppercase tracking-wider block mb-2">Hinário Digital ({matchedHymns.length})</span>
                    <div className="space-y-1">
                      {matchedHymns.map(h => (
                        <button
                          key={h.id}
                          onClick={() => { handleNavigate('hinario'); setSearchDrawerOpen(false); }}
                          className="w-full text-left p-2.5 hover:bg-ieca-coral-light rounded flex items-center justify-between text-ieca-black"
                        >
                          <span className="font-semibold">Hino Nº {h.number} - {h.title}</span>
                          <BookOpen className="w-3.5 h-3.5 text-ieca-coral" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* News Results */}
                {matchedNews.length > 0 && (
                  <div>
                    <span className="font-bold text-ieca-coral uppercase tracking-wider block mb-2">Notícias ({matchedNews.length})</span>
                    <div className="space-y-1">
                      {matchedNews.map(n => (
                        <button
                          key={n.id}
                          onClick={() => { handleNavigate('noticias'); setSearchDrawerOpen(false); }}
                          className="w-full text-left p-2.5 hover:bg-ieca-coral-light rounded flex items-center justify-between text-ieca-black"
                        >
                          <span className="font-semibold">{n.title}</span>
                          <Newspaper className="w-3.5 h-3.5 text-ieca-coral" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-center text-gray-400 py-6">
                {t('searchHint')}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <SitePreferencesProvider>
      <AppContent />
    </SitePreferencesProvider>
  );
}
