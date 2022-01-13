const Tour = require("../models/tours");

exports.getTours = async (req, res, next) => {
	const tours = await Tour.find();
	res.json({
		Tours: tours,
	});
};

exports.postTour = async (req, res, next) => {
	const name = req.body.name;
	const price = req.body.price;
	const location = req.body.location;
	const duration = req.body.duration;
	const maxGroupSize = req.body.maxGroupSize;
	const tour = new Tour({
		name: name,
		price: price,
		location: location,
		duration: duration,
		maxGroupSize: maxGroupSize,
	});
	await tour.save();
	res.json({
		Success: "Tour inserted",
	});
};
