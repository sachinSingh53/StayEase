const Review = require('../models/review');
const House = require('../models/house');

module.exports.update = async(req,res)=>{
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
}

module.exports.delete = async(req,res)=>{
    const {id,reviewId} = req.params;
    await House.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted the Review');
    res.redirect(`/houses/${id}`);
}