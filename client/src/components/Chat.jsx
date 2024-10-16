import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MessageInput from './MessageInput';

const Chat = ({ socket }) => {
	const [startChat, setStartChat] = useState(false);
	const [chats, setChats] = useState([]);
	const [receiverId, setReceiverId] = useState();
	const userId = window.localStorage.getItem('userId');
	const name = window.localStorage.getItem('name');

	useEffect(() => {
		socket.emit('join', userId);
	}, [socket, userId]);

	useEffect(() => {
		const handleNewMessages = (message) => {
			setChats((prevState) => [
				...prevState,
				{ content: message.content, sender: message.sender },
			]);
		};

		socket.on('newMessage', handleNewMessages);

		return () => {
			socket.off('newMessage', handleNewMessages);
		};
	}, [socket, receiverId]);

	return (
		<div className="grid grid-cols-[22rem_1fr] h-screen">
			<Sidebar
				setStartChat={setStartChat}
				setChats={setChats}
				socket={socket}
				setReceiverId={setReceiverId}
			/>

			<main className="bg-slate-200 flex flex-col justify-between p-12">
				{startChat ? (
					<div className="flex-grow flex flex-col justify-between">
						<div className="overflow-y-auto mb-4 flex-grow">
							{Array.isArray(chats) &&
								chats.map((chat, index) => (
									<div
										key={index}
										className={`flex px-4 ${
											chat.sender === userId ? 'justify-end' : 'justify-start'
										}`}
									>
										<div
											className={`px-4 py-3 my-2 rounded-2xl max-w-xs break-words ${
												chat.sender === userId
													? 'bg-orange-500 text-white'
													: 'bg-white text-black'
											}`}
										>
											{chat.content}
										</div>
									</div>
								))}
						</div>

						<div className="w-full">
							<MessageInput
								receiverId={receiverId}
								setChats={setChats}
								chats={chats}
							/>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center bg-gray-100">
						<div className="p-8 text-center">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">
								Welcome, <span className="text-orange-600">{name}</span>!
							</h2>
							<p className="text-lg text-gray-600">
								Get the conversation started and connect with others.
							</p>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Chat;
