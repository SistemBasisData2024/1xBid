const userControllers = require('../controllers/User.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const tokoMiddlewares = require('../middlewares/Toko.middlewares');
const express = require('express');
const router = express.Router();

router.use(authMiddlewares.authenticate);

router.get('/profile', userControllers.getUserProfile);
router.put('/profile', userControllers.updateUserProfile);
router.delete('/profile', userControllers.deleteUserProfile);
router.post('/add-address', userControllers.addAddress);
router.put('/edit-address', userControllers.editAddress);
router.post('/top-up', userControllers.topUpSaldo);
router.post('/open-toko', tokoMiddlewares.isAlreadyTokoOwner, userControllers.openToko)

module.exports = router;