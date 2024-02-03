const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const {storeReturnTo, isLoggedIn} = require('../middlewares');
const catchAsync=require('../utilities/catchAsync');
const userController = require('../controllers/user');


router.route('/register')
    .get(userController.registerForm)
    .post(userController.register)


router.route('/login')
    .get(userController.loginForm)
    .post(storeReturnTo,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),userController.login);

router.get('/logout', userController.logout);


router.route('/resetPassword')
    .get(userController.changePasswordForm)
    .post(catchAsync(userController.changePassword));


module.exports = router;