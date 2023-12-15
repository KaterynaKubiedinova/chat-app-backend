const handleLogout = async (req, res) => {
	res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
	res.sendStatus(204);
}

module.exports = { handleLogout };
