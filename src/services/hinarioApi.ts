/**
 * IECA Hinário API — consome o endpoint remoto do Hinário por padrão.
 * O backend local continua disponível através de VITE_HINARIO_API_URL.
 */

import { Hymn } from '../types';
import { MOCK_HYMNS } from '../data/mockData';

const API_BASE = import.meta.env.VITE_HINARIO_API_URL || 'https://hinario-api-7.onrender.com';

export interface LiturgicalItem {
  id: string | number;
  number?: number;
  title: string;
  category: 'Hino' | 'Litania' | 'Oração' | 'Invocatória' | 'Salmo';
  content: string[]; // Parsed paragraphs
  htmlContent: string; // Raw HTML content
  idioma?: string;
  key?: string;
  composer?: string;
  audioMelody?: number[];
}

export interface ApiRawItem {
  id: number | string;
  numero?: number;
  number?: number;
  titulo?: string;
  title?: string;
  descricao?: string;
  deescricao?: string;
  letra?: string;
  conteudo?: string;
  categoria?: string;
  category?: string;
  tom?: string;
  key?: string;
  autor?: string;
  composer?: string;
  idiomaId?: number;
  Idioma?: {
    id: number;
    nome: string;
  };
  audioMelody?: number[];
}

// Fallback liturgical items (used if API is unavailable)
const FALLBACK_LITURGICAL: LiturgicalItem[] = [
  {
    id: 'lit-1',
    number: 1,
    title: 'Litania de Confissão e Graça',
    category: 'Litania',
    idioma: 'Português',
    content: [
      'Dirigente: Senhor, tem misericórdia de nós pecadores.',
      'Congregação: Cristo, tem misericórdia de nós e renova a nossa alma.',
      'Dirigente: Pelas nossas famílias, sínodos e pela nação de Angola, te oramos.',
      'Congregação: Ouve-nos, Senhor Jesus, e concede-nos a tua paz imutável.'
    ],
    htmlContent: '<p><strong>Dirigente:</strong> Senhor, tem misericórdia de nós pecadores.</p><p><strong>Congregação:</strong> Cristo, tem misericórdia de nós e renova a nossa alma.</p><p><strong>Dirigente:</strong> Pelas nossas famílias, sínodos e pela nação de Angola, te oramos.</p><p><strong>Congregação:</strong> Ouve-nos, Senhor Jesus, e concede-nos a tua paz imutável.</p>'
  },
  {
    id: 'ora-1',
    number: 1,
    title: 'CREDO APOSTÓLICO',
    category: 'Oração',
    idioma: 'Português',
    content: [
      'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra.',
      'E em Jesus Cristo, seu único Filho, nosso Senhor, o qual foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria;',
      'padeceu sob o poder de Pôncio Pilatos, foi crucificado, morto e sepultado;',
      'desceu ao manso dos mortos, ao terceiro dia ressuscitou dos mortos, subiu aos céus, está assentado à direita de Deus Pai Todo-Poderoso, de onde há de vir a julgar os vivos e os mortos.',
      'Creio no Espírito Santo, na santa Igreja Católica (Universal), na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Ámen.'
    ],
    htmlContent: '<p>Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra.</p><p>E em Jesus Cristo, seu único Filho, nosso Senhor...</p><p>Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Ámen.</p>'
  },
  {
    id: 'inv-1',
    number: 1,
    title: 'Invocatória de Abertura do Culto',
    category: 'Invocatória',
    idioma: 'Português',
    content: [
      'Em nome do Pai, do Filho e do Espírito Santo.',
      'A nossa ajuda está no nome do Senhor, que fez os céus e a terra.',
      'Alegrei-me quando me disseram: Vamos à casa do Senhor!'
    ],
    htmlContent: '<p>Em nome do Pai, do Filho e do Espírito Santo.</p><p>A nossa ajuda está no nome do Senhor, que fez os céus e a terra.</p><p>Alegrei-me quando me disseram: Vamos à casa do Senhor!</p>'
  },
  {
    id: 'salm-1',
    number: 23,
    title: 'Salmo 23 — O Senhor é o Meu Pastor',
    category: 'Salmo',
    idioma: 'Português',
    content: [
      'O Senhor é o meu pastor; nada me faltará.',
      'Deitar-me faz em verdes pastos, guia-me suavemente a águas tranquilas.',
      'Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.'
    ],
    htmlContent: '<p>O Senhor é o meu pastor; nada me faltará.</p><p>Deitar-me faz em verdes pastos, guia-me suavemente a águas tranquilas.</p><p>Refrigera a minha alma; guia-me pelas veredas da justiça, por amor do seu nome.</p>'
  }
];

/**
 * Parse raw HTML/text content into clean paragraphs
 */
function parseContent(raw: string): string[] {
  if (!raw) return [];
  return raw
    .replace(/\\u003C/g, '<')
    .replace(/\\u003E/g, '>')
    .replace(/<[^>]*>/g, '\n')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);
}

/**
 * Fetch hinos from SQLite cache via backend API
 */
export async function fetchHinos(): Promise<Hymn[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE}/hinos?limit=500`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const data: ApiRawItem[] = Array.isArray(json) ? json : json.data || [];

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item, index) => {
        const rawContent = item.letra || item.descricao || item.conteudo || '';
        const cleanParagraphs = parseContent(rawContent);

        return {
          id: String(item.id || `hymn-api-${index}`),
          number: item.numero || item.number || index + 1,
          title: item.titulo || item.title || `Hino Nº ${item.numero || index + 1}`,
          category: (item.categoria || item.category || 'Louvor') as any,
          key: item.tom || item.key || 'Dó Maior',
          composer: item.autor || item.composer || 'Hinário IECA',
          idioma: item.Idioma?.nome || 'Português',
          htmlContent: rawContent,
          lyrics: cleanParagraphs.length > 0 ? cleanParagraphs : [rawContent],
          audioMelody: item.audioMelody || [293.66, 329.63, 369.99, 392.00, 440.00]
        };
      });
    }
  } catch (error) {
    console.warn('Backend API indisponível para /hinos, usando dados de fallback:', error);
  }

  return MOCK_HYMNS.map(h => ({
    ...h,
    idioma: 'Português',
    htmlContent: h.lyrics.map(l => `<p>${l}</p>`).join('')
  }));
}

/**
 * Fetch liturgical items (litanias, oracoes, invocatorias, salmos) from SQLite cache
 */
export async function fetchRouteItems(route: 'litanias' | 'oracoes' | 'invocatorias' | 'salmos'): Promise<LiturgicalItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${API_BASE}/${route}?limit=500`, {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    const data: ApiRawItem[] = Array.isArray(json) ? json : json.data || [];

    if (Array.isArray(data) && data.length > 0) {
      const categoryMap: Record<string, 'Litania' | 'Oração' | 'Invocatória' | 'Salmo'> = {
        litanias: 'Litania',
        oracoes: 'Oração',
        invocatorias: 'Invocatória',
        salmos: 'Salmo'
      };

      return data.map((item, index) => {
        const rawContent = item.descricao || item.letra || item.conteudo || '';
        const cleanParagraphs = parseContent(rawContent);

        return {
          id: item.id || `${route}-${index}`,
          number: item.numero || item.number || index + 1,
          title: item.titulo || item.title || `${categoryMap[route]} Nº ${item.numero || index + 1}`,
          category: categoryMap[route],
          idioma: item.Idioma?.nome || 'Português',
          htmlContent: rawContent,
          content: cleanParagraphs.length > 0 ? cleanParagraphs : [rawContent]
        };
      });
    }
  } catch (error) {
    console.warn(`Backend API indisponível para /${route}, usando fallback:`, error);
  }

  const categoryMap: Record<string, string> = {
    litanias: 'Litania',
    oracoes: 'Oração',
    invocatorias: 'Invocatória',
    salmos: 'Salmo'
  };

  return FALLBACK_LITURGICAL.filter(item => item.category === categoryMap[route]);
}
