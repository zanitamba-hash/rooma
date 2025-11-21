
import React, { useState } from 'react';
import { Crown, CheckCircle, ShieldCheck, Star, Globe, Phone, Video, Truck, Clock, Zap, CreditCard, X, Loader2, Search, Lock, ArrowLeft } from 'lucide-react';
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
          
          <button onClick={() => navigate(-1)} className="absolute top-24 left-4 md:left-8 z-20 text-white/80 hover:text-white flex items-center gap-2 font-bold transition hover:-translate-x-1">
             <ArrowLeft size={20} className={language === 'ar' ? 'rotate-180' : ''} /> {t('details.back')}
          </button>

          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
                <Crown size={14} /> {t('concierge.hero_badge')}
             </div>
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                 {t('concierge.hero_title')}
             </h1>
             <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                 {t('concierge.hero_subtitle')}
             </p>
          </div>
       </div>

       {/* Benefits Section */}
       <div className="max-w-7xl mx-auto px-4 py-20">
           <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900">{t('concierge.why_us')}</h2>
           </div>
           
           <div className="grid md:grid-cols-3 gap-10">
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition duration-300">
                   <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                       <Search size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4 text-slate-900">{t('concierge.why_1_title')}</h3>
                   <p className="text-slate-600 leading-relaxed">
                       {t('concierge.why_1_desc')}
                   </p>
               </div>
               
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition duration-300">
                   <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                       <Zap size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4 text-slate-900">{t('concierge.why_2_title')}</h3>
                   <p className="text-slate-600 leading-relaxed">
                       {t('concierge.why_2_desc')}
                   </p>
               </div>
               
               <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-2 transition duration-300">
                   <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-6 group-hover:bg-yellow-500 group-hover:text-white transition">
                       <ShieldCheck size={32} />
                   </div>
                   <h3 className="text-xl font-bold mb-4 text-slate-900">{t('concierge.why_3_title')}</h3>
                   <p className="text-slate-600 leading-relaxed">
                       {t('concierge.why_3_desc')}
                   </p>
               </div>
           </div>
       </div>

       {/* Pricing Table */}
       <div className="bg-slate-900 py-20 text-white relative">
           {/* Decoration */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[100px]"></div>
           </div>

           <div className="max-w-7xl mx-auto px-4 relative z-10">
               <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('concierge.pricing_title')}</h2>

               <div className="grid lg:grid-cols-3 gap-8 items-center">
                   
                   {/* Pack Basic */}
                   <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">
                       <h3 className="text-xl font-bold text-slate-300 mb-2">{t('concierge.pack_1_title')}</h3>
                       <div className="flex items-baseline gap-1 mb-6">
                           <span className="text-4xl font-bold text-white">{t('concierge.pack_1_price')}</span>
                           <span className="text-sm text-slate-400">DH</span>
                       </div>
                       <ul className="space-y-4 mb-8">
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> {t('concierge.pack_1_feat1')}
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> {t('concierge.pack_1_feat2')}
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-blue-400" /> {t('concierge.pack_1_feat3')}
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Essential')} className="w-full py-3 rounded-xl border border-white/20 font-bold hover:bg-white hover:text-slate-900 transition">
                           {t('concierge.cta')}
                       </button>
                   </div>

                   {/* Pack Premium (Highlighted) */}
                   <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl p-10 shadow-2xl transform scale-105 relative border border-blue-400">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                           Best Seller
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">{t('concierge.pack_2_title')}</h3>
                       <div className="flex items-baseline gap-1 mb-8">
                           <span className="text-5xl font-bold text-white">{t('concierge.pack_2_price')}</span>
                           <span className="text-lg text-blue-200">DH</span>
                       </div>
                       <ul className="space-y-5 mb-10">
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><CheckCircle size={16} /></div> {t('concierge.pack_2_feat1')}
                           </li>
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><Video size={16} /></div> {t('concierge.pack_2_feat2')}
                           </li>
                           <li className="flex items-center gap-3 text-white font-medium">
                               <div className="bg-white/20 p-1 rounded-full"><Star size={16} /></div> {t('concierge.pack_2_feat3')}
                           </li>
                           <li className="flex items-center gap-3 text-white/80 text-sm">
                               <div className="bg-white/10 p-1 rounded-full"><CheckCircle size={16} /></div> {t('concierge.pack_1_feat1')}
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Premium Hunter')} className="w-full py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition transform hover:scale-105">
                           {t('concierge.cta')}
                       </button>
                   </div>

                   {/* Pack Elite */}
                   <div className="bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-3xl p-8 hover:bg-white/10 transition relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/20 blur-2xl"></div>
                       <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
                           <Crown size={20} /> {t('concierge.pack_3_title')}
                       </h3>
                       <div className="flex items-baseline gap-1 mb-6">
                           <span className="text-4xl font-bold text-white">{t('concierge.pack_3_price')}</span>
                           <span className="text-sm text-slate-400">DH</span>
                       </div>
                       <ul className="space-y-4 mb-8">
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <CheckCircle size={16} className="text-yellow-500" /> {t('concierge.pack_3_feat1')}
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <Truck size={16} className="text-yellow-500" /> {t('concierge.pack_3_feat2')}
                           </li>
                           <li className="flex items-center gap-3 text-sm text-slate-300">
                               <Globe size={16} className="text-yellow-500" /> {t('concierge.pack_3_feat3')}
                           </li>
                       </ul>
                       <button onClick={() => handleSubscribe('Elite Expat')} className="w-full py-3 rounded-xl border border-yellow-500/50 text-yellow-400 font-bold hover:bg-yellow-500 hover:text-slate-900 transition">
                           {t('concierge.cta')}
                       </button>
                   </div>

               </div>
           </div>
       </div>

       {/* FAQ / Trust Section */}
       <div className="max-w-4xl mx-auto py-20 px-4 text-center">
           <h2 className="text-2xl font-bold text-slate-900 mb-8">Questions Fréquentes</h2>
           <div className="space-y-4 text-left">
               <details className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer group">
                   <summary className="font-bold text-slate-900 list-none flex justify-between items-center">
                       Que se passe-t-il si je ne trouve pas de logement ?
                       <span className="group-open:rotate-180 transition">▼</span>
                   </summary>
                   <p className="text-slate-600 mt-2 text-sm">
                       Avec le pack Premium et Elite, nous nous engageons à trouver un logement sous 15 jours. Si nous échouons, vous êtes remboursé à 100%.
                   </p>
               </details>
               <details className="bg-white rounded-xl border border-slate-200 p-4 cursor-pointer group">
                   <summary className="font-bold text-slate-900 list-none flex justify-between items-center">
                       Puis-je payer en plusieurs fois ?
                       <span className="group-open:rotate-180 transition">▼</span>
                   </summary>
                   <p className="text-slate-600 mt-2 text-sm">
                       Oui, le paiement en 3x sans frais est disponible pour le Pack Elite via carte bancaire marocaine.
                   </p>
               </details>
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
                               <h3 className="text-2xl font-bold text-slate-900 mb-2">Paiement Confirmé !</h3>
                               <p className="text-slate-600 mb-6">Bienvenue au club VIP. Un concierge va vous contacter sur WhatsApp dans les 5 minutes.</p>
                               <button onClick={() => setSelectedPack(null)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl">Fermer</button>
                           </div>
                       ) : (
                           <>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Souscrire au Pack {selectedPack}</h3>
                                <p className="text-sm text-slate-500 mb-6">Paiement sécurisé via CMI. Aucun frais caché.</p>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl flex items-center justify-between">
                                        <span className="font-bold text-blue-900">Total à payer</span>
                                        <span className="font-bold text-blue-900 text-xl">
                                            {selectedPack === 'Essential' ? '499' : selectedPack === 'Premium Hunter' ? '1,499' : '2,999'} MAD
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
                                    {isProcessing ? 'Traitement...' : 'Payer et Activer'}
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
