/**
 * IECA System — SQLite Database Initializer
 * Cria todas as tabelas e popula com dados iniciais (seed)
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, 'db');
const DB_PATH = path.join(DB_DIR, 'ieca.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─────────────────────────────────────────────
// SCHEMA: Create all tables
// ─────────────────────────────────────────────
db.exec(`
  -- Congregações
  CREATE TABLE IF NOT EXISTS congregacoes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    official_name TEXT DEFAULT 'Igreja Evangélica Congregacional em Angola',
    short_name TEXT,
    synod TEXT NOT NULL,
    pastorado TEXT,
    pastor TEXT,
    province TEXT NOT NULL,
    city TEXT NOT NULL,
    municipality TEXT,
    neighborhood TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    lat REAL,
    lng REAL,
    members_count INTEGER,
    established_year INTEGER,
    google_place_id TEXT,
    google_plus_code TEXT,
    google_url TEXT,
    status TEXT DEFAULT 'A_VALIDAR',
    source TEXT DEFAULT 'Google Maps',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Horários de cultos por congregação
  CREATE TABLE IF NOT EXISTS congregacao_cultos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    congregacao_id TEXT NOT NULL,
    day TEXT NOT NULL,
    time TEXT NOT NULL,
    type TEXT NOT NULL,
    FOREIGN KEY (congregacao_id) REFERENCES congregacoes(id) ON DELETE CASCADE
  );

  -- Notícias
  CREATE TABLE IF NOT EXISTS noticias (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    author TEXT,
    image TEXT,
    read_time TEXT,
    published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Eventos
  CREATE TABLE IF NOT EXISTS eventos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT,
    location TEXT,
    synod TEXT,
    category TEXT NOT NULL,
    description TEXT,
    is_national INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Ministérios / Sociedades
  CREATE TABLE IF NOT EXISTS ministerios (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT,
    description TEXT,
    audience TEXT,
    leader_name TEXT,
    leader_role TEXT,
    icon_name TEXT,
    image TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Actividades por ministério
  CREATE TABLE IF NOT EXISTS ministerio_atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ministerio_id TEXT NOT NULL,
    activity TEXT NOT NULL,
    FOREIGN KEY (ministerio_id) REFERENCES ministerios(id) ON DELETE CASCADE
  );

  -- Liderança
  CREATE TABLE IF NOT EXISTS lideranca (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    role TEXT,
    bio TEXT,
    photo TEXT,
    quote TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Documentos / Recursos
  CREATE TABLE IF NOT EXISTS recursos_documentos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    format TEXT DEFAULT 'PDF',
    size TEXT,
    date TEXT,
    download_count INTEGER DEFAULT 0,
    file_url TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Projectos Sociais
  CREATE TABLE IF NOT EXISTS projetos_sociais (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    beneficiaries TEXT,
    description TEXT,
    stats TEXT,
    image TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Hinário (cache local sincronizado de localhost:5500)
  CREATE TABLE IF NOT EXISTS hinos (
    id TEXT PRIMARY KEY,
    numero INTEGER,
    letra TEXT,
    idioma_id INTEGER,
    idioma_nome TEXT,
    route TEXT NOT NULL,
    synced_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS litanias (
    id TEXT PRIMARY KEY,
    numero INTEGER,
    descricao TEXT,
    idioma_id INTEGER,
    idioma_nome TEXT,
    synced_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS oracoes (
    id TEXT PRIMARY KEY,
    numero INTEGER,
    descricao TEXT,
    idioma_id INTEGER,
    idioma_nome TEXT,
    synced_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS invocatorias (
    id TEXT PRIMARY KEY,
    numero INTEGER,
    descricao TEXT,
    idioma_id INTEGER,
    idioma_nome TEXT,
    synced_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS salmos (
    id TEXT PRIMARY KEY,
    numero INTEGER,
    descricao TEXT,
    idioma_id INTEGER,
    idioma_nome TEXT,
    synced_at TEXT DEFAULT (datetime('now'))
  );

  -- Utilizadores do painel administrativo
  CREATE TABLE IF NOT EXISTS usuarios (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'leitor',
    active INTEGER DEFAULT 1,
    last_login TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Log de sincronizações do hinário
  CREATE TABLE IF NOT EXISTS sync_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route TEXT NOT NULL,
    total_records INTEGER DEFAULT 0,
    status TEXT DEFAULT 'success',
    message TEXT,
    synced_at TEXT DEFAULT (datetime('now'))
  );
`);

const ensureColumn = (table, columnName, columnDefinition) => {
  const existing = db.prepare(`PRAGMA table_info(${table})`).all();
  const hasColumn = existing.some(column => column.name === columnName);

  if (!hasColumn) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${columnName} ${columnDefinition}`);
    console.log(`✅ Coluna adicionada: ${table}.${columnName}`);
  }
};

const ensureCongregacoesSchema = () => {
  const columns = [
    ['official_name', "TEXT DEFAULT 'Igreja Evangélica Congregacional em Angola'"],
    ['short_name', 'TEXT'],
    ['pastorado', 'TEXT'],
    ['municipality', 'TEXT'],
    ['neighborhood', 'TEXT'],
    ['address', 'TEXT'],
    ['phone', 'TEXT'],
    ['email', 'TEXT'],
    ['lat', 'REAL'],
    ['lng', 'REAL'],
    ['members_count', 'INTEGER'],
    ['established_year', 'INTEGER'],
    ['google_place_id', 'TEXT'],
    ['google_plus_code', 'TEXT'],
    ['google_url', 'TEXT'],
    ['status', "TEXT DEFAULT 'A_VALIDAR'"],
    ['source', "TEXT DEFAULT 'Google Maps'"],
    ['created_at', "TEXT DEFAULT (datetime('now'))"],
    ['updated_at', "TEXT DEFAULT (datetime('now'))"]
  ];

  for (const [name, def] of columns) {
    ensureColumn('congregacoes', name, def);
  }
};

ensureCongregacoesSchema();

// ─────────────────────────────────────────────
// SEED: Insert initial data
// ─────────────────────────────────────────────

const seedCongregacoes = db.prepare(`
  INSERT OR IGNORE INTO congregacoes (
    id, name, official_name, short_name, synod, pastorado, pastor,
    province, city, municipality, neighborhood, address, phone, email,
    lat, lng, members_count, established_year,
    google_place_id, google_plus_code, google_url, status, source
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const seedCulto = db.prepare(`
  INSERT OR IGNORE INTO congregacao_cultos (congregacao_id, day, time, type) VALUES (?, ?, ?, ?)
`);

const seedMany = db.transaction((congData) => {
  for (const c of congData) {
    seedCongregacoes.run(
      c.id, c.name, c.official_name || 'Igreja Evangélica Congregacional em Angola', c.short_name || `IECA - ${c.name}`,
      c.synod, c.pastorado || null, c.pastor || null,
      c.province, c.city, c.municipality || null, c.neighborhood || null,
      c.address || null, c.phone || null, c.email || null,
      c.lat || null, c.lng || null, c.members_count || null, c.established_year || null,
      c.google_maps?.place_id || null, c.google_maps?.plus_code || null, c.google_maps?.url || null,
      c.status || 'A_VALIDAR', c.source || 'Google Maps'
    );
    for (const s of c.services || []) {
      seedCulto.run(c.id, s.day, s.time, s.type);
    }
  }
});

const congregacoesData = [
  {
    id: 'cong-1',
    name: 'Igreja Central de Luanda',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Igreja Central de Luanda',
    synod: 'Sínodo Provincial de Luanda',
    pastorado: 'Pastorado Urbano de Luanda',
    pastor: null, province: 'Luanda', city: 'Luanda', municipality: 'Belas', neighborhood: 'Morro Bento II',
    address: 'Bairro Morro Bento II, Rua das Mangueirinhas (Sede Nacional)',
    phone: '+244 923 000 111', email: 'geral@ieca.ao',
    lat: -8.8968745, lng: 13.189805, members_count: 2400, established_year: 1880,
    google_maps: { place_id: null, plus_code: 'F53R+4R Luanda', url: 'https://maps.google.com' },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '08:30 - 11:00', type: 'Culto Principal de Louvor e Adoração' },
      { day: 'Quarta-feira', time: '17:00 - 18:30', type: 'Culto de Oração e Estudo Bíblico' },
      { day: 'Sábado', time: '15:00 - 17:00', type: 'Encontro de Juventude e Catecúmenos' }
    ]
  },
  {
    id: 'cong-2',
    name: 'Igreja da Missão do Dondi',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Missão do Dondi',
    synod: 'Sínodo Central do Huambo',
    pastorado: 'Pastorado Histórico do Dondi',
    pastor: null, province: 'Huambo', city: 'Katchiungo', municipality: 'Katchiungo', neighborhood: 'Dondi',
    address: 'Missão Histórica do Dondi',
    phone: '+244 912 345 678', email: 'dondi.historico@ieca.ao',
    lat: -12.7761, lng: 15.7612, members_count: 3200, established_year: 1914,
    google_maps: { place_id: null, plus_code: '6GFR+GX Katchiungo', url: null },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '09:00 - 11:30', type: 'Culto Dominical Histórico' },
      { day: 'Sexta-feira', time: '16:00 - 17:30', type: 'Reunião das Senhoras (Mulheres IECA)' }
    ]
  },
  {
    id: 'cong-3',
    name: 'Congregação da Cidade Alta',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Cidade Alta (Huambo)',
    synod: 'Sínodo Central do Huambo',
    pastorado: 'Pastorado de Macolocolo',
    pastor: null, province: 'Huambo', city: 'Huambo', municipality: 'Huambo', neighborhood: 'Macolocolo',
    address: 'Av. Independência, Bairro Macolocolo',
    phone: '+244 924 555 444', email: 'huambo.cidadealta@ieca.ao',
    lat: -12.7761, lng: 15.7392, members_count: 1400, established_year: 1948,
    google_maps: { place_id: null, plus_code: null, url: null },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '09:00 - 11:00', type: 'Culto Geral' },
      { day: 'Quinta-feira', time: '16:30 - 18:00', type: 'Estudo Bíblico Familiar' }
    ]
  },
  {
    id: 'cong-4',
    name: 'Igreja Congregacional de Benguela',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Benguela',
    synod: 'Sínodo Provincial de Benguela',
    pastorado: null, pastor: null, province: 'Benguela', city: 'Benguela', municipality: 'Benguela', neighborhood: '11 de Novembro',
    address: 'Rua Silva Porto, Bairro 11 de Novembro',
    phone: '+244 931 777 888', email: 'benguela@ieca.ao',
    lat: -12.5763, lng: 13.4055, members_count: 1100, established_year: 1962,
    google_maps: { place_id: null, plus_code: null, url: null },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '08:30 - 10:45', type: 'Culto de Adoração' },
      { day: 'Quarta-feira', time: '17:00 - 18:30', type: 'Oração e Intercessão' }
    ]
  },
  {
    id: 'cong-5',
    name: 'Congregação de Lubango',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Lubango',
    synod: 'Sínodo Provincial da Huíla',
    pastorado: 'Pastorado Central do Lubango',
    pastor: null, province: 'Huíla', city: 'Lubango', municipality: 'Lubango', neighborhood: 'Comercial',
    address: 'Bairro da Comercial, Junto à Praça Agostinho Neto',
    phone: '+244 922 888 999', email: 'lubango@ieca.ao',
    lat: -14.9172, lng: 13.4925, members_count: 950, established_year: 1970,
    google_maps: { place_id: null, plus_code: null, url: null },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '09:00 - 11:15', type: 'Culto Dominical' },
      { day: 'Sábado', time: '14:30 - 16:30', type: 'Escola Dominical de Líderes' }
    ]
  },
  {
    id: 'cong-6',
    name: 'Igreja Central de Kuito',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Igreja Central de Kuito',
    synod: 'Sínodo Provincial do Bié',
    pastorado: 'Pastorado do Kuito',
    pastor: null, province: 'Bié', city: 'Kuito', municipality: 'Kuito', neighborhood: 'Cacheuele',
    address: 'Rua Norton de Matos, Bairro Cacheuele',
    phone: '+244 945 123 987', email: 'kuito.bie@ieca.ao',
    lat: -12.3833, lng: 16.9333, members_count: 1600, established_year: 1935,
    google_maps: { place_id: null, plus_code: '467G+W48 Kuito', url: null },
    status: 'ATIVA', source: 'Interno / IECA',
    services: [
      { day: 'Domingo', time: '08:30 - 11:00', type: 'Culto Eucarístico e Louvor' },
      { day: 'Terça-feira', time: '16:00 - 17:30', type: 'Reunião de Homens (Homens IECA)' }
    ]
  },
  {
    id: 'cong-luanda-001',
    name: 'Congregação de Elavoko',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Congregação de Elavoko',
    synod: 'Sínodo Provincial de Luanda',
    pastorado: 'Pastorado de Nova Vida',
    pastor: null, province: 'Luanda', city: 'Luanda', municipality: 'Kilamba Kiaxi', neighborhood: 'Nova Vida',
    address: 'Urbanização Nova Vida, Rua 14',
    phone: '+244 923 509 116', email: null,
    lat: null, lng: null, members_count: null, established_year: null,
    google_maps: { place_id: null, plus_code: null, url: null },
    status: 'A_VALIDAR', source: 'Google Maps',
    services: []
  }
];

// Only seed if empty
const congCount = db.prepare('SELECT COUNT(*) as c FROM congregacoes').get();
if (congCount.c === 0) {
  seedMany(congregacoesData);
  console.log('✅ Congregações seeded');
}

// ── Notícias ──
const seedNoticia = db.prepare(`
  INSERT OR IGNORE INTO noticias (id, title, summary, content, category, date, author, image, read_time)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const noticiasData = [
  {
    id: 'news-1',
    title: 'Sínodo Geral Reúne Delegados em Luanda para Definir Linhas Estratégicas 2026–2030',
    summary: 'Líderes de todas as províncias de Angola encontram-se na Capital para deliberar sobre a expansão educacional, ação social e transformação digital da IECA.',
    content: 'O Sínodo Geral da Igreja Evangélica Congregacional em Angola (IECA) deu início à sua Assembleia Anual na Igreja Central de Luanda. Sob o lema "Unidos pela Fé, Servindo a Comunidade", mais de 300 delegados vindos das províncias do Huambo, Bié, Benguela, Huíla, Cabinda e demais regiões reúnem-se para aprovar o Plano Estratégico do próximo quinquénio.',
    category: 'Institucional',
    date: '2026-09-04',
    author: 'Secretaria Geral de Comunicação',
    image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min'
  },
  {
    id: 'news-2',
    title: 'IECA Inaugura Novo Centro de Formação Técnica e Profissional no Dondi',
    summary: 'Iniciativa visa capacitar mais de 500 jovens anualmente em agropecuária, informática e energias renováveis no histórico complexo educacional do Huambo.',
    content: 'Num passo histórico para a preservação do legado educacional congregacional, o Sínodo Central do Huambo inaugurou o novo Centro de Formação Profissional na Missão do Dondi. O projeto beneficiará jovens de várias comunidades rurais.',
    category: 'Social',
    date: '2026-08-28',
    author: 'Departamento de Ação Social',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min'
  },
  {
    id: 'news-3',
    title: 'Juventude Congregacional Realiza Acampamento Nacional com Foco em Liderança Cristã',
    summary: 'Mais de 1.200 jovens de todas as províncias participaram em oficinas de ética, empreendedorismo e devoção espiritual.',
    content: 'O Departamento Nacional da Juventude da IECA organizou com sucesso o Acampamento Nacional de Jovens. Durante 4 dias, palestras focadas no impacto positivo na sociedade angolana inspiraram a nova geração de líderes.',
    category: 'Juventude',
    date: '2026-08-15',
    author: 'Juventude IECA',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    readTime: '5 min'
  }
];

const noticiaCount = db.prepare('SELECT COUNT(*) as c FROM noticias').get();
if (noticiaCount.c === 0) {
  for (const n of noticiasData) {
    seedNoticia.run(n.id, n.title, n.summary, n.content, n.category, n.date, n.author, n.image, n.readTime);
  }
  console.log('✅ Notícias seeded');
}

// ── Eventos ──
const seedEvento = db.prepare(`
  INSERT OR IGNORE INTO eventos (id, title, date, time, location, synod, category, description, is_national)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const eventosData = [
  {
    id: 'evt-1', title: 'Culto de Ação de Graças pelo Aniversário Institucional da IECA',
    date: '2026-11-11', time: '09:00', location: 'Todas as Congregações Nacionais e Sínodos',
    synod: 'Nacional', category: 'Culto Especial',
    description: 'Celebração solene em gratidão pelo percurso histórico e fé sustentada da IECA em Angola.',
    isNational: 1
  },
  {
    id: 'evt-2', title: 'Conferência Nacional de Mulheres Congregacionais (JUCOFE)',
    date: '2026-10-24', time: '08:00', location: 'Complexo da Missão do Dondi, Huambo',
    synod: 'Sínodo Central', category: 'Conferência',
    description: 'Encontro anual das mulheres da IECA abordando o fortalecimento da família, saúde comunitária e integridade espiritual.',
    isNational: 1
  },
  {
    id: 'evt-3', title: 'Seminário de Capacitação para Professores da Escola Dominical',
    date: '2026-09-18', time: '14:00', location: 'Igreja Central de Luanda',
    synod: 'Sínodo de Luanda', category: 'Seminário',
    description: 'Oficina pedagógica e doutrinária destinada aos educadores cristãos de crianças e adolescentes.',
    isNational: 0
  }
];

const eventoCount = db.prepare('SELECT COUNT(*) as c FROM eventos').get();
if (eventoCount.c === 0) {
  for (const e of eventosData) {
    seedEvento.run(e.id, e.title, e.date, e.time, e.location, e.synod, e.category, e.description, e.isNational);
  }
  console.log('✅ Eventos seeded');
}

// ── Ministérios ──
const seedMinisterio = db.prepare(`
  INSERT OR IGNORE INTO ministerios (id, name, code, description, audience, leader_name, leader_role, icon_name, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const seedAtividade = db.prepare(`
  INSERT OR IGNORE INTO ministerio_atividades (ministerio_id, activity) VALUES (?, ?)
`);

const ministeriosData = [
  {
    id: 'min-1', name: 'Sociedade de Jovens', code: 'JUCO',
    description: 'Reúne os membros mais jovens da igreja. O foco está no engajamento espiritual, estudo bíblico, ação social e desenvolvimento de nova liderança.',
    audience: 'Adolescentes e Jovens', leaderName: null, leaderRole: 'Secretário Nacional da Sociedade de Jovens',
    iconName: 'Users', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    activities: ['Encontros de Devocional', 'Acampamentos Nacionais', 'Ação Social Universitária', 'Grupos de Louvor Locais']
  },
  {
    id: 'min-2', name: 'Sociedade Média Joyce', code: 'MÉDIA JOYCE',
    description: 'Direcionada a jovens adultos e casais (18 a 40 anos). Papel ativo na promoção de valores familiares, aconselhamento matrimonial e combate a problemas sociais.',
    audience: 'Jovens Adultos e Casais (18 aos 40 Anos)', leaderName: null, leaderRole: 'Presidente Nacional da Sociedade Média Joyce',
    iconName: 'Heart', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    activities: ['Aconselhamento Familiar', 'Seminários de Matrimónio', 'Projetos Sociais Urbanos', 'Rede de Apoio a Jovens Famílias']
  },
  {
    id: 'min-3', name: 'Sociedade de Mulheres', code: 'JUCOFE',
    description: 'Agrupa as mulheres da igreja, atuando em ações de louvor, oração contínua, projetos sociais e apoio comunitário.',
    audience: 'Mulheres da Igreja', leaderName: null, leaderRole: 'Presidente Nacional da Sociedade de Mulheres',
    iconName: 'Heart', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    activities: ['Círculos de Oração', 'Feiras de Solidariedade', 'Apoio à Maternidade', 'Retiros Espirituais de Mulheres']
  },
  {
    id: 'min-4', name: 'Sociedade de Homens', code: 'JUCOHO',
    description: 'Envolve os membros masculinos em atividades de comunhão espiritual, liderança no lar, projetos sociais e desenvolvimento comunitário.',
    audience: 'Homens e Pais de Família', leaderName: null, leaderRole: 'Secretário Nacional da Sociedade de Homens',
    iconName: 'Shield', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    activities: ['Devocionais de Madrugada', 'Obras de Construção e Manutenção', 'Mentoria de Jovens', 'Capacitação Profissional']
  },
  {
    id: 'min-5', name: 'Associação de Escuteiros da IECA', code: 'ESCUTEIROS',
    description: 'Formação de caráter, disciplina, civismo, vivência ao ar livre e serviço ao próximo.',
    audience: 'Crianças, Adolescentes e Jovens Escuteiros', leaderName: null, leaderRole: 'Comissário Nacional de Escuta IECA',
    iconName: 'Compass', image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    activities: ['Acampamentos de Formação', 'Civismo e Proteção Ambiental', 'Serviço Comunitário', 'Projetos de Orientação']
  },
  {
    id: 'min-6', name: 'Ministério Infantil', code: 'CRIANÇAS',
    description: 'Formação moral, espiritual e pedagógica das crianças através de histórias bíblicas e cânticos de louvor.',
    audience: 'Crianças dos 3 aos 14 Anos', leaderName: null, leaderRole: 'Coordenadora Pedagógica Infantil',
    iconName: 'Smile', image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800',
    activities: ['Escola Dominical Infantil', 'Coral Infantil Local', 'Escola Bíblica de Férias']
  },
  {
    id: 'min-7', name: 'Música e Adoração', code: 'MÚSICA',
    description: 'Preservação do património corálio congregacional, execução dos hinos do Hinário e regência nos cultos dominicais.',
    audience: 'Coralistas, Instrumentistas e Maestros', leaderName: null, leaderRole: 'Diretor Nacional de Música',
    iconName: 'Music', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    activities: ['Ensaios de Corais Locais', 'Festivais Provinciais de Cânticos', 'Oficinas de Teoria Musical']
  },
  {
    id: 'min-8', name: 'Ação Social e Missões', code: 'AÇÃO SOCIAL',
    description: 'Execução de projetos comunitários de saúde, escolas confessionais, poços de água e implantação de novos pontos de pregação.',
    audience: 'Comunidades Vulneráveis e Zonas Rurais', leaderName: null, leaderRole: 'Diretor de Ação Social e Missões',
    iconName: 'HandHeart', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    activities: ['Postos Médicos Comunitários', 'Distribuição de Alimentos', 'Perfuração de Poços', 'Plantação de Igrejas']
  }
];

const seedMinTransaction = db.transaction((data) => {
  for (const m of data) {
    seedMinisterio.run(m.id, m.name, m.code, m.description, m.audience, m.leaderName, m.leaderRole, m.iconName, m.image);
    for (const a of m.activities) {
      seedAtividade.run(m.id, a);
    }
  }
});

const minCount = db.prepare('SELECT COUNT(*) as c FROM ministerios').get();
if (minCount.c === 0) {
  seedMinTransaction(ministeriosData);
  console.log('✅ Ministérios seeded');
}

// ── Liderança ──
const seedLider = db.prepare(`
  INSERT OR IGNORE INTO lideranca (id, name, title, role, bio, photo, quote, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const liderancaData = [
  {
    id: 'lead-1', name: 'Secretário Geral da IECA', title: 'Secretário Geral',
    role: 'Liderança Executiva Nacional',
    bio: 'Líder teológico com vasta experiência na edificação comunitária, diálogo institucional e expansão educacional em Angola.',
    photo: null,
    quote: '"A nossa missão é permanecer como farol imutável de fé, esperança e serviço dedicado ao povo angolano, unindo a tradição cristã histórica às exigências da modernidade."',
    sortOrder: 1
  },
  {
    id: 'lead-2', name: 'Vice-Secretário Geral', title: 'Vice-Secretário Geral',
    role: 'Liderança Teológica e Administrativa',
    bio: 'Dedicado à supervisão dos sínodos provinciais e ao fortalecimento do património doutrinário congregacional.',
    photo: null, quote: null, sortOrder: 2
  },
  {
    id: 'lead-3', name: 'Presidente do Sínodo Central do Huambo', title: 'Presidente do Sínodo Central do Huambo',
    role: 'Supervisão Regional',
    bio: 'Coordenador das missões históricas do Dondi e Chilesso, impulsionando a renovação educacional e agrícola.',
    photo: null, quote: null, sortOrder: 3
  }
];

const liderCount = db.prepare('SELECT COUNT(*) as c FROM lideranca').get();
if (liderCount.c === 0) {
  for (const l of liderancaData) {
    seedLider.run(l.id, l.name, l.title, l.role, l.bio, l.photo, l.quote, l.sortOrder);
  }
  console.log('✅ Liderança seeded');
}

// ── Recursos / Documentos ──
const seedRecurso = db.prepare(`
  INSERT OR IGNORE INTO recursos_documentos (id, title, category, format, size, date, download_count)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const recursosData = [
  { id: 'res-1', title: 'Estatutos e Regulamento Geral da IECA (Edição 2026)', category: 'Estatutos', format: 'PDF', size: '2.4 MB', date: '2026-01-15', downloadCount: 1420 },
  { id: 'res-2', title: 'Manual de Doutrina e Confissão de Fé Congregacional', category: 'Manual Doutrinário', format: 'PDF', size: '4.1 MB', date: '2025-11-20', downloadCount: 3890 },
  { id: 'res-3', title: 'Guia de Estudos para a Escola Dominical - 3º Trimestre', category: 'Guia de Estudos', format: 'PDF', size: '1.8 MB', date: '2026-06-01', downloadCount: 5120 },
  { id: 'res-4', title: 'Relatório Nacional de Ação Social e Obras Comunitárias', category: 'Relatório Anual', format: 'PDF', size: '5.6 MB', date: '2026-03-10', downloadCount: 890 }
];

const recCount = db.prepare('SELECT COUNT(*) as c FROM recursos_documentos').get();
if (recCount.c === 0) {
  for (const r of recursosData) {
    seedRecurso.run(r.id, r.title, r.category, r.format, r.size, r.date, r.downloadCount);
  }
  console.log('✅ Recursos seeded');
}

// ── Projectos Sociais ──
const seedProjeto = db.prepare(`
  INSERT OR IGNORE INTO projetos_sociais (id, title, category, location, beneficiaries, description, stats, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const projetosData = [
  {
    id: 'soc-1', title: 'Rede Escolar Congregacional IECA', category: 'Educação',
    location: 'Huambo, Bié, Benguela e Luanda', beneficiaries: '+ 45.000 Estudantes',
    description: 'Gestão pedagógica de dezenas de escolas primárias e secundárias confessionais, proporcionando educação gratuita e de qualidade.',
    stats: '84 Escolas Ativas', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'soc-2', title: 'Postos de Saúde e Maternidades Rurais', category: 'Saúde',
    location: 'Zonas Rurais do Central e Sul de Angola', beneficiaries: '+ 120.000 Atendimentos/Ano',
    description: 'Prestação de cuidados primários de saúde, vacinação, rastreios e apoio materno-infantil em comunidades desprovidas de hospital central.',
    stats: '18 Centros de Saúde', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'soc-3', title: 'Programa Água Vida para Aldeias', category: 'Ação Comunitária',
    location: 'Províncias do Bié e Huíla', beneficiaries: '35 Comunidades',
    description: 'Perfuração de poços de água potável alimentados por painéis solares para erradicar doenças de origem hídrica.',
    stats: '42 Poços Instalados', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=800'
  }
];

const projCount = db.prepare('SELECT COUNT(*) as c FROM projetos_sociais').get();
if (projCount.c === 0) {
  for (const p of projetosData) {
    seedProjeto.run(p.id, p.title, p.category, p.location, p.beneficiaries, p.description, p.stats, p.image);
  }
  console.log('✅ Projectos Sociais seeded');
}

// ── Utilizadores base do painel ──
const seedUser = db.prepare(`
  INSERT OR IGNORE INTO usuarios (id, name, email, password_hash, role)
  VALUES (?, ?, ?, ?, ?)
`);

const defaultUsers = [
  ['usr-admin-1', 'Administrador IECA', 'admin@ieca.ao', 'ieca@2026', 'admin'],
  ['usr-manager-1', 'Gestor de Conteúdos', 'gestor@ieca.ao', 'ieca@2026', 'gestor'],
  ['usr-reader-1', 'Leitor IECA', 'leitor@ieca.ao', 'ieca@2026', 'leitor']
];

for (const user of defaultUsers) seedUser.run(...user);
console.log('✅ Utilizadores base do painel verificados');

console.log('\n🗄️  Base de dados IECA inicializada com sucesso!');
console.log(`📁 Localização: ${DB_PATH}`);

module.exports = db;
