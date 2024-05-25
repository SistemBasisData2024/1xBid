const tokoController = require('../controllers/Toko.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const tokoMiddlewares = require('../middlewares/Toko.middlewares');
const express = require('express');
const router = express.Router();

router.get('/:toko_id', tokoController.getTokoById);
router.put('/:toko_id', authMiddlewares.authenticate, tokoMiddlewares.isTokoOwner, tokoController.updateToko);
router.delete('/:toko_id', authMiddlewares.authenticate, tokoMiddlewares.isTokoOwner, tokoController.deleteToko);
router.post('/:toko_id/add-barang', authMiddlewares.authenticate, tokoMiddlewares.isTokoOwner, tokoController.createBarang);
router.put('/:toko_id/:barang_id', authMiddlewares.authenticate, tokoMiddlewares.isTokoOwner, tokoController.editBarang);
router.delete('/:toko_id/:barang_id', authMiddlewares.authenticate, tokoMiddlewares.isTokoOwner, tokoController.deleteBarang);

module.exports = router;