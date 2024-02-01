const express = require('express');
const router = express.Router();
const userByIDController = require('../controllers/userControllers/userByIDController');

router.get('/', userByIDController.handleUserById);

module.exports = router;