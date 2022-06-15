const Booking = require('../models/bookings');

exports.getBookings = async (req, res, next) => {
  const bookings = await Booking.find();
  res.json({
    Tours: bookings,
  });
};

exports.getBooking = async (req, res, next) => {
  const booking = await Booking.find({ slug: req.params.slug });
  res.json({ ...booking });
};

exports.postBooking = async (req, res, next) => {
  const tour = req.body.tour;
  const user = req.body.user;
  const price = req.body.price;
  const location = req.body.location;
  const booking = new Booking({
    tour: tour,
    user: user,
    price: price,
    location: location,
  });
  await booking.save();
  res.json({
    Success: 'Booked',
  });
};

exports.deleteBooking = async (req, res, next) => {
  console.log(req.params.id);
  try {
    await Booking.deleteOne({ _id: req.params.id });

    return {
      status: 'success',
      response: true,
    };
  } catch (err) {
    return {
      status: 'error',
      response: false,
      error: err.message,
    };
  }
};

exports.postCustomBooking = async (req, res, next) => {
  const location = req.body.location;
  const user = req.body.user;
  const price = req.body.price;
  const persons = req.body.persons;
  const pickuppoint = req.body.pickupPoint;
  const booking = new Booking({
    location: location,
    pickupPoint: pickuppoint,
    persons: persons,
    user: user,
    price: price,
  });
  await booking.save();
  res.json({
    Success: 'Booked',
  });
};
