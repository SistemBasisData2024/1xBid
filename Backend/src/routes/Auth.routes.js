const authControllers = require('../controllers/Auth.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.post('/logout', authControllers.logout);
router.get('/authenticate', authMiddlewares.authenticate, authControllers.authenticate);

router.post('/experiment', authControllers.experiment);
module.exports = router;