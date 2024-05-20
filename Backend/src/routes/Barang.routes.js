const barangController = require('../controllers/Barang.controllers');
const express = require('express');
const router = express.Router();

router.post('/create', barangController.createBarang);
router.get('/:barang_id', barangController.getBarang);
router.put('/update', barangController.updateBarang);
router.delete('/delete/:barang_id', barangController.deleteBarang);
router.get('/toko/:toko_id', barangController.getBarangByToko);
router.get('/category/:category', barangController.getBarangByCategory);

module.exports = router;