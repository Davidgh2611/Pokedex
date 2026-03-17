const PokemonModel = require('../models/pokemon.model');

const getAll = async (req, res) => {
    const { page = 1, limit = 10, name = '', type = '', sort = 'id' } = req.query;
    const result = await PokemonModel.findAll({ page, limit, name, type, sort });
    res.json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const pokemon = await PokemonModel.findById(id);
    if (!pokemon) {
        return res.status(404).json({ error: 'Not Found', message: `Pokémon con id ${id} no encontrado` });
    }
    res.json(pokemon);
};

const searchPokemon = async (req, res) => {
    const { q = '' } = req.query;
    const results = await PokemonModel.search(q);
    res.json(results);
};

const getTypes = async (req, res) => {
    const types = await PokemonModel.getTypes();
    res.json(types);
};

module.exports = { getAll, getById, searchPokemon, getTypes };
