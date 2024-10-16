import User from '../models/users.js';

export const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({ _id: { $ne: req.userId } }).select(
			'-password'
		);

		return res.json({ users: allUsers });
	} catch (error) {
		return res.status(500).json({ message: 'Error getting users!' });
	}
};
