
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ShoppingBag, BookOpen, ArrowRight, HeartHandshake, Sparkles, Zap, TrendingUp, Coffee, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Community: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
       
       {/* Fun Header with Gradient Blob */}
       <div className="relative pt-28 pb-20 px-4 overflow-hidden">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
           
           <button onClick={() => navigate(-1)} className="absolute top-8 left-4 z-30 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm group">
                <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
                {t('details.back')}
           </button>

           <div className="relative z-10 text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-slate-100 animate-bounce">
                   <span className="text-xl">👋</span> 
                   <span className="text-sm font-bold text-slate-900">Bienvenue dans la Tribu</span>
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                   Ton Campus <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Numérique.</span>
               </h1>
               <p className="text-xl text-slate-600 font-medium leading-relaxed">
                   L'endroit où les étudiants se connectent pour s'entraider, dealer et apprendre. Choisis ta destination ! 🚀
               </p>
           </div>
       </div>

       {/* Main Bento Grid */}
       <div className="max-w-6xl mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-6">
               
               {/* FORUM CARD - The Social Hub */}
               <Link to="/forum" className="group relative bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 border border-slate-100 hover:-translate-y-2 overflow-hidden md:col-span-2 min-h-[320px] flex flex-col justify-between">
                   {/* Decorative Background */}
                   <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                   
                   <div className="relative z-10">
                       <div className="flex items-center justify-between mb-6">
                           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-300 rotate-3 group-hover:rotate-12 transition-transform duration-300">
                               <MessageCircle size={32} fill="currentColor" className="text-blue-400/20"/>
                               <MessageCircle size={32} className="absolute text-white"/>
                           </div>
                           <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                               <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span> 150 en ligne
                           </div>
                       </div>
                       
                       <h2 className="text-4xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Le Forum</h2>
                       <p className="text-lg text-slate-500 font-medium max-w-sm">Pose tes questions, partage tes galères et trouve des solutions avec la communauté.</p>
                   </div>

                   <div className="relative z-10 flex items-center gap-4 mt-8">
                       <span className="text-sm font-bold text-slate-900 bg-slate-100 px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           Rejoindre la discussion <ArrowRight size={16} className="inline ml-2"/>
                       </span>
                       <div className="flex -space-x-3">
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-yellow-200 flex items-center justify-center text-xl">😼</div>
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-200 flex items-center justify-center text-xl">👩‍🎓</div>
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-green-200 flex items-center justify-center text-xl">🧑‍💻</div>
                       </div>
                   </div>
               </Link>

               {/* MARKET CARD - The Deal Hub */}
               <Link to="/marketplace" className="group relative bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-purple-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden text-white min-h-[320px] flex flex-col justify-between">
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-purple-900 opacity-100 group-hover:opacity-90 transition-opacity"></div>
                   <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500 blur-[60px] opacity-30"></div>
                   
                   <div className="relative z-10">
                       <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-purple-300 mb-6 border border-white/10 -rotate-3 group-hover:-rotate-12 transition-transform duration-300">
                           <ShoppingBag size={32} />
                       </div>
                       <h2 className="text-3xl font-bold mb-2">Marketplace</h2>
                       <p className="text-slate-300 font-medium">Achète et vends tes meubles, livres et équipements.</p>
                   </div>

                   <div className="relative z-10 mt-6">
                       <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex gap-4 items-center hover:bg-white/20 transition">
                           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">🎸</div>
                           <div>
                               <p className="text-xs font-bold text-purple-300 uppercase">Offre du jour</p>
                               <p className="font-bold">Guitare Yamaha</p>
                               <p className="text-xs text-slate-300">450 DH</p>
                           </div>
                       </div>
                   </div>
               </Link>

               {/* BLOG CARD - The Knowledge Hub */}
               <Link to="/blog" className="group relative bg-yellow-400 rounded-[2.5rem] p-8 shadow-xl shadow-yellow-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden md:col-span-1 min-h-[280px] flex flex-col justify-between">
                   <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                   
                   <div className="relative z-10">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-yellow-600 mb-6 shadow-lg group-hover:scale-110 transition-transform">
                           <BookOpen size={28} />
                       </div>
                       <h2 className="text-3xl font-black text-slate-900 mb-2">Le Blog</h2>
                       <p className="text-slate-800 font-bold text-lg leading-tight">Guides de survie & Astuces pour ta vie étudiante.</p>
                   </div>

                   <div className="relative z-10 mt-4 flex items-center justify-between">
                       <div className="flex gap-1">
                           <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
                           <span className="w-2 h-2 bg-slate-900/50 rounded-full"></span>
                           <span className="w-2 h-2 bg-slate-900/30 rounded-full"></span>
                       </div>
                       <ArrowRight size={28} className="text-slate-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300"/>
                   </div>
               </Link>

               {/* STATS / FUN CARD */}
               <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                   <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-green-400 to-emerald-500"></div>
                   
                   <div className="flex items-center gap-6">
                       <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-4xl animate-bounce">
                           🚀
                       </div>
                       <div>
                           <h3 className="text-2xl font-bold text-slate-900 mb-1">La commu' s'agrandit !</h3>
                           <p className="text-slate-500">Rejoins <span className="font-bold text-green-600">15,000+ étudiants</span> connectés au Maroc.</p>
                       </div>
                   </div>

                   <div className="flex gap-8 text-center">
                        <div>
                            <p className="text-3xl font-black text-slate-900">254</p>
                            <p className="text-xs font-bold text-slate-400 uppercase">Nouveaux inscrits</p>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-900">18</p>
                            <p className="text-xs font-bold text-slate-400 uppercase">Colocs formées</p>
                        </div>
                   </div>
               </div>

           </div>
       </div>

       {/* Live Activity Ticker (Static simulation) */}
       <div className="mt-12 overflow-hidden bg-slate-900 py-3 -rotate-1 shadow-xl transform scale-105">
            <div className="flex gap-8 animate-marquee whitespace-nowrap text-white font-bold text-sm items-center justify-center">
                <span className="flex items-center gap-2"><Sparkles size={14} className="text-yellow-400"/> Sarah a vendu "Livre Droit" (Rabat)</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-2"><HeartHandshake size={14} className="text-pink-400"/> Nouvelle colocation formée à Casa !</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-2"><Zap size={14} className="text-purple-400"/> Offre Flash : iPhone 11 à 2000DH</span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-2"><Coffee size={14} className="text-orange-400"/> Nouveau spot révision ajouté : "Café Paul"</span>
            </div>
       </div>

    </div>
  );
};

export default Community;
