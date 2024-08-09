const express =require('express');
const router=express.Router();
const { register, login, logout } = require('../controllers/userController');
const wrapAsync = require('../utils/wrapAsync');

router.post('/register', wrapAsync(register));

router.post('/login',login);

router.get('/logout',logout);

module.exports=router;