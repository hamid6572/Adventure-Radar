const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  location: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.'],
  },
  persons: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: String,
    default: `${new Date().toLocaleString()}`,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  pickupPoint: {
    type: String,
    default: 'Lahore',
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
