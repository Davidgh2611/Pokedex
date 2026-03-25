const { Router } = require('express');
const tradeController = require('../controllers/trade.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

const router = Router();

// Endpoint de intercambio protegido
router.post('/', authenticateJWT, tradeController.trade);

module.exports = router;
