const User = require('../../model/User');

const handleLogout = async(req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	const { email } = req;
	const foundUser = await User.findByEmail( email );
	if (!foundUser) {
		res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
		res.sendStatus(204);
	}

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
	res.status(204);
}

module.exports = { handleLogout };