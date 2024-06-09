const searchControllers = require('../controllers/Search.controllers');
const { Router } = require('express');
const router = Router();

router.get('/', searchControllers.search);

module.exports = router;