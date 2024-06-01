const homeControllers = require('../controllers/Home.controllers');
const router = require('express').Router();

router.get('/newest', homeControllers.getNewestAuctions);
router.get('/trending', homeControllers.getTopTrendingAuctions);

module.exports = router;