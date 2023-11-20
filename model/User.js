const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password_hash: {
		type: String,
		required: true
	}
});

const UserModele = mongoose.model('User', userSchema);

class User {
	constructor(name, surname, email, password_hash) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password_hash = password_hash;
  }

  static async createUser(name, surname, email, password_hash) {
    const user = await UserModele.create({
			"name": name,
			"surname": surname,
			"email": email,
			"password_hash": password_hash
		});
    return user;
  }

  static async findByEmail(email) {
    return UserModele.findOne({ email });
  }
}

module.exports = User;