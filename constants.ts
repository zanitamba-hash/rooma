
import { Listing, Review } from './types';

export const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Mamadou D.",
    role: "Étudiant",
    text: "Grâce à Room.ma, j'ai trouvé mon logement à Rabat depuis le Sénégal sans arnaque. Le processus est super sécurisé.",
    rating: 5,
    isVerified: true,
    date: "Il y a 2 mois"
  },
  {
    id: 2,
    author: "Sophie M.",
    role: "Étudiant",
    text: "L'interface est claire et les propriétaires sont vérifiés. Je recommande pour tous les étudiants en échange.",
    rating: 5,
    isVerified: true,
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    author: "Hassan E.",
    role: "Propriétaire",
    text: "Je loue mes appartements uniquement via cette plateforme maintenant. Les paiements sont garantis et les locataires vérifiés.",
    rating: 4,
    isVerified: true,
    date: "Il y a 3 semaines"
  },
  {
    id: 4,
    author: "Lucas P.",
    role: "Étudiant",
    text: "Génial pour trouver une colocation fiable. J'ai pu parler avec mes futurs colocs avant d'arriver !",
    rating: 5,
    isVerified: false,
    date: "Il y a 1 semaine"
  },
  {
    id: 5,
    author: "Fatima Z.",
    role: "Propriétaire",
    text: "L'outil de vérification des étudiants est un vrai plus. Fini les impayés, je suis rassurée.",
    rating: 5,
    isVerified: true,
    date: "Hier"
  },
  {
    id: 6,
    author: "Mehdi O.",
    role: "Propriétaire",
    text: "Service client très réactif pour la légalisation des contrats. Une charge mentale en moins.",
    rating: 5,
    isVerified: true,
    date: "Aujourd'hui"
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
