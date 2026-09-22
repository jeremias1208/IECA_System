import React, { useEffect, useState } from 'react';
import { MOCK_NEWS, MOCK_EVENTS } from '../data/mockData';
import { NewsCard, EventCard } from '../components/ui/Cards';
import { NewsItem, EventItem } from '../types';
import { Newspaper, Calendar, Search, Check } from 'lucide-react';
import { fetchEvents, fetchNews } from '../services/api';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';
import imgSecretario from '../data/images/Secreratios.jpg';

export const NewsEventsPage: React.FC = () => {
  const { t } = useSitePreferences();
  const [news, setNews] = useState(MOCK_NEWS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'noticias' | 'eventos'>('noticias');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reader Modal State
  const [readingNews, setReadingNews] = useState<NewsItem | null>(null);
  const [viewingEvent, setViewingEvent] = useState<EventItem | null>(null);
  const [rsvpRegistered, setRsvpRegistered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchNews(), fetchEvents()])
      .then(([apiNews, apiEvents]) => {
        if (!isMounted) return;
        setNews(apiNews);
        setEvents(apiEvents);
      })
      .catch(() => undefined)
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const newsCategories = ['Todas', 'Institucional', 'Sínodos', 'Social', 'Juventude', 'Missões'];
  const eventCategories = ['Todas', 'Culto Especial', 'Conferência', 'Assembleia', 'Acampamento', 'Seminário'];

  const filteredNews = news.filter(news => {
    const matchesCategory = selectedCategory === 'Todas' || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || news.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredEvents = events.filter(evt => {
    const matchesCategory = selectedCategory === 'Todas' || evt.category === selectedCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-12 space-y-10">
      <HeroBanner
        eyebrow={t('newsEyebrow')}
        title={t('newsTitle')}
        imageSrc={imgSecretario}
        description={t('newsDescription')}
      />

      {/* Main Filter & Navigation Tabs */}
      <div className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-4">
          {/* Main Switcher */}
          <div className="flex items-center gap-2 bg-ieca-beige-light p-1.5 rounded-card w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('noticias'); setSelectedCategory('Todas'); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-bold text-sm transition-colors ${
                activeTab === 'noticias' ? 'bg-ieca-coral text-white shadow' : 'text-ieca-black hover:bg-white/60'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>{t('institutionalNews')}</span>
            </button>

            <button
              onClick={() => { setActiveTab('eventos'); setSelectedCategory('Todas'); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-bold text-sm transition-colors ${
                activeTab === 'eventos' ? 'bg-ieca-coral text-white shadow' : 'text-ieca-black hover:bg-white/60'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{t('eventsAgenda')}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder={`${t('search')} ${activeTab === 'noticias' ? t('news').toLowerCase() : t('events').toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-btn border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase text-ieca-gray tracking-wider mr-2">Categoria:</span>
          {(activeTab === 'noticias' ? newsCategories : eventCategories).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === cat 
                  ? 'bg-ieca-black text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Display */}
      {isLoading && <p className="text-sm text-ieca-gray">A carregar informação atualizada...</p>}
      {activeTab === 'noticias' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map(news => (
            <NewsCard key={news.id} item={news} onReadMore={() => setReadingNews(news)} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map(evt => (
            <EventCard key={evt.id} item={evt} onSelect={() => setViewingEvent(evt)} />
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      {readingNews && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-card overflow-hidden shadow-2xl space-y-6 my-8">
            <div className="relative h-64 sm:h-80 bg-gray-900">
              <img src={readingNews.image} alt={readingNews.title} className="w-full h-full object-cover opacity-90" />
              <button 
                onClick={() => setReadingNews(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full text-xs font-bold"
              >
                ✕ Fechar
              </button>
              <span className="absolute bottom-4 left-4 bg-ieca-coral text-white text-xs font-bold px-3 py-1 rounded">
                {readingNews.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-ieca-gray border-b pb-3">
                <span>Data: {readingNews.date}</span>
                <span>•</span>
                <span>Por: {readingNews.author}</span>
                <span>•</span>
                <span>Tempo de Leitura: {readingNews.readTime}</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ieca-black leading-tight">
                {readingNews.title}
              </h2>

              <div className="prose text-ieca-black text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p className="font-semibold text-gray-700 leading-relaxed border-l-4 border-ieca-coral pl-4 bg-ieca-beige-light/50 py-2">
                  {readingNews.summary}
                </p>
                <p>
                  {readingNews.content}
                </p>
                <p>
                  A liderança congregacional reafirma o seu compromisso com a transparência e a difusão da mensagem do Evangelho nas nossas províncias. Mais detalhes sobre este comunicado podem ser obtidos junto da Secretaria Geral em Luanda.
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => setReadingNews(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-ieca-black font-semibold text-xs py-2.5 px-4 rounded"
                >
                  Voltar às Notícias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {viewingEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-card overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button 
              onClick={() => { setViewingEvent(null); setRsvpRegistered(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold"
            >
              ✕
            </button>

            <div className="space-y-2">
              <span className="bg-ieca-green-light text-ieca-green text-xs font-bold px-2.5 py-1 rounded">
                {viewingEvent.category}
              </span>
              <h3 className="font-serif font-bold text-2xl text-ieca-black">
                {viewingEvent.title}
              </h3>
            </div>

            <div className="bg-ieca-beige-light p-4 rounded-md space-y-2 text-xs text-ieca-black">
              <div><strong>Data:</strong> {viewingEvent.date} às {viewingEvent.time}</div>
              <div><strong>Local:</strong> {viewingEvent.location}</div>
              <div><strong>Sínodo Organizador:</strong> {viewingEvent.synod}</div>
            </div>

            <p className="text-sm text-ieca-gray leading-relaxed">
              {viewingEvent.description}
            </p>

            <div className="pt-2">
              {!rsvpRegistered ? (
                <button
                  onClick={() => setRsvpRegistered(true)}
                  className="w-full bg-ieca-coral hover:bg-ieca-coral-hover text-white py-3 rounded-btn font-bold text-sm shadow transition-colors"
                >
                  Confirmar Presença no Evento (RSVP)
                </button>
              ) : (
                <div className="bg-ieca-green-light text-ieca-green p-3 rounded text-center font-bold text-xs flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Presença confirmada! Notificação enviada.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
