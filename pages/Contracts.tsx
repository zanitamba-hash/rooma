
import React from 'react';
import { FileText, Download, PenTool, ShieldCheck, AlertCircle, CheckCircle2, Scale, Lock, BookOpen, Stamp, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Contracts: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 font-bold text-sm group">
           <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180' : ''}`} />
           {t('details.back')}
        </button>

        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
             <Scale size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('contracts.title')}</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('contracts.subtitle')}
          </p>
        </div>

        {/* NOUVELLE SECTION IMPORTANCE */}
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{t('contracts.why_title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition">
                    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <FileText size={28} className="text-blue-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{t('contracts.reason_1_title')}</h3>
                    <p className="text-slate-600 leading-relaxed">
                        {t('contracts.reason_1_desc')}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600 hover:shadow-md transition">
                    <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <Lock size={28} className="text-green-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{t('contracts.reason_2_title')}</h3>
                    <p className="text-slate-600 leading-relaxed">
                        {t('contracts.reason_2_desc')}
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-purple-600 hover:shadow-md transition">
                    <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <BookOpen size={28} className="text-purple-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{t('contracts.reason_3_title')}</h3>
                    <p className="text-slate-600 leading-relaxed">
                        {t('contracts.reason_3_desc')}
                    </p>
                </div>
            </div>
        </div>

        {/* Steps */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
           <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center relative z-10">{t('contracts.procedure_title')}</h2>
           
           <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">1</div>
                    <h3 className="text-xl font-bold mb-2">{t('contracts.step_1')}</h3>
                    <p className="text-slate-400 text-sm">{t('contracts.step_1_desc')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">2</div>
                    <h3 className="text-xl font-bold mb-2">{t('contracts.step_2')}</h3>
                    <p className="text-slate-400 text-sm">{t('contracts.step_2_desc')}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">3</div>
                    <h3 className="text-xl font-bold mb-2">{t('contracts.step_3')}</h3>
                    <p className="text-slate-400 text-sm">{t('contracts.step_3_desc')}</p>
                </div>
           </div>
        </div>

        {/* Downloads */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('contracts.models_title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-blue-400 transition group">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"><FileText size={28}/></div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900">{t('contracts.model_furnished')}</h4>
                            <p className="text-sm text-slate-500">PDF</p>
                        </div>
                    </div>
                    <button className="p-3 bg-slate-100 rounded-lg hover:bg-blue-600 hover:text-white transition"><Download size={20}/></button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-purple-400 transition group">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition"><FileText size={28}/></div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900">{t('contracts.model_coloc')}</h4>
                            <p className="text-sm text-slate-500">PDF</p>
                        </div>
                    </div>
                    <button className="p-3 bg-slate-100 rounded-lg hover:bg-purple-600 hover:text-white transition"><Download size={20}/></button>
                </div>
            </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-orange-500"/> {t('contracts.faq_title')}</h2>
            <div className="space-y-4">
                <details className="group bg-slate-50 rounded-lg open:bg-white open:shadow-sm transition-all duration-300">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                        <span>Qui garde l'original du contrat ?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="text-slate-600 mt-0 px-4 pb-4 text-sm leading-relaxed">
                        Chaque partie (bailleur et locataire) doit conserver un original légalisé. Ne donnez jamais votre seul original pour des démarches administratives, donnez une photocopie légalisée conforme.
                    </div>
                </details>
                <details className="group bg-slate-50 rounded-lg open:bg-white open:shadow-sm transition-all duration-300">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-4">
                        <span>La caution est-elle mentionnée dans le contrat ?</span>
                        <span className="transition group-open:rotate-180">
                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div className="text-slate-600 mt-0 px-4 pb-4 text-sm leading-relaxed">
                        Oui, impérativement. Le montant de la caution et les conditions de sa restitution doivent figurer clairement à l'article "Dépôt de Garantie". Sur Room.ma, nous conseillons d'utiliser notre service de séquestre pour sécuriser ce montant.
                    </div>
                </details>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Contracts;
