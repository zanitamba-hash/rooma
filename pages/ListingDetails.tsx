
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_LISTINGS } from '../constants';
import { Review } from '../types';
import { MapPin, ShieldCheck, CheckCircle, MessageCircle, Star, X, FileText, Lock, Armchair, Utensils, Bath, Image as ImageIcon, Flag, Shield, MessageSquare, UserCheck, Clock, ThumbsUp, Cigarette, Music, Users, Ban, PawPrint, Reply, Send, AlertTriangle, Zap } from 'lucide-react';

const ListingDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = MOCK_LISTINGS.find(l => l.id === Number(id));

  // États locaux pour la simulation
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  
  // Gestion des Avis
  const [reviews, setReviews] = useState<Review[]>(listing?.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  
  // Gestion des Réponses Propriétaire
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Simulation Rôle Utilisateur (Pour démo)
  const [userRole, setUserRole] = useState<'student' | 'owner'>('student');

  if (!listing) return <div className="p-8 text-center">Logement non trouvé. <button onClick={() => navigate('/listings')} className="text-blue-600 underline">Retour</button></div>;

  const handleSendMessage = () => {
      alert(`Message sécurisé envoyé à ${listing.ownerName} !`);
      setShowContactModal(false);
      navigate('/messages');
  };

  const handleQuickContact = () => {
      // Navigation vers la messagerie avec un message pré-rempli
      navigate('/messages', {
        state: {
          contactId: `owner_${listing.id}`,
          contactName: listing.ownerName,
          initialMessage: `Bonjour ${listing.ownerName}, je suis très intéressé par votre annonce "${listing.title}" à ${listing.city}. Est-elle toujours disponible pour une visite ?`
        }
      });
  };

  const handleReserve = () => {
      alert("Sécurité : Redirection vers la passerelle CMI pour le blocage des fonds.");
  };

  // Soumettre un avis (Étudiant)
  const handleSubmitReview = (e: React.FormEvent) => {
      e.preventDefault();
      const newReview: Review = {
          id: Date.now(),
          author: "Moi (Étudiant)",
          role: "Étudiant",
          text: newReviewText,
          rating: newReviewRating,
          isVerified: true,
          date: "À l'instant"
      };
      setReviews([newReview, ...reviews]);
      alert("Votre avis a été publié !");
      setShowReviewForm(false);
      setNewReviewText('');
  };

  // Soumettre une réponse (Propriétaire)
  const handleSubmitReply = (reviewId: number) => {
      if(!replyContent.trim()) return;
      
      const updatedReviews = reviews.map(r => {
          if (r.id === reviewId) {
              return {
                  ...r,
                  ownerReply: replyContent,
                  replyDate: "À l'instant"
              };
          }
          return r;
      });
      
      setReviews(updatedReviews);
      setReplyingToId(null);
      setReplyContent('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Toggle de simulation de rôle (Pour Démo) */}
      <div className="fixed bottom-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg text-xs opacity-80 hover:opacity-100 transition flex flex-col gap-2">
          <p className="font-bold border-b border-slate-700 pb-1">Mode Démo :</p>
          <div className="flex gap-2">
              <button 
                onClick={() => setUserRole('student')}
                className={`px-2 py-1 rounded ${userRole === 'student' ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                  Vue Étudiant
              </button>
              <button 
                onClick={() => setUserRole('owner')}
                className={`px-2 py-1 rounded ${userRole === 'owner' ? 'bg-blue-600' : 'bg-slate-700'}`}
              >
                  Vue Propriétaire
              </button>
          </div>
      </div>

      {/* Enhanced Gallery Header */}
      <div className="h-[500px] relative group">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
        
        {/* Visual Badges for Room Types */}
        <div className="absolute top-8 right-8 flex flex-col gap-2">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-white/30 transition cursor-pointer">
                <Armchair size={20}/> <span className="font-bold shadow-black drop-shadow-md">Salon</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-white/30 transition cursor-pointer">
                <Utensils size={20}/> <span className="font-bold shadow-black drop-shadow-md">Cuisine</span>
            </div>
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-white/30 transition cursor-pointer">
                <Bath size={20}/> <span className="font-bold shadow-black drop-shadow-md">Douche</span>
            </div>
            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-slate-100 transition cursor-pointer shadow-xl">
                <ImageIcon size={20}/> <span className="font-bold">Voir tout (12)</span>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg">{listing.type}</span>
                    {listing.isVerified && <span className="bg-green-500/20 border border-green-500 text-green-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"><ShieldCheck size={14}/> Vérifié</span>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow-lg">{listing.title}</h1>
                <p className="flex items-center gap-2 text-lg md:text-xl text-slate-200"><MapPin size={20}/> {listing.city} • <span className="text-blue-400 font-bold">Proche {listing.university}</span></p>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">À propos de ce logement</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">{listing.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                 <div className="text-center"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">Disponibilité</span><p className="font-bold text-slate-900">Immédiate</p></div>
                 <div className="text-center border-l border-slate-200"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">Durée Min</span><p className="font-bold text-slate-900">3 mois</p></div>
                 <div className="text-center border-l border-slate-200"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">Caution</span><p className="font-bold text-blue-600">1 mois</p></div>
                 <div className="text-center border-l border-slate-200"><span className="text-slate-500 text-xs uppercase font-bold block mb-1">Charges</span><p className="font-bold text-green-600">Incluses</p></div>
              </div>
              
              <h3 className="font-bold mb-4 text-lg">Équipements inclus</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {listing.amenities.map((item, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700 flex items-center gap-2 font-medium"><CheckCircle size={16} className="text-green-500"/> {item}</span>
                ))}
              </div>

              {/* SECTION RÈGLEMENT INTÉRIEUR AJOUTÉE */}
              <div className="mt-8 border-t border-slate-100 pt-8">
                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900"><Ban className="text-red-500" size={20}/> Règlement Intérieur & Interdictions</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="relative">
                          <Cigarette className="text-red-400" size={20}/>
                          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-red-600 rotate-45"></div></div>
                        </div>
                        <span className="font-medium text-sm">Interdiction de fumer</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="relative">
                          <PawPrint className="text-red-400" size={20}/>
                          <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-0.5 bg-red-600 rotate-45"></div></div>
                        </div>
                        <span className="font-medium text-sm">Animaux non admis</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <Music className="text-orange-500" size={20}/>
                        <span className="font-medium text-sm">Pas de fêtes / Calme exigé après 22h</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <Users className="text-blue-500" size={20}/>
                        <span className="font-medium text-sm">Visiteurs autorisés (Max 2)</span>
                    </div>
                 </div>
                 <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 italic bg-slate-50 p-2 rounded">
                    <AlertTriangle size={12} className="mt-0.5"/>
                    Le non-respect de ces règles peut entraîner la résiliation immédiate du contrat de bail selon la loi 67-12.
                 </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <FileText size={18} /> Contrat de bail standard
                 </div>
                 <button className="text-blue-600 font-bold hover:underline text-sm">
                    Télécharger le modèle
                 </button>
              </div>
            </div>

            {/* ENHANCED Owner Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
               <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                   {/* Avatar & Badge */}
                   <div className="relative">
                       <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                           {listing.ownerName.charAt(0)}
                       </div>
                       <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border-2 border-white shadow-sm">
                           <ShieldCheck size={12}/> Vérifié
                       </div>
                   </div>
                   
                   {/* Info & Stats */}
                   <div className="flex-1">
                       <div className="flex justify-between items-start">
                           <div>
                               <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                   {listing.ownerName}
                               </h3>
                               <p className="text-slate-500 text-sm mb-3">Membre depuis 2022 • Propriétaire Particulier</p>
                           </div>
                           <div className="text-right">
                               <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg"><Star fill="currentColor"/> {listing.rating}</div>
                               <p className="text-xs text-slate-400 underline cursor-pointer hover:text-blue-600">{reviews.length} avis</p>
                           </div>
                       </div>

                       {/* Stats Row */}
                       <div className="flex flex-wrap gap-4 mt-2 mb-6">
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <ThumbsUp size={14} className="text-blue-600"/> Taux de réponse : <strong>100%</strong>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <Clock size={14} className="text-blue-600"/> Répond en : <strong>1 heure</strong>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                               <UserCheck size={14} className="text-blue-600"/> Identité : <strong>Validée (CIN)</strong>
                           </div>
                       </div>
                   </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-3 mt-4 border-t border-slate-100 pt-6">
                   <button onClick={handleQuickContact} className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition transform hover:-translate-y-1">
                       <Zap size={20} className="animate-pulse"/> Contact Rapide
                   </button>
                   <button onClick={() => setShowContactModal(true)} className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-slate-300 flex items-center justify-center gap-2 bg-white">
                       <FileText size={20}/> Demander contrat
                   </button>
               </div>
            </div>

            {/* INTERACTIVE REVIEWS SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8" id="reviews">
               <div className="flex justify-between items-center mb-8">
                   <div>
                       <h3 className="font-bold text-2xl flex items-center gap-2 text-slate-900">
                           <Star className="text-yellow-400" fill="currentColor"/> 
                           {reviews.length > 0 ? `${reviews.length} Avis` : 'Aucun avis'}
                       </h3>
                       <p className="text-slate-500 text-sm mt-1">Moyenne: {listing.rating}/5</p>
                   </div>
                   
                   {/* Bouton visible seulement pour les étudiants */}
                   {userRole === 'student' && !showReviewForm && (
                       <button 
                        onClick={() => setShowReviewForm(true)}
                        className="text-sm font-bold text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-md flex items-center gap-2"
                       >
                           <MessageCircle size={18}/> Écrire un avis
                       </button>
                   )}
               </div>

               {/* FORMULAIRE D'AVIS (ÉTUDIANT) */}
               {showReviewForm && (
                   <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 rounded-xl border border-slate-200 animate-fade-in mb-8">
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
                        placeholder="Partagez votre expérience (Propreté, Communication, Respect du contrat...)"
                        required
                        rows={4}
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                       ></textarea>
                       <div className="flex justify-end">
                           <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition">Publier l'avis</button>
                       </div>
                   </form>
               )}

               {/* LISTE DES AVIS */}
               <div className="space-y-8">
                   {reviews.length === 0 ? (
                       <p className="text-center text-slate-500 py-4 italic">Soyez le premier à laisser un avis sur ce logement !</p>
                   ) : (
                       reviews.map((review) => (
                           <div key={review.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                               {/* Review Header */}
                               <div className="flex justify-between items-start mb-3">
                                   <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                           {review.author.charAt(0)}
                                       </div>
                                       <div>
                                           <p className="font-bold text-slate-900 text-sm">{review.author}</p>
                                           <p className="text-xs text-slate-500">{review.date}</p>
                                       </div>
                                   </div>
                                   <div className="flex gap-0.5">
                                       {[...Array(5)].map((_, i) => (
                                           <Star key={i} size={14} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} fill="currentColor" />
                                       ))}
                                   </div>
                               </div>

                               {/* Review Body */}
                               <p className="text-slate-600 text-sm leading-relaxed pl-14 mb-4">
                                   {review.text}
                               </p>

                               {/* PROPRIÉTAIRE : BOUTON RÉPONDRE */}
                               {userRole === 'owner' && !review.ownerReply && replyingToId !== review.id && (
                                   <div className="pl-14">
                                       <button 
                                        onClick={() => setReplyingToId(review.id)}
                                        className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline"
                                       >
                                           <Reply size={12}/> Répondre
                                       </button>
                                   </div>
                               )}

                               {/* PROPRIÉTAIRE : FORMULAIRE DE RÉPONSE */}
                               {replyingToId === review.id && (
                                   <div className="ml-14 mt-3 bg-blue-50 p-4 rounded-xl border border-blue-100 animate-fade-in">
                                       <p className="text-xs font-bold text-blue-800 mb-2">Votre réponse publique :</p>
                                       <div className="flex gap-2">
                                           <input 
                                            type="text" 
                                            autoFocus
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            placeholder="Remerciez le locataire ou clarifiez un point..."
                                            className="flex-1 px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                           />
                                           <button 
                                            onClick={() => handleSubmitReply(review.id)}
                                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                                           >
                                               <Send size={16}/>
                                           </button>
                                           <button onClick={() => setReplyingToId(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                                       </div>
                                   </div>
                               )}

                               {/* AFFICHAGE DE LA RÉPONSE PROPRIÉTAIRE */}
                               {review.ownerReply && (
                                   <div className="ml-14 mt-4 bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600">
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
            
            <button className="text-red-500 text-sm font-bold flex items-center gap-2 hover:underline mx-auto opacity-60 hover:opacity-100 transition"><Flag size={14}/> Signaler cette annonce</button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 ring-1 ring-slate-900/5">
                    <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                        <div><span className="text-4xl font-bold text-slate-900">{listing.price} DH</span><span className="text-slate-500 font-medium">/mois</span></div>
                        <span className="text-green-600 text-xs font-bold bg-green-100 border border-green-200 px-2 py-1 rounded flex items-center gap-1"><CheckCircle size={12}/> DISPO</span>
                    </div>
                    
                    <div className="space-y-3">
                        <button onClick={handleReserve} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 shadow-lg">
                            <Lock size={18} /> Réserver maintenant
                        </button>
                        <p className="text-center text-xs text-slate-500 px-4">
                            Votre argent est conservé sur un compte séquestre sécurisé jusqu'à la remise des clés.
                        </p>
                    </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-blue-900">
                    <h4 className="font-bold flex items-center gap-2 mb-4 text-lg"><Shield size={20} className="text-blue-600"/> Garantie Room.ma</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span><strong>Propriétaire vérifié</strong> (CIN & Titre Foncier).</span></li>
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span><strong>Protection Anti-Arnaque</strong> : Paiement bloqué.</span></li>
                        <li className="flex gap-3"><CheckCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5"/> <span><strong>Contrat de bail</strong> généré automatiquement.</span></li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between mb-4">
                <h3 className="font-bold text-lg">Contacter {listing.ownerName}</h3>
                <button onClick={() => setShowContactModal(false)} className="p-1 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800 border border-blue-100">
                <p>ℹ️ Pour votre sécurité, ne communiquez jamais en dehors de la plateforme avant la signature.</p>
            </div>
            <textarea className="w-full p-4 border border-slate-300 rounded-xl h-32 mb-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Bonjour, est-ce toujours disponible ?..." value={contactMessage} onChange={e => setContactMessage(e.target.value)}></textarea>
            <button onClick={handleSendMessage} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg">Envoyer le message</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
