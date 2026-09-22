import React, { useEffect, useState } from 'react';
import { 
  MOCK_NEWS, 
  MOCK_EVENTS, 
  MOCK_MINISTRIES, 
  MOCK_CONGREGATIONS, 
  MOCK_LEADERSHIP, 
  MOCK_RESOURCES, 
  MOCK_HYMNS, 
  MOCK_SOCIAL_PROJECTS 
} from '../data/mockData';
import { NewsCard, EventCard, MinistryCard, CongregationCard, ResourceCard } from '../components/ui/Cards';
import { HeroCarousel } from '../components/ui/HeroCarousel';
import { 
  MapPin, 
  Calendar, 
  Newspaper, 
  BookOpen, 
  PhoneCall, 
  ArrowRight, 
  Play, 
  Volume2, 
  CheckCircle2, 
  Send,
  Quote,
  Camera
} from 'lucide-react';
import { Congregation } from '../types';
import { fetchCongregations, fetchEvents, fetchLeadership, fetchMinistries, fetchNews, fetchResources, fetchSocialProjects } from '../services/api';
import { fetchHinos } from '../services/hinarioApi';
import photoDondi from '../data/images/dondi.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenMapModal: (congregation?: Congregation) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenMapModal }) => {
  // Hinário Preview State
  const [selectedHymnNumber, setSelectedHymnNumber] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Video Modal State
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  const [news, setNews] = useState(MOCK_NEWS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [ministries, setMinistries] = useState(MOCK_MINISTRIES);
  const [congregations, setCongregations] = useState(MOCK_CONGREGATIONS);
  const [leadership, setLeadership] = useState(MOCK_LEADERSHIP);
  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [socialProjects, setSocialProjects] = useState(MOCK_SOCIAL_PROJECTS);
  const [hymns, setHymns] = useState(MOCK_HYMNS);

  const displayHymns = hymns.length > 0 ? hymns : MOCK_HYMNS;

  useEffect(() => {
    Promise.allSettled([
      fetchNews(),
      fetchEvents(),
      fetchMinistries(),
      fetchCongregations(),
      fetchLeadership(),
      fetchResources(),
      fetchSocialProjects(),
      fetchHinos()
    ]).then(results => {
      const [newsResult, eventsResult, ministriesResult, congregationsResult, leadershipResult, resourcesResult, projectsResult, hymnsResult] = results;
      if (newsResult.status === 'fulfilled' && newsResult.value.length) setNews(newsResult.value);
      if (eventsResult.status === 'fulfilled' && eventsResult.value.length) setEvents(eventsResult.value);
      if (ministriesResult.status === 'fulfilled' && ministriesResult.value.length) setMinistries(ministriesResult.value);
      if (congregationsResult.status === 'fulfilled' && congregationsResult.value.length) setCongregations(congregationsResult.value);
      if (leadershipResult.status === 'fulfilled' && leadershipResult.value.length) setLeadership(leadershipResult.value);
      if (resourcesResult.status === 'fulfilled' && resourcesResult.value.length) setResources(resourcesResult.value);
      if (projectsResult.status === 'fulfilled' && projectsResult.value.length) setSocialProjects(projectsResult.value);
      if (hymnsResult.status === 'fulfilled' && hymnsResult.value.length) setHymns(hymnsResult.value);
    });
  }, []);

  useEffect(() => {
    if (displayHymns.length > 0 && !displayHymns.some(h => h.number === selectedHymnNumber)) {
      setSelectedHymnNumber(displayHymns[0].number);
    }
  }, [displayHymns, selectedHymnNumber]);

  const activeHymn = displayHymns.find(h => h.number === selectedHymnNumber) || displayHymns[0];
  const safeActiveHymn = activeHymn || MOCK_HYMNS[0];
  const activeLyrics = Array.isArray(safeActiveHymn.lyrics) && safeActiveHymn.lyrics.length > 0 
    ? safeActiveHymn.lyrics 
    : [safeActiveHymn.htmlContent ? safeActiveHymn.htmlContent.replace(/<[^>]*>/g, '\n') : 'Letra do hino disponível no Hinário completo.'];

  const handlePlayHymnAudio = () => {
    if (!safeActiveHymn) return;

    setIsPlayingAudio(true);
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();
      const notes = safeActiveHymn.audioMelody || [293.66, 329.63, 369.99, 392.00, 440.00];
      
      notes.forEach((freq: number, idx: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx + 1) * 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.4);
        osc.stop(ctx.currentTime + (idx + 1) * 0.4);
      });

      setTimeout(() => setIsPlayingAudio(false), notes.length * 400 + 500);
    } catch {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  return (
    <div className="space-y-20 pb-16 bg-white selection:bg-ieca-coral selection:text-white">
      {/* ---------------------------------------------------- */}
      {/* SECTION 2: HERO CAROUSEL WITH SECRETÁRIO GERAL SLIDE */}
      {/* ---------------------------------------------------- */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: ACESSO RÁPIDO (Quick Action Grid)          */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-card shadow-2xl border border-gray-100 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <button 
            onClick={() => onNavigate('congregacoes')}
            className="flex flex-col items-center text-center p-4 rounded-card hover:bg-ieca-coral-light group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-full bg-ieca-coral/10 text-ieca-coral group-hover:bg-ieca-coral group-hover:text-white transition-colors duration-300 mb-2 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-ieca-black group-hover:text-ieca-coral">Congregações</span>
            <span className="text-xs text-ieca-gray mt-0.5">Encontre a sua igreja</span>
          </button>

          <button 
            onClick={() => onNavigate('eventos')}
            className="flex flex-col items-center text-center p-4 rounded-card hover:bg-ieca-coral-light group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-full bg-ieca-coral/10 text-ieca-coral group-hover:bg-ieca-coral group-hover:text-white transition-colors duration-300 mb-2 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-ieca-black group-hover:text-ieca-coral">Agenda e Eventos</span>
            <span className="text-xs text-ieca-gray mt-0.5">Calendário nacional</span>
          </button>

          <button 
            onClick={() => onNavigate('noticias')}
            className="flex flex-col items-center text-center p-4 rounded-card hover:bg-ieca-coral-light group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-full bg-ieca-coral/10 text-ieca-coral group-hover:bg-ieca-coral group-hover:text-white transition-colors duration-300 mb-2 shadow-sm">
              <Newspaper className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-ieca-black group-hover:text-ieca-coral">Notícias</span>
            <span className="text-xs text-ieca-gray mt-0.5">Comunicados oficiais</span>
          </button>

          <button 
            onClick={() => onNavigate('hinario')}
            className="flex flex-col items-center text-center p-4 rounded-card hover:bg-ieca-coral-light group transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-3.5 rounded-full bg-ieca-coral/10 text-ieca-coral group-hover:bg-ieca-coral group-hover:text-white transition-colors duration-300 mb-2 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-ieca-black group-hover:text-ieca-coral">Hinário Digital</span>
            <span className="text-xs text-ieca-gray mt-0.5">Hinos & Liturgias</span>
          </button>

          <button 
            onClick={() => onNavigate('sobre')}
            className="flex flex-col items-center text-center p-4 rounded-card hover:bg-ieca-coral-light group transition-all duration-300 hover:-translate-y-1 col-span-2 sm:col-span-1"
          >
            <div className="p-3.5 rounded-full bg-ieca-coral/10 text-ieca-coral group-hover:bg-ieca-coral group-hover:text-white transition-colors duration-300 mb-2 shadow-sm">
              <PhoneCall className="w-6 h-6" />
            </div>
            <span className="font-semibold text-sm text-ieca-black group-hover:text-ieca-coral">Contactos</span>
            <span className="text-xs text-ieca-gray mt-0.5">Sede & Sínodos</span>
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: CONHEÇA A IECA (Institutional Overview)   */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 border-l-2 border-ieca-coral pl-3 text-ieca-coral text-xs font-semibold uppercase tracking-[0.18em]">
              <span>Identidade Institucional</span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black leading-tight">
              Conheça a Igreja Evangélica Congregacional em Angola
            </h2>

            <p className="text-ieca-gray text-base leading-relaxed">
              A IECA é uma instituição religiosa de utilidade pública sem fins lucrativos fundada em Angola a <strong>11 de Novembro de 1880</strong> por missionários americanos e canadenses. Sediada em Luanda (Belas, Morro Bento II, Rua das Mangueirinhas), mantemos a fidelidade às Sagradas Escrituras e o nosso compromisso inabalável com a paz, justiça e progresso da nação.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-ieca-beige-light rounded-card border border-ieca-beige">
                <div className="text-ieca-coral font-bold text-xs mb-1 uppercase tracking-wider">Missão</div>
                <p className="text-xs text-ieca-black font-medium leading-relaxed">
                  Pregar o Evangelho, formar cidadãos e promover a dignidade humana.
                </p>
              </div>
              <div className="p-4 bg-ieca-green-light rounded-card border border-ieca-green/20">
                <div className="text-ieca-green font-bold text-xs mb-1 uppercase tracking-wider">Visão</div>
                <p className="text-xs text-ieca-black font-medium leading-relaxed">
                  Uma igreja viva, unida e influente na transformação de Angola.
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-card border border-gray-200">
                <div className="text-ieca-black font-bold text-xs mb-1 uppercase tracking-wider">Valores</div>
                <p className="text-xs text-ieca-black font-medium leading-relaxed">
                  Fé, Verdade, Amor ao Próximo e Integridade Doutrinária.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('sobre')}
                className="inline-flex items-center gap-2 text-ieca-coral font-bold text-sm hover:underline"
              >
                <span>Ler História Completa, Estatuto & 8 Princípios</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-card overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={photoDondi} 
                alt="Missão Histórica IECA" 
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-ieca-black text-white p-5 rounded-card shadow-2xl max-w-xs hidden sm:block border-l-4 border-ieca-coral">
              <span className="block text-xs uppercase font-bold text-ieca-coral">145+ Anos de História</span>
              <p className="text-xs text-gray-300 mt-1">
                Fundada a 11 de Novembro de 1880 • Presença em 18 Províncias de Angola.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: NOTÍCIAS EM DESTAQUE                      */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-beige-light/60 py-16 border-y border-ieca-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                Atualidade Institucional
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
                Notícias em Destaque
              </h2>
            </div>
            <button
              onClick={() => onNavigate('noticias')}
              className="inline-flex items-center gap-2 text-ieca-coral font-bold text-sm hover:text-ieca-coral-hover"
            >
              <span>Ver Todas as Notícias</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map(newsItem => (
              <NewsCard key={newsItem.id} item={newsItem} onReadMore={() => onNavigate('noticias')} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: PRÓXIMOS EVENTOS                          */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
              Agenda Eclesiástica
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
              Próximos Eventos & Encontros
            </h2>
          </div>
          <button
            onClick={() => onNavigate('eventos')}
            className="inline-flex items-center gap-2 text-ieca-coral font-bold text-sm hover:text-ieca-coral-hover"
          >
            <span>Ver Calendário Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          {events.map(evt => (
            <EventCard key={evt.id} item={evt} onSelect={() => onNavigate('eventos')} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 7: MENSAGEM DA LIDERANÇA                     */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-ieca-black p-8 sm:p-12 rounded-card border border-gray-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
            <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-ieca-coral shadow-xl mb-4">
                <img 
                  src={leadership[0].photo}
                  alt={leadership[0].name}
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">
                {leadership[0].name}
              </h3>
              <p className="text-ieca-coral text-xs font-semibold mt-0.5">
                {leadership[0].title}
              </p>
              <span className="text-xs text-gray-400 mt-1">
                Liderança Executiva Nacional
              </span>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <Quote className="w-10 h-10 text-ieca-coral opacity-40" />
              <p className="font-serif text-lg sm:text-xl text-gray-200 italic leading-relaxed">
                {leadership[0].quote}
              </p>
              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                <span>Mensagem Pastoral aos Membros e Visitantes</span>
                <button 
                  onClick={() => onNavigate('sobre')} 
                  className="text-ieca-coral font-bold hover:underline"
                >
                  Conhecer Corpo Pastoral & Organograma →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 8: NOSSA ESTRUTURA (8-Tier Hierarchy)        */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
            Governo Eclesiástico
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
            Estrutura Organizacional em 8 Níveis
          </h2>
          <p className="text-sm text-ieca-gray">
            Modelo democrático e congregacional estipulado pelo Estatuto da IECA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-card border-2 border-ieca-coral shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-coral text-white font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Assembleia Geral</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Supremo órgão deliberativo da IECA, reúne-se bienalmente.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-coral text-white font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Comissão Executiva</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Monitora a execução das deliberações da Assembleia.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-green text-white font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Sínodo Geral</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Órgão superior que congrega os Sínodos Provinciais.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-green text-white font-bold flex items-center justify-center text-xs">
              4
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Sínodo Provincial</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Coordenação das igrejas na província administrativa.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-black text-white font-bold flex items-center justify-center text-xs">
              5
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Sínodo Local</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Reúne os pastorados de uma região geográfica.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-black text-white font-bold flex items-center justify-center text-xs">
              6
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Pastorado</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Comunidade autónoma com maturidade eclesial.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-ieca-beige text-ieca-black border font-bold flex items-center justify-center text-xs">
              7
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Congregação</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Comunidade organizada de crentes em comunhão.
            </p>
          </div>

          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm text-center relative space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-gray-200 text-ieca-black font-bold flex items-center justify-center text-xs">
              8
            </div>
            <h3 className="font-serif font-bold text-base text-ieca-black">Ponto de Pregação</h3>
            <p className="text-xs text-ieca-gray leading-relaxed">
              Comunidade inicial em fase de formação espiritual.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 9: ENCONTRE UMA CONGREGAÇÃO                  */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-pattern py-16 border-y border-ieca-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
              Localizador de Igrejas
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black">
              Encontre uma Congregação IECA Perto de Si
            </h2>
            <p className="text-ieca-gray text-base leading-relaxed">
              Comunidades congregacionais ativas em todas as províncias de Angola. Consulte endereços, horários de cultos e contactos das lideranças sinodais.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-ieca-black font-medium">
                <CheckCircle2 className="w-5 h-5 text-ieca-green" />
                <span>Endereços e mapas de localização exatos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ieca-black font-medium">
                <CheckCircle2 className="w-5 h-5 text-ieca-green" />
                <span>Horários de cultos dominicais e reuniões semanais</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ieca-black font-medium">
                <CheckCircle2 className="w-5 h-5 text-ieca-green" />
                <span>Contactos dos pastores e secretários provinciais</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('congregacoes')}
                className="bg-ieca-coral hover:bg-ieca-coral-hover text-white px-6 py-3.5 rounded-btn font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Pesquisar no Diretório Completo</span>
              </button>

              <button
                onClick={() => onOpenMapModal(congregations[0])}
                className="bg-white border border-gray-300 hover:border-ieca-coral text-ieca-black px-5 py-3.5 rounded-btn font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <span>Preview de Mapa Interativo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-card shadow-2xl p-4 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-serif font-bold text-lg text-ieca-black">Sede Nacional</span>
                <span className="text-xs bg-ieca-green-light text-ieca-green font-bold px-2 py-0.5 rounded">Belas, Luanda</span>
              </div>
              <CongregationCard item={congregations[0]} onSelectMap={(cong) => onOpenMapModal(cong)} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 10: MINISTÉRIOS & SOCIEDADES OFICIAIS        */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
              Sociedades Estatutárias
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
              Sociedades e Organizações da IECA
            </h2>
          </div>
          <button
            onClick={() => onNavigate('ministerios')}
            className="inline-flex items-center gap-2 text-ieca-coral font-bold text-sm hover:text-ieca-coral-hover"
          >
            <span>Ver Todas as Sociedades Locais</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministries.map(min => (
            <MinistryCard key={min.id} item={min} onSelect={() => onNavigate('ministerios')} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 11: AÇÃO SOCIAL                              */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-white/10 px-3 py-1 rounded-full">
              Impacto Comunitário
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mt-2">
              Ação Social & Desenvolvimento Humano
            </h2>
            <p className="text-sm text-gray-300">
              A fé manifesta-se através de obras concretas na educação, saúde e apoio comunitário em Angola.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialProjects.map(proj => (
              <div key={proj.id} className="bg-gray-900 rounded-card overflow-hidden border border-gray-800 flex flex-col justify-between hover:border-ieca-coral transition-colors duration-300 shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-ieca-green text-white text-xs font-bold px-2.5 py-1 rounded">
                    {proj.category}
                  </span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white mb-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between text-xs text-ieca-beige">
                    <span className="font-semibold">{proj.stats}</span>
                    <span className="text-gray-400">{proj.beneficiaries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 12: RECURSOS EM DESTAQUE                     */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
              Documentação Oficial
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
              Recursos & Centro de Documentação
            </h2>
          </div>
          <button
            onClick={() => onNavigate('sobre')}
            className="inline-flex items-center gap-2 text-ieca-coral font-bold text-sm hover:text-ieca-coral-hover"
          >
            <span>Acessar Estatuto & Regulamentos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map(res => (
            <ResourceCard key={res.id} item={res} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 13: HINÁRIO DIGITAL PREVIEW                  */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-beige-light/60 py-16 border-y border-ieca-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                Louvor Congregacional
              </span>
              <h2 className="font-serif font-bold text-3xl text-ieca-black">
                Hinário Digital da IECA
              </h2>
              <p className="text-ieca-gray text-base leading-relaxed">
                Acesse a coleção oficial de hinos, litanias, orações, invocatórias e salmos da igreja com suporte a múltiplos idiomas e reprodução de melodias.
              </p>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-ieca-black">Selecione um Hino para Preview:</label>
                <div className="flex flex-wrap gap-2">
                  {displayHymns.slice(0, 6).map(h => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHymnNumber(h.number)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                        selectedHymnNumber === h.number 
                          ? 'bg-ieca-coral text-white shadow' 
                          : 'bg-white text-ieca-black border border-gray-300 hover:border-ieca-coral'
                      }`}
                    >
                      Hino Nº {h.number}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('hinario')}
                  className="bg-ieca-coral hover:bg-ieca-coral-hover text-white px-6 py-3.5 rounded-btn font-bold text-sm shadow-md transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Abrir Hinário & Liturgia Digital</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white rounded-card shadow-2xl p-6 sm:p-8 border border-gray-100 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                      {safeActiveHymn.category || 'Louvor'}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-ieca-black mt-2">
                      Nº {safeActiveHymn.number} — {safeActiveHymn.title}
                    </h3>
                    {safeActiveHymn.composer && (
                      <p className="text-xs text-ieca-gray mt-1">Autor: {safeActiveHymn.composer} • Tom: {safeActiveHymn.key || 'Dó Maior'}</p>
                    )}
                  </div>

                  <button
                    onClick={handlePlayHymnAudio}
                    disabled={isPlayingAudio}
                    className={`p-3 rounded-full ${
                      isPlayingAudio 
                        ? 'bg-ieca-green text-white animate-pulse' 
                        : 'bg-ieca-coral text-white hover:bg-ieca-coral-hover'
                    } shadow transition-all`}
                    title="Ouvir Melodia"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 max-h-72 overflow-y-auto pr-2 font-serif text-ieca-black text-sm sm:text-base leading-relaxed bg-ieca-beige-light/40 p-4 rounded-md border border-gray-100">
                  {activeLyrics.map((stanza: string, idx: number) => (
                    <div key={idx} className="whitespace-pre-line pl-4 border-l-2 border-ieca-coral/40">
                      <span className="text-xs font-sans text-ieca-coral font-bold block mb-1">Estrofe {idx + 1}</span>
                      {stanza}
                    </div>
                  ))}
                </div>

                <div className="text-xs text-center text-gray-500 font-sans">
                  💡 {isPlayingAudio ? 'A tocar melodia do hino...' : 'Clique no ícone de som para ouvir a melodia sintetizada.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 14: MULTIMÉDIA                               */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
            Registos Visuais
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-ieca-black mt-2">
            Galeria Multimédia da IECA
          </h2>
          <p className="text-sm text-ieca-gray">
            Assista a vídeos institucionais, cultos transmitidos e momentos marcantes da nossa comunidade.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
            className="relative rounded-card overflow-hidden shadow-md cursor-pointer group bg-black h-56"
          >
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" 
              alt="Vídeo Institucional"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-ieca-coral text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
              Documentário: História do Sínodo do Huambo
            </div>
          </div>

          <div 
            onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
            className="relative rounded-card overflow-hidden shadow-md cursor-pointer group bg-black h-56"
          >
            <img 
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800" 
              alt="Culto de Música"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-ieca-coral text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
              Festival Nacional de Corais Congregacionais
            </div>
          </div>

          <div 
            onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
            className="relative rounded-card overflow-hidden shadow-md cursor-pointer group bg-black h-56 sm:col-span-2 lg:col-span-1"
          >
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800" 
              alt="Ação Social"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-ieca-coral text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
              Inauguração do Centro de Formação no Dondi
            </div>
          </div>
        </div>

        {/* CTA to full gallery */}
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('galeria')}
            className="inline-flex items-center gap-2 bg-ieca-black hover:bg-gray-800 text-white px-6 py-3 rounded-btn font-bold text-sm shadow transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>Ver Galeria Fotográfica Completa</span>
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 15: NEWSLETTER                               */}
      {/* ---------------------------------------------------- */}
      <section className="bg-ieca-coral text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto shadow-inner">
            <Send className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
            Mantenha-se Informado sobre a IECA
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
            Subscreva a nossa newsletter oficial para receber notícias nacionais, calendários de eventos e edições do Hinário Digital diretamente no seu email.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="email" 
              required
              placeholder="Digite o seu endereço de email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-btn text-ieca-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ieca-black text-sm shadow-inner"
            />
            <button
              type="submit"
              className="bg-ieca-black hover:bg-black text-white px-6 py-3.5 rounded-btn font-bold text-sm shadow transition-colors"
            >
              Subscrever
            </button>
          </form>

          {newsletterSubscribed && (
            <div className="bg-white/20 backdrop-blur text-white text-xs py-2 px-4 rounded-md inline-block font-semibold animate-bounce">
              ✓ Email registado com sucesso! Obrigado pelo seu interesse.
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Trigger */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-black w-full max-w-3xl rounded-card overflow-hidden relative border border-gray-700">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white text-white hover:text-black p-2 rounded-full z-10 font-bold"
            >
              ✕
            </button>
            <div className="p-4 text-white font-serif font-bold border-b border-gray-800">
              Vídeo Institucional IECA
            </div>
            <div className="p-8 text-center text-gray-300 space-y-4">
              <div className="w-16 h-16 rounded-full bg-ieca-coral mx-auto flex items-center justify-center text-white">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <p className="text-sm">
                Demonstração do Vídeo Institucional da Igreja Evangélica Congregacional em Angola.
              </p>
              <button 
                onClick={() => setActiveVideoUrl(null)}
                className="bg-ieca-coral text-white px-6 py-2 rounded text-xs font-bold"
              >
                Fechar Leitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
