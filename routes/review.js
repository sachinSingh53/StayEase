const express = require('express');
const router = express.Router({mergeParams:true});
const Review = require('../models/review');
const House = require('../models/house');
const catchAsync=require('../utilities/catchAsync');
const Joi = require('joi');
const ExpressError = require('../utilities/expressError');
const review = require('../models/review');
const { findById } = require('../models/house');



router.post('/',catchAsync(async(req,res)=>{
    // console.log(req.body.review);
    const review = new Review(req.body.review);
    const house = await House.findById(req.params.id);
    house.reviews.push(review);

    await review.save();
    await house.save();

    res.redirect(`/houses/${house._id}`);
}));

router.delete('/:reviewId',catchAsync(async(req,res)=>{
    const {id,reviewId} = req.params;
    await House.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/houses/${id}`);
}));

module.exports = router;