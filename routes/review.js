const express = require('express');
const router = express.Router({mergeParams:true});
const reviewController = require('../controllers/review');
const catchAsync=require('../utilities/catchAsync');
const {isLoggedIn,isReviewAuthor } = require('../middlewares');


router.post('/',isLoggedIn,catchAsync(reviewController.update));

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviewController.delete));

module.exports = router;