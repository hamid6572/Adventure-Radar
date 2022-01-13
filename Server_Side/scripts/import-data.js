const mongoose = require("mongoose");
const fs = require("fs");

const Tour = require("../models/tours");
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));

mongoose
	.connect(
		"mongodb+srv://user1:657214@cluster0.myjw1.mongodb.net/AdventureRadar?retryWrites=true&w=majority"
	)
	.then((result) => {
		console.log("connected");
	})
	.catch((err) => console.log(err));

const importData = async () => {
	try {
		await Tour.create(tours);
		console.log("Data imported sucessfully...");
	} catch (err) {
		console.log(err);
	}
	mongoose.disconnect();
};

importData();
