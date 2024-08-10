module.exports.isLoggedIn=(req,res,next)=>
    {
        if(!req.isAuthenticated()) {
            req.session.redirectUrl=req.originalUrl;
            req.flash('error','You must be logged in');
            res.redirect('/');
          }
          next();
    }