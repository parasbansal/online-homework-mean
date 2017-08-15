const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: Number,	// 0 = Admin (not using now), 1 = Student, 2 = Teacher
		required: true
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	}

});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

module.exports.getUserByEmail = function (email, callback) {
	const query = { email: email }
	User.findOne(query, callback);
}

// Get user details without password
module.exports.getUserByIdProtected = function (id, callback) {
	User.findById(id).select('-password').exec(callback);
}

module.exports.addUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			if (err) throw err;

			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

// Compare Passwords while auth
module.exports.comparePassword = function (password, actualPassword, callback) {
	bcrypt.compare(password, actualPassword, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
}

// Get user list by role
module.exports.getUsersByRole = function (role, callback) {
	const query = { role: role }
	User.find(query).select('-password').sort("name").exec(callback);
}

// Change Profile
module.exports.editUser = function (id, newUser, callback) {
	User.findByIdAndUpdate(id, newUser, callback);
}

