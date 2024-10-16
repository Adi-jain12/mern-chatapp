import { useEffect, useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router';

const MainNav = ({ setStartChat, setChats, setReceiverId }) => {
	const [users, setUsers] = useState([]);
	const [activeUserId, setActiveUserId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/v1/user/users`,
					{
						credentials: 'include',
					}
				);

				const data = await response.json();

				if (!response.ok) throw new Error('Error');

				setUsers(data.users);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUsers();
	}, []);

	const handleStartChat = async (id) => {
		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/chat/message/${id}`,
				{ credentials: 'include' }
			);

			const data = await response.json();

			setChats(data.message);
		} catch (error) {
			if (error.message === 'Conversation not found') {
				setChats([]);
			}

			console.log(error);
		}

		setStartChat(true);
		setReceiverId(id);
		setActiveUserId(id);
	};

	const handleLogout = async () => {
		const response = await fetch(`http://localhost:3000/api/v1/auth/logout`, {
			credentials: 'include',
			method: 'POST',
		});

		if (!response) {
			throw new Error('Error during log out');
		}

		navigate('/');
	};

	return (
		<nav className="flex flex-col justify-between h-full">
			<div>
				{users.length > 0 ? (
					<ul className="flex flex-col gap-2">
						{users.map((user) => (
							<li
								key={user._id}
								onClick={() => handleStartChat(user._id)}
								className={`flex items-center border-b border-gray-300 justify-between gap-3 py-7 px-8 cursor-pointer transition-all duration-300
            ${
							activeUserId === user._id
								? 'bg-orange-500'
								: 'hover:bg-orange-500'
						}`}
							>
								<span
									className={`text-lg font-medium transition-colors duration-300 ${
										activeUserId === user._id ? 'text-white' : 'text-gray-700'
									}`}
								>
									{user.name}
								</span>
							</li>
						))}
					</ul>
				) : (
					<div className="text-gray-600 text-center mt-4">No Users</div>
				)}
			</div>

			<button onClick={handleLogout} className="my-14 mx-6 w-full p-4">
				<MdLogout size={30} />
			</button>
		</nav>
	);
};

export default MainNav;
