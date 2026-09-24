import React, { useState } from 'react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { MOCK_STREAMS } from '../data/mockData';
import { 
  Play, 
  Radio, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Youtube, 
  Facebook, 
  Video
} from 'lucide-react';
import photoJuventude from '../data/images/Juventude.jpg';

export const StreamingPage: React.FC = () => {
  const [activeStream, setActiveStream] = useState(MOCK_STREAMS[3]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-16 space-y-10">
      {/* Hero Banner */}
      <HeroBanner
        eyebrow="Cultos & Eventos em Direto"
        title="Transmissões Ao Vivo da IECA"
        imageSrc={photoJuventude}
        description="Acompanhe os cultos dominicais, conferências e estudos bíblicos em direto a partir de qualquer ponto do mundo através do portal e redes sociais oficiais."
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-card text-white text-xs space-y-1 max-w-sm">
          <div className="flex items-center gap-2 font-bold text-ieca-coral text-sm">
            <Radio className="w-4 h-4 text-ieca-coral animate-pulse" />
            <span>Canais Oficiais IECA Digital</span>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Transmissões integradas via YouTube Live e Facebook Live da Sede Nacional no Morro Bento e Sínodos Provinciais.
          </p>
        </div>
      </HeroBanner>

      {/* Main Live Player Section */}
      <div className="bg-ieca-black rounded-card border border-gray-800 overflow-hidden shadow-2xl space-y-0">
        {/* Video Frame container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {activeStream.embedUrl ? (
            <iframe
              src={activeStream.embedUrl}
              title={activeStream.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-black via-gray-900 to-gray-800">
              <img 
                src={activeStream.thumbnailUrl} 
                alt={activeStream.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-sm"
              />
              <div className="relative z-10 space-y-4 max-w-lg">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-ieca-coral text-white font-extrabold text-xs uppercase rounded-full tracking-wider animate-pulse">
                  <Radio className="w-3.5 h-3.5" /> Transmissão {activeStream.status}
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeStream.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  {activeStream.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={activeStream.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-ieca-coral hover:bg-red-700 text-white font-bold text-xs rounded-btn transition-colors inline-flex items-center gap-2 shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Assistir no {activeStream.platformName}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stream Info Bar */}
        <div className="p-6 bg-gray-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-800">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold text-ieca-gold tracking-widest">
              Preletor / Responsável: {activeStream.speaker}
            </span>
            <h2 className="text-xl font-bold text-white">{activeStream.title}</h2>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-ieca-coral" />
                {activeStream.eventDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-ieca-gold" />
                Horário: {activeStream.time}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=61594335956813"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-btn transition-colors inline-flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook Oficial IECA</span>
            </a>

            <a
              href="https://www.youtube.com/@jeremiasevaristo8215"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-btn transition-colors inline-flex items-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              <span>Canal YouTube IECA</span>
            </a>
          </div>
        </div>
      </div>

      {/* Program Schedule & Past Streams Grid */}
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-3">
          <h3 className="text-xl font-extrabold text-ieca-black flex items-center gap-2">
            <Video className="w-5 h-5 text-ieca-coral" />
            Programação de Transmissões & Gravações
          </h3>
          <p className="text-xs text-ieca-gray">
            Selecione uma transmissão agendada ou gravação recente para carregar no leitor acima.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_STREAMS.map((stream) => {
            const isSelected = activeStream.id === stream.id;
            return (
              <div
                key={stream.id}
                onClick={() => setActiveStream(stream)}
                className={`bg-white p-5 rounded-card border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                  isSelected
                    ? 'border-ieca-coral ring-2 ring-ieca-coral/20 shadow-md'
                    : 'border-ieca-gray-border hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-btn overflow-hidden bg-gray-100">
                    <img 
                      src={stream.thumbnailUrl} 
                      alt={stream.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-ieca-coral/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className={`absolute top-2 left-2 px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full text-white ${
                      stream.status === 'Ao Vivo' ? 'bg-ieca-coral animate-pulse' :
                      stream.status === 'Agendada' ? 'bg-amber-600' : 'bg-gray-800'
                    }`}>
                      {stream.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-ieca-black line-clamp-2">{stream.title}</h4>
                    <p className="text-xs text-ieca-gray font-medium">{stream.speaker}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-ieca-gold" />
                    {stream.eventDate}
                  </span>
                  <span className="text-ieca-coral font-bold text-[11px]">
                    {isSelected ? 'A Reproduzir' : 'Carregar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
