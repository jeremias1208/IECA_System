import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Building2, BookOpen } from 'lucide-react';
import { MOCK_LEADERSHIP } from '../../data/mockData';
import { fetchLeadership } from '../../services/api';
import { LeadershipMember } from '../../types';
import photoDondi from '../../data/images/dondi.png';
import photoMapa from '../../data/images/mapa.png';

interface HeroCarouselProps {
  onNavigate: (page: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [leadership, setLeadership] = useState<LeadershipMember[]>(MOCK_LEADERSHIP);

  useEffect(() => {
    fetchLeadership().then(data => {
      if (data.length > 0) setLeadership(data);
    }).catch(() => undefined);
  }, []);

  const slides = [
    {
      id: 'slide-secretary',
      badge: 'Mensagem do Secretário Geral',
      badgeIcon: null,
      title: 'Liderança Pastoral & Compromisso com a Nação',
      subtitle: leadership[0].quote || '"A nossa missão é permanecer como farol imutável de fé, esperança e serviço dedicado ao povo angolano, unindo a tradição histórica à modernidade."',
      author: leadership[0].name,
      role: `${leadership[0].title} • Sede Nacional (Belas, Luanda)`,
      image: leadership[0].photo.replace('w=400', 'w=1600'),
      ctaPrimary: { label: 'Conheça a Liderança', target: 'sobre' },
      ctaSecondary: { label: 'Encontrar Congregação', target: 'congregacoes' }
    },
    {
      id: 'slide-history',
      badge: '145+ Anos de História & Tradição',
      badgeIcon: <Building2 className="w-3.5 h-3.5 text-ieca-green" />,
      title: 'Fundada a 11 de Novembro de 1880',
      subtitle: 'Uma trajetória secular enraizada na fé em Jesus Cristo, na educação, na saúde comunitária e na preservação da dignidade humana em Angola.',
      author: 'Igreja Evangélica Congregacional em Angola',
      role: 'Sede Geral: Morro Bento II, Rua das Mangueirinhas, Belas',
      image: photoDondi,
      ctaPrimary: { label: 'Nossa História & Doutrina', target: 'sobre' },
      ctaSecondary: { label: 'Hinário Digital', target: 'hinario' }
    },
    {
      id: 'slide-community',
      badge: 'Presença Nacional em Angola',
      badgeIcon: <BookOpen className="w-3.5 h-3.5 text-ieca-coral" />,
      title: 'Uma Igreja Viva em 18 Províncias',
      subtitle: 'Descubra a congregação mais próxima de si, consulte horários dos cultos dominicais e participe nas Sociedades Oficiais (Jovens, Mulheres, Homens e Escuteiros).',
      author: 'Comunhão Congregacional',
      role: 'Luanda, Huambo, Benguela, Bié, Huíla, Cabinda e mais',
      image: photoMapa,
      ctaPrimary: { label: 'Encontrar Congregação', target: 'congregacoes' },
      ctaSecondary: { label: 'Ver Sociedades & Ministérios', target: 'ministerios' }
    }
  ];

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative min-h-[580px] sm:min-h-[640px] bg-gray-950 text-white overflow-hidden group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Container */}
      {slides.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${
              isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Vignette Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transform scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ieca-dark via-ieca-dark/75 to-ieca-dark/10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-ieca-dark/80 via-transparent to-transparent"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6 animate-fadeIn">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 border-l-2 border-ieca-coral pl-3 text-white text-xs font-semibold uppercase tracking-[0.18em]">
                  {slide.badgeIcon}
                  <span>{slide.badge}</span>
                </div>

                {/* Title */}
                <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Subtitle / Quote */}
                <p className="text-gray-200 text-base sm:text-xl font-sans leading-relaxed max-w-2xl font-normal drop-shadow">
                  {slide.subtitle}
                </p>

                {/* Author Credit */}
                <div className="pt-1 flex items-center gap-3 border-l-2 border-ieca-coral pl-3">
                  <div>
                    <span className="block text-sm font-bold text-white font-serif">{slide.author}</span>
                    <span className="block text-xs text-ieca-beige">{slide.role}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => onNavigate(slide.ctaPrimary.target)}
                    className="flex items-center gap-2.5 bg-ieca-coral hover:bg-ieca-coral-hover text-white px-7 py-3.5 rounded-btn font-bold text-sm sm:text-base shadow-xl hover:shadow-ieca-coral/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>{slide.ctaPrimary.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate(slide.ctaSecondary.target)}
                    className="flex items-center gap-2 border border-white/60 hover:bg-white hover:text-ieca-dark text-white px-6 py-3.5 rounded-btn font-semibold text-sm sm:text-base transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-ieca-coral" />
                    <span>{slide.ctaSecondary.label}</span>
                  </button>
                </div>
              </div>

              {/* Special Secretary Badge Card on Slide 1 */}
              {idx === 0 && (
                <div className="lg:col-span-4 hidden lg:block">
                  <div className="bg-ieca-dark/95 border-t-4 border-ieca-coral p-6 rounded-card text-white space-y-4 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center gap-4">
                      <img
                        src={leadership[0].photo}
                        alt={leadership[0].name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-ieca-coral shadow-md"
                      />
                      <div>
                        <span className="text-[10px] font-bold uppercase text-ieca-coral tracking-widest block">Liderança Executiva</span>
                        <h4 className="font-serif font-bold text-base text-white">{leadership[0].name}</h4>
                        <span className="text-xs text-gray-300 block">{leadership[0].title}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed italic border-t border-gray-800 pt-3">
                      "Edificando o povo angolano na palavra de Deus, amor ao próximo e paz social."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-ieca-coral text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
        aria-label="Slide Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-ieca-coral text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
        aria-label="Próximo Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 bg-ieca-coral' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir para Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
