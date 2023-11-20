const User = require('../../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
// 	const cookies = req.cookies;
// 	console.log('cookie:', cookies);
// 	if(!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = req.refreshToken;

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if(err) return res.sendStatus(403);
			const accessToken = jwt.sign(
				{ "email": decoded.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '30s' }
			);
			res.json({accessToken, refreshToken})
		}
	)
};

module.exports = { handleRefreshToken };