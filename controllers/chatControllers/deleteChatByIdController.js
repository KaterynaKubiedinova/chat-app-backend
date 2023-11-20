const Chat = require('../../model/Chat');
const url = require('url');

const handleDeleteChatById = async (req, res) => {
	const query = url.parse(req.url, true).query;
	const id = query.id;
	await Chat.deleteChatById(id);
}

module.exports = { handleDeleteChatById };