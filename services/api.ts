// Ce fichier sert de pont entre votre React Frontend et le Node.js Backend
// Vous pouvez l'importer dans vos pages pour remplacer les données MOCK

const API_URL = 'http://localhost:5000/api';

interface ListingFilter {
    city?: string;
    university?: string;
    minPrice?: number;
    maxPrice?: number;
    type?: string;
}

export const api = {
    // Auth
    login: async (email: string, password: string) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error('Erreur de connexion');
        return response.json();
    },

    register: async (userData: any) => {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Erreur d\'inscription');
        return response.json();
    },

    // Listings
    getListings: async (filters?: ListingFilter) => {
        // Convert filters to query string
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, String(value));
            });
        }
        
        const response = await fetch(`${API_URL}/listings?${params.toString()}`);
        if (!response.ok) throw new Error('Erreur lors du chargement des annonces');
        return response.json();
    },

    getListingDetails: async (id: string) => {
        const response = await fetch(`${API_URL}/listings/${id}`);
        if (!response.ok) throw new Error('Annonce introuvable');
        return response.json();
    },

    createListing: async (listingData: any, token: string) => {
        const response = await fetch(`${API_URL}/listings`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(listingData),
        });
        if (!response.ok) throw new Error('Erreur lors de la création');
        return response.json();
    }
};
