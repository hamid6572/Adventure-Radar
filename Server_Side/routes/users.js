const express = require('express');
const router = express.Router();
const usersController = require('../controller/users');
const isAuth = require('../middlewares/is-auth');

router.get('/getAllUsers', usersController.getUsers);
// router.get('/tours/:slug', toursController.getTour);
// //router.post("/tour", isAuth, toursController.postTour);
// router.post('/tour', toursController.postTour);

// router.get('/getAllBookings', bookingController.getBookings);
// router.get('/booking/:slug', bookingController.getBooking);
// router.post('/booking', bookingController.postBooking);
// router.post('/custombooking', bookingController.postCustomBooking);

module.exports = router;
