const express = require('express');
const router = express.Router();
const deleteChatByIdController = require('../controllers/chatControllers/deleteChatByIdController');

router.delete('/', deleteChatByIdController.handleDeleteChatById);

module.exports = router;