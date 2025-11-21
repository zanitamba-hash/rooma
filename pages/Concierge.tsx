
import React, { useState } from 'react';
import { Crown, CheckCircle, ShieldCheck, ArrowLeft, Wrench, Shield, AlertTriangle, FileText, UserCheck, Globe, Lock, Truck, Loader2, X, CreditCard, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Concierge: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubscribe = (packName: string) => {
      setSelectedPack(packName);
      setPaymentSuccess(false);
  };

  const handlePayment = () => {
      setIsProcessing(true);
      setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccess(true);
      }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
       
       {/* Hero Premium */}
       <div className="relative bg-slate-900 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          
          <button onClick={() => navigate(-1)} className="absolute top-8 left-4 md:left-8 z-20 text-white/80 hover:text-white flex items-center gap-2 font-bold transition hover:-translate-x-1 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
             <ArrowLeft size={18} className={language === 'ar' ? 'rotate-180' : ''} /> {t('details.back')}
          </button>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mt-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <Crown size={14} /> CONCIERGERIE VIP
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                 Gestion & Sécurité Totale <br/>de votre Appartement
             </h1>
             <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
                 Ne gérez plus les problèmes, nous le faisons pour vous. De la vérification des locataires aux réparations d'urgence, votre appartement est entre les mains d'experts 24/7.
             </p>
          </div>
       </div>

       {/* SECTION 1: SECURITÉ & PROCESSUS */}
       <div className="max-w-7xl mx-auto px-4 py-24">
           <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Processus de Sécurisation Blindé</h2>
               <p className="text-slate-600 max-w-2xl mx-auto text-lg">Notre protocole de sécurité en 3 étapes garantit que votre bien reste en parfait état et que vos loyers sont payés à l'heure.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
               {/* Etape 1 */}
               <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                   <div className="relative z-10">
                       <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg mb-6">1</div>
                       <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><UserCheck className="text-blue-600"/> Filtrage Locataire Strict</h3>
                       <p className="text-slate-600 text-sm leading-relaxed mb-6">
                           Nous ne laissons pas entrer n'importe qui. Chaque locataire passe par une vérification d'identité (CIN/Passeport), une validation de solvabilité et un contrôle des antécédents.
                       </p>
                       <ul className="text-sm space-y-3">
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Identité validée</li>
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Garant obligatoire</li>
                       </ul>
                   </div>
               </div>

               {/* Etape 2 */}
               <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                   <div className="relative z-10">
                       <div className="bg-purple-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg mb-6">2</div>
                       <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><FileText className="text-purple-600"/> État des Lieux Digital</h3>
                       <p className="text-slate-600 text-sm leading-relaxed mb-6">
                           Avant la remise des clés, nous réalisons un état des lieux photo/vidéo certifié par un expert Room.ma. Toute dégradation est immédiatement facturée sur la caution séquestrée.
                       </p>
                       <ul className="text-sm space-y-3">
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Inventaire mobilier</li>
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Caution bloquée</li>
                       </ul>
                   </div>
               </div>

               {/* Etape 3 */}
               <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition duration-300">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                   <div className="relative z-10">
                       <div className="bg-indigo-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg mb-6">3</div>
                       <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Shield className="text-indigo-600"/> Intervention 24/7</h3>
                       <p className="text-slate-600 text-sm leading-relaxed mb-6">
                           En cas de problème (bruit, fuite, perte de clé), nous intervenons physiquement. Vous n'avez pas à vous déplacer. Nous sommes vos yeux et vos oreilles.
                       </p>
                       <ul className="text-sm space-y-3">
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Equipe mobile</li>
                           <li className="flex items-center gap-3 text-slate-700 bg-slate-50 p-2 rounded-lg"><CheckCircle size={16} className="text-green-500"/> Rapports mensuels</li>
                       </ul>
                   </div>
               </div>
           </div>
       </div>

       {/* SECTION 2: PROBLEMES COMPLEXES */}
       <div className="bg-slate-50 py-20 border-t border-slate-200">
           <div className="max-w-7xl mx-auto px-4">
               <div className="grid md:grid-cols-2 gap-16 items-center">
                   <div>
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold mb-6 border border-red-200">
                           <AlertTriangle size={14}/> GESTION DE CRISE
                       </div>
                       <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">On gère les problèmes difficiles pour vous.</h2>
                       <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                           La gestion locative, c'est surtout gérer les imprévus. Avec la Conciergerie VIP, vous ne recevrez plus d'appels de panique à 23h.
                       </p>
                       
                       <div className="space-y-6">
                           <div className="flex gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                               <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0"><Wrench className="text-orange-600"/></div>
                               <div>
                                   <h4 className="font-bold text-slate-900 text-lg">Maintenance & Réparations</h4>
                                   <p className="text-sm text-slate-500 mt-1">Plomberie, électricité, électroménager. Nous avons un réseau d'artisans agréés qui interviennent en moins de 4h.</p>
                               </div>
                           </div>
                           <div className="flex gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0"><Globe className="text-blue-600"/></div>
                               <div>
                                   <h4 className="font-bold text-slate-900 text-lg">Gestion Syndic & Voisinage</h4>
                                   <p className="text-sm text-slate-500 mt-1">Nous représentons vos intérêts auprès du syndic et gérons les conflits de voisinage pour maintenir la paix.</p>
                               </div>
                           </div>
                           <div className="flex gap-5 p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                               <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0"><Lock className="text-red-600"/></div>
                               <div>
                                   <h4 className="font-bold text-slate-900 text-lg">Expulsion & Juridique</h4>
                                   <p className="text-sm text-slate-500 mt-1">En cas de non-paiement, notre service juridique prend le relais immédiatement pour récupérer les sommes dues.</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="relative">
                       <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2.5rem] transform rotate-3 opacity-20 blur-lg"></div>
                       <img src="https://images.unsplash.com/photo-1581578731117-104f8a3ec71a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Maintenance" className="rounded-[2.5rem] shadow-2xl relative z-10 border-4 border-white" />
                       
                       {/* Floating Status Card */}
                       <div className="absolute -bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-2xl z-20 flex items-center gap-4 border border-slate-100 animate-bounce-slow">
                           <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="text-green-600" size={24}/></div>
                           <div>
                               <p className="font-bold text-slate-900 text-lg">Problème résolu</p>
                               <p className="text-xs text-slate-500 font-medium">Fuite d'eau - Intervention 45min</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       {/* Pricing Table */}
       <div className="bg-slate-900 py-24 text-white relative overflow-hidden">
           {/* Decoration */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px] opacity-30"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
           </div>

           <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-16">
                   <h2 className="text-3xl md:text-5xl font-bold mb-4">Nos Offres de Gestion</h2>
                   <p className="text-slate-400">Choisissez le niveau de tranquillité qui vous convient.</p>
               </div>

               <div className="grid lg:grid-cols-3 gap-8 items-center">
                   
                   {/* Pack Basic */}
                   <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
                       <h3 className="text-xl font-bold text-slate-300 mb-2">Gestion Essentielle</h3>
                       <div className="flex items-baseline gap-1 mb-6">
                           <span className="text-4xl font-bold text-white">5%</span>
                           <span className="text-sm text-slate-400">/ loyer</span>
                       </div>
                       <ul className="space-y-4 mb-8">
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> Collecte des loyers
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> Quittances automatiques
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> Support Chat Basic
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Essential')} className="w-full py-3 rounded-xl border border-white/20 font-bold hover:bg-white hover:text-slate-900 transition">
                           Choisir ce pack
                       </button>
                   </div>

                   {/* Pack Premium (Highlighted) */}
                   <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-[2.5rem] p-10 shadow-2xl transform md:scale-105 relative border border-blue-400">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-slate-900 px-6 py-2 rounded-full text-xs font-bold uppercase shadow-lg tracking-wider">
                           Recommandé
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">Gestion Intégrale</h3>
                       <div className="flex items-baseline gap-1 mb-8">
                           <span className="text-5xl font-bold text-white">8%</span>
                           <span className="text-lg text-blue-200">/ loyer</span>
                       </div>
                       <ul className="space-y-5 mb-10">
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={16} /></div> Gestion des réparations
                           </li>
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><ShieldCheck size={16} /></div> Assurance Loyers Impayés
                           </li>
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><Wrench size={16} /></div> Intervention Artisans 24/7
                           </li>
                           <li className="flex items-center gap-3 text-white/80 text-sm">
                               <div className="bg-white/10 p-1 rounded-full"><CheckCircle size={16} /></div> Tout le pack Essentiel
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Premium Hunter')} className="w-full py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:scale-105">
                           Déléguer mon bien
                       </button>
                   </div>

                   {/* Pack Elite */}
                   <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 hover:bg-white/10 transition relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/20 blur-2xl"></div>
                       <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
                           <Crown size={20} /> VIP Gold
                       </h3>
                       <div className="flex items-baseline gap-1 mb-6">
                           <span className="text-4xl font-bold text-white">12%</span>
                           <span className="text-sm text-slate-400">/ loyer</span>
                       </div>
                       <ul className="space-y-4 mb-8">
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-yellow-500" /> Concierge dédié WhatsApp
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <Truck size={16} className="text-yellow-500" /> Gestion Ameublement
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <Globe size={16} className="text-yellow-500" /> Représentation Syndic
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Elite Expat')} className="w-full py-3 rounded-xl border border-yellow-500/50 text-yellow-400 font-bold hover:bg-yellow-500 hover:text-slate-900 transition">
                           Devenir Membre VIP
                       </button>
                   </div>

               </div>
           </div>
       </div>

       {/* Modal Paiement */}
       {selectedPack && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
               <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up relative">
                   <button onClick={() => setSelectedPack(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition"><X size={20}/></button>
                   
                   <div className="p-8">
                       {paymentSuccess ? (
                           <div className="text-center py-8">
                               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce">
                                   <CheckCircle size={40} />
                               </div>
                               <h3 className="text-2xl font-bold text-slate-900 mb-2">Souscription Confirmée !</h3>
                               <p className="text-slate-600 mb-6">Un expert Room.ma va vous contacter pour la prise en charge de votre appartement.</p>
                               <button onClick={() => setSelectedPack(null)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Fermer</button>
                           </div>
                       ) : (
                           <>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Activer le Pack {selectedPack}</h3>
                                <p className="text-sm text-slate-500 mb-6">Frais de dossier initiaux (payables une fois)</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl flex items-center justify-between">
                                        <span className="font-bold text-blue-900">Frais d'ouverture</span>
                                        <span className="font-bold text-blue-900 text-xl">
                                            500 MAD
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Numéro de Carte</label>
                                        <div className="relative">
                                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border border-slate-300 rounded-xl pl-10 outline-none focus:ring-2 focus:ring-blue-500" />
                                            <CreditCard className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                                        <input type="text" placeholder="CVC" className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>

                                <button 
                                    onClick={handlePayment} 
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? <Loader2 size={20} className="animate-spin"/> : <Lock size={18}/>}
                                    {isProcessing ? 'Traitement...' : 'Valider et Signer'}
                                </button>
                           </>
                       )}
                   </div>
               </div>
           </div>
       )}

    </div>
  );
};

export default Concierge;
