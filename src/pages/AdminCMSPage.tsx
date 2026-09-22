import React, { useEffect, useState } from 'react';
import { ADMIN_ROLE_DEFINITIONS, ADMIN_ROLE_PERMISSIONS, AuthSession, CMSModule } from '../types';
import { MOCK_NEWS, MOCK_EVENTS, MOCK_CONGREGATIONS, MOCK_HYMNS, MOCK_RESOURCES } from '../data/mockData';
import { RecursoAPI, recursosService, fetchCongregations, fetchEvents, fetchNews } from '../services/api';
import { fetchHinos } from '../services/hinarioApi';
import { HeroBanner } from '../components/ui/HeroBanner';
import { Congregation, EventItem, Hymn } from '../types';
import { 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Trash2, 
  FileText, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Users, 
  BarChart3,
  LogOut
} from 'lucide-react';

interface AdminCMSPageProps {
  session: AuthSession;
  onLogout: () => void;
}

export const AdminCMSPage: React.FC<AdminCMSPageProps> = ({ session, onLogout }) => {
  const currentRole = session.role;
  const [activeModule, setActiveModule] = useState<CMSModule>('noticias');
  const [cmsSearchQuery, setCmsSearchQuery] = useState('');
  
  // Simulated form states
  const [newsList, setNewsList] = useState(MOCK_NEWS);
  const [eventList, setEventList] = useState<EventItem[]>(MOCK_EVENTS);
  const [congregationList, setCongregationList] = useState<Congregation[]>(MOCK_CONGREGATIONS);
  const [hymnList, setHymnList] = useState<Hymn[]>(MOCK_HYMNS);
  
  // New News form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Institucional' | 'Sínodos' | 'Social' | 'Juventude' | 'Missões'>('Institucional');
  const [newSummary, setNewSummary] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New Hymn form
  const [newHymnNumber, setNewHymnNumber] = useState('');
  const [newHymnTitle, setNewHymnTitle] = useState('');
  const [newHymnCategory, setNewHymnCategory] = useState<'Louvor' | 'Oração' | 'Ação de Graças' | 'Natal' | 'Páscoa' | 'Missões' | 'Fé & Confiança'>('Louvor');
  const [newHymnLyrics, setNewHymnLyrics] = useState('');
  const [showAddHymnForm, setShowAddHymnForm] = useState(false);

  // New Congregation form
  const [newCongregationName, setNewCongregationName] = useState('');
  const [newCongregationProvince, setNewCongregationProvince] = useState<string>('Luanda');
  const [newCongregationPastor, setNewCongregationPastor] = useState('');
  const [newCongregationSynod, setNewCongregationSynod] = useState('');
  const [showAddCongForm, setShowAddCongForm] = useState(false);

  const [resourceList, setResourceList] = useState<RecursoAPI[]>([]);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceCategory, setResourceCategory] = useState('Documentos');
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const permissions = ADMIN_ROLE_PERMISSIONS[currentRole];
  const currentRoleDefinition = ADMIN_ROLE_DEFINITIONS.find(role => role.id === currentRole)!;

  useEffect(() => {
    Promise.allSettled([fetchNews(), fetchEvents(), fetchCongregations(), fetchHinos(), recursosService.getAll()])
      .then(([news, events, congregations, hymns, resources]) => {
        if (news.status === 'fulfilled' && news.value.length) setNewsList(news.value);
        if (events.status === 'fulfilled' && events.value.length) setEventList(events.value);
        if (congregations.status === 'fulfilled' && congregations.value.length) setCongregationList(congregations.value);
        if (hymns.status === 'fulfilled' && hymns.value.length) setHymnList(hymns.value);
        if (resources.status === 'fulfilled') setResourceList(resources.value.data);
      });
  }, []);

  const modules: { id: CMSModule; label: string; icon: React.ReactNode }[] = [
    { id: 'noticias', label: 'Notícias & Comunicados', icon: <FileText className="w-4 h-4" /> },
    { id: 'eventos', label: 'Eventos & Calendário', icon: <Calendar className="w-4 h-4" /> },
    { id: 'congregacoes', label: 'Gestão de Congregações', icon: <MapPin className="w-4 h-4" /> },
    { id: 'hinario', label: 'Gestão do Hinário', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'documentos', label: 'Centro de Documentação', icon: <FileText className="w-4 h-4" /> },
    { id: 'usuarios', label: 'Utilizadores & Permissões', icon: <Users className="w-4 h-4" /> }
  ];

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (permissions.canCreate && newTitle && newSummary) {
      const newItem = {
        id: `news-${Date.now()}`,
        title: newTitle,
        summary: newSummary,
        content: newSummary + ' (Conteúdo adicionado via Painel Administrativo).',
        category: newCategory,
        date: 'Hoje (08 de Setembro de 2026)',
        author: `${currentRoleDefinition.label} IECA`,
        image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=800',
        readTime: '3 min'
      };
      setNewsList([newItem, ...newsList]);
      setNewTitle('');
      setNewSummary('');
      setShowAddForm(false);
    }
  };

  const handleDeleteNews = (id: string) => {
    if (permissions.canDelete) setNewsList(newsList.filter(item => item.id !== id));
  };

  const handleAddHymn = (e: React.FormEvent) => {
    e.preventDefault();
    if (permissions.canCreate && newHymnTitle && newHymnNumber) {
      const newHymn: Hymn = {
        id: `hymn-${Date.now()}`,
        number: parseInt(newHymnNumber, 10) || (hymnList.length + 1),
        title: newHymnTitle,
        category: newHymnCategory,
        lyrics: newHymnLyrics ? newHymnLyrics.split('\n\n') : ['Verso 1 de exemplo do novo hino.'],
        idioma: 'Português',
        composer: `${currentRoleDefinition.label} IECA`
      };
      setHymnList([newHymn, ...hymnList]);
      setNewHymnNumber('');
      setNewHymnTitle('');
      setNewHymnLyrics('');
      setShowAddHymnForm(false);
    }
  };

  const handleDeleteHymn = (id: string) => {
    if (permissions.canDelete) setHymnList(hymnList.filter(h => h.id !== id));
  };

  const handleAddCongregation = (e: React.FormEvent) => {
    e.preventDefault();
    if (permissions.canCreate && newCongregationName) {
      const newCong: Congregation = {
        id: `cong-${Date.now()}`,
        name: newCongregationName,
        official_name: newCongregationName,
        short_name: newCongregationName,
        synod: newCongregationSynod || 'Sínodo Provincial',
        pastorado: 'Pastorado Sede',
        pastor: newCongregationPastor || 'Pastor Responsável',
        province: newCongregationProvince as unknown as 'Luanda',
        city: newCongregationProvince,
        municipality: newCongregationProvince,
        neighborhood: 'Bairro Central',
        address: 'Rua Principal da Igreja',
        phone: '+244 923 000 000',
        email: 'contacto@ieca-angola.org',
        lat: -8.8390,
        lng: 13.2894,
        members_count: 250,
        established_year: 2026,
        google_maps: { place_id: null, plus_code: null, url: null },
        status: 'ATIVA',
        source: 'CMS Admin',
        coordinates: { lat: -8.8390, lng: 13.2894 },
        services: [{ day: 'Domingo', time: '09:00', type: 'Culto Dominical' }]
      };
      setCongregationList([newCong, ...congregationList]);
      setNewCongregationName('');
      setNewCongregationPastor('');
      setNewCongregationSynod('');
      setShowAddCongForm(false);
    }
  };

  const handleDeleteCongregation = (id: string) => {
    if (permissions.canDelete) setCongregationList(congregationList.filter(c => c.id !== id));
  };

  const handleUploadResource = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!permissions.canCreate || !resourceFile) return;

    setIsUploading(true);
    setUploadMessage('');
    try {
      const response = await recursosService.upload(resourceFile, resourceTitle || resourceFile.name, resourceCategory);
      setResourceList(previous => [response.data, ...previous]);
      setResourceTitle('');
      setResourceFile(null);
      const input = document.getElementById('resource-file') as HTMLInputElement | null;
      if (input) input.value = '';
      setUploadMessage('Arquivo enviado com sucesso.');
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : 'Não foi possível enviar o arquivo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!permissions.canDelete) return;
    try {
      await recursosService.delete(id);
      setResourceList(previous => previous.filter(resource => resource.id !== id));
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : 'Não foi possível eliminar o arquivo.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-10 space-y-8">
      <HeroBanner
        eyebrow={<span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" />Sistema Integrado de Gestão IECA</span>}
        title="Painel de Administração CMS"
        description="Ambiente seguro para gestão de conteúdos, sínodos, congregações e documentação institucional."
        footer={<p className="text-xs text-gray-300">{currentRoleDefinition.description}</p>}
      >
        <div className="bg-gray-900 border border-gray-800 p-3.5 rounded-card flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-ieca-green" />
          <div>
            <span className="block text-[11px] uppercase font-bold text-gray-400">Sessão ativa</span>
            <span className="block text-xs font-bold text-white">{session.name}</span>
            <span className="block text-[11px] text-ieca-coral">{currentRoleDefinition.label}</span>
          </div>
          <button onClick={onLogout} className="ml-2 p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded" title="Terminar sessão" aria-label="Terminar sessão">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </HeroBanner>

      {/* Main CMS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Modules */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-card border border-ieca-gray-border shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase text-ieca-gray tracking-wider px-2 block mb-1">Módulos do Sistema:</span>
            {modules.map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-md font-semibold text-xs transition-colors flex items-center gap-2.5 ${
                  activeModule === mod.id 
                    ? 'bg-ieca-coral text-white shadow' 
                    : 'text-ieca-black hover:bg-ieca-coral-light'
                }`}
              >
                {mod.icon}
                <span>{mod.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Analytics Summary Widget */}
          <div className="bg-ieca-beige-light p-4 rounded-card border border-ieca-beige space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-ieca-black">
              <span className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4 text-ieca-coral" />
                Resumo do Tráfego
              </span>
              <span className="text-ieca-green">Online</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded shadow-sm">
                <span className="block font-bold text-base font-serif text-ieca-coral">12.4K</span>
                <span className="text-[10px] text-gray-500">Visitas / Mês</span>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <span className="block font-bold text-base font-serif text-ieca-green">98.4%</span>
                <span className="text-[10px] text-gray-500">Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-card border border-ieca-gray-border shadow-sm p-6 space-y-6">
            {/* Header toolbar for current active module */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ieca-coral bg-ieca-coral/10 px-2.5 py-1 rounded">
                  Perfil: {currentRoleDefinition.label}
                </span>
                <h2 className="font-serif font-bold text-2xl text-ieca-black mt-1">
                  Módulo: {modules.find(m => m.id === activeModule)?.label}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {activeModule === 'noticias' && permissions.canCreate && (
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-ieca-coral hover:bg-ieca-coral-hover text-white text-xs font-bold px-4 py-2 rounded shadow flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddForm ? 'Cancelar' : 'Nova Notícia'}</span>
                  </button>
                )}

                {activeModule === 'hinario' && permissions.canCreate && (
                  <button
                    onClick={() => setShowAddHymnForm(!showAddHymnForm)}
                    className="bg-ieca-coral hover:bg-ieca-coral-hover text-white text-xs font-bold px-4 py-2 rounded shadow flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddHymnForm ? 'Cancelar' : 'Novo Hino'}</span>
                  </button>
                )}

                {activeModule === 'congregacoes' && permissions.canCreate && (
                  <button
                    onClick={() => setShowAddCongForm(!showAddCongForm)}
                    className="bg-ieca-coral hover:bg-ieca-coral-hover text-white text-xs font-bold px-4 py-2 rounded shadow flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddCongForm ? 'Cancelar' : 'Nova Congregação'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Search inside CMS Module */}
            <div className="relative">
              <input 
                type="text" 
                placeholder={`Filtrar registos no módulo ${modules.find(m => m.id === activeModule)?.label}...`}
                value={cmsSearchQuery}
                onChange={(e) => setCmsSearchQuery(e.target.value)}
                className="w-full p-2.5 pl-3 pr-8 rounded border border-gray-300 text-xs focus:ring-1 focus:ring-ieca-coral"
              />
            </div>

            {/* Add News Form */}
            {showAddForm && activeModule === 'noticias' && (
              <form onSubmit={handleAddNews} className="bg-ieca-beige-light p-5 rounded-card border border-ieca-beige space-y-4 animate-fadeIn">
                <h4 className="font-serif font-bold text-lg text-ieca-black">Publicar Nova Notícia</h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Título da Notícia:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Sínodo Provincial de Luanda Anuncia Novo Programa..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Categoria:</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as unknown as 'Institucional')}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 bg-white"
                    >
                      <option value="Institucional">Institucional</option>
                      <option value="Sínodos">Sínodos</option>
                      <option value="Social">Social</option>
                      <option value="Juventude">Juventude</option>
                      <option value="Missões">Missões</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ieca-black mb-1">Resumo Executivo:</label>
                  <textarea 
                    rows={2}
                    required
                    placeholder="Breve resumo a ser exibido no card da home page..."
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-ieca-green text-white text-xs font-bold px-5 py-2 rounded shadow"
                >
                  Salvar & Publicar Notícia
                </button>
              </form>
            )}

            {/* Add Hymn Form */}
            {showAddHymnForm && activeModule === 'hinario' && (
              <form onSubmit={handleAddHymn} className="bg-ieca-beige-light p-5 rounded-card border border-ieca-beige space-y-4 animate-fadeIn">
                <h4 className="font-serif font-bold text-lg text-ieca-black">Cadastrar Novo Hino no Hinário</h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Número do Hino:</label>
                    <input 
                      type="number" 
                      required
                      placeholder="Ex: 154"
                      value={newHymnNumber}
                      onChange={(e) => setNewHymnNumber(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Título do Hino:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Graça Maravilhosa"
                      value={newHymnTitle}
                      onChange={(e) => setNewHymnTitle(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Categoria:</label>
                    <select 
                      value={newHymnCategory}
                      onChange={(e) => setNewHymnCategory(e.target.value as unknown as 'Louvor')}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 bg-white"
                    >
                      <option value="Louvor">Louvor</option>
                      <option value="Oração">Oração</option>
                      <option value="Ação de Graças">Ação de Graças</option>
                      <option value="Natal">Natal</option>
                      <option value="Páscoa">Páscoa</option>
                      <option value="Missões">Missões</option>
                      <option value="Fé & Confiança">Fé & Confiança</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ieca-black mb-1">Letra do Hino (Estrofes separadas por linha dupla):</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Estrofe 1...\n\nEstrofe 2..."
                    value={newHymnLyrics}
                    onChange={(e) => setNewHymnLyrics(e.target.value)}
                    className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-ieca-green text-white text-xs font-bold px-5 py-2 rounded shadow"
                >
                  Salvar Hino no Acervo
                </button>
              </form>
            )}

            {/* Add Congregation Form */}
            {showAddCongForm && activeModule === 'congregacoes' && (
              <form onSubmit={handleAddCongregation} className="bg-ieca-beige-light p-5 rounded-card border border-ieca-beige space-y-4 animate-fadeIn">
                <h4 className="font-serif font-bold text-lg text-ieca-black">Cadastrar Nova Congregação</h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Nome da Congregação:</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Igreja Central de Menongue"
                      value={newCongregationName}
                      onChange={(e) => setNewCongregationName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Província:</label>
                    <select 
                      value={newCongregationProvince}
                      onChange={(e) => setNewCongregationProvince(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 bg-white"
                    >
                      {['Luanda', 'Huambo', 'Benguela', 'Huíla', 'Bié', 'Cabinda', 'Cuanza Sul', 'Malanje', 'Namibe', 'Uíge'].map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-ieca-black mb-1">Pastor Responsável:</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Rev. Manuel Silva"
                      value={newCongregationPastor}
                      onChange={(e) => setNewCongregationPastor(e.target.value)}
                      className="w-full p-2.5 text-xs rounded border border-gray-300 focus:ring-1 focus:ring-ieca-coral"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-ieca-green text-white text-xs font-bold px-5 py-2 rounded shadow"
                >
                  Registar Congregação
                </button>
              </form>
            )}

            {/* Module Content Displays */}
            {activeModule === 'noticias' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b">
                  Lista de Notícias Registadas ({newsList.filter(n => n.title.toLowerCase().includes(cmsSearchQuery.toLowerCase())).length}):
                </div>
                <div className="divide-y border border-gray-200 rounded-md">
                  {newsList
                    .filter(n => n.title.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || n.summary.toLowerCase().includes(cmsSearchQuery.toLowerCase()))
                    .map(item => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-ieca-coral/10 text-ieca-coral text-[10px] font-bold px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <span className="text-[11px] text-gray-400">{item.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-ieca-black">{item.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{item.summary}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {permissions.canDelete && <button 
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          title="Eliminar Notícia"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'eventos' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b">
                  Eventos Registados na Agenda ({eventList.filter(e => e.title.toLowerCase().includes(cmsSearchQuery.toLowerCase())).length}):
                </div>
                <div className="space-y-2">
                  {eventList
                    .filter(e => e.title.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || e.location.toLowerCase().includes(cmsSearchQuery.toLowerCase()))
                    .map(evt => (
                    <div key={evt.id} className="p-4 border rounded-md flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-ieca-coral">{evt.date} • {evt.time}</span>
                        <h4 className="font-serif font-bold text-base">{evt.title}</h4>
                        <span className="text-xs text-gray-500">{evt.location}</span>
                      </div>
                      <span className="bg-ieca-green-light text-ieca-green text-xs font-bold px-2.5 py-1 rounded">
                        {evt.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'congregacoes' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b">
                  Congregações Ativas no Diretório ({congregationList.filter(c => c.name.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || c.province.toLowerCase().includes(cmsSearchQuery.toLowerCase())).length}):
                </div>
                <div className="space-y-2">
                  {congregationList
                    .filter(c => c.name.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || c.province.toLowerCase().includes(cmsSearchQuery.toLowerCase()))
                    .map(cong => (
                    <div key={cong.id} className="p-4 border rounded-md flex items-center justify-between">
                      <div>
                        <span className="bg-ieca-coral/10 text-ieca-coral text-xs font-bold px-2 py-0.5 rounded">
                          {cong.province}
                        </span>
                        <h4 className="font-serif font-bold text-base mt-1">{cong.name}</h4>
                        <span className="text-xs text-gray-500">{cong.synod} • Pastor: {cong.pastor || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {permissions.canDelete && (
                          <button 
                            onClick={() => handleDeleteCongregation(cong.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Eliminar congregação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'hinario' && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b">
                  Gestão do Hinário Digital ({hymnList.filter(h => h.title.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || String(h.number).includes(cmsSearchQuery)).length} Hinos Cadastrados):
                </div>
                <div className="space-y-2">
                  {hymnList
                    .filter(h => h.title.toLowerCase().includes(cmsSearchQuery.toLowerCase()) || String(h.number).includes(cmsSearchQuery))
                    .map(hymn => (
                    <div key={hymn.id} className="p-3 border rounded-md flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-ieca-black">Hino Nº {hymn.number}:</span> {hymn.title}
                        <span className="text-gray-400 ml-2 font-normal">({hymn.idioma || 'Português'})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold">{hymn.category}</span>
                        {permissions.canDelete && (
                          <button 
                            onClick={() => handleDeleteHymn(hymn.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Eliminar Hino"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'documentos' && (
              <div className="space-y-5">
                {permissions.canCreate && (
                  <form onSubmit={handleUploadResource} className="bg-ieca-beige-light p-5 rounded-card border border-ieca-beige space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-ieca-black">Adicionar arquivo</h4>
                      <p className="text-xs text-gray-600 mt-1">Envie fotos, PDF ou documentos Word até 10 MB.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="resource-title" className="block text-xs font-bold text-ieca-black mb-1">Título</label>
                        <input id="resource-title" type="text" value={resourceTitle} onChange={event => setResourceTitle(event.target.value)} placeholder="Nome do arquivo ou documento" className="w-full p-2.5 text-xs rounded border border-gray-300" />
                      </div>
                      <div>
                        <label htmlFor="resource-category" className="block text-xs font-bold text-ieca-black mb-1">Categoria</label>
                        <select id="resource-category" value={resourceCategory} onChange={event => setResourceCategory(event.target.value)} className="w-full p-2.5 text-xs rounded border border-gray-300 bg-white">
                          <option>Documentos</option>
                          <option>Estatutos</option>
                          <option>Manual Doutrinário</option>
                          <option>Relatório Anual</option>
                          <option>Imagens</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                      <div className="flex-1">
                        <label htmlFor="resource-file" className="block text-xs font-bold text-ieca-black mb-1">Arquivo</label>
                        <input id="resource-file" required type="file" accept="image/jpeg,image/png,image/webp,application/pdf,.doc,.docx" onChange={event => setResourceFile(event.target.files?.[0] || null)} className="w-full p-2 text-xs rounded border border-gray-300 bg-white" />
                      </div>
                      <button type="submit" disabled={isUploading || !resourceFile} className="bg-ieca-green disabled:opacity-50 text-white text-xs font-bold px-5 py-2.5 rounded shadow">
                        {isUploading ? 'Enviando...' : 'Enviar arquivo'}
                      </button>
                    </div>
                    {uploadMessage && <p className="text-xs font-semibold text-ieca-coral">{uploadMessage}</p>}
                  </form>
                )}
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-2 border-b">
                  Documentos no Centro de Downloads ({resourceList.length || MOCK_RESOURCES.length}):
                </div>
                <div className="space-y-2">
                  {(resourceList.length ? resourceList : MOCK_RESOURCES).map(res => (
                    <div key={res.id} className="p-3 border rounded-md flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-ieca-black">{res.title}</span>
                        <span className="block text-gray-400">{res.format} • {res.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {'file_url' in res && res.file_url && <a href={res.file_url} target="_blank" rel="noreferrer" className="text-ieca-coral font-bold hover:underline">Abrir</a>}
                        {'download_count' in res && <span className="bg-ieca-green-light text-ieca-green font-bold px-2 py-0.5 rounded">{res.download_count} Downloads</span>}
                        {'downloadCount' in res && <span className="bg-ieca-green-light text-ieca-green font-bold px-2 py-0.5 rounded">{res.downloadCount} Downloads</span>}
                        {'file_url' in res && permissions.canDelete && <button onClick={() => handleDeleteResource(res.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Eliminar arquivo"><Trash2 className="w-4 h-4" /></button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'usuarios' && (
              <div className="space-y-4">
                <div className="bg-ieca-beige-light p-4 rounded-md space-y-2 text-xs">
                  <h4 className="font-serif font-bold text-sm text-ieca-black">Matriz de Permissões por Role</h4>
                  <p className="text-gray-600">
                    O perfil ativado (<strong className="text-ieca-coral">{currentRoleDefinition.label}</strong>) tem acesso a <strong>{currentRoleDefinition.scope.toLowerCase()}</strong>.
                  </p>
                </div>
                <table className="w-full text-xs text-left border">
                  <thead className="bg-gray-100 font-bold border-b">
                    <tr>
                      <th className="p-2.5">Perfil / Role</th>
                      <th className="p-2.5">Âmbito de Acesso</th>
                      <th className="p-2.5">Permissões</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {ADMIN_ROLE_DEFINITIONS.map(role => (
                      <tr key={role.id}>
                        <td className="p-2.5 font-semibold text-ieca-coral">{role.label}</td>
                        <td className="p-2.5">{role.scope}</td>
                        <td className="p-2.5">{role.permissions.join(' • ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
