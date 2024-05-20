const tokoController = require('../controllers/Toko.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.use(authMiddlewares.authenticate);

router.post('/', tokoController.createToko);
router.get('/:toko_id', tokoController.getTokoById);
router.put('/:toko_id', tokoController.updateToko);
router.delete('/:toko_id', tokoController.deleteToko);

module.exports = router;