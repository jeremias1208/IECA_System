import React, { useEffect, useState } from 'react';
import { MOCK_LEADERSHIP } from '../data/mockData';
import { fetchLeadership } from '../services/api';
import { LeadershipMember } from '../types';
import { 
  Shield, 
  Heart, 
  Award, 
  Users, 
  CreditCard, 
  DollarSign, 
  GraduationCap, 
  MapPin, 
  FileCheck
} from 'lucide-react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';
import imgDondi from '../data/images/dondi.png';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { t } = useSitePreferences();
  const [leadership, setLeadership] = useState<LeadershipMember[]>(MOCK_LEADERSHIP);

  useEffect(() => {
    fetchLeadership().then(data => {
      if (data.length > 0) setLeadership(data);
    }).catch(() => undefined);
  }, []);

  const timelineEvents = [
    {
      year: '11 de Novembro de 1880',
      title: 'Fundação da IECA',
      description: 'Fundada por missionários americanos e canadenses, dando início ao trabalho de evangelização, alfabetização e tradução da Bíblia para as línguas nacionais em Angola.'
    },
    {
      year: '1914',
      title: 'Criação das Missões Históricas (Dondi & Chilesso)',
      description: 'Estabelecimento dos grandes complexos de ensino técnico, saúde materna, agricultura e seminários no Planalto Central.'
    },
    {
      year: '1975',
      title: 'Autonomia e Nacionalização da Liderança',
      description: 'Transição para a plena autonomia eclesiástica sob liderança angolana, promovendo a paz, unidade e reconciliação nacional.'
    },
    {
      year: '2026',
      title: 'Modernização & Ecossistema Digital',
      description: 'Consolidação da presença em 18 províncias, expansão da rede escolar/hospitalar e lançamento da plataforma digital institucional a partir da Sede Nacional no Morro Bento II, Luanda.'
    }
  ];

  const foundingMissions = [
    { year: '1881', name: 'Missão Evangélica de Chilume-Bailundo', province: 'Huambo' },
    { year: '1884', name: 'Missão Evangélica de Camundongo', province: 'Bié' },
    { year: '1888', name: 'Missão Evangélica de Chissamba', province: 'Bié' },
    { year: '1904', name: 'Missão Evangélica de Chilesso', province: 'Bié' },
    { year: '1906', name: 'Missão Evangélica do Elende', province: 'Huambo' },
    { year: '1914', name: 'Instituto Currie do Dondi', province: 'Huambo' },
    { year: '1916', name: 'Escola Means (Dondi)', province: 'Huambo' },
    { year: '1918', name: 'Missão Evangélica de Silva Porto', province: 'Bié' },
    { year: '1920', name: 'Missão Evangélica de Lutamo/Dondi', province: 'Huambo' },
    { year: '1923', name: 'Missão Evangélica do Bunjei', province: 'Huíla' },
    { year: '1924', name: 'Missão Evangélica do Lobito', province: 'Benguela' },
    { year: '1926', name: 'Missão Evangélica de Nova Lisboa', province: 'Huambo' }
  ];

  const generalSecretaries = [
    { number: '1º', name: 'Sua Revma. Jessé Chiula Chipenda', period: '1956–1967' },
    { number: '2º', name: 'Sua Revma. Ricardo Uliengue Epalanga', period: '1967–1977' },
    { number: '3º', name: 'Sua Revma. Henrique Etaungo Daniel', period: '1978–1983' },
    { number: '4º', name: 'Sua Revma. Júlio Francisco Muehombo', period: '1983–1997' },
    { number: '5º', name: 'Sua Revma. José Belo Chipenda', period: '1997–2004' },
    { number: '6º', name: 'Sua Revma. Augusto Chipesse', period: '2004–2014' },
    { number: '7º', name: 'Sua Revma. André Cangovi Eurico', period: '2014–2024' },
    { number: '8º', name: 'Sua Revma. Luciano Chanhelela Chianeque', period: '2024–presente' }
  ];

  const organizationalLevels = [
    { name: 'Assembleia Geral', tag: 'Supremo Órgão Deliberativo', desc: 'Reúne-se bienalmente para definir as grandes diretrizes teológicas, estratégicas e administrativas da igreja.' },
    { name: 'Comissão Executiva Geral', tag: 'Gestão Executiva', desc: 'Monitora e garante o cumprimento das resoluções aprovadas na Assembleia Geral.' },
    { name: 'Sínodo Geral', tag: 'Órgão Superior Nacional', desc: 'Congrega e coordena todos os Sínodos Provinciais e Áreas Missionárias em Angola.' },
    { name: 'Sínodo Provincial', tag: 'Nível Provincial', desc: 'Supervisiona as atividades eclesiais e sociais circunscritas a uma província administrativa.' },
    { name: 'Sínodo Local', tag: 'Nível Regional', desc: 'Reúne os diversos Pastorados situados numa determinada região geográfica.' },
    { name: 'Pastorado', tag: 'Comunidade Autónoma', desc: 'Comunidade eclesiástica com comprovada maturidade espiritual, pastoral e capacidade económica.' },
    { name: 'Congregação', tag: 'Igreja Local', desc: 'Comunidade organizada de crentes onde decorre a vida de culto, batismos, Santa Ceia e comunhão.' },
    { name: 'Ponto de Pregação', tag: 'Fase Inicial', desc: 'Comunidade de fé nascente em processo de estruturação espiritual e comunitária.' }
  ];

  const memberCategories = [
    { name: 'Crianças', desc: 'Filhos de membros acompanhados no ensino bíblico infantil.' },
    { name: 'Ouvintes', desc: 'Visitantes e interessados em conhecer a Palavra de Deus.' },
    { name: 'Catecúmenos', desc: 'Crentes em formação doutrinária para o baptismo e profissão de fé.' },
    { name: 'Membros à Prova', desc: 'Membros em período de integração e avaliação comunitária.' },
    { name: 'Membros sob Disciplina', desc: 'Membros em processo de restauração espiritual e doutrinária.' },
    { name: 'Membros em Plena Comunhão', desc: 'Membros efectivos com plenitude de direitos e deveres na igreja.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-12 space-y-16">
      {/* 1. IDENTIDADE E PROPÓSITO */}
      <HeroBanner
        eyebrow={t('aboutEyebrow')}
        title={t('aboutTitle')}
        imageSrc={imgDondi}
        description={t('aboutDescription')}
        footer={<span className="flex items-center gap-2 text-xs text-ieca-beige"><MapPin className="w-4 h-4 text-ieca-coral" /><strong>Sede Nacional:</strong> Luanda, Município de Belas, Bairro Morro Bento II, Rua das Mangueirinhas</span>}
      />

      {/* ORIGEM NO AMBIENTE RURAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 rounded-card border border-ieca-gray-border shadow-sm">
        <div className="lg:col-span-6 overflow-hidden rounded-card border border-ieca-beige shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80"
            alt="Ambiente rural angolano onde a IECA começou"
            className="w-full h-[320px] object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
            Origem no Ambiente Rural
          </span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Onde a IECA nasceu e cresceu
          </h2>
          <p className="text-ieca-gray text-sm leading-relaxed">
            As primeiras comunidades da IECA surgiram em zonas rurais, entre famílias, aldeias e campos de trabalho, onde a Palavra de Deus encontrou terreno fértil para transformar vida, cultura e esperança.
          </p>
          <p className="text-ieca-gray text-sm leading-relaxed">
            Foi nesse contexto de simplicidade, trabalho e resistência que nasceu a missão congregacional em Angola, com forte presença na educação, na saúde e no serviço à comunidade.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="bg-ieca-green-light text-ieca-green text-[11px] font-bold px-2.5 py-1 rounded-full">Aldeias</span>
            <span className="bg-ieca-coral-light text-ieca-coral text-[11px] font-bold px-2.5 py-1 rounded-full">Missionação Rural</span>
            <span className="bg-gray-100 text-ieca-black text-[11px] font-bold px-2.5 py-1 rounded-full">Serviço Comunitário</span>
          </div>
        </div>
      </div>

      {/* MISSÃO, VISÃO E VALORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-card border-t-4 border-ieca-coral shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-ieca-coral/10 text-ieca-coral flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-ieca-black">Nossa Missão</h3>
          <p className="text-ieca-gray text-sm leading-relaxed">
            Pregar o Evangelho transformador de Jesus Cristo, edificar espiritualmente os crentes, promover a justiça social e prestar serviços relevantes nas áreas da educação, saúde e ação comunitária em Angola.
          </p>
        </div>

        <div className="bg-white p-8 rounded-card border-t-4 border-ieca-green shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-ieca-green-light text-ieca-green flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-ieca-black">Nossa Visão</h3>
          <p className="text-ieca-gray text-sm leading-relaxed">
            Ser uma igreja viva, unida, auto-sustentada e profundamente enraizada na fé, sendo uma voz de esperança, reconciliação e progresso integral para toda a sociedade angolana.
          </p>
        </div>

        <div className="bg-white p-8 rounded-card border-t-4 border-ieca-black shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-ieca-black flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-ieca-black">Valores Fundamentais</h3>
          <ul className="text-ieca-gray text-xs space-y-2">
            <li className="flex items-center gap-2">✓ Supremacia da Palavra de Deus (Bíblia Inerrante)</li>
            <li className="flex items-center gap-2">✓ Amor, Solidariedade e Serviço ao Próximo</li>
            <li className="flex items-center gap-2">✓ Integridade e Transparência na Gestão</li>
            <li className="flex items-center gap-2">✓ Defesa da Família e Dignidade Humana</li>
          </ul>
        </div>
      </div>

      {/* CRONOLOGIA HISTÓRICA */}
      <div className="bg-ieca-beige-light p-8 sm:p-12 rounded-card border border-ieca-beige space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Cronologia Histórica</span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Nossa Jornada Centenária (Desde 1880)
          </h2>
          <p className="text-sm text-ieca-gray">
            Marcos da presença e expansão congregacional em Angola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineEvents.map((evt, idx) => (
            <div key={idx} className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-3 relative">
              <span className="text-xs font-bold uppercase text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded inline-block">
                {evt.year}
              </span>
              <h3 className="font-serif font-bold text-lg text-ieca-black leading-snug">
                {evt.title}
              </h3>
              <p className="text-xs text-ieca-gray leading-relaxed">
                {evt.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FUNDAÇÃO DAS MISSÕES E INSTITUIÇÕES */}
      <div className="bg-white p-8 sm:p-12 rounded-card border border-ieca-gray-border shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Memória Institucional</span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Fundação de Missões e Instituições
          </h2>
          <p className="text-sm text-ieca-gray leading-relaxed">
            Depois da fundação da IECA, em 1880, o trabalho missionário expandiu-se a partir das comunidades rurais para diferentes regiões de Angola. Estas missões e instituições foram espaços de evangelização, educação, formação profissional, assistência social e cuidado de saúde, tornando-se parte essencial da história da igreja.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foundingMissions.map(mission => (
            <div key={`${mission.year}-${mission.name}`} className="p-4 bg-ieca-beige-light/60 rounded-card border border-ieca-beige space-y-2">
              <span className="inline-block text-xs font-bold text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                {mission.year}
              </span>
              <h3 className="font-serif font-bold text-base text-ieca-black leading-snug">
                {mission.name}
              </h3>
              <p className="text-xs text-ieca-gray">Província do {mission.province}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SUCESSÃO DOS SECRETÁRIOS GERAIS */}
      <div className="bg-ieca-black text-white p-8 sm:p-12 rounded-card border-l-4 border-ieca-green space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-green">Continuidade da Liderança</span>
          <h2 className="font-serif font-bold text-3xl text-white">
            Secretários Gerais da IECA
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Até 1956, a liderança da igreja foi exercida por missionários estrangeiros. A partir desse ano, a direção da IECA passou a ser confiada a líderes angolanos, afirmando a autonomia eclesiástica e fortalecendo a identidade nacional da igreja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {generalSecretaries.map(secretary => (
            <div key={secretary.number} className="flex items-start gap-4 bg-gray-900 p-4 rounded-card border border-gray-800">
              <span className="w-9 h-9 flex-shrink-0 rounded-full bg-ieca-green text-white font-bold text-xs flex items-center justify-center">
                {secretary.number}
              </span>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-white">{secretary.name}</h3>
                <p className="text-xs text-ieca-green font-semibold">{secretary.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PRINCÍPIOS E DECLARAÇÃO DE FÊ */}
      <div className="bg-white p-8 sm:p-12 rounded-card border border-ieca-gray-border shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Fundamentação Teológica</span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Princípios & Declaração de Fé
          </h2>
          <p className="text-ieca-gray text-sm leading-relaxed">
            A IECA professa a fé evangélica congregacional estruturada em 8 princípios doutrinários inegociáveis:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-coral uppercase tracking-wider">1. Deus Vivo & Trindade</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Crença num só Deus vivo, eterno, amoroso, justo e misericordioso, revelado na Trindade: Pai, Filho e Espírito Santo.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-coral uppercase tracking-wider">2. Revelação Divina</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Deus revela-se na natureza, na história, no coração humano e plenamente na pessoa de Jesus Cristo.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-coral uppercase tracking-wider">3. Bíblia Sagrada</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              A Palavra de Deus inspirada, inerrante e a única regra suprema de fé, doutrina e conduta cristã.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-coral uppercase tracking-wider">4. Pecado & Salvação</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Todos pecaram e carecem da glória de Deus; a salvação é concedida exclusivamente pela graça, mediante a fé em Jesus Cristo.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-green uppercase tracking-wider">5. Sacramentos</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Prática solene de dois sacramentos: o <strong>Baptismo (por aspersão)</strong> e a <strong>Santa Ceia do Senhor</strong>.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-green uppercase tracking-wider">6. Domingo (Dia do Senhor)</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Dia consagrado ao culto público, adoração, comunhão fraterna e atividades espirituais.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-green uppercase tracking-wider">7. Família Cristã</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Baseada no casamento sagrado entre um homem e uma mulher, reconhecida como a célula vital da sociedade.
            </p>
          </div>

          <div className="p-5 bg-ieca-beige-light/60 rounded-card space-y-2 border border-ieca-beige">
            <div className="text-xs font-bold text-ieca-green uppercase tracking-wider">8. Ressurreição & Eternidade</div>
            <p className="text-xs text-ieca-black leading-relaxed">
              Firme crença na ressurreição dos mortos, no juízo final e na vida eterna em glória com Deus.
            </p>
          </div>
        </div>
      </div>

      {/* SÍNODOS PROVINCIAIS E ÁREAS MISSIONÁRIAS CARD BANNER */}
      <div id="sinodos-provinciais" className="bg-gradient-to-r from-gray-900 via-ieca-black to-gray-900 text-white p-8 sm:p-10 rounded-card border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl text-center md:text-left z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-gold bg-ieca-gold/10 px-3 py-1 rounded-full border border-ieca-gold/20">
            Estrutura Institucional Regional
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
            Sínodos Provinciais & Áreas Missionárias
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Conheça os Sínodos Provinciais (Luanda, Huambo, Bié, Benguela), Áreas Missionárias, Secretários Provinciais, Representantes Legais e a lista completa de Pastorados com filtro por província.
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('synodos')}
            className="z-10 px-6 py-3.5 bg-ieca-coral hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-btn shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>Ver Sínodos & Pastorados por Província</span>
            <span className="text-sm">→</span>
          </button>
        )}
      </div>

      {/* 3. ESTRUTURA ORGANIZACIONAL (8 NÍVEIS) */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Governo Eclesiástico</span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Estrutura Organizacional em 8 Níveis
          </h2>
          <p className="text-sm text-ieca-gray">
            Modelo democrático e congregacional que rege a igreja desde a Assembleia Geral até aos Pontos de Pregação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {organizationalLevels.map((lvl, idx) => (
            <div key={idx} className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-2 hover:border-ieca-coral transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-ieca-coral text-white font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-bold uppercase text-ieca-coral bg-ieca-coral/10 px-2 py-0.5 rounded">
                  {lvl.tag}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-ieca-black pt-2">{lvl.name}</h3>
              <p className="text-xs text-ieca-gray leading-relaxed">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LIDERANÇA E REPRESENTAÇÃO */}
      <div className="bg-ieca-black text-white p-8 sm:p-12 rounded-card space-y-8 border-l-4 border-ieca-coral">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Governança Institucional</span>
          <h2 className="font-serif font-bold text-3xl text-white">
            Liderança e Representação Legal
          </h2>
          <p className="text-xs text-gray-300">
            Estrutura de mandato executivo sob governança transparente do Estatuto da IECA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
          <div className="bg-gray-900 p-5 rounded-card space-y-2 border border-gray-800">
            <span className="font-serif font-bold text-base text-ieca-coral block">Secretário Geral</span>
            <p>Principal representante legal da IECA. Eleito para mandatos de 5 anos, renováveis uma única vez.</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-card space-y-2 border border-gray-800">
            <span className="font-serif font-bold text-base text-ieca-green block">Secretário Executivo</span>
            <p>Substituto direto do Secretário Geral e responsável pela coordenação do Gabinete Executivo Nacional.</p>
          </div>

          <div className="bg-gray-900 p-5 rounded-card space-y-2 border border-gray-800">
            <span className="font-serif font-bold text-base text-ieca-beige block">Secretários Provinciais</span>
            <p>Representantes legais da igreja nas províncias de Angola, eleitos pelas respetivas Assembleias Provinciais.</p>
          </div>
        </div>

        {/* Liderança Executiva Cards */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {leadership.map(lead => (
            <div key={lead.id} className="bg-black/60 rounded-card p-5 border border-gray-800 text-center space-y-3">
              <img 
                src={lead.photo} 
                alt={lead.name} 
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-ieca-coral"
              />
              <div>
                <h4 className="font-serif font-bold text-base text-white">{lead.name}</h4>
                <span className="text-xs text-ieca-coral font-semibold block">{lead.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 & 6. MEMBROS DA IGREJA E DOCUMENTOS DE IDENTIFICAÇÃO */}
      <div className="bg-ieca-beige-light p-8 sm:p-12 rounded-card border border-ieca-beige space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-ieca-coral">Comunhão e Cidadania Eclesial</span>
          <h2 className="font-serif font-bold text-3xl text-ieca-black">
            Membros & Documentos de Identificação
          </h2>
          <p className="text-sm text-ieca-gray">
            A IECA acolhe os seus fiéis em categorias claras com direitos, deveres e documentação oficial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Categorias de Membros */}
          <div className="bg-white p-6 rounded-card border border-ieca-gray-border space-y-4">
            <h3 className="font-serif font-bold text-xl text-ieca-black flex items-center gap-2">
              <Users className="w-5 h-5 text-ieca-coral" />
              <span>Categorias de Membros</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {memberCategories.map((cat, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded border border-gray-100">
                  <strong className="block text-ieca-black">{cat.name}</strong>
                  <span className="text-gray-500 text-[11px]">{cat.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documentos Oficiais */}
          <div className="bg-white p-6 rounded-card border border-ieca-gray-border space-y-4">
            <h3 className="font-serif font-bold text-xl text-ieca-black flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-ieca-green" />
              <span>Documentos Oficiais Emitidos</span>
            </h3>
            <ul className="space-y-3 text-xs text-ieca-black">
              <li className="flex items-start gap-2.5 p-3 bg-ieca-green-light/40 rounded">
                <FileCheck className="w-4 h-4 text-ieca-green flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cartão de Membro Catecúmeno:</strong> Para fiéis em curso de formação bíblica para o baptismo.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 bg-ieca-coral-light/40 rounded">
                <FileCheck className="w-4 h-4 text-ieca-coral flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cartão de Membro Efectivo:</strong> Emissão exclusiva para membros em plena comunhão.
                </div>
              </li>
              <li className="flex items-start gap-2.5 p-3 bg-gray-100 rounded">
                <FileCheck className="w-4 h-4 text-ieca-black flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Credencial para Funções Especiais:</strong> Documento de nomeação renovável anualmente.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7 & 8. FINANCIAMENTO, PATRIMÓNIO E ÁREA SOCIAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sustentabilidade */}
        <div className="bg-white p-8 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-full bg-ieca-coral/10 text-ieca-coral flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-ieca-black">Financiamento e Património</h3>
          <p className="text-xs text-ieca-gray leading-relaxed">
            As fontes de receita da IECA assentam no cumprimento bíblico dos dízimos, ofertas voluntárias, contribuições dos membros, doações, subsídios estatais e parcerias nacionais e internacionais.
          </p>
          <div className="p-4 bg-ieca-beige-light rounded text-xs text-ieca-black space-y-1">
            <strong>Representação Contratual:</strong>
            <p className="text-gray-600">Contratos patrimoniais são formalmente validados pelo Secretário Geral (Nacional) ou Secretários Provinciais.</p>
          </div>
        </div>

        {/* Área Social e Ensino */}
        <div className="bg-white p-8 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-full bg-ieca-green-light text-ieca-green flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-2xl text-ieca-black">Rede Social & Institucional</h3>
          <p className="text-xs text-ieca-gray leading-relaxed">
            A IECA é proprietária e gestora de uma vasta rede de serviços sociais em Angola:
          </p>
          <ul className="grid grid-cols-2 gap-2 text-xs text-ieca-black font-medium">
            <li className="p-2 bg-gray-50 rounded">🏫 Escolas & Creches</li>
            <li className="p-2 bg-gray-50 rounded">📖 Seminários Teológicos</li>
            <li className="p-2 bg-gray-50 rounded">🛠️ Centros Profissionais</li>
            <li className="p-2 bg-gray-50 rounded">🏥 Hospitais & Postos</li>
            <li className="p-2 bg-gray-50 rounded">🎓 Ensino Superior</li>
            <li className="p-2 bg-gray-50 rounded">🤝 Parcerias Sociais</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
