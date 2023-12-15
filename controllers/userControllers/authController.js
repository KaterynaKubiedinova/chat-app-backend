const User = require('../../model/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

	const foundUser = await User.findByEmail(email);

	if (!foundUser) return res.sendStatus(401);
	
	const match = await bcrypt.compare(password, foundUser.password_hash);
	
	if (match) {
		const accessToken = jwt.sign(
			{ "email": foundUser.email },
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '30s'}
		);
		const refreshToken = jwt.sign(
			{ "email": foundUser.email },
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '15m'}
		);
		
		res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 15 * 60 * 1000, secure: true});
		
		res.json({
			accessToken,
			user: {
				email: foundUser.email,
				name: foundUser.name,
				surname: foundUser.surname,
				id: foundUser._id
			}
		});
	} else {
		res.sendStatus(401);
	}
}

module.exports = { handleLogin };