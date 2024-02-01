/** @format */

const User = require('../../model/User');
const url = require('url');

const handleUserById = async (req, res) => {
  const query = url.parse(req.url, true).query;
	const id = query.id;

  if (!id) return res.status(400).json({ message: 'ID is required.' });

  const foundUser = await User.findByID(id);

  if (!foundUser) return res.sendStatus(401);

  res.json({
    user: {
      email: foundUser.email,
      name: foundUser.name,
      surname: foundUser.surname,
      id: foundUser._id,
    },
  });
};

module.exports = { handleUserById };
