
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, CreditCard, ArrowRight, Star, Smartphone, Quote, CheckCircle, ShoppingBag, MessageCircle, Heart, Search, Users } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_REVIEWS, PAYMENT_METHODS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [reviewTab, setReviewTab] = useState<'student' | 'owner'>('student');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredReviews = MOCK_REVIEWS.filter(r => 
    reviewTab === 'student' ? r.role === 'Étudiant' : r.role === 'Propriétaire'
  );

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
      e.preventDefault();
      e.stopPropagation();
      setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section Premium - Mobile Optimized */}
      <section className="relative bg-slate-900 text-white pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Image with better mobile scaling */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-[center_top] transform scale-105 hover:scale-110 transition duration-[20s]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm animate-fade-in-up">
            {t('hero.tagline')}
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.15] sm:leading-[1.1]">
            {t('hero.title')} <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 block sm:inline mt-2 sm:mt-0">{t('hero.subtitle')}</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-300 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
            {t('hero.desc')}
          </p>
          
          <div className="flex flex-col w-full sm:w-auto sm:flex-row justify-center gap-4 mb-12 px-2 sm:px-0">
            <Link to="/find" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl sm:rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 transform active:scale-95">
              <Search size={20} /> {t('hero.btn_search')}
            </Link>
            <Link to="/add-room" className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl sm:rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 active:scale-95">
              {t('hero.btn_owner')}
            </Link>
          </div>

          {/* Quick Cities Filter - Horizontal Scroll on Mobile */}
          <div className="flex flex-col items-center mt-8 lg:mt-10 animate-fade-in w-full">
            <p className="text-blue-200 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 opacity-80">{t('hero.cities')}</p>
            
            <div className="w-full overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 flex sm:justify-center">
              <div className="flex gap-3 sm:gap-4 mx-auto">
                  {['Rabat', 'Casablanca', 'Marrakech', 'Tanger', 'Agadir'].map((city) => (
                     <Link 
                        key={city}
                        to={`/listings?city=${city}`} 
                        className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm transition-all duration-300 hover:bg-white hover:text-blue-900 active:scale-95 whitespace-nowrap"
                      >
                          {language === 'ar' ? (city === 'Rabat' ? 'الرباط' : city === 'Casablanca' ? 'الدار البيضاء' : city === 'Marrakech' ? 'مراكش' : city === 'Tanger' ? 'طنجة' : 'أكادير') : city}
                     </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / Chat Experience Section */}
      <section className="py-16 lg:py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            {/* Text Column */}
            <div className="order-2 lg:order-1">
               <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-xs md:text-sm mb-4">
                 {t('features.badge')}
               </div>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                 {t('features.title_start')}<br/>
                 <span className="text-blue-600">{t('features.title_end')}</span>
               </h2>
               <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
                 {t('features.desc')}
               </p>

               <div className="space-y-6">
                  <div className="flex gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition group-hover:border-green-500">
                       <ShieldCheck className="text-green-500" size={24}/>
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 text-lg">{t('features.verified')}</h3>
                       <p className="text-slate-500 text-sm leading-snug">{t('features.verified_desc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition group-hover:border-blue-500">
                       <MapPin className="text-blue-500" size={24}/>
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 text-lg">{t('features.location')}</h3>
                       <p className="text-slate-500 text-sm leading-snug">{t('features.location_desc')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-sm transition border border-transparent hover:border-slate-100">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition group-hover:border-purple-500">
                       <CreditCard className="text-purple-500" size={24}/>
                    </div>
                    <div>
                       <h3 className="font-bold text-slate-900 text-lg">{t('features.payment')}</h3>
                       <p className="text-slate-500 text-sm leading-snug">{t('features.payment_desc')}</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Mobile Mockup Column */}
            <div className="order-1 lg:order-2 relative w-full max-w-[320px] sm:max-w-sm md:max-w-md mx-auto">
               {/* Background Decoration - Hidden on small mobile to save performance */}
               <div className="absolute top-10 -right-10 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl animate-pulse hidden sm:block"></div>
               <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-3xl animate-pulse hidden sm:block"></div>

               {/* Phone Mockup */}
               <div className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border-4 md:border-8 border-slate-900 overflow-hidden transform transition duration-500 hover:rotate-1 z-10">
                  {/* Phone Top Bar */}
                  <div className="bg-slate-50 px-4 md:px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 relative">
                        K
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs md:text-sm text-slate-900 truncate">Karim ({language === 'ar' ? 'مالك' : 'Propriétaire'})</p>
                        <p className="text-[10px] md:text-xs text-green-600 font-medium flex items-center gap-1 truncate"><ShieldCheck size={10}/> Identité validée</p>
                     </div>
                     <Smartphone size={16} className="text-slate-400"/>
                  </div>

                  {/* Chat Area */}
                  <div className="bg-slate-50 p-3 md:p-4 space-y-3 md:space-y-4 h-[280px] md:h-[350px] overflow-hidden relative">
                     <div className="text-center text-[10px] md:text-xs text-slate-400 my-2">14:02</div>
                     
                     <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm max-w-[85%] shadow-md leading-snug">
                           {language === 'ar' ? "سلام كريم، واش الستوديو ف أكدال باقي متاح؟ 🎓" : "Bonjour Karim, le studio est toujours dispo ? 🎓"}
                        </div>
                     </div>

                     <div className="flex justify-start">
                        <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm max-w-[85%] shadow-sm leading-snug">
                           {language === 'ar' ? "أهلا! أه باقي. قريب ل UM5 ب 5 دقايق. وجدتي الوراق؟ 📄" : "Oui ! À 5 min de la fac. Tu as ton dossier ? 📄"}
                        </div>
                     </div>

                     <div className="flex justify-end">
                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm max-w-[85%] shadow-md leading-snug">
                           {language === 'ar' ? "أه كلشي حطيتو ف البروفيل ديالي ف Room.ma! ✅" : "Tout est sur mon profil Room.ma ! ✅"}
                        </div>
                     </div>

                     <div className="flex justify-start">
                        <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-sm px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm max-w-[85%] shadow-sm leading-snug">
                           {language === 'ar' ? "صافي مزيان، يالاه شفتو دابا. نسينيو الكونطرا ف التطبيق؟ 🤝" : "Super, je viens de vérifier. On signe le contrat via l'appli ? 🤝"}
                        </div>
                     </div>
                     
                     {/* Notification Badge Simulated */}
                     <div className="absolute bottom-4 left-3 right-3 md:left-4 md:right-4 bg-white/95 backdrop-blur border border-green-200 p-2 md:p-3 rounded-xl flex items-center gap-3 shadow-lg animate-bounce">
                        <div className="bg-green-100 p-1.5 md:p-2 rounded-full text-green-600"><CheckCircle size={18}/></div>
                        <div>
                           <p className="text-xs font-bold text-green-800">Dossier Accepté</p>
                           <p className="text-[10px] md:text-xs text-green-600">Paiement débloqué.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Payment Methods Encadré */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 md:p-12 shadow-sm text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{t('payment_section.title')}</h3>
                <p className="text-slate-500 mb-8 text-sm max-w-2xl mx-auto px-2">
                   {t('payment_section.desc')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-12">
                {PAYMENT_METHODS.map((pm, i) => (
                    <div key={i} className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-bold text-slate-600 text-xs md:text-sm whitespace-nowrap">
                        {pm.name}
                    </div>
                ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message Section - Mobile Centered */}
      <section className="py-16 md:py-20 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="bg-blue-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl transform hover:scale-[1.01] transition duration-500">
                  {/* Decor */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl -ml-10 -mt-10"></div>
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mb-20"></div>
                  <Quote className="absolute top-8 left-8 text-blue-400/20 w-16 h-16 md:w-24 md:h-24 transform -scale-x-100" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white/20 p-1 relative group">
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden shadow-inner flex items-center justify-center">
                                  <span className="text-3xl font-bold text-white tracking-widest">MS</span>
                              </div>
                              <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full border-4 border-blue-900 shadow-lg">
                                  <Quote size={14} fill="currentColor"/>
                              </div>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="text-center md:text-start flex-1">
                            <h2 className="text-lg md:text-3xl font-medium mb-6 leading-relaxed italic text-blue-50 font-serif">
                                "{t('founder.quote')}"
                            </h2>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">Mohamed Sylla</h3>
                                <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{t('founder.role')}</p>
                            </div>
                        </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t('listings.title')}</h2>
              <p className="text-slate-600 text-sm max-w-xs md:max-w-full">{t('listings.subtitle')}</p>
            </div>
            <Link to="/listings" className="text-blue-600 font-medium hover:text-blue-800 hidden md:flex items-center gap-1 group">
              {t('listings.see_all')} {language === 'ar' ? <ArrowRight size={16} className="group-hover:-translate-x-1 transition rotate-180"/> : <ArrowRight size={16} className="group-hover:translate-x-1 transition"/>}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {MOCK_LISTINGS.slice(0, 3).map((listing) => (
              <Link to={`/listing/${listing.id}`} key={listing.id} className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 active:scale-[0.98] relative">
                {/* Heart Button */}
                <button 
                    onClick={(e) => toggleFavorite(e, listing.id)}
                    className={`absolute top-3 right-3 z-20 p-2 rounded-full shadow-sm transition-all ${favorites.includes(listing.id) ? 'bg-white text-red-500' : 'bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-red-500'}`}
                >
                    <Heart size={18} fill={favorites.includes(listing.id) ? "currentColor" : "none"} />
                </button>

                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  
                  {/* Price Badge with Estimate for Colocation */}
                  <div className={`absolute bottom-3 ${language === 'ar' ? 'left-3 items-start' : 'right-3 items-end'} flex flex-col gap-1`}>
                      <div className="bg-white/95 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                        {listing.price} MAD
                      </div>
                      {listing.type === 'Colocation' && (
                        <div className="bg-purple-600/90 backdrop-blur text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1 animate-pulse">
                            <Users size={10} /> ~{(listing.price / 2).toFixed(0)} MAD {t('listings.per_pers')}
                        </div>
                      )}
                  </div>

                  {listing.isVerified && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] font-semibold flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={12} /> Vérifié
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mb-1">{listing.type} • {listing.city}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{listing.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1 mb-3">
                    <MapPin size={14} /> {listing.university}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-600 truncate max-w-[120px]">Propriétaire: <strong>{listing.ownerName}</strong></span>
                    <div className="flex items-center text-yellow-500 text-xs font-bold">
                      <Star size={14} fill="currentColor" className="mr-1"/> {listing.rating}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <Link to="/listings" className="mt-8 w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex md:hidden items-center justify-center gap-2 shadow-sm active:bg-slate-50">
            {t('listings.see_all')} <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div className="max-w-2xl">
                   <span className="text-blue-400 font-bold text-xs uppercase tracking-wider mb-2 block">
                       {language === 'ar' ? "تضامن واقتصاد تضامني" : "Entraide & Économie Circulaire"}
                   </span>
                   <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                       {language === 'ar' ? "مجتمع Room.ma" : "La Communauté Room.ma"}
                   </h2>
                   <p className="text-slate-300 text-sm md:text-base">
                       {language === 'ar' ? "تبادل مع طلاب آخرين، جد شركاء سكن، وجهز سكنك." : "Échangez avec d'autres étudiants, trouvez des colocs, et équipez votre logement."}
                   </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Forum Card */}
                <Link to="/forum" className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition group active:scale-[0.98]">
                   <div className="flex justify-between items-start mb-4">
                      <div className="bg-blue-600 p-3 rounded-xl text-white"><MessageCircle size={20}/></div>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded text-white h-fit">Discussions</span>
                   </div>
                   <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition">Questions Administratives</h3>
                   <p className="text-slate-300 text-sm mb-4 line-clamp-2">"Comment obtenir sa carte de séjour ?", "Meilleurs cafés pour réviser à Rabat ?"... Posez vos questions !</p>
                   <div className="flex items-center gap-[-8px]">
                      <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[10px]">A</div>
                      <div className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800 flex items-center justify-center text-[10px] ml-[-8px]">M</div>
                      <span className={`text-xs font-bold text-blue-300 ${language === 'ar' ? 'mr-3' : 'ml-3'}`}>15 nouveaux sujets</span>
                   </div>
                </Link>

                {/* Market Card */}
                <Link to="/forum" className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition group active:scale-[0.98]">
                   <div className="flex justify-between items-start mb-4">
                      <div className="bg-green-600 p-3 rounded-xl text-white"><ShoppingBag size={20}/></div>
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded text-white h-fit">Marketplace</span>
                   </div>
                   <h3 className="text-lg font-bold mb-2 group-hover:text-green-300 transition">Bourse aux Équipements</h3>
                   <p className="text-slate-300 text-sm mb-4 line-clamp-2">Achetez et vendez vos meubles, livres et électroménager en toute sécurité entre étudiants.</p>
                   <div className="flex gap-2">
                      <div className="bg-white/5 rounded-lg p-2 flex items-center gap-2 w-full">
                         <div className="w-8 h-8 bg-slate-200 rounded-md overflow-hidden flex-shrink-0"><img src="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=100&q=60" className="w-full h-full object-cover" alt="Bureau"/></div>
                         <div><p className="font-bold text-xs">Bureau</p><p className="text-[10px] text-green-400">450 DH</p></div>
                      </div>
                   </div>
                </Link>
            </div>
         </div>
      </section>

      {/* Reviews */}
      <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full opacity-10 blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-shadow-xl">{t('reviews.title')}</h2>
          
          {/* TABS AVIS */}
          <div className="flex justify-center gap-2 mb-10">
             <button 
                onClick={() => setReviewTab('student')}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition flex items-center gap-2 ${reviewTab === 'student' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
             >
               <ShoppingBag size={16}/> {t('reviews.student_tab')}
             </button>
             <button 
                onClick={() => setReviewTab('owner')}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition flex items-center gap-2 ${reviewTab === 'owner' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
             >
               <ShieldCheck size={16}/> {t('reviews.owner_tab')}
             </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            {filteredReviews.slice(0,3).map((review) => (
              <div key={review.id} className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col h-full">
                <div className="mb-4 text-blue-400">
                  <Quote size={24} className="opacity-60"/>
                </div>
                <p className="text-sm md:text-base font-light italic leading-relaxed mb-6 flex-grow text-slate-200">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{review.author}</div>
                    <div className="text-blue-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        {review.role}
                        {review.isVerified && <ShieldCheck size={10} className="text-green-400"/>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
