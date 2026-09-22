import React from 'react';
import { NewsItem, EventItem, Ministry, Congregation, ResourceDoc } from '../../types';
import { Calendar, MapPin, Clock, ArrowRight, BookOpen, Download, User, Users, Heart, Shield, Smile, Music, Compass, HandHeart } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  onReadMore?: (id: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, onReadMore }) => {
  return (
    <article className="bg-white rounded-card overflow-hidden border border-ieca-gray-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <span className="absolute top-3 left-3 bg-ieca-coral text-white text-xs font-semibold px-2.5 py-1 rounded shadow">
          {item.category}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-ieca-gray mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-ieca-coral" />
              {item.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-ieca-coral" />
              {item.readTime}
            </span>
          </div>
          <h3 className="font-serif font-bold text-lg text-ieca-black group-hover:text-ieca-coral transition-colors line-clamp-2 mb-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-ieca-gray text-sm line-clamp-3 leading-relaxed">
            {item.summary}
          </p>
        </div>
        <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Por: {item.author}</span>
          <button 
            onClick={() => onReadMore?.(item.id)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-ieca-coral hover:text-ieca-coral-hover group-hover:translate-x-1 transition-transform"
          >
            <span>Ler Notícia</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

interface EventCardProps {
  item: EventItem;
  onSelect?: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ item, onSelect }) => {
  return (
    <div className="bg-white rounded-card p-5 border border-ieca-gray-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-5 items-start md:items-center">
      {/* Date badge */}
      <div className="bg-ieca-beige-light border border-ieca-coral/20 rounded-lg p-3 text-center min-w-[90px] flex-shrink-0">
        <span className="block text-xs uppercase font-bold text-ieca-coral tracking-wider">Data</span>
        <span className="block text-xl font-bold font-serif text-ieca-black my-0.5">{item.date.split(' ')[0]}</span>
        <span className="block text-xs text-ieca-gray">{item.date.split(' ').slice(1).join(' ')}</span>
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          {item.isNational && (
            <span className="bg-ieca-coral/15 text-ieca-coral text-[11px] font-bold px-2 py-0.5 rounded">
              Nacional
            </span>
          )}
          <span className="bg-ieca-green-light text-ieca-green text-[11px] font-bold px-2 py-0.5 rounded">
            {item.category}
          </span>
        </div>
        <h3 className="font-serif font-bold text-lg text-ieca-black hover:text-ieca-coral transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-ieca-gray line-clamp-2">
          {item.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-ieca-coral" />
            {item.time}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-ieca-coral" />
            {item.location}
          </span>
        </div>
      </div>

      <button
        onClick={() => onSelect?.(item.id)}
        className="w-full md:w-auto px-4 py-2 bg-ieca-beige text-ieca-black font-semibold text-xs rounded hover:bg-ieca-coral hover:text-white transition-colors flex items-center justify-center gap-1.5 flex-shrink-0"
      >
        <span>Ver Detalhes</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

interface MinistryCardProps {
  item: Ministry;
  onSelect?: (id: string) => void;
}

export const MinistryCard: React.FC<MinistryCardProps> = ({ item, onSelect }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return <Users className="w-6 h-6 text-ieca-coral" />;
      case 'Heart': return <Heart className="w-6 h-6 text-ieca-coral" />;
      case 'Shield': return <Shield className="w-6 h-6 text-ieca-coral" />;
      case 'Smile': return <Smile className="w-6 h-6 text-ieca-coral" />;
      case 'Music': return <Music className="w-6 h-6 text-ieca-coral" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-ieca-coral" />;
      case 'HandHeart': return <HandHeart className="w-6 h-6 text-ieca-coral" />;
      default: return <Compass className="w-6 h-6 text-ieca-coral" />;
    }
  };

  return (
    <div className="bg-white rounded-card border border-ieca-gray-border p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-ieca-coral-light rounded-lg group-hover:bg-ieca-coral group-hover:text-white transition-colors">
            {getIcon(item.iconName)}
          </div>
          <span className="text-xs font-bold text-ieca-gray tracking-widest uppercase">
            {item.code}
          </span>
        </div>
        <h3 className="font-serif font-bold text-xl text-ieca-black group-hover:text-ieca-coral transition-colors mb-2">
          {item.name}
        </h3>
        <p className="text-sm text-ieca-gray leading-relaxed mb-4 line-clamp-3">
          {item.description}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-3">
        <div className="text-xs text-gray-500">
          <span className="font-semibold text-ieca-black">Público:</span> {item.audience}
        </div>
        <button
          onClick={() => onSelect?.(item.id)}
          className="w-full text-center text-xs font-bold text-ieca-coral hover:text-ieca-coral-hover group-hover:underline flex items-center justify-center gap-1"
        >
          <span>Explorar Ministério</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

interface CongregationCardProps {
  item: Congregation;
  onSelectMap?: (congregation: Congregation) => void;
}

export const CongregationCard: React.FC<CongregationCardProps> = ({ item, onSelectMap }) => {
  return (
    <div className="bg-white rounded-card border border-ieca-gray-border p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="bg-ieca-green-light text-ieca-green text-xs font-bold px-2.5 py-1 rounded">
            {item.province}
          </span>
          {item.establishedYear && (
            <span className="text-xs text-ieca-gray font-medium">Fundada em {item.establishedYear}</span>
          )}
        </div>
        <h3 className="font-serif font-bold text-xl text-ieca-black mb-1">
          {item.name}
        </h3>
        <p className="text-xs font-semibold text-ieca-coral mb-3">
          {item.synod}
        </p>

        <div className="space-y-2 text-xs text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-ieca-coral flex-shrink-0" />
            <span><strong className="text-ieca-black">Pastor:</strong> {item.pastor}</span>
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-ieca-coral flex-shrink-0 mt-0.5" />
            <span>{item.address}, {item.city}</span>
          </p>
        </div>

        {/* Cultos schedule */}
        <div className="bg-ieca-beige-light p-3 rounded-md mb-4 space-y-1.5">
          <span className="block text-[11px] uppercase font-bold text-ieca-black tracking-wider mb-1">Horários de Culto:</span>
          {item.services.map((srv, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs text-gray-700">
              <span className="font-medium text-ieca-black">{srv.day} ({srv.time}):</span>
              <span className="text-gray-500 text-[11px]">{srv.type}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => onSelectMap?.(item)}
          className="flex-1 bg-ieca-coral hover:bg-ieca-coral-hover text-white text-xs font-semibold py-2 px-3 rounded shadow transition-colors flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Ver no Mapa & Contactar</span>
        </button>
      </div>
    </div>
  );
};

interface ResourceCardProps {
  item: ResourceDoc;
  onDownload?: (id: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ item, onDownload }) => {
  return (
    <div className="bg-white rounded-card border border-ieca-gray-border p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-ieca-coral/10 text-ieca-coral flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
          {item.format}
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase text-ieca-coral bg-ieca-coral/10 px-2 py-0.5 rounded">
            {item.category}
          </span>
          <h4 className="font-serif font-bold text-base text-ieca-black mt-1 line-clamp-1">
            {item.title}
          </h4>
          <p className="text-xs text-ieca-gray mt-0.5">
            Tamanho: {item.size} • Downloads: {item.downloadCount}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDownload?.(item.id)}
        className="p-2.5 text-ieca-coral hover:bg-ieca-coral hover:text-white rounded-md transition-colors flex items-center gap-1 text-xs font-semibold"
        title="Baixar Documento"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Baixar</span>
      </button>
    </div>
  );
};
