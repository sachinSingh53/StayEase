const express = require('express');
const router = express.Router({mergeParams:true});
const catchAsync=require('../utilities/catchAsync');
const multer  = require('multer')
const storage = require('../cloudinary/index');
const { validateHouse, isLoggedIn, isAuthor } = require('../middlewares');
const upload = multer(storage);
const houseController = require('../controllers/house');
const {createOrder} = require('../controllers/payment');





router.route('/')
    .get(catchAsync(houseController.index))
    .post(isLoggedIn,upload.array('house[images]'),validateHouse,catchAsync(houseController.create));


router.get('/new',isLoggedIn,houseController.createForm);

router.route('/:id')
    .get(catchAsync(houseController.read))
    .put(isLoggedIn,isAuthor,catchAsync(houseController.update))
    .delete(isLoggedIn,isAuthor,catchAsync(houseController.delete));

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(houseController.updateForm))

router.put('/:id/addImages',isLoggedIn,isAuthor,upload.array('images'),catchAsync(houseController.addImages));

router.delete('/:id/deleteImages',isLoggedIn,isAuthor,catchAsync(houseController.deleteImages));

router.post('/findbylocation',catchAsync(houseController.searchHouses));

router.get('/:id/payment',catchAsync(createOrder));



module.exports = router;