const authControllers = require('../controllers/Auth.controllers');
const express = require('express');
const router = express.Router();

router.post('/login', authControllers.login);
router.get('/authenticate', authControllers.authenticate);

module.exports = router;