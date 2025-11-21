
import React, { useState } from 'react';
import { Search, Filter, Plus, ShoppingBag, MapPin, ShieldCheck, ArrowUpRight, Info, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Marketplace: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [marketCategory, setMarketCategory] = useState('Tous');

  const marketCategories = ["Tous", "Meubles", "Électroménager", "High-Tech", "Livres", "Vêtements"];

  const marketplaceItems = [
    {
        id: 1,
        title: "Bureau IKEA blanc + Chaise ergonomique",
        price: 450,
        currency: "DH",
        location: "Rabat, Agdal",
        category: "Meubles",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
        seller: "Karim B.",
        verified: true,
        time: "Il y a 2h",
        condition: "Très bon état"
    },
    {
        id: 2,
        title: "Frigo Table Top (Idéal Studio)",
        price: 800,
        currency: "DH",
        location: "Casablanca, Maarif",
        category: "Électroménager",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=600&q=80",
        seller: "Sarah L.",
        verified: true,
        time: "Il y a 5h",
        condition: "Bon état"
    },
    {
        id: 3,
        title: "Pack Livres Droit 1ère année (Complet)",
        price: 200,
        currency: "DH",
        location: "Tanger",
        category: "Livres",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
        seller: "Youssef K.",
        verified: false,
        time: "Hier",
        condition: "Comme neuf"
    },
    {
        id: 4,
        title: "Micro-ondes Samsung",
        price: 300,
        currency: "DH",
        location: "Rabat, Hay Riad",
        category: "Électroménager",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
        seller: "Amine T.",
        verified: true,
        time: "Il y a 1 jour",
        condition: "Usé"
    },
    {
        id: 5,
        title: "Matelas 1 place + Sommier",
        price: 600,
        currency: "DH",
        location: "Marrakech",
        category: "Meubles",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
        seller: "Leila M.",
        verified: true,
        time: "Il y a 2 jours",
        condition: "Bon état"
    },
    {
        id: 6,
        title: "Écran PC 24 pouces Dell",
        price: 750,
        currency: "DH",
        location: "Rabat, Océan",
        category: "High-Tech",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
        seller: "Omar H.",
        verified: false,
        time: "Il y a 3h",
        condition: "Excellent"
    }
  ];

  const filteredMarket = marketCategory === 'Tous'
    ? marketplaceItems
    : marketplaceItems.filter(item => item.category === marketCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-bold text-sm group">
               <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
               {t('details.back')}
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
                        <ShoppingBag className="text-purple-600" size={32}/> {t('market.title')}
                    </h1>
                    <p className="text-slate-600 max-w-xl">{t('market.subtitle')}</p>
                </div>
                
                <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition flex items-center gap-2">
                    <Plus size={20}/> {t('market.post_ad')}
                </button>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <input type="text" placeholder={t('market.search_placeholder')} className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500"/>
                        <Search className="absolute left-4 top-3 text-slate-400" size={18}/>
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                        {marketCategories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setMarketCategory(cat)}
                                className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition border ${marketCategory === cat ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:bg-purple-50'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMarket.map(item => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer">
                        <div className="relative h-64 overflow-hidden bg-slate-100">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                            
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-900 px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1">
                                <Info size={10}/> {item.time}
                            </div>
                            
                            <div className="absolute bottom-3 left-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                                {item.price} <span className="text-xs font-normal opacity-80">{item.currency}</span>
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-1 rounded">{item.category}</span>
                                <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-100">{item.condition}</span>
                            </div>
                            
                            <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-purple-600 transition line-clamp-2">{item.title}</h3>
                            
                            <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                                <MapPin size={12} className="text-slate-400"/> {item.location}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                                        {item.seller.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700">{item.seller}</span>
                                        {item.verified && <span className="text-[9px] text-green-600 flex items-center gap-0.5"><ShieldCheck size={8}/> {t('market.verified_student')}</span>}
                                    </div>
                                </div>
                                <button className="text-white bg-purple-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-700 transition shadow-sm shadow-purple-200">
                                    {t('market.contact')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMarket.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg">Aucun objet trouvé dans cette catégorie.</p>
                    <button className="mt-4 text-purple-600 font-bold hover:underline">Voir tout</button>
                </div>
            )}
        </div>
    </div>
  );
};

export default Marketplace;
