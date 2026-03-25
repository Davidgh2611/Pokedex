const { capturePokemon, getCapturedPokemon, trainPokemon, releasePokemon } = require('../models/userPokemon.model');

const userPokemonController = {
    capture: async (req, res) => {
        const userId = req.user.id;
        const { pokemonId, nivel } = req.body;

        try {
            const result = await capturePokemon(userId, pokemonId, nivel);
            res.status(201).json({ message: 'Pokémon capturado', id: result.insertId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getMyPokemon: async (req, res) => {
        const userId = req.user.id;
        try {
            const pokemon = await getCapturedPokemon(userId);
            res.json(pokemon);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener Pokémon' });
        }
    },

    train: async (req, res) => {
        const userId = req.user.id;
        const { id } = req.params;

        try {
            const result = await trainPokemon(id, userId);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    release: async (req, res) => {
        const userId = req.user.id;
        const { id } = req.params;

        try {
            await releasePokemon(id, userId);
            res.json({ message: 'Pokémon liberado con éxito' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = userPokemonController;
