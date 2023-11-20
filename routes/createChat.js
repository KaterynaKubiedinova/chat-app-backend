const express = require('express');
const router = express.Router();
const createChatController = require('../controllers/chatControllers/createChatController');

router.post('/', createChatController.handleCreateChat);

module.exports = router;