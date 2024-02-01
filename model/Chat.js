const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
	author: {
		type: {},
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	room: {
		type: String,
		required: true,
	},
})

const chatSchema = new Schema({
	supplier: {
		type: String,
		required: true
	},
	consumer: {
		type: String,
		required: true
	},
	chatName: {
		type: String,
		required: true
	},
	messages: {
		type: [Message],
		required: true
	}
});

const ChatModele = mongoose.model('Chat', chatSchema);

class Chat {
	constructor(consumer, supplier, chatName) {
    this.consumer = consumer;
    this.supplier = supplier;
		this.chatName = chatName;
		this.messages = [];
  }

  static async createChat(consumer, supplier, chatName) {
    const newChat = await ChatModele.create({
			"consumer": consumer,
			"supplier": supplier,
			"chatName": chatName,
			"messages": [],
		});
    return newChat;
	}
	
	static async searchChatsByEmail(email) {
		const roleConsumer = await ChatModele.find({ consumer: email });
		const roleSupplier = await ChatModele.find({ supplier: email });
		const allChats = roleConsumer.concat(roleSupplier);
		return allChats;
		// return ChatModele.$where('this.consumer === email || this.supplier === email')
		// return ChatModele.aggregate().group({consumer: email}).project({supplier: email})
	}

	static async searchChatByChatName(chatName) {
		return ChatModele.findOne({chatName});
	}

	static async deleteChatById(id) {
		return ChatModele.deleteOne({ _id: id });
	}

	static async sendMessageToChat(chatName, messages) {
		return ChatModele.findOneAndUpdate({ chatName }, { messages });
	}

	static async getMessagesByChat(chatName) {
		return ChatModele.findOne({chatName}, 'messages');
	}
}

module.exports = Chat;