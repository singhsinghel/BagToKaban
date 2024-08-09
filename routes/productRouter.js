const express =require('express');
const router=express.Router();
const { isLoggedIn } = require('../middlewares');
const upload=require('../cloud-config');
const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');
const productController=require('../controllers/productController')

router.post('/create',isLoggedIn,upload.single('image'),wrapAsync(productController.create));

router.get('/:id/show',isLoggedIn,wrapAsync(productController.show));


router.get('/:id/update',isLoggedIn,wrapAsync(productController.update));

router.post('/:id/update',isLoggedIn,upload.single('image'), wrapAsync(productController.postUpdate))


router.delete('/:id/',isLoggedIn,wrapAsync(productController.delete));

router.post('')
module.exports=router;