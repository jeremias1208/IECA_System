import React, { useEffect, useState } from 'react';
import { MOCK_MINISTRIES } from '../data/mockData';
import { Ministry } from '../types';
import { Users, Heart, Shield, Smile, Music, BookOpen, Compass, HandHeart, CheckCircle2, User } from 'lucide-react';
import { fetchMinistries } from '../services/api';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';
import imgJuventude from '../data/images/Juventude.jpg';

export const MinistriesPage: React.FC = () => {
  const { t } = useSitePreferences();
  const [ministries, setMinistries] = useState<Ministry[]>(MOCK_MINISTRIES);
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry>(MOCK_MINISTRIES[0]);

  useEffect(() => {
    fetchMinistries().then(data => {
      if (data.length > 0) {
        setMinistries(data);
        setSelectedMinistry(data[0]);
      }
    }).catch(() => undefined);
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-12 space-y-10">
      <HeroBanner
        eyebrow={t('ministriesEyebrow')}
        title={t('ministriesTitle')}
        imageSrc={imgJuventude}
        description={t('ministriesDescription')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Selector */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase text-ieca-gray tracking-wider block mb-2">{t('selectMinistry')}</span>
          <div className="space-y-2">
            {ministries.map(min => (
              <button
                key={min.id}
                onClick={() => setSelectedMinistry(min)}
                className={`w-full text-left p-4 rounded-card border transition-all flex items-center justify-between ${
                  selectedMinistry.id === min.id 
                    ? 'bg-ieca-coral text-white border-ieca-coral shadow-md' 
                    : 'bg-white text-ieca-black border-ieca-gray-border hover:bg-ieca-coral-light'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${selectedMinistry.id === min.id ? 'bg-white/20 text-white' : 'bg-ieca-coral/10'}`}>
                    {getIcon(min.iconName)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base">{min.name}</h4>
                    <span className={`text-[11px] ${selectedMinistry.id === min.id ? 'text-white/80' : 'text-ieca-gray'}`}>
                      {min.code}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-card border border-ieca-gray-border shadow-lg overflow-hidden space-y-6">
            <div className="relative h-64 sm:h-80 bg-gray-900">
              <img 
                src={selectedMinistry.image} 
                alt={selectedMinistry.name} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="bg-ieca-coral text-white text-xs font-bold px-3 py-1 rounded">
                  {selectedMinistry.code}
                </span>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mt-1">
                  {selectedMinistry.name}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-xl text-ieca-black">Descrição e Propósito</h3>
                <p className="text-ieca-gray text-base leading-relaxed">
                  {selectedMinistry.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-ieca-beige-light p-4 rounded-md space-y-1">
                  <span className="text-xs font-bold uppercase text-ieca-coral">Público-Alvo:</span>
                  <p className="text-sm font-semibold text-ieca-black">{selectedMinistry.audience}</p>
                </div>

                <div className="bg-ieca-beige-light p-4 rounded-md space-y-1">
                  <span className="text-xs font-bold uppercase text-ieca-coral">Liderança Responsável:</span>
                  <p className="text-sm font-semibold text-ieca-black flex items-center gap-1.5">
                    <User className="w-4 h-4 text-ieca-coral" />
                    <span>{selectedMinistry.leaderName}</span>
                  </p>
                  <span className="text-xs text-gray-500 block">{selectedMinistry.leaderRole}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-serif font-bold text-xl text-ieca-black">Principais Atividades e Programas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedMinistry.activities.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded bg-gray-50 border border-gray-100 text-sm text-ieca-black font-medium">
                      <CheckCircle2 className="w-4 h-4 text-ieca-green flex-shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
