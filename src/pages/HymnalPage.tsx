import { useState, useEffect, useRef } from 'react';
import { fetchHinos, fetchRouteItems, LiturgicalItem } from '../services/hinarioApi';
import { Hymn } from '../types';
import { HtmlView } from '../components/ui/HtmlView';
import { HeroBanner } from '../components/ui/HeroBanner';
import { useSitePreferences } from '../context/SitePreferencesContext';
import { Search, Volume2, Copy, Check, Plus, Minus, Music, Wifi, WifiOff, Globe, Star, Printer, Square } from 'lucide-react';
import photoHinario from '../data/images/Juventude.jpg';

type SectionTab = 'hinos' | 'litanias' | 'oracoes' | 'invocatorias' | 'salmos' | 'favoritos';

export const HymnalPage = () => {
  const { t } = useSitePreferences();
  const [activeSection, setActiveSection] = useState<SectionTab>('hinos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Todos');
  
  // Data states
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [liturgicalItems, setLiturgicalItems] = useState<LiturgicalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ieca-favorite-hymns');
      return stored ? JSON.parse(stored) : ['1', '2', '3'];
    } catch {
      return ['1', '2', '3'];
    }
  });

  // Selected item state
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [selectedLiturgical, setSelectedLiturgical] = useState<LiturgicalItem | null>(null);
  
  const [fontSize, setFontSize] = useState<number>(16);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const categories = ['Todas', 'Louvor', 'Oração', 'Ação de Graças', 'Natal', 'Páscoa', 'Missões', 'Fé & Confiança'];

  useEffect(() => {
    try {
      localStorage.setItem('ieca-favorite-hymns', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Load data based on active section
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (activeSection === 'hinos' || activeSection === 'favoritos') {
      fetchHinos().then(data => {
        if (isMounted) {
          setHymns(data);
          if (activeSection === 'favoritos') {
            const favHymns = data.filter(h => favorites.includes(h.id) || favorites.includes(String(h.number)));
            setSelectedHymn(favHymns[0] || data[0] || null);
          } else {
            setSelectedHymn(data[0] || null);
          }
          setApiConnected(data.some(h => h.id.startsWith('hymn-api-') || typeof h.id === 'number'));
          setLoading(false);
        }
      });
    } else {
      fetchRouteItems(activeSection).then(data => {
        if (isMounted) {
          setLiturgicalItems(data);
          setSelectedLiturgical(data[0] || null);
          setApiConnected(data.some(d => d.id.toString().startsWith(`${activeSection}-`) || typeof d.id === 'number'));
          setLoading(false);
        }
      });
    }

    return () => { isMounted = false; };
  }, [activeSection]);

  const handleStopAudio = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // ignore
      }
      audioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const handlePlayMelody = () => {
    if (!selectedHymn) return;
    if (isPlayingAudio) {
      handleStopAudio();
      return;
    }

    setIsPlayingAudio(true);
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const notes = selectedHymn.audioMelody || [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle'; // Organ-like warmth
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx + 1) * 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.4);
        osc.stop(ctx.currentTime + (idx + 1) * 0.4);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
        audioCtxRef.current = null;
      }, notes.length * 400 + 400);
    } catch {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };


  const filteredHymns = hymns.filter(hymn => {
    const matchesCategory = selectedCategory === 'Todas' || hymn.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'Todos' || hymn.idioma === selectedLanguage;
    const matchesSearch = 
      hymn.number.toString().includes(searchQuery) ||
      hymn.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hymn.htmlContent && hymn.htmlContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
      hymn.lyrics.some(stanza => stanza.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const filteredLiturgical = liturgicalItems.filter(item => {
    const matchesLanguage = selectedLanguage === 'Todos' || item.idioma === selectedLanguage;
    const matchesSearch = 
      (item.number ? item.number.toString().includes(searchQuery) : false) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.htmlContent && item.htmlContent.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.content.some(line => line.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLanguage && matchesSearch;
  });

  const handleCopyText = () => {
    let text = '';
    if (activeSection === 'hinos' && selectedHymn) {
      text = `Hino Nº ${selectedHymn.number} - ${selectedHymn.title} (${selectedHymn.idioma || 'Português'})\nHinário Digital IECA\n\n` + 
        (selectedHymn.htmlContent ? selectedHymn.htmlContent.replace(/<[^>]*>/g, '\n') : selectedHymn.lyrics.join('\n\n'));
    } else if (selectedLiturgical) {
      text = `${selectedLiturgical.title} (${selectedLiturgical.idioma || 'Português'})\nHinário Digital IECA\n\n` + 
        (selectedLiturgical.htmlContent ? selectedLiturgical.htmlContent.replace(/<[^>]*>/g, '\n') : selectedLiturgical.content.join('\n\n'));
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-12 space-y-10">
      <HeroBanner
        eyebrow={t('hymnalEyebrow')}
        title={t('hymnalTitle')}
        imageSrc= {photoHinario}
        description={t('hymnalDescription')}
      >
        <div className="bg-gray-900 border border-gray-800 p-3.5 rounded-card text-xs flex items-center gap-3 flex-shrink-0">
          {apiConnected ? (
            <>
              <Wifi className="w-5 h-5 text-ieca-green animate-pulse" />
              <div>
                <span className="block font-bold text-ieca-green">Servidor API Online</span>
                <span className="text-[10px] text-gray-400">API local IECA</span>
              </div>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-ieca-coral" />
              <div>
                <span className="block font-bold text-ieca-coral">Modo Fallback</span>
                <span className="text-[10px] text-gray-400">Usando Dados Integrados</span>
              </div>
            </>
          )}
        </div>
      </HeroBanner>

      {/* Main Section Navigation Tabs (6 Routes) */}
      <div className="bg-white p-4 rounded-card border border-ieca-gray-border shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveSection('hinos'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all ${
              activeSection === 'hinos' 
                ? 'bg-ieca-coral text-white shadow-md' 
                : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
            }`}
          >
            Hinos 
          </button>

          <button
            onClick={() => { setActiveSection('litanias'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all ${
              activeSection === 'litanias' 
                ? 'bg-ieca-coral text-white shadow-md' 
                : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
            }`}
          >
             Litanias
          </button>

          <button
            onClick={() => { setActiveSection('oracoes'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all ${
              activeSection === 'oracoes' 
                ? 'bg-ieca-coral text-white shadow-md' 
                : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
            }`}
          >
            Orações
          </button>

          <button
            onClick={() => { setActiveSection('invocatorias'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all ${
              activeSection === 'invocatorias' 
                ? 'bg-ieca-coral text-white shadow-md' 
                : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
            }`}
          >
            Invocatórias 
          </button>

          <button
            onClick={() => { setActiveSection('salmos'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all ${
              activeSection === 'salmos' 
                ? 'bg-ieca-coral text-white shadow-md' 
                : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
            }`}
          >
            Salmos 
          </button>

          <button
            onClick={() => { setActiveSection('favoritos'); setSearchQuery(''); }}
            className={`px-4 py-2.5 rounded-btn font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
              activeSection === 'favoritos' 
                ? 'bg-ieca-gold text-white shadow-md' 
                : 'bg-ieca-gold-light text-ieca-gold hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Favoritos</span>
            <span className="ml-1 text-[10px] bg-white/30 px-1.5 py-0.5 rounded-full font-extrabold">{favorites.length}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Left Column: List & Filter */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                placeholder={t('searchContent')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
              />
            </div>

            {/* Language Filter */}
            <div className="flex flex-wrap items-center justify-between pt-1 text-xs">
              <span className="font-bold text-ieca-gray flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-ieca-coral" />
                Idioma:
              </span>
              <div className="flex flex-wrap pt-1.5 gap-1.5">
                {['Todos', 'Português', 'Umbundu', 'Ngangela', 'Kimbundu', 'Kikongo', 'Kwanyama', 'Adicionais'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                      selectedLanguage === lang 
                        ? 'bg-ieca-black text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {(activeSection === 'hinos' || activeSection === 'favoritos') && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold uppercase text-ieca-gray tracking-wider">Categorias de Hinos:</span>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-ieca-coral text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* List Display */}
          <div className="bg-white rounded-card border border-ieca-gray-border shadow-sm divide-y max-h-[500px] overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-sm text-ieca-gray animate-pulse">
                A carregar dados de /api/hinario/{activeSection}...
              </div>
            ) : (activeSection === 'hinos' || activeSection === 'favoritos') ? (
              (activeSection === 'favoritos' ? filteredHymns.filter(h => favorites.includes(h.id) || favorites.includes(String(h.number))) : filteredHymns).length > 0 ? (
                (activeSection === 'favoritos' ? filteredHymns.filter(h => favorites.includes(h.id) || favorites.includes(String(h.number))) : filteredHymns).map(hymn => {
                  const isFav = favorites.includes(hymn.id) || favorites.includes(String(hymn.number));
                  return (
                    <div
                      key={hymn.id}
                      onClick={() => setSelectedHymn(hymn)}
                      className={`w-full text-left p-4 hover:bg-ieca-coral-light transition-colors flex items-center justify-between cursor-pointer ${
                        selectedHymn?.id === hymn.id ? 'bg-ieca-coral-light border-l-4 border-ieca-coral font-semibold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-ieca-beige text-ieca-black flex items-center justify-center text-xs font-bold border border-ieca-beige flex-shrink-0">
                          Nº {hymn.number}
                        </span>
                        <div>
                          <h4 className="font-serif text-base text-ieca-black line-clamp-1">{hymn.title}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-ieca-gray mt-0.5">
                            <span>{hymn.category}</span>
                            <span>•</span>
                            <span className="text-ieca-coral font-medium">{hymn.idioma || 'Português'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(hymn.id); }}
                          className="p-1 hover:bg-amber-100 rounded text-amber-500"
                          title={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        >
                          <Star className={`w-4 h-4 ${isFav ? 'fill-current text-amber-500' : 'text-gray-300'}`} />
                        </button>
                        <Music className="w-4 h-4 text-ieca-coral opacity-60" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-sm text-ieca-gray">
                  {activeSection === 'favoritos' ? 'Nenhum hino guardado nos favoritos. Clique na estrela ⭐ para guardar os seus hinos favoritos.' : 'Nenhum hino encontrado.'}
                </div>
              )
            ) : (
              filteredLiturgical.length > 0 ? (
                filteredLiturgical.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLiturgical(item)}
                    className={`w-full text-left p-4 hover:bg-ieca-coral-light transition-colors flex items-center justify-between ${
                      selectedLiturgical?.id === item.id ? 'bg-ieca-coral-light border-l-4 border-ieca-coral font-semibold' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-ieca-green-light text-ieca-green flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {item.number || '•'}
                      </span>
                      <div>
                        <h4 className="font-serif text-base text-ieca-black line-clamp-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-ieca-gray mt-0.5">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span className="text-ieca-green font-medium">{item.idioma || 'Português'}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-sm text-ieca-gray">Nenhum item litúrgico encontrado.</div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Reader Display using HtmlView */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-card border border-ieca-gray-border shadow-lg p-6 sm:p-8 space-y-6 sticky top-24">
            {(activeSection === 'hinos' || activeSection === 'favoritos') && selectedHymn ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                        {selectedHymn.category}
                      </span>
                      <span className="text-xs font-bold text-ieca-black bg-ieca-beige border border-ieca-beige px-2.5 py-1 rounded flex items-center gap-1">
                        <Globe className="w-3 h-3 text-ieca-coral" />
                        {selectedHymn.idioma || 'Português'}
                      </span>
                    </div>
                    
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ieca-black mt-2">
                      Hino Nº {selectedHymn.number} — {selectedHymn.title}
                    </h2>
                    {selectedHymn.composer && (
                      <p className="text-xs text-ieca-gray mt-1">Autor: {selectedHymn.composer} • Tom: {selectedHymn.key || 'Dó Maior'}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => toggleFavorite(selectedHymn.id)}
                      className={`p-2.5 rounded-full border transition-colors ${
                        favorites.includes(selectedHymn.id) || favorites.includes(String(selectedHymn.number))
                          ? 'bg-amber-50 border-amber-300 text-amber-500'
                          : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-amber-500'
                      }`}
                      title="Guardar nos Favoritos"
                    >
                      <Star className={`w-4 h-4 ${favorites.includes(selectedHymn.id) || favorites.includes(String(selectedHymn.number)) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handlePlayMelody}
                      className={`p-2.5 rounded-full ${
                        isPlayingAudio ? 'bg-ieca-green text-white shadow-lg' : 'bg-ieca-coral text-white hover:bg-ieca-coral-hover'
                      } shadow transition-colors flex items-center gap-1.5 text-xs font-bold px-3.5`}
                      title={isPlayingAudio ? "Parar Melodia" : "Ouvir Melodia de Órgão"}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>Parar</span>
                          <div className="flex items-center gap-0.5 ml-1 h-3">
                            <span className="w-0.5 bg-white animate-sound-wave-1 rounded-full"></span>
                            <span className="w-0.5 bg-white animate-sound-wave-2 rounded-full"></span>
                            <span className="w-0.5 bg-white animate-sound-wave-3 rounded-full"></span>
                            <span className="w-0.5 bg-white animate-sound-wave-4 rounded-full"></span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          <span>Ouvir</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleCopyText}
                      className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-ieca-black transition-colors"
                      title="Copiar texto do hino"
                    >
                      {copied ? <Check className="w-4 h-4 text-ieca-green" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-ieca-black transition-colors no-print"
                      title="Imprimir Hino"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>


                {/* Font Size Toolbar */}
                <div className="flex items-center justify-between text-xs text-gray-500 bg-ieca-beige-light p-2.5 rounded-md">
                  <span className="font-semibold text-ieca-black">Tamanho da Letra:</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-1 rounded bg-white border border-gray-300">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-ieca-black">{fontSize}px</span>
                    <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="p-1 rounded bg-white border border-gray-300">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* HtmlView Container for Hinos */}
                <div className="max-h-[520px] overflow-y-auto pr-3 bg-ieca-beige-light/30 p-6 rounded-card border border-gray-100">
                  <HtmlView 
                    content={selectedHymn.htmlContent || selectedHymn.lyrics.map(l => `<p>${l}</p>`).join('')} 
                    fontSize={fontSize} 
                  />
                </div>
              </>
            ) : selectedLiturgical ? (
              <>
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-ieca-green bg-ieca-green-light px-2.5 py-1 rounded">
                        {selectedLiturgical.category}
                      </span>
                      <span className="text-xs font-bold text-ieca-black bg-ieca-beige border border-ieca-beige px-2.5 py-1 rounded flex items-center gap-1">
                        <Globe className="w-3 h-3 text-ieca-coral" />
                        {selectedLiturgical.idioma || 'Português'}
                      </span>
                    </div>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl text-ieca-black mt-2">
                      {selectedLiturgical.title}
                    </h2>
                  </div>

                  <button
                    onClick={handleCopyText}
                    className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-ieca-black transition-colors"
                    title="Copiar texto"
                  >
                    {copied ? <Check className="w-4 h-4 text-ieca-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Font Size Toolbar */}
                <div className="flex items-center justify-between text-xs text-gray-500 bg-ieca-beige-light p-2.5 rounded-md">
                  <span className="font-semibold text-ieca-black">Tamanho da Letra:</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-1 rounded bg-white border border-gray-300">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-ieca-black">{fontSize}px</span>
                    <button onClick={() => setFontSize(Math.min(24, fontSize + 2))} className="p-1 rounded bg-white border border-gray-300">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* HtmlView Container for Liturgical Items */}
                <div className="max-h-[520px] overflow-y-auto pr-3 bg-ieca-beige-light/30 p-6 rounded-card border border-gray-100">
                  <HtmlView 
                    content={selectedLiturgical.htmlContent || selectedLiturgical.content.map(c => `<p>${c}</p>`).join('')} 
                    fontSize={fontSize} 
                  />
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-sm text-ieca-gray">
                Selecione um item da lista para ler.
              </div>
            )}

            <div className="text-xs text-center text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
              <span>Hinário Evangélico</span>
              <span className="text-ieca-coral font-medium">Liturgia IECA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
