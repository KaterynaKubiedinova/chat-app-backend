const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/userControllers/refreshTokenController');

router.post('/', refreshTokenController.handleRefreshToken);

module.exports = router;