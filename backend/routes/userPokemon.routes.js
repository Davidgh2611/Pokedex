const { Router } = require('express');
const userPokemonController = require('../controllers/userPokemon.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware.authenticateJWT);

// GET /my-pokemon
router.get('/', userPokemonController.getMyPokemon);

// POST /my-pokemon
router.post('/', userPokemonController.capture);

// PUT /my-pokemon/:id/train
router.put('/:id/train', userPokemonController.train);

// DELETE /my-pokemon/:id
router.delete('/:id', userPokemonController.release);

module.exports = router;
