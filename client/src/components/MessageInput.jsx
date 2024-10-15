import { useState } from 'react';

const MessageInput = ({ receiverId, setChats, chats }) => {
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/chat/message/${receiverId}`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ content: message }),
				}
			);

			setChats([...chats, { content: message }]);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex items-center justify-between p-2"
		>
			<input
				type="text"
				placeholder="Type your message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<button
				type="submit"
				className="ml-3 px-8 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;
