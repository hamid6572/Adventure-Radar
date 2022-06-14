const express = require('express');
const router = express.Router();
const toursController = require('../controller/tours');
const bookingController = require('../controller/bookings');
const isAuth = require('../middlewares/is-auth');

router.get('/getAllTours', toursController.getTours);
router.get('/tours/:slug', toursController.getTour);
//router.post("/tour", isAuth, toursController.postTour);
router.post('/tour', toursController.postTour);

router.get('/getAllBookings', bookingController.getBookings);
router.get('/booking/:slug', bookingController.getBooking);
router.post('/booking', bookingController.postBooking);
router.post('/custombooking', bookingController.postCustomBooking);

module.exports = router;
