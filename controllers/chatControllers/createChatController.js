const Chat = require('../../model/Chat');
const User = require('../../model/User');
const nodemailer = require('nodemailer');

const handleCreateChat = async (req, res) => {
	const { consumer, supplier, chatName } = req.body;
	if (!consumer || !supplier || !chatName) res.sendStatus(401);

	const duplicate = await Chat.searchChatByChatName( chatName );
	if (duplicate) return res.status(400).json({ message: 'This chat already exists' });

	await Chat.createChat(consumer, supplier, chatName);
	
	const supplierChats = await Chat.searchChatsByEmail(supplier);

	const user = await User.findByEmail(consumer);
	const htmlMessage = user ?
		"<a href='http://localhost:3000/chat/" + user._id + '/' + chatName + "'>Start messaging</a>"
		: "<a href='http://localhost:3000/registration'>Start messaging</a>";

	try {
		const message = {
			from: process.env.USER_EMAIL,
			to: consumer,
			subject: "Inviting to chat",
			text: "Go to link to start message",
			html: htmlMessage
		};
		
		const transporter = nodemailer.createTransport({
			service: 'hotmail',
			port: 587,
			auth: {
				user: process.env.USER_EMAIL,
				pass: process.env.PASS
			}
		});
	
		await transporter.sendMail(message, () => console.log('Send email'))
	} catch(e) {
		console.log(e)
	}

	res.json({allUserChats: supplierChats});

}

module.exports = { handleCreateChat };