import { useEffect, useState } from 'react';

const MainNav = ({ setStartChat, setChats, setReceiverId }) => {
	const [users, setUsers] = useState([]);

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
			if (error.message === 'Error getting messages') setChats([]);

			console.log(error);
		}

		setStartChat(true);
		setReceiverId(id);
	};

	const handleLogout = async () => {
		const response = await fetch(`http://localhost:3000/api/v1/auth/logout`, {
			credentials: 'include',
			method: 'POST',
		});

		if (!response) {
			throw new Error('Error during log out');
		}
	};

	return (
		<nav className="flex flex-col justify-between h-full">
			<div>
				{users.length > 0 ? (
					<ul className="flex flex-col">
						{users.map((user) => (
							<li
								key={user._id}
								onClick={() => handleStartChat(user._id)}
								className="flex items-center border-b border-gray-100 justify-between gap-3 py-7 px-8 cursor-pointer transition-all duration-300 hover:bg-gray-200"
							>
								<span className="text-lg font-medium text-gray-700">
									{user.email}
								</span>
							</li>
						))}
					</ul>
				) : (
					<div className="text-gray-600 text-center mt-4">No Users</div>
				)}
			</div>
			<button
				onClick={() => handleLogout}
				className="mb-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:bg-red-600"
			>
				Logout
			</button>
		</nav>
	);
};

export default MainNav;
