const User = require('../../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handlerNewUser = async (req, res) => {
	const { name, surname, email, password } = req.body;
	if(!email || !password || !name || !surname) return res.status(400).json({ 'message': 'Email and password are required.' });

	const duplicate = await User.findByEmail( email );
	if (duplicate) return res.status(400).json({ message: 'User already exists' });
	
	try {
		const hashedPwd = await bcrypt.hash(password, 10);
		const user = await User.createUser( name, surname, email, hashedPwd)
		const accessToken = jwt.sign({ "email": user.email },
		process.env.ACCESS_TOKEN_SECRET,
		{expiresIn: '30s'}
		);
		const refreshToken = jwt.sign(
			{ "email": user.email },
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '15m'}
		);
		
    res.cookie('refreshToken', refreshToken, {httpOnly: true, sameSite: 'None', maxAge: 15 * 60 * 1000, secure: true});
		
		res.status(201).json({
			accessToken,
			user: {
				email: user.email,
				name: user.name,
				surname: user.surname,
				id: user._id
			}
		});
	} catch (err) {
		res.status(500).json({'message': err.message})
	}
}

module.exports = { handlerNewUser };