const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const HouseSchema =  new Schema({
    name: String,
    address: String,
    price: Number,
    availability: Number,
    description: String,
    images:String,

    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ] 

})


// to delete all the reviews associated with the house after we delete the house
HouseSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('House',HouseSchema);