const transaksiControllers = require('../controllers/Transaksi.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.use(authMiddlewares.authenticate);

router.post('/:barang_id', transaksiControllers.createTransaksi);
router.get('/:transaksi_id', transaksiControllers.getTransaksiDetail);
router.delete('/:transaksi_id', transaksiControllers.cancelTransaksi);
router.get('/', transaksiControllers.getTransaksi);

module.exports = router;