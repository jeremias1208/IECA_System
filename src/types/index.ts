export type Province = 
  | 'Luanda' 
  | 'Huambo' 
  | 'Benguela' 
  | 'Huíla' 
  | 'Bié' 
  | 'Cabinda' 
  | 'Cuanza Sul' 
  | 'Cuanza Norte'
  | 'Malanje' 
  | 'Namibe' 
  | 'Uíge'
  | 'Bengo'
  | 'Cuando'
  | 'Cubango'
  | 'Cunene'
  | 'Icolo e Bengo'
  | 'Lunda Norte'
  | 'Lunda Sul'
  | 'Moxico'
  | 'Moxico Leste'
  | 'Zaire'
  | string;

export type CongregationStatus = 'ATIVA' | 'A_VALIDAR' | 'INATIVA' | 'NAO_CONFIRMADA';

export interface GoogleMapsInfo {
  place_id: string | null;
  plus_code: string | null;
  url: string | null;
}

export interface CongregationService {
  id?: number;
  congregacao_id?: string;
  day: string;
  time: string;
  type: string;
}

export interface Congregation {
  id: string;
  name: string;
  official_name: string;
  short_name: string;
  synod: string;
  pastorado: string | null;
  pastor: string | null;
  province: Province;
  city: string;
  municipality: string | null;
  neighborhood: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  lat: number | null;
  lng: number | null;
  members_count: number | null;
  established_year: number | null;
  google_maps: GoogleMapsInfo;
  status: CongregationStatus;
  source: string;
  created_at?: string;
  updated_at?: string;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
  services: CongregationService[];

  // Retrocompatibility optional aliases for legacy components if needed
  membersCount?: number;
  establishedYear?: number;
}


export interface Hymn {
  id: string;
  number: number;
  title: string;
  category: 'Louvor' | 'Oração' | 'Ação de Graças' | 'Natal' | 'Páscoa' | 'Missões' | 'Fé & Confiança';
  key?: string;
  composer?: string;
  idioma?: string;
  htmlContent?: string;
  lyrics: string[];
  audioMelody?: number[]; // Frequencies for synth preview
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Institucional' | 'Sínodos' | 'Social' | 'Juventude' | 'Missões';
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  synod: string;
  category: 'Culto Especial' | 'Conferência' | 'Assembleia' | 'Acampamento' | 'Seminário';
  description: string;
  isNational: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  code: string;
  description: string;
  audience: string;
  activities: string[];
  leaderName: string;
  leaderRole: string;
  iconName: string;
  image: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  photo: string;
  quote?: string;
}

export interface ResourceDoc {
  id: string;
  title: string;
  category: 'Estatutos' | 'Manual Doutrinário' | 'Guia de Estudos' | 'Relatório Anual' | 'Boletim';
  format: 'PDF' | 'DOCX' | 'EPUB';
  size: string;
  date: string;
  downloadCount: number;
}

export interface SocialProject {
  id: string;
  title: string;
  category: 'Educação' | 'Saúde' | 'Desenvolvimento Agrícola' | 'Ação Comunitária';
  location: string;
  beneficiaries: string;
  description: string;
  stats: string;
  image: string;
}

export interface GeneralSecretary {
  id: string;
  name: string;
  title: string;
  period: string;
  synodOfOrigin: string;
  bio: string;
  photo: string;
  quote?: string;
  achievements: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Missões Históricas' | 'Eventos Sinodais' | 'Cultos & Corais' | 'Ação Social' | 'Diversos & Outros';
  year: string;
  location: string;
  imageUrl: string;
  description: string;
}

export type AdminRole = 'admin' | 'gestor' | 'leitor';

export interface AdminRoleDefinition {
  id: AdminRole;
  label: string;
  scope: string;
  description: string;
  permissions: string[];
}

export const ADMIN_ROLE_DEFINITIONS: AdminRoleDefinition[] = [
  {
    id: 'admin',
    label: 'Administrador',
    scope: 'Todo o sistema',
    description: 'Gere conteúdos, configurações, utilizadores e permissões da IECA.',
    permissions: ['Criar, editar e eliminar conteúdos', 'Gerir utilizadores e perfis', 'Aceder a todos os módulos']
  },
  {
    id: 'gestor',
    label: 'Gestor',
    scope: 'Conteúdos institucionais',
    description: 'Gere os conteúdos operacionais, sem acesso à administração de perfis.',
    permissions: ['Criar e editar notícias, eventos e documentos', 'Atualizar congregações e hinário', 'Consultar utilizadores']
  },
  {
    id: 'leitor',
    label: 'Leitor',
    scope: 'Consulta',
    description: 'Consulta a informação publicada sem poder alterar o sistema.',
    permissions: ['Consultar todos os módulos', 'Sem criação, edição ou eliminação', 'Sem gestão de utilizadores']
  }
];

export const ADMIN_ROLE_PERMISSIONS: Record<AdminRole, { canCreate: boolean; canEdit: boolean; canDelete: boolean; canManageUsers: boolean }> = {
  admin: { canCreate: true, canEdit: true, canDelete: true, canManageUsers: true },
  gestor: { canCreate: true, canEdit: true, canDelete: false, canManageUsers: false },
  leitor: { canCreate: false, canEdit: false, canDelete: false, canManageUsers: false }
};

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: AdminRole;
}

export type CMSModule = 
  | 'noticias' 
  | 'eventos' 
  | 'congregacoes' 
  | 'hinario' 
  | 'documentos' 
  | 'sinodos'
  | 'artigos'
  | 'usuarios';

export interface Pastorate {
  id: string;
  name: string;
  location: string;
  province: Province;
  pastor: string;
  establishedYear?: number;
  contact?: string;
}

export interface ProvincialSynod {
  id: string;
  name: string;
  regionType: 'Sínodo Provincial' | 'Área Missionária';
  province: Province;
  secretaryName: string;
  secretaryTitle: string; // Ex: 'Secretário Provincial', 'Representante Legal'
  secretaryPhoto: string;
  secretaryBio: string;
  headquarters: string;
  email?: string;
  phone?: string;
  pastorates: Pastorate[];
}

export interface Author {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  email?: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Artigo' | 'Estudo Bíblico' | 'Pregação' | 'Reflexão';
  authorId: string;
  authorName: string;
  authorRole: string;
  authorPhoto: string;
  date: string;
  readTime: string;
  scriptureReference?: string;
  imageUrl?: string;
}

export interface LiveStream {
  id: string;
  title: string;
  speaker: string;
  eventDate: string;
  time: string;
  status: 'Ao Vivo' | 'Agendada' | 'Gravada';
  embedUrl?: string; // e.g. YouTube or Facebook embed url
  platformUrl: string; // Direct Facebook/YouTube link
  platformName: 'Facebook Live' | 'YouTube Live' | 'Outro';
  thumbnailUrl: string;
  description: string;
}

export interface DonationOption {
  id: string;
  bankName: string;
  accountName: string;
  iban: string;
  swift?: string;
  currency: string;
  purpose: string;
}
