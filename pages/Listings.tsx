import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, MapPin, ShieldCheck, Star, Armchair, Utensils, Bath, X, SlidersHorizontal } from 'lucide-react';
import { MOCK_LISTINGS, UNIVERSITIES } from '../constants';
import { Listing } from '../types';

const Listings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [priceMax, setPriceMax] = useState<number>(20000);
  
  // Mobile Filters State
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter Logic
  const filteredListings = MOCK_LISTINGS.filter(listing => {
    const matchesSearch = listing.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUni = selectedUniversity ? listing.university === selectedUniversity : true;
    const matchesPrice = listing.price <= priceMax;

    return matchesSearch && matchesUni && matchesPrice;
  });

  const activeFiltersCount = (selectedUniversity ? 1 : 0) + (priceMax < 20000 ? 1 : 0) + (searchTerm ? 1 : 0);

  // Reusable Filter Content
  const FilterContent = () => (
    <>
      {/* Search Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Ville ou mot-clé</label>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ex: Rabat, Agdal..." 
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
        </div>
      </div>

      {/* University Select */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Université proche</label>
        <div className="relative">
            <select 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white appearance-none"
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
            >
              <option value="">Toutes les universités</option>
              {UNIVERSITIES.map((uni, i) => (
                <option key={i} value={uni}>{uni}</option>
              ))}
            </select>
            <MapPin className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={18}/>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-4">Budget Max: <span className="text-blue-600 font-bold">{priceMax} MAD</span></label>
        <input 
          type="range" 
          min="1000" 
          max="20000" 
          step="100"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
          <span>1000 DH</span>
          <span>20000+ DH</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-6 pb-20 lg:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Trouvez votre logement</h1>
                <p className="text-slate-500 mt-1 text-sm md:text-base">Des centaines de chambres vérifiées avec photos.</p>
            </div>
            
            {/* Mobile Filter Trigger */}
            <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center justify-center gap-2 w-full md:w-auto bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl font-bold text-slate-700 active:bg-slate-50"
            >
                <SlidersHorizontal size={18} /> 
                Filtres 
                {activeFiltersCount > 0 && <span className="bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{activeFiltersCount}</span>}
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold pb-4 border-b border-slate-100 text-lg">
                <Filter size={20} /> Filtres
              </div>
              <FilterContent />
              <button 
                onClick={() => {setSearchTerm(''); setSelectedUniversity(''); setPriceMax(20000);}}
                className="w-full py-3 text-sm text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 rounded-xl transition mt-2"
              >
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Mobile Filters Modal (Slide-up) */}
          {showMobileFilters && (
             <div className="fixed inset-0 z-50 lg:hidden">
                 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)}></div>
                 <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl transform transition-transform duration-300 animate-slide-up max-h-[85vh] overflow-y-auto">
                     <div className="flex items-center justify-between mb-6">
                         <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><SlidersHorizontal size={20}/> Filtres</h3>
                         <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-slate-100 rounded-full"><X size={20}/></button>
                     </div>
                     
                     <FilterContent />
                     
                     <div className="flex gap-3 mt-8 pt-4 border-t border-slate-100">
                         <button 
                             onClick={() => {setSearchTerm(''); setSelectedUniversity(''); setPriceMax(20000);}}
                             className="flex-1 py-3 font-bold text-slate-600 bg-slate-100 rounded-xl"
                         >
                             Réinitialiser
                         </button>
                         <button 
                             onClick={() => setShowMobileFilters(false)}
                             className="flex-[2] py-3 font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-200"
                         >
                             Voir {filteredListings.length} logements
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
                <h3 className="text-xl font-bold text-slate-900">Aucun résultat trouvé</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">Essayez d'augmenter votre budget ou de changer de ville.</p>
                <button 
                    onClick={() => {setSearchTerm(''); setSelectedUniversity(''); setPriceMax(20000);}}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                    Effacer les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredListings.map((listing: Listing) => (
                  <Link to={`/listing/${listing.id}`} key={listing.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col active:scale-[0.98] transform">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-56 overflow-hidden">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur text-slate-900 px-3 py-1.5 rounded-lg font-bold shadow-sm text-sm flex flex-col items-end leading-none">
                        <span>{listing.price} <small className="text-[10px] uppercase text-slate-500">DH</small></span>
                      </div>

                      {listing.isVerified && (
                        <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur text-white px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md">
                          <ShieldCheck size={10} /> VÉRIFIÉ
                        </div>
                      )}
                      
                      {/* Tags Over Image (Mobile Friendly) */}
                      <div className="absolute bottom-3 left-3 flex gap-1.5">
                         {listing.type === 'Colocation' && <span className="bg-purple-600/90 text-white text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm">Coloc</span>}
                         <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm flex items-center gap-1"><Armchair size={10}/> Meublé</span>
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
                          Voir
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