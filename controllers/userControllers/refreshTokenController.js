const jwt = require('jsonwebtoken');
const initialiseRedis = require('../../middleware/redisClient')();

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if(!cookies?.refreshToken) return res.sendStatus(401);
	const refreshToken = req.cookies.refreshToken;

	const blackListedRefreshToken = await initialiseRedis.then(data => data.get(refreshToken));
	if (blackListedRefreshToken === 'true') return res.sendStatus(401);

	await initialiseRedis.then(data => data.set(refreshToken, 'true'));

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if(err) return res.sendStatus(403);
			const newAccessToken = jwt.sign(
				{ "email": decoded.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			);
			const newRefreshToken = jwt.sign(
				{ "email": decoded.email },
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn: '15m'}
			);

			res.cookie('refreshToken', newRefreshToken, {httpOnly: true, sameSite: 'None', maxAge: 15 * 60 * 1000, secure: true});

			res.status(201).json({ accessToken: newAccessToken });
		}
	)
};

module.exports = { handleRefreshToken };