const House = require('../models/house');
const {razorpayInstance} = require('../paymentGateway/razorpay')
const createOrder = async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in')
        res.redirect('/login');
    }

    const house = await House.findById(req.params.id).populate('author');

    //payment


    const options = {
        amount: house.price*100,
        currency: 'INR',
        receipt: 'razorUser@gmail.com'
    }
 
    razorpayInstance.orders.create(options,
        (err, order) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    msg: 'Order Created',
                    order_id: order.id,
                    amount: house.price,
                    key_id: process.env.RAZORPAY_KEY_ID,
                    product_name: req.body.name,
                    description: req.body.description,
                    // contact: "8567345632",
                    name: house.author.username,
                    email: house.author.email
                });
            }
            else {
                res.status(400).send({ success: false, msg: 'Something went wrong!' });
            }
        }
    );


}

module.exports = {
    createOrder
}