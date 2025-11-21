
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_LISTINGS } from '../constants';
import { Review } from '../types';
import { MapPin, ShieldCheck, CheckCircle, MessageCircle, Star, X, FileText, Lock, Armchair, Utensils, Bath, Image as ImageIcon, Flag, Shield, Zap, Ban, AlertTriangle, Cigarette, PawPrint, Music, Users, Reply, Send, CreditCard, ThumbsUp, Clock, UserCheck, Home, PlayCircle, Video, Check, Wifi, Tv, Car, Thermometer, Wind, Smartphone, Loader2, ArrowRight, User, Banknote, Crown, Globe, Eye, Gavel, HeartHandshake, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ListingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const listing = MOCK_LISTINGS.find(l => l.id === Number(id));

  // États locaux pour la simulation
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  
  // Gestion des Avis
  const [reviews, setReviews] = useState<Review[]>(listing?.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  // --- NOUVEAU : États pour le flux de réservation (Paiement CMI & Physique) ---
  const [showReservationModal, setShowReservationModal] = useState(false);
  
  // STEPS: selection -> local_info OR summary -> card_input -> redirecting -> cmi_secure -> processing_auth -> success
  const [paymentStep, setPaymentStep] = useState<'selection' | 'local_info' | 'summary' | 'card_input' | 'redirecting' | 'cmi_secure' | 'processing_auth' | 'success'>('selection');
  
  // --- NOUVEAU : Galerie Interactive ---
  const [activeMedia, setActiveMedia] = useState<'main' | 'salon' | 'cuisine' | 'sdb' | 'video'>('main');

  // Calcul de la note moyenne dynamique
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return listing?.rating || 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews, listing]);

  if (!listing) return <div className="p-8 text-center">Logement non trouvé. <button onClick={() => navigate('/listings')} className="text-blue-600 underline">{t('details.back')}</button></div>;

  // Mock des images spécifiques par pièce
  const galleryImages = {
      main: listing.image,
      salon: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&w=1200&q=80",
      cuisine: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      sdb: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80",
      video: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80" // Poster vidéo
  };

  // Mock des photos de profil propriétaires (simulé pour certains IDs)
  const ownerPhoto = {
      1: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=400&q=80", // Karim
      2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80", // Sara
      3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80", // Driss
  }[listing.id];

  const getActiveImageSrc = () => {
      return galleryImages[activeMedia];
  };

  // Helper pour les icônes de commodités
  const getAmenityIcon = (amenity: string) => {
      const lower = amenity.toLowerCase();
      if (lower.includes('wifi') || lower.includes('internet')) return <Wifi size={16} className="text-blue-500"/>;
      if (lower.includes('meubl')) return <Armchair size={16} className="text-orange-500"/>;
      if (lower.includes('sécurité') || lower.includes('gardien')) return <ShieldCheck size={16} className="text-green-500"/>;
      if (lower.includes('cuisine')) return <Utensils size={16} className="text-red-500"/>;
      if (lower.includes('parking') || lower.includes('garage')) return <Car size={16} className="text-slate-500"/>;
      if (lower.includes('chauffage')) return <Thermometer size={16} className="text-red-600"/>;
      if (lower.includes('clim') || lower.includes('air')) return <Wind size={16} className="text-sky-500"/>;
      if (lower.includes('télé') || lower.includes('tv')) return <Tv size={16} className="text-purple-500"/>;
      if (lower.includes('balcon') || lower.includes('terrasse')) return <Home size={16} className="text-green-600"/>;
      
      return <CheckCircle size={16} className="text-blue-600"/>;
  };

  const handleSendMessage = () => {
      setContactSuccess(true);
      setTimeout(() => {
          setContactSuccess(false);
          setShowContactModal(false);
          setContactMessage('');
      }, 2000);
  };

  const handleQuickContact = () => {
      navigate('/messages', {
        state: {
          contactId: `owner_${listing.id}`,
          contactName: listing.ownerName,
          initialMessage: `Bonjour ${listing.ownerName}, je suis très intéressé par votre annonce "${listing.title}" à ${listing.city}. Est-elle toujours disponible pour une visite ?`
        }
      });
  };

  // Ouvre la modale de réservation
  const handleReserveClick = () => {
      setShowReservationModal(true);
      setPaymentStep('selection'); // Start with selection
  };

  // --- FLUX LOCAL ---
  const handleLocalChoice = () => {
      setPaymentStep('local_info');
  };

  // --- FLUX INTERNATIONAL ---
  const handleInternationalChoice = () => {
      setPaymentStep('summary');
  };

  // Déclenchement du processus de paiement (International)
  const handleConfirmReservation = () => {
      setPaymentStep('card_input');
  };
  
  // Validation de la carte et redirection CMI
  const handleCardSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setPaymentStep('redirecting');
      setTimeout(() => {
          setPaymentStep('cmi_secure');
      }, 2000);
  };

  // Étape 3 : Simulation Validation 3D Secure
  const handleConfirmCMI = () => {
      setPaymentStep('processing_auth');
      setTimeout(() => {
          setPaymentStep('success');
      }, 2500);
  };

  const handleCloseReservation = () => {
      setShowReservationModal(false);
      if(paymentStep === 'success') {
          navigate('/contracts');
      }
      setPaymentStep('selection');
  };

  // Soumettre un avis (Étudiant)
  const handleSubmitReview = (e: React.FormEvent) => {
      e.preventDefault();
      const newReview: Review = {
          id: Date.now(),
          author: "Utilisateur Vérifié",
          role: "Étudiant",
          text: newReviewText,
          rating: newReviewRating,
          isVerified: true,
          date: "À l'instant"
      };
      setReviews([newReview, ...reviews]);
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setShowReviewForm(false);
        setNewReviewText('');
      }, 2000);
  };

  // Calcul des totaux pour le résumé
  const baseTotal = listing.price * 2; // Premier mois + Caution
  const finalTotal = baseTotal;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Enhanced Gallery Header */}
      <div className="h-[500px] md:h-[600px] relative group bg-slate-900 overflow-hidden">
        {/* ... (Gallery Code remains unchanged for brevity, focusing on the requested changes) ... */}
        <div className="w-full h-full transition-all duration-500 ease-in-out relative">
            <img 
                src={getActiveImageSrc()} 
                alt={listing.title} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${activeMedia === 'video' ? 'opacity-60' : 'opacity-100'}`} 
            />
            {activeMedia === 'video' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:scale-110 transition shadow-2xl">
                        <PlayCircle size={40} className="text-white fill-white/20"/>
                    </div>
                    <p className="text-white font-bold mt-4 text-lg shadow-black drop-shadow-lg">{t('details.virtual_visit')}</p>
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-4 z-20 flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex gap-2 overflow-x-auto no-scrollbar max-w-full shadow-2xl">
                <button onClick={() => setActiveMedia('main')} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'main' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}>
                    <ImageIcon size={16}/> {t('details.overview')}
                </button>
                <button onClick={() => setActiveMedia('salon')} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'salon' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}>
                    <Armchair size={16}/> {t('details.living_room')}
                </button>
                <button onClick={() => setActiveMedia('cuisine')} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'cuisine' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}>
                    <Utensils size={16}/> {t('details.kitchen')}
                </button>
                <button onClick={() => setActiveMedia('sdb')} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'sdb' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}>
                    <Bath size={16}/> {t('details.bathroom')}
                </button>
                <div className="w-px bg-white/20 mx-1"></div>
                <button onClick={() => setActiveMedia('video')} className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'video' ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' : 'text-white hover:bg-white/10'}`}>
                    <Video size={16}/> 360°
                </button>
            </div>
        </div>

        <div className="absolute top-0 left-0 w-full p-6 md:p-8 text-white z-10 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-start">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">{listing.type}</span>
                        {listing.isVerified && <span className="bg-green-500/20 border border-green-500/50 backdrop-blur-sm text-green-300 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><ShieldCheck size={14}/> {t('listings.verified')}</span>}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-2 text-shadow-lg leading-tight">{listing.title}</h1>
                    <p className="flex items-center gap-2 text-sm md:text-lg text-slate-200 font-medium"><MapPin size={18}/> {listing.city} • <span className="text-blue-300">{listing.university}</span></p>
                 </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('details.about_title')}</h2>
              <div className="prose prose-slate max-w-none mb-8">
                  <p className="text-slate-600 leading-relaxed text-lg">{listing.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                  {listing.amenities.map((item, i) => (
                    <span key={i} className="px-3 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition">
                        {getAmenityIcon(item)} {item}
                    </span>
                  ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                 <div className="text-center"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.availability')}</span><p className="font-bold text-slate-900">{t('details.immediate')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.min_duration')}</span><p className="font-bold text-slate-900">3 {t('details.month')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.deposit')}</span><p className="font-bold text-blue-600">1 {t('details.month')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.charges')}</span><p className="font-bold text-green-600">{t('details.included')}</p></div>
              </div>
              
              {/* Rules Section */}
              <div className="mt-8 border-t border-slate-100 pt-8">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900"><Ban className="text-red-500" size={20}/> {t('details.rules_title')}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <Cigarette className="text-red-400" size={20}/>
                        <span className="font-medium text-sm">{t('details.no_smoking')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <PawPrint className="text-red-400" size={20}/>
                        <span className="font-medium text-sm">{t('details.no_pets')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <Music className="text-orange-500" size={20}/>
                        <span className="font-medium text-sm">{t('details.quiet')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <Users className="text-blue-500" size={20}/>
                        <span className="font-medium text-sm">{t('details.visitors')}</span>
                    </div>
                 </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <FileText size={18} /> {t('details.contract_standard')}
                 </div>
                 <button className="text-blue-600 font-bold hover:underline text-sm">{t('details.download_model')}</button>
              </div>
            </div>

            {/* Owner Profile */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                   <div className="relative group">
                       <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                           {ownerPhoto ? (
                               <img src={ownerPhoto} alt={listing.ownerName} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                           ) : (
                               <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400"><User size={48} strokeWidth={1.5} /></div>
                           )}
                       </div>
                       <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-white shadow-sm z-10">
                           <ShieldCheck size={12}/> {t('details.owner_verified')}
                       </div>
                   </div>
                   
                   <div className="flex-1 w-full">
                       <div className="flex justify-between items-start">
                           <div>
                               <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">{listing.ownerName}</h3>
                               <p className="text-slate-500 text-sm mb-3">{t('details.owner_member')} 2022</p>
                           </div>
                           <div className="text-end">
                               <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg"><Star fill="currentColor"/> {averageRating}</div>
                               <p className="text-xs text-slate-400 underline cursor-pointer hover:text-blue-600">{reviews.length} avis</p>
                           </div>
                       </div>

                       <div className="flex flex-wrap gap-4 mt-2 mb-6">
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <ThumbsUp size={14} className="text-blue-600"/> {t('details.response_rate')} : <strong>100%</strong>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <Clock size={14} className="text-blue-600"/> {t('details.response_time')} : <strong>1h</strong>
                           </div>
                       </div>
                   </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-3 mt-4 border-t border-slate-100 pt-6">
                   <button onClick={handleQuickContact} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition transform hover:-translate-y-1">
                       <Zap size={20} className="animate-pulse"/> {t('details.quick_contact')}
                   </button>
                   <button onClick={() => setShowContactModal(true)} className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-slate-300 flex items-center justify-center gap-2 bg-white">
                       <FileText size={20}/> {t('details.request_contract')}
                   </button>
               </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8" id="reviews">
               <div className="flex justify-between items-center mb-8">
                   <div>
                       <h3 className="font-bold text-2xl flex items-center gap-2 text-slate-900">
                           <Star className="text-yellow-400" fill="currentColor"/> 
                           {reviews.length > 0 ? `${reviews.length} ${t('details.reviews_title')}` : t('details.no_reviews')}
                       </h3>
                       <p className="text-slate-500 text-sm mt-1">Moyenne: {averageRating}/5</p>
                   </div>
                   
                   {!showReviewForm && (
                       <button onClick={() => setShowReviewForm(true)} className="text-sm font-bold text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-md flex items-center gap-2">
                           <MessageCircle size={18}/> {t('details.write_review')}
                       </button>
                   )}
               </div>

               {/* Review Form (Code shortened for clarity) */}
               {showReviewForm && (
                   <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-fade-in mb-8 relative overflow-hidden">
                       {/* ... Review form logic ... */}
                       <div className="flex justify-end gap-2">
                           <button type="button" onClick={() => setShowReviewForm(false)} className="px-4 py-2 text-slate-500 font-bold">Annuler</button>
                           <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">Publier</button>
                       </div>
                   </form>
               )}

               <div className="space-y-8">
                   {reviews.length === 0 ? (
                       <p className="text-center text-slate-500 py-4 italic">{t('details.no_reviews')}</p>
                   ) : (
                       reviews.map((review) => (
                           <div key={review.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                               <div className="flex justify-between items-start mb-3">
                                   <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">{review.author.charAt(0)}</div>
                                       <div>
                                           <p className="font-bold text-slate-900 text-sm flex items-center gap-2">{review.author} {review.isVerified && <ShieldCheck size={12} className="text-green-500"/>}</p>
                                           <p className="text-xs text-slate-500">{review.date}</p>
                                       </div>
                                   </div>
                                   <div className="flex gap-0.5">
                                       {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} fill="currentColor" />))}
                                   </div>
                               </div>
                               <p className="text-slate-600 text-sm leading-relaxed pl-14">{review.text}</p>
                           </div>
                       ))
                   )}
               </div>
            </div>
            
            <button className="text-red-500 text-sm font-bold flex items-center gap-2 hover:underline mx-auto opacity-60 hover:opacity-100 transition"><Flag size={14}/> {t('details.report_listing')}</button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 ring-1 ring-slate-900/5">
                    <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                        <div><span className="text-4xl font-bold text-slate-900">{listing.price} {t('listings.per_month')}</span><span className="text-slate-500 font-medium">/{t('details.month')}</span></div>
                        <span className="text-green-600 text-xs font-bold bg-green-100 border border-green-200 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={12}/> DISPO</span>
                    </div>
                    
                    <div className="space-y-3">
                        <button onClick={handleReserveClick} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg relative overflow-hidden group">
                            <span className="relative z-10 flex items-center gap-2"><Lock size={18} /> Vérifier dispo / Réserver</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-slate-900 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                        </button>
                        <p className="text-center text-xs text-slate-500 px-4">
                            {t('details.money_safe')}
                        </p>
                    </div>
                    
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg flex gap-2 items-start">
                         <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5"/>
                         <div>
                            <p className="text-xs text-red-700 font-bold uppercase mb-1">Zéro Commission</p>
                            <p className="text-xs text-red-600 leading-snug">{t('details.no_commission')}</p>
                         </div>
                    </div>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-blue-900">
                    <h4 className="font-bold flex items-center gap-2 mb-4 text-lg"><Shield size={20} className="text-blue-600"/> {t('details.guarantee_title')}</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span>{t('details.guarantee_1')}</span></li>
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span>{t('details.guarantee_2')}</span></li>
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span>{t('details.guarantee_3')}</span></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALE DE RESERVATION UNIFIEE --- */}
      {showReservationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up relative flex flex-col max-h-[90vh]">
                  
                  {/* Header Modal */}
                  <div className="flex justify-between items-center p-6 border-b border-slate-100 flex-shrink-0">
                      <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                           {paymentStep === 'selection' ? t('choice_page.title') : 
                            paymentStep === 'local_info' ? "Prendre une chambre (Local)" : 
                            "Réservation (International)"}
                      </h3>
                      <button onClick={handleCloseReservation} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
                  </div>

                  <div className="overflow-y-auto p-0">
                      
                      {/* ÉTAPE 1: SÉLECTION DU PROFIL */}
                      {paymentStep === 'selection' && (
                          <div className="p-6 space-y-6">
                              <p className="text-center text-slate-600 mb-4 font-medium">Où êtes-vous actuellement ?</p>
                              
                              {/* Option Local */}
                              <button 
                                onClick={handleLocalChoice}
                                className="w-full p-5 rounded-2xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition text-left group relative overflow-hidden"
                              >
                                  <div className="flex items-start gap-4 relative z-10">
                                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                          <MapPin size={24}/>
                                      </div>
                                      <div>
                                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">Je suis au Maroc</h4>
                                          <p className="text-sm text-slate-500 mt-1">Visite physique, rencontre propriétaire, 0 frais.</p>
                                          <span className="inline-block mt-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Idéal étudiants locaux</span>
                                      </div>
                                  </div>
                              </button>

                              {/* Option International */}
                              <button 
                                onClick={handleInternationalChoice}
                                className="w-full p-5 rounded-2xl border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition text-left group relative overflow-hidden"
                              >
                                  <div className="flex items-start gap-4 relative z-10">
                                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                                          <Globe size={24}/>
                                      </div>
                                      <div>
                                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700">Je viens de l'étranger</h4>
                                          <p className="text-sm text-slate-500 mt-1">Réservation à distance sécurisée. Compte séquestre.</p>
                                          <span className="inline-block mt-2 text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Idéal étudiants internationaux</span>
                                      </div>
                                  </div>
                              </button>
                          </div>
                      )}

                      {/* ÉTAPE 2A: FLUX LOCAL (VISITE) */}
                      {paymentStep === 'local_info' && (
                          <div className="p-8 text-center">
                              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                  <Eye size={40}/>
                              </div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-4">Prendre la chambre</h3>
                              <p className="text-slate-600 mb-8 leading-relaxed">
                                  Vous êtes sur place ? Excellent !<br/>
                                  Room.ma encourage la transparence. Prenez rendez-vous pour visiter le logement gratuitement.
                              </p>

                              <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-left mb-8 flex gap-3">
                                  <AlertTriangle size={24} className="text-red-600 flex-shrink-0"/>
                                  <div>
                                      <p className="font-bold text-red-700 text-sm">Rappel de Sécurité</p>
                                      <p className="text-xs text-red-600 mt-1">Ne versez <strong>jamais</strong> d'argent liquide avant d'avoir visité, signé le contrat et reçu les clés. Room.ma ne prend aucune commission sur les visites.</p>
                                  </div>
                              </div>

                              <div className="space-y-3">
                                  <button onClick={() => window.location.href = `tel:+212600000000`} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2">
                                      <Phone size={20}/> Appeler le Propriétaire
                                  </button>
                                  <button onClick={handleQuickContact} className="w-full py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-2">
                                      <MessageCircle size={20}/> Envoyer un message
                                  </button>
                              </div>
                              <button onClick={() => setPaymentStep('selection')} className="mt-6 text-sm text-slate-400 hover:text-slate-600">Retour</button>
                          </div>
                      )}

                      {/* ÉTAPE 2B: FLUX INTERNATIONAL (RESERVATION EN LIGNE) */}
                      {(paymentStep === 'summary' || paymentStep === 'card_input' || paymentStep === 'cmi_secure' || paymentStep === 'processing_auth' || paymentStep === 'success' || paymentStep === 'redirecting') && (
                           <>
                               {paymentStep === 'summary' && (
                                  <div className="p-6 space-y-6">
                                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                                          <ShieldCheck className="text-blue-600 mt-1 flex-shrink-0" size={20}/>
                                          <div>
                                              <p className="text-sm font-bold text-blue-900">Garantie Room.ma (Séquestre)</p>
                                              <p className="text-xs text-blue-700 mt-1">Votre argent est bloqué sur un compte neutre. Il n'est transféré au bailleur qu'après votre arrivée et la remise des clés.</p>
                                          </div>
                                      </div>

                                      <div className="bg-slate-50 p-4 rounded-2xl flex gap-4 items-center border border-slate-100">
                                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                              <img src={listing.image} className="w-full h-full object-cover"/>
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-slate-900 text-sm">{listing.title}</h4>
                                              <p className="text-blue-600 font-bold text-sm mt-1">{listing.price} MAD/mois</p>
                                          </div>
                                      </div>

                                      <div className="space-y-3 text-sm pt-2 border-t border-slate-100">
                                          <div className="flex justify-between">
                                              <span className="text-slate-600">Premier loyer</span>
                                              <span className="font-bold">{listing.price} MAD</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-slate-600">Caution (Séquestrée)</span>
                                              <span className="font-bold">{listing.price} MAD</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-slate-600">Frais de service</span>
                                              <span className="font-bold text-green-600">Gratuit</span>
                                          </div>
                                          <div className="h-px bg-slate-100 my-2"></div>
                                          <div className="flex justify-between text-lg font-bold text-slate-900">
                                              <span>{t('details.total_to_pay')}</span>
                                              <span>{finalTotal} MAD</span>
                                          </div>
                                      </div>

                                      <button onClick={handleConfirmReservation} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2">
                                          <CreditCard size={20}/> {t('details.confirm_booking')}
                                      </button>
                                      <button onClick={() => setPaymentStep('selection')} className="w-full text-center text-sm text-slate-400 hover:text-slate-600">Retour</button>
                                  </div>
                               )}

                               {/* ... (Payment Steps Reuse Existing Logic from Previous Code) ... */}
                               {paymentStep === 'card_input' && (
                                  <div className="p-6">
                                       <form onSubmit={handleCardSubmit} className="space-y-4">
                                           <div className="bg-slate-50 p-4 rounded-xl text-center mb-4">
                                               <p className="text-sm font-bold text-slate-600">Montant à bloquer</p>
                                               <p className="text-3xl font-black text-slate-900">{finalTotal} MAD</p>
                                           </div>
                                           <div>
                                               <label className="block text-xs font-bold text-slate-500 mb-1">NUMÉRO DE CARTE</label>
                                               <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-slate-300 rounded-xl font-mono outline-none focus:ring-2 focus:ring-blue-500" required />
                                           </div>
                                           <div className="grid grid-cols-2 gap-4">
                                               <input type="text" placeholder="MM/YY" className="w-full p-3 border border-slate-300 rounded-xl font-mono outline-none focus:ring-2 focus:ring-blue-500" required />
                                               <input type="text" placeholder="CVC" className="w-full p-3 border border-slate-300 rounded-xl font-mono outline-none focus:ring-2 focus:ring-blue-500" required />
                                           </div>
                                           <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl mt-6 flex items-center justify-center gap-2">
                                               <Lock size={18}/> Payer {finalTotal} MAD
                                           </button>
                                       </form>
                                  </div>
                               )}

                               {paymentStep === 'redirecting' && (
                                  <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                                      <Loader2 size={48} className="text-blue-600 animate-spin mb-6"/>
                                      <h4 className="font-bold text-slate-900 text-lg mb-2">Connexion CMI...</h4>
                                      <p className="text-slate-500 text-sm">Redirection vers la passerelle sécurisée.</p>
                                  </div>
                               )}

                               {(paymentStep === 'cmi_secure' || paymentStep === 'processing_auth') && (
                                  <div className="bg-slate-100 min-h-[400px] flex flex-col">
                                      <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center gap-2 text-xs text-green-700">
                                          <Lock size={12}/> Secure Payment Gateway
                                      </div>
                                      <div className="p-6 flex-1 flex flex-col items-center justify-center">
                                          <div className="bg-white w-full max-w-sm rounded-xl shadow-sm border border-slate-300 p-6 text-center">
                                              {paymentStep === 'cmi_secure' ? (
                                                  <>
                                                      <p className="mb-4 font-bold">Validation 3D Secure</p>
                                                      <div className="flex justify-center gap-2 mb-4">
                                                          <Smartphone size={32} className="text-blue-600"/>
                                                      </div>
                                                      <p className="text-xs text-slate-500 mb-4">Veuillez valider la notification sur votre mobile.</p>
                                                      <button onClick={handleConfirmCMI} className="w-full py-2 bg-green-600 text-white font-bold rounded-lg text-sm">Confirmer</button>
                                                  </>
                                              ) : (
                                                  <div className="text-center">
                                                      <Loader2 size={32} className="text-blue-900 animate-spin mx-auto mb-4"/>
                                                      <p className="font-bold text-slate-900">Traitement...</p>
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                               )}

                               {paymentStep === 'success' && (
                                  <div className="p-8 text-center">
                                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                          <Check size={48} className="text-green-600"/>
                                      </div>
                                      <h4 className="font-bold text-2xl text-slate-900 mb-2">Réservation Confirmée !</h4>
                                      <p className="text-slate-600 mb-8">
                                          Les fonds sont séquestrés.<br/>
                                          Le propriétaire a été notifié.
                                      </p>
                                      <button onClick={() => navigate('/contracts')} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 group">
                                          Voir mon Contrat <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
                                      </button>
                                  </div>
                               )}
                           </>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ListingDetails;
