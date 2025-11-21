
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, ArrowRight, Star, Quote, CheckCircle, MessageCircle, Search, Users, Crown, Zap, Building, Sparkles, Globe, Lock, Key, ShoppingBag, HeartHandshake, Shield, Clock, Check, Wrench, Briefcase, FileText } from 'lucide-react';
import { MOCK_LISTINGS, MOCK_REVIEWS } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [activeReviewTab, setActiveReviewTab] = useState<'student' | 'owner'>('student');

  // Filtrer les avis
  const displayedReviews = MOCK_REVIEWS.filter(r => 
    activeReviewTab === 'student' ? r.role === 'Étudiant' : r.role === 'Propriétaire'
  ).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-slate-50">
      
      {/* --- 1. HERO SECTION (INTACT) --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[100px]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 text-center">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg animate-fade-in mx-auto hover:scale-105 transition-transform cursor-default">
                <Crown size={16} className="text-yellow-400"/> N°1 du Logement Étudiant au Maroc
             </div>
             
             {/* Main Title */}
             <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1] max-w-4xl mx-auto">
               Trouvez votre logement <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">sans stress & sans arnaque.</span>
             </h1>
             
             {/* Subtitle */}
             <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
               Room.ma sécurise votre location de A à Z. Vérification d'identité, paiement bloqué et contrat légalisé.
             </p>
             
             {/* CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full mb-16">
               <Link to="/find" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-3 transform hover:-translate-y-1">
                 <Search size={22} /> {t('hero.btn_search')}
               </Link>
               {/* Owner Button */}
               <Link to="/add-room" className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 transform hover:-translate-y-1">
                 <Key size={22} /> {t('hero.btn_owner')}
               </Link>
             </div>

             {/* Stats Bar */}
             <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16">
                 <div className="text-center">
                     <p className="text-3xl md:text-4xl font-black text-white">15k+</p>
                     <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Étudiants Sécurisés</p>
                 </div>
                 <div className="text-center">
                     <p className="text-3xl md:text-4xl font-black text-white">0</p>
                     <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Arnaque Tolérée</p>
                 </div>
                 <div className="text-center">
                     <p className="text-3xl md:text-4xl font-black text-white">24/7</p>
                     <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider mt-1">Support Premium</p>
                 </div>
             </div>
        </div>
      </section>

      {/* --- 2. AVANTAGES & SIMPLIFICATION (REDESIGNED & ANIMATED) --- */}
      <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left Content: Text & Icons */}
                  <div className="order-2 lg:order-1">
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2 block">Simplicité Absolue</span>
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                          La location étudiante,<br/>
                          <span className="text-blue-600">enfin sécurisée.</span>
                      </h2>
                      <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                          Oubliez les "samsars" et les visites inutiles. Room.ma a digitalisé tout le processus pour vous protéger.
                      </p>

                      <div className="space-y-10">
                          {/* Feature 1 */}
                          <div className="flex gap-6 group">
                              <div className="flex-shrink-0 w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm">
                                  <ShieldCheck size={32} />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold text-slate-900 mb-2">Profils 100% Vérifiés</h3>
                                  <p className="text-slate-600 leading-relaxed">
                                      Nous validons l'identité (CIN/Passeport) de chaque interlocuteur avant la moindre interaction. Fini les faux profils.
                                  </p>
                              </div>
                          </div>

                          {/* Feature 2 */}
                          <div className="flex gap-6 group">
                              <div className="flex-shrink-0 w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 transition-all duration-300 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110 shadow-sm">
                                  <Lock size={32} />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold text-slate-900 mb-2">Argent Bloqué = Sécurité</h3>
                                  <p className="text-slate-600 leading-relaxed">
                                      Votre loyer est séquestré sur un compte CMI sécurisé. Le propriétaire n'est payé que 24h après votre entrée réussie.
                                  </p>
                              </div>
                          </div>

                          {/* Feature 3 */}
                          <div className="flex gap-6 group">
                              <div className="flex-shrink-0 w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 shadow-sm">
                                  <FileText size={32} />
                              </div>
                              <div>
                                  <h3 className="text-xl font-bold text-slate-900 mb-2">Contrat Légal & Digital</h3>
                                  <p className="text-slate-600 leading-relaxed">
                                      Générez votre contrat de bail conforme à la loi 67-12 automatiquement. Prêt à imprimer et légaliser.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Right Content: Visual Collage */}
                  <div className="order-1 lg:order-2 relative h-[500px] md:h-[600px] lg:h-auto">
                      {/* Background shapes */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
                      
                      {/* Main Image: Student with Keys */}
                      <div className="absolute top-10 right-0 w-4/5 h-4/5 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition duration-700 z-10">
                          <img 
                            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                            alt="Étudiante heureuse" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 text-white">
                              <p className="font-bold text-lg">Sarah, étudiante à Rabat</p>
                              <div className="flex items-center gap-1 text-xs text-yellow-400">
                                  <Star size={12} fill="currentColor"/>
                                  <Star size={12} fill="currentColor"/>
                                  <Star size={12} fill="currentColor"/>
                                  <Star size={12} fill="currentColor"/>
                                  <Star size={12} fill="currentColor"/>
                              </div>
                          </div>
                      </div>

                      {/* Floating Card: Mobile App */}
                      <div className="absolute bottom-20 left-0 md:-left-10 w-48 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce-slow">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                  <CheckCircle size={20}/>
                              </div>
                              <div>
                                  <p className="text-xs text-slate-500 font-bold uppercase">Statut</p>
                                  <p className="text-sm font-bold text-slate-900">Logement Sécurisé</p>
                              </div>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full w-full bg-green-500"></div>
                          </div>
                      </div>

                      {/* Floating Card: Contract */}
                      <div className="absolute top-0 left-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-0 transform -rotate-6 hover:rotate-0 transition duration-500">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-2 mx-auto">
                              <FileText size={24}/>
                          </div>
                          <p className="text-xs font-bold text-center text-slate-900">Bail 100% Légal</p>
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* --- 3. DERNIÈRES PÉPITES (LISTINGS) --- */}
      <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div>
                      <span className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2 block">Nouveautés</span>
                      <h2 className="text-3xl md:text-4xl font-black text-slate-900">Dernières Pépites 💎</h2>
                      <p className="text-slate-500 mt-2 text-lg">Les logements vérifiés ajoutés aujourd'hui.</p>
                  </div>
                  <Link to="/listings" className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition group">
                      Voir tout <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
                  </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {MOCK_LISTINGS.slice(0, 3).map((listing) => (
                      <Link to={`/listing/${listing.id}`} key={listing.id} className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
                          <div className="relative h-64 overflow-hidden">
                              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                                  <Star size={12} className="text-yellow-500 fill-yellow-500"/> {listing.rating}
                              </div>
                              {listing.isVerified && (
                                  <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                      <ShieldCheck size={12}/> Vérifié
                                  </div>
                              )}
                          </div>
                          <div className="p-6">
                              <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">{listing.title}</h3>
                                  <p className="text-blue-600 font-black whitespace-nowrap">{listing.price} DH</p>
                              </div>
                              <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                                  <MapPin size={14}/> {listing.city} • {listing.type}
                              </p>
                              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                       <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                                           {listing.ownerName.charAt(0)}
                                       </div>
                                       <span className="text-xs font-medium text-slate-600">{listing.ownerName}</span>
                                   </div>
                                   <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition">Voir détails</span>
                              </div>
                          </div>
                      </Link>
                  ))}
              </div>
              
              <div className="mt-8 text-center md:hidden">
                  <Link to="/listings" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition">
                      Voir toutes les annonces <ArrowRight/>
                  </Link>
              </div>
          </div>
      </section>

      {/* --- 4. COMMUNAUTÉ ROOM --- */}
      <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-blue-200 text-white relative overflow-hidden group">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                  
                  <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                      <div>
                          <div className="flex items-center gap-3 mb-6">
                             <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white border border-white/20">
                                 <Users size={24}/>
                             </div>
                             <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">150+ en ligne</span>
                          </div>
                          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">La Communauté <br/>Room.ma</h2>
                          <p className="text-blue-100 text-xl mb-8 leading-relaxed">
                              Bien plus qu'un site de location. Rejoignez le forum, trouvez des colocs compatibles et accédez au marketplace étudiant.
                          </p>
                          <Link to="/community" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition shadow-lg">
                              Explorer le Campus <ArrowRight size={20}/>
                          </Link>
                      </div>

                      <div className="space-y-4 relative">
                          {/* Chat Bubbles Simulation */}
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg flex gap-4 items-center transform translate-x-4 hover:translate-x-2 transition duration-500">
                              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold">S</div>
                              <div>
                                  <p className="text-xs font-bold text-blue-200">Sarah • Il y a 2 min</p>
                                  <p className="text-sm font-medium">Quelqu'un a un plan pour le Visa Espagne ? 🇪🇸</p>
                              </div>
                          </div>
                          <div className="bg-white text-blue-900 p-5 rounded-2xl shadow-xl flex gap-4 items-center transform -translate-x-2 hover:translate-x-0 transition duration-500 scale-105 z-10 relative">
                              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold">M</div>
                              <div>
                                  <p className="text-xs font-bold text-slate-500">Mehdi • À l'instant</p>
                                  <p className="text-sm font-bold">J'ai libéré une chambre à Agdal ! Qui est chaud ? 🔥</p>
                              </div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg flex gap-4 items-center transform translate-x-8 hover:translate-x-4 transition duration-500">
                              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-sm font-bold">K</div>
                              <div>
                                  <p className="text-xs font-bold text-blue-200">Karim • Il y a 5 min</p>
                                  <p className="text-sm font-medium">Vends frigo table top 500DH 🧊</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- 5. CONCIERGERIE VIP (UPDATED TEXT) --- */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
               <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-yellow-600 rounded-full blur-[120px]"></div>
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800 rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-8">
                          <Crown size={14}/> Service Premium
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                          Conciergerie <br/>
                          <span className="text-yellow-400">On gère tout.</span>
                      </h2>
                      <p className="text-slate-400 text-xl mb-10 leading-relaxed max-w-lg">
                          Ne gérez plus rien. Nous prenons soin de votre appartement et réglons les problèmes complexes à votre place.
                      </p>
                      
                      <div className="space-y-6 mb-12">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-yellow-400 border border-white/10">
                                  <Briefcase size={24}/>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Gestion Intégrale</h4>
                                  <p className="text-slate-400 text-sm">On gère votre appartement de A à Z (Loyer, Entrée, Sortie).</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-yellow-400 border border-white/10">
                                  <Wrench size={24}/>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Problèmes Complexes</h4>
                                  <p className="text-slate-400 text-sm">Fuite, voisin bruyant, panne électrique ? On s'en charge.</p>
                              </div>
                          </div>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-yellow-400 border border-white/10">
                                  <Key size={24}/>
                              </div>
                              <div>
                                  <h4 className="font-bold text-lg">Remise des clés & Accueil</h4>
                                  <p className="text-slate-400 text-sm">Nous accueillons vos locataires avec professionnalisme.</p>
                              </div>
                          </div>
                      </div>

                      <Link to="/concierge" className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 text-slate-950 rounded-xl font-bold text-lg hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20">
                          Découvrir les Packs <ArrowRight size={20}/>
                      </Link>
                  </div>

                  {/* Visual Right Side */}
                  <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-[2.5rem] transform rotate-6 opacity-20 blur-lg"></div>
                      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 relative z-10 shadow-2xl">
                          {/* Mock Card 1 */}
                          <div className="bg-slate-800 p-6 rounded-2xl mb-6 flex items-center gap-4 border border-slate-700/50">
                              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                                  <CheckCircle size={24}/>
                              </div>
                              <div>
                                  <p className="font-bold text-white">Plomberie Réparée</p>
                                  <p className="text-xs text-slate-400">Intervention technicien - 2h</p>
                              </div>
                              <span className="ml-auto text-xs font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded">Fait</span>
                          </div>
                          
                          {/* Mock Card 2 */}
                          <div className="bg-slate-800 p-6 rounded-2xl mb-6 flex items-center gap-4 border border-slate-700/50">
                              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center">
                                  <Key size={24}/>
                              </div>
                              <div>
                                  <p className="font-bold text-white">Clés remises à Sarah</p>
                                  <p className="text-xs text-slate-400">État des lieux : OK</p>
                              </div>
                              <span className="ml-auto text-xs font-bold bg-blue-500/10 text-blue-400 px-2 py-1 rounded">14:30</span>
                          </div>

                          {/* Mock Card 3 */}
                          <div className="bg-slate-800 p-6 rounded-2xl flex items-center gap-4 border border-slate-700/50">
                              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center">
                                  <Clock size={24}/>
                              </div>
                              <div>
                                  <p className="font-bold text-white">Ménage fin de bail</p>
                                  <p className="text-xs text-slate-400">Prestataire : CleanPro</p>
                              </div>
                              <span className="ml-auto text-xs font-bold bg-slate-700 text-slate-300 px-2 py-1 rounded">Demain</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- 6. FONDATEUR (INTACT) --- */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
                
                <Quote size={48} className="text-blue-500 mx-auto mb-8 opacity-50"/>
                
                <blockquote className="relative z-10 text-xl md:text-3xl font-medium text-white leading-relaxed mb-10">
                "J’ai fondé RoomMA pour simplifier la recherche de logement étudiant au Maroc : une plateforme digitale qui vous accompagne du premier clic à la remise des clés."
                </blockquote>
                
                <div className="flex items-center justify-center gap-5">
                    <div className="w-16 h-16 bg-slate-700 rounded-full overflow-hidden border-2 border-slate-600 flex items-center justify-center">
                        <span className="text-slate-300 font-bold text-2xl">M</span>
                    </div>
                    <div className="text-left">
                        <div className="text-white font-bold text-xl">Mohamed C. Sylla</div>
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-1">Fondateur & CEO</div>
                        <div className="text-blue-400 text-xs font-medium leading-tight max-w-[250px]">
                            Diplômé Droit Privé • Université de Tanger, Maroc • Master Droit Public des Affaires & Commerce Int.
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- 7. AVIS (PERCUTANTS) --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t('reviews.title')}</h2>
              <p className="text-slate-600 text-lg">La confiance se construit des deux côtés.</p>
              
              {/* Review Tabs */}
              <div className="inline-flex p-1 bg-white rounded-full mt-8 shadow-sm border border-slate-200">
                  <button 
                    onClick={() => setActiveReviewTab('student')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeReviewTab === 'student' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                  >
                      Étudiants
                  </button>
                  <button 
                    onClick={() => setActiveReviewTab('owner')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${activeReviewTab === 'owner' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                  >
                      Propriétaires
                  </button>
              </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
             {displayedReviews.map(review => (
                 <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 transition duration-300 hover:shadow-xl hover:-translate-y-1 relative group">
                     <div className="flex gap-1 mb-6">
                         {[...Array(5)].map((_, i) => (
                             <Star key={i} size={18} className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"} />
                         ))}
                     </div>
                     <p className="text-slate-800 text-lg font-medium mb-8 leading-relaxed min-h-[80px]">"{review.text}"</p>
                     
                     <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${activeReviewTab === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-slate-800 text-white'}`}>
                             {review.author.charAt(0)}
                         </div>
                         <div>
                             <p className="font-bold text-slate-900">{review.author}</p>
                             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                 {review.isVerified && <ShieldCheck size={12} className="text-green-500"/>}
                                 <span className="font-medium">{review.role}</span>
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
