const express = require('express');
const router = express.Router();
const registerController = require('../controllers/userControllers/registerController');

router.post('/', registerController.handlerNewUser);

module.exports = router;