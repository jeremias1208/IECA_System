import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type SiteLanguage = 'PT' | 'EN';
export type SiteTheme = 'light' | 'dark';

type TranslationKey =
  | 'home'
  | 'about'
  | 'news'
  | 'events'
  | 'ministries'
  | 'gallery'
  | 'hymnal'
  | 'congregations'
  | 'search'
  | 'searchSite'
  | 'searchPlaceholder'
  | 'searchTitle'
  | 'searchHint'
  | 'adminPanel'
  | 'findCongregation'
  | 'nationalHeadquarters'
  | 'followIeca'
  | 'footerDescription'
  | 'resourcesLinks'
  | 'historyMission'
  | 'digitalHymnal'
  | 'ministriesOrganizations'
  | 'newsAnnouncements'
  | 'nationalEvents'
  | 'photoGallery'
  | 'adminCms'
  | 'mainSynods'
  | 'officialContacts'
  | 'findNearest'
  | 'privacy'
  | 'terms'
  | 'accessibility'
  | 'top'
  | 'galleryEyebrow'
  | 'galleryTitle'
  | 'galleryDescription'
  | 'photographs'
  | 'categories'
  | 'synodsAngola'
  | 'congregationEyebrow'
  | 'congregationTitle'
  | 'congregationDescription'
  | 'ministriesEyebrow'
  | 'ministriesTitle'
  | 'ministriesDescription'
  | 'newsEyebrow'
  | 'newsTitle'
  | 'newsDescription'
  | 'aboutEyebrow'
  | 'aboutTitle'
  | 'aboutDescription'
  | 'hymnalEyebrow'
  | 'hymnalTitle'
  | 'hymnalDescription'
  | 'all'
  | 'found'
  | 'searchCongregation'
  | 'selectMinistry'
  | 'institutionalNews'
  | 'eventsAgenda'
  | 'searchContent'
  | 'noPhotos';

const translations: Record<SiteLanguage, Record<TranslationKey, string>> = {
  PT: {
    home: 'Início', about: 'Sobre', news: 'Notícias', events: 'Eventos', ministries: 'Ministérios', gallery: 'Galeria', hymnal: 'Hinário Digital', congregations: 'Congregações', search: 'Pesquisar', searchSite: 'Pesquisar no site', searchPlaceholder: 'Pesquisar por igrejas, hinos, notícias ou eventos...', searchTitle: 'Pesquisa Global no Ecossistema IECA', searchHint: 'Digite um termo para buscar em todas as seções da plataforma.', adminPanel: 'Painel Administrativo CMS', findCongregation: 'Encontrar Congregação', nationalHeadquarters: 'Sede Nacional', followIeca: 'Siga a IECA:', footerDescription: 'Uma igreja histórica, enraizada na tradição cristã e comprometida com a fé, esperança, amor e a transformação integral do povo angolano.', resourcesLinks: 'Recursos & Links', historyMission: 'História e Missão da IECA', digitalHymnal: 'Hinário Digital (Hinos IECA)', ministriesOrganizations: 'Ministérios e Organizações', newsAnnouncements: 'Notícias e Comunicados', nationalEvents: 'Agenda e Eventos Nacionais', photoGallery: 'Galeria Fotográfica', adminCms: 'Painel Administrativo (CMS)', mainSynods: 'Sínodos Principais', officialContacts: 'Contactos Oficiais', findNearest: 'Encontrar Congregação Mais Próxima', privacy: 'Privacidade', terms: 'Termos de Uso', accessibility: 'Acessibilidade', top: 'Topo', galleryEyebrow: 'Arquivo Fotográfico Institucional', galleryTitle: 'Galeria da IECA', galleryDescription: 'Registo visual da história, vida e missão da Igreja Evangélica Congregacional em Angola — desde a liderança pastoral até às comunidades que transformam o país.', photographs: 'Fotografias', categories: 'Categorias', synodsAngola: 'Sínodos de todo Angola', congregationEyebrow: 'Diretório Eclesiástico Nacional', congregationTitle: 'Encontrar uma Congregação IECA', congregationDescription: 'Consulte a localização de igrejas congregacionais em Angola, horários de cultos dominicais e semanais, e contactos dos pastores locais.', ministriesEyebrow: 'Sociedades Oficiais & Estrutura Hierárquica', ministriesTitle: 'Sociedades e Organizações da IECA', ministriesDescription: 'Estruturadas pelo Estatuto da Igreja em Sociedades Locais, atuando em engajamento espiritual, desenvolvimento comunitário e fortalecimento familiar em Angola.', newsEyebrow: 'Informação & Comunhão', newsTitle: 'Notícias e Eventos da IECA', newsDescription: 'Acompanhe as últimas publicações oficiais, comunicados do Sínodo Geral, atividades provinciais e a agenda eclesiástica em Angola.', aboutEyebrow: 'Identidade Oficial & Estatuto', aboutTitle: 'Igreja Evangélica Congregacional em Angola (IECA)', aboutDescription: 'Uma instituição religiosa de utilidade pública, sem fins lucrativos, dedicada à propagação da fé cristã e ao desenvolvimento espiritual, ético, cultural e social do povo angolano.', hymnalEyebrow: 'Património Litúrgico', hymnalTitle: 'Hinário Digital & Liturgia', hymnalDescription: 'Consulte Hinos, Litanias, Orações, Invocatórias e Salmos com suporte a vários idiomas. Explore o acervo litúrgico da IECA de forma interativa e acessível.', all: 'Todas', found: 'encontrada(s)', searchCongregation: 'Pesquisar por nome da congregação, cidade ou pastor...', selectMinistry: 'Selecione o Ministério:', institutionalNews: 'Notícias Institucionais', eventsAgenda: 'Agenda e Eventos', searchContent: 'Pesquisar por título, número ou texto...', noPhotos: 'Nenhuma fotografia encontrada nesta categoria.'
  },
  EN: {
    home: 'Home', about: 'About', news: 'News', events: 'Events', ministries: 'Ministries', gallery: 'Gallery', hymnal: 'Digital Hymnal', congregations: 'Congregations', search: 'Search', searchSite: 'Search the site', searchPlaceholder: 'Search churches, hymns, news or events...', searchTitle: 'Global Search in the IECA Ecosystem', searchHint: 'Type a term to search all platform sections.', adminPanel: 'CMS Administration Panel', findCongregation: 'Find a Congregation', nationalHeadquarters: 'National Headquarters', followIeca: 'Follow IECA:', footerDescription: 'A historic church rooted in Christian tradition and committed to faith, hope, love and the integral transformation of the Angolan people.', resourcesLinks: 'Resources & Links', historyMission: 'IECA History and Mission', digitalHymnal: 'Digital Hymnal (IECA Hymns)', ministriesOrganizations: 'Ministries and Organizations', newsAnnouncements: 'News and Announcements', nationalEvents: 'National Events Calendar', photoGallery: 'Photo Gallery', adminCms: 'Administration Panel (CMS)', mainSynods: 'Main Synods', officialContacts: 'Official Contacts', findNearest: 'Find the Nearest Congregation', privacy: 'Privacy', terms: 'Terms of Use', accessibility: 'Accessibility', top: 'Top', galleryEyebrow: 'Institutional Photo Archive', galleryTitle: 'IECA Gallery', galleryDescription: 'A visual record of the history, life and mission of the Evangelical Congregational Church in Angola, from pastoral leadership to communities transforming the country.', photographs: 'Photographs', categories: 'Categories', synodsAngola: 'Synods across Angola', congregationEyebrow: 'National Ecclesiastical Directory', congregationTitle: 'Find an IECA Congregation', congregationDescription: 'Find congregational churches in Angola, Sunday and weekly worship schedules, and local pastor contacts.', ministriesEyebrow: 'Official Societies & Hierarchical Structure', ministriesTitle: 'IECA Societies and Organizations', ministriesDescription: 'Structured by the Church Statutes into local societies, supporting spiritual engagement, community development and family strengthening in Angola.', newsEyebrow: 'Information & Fellowship', newsTitle: 'IECA News and Events', newsDescription: 'Follow official publications, General Synod announcements, provincial activities and the ecclesiastical calendar in Angola.', aboutEyebrow: 'Official Identity & Statutes', aboutTitle: 'Evangelical Congregational Church in Angola (IECA)', aboutDescription: 'A public-interest, non-profit religious institution dedicated to spreading the Christian faith and supporting the spiritual, ethical, cultural and social development of the Angolan people.', hymnalEyebrow: 'Liturgical Heritage', hymnalTitle: 'Digital Hymnal & Liturgy', hymnalDescription: 'Browse hymns, litanies, prayers, invocations and psalms with support for several languages. Explore IECA liturgical collections interactively and accessibly.', all: 'All', found: 'found', searchCongregation: 'Search by congregation name, city or pastor...', selectMinistry: 'Select a Ministry:', institutionalNews: 'Institutional News', eventsAgenda: 'Events Calendar', searchContent: 'Search by title, number or text...', noPhotos: 'No photographs found in this category.'
  }
};

interface SitePreferencesContextValue {
  language: SiteLanguage;
  theme: SiteTheme;
  setLanguage: (language: SiteLanguage) => void;
  toggleTheme: () => void;
  t: (key: TranslationKey) => string;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

export const SitePreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SiteLanguage>(() => {
    const saved = window.localStorage.getItem('ieca-language');
    return saved === 'EN' ? 'EN' : 'PT';
  });
  const [theme, setTheme] = useState<SiteTheme>(() => {
    const saved = window.localStorage.getItem('ieca-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const setLanguage = (nextLanguage: SiteLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('ieca-language', nextLanguage);
    document.documentElement.lang = nextLanguage === 'EN' ? 'en' : 'pt-PT';
  };

  const toggleTheme = () => setTheme(current => current === 'light' ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('ieca-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === 'EN' ? 'en' : 'pt-PT';
  }, [language]);

  const value = useMemo(() => ({ language, theme, setLanguage, toggleTheme, t: (key: TranslationKey) => translations[language][key] }), [language, theme]);
  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
};

export const useSitePreferences = () => {
  const context = useContext(SitePreferencesContext);
  if (!context) throw new Error('useSitePreferences must be used inside SitePreferencesProvider');
  return context;
};
