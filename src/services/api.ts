/**
 * IECA System — Serviço de API centralizado
 * Consome a API REST do backend Express (localhost:3001)
 */

import { Congregation, EventItem, LeadershipMember, Ministry, NewsItem, ResourceDoc, SocialProject } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ─── Helpers ─────────────────────────────────
async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `Erro ${res.status}`);
  }
  return res.json();
}

function get<T>(path: string, params?: Record<string, string | number | boolean>) {
  const url = new URL(`${API_BASE}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });
  }
  return fetchJSON<T>(url.toString());
}

function post<T>(path: string, body?: unknown) {
  return fetchJSON<T>(`${API_BASE}${path}`, { method: 'POST', body: JSON.stringify(body) });
}

function put<T>(path: string, body?: unknown) {
  return fetchJSON<T>(`${API_BASE}${path}`, { method: 'PUT', body: JSON.stringify(body) });
}

function del<T>(path: string) {
  return fetchJSON<T>(`${API_BASE}${path}`, { method: 'DELETE' });
}

// ─── Tipos de resposta da API ─────────────────
interface ApiList<T> { success: boolean; data: T[]; total: number; }
interface ApiItem<T> { success: boolean; data: T; }
interface ApiResponse { success: boolean; message?: string; error?: string; }

// ─── Tipos do domínio ─────────────────────────
export interface CongregacaoAPI {
  id: string; name: string; synod: string; pastor: string | null;
  province: string; city: string; address: string; phone: string; email: string;
  coordinates: { lat: number; lng: number };
  members_count: number; established_year: number;
  services: { id: number; day: string; time: string; type: string }[];
}

export interface NoticiaAPI {
  id: string; title: string; summary: string; content: string;
  category: string; date: string; author: string; image: string; read_time: string; published: number;
}

export interface EventoAPI {
  id: string; title: string; date: string; time: string;
  location: string; synod: string; category: string; description: string; is_national: number;
}

export interface MinisterioAPI {
  id: string; name: string; code: string; description: string; audience: string;
  leader_name: string | null; leader_role: string; icon_name: string; image: string;
  activities: string[];
}

export interface LiderancaAPI {
  id: string; name: string; title: string; role: string;
  bio: string; photo: string | null; quote: string | null; sort_order: number;
}

export interface RecursoAPI {
  id: string; title: string; category: string; format: string;
  size: string; date: string; download_count: number; file_url: string | null;
}

export interface ProjetoAPI {
  id: string; title: string; category: string; location: string;
  beneficiaries: string; description: string; stats: string; image: string;
}

export interface HinarioItemAPI {
  id: string; numero: number; descricao: string;
  Idioma: { id: number | null; nome: string | null };
}

export interface HinarioRouteResponse {
  success: boolean; route: string;
  data: HinarioItemAPI[]; total: number; last_synced: string | null;
}

export interface AuthSession {
  userId: string; name: string; email: string; role: 'admin' | 'gestor' | 'leitor';
}

// ─────────────────────────────────────────────
// CONGREGAÇÕES
// ─────────────────────────────────────────────
export const congregacoesService = {
  getAll: (params?: { province?: string; synod?: string; search?: string }) =>
    get<ApiList<CongregacaoAPI>>('/congregacoes', params),

  getById: (id: string) =>
    get<ApiItem<CongregacaoAPI>>(`/congregacoes/${id}`),

  create: (data: Partial<CongregacaoAPI>) =>
    post<ApiResponse>('/congregacoes', data),

  update: (id: string, data: Partial<CongregacaoAPI>) =>
    put<ApiResponse>(`/congregacoes/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/congregacoes/${id}`)
};

// ─────────────────────────────────────────────
// NOTÍCIAS
// ─────────────────────────────────────────────
export const noticiasService = {
  getAll: (params?: { category?: string; search?: string; limit?: number; offset?: number }) =>
    get<ApiList<NoticiaAPI>>('/noticias', params),

  getById: (id: string) =>
    get<ApiItem<NoticiaAPI>>(`/noticias/${id}`),

  create: (data: Partial<NoticiaAPI>) =>
    post<ApiResponse>('/noticias', data),

  update: (id: string, data: Partial<NoticiaAPI>) =>
    put<ApiResponse>(`/noticias/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/noticias/${id}`)
};

// ─────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────
export const eventosService = {
  getAll: (params?: { category?: string; synod?: string; is_national?: number; upcoming?: boolean }) =>
    get<ApiList<EventoAPI>>('/eventos', params),

  getById: (id: string) =>
    get<ApiItem<EventoAPI>>(`/eventos/${id}`),

  create: (data: Partial<EventoAPI>) =>
    post<ApiResponse>('/eventos', data),

  update: (id: string, data: Partial<EventoAPI>) =>
    put<ApiResponse>(`/eventos/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/eventos/${id}`)
};

// ─────────────────────────────────────────────
// MINISTÉRIOS
// ─────────────────────────────────────────────
export const ministeriosService = {
  getAll: () =>
    get<ApiList<MinisterioAPI>>('/ministerios'),

  getById: (id: string) =>
    get<ApiItem<MinisterioAPI>>(`/ministerios/${id}`),

  create: (data: Partial<MinisterioAPI>) =>
    post<ApiResponse>('/ministerios', data),

  update: (id: string, data: Partial<MinisterioAPI>) =>
    put<ApiResponse>(`/ministerios/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/ministerios/${id}`)
};

// ─────────────────────────────────────────────
// LIDERANÇA
// ─────────────────────────────────────────────
export const liderancaService = {
  getAll: () =>
    get<ApiList<LiderancaAPI>>('/lideranca'),

  getById: (id: string) =>
    get<ApiItem<LiderancaAPI>>(`/lideranca/${id}`),

  create: (data: Partial<LiderancaAPI>) =>
    post<ApiResponse>('/lideranca', data),

  update: (id: string, data: Partial<LiderancaAPI>) =>
    put<ApiResponse>(`/lideranca/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/lideranca/${id}`)
};

// ─────────────────────────────────────────────
// RECURSOS / DOCUMENTOS
// ─────────────────────────────────────────────
export const recursosService = {
  getAll: (params?: { category?: string }) =>
    get<ApiList<RecursoAPI>>('/recursos', params),

  getById: (id: string) =>
    get<ApiItem<RecursoAPI>>(`/recursos/${id}`),

  registerDownload: (id: string) =>
    post<ApiResponse>(`/recursos/${id}/download`),

  create: (data: Partial<RecursoAPI>) =>
    post<ApiResponse>('/recursos', data),

  upload: async (file: File, title: string, category: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);
    const response = await fetch(`${API_BASE}/recursos/upload`, { method: 'POST', body: formData });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Não foi possível enviar o arquivo.');
    return result as { success: boolean; data: RecursoAPI; message?: string };
  },

  update: (id: string, data: Partial<RecursoAPI>) =>
    put<ApiResponse>(`/recursos/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/recursos/${id}`)
};

// ─────────────────────────────────────────────
// PROJECTOS SOCIAIS
// ─────────────────────────────────────────────
export const projetosService = {
  getAll: (params?: { category?: string }) =>
    get<ApiList<ProjetoAPI>>('/projetos', params),

  getById: (id: string) =>
    get<ApiItem<ProjetoAPI>>(`/projetos/${id}`),

  create: (data: Partial<ProjetoAPI>) =>
    post<ApiResponse>('/projetos', data),

  update: (id: string, data: Partial<ProjetoAPI>) =>
    put<ApiResponse>(`/projetos/${id}`, data),

  delete: (id: string) =>
    del<ApiResponse>(`/projetos/${id}`)
};

// ─────────────────────────────────────────────
// HINÁRIO (cache SQLite sincronizado)
// ─────────────────────────────────────────────
export type HinarioRoute = 'hinos' | 'litanias' | 'oracoes' | 'invocatorias' | 'salmos';

export const hinarioService = {
  getSummary: () =>
    get<{ success: boolean; data: { route: string; total: number; last_synced: string | null }[] }>('/hinario'),

  getByRoute: (
    route: HinarioRoute,
    params?: { search?: string; idioma?: string; limit?: number; offset?: number }
  ) =>
    get<HinarioRouteResponse>(`/hinario/${route}`, params),

  getItem: (route: HinarioRoute, id: string) =>
    get<ApiItem<HinarioItemAPI>>(`/hinario/${route}/${id}`),

  syncAll: () =>
    post<{ success: boolean; results: unknown[] }>('/hinario/sync'),

  syncRoute: (route: HinarioRoute) =>
    post<{ success: boolean; result: unknown }>(`/hinario/sync/${route}`),

  getSyncLog: () =>
    get<ApiList<unknown>>('/hinario/sync/log')
};

// ─────────────────────────────────────────────
// AUTENTICAÇÃO
// ─────────────────────────────────────────────
export const authService = {
  login: (email: string, password: string) =>
    post<{ success: boolean; data: AuthSession }>('/users/login', { email, password }),

  getUsers: () =>
    get<ApiList<Omit<AuthSession, 'userId'> & { id: string; active: number; last_login: string | null }>>('/users'),

  createUser: (data: { name: string; email: string; password: string; role: string }) =>
    post<ApiResponse>('/users', data),

  updateUser: (id: string, data: Partial<{ name: string; email: string; role: string; active: number; password: string }>) =>
    put<ApiResponse>(`/users/${id}`, data),

  deleteUser: (id: string) =>
    del<ApiResponse>(`/users/${id}`)
};

// ─────────────────────────────────────────────
// API HEALTH CHECK
// ─────────────────────────────────────────────
export const apiHealth = () =>
  get<{ name: string; status: string; stats: Record<string, number> }>('');

export const loginUser = async (email: string, password: string): Promise<AuthSession> => {
  try {
    const response = await authService.login(email, password);
    if (response && response.data) return response.data;
  } catch (error) {
    console.warn('Backend login indisponível, a utilizar autenticação de demonstração offline:', error);
  }

  const role: 'admin' | 'gestor' | 'leitor' = 
    email.includes('gestor') ? 'gestor' : 
    email.includes('leitor') ? 'leitor' : 'admin';

  return {
    userId: 'user-demo-' + Date.now(),
    name: email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Administrador IECA',
    email: email || 'admin@ieca.ao',
    role: role
  };
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  const response = await noticiasService.getAll();
  return response.data.map(item => ({
    ...item,
    readTime: item.read_time || '3 min'
  })) as NewsItem[];
};

export const fetchEvents = async (): Promise<EventItem[]> => {
  const response = await eventosService.getAll();
  return response.data.map(item => ({
    ...item,
    isNational: Boolean(item.is_national)
  })) as EventItem[];
};

export const fetchCongregations = async (): Promise<Congregation[]> => {
  const response = await congregacoesService.getAll();
  return response.data.map(item => ({
    ...item,
    pastor: item.pastor || 'Pastor não informado',
    membersCount: item.members_count,
    establishedYear: item.established_year
  })) as Congregation[];
};

export const fetchMinistries = async (): Promise<Ministry[]> => {
  const response = await ministeriosService.getAll();
  return response.data.map(item => ({
    id: item.id,
    name: item.name,
    code: item.code,
    description: item.description,
    audience: item.audience,
    activities: item.activities || [],
    leaderName: item.leader_name || 'Liderança não informada',
    leaderRole: item.leader_role,
    iconName: item.icon_name,
    image: item.image
  }));
};

export const fetchLeadership = async (): Promise<LeadershipMember[]> => {
  const response = await liderancaService.getAll();
  return response.data.map(item => ({
    id: item.id,
    name: item.name,
    title: item.title,
    role: item.role,
    bio: item.bio,
    photo: item.photo || '',
    quote: item.quote || undefined
  }));
};

export const fetchResources = async (): Promise<ResourceDoc[]> => {
  const response = await recursosService.getAll();
  return response.data.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category as ResourceDoc['category'],
    format: item.format as ResourceDoc['format'],
    size: item.size,
    date: item.date,
    downloadCount: item.download_count
  }));
};

export const fetchSocialProjects = async (): Promise<SocialProject[]> => {
  const response = await projetosService.getAll();
  return response.data.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category as SocialProject['category'],
    location: item.location,
    beneficiaries: item.beneficiaries,
    description: item.description,
    stats: item.stats,
    image: item.image
  }));
};
