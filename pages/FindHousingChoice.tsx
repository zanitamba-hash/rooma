
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FindHousingChoice: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8 relative">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-30 flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-md border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-blue-600 transition-all hover:shadow-lg active:scale-95"
      >
        <ArrowLeft size={18} className={language === 'ar' ? 'rotate-180' : ''} />
        <span>{t('details.back')}</span>
      </button>

      <div className="max-w-6xl w-full mt-16 md:mt-0 animate-slide-up">
        
        <div className="text-center mb-10 md:mb-16">
           <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{t('choice_page.title')}</h1>
           <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{t('choice_page.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 px-2">
           
           {/* Option 1: Owner Listings */}
           <Link to="/listings" className="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
              
              <div className="relative z-10 mb-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-8 group-hover:rotate-6 transition-transform duration-300">
                      <Building size={36} />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{t('choice_page.option_1_title')}</h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">
                      {t('choice_page.option_1_desc')}
                  </p>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                  <span className="inline-flex items-center gap-3 px-6 py-3 bg-slate-50 text-blue-600 rounded-xl font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      {t('choice_page.option_1_btn')} <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''}/>
                  </span>
              </div>
           </Link>

           {/* Option 2: Co-living */}
           <Link to="/colocation" className="group relative bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-purple-200/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/80"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10 mb-8">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl flex items-center justify-center text-purple-300 mb-8 group-hover:-rotate-6 transition-transform duration-300">
                      <Users size={36} />
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">{t('choice_page.option_2_title')}</h2>
                  <p className="text-slate-300 text-lg leading-relaxed font-medium">
                      {t('choice_page.option_2_desc')}
                  </p>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                  <span className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-lg backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-purple-900 transition-all shadow-sm">
                      {t('choice_page.option_2_btn')} <ArrowRight size={20} className={language === 'ar' ? 'rotate-180' : ''}/>
                  </span>
              </div>
           </Link>

        </div>

      </div>
    </div>
  );
};

export default FindHousingChoice;
