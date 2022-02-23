const express = require("express");
const router = express.Router();
const toursController = require("../controller/tours");
const isAuth = require("../middlewares/is-auth");

router.get("/getAllTours", toursController.getTours);
router.get("/tours/:slug", toursController.getTour);
//router.post("/tour", isAuth, toursController.postTour);
router.post("/tour",  toursController.postTour);

module.exports = router;
