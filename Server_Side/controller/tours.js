const Tour = require('../models/tours');

exports.getTours = async (req, res, next) => {
  const tours = await Tour.find();
  res.json({
    Tours: tours,
  });
};

exports.getTour = async (req, res, next) => {
  const tour = await Tour.find({ slug: req.params.slug });
  res.json({ ...tour });
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
  await tour.save();
  res.json({
    Success: 'Tour inserted',
  });
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
  try {
    const tour = await Tour.find(` id : ${req.params.id}`);
    Object.assign(tour, req.body);
    tour.save();
    return {
      status: 'success',
      responce: true,
    };
  } catch (err) {
    return {
      status: 'Error',
      response: false,
      error: err.message,
    };
  }
};
