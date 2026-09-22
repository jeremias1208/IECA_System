import React, { useEffect, useState } from 'react';
import { MOCK_CONGREGATIONS } from '../data/mockData';
import { CongregationCard } from '../components/ui/Cards';
import { Province, Congregation } from '../types';
import { Search, MapPin, Filter, Building2 } from 'lucide-react';
import { fetchCongregations } from '../services/api';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';
import photoCongregacao from '../data/images/mapa.png';

interface CongregationsPageProps {
  onOpenMapModal: (congregation?: Congregation) => void;
}

const PROVINCES: (Province | 'Todas')[] = [
  'Todas',
  'Luanda',
  'Huambo',
  'Benguela',
  'Huíla',
  'Bié',
  'Cabinda',
  'Cuanza Sul',
  'Malanje',
  'Namibe',
  'Uíge'
];

export const CongregationsPage: React.FC<CongregationsPageProps> = ({ onOpenMapModal }) => {
  const { t } = useSitePreferences();
  const [congregations, setCongregations] = useState(MOCK_CONGREGATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<Province | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetchCongregations()
      .then(data => { if (isMounted) setCongregations(data); })
      .catch(() => undefined)
      .finally(() => { if (isMounted) setIsLoading(false); });
    return () => { isMounted = false; };
  }, []);

  const filteredCongregations = congregations.filter(cong => {
    const matchesProvince = selectedProvince === 'Todas' || cong.province === selectedProvince;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || (
      cong.name.toLowerCase().includes(query) ||
      cong.city.toLowerCase().includes(query) ||
      cong.synod.toLowerCase().includes(query) ||
      (cong.pastor ?? '').toLowerCase().includes(query)
    );
    return matchesProvince && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-12 space-y-10">
      <HeroBanner
        eyebrow={t('congregationEyebrow')}
        title={t('congregationTitle')}
        imageSrc={photoCongregacao}
        description={t('congregationDescription')}
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder={t('searchCongregation')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            />
          </div>

          {/* Quick Info Badge */}
          <div className="md:col-span-6 flex items-center justify-end gap-3 text-xs text-ieca-gray">
            <span className="flex items-center gap-1 font-semibold text-ieca-black">
              <Building2 className="w-4 h-4 text-ieca-coral" />
              {filteredCongregations.length} {t('found')}
            </span>
          </div>
        </div>

        {/* Province Chips */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-ieca-black uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-ieca-coral" />
            Filtrar por Província em Angola:
          </span>
          <div className="flex flex-wrap gap-2">
            {PROVINCES.map(prov => (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition-colors ${
                  selectedProvince === prov 
                    ? 'bg-ieca-coral text-white shadow' 
                    : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige border border-ieca-beige'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Congregations List Grid */}
      {isLoading && <p className="text-sm text-ieca-gray">A carregar congregações...</p>}
      {filteredCongregations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCongregations.map(cong => (
            <CongregationCard key={cong.id} item={cong} onSelectMap={(c) => onOpenMapModal(c)} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-card border border-ieca-gray-border space-y-4">
          <MapPin className="w-12 h-12 text-ieca-coral mx-auto opacity-50" />
          <h3 className="font-serif font-bold text-xl text-ieca-black">
            Nenhuma congregação encontrada
          </h3>
          <p className="text-sm text-ieca-gray max-w-md mx-auto">
            Não foram encontradas igrejas registadas com os critérios selecionados. Tente alterar a província ou a palavra-chave de pesquisa.
          </p>
          <button
            onClick={() => { setSelectedProvince('Todas'); setSearchQuery(''); }}
            className="bg-ieca-coral text-white text-xs font-bold px-4 py-2 rounded shadow"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
