import React from 'react';
import { FileText, Download, PenTool, ShieldCheck, AlertCircle, CheckCircle2, Scale, Lock, BookOpen, Stamp } from 'lucide-react';

const Contracts: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
             <Scale size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contrat de Bail & Légalisation</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Le contrat de bail n'est pas une option, c'est votre protection juridique absolue au Maroc. Room.ma vous guide pour le signer et le légaliser en toute conformité.
          </p>
        </div>

        {/* NOUVELLE SECTION IMPORTANCE */}
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Pourquoi le contrat est-il <span className="text-red-600">indispensable</span> ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-600 hover:shadow-md transition">
                    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <FileText size={28} className="text-blue-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">1. Carte de Séjour</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Pour les étudiants étrangers, le contrat de bail légalisé est <strong>obligatoire</strong> pour obtenir votre Certificat de Résidence, document clé pour votre demande ou renouvellement de Carte de Séjour au Maroc.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-green-600 hover:shadow-md transition">
                    <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <Lock size={28} className="text-green-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">2. Protection Caution</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Sans contrat écrit mentionnant le montant de la caution, vous n'avez aucune preuve légale pour réclamer votre argent à la fin du séjour. Le contrat Room.ma sécurise votre dépôt.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-purple-600 hover:shadow-md transition">
                    <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                        <BookOpen size={28} className="text-purple-600"/>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">3. Loi 67-12</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Au Maroc, la loi 67-12 régit les rapports locatifs. Un contrat conforme vous protège contre les augmentations de loyer abusives et les expulsions sans préavis.
                    </p>
                </div>
            </div>
        </div>

        {/* Steps */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
           <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center relative z-10">La Procédure de Légalisation</h2>
           
           <div className="grid md:grid-cols-3 gap-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">1</div>
                    <h3 className="text-xl font-bold mb-2">Télécharger & Imprimer</h3>
                    <p className="text-slate-400 text-sm">Générez le contrat pré-rempli sur Room.ma et imprimez-le en 3 exemplaires.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">2</div>
                    <h3 className="text-xl font-bold mb-2">Signer à la Mouqata'a</h3>
                    <p className="text-slate-400 text-sm">Le propriétaire et l'étudiant doivent se rendre ensemble à l'annexe administrative pour signer devant l'officier.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700 mb-6 font-bold text-2xl shadow-lg shadow-blue-900/20">3</div>
                    <h3 className="text-xl font-bold mb-2">Timbre & Enregistrement</h3>
                    <p className="text-slate-400 text-sm">Payez les frais de timbre (approx. 20 DH) pour officialiser la "Légalisation de signature".</p>
                </div>
           </div>
        </div>

        {/* Downloads */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Modèles de Contrats Certifiés</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-blue-400 transition group">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition"><FileText size={28}/></div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900">Contrat Meublé (Standard)</h4>
                            <p className="text-sm text-slate-500">Idéal pour studio ou appartement équipé.</p>
                        </div>
                    </div>
                    <button className="p-3 bg-slate-100 rounded-lg hover:bg-blue-600 hover:text-white transition"><Download size={20}/></button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between hover:border-purple-400 transition group">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-50 p-3 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition"><FileText size={28}/></div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900">Contrat Colocation</h4>
                            <p className="text-sm text-slate-500">Avec clause de solidarité expliquée.</p>
                        </div>
                    </div>
                    <button className="p-3 bg-slate-100 rounded-lg hover:bg-purple-600 hover:text-white transition"><Download size={20}/></button>
                </div>
            </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertCircle className="text-orange-500"/> Questions Fréquentes</h2>
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