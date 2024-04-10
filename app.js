require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const ExpressError = require('./utilities/expressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const houseRoutes = require('./routes/house');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
const os = require('os');

//------------------------------mongoose Connection-------------------------------
//change this url to local host url if you are using it outside the container of docker
// 'mongodb://mongo_db:27017/StayEase'
const DB_URL = 'mongodb+srv://sachin_53:68sXWPJfQ4iHkXg6@cluster0.nvfkv8t.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB_URL,{
    // useNewUrlParser: true,
    // // useCreateIndex:true,
    // useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
//----------------------------------------------------------------------------------


const app = express();


//-------------------------------------------------------------------------------------
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
//-------------------------------------------------------------------------------------

//used because we are going to access our application through proxy (nginx)
app.enable("trust proxy");

//-------------------------session configuration------------------------------------------
const sessionConfig = {
    
    secret:'thisismysecret',
    resave: false,

    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()*1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }

}
app.use(session(sessionConfig));
app.use(flash());
//--------------------------------------------------------------------------------------------


//---------------------------------Passport Cofiguration--------------------------------------

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//tells how store user in session and how it remove from session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//--------------------------------------------------------------------------------------------




//--------- It's an object that contains response local variables scoped to the request, 
//and these variables are available in the rendering engine of the application.--------------------
app.use((req,res,next)=>{
    //req.user stores all the information of the signedIn user because of we are using passport
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//--------------------------------------------------------------------------------------------------


app.use('/houses',houseRoutes);
app.use('/houses/:id/reviews',reviewRoutes);
app.use('/',userRoutes);


app.get('/home',(req,res)=>{
    // console.log('sachin');
    
    res.render('home',{formSubmitted: false});
})

// app.get('/check',(req,res)=>{
//     console.log('sachin');
    
//     res.json({
//         hi:"hi",
//         hostname: os.hostname()
//     })
// })

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

//------------------------------------Error Handler--------------------------------------------------
app.use((err,req,res,next)=>{
    const {statusCode = 500}=err;
    if(!err.message) err.message="Oh No, Something Went Wrong";
    res.status(statusCode).render('error',{err});
})
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Listining on port 3000");
})


