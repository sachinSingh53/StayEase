const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {storeReturnTo, isLoggedIn} = require('../middlewares');
const catchAsync=require('../utilities/catchAsync');

//----------------------------------SignUp------------------------------------
router.get('/register',(req,res)=>{
    res.render('user/register');

})
router.post('/register',async(req,res)=>{
    try{
        const {email, username, password} = req.body;
        const user =  new User({email,username})
        const registeredUser =  await User.register(user,password);

        //without this You have to logIn again after signUp
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to yelp-camp!');
            res.redirect('/');
        })
        
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})
//------------------------------------------------------------------------------




//-------------------------------Login------------------------------------------
router.get('/login',(req,res)=>{
    res.render('user/login');
})

router.post('/login',storeReturnTo,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),(req,res)=>{
    req.flash('success','Welcome Back!');

    const redirectUrl = res.locals.returnTo||'/';
    
    res.redirect(redirectUrl);
   
})
//----------------------------------------------------------------------------------




//--------------------------------Logout------------------------------------------
router.get('/logout', (req, res, next) => {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
});
//------------------------------------------------------------------------------



//-------------------------------change password--------------------------------
router.get('/resetPassword',(req,res)=>{
    res.render('user/resetPassword');
})

router.post('/resetPassword',catchAsync(async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    if(user===null){
        req.flash('error','user not found!!');
        return res.redirect('/resetPassword');
    }
    const newPassword = req.body.password;
    const confirmPassword = req.body.confirmpassword;
    if(newPassword!=confirmPassword){
        req.flash('error','password does not match!!');
        res.redirect('/resetPassword');
    }
    // console.log(req.body,user);
    await user.setPassword(newPassword)
    await user.save();
    req.flash('success','Password Updated!');
    res.redirect('/login');
}))


module.exports = router;