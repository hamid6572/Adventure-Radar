const express=require('express');
const router=express.Router();
const toursController=require('../controller/tours');
const isAuth=require('../middlewares/is-auth');

router.get('/tours',isAuth,toursController.getTours);
router.post('/tour',isAuth,toursController.postTour);

module.exports=router;


