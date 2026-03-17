import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// For external API (images)
const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});

export const pokemonService = {
    // Main list
    async getList(params) {
        const { data } = await api.get('/pokemon', { params });
        return data;
    },

    // Detail
    async getById(id) {
        const { data } = await api.get(`/pokemon/${id}`);
        return data;
    },

    // Real-time search
    async search(q) {
        if (!q) return [];
        const { data } = await api.get('/pokemon/search', { params: { q } });
        return data;
    },

    // Get distinct types
    async getTypes() {
        const { data } = await api.get('/pokemon/types');
        return data;
    },

    // Internal: get image from full Pokemon name
    getFallbackImageUrl(id) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    },

    // Get image from external API
    async getImageUrl(name) {
        try {
            // Name from DB might be capitalized or contain spaces/forms. Clean it:
            const cleanName = name.toLowerCase().split(' ')[0].replace(/[^a-z0-9-]/g, '');
            const { data } = await pokeApi.get(`/pokemon/${cleanName}`);
            return data.sprites?.other?.['official-artwork']?.front_default
                || data.sprites?.front_default
                || null;
        } catch (err) {
            console.warn(`Failed to fetch image for ${name} from PokéAPI`, err.message);
            return null;
        }
    },

    // Get evolution chain from our backend
    async getEvolutionChain(id) {
        const { data } = await api.get(`/pokemon/${id}/evolutions`);
        return data;
    },

    // Favorites
    async getFavorites() {
        const { data } = await api.get('/favorites');
        return data;
    },

    async addFavorite(id) {
        const { data } = await api.post(`/favorites/${id}`);
        return data;
    },

    async removeFavorite(id) {
        const { data } = await api.delete(`/favorites/${id}`);
        return data;
    }
};
