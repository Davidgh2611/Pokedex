const { Router } = require('express');
const { getAll, getById, searchPokemon, getTypes, getTopCompetitivo, searchBenchmark } = require('../controllers/pokemon.controller');

const router = Router();

const evolutionController = require('../controllers/evolution.controller');

// GET /pokemon/search?q=char  — must be before /:id to avoid conflict
router.get('/search', searchPokemon);

// GET /pokemon/types
router.get('/types', getTypes);

// GET /pokemon/top-competitivo
router.get('/top-competitivo', getTopCompetitivo);

// GET /pokemon/search-benchmark?q=char
router.get('/search-benchmark', searchBenchmark);

// GET /pokemon/:id/evolutions
router.get('/:id/evolutions', evolutionController.getEvolutionChain);

// GET /pokemon?page=1&limit=10&type=Fuego&sort=nombre
router.get('/', getAll);

// GET /pokemon/:id
router.get('/:id', getById);

module.exports = router;
