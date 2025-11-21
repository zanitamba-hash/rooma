
import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Tag, Globe, Scale, HeartHandshake, Home, User, GraduationCap, ArrowLeft, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const categories = ["Tous", "Intégration & Culture", "Démarches Administratives", "Vie Étudiante", "Conseils Bailleurs"];

  const blogPosts = [
    {
      id: 1,
      title: "Carte de Séjour au Maroc : Le Guide Ultime 2024",
      category: "Démarches Administratives",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80", // Image neutre juridique
      author: "Sarah Benali",
      role: "Juriste Room.ma",
      date: "12 Oct 2024",
      readTime: "8 min",
      excerpt: "Tout ce que les étudiants étrangers doivent savoir sur la demande et le renouvellement de leur titre de séjour. Documents, délais et astuces pour éviter les rejets.",
      isFeatured: true
    },
    {
      id: 2,
      title: "Survivre aux premiers jours : Petit lexique Darija indispensable",
      category: "Intégration & Culture",
      image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=600&q=80", // Thé à la menthe authentique
      author: "Youssef K.",
      role: "Ambassadeur",
      date: "10 Oct 2024",
      readTime: "5 min",
      excerpt: "De 'Salam' à 'Bchhal hada?', apprenez les mots clés pour négocier au souk, prendre le taxi et vous faire des amis dès votre arrivée.",
      isFeatured: false
    },
    {
      id: 3,
      title: "Propriétaires : Comment bien choisir son locataire étudiant ?",
      category: "Conseils Bailleurs",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80", // Clés / Immobilier
      author: "Equipe Room.ma",
      role: "Expert",
      date: "08 Oct 2024",
      readTime: "6 min",
      excerpt: "Garantie parentale, vérification de scolarité, feeling... Nos conseils pour une relation locative sereine et sécurisée.",
      isFeatured: false
    },
    {
      id: 4,
      title: "Colocation : Les 5 règles d'or pour ne pas s'entretuer",
      category: "Vie Étudiante",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80", // Amis divers
      author: "Mehdi O.",
      role: "Alumni",
      date: "05 Oct 2024",
      readTime: "4 min",
      excerpt: "Frigo partagé, ménage, bruit... Comment gérer la vie commune sans perdre ses nerfs (et ses amis).",
      isFeatured: false
    },
    {
      id: 5,
      title: "Les meilleurs spots pour réviser à Rabat (Wifi & Calme)",
      category: "Vie Étudiante",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", // Bibliothèque
      author: "Leila M.",
      role: "Étudiante",
      date: "01 Oct 2024",
      readTime: "3 min",
      excerpt: "Notre sélection des cafés littéraires et bibliothèques où vous pourrez travailler efficacement tout en buvant un bon thé.",
      isFeatured: false
    },
    {
      id: 6,
      title: "Comprendre le contrat de bail marocain (Loi 67-12)",
      category: "Démarches Administratives",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80", // Contrat
      author: "Cabinet Hicham",
      role: "Partenaire",
      date: "28 Sept 2024",
      readTime: "10 min",
      excerpt: "Déchiffrer le jargon juridique : caution, préavis, état des lieux. Vos droits et devoirs en tant que locataire étranger.",
      isFeatured: false
    }
  ];

  const filteredPosts = activeCategory === 'Tous' ? blogPosts : blogPosts.filter(post => post.category === activeCategory);
  const featuredPost = blogPosts.find(p => p.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 relative overflow-hidden">
         {/* Image d'architecture marocaine en background */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>
         
         <button onClick={() => navigate(-1)} className="absolute top-24 left-4 md:left-8 z-20 text-white/80 hover:text-white flex items-center gap-2 font-bold transition hover:-translate-x-1">
             <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} /> {t('details.back')}
         </button>

         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-block p-3 bg-blue-600 rounded-full mb-6 animate-bounce">
               <BookOpen size={32} className="text-white"/>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Guide de l'Étudiant & Blog</h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
               Bienvenue au Maroc ! 🇲🇦 <br/>
               Démarches administratives, culture, logement : on vous explique tout pour réussir votre installation et vos études.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-20">
         
         {/* Filters */}
         <div className="bg-white p-2 rounded-xl shadow-lg mb-12 flex flex-col md:flex-row gap-2 overflow-x-auto no-scrollbar mx-auto max-w-4xl border border-slate-100">
            {categories.map(cat => (
               <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         {/* Ad Banner */}
         <div className="mb-12 bg-yellow-400 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 flex items-center gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                    <Megaphone size={24} className="text-slate-900"/>
                </div>
                <div>
                    <h3 className="font-black text-xl text-slate-900">Devenez Partenaire Room.ma</h3>
                    <p className="text-slate-800 font-medium">Touchez plus de 50 000 étudiants chaque mois.</p>
                </div>
            </div>
            <button className="relative z-10 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg whitespace-nowrap">
                Contactez la régie
            </button>
         </div>

         {/* Featured Post (Only on 'Tous') */}
         {activeCategory === 'Tous' && featuredPost && (
            <div className="mb-16 group cursor-pointer">
               <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition duration-500">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                     <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
                     <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                        <Scale size={12}/> {featuredPost.category}
                     </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                     <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-3">
                        <span>À la une</span> • <span>{featuredPost.date}</span>
                     </div>
                     <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition">
                        {featuredPost.title}
                     </h2>
                     <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                     </p>
                     <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                              {featuredPost.author.charAt(0)}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900">{featuredPost.author}</p>
                              <p className="text-xs text-slate-500">{featuredPost.role}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
                           <Clock size={16}/> {featuredPost.readTime}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Articles Grid */}
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(p => !p.isFeatured || activeCategory !== 'Tous').map(post => (
               <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col h-full cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                     <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                        {post.category}
                     </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
                        <Calendar size={12}/> {post.date}
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition">
                        {post.title}
                     </h3>
                     <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                     </p>
                     
                     <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                           <User size={12} className="text-blue-600"/> {post.author}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                           <Clock size={12}/> {post.readTime}
                        </span>
                     </div>
                  </div>
               </article>
            ))}
         </div>

         {/* Newsletter Section */}
         <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">Ne ratez aucune info !</h2>
               <p className="text-blue-100 mb-8 text-lg">
                  Inscrivez-vous à notre newsletter pour recevoir les alertes logements, les rappels administratifs et les bons plans étudiants chaque semaine.
               </p>
               <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                     type="email" 
                     placeholder="Votre email étudiant..." 
                     className="flex-1 px-6 py-4 rounded-xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-400/50"
                  />
                  <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2">
                     S'inscrire <ArrowRight size={20}/>
                  </button>
               </div>
               <p className="text-xs text-blue-200 mt-4 opacity-70">Pas de spam. Désinscription en un clic.</p>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Blog;
