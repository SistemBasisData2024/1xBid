const userController = require('../controllers/User.controllers');
const authMiddlewares = require('../middlewares/Auth.middlewares');
const express = require('express');
const router = express.Router();

router.use(authMiddlewares.authenticate);