const express =require('express');
const { isLoggedIn } = require('../middlewares');
const router=express.Router();
const reviewController=require('../controllers/reviewController')
const wrapasync=require('../utils/wrapAsync');

router.post('/:id',isLoggedIn, wrapasync(reviewController.create));

router.delete('/:pid/:rid',isLoggedIn,wrapasync(reviewController.delete))
module.exports=router;