import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: 'User already exists' });

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			email,
			password: hashedPassword,
			name,
		});

		await newUser.save();

		return res.status(200).json({ message: 'User registered successfully' });
	} catch (error) {
		return res.status(500).json({ message: 'Error registering user!' });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'Invalid credentails' });

		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched)
			return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: '1d',
		});

		res.cookie('auth_token', token, {
			httpOnly: true,
			secure: false,
			maxAge: 86400000,
		});

		res.status(200).json({ userId: user._id, name: user.name });
	} catch (error) {
		return res.status(500).json({ message: 'Error logging in!' });
	}
};

export const validateUser = async (req, res) => {
	res.status(200).send({ userId: req.userId });
};

export const logout = async (req, res) => {
	res.cookie('auth_token', '', {
		expires: new Date(0),
	});

	res.send();
};
