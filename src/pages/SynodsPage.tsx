import React, { useState } from 'react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { MOCK_SYNODS } from '../data/mockData';
import { 
  MapPin, 
  Search, 
  Users, 
  Building, 
  Phone, 
  Mail, 
  ChevronRight, 
  Filter, 
  Sparkles, 
  Globe
} from 'lucide-react';
import { ANGOLA_PROVINCES } from '../data/provinces';
import photoSecretarios from '../data/images/Secreratios.jpg';
import PastorateCard from '../components/ui/PastorateCard';

export const SynodsPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Todas');
  const [selectedRegionType, setSelectedRegionType] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const provincesList = ['Todas', ...ANGOLA_PROVINCES];

  const filteredSynods = MOCK_SYNODS.filter(synod => {
    const matchesProvince = selectedProvince === 'Todas' || synod.province === selectedProvince;
    const matchesType = selectedRegionType === 'Todos' || synod.regionType === selectedRegionType;
    const matchesSearch = 
      synod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      synod.secretaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      synod.headquarters.toLowerCase().includes(searchQuery.toLowerCase()) ||
      synod.pastorates.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.pastor.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesProvince && matchesType && matchesSearch;
  });

  const totalPastoratesCount = MOCK_SYNODS.reduce((acc, s) => acc + s.pastorates.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-16 space-y-12">
      {/* Hero Banner */}
      <HeroBanner
        eyebrow="Estrutura Eclesiástica Regional da IECA"
        title="Sínodos Provinciais & Áreas Missionárias"
        imageSrc={photoSecretarios}
        description="Conheça os órgãos diretivos regionais, os Secretários Provinciais, Representantes Legais e a rede de Pastorados em Angola."
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-card text-white text-xs space-y-2 max-w-sm">
          <div className="flex items-center gap-2 font-bold text-ieca-gold text-sm">
            <Sparkles className="w-4 h-4 text-ieca-gold" />
            <span>Presença Nacional</span>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Supervisão eclesial, expansão missionária e assistência comunitária distribuídas por jurisdições provinciais.
          </p>
        </div>
      </HeroBanner>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-ieca-black text-white p-6 rounded-card border border-gray-800 shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Building className="w-24 h-24 text-ieca-coral" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-ieca-coral">Sínodos Provinciais</span>
          <div className="text-3xl font-extrabold text-white">4 Sínodos</div>
          <p className="text-xs text-gray-400">Luanda, Huambo, Bié e Benguela</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-ieca-black text-white p-6 rounded-card border border-gray-800 shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Globe className="w-24 h-24 text-ieca-gold" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-ieca-gold">Áreas Missionárias</span>
          <div className="text-3xl font-extrabold text-white">1 Área Missionária</div>
          <p className="text-xs text-gray-400">Expansão Leste e Províncias emergentes</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-ieca-black text-white p-6 rounded-card border border-gray-800 shadow-md space-y-2 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Users className="w-24 h-24 text-ieca-green" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-ieca-green">Pastorados Registados</span>
          <div className="text-3xl font-extrabold text-white">{totalPastoratesCount}+ Pastorados</div>
          <p className="text-xs text-gray-400">Comunidades autônomas e pastores instalados</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Pesquisar por Sínodo, Secretário Provincial, Pastorado ou Pastor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-ieca-gray whitespace-nowrap">Tipo:</span>
            <select
              value={selectedRegionType}
              onChange={(e) => setSelectedRegionType(e.target.value)}
              className="px-3.5 py-3 rounded-btn border border-gray-300 text-xs font-semibold text-ieca-black bg-white focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            >
              <option value="Todos">Todos os Tipos</option>
              <option value="Sínodo Provincial">Sínodos Provinciais</option>
              <option value="Área Missionária">Áreas Missionárias</option>
            </select>
          </div>
        </div>

        {/* Province Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold uppercase text-ieca-gray mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-ieca-coral" /> Província:
          </span>
          {provincesList.map(prov => (
            <button
              key={prov}
              onClick={() => setSelectedProvince(prov)}
              className={`px-3.5 py-1.5 rounded-btn font-bold text-xs transition-all ${
                selectedProvince === prov
                  ? 'bg-ieca-coral text-white shadow-sm'
                  : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid of Synods */}
      <div className="space-y-8">
        {filteredSynods.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-card border border-ieca-gray-border space-y-3">
            <Building className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-ieca-black">Nenhum Sínodo encontrado</h3>
            <p className="text-xs text-ieca-gray max-w-sm mx-auto">
              Tente redefinir os filtros por província ou a caixa de pesquisa.
            </p>
          </div>
        ) : (
          filteredSynods.map(synod => (
            <div 
              key={synod.id}
              className="bg-white rounded-card border border-ieca-gray-border shadow-md overflow-hidden hover:shadow-lg transition-all space-y-0"
            >
              {/* Header Ribbon */}
              <div className="bg-gradient-to-r from-gray-900 via-ieca-black to-gray-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-ieca-coral text-white rounded-full">
                      {synod.regionType}
                    </span>
                    <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-ieca-gold rounded-full">
                      Província do {synod.province}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">{synod.name}</h2>
                  <p className="text-xs sm:text-sm text-gray-300 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-ieca-coral flex-shrink-0" />
                    <span>Sede Provincial: <strong>{synod.headquarters}</strong></span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {synod.phone && (
                    <div className="bg-white/10 p-3 rounded-btn text-xs space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Contacto Directo</span>
                      <span className="font-bold text-white flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-ieca-gold" /> {synod.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Secretary Profile Section */}
              <div className="p-6 sm:p-8 bg-ieca-beige-light/50 border-b border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex items-center gap-4">
                  <img 
                    src={synod.secretaryPhoto} 
                    alt={synod.secretaryName} 
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-ieca-gold shadow-md flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-ieca-coral block">
                      {synod.secretaryTitle}
                    </span>
                    <h3 className="font-bold text-lg text-ieca-black leading-snug">{synod.secretaryName}</h3>
                    {synod.email && (
                      <span className="text-xs text-ieca-gray flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-ieca-coral" /> {synod.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-8 p-4 bg-white rounded-card border border-gray-200 text-xs text-ieca-gray leading-relaxed space-y-2">
                  <span className="font-bold text-ieca-black block">Resumo de Atividade & Responsabilidade Pastoral:</span>
                  <p>{synod.secretaryBio}</p>
                </div>
              </div>

              {/* Pastorates Grid */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="font-extrabold text-base text-ieca-black flex items-center gap-2">
                    <Building className="w-5 h-5 text-ieca-coral" />
                    Pastorados que Compõem o {synod.name} ({synod.pastorates.length})
                  </h4>
                  <span className="text-xs text-ieca-gray font-medium hidden sm:inline">
                    Comunidades autônomas e respetivos pastores instalados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {synod.pastorates.map((pastorate) => (
    <PastorateCard
      key={pastorate.id}
      pastorate={pastorate}
    />
  ))}
</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Banner */}
      <div className="bg-ieca-black text-white p-8 rounded-card border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h3 className="text-xl font-extrabold text-white">Deseja contactar a Sede Geral ou um Sínodo Provincial?</h3>
          <p className="text-xs text-gray-300">
            Aceda ao localizador de congregações para consultar horários de cultos, moradas e mapas detalhados em Angola.
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('congregacoes')}
            className="px-6 py-3 bg-ieca-coral hover:bg-red-700 text-white font-bold text-xs rounded-btn transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <span>Ver Mapa de Congregações</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
