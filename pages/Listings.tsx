
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Search, MapPin, ShieldCheck, Star, Armchair, Utensils, Bath, X, SlidersHorizontal, GraduationCap } from 'lucide-react';
import { MOCK_LISTINGS, UNIVERSITIES } from '../constants';
import { Listing } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Listings: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  
  // Initialiser la recherche avec le paramètre d'URL 'city' si présent
  const initialCity = searchParams.get('city') || '';

  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  
  // Gamme de Prix (Min & Max)
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(10000);
  
  // Mobile Filters State
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- AUTOCOMPLETE STATE ---
  const [suggestions, setSuggestions] = useState<{label: string, type: 'city' | 'uni'}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Liste des villes populaires pour l'autocomplétion
  const POPULAR_CITIES = ['Rabat', 'Casablanca', 'Marrakech', 'Tanger', 'Agadir', 'Fès', 'Meknès', 'Kenitra', 'Ifrane', 'Sala Al Jadida'];

  // Gestionnaire de changement d'input avec Autocomplétion
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const cityMatches = POPULAR_CITIES
        .filter(c => c.toLowerCase().includes(value.toLowerCase()))
        .map(c => ({ label: c, type: 'city' as const }));
        
      const uniMatches = UNIVERSITIES
        .filter(u => u.toLowerCase().includes(value.toLowerCase()))
        .map(u => ({ label: u, type: 'uni' as const }));
      
      // Combiner et limiter à 6 suggestions
      setSuggestions([...cityMatches, ...uniMatches].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (label: string) => {
    setSearchTerm(label);
    setShowSuggestions(false);
  };

  // Filter Logic (Updated to search in University Name as well)
  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = listing.city.toLowerCase().includes(term) || 
                          listing.title.toLowerCase().includes(term) ||
                          listing.university.toLowerCase().includes(term);
                          
    const matchesUni = selectedUniversity ? listing.university === selectedUniversity : true;
    const matchesPrice = listing.price >= priceMin && listing.price <= priceMax;

    return matchesSearch && matchesUni && matchesPrice;
  });

  const activeFiltersCount = (selectedUniversity ? 1 : 0) + (priceMax < 10000 || priceMin > 0 ? 1 : 0) + (searchTerm ? 1 : 0);

  // Handlers pour les sliders sécurisés
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= priceMax) setPriceMin(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= priceMin) setPriceMax(val);
  };

  // Reset Filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedUniversity('');
    setPriceMin(0);
    setPriceMax(10000);
    setShowSuggestions(false);
  };

  // Reusable Filter Content
  const FilterContent = () => (
    <>
      {/* Search Input with Autocomplete */}
      <div className="mb-6 relative z-30">
        <label className="block text-sm font-medium text-slate-700 mb-2">{t('listings.city_label')}</label>
        <div className="relative">
          <input 
            type="text" 
            placeholder={t('listings.search_placeholder')}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <Search className={`absolute top-3.5 text-slate-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} size={18} />
          
          {/* Dropdown Autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-fade-in max-h-60 overflow-y-auto">
               {suggestions.map((item, idx) => (
                   <button 
                      key={idx}
                      onClick={() => handleSuggestionClick(item.label)}
                      className="w-full text-start px-4 py-3 hover:bg-blue-50 transition flex items-center gap-3 text-sm border-b border-slate-50 last:border-0 group"
                   >
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${item.type === 'city' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                           {item.type === 'city' ? <MapPin size={14}/> : <GraduationCap size={14}/>}
                      </div>
                      <span className="font-medium text-slate-700 group-hover:text-blue-700 truncate">{item.label}</span>
                   </button>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* University Select */}
      <div className="mb-6 relative z-20">
        <label className="block text-sm font-medium text-slate-700 mb-2">{t('listings.uni_label')}</label>
        <div className="relative">
            <select 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white appearance-none"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="">{t('listings.uni_placeholder')}</option>
              {UNIVERSITIES.map((uni, i) => (
                <option key={i} value={uni}>{uni}</option>
              ))}
            </select>
            <MapPin className={`absolute top-3.5 text-slate-400 pointer-events-none ${language === 'ar' ? 'left-3' : 'right-3'}`} size={18}/>
        </div>
      </div>

      {/* Price Range (Dual Filter) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-4">{t('listings.budget_label')}</label>
        
        <div className="flex items-center justify-between mb-4 text-sm font-bold text-blue-600">
           <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
             {priceMin} <span className="text-xs font-normal text-slate-500">DH</span>
           </div>
           <div className="h-0.5 flex-1 mx-2 bg-slate-200"></div>
           <div className="bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
             {priceMax}+ <span className="text-xs font-normal text-slate-500">DH</span>
           </div>
        </div>

        <div className="relative h-12">
             {/* Min Slider */}
             <div className="mb-4">
                <label className="text-xs text-slate-500 mb-1 block">{t('listings.budget_min')}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceMin}
                  onChange={handleMinChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
             </div>
             
             {/* Max Slider */}
             <div>
                <label className="text-xs text-slate-500 mb-1 block">{t('listings.budget_max')}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="10000" 
                  step="100"
                  value={priceMax}
                  onChange={handleMaxChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
             </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-20 lg:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t('listings.title')}</h1>
                <p className="text-slate-500 mt-1 text-sm md:text-base">{t('listings.subtitle')}</p>
            </div>
            
            {/* Mobile Filter Trigger */}
            <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center justify-center gap-2 w-full md:w-auto bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl font-bold text-slate-700 active:bg-slate-50"
            >
                <SlidersHorizontal size={18} /> 
                {t('listings.filters')} 
                {activeFiltersCount > 0 && <span className="bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{activeFiltersCount}</span>}
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold pb-4 border-b border-slate-100 text-lg">
                <Filter size={20} /> {t('listings.filters')}
              </div>
              <FilterContent />
              <button 
                onClick={resetFilters}
                className="w-full py-3 text-sm text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 rounded-xl transition mt-2"
              >
                {t('listings.reset')}
              </button>
            </div>
          </div>

          {/* Mobile Filters Modal (Slide-up) */}
          {showMobileFilters && (
             <div className="fixed inset-0 z-50 lg:hidden">
                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl transform transition-transform duration-300 animate-slide-up max-h-[85vh] overflow-y-auto">
                     <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><SlidersHorizontal size={20}/> {t('listings.filters')}</h3>
                         <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
                     </div>
                     
                     <FilterContent />
                     
                     <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                         <button 
                             onClick={resetFilters}
                             className="flex-1 py-3 font-bold text-slate-600 bg-slate-100 rounded-xl"
                         >
                             {t('listings.reset')}
                         </button>
                         <button 
                             onClick={() => setShowMobileFilters(false)}
                             className="flex-[2] py-3 font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-200"
                         >
                             {t('listings.see_results').replace('{count}', filteredListings.length.toString())}
                         </button>
                     </div>
                 </div>
             </div>
          )}

          {/* Listings Grid */}
          <div className="lg:w-3/4 w-full">
            {filteredListings.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-slate-200 shadow-sm">
                <div className="inline-block p-6 bg-slate-50 rounded-full mb-4">
                   <Search size={40} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t('listings.no_results')}</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">{t('listings.no_results_desc')}</p>
                <button 
                    onClick={resetFilters}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                    {t('listings.clear_filters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredListings.map((listing: Listing) => (
                  <Link to={`/listing/${listing.id}`} key={listing.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col active:scale-[0.98] transform h-full">
                    {/* Image Section - Uniform Height fixed */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      
                      <div className={`absolute top-3 bg-white/95 backdrop-blur text-slate-900 px-3 py-1.5 rounded-lg font-bold shadow-sm text-sm flex flex-col leading-none ${language === 'ar' ? 'left-3 items-start' : 'right-3 items-end'}`}>
                        <span>{listing.price} <small className="text-[10px] uppercase text-slate-500">{t('listings.per_month')}</small></span>
                      </div>

                      {listing.isVerified && (
                        <div className={`absolute top-3 bg-blue-600/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md ${language === 'ar' ? 'right-3' : 'left-3'}`}>
                          <ShieldCheck size={10} /> {t('listings.verified')}
                        </div>
                      )}
                      
                      {/* Tags Over Image (Mobile Friendly) */}
                      <div className={`absolute bottom-3 flex gap-1.5 ${language === 'ar' ? 'right-3' : 'left-3'}`}>
                         {listing.type === 'Colocation' && <span className="bg-purple-600/90 text-white text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm">{t('listings.coloc')}</span>}
                         <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm flex items-center gap-1"><Armchair size={10}/> {t('listings.furnished')}</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{listing.type} • {listing.city}</p>
                        <div className="flex items-center text-yellow-500 text-xs font-bold">
                           <Star size={12} fill="currentColor" className="mr-1"/> {listing.rating}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition line-clamp-1">{listing.title}</h3>
                      
                      <p className="text-slate-500 text-sm flex items-center gap-1.5 mb-4">
                        <MapPin size={14} className="flex-shrink-0 text-slate-400" /> 
                        <span className="truncate">{listing.university}</span>
                      </p>
                      
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-600 border border-white shadow-sm">
                                {listing.ownerName.charAt(0)}
                            </div>
                            <span className="text-xs text-slate-500 font-medium truncate max-w-[100px]">{listing.ownerName}</span>
                        </div>
                        <span className="text-blue-600 text-xs font-bold px-3 py-1 bg-blue-50 rounded-full group-hover:bg-blue-600 group-hover:text-white transition">
                          {t('listings.view_details')}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
