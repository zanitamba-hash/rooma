
import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, ShieldCheck, FileText, CreditCard, Home, Settings, LogOut, AlertTriangle, CheckCircle, Search, Activity, TrendingUp, Users, ArrowRight, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Profile: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeRole, setActiveRole] = useState<'tenant' | 'owner'>('tenant');
  
  // State pour la vérification locataire
  const [checkEmail, setCheckEmail] = useState('');
  const [checkResult, setCheckResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  // State pour les demandes de location (Propriétaire)
  const [rentalApplications, setRentalApplications] = useState([
    {
      id: 1,
      studentName: "Amine Tazi",
      studentAge: 22,
      university: "Université Mohammed V",
      status: "pending", // pending, accepted, rejected
      listingTitle: "Studio Agdal",
      message: "Bonjour, je suis étudiant en Master 1, mes parents sont garants. Dossier complet disponible.",
      avatarColor: "bg-blue-500",
      reliabilityScore: 92
    },
    {
      id: 2,
      studentName: "Sarah Miller",
      studentAge: 20,
      university: "UIR Rabat",
      status: "pending",
      listingTitle: "Studio Agdal",
      message: "Hello! I am looking for a 6 months rental. Very clean and quiet person.",
      avatarColor: "bg-purple-500",
      reliabilityScore: 88
    }
  ]);

  const handleCheckTenant = (e: React.FormEvent) => {
      e.preventDefault();
      if(!checkEmail) return;
      setIsChecking(true);
      
      // Simulation API
      setTimeout(() => {
          setCheckResult({
              score: 95,
              status: 'Excellent',
              paymentHistory: '100% à l\'heure',
              guarantor: 'Validé (CDI)',
              verifiedIdentity: true,
              previousReviews: 4.8
          });
          setIsChecking(false);
      }, 1500);
  };

  const handleApplicationStatus = (id: number, status: 'accepted' | 'rejected') => {
      setRentalApplications(prev => prev.map(app => app.id === id ? { ...app, status: status } : app));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-slate-900"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-end md:items-center gap-6 mt-8">
            <div className="w-32 h-32 bg-white p-1 rounded-full shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                JD
              </div>
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold text-slate-900">John Doe</h1>
              <p className="text-slate-500 flex items-center gap-2"><MapPin size={16}/> Rabat, Maroc</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-lg self-start md:self-center">
              <button 
                onClick={() => setActiveRole('tenant')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeRole === 'tenant' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t('profile.tenant_space')}
              </button>
              <button 
                onClick={() => setActiveRole('owner')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeRole === 'owner' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {t('profile.owner_space')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar: Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><User size={18}/> {t('profile.personal_info')}</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} className="text-slate-400"/> john.doe@example.com
                </li>
                <li className="flex items-center gap-3 text-slate-600" dir="ltr">
                  <Phone size={16} className="text-slate-400"/> +212 6 00 11 22 33
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <ShieldCheck size={16} className="text-green-500"/> {t('profile.verified_id')}
                </li>
              </ul>
              <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition flex items-center justify-center gap-2">
                <Settings size={16}/> {t('profile.edit_profile')}
              </button>
            </div>
            
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
               <button className="w-full py-2 text-red-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-100 rounded-lg transition">
                 <LogOut size={16}/> {t('profile.logout')}
               </button>
            </div>
          </div>

          {/* Right Content: Conditional */}
          <div className="lg:col-span-2">
            {activeRole === 'tenant' ? (
              <div className="space-y-6">
                 {/* Tenant View */}
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><FileText className="text-blue-600"/> {t('profile.my_docs')}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                       <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-3">
                          <div className="bg-white p-2 rounded-lg shadow-sm"><CreditCard size={20} className="text-slate-700"/></div>
                          <div>
                             <h4 className="font-bold text-sm">{t('profile.id_card')}</h4>
                             <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1"><CheckCircle size={12}/> {t('profile.validated')}</p>
                          </div>
                       </div>
                       <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex items-start gap-3">
                          <div className="bg-white p-2 rounded-lg shadow-sm"><FileText size={20} className="text-slate-700"/></div>
                          <div>
                             <h4 className="font-bold text-sm">{t('profile.student_card')}</h4>
                             <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1"><CheckCircle size={12}/> {t('profile.validated')} (2024/2025)</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">{t('profile.history')}</h2>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                          <div className="flex items-center gap-4">
                             <img src="https://picsum.photos/800/600?random=1" className="w-12 h-12 rounded-lg object-cover" alt="Studio"/>
                             <div>
                                <h4 className="font-bold text-sm">Studio Agdal</h4>
                                <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">{t('profile.pending')}</span>
                             </div>
                          </div>
                          <span className="text-sm font-bold text-slate-900">3500 DH</span>
                       </div>
                       <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                          <div className="flex items-center gap-4">
                             <img src="https://picsum.photos/800/600?random=2" className="w-12 h-12 rounded-lg object-cover" alt="Chambre"/>
                             <div>
                                <h4 className="font-bold text-sm">Colocation Maarif</h4>
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">{t('profile.rejected')}</span>
                             </div>
                          </div>
                          <span className="text-sm font-bold text-slate-900">2200 DH</span>
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="space-y-6">
                 {/* Owner View - Dashboard */}
                 <div className="grid grid-cols-2 gap-4">
                     <div className="bg-blue-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="font-bold">{t('profile.revenue')}</h3>
                           <span className="text-blue-200 text-xs uppercase tracking-wider">Jan 2024</span>
                        </div>
                        <p className="text-3xl font-bold">0.00 MAD</p>
                     </div>
                     <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                           <h3 className="font-bold text-slate-900">{t('profile.occupancy')}</h3>
                           <Activity size={16} className="text-slate-400"/>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">0%</p>
                     </div>
                 </div>

                 {/* APPLICATIONS / DEMANDES DE LOCATION */}
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Users className="text-blue-600"/> {t('profile.requests')}</h2>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">2</span>
                     </div>

                     <div className="space-y-4">
                         {rentalApplications.map(app => (
                             <div key={app.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50 hover:shadow-md transition">
                                 <div className="flex justify-between items-start mb-4">
                                     <div className="flex gap-4">
                                         <div className={`w-12 h-12 ${app.avatarColor} rounded-full flex items-center justify-center text-white font-bold`}>
                                             {app.studentName.charAt(0)}
                                         </div>
                                         <div>
                                             <h3 className="font-bold text-slate-900 text-lg">{app.studentName} <span className="text-sm font-normal text-slate-500">({app.studentAge})</span></h3>
                                             <p className="text-sm text-blue-600 font-medium">{app.university}</p>
                                             <p className="text-xs text-slate-500 mt-1">Pour : <span className="font-semibold">{app.listingTitle}</span></p>
                                         </div>
                                     </div>
                                     <div className="text-end">
                                         <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                                             <ShieldCheck size={12}/> {t('profile.reliability')} : {app.reliabilityScore}%
                                         </div>
                                     </div>
                                 </div>
                                 
                                 <p className="text-slate-600 text-sm bg-white p-3 rounded-lg border border-slate-200 mb-4 italic">
                                     "{app.message}"
                                 </p>

                                 {app.status === 'pending' ? (
                                     <div className="flex gap-3">
                                         <button onClick={() => handleApplicationStatus(app.id, 'accepted')} className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition flex items-center justify-center gap-2">
                                             <Check size={16}/> {t('profile.accept')}
                                         </button>
                                         <button onClick={() => handleApplicationStatus(app.id, 'rejected')} className="flex-1 bg-white text-red-600 border border-red-200 py-2 rounded-lg font-bold text-sm hover:bg-red-50 transition flex items-center justify-center gap-2">
                                             <X size={16}/> {t('profile.refuse')}
                                         </button>
                                         <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100">
                                             Chat
                                         </button>
                                     </div>
                                 ) : app.status === 'accepted' ? (
                                     <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center font-bold text-sm flex items-center justify-center gap-2">
                                         <CheckCircle size={16}/> Dossier Accepté
                                     </div>
                                 ) : (
                                     <div className="bg-red-50 text-red-700 p-3 rounded-lg text-center font-bold text-sm">
                                         Dossier Refusé
                                     </div>
                                 )}
                             </div>
                         ))}
                     </div>
                 </div>

                 {/* NEW: Tenant Verification Tool */}
                 <div className="bg-indigo-900 rounded-xl shadow-lg p-6 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><ShieldCheck className="text-green-400"/> {t('profile.smart_check')}</h2>
                        <p className="text-indigo-200 text-sm mb-6">{t('profile.smart_check_desc')}</p>
                        
                        <form onSubmit={handleCheckTenant} className="flex gap-2 mb-6">
                            <input 
                                type="email" 
                                placeholder="Email..." 
                                value={checkEmail}
                                onChange={(e) => setCheckEmail(e.target.value)}
                                className="flex-1 bg-indigo-800/50 border border-indigo-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-indigo-400 outline-none focus:ring-2 focus:ring-green-400"
                            />
                            <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center gap-2">
                                {isChecking ? '...' : <Search size={18}/>}
                                {t('profile.check_btn')}
                            </button>
                        </form>

                        {checkResult && (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 animate-fade-in">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-xl font-bold shadow-lg">
                                            {checkResult.score}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Score</p>
                                            <p className="text-xs text-green-300 font-medium uppercase tracking-wider">{checkResult.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                         <div className="flex items-center gap-1 text-yellow-400 font-bold"><ShieldCheck size={14}/> Certifié</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                    <div className="bg-indigo-950/50 p-2 rounded-lg">
                                        <p className="text-indigo-300 text-xs mb-1">Paiements</p>
                                        <p className="font-bold">{checkResult.paymentHistory}</p>
                                    </div>
                                    <div className="bg-indigo-950/50 p-2 rounded-lg">
                                        <p className="text-indigo-300 text-xs mb-1">Garant</p>
                                        <p className="font-bold">{checkResult.guarantor}</p>
                                    </div>
                                    <div className="bg-indigo-950/50 p-2 rounded-lg">
                                        <p className="text-indigo-300 text-xs mb-1">Avis</p>
                                        <p className="font-bold flex items-center justify-center gap-1">4.8 <Users size={12}/></p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                 </div>

                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Home className="text-blue-600"/> {t('profile.my_listings')}</h2>
                       <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition font-bold">
                         {t('profile.create_btn')}
                       </button>
                    </div>
                    
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                       <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                          <Home size={24}/>
                       </div>
                       <p className="text-slate-500 font-medium">{t('profile.no_listings')}</p>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
