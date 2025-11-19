
import React, { useState } from 'react';
import { MessageCircle, Search, Plus, ThumbsUp, MessageSquare, User, Tag, TrendingUp, Info, ExternalLink, Gift, Wifi, ShoppingBag, ShoppingCart, Filter, DollarSign, MapPin, Armchair, Laptop, Book, Lamp, Monitor, Shirt, Briefcase, ArrowUpRight, ShieldCheck, Star, AlertCircle } from 'lucide-react';

const Forum: React.FC = () => {
  const [viewMode, setViewMode] = useState<'discussions' | 'marketplace'>('discussions');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [marketCategory, setMarketCategory] = useState('Tous');

  const forumCategories = ["Tous", "Entraide Administrative", "Colocation", "Vie Étudiante", "Bons Plans"];
  const marketCategories = ["Tous", "Meubles", "Électroménager", "High-Tech", "Livres", "Vêtements"];

  const forumTopics = [
    {
      id: 1,
      title: "Comment renouveler sa carte de séjour à Rabat ?",
      author: "Mamadou D.",
      role: "Étudiant",
      category: "Entraide Administrative",
      replies: 12,
      likes: 45,
      time: "Il y a 2 heures",
      isHot: true,
      tags: ["Visa", "Rabat", "Administratif"]
    },
    {
      id: 2,
      title: "URGENT: Cherche colocataire pour grand appartement à Hay Riad (Entrée immédiate)",
      author: "Sarah L.",
      role: "Étudiant",
      category: "Colocation",
      replies: 5,
      likes: 8,
      time: "Il y a 5 heures",
      isHot: false,
      tags: ["Urgent", "Filles uniquement"]
    },
    {
      id: 3,
      title: "Avis sur la résidence universitaire Bayt Al Maarija ?",
      author: "Karim B.",
      role: "Alumni",
      category: "Vie Étudiante",
      replies: 8,
      likes: 14,
      time: "Il y a 1 jour",
      isHot: false,
      tags: ["Logement", "Avis"]
    },
    {
      id: 4,
      title: "Meilleurs endroits pour réviser à Casablanca (Cafés calmes) ?",
      author: "Yassine O.",
      role: "Étudiant",
      category: "Vie Étudiante",
      replies: 24,
      likes: 60,
      time: "Il y a 2 jours",
      isHot: true,
      tags: ["Café", "Bibliothèque"]
    }
  ];

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

  const partnerAds = [
    {
      id: 1,
      brand: "Orange Maroc",
      title: "Pack Fibre Étudiant",
      description: "Internet Fibre Optique 100 Méga à partir de 250 DH/mois. Installation offerte.",
      icon: <Wifi size={24} className="text-orange-500"/>,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700"
    },
    {
      id: 2,
      brand: "Kitea",
      title: "Starter Pack Studio",
      description: "-15% sur tout le rayon 'Jeune Habitat' sur présentation carte étudiant.",
      icon: <Armchair size={24} className="text-blue-600"/>,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700"
    },
    {
      id: 3,
      brand: "AXA Assurance",
      title: "Assurance Habitation",
      description: "Protégez vos biens (PC, Téléphone) contre le vol et la casse pour 400 DH/an.",
      icon: <Info size={24} className="text-red-600"/>,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700"
    }
  ];

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
        case 'Meubles': return <Armchair size={16}/>;
        case 'Électroménager': return <Lamp size={16}/>;
        case 'High-Tech': return <Monitor size={16}/>;
        case 'Livres': return <Book size={16}/>;
        case 'Vêtements': return <Shirt size={16}/>;
        default: return <Tag size={16}/>;
    }
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Entraide Administrative': return 'bg-purple-100 text-purple-700';
          case 'Colocation': return 'bg-pink-100 text-pink-700';
          case 'Vie Étudiante': return 'bg-blue-100 text-blue-700';
          default: return 'bg-slate-100 text-slate-700';
      }
  };

  // Filtering Logic
  const filteredTopics = activeCategory === 'Tous' 
    ? forumTopics 
    : forumTopics.filter(topic => topic.category === activeCategory);

  const filteredMarket = marketCategory === 'Tous'
    ? marketplaceItems
    : marketplaceItems.filter(item => item.category === marketCategory);

  return (
    <div className="w-full bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER FORUM */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <MessageCircle className="text-blue-600" size={32}/> Communauté Room.ma
                </h1>
                <p className="text-slate-600">L'espace d'échange sécurisé pour les étudiants au Maroc.</p>
           </div>
           
           {/* MODE SWITCHER TABS */}
           <div className="p-1.5 bg-white border border-slate-200 rounded-xl inline-flex shadow-sm">
              <button 
                onClick={() => setViewMode('discussions')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 ${viewMode === 'discussions' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                 <MessageSquare size={18}/> Discussions
              </button>
              <button 
                onClick={() => setViewMode('marketplace')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300 ${viewMode === 'marketplace' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                 <ShoppingCart size={18}/> Marketplace
              </button>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
             
             {/* --- VUE DISCUSSIONS --- */}
             {viewMode === 'discussions' && (
                <div className="animate-fade-in">
                    {/* Search & Action Bar */}
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-2">
                        <div className="relative w-full md:w-auto flex-1">
                            <input type="text" placeholder="Rechercher un sujet (ex: Visa, Bourse, Quartier...)" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white border focus:border-blue-500 rounded-lg text-sm outline-none transition-all"/>
                            <Search className="absolute left-4 top-3 text-slate-400" size={18}/>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                            <Plus size={18}/> Nouveau sujet
                        </button>
                    </div>

                    {/* Categories Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
                        {forumCategories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${activeCategory === cat ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Topics List */}
                    <div className="space-y-4">
                        {filteredTopics.map(topic => {
                            const isUrgent = topic.tags.includes('Urgent');
                            return (
                                <div key={topic.id} className={`p-6 rounded-2xl shadow-sm border transition cursor-pointer group relative overflow-hidden ${isUrgent ? 'bg-red-50 border-red-500/50 shadow-red-100 hover:border-red-500' : 'bg-white border-slate-200 hover:shadow-md hover:border-blue-200'}`}>
                                    {topic.isHot && (
                                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                                            <TrendingUp size={10}/> HOT
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${getCategoryColor(topic.category)}`}>
                                            {topic.category}
                                        </span>
                                        {isUrgent && (
                                            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded border border-red-700 flex items-center gap-1 animate-pulse shadow-sm">
                                                <AlertCircle size={10} /> URGENT
                                            </span>
                                        )}
                                    </div>

                                    <h3 className={`text-lg font-bold mb-3 transition pr-8 leading-snug ${isUrgent ? 'text-red-900 group-hover:text-red-700' : 'text-slate-900 group-hover:text-blue-600'}`}>
                                        {topic.title}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {topic.tags.map(tag => (
                                            <span key={tag} className={`text-[10px] font-medium px-2 py-1 rounded flex items-center gap-1 border ${tag === 'Urgent' ? 'bg-red-100 text-red-700 border-red-200 font-bold' : 'text-slate-500 bg-slate-50 border-slate-100'}`}>
                                                <Tag size={10}/> {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={`flex items-center justify-between pt-4 border-t ${isUrgent ? 'border-red-100' : 'border-slate-50'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                                {topic.author.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">{topic.author}</p>
                                                <p className="text-[10px] text-slate-400">{topic.role} • {topic.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-500 text-sm">
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded hover:bg-blue-50 hover:text-blue-600 transition">
                                                <MessageSquare size={16}/> <span className="font-bold">{topic.replies}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded hover:bg-green-50 hover:text-green-600 transition">
                                                <ThumbsUp size={16}/> <span className="font-bold">{topic.likes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
             )}

             {/* --- VUE MARKETPLACE --- */}
             {viewMode === 'marketplace' && (
                 <div className="animate-fade-in">
                    {/* Hero Banner Marketplace */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8 mb-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Bourse aux équipements</h2>
                                <p className="text-blue-100 text-sm max-w-md leading-relaxed">
                                    Achetez et vendez vos meubles, livres et électroménager entre étudiants.
                                    Transactions sécurisées en main propre.
                                </p>
                            </div>
                            <button className="px-6 py-3 bg-white text-blue-700 rounded-xl font-bold shadow-xl hover:bg-blue-50 transition flex items-center gap-2 whitespace-nowrap transform hover:scale-105">
                                <Plus size={20}/> Déposer une annonce
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                         <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
                            {marketCategories.map(cat => (
                                <button 
                                    key={cat} 
                                    onClick={() => setMarketCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition flex items-center gap-2 border ${marketCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                                >
                                    {cat !== 'Tous' && getCategoryIcon(cat)} {cat}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                             <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                                <Filter size={18}/>
                             </button>
                             <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 outline-none font-medium cursor-pointer hover:border-blue-300 transition">
                                 <option>Plus récents</option>
                                 <option>Prix croissant</option>
                                 <option>Prix décroissant</option>
                             </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {filteredMarket.map(item => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                <div className="relative h-52 overflow-hidden bg-slate-100">
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
                                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">{item.category}</span>
                                        <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-100">{item.condition}</span>
                                    </div>
                                    
                                    <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition">{item.title}</h3>
                                    
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
                                                {item.verified && <span className="text-[9px] text-green-600 flex items-center gap-0.5"><ShieldCheck size={8}/> Vérifié</span>}
                                            </div>
                                        </div>
                                        <button className="text-white bg-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition shadow-sm shadow-blue-200">
                                            Contacter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
             )}
          </div>

          {/* Sidebar - Partners & Ads (Common to both views) */}
          <div className="lg:col-span-1">
             <div className="sticky top-24 space-y-6">
                
                {/* Rules Box */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                   <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10 text-lg">
                       {viewMode === 'discussions' ? <Info size={20} className="text-blue-400"/> : <ShieldCheck size={20} className="text-green-400"/>}
                       {viewMode === 'discussions' ? 'Charte du Forum' : 'Achats Sécurisés'}
                   </h3>
                   <ul className="text-sm text-slate-300 space-y-3 list-disc pl-4 relative z-10 leading-relaxed">
                      {viewMode === 'discussions' ? (
                          <>
                            <li>Soyez respectueux et bienveillant.</li>
                            <li>Pas de spam ni de publicité abusive.</li>
                            <li>Utilisez la recherche avant de poster.</li>
                          </>
                      ) : (
                          <>
                            <li>Privilégiez la remise en main propre.</li>
                            <li>Ne payez jamais par mandat cash.</li>
                            <li>Vérifiez l'objet avant de payer.</li>
                          </>
                      )}
                   </ul>
                </div>

                {/* Partners Ad Space */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                   <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                         <Gift className="text-pink-500"/> Bons Plans
                      </h3>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200 tracking-wide">SPONSORISÉ</span>
                   </div>

                   <div className="space-y-4">
                      {partnerAds.map(ad => (
                         <div key={ad.id} className={`p-4 rounded-xl border ${ad.color} transition hover:shadow-md bg-opacity-30 group cursor-pointer`}>
                            <div className="flex items-start gap-3 mb-2">
                               <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition duration-300">{ad.icon}</div>
                               <div>
                                  <h4 className={`font-bold text-sm ${ad.textColor}`}>{ad.brand}</h4>
                                  <h5 className="font-bold text-slate-900 text-sm leading-tight">{ad.title}</h5>
                               </div>
                            </div>
                            <p className="text-xs text-slate-600 mb-3 leading-relaxed pl-1">
                               {ad.description}
                            </p>
                            <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1 transition">
                               Voir l'offre <ArrowUpRight size={12}/>
                            </button>
                         </div>
                      ))}
                   </div>
                </div>

                {/* SECTION PARTENAIRE / B2B (Business) */}
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative bg-slate-900 rounded-2xl p-6 text-center border border-slate-800 shadow-2xl overflow-hidden">
                        {/* Deco Background */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white transform group-hover:rotate-12 transition duration-300">
                                <Briefcase size={24}/>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Vous êtes une marque ?</h3>
                            <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                                Associez votre image à la première communauté étudiante du Maroc. Devenez partenaire officiel de Room.ma.
                            </p>
                            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-blue-50 transition flex items-center justify-center gap-2 group-hover:shadow-lg">
                                Devenir Partenaire <ArrowUpRight size={16}/>
                            </button>
                        </div>
                    </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
