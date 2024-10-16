import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:3000/api/v1/auth/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				if (response.status === 401) {
					setErrorMessage('Invalid email or password');
				} else {
					setErrorMessage('Invalid credentials. Please try again.');
				}
				return;
			}

			const data = await response.json();

			window.localStorage.setItem('userId', data.userId);
			window.localStorage.setItem('name', data.name);
			navigate('/chat');
		} catch (error) {
			console.log(error);
			setErrorMessage('Error logging in. Please try again later.');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-orange-500">
			<div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Login</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700">
							Email
						</label>
						<input
							id="email"
							type="email"
							className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-700">
							Password
						</label>
						<input
							id="password"
							type="password"
							className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

					<button
						type="submit"
						className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
					>
						Login
					</button>
				</form>
				<p className="text-center text-gray-600 mt-4">
					Don&apos;t have an account?{' '}
					<Link to="/register" className="text-blue-500 hover:underline">
						Register here
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default Login;
