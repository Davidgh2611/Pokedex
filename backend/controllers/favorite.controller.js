const db = require('../db/connection');

const favoriteController = {
    getFavorites: async (req, res) => {
        const userId = req.user.id;
        const [favorites] = await db.execute(
            `SELECT p.* FROM pokemon p 
             JOIN favoritos f ON p.id = f.pokemon_id 
             WHERE f.user_id = ?`,
            [userId]
        );
        res.json(favorites);
    },

    addFavorite: async (req, res) => {
        const userId = req.user.id;
        const pokemonId = req.params.id;

        try {
            await db.execute(
                'INSERT INTO favoritos (user_id, pokemon_id) VALUES (?, ?)',
                [userId, pokemonId]
            );
            res.status(201).json({ message: 'Pokémon añadido a favoritos' });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'El Pokémon ya está en tus favoritos' });
            }
            throw error;
        }
    },

    removeFavorite: async (req, res) => {
        const userId = req.user.id;
        const pokemonId = req.params.id;

        await db.execute(
            'DELETE FROM favoritos WHERE user_id = ? AND pokemon_id = ?',
            [userId, pokemonId]
        );
        res.json({ message: 'Pokémon eliminado de favoritos' });
    }
};

module.exports = favoriteController;
