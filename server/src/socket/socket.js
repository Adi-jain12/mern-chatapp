import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

export const app = express();

const onlineUsers = {};

export const server = http.createServer(app);

export const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return onlineUsers[receiverId];
};

io.on('connection', (socket) => {
	console.log('User joined', socket.id);

	socket.on('join', (receiverId) => {
		onlineUsers[receiverId] = socket.id;
		console.log('Receiver: ', receiverId, 'socket id: ', socket.id);
	});
});
