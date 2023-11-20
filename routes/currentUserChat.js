const express = require('express');
const router = express.Router();
const currentUserChatController = require('../controllers/chatControllers/currentUserChatController');

router.get('/', currentUserChatController.handleCurrentUserChat);

module.exports = router;