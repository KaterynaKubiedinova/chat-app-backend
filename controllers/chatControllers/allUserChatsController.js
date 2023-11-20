const Chat = require('../../model/Chat');
const url = require('url');

const handleChatsByEmail = async (req, res) => {
	const query = url.parse(req.url, true).query;
	const email = query.email;
	const chats = await Chat.searchChatsByEmail(email);

	res.json(chats);
}

module.exports = { handleChatsByEmail };