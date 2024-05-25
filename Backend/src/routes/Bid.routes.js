const bidController = require('../controllers/Bid.controllers');
const authMiddleware = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.post('/place/:barang_id', authMiddleware.authenticate, bidController.placeBid);
router.get('/history/:barang_id', bidController.getBidHistory);

module.exports = router;