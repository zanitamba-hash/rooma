
import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Send, Paperclip, Phone, AlertTriangle, Shield, Bot, User, Headphones, CheckCircle2, Video, Mic, MicOff, VideoOff, PhoneOff } from 'lucide-react';
import { ChatMessage, Conversation } from '../types';
import { useLocation } from 'react-router-dom';

const Messages: React.FC = () => {
  const location = useLocation();
  
  // UI States
  const [showReportModal, setShowReportModal] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'calling' | 'connected'>('calling');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);

  const [isTyping, setIsTyping] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  // Conversation Data
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'support', name: 'Support & Sécurité', type: 'support', lastMessage: 'Bienvenue au centre d\'aide.', unread: 0, isOnline: true },
    { id: 'ai', name: 'Assistant Room.ma', type: 'ai', lastMessage: 'Prêt à chercher votre logement ?', unread: 0, isOnline: true },
    { id: 'owner1', name: 'Karim B. (Propriétaire)', type: 'owner', lastMessage: 'D\'accord pour la visite demain à 14h.', unread: 2, isOnline: false },
    { id: 'owner2', name: 'Meryem L. (Coloc)', type: 'owner', lastMessage: 'Le loyer inclut le wifi ?', unread: 0, isOnline: true },
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>('ai');
  const [aiStep, setAiStep] = useState<number>(0);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'ai': [
       { id: '1', sender: 'other', text: 'Bonjour ! 🏠 Je suis l\'intelligence artificielle de Room.ma.\n\nJe suis là pour filtrer les milliers d\'offres pour vous. Cliquez sur une option ci-dessous pour commencer ! 👇', timestamp: new Date() }
    ],
    'support': [
       { id: '1', sender: 'other', text: '👋 Bonjour. Je suis l\'agent de liaison du Support Room.ma.\n\nNous intervenons pour :\n1️⃣ Les litiges de paiement\n2️⃣ La validation des contrats\n3️⃣ Les signalements de sécurité.\n\nSélectionnez une action rapide ci-dessous ou décrivez votre problème.', timestamp: new Date(Date.now() - 86400000) }
    ],
    'owner1': [
       { id: '1', sender: 'user', text: 'Bonjour, le studio est-il toujours disponible ?', timestamp: new Date(Date.now() - 10000000) },
       { id: '2', sender: 'other', text: 'Oui tout à fait. Vous êtes étudiant ?', timestamp: new Date(Date.now() - 9000000) },
       { id: '4', sender: 'other', text: 'D\'accord pour la visite demain à 14h.', timestamp: new Date() }
    ],
    'owner2': []
  });
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // GESTION DE L'ARRIVÉE DEPUIS UNE ANNONCE (QUICK CONTACT)
  useEffect(() => {
    if (location.state) {
      const { contactId, contactName, initialMessage } = location.state as any;

      if (contactId && contactName) {
        // 1. Vérifier si la conversation existe déjà
        const existingConv = conversations.find(c => c.id === contactId);

        if (!existingConv) {
          // 2. Créer une nouvelle conversation temporaire
          const newConv: Conversation = {
            id: contactId,
            name: contactName + ' (Propriétaire)',
            type: 'owner',
            lastMessage: 'Nouvelle demande',
            unread: 0,
            isOnline: true // On assume qu'ils sont réactifs pour l'UX
          };
          setConversations(prev => [newConv, ...prev]);
          // Initialiser le tableau de messages pour ce nouvel ID si besoin
          setMessages(prev => ({ ...prev, [contactId]: [] }));
        }

        // 3. Activer la conversation
        setActiveConversationId(contactId);

        // 4. Pré-remplir le message
        if (initialMessage) {
          setInput(initialMessage);
        }
        
        // Nettoyer le state pour éviter que ça se relance au refresh (optionnel mais propre)
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, conversations]);


  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = messages[activeConversationId] || [];

  const getQuickReplies = (type: string | undefined, step: number = 0) => {
    if (!type) return [];
    switch (type) {
        case 'ai':
            if (step === 0) return ["Chercher un logement 🏠", "Comment ça marche ?"];
            if (step === 1) return ["Rabat", "Casablanca", "Marrakech", "Tanger"];
            if (step === 2) return ["1500 DH", "2500 DH", "4000 DH", "Budget illimité"];
            if (step === 3) return ["Studio seul", "Colocation", "Chambre chez l'habitant", "Wifi & Meublé"];
            return ["Voir les annonces", "Nouvelle recherche"];
        case 'support':
            return ["⚠️ Signaler un abus", "⚖️ Litige / Paiement", "📄 Vérification Contrat", "📞 Parler à un humain"];
        case 'owner':
            return ["Est-ce disponible ?", "Organiser une visite", "Photos supplémentaires ?", "Appel Vidéo ?"];
        default:
            return [];
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages, activeConversationId, isTyping]);

  const handleSendMessage = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] || []), userMsg]
    }));
    setInput('');
    setIsTyping(true);

    if (activeConversation?.type === 'ai') {
        handleAIResponse(textToSend);
    } else if (activeConversation?.type === 'support') {
        handleSupportResponse(textToSend);
    } else {
        setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleSupportResponse = (userInput: string) => {
    setTimeout(() => {
        let response = "J'ai bien reçu votre demande. Un ticket a été ouvert (Ref: #GEN-2024).";
        const lower = userInput.toLowerCase();
        let triggerAction = null;

        if (lower.includes('humain') || lower.includes('parler') || lower.includes('téléphone')) {
            response = "📞 Une demande de rappel a été transmise. Un agent vous contactera dans environ 15 minutes.";
        } 
        else if (lower.includes('arnaque') || lower.includes('signaler') || lower.includes('abus')) {
            response = "🚨 Sécurité Prioritaire : Je vais ouvrir le formulaire de signalement.";
            triggerAction = () => setShowReportModal(true);
        } 

        const supportMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'other',
            text: response,
            timestamp: new Date()
        };
        
        setMessages(prev => ({ ...prev, ['support']: [...prev['support'], supportMsg] }));
        setIsTyping(false);
        
        if (triggerAction) {
            setTimeout(triggerAction, 1500);
        }
    }, 2000);
  };

  const handleAIResponse = (userInput: string) => {
    setTimeout(() => {
        let aiResponseText = "";
        let nextStep = aiStep;
        const lowerInput = userInput.toLowerCase();

        if (aiStep === 0 && (lowerInput.includes('chercher') || lowerInput.includes('logement'))) {
            aiResponseText = "Super ! Commençons. Dans quelle ville cherchez-vous ? (ex: Rabat, Casa...)";
            nextStep = 1;
        } else if (aiStep === 1) {
            aiResponseText = `C'est noté pour ${userInput}. 🏙️\nQuel est votre budget mensuel maximum en Dirhams ?`;
            nextStep = 2;
        } else if (aiStep === 2) {
            aiResponseText = "Budget enregistré. 💰\n\nAvez-vous une préférence pour le type de logement (Studio, Colocation...) ou des commodités spécifiques (Wifi, Balcon, Meublé) ?";
            nextStep = 3;
        } else if (aiStep === 3) {
             aiResponseText = "Parfait, je lance la recherche avec ces critères précis... 🔍\n\nVoici 3 pépites pour vous :\n1. 🏠 Studio Agdal (Wifi inclus) - 2800 MAD\n2. 🏠 Colocation Hay Riad (Moderne) - 2000 MAD\n3. 🏠 Résidence Centre Ville - 2500 MAD";
             nextStep = 4;
        } else {
            if(nextStep === 4) {
                aiResponseText = "Souhaitez-vous affiner la recherche ou contacter un propriétaire ?";
            } else {
                aiResponseText = "Je suis là pour vous aider. Cliquez sur 'Chercher un logement' pour débuter ! 👇";
                nextStep = 0;
            }
        }

        const aiMsg: ChatMessage = { 
            id: Date.now().toString(), 
            sender: 'other', 
            text: aiResponseText, 
            timestamp: new Date() 
        };

        setMessages(prev => ({ ...prev, ['ai']: [...prev['ai'], aiMsg] }));
        setAiStep(nextStep);
        setIsTyping(false);
    }, 1500);
  };

  const submitReport = () => {
    if(!reportReason) return alert("Merci de sélectionner un motif.");
    const systemMsg: ChatMessage = { 
        id: Date.now().toString(), 
        sender: 'other', 
        text: `🔒 SIGNALEMENT REÇU\nMotif : ${reportReason}\nNous analysons la situation.`, 
        timestamp: new Date(), 
        isSystem: true 
    };
    setMessages(prev => ({ ...prev, [activeConversationId]: [...(prev[activeConversationId] || []), systemMsg] }));
    setShowReportModal(false);
  };

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    setCallStatus('calling');
    setTimeout(() => setCallStatus('connected'), 3000);
  };

  return (
    <div className="h-full flex bg-gray-100 font-sans relative">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col z-20 h-full">
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Messagerie</h1>
          <div className="relative">
            <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="px-4 py-4 space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase px-2">Assistance</p>
            {conversations.filter(c => c.type !== 'owner').map(conv => (
                 <div key={conv.id} onClick={() => setActiveConversationId(conv.id)}
                    className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 border ${activeConversationId === conv.id ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50'}`}>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        {conv.type === 'ai' ? <Bot size={20}/> : <Headphones size={20}/>}
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">{conv.name}</h3>
                        <p className="text-xs opacity-80">En ligne</p>
                    </div>
                 </div>
            ))}
            <p className="text-xs font-bold text-slate-400 uppercase px-2 mt-4">Discussions</p>
            {conversations.filter(c => c.type === 'owner').map(conv => (
                <div key={conv.id} onClick={() => setActiveConversationId(conv.id)}
                className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer border ${activeConversationId === conv.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50 border-transparent'}`}>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold">{conv.name.charAt(0)}</div>
                    {conv.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{conv.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="hidden md:flex flex-1 flex-col bg-[#f8f9fa] relative h-full">
        <div className="bg-white h-16 px-6 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
             <h2 className="font-bold text-slate-900 flex items-center gap-2">
                {activeConversation?.name}
                {activeConversation?.type === 'support' && <CheckCircle2 size={16} className="text-blue-600" />}
             </h2>
          </div>
          <div className="flex items-center gap-2">
             {activeConversation?.type === 'owner' && (
                <button onClick={startVideoCall} className="p-2 hover:bg-blue-50 text-blue-600 rounded-full transition" title="Appel Vidéo">
                    <Video size={20} />
                </button>
             )}
             <button onClick={() => setShowReportModal(true)} className="p-2 text-red-500 hover:bg-red-50 rounded-full" title="Signaler">
                <AlertTriangle size={20} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
           {activeMessages.map((msg) => (
             msg.isSystem ? (
                <div key={msg.id} className="flex justify-center"><span className="bg-slate-200 text-slate-600 text-xs px-3 py-1 rounded-full">{msg.text}</span></div>
             ) : (
                <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-5 py-3 max-w-[70%] rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'}`}>
                        {msg.text}
                    </div>
                </div>
             )
           ))}
           {isTyping && <div className="text-xs text-slate-400 ml-4 animate-pulse">En train d'écrire...</div>}
           <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-slate-200 p-4">
           <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
              {getQuickReplies(activeConversation?.type, activeConversation?.type === 'ai' ? aiStep : 0).map((reply, i) => (
                  <button key={i} onClick={() => handleSendMessage(reply)} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full hover:bg-slate-200 whitespace-nowrap transition">
                    {reply}
                  </button>
              ))}
           </div>
           <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button onClick={() => handleSendMessage()} className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"><Send size={18} /></button>
           </div>
        </div>
      </div>

      {/* MODAL SIGNALEMENT */}
      {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500"/> Signaler un abus</h3>
                  <div className="space-y-3 mb-6">
                    {['Arnaque', 'Harcèlement', 'Autre'].map(r => (
                        <button key={r} onClick={() => setReportReason(r)} className={`w-full p-3 text-left rounded-lg border ${reportReason === r ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}>{r}</button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => setShowReportModal(false)} className="flex-1 py-2 text-slate-600">Annuler</button>
                      <button onClick={submitReport} className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold">Envoyer</button>
                  </div>
              </div>
          </div>
      )}

      {/* APPEL VIDEO OVERLAY */}
      {isVideoCallActive && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926')] bg-cover opacity-30 blur-sm"></div>
          <div className="relative z-10 flex flex-col items-center w-full h-full p-6">
            {callStatus === 'calling' ? (
               <div className="flex flex-col items-center justify-center flex-1">
                  <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-slate-700 mb-6 animate-pulse">
                      <User size={64} className="text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{activeConversation?.name}</h3>
                  <p className="text-slate-400">Appel en cours...</p>
               </div>
            ) : (
               <div className="w-full max-w-4xl flex-1 relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mb-8">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Remote" />
                  {isCamOn && (
                    <div className="absolute bottom-4 right-4 w-32 h-48 bg-slate-800 rounded-lg overflow-hidden border-2 border-white/20">
                       <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                    </div>
                  )}
               </div>
            )}

            <div className="flex items-center gap-6 mt-auto pb-8">
                <button onClick={() => setIsMicOn(!isMicOn)} className={`p-4 rounded-full ${isMicOn ? 'bg-slate-800' : 'bg-white text-slate-900'}`}>
                    {isMicOn ? <Mic size={24}/> : <MicOff size={24}/>}
                </button>
                <button onClick={() => {setIsVideoCallActive(false); setCallStatus('calling');}} className="p-6 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transform hover:scale-110 transition">
                    <PhoneOff size={32} fill="currentColor" />
                </button>
                <button onClick={() => setIsCamOn(!isCamOn)} className={`p-4 rounded-full ${isCamOn ? 'bg-slate-800' : 'bg-white text-slate-900'}`}>
                    {isCamOn ? <Video size={24}/> : <VideoOff size={24}/>}
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
