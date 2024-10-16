import { useEffect } from 'react';
import Login from '../components/Login';
import { useNavigate } from 'react-router';
import chat from '../../public/chat.gif';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const verifyUser = async () => {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/validate-token`,
				{
					credentials: 'include',
				}
			);

			if (!response.ok) throw new Error('Error');

			navigate('/chat');
		};

		verifyUser();
	}, []);

	return (
		<div className="grid grid-cols-[1fr_1fr] h-screen">
			<Login />

			<main className="p-16 pb-24">
				<div className="max-w-[120rem] mx-auto flex flex-col gap-8">
					<img src={chat} alt="chat" />
				</div>
			</main>
		</div>
	);
};
