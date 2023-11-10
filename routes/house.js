const express = require('express');
const router = express.Router({mergeParams:true});
const House = require('../models/house');

//-----------------index----------------------------------
router.get('/',async(req,res)=>{
    const houses = await House.find({});
    res.render('house/index',{houses});

})

//---------------------Create-------------------------------
router.get('/new',(req,res)=>{
    res.render('house/new');
})

router.post('/',async(req,res)=>{
    // console.log("post success");
    

    const house = new House(req.body.house);
    // console.log(house);
    await house.save();
    res.redirect('/houses');
});


//-----------------------Read-------------------------------

router.get('/:id',async(req,res)=>{

    const house = await House.findById(req.params.id);
    res.render("house/show",{house});
})


//-----------------------Update-------------------------------

router.get('/:id/edit',async(req,res)=>{
    const house = await House.findById(req.params.id);
    // console.log(house);
    res.render('house/edit',{house});
})


router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const house =  await House.findByIdAndUpdate(id,{...req.body.house});
    house.save();
    res.redirect(`/houses/${id}`);
})


//---------------------Delete-----------------------------------

router.delete('/:id',async(req,res)=>{

    const {id} = req.params;
    await House.findByIdAndDelete(id);
    res.redirect('/houses',);
})

module.exports = router;