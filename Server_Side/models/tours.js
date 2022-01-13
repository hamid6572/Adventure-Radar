const mongoose = require("mongoose");
const slugify = require("slugify");
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

	slug: String,
});

tourSchema.pre("save", function (next) {
	this.slug = slugify(this.name, { lower: true, trim: true });
	next();
});

module.exports = mongoose.model("Tour", tourSchema);
