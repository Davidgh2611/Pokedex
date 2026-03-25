import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// Interceptor para inyectar token JWT automáticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

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

    async getTop10() {
        const { data } = await api.get('/pokemon/top-competitivo');
        return data;
    },

    async searchBenchmark(q) {
        const { data } = await api.get('/pokemon/search-benchmark', { params: { q } });
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

export const userPokemonService = {
    async getMyPokemon() {
        const { data } = await api.get('/my-pokemon');
        return data;
    },
    async capture(pokemonId, nivel = 1) {
        const { data } = await api.post('/my-pokemon', { pokemonId, nivel });
        return data;
    },
    async train(id) {
        const { data } = await api.put(`/my-pokemon/${id}/train`);
        return data;
    },
    async release(id) {
        const { data } = await api.delete(`/my-pokemon/${id}`);
        return data;
    },
    async trade(pokemonId1, trainerId2, pokemonId2) {
        const { data } = await api.post('/trade', { pokemonId1, trainerId2, pokemonId2 });
        return data;
    }
};
