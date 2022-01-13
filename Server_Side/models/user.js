const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Enter name"],
	},
	email: {
		type: String,
		validate: [validator.isEmail, "Invalid email address."],
		unique: [true, "Email already registered."],
		required: [true, "Email address is required."],
	},
	password: {
		type: String,
		minLength: [10, "password length must be atleast 10 characters long."],
		validate: [
			validator.isAlphanumeric,
			"Password must only contains alphabets and digits.",
		],
		require: [true, "Password is required."],
	},
});

module.exports = mongoose.model("User", userSchema);
