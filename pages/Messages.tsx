
import React, { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Send, Paperclip, Phone, AlertTriangle, Shield, Bot, User, Headphones, CheckCircle2, Video, Mic, MicOff, VideoOff, PhoneOff, Briefcase, FileText, Wrench, Key, Box, ChevronRight, Bell, Clock, CreditCard, ArrowLeft, Plus, Wifi, Trash2, Zap, Loader2, Hammer, ShieldCheck } from 'lucide-react';
import { ChatMessage, Conversation, TicketData } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Messages: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // UI States
  const [showReportModal, setShowReportModal] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<'calling' | 'connected'>('calling');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [showServiceMenu, setShowServiceMenu] = useState(false); 

  const [isTyping, setIsTyping] = useState(false);
  const [reportReason, setReportReason] = useState('');

  // Conversation Data
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'concierge_daily', name: 'Concierge VIP', type: 'concierge', lastMessage: 'Urgence: Fuite signalée', unread: 0, isOnline: true },
    { id: 'support', name: 'Service Client Humain', type: 'support', lastMessage: 'Bienvenue au centre d\'aide.', unread: 0, isOnline: true },
    { id: 'ai', name: 'Assistant Recherche', type: 'ai', lastMessage: 'Prêt à chercher votre logement ?', unread: 0, isOnline: true },
    { id: 'owner1', name: 'Karim B. (Propriétaire)', type: 'owner', lastMessage: 'D\'accord pour la visite demain à 14h.', unread: 0, isOnline: false },
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>('concierge_daily');
  const [aiStep, setAiStep] = useState<number>(0);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    'concierge_daily': [
       { id: 'c1', sender: 'other', text: '🚨 **URGENCE & GESTION UNIQUEMENT**\n\nBienvenue sur le canal prioritaire Conciergerie.\n\nCe canal est strictement réservé pour :\n1. Signaler un problème grave dans l\'appartement (Fuite, Sécurité, Panne).\n2. Demander une intervention technique.\n3. Souscrire au service de gestion si vous êtes intéressé.\n\nPour toute autre demande, merci d\'utiliser le support classique.', timestamp: new Date(Date.now() - 86400000) }
    ],
    'ai': [
       { id: '1', sender: 'other', text: 'Bonjour ! 🏠 Je suis l\'intelligence artificielle de Room.ma.\n\nJe suis là pour filtrer les milliers d\'offres pour vous. Cliquez sur une option ci-dessous pour commencer ! 👇', timestamp: new Date() }
    ],
    'support': [
       { id: '1', sender: 'other', text: '👋 Bonjour. Je suis l\'agent de liaison du Service Client Humain.\n\nNous intervenons pour :\n1️⃣ Les litiges de paiement\n2️⃣ La validation des contrats\n3️⃣ Les signalements de sécurité.', timestamp: new Date(Date.now() - 86400000) }
    ],
    'owner1': [
       { id: '1', sender: 'user', text: 'Bonjour, le studio est-il toujours disponible ?', timestamp: new Date(Date.now() - 10000000) },
       { id: '2', sender: 'other', text: 'Oui tout à fait. Vous êtes étudiant ?', timestamp: new Date(Date.now() - 9000000) },
       { id: '4', sender: 'other', text: 'D\'accord pour la visite demain à 14h.', timestamp: new Date() }
    ]
  });
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeConversationId, isTyping]);

  // Handle external navigation
  useEffect(() => {
    if (location.state) {
      const { contactId, contactName, initialMessage } = location.state as any;
      if (contactId && contactName) {
        // Logic to switch or add conv would go here
        setActiveConversationId(contactId);
        if (initialMessage) setInput(initialMessage);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, conversations]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeMessages = messages[activeConversationId] || [];

  // QUICK REPLIES SPECIFIQUES CONCIERGERIE
  const conciergeChips = ["🚨 SIGNALER UN PROBLÈME", "🛠️ Demande d'intervention", "💼 Je veux que vous gériez mon bien", "🔑 Problème Clés/Accès"];

  const getQuickReplies = (type: string | undefined, step: number = 0) => {
    if (!type) return [];
    switch (type) {
        case 'ai':
            if (step === 0) return ["Chercher un logement 🏠", "Comment ça marche ?"];
            if (step === 1) return ["Rabat", "Casablanca", "Marrakech", "Tanger"];
            if (step === 2) return ["1500 DH", "2500 DH", "4000 DH", "Budget illimité"];
            return ["Voir les annonces", "Nouvelle recherche"];
        case 'support':
            return ["⚠️ Signaler un abus", "⚖️ Litige / Paiement", "📄 Vérification Contrat"];
        case 'owner':
            return ["Est-ce disponible ?", "Organiser une visite", "Photos supplémentaires ?"];
        case 'concierge':
            return conciergeChips;
        default:
            return [];
    }
  };

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
    setShowServiceMenu(false);

    if (activeConversation?.type === 'ai') {
        handleAIResponse(textToSend);
    } else if (activeConversation?.type === 'support') {
        handleSupportResponse(textToSend);
    } else if (activeConversation?.type === 'concierge') {
        handleConciergeResponse(textToSend);
    } else {
        setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleCreateTicket = (category: TicketData['category'], title: string) => {
      // 1. User message
      const userMsg: ChatMessage = {
          id: Date.now().toString(),
          sender: 'user',
          text: `⚠️ SIGNALEMENT : ${title}`,
          timestamp: new Date()
      };
      
      setMessages(prev => ({
          ...prev,
          'concierge_daily': [...prev['concierge_daily'], userMsg]
      }));
      setShowServiceMenu(false);
      setIsTyping(true);

      // 2. System Ticket Creation
      setTimeout(() => {
          const ticketId = Math.floor(Math.random() * 10000).toString();
          const ticketMsg: ChatMessage = {
              id: (Date.now() + 1).toString(),
              sender: 'other',
              text: `Ticket d'urgence #${ticketId} créé. Notre équipe technique intervient sous 4h.`,
              timestamp: new Date(),
              isSystem: true,
              ticket: {
                  id: ticketId,
                  title: title,
                  category: category,
                  status: 'open',
                  priority: 'high',
                  eta: 'Technicien notifié'
              }
          };
          setMessages(prev => ({
              ...prev,
              'concierge_daily': [...prev['concierge_daily'], ticketMsg]
          }));
          setIsTyping(false);
      }, 1500);
  };

  const handleConciergeResponse = (userInput: string) => {
    setTimeout(() => {
        let responseText = "";
        if (userInput.includes("gériez mon bien") || userInput.includes("intéressé")) {
             responseText = "Merci de votre intérêt. Un expert va vous contacter pour mettre en place la gestion de votre appartement. Pouvez-vous confirmer votre numéro de téléphone ?";
        } else if (userInput.includes("PROBLÈME") || userInput.includes("intervention")) {
             responseText = "Quel est la nature exacte du problème ? (Fuite, Électricité, Voisinage...). Vous pouvez utiliser le menu '+' pour créer un ticket officiel.";
        } else {
             responseText = "Ce canal est réservé aux urgences et à la gestion locative. Pour toute autre question, merci de contacter le support.";
        }

        const humanMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'other',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => ({ ...prev, ['concierge_daily']: [...prev['concierge_daily'], humanMsg] }));
        setIsTyping(false);
    }, 2000);
  };

  const handleSupportResponse = (userInput: string) => {
    setTimeout(() => {
        const supportMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'other',
            text: "Message reçu. Un agent va prendre le relais.",
            timestamp: new Date()
        };
        setMessages(prev => ({ ...prev, ['support']: [...prev['support'], supportMsg] }));
        setIsTyping(false);
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
        } else {
            aiResponseText = "Je suis là pour vous aider. Cliquez sur 'Chercher un logement' pour débuter ! 👇";
            nextStep = 0;
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

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    setCallStatus('calling');
    setTimeout(() => setCallStatus('connected'), 3000);
  };

  // --- RENDER HELPERS ---

  const getTicketIcon = (category: string) => {
      switch(category) {
          case 'maintenance': return <Wrench size={20} className="text-orange-500"/>;
          case 'admin': return <FileText size={20} className="text-blue-500"/>;
          case 'security': return <Key size={20} className="text-red-500"/>;
          case 'wifi': return <Wifi size={20} className="text-purple-500"/>;
          case 'cleaning': return <Zap size={20} className="text-yellow-500"/>;
          default: return <Box size={20} className="text-slate-500"/>;
      }
  };

  const renderConversationItem = (conv: Conversation) => (
    <div 
        key={conv.id}
        onClick={() => setActiveConversationId(conv.id)}
        className={`group p-4 rounded-xl cursor-pointer flex items-center gap-4 transition-all duration-200 border ${
            activeConversationId === conv.id 
            ? 'bg-white shadow-md border-blue-100 scale-[1.02]' 
            : 'bg-transparent border-transparent hover:bg-white hover:border-slate-100'
        }`}
    >
        <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-105 ${
                conv.type === 'concierge' ? 'bg-slate-900 text-white ring-2 ring-yellow-400' : 
                conv.type === 'ai' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 
                conv.type === 'support' ? 'bg-green-100 text-green-600' : 'bg-white border border-slate-200 text-slate-600'
            }`}>
                {conv.type === 'ai' ? <Bot size={22}/> : conv.type === 'concierge' ? <Briefcase size={20}/> : conv.type === 'support' ? <Headphones size={20}/> : <span className="font-bold text-lg">{conv.name.charAt(0)}</span>}
            </div>
            {conv.isOnline && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-50 rounded-full"></div>}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
                <h3 className={`font-bold text-sm truncate ${activeConversationId === conv.id ? 'text-slate-900' : 'text-slate-700'}`}>{conv.name}</h3>
                {conv.unread > 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{conv.unread}</span>}
            </div>
            <p className={`text-xs truncate ${activeConversationId === conv.id ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
                {conv.type === 'concierge' ? <span className="text-yellow-600 font-bold flex items-center gap-1">Gestion Active</span> : conv.lastMessage}
            </p>
        </div>
    </div>
  );

  return (
    <div className="h-full flex bg-[#F8FAFC] font-sans relative overflow-hidden">
      
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-80 lg:w-[380px] bg-gray-50/80 backdrop-blur-xl border-r border-slate-200 flex flex-col z-20 h-full">
        <div className="p-6 flex flex-col h-full">
          <button onClick={() => navigate(-1)} className="md:hidden mb-4 flex items-center gap-2 text-slate-500 font-bold text-sm"><ArrowLeft size={18}/> {t('details.back')}</button>
          <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              Messagerie <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">3</span>
          </h1>
          
          <div className="relative mb-6 group">
            <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            <Search className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          </div>

          <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 flex-1">
             <p className="text-xs font-bold text-slate-400 uppercase px-4 mb-2 tracking-wider">Gestion Premium</p>
             {conversations.filter(c => c.type === 'concierge').map(c => renderConversationItem(c))}
             
             <p className="text-xs font-bold text-slate-400 uppercase px-4 mt-6 mb-2 tracking-wider">Assistance</p>
             {conversations.filter(c => c.type === 'support' || c.type === 'ai').map(c => renderConversationItem(c))}

             <p className="text-xs font-bold text-slate-400 uppercase px-4 mt-6 mb-2 tracking-wider">Récents</p>
             {conversations.filter(c => c.type === 'owner').map(c => renderConversationItem(c))}
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="hidden md:flex flex-1 flex-col bg-white relative h-full shadow-xl z-10 rounded-l-[30px] overflow-hidden border-l border-slate-200 ml-[-20px]">
        
        {/* CHAT HEADER */}
        <div className={`h-20 px-8 border-b border-slate-100 flex items-center justify-between flex-shrink-0 transition-colors ${activeConversation?.type === 'concierge' ? 'bg-slate-900 text-white' : 'bg-white'}`}>
          <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                 activeConversation?.type === 'concierge' ? 'bg-slate-800 border border-slate-700 text-white' : 
                 'bg-white border border-slate-100 text-slate-600'
             }`}>
                 {activeConversation?.type === 'concierge' ? <Briefcase size={22} className="text-yellow-400"/> : activeConversation?.type === 'ai' ? <Bot size={22}/> : <User size={22}/>}
             </div>
             <div>
                 <h2 className={`font-bold text-lg flex items-center gap-2 ${activeConversation?.type === 'concierge' ? 'text-white' : 'text-slate-900'}`}>
                    {activeConversation?.name}
                    {activeConversation?.type === 'concierge' && <span className="bg-yellow-400 text-slate-900 text-[10px] px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1"><Shield size={10}/> VIP</span>}
                 </h2>
                 <p className={`text-xs flex items-center gap-1.5 ${activeConversation?.type === 'concierge' ? 'text-slate-400' : 'text-green-600'}`}>
                    <span className={`w-2 h-2 rounded-full ${activeConversation?.type === 'concierge' ? 'bg-green-500' : 'bg-green-500'}`}></span> 
                    {activeConversation?.type === 'concierge' ? 'Yassir (Gestionnaire Principal)' : 'En ligne'}
                 </p>
             </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
            {/* MESSAGES SCROLL AREA */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f8f9fc] relative">
                
                {/* Background Pattern for Concierge */}
                {activeConversation?.type === 'concierge' && (
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                )}

                {/* Welcome Banner for Concierge */}
                {activeConversation?.type === 'concierge' && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-8 shadow-xl relative overflow-hidden border border-slate-700 mx-auto max-w-2xl text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 border border-white/10 shadow-inner mx-auto mb-4">
                                <Shield size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-2">Gestion Sécurisée VIP</h3>
                            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                                Ce canal est strictement réservé aux signalements d'urgence (fuites, sécurité) et à l'aide à la gestion de votre bien.
                            </p>
                        </div>
                    </div>
                )}

                {activeMessages.map((msg) => (
                    msg.ticket ? (
                        // TICKET CARD DISPLAY
                        <div key={msg.id} className="flex justify-center my-6">
                            <div className="bg-white border border-slate-200 shadow-lg rounded-2xl overflow-hidden max-w-sm w-full transform transition hover:scale-1.02">
                                <div className={`h-1.5 w-full ${msg.ticket.status === 'resolved' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                                                {getTicketIcon(msg.ticket.category)}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ticket #{msg.ticket.id}</p>
                                                <h4 className="font-bold text-slate-900 text-sm">{msg.ticket.title}</h4>
                                            </div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${msg.ticket.status === 'open' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-slate-100'}`}>
                                            {msg.ticket.status === 'open' ? 'Urgence' : 'Traité'}
                                        </span>
                                    </div>
                                    <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 hover:text-blue-600 transition shadow-sm">
                                        Voir le suivi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : msg.isSystem ? (
                        <div key={msg.id} className="flex justify-center my-4">
                             <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{msg.text}</span>
                        </div>
                    ) : (
                        <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`relative max-w-[70%] px-6 py-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                            }`}>
                                {msg.text}
                                <span className={`text-[10px] absolute bottom-1.5 ${msg.sender === 'user' ? 'right-3 text-blue-200' : 'left-3 text-slate-300'}`}>
                                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                            </div>
                        </div>
                    )
                ))}
                
                {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 ml-4">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                        <span>{activeConversation?.type === 'concierge' ? 'Yassir écrit...' : "En train d'écrire..."}</span>
                    </div>
                )}
                <div ref={messagesEndRef} className="h-4"/>
            </div>

            {/* RIGHT SIDEBAR (CONCIERGE ONLY - ENHANCED) */}
            {activeConversation?.type === 'concierge' && (
                <div className="w-80 bg-white border-l border-slate-100 hidden xl:flex flex-col h-full overflow-hidden">
                    {/* Gestionnaire Profile */}
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Votre Gestionnaire</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center border-2 border-slate-100 shadow-md relative">
                                <User size={20} className="text-white"/>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                            <div>
                               <p className="font-bold text-slate-900">Yassir M.</p>
                               <p className="text-xs text-slate-500">Réponse &lt; 5 min</p>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Card */}
                    <div className="p-6 flex-1 overflow-y-auto">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-5 text-white mb-8 shadow-lg relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-xl -mr-5 -mt-5"></div>
                             <div className="flex justify-between items-start mb-4">
                                 <h3 className="font-bold text-sm">Garantie Active</h3>
                                 <ShieldCheck size={18} className="text-white/80"/>
                             </div>
                             <p className="text-2xl font-bold mb-1">Pack VIP</p>
                             <p className="text-xs text-white/80 mb-4">Protection Totale</p>
                        </div>

                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Interventions en cours</h3>
                        <div className="space-y-3 mb-8">
                             <div className="text-center text-xs text-slate-400 py-4 italic border border-dashed border-slate-200 rounded-xl">
                                 Aucun problème signalé.
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* SERVICE MENU OVERLAY (When + is clicked) */}
        {showServiceMenu && (
            <div className="absolute bottom-24 left-4 md:left-auto md:right-[340px] z-50 animate-scale-in origin-bottom-left">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 px-2">Signaler une urgence</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleCreateTicket('maintenance', 'Fuite / Plomberie')} className="flex flex-col items-center p-3 hover:bg-red-50 rounded-xl transition group border border-slate-100 hover:border-red-100">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition"><Hammer size={18}/></div>
                            <span className="text-xs font-bold text-slate-700">Réparation</span>
                        </button>
                        <button onClick={() => handleCreateTicket('security', 'Problème Clés')} className="flex flex-col items-center p-3 hover:bg-orange-50 rounded-xl transition group border border-slate-100 hover:border-orange-100">
                            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition"><Key size={18}/></div>
                            <span className="text-xs font-bold text-slate-700">Accès / Clés</span>
                        </button>
                        <button onClick={() => handleCreateTicket('admin', 'Problème Voisinage')} className="flex flex-col items-center p-3 hover:bg-blue-50 rounded-xl transition group border border-slate-100 hover:border-blue-100">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition"><FileText size={18}/></div>
                            <span className="text-xs font-bold text-slate-700">Voisinage</span>
                        </button>
                        <button onClick={() => handleCreateTicket('wifi', 'Autre Urgence')} className="flex flex-col items-center p-3 hover:bg-slate-50 rounded-xl transition group border border-slate-100">
                            <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition"><AlertTriangle size={18}/></div>
                            <span className="text-xs font-bold text-slate-700">Autre</span>
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* INPUT AREA */}
        <div className="bg-white border-t border-slate-100 p-6 pb-8 relative z-20">
           
           {/* FLUID CONCIERGE CHIPS */}
           <div className="flex gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
              {getQuickReplies(activeConversation?.type, activeConversation?.type === 'ai' ? aiStep : 0).map((reply, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSendMessage(reply)} 
                    className={`px-4 py-2 text-xs font-bold rounded-full border transition whitespace-nowrap ${activeConversation?.type === 'concierge' ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                      {reply}
                  </button>
              ))}
           </div>
           
           <div className="flex items-end gap-3 bg-slate-50 p-2 rounded-[24px] border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all shadow-inner">
              
              {activeConversation?.type === 'concierge' ? (
                  <button 
                    onClick={() => setShowServiceMenu(!showServiceMenu)}
                    className={`p-3 rounded-full transition shadow-sm transform hover:scale-105 ${showServiceMenu ? 'bg-slate-900 text-white rotate-45' : 'bg-red-600 text-white hover:bg-red-700'}`}
                  >
                      <Plus size={20} strokeWidth={3}/>
                  </button>
              ) : (
                  <button className="p-3 text-slate-400 hover:bg-white hover:text-blue-600 rounded-full transition shadow-sm"><Paperclip size={20}/></button>
              )}

              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                    }
                }}
                placeholder={activeConversation?.type === 'concierge' ? "Décrivez l'urgence..." : "Écrivez votre message..."}
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 resize-none py-3 max-h-32 placeholder:text-slate-400"
                rows={1}
              />
              <button 
                onClick={() => handleSendMessage()} 
                disabled={!input.trim()}
                className={`p-3 rounded-full transition shadow-md transform hover:scale-105 ${input.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400'}`}
              >
                <Send size={20} className={input.trim() ? 'ml-0.5' : ''}/>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
