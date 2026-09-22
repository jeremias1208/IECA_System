import React, { useState } from 'react';
import {
  Camera,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Globe,
  Heart,
  Star,
  BookOpen,
  MapPin,
  Filter,
  ZoomIn
} from 'lucide-react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';

// ── Imagens reais do arquivo IECA ──────────────────────────────
import imgSecretarioGeral    from '../data/images/SecretarioGeral.jpg';
import imgSecretarioExecutivo from '../data/images/SecretarioExecutivo.jpg';
import imgDiscursoSecretario from '../data/images/discursoSecretario.jpg';
import imgSecretarios        from '../data/images/Secreratios.jpg';
import imgPastores           from '../data/images/Pastores.jpg';
import imgJuventude          from '../data/images/Juventude.jpg';
import imgColegio            from '../data/images/colegio.jpg';
import imgDondi              from '../data/images/dondi.png';
import imgSecretariosGerais             from '../data/images/SecretariosGerais.jpg';
import imgChilumeBailundo   from '../data/images/Missão Evangélica de Chilume-Bailundo.jpg';
import imgCamundongo        from '../data/images/MissaoEvangelicadeCamundongo.jpg';
import imgChissamba          from '../data/images/MissaoEvangelicaChissamba.jpg';
import imgChilesso           from '../data/images/MissaoEvangelicaChilesso.jpg';
import imgElende             from '../data/images/MissaoEvangelicaELende.jpg';

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  src: string;
  year?: string | number;
  category: string;
}

interface GallerySection {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  photos: GalleryPhoto[];
}

/* ─────────────────────────────────────────────
   DATA — usando fotos reais da IECA
   ───────────────────────────────────────────── */

/** Secção 1: Liderança — Secretários-Gerais e Executivos */
const LIDERANCA_PHOTOS: GalleryPhoto[] = [
  {
    id: 'sg-01',
    title: 'Secretário-Geral da IECA',
    description: 'O Secretário-Geral em postura de oração e leitura das Sagradas Escrituras durante uma cerimónia oficial.',
    src: imgSecretarioGeral,
    year: '2024',
    category: 'lideranca'
  },
  {
    id: 'sg-02',
    title: 'Secretário-Geral — Discurso no Huambo',
    description: 'O Secretário-Geral da IECA a discursar durante as comemorações dos 55 anos da Independência Nacional de Angola, Huambo.',
    src: imgDiscursoSecretario,
    year: '2025',
    category: 'lideranca'
  },
  {
    id: 'sg-03',
    title: 'Secretário Executivo da IECA',
    description: 'O Secretário Executivo da IECA a presidir um culto, com a Palavra de Deus aberta no púlpito.',
    src: imgSecretarioExecutivo,
    year: '2024',
    category: 'lideranca'
  },
  {
    id: 'sg-04',
    title: 'Colégio de Secretários e Pastores',
    description: 'Reunião do colégio de secretários sinodais e pastores durante um acto eclesial oficial da IECA.',
    src: imgSecretarios,
    year: '2024',
    category: 'lideranca'
  },
  {
    id: 'sg-05',
    title: 'Secretários Gerais',
    description: 'Reunião dos Secretários Gerais da IECA durante uma cerimónia oficial. Ricardo Ulienge Epalanga, José Belo Chipenda, Augusto Chipesse e André Congovi Eurico',
    src: imgSecretariosGerais,
    year: '2024',
    category: 'lideranca'
  }
];

/** Secção 2: Cultos, Cerimónias e Vida Litúrgica */
const CULTOS_PHOTOS: GalleryPhoto[] = [
  {
    id: 'cu-01',
    title: 'Corpo Pastoral em Cerimónia Litúrgica',
    description: 'Pastores em vestes litúrgicas reunidos para uma cerimónia de acção de graças e louvor. Sínodo de Luanda.',
    src: imgPastores,
    year: '2024',
    category: 'cultos'
  },
  {
    id: 'cu-02',
    title: 'Procissão Pastoral — IECA Lunda Sul',
    description: 'Pastores em procissão solene durante uma cerimónia litúrgica no Sínodo da Lunda Sul.',
    src: imgColegio,
    year: '2024',
    category: 'cultos'
  }
];

/** Secção 3: Juventude e Coros */
const JUVENTUDE_PHOTOS: GalleryPhoto[] = [
  {
    id: 'jv-01',
    title: 'Juventude IECA — Louvor e Adoração',
    description: 'Grupo de jovens da IECA em trajes tradicionais Umbundu durante um momento de louvor congregacional.',
    src: imgJuventude,
    year: '2024',
    category: 'juventude'
  }
];

/** Secção 4: Património e Edifícios */
const PATRIMONIO_PHOTOS: GalleryPhoto[] = [
  {
    id: 'pt-02',
    title: 'Missão Evangélica de Chilume-Bailundo — Huambo',
    description: 'Fundada em 1881, a Missão de Chilume-Bailundo representa os primeiros passos da expansão da IECA a partir das comunidades rurais do Huambo.',
    src: imgChilumeBailundo,
    year: '1881',
    category: 'patrimonio'
  },
  {
    id: 'pt-03',
    title: 'Missão Evangélica de Camundongo — Bié',
    description: 'Fundada em 1884, a Missão de Camundongo integrou o movimento de evangelização, educação e serviço comunitário que se consolidou no Bié.',
    src: imgCamundongo,
    year: '1884',
    category: 'patrimonio'
  },
  {
    id: 'pt-04',
    title: 'Missão Evangélica de Chissamba — Bié',
    description: 'Fundada em 1888, Chissamba é uma das missões históricas que testemunham a presença congregacional no centro de Angola.',
    src: imgChissamba,
    year: '1888',
    category: 'patrimonio'
  },
  {
    id: 'pt-05',
    title: 'Missão Evangélica de Chilesso — Bié',
    description: 'Fundada em 1904, a Missão de Chilesso marcou a expansão da IECA e o desenvolvimento de iniciativas de educação e formação no Bié.',
    src: imgChilesso,
    year: '1904',
    category: 'patrimonio'
  },
  {
    id: 'pt-06',
    title: 'Missão Evangélica do Elende — Huambo',
    description: 'Fundada em 1906, a Missão do Elende faz parte do património histórico da IECA no Huambo e da sua caminhada de serviço às comunidades.',
    src: imgElende,
    year: '1906',
    category: 'patrimonio'
  },
  {
    id: 'pt-01',
    title: 'Missão e Instituições Históricas do Dondi — Huambo',
    description: 'Entre 1914 e 1920, Dondi consolidou-se como um complexo histórico de evangelização, ensino técnico, saúde, agricultura e seminários, incluindo o Instituto Currie, a Escola Means e a Missão de Lutamo/Dondi.',
    src: imgDondi,
    year: '1914–1920',
    category: 'patrimonio'
  }
];

const GALLERY_SECTIONS: GallerySection[] = [
  {
    id: 'lideranca',
    label: 'Liderança — Secretários e Pastores',
    icon: <Star className="w-5 h-5" />,
    description: 'Registo fotográfico dos líderes institucionais da IECA — Secretários-Gerais, Executivos e responsáveis sinodais.',
    photos: LIDERANCA_PHOTOS
  },
  {
    id: 'cultos',
    label: 'Cultos e Cerimónias Litúrgicas',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Momentos de louvor, celebrações litúrgicas e solenidades pastorais que marcam a vida espiritual da IECA.',
    photos: CULTOS_PHOTOS
  },
  {
    id: 'juventude',
    label: 'Juventude e Coros',
    icon: <Heart className="w-5 h-5" />,
    description: 'A geração jovem da IECA em momentos de louvor, adoração e expressão cultural congregacional.',
    photos: JUVENTUDE_PHOTOS
  },
  {
    id: 'patrimonio',
    label: 'Templos e Missões Históricas',
    icon: <MapPin className="w-5 h-5" />,
    description: 'Fotografias dos templos e missões que preservam a memória da evangelização, educação e ação comunitária da IECA em Angola.',
    photos: PATRIMONIO_PHOTOS
  }
];

/* ─────────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────────── */
interface LightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ photos, currentIndex, onClose, onPrev, onNext }) => {
  const photo = photos[currentIndex];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-ieca-coral text-white rounded-full transition-all duration-200 z-10 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image container */}
      <div
        className="max-w-5xl w-full mx-auto flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
        />
        <div className="text-center space-y-2 max-w-2xl">
          <h3 className="text-white font-serif font-bold text-lg sm:text-xl leading-snug">{photo.title}</h3>
          {photo.description && (
            <p className="text-gray-400 text-sm leading-relaxed">{photo.description}</p>
          )}
          {photo.year && (
            <span className="inline-block text-ieca-coral text-xs font-bold bg-white/10 px-3 py-1 rounded-full">
              {photo.year}
            </span>
          )}
        </div>
      </div>

      {/* Next */}
      {photos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-ieca-coral text-white rounded-full transition-all duration-200 z-10 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PHOTO CARD
   ───────────────────────────────────────────── */
interface PhotoCardProps {
  photo: GalleryPhoto;
  onClick: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => (
  <div
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    aria-label={`Ver foto: ${photo.title}`}
    className="group relative overflow-hidden rounded-card shadow-md cursor-pointer bg-gray-100 border border-ieca-gray-border hover:shadow-xl hover:border-ieca-coral/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ieca-coral"
  >
    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="w-6 h-6 text-white" />
        </div>
      </div>
      {/* Year badge */}
      {photo.year && (
        <div className="absolute top-3 right-3 bg-ieca-coral text-white text-[10px] font-bold px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {photo.year}
        </div>
      )}
    </div>
    {/* Caption */}
    <div className="p-4 bg-white">
      <h4 className="font-serif font-bold text-sm text-ieca-black leading-snug line-clamp-2">
        {photo.title}
      </h4>
      {photo.description && (
        <p className="text-[11px] text-ieca-gray mt-1 leading-relaxed line-clamp-2">
          {photo.description}
        </p>
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   SECTION BLOCK
   ───────────────────────────────────────────── */
const ACCENT_MAP: Record<string, string> = {
  lideranca: 'text-amber-700 bg-amber-50 border-amber-200',
  cultos:    'text-ieca-coral bg-ieca-coral/10 border-ieca-coral/20',
  juventude: 'text-ieca-green bg-ieca-green/10 border-ieca-green/20',
  patrimonio:'text-blue-700 bg-blue-50 border-blue-200',
};

interface GallerySectionBlockProps {
  section: GallerySection;
  onPhotoClick: (sectionId: string, index: number) => void;
}

const GallerySectionBlock: React.FC<GallerySectionBlockProps> = ({ section, onPhotoClick }) => {
  const accent = ACCENT_MAP[section.id] ?? 'text-ieca-black bg-gray-100 border-gray-200';

  return (
    <section id={`section-${section.id}`} className="scroll-reveal">
      {/* Header */}
      <div className={`flex items-center gap-3 p-4 rounded-card border mb-6 ${accent}`}>
        <div className={`p-2 rounded-lg ${accent.split(' ').slice(1).join(' ')}`}>
          {section.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-serif font-bold text-xl sm:text-2xl leading-tight">{section.label}</h2>
          <p className="text-xs opacity-60 mt-0.5 hidden sm:block">{section.description}</p>
        </div>
        <span className="text-xs font-bold opacity-50 shrink-0 tabular-nums">
          {section.photos.length} {section.photos.length === 1 ? 'foto' : 'fotos'}
        </span>
      </div>
      <p className="text-xs text-ieca-gray mb-5 sm:hidden leading-relaxed">{section.description}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {section.photos.map((photo, idx) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => onPhotoClick(section.id, idx)}
          />
        ))}
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export const GalleryPage: React.FC = () => {
  const { t } = useSitePreferences();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxSection, setLightboxSection] = useState<string | null>(null);
  const [lightboxIndex,   setLightboxIndex]   = useState<number>(0);

  const handlePhotoClick = (sectionId: string, index: number) => {
    setLightboxSection(sectionId);
    setLightboxIndex(index);
  };

  const activeLightboxSection = GALLERY_SECTIONS.find(s => s.id === lightboxSection);
  const lightboxPhotos = activeLightboxSection?.photos ?? [];

  const handlePrev = () => setLightboxIndex(i => (i - 1 + lightboxPhotos.length) % lightboxPhotos.length);
  const handleNext = () => setLightboxIndex(i => (i + 1) % lightboxPhotos.length);

  const filteredSections = activeFilter === 'all'
    ? GALLERY_SECTIONS
    : GALLERY_SECTIONS.filter(s => s.id === activeFilter);

  const totalPhotos = GALLERY_SECTIONS.reduce((acc, s) => acc + s.photos.length, 0);

  return (
    <div className="min-h-screen bg-white">

      <HeroBanner
        variant="wide"
        eyebrow={<span className="flex items-center gap-2"><Camera className="w-5 h-5" />{t('galleryEyebrow')}</span>}
        title={t('galleryTitle')}
        description={t('galleryDescription')}
        imageSrc={imgSecretariosGerais}
        stats={[
          { icon: <Camera className="w-4 h-4 text-ieca-coral" />, label: `${totalPhotos} ${t('photographs')}` },
          { icon: <Globe className="w-4 h-4 text-ieca-green" />, label: `${GALLERY_SECTIONS.length} ${t('categories')}` },
          { icon: <Calendar className="w-4 h-4 text-amber-400" />, label: '2024 – 2025' },
          { icon: <Users className="w-4 h-4 text-gray-400" />, label: t('synodsAngola') }
        ]}
      />

      {/* ── Filter Bar ── */}
      <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-sm border-b border-ieca-gray-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <Filter className="w-4 h-4 text-ieca-gray shrink-0" />

            <button
              onClick={() => setActiveFilter('all')}
              className={`shrink-0 px-4 py-1.5 rounded-btn text-xs font-bold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-ieca-coral text-white shadow'
                  : 'bg-gray-100 text-ieca-black hover:bg-ieca-coral/10'
              }`}
            >
              {t('all')} ({totalPhotos})
            </button>

            {GALLERY_SECTIONS.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveFilter(section.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-btn text-xs font-bold transition-colors ${
                  activeFilter === section.id
                    ? 'bg-ieca-coral text-white shadow'
                    : 'bg-gray-100 text-ieca-black hover:bg-ieca-coral/10'
                }`}
              >
                <span className="scale-75 shrink-0">{section.icon}</span>
                <span>{section.label}</span>
                <span className="opacity-60">({section.photos.length})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gallery Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {filteredSections.map(section => (
          <GallerySectionBlock
            key={section.id}
            section={section}
            onPhotoClick={handlePhotoClick}
          />
        ))}

        {/* Empty state */}
        {filteredSections.length === 0 && (
          <div className="text-center py-20 text-ieca-gray">
            <Camera className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm">{t('noPhotos')}</p>
          </div>
        )}

        {/* Upload invitation */}
        <section className="bg-ieca-beige-light border border-ieca-beige rounded-card p-8 text-center space-y-4">
          <Camera className="w-10 h-10 mx-auto text-ieca-coral opacity-70" />
          <h3 className="font-serif font-bold text-xl text-ieca-black">
            Tem fotografias para partilhar?
          </h3>
          <p className="text-ieca-gray text-sm max-w-lg mx-auto leading-relaxed">
            Se representa um sínodo ou congregação e deseja contribuir com fotografias para o arquivo
            institucional da IECA, entre em contacto com o Secretariado-Geral.
          </p>
          <a
            href="mailto:geral@ieca.ao"
            className="inline-flex items-center gap-2 bg-ieca-coral hover:bg-ieca-coral-hover text-white px-6 py-2.5 rounded-btn font-bold text-sm shadow transition-colors"
          >
            Contactar o Secretariado
          </a>
        </section>
      </div>

      {/* ── Lightbox ── */}
      {lightboxSection && (
        <Lightbox
          photos={lightboxPhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxSection(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
