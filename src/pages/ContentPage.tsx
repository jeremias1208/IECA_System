import React, { useState } from 'react';
import { HeroBanner } from '../components/ui/HeroBanner';
import { MOCK_ARTICLES, MOCK_AUTHORS } from '../data/mockData';
import { ArticleItem } from '../types';
import { 
  BookOpen, 
  Search, 
  User, 
  Clock, 
  ArrowRight, 
  X,
  FileText,
  Sparkles,
  Quote
} from 'lucide-react';
import photoPastores from '../data/images/Pastores.jpg';

export const ContentPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const categories = ['Todas', 'Artigo', 'Estudo Bíblico', 'Pregação', 'Reflexão'];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'Todas' || art.category === selectedCategory;
    const matchesAuthor = selectedAuthorId === 'Todos' || art.authorId === selectedAuthorId;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAuthor && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-0 pb-16 space-y-10">
      {/* Hero Banner */}
      <HeroBanner
        eyebrow="Ensino, Doutrina & Espiritualidade"
        title="Artigos, Estudos Bíblicos & Pregações"
        imageSrc={photoPastores}
        description="Publicações teológicas, sermões e reflexões espirituais produzidas pelos líderes, pastores e teólogos autorizados da IECA."
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-card text-white text-xs space-y-1 max-w-sm">
          <div className="flex items-center gap-2 font-bold text-ieca-gold text-sm">
            <Sparkles className="w-4 h-4 text-ieca-gold" />
            <span>Edificação Congregacional</span>
          </div>
          <p className="text-gray-200 leading-relaxed">
            Acervo digital de ensinamentos para apoiar o estudo pessoal, a Escola Dominical e a formação de líderes.
          </p>
        </div>
      </HeroBanner>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-grow">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Pesquisar por título, assunto, versículo ou autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-btn border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            />
          </div>

          {/* Author Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase text-ieca-gray whitespace-nowrap">Autor:</span>
            <select
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
              className="px-3.5 py-3 rounded-btn border border-gray-300 text-xs font-semibold text-ieca-black bg-white focus:outline-none focus:ring-2 focus:ring-ieca-coral"
            >
              <option value="Todos">Todos os Autores</option>
              {MOCK_AUTHORS.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold uppercase text-ieca-gray mr-2">Categorias:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-btn font-bold text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-ieca-coral text-white shadow-sm'
                  : 'bg-ieca-beige-light text-ieca-black hover:bg-ieca-beige'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Articles & Authors Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Articles List */}
        <div className="lg:col-span-8 space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-card border border-ieca-gray-border space-y-3">
              <FileText className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-ieca-black">Nenhum conteúdo encontrado</h3>
              <p className="text-xs text-ieca-gray max-w-sm mx-auto">
                Tente redefinir os filtros ou termos de pesquisa para encontrar artigos e pregações.
              </p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <article 
                key={article.id}
                className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm hover:shadow-md transition-all space-y-4 group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                    article.category === 'Pregação' ? 'bg-amber-100 text-amber-800' :
                    article.category === 'Estudo Bíblico' ? 'bg-blue-100 text-blue-800' :
                    article.category === 'Artigo' ? 'bg-red-100 text-red-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-ieca-black group-hover:text-ieca-coral transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ieca-gray leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {article.scriptureReference && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-ieca-gold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    <BookOpen className="w-3.5 h-3.5 text-ieca-gold" />
                    <span>Texto Base: {article.scriptureReference}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs">
                  <div className="flex items-center gap-3">
                    <img 
                      src={article.authorPhoto} 
                      alt={article.authorName}
                      className="w-9 h-9 rounded-full object-cover border border-ieca-gold"
                    />
                    <div>
                      <span className="block font-bold text-ieca-black">{article.authorName}</span>
                      <span className="text-[10px] text-ieca-gray">{article.authorRole} • {article.date}</span>
                    </div>
                  </div>

                  <span className="font-bold text-ieca-coral group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-xs">
                    Ler Conteúdo Completo <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Authors Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-card border border-ieca-gray-border shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-ieca-black flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="w-5 h-5 text-ieca-coral" />
              Autores Autorizados da IECA
            </h3>

            <div className="space-y-4">
              {MOCK_AUTHORS.map(author => {
                const authorArticlesCount = MOCK_ARTICLES.filter(a => a.authorId === author.id).length;
                return (
                  <div 
                    key={author.id}
                    onClick={() => setSelectedAuthorId(author.id)}
                    className={`p-3 rounded-card border transition-all cursor-pointer flex items-start gap-3 ${
                      selectedAuthorId === author.id 
                        ? 'bg-ieca-beige-light border-ieca-coral shadow-sm' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <img 
                      src={author.photo} 
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-ieca-gold flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-ieca-black leading-tight">{author.name}</h4>
                      <p className="text-[10px] text-ieca-coral font-semibold">{author.role}</p>
                      <p className="text-[11px] text-ieca-gray line-clamp-2">{author.bio}</p>
                      <span className="inline-block text-[10px] text-gray-400 font-bold mt-1">
                        {authorArticlesCount} {authorArticlesCount === 1 ? 'publicação' : 'publicações'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-card shadow-2xl border border-gray-200 overflow-hidden space-y-0 my-8">
            {/* Modal Header */}
            <div className="bg-ieca-black text-white p-6 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-extrabold bg-ieca-coral text-white rounded-full">
                  {selectedArticle.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">{selectedArticle.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <img 
                  src={selectedArticle.authorPhoto} 
                  alt={selectedArticle.authorName} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-ieca-gold"
                />
                <div>
                  <h4 className="font-bold text-sm text-ieca-black">{selectedArticle.authorName}</h4>
                  <p className="text-xs text-ieca-gray">{selectedArticle.authorRole} • {selectedArticle.date}</p>
                </div>
              </div>

              {selectedArticle.scriptureReference && (
                <div className="p-4 bg-amber-50 rounded-btn border border-amber-200 text-xs text-amber-900 flex items-center gap-2 font-semibold">
                  <Quote className="w-4 h-4 text-ieca-gold flex-shrink-0" />
                  <span>Texto Bíblico Base: <strong>{selectedArticle.scriptureReference}</strong></span>
                </div>
              )}

              <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-ieca-gray">{selectedArticle.readTime}</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-ieca-black text-white font-bold text-xs rounded-btn hover:bg-gray-800 transition-colors"
              >
                Fechar Leitura
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
