
import React, { useState } from 'react';
import { MessageCircle, Search, Plus, ThumbsUp, MessageSquare, Tag, TrendingUp, AlertCircle, User, Clock, ArrowLeft, Handshake, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Forum: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const navigate = useNavigate();

  const forumCategories = ["Tous", "Entraide Administrative", "Colocation", "Vie Étudiante", "Bons Plans"];

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

  return (
    <div className="w-full bg-slate-50 py-8 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-bold text-sm group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour
        </button>

        {/* HEADER FORUM */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <MessageCircle className="text-blue-600" size={32}/> Forum de Discussion
                </h1>
                <p className="text-slate-600">Posez vos questions, partagez vos expériences.</p>
           </div>
           <div className="flex gap-3">
               <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                    <Plus size={18}/> Nouveau sujet
               </button>
           </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 mb-6">
            <div className="relative">
                <input type="text" placeholder="Rechercher un sujet (ex: Visa, Bourse, Quartier...)" className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent hover:bg-slate-100 focus:bg-white border focus:border-blue-500 rounded-lg text-sm outline-none transition-all"/>
                <Search className="absolute left-4 top-3 text-slate-400" size={18}/>
            </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 no-scrollbar justify-start md:justify-center">
            {forumCategories.map(cat => (
                <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition border ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Topics List */}
            <div className="lg:col-span-3 space-y-4">
                {filteredTopics.map((topic, index) => {
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

            {/* Sidebar - Cleaned up (Partners Only) */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center shadow-lg text-white sticky top-24">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <Megaphone size={24} className="text-yellow-400"/>
                    </div>
                    <h3 className="font-bold text-white mb-2">Espace Publicitaire</h3>
                    <p className="text-xs text-slate-400 mb-6">
                        Vous êtes une marque ou une école ? Touchez des milliers d'étudiants.
                    </p>
                    <button className="w-full py-3 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition shadow-md">
                        Devenir Partenaire
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
