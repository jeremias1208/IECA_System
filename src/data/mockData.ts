import { Congregation, Hymn, NewsItem, EventItem, Ministry, LeadershipMember, ResourceDoc, SocialProject } from '../types';
import secretarioExecutivoPhoto from './images/SecretarioExecutivo.jpg';
import secretarioGeralPhoto from './images/SecretarioGeral.jpg';
import juventudePhoto from './images/Juventude.jpg';
import secretariosPhoto from './images/Secreratios.jpg';
import pastoresPhotp from './images/Pastores.jpg';

export const MOCK_CONGREGATIONS: Congregation[] = [
  {
    id: 'cong-1',
    name: 'Igreja Central de Luanda',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Igreja Central de Luanda',
    synod: 'Sínodo Provincial de Luanda',
    pastorado: 'Pastorado Urbano de Luanda',
    pastor: null,
    province: 'Luanda',
    city: 'Luanda',
    municipality: 'Belas',
    neighborhood: 'Morro Bento II',
    address: 'Bairro Morro Bento II, Rua das Mangueirinhas (Sede Nacional)',
    phone: '+244 923 000 111',
    email: 'geral@ieca.ao',
    lat: -8.8968745,
    lng: 13.189805,
    members_count: 2400,
    established_year: 1880,
    google_maps: {
      place_id: null,
      plus_code: 'F53R+4R Luanda',
      url: 'https://maps.google.com'
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -8.8968745, lng: 13.189805 },
    membersCount: 2400,
    establishedYear: 1880,
    services: [
      { id: 1, congregacao_id: 'cong-1', day: 'Domingo', time: '08:30 - 11:00', type: 'Culto Principal de Louvor e Adoração (Dia do Senhor)' },
      { id: 2, congregacao_id: 'cong-1', day: 'Quarta-feira', time: '17:00 - 18:30', type: 'Culto de Oração e Estudo Bíblico' },
      { id: 3, congregacao_id: 'cong-1', day: 'Sábado', time: '15:00 - 17:00', type: 'Encontro de Juventude e Catecúmenos' }
    ]
  },
  {
    id: 'cong-2',
    name: 'Igreja da Missão do Dondi',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Missão do Dondi',
    synod: 'Sínodo Central do Huambo',
    pastorado: 'Pastorado Histórico do Dondi',
    pastor: null,
    province: 'Huambo',
    city: 'Katchiungo',
    municipality: 'Katchiungo',
    neighborhood: 'Dondi',
    address: 'Missão Histórica do Dondi',
    phone: '+244 912 345 678',
    email: 'dondi.historico@ieca.ao',
    lat: -12.7761,
    lng: 15.7612,
    members_count: 3200,
    established_year: 1914,
    google_maps: {
      place_id: null,
      plus_code: '6GFR+GX Katchiungo',
      url: null
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -12.7761, lng: 15.7612 },
    membersCount: 3200,
    establishedYear: 1914,
    services: [
      { id: 4, congregacao_id: 'cong-2', day: 'Domingo', time: '09:00 - 11:30', type: 'Culto Dominical Histórico' },
      { id: 5, congregacao_id: 'cong-2', day: 'Sexta-feira', time: '16:00 - 17:30', type: 'Reunião das Senhoras (Mulheres IECA)' }
    ]
  },
  {
    id: 'cong-3',
    name: 'Congregação da Cidade Alta',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Cidade Alta (Huambo)',
    synod: 'Sínodo Central do Huambo',
    pastorado: 'Pastorado de Macolocolo',
    pastor: null,
    province: 'Huambo',
    city: 'Huambo',
    municipality: 'Huambo',
    neighborhood: 'Macolocolo',
    address: 'Av. Independência, Bairro Macolocolo',
    phone: '+244 924 555 444',
    email: 'huambo.cidadealta@ieca.ao',
    lat: -12.7761,
    lng: 15.7392,
    members_count: 1400,
    established_year: 1948,
    google_maps: {
      place_id: null,
      plus_code: null,
      url: null
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -12.7761, lng: 15.7392 },
    membersCount: 1400,
    establishedYear: 1948,
    services: [
      { id: 6, congregacao_id: 'cong-3', day: 'Domingo', time: '09:00 - 11:00', type: 'Culto Geral' },
      { id: 7, congregacao_id: 'cong-3', day: 'Quinta-feira', time: '16:30 - 18:00', type: 'Estudo Bíblico Familiar' }
    ]
  },
  {
    id: 'cong-4',
    name: 'Igreja Congregacional de Benguela',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Benguela',
    synod: 'Sínodo Provincial de Benguela',
    pastorado: null,
    pastor: null,
    province: 'Benguela',
    city: 'Benguela',
    municipality: 'Benguela',
    neighborhood: '11 de Novembro',
    address: 'Rua Silva Porto, Bairro 11 de Novembro',
    phone: '+244 931 777 888',
    email: 'benguela@ieca.ao',
    lat: -12.5763,
    lng: 13.4055,
    members_count: 1100,
    established_year: 1962,
    google_maps: {
      place_id: null,
      plus_code: null,
      url: null
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -12.5763, lng: 13.4055 },
    membersCount: 1100,
    establishedYear: 1962,
    services: [
      { id: 8, congregacao_id: 'cong-4', day: 'Domingo', time: '08:30 - 10:45', type: 'Culto de Adoração' },
      { id: 9, congregacao_id: 'cong-4', day: 'Quarta-feira', time: '17:00 - 18:30', type: 'Oração e Intercessão' }
    ]
  },
  {
    id: 'cong-5',
    name: 'Congregação de Lubango',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Lubango',
    synod: 'Sínodo Provincial da Huíla',
    pastorado: 'Pastorado Central do Lubango',
    pastor: null,
    province: 'Huíla',
    city: 'Lubango',
    municipality: 'Lubango',
    neighborhood: 'Comercial',
    address: 'Bairro da Comercial, Junto à Praça Agostinho Neto',
    phone: '+244 922 888 999',
    email: 'lubango@ieca.ao',
    lat: -14.9172,
    lng: 13.4925,
    members_count: 950,
    established_year: 1970,
    google_maps: {
      place_id: null,
      plus_code: null,
      url: null
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -14.9172, lng: 13.4925 },
    membersCount: 950,
    establishedYear: 1970,
    services: [
      { id: 10, congregacao_id: 'cong-5', day: 'Domingo', time: '09:00 - 11:15', type: 'Culto Dominical' },
      { id: 11, congregacao_id: 'cong-5', day: 'Sábado', time: '14:30 - 16:30', type: 'Escola Dominical de Líderes' }
    ]
  },
  {
    id: 'cong-6',
    name: 'Igreja Central de Kuito',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Igreja Central de Kuito',
    synod: 'Sínodo Provincial do Bié',
    pastorado: 'Pastorado do Kuito',
    pastor: null,
    province: 'Bié',
    city: 'Kuito',
    municipality: 'Kuito',
    neighborhood: 'Cacheuele',
    address: 'Rua Norton de Matos, Bairro Cacheuele',
    phone: '+244 945 123 987',
    email: 'kuito.bie@ieca.ao',
    lat: -12.3833,
    lng: 16.9333,
    members_count: 1600,
    established_year: 1935,
    google_maps: {
      place_id: null,
      plus_code: '467G+W48 Kuito',
      url: null
    },
    status: 'ATIVA',
    source: 'Interno / IECA',
    created_at: '2026-09-09 15:28:42',
    updated_at: '2026-09-09 15:28:42',
    coordinates: { lat: -12.3833, lng: 16.9333 },
    membersCount: 1600,
    establishedYear: 1935,
    services: [
      { id: 12, congregacao_id: 'cong-6', day: 'Domingo', time: '08:30 - 11:00', type: 'Culto Eucarístico e Louvor' },
      { id: 13, congregacao_id: 'cong-6', day: 'Terça-feira', time: '16:00 - 17:30', type: 'Reunião de Homens (Homens IECA)' }
    ]
  },
  {
    id: 'cong-luanda-001',
    name: 'Congregação de Elavoko',
    official_name: 'Igreja Evangélica Congregacional em Angola',
    short_name: 'IECA - Congregação de Elavoko',
    synod: 'Sínodo Provincial de Luanda',
    pastorado: 'Pastorado de Nova Vida',
    pastor: null,
    province: 'Luanda',
    city: 'Luanda',
    municipality: 'Kilmamba Kiaxi',
    neighborhood: 'Nova Vida',
    address: 'Urbanização Nova Vida, Rua 14',
    phone: '+244 923 509 116',
    email: null,
    lat: null,
    lng: null,
    members_count: null,
    established_year: null,
    google_maps: {
      place_id: null,
      plus_code: null,
      url: null
    },
    status: 'A_VALIDAR',
    source: 'Google Maps',
    created_at: '2026-09-16 08:00:00',
    updated_at: '2026-09-16 08:00:00',
    coordinates: {
      lat: null,
      lng: null
    },
    services: []
  }
];

export const MOCK_HYMNS: Hymn[] = [
  {
    id: 'hymn-1',
    number: 1,
    title: 'Santo, Santo, Santo',
    category: 'Louvor',
    key: 'Ré Maior',
    composer: 'Reginald Heber / John B. Dykes',
    lyrics: [
      'Santo! Santo! Santo! Deus Onipotente!\nCedo de manhã cantaremos teu louvor.\nSanto! Santo! Santo! Justo e Misericordioso!\nDeus em Três Pessoas, Abençoado Criador!',
      'Santo! Santo! Santo! Todos os remidos,\nJunto aos anciãos, prostrados em louvor;\nAnjos e arcanjos cantam hinos infinitos,\nA Ti que eras, és e sempre serás, Senhor!',
      'Santo! Santo! Santo! Nós, os pecadores,\nNão podemos ver tua glória sem temor;\nSó Tu és Santo; não há outro como Tu,\nPerfeito em poder, em pureza e amor.'
    ],
    audioMelody: [293.66, 293.66, 329.63, 293.66, 369.99, 392.00, 369.99]
  },
  {
    id: 'hymn-2',
    number: 24,
    title: 'Grande És Tu, Senhor',
    category: 'Ação de Graças',
    key: 'Lá Maior',
    composer: 'Carl Boberg / Tradução Portuguesa',
    lyrics: [
      'Senhor meu Deus, quando eu maravilhado\nContemplo a tua imensa criação,\nAs estrelas, o céu azul e os trovões,\nO teu poder mostrado nas nações:',
      'Então minh’alma canta a ti, Senhor:\n"Grande és Tu! Grande és Tu!"\nEntão minh’alma canta a ti, Senhor:\n"Grande és Tu! Grande és Tu!"',
      'Quando eu penso no amor sem igual,\nQue enviou seu Filho para a cruz,\nLevando sobre si o meu pecado,\nPra me remir em glória e pura luz.'
    ],
    audioMelody: [440.00, 440.00, 493.88, 554.37, 440.00]
  },
  {
    id: 'hymn-3',
    number: 48,
    title: 'Castelo Forte É O Nosso Deus',
    category: 'Fé & Confiança',
    key: 'Dó Maior',
    composer: 'Martinho Lutero (1529)',
    lyrics: [
      'Castelo forte é o nosso Deus, espada e escudo e arma;\nCom seu poder defende os seus de todo o transe e alarma.\nO antigo incumbidor nos quer prejudicar;\nCom fúria e com poder nos vem assaltar, com artes de malícia.',
      'A nossa força nada faz, sozinhos perderemos;\nMas nosso Deus socorro traz, no Rei que nós temos.\nSabeis quem ele é? Jesus, o próprio Deus,\nSenhor de Sabaoth, e outros não há mais; ele vencerá a luta.'
    ],
    audioMelody: [261.63, 261.63, 261.63, 392.00, 349.23]
  },
  {
    id: 'hymn-4',
    number: 72,
    title: 'Vem, Ó Fonte de Toda Bênção',
    category: 'Oração',
    key: 'Mib Maior',
    composer: 'Robert Robinson (1758)',
    lyrics: [
      'Vem, ó fonte de toda bênção, afina o meu coração pra cantar;\nMisericórdias que nunca cessam exigem louvor sem fim.\nEnsina-me o canto celestial dos anjos lá no alto;\nFixa-me no firme monte do teu amor imutável.',
      'Aqui ergo o meu Ebenézer, pois socorrido por Ti cheguei;\nE espero por tua graça chegar a salvo no lar celestial.'
    ],
    audioMelody: [311.13, 311.13, 349.23, 392.00]
  },
  {
    id: 'hymn-5',
    number: 105,
    title: 'Ide por Todo o Mundo (Hino Missionário)',
    category: 'Missões',
    key: 'Sol Maior',
    composer: 'Hino Congregacional IECA',
    lyrics: [
      'Ide por todo o mundo, preglai o Evangelho da Paz;\nAngola e África clamam pela salvação que Cristo traz.\nCom amor, fé e coragem, a igreja marchando vai,\nLevando a luz divina do nosso Eterno Pai.',
      'Semeadores da palavra nas aldeias e cidades,\nAnunciando a libertação e todas as verdades!'
    ],
    audioMelody: [392.00, 440.00, 493.88, 523.25]
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Sínodo Geral Reúne Delegados em Luanda para Definir Linhas Estratégicas 2026–2030',
    summary: 'Líderes de todas as províncias de Angola encontram-se na Capital para deliberar sobre a expansão educacional, ação social e transformação digital da IECA.',
    content: 'O Sínodo Geral da Igreja Evangélica Congregacional em Angola (IECA) deu início à sua Assembleia Anual na Igreja Central de Luanda. Sob o lema "Unidos pela Fé, Servindo a Comunidade", mais de 300 delegados vindos das províncias do Huambo, Bié, Benguela, Huíla, Cabinda e demais regiões reúnem-se para aprovar o Plano Estratégico do próximo quinquénio...',
    category: 'Institucional',
    date: '04 de Setembro de 2026',
    author: 'Secretaria Geral de Comunicação',
    image: secretariosPhoto,
    readTime: '4 min'
  },
  {
    id: 'news-2',
    title: 'IECA Inaugura Novo Centro de Formação Técnica e Profissional no Dondi',
    summary: 'Iniciativa visa capacitar mais de 500 jovens anualmente em agropecuária, informática e energias renováveis no histórico complexo educacional do Huambo.',
    content: 'Num passo histórico para a preservação do legado educacional congregacional, o Sínodo Central do Huambo inaugurou o novo Centro de Formação Profissional na Missão do Dondi. O projeto beneficiará jovens de várias comunidades rurais...',
    category: 'Social',
    date: '28 de Agosto de 2026',
    author: 'Departamento de Ação Social',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    readTime: '3 min'
  },
  {
    id: 'news-3',
    title: 'Juventude Congregacional Realiza Acampamento Nacional com Foco em Liderança Cristã',
    summary: 'Mais de 1.200 jovens de todas as províncias participaram em oficinas de ética, empreendedorismo e devoção espiritual.',
    content: 'O Departamento Nacional da Juventude da IECA organizou com sucesso o Acampamento Nacional de Jovens. Durante 4 dias, palestras focadas no impacto positivo na sociedade angolana inspiraram a nova geração de líderes...',
    category: 'Juventude',
    date: '15 de Agosto de 2026',
    author: 'Juventude IECA',
    image: juventudePhoto,
    readTime: '5 min'
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Culto de Ação de Graças pelo Aniversário Institucional da IECA',
    date: '11 de Novembro de 2026',
    time: '09:00',
    location: 'Todas as Congregação Nacionais e Sínodos',
    synod: 'Nacional',
    category: 'Culto Especial',
    description: 'Celebração solene em gratidão pelo percurso histórico, fé sustentada e impacto socio-espiritual da IECA em Angola.',
    isNational: true
  },
  {
    id: 'evt-2',
    title: 'Conferência Nacional de Mulheres Congregacionais (JUCOFE)',
    date: '24–27 de Outubro de 2026',
    time: '08:00',
    location: 'Complexo da Missão do Dondi, Huambo',
    synod: 'Sínodo Central',
    category: 'Conferência',
    description: 'Encontro anual das mulheres da IECA abordando o fortalecimento da família, saúde comunitária e integridade espiritual.',
    isNational: true
  },
  {
    id: 'evt-3',
    title: 'Seminário de Capacitação para Professores da Escola Dominical',
    date: '18 de Setembro de 2026',
    time: '14:00',
    location: 'Igreja Central de Luanda',
    synod: 'Sínodo de Luanda',
    category: 'Seminário',
    description: 'Oficina pedagógica e doutrinária destinada aos educadores cristãos de crianças e adolescentes.',
    isNational: false
  }
];

export const MOCK_MINISTRIES: Ministry[] = [
  {
    id: 'min-1',
    name: 'Sociedade de Jovens',
    code: 'JUCO',
    description: 'Reúne os membros mais jovens da igreja. O foco está no engajamento espiritual, estudo bíblico, ação social e desenvolvimento de nova liderança.',
    audience: 'Adolescentes e Jovens',
    activities: ['Encontros de Devocional', 'Acampamentos Nacionais', 'Ação Social Universitária', 'Grupos de Louvor Locais'],
    leaderName: 'Rev. [INSERIR LÍDER JUVENTUDE]',
    leaderRole: 'Secretário Nacional da Sociedade de Jovens',
    iconName: 'Users',
    image: juventudePhoto
  },
  {
    id: 'min-2',
    name: 'Sociedade Média Joyce',
    code: 'MÉDIA JOYCE',
    description: 'Direcionada a jovens adultos e casais (18 a 40 anos). Papel ativo na promoção de valores familiares, aconselhamento matrimonial e combate a problemas sociais.',
    audience: 'Jovens Adultos e Casais (18 aos 40 Anos)',
    activities: ['Aconselhamento Familiar', 'Seminários de Matrimónio', 'Projetos Sociais Urbanos', 'Rede de Apoio a Jovens Famílias'],
    leaderName: 'Dr. [INSERIR LÍDER MÉDIA JOYCE]',
    leaderRole: 'Presidente Nacional da Sociedade Média Joyce',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-3',
    name: 'Sociedade de Mulheres',
    code: 'JUCOFE',
    description: 'Agrupa as mulheres da igreja, atuando em ações de louvor, oração contínua, projetos sociais e apoio comunitário em todas as Sociedades Locais.',
    audience: 'Mulheres da Igreja',
    activities: ['Círculos de Oração', 'Feiras de Solidariedade', 'Apoio à Maternidade', 'Retiros Espirituais de Mulheres'],
    leaderName: 'Dra. [INSERIR LÍDER MULHERES]',
    leaderRole: 'Presidente Nacional da Sociedade de Mulheres',
    iconName: 'Heart',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-4',
    name: 'Sociedade de Homens',
    code: 'JUCOHO',
    description: 'Envolve os membros masculinos em atividades de comunhão espiritual, liderança no lar, projetos sociais e desenvolvimento comunitário.',
    audience: 'Homens e Pais de Família',
    activities: ['Devocionais de Madrugada', 'Obras de Construção e Manutenção', 'Mentoria de Jovens', 'Capacitação Profissional'],
    leaderName: 'Eng. [INSERIR LÍDER HOMENS]',
    leaderRole: 'Secretário Nacional da Sociedade de Homens',
    iconName: 'Shield',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-5',
    name: 'Associação de Escuteiros da IECA',
    code: 'ESCUTEIROS',
    description: 'Integrante da estrutura hierárquica da igreja para formação de caráter, disciplina, civismo, vivência ao ar livre e serviço ao próximo.',
    audience: 'Crianças, Adolescentes e Jovens Escuteiros',
    activities: ['Acampamentos de Formação', 'Civismo e Proteção Ambiental', 'Serviço Comunitário', 'Projetos de Orientação'],
    leaderName: 'Chefe [INSERIR LÍDER ESCUTEIROS]',
    leaderRole: 'Comissário Nacional de Escuta IECA',
    iconName: 'Compass',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-6',
    name: 'Ministério Infantil',
    code: 'CRIANÇAS',
    description: 'Formação moral, espiritual e pedagógica das crianças através de histórias bíblicas e cânticos de louvor.',
    audience: 'Crianças dos 3 aos 14 Anos',
    activities: ['Escola Dominical Infantil', 'Coral Infantil Local', 'Escola Bíblica de Férias'],
    leaderName: 'Prof. [INSERIR LÍDER INFANTIL]',
    leaderRole: 'Coordenadora Pedagógica Infantil',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-7',
    name: 'Música e Adoração',
    code: 'MÚSICA',
    description: 'Preservação do património corálio congregacional, execução dos hinos do Hinário e regência nos cultos dominicais.',
    audience: 'Coralistas, Instrumentistas e Maestros',
    activities: ['Ensaios de Corais Locais', 'Festivais Provínciais de Cânticos', 'Oficinas de Teoria Musical'],
    leaderName: 'Maestro [INSERIR MAESTRO]',
    leaderRole: 'Diretor Nacional de Música',
    iconName: 'Music',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'min-8',
    name: 'Ação Social e Missões',
    code: 'AÇÃO SOCIAL',
    description: 'Execução de projetos comunitários de saúde, escolas confessionais, poços de água e implantação de novos pontos de pregação.',
    audience: 'Comunidades Vulneráveis e Zonas Rurais',
    activities: ['Postos Médicos Comunitários', 'Distribuição de Alimentos', 'Perfuração de Poços', 'Plantação de Igrejas'],
    leaderName: 'Dr. [INSERIR COORDENADOR SOCIAL]',
    leaderRole: 'Diretor de Ação Social e Missões',
    iconName: 'HandHeart',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_LEADERSHIP: LeadershipMember[] = [
  {
    id: 'lead-1',
    name: 'Sua Revma. Luciano Chanhelela Chianeque',
    title: 'Secretário Geral da IECA',
    role: 'Liderança Executiva Nacional',
    bio: 'Líder teológico com vasta experiência na edificação comunitária, diálogo institucional e expansão educacional em Angola.',
    photo: secretarioGeralPhoto,
  },
  {
    id: 'lead-2',
    name: 'Rev. [INSERIR VICE-PRESIDENTE]',
    title: 'Vice-Secretário Geral',
    role: 'Liderança Teológica e Administrativa',
    bio: 'Dedicado à supervisão dos sínodos provinciais e ao fortalecimento do património doutrinário congregacional.',
    photo: secretarioExecutivoPhoto
  },
  {
    id: 'lead-3',
    name: 'Rev. [INSERIR DIRETOR SINODAL]',
    title: 'Presidente do Sínodo Central do Huambo',
    role: 'Supervisão Regional',
    bio: 'Coordenador das missões históricas do Dondi e Chilesso, impulsionando a renovação educacional e agrícola.',
    photo: pastoresPhotp
  }
];

export const MOCK_RESOURCES: ResourceDoc[] = [
  {
    id: 'res-1',
    title: 'Estatutos e Regulamento Geral da IECA (Edição 2026)',
    category: 'Estatutos',
    format: 'PDF',
    size: '2.4 MB',
    date: '2026-01-15',
    downloadCount: 1420
  },
  {
    id: 'res-2',
    title: 'Manual de Doutrina e Confissão de Fé Congregacional',
    category: 'Manual Doutrinário',
    format: 'PDF',
    size: '4.1 MB',
    date: '2025-11-20',
    downloadCount: 3890
  },
  {
    id: 'res-3',
    title: 'Guia de Estudos para a Escola Dominical - 3º Trimestre',
    category: 'Guia de Estudos',
    format: 'PDF',
    size: '1.8 MB',
    date: '2026-06-01',
    downloadCount: 5120
  },
  {
    id: 'res-4',
    title: 'Relatório Nacional de Ação Social e Obras Comunitárias',
    category: 'Relatório Anual',
    format: 'PDF',
    size: '5.6 MB',
    date: '2026-03-10',
    downloadCount: 890
  }
];

export const MOCK_SOCIAL_PROJECTS: SocialProject[] = [
  {
    id: 'soc-1',
    title: 'Rede Escolar Congregacional IECA',
    category: 'Educação',
    location: 'Huambo, Bié, Benguela e Luanda',
    beneficiaries: '+ 45.000 Estudantes',
    description: 'Gestão pedagógica de dezenas de escolas primárias e secundárias confessionais, proporcionando educação gratuita e de qualidade.',
    stats: '84 Escolas Ativas',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'soc-2',
    title: 'Postos de Saúde e Maternidades Rurais',
    category: 'Saúde',
    location: 'Zonas Rurais do Central e Sul de Angola',
    beneficiaries: '+ 120.000 Atendimentos/Ano',
    description: 'Prestação de cuidados primários de saúde, vacinação, rastreios e apoio materno-infantil em comunidades desprovidas de hospital central.',
    stats: '18 Centros de Saúde',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'soc-3',
    title: 'Programa Água Vida para Aldeias',
    category: 'Ação Comunitária',
    location: 'Províncias do Bié e Huíla',
    beneficiaries: '35 Comunitários',
    description: 'Perfuração de poços de água potável alimentados por painéis solares para erradicar doenças de origem hídrica.',
    stats: '42 Poços Instalados',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_SECRETARIES_LINEAGE = [
  {
    id: 'sec-1',
    name: 'Rev. André Cangovi Eurico',
    title: 'Secretário Geral da IECA',
    period: '2019 – Presente',
    synodOfOrigin: 'Sínodo Geral',
    bio: 'Líder atual da IECA, doutorado em Teologia, responsável pela expansão da igreja, modernização institucional e dinamização dos sínodos em todas as províncias.',
    photo: secretarioGeralPhoto,
    quote: 'A missão da igreja é servir a Deus servindo a comunidade com fé viva e obras de transformação.',
    achievements: [
      'Digitalização e estruturação dos sistemas nacionais da IECA',
      'Fortalecimento da autonomia dos Sínodos Provinciais',
      'Expansão da rede de escolas e centros de saúde missionários'
    ]
  },
  {
    id: 'sec-2',
    name: 'Rev. Augusto Chipesse',
    title: 'Secretário Geral Emérito',
    period: '2008 – 2019',
    synodOfOrigin: 'Sínodo Central do Huambo',
    bio: 'Destacado líder e teólogo congregacional que conduziu a reconstrução pós-conflito das infraestruturas e missões históricas no Dondi e Huambo.',
    photo: secretariosPhoto,
    quote: 'Reconstruir a fé é reconstruir o tecido moral e educacional da nossa pátria.',
    achievements: [
      'Reabilitação da emblemática Missão Histórica do Dondi',
      'Consolidação da presença congregacional na Capital Luanda',
      'Impulso ao ecumenismo e cooperação com o CICA'
    ]
  },
  {
    id: 'sec-3',
    name: 'Rev. Daniel Songuile',
    title: 'Secretário Geral Histórico',
    period: '1995 – 2008',
    synodOfOrigin: 'Sínodo de Benguela',
    bio: 'Liderou a igreja em períodos desafiadores da história nacional, mantendo a coesão pastoral e a esperança cristã entre os fiéis.',
    photo: pastoresPhotp,
    quote: 'Nos momentos de maior provação, a palavra de Deus permanece como o nosso refúgio e fortaleza.',
    achievements: [
      'Preservação da unidade da denominação nas províncias',
      'Criação de novos pastorados e pontos de pregação',
      'Fomento das Sociedades de Mulheres e Juventude'
    ]
  }
];

export const MOCK_GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Missão Histórica do Dondi — Katchiungo',
    category: 'Missões Históricas' as const,
    year: '1914 / 2026',
    location: 'Katchiungo, Huambo',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-18544be82d24?auto=format&fit=crop&q=80&w=800',
    description: 'Fotografia da histórica Missão do Dondi, berço do ensino e evangelização congregacional no Planalto Central de Angola.'
  },
  {
    id: 'gal-2',
    title: 'Assembleia Anual do Sínodo Geral',
    category: 'Eventos Sinodais' as const,
    year: '2026',
    location: 'Igreja Central de Luanda',
    imageUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
    description: 'Encontro nacional de delegados, pastores e líderes sinodais na Sede Nacional da IECA em Luanda.'
  },
  {
    id: 'gal-3',
    title: 'Festival de Corais Congregacionais IECA',
    category: 'Cultos & Corais' as const,
    year: '2025',
    location: 'Huambo',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    description: 'Apresentação de corais em trajes tradicionais durante o Festival de Música Sacra do Sínodo Central.'
  },
  {
    id: 'gal-4',
    title: 'Inauguração de Maternidade Missionária',
    category: 'Ação Social' as const,
    year: '2026',
    location: 'Cuito, Bié',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    description: 'Abertura do novo centro de atendimento médico-sanitário para a comunidade rural do Bié.'
  },
  {
    id: 'gal-5',
    title: 'Culto de Ação de Graças na Cidade Alta',
    category: 'Cultos & Corais' as const,
    year: '2025',
    location: 'Cidade Alta, Huambo',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800',
    description: 'Celebração dominical especial reunindo centenas de famílias da comunidade de Macolocolo.'
  },
  {
    id: 'gal-6',
    title: 'Missão do Chilesso e Escola Agrícola',
    category: 'Missões Históricas' as const,
    year: '1932',
    location: 'Andulo, Bié',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    description: 'Arquivo fotográfico da Missão do Chilesso, marco da expansão educacional no centro do país.'
  },
  {
    id: 'gal-7',
    title: 'Encontro da Juventude Congregacional (JUECA)',
    category: 'Eventos Sinodais' as const,
    year: '2026',
    location: 'Benguela',
    imageUrl: juventudePhoto,
    description: 'Acampamento e conferência anual de jovens delegados vindos de mais de 10 províncias.'
  },
  {
    id: 'gal-8',
    title: 'Conferência de Pastores e Secretários Executivos',
    category: 'Diversos & Outros' as const,
    year: '2026',
    location: 'Sede Nacional, Belas',
    imageUrl: secretariosPhoto,
    description: 'Reunião de trabalho e fraternidade entre a liderança executiva e diretores de departamentos da igreja.'
  },
  {
    id: 'gal-9',
    title: 'Corpo Pastoral Congregacional em Luanda',
    category: 'Diversos & Outros' as const,
    year: '2026',
    location: 'Morro Bento II',
    imageUrl: pastoresPhotp,
    description: 'Registo fotográfico do corpo pastoral congregacional durante a jornada de formação contínua.'
  },
  {
    id: 'gal-10',
    title: 'Paisagem da Comunidade de Belas no Por do Sol',
    category: 'Diversos & Outros' as const,
    year: '2026',
    location: 'Belas, Luanda',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800',
    description: 'Vista panorâmica do pôr do sol nos arredores da Sede Nacional da IECA no Morro Bento.'
  }
];

