const mongoose = require("mongoose");
const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name required"],
		trim: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	maxGroupSize: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	locations: [
		{
			type: {
				type: String,
			},
		},
	],
	summary: {
		type: String,
		trim: true,
	},

	ratingsAverage: {
		type: Number,
		default: 4.0,
		max: [5, "Ratings Average must not be greater than 5.00"],
		min: [0, "Ratings Average must atleast be 0.00"],
	},

	ratingsQuantity: {
		type: Number,
		default: 0,
	},

	coverImage: { type: String },
	startingLocation: { type: String },
});

module.exports = mongoose.model("Tour", tourSchema);
