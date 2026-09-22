import React, { useState } from 'react';
import { Logo } from '../ui/Logo';
import { Search, MapPin, Menu, X, Globe, ChevronDown, Moon, Sun } from 'lucide-react';
import { useSitePreferences } from '../../context/SitePreferencesContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearchOpen?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onSearchOpen }) => {
  const { language, theme, setLanguage, toggleTheme, t } = useSitePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'sobre', label: t('about') },
    { id: 'noticias', label: t('news') },
    { id: 'eventos', label: t('events') },
    { id: 'ministerios', label: t('ministries') },
    { id: 'galeria', label: t('gallery') },
    { id: 'hinario', label: t('hymnal') }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-ieca-gray-border shadow-sm">
      {/* Top Bar (Institutional Contacts & Language) */}
      <div className="bg-ieca-black text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-300">
            <span className="hidden md:inline font-medium">Sede Nacional: Belas, Morro Bento II, Luanda</span>
            <span className="text-ieca-coral">|</span>
            <span>+244 923 000 111</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 text-gray-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-ieca-coral" />
                <span className="font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white text-ieca-black rounded shadow-lg border border-gray-200 py-1 z-50">
                  <button 
                    onClick={() => { setLanguage('PT'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-ieca-coral-light flex items-center justify-between ${language === 'PT' ? 'font-bold text-ieca-coral' : ''}`}
                  >
                    <span>Português</span>
                    <span>🇦🇴</span>
                  </button>
                  <button 
                    onClick={() => { setLanguage('EN'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-ieca-coral-light flex items-center justify-between ${language === 'EN' ? 'font-bold text-ieca-coral' : ''}`}
                  >
                    <span>English</span>
                    <span>🇬🇧</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded hover:bg-white/10 text-gray-200 transition-colors"
              title={theme === 'dark' ? 'Usar modo claro' : 'Usar modo escuro'}
              aria-label={theme === 'dark' ? 'Usar modo claro' : 'Usar modo escuro'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* Quick Search */}
            <button 
              onClick={onSearchOpen}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={t('searchSite')}
            >
              <Search className="w-3.5 h-3.5 text-ieca-coral" />
              <span className="hidden sm:inline text-[11px]">{t('search')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none focus:ring-2 focus:ring-ieca-coral rounded-lg p-1"
        >
          <Logo variant="full" size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-sans text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 border-b-2 transition-all duration-200 ${
                  isActive 
                    ? 'text-ieca-coral font-semibold border-ieca-coral' 
                    : 'text-ieca-black border-transparent hover:text-ieca-coral hover:border-ieca-coral/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Primary CTA Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => handleNavClick('congregacoes')}
            className="flex items-center gap-2 bg-ieca-coral hover:bg-ieca-coral-hover text-white px-3.5 py-2 rounded-btn font-semibold text-xs shadow-md hover:shadow-lg transition-all duration-200"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('congregations')}</span>
          </button>

          
          
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-ieca-black hover:bg-gray-100 focus:outline-none"
          aria-label="Abrir Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-md font-medium text-base transition-colors ${
                  currentPage === link.id
                    ? 'bg-ieca-coral/10 text-ieca-coral font-bold'
                    : 'text-ieca-black hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={() => handleNavClick('congregacoes')}
              className="w-full flex items-center justify-center gap-2 bg-ieca-coral text-white py-3 rounded-btn font-semibold text-base shadow"
            >
              <MapPin className="w-5 h-5" />
              <span>{t('findCongregation')}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 bg-ieca-black text-white py-3 rounded-btn font-semibold text-base shadow"
            >
              <span>{t('adminPanel')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
