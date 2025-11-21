
import React, { useState } from 'react';
import { LayoutDashboard, Users, Home, AlertTriangle, Settings, LogOut, CheckCircle, XCircle, Search, BarChart3, DollarSign, Bell, Shield, PieChart, UserCheck, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data Stats
  const stats = [
      { title: 'Utilisateurs Total', value: '15,234', icon: <Users size={20} className="text-blue-500"/>, trend: '+12%', color: 'bg-blue-50' },
      { title: 'Annonces Actives', value: '1,430', icon: <Home size={20} className="text-purple-500"/>, trend: '+5%', color: 'bg-purple-50' },
      { title: 'Revenus (Mois)', value: '124,500 DH', icon: <DollarSign size={20} className="text-green-500"/>, trend: '+8%', color: 'bg-green-50' },
      { title: 'Alertes Sécurité', value: '3', icon: <Shield size={20} className="text-red-500"/>, trend: '-2%', color: 'bg-red-50' },
  ];

  const pendingListings = [
      { id: 1, title: "Studio Agdal - 3500 DH", owner: "Karim B.", date: "Aujourd'hui 10:00", status: "En attente" },
      { id: 2, title: "Coloc Maarif - 2000 DH", owner: "Sara L.", date: "Hier 14:30", status: "En attente" },
      { id: 3, title: "Appart Ifrane - 4000 DH", owner: "Driss M.", date: "Hier 09:15", status: "En attente" },
  ];

  const verificationQueue = [
      { id: 101, name: "Ahmed K.", type: "Etudiant", doc: "CIN.pdf", status: "En cours" },
      { id: 102, name: "Leila B.", type: "Propriétaire", doc: "Titre Foncier.pdf", status: "En cours" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
        {/* Sidebar Admin Sombre */}
        <div className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
                    <h1 className="text-xl font-bold">Room<span className="text-blue-500">.ma</span></h1>
                </div>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold bg-slate-800 inline-block px-2 py-1 rounded">Admin Panel v2.0</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <p className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 mt-4">Principal</p>
                <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <LayoutDashboard size={18}/> Vue d'ensemble
                </button>
                
                <p className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 mt-6">Gestion</p>
                <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'users' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Users size={18}/> Utilisateurs
                </button>
                <button onClick={() => setActiveTab('listings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'listings' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Home size={18}/> Annonces <span className="ml-auto bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">3</span>
                </button>
                <button onClick={() => setActiveTab('kyc')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'kyc' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <UserCheck size={18}/> Vérification KYC <span className="ml-auto bg-yellow-500 text-slate-900 text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
                </button>

                <p className="text-xs font-bold text-slate-500 uppercase px-4 mb-2 mt-6">Finance & Risque</p>
                <button onClick={() => setActiveTab('finance')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'finance' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <DollarSign size={18}/> Revenus
                </button>
                <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${activeTab === 'reports' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                    <Flag size={18}/> Signalements
                </button>
            </nav>
            
            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center gap-3 px-2 py-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-xs font-bold">AD</div>
                    <div>
                        <p className="text-sm font-bold">Admin Super</p>
                        <p className="text-xs text-slate-500">Accès complet</p>
                    </div>
                </div>
                <Link to="/" className="flex items-center justify-center gap-2 text-red-400 hover:bg-red-900/20 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-bold transition">
                    <LogOut size={16}/> Déconnexion
                </Link>
            </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50">
            {/* Top Header Admin */}
            <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                <div className="flex items-center gap-4 text-slate-500">
                    <Search size={20}/>
                    <input type="text" placeholder="Rechercher un utilisateur, ID transaction..." className="bg-transparent outline-none text-sm w-64"/>
                </div>
                <div className="flex items-center gap-6">
                    <button className="relative text-slate-500 hover:text-slate-700">
                        <Bell size={20}/>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="h-8 w-px bg-slate-200"></div>
                    <button className="text-slate-900 font-bold text-sm flex items-center gap-2">
                        <Settings size={18}/> Paramètres
                    </button>
                </div>
            </header>

            <div className="p-8 max-w-7xl mx-auto">
                
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Tableau de bord</h2>
                        <p className="text-slate-500 text-sm">Bienvenue, voici ce qui se passe sur Room.ma aujourd'hui.</p>
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-slate-800 transition">
                        <DollarSign size={16}/> Exporter Rapport
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.trend}</span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">{stat.title}</h3>
                            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Main Table: Pending Listings */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Home size={18} className="text-blue-600"/> Validation Annonces</h3>
                            <button className="text-blue-600 text-xs font-bold hover:underline uppercase tracking-wide">Voir tout</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {pendingListings.map(listing => (
                                <div key={listing.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                                            <img src={`https://picsum.photos/100/100?random=${listing.id}`} className="w-full h-full object-cover"/>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition">{listing.title}</p>
                                            <p className="text-xs text-slate-500 flex items-center gap-1"><UserCheck size={10}/> {listing.owner} • {listing.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg hover:bg-green-100 border border-green-200 transition flex items-center gap-1">
                                            <CheckCircle size={12}/> Valider
                                        </button>
                                        <button className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-bold rounded-lg hover:bg-red-100 border border-red-200 transition flex items-center gap-1">
                                            <XCircle size={12}/> Refuser
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-blue-600 transition"><Search size={16}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Side Panel: KYC & Activity */}
                    <div className="space-y-8">
                        {/* KYC Queue */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Shield size={18} className="text-yellow-500"/> Vérification Identité</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {verificationQueue.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs">{user.name.charAt(0)}</div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.type} • {user.doc}</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 text-center text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition border-t border-slate-100">
                                Ouvrir la file d'attente (12)
                            </button>
                        </div>

                        {/* Quick Admin Actions */}
                        <div className="bg-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
                            <h3 className="font-bold text-lg mb-4 relative z-10">Actions Rapides</h3>
                            <div className="grid grid-cols-2 gap-3 relative z-10">
                                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-lg text-xs font-bold transition text-center border border-white/10">
                                    📢 Nouvelle notif
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-lg text-xs font-bold transition text-center border border-white/10">
                                    🛑 Bloquer IP
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-lg text-xs font-bold transition text-center border border-white/10">
                                    🔧 Maintenance
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 p-3 rounded-lg text-xs font-bold transition text-center border border-white/10">
                                    📜 Logs
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
