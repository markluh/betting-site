const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gamecontroller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/games', authMiddleware, gameController.getLiveGames);
router.post('/bet', authMiddleware, gameController.placeBet);

module.exports = router;
