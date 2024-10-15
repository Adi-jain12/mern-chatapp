import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MessageInput from './MessageInput';

const Chat = ({ socket }) => {
	const [startChat, setStartChat] = useState(false);
	const [chats, setChats] = useState([]);
	const [receiverId, setReceiverId] = useState();
	const userId = window.localStorage.getItem('userId');

	useEffect(() => {
		socket.emit('join', userId);
	}, []);

	useEffect(() => {
		const handleNewMessages = (message) => {
			if (receiverId === message.sender) {
				setChats((prevState) => [...prevState, { content: message.content }]);
			}
		};

		socket.on('newMessage', handleNewMessages);

		return () => {
			socket.off('newMessage', handleNewMessages);
		};
	}, [socket, receiverId]);

	console.log('CHATSSSSSSSSSS', chats);

	return (
		<div className="grid grid-cols-[22rem_1fr] h-screen">
			<Sidebar
				setStartChat={setStartChat}
				setChats={setChats}
				socket={socket}
				setReceiverId={setReceiverId}
			/>

			<main className="bg-slate-200 flex flex-col justify-between p-16 pb-24">
				<div className="max-w-[120rem] mx-auto flex-grow flex flex-col gap-8">
					{/* {startChat ? (
						<div className="flex-grow">
							<div className="overflow-y-auto mb-20">
								{chats.map((chat, index) => (
									<div
										key={index}
										className={`flex px-4 ${
											chat.sender === userId ? 'justify-end ' : 'justify-start'
										}`}
									>
										<div
											className={`p-2 my-2 rounded ${
												chat.sender === userId
													? 'bg-blue-500 text-white'
													: 'bg-white'
											}`}
										>
											{chat.content}
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div>
							<h2>Welcome</h2>
						</div>
					)} */}
				</div>

				{startChat && (
					<div className="mt-auto">
						<MessageInput
							receiverId={receiverId}
							setChats={setChats}
							chats={chats}
						/>
					</div>
				)}
			</main>
		</div>
	);
};

export default Chat;
