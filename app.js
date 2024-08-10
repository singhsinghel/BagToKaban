require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const path=require('path');

const indexRouter=require('./routes/index.js')
const ownerRouter= require('./routes/ownerRouter.js');
const productRouter= require('./routes/productRouter.js');
const userRouter= require('./routes/userRouter.js');
const reviewRouter=require('./routes/reviewRouter.js');
const app=express();
const session= require('express-session');
const passport= require('passport');
const LocalStrategy=require('passport-local');
const methodOverride=require('method-override');
app.use(methodOverride('_method'));
const ejsMate=require('ejs-mate');

const User = require('./models/usermodel.js');
const flash=require('connect-flash');
const mongoStore=require('connect-mongo');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine('ejs',ejsMate);
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

const dbUrl=process.env.AT_DB
const main=async()=>{
  mongoose.connect(dbUrl)
  }
  main().then((res)=>{
    console.log('connected');
    
  })
const store=mongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SESSION_SECRET
    },
    touchAfter:24*3600,
});
app.use(cookieParser());
const sessionOptions={
    store:store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() +7*24*60*60*1000, 
        maxAge:7*24*60*60*1000, 
        httpOnly:true,
        secure:false,
    },
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //to store the info regarding user in session.
passport.deserializeUser(User.deserializeUser()); //to unstore the info regarding user in session.


app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.currUser=req.user;
    next();
});

app.use('/',indexRouter);
app.use('/owner',ownerRouter);
app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/products/review',reviewRouter);

app.listen(8080,()=>{
    console.log('log listining');
})