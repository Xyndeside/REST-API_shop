const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
	async register(req, res) {
		try {
			const { username, email, password } = req.body;

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ message: 'User already exists' });
			}

			const hashedPassword = bcrypt.hashSync(password, 5);
			await User.create({
				username,
				email,
				password: hashedPassword
			});

			return res.status(200).json('User registered successfully');
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Register error' });
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ message: 'User not found' });
			}

			const passwordIsValid = bcrypt.compareSync(password, user.password);
			if (!passwordIsValid) {
				return res.status(401).json({ message: 'Invalid password' });
			}

			const token = jwt.sign(
				{
					id: user._id,
					isAdmin: user.isAdmin,
				},
				process.env.JWT_SECRET,
				{
					expiresIn: '1h',
				},
			);

			return res.status(200).json({ token });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: 'Login error' });
		}
	}
}

module.exports = new AuthController();
