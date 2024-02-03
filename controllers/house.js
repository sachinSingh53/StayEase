const House = require('../models/house');
const {cloudinary} = require('../cloudinary');
// const ExpressError = require('../utilities/expressError');
// const Joi = require('joi');
const mbxGeocoding= require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken:mapboxToken});
const client = require('../redisClient');



module.exports.index = async(req,res)=>{
    const houses = await House.find({});
    res.render('house/index',{houses});
}

module.exports.createForm = (req,res)=>{

    res.render('house/new');
}

module.exports.create = async(req,res)=>{
    
    //forward geocoding the location the user entered and convert it into geojson
   const geodata =  await geocoder.forwardGeocode({
        query:req.body.house.address,
        limit:1
    }).send();
    const house = new House(req.body.house);
    house.author = req.user._id;
    house.geometry = geodata.body.features[0].geometry;
    house.images = req.files.map(f=>({url: f.path, filename: f.filename}));
    // console.log(house);
    // console.log(req.files);

    await house.save();
    req.flash('success','Successfully Created New House!');
    res.redirect('/houses');
}

module.exports.read = async(req,res)=>{

    const house = await House.findById(req.params.id).populate({
        path: 'reviews',
        populate:{
            path: 'author'
        }
    }).populate('author');

    // console.log(house);
    res.render("house/show",{house});
}

module.exports.updateForm = async(req,res)=>{
    const house = await House.findById(req.params.id);
    
    // console.log(house);
    res.render('house/edit',{house});
}

module.exports.update = async(req,res)=>{
    const {id} = req.params;
    console.log(req.body);
    
    const houseEdit =  await House.findByIdAndUpdate(id,{...req.body.house});
    houseEdit.save();
    req.flash('success',`Successfully Updated!`)
    res.redirect(`/houses/${id}`);
}

module.exports.delete = async(req,res)=>{

    const {id} = req.params;
    const house = await House.findById(id);
    for (let itr of house.images) {
        await cloudinary.uploader.destroy (itr.filename);
     //    console.log(filename);
    }
    await House.findByIdAndDelete(id);
    req.flash('success','Sussessfully Deleted House!');
    res.redirect('/houses',);
}

module.exports.addImages = async(req,res)=>{
    // console.log(req.body);
    const {id} = req.params;
    const house =await House.findById(id);
    const imgs = req.files.map(f=>({url: f.path, filename: f.filename}));
    house.images.push(...imgs);
    house.save();
    // console.log(house);
    // console.log(req.body);
    res.redirect(`/houses/${id}`);
    
}

module.exports.deleteImages = async(req,res)=>{
    const {id} = req.params;
    const house = await House.findById(id);
    if(req.body.deleteImages){
        
        // console.log(req.body.deleteImages);
        for (let filename of req.body.deleteImages) {
           await cloudinary.uploader.destroy (filename);
        //    console.log(filename);
        }
       await house.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}});
    }

    await house.save(); 


    res.redirect(`/houses/${id}`);
    
}

module.exports.searchHouses = async(req,res)=>{

    const cachedValue = client.get(req.body.location);

    if(cachedValue){
        res.render('home',{cachedValue,formSubmitted:true});
    }
    else{
        const geodata =  await geocoder.forwardGeocode({
            query:req.body.location,
            limit:1
        }).send();

       const longitude =  geodata.body.features[0].geometry.coordinates[0];
       const latitude = geodata.body.features[0].geometry.coordinates[1];
        
    
        const houses = await House.aggregate([
            {
              $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(longitude),parseInt(latitude)] },
                key: "geometry",
                maxDistance: parseInt(50*1609), // Max distance in meters (assuming the distance is in miles)
                distanceField: "dist.calculated",
                spherical: true
              }
            }
          ]);

        await client.set(req.body.location,houses);
        res.render('home',{houses,formSubmitted:true});
    }

   
    // res.redirect('/houses');
}
