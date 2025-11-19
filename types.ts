
export interface Review {
  id: number;
  author: string;
  role: 'Étudiant' | 'Propriétaire';
  text: string;
  rating: number;
  isVerified: boolean;
  date?: string;
  ownerReply?: string; // La réponse du propriétaire
  replyDate?: string;
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  city: string;
  university: string;
  type: 'Chambre' | 'Studio' | 'Colocation';
  image: string;
  description: string;
  isVerified: boolean;
  amenities: string[];
  ownerName: string;
  rating: number;
  reviews?: Review[]; // Les avis spécifiques à ce logement
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  timestamp: Date;
  isSystem?: boolean; // For safety tips
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  type: 'ai' | 'support' | 'owner';
  lastMessage: string;
  unread: number;
  isOnline?: boolean;
}
