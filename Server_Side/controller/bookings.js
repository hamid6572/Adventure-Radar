const Booking = require('../models/bookings');
const stripe = require('stripe')(
  'sk_test_51LBC7iF2SLIp0YJ6MzX02KdMJoIIocwNfdfO1i9t7N9mBne4szufvF9qtUSCg341GzOiW6RV3xQMjOV4nXWrplID00NcRrUHoA'
);
const { validationResult } = require('express-validator');

exports.getBookings = async (req, res, next) => {
  const bookings = await Booking.find();
  console.log(bookings);
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
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //checking validation on body of req
      const error = new Error('Invalid Input!');
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }
    await booking.save();
    res.json({
      Success: 'Booked',
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.payBooking = async (req, res) => {
  const booking = await Booking.findById(req.body.id);

  console.log(booking);

  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000/paymentSuccess',
    cancel_url: 'http://localhost:3000/paymentFailure',
    line_items: [
      {
        name: booking.location,
        amount: booking.price,
        currency: 'usd',
        quantity: '1',
      },
    ],
    mode: 'payment',
  });

  console.log(session.id);

  res.json({ id: session.id });
};
