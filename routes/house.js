const express = require('express');
const router = express.Router({mergeParams:true});
const House = require('../models/house');
const catchAsync=require('../utilities/catchAsync');
const Joi = require('joi');
const ExpressError = require('../utilities/expressError');
const { validateHouse } = require('../middlewares');


//-----------------index----------------------------------
router.get('/',catchAsync(async(req,res)=>{
    const houses = await House.find({});
    res.render('house/index',{houses});

}))

//---------------------Create-------------------------------
router.get('/new',(req,res)=>{
    
    res.render('house/new');
})

router.post('/',validateHouse,catchAsync(async(req,res)=>{
    
    

    const house = new House(req.body.house);
    // console.log(house);
    await house.save();
    req.flash('success','Successfully Created New House!');
    res.redirect('/houses');
}));


//-----------------------Read-------------------------------

router.get('/:id',catchAsync(async(req,res)=>{

    const house = await House.findById(req.params.id).populate('reviews');
    res.render("house/show",{house});
}))


//-----------------------Update-------------------------------

router.get('/:id/edit',catchAsync(async(req,res)=>{
    const house = await House.findById(req.params.id);
    // console.log(house);
    res.render('house/edit',{house});
}))


router.put('/:id',catchAsync(async(req,res)=>{
    const {id} = req.params;
    const house =  await House.findByIdAndUpdate(id,{...req.body.house});
    house.save();
    req.flash('success',`Successfully Updated!`)
    res.redirect(`/houses/${id}`);
}))


//---------------------Delete-----------------------------------

router.delete('/:id',catchAsync(async(req,res)=>{

    const {id} = req.params;
    await House.findByIdAndDelete(id);
    req.flash('success','Sussessfully Deleted House!');
    res.redirect('/houses',);
}))

module.exports = router;