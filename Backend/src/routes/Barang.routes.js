const barangController = require('../controllers/Barang.controllers');
const authMiddleware = require('../middlewares/Auth.middlewares');
const tokoMiddleware = require('../middlewares/Toko.middlewares');
const express = require('express');
const router = express.Router();

router.post('/:toko_id/create-barang', authMiddleware.authenticate, tokoMiddleware.isTokoOwner, barangController.createBarang);
router.put('', authMiddleware.authenticate, tokoMiddleware.isTokoOwner, barangController.updateBarang);
router.delete('', authMiddleware.authenticate, tokoMiddleware.isTokoOwner, barangController.deleteBarang);
router.get('/toko/:toko_id', barangController.getBarangByToko);
router.get('/category/:category', barangController.getBarangByCategory);

module.exports = router;

// TIDAK DIBUTUHKAN LAGI INI BARANG.ROUTES.JS