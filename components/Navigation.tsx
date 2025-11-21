
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, Menu, X, Key, UserCircle, HeartHandshake, Scale, Users, LogIn, ChevronRight, ChevronDown, Building, MapPin, Sparkles, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const isActive = (path: string) => location.pathname === path ? 'text-blue-600 font-bold bg-blue-50/60 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/80';
  const isCommunityActive = ['/community', '/forum', '/marketplace', '/blog'].includes(location.pathname);
  const isFindActive = ['/listings', '/colocation', '/find'].includes(location.pathname);

  const mobileLinkClass = "flex items-center gap-4 px-4 py-4 text-base font-semibold text-slate-700 border-b border-slate-50 hover:bg-blue-50/50 transition-all active:bg-blue-100 group rounded-xl mx-2 my-1";

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group z-50 relative flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-blue-200 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                R
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">Room<span className="text-blue-600">.ma</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 text-sm font-medium">
              <Link to="/" className={`px-4 py-2.5 rounded-full transition-all duration-300 relative group ${isActive('/')}`}>
                 {t('nav.home')}
              </Link>

              {/* Espace Propriétaire */}
              <Link to="/add-room" className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all border duration-300 ${location.pathname === '/add-room' ? 'bg-slate-900 text-white border-slate-900 shadow-lg transform scale-105' : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-md'}`}>
                 <Key size={16} className={location.pathname === '/add-room' ? 'text-yellow-400' : 'text-slate-500'}/> 
                 <span className="font-bold">{t('nav.owner')}</span>
              </Link>
              
              {/* MENU SIMPLE: Trouver un logement */}
              <Link to="/find" className={`px-4 py-2.5 rounded-full transition-all duration-300 relative flex items-center gap-2 ${isFindActive ? 'text-blue-600 font-bold bg-blue-50/60 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/80'}`}>
                 <Search size={16} />
                 {t('nav.find')}
              </Link>

              {/* Community Link */}
              <Link to="/community" className={`px-4 py-2.5 rounded-full transition-all duration-300 relative group ${isCommunityActive ? 'text-blue-600 font-bold bg-blue-50/60 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50/80'}`}>
                 {t('nav.community')}
              </Link>

              <Link to="/contracts" className={`px-4 py-2.5 rounded-full transition-all duration-300 relative group flex items-center gap-2 ${isActive('/contracts')}`}>
                 <Scale size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors"/> {t('nav.contracts')}
              </Link>
              
              <div className="h-8 w-px bg-slate-200 mx-3"></div>
              
              <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button 
                  onClick={toggleLanguage}
                  className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-blue-600 font-bold text-xs uppercase border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-blue-200"
                >
                  {language === 'fr' ? 'AR' : 'FR'}
                </button>

                <Link to="/messages" className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition duration-300 group">
                  <MessageSquare size={22} className="group-hover:scale-110 transition-transform" />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
                </Link>
                
                <Link to="/profile" className="pl-1 pr-4 py-1.5 bg-slate-100 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-200 text-slate-700 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                     <UserCircle size={18} className="text-white" />
                  </div>
                  <span className="hidden xl:inline group-hover:text-slate-900">{t('nav.profile')}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3 z-50">
              <button 
                onClick={toggleLanguage}
                className="text-slate-600 font-bold text-xs uppercase bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
              >
                {language === 'fr' ? 'AR' : 'FR'}
              </button>
              <Link to="/messages" className="relative text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <MessageSquare size={22} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </Link>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-slate-900 focus:outline-none p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div 
        className={`fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-out lg:hidden flex flex-col ${isOpen ? 'translate-x-0' : (dir === 'rtl' ? '-translate-x-full' : 'translate-x-full')}`}
      >
        <div className="flex flex-col h-full pt-24 pb-6 px-4 overflow-y-auto">
           
           <div className="space-y-6">
              {/* Main Nav */}
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-4">Menu Principal</p>
                 <div className="flex flex-col space-y-1">
                    <Link to="/" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm"><Home size={20}/></div> 
                      <span className="flex-1">{t('nav.home')}</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                    </Link>
                    
                    <Link to="/add-room" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm"><Key size={20}/></div> 
                      <span className="flex-1 font-bold">{t('nav.owner')}</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                    </Link>

                    <Link to="/find" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm"><Search size={20}/></div> 
                      <span className="flex-1 font-bold">{t('nav.find')}</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                    </Link>

                    {/* Community Direct Link Mobile */}
                    <Link to="/community" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shadow-sm"><HeartHandshake size={20}/></div> 
                      <span className="flex-1 font-bold">{t('nav.community')}</span>
                      <ChevronRight size={16} className="text-slate-300"/>
                    </Link>
                 </div>
              </div>

              {/* Tools */}
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-4">Outils & Légal</p>
                 <div className="flex flex-col space-y-1">
                    <Link to="/contracts" className={mobileLinkClass} onClick={() => setIsOpen(false)}>
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shadow-sm"><Scale size={20}/></div> 
                      <span className="flex-1">{t('nav.contracts')}</span>
                    </Link>
                 </div>
              </div>
           </div>

           {/* Bottom Actions */}
           <div className="mt-auto pt-6 space-y-3">
             <Link to="/profile" onClick={() => setIsOpen(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-95 transition-transform">
                <LogIn size={20}/> {t('nav.login')}
             </Link>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
