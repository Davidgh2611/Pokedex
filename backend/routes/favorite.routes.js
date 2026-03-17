const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.get('/', authenticateJWT, favoriteController.getFavorites);
router.post('/:id', authenticateJWT, favoriteController.addFavorite);
router.delete('/:id', authenticateJWT, favoriteController.removeFavorite);

module.exports = router;
