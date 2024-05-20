const userController = require('../controllers/User.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.use(authMiddlewares.authenticate);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserProfile);

module.exports = router;