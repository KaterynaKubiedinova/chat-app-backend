require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Chat = require('./model/Chat');
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

const PORT = process.env.PORT || 3500;

connectDB();
app.use(credentials)
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/allUserChats', require('./routes/allUserChats'));
app.use('/createChat', require('./routes/createChat'));
app.use('/currentUserChat', require('./routes/currentUserChat'));
app.use('/deleteChatById', require('./routes/deleteChatById'));

app.use(verifyJWT);

io.on('connection', (socket) => {
	socket.on('joinRoom', async (room) => {
		socket.join(room);
		const msg = await Chat.getMessagesByChat(room);

		io.to(room).emit('receiveMessage', msg);
	});
  
	socket.on('sendMessage', async (messages, chatName) => {
		await Chat.sendMessageToChat(chatName, messages);
		const msg = await Chat.getMessagesByChat(chatName);
		io.to(chatName).emit('receiveMessage', msg);

	});

	socket.on('joinUser', async (email) => {
		socket.join(email);
		const chats = await Chat.searchChatsByEmail(email);
		io.to(email).emit('receiveChats', chats);
	});

	socket.on('createNewChat', async (consumer) => {
		const chats = await Chat.searchChatsByEmail(consumer);
		io.to(consumer).emit('receiveChats', chats);
	})
});

mongoose.connection.once('open', () => {
	console.log('Connected to mongo DB');
	server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
});




