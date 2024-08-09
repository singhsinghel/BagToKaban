const { isLoggedIn } = require("../middlewares");
const express=require('express');
const Products = require("../models/productmodel");
const User = require("../models/usermodel");
const { use } = require("passport");
const ExpressError = require("../utils/ExpressError");
const { login } = require("../controllers/userController");
const router=express.Router();
const indexController=require('../controllers/indexControllers');
const wrapAsync=require('../utils/wrapAsync');

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/shop',isLoggedIn, wrapAsync(indexController.shop));

router.get('/shop/discount',wrapAsync(indexController.discount));

router.get('/add/:id',isLoggedIn, indexController.cartAdd);


router.get('/cart', isLoggedIn, indexController.showCart);

router.get('/cart/increase/:id/:pid',isLoggedIn,wrapAsync(indexController.incCart))

router.get('/cart/decrease/:id/:pid',isLoggedIn,wrapAsync(indexController.decCart));

router.get('/admin',(req,res)=>{
    res.render('createProducts')
})
module.exports=router;