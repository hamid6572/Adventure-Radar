const express = require('express');
const router = express.Router();
const toursController = require('../controller/tours');
const bookingController = require('../controller/bookings');

router.get('/getAllTours', toursController.getTours);
router.get('/tours/:slug', toursController.getTour);
router.post('/tour', toursController.postTour);
router.post('/updatetour/:id', toursController.updateTour);
router.get('/deletetour/:id', toursController.deleteTour);

router.get('/getAllBookings', bookingController.getBookings);
router.get('/booking/:slug', bookingController.getBooking);
router.get('/deletebooking/:id', bookingController.deleteBooking);
router.post('/booking', bookingController.postBooking);
router.post('/pay', bookingController.payBooking);
router.post('/custombooking', bookingController.postCustomBooking);

module.exports = router;
