
import { Listing, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  // --- ÉTUDIANTS ---
  {
    id: 1,
    author: "Sarah",
    role: "Étudiant",
    text: "Grâce à RoomMA, j’ai réservé ma chambre depuis la France sans stress. Tout était prêt à mon arrivée, appartement vérifié et sécurisé. Une arrivée clé en main !",
    rating: 5,
    isVerified: true,
    date: "Il y a 2 jours"
  },
  {
    id: 2,
    author: "Youssef",
    role: "Étudiant",
    text: "Je craignais les arnaques, mais RoomMA a tout sécurisé : logement vérifié, compte bloqué jusqu’à la remise des clés. Je recommande à tous les étudiants étrangers.",
    rating: 5,
    isVerified: true,
    date: "Il y a 1 semaine"
  },
  {
    id: 3,
    author: "Lina",
    role: "Étudiant",
    text: "Trouver un logement n’a jamais été aussi simple : RoomMA m’a mis en relation avec des propriétaires fiables et des appartements proches de la fac.",
    rating: 5,
    isVerified: true,
    date: "Il y a 3 jours"
  },
  {
    id: 4,
    author: "Fatima",
    role: "Étudiant",
    text: "Le service client est incroyable : toujours disponible et attentif. Je me suis installée sereinement, comme si j’avais un ami sur place.",
    rating: 5,
    isVerified: true,
    date: "Hier"
  },
  {
    id: 5,
    author: "Amine",
    role: "Étudiant",
    text: "RoomMA a transformé ma recherche de logement. Tout est digitalisé, sécurisé et transparent. Je recommande à tous les nouveaux étudiants.",
    rating: 4,
    isVerified: true,
    date: "Il y a 2 semaines"
  },
  // --- PROPRIÉTAIRES ---
  {
    id: 6,
    author: "M. Benali",
    role: "Propriétaire",
    text: "RoomMA m’a permis de recevoir uniquement des étudiants fiables et vérifiés. Plus de soucis de paiement ou de logements mal utilisés.",
    rating: 5,
    isVerified: true,
    date: "Aujourd'hui"
  },
  {
    id: 7,
    author: "Mme El Amrani",
    role: "Propriétaire",
    text: "Les étudiants sont bien sélectionnés, leur identité est vérifiée. RoomMA m’apporte une vraie tranquillité d’esprit pour la gestion de mes biens.",
    rating: 5,
    isVerified: true,
    date: "Il y a 4 jours"
  },
  {
    id: 8,
    author: "M. Haddad",
    role: "Propriétaire",
    text: "Transparence totale : chaque étudiant est contrôlé, les paiements sécurisés via la plateforme. Je sais que mon logement est entre de bonnes mains.",
    rating: 5,
    isVerified: true,
    date: "Il y a 1 semaine"
  },
  {
    id: 9,
    author: "Mme Rachidi",
    role: "Propriétaire",
    text: "RoomMA a simplifié ma vie de bailleur : gestion fluide, locataires sérieux, et une vraie relation de confiance avec l'équipe support.",
    rating: 5,
    isVerified: true,
    date: "Il y a 3 semaines"
  },
  {
    id: 10,
    author: "M. Ouardi",
    role: "Propriétaire",
    text: "Depuis que j’utilise RoomMA, je n’ai plus d’inquiétudes. Les étudiants sont vérifiés, la plateforme est fiable, et le service client est réactif.",
    rating: 5,
    isVerified: true,
    date: "Il y a 1 mois"
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Studio Moderne - Agdal",
    price: 3500,
    city: "Rabat",
    university: "Université Mohammed V",
    type: "Studio",
    image: "https://picsum.photos/800/600?random=1",
    description: "Magnifique studio rénové, idéal pour étudiant étranger. Situé à 5min de la fac. Sécurisé 24/7.",
    isVerified: true,
    amenities: ["Wifi", "Meublé", "Sécurité", "Cuisine équipée"],
    ownerName: "Karim B.",
    rating: 4.8,
    reviews: [
        {
            id: 101,
            author: "Thomas R.",
            role: "Étudiant",
            text: "Superbe studio, exactement comme sur les photos. Karim est très réactif et arrangeant pour l'état des lieux.",
            rating: 5,
            isVerified: true,
            date: "12 Oct 2023",
            ownerReply: "Merci Thomas ! Ravi que le studio te plaise. Bonne année universitaire !",
            replyDate: "13 Oct 2023"
        },
        {
            id: 102,
            author: "Sarah L.",
            role: "Étudiant",
            text: "Le quartier est un peu bruyant le soir, mais l'appartement est très bien isolé. Wifi très rapide.",
            rating: 4,
            isVerified: true,
            date: "05 Nov 2023"
        }
    ]
  },
  {
    id: 2,
    title: "Chambre en Colocation - Maarif",
    price: 2200,
    city: "Casablanca",
    university: "Université Hassan II",
    type: "Colocation",
    image: "https://picsum.photos/800/600?random=2",
    description: "Grande chambre lumineuse dans un appartement partagé avec 2 autres étudiants internationaux.",
    isVerified: true,
    amenities: ["Wifi", "Machine à laver", "Balcon"],
    ownerName: "Sara L.",
    rating: 4.5,
    reviews: []
  },
  {
    id: 3,
    title: "Appartement Privé - Ifrane",
    price: 4500,
    city: "Ifrane",
    university: "Al Akhawayn University",
    type: "Studio",
    image: "https://picsum.photos/800/600?random=3",
    description: "Cadre exceptionnel pour cet appartement proche du campus. Chauffage central inclus.",
    isVerified: true,
    amenities: ["Chauffage", "Parking", "Vue montagne"],
    ownerName: "Driss M.",
    rating: 5.0,
    reviews: []
  },
  {
    id: 4,
    title: "Chambre Calme - Gueliz",
    price: 2000,
    city: "Marrakech",
    university: "Université Cadi Ayyad",
    type: "Chambre",
    image: "https://picsum.photos/800/600?random=4",
    description: "Chambre simple et propre, parfaite pour petit budget. Quartier dynamique.",
    isVerified: false,
    amenities: ["Wifi", "Proche transport"],
    ownerName: "Amine K.",
    rating: 4.2,
    reviews: []
  },
  {
    id: 5,
    title: "Suite Premium - Madinat Al Irfane",
    price: 3800,
    city: "Rabat",
    university: "ENCG Rabat",
    type: "Studio",
    image: "https://picsum.photos/800/600?random=5",
    description: "Résidence étudiante neuve avec salle de sport et espace co-working.",
    isVerified: true,
    amenities: ["Salle de sport", "Gardiennage", "Wifi Haut Débit"],
    ownerName: "Room.ma Gestion",
    rating: 4.9,
    reviews: []
  }
];

export const UNIVERSITIES = [
  "Université Mohammed V",
  "Université Hassan II",
  "Al Akhawayn University",
  "Université Cadi Ayyad",
  "UIR (Université Internationale de Rabat)",
  "Université Ibn Tofail"
];

export const PAYMENT_METHODS = [
  { name: "CHBank", type: "bank" },
  { name: "Barid Bank", type: "bank" },
  { name: "Wafacash", type: "cash" },
  { name: "Cash Plus", type: "cash" }
];
