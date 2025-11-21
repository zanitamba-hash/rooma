
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_LISTINGS } from '../constants';
import { Review } from '../types';
import { MapPin, ShieldCheck, CheckCircle, MessageCircle, Star, X, FileText, Lock, Armchair, Utensils, Bath, Image as ImageIcon, Flag, Shield, Zap, Ban, AlertTriangle, Cigarette, PawPrint, Music, Users, Reply, Send, CreditCard, ThumbsUp, Clock, UserCheck, Home, PlayCircle, Video, Check, Wifi, Tv, Car, Thermometer, Wind, Smartphone, Loader2, ArrowRight, User, Banknote, Crown, Globe, Eye, Gavel, HeartHandshake } from 'lucide-react';
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
  
  // Gestion des Réponses Propriétaire
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // --- NOUVEAU : États pour le flux de réservation (Paiement CMI & Physique) ---
  const [showReservationModal, setShowReservationModal] = useState(false);
  // summary -> card_input -> redirecting -> cmi_secure -> processing_auth -> success (online)
  // summary -> success (physical)
  const [paymentStep, setPaymentStep] = useState<'summary' | 'card_input' | 'redirecting' | 'cmi_secure' | 'processing_auth' | 'success'>('summary');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'online' | 'physical'>('online');

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
      setPaymentStep('summary');
      setSelectedPaymentMethod('online');
  };

  // Déclenchement du processus de paiement
  const handleConfirmReservation = () => {
      if (selectedPaymentMethod === 'physical') {
          setPaymentStep('success');
      } else {
          setPaymentStep('card_input');
      }
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
      setPaymentStep('summary');
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
        
        {/* Main Image / Video Container */}
        <div className="w-full h-full transition-all duration-500 ease-in-out relative">
            <img 
                src={getActiveImageSrc()} 
                alt={listing.title} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${activeMedia === 'video' ? 'opacity-60' : 'opacity-100'}`} 
            />
            
            {/* Video Overlay Player */}
            {activeMedia === 'video' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:scale-110 transition shadow-2xl">
                        <PlayCircle size={40} className="text-white fill-white/20"/>
                    </div>
                    <p className="text-white font-bold mt-4 text-lg shadow-black drop-shadow-lg">{t('details.virtual_visit')}</p>
                </div>
            )}
            
            {/* Gradient Overlay Text */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none" />
        </div>

        {/* Gallery Navigation Bar (Bottom) */}
        <div className="absolute bottom-8 left-0 right-0 px-4 z-20 flex justify-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl flex gap-2 overflow-x-auto no-scrollbar max-w-full shadow-2xl">
                
                <button 
                    onClick={() => setActiveMedia('main')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'main' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                >
                    <ImageIcon size={16}/> {t('details.overview')}
                </button>

                <button 
                    onClick={() => setActiveMedia('salon')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'salon' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                >
                    <Armchair size={16}/> {t('details.living_room')}
                </button>

                <button 
                    onClick={() => setActiveMedia('cuisine')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'cuisine' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                >
                    <Utensils size={16}/> {t('details.kitchen')}
                </button>

                <button 
                    onClick={() => setActiveMedia('sdb')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'sdb' ? 'bg-white text-slate-900 shadow-lg' : 'text-white hover:bg-white/10'}`}
                >
                    <Bath size={16}/> {t('details.bathroom')}
                </button>

                <div className="w-px bg-white/20 mx-1"></div>

                <button 
                    onClick={() => setActiveMedia('video')}
                    className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap ${activeMedia === 'video' ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' : 'text-white hover:bg-white/10'}`}
                >
                    <Video size={16}/> 360°
                </button>
            </div>
        </div>

        {/* Top Info Layer */}
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
            
            {/* Main Description & Amenities Integrated */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('details.about_title')}</h2>
              
              <div className="prose prose-slate max-w-none mb-8">
                  <p className="text-slate-600 leading-relaxed text-lg">{listing.description}</p>
              </div>

              {/* Integrated Amenities Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                  {listing.amenities.map((item, i) => (
                    <span key={i} className="px-3 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-100 transition">
                        {getAmenityIcon(item)} {item}
                    </span>
                  ))}
              </div>
              
              {/* Grid Info Rapide */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                 <div className="text-center"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.availability')}</span><p className="font-bold text-slate-900">{t('details.immediate')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.min_duration')}</span><p className="font-bold text-slate-900">3 {t('details.month')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.deposit')}</span><p className="font-bold text-blue-600">1 {t('details.month')}</p></div>
                 <div className={`text-center border-slate-200 ${language === 'ar' ? 'border-r' : 'border-l'}`}><span className="text-slate-500 text-xs uppercase font-bold block mb-1">{t('details.charges')}</span><p className="font-bold text-green-600">{t('details.included')}</p></div>
              </div>
              
              {/* SECTION RÈGLEMENT INTÉRIEUR */}
              <div className="mt-8 border-t border-slate-100 pt-8">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900"><Ban className="text-red-500" size={20}/> {t('details.rules_title')}</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="relative">
                          <Cigarette className="text-red-400" size={20}/>
                          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-red-600 rotate-45"></div></div>
                        </div>
                        <span className="font-medium text-sm">{t('details.no_smoking')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="relative">
                          <PawPrint className="text-red-400" size={20}/>
                          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-red-600 rotate-45"></div></div>
                        </div>
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
                 <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 italic bg-slate-50 p-2 rounded">
                    <AlertTriangle size={12} className="mt-0.5"/>
                    {t('details.rules_warning')}
                 </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <FileText size={18} /> {t('details.contract_standard')}
                 </div>
                 <button className="text-blue-600 font-bold hover:underline text-sm">
                    {t('details.download_model')}
                 </button>
              </div>
            </div>

            {/* ENHANCED Owner Profile Section with PHOTO/PLACEHOLDER */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                   {/* Photo Propriétaire */}
                   <div className="relative group">
                       <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                           {ownerPhoto ? (
                               <img 
                                  src={ownerPhoto} 
                                  alt={listing.ownerName} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                               />
                           ) : (
                               <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                                   <User size={48} strokeWidth={1.5} />
                               </div>
                           )}
                       </div>
                       <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-white shadow-sm z-10">
                           <ShieldCheck size={12}/> {t('details.owner_verified')}
                       </div>
                   </div>
                   
                   <div className="flex-1 w-full">
                       <div className="flex justify-between items-start">
                           <div>
                               <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                   {listing.ownerName}
                                </h3>
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
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <UserCheck size={14} className="text-blue-600"/> {t('details.identity_validated')} : <strong>CIN</strong>
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

            {/* INTERACTIVE REVIEWS SECTION */}
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
                       <button 
                        onClick={() => setShowReviewForm(true)}
                        className="text-sm font-bold text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-md flex items-center gap-2"
                       >
                           <MessageCircle size={18}/> {t('details.write_review')}
                       </button>
                   )}
               </div>

               {showReviewForm && (
                   <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-fade-in mb-8 relative overflow-hidden">
                       {reviewSuccess ? (
                           <div className="absolute inset-0 bg-green-50 flex items-center justify-center flex-col text-green-700 animate-fade-in z-10">
                               <CheckCircle size={40} className="mb-2"/>
                               <p className="font-bold">Avis publié avec succès !</p>
                           </div>
                       ) : (
                           <>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold">Noter votre expérience</h4>
                                    <button type="button" onClick={() => setShowReviewForm(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                                </div>
                                
                                <div className="mb-4 flex gap-2">
                                    {[1,2,3,4,5].map(star => (
                                        <button type="button" key={star} onClick={() => setNewReviewRating(star)} className={`transition transform hover:scale-110 ${star <= newReviewRating ? 'text-yellow-400' : 'text-slate-300'}`}>
                                            <Star size={32} fill="currentColor"/>
                                        </button>
                                    ))}
                                </div>
                                <textarea 
                                    className="w-full p-3 border border-slate-300 rounded-lg mb-4 bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" 
                                    placeholder="Partagez votre expérience..."
                                    required
                                    rows={4}
                                    value={newReviewText}
                                    onChange={(e) => setNewReviewText(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end">
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition">Publier</button>
                                </div>
                           </>
                       )}
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
                                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                           {review.author.charAt(0)}
                                       </div>
                                       <div>
                                           <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                               {review.author}
                                               {review.isVerified && <ShieldCheck size={12} className="text-green-500"/>}
                                           </p>
                                           <p className="text-xs text-slate-500">{review.date}</p>
                                       </div>
                                   </div>
                                   <div className="flex gap-0.5">
                                       {[...Array(5)].map((_, i) => (
                                           <Star key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} fill="currentColor" />
                                       ))}
                                   </div>
                               </div>

                               <p className="text-slate-600 text-sm leading-relaxed pl-14 rtl:pl-0 rtl:pr-14 mb-4">
                                   {review.text}
                               </p>

                               {review.ownerReply && (
                                   <div className="ml-14 rtl:ml-0 rtl:mr-14 mt-4 bg-slate-50 p-4 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-blue-600">
                                       <div className="flex justify-between items-center mb-2">
                                           <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                               <ShieldCheck size={12} className="text-blue-600"/> Réponse du Propriétaire
                                           </p>
                                           <span className="text-[10px] text-slate-400">{review.replyDate || "Récemment"}</span>
                                       </div>
                                       <p className="text-slate-600 text-sm italic">
                                           "{review.ownerReply}"
                                       </p>
                                   </div>
                               )}
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
                        <button onClick={handleReserveClick} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg">
                            <Lock size={18} /> {t('details.reserve_btn')}
                        </button>
                        <p className="text-center text-xs text-slate-500 px-4">
                            {t('details.money_safe')}
                        </p>
                    </div>
                    
                    {/* NO COMMISSION WARNING - RED & BOLD */}
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

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden">
            {contactSuccess ? (
                <div className="absolute inset-0 bg-green-50 flex items-center justify-center flex-col text-green-700 animate-fade-in z-10">
                    <CheckCircle size={50} className="mb-4"/>
                    <h3 className="text-xl font-bold">Message Envoyé !</h3>
                    <p className="text-sm mt-2">Le propriétaire vous répondra sous peu.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-lg">Contacter {listing.ownerName}</h3>
                        <button onClick={() => setShowContactModal(false)} className="p-1 hover:bg-slate-100 rounded-full"><X size={20}/></button>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800 border border-blue-100">
                        <p>ℹ️ Pour votre sécurité, ne communiquez jamais en dehors de la plateforme avant la signature.</p>
                    </div>
                    <textarea className="w-full p-4 border border-slate-300 rounded-xl h-32 mb-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Bonjour, est-ce toujours disponible ?..." value={contactMessage} onChange={e => setContactMessage(e.target.value)}></textarea>
                    <button onClick={handleSendMessage} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg">Envoyer le message</button>
                </>
            )}
          </div>
        </div>
      )}

      {/* --- MODALE DE PAIEMENT CMI AMÉLIORÉE --- */}
      {showReservationModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 backdrop-blur-md p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up relative flex flex-col max-h-[90vh]">
                  {/* Header Commun */}
                  <div className="flex justify-between items-center p-6 border-b border-slate-100 flex-shrink-0">
                      <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                          {paymentStep === 'cmi_secure' || paymentStep === 'processing_auth' ? (
                              <span className="text-blue-800 flex items-center gap-2"><Lock size={20}/> Paiement Sécurisé CMI</span>
                          ) : paymentStep === 'success' ? (
                              <span className="text-green-600 flex items-center gap-2"><CheckCircle size={20}/> Réservation Confirmée</span>
                          ) : (
                              <span className="flex items-center gap-2"><ShieldCheck size={20} className="text-blue-600"/> {t('details.select_payment')}</span>
                          )}
                      </h3>
                      {paymentStep !== 'success' && paymentStep !== 'processing_auth' && (
                          <button onClick={handleCloseReservation} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
                      )}
                  </div>

                  {/* Content Steps - Scrollable area */}
                  <div className="overflow-y-auto">
                      
                      {/* ETAPE 1: RÉSUMÉ & INIT */}
                      {paymentStep === 'summary' && (
                          <div className="p-6 space-y-6">
                              {/* Product Summary */}
                              <div className="bg-slate-50 p-4 rounded-2xl flex gap-4 items-center border border-slate-100">
                                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                      <img src={listing.image} className="w-full h-full object-cover"/>
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900 text-sm">{listing.title}</h4>
                                      <p className="text-xs text-slate-500">{listing.type} • {listing.city}</p>
                                      <p className="text-blue-600 font-bold text-sm mt-1">{listing.price} MAD/mois</p>
                                  </div>
                              </div>

                              {/* Payment Method Selection */}
                              <div>
                                  <label className="text-sm font-bold text-slate-900 mb-3 block">{t('details.select_payment')}</label>
                                  <div className="space-y-3">
                                      {/* Option Internationale / Compte Bloqué */}
                                      <div 
                                          onClick={() => setSelectedPaymentMethod('online')}
                                          className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${selectedPaymentMethod === 'online' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-blue-300'}`}
                                      >
                                          <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${selectedPaymentMethod === 'online' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                                              {selectedPaymentMethod === 'online' && <Check size={12} className="text-white"/>}
                                          </div>
                                          <div className="flex-1">
                                              <div className="flex flex-wrap gap-2 items-center mb-1">
                                                  <span className="font-bold text-sm text-slate-900">{t('details.online_payment')}</span>
                                                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><Globe size={10}/> Recommended</span>
                                              </div>
                                              <p className="text-xs text-slate-500 leading-snug">{t('details.online_desc')}</p>
                                          </div>
                                      </div>

                                      {/* Option Locale / Visite Physique */}
                                      <div 
                                          onClick={() => setSelectedPaymentMethod('physical')}
                                          className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start gap-3 ${selectedPaymentMethod === 'physical' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-blue-300'}`}
                                      >
                                          <div className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center ${selectedPaymentMethod === 'physical' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                                              {selectedPaymentMethod === 'physical' && <Check size={12} className="text-white"/>}
                                          </div>
                                          <div>
                                              <div className="flex justify-between gap-2">
                                                 <span className="font-bold text-sm text-slate-900">{t('details.physical_payment')}</span>
                                                 <Eye size={16} className="text-slate-400"/>
                                              </div>
                                              <p className="text-xs text-slate-500 mt-1">{t('details.physical_desc')}</p>
                                              <p className="text--[10px] text-red-500 font-bold mt-1 flex items-center gap-1"><AlertTriangle size={10}/> 0% COMMISSION</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              {/* Breakdown */}
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
                                  {selectedPaymentMethod === 'online' ? <CreditCard size={20}/> : <Banknote size={20}/>}
                                  {t('details.confirm_booking')}
                              </button>
                              
                              {selectedPaymentMethod === 'online' && (
                                  <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                                      <Lock size={10}/> Transaction chiffrée SSL 256-bit via CMI
                                  </p>
                              )}
                          </div>
                      )}

                      {/* ETAPE 1.5: SAISIE CARTE (NOUVEAU) */}
                      {paymentStep === 'card_input' && (
                          <div className="p-6">
                               <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                                   <ShieldCheck size={24} className="text-blue-600 flex-shrink-0 mt-1"/>
                                   <div>
                                       <p className="text-sm font-bold text-blue-900">Paiement Sécurisé</p>
                                       <p className="text-xs text-blue-700">Vos coordonnées bancaires sont chiffrées et ne sont jamais stockées par Room.ma.</p>
                                   </div>
                               </div>

                               <form onSubmit={handleCardSubmit} className="space-y-4">
                                   <div>
                                       <label className="block text-xs font-bold text-slate-500 mb-1 text-transform uppercase">{t('payments.card_number')}</label>
                                       <div className="relative">
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none" required />
                                            <CreditCard className="absolute right-3 top-3 text-slate-400" size={20}/>
                                       </div>
                                   </div>
                                   <div className="grid grid-cols-2 gap-4">
                                       <div>
                                           <label className="block text-xs font-bold text-slate-500 mb-1 text-transform uppercase">{t('payments.expiry')}</label>
                                           <input type="text" placeholder="MM/YY" className="w-full p-3 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none" required />
                                       </div>
                                       <div>
                                           <label className="block text-xs font-bold text-slate-500 mb-1 text-transform uppercase">{t('payments.cvc')}</label>
                                           <input type="text" placeholder="123" className="w-full p-3 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 outline-none" required />
                                       </div>
                                   </div>
                                   <div>
                                       <label className="block text-xs font-bold text-slate-500 mb-1 text-transform uppercase">{t('payments.holder')}</label>
                                       <input type="text" placeholder="NOM PRENOM" className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
                                   </div>

                                   <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg mt-6 flex items-center justify-center gap-2">
                                       <Lock size={18}/> {t('payments.pay_btn')} {finalTotal} MAD
                                   </button>
                               </form>
                               <div className="mt-6 flex justify-center gap-4 grayscale opacity-50">
                                   <span className="text-xs font-bold italic">Visa</span>
                                   <span className="text-xs font-bold italic">Mastercard</span>
                                   <span className="text-xs font-bold italic">CMI</span>
                               </div>
                          </div>
                      )}

                      {/* ETAPE 2: REDIRECTION LOADER */}
                      {paymentStep === 'redirecting' && (
                          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                              <Loader2 size={48} className="text-blue-600 animate-spin mb-6"/>
                              <h4 className="font-bold text-slate-900 text-lg mb-2">Connexion au serveur bancaire...</h4>
                              <p className="text-slate-500 text-sm">Redirection vers la passerelle sécurisée CMI.</p>
                              <p className="text-slate-400 text-xs mt-8">Ne fermez pas cette fenêtre.</p>
                          </div>
                      )}

                      {/* ETAPE 3: INTERFACE CMI (SIMULÉE) */}
                      {(paymentStep === 'cmi_secure' || paymentStep === 'processing_auth') && (
                          <div className="bg-slate-100 min-h-[400px] flex flex-col">
                              {/* Fausse barre URL de banque */}
                              <div className="bg-white px-4 py-2 border-b border-slate-200 flex items-center gap-2 text-xs text-green-700">
                                  <Lock size={12}/> https://secure-payment.cmi.co.ma/auth/3d-secure
                              </div>
                              
                              <div className="p-6 flex-1 flex flex-col items-center justify-center">
                                  <div className="bg-white w-full max-w-sm rounded-xl shadow-sm border border-slate-300 p-6">
                                      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                                          <span className="font-bold text-blue-900 text-lg italic">cmi</span>
                                          <div className="flex gap-2">
                                              <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                              <div className="w-8 h-5 bg-slate-200 rounded"></div>
                                          </div>
                                      </div>

                                      <div className="space-y-3 text-sm mb-6">
                                          <div className="flex justify-between">
                                              <span className="text-slate-500">Marchand :</span>
                                              <span className="font-bold text-slate-900">Room.ma Services</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-slate-500">Montant :</span>
                                              <span className="font-bold text-slate-900">{finalTotal} MAD</span>
                                          </div>
                                          <div className="flex justify-between">
                                              <span className="text-slate-500">Date :</span>
                                              <span className="font-bold text-slate-900">{new Date().toLocaleDateString()}</span>
                                          </div>
                                      </div>

                                      {paymentStep === 'cmi_secure' ? (
                                          <div className="text-center">
                                              <p className="text-xs text-slate-600 mb-4">
                                                  Une authentification forte est requise. Veuillez valider la transaction sur votre application bancaire ou saisir le code SMS.
                                              </p>
                                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center gap-3">
                                                  <Smartphone size={24} className="text-blue-600"/>
                                                  <div className="text-left">
                                                      <p className="text-xs font-bold text-blue-900">Code envoyé au +212 6** ** ** 89</p>
                                                      <input type="text" placeholder="123456" className="w-full mt-1 bg-white border border-blue-200 rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-blue-500"/>
                                                  </div>
                                              </div>
                                              <button onClick={handleConfirmCMI} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg text-sm hover:bg-green-700 transition">
                                                  Valider le paiement
                                              </button>
                                          </div>
                                      ) : (
                                          <div className="text-center py-8">
                                              <Loader2 size={32} className="text-blue-900 animate-spin mx-auto mb-4"/>
                                              <p className="font-bold text-slate-900">Traitement en cours...</p>
                                          </div>
                                      )}
                                      
                                      <div className="mt-4 flex justify-center gap-2 grayscale opacity-50">
                                          <span className="text-[10px] font-bold text-slate-400">Verified by Visa</span>
                                          <span className="text-[10px] font-bold text-slate-400">MasterCard SecureCode</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* ETAPE 4: SUCCÈS */}
                      {paymentStep === 'success' && (
                          <div className="p-8 text-center">
                              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                  <Check size={48} className="text-green-600"/>
                              </div>
                              <h4 className="font-bold text-2xl text-slate-900 mb-2">Félicitations !</h4>
                              
                              {selectedPaymentMethod === 'online' ? (
                                  <p className="text-slate-600 mb-8">
                                      Votre logement est sécurisé.<br/>
                                      Le propriétaire a été notifié et vos fonds sont séquestrés.
                                  </p>
                              ) : (
                                  <p className="text-slate-600 mb-8">
                                      Votre demande de visite est enregistrée.<br/>
                                      Veuillez contacter le propriétaire pour organiser la rencontre.
                                  </p>
                              )}
                              
                              {selectedPaymentMethod === 'online' && (
                                  <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 mb-8 text-left">
                                      <p className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
                                          <FileText size={16}/> Prochaine étape obligatoire :
                                      </p>
                                      <p className="text-sm text-blue-800 leading-relaxed">
                                          Vous devez maintenant signer numériquement votre contrat de bail pour finaliser la procédure légale.
                                      </p>
                                  </div>
                              )}
                              
                              {selectedPaymentMethod === 'physical' && (
                                  <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 mb-8 text-left">
                                      <p className="text-orange-900 font-bold text-sm mb-3 flex items-center gap-2">
                                          <AlertTriangle size={16}/> Rappel Sécurité :
                                      </p>
                                      <p className="text-sm text-orange-800 leading-relaxed">
                                          Ne payez jamais en espèces sans avoir visité le logement et reçu un reçu signé.
                                      </p>
                                  </div>
                              )}

                              <button onClick={() => navigate('/contracts')} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2 group">
                                  Aller aux Contrats <ArrowRight size={20} className="group-hover:translate-x-1 transition"/>
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default ListingDetails;
