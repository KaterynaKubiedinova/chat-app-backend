const Chat = require('../../model/Chat');
const url = require('url');

const handleCurrentUserChat = async (req, res) => {
	const query = url.parse(req.url, true).query;
	const chatName = query.chatName;
	const chat = await Chat.searchChatByChatName(chatName);
	if(!chat) res.redirect('/auth')
	res.json(chat);
}

module.exports = { handleCurrentUserChat };