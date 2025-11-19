import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Coffee, Wifi, BookOpen, HeartHandshake, PiggyBank, MessageCircle } from 'lucide-react';
import { MOCK_LISTINGS } from '../constants';

const Colocation: React.FC = () => {
  const colocListings = MOCK_LISTINGS.filter(l => l.type === 'Colocation');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 py-16 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <div className="inline-block p-3 bg-white/10 backdrop-blur rounded-full mb-4">
                <Users size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Trouvez votre Colocataire Idéal</h1>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                Partagez plus qu'un loyer. Découvrez des espaces de vie conviviaux, vérifiés et adaptés aux étudiants.
            </p>
         </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
         <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Offres de Colocation Récentes</h2>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Filles uniquement</button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Garçons uniquement</button>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">Mixte</button>
            </div>
         </div>

         <div className="grid md:grid-cols-3 gap-8 mb-16">
            {colocListings.length > 0 ? colocListings.map(listing => (
               <Link to={`/listing/${listing.id}`} key={listing.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                     <img src={listing.image} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                     <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                        <p className="text-white font-bold text-lg">{listing.price} MAD <span className="text-sm font-normal opacity-80">/personne</span></p>
                     </div>
                     <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                        <Users size={12}/> 3 places dispo
                     </div>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-slate-900 text-lg mb-2 truncate">{listing.title}</h3>
                     <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                        <MapPin size={14}/> {listing.city} - {listing.university}
                     </p>
                     
                     <div className="flex items-center gap-3 mb-6">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold">A</div>
                           <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-bold">B</div>
                           <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">+1</div>
                        </div>
                        <span className="text-xs text-slate-500">Colocs actuels</span>
                     </div>

                     <div className="flex gap-2 flex-wrap">
                        <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-md flex items-center gap-1 font-medium"><Coffee size={12}/> Salon partagé</span>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md flex items-center gap-1 font-medium"><Wifi size={12}/> Fibre</span>
                     </div>
                  </div>
               </Link>
            )) : (
                <div className="col-span-3 text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">Aucune offre de colocation pour le moment.</p>
                    <Link to="/listings" className="text-blue-600 font-bold text-sm mt-2 inline-block">Voir tous les logements</Link>
                </div>
            )}
         </div>

         {/* Useful Info Section */}
         <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12">
            <div className="text-center mb-10">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Conseils Pratiques</span>
                <h2 className="text-3xl font-bold text-slate-900 mt-3">Le Guide du Colocataire Heureux</h2>
                <p className="text-slate-600 mt-2">Tout ce qu'il faut savoir avant d'emménager avec d'autres étudiants.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col items-start">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <BookOpen size={24}/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Charte de Vie Commune</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Établissez des règles dès le départ : ménage, bruit, invités. Room.ma propose un modèle de charte à télécharger.
                    </p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Télécharger le modèle</button>
                </div>

                <div className="flex flex-col items-start">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <PiggyBank size={24}/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Budget & Dépenses</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Utilisez des applis comme Tricount pour les courses communes. Le loyer doit toujours être payé individuellement pour plus de sécurité.
                    </p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Conseils budget</button>
                </div>

                <div className="flex flex-col items-start">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                        <HeartHandshake size={24}/>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Contrat Solidaire ou Individuel ?</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        Attention à la clause de solidarité ! Privilégiez un bail individuel si possible pour ne pas payer la part d'un coloc parti.
                    </p>
                    <Link to="/contracts" className="text-blue-600 font-bold text-sm hover:underline">Voir les types de contrats</Link>
                </div>
            </div>
            
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-4">
                <MessageCircle className="text-slate-400 flex-shrink-0" size={24} />
                <div>
                    <h4 className="font-bold text-slate-900 text-sm">L'astuce de l'IA Room.ma</h4>
                    <p className="text-slate-600 text-sm mt-1">
                        "Avant de signer, organisez un appel vidéo avec les futurs colocataires via notre messagerie pour vérifier le 'feeling'. C'est aussi important que l'appart lui-même !"
                    </p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Colocation;