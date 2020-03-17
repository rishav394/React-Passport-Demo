const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var mySchema = new Schema({
	username: String,
	googleId: String,
	avatar: String,
	email: String,
});

const UserModel = mongoose.model('user', mySchema);

module.exports = UserModel;
