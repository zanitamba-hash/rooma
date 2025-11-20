
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, HelpCircle, AlertTriangle, Key, CreditCard, ChevronRight, Send, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  // State pour le chat d'assistance rapide
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([
    {sender: 'bot', text: 'Bonjour ! Je suis l\'assistant virtuel Room.ma. Comment puis-je vous aider aujourd\'hui ?'}
  ]);
  const [userInput, setUserInput] = useState('');

  const handleQuickAction = (action: string) => {
      const userMsg = {sender: 'user' as const, text: action};
      setChatMessages(prev => [...prev, userMsg]);

      setTimeout(() => {
          let response = "";
          if(action.includes("Paiement")) response = "Pour les problèmes de paiement, vérifiez d'abord que votre plafond carte est suffisant. Si le problème persiste, contactez notre service financier au 05 22 00 00 01.";
          else if(action.includes("Clés")) response = "URGENT : Si le propriétaire ne vous a pas remis les clés après signature, signalez-le immédiatement. J'ai alerté notre équipe sécurité.";
          else if(action.includes("Contrat")) response = "Vous pouvez télécharger votre contrat de bail pré-rempli directement depuis la page 'Mes Contrats' après validation du dossier.";
          else response = "Un agent va prendre le relais d'ici quelques minutes. Veuillez patienter.";
          
          setChatMessages(prev => [...prev, {sender: 'bot', text: response}]);
      }, 1000);
  };

  const sendMessage = () => {
      if(!userInput.trim()) return;
      setChatMessages(prev => [...prev, {sender: 'user', text: userInput}]);
      setUserInput('');
      setTimeout(() => {
          setChatMessages(prev => [...prev, {sender: 'bot', text: "Merci pour votre message. Notre équipe support va l'analyser et revenir vers vous sous 24h."}]);
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('contact.title')}</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Phone size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t('contact.customer_service')}</h3>
                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mt-1 mb-3">
                    <Clock size={14}/> 8h - 22h
                </div>
                <p className="text-blue-600 font-bold text-xl tracking-wide" dir="ltr">+212 5 37 10 20 30</p>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition group">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition">
                  <Mail size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t('contact.email_support')}</h3>
                <p className="text-slate-500 text-sm mt-1 mb-3">24h</p>
                <a href="mailto:support@room.ma" className="text-slate-900 font-medium hover:text-blue-600 underline">support@room.ma</a>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition group">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition">
                  <MapPin size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{t('contact.headquarters')}</h3>
                <p className="text-slate-500 text-sm mt-1">Technopolis, Bâtiment B2</p>
                <p className="text-slate-900 font-bold">11100, Sala Al Jadida</p>
             </div>
          </div>

          {/* Assistance Intelligente & Formulaire */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Chatbot de Résolution */}
             <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                 <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                             <HelpCircle size={24}/>
                         </div>
                         <div>
                             <h3 className="font-bold">{t('contact.resolution_assistant')}</h3>
                             <p className="text-xs text-slate-300">{t('contact.resolution_desc')}</p>
                         </div>
                     </div>
                 </div>
                 
                 <div className="h-64 bg-slate-50 p-6 overflow-y-auto space-y-4">
                     {chatMessages.map((msg, i) => (
                         <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                             <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none rtl:rounded-tr-xl rtl:rounded-tl-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none rtl:rounded-tl-xl rtl:rounded-tr-none shadow-sm'}`}>
                                 {msg.text}
                             </div>
                         </div>
                     ))}
                 </div>

                 <div className="p-4 bg-white border-t border-slate-100">
                     <p className="text-xs font-bold text-slate-500 mb-3 uppercase">{t('contact.emergency')}</p>
                     <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
                         <button onClick={() => handleQuickAction("Problème de Paiement")} className="whitespace-nowrap px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100 hover:bg-red-100 flex items-center gap-2">
                             <AlertTriangle size={14}/> {t('contact.btn_payment_issue')}
                         </button>
                         <button onClick={() => handleQuickAction("Clés non remises")} className="whitespace-nowrap px-3 py-2 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold border border-orange-100 hover:bg-orange-100 flex items-center gap-2">
                             <Key size={14}/> {t('contact.btn_keys_issue')}
                         </button>
                         <button onClick={() => handleQuickAction("Question Contrat")} className="whitespace-nowrap px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 flex items-center gap-2">
                             <CreditCard size={14}/> {t('contact.btn_contract_issue')}
                         </button>
                     </div>
                     
                     <div className="flex gap-2">
                         <input 
                            type="text" 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder={t('contact.input_placeholder')}
                            className="flex-1 bg-slate-100 border-0 px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                         />
                         <button onClick={sendMessage} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition">
                             <Send size={18} className={language === 'ar' ? 'rotate-180' : ''}/>
                         </button>
                     </div>
                 </div>
             </div>

             {/* Formulaire Classique */}
             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t('contact.form_title')}</h2>
                <form className="space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.name_label')}</label>
                        <input type="text" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.email_label')}</label>
                        <input type="email" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.subject_label')}</label>
                      <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-600">
                        <option>Problème technique sur le site</option>
                        <option>Question sur une annonce</option>
                        <option>Signaler un abus / Arnaque</option>
                        <option>Partenariat B2B</option>
                        <option>Autre demande</option>
                      </select>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{t('contact.message_label')}</label>
                      <textarea rows={5} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                   </div>
                   <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2">
                     {t('contact.send_btn')} <ChevronRight size={20} className={language === 'ar' ? 'rotate-180' : ''}/>
                   </button>
                </form>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
