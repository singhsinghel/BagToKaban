const User=require('../models/usermodel');
const passport = require('passport');
const Products = require('../models/productmodel');


module.exports.register= async(req,res)=>{
    try {    
        let{username,email,password}=req.body;
        let checkUser= await User.findOne({email:email});
        if (checkUser) {
            req.flash('error','email already exists');
            return res.redirect('/')
        }
        else{
        const newUser=new User({
            username:username,
            email:email,
        });
      const registerdUser = await  User.register(newUser,password);
      res.locals.currUser=registerdUser;
      req.login(registerdUser,(err)=>{
        if(err)
         next(err); 
        req.flash('success','Welcome to BagtoKaban');
        res.redirect('/shop');

      })
    } }
      catch (error) {
         req.flash('error',error.message);
          console.log(error);
         res.redirect('/');
     }
 
}

module.exports.login=async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
          req.flash('error', info.message);
          return res.redirect('/');
      }
      req.logIn(user, (err) => {
          if (err) return next(err);
          req.flash('success', `Welcome back ${user.username}`);
          res.redirect('/shop');          
      });
  })(req, res, next);
}

module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
       return next(err);
    }
    req.flash('success','You are logged out');
    res.redirect('/');
  })
}