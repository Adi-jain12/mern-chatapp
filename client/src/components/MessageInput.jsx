import { useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';

const MessageInput = ({ receiverId, setChats }) => {
	const [message, setMessage] = useState('');
	const userId = window.localStorage.getItem('userId');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/chat/message/${receiverId}`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ content: message, sender: userId }),
				}
			);

			if (response.ok) {
				setChats((prevChats) => [
					...prevChats,
					{ content: message, sender: userId },
				]);
				setMessage('');
			} else {
				console.log('Failed to send message', response.statusText);
			}
		} catch (error) {
			console.log('Error sending message', error);
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
				className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>
			<button
				type="submit"
				className="ml-3 p-4 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition duration-300"
			>
				<BsFillSendFill size={20} />
			</button>
		</form>
	);
};

export default MessageInput;
