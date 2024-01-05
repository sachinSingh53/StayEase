const express = require('express');
const router = express.Router({mergeParams:true});
const Review = require('../models/review');
const House = require('../models/house');
const catchAsync=require('../utilities/catchAsync');
const Joi = require('joi');
const ExpressError = require('../utilities/expressError');
const review = require('../models/review');
const { findById } = require('../models/house');
const {isLoggedIn,isReviewAuthor } = require('../middlewares');



router.post('/',isLoggedIn,catchAsync(async(req,res)=>{
    // console.log(req.body.review);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const house = await House.findById(req.params.id);
    house.reviews.push(review);
    // console.log(review);
    

    await review.save();
    await house.save();

    req.flash('success','Successfully Added New Review!');

    res.redirect(`/houses/${house._id}`);
}));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(async(req,res)=>{
    const {id,reviewId} = req.params;
    await House.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted the Review');
    res.redirect(`/houses/${id}`);
}));

module.exports = router;