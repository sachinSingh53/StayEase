const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema =  new Schema({
    name: String,
    address: String,
    price: Number,
    availability: Number,
    description: String,
    images:String

})

module.exports = mongoose.model('House',HouseSchema);