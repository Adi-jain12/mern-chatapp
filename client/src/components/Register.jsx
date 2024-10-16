import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage('Passwords do not match!');
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/auth/register`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, name, password }),
				}
			);

			if (!response.ok) throw new Error('Error creating user');

			navigate('/');
		} catch (error) {
			console.log(error);
			setErrorMessage('Error registering user');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label htmlFor="name" className="block text-gray-700">
							Your Name
						</label>
						<input
							id="name"
							type="text"
							className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
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
					<div className="mb-4">
						<label htmlFor="confirm-password" className="block text-gray-700">
							Confirm Password
						</label>
						<input
							id="confirm-password"
							type="password"
							className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>

					{errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

					<button
						type="submit"
						className="w-full bg-emerald-600 text-lg text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition duration-300"
					>
						Register
					</button>
				</form>
				<p className="text-center text-gray-600 mt-4">
					Already have an account?{' '}
					<Link to="/" className="text-blue-500 hover:underline">
						Login here
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default Register;
