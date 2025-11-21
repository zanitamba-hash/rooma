
import React from 'react';
import { CreditCard, Wallet, Download, Clock, CheckCircle, AlertCircle, Lock, ShieldCheck, Plus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Payments: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Données simulées
  const transactions = [
    {
      id: "TRX-2024-001",
      desc: "Réservation Studio Agdal",
      amount: 7000,
      date: "12 Oct 2024",
      status: "locked", // locked, completed, refunded
      method: "Visa ending 4242"
    },
    {
      id: "TRX-2024-002",
      desc: "Frais de dossier",
      amount: 250,
      date: "12 Oct 2024",
      status: "completed",
      method: "Visa ending 4242"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-bold text-sm group">
           <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
           {t('details.back')}
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Wallet className="text-blue-600"/> {t('payments.title')}
              </h1>
              <p className="text-slate-600 mt-2">{t('payments.subtitle')}</p>
           </div>
           <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
               <ShieldCheck size={18} className="text-green-500"/>
               <span className="text-xs font-bold text-slate-700">{t('payments.secure_badge')}</span>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Balance Card */}
           <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{t('payments.balance_title')}</h2>
                 <p className="text-4xl font-bold mb-4">7,000.00 <span className="text-lg font-normal text-slate-400">MAD</span></p>
                 <div className="flex items-start gap-2 bg-white/10 p-3 rounded-lg text-xs leading-relaxed">
                     <Lock size={14} className="flex-shrink-0 mt-0.5 text-yellow-400"/>
                     <p>{t('payments.balance_desc')}</p>
                 </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-slate-900">{t('payments.method_title')}</h3>
                     <button className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Plus size={20}/></button>
                 </div>
                 <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50">
                         <div className="flex items-center gap-3">
                             <CreditCard size={24} className="text-slate-700"/>
                             <div>
                                 <p className="text-sm font-bold text-slate-900">Visa **** 4242</p>
                                 <p className="text-xs text-slate-500">Exp 12/25</p>
                             </div>
                         </div>
                         <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Défaut</span>
                     </div>
                 </div>
                 <button className="w-full mt-4 py-2 text-sm font-bold text-slate-600 border border-dashed border-slate-300 rounded-xl hover:border-blue-400 hover:text-blue-600 transition">
                     {t('payments.add_method')}
                 </button>
              </div>
           </div>

           {/* History */}
           <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                      <h2 className="font-bold text-lg text-slate-900">{t('payments.history_title')}</h2>
                  </div>
                  <div>
                      {transactions.map(trx => (
                          <div key={trx.id} className="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.status === 'locked' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                      {trx.status === 'locked' ? <Lock size={20}/> : <CheckCircle size={20}/>}
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-slate-900">{trx.desc}</h4>
                                      <p className="text-xs text-slate-500">{trx.date} • {trx.method}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                  <div className="text-right">
                                      <p className="font-bold text-slate-900">{trx.amount} MAD</p>
                                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                          trx.status === 'locked' ? 'bg-yellow-100 text-yellow-700' : 
                                          trx.status === 'completed' ? 'bg-green-100 text-green-700' : 
                                          'bg-slate-100 text-slate-600'
                                      }`}>
                                          {trx.status === 'locked' ? t('payments.status_locked') : 
                                           trx.status === 'completed' ? t('payments.status_completed') : t('payments.status_refunded')}
                                      </span>
                                  </div>
                                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Télécharger facture">
                                      <Download size={20}/>
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
