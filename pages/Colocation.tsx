
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, MapPin, Coffee, Wifi, BookOpen, Sparkles, Music, Home, Filter, MessageSquare, UserPlus, Zap, Utensils, ArrowRight, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Interface pour Offre Coloc (Appartement)
interface ColocListing {
    id: number;
    title: string;
    price: number;
    city: string;
    university: string;
    image: string;
    vibe: 'Studieuse' | 'Festive' | 'Chill';
    roommates: {name: string, avatarColor: string}[];
    gender: 'Girls' | 'Boys' | 'Mixed';
    spotsLeft: number;
    amenities: string[];
}

// MOCK DATA: OFFRES COLOC (CHAMBRES)
const APARTMENT_DATA: ColocListing[] = [
    {
        id: 201, 
        title: "Coloc Villa Souissi",
        price: 2500,
        city: "Rabat",
        university: "UIR",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        vibe: 'Chill',
        amenities: ['Netflix', 'Ménage inclus', 'Jardin'],
        roommates: [{name: "Sarah", avatarColor: "bg-pink-500"}, {name: "Ahmed", avatarColor: "bg-blue-500"}],
        gender: 'Mixed',
        spotsLeft: 1
    },
    {
        id: 202, 
        title: "Appartement Hyper-Centre",
        price: 1800,
        city: "Casablanca",
        university: "Hassan II",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        vibe: 'Studieuse',
        amenities: ['Fibre Optique', 'Bureau individuel'],
        roommates: [{name: "Youssef", avatarColor: "bg-indigo-500"}, {name: "Omar", avatarColor: "bg-slate-500"}],
        gender: 'Boys',
        spotsLeft: 2
    }
];

const Colocation: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // State Modes (The Core Choice)
  const [viewMode, setViewMode] = useState<'have_room' | 'need_room'>('need_room');

  // States for Find Room (Listings)
  const [activeVibe, setActiveVibe] = useState<'All' | 'Studieuse' | 'Festive' | 'Chill'>('All');

  // States for Matcher
  const [showMatcher, setShowMatcher] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [hasMatched, setHasMatched] = useState(false);
  
  // --- HANDLERS ---

  const handleContactRoom = (listing: ColocListing) => {
      navigate('/messages', {
          state: {
              contactId: `coloc_apt_${listing.id}`,
              contactName: `Coloc ${listing.title}`,
              initialMessage: `Bonjour, je suis intéressé par la place disponible dans "${listing.title}". Est-ce qu'on peut organiser une visite ?`
          }
      });
  };

  const handlePublishAd = () => {
      // Redirect to add-room but specifically for Colocation type
      navigate('/add-room');
  };

  // --- MATCHER LOGIC ---
  const handleQuizSelection = (key: string, value: string | string[]) => {
      // Logic to store pref
      if (quizStep < 4) {
          setQuizStep(quizStep + 1);
      } else {
          // Finish Quiz
          setHasMatched(true);
          setShowMatcher(false);
          // In a real app, we would fetch filtered apartments here
      }
  };

  // Filter Listings (Rooms)
  const filteredApartments = APARTMENT_DATA.filter(l => activeVibe === 'All' || l.vibe === activeVibe);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER: INSTRUCTIONS & CHOIX */}
      <div className="bg-slate-900 pt-24 pb-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
          
          <button onClick={() => navigate(-1)} className="absolute top-6 left-4 md:left-8 z-20 text-white/80 hover:text-white flex items-center gap-2 font-bold transition hover:-translate-x-1">
               <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} /> {t('details.back')}
          </button>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('coloc_page.hero_title')}</h1>
              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">{t('coloc_page.hero_subtitle')}</p>
              
              {/* MAIN TABS SWITCHER */}
              <div className="inline-flex bg-white/10 p-1.5 rounded-full backdrop-blur-md border border-white/20">
                  <button 
                    onClick={() => setViewMode('have_room')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'have_room' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                  >
                      <Home size={18} /> {t('coloc_page.tab_have_room')}
                  </button>
                  <button 
                    onClick={() => setViewMode('need_room')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${viewMode === 'need_room' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-white hover:bg-white/10'}`}
                  >
                      <Users size={18} /> {t('coloc_page.tab_need_room')}
                  </button>
              </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
         
         {/* --- MODE 1: J'AI UNE CHAMBRE (PROPOSER) --- */}
         {viewMode === 'have_room' && (
             <div className="animate-slide-up">
                 <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200 text-center max-w-3xl mx-auto">
                     <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <Home size={40} />
                     </div>
                     <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('coloc_page.have_room_title')}</h2>
                     <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                         {t('coloc_page.have_room_desc')}
                     </p>
                     
                     <div className="grid md:grid-cols-3 gap-6 mb-10 text-left">
                         <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                             <div className="font-bold text-slate-900 mb-2 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Profils Vérifiés</div>
                             <p className="text-xs text-slate-500">Recevez des demandes uniquement d'étudiants avec identité validée.</p>
                         </div>
                         <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                             <div className="font-bold text-slate-900 mb-2 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Matcher Vibe</div>
                             <p className="text-xs text-slate-500">Définissez l'ambiance de la coloc (Studieuse, Fête...) pour attirer les bonnes personnes.</p>
                         </div>
                         <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                             <div className="font-bold text-slate-900 mb-2 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Contrat Coloc</div>
                             <p className="text-xs text-slate-500">Générez un contrat de bail spécifique colocation automatiquement.</p>
                         </div>
                     </div>

                     <button 
                        onClick={handlePublishAd}
                        className="px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2 mx-auto"
                     >
                        <UserPlus size={20} /> {t('coloc_page.btn_create_ad')}
                     </button>
                 </div>
             </div>
         )}

         {/* --- MODE 2: JE CHERCHE UNE CHAMBRE (LISTINGS + MATCHER) --- */}
         {viewMode === 'need_room' && (
             <div className="animate-slide-up">
                
                {/* MATCHER CTA */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 md:p-10 text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3"><Sparkles className="text-yellow-300"/> {t('coloc_page.matcher_title')}</h2>
                        <p className="text-indigo-100 text-lg max-w-xl">{t('coloc_page.matcher_desc')}</p>
                    </div>
                    <button 
                        onClick={() => setShowMatcher(true)}
                        className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2 whitespace-nowrap"
                    >
                        <Zap size={20}/> {t('coloc_page.btn_matcher')}
                    </button>
                </div>

                {/* FILTERS */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 flex flex-wrap gap-4 items-center">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-2"><Filter size={14}/> {t('coloc_page.filters')} :</span>
                     {[
                        {key: 'All', icon: <Users size={16}/>, label: 'Tout'},
                        {key: 'Studieuse', icon: <BookOpen size={16}/>, label: t('coloc_page.vibe_studious')},
                        {key: 'Festive', icon: <Music size={16}/>, label: t('coloc_page.vibe_party')},
                        {key: 'Chill', icon: <Coffee size={16}/>, label: t('coloc_page.vibe_chill')},
                    ].map((v) => (
                        <button 
                            key={v.key}
                            onClick={() => setActiveVibe(v.key as any)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2 border ${activeVibe === v.key ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                        >
                            {v.icon} {v.label}
                        </button>
                    ))}
                </div>

                {/* LISTINGS GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {filteredApartments.map((listing) => (
                        <div key={listing.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                            <div className="relative h-64 overflow-hidden">
                                <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
                                <div className="absolute bottom-3 left-3 flex gap-2">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-md shadow-sm text-white flex items-center gap-1 ${listing.vibe === 'Studieuse' ? 'bg-blue-900/80' : listing.vibe === 'Festive' ? 'bg-purple-900/80' : 'bg-orange-900/80'}`}>
                                        {listing.vibe === 'Studieuse' ? <BookOpen size={12}/> : listing.vibe === 'Festive' ? <Music size={12}/> : <Coffee size={12}/>}
                                        {listing.vibe}
                                    </span>
                                </div>
                                <div className="absolute top-3 right-3 bg-white/95 px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> {listing.spotsLeft} {t('coloc_page.available_spots')}
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{listing.title}</h3>
                                    <p className="font-bold text-blue-600 whitespace-nowrap">{listing.price} <span className="text-xs text-slate-400">DH</span></p>
                                </div>
                                
                                <p className="text-slate-500 text-sm flex items-center gap-1 mb-6">
                                    <MapPin size={14}/> {listing.city} • {listing.university}
                                </p>

                                <div className="mt-auto">
                                    <p className="text-xs font-bold text-slate-400 uppercase mb-3">{t('coloc_page.current_roommates')}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {listing.roommates.map((rm, i) => (
                                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white ${rm.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                                    {rm.name.charAt(0)}
                                                </div>
                                            ))}
                                            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">
                                                +
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleContactRoom(listing)}
                                            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
                                        >
                                            <MessageSquare size={16} /> {t('coloc_page.apply_btn')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
         )}

      </div>

      {/* MATCHING QUIZ MODAL */}
      {showMatcher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-slide-up">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white flex justify-between items-center">
                      <div>
                          <h3 className="font-bold text-xl flex items-center gap-2"><Sparkles className="text-yellow-300"/> {t('coloc_page.modal_title')}</h3>
                          <p className="text-xs text-indigo-100 mt-1">Etape {quizStep}/4</p>
                      </div>
                      <button onClick={() => setShowMatcher(false)} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"><X size={20}/></button>
                  </div>

                  <div className="p-8 min-h-[300px] flex flex-col justify-center">
                      {/* Step 1: Budget */}
                      {quizStep === 1 && (
                          <div className="space-y-4 animate-fade-in">
                              <h4 className="text-lg font-bold text-slate-900 text-center mb-6">{t('coloc_page.modal_step_1')}</h4>
                              {[{val: 'Low', label: t('coloc_page.quiz_budget_low')}, {val: 'Medium', label: t('coloc_page.quiz_budget_med')}, {val: 'High', label: t('coloc_page.quiz_budget_high')}].map(opt => (
                                  <button key={opt.val} onClick={() => handleQuizSelection('budget', opt.val)} className="w-full p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-left font-medium transition flex items-center justify-between group">
                                      {opt.label} <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 text-indigo-600 transition-opacity"/>
                                  </button>
                              ))}
                          </div>
                      )}
                      {/* Step 2: Vibe */}
                      {quizStep === 2 && (
                          <div className="space-y-4 animate-fade-in">
                              <h4 className="text-lg font-bold text-slate-900 text-center mb-6">{t('coloc_page.modal_step_2')}</h4>
                              <div className="grid grid-cols-2 gap-4">
                                 <button onClick={() => handleQuizSelection('vibe', 'Studieuse')} className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-center transition"><BookOpen size={32} className="mx-auto mb-2 text-blue-500"/><span className="font-bold text-sm block">{t('coloc_page.vibe_studious')}</span></button>
                                 <button onClick={() => handleQuizSelection('vibe', 'Festive')} className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-center transition"><Music size={32} className="mx-auto mb-2 text-purple-500"/><span className="font-bold text-sm block">{t('coloc_page.vibe_party')}</span></button>
                                 <button onClick={() => handleQuizSelection('vibe', 'Chill')} className="p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-orange-50 text-center transition col-span-2"><Coffee size={32} className="mx-auto mb-2 text-orange-500"/><span className="font-bold text-sm block">{t('coloc_page.vibe_chill')}</span></button>
                              </div>
                          </div>
                      )}
                      {/* Step 3: Hobbies */}
                      {quizStep === 3 && (
                          <div className="space-y-4 animate-fade-in">
                              <h4 className="text-lg font-bold text-slate-900 text-center mb-6">{t('coloc_page.modal_step_3')}</h4>
                              <div className="flex flex-wrap gap-2 justify-center">
                                  {["Gaming", "Sport", "Cuisine", "Voyage", "Lecture", "Séries", "Art"].map(hobby => (
                                      <button key={hobby} onClick={() => handleQuizSelection('hobbies', hobby)} className="px-4 py-2 rounded-full border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition text-sm font-medium">{hobby}</button>
                                  ))}
                              </div>
                              <button onClick={() => setQuizStep(4)} className="w-full mt-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200">Passer</button>
                          </div>
                      )}
                      {/* Step 4: Diet/Habits */}
                      {quizStep === 4 && (
                          <div className="space-y-4 animate-fade-in">
                              <h4 className="text-lg font-bold text-slate-900 text-center mb-6">{t('coloc_page.modal_step_4')}</h4>
                              {[{val: 'Vegan', label: t('coloc_page.quiz_diet_vegan')}, {val: 'Halal', label: t('coloc_page.quiz_diet_halal')}, {val: 'All', label: t('coloc_page.quiz_diet_all')}].map(opt => (
                                  <button key={opt.val} onClick={() => handleQuizSelection('diet', opt.val)} className="w-full p-4 rounded-xl border border-slate-200 hover:border-green-500 hover:bg-green-50 text-left font-medium transition flex items-center gap-3 group">
                                      <Utensils size={18} className="text-green-600"/> {opt.label}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
                  <div className="h-1.5 bg-slate-100 w-full"><div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{width: `${(quizStep/4)*100}%`}}></div></div>
              </div>
          </div>
      )}

    </div>
  );
};

export default Colocation;
