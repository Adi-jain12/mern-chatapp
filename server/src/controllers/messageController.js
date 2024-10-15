import Conversation from '../models/conversation.js';
import Message from '../models/message.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
	const { id } = req.params;
	const senderId = req.userId;
	const { content } = req.body;

	try {
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, id] },
		});

		if (!conversation) {
			conversation = new Conversation({
				participants: [senderId, id],
			});
			await conversation.save();
		}

		const newMessage = new Message({
			conversationId: conversation._id,
			sender: senderId,
			content: content,
			createdAt: new Date(),
		});

		await newMessage.save();

		const receiverSocketId = getReceiverSocketId(id);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage);
		}

		return res.json({ message: newMessage });
	} catch (error) {
		return res.status(500).json({ message: 'Error sending message' });
	}
};

export const getMessage = async (req, res) => {
	const { id } = req.params;
	const senderId = req.userId;

	try {
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, id] },
		});

		if (!conversation) {
			return res.status(404).json({ message: 'Conversation not found' });
		}

		const messages = await Message.find({
			conversationId: conversation._id,
		}).sort({ createdAt: 1 });

		return res.json({ message: messages });
	} catch (error) {
		return res.status(500).json({ message: 'Error getting messages' });
	}
};
