const Tour = require('../models/tours');
const { validationResult } = require('express-validator');

exports.getTours = async (req, res, next) => {
  const tours = await Tour.find();
  res.json({
    Tours: tours,
  });
};

exports.getTour = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid Input!');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    const tour = await Tour.find({ slug: req.params.slug });
    res.json({ ...tour });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    console.log(err);
    next(err);
  }
};

exports.postTour = async (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const location = req.body.location;
  const duration = req.body.duration;
  const maxGroupSize = req.body.maxGroupSize;
  const startingLocation = req.body.startingLocation;
  const coverImage = req.body.coverImage;
  const user = req.body.user;
  const tour = new Tour({
    user: user,
    name: name,
    price: price,
    location: location,
    duration: duration,
    maxGroupSize: maxGroupSize,
    startingLocation: startingLocation,
    coverImage: coverImage,
  });
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //checking validation on body of req
      const error = new Error('Invalid Input!');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    await tour.save();
    res.json({
      Success: 'Tour inserted',
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

// delete user

exports.deleteTour = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Tour.deleteOne({ _id: req.params.id });

    return {
      status: 'success',
    };
  } catch (err) {
    return {
      status: 'error',
      response: false,
      error: err.message,
    };
  }
};

// update user

exports.updateTour = async (req, res, next) => {
  const price = req.body.price;
  const location = req.body.location;
  const duration = req.body.duration;
  const maxGroupSize = req.body.maxGroupSize;
  const startingLocation = req.body.startingLocation;
  const coverImage = req.body.coverImage;
  const user = req.body.user;
  const tourData = new Tour({
    user: user,
    price: price,
    location: location,
    duration: duration,
    maxGroupSize: maxGroupSize,
    startingLocation: startingLocation,
    coverImage: coverImage,
  });
  delete tourData._id;
  try {
    const tour = await Tour.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        price: req.body.price,
        location: req.body.location,
        duration: req.body.duration,
        maxGroupSize: req.body.maxGroupSize,
        startingLocation: req.body.startingLocation,
        coverImage: req.body.coverImage,
        user: req.body.user,
      }
    );
    return {
      status: 'success',
      responce: true,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 'Error',
      response: false,
      error: err.message,
    };
  }
};
