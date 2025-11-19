
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Menu, X, Key, UserCircle, MessageCircle, BookOpen, Scale, Users, LogIn, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { t, language, setLanguage, dir } = useLanguage();

  // Fermer le menu quand on change de route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600';

  const mobileLinkClass = "flex items-center gap-4 px-4 py-4 text-lg font-medium text-slate-700 border-b border-slate-50 hover:bg-slate-50 transition-colors active:bg-slate-100";

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50 relative">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-blue-700 transition transform group-hover:scale-105">
                R
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Room<span className="text-blue-600">.ma</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-5 text-sm font-medium">
              {/* Ajout de classes logiques pour le support RTL (ms-X au lieu de ml-X) */}
              <Link to="/" className={isActive('/')}>{t('nav.home')}</Link>
              <Link to="/listings" className={isActive('/listings')}>{t('nav.find')}</Link>
              
              {/* Espace Propriétaire */}
              <Link to="/add-room" className={`flex items-center gap-1 px-3 py-1 rounded-full transition ${location.pathname === '/add-room' ? 'bg-blue-50 text-blue-600 font-bold border border-blue-100' : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'}`}>
                 <Key size={14}/> {t('nav.owner')}
              </Link>

              <Link to="/colocation" className={isActive('/colocation')}>{t('nav.coloc')}</Link>
              
              <Link to="/forum" className={`flex items-center gap-1 ${isActive('/forum')}`}>
                 <Users size={16}/> {t('nav.forum')}
              </Link>
              
              <Link to="/contracts" className={`flex items-center gap-1 ${isActive('/contracts')}`}>
                 <Scale size={16}/> {t('nav.contracts')}
              </Link>
              
              <Link to="/blog" className={`flex items-center gap-1 ${isActive('/blog')}`}>
                 <BookOpen size={16}/> {t('nav.blog')}
              </Link>
              
              <div className="h-6 w-px bg-slate-200 mx-2"></div>

              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-blue-600 font-bold text-xs uppercase border border-slate-200 rounded-md"
              >
                <Globe size={14}/> {language === 'fr' ? 'AR' : 'FR'}
              </button>

              <div className="flex items-center gap-3">
                <Link to="/messages" className="relative text-slate-600 hover:text-blue-600 transition p-1">
                  <MessageSquare size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </Link>
                <Link to="/profile" className="px-4 py-2 bg-slate-900 text-white rounded-full font-medium text-sm hover:bg-slate-800 transition shadow-md flex items-center gap-2 transform hover:-translate-y-0.5">
                  <UserCircle size={16} /> {t('nav.profile')}
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4 z-50">
              <button 
                onClick={toggleLanguage}
                className="text-slate-600 font-bold text-xs uppercase"
              >
                {language === 'fr' ? 'AR' : 'FR'}
              </button>
              <Link to="/messages" className="relative text-slate-600">
                  <MessageSquare size={26} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </Link>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-slate-900 focus:outline-none p-1 rounded-md active:bg-slate-100 transition"
                aria-label="Menu"
              >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-white transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : (dir === 'rtl' ? '-translate-x-full' : 'translate-x-full')}`}
        style={{ top: '64px', height: 'calc(100vh - 64px)' }} // Start below navbar
      >
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="flex flex-col pt-2">
            <Link to="/" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Home size={20}/></div> {t('nav.home')}
            </Link>
            <Link to="/listings" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Search size={20}/></div> {t('nav.find')}
            </Link>
            <Link to="/add-room" className="flex items-center gap-4 px-4 py-4 text-lg font-bold text-blue-600 bg-blue-50/50 border-b border-blue-100">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Key size={20}/></div> {t('nav.owner')}
            </Link>
            <Link to="/colocation" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><Users size={20}/></div> {t('nav.coloc')}
            </Link>
            <Link to="/forum" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600"><MessageCircle size={20}/></div> {t('nav.forum')}
            </Link>
            <Link to="/contracts" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600"><Scale size={20}/></div> {t('nav.contracts')}
            </Link>
            <Link to="/blog" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600"><BookOpen size={20}/></div> {t('nav.blog')}
            </Link>
            <Link to="/profile" className={mobileLinkClass}>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"><UserCircle size={20}/></div> {t('nav.profile')}
            </Link>
          </div>

          {/* Bottom Mobile Action */}
          <div className="mt-8 px-4 pb-8">
             <Link to="/profile" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform">
                <LogIn size={20}/> {t('nav.login')}
             </Link>
             <p className="text-center text-slate-400 text-xs mt-4">Version 2.4.0 • Room.ma Mobile</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
