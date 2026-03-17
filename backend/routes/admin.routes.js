const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateJWT, isAdmin } = require('../middleware/auth.middleware');

// Protect all admin routes
router.use(authenticateJWT, isAdmin);

router.post('/', adminController.createPokemon);
router.put('/:id', adminController.updatePokemon);
router.delete('/:id', adminController.deletePokemon);

module.exports = router;
