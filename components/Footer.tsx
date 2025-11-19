
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 text-white group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-blue-700 transition">R</div>
              <span className="text-2xl font-bold">Room<span className="text-blue-500">.ma</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-sm">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300"><Facebook size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition duration-300"><Twitter size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300"><Instagram size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition duration-300"><Linkedin size={18}/></a>
            </div>
          </div>
          
          {/* Student Links */}
          <div>
            <h4 className="text-white font-bold mb-6 border-b-2 border-blue-600 inline-block pb-1">{t('footer.students')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/listings" className="hover:text-blue-400 transition flex items-center gap-2">Chercher un logement</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition flex items-center gap-2">Guide de l'étranger</Link></li>
              <li><Link to="/contracts" className="hover:text-blue-400 transition flex items-center gap-2">Modèles de Contrats</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition flex items-center gap-2">Vivre au Maroc</Link></li>
              <li><Link to="/forum" className="hover:text-blue-400 transition flex items-center gap-2">Communauté</Link></li>
            </ul>
          </div>

          {/* Landlord Links */}
          <div>
            <h4 className="text-white font-bold mb-6 border-b-2 border-blue-600 inline-block pb-1">{t('footer.owners')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/add-room" className="hover:text-blue-400 transition flex items-center gap-2">Publier une annonce</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition flex items-center gap-2">Conseils Bailleurs</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Garantie Loyers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Vérification Identité</a></li>
              <li><a href="#" className="hover:text-blue-400 transition flex items-center gap-2">Charte de qualité</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-6 border-b-2 border-blue-600 inline-block pb-1">{t('footer.help')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 flex-shrink-0 mt-0.5"/>
                <span>Technopolis, Rabat,<br/>Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 flex-shrink-0"/>
                <span className="font-bold">+212 5 22 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 flex-shrink-0"/>
                <Link to="/contact" className="hover:text-blue-400">support@room.ma</Link>
              </li>
              <li>
                <Link to="/contact" className="inline-block bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition">
                   Centre d'Aide 24/7
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-slate-500">© 2024 Room.ma. {t('footer.rights')}</p>
              <div className="flex gap-6">
                 <a href="#" className="text-slate-500 hover:text-white transition">Conditions Générales</a>
                 <a href="#" className="text-slate-500 hover:text-white transition">Confidentialité</a>
                 <a href="#" className="text-slate-500 hover:text-white transition">Mentions Légales</a>
                 <a href="#" className="text-slate-500 hover:text-white transition">Cookies</a>
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-xs">
                 <ShieldCheck size={14}/>
                 <span>Paiements Sécurisés SSL</span>
              </div>
           </div>
           <p className="text-center text-slate-700 text-xs mt-8 flex items-center justify-center gap-1">
              Fait avec <Heart size={10} className="text-red-600 fill-red-600"/> pour les étudiants du Maroc
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
