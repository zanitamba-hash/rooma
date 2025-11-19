import React, { useState } from 'react';
import { Upload, Check, Shield, Sparkles, Info, AlertCircle, Bot, Send, Key, Camera, DollarSign, FileCheck, Zap, CheckSquare, PenTool } from 'lucide-react';
import { UNIVERSITIES } from '../constants';

const AddListing: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Quick Tags for AI
  const tags = ["Calme", "Ensoleillé", "Fibre Optique", "Proche Tram", "Meublé neuf", "Quartier sécurisé", "Cuisine équipée", "Idéal étudiants"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Chat IA State
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<{text: string, sender: 'user'|'ai'}[]>([
      {sender: 'ai', text: 'Bonjour ! Je suis votre assistant personnel Room.ma. Je suis là pour vous aider à louer plus vite. Une question sur le prix, le contrat ou la rédaction de l\'annonce ?'}
  ]);

  const [formData, setFormData] = useState({
    title: '',
    city: 'Rabat',
    university: UNIVERSITIES[0],
    price: '',
    type: 'Studio',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag: string) => {
    if(selectedTags.includes(tag)) {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
        setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleAiGenerate = () => {
    if(selectedTags.length === 0) {
        alert("Sélectionnez au moins un atout (tag) pour aider l'IA.");
        return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const features = selectedTags.join(", ");
      const aiText = `🌟 À LOUER : Superbe ${formData.type.toLowerCase()} à ${formData.city}, parfait pour un étudiant !\n\n📍 Localisation idéale : Situé tout près de ${formData.university}, dans un environnement ${features.toLowerCase()}.\n\n💰 Loyer : ${formData.price || '...'} MAD/mois (Charges comprises).\n\n✨ Les plus : Ce logement est ${selectedTags.includes("Meublé neuf") ? "entièrement refait à neuf" : "très confortable"} et dispose de ${selectedTags.includes("Fibre Optique") ? "la fibre optique pour vos études" : "toutes les commodités"}.\n\n🛡️ Location sécurisée via Room.ma avec contrat de bail légalisé. \n\n📅 Disponible immédiatement. Contactez-moi via la messagerie !`;
      setFormData(prev => ({ ...prev, description: aiText }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleAiChatSend = (textOverride?: string) => {
      const msgToSend = textOverride || aiChatInput;
      if(!msgToSend.trim()) return;
      
      setAiChatMessages(prev => [...prev, {sender: 'user', text: msgToSend}]);
      setAiChatInput('');
      
      // Simuler réponse IA
      setTimeout(() => {
          let response = "Je peux vous aider à optimiser votre annonce.";
          const lower = msgToSend.toLowerCase();

          if(lower.includes('prix') || lower.includes('combien')) response = `Pour un ${formData.type} à ${formData.city}, le prix moyen constaté sur notre plateforme est de ${formData.city === 'Rabat' ? '2800' : '2200'} MAD. Si votre bien est neuf, vous pouvez viser 10-15% de plus.`;
          else if(lower.includes('photo')) response = "📸 Les annonces avec au moins 5 photos (Salon, Cuisine, SDB, Chambre) sont louées 3x plus vite. Évitez les photos floues ou sombres.";
          else if(lower.includes('contrat') || lower.includes('bail')) response = "⚖️ Ne vous inquiétez pas. Room.ma génère un contrat de bail étudiant standardisé et prêt à être légalisé dès qu'un locataire réserve.";
          else if(lower.includes('garantie') || lower.includes('sécurité')) response = "🛡️ Nous vérifions l'identité de chaque étudiant. Le premier mois de loyer est séquestré chez nous jusqu'à la remise des clés.";
          
          setAiChatMessages(prev => [...prev, {sender: 'ai', text: response}]);
      }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => window.location.href = '/', 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Annonce Reçue !</h2>
        <p className="text-slate-600 mt-4">Vérification en cours par notre équipe IA. Publication sous 24h.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2"><Key className="text-blue-600"/> Espace Propriétaire</h1>
            <p className="text-slate-600 mt-2">Publiez votre bien en 2 minutes. L'IA vous assiste à chaque étape.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Form */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
                        <div>
                            <span className="font-bold flex items-center gap-2 text-lg"><Upload size={20}/> Nouvelle Annonce</span>
                            <p className="text-xs text-slate-400 mt-1">Remplissez les détails ci-dessous</p>
                        </div>
                        <span className="text-xs bg-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold shadow-md"><Shield size={12}/> Identité requise</span>
                    </div>
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Section 1: Localisation */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">1. Localisation & Type</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Ville</label>
                                    <select name="city" className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} value={formData.city}>
                                        <option value="Rabat">Rabat</option>
                                        <option value="Casablanca">Casablanca</option>
                                        <option value="Marrakech">Marrakech</option>
                                        <option value="Tanger">Tanger</option>
                                        <option value="Fès">Fès</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Université proche</label>
                                    <select name="university" className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} value={formData.university}>
                                        {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Type de bien</label>
                                    <select name="type" className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange} value={formData.type}>
                                        <option>Studio</option>
                                        <option>Colocation</option>
                                        <option>Chambre Individuelle</option>
                                        <option>Appartement Entier</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Surface (m²)</label>
                                    <input type="number" placeholder="Ex: 45" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Détails */}
                        <div className="space-y-4">
                             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">2. Détails & Prix</h3>
                             <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Titre de l'annonce</label>
                                    <input required name="title" type="text" placeholder="Ex: Studio moderne et lumineux proche fac..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Loyer Mensuel (MAD)</label>
                                    <div className="relative">
                                        <input required name="price" type="number" placeholder="2500" className="w-full p-3 border border-slate-300 rounded-lg pl-10 focus:ring-2 focus:ring-blue-500 outline-none" onChange={handleInputChange}/>
                                        <span className="absolute left-3 top-3.5 text-slate-400 text-sm">DH</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Charges (Eau/Elec)</label>
                                    <select className="w-full p-3 border border-slate-300 rounded-lg bg-white">
                                        <option>Incluses</option>
                                        <option>Non incluses</option>
                                        <option>Forfait (ex: 200dh)</option>
                                    </select>
                                </div>
                             </div>
                        </div>
                            
                        {/* Section 3: Description IA AMÉLIORÉE */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-slate-100 pb-2 mb-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">3. Description & Atouts</h3>
                            </div>
                            
                            {/* Quick Tags */}
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Sélectionnez les points forts (pour l'IA) :</label>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map(tag => (
                                        <button 
                                            key={tag} 
                                            type="button"
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${selectedTags.includes(tag) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                                        >
                                            {selectedTags.includes(tag) && <CheckSquare size={12} className="inline mr-1"/>}
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <textarea required name="description" rows={8} value={formData.description} onChange={handleInputChange} className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed" placeholder="Cliquez sur 'Générer la description' pour que l'IA rédige le texte à votre place..."></textarea>
                                <button 
                                    type="button" 
                                    onClick={handleAiGenerate} 
                                    disabled={isGenerating} 
                                    className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-sm shadow-lg flex items-center gap-2 hover:scale-105 transition"
                                >
                                    {isGenerating ? <span className="animate-spin">⚡</span> : <Sparkles size={16} />} 
                                    {isGenerating ? 'Rédaction...' : 'Générer la description'}
                                </button>
                            </div>
                        </div>
                        
                        {/* Section 4: Photos */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 mb-4">4. Médias</h3>
                            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-8 text-center hover:bg-blue-100 cursor-pointer transition group">
                                <div className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition">
                                    <Camera size={28} />
                                </div>
                                <p className="text-base font-bold text-blue-900">Ajouter des photos</p>
                                <p className="text-xs text-blue-600/70 mt-1">Glissez-déposez ou cliquez pour parcourir</p>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-4 bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-slate-800 transition shadow-xl shadow-slate-200 mt-8">
                            Publier mon annonce
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4">En publiant, vous acceptez les Conditions Générales de Room.ma pour les propriétaires.</p>
                    </form>
                </div>
            </div>
            
            {/* Right Column: AI Copilot (Sticky) */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
                
                {/* AI Chat Widget Premium */}
                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 flex flex-col h-[500px] overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                <Bot size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight">Assistant Propriétaire</h3>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <p className="text-xs text-blue-100">IA connectée • Réponse instantanée</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar">
                        {aiChatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3.5 rounded-2xl text-sm max-w-[90%] shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 py-2 bg-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => handleAiChatSend("Estimation prix")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition flex items-center gap-1">
                            <DollarSign size={12}/> Prix ?
                        </button>
                        <button onClick={() => handleAiChatSend("Conseil photos")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition flex items-center gap-1">
                            <Camera size={12}/> Photos
                        </button>
                        <button onClick={() => handleAiChatSend("Infos contrat")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition flex items-center gap-1">
                            <FileCheck size={12}/> Contrat
                        </button>
                    </div>

                    <div className="p-3 border-t border-slate-200 bg-white">
                        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/50 transition">
                            <input 
                                type="text" 
                                value={aiChatInput}
                                onChange={(e) => setAiChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAiChatSend()}
                                placeholder="Posez votre question..." 
                                className="flex-1 bg-transparent border-0 px-3 py-2 text-sm outline-none text-slate-800 placeholder:text-slate-400"
                            />
                            <button onClick={() => handleAiChatSend()} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"><Send size={16}/></button>
                        </div>
                    </div>
                </div>

                {/* Tips Cards */}
                <div className="bg-indigo-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                     <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-700 rounded-full opacity-50 blur-2xl"></div>
                     <h3 className="font-bold mb-4 flex items-center gap-2 relative z-10"><Zap className="text-yellow-400" size={18}/> Boostez votre annonce</h3>
                     <ul className="space-y-4 relative z-10 text-sm">
                         <li className="flex gap-3 bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
                             <PenTool className="text-indigo-300 flex-shrink-0 mt-0.5" size={18}/>
                             <div>
                                 <span className="font-bold block text-indigo-100">Utilisez les tags IA</span>
                                 <span className="text-indigo-300 text-xs">Cliquez sur les mots-clés pour une description parfaite.</span>
                             </div>
                         </li>
                         <li className="flex gap-3 bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
                             <Check className="text-green-400 flex-shrink-0 mt-0.5" size={18}/>
                             <div>
                                 <span className="font-bold block text-indigo-100">Description Complète</span>
                                 <span className="text-indigo-300 text-xs">Mentionnez le Wifi, l'eau chaude et la distance de la fac.</span>
                             </div>
                         </li>
                     </ul>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;