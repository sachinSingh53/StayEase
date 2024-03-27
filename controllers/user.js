const User = require('../models/user');



module.exports.registerForm = (req,res)=>{
    res.render('user/register');
}

module.exports.register = async(req,res)=>{
    try{
        const {email, username, password} = req.body;
        const user =  new User({email,username})
        const registeredUser =  await User.register(user,password);

        //without this You have to logIn again after signUp
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','Welcome to yelp-camp!');
            res.redirect('/home');
        })
        
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req,res)=>{
    res.render('user/login');
}

module.exports.login = (req,res)=>{
    req.flash('success','Welcome Back!');

    const redirectUrl = res.locals.returnTo||'/home';
    
    res.redirect(redirectUrl);
   
}

module.exports.logout = (req, res, next) => {

    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/login');
    });
}

module.exports.changePasswordForm = (req,res)=>{
    res.render('user/resetPassword');
}

module.exports.changePassword = async(req,res)=>{
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
}